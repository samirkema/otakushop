'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Toast, useToast } from '@/components/ui/Toast';

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const { toast, show, hide } = useToast();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Aiguillage UX : si l'email se termine par _admin, on extrait l'email réel.
    // L'autorisation reste fondée sur le rôle en BDD — jamais sur ce suffixe.
    const isAdminHint = email.endsWith('_admin');
    const realEmail   = isAdminHint ? email.slice(0, -6) : email;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: realEmail,
      password,
    });

    if (error) {
      show(error.message, 'error');
      setLoading(false);
      return;
    }

    if (!data.session) {
      show('Connexion échouée, veuillez réessayer.', 'error');
      setLoading(false);
      return;
    }

    // Récupère le rôle pour l'aiguillage post-connexion
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.session.user.id)
      .single();

    const profileRole = (profile as { role?: string } | null)?.role;
    if (isAdminHint && (profileRole === 'admin' || profileRole === 'superadmin')) {
      router.push('/admin');
    } else {
      router.push('/');
    }

    router.refresh();
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hide} />}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#888', marginBottom: '6px' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #2a2a2a', padding: '10px 12px', fontSize: '0.875rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label htmlFor="password" style={{ fontSize: '0.8rem', fontWeight: 500, color: '#888' }}>
              Mot de passe
            </label>
            <Link href="/auth/reset-password" style={{ fontSize: '0.75rem', color: '#00f2ff', textDecoration: 'none' }}>
              Mot de passe oublié ?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #2a2a2a', padding: '10px 12px', fontSize: '0.875rem' }}
          />
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Se connecter
        </Button>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555' }}>
          Pas encore de compte ?{' '}
          <Link href="/auth/register" style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 600 }}>
            S&apos;inscrire
          </Link>
        </p>
      </form>
    </>
  );
}
