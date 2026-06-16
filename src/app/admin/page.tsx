import { getProfile } from '@/lib/auth';

export default async function AdminDashboard() {
  const profile = await getProfile();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">
        Connecté en tant que <strong>{profile?.pseudo}</strong> — rôle : {profile?.role}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Mangas publiés',       value: '—', href: '/admin/manga' },
          { label: 'Utilisateurs',          value: '—', href: '/admin/users' },
          { label: 'Revenus ce mois',       value: '—', href: '/admin/analytics' },
        ].map(({ label, value, href }) => (
          <a key={href} href={href} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 transition-colors">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          </a>
        ))}
      </div>
      {/* TODO Phase 5 : brancher les vraies stats depuis Supabase */}
    </div>
  );
}
