// Niveau 2 de sécurité : Server Component vérifie l'abonnement indépendamment du proxy.
// TODO Phase 7 : module jeux + mode développeur (hors-périmètre Phase 1)
import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth';
import { isSubscriber } from '@/lib/roles';

export const metadata = { title: 'Jeux — Otaku Shop' };

export default async function JeuxPage() {
  const profile = await getProfile();
  if (!profile || !isSubscriber(profile.subscription_tier, profile.subscription_expires_at)) {
    redirect('/compte');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Jeux</h1>
      <p className="text-gray-500">Module de jeux en cours de développement.</p>
    </div>
  );
}
