import Link from 'next/link';

export const metadata = { title: 'Otaku Shop — Mangas, Webtoons & BD' };

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Bienvenue sur Otaku Shop
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
        Découvrez des milliers de mangas, webtoons et BD. Lisez en ligne, collectionnez des NFT, créez vos remixes.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/galerie"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Explorer la galerie
        </Link>
        <Link
          href="/auth/register"
          className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
        >
          Créer un compte
        </Link>
      </div>

      {/* Sections catalogue — remplies en Phase 2 */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        {[
          { label: 'Mangas', icon: '📖', desc: 'Lecture page par page des classiques et des perles rares.' },
          { label: 'Webtoons', icon: '📱', desc: 'Scroll vertical continu pour une immersion totale.' },
          { label: 'BD', icon: '🎨', desc: 'Bandes dessinées francophones et internationales.' },
        ].map(({ label, icon, desc }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-6">
            <span className="text-3xl">{icon}</span>
            <h2 className="font-semibold text-gray-900 mt-3 mb-1">{label}</h2>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
