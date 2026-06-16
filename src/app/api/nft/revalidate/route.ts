import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { checkNftOwnership }   from '@/lib/alchemy';

// POST /api/nft/revalidate — appelé par GitHub Actions cron toutes les 24h.
// Protégé par : Authorization: Bearer <CRON_SECRET>
// Pour chaque profil tier='nft' : re-vérifie la possession du NFT.
// Si le wallet ne détient plus le NFT → subscription_tier = 'free'.
export async function POST(request: Request) {
  const auth = request.headers.get('authorization') ?? '';
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const svc = createServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: nftProfiles, error } = await (svc as any)
    .from('profiles')
    .select('id, wallet_address')
    .eq('subscription_tier', 'nft');

  if (error) {
    console.error('[nft/revalidate] fetch profiles:', error.message);
    return NextResponse.json({ error: 'Erreur lecture profils' }, { status: 500 });
  }

  const profiles = (nftProfiles ?? []) as { id: string; wallet_address: string | null }[];
  const results  = { checked: profiles.length, revoked: 0, errors: 0 };

  // Traitement séquentiel pour éviter de saturer Alchemy en rafale
  for (const profile of profiles) {
    if (!profile.wallet_address) {
      // Wallet manquant → révoquer sans appel Alchemy
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (svc as any).from('profiles').update({ subscription_tier: 'free' }).eq('id', profile.id);
      results.revoked++;
      continue;
    }

    try {
      const holdsNft = await checkNftOwnership(profile.wallet_address);
      if (!holdsNft) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (svc as any).from('profiles').update({ subscription_tier: 'free' }).eq('id', profile.id);
        results.revoked++;
      }
    } catch (err) {
      // Ne pas révoquer en cas d'erreur Alchemy — conserver l'accès par sécurité
      console.error(`[nft/revalidate] Alchemy error for ${profile.id}:`, err);
      results.errors++;
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
