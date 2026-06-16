import { NextResponse } from 'next/server';

// GET  /api/remixes — liste des remixes publics
// POST /api/remixes — créer un remix (abonnés uniquement)
// TODO Phase 7 : implémentation complète

export async function GET() {
  return NextResponse.json({ mock: true, data: [], message: 'Remixes disponibles en Phase 7' });
}

export async function POST() {
  return NextResponse.json({ mock: true, message: 'Création remix disponible en Phase 7' }, { status: 501 });
}
