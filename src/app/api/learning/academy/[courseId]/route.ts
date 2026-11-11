import { NextResponse } from 'next/server';
import { requireApiUser, TgpiAuthenticationError } from '@/lib/auth/guards';
import { FirestoreAdminError } from '@/lib/firestore-admin-rest.server';
import { academyStatus, mutateAcademy, AcademyError } from '@/lib/learning/academy/service.server';
import { withAcademyTranslations } from '@/lib/localization/academy-assessment.server';
const headers = { 'Cache-Control': 'private, no-store, max-age=0', 'X-Content-Type-Options': 'nosniff', Vary: 'Cookie, X-TGPI-Session' };
export const runtime = 'nodejs';
function failure(error: unknown) {
  const status = error instanceof TgpiAuthenticationError ? 401 : error instanceof AcademyError ? error.status : error instanceof FirestoreAdminError ? 503 : error instanceof SyntaxError || error instanceof TypeError ? 400 : 500;
  const message = error instanceof AcademyError ? error.message : status === 401 ? 'Sign in to continue.' : status === 400 ? 'Invalid request.' : 'Secure learning is temporarily unavailable. Your confirmed work is preserved.';
  if (status === 500) console.error('Academy operation failed', error instanceof Error ? error.name : 'unknown');
  return NextResponse.json({ error: message }, { status, headers });
}
async function response(status: Awaited<ReturnType<typeof academyStatus>>, courseId: string) {
  return NextResponse.json(withAcademyTranslations(status, courseId), { headers });
}
export async function GET(request: Request, context: { params: Promise<{ courseId: string }> }) {
  try { const identity = await requireApiUser(request), { courseId } = await context.params; return await response(await academyStatus(identity, courseId, new URL(request.url).searchParams.get('edition') ?? undefined), courseId); }
  catch (error) { return failure(error); }
}
export async function POST(request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const identity = await requireApiUser(request), { courseId } = await context.params;
    const origin = request.headers.get('origin');
    if (!origin || new URL(origin).origin !== new URL(request.url).origin) throw new AcademyError('Request origin is not allowed.', 403);
    if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') throw new AcademyError('JSON content is required.', 415);
    const reader = request.body?.getReader(); if (!reader) throw new AcademyError('Request body is missing.');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 76000) { await reader.cancel(); throw new AcademyError('Request exceeds the allowed size.', 413); } chunks.push(value); }
    const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const input: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    return await response(await mutateAcademy(identity, courseId, input), courseId);
  } catch (error) { return failure(error); }
}
