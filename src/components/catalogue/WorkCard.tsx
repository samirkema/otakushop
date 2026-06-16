import Image from 'next/image';
import Link from 'next/link';
import type { Database } from '@/lib/supabase/types';

type WorkRow = Pick<
  Database['public']['Tables']['manga_works']['Row'],
  'id' | 'title' | 'description' | 'cover_url' | 'kind' | 'views_count'
>;

const KIND_LABEL: Record<string, string> = {
  manga:   'Manga',
  webtoon: 'Webtoon',
  bd:      'BD',
};

export function WorkCard({ work }: { work: WorkRow }) {
  return (
    <Link
      href={`/manga/${work.id}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[2/3] bg-gray-100">
        {work.cover_url ? (
          <Image
            src={work.cover_url}
            alt={work.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-5xl select-none">
            {work.kind === 'webtoon' ? '📱' : work.kind === 'bd' ? '🎨' : '📖'}
          </div>
        )}
        <span className="absolute top-2 left-2 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-0.5 rounded-full">
          {KIND_LABEL[work.kind] ?? work.kind}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {work.title}
        </h3>
        {work.description && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{work.description}</p>
        )}
        <p className="mt-2 text-xs text-gray-400">{work.views_count.toLocaleString('fr-FR')} vues</p>
      </div>
    </Link>
  );
}
