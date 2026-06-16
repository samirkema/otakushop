import { NextResponse } from 'next/server';

// POST /api/upload — upload vers Supabase Storage + pipeline optimisation WebP
// TODO Phase 5 : vérif admin, conversion WebP, génération thumbnails, stockage

export async function POST() {
  return NextResponse.json({ mock: true, message: 'Upload disponible en Phase 5' }, { status: 501 });
}
