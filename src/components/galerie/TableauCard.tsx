import Image from 'next/image';
import type { Database } from '@/lib/supabase/types';

type TableauRow = Pick<
  Database['public']['Tables']['tableaux']['Row'],
  'id' | 'title' | 'description' | 'artist' | 'thumbnail' | 'price_eur' | 'available'
>;

export function TableauCard({ tableau }: { tableau: TableauRow }) {
  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={tableau.thumbnail}
          alt={tableau.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!tableau.available && (
          <span className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
              Vendu
            </span>
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{tableau.title}</h3>
        {tableau.artist && (
          <p className="text-xs text-gray-500 mt-0.5">{tableau.artist}</p>
        )}
        {tableau.description && (
          <p className="mt-2 text-xs text-gray-500 line-clamp-2">{tableau.description}</p>
        )}
        {tableau.price_eur != null && (
          <p className="mt-3 text-sm font-semibold text-indigo-600">
            {tableau.price_eur.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
        )}
      </div>
    </article>
  );
}
