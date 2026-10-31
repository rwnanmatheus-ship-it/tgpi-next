import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isLocale, localeCookie } from '@/lib/localization/config';

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  }
  const declaredSize = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredSize) && declaredSize > 128) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 128) {
        await reader.cancel();
        return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
      }
      chunks.push(value);
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const raw = new TextDecoder().decode(bytes);
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const locale = value && typeof value === 'object' && 'locale' in value ? value.locale : undefined;
  if (!isLocale(locale)) return NextResponse.json({ error: 'Unsupported locale' }, { status: 400 });
  try {
    const { userId } = await auth();
    if (userId) {
      const client = await clerkClient();
      // Clerk deep-merges this single preference; identity, enrollment and billing stay untouched.
      await client.users.updateUserMetadata(userId, { unsafeMetadata: { tgpiLocale: locale } });
    }
    const response = NextResponse.json({ locale });
    response.headers.set('Cache-Control', 'private, no-store');
    response.cookies.set(localeCookie, locale, { httpOnly: true, sameSite: 'lax', secure: new URL(request.url).protocol === 'https:', path: '/', maxAge: 31536000 });
    return response;
  } catch {
    return NextResponse.json({ error: 'Unable to save locale' }, { status: 503 });
  }
}
