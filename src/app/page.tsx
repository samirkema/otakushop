import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProfile } from '@/lib/auth';
import { isSubscriber } from '@/lib/roles';
import { createClient } from '@/lib/supabase/server';
import { WorkCard } from '@/components/catalogue/WorkCard';
import type { MangaKind, Database } from '@/lib/supabase/types';

export const metadata = { title: 'Otaku Shop — Mangas, Webtoons & BD' };

type WorkRow = Pick<
  Database['public']['Tables']['manga_works']['Row'],
  'id' | 'title' | 'description' | 'cover_url' | 'kind' | 'views_count'
>;

function buildSearchOrFilter(q: string): string {
  const safe    = q.replace(/[(),\s]/g, '');
  const escaped = safe.replace(/[%_\\]/g, '\\$&');
  return `search_vector.wfts.${safe},title.ilike.%${escaped}%,description.ilike.%${escaped}%`;
}

async function CatalogueSection({ kind, label, icon, q }: {
  kind: MangaKind; label: string; icon: string; q: string;
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
    q.length >= 3 ? baseQuery.or(buildSearchOrFilter(q)) : baseQuery
  );

  if (error || !works?.length) return null;

  const list = works as WorkRow[];

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>
          {icon} {label}
        </h2>
        <Link href={`/manga?kind=${kind}`} style={{ fontSize: '0.8rem', color: '#00f2ff', textDecoration: 'none' }}>
          Voir tout →
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
        {list.map((work) => <WorkCard key={work.id} work={work} />)}
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

  if (error) return <p style={{ color: '#f87171', textAlign: 'center', padding: '40px 0' }}>Erreur lors de la recherche.</p>;

  const works = (rawWorks ?? []) as WorkRow[];
  if (!works.length) return (
    <p style={{ color: '#666', textAlign: 'center', padding: '40px 0' }}>
      Aucun résultat pour «{q}».
    </p>
  );

  return (
    <section>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
        {works.length} résultat{works.length > 1 ? 's' : ''} pour «{q}»
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
        {works.map((work) => <WorkCard key={work.id} work={work} />)}
      </div>
    </section>
  );
}

const ACTION_BOXES = [
  {
    id: 'galerie',
    href: '/galerie',
    icon: '/icons/galerie.png',
    title: 'GALERIE DE TABLEAUX',
    desc: 'Découvrez la collection complète et visualisez nos pièces.',
    color: '#00f2ff',
    requiresSub: false,
  },
  {
    id: 'manga',
    href: '/manga',
    icon: '/icons/manga.jpg',
    title: 'LIRE MANGA',
    desc: 'Accès illimité aux mangas, webtoons et BD.',
    color: '#00f2ff',
    requiresSub: true,
  },
  {
    id: 'jeux',
    href: '/jeux',
    icon: '/icons/jeux.png',
    title: 'IMMERSION',
    desc: 'Vivez l\'univers Otaku Shop à travers des jeux exclusifs.',
    color: '#00f2ff',
    requiresSub: true,
  },
  {
    id: 'aide',
    href: '/aide',
    icon: '/icons/aide.png',
    title: "BESOIN D'AIDE ?",
    desc: 'Tutoriel vidéo et guide complet de la plateforme.',
    color: '#00f2ff',
    requiresSub: false,
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQ } = await searchParams;
  const q = (rawQ ?? '').trim();

  const profile = await getProfile();
  const subscribed = isSubscriber(profile?.subscription_tier ?? null, profile?.subscription_expires_at ?? null);

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ textAlign: 'center', padding: '60px 20px 50px' }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          letterSpacing: '5px',
          color: '#00f2ff',
          textShadow: '0 0 20px #00f2ff',
          marginBottom: '12px',
        }}>
          BIENVENUE SUR OTAKU SHOP
        </h1>
        <p style={{ color: '#666', fontSize: '1rem', fontStyle: 'italic' }}>
          L&apos;art de la BD débloqué par la blockchain.
        </p>
      </div>

      {/* ── GRILLE D'ACTIONS ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 70px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {ACTION_BOXES.map((box) => {
            const locked = box.requiresSub && !subscribed;
            return (
              <div key={box.id} style={{
                background: 'rgba(17,17,17,0.9)',
                border: `2px solid ${locked ? '#1e1e1e' : 'rgba(0,242,255,0.4)'}`,
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: locked ? 0.6 : 1,
                boxShadow: locked ? 'none' : '0 0 12px rgba(0,242,255,0.1)',
              }}>
                <Link
                  href={locked ? '/compte' : box.href}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <Image
                      src={box.icon}
                      alt={box.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '20px 24px 16px' }}>
                    <h2 style={{
                      color: locked ? '#444' : '#00f2ff',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      marginBottom: '10px',
                    }}>
                      {box.title}
                    </h2>
                    <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {box.desc}
                    </p>
                  </div>
                </Link>
                {locked && (
                  <div style={{
                    margin: '0 24px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid #222',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                  }}>
                    <span style={{ color: '#555' }}>🔒 Réservé aux abonnés</span>
                    <Link href="/compte" style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 600 }}>
                      S&apos;abonner →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {/* MON COMPTE */}
          <div style={{
            background: 'rgba(17,17,17,0.9)',
            border: '2px solid rgba(168,85,247,0.4)',
            borderRadius: '20px',
            padding: '30px 24px',
            boxShadow: '0 0 12px rgba(168,85,247,0.1)',
          }}>
            <Link href="/compte" style={{ textDecoration: 'none', display: 'block' }}>
              <h2 style={{
                color: '#a855f7',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '2px',
                marginBottom: '10px',
              }}>
                {profile ? `👤 ${profile.pseudo.toUpperCase()}` : 'MON COMPTE'}
              </h2>
              <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {profile && subscribed
                  ? '⭐ Abonnement actif — gérer mon profil'
                  : profile
                  ? 'Gérez votre profil et activez votre abonnement.'
                  : 'Créez un compte ou connectez-vous pour accéder à tout le contenu.'}
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ── CATALOGUE DÉCOUVERTE ── */}
      <div style={{
        background: '#0a0a0a',
        borderTop: '1px solid #1e1e1e',
        padding: '60px 20px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '3px',
            marginBottom: '8px',
          }}>
            CATALOGUE
          </h2>
          <p style={{ textAlign: 'center', color: '#555', fontSize: '0.85rem', marginBottom: '40px' }}>
            Parcourez nos mangas, webtoons et BD
          </p>

          {/* Barre de recherche */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <form style={{ width: '100%', maxWidth: '480px' }}>
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Rechercher un titre…"
                style={{
                  width: '100%',
                  background: '#111',
                  border: '1px solid #2a2a2a',
                  borderRadius: '30px',
                  padding: '12px 20px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {q.length >= 3 ? (
              <Suspense fallback={<p style={{ color: '#555', textAlign: 'center' }}>Recherche en cours…</p>}>
                <SearchResults q={q} />
              </Suspense>
            ) : (
              <>
                <Suspense fallback={<div style={{ height: '200px', background: '#111', borderRadius: '12px' }} />}>
                  <CatalogueSection kind="manga" label="Mangas" icon="📖" q={q} />
                </Suspense>
                <Suspense fallback={<div style={{ height: '200px', background: '#111', borderRadius: '12px' }} />}>
                  <CatalogueSection kind="webtoon" label="Webtoons" icon="📱" q={q} />
                </Suspense>
                <Suspense fallback={<div style={{ height: '200px', background: '#111', borderRadius: '12px' }} />}>
                  <CatalogueSection kind="bd" label="BD" icon="🎨" q={q} />
                </Suspense>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
