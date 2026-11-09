import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { loadLearningSummary } from '@/lib/learning/unified-progress.server';

export const runtime = 'nodejs';
export async function GET() {
  const headers = { 'Cache-Control': 'private, no-store, max-age=0', Vary: 'Cookie' };
  const session = await auth();
  if (!session.userId) return NextResponse.json({ error: 'authentication_required' }, { status: 401, headers });
  try { return NextResponse.json(await loadLearningSummary(session.userId), { headers }); }
  catch { return NextResponse.json({ error: 'learning_unavailable' }, { status: 503, headers }); }
}
