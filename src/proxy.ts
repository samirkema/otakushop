import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, isSubscriber } from '@/lib/roles';
import type { Database } from '@/lib/supabase/types';

export async function proxy(req: NextRequest) {
  const res = NextResponse.next({ request: req });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options),
          ),
      },
    },
  );

  // getUser() revalide le JWT auprès de Supabase Auth à chaque requête.
  // Ne jamais utiliser getSession() pour une décision d'autorisation — usurpable.
  const { data: { user } } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;
  const needsSubscriber = ['/manga', '/jeux', '/my-remix'].some(r => path.startsWith(r));
  const needsAdmin = path.startsWith('/admin');

  if ((needsSubscriber || needsAdmin) && !user) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (needsSubscriber || needsAdmin) {
    const { data } = await supabase
      .from('profiles')
      .select('role, subscription_tier, subscription_expires_at')
      .eq('id', user!.id)
      .single();

    type ProfileRow = {
      role: import('@/lib/supabase/types').Role;
      subscription_tier: import('@/lib/supabase/types').SubscriptionTier;
      subscription_expires_at: string | null;
    };
    const profile = data as ProfileRow | null;

    if (needsAdmin && !isAdmin(profile?.role)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (needsSubscriber && !needsAdmin) {
      const active = isSubscriber(profile?.subscription_tier, profile?.subscription_expires_at);
      if (!active) return NextResponse.redirect(new URL('/compte', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/manga/:path*', '/jeux/:path*', '/my-remix/:path*', '/admin/:path*'],
};
