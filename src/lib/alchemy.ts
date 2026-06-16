// Vérifie qu'un wallet détient au moins un NFT du contrat configuré.
// Appelé uniquement côté serveur — ALCHEMY_API_KEY n'est jamais exposé client.
export async function checkNftOwnership(walletAddress: string): Promise<boolean> {
  const apiKey   = process.env.ALCHEMY_API_KEY!;
  const contract = process.env.NFT_CONTRACT_ADDRESS!;

  const url = new URL(
    `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/isHolderOfCollection`,
  );
  url.searchParams.set('wallet', walletAddress);
  url.searchParams.set('contractAddress', contract);

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    // Désactive le cache Next.js : chaque appel doit refléter l'état en temps réel.
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Alchemy API error ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as { isHolderOfCollection: boolean };
  return data.isHolderOfCollection;
}
