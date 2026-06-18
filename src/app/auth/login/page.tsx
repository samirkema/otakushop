import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = { title: 'Connexion — Otaku Shop' };

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '6px', letterSpacing: '1px' }}>Connexion</h1>
          <p style={{ color: '#555', fontSize: '0.875rem' }}>Accédez à votre espace Otaku Shop</p>
        </div>
        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '32px' }}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
