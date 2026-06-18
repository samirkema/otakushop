import { NextResponse } from 'next/server';
import { createHash }   from 'crypto';
import bcryptjs         from 'bcryptjs';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { sendSubscriptionConfirmation } from '@/lib/email';

// Limites de rate limiting
const MAX_ATTEMPTS_PER_USER_24H = 5;
const MAX_ATTEMPTS_PER_IP_1H    = 10;

// POST /api/subscription — active un abonnement par code secret (hashé bcrypt en BDD/env).
// Body : { code: string }
// Env requis : ACTIVATION_CODE_HASH (bcrypt hash), ACTIVATION_DAYS (optionnel, défaut 30)
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  // Hash IP pour stocker sans exposer l'adresse brute en BDD
  const rawIp  = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ipHash = createHash('sha256').update(rawIp).digest('hex');

  const svc = createServiceClient();
  const window24h = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const window1h  = new Date(Date.now() -      3600 * 1000).toISOString();

  // Enregistre la tentative EN PREMIER — avant la vérification des compteurs.
  // Cela élimine la race condition TOCTOU : même si deux requêtes arrivent simultanément,
  // elles s'insèrent toutes les deux, et le compteur post-insertion reflète la réalité.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: insertError } = await (svc as any)
    .from('activation_attempts')
    .insert({ user_id: user.id, ip_hash: ipHash });

  if (insertError) {
    console.error('[subscription/activate] insertion tentative:', insertError.message);
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 });
  }

  // Vérification rate limiting APRÈS insertion (compteurs incluent la tentative courante)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [{ count: userCount }, { count: ipCount }] = await Promise.all([
    (svc as any)
      .from('activation_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('attempted_at', window24h),
    (svc as any)
      .from('activation_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('attempted_at', window1h),
  ]);

  // Utiliser > (strict) car le compteur inclut déjà la tentative courante.
  // Sémantique identique à l'ancienne garde >= avec insert-après :
  // MAX_ATTEMPTS autorisés, le suivant est bloqué.
  if ((userCount ?? 0) > MAX_ATTEMPTS_PER_USER_24H) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans 24h.' },
      { status: 429 },
    );
  }
  if ((ipCount ?? 0) > MAX_ATTEMPTS_PER_IP_1H) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans 1h.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 });
  }

  const { code } = body as { code?: string };
  if (!code || typeof code !== 'string' || code.trim() === '') {
    return NextResponse.json({ error: 'code requis' }, { status: 400 });
  }

  const hash = process.env.ACTIVATION_CODE_HASH;
  if (!hash) {
    console.error('[subscription/activate] ACTIVATION_CODE_HASH non configuré');
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 });
  }

  // Comparaison en temps constant via bcrypt (résistant au timing attack)
  const valid = await bcryptjs.compare(code.trim(), hash);
  if (!valid) {
    return NextResponse.json({ error: 'Code invalide' }, { status: 403 });
  }

  const days = parseInt(process.env.ACTIVATION_DAYS ?? '30', 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profileData, error } = await (svc as any)
    .from('profiles')
    .update({
      subscription_tier:       'subscriber',
      subscription_expires_at: expiresAt.toISOString(),
    })
    .eq('id', user.id)
    .select('pseudo')
    .single();

  if (error) {
    console.error('[subscription/activate] profile update:', error.message);
    return NextResponse.json({ error: 'Erreur activation' }, { status: 500 });
  }

  const email  = user.email ?? null;
  const pseudo = (profileData as { pseudo?: string } | null)?.pseudo ?? 'abonné';
  if (email) {
    sendSubscriptionConfirmation({ to: email, pseudo, expiresAt })
      .catch(err => console.error('[subscription/activate] email confirmation:', err));
  }

  return NextResponse.json({ ok: true, expiresAt: expiresAt.toISOString() });
}
