import Link from 'next/link';

export const metadata = { title: 'Club VIP — Otaku Shop' };

export default function ClubVipPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Club VIP</h1>
      <p className="text-gray-500 mb-8">
        Abonnez-vous pour accéder à l&apos;intégralité du catalogue manga, aux jeux et au mode My Remix.
      </p>
      <Link
        href="/auth/register"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Rejoindre le club
      </Link>
    </div>
  );
}
