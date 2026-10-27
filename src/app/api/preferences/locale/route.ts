import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isLocale, localeCookie } from '@/lib/localization/config';

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  }
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > 128) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
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
