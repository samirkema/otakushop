'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Toast, useToast } from '@/components/ui/Toast';

export default function ResetPasswordPage() {
  const supabase = createClient();
  const { toast, show, hide } = useToast();

  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    });

    if (error) {
      show(error.message, 'error');
      setLoading(false);
      return;
    }

    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
          <p className="text-gray-500 text-sm mt-1">
            Saisissez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {sent ? (
            <div className="text-center">
              <p className="text-green-700 font-medium">Email envoyé !</p>
              <p className="text-gray-500 text-sm mt-2">
                Vérifiez votre boîte mail. Le lien est valable 1 heure.
              </p>
              <Link href="/auth/login" className="mt-4 inline-block text-indigo-600 text-sm hover:underline">
                Retour à la connexion
              </Link>
            </div>
          ) : (
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <Button type="submit" loading={loading} className="w-full">
                  Envoyer le lien
                </Button>
                <p className="text-center text-sm">
                  <Link href="/auth/login" className="text-indigo-600 hover:underline">
                    Retour à la connexion
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
