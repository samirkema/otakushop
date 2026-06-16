import { Suspense } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { SearchBar } from '@/components/catalogue/SearchBar';
import { WorkCard } from '@/components/catalogue/WorkCard';
import type { MangaKind, Database } from '@/lib/supabase/types';

type WorkRow = Pick<
  Database['public']['Tables']['manga_works']['Row'],
  'id' | 'title' | 'description' | 'cover_url' | 'kind' | 'views_count'
>;

export const metadata = { title: 'Otaku Shop — Mangas, Webtoons & BD' };

const KIND_SECTIONS: { kind: MangaKind; label: string; icon: string; desc: string }[] = [
  { kind: 'manga',   label: 'Mangas',   icon: '📖', desc: 'Lecture page par page des classiques et des perles rares.' },
  { kind: 'webtoon', label: 'Webtoons', icon: '📱', desc: 'Scroll vertical continu pour une immersion totale.' },
  { kind: 'bd',      label: 'BD',       icon: '🎨', desc: 'Bandes dessinées francophones et internationales.' },
];

// Construit le filtre .or() PostgREST de façon sécurisée :
// - supprime les chars spéciaux PostgREST `,()` qui brisent la syntaxe du filtre
// - échappe les wildcards ILIKE `%` et `_` pour qu'ils soient traités littéralement
function buildSearchOrFilter(q: string): string {
  // Supprime les chars PostgREST `,()` et les espaces (invalides dans un token wfts).
  // Échappe les wildcards ILIKE `%_\` pour qu'ils soient traités littéralement.
  const safe    = q.replace(/[(),\s]/g, '');
  const escaped = safe.replace(/[%_\\]/g, '\\$&');
  return `search_vector.wfts.${safe},title.ilike.%${escaped}%,description.ilike.%${escaped}%`;
}

async function CatalogueSection({
  kind,
  label,
  icon,
  desc,
  q,
}: {
  kind: MangaKind;
  label: string;
  icon: string;
  desc: string;
  q: string;
}) {
  const supabase = await createClient();

  const baseQuery = supabase
    .from('manga_works')
    .select('id, title, description, cover_url, kind, views_count')
    .eq('published', true)
    .eq('kind', kind)
    .order('views_count', { ascending: false })
    .limit(6);

  const { data: works, error } = await (
    q.length >= 3
      ? baseQuery.or(buildSearchOrFilter(q))
      : baseQuery
  );

  if (error) {
    console.error('[CatalogueSection] Supabase error:', error.message);
    return null;
  }

  const list = (works ?? []) as WorkRow[];
  if (!list.length) return null;

  return (
    <section aria-labelledby={`section-${kind}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 id={`section-${kind}`} className="text-xl font-bold text-gray-900">
          {icon} {label}
        </h2>
        <Link
          href={`/manga?kind=${kind}`}
          aria-label={`Voir tout les ${label}`}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Voir tout →
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {list.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}

async function SearchResults({ q }: { q: string }) {
  if (q.length < 3) return null;

  const supabase = await createClient();
  const { data: rawWorks, error } = await supabase
    .from('manga_works')
    .select('id, title, description, cover_url, kind, views_count')
    .eq('published', true)
    .or(buildSearchOrFilter(q))
    .order('views_count', { ascending: false })
    .limit(24);

  if (error) {
    console.error('[SearchResults] Supabase error:', error.message);
    return (
      <p className="text-red-500 text-center py-12">
        Une erreur est survenue lors de la recherche.
      </p>
    );
  }

  const works = (rawWorks ?? []) as WorkRow[];

  if (!works.length) {
    return (
      <p className="text-gray-500 text-center py-12">
        Aucun résultat pour &laquo;{q}&raquo;.
      </p>
    );
  }

  return (
    <section aria-label={`Résultats pour ${q}`}>
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {works.length} résultat{works.length > 1 ? 's' : ''} pour &laquo;{q}&raquo;
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQ } = await searchParams;
  const q = (rawQ ?? '').trim();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Otaku Shop
        </h1>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Mangas, webtoons et BD en streaming. Lisez en ligne, collectionnez des NFT.
        </p>
        <div className="flex justify-center">
          <Suspense fallback={null}>
            <SearchBar defaultValue={q} />
          </Suspense>
        </div>
      </div>

      {/* Résultats de recherche ou sections par catégorie */}
      <div className="space-y-14">
        {q.length >= 3 ? (
          <Suspense fallback={<p className="text-gray-400 text-center py-12">Recherche en cours…</p>}>
            <SearchResults q={q} />
          </Suspense>
        ) : (
          KIND_SECTIONS.map(({ kind, label, icon, desc }) => (
            <Suspense key={kind} fallback={
              <div className="h-64 rounded-xl bg-gray-100 animate-pulse" aria-hidden="true" />
            }>
              <CatalogueSection kind={kind} label={label} icon={icon} desc={desc} q={q} />
            </Suspense>
          ))
        )}
      </div>

      {/* CTA inscription */}
      <div className="mt-20 bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Accédez à tout le catalogue</h2>
        <p className="text-gray-500 mb-6">Abonnez-vous pour lire sans limite et débloquer les jeux et My Remix.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/auth/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Créer un compte
          </Link>
          <Link
            href="/club-vip"
            className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            Voir les offres
          </Link>
        </div>
      </div>
    </div>
  );
}
