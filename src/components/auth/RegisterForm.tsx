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
      <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center">
        <p className="text-green-800 font-medium">Vérifiez votre boîte mail !</p>
        <p className="text-green-700 text-sm mt-2">
          Un lien de vérification a été envoyé à <strong>{email}</strong>.
          Cliquez dessus pour activer votre compte.
        </p>
      </div>
    );
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hide} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Créer mon compte
        </Button>

        <p className="text-center text-sm text-gray-500">
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="text-indigo-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </form>
    </>
  );
}
