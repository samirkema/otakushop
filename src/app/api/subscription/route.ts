import { NextResponse } from 'next/server';

// POST /api/subscription/activate — activation par code
// TODO Phase 4 : hash argon2/bcrypt côté serveur + rate-limiting par IP et compte
export async function POST() {
  return NextResponse.json(
    { mock: true, message: 'Activation par code disponible en Phase 4' },
    { status: 501 },
  );
}
