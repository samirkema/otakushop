import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth';
import { formatDate } from '@/lib/utils';
import { LogoutButton } from './LogoutButton';

export const metadata = { title: 'Mon compte — Otaku Shop' };

const tierLabel: Record<string, string> = {
  free:       'Gratuit',
  subscriber: 'Abonné',
  nft:        'NFT',
};

const tierColor: Record<string, string> = {
  free:       'bg-gray-100 text-gray-700',
  subscriber: 'bg-indigo-100 text-indigo-700',
  nft:        'bg-purple-100 text-purple-700',
};

export default async function ComptePage() {
  const profile = await getProfile();
  if (!profile) redirect('/auth/login');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Mon compte</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {/* Avatar + pseudo */}
          <div className="p-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
              {profile.pseudo[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{profile.pseudo}</p>
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${tierColor[profile.subscription_tier]}`}>
                {tierLabel[profile.subscription_tier]}
              </span>
            </div>
          </div>

          {/* Détails abonnement */}
          <div className="p-6 space-y-3">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Abonnement</h2>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Statut</span>
              <span className="font-medium text-gray-900">{tierLabel[profile.subscription_tier]}</span>
            </div>
            {profile.subscription_tier === 'subscriber' && profile.subscription_expires_at && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expire le</span>
                <span className="font-medium text-gray-900">
                  {formatDate(profile.subscription_expires_at)}
                </span>
              </div>
            )}
            {profile.subscription_tier === 'nft' && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Wallet</span>
                <span className="font-mono text-xs text-gray-700 truncate max-w-[200px]">
                  {profile.wallet_address ?? '—'}
                </span>
              </div>
            )}
            {profile.subscription_tier === 'free' && (
              <p className="text-sm text-gray-500">
                Passez à l&apos;abonnement pour accéder aux mangas, jeux et My Remix.
              </p>
            )}
          </div>

          {/* Infos compte */}
          <div className="p-6 space-y-3">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Compte</h2>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Membre depuis</span>
              <span className="font-medium text-gray-900">{formatDate(profile.created_at)}</span>
            </div>
          </div>

          {/* Déconnexion */}
          <div className="p-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
