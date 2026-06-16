// Niveau 2 de sécurité : Server Component vérifie l'abonnement indépendamment du proxy.
// TODO Phase 3 : liste des œuvres + lecteur manga
import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth';
import { isSubscriber } from '@/lib/roles';

export const metadata = { title: 'Manga — Otaku Shop' };

export default async function MangaPage() {
  const profile = await getProfile();
  if (!profile || !isSubscriber(profile.subscription_tier, profile.subscription_expires_at)) {
    redirect('/compte');
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Catalogue Manga</h1>
      <p className="text-gray-500">Le catalogue arrive en Phase 2.</p>
    </div>
  );
}
