'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Toast, useToast } from '@/components/ui/Toast';

export function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();
  const { toast, show, hide } = useToast();

  const [email, setEmail]       = useState('');
  const [pseudo, setPseudo]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { pseudo },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      show(error.message, 'error');
      setLoading(false);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div style={{ background: 'rgba(0,242,255,0.05)', border: '1px solid rgba(0,242,255,0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#00f2ff', fontWeight: 600, marginBottom: '8px' }}>Vérifiez votre boîte mail !</p>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>
          Un lien de vérification a été envoyé à <strong style={{ color: '#aaa' }}>{email}</strong>.
          Cliquez dessus pour activer votre compte.
        </p>
      </div>
    );
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hide} />}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="pseudo" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#888', marginBottom: '6px' }}>
            Pseudo
          </label>
          <input
            id="pseudo"
            type="text"
            required
            minLength={2}
            maxLength={32}
            autoComplete="username"
            value={pseudo}
            onChange={e => setPseudo(e.target.value)}
            placeholder="VotrePseudo"
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #2a2a2a', padding: '10px 12px', fontSize: '0.875rem' }}
          />
        </div>

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
          <label htmlFor="password" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#888', marginBottom: '6px' }}>
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="8 caractères minimum"
            style={{ width: '100%', borderRadius: '8px', border: '1px solid #2a2a2a', padding: '10px 12px', fontSize: '0.875rem' }}
          />
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Créer mon compte
        </Button>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555' }}>
          Déjà un compte ?{' '}
          <Link href="/auth/login" style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 600 }}>
            Se connecter
          </Link>
        </p>
      </form>
    </>
  );
}
