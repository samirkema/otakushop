import { createClient } from '@/lib/supabase/server';
import { TableauCard } from '@/components/galerie/TableauCard';
import type { Database } from '@/lib/supabase/types';

type TableauRow = Pick<
  Database['public']['Tables']['tableaux']['Row'],
  'id' | 'title' | 'description' | 'artist' | 'thumbnail' | 'price_eur' | 'available'
>;

export const metadata = { title: 'Galerie — Otaku Shop' };

export default async function GaleriePage() {
  const supabase = await createClient();

  const { data: rawTableaux } = await supabase
    .from('tableaux')
    .select('id, title, description, artist, thumbnail, price_eur, available')
    .order('created_at', { ascending: false });

  const tableaux = (rawTableaux ?? []) as TableauRow[];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Galerie</h1>
      <p className="text-gray-500 mb-8">Découvrez et collectionnez nos œuvres originales.</p>

      {!tableaux.length ? (
        <p className="text-gray-400 text-center py-20">Aucune œuvre disponible pour l&apos;instant.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tableaux.map((tableau) => (
            <TableauCard key={tableau.id} tableau={tableau} />
          ))}
        </div>
      )}
    </div>
  );
}
