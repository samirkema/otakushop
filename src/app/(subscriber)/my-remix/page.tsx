// Niveau 2 de sécurité : Server Component vérifie l'abonnement indépendamment du proxy.
import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth';
import { isSubscriber } from '@/lib/roles';
import { createServiceClient } from '@/lib/supabase/server';
import { RemixClientPage, type RemixData } from '@/components/canvas/RemixClientPage';

export const metadata = { title: 'My Remix — Otaku Shop' };

export default async function MyRemixPage() {
  const profile = await getProfile();
  if (!profile || !isSubscriber(profile.subscription_tier, profile.subscription_expires_at)) {
    redirect('/compte');
  }

  const svc = createServiceClient();

  // Requêtes DB parallèles — indépendantes, pas besoin d'être séquentielles
  const [tableauxRes, remixesRes, votesRes] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (svc as any)
      .from('tableaux')
      .select('id, title, thumbnail')
      .eq('available', true)
      .order('created_at', { ascending: false }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (svc as any)
      .from('remixes')
      .select('id, user_id, photo_id, image_path, votes_count, created_at, profiles:user_id(pseudo)')
      .order('votes_count', { ascending: false })
      .limit(50),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (svc as any)
      .from('votes')
      .select('photo_id')
      .eq('voter_id', profile.id),
  ]);

  const tableaux = (tableauxRes.data ?? []).map(
    (t: { id: string; title: string; thumbnail: string }) => ({
      id:        t.id,
      title:     t.title,
      thumbnail: svc.storage.from('tableaux').getPublicUrl(t.thumbnail).data.publicUrl,
    }),
  );

  const initialRemixes: RemixData[] = (remixesRes.data ?? []).map(
    (r: { image_path: string; [key: string]: unknown }) => ({
      ...r,
      image_url: svc.storage.from('remixes').getPublicUrl(r.image_path as string).data.publicUrl,
    }),
  );

  const votedPhotoIds: string[] = (votesRes.data ?? []).map(
    (v: { photo_id: string }) => v.photo_id,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Remix</h1>
      <RemixClientPage
        tableaux={tableaux}
        initialRemixes={initialRemixes}
        votedPhotoIds={votedPhotoIds}
        currentUserId={profile.id}
      />
    </div>
  );
}
