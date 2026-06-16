import { NextResponse } from 'next/server';

// POST /api/nft/verify
// TODO Phase 4 : vérification signature ethers.js + possession NFT via Alchemy (côté serveur)
// Flux : client signe un message → serveur vérifie la signature et interroge Alchemy
// La clé ALCHEMY_API_KEY ne doit JAMAIS être exposée côté client (pas de NEXT_PUBLIC_)
export async function POST() {
  return NextResponse.json(
    { mock: true, message: 'Vérification NFT disponible en Phase 4' },
    { status: 501 },
  );
}
