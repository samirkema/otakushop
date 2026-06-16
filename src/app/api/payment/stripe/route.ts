import { NextResponse } from 'next/server';

// POST /api/payment/stripe — Stripe Checkout + webhook
// TODO Phase 4 : intégration Stripe Checkout + webhook handler
// STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET sont des variables serveur uniquement
export async function POST() {
  return NextResponse.json(
    { mock: true, message: 'Paiement Stripe disponible en Phase 4' },
    { status: 501 },
  );
}
