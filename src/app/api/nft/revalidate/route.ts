import { NextResponse } from 'next/server';

// POST /api/nft/revalidate — appelé par GitHub Actions cron toutes les 24h
// TODO Phase 4 : re-vérifier possession NFT pour tous les profils tier='nft'
// Si wallet ne détient plus le NFT → subscription_tier = 'free'
export async function POST() {
  return NextResponse.json(
    { mock: true, message: 'Revalidation NFT disponible en Phase 4' },
    { status: 501 },
  );
}
