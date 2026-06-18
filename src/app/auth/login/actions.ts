'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function loginAction(_prev: { error: string } | null, formData: FormData) {
  const email    = ((formData.get('email')    as string) ?? '').trim();
  const password =  (formData.get('password') as string) ?? '';

  const isAdminHint = email.endsWith('_admin');
  const realEmail   = isAdminHint ? email.slice(0, -6) : email;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email: realEmail, password });

  if (error) return { error: error.message };

  if (isAdminHint) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user!.id)
      .single();
    const role = (profile as { role?: string } | null)?.role;
    if (role === 'admin' || role === 'superadmin') redirect('/admin');
  }

  redirect('/');
}
