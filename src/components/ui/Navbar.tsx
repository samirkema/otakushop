import Link from 'next/link';
import { getProfile } from '@/lib/auth';
import { isAdmin, isSubscriber } from '@/lib/roles';

export async function Navbar() {
  const profile = await getProfile();
  const subscribed = isSubscriber(profile?.subscription_tier ?? null, profile?.subscription_expires_at ?? null);

  return (
    <nav style={{
      background: '#111',
      borderBottom: '2px solid rgba(0,242,255,0.3)',
      boxShadow: '0 0 15px rgba(0,242,255,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          color: '#00f2ff',
          textDecoration: 'none',
          textShadow: '0 0 10px rgba(0,242,255,0.5)',
          letterSpacing: '3px',
        }}>
          OTAKU SHOP
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.875rem' }}>
          <Link href="/galerie" style={{ color: '#aaa', textDecoration: 'none' }}
            className="hover:text-white transition-colors">Galerie</Link>
          <Link href="/aide" style={{ color: '#aaa', textDecoration: 'none' }}
            className="hover:text-white transition-colors">Aide</Link>

          {profile ? (
            <>
              {subscribed && (
                <>
                  <Link href="/manga" style={{ color: '#aaa', textDecoration: 'none' }}
                    className="hover:text-white transition-colors">Manga</Link>
                  <Link href="/jeux" style={{ color: '#aaa', textDecoration: 'none' }}
                    className="hover:text-white transition-colors">Jeux</Link>
                </>
              )}
              {isAdmin(profile.role) && (
                <Link href="/admin" style={{ color: '#aaa', textDecoration: 'none' }}
                  className="hover:text-white transition-colors">Admin</Link>
              )}
              <Link href="/compte" style={{
                color: '#00f2ff',
                textDecoration: 'none',
                fontWeight: 600,
                textShadow: '0 0 8px rgba(0,242,255,0.4)',
              }}>
                {profile.pseudo}
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" style={{ color: '#aaa', textDecoration: 'none' }}
                className="hover:text-white transition-colors">Connexion</Link>
              <Link href="/auth/register" style={{
                background: 'transparent',
                border: '1.5px solid #00f2ff',
                color: '#00f2ff',
                padding: '6px 16px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}>
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
