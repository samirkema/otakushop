import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';

// Le webhook doit lire le body brut pour que Stripe puisse vérifier la signature.
// Next.js App Router ne pré-parse pas le body dans les Route Handlers.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.text();
  const sig  = request.headers.get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Signature Stripe invalide' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId  = session.metadata?.userId;

    if (!userId) {
      console.error('[stripe/webhook] userId absent des métadonnées');
      return NextResponse.json({ error: 'userId manquant' }, { status: 400 });
    }

    // Abonnement 30 jours à compter du paiement
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const svc = createServiceClient();

    const [profileRes, paymentRes] = await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (svc as any)
        .from('profiles')
        .update({
          subscription_tier:       'subscriber',
          subscription_expires_at: expiresAt.toISOString(),
        })
        .eq('id', userId),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (svc as any)
        .from('payments')
        .insert({
          user_id:      userId,
          amount:       (session.amount_total ?? 0) / 100,
          currency:     session.currency ?? 'eur',
          method:       'stripe',
          status:       'completed',
          provider_ref: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        }),
    ]);

    if (profileRes.error) console.error('[stripe/webhook] profile update:', profileRes.error.message);
    if (paymentRes.error) console.error('[stripe/webhook] payment insert:', paymentRes.error.message);
  }

  return NextResponse.json({ received: true });
}
