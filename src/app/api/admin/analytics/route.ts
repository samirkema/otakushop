import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/roles';

// GET /api/admin/analytics — TODO Phase 5 : vraies stats
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single();

  if (!isAdmin((profile as { role?: string } | null)?.role as import('@/lib/supabase/types').Role)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  // TODO Phase 5 : remplacer par de vraies requêtes analytiques
  return NextResponse.json({
    mock: true,
    message: 'Analytics disponibles en Phase 5',
    data: { users: 0, mangas: 0, revenue_eur: 0 },
  });
}
