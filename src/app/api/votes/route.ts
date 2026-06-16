import { NextResponse } from 'next/server';

// POST /api/votes — voter pour un remix (abonnés, 1 vote par photo_id)
// TODO Phase 7

export async function POST() {
  return NextResponse.json({ mock: true, message: 'Votes disponibles en Phase 7' }, { status: 501 });
}
