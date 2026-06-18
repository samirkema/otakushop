import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProfile } from '@/lib/auth';
import { isSubscriber } from '@/lib/roles';

export const metadata = { title: 'Immersion — Otaku Shop' };

export default async function JeuxPage() {
  const profile = await getProfile();
  if (!profile || !isSubscriber(profile.subscription_tier, profile.subscription_expires_at)) {
    redirect('/compte');
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* HERO */}
      <div style={{ textAlign: 'center', padding: '60px 20px 50px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(168,85,247,0.15)',
          color: '#a855f7',
          border: '1px solid rgba(168,85,247,0.4)',
          padding: '5px 18px',
          borderRadius: '20px',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '2px',
          marginBottom: '20px',
          boxShadow: '0 0 12px rgba(168,85,247,0.2)',
        }}>
          ZONE IMMERSION
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.2rem)',
          letterSpacing: '5px',
          color: '#fff',
          marginBottom: '18px',
          textShadow: '0 0 30px rgba(0,242,255,0.15)',
        }}>
          IMMERSION TOTALE
        </h1>

        <div style={{ width: '80px', height: '2px', background: '#00f2ff', margin: '0 auto 20px', boxShadow: '0 0 10px #00f2ff' }} />

        <p style={{ color: '#666', maxWidth: '480px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
          Exprimez votre talent, affrontez la communauté et vivez l&apos;univers Otaku Shop.
        </p>
      </div>

      {/* GRILLE JEUX */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>

          {/* MY REMIX */}
          <Link href="/my-remix" style={{ textDecoration: 'none', color: '#fff' }}>
            <div style={{
              background: '#0d0d0d',
              border: '1px solid #1e1e1e',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
            }}
              className="game-card"
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative', background: '#050510' }}>
                <Image
                  src="/icons/my-remix.png"
                  alt="My Remix"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '18px 18px 12px' }}>
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  marginBottom: '10px',
                  background: 'rgba(0,242,255,0.1)',
                  color: '#00f2ff',
                  border: '1px solid rgba(0,242,255,0.25)',
                }}>
                  DISPONIBLE
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '2px', margin: '0 0 8px' }}>
                  MY REMIX
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.5, margin: '0 0 14px' }}>
                  Dessinez sur nos photos, soumettez votre photomontage et votez pour les meilleures créations.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['🎨 Photomontage', '⚡ Vote communauté'].map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.72rem',
                      color: '#555',
                      background: '#111',
                      border: '1px solid #222',
                      padding: '3px 10px',
                      borderRadius: '20px',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{
                padding: '12px 18px',
                borderTop: '1px solid #1e1e1e',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '1px',
                color: '#00f2ff',
              }}>
                JOUER →
              </div>
            </div>
          </Link>

          {/* À VENIR */}
          <div style={{
            background: '#0d0d0d',
            border: '1px solid #1a1a1a',
            borderRadius: '16px',
            overflow: 'hidden',
            opacity: 0.5,
          }}>
            <div style={{
              height: '180px',
              background: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#2a2a2a',
              fontWeight: 900,
            }}>
              ?
            </div>
            <div style={{ padding: '18px 18px 12px' }}>
              <div style={{
                display: 'inline-block',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                padding: '3px 10px',
                borderRadius: '20px',
                marginBottom: '10px',
                background: 'rgba(80,80,80,0.15)',
                color: '#555',
                border: '1px solid #333',
              }}>
                BIENTÔT
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '2px', color: '#333', margin: '0 0 8px' }}>
                À VENIR
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.5 }}>
                Un nouveau jeu arrive dans la zone Immersion. Restez connectés.
              </p>
            </div>
            <div style={{
              padding: '12px 18px',
              borderTop: '1px solid #1a1a1a',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#333',
            }}>
              EN PRÉPARATION
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .game-card:hover {
          border-color: #00f2ff !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,242,255,0.15);
        }
      `}</style>
    </div>
  );
}
