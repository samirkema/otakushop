import Link from 'next/link';
import { getProfile } from '@/lib/auth';
import { isAdmin } from '@/lib/roles';

export async function Navbar() {
  const profile = await getProfile();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-indigo-600 hover:text-indigo-700">
          Otaku Shop
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/galerie" className="text-gray-600 hover:text-gray-900">Galerie</Link>
          <Link href="/aide" className="text-gray-600 hover:text-gray-900">Aide</Link>

          {profile ? (
            <>
              <Link href="/manga" className="text-gray-600 hover:text-gray-900">Manga</Link>
              {isAdmin(profile.role) && (
                <Link href="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
              )}
              <Link href="/compte" className="font-medium text-indigo-600 hover:text-indigo-700">
                {profile.pseudo}
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">Connexion</Link>
              <Link
                href="/auth/register"
                className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
