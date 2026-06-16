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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <Link href="/auth/reset-password" className="text-xs text-indigo-600 hover:underline">
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Se connecter
        </Button>

        <p className="text-center text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <Link href="/auth/register" className="text-indigo-600 hover:underline font-medium">
            S&apos;inscrire
          </Link>
        </p>
      </form>
    </>
  );
}
