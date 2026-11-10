import 'server-only';
import { cache } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { cookies, headers } from 'next/headers';
import { isLocale, localeCookie, negotiateLocale } from './config';
import { preferredLocale } from './preference';
import { getSupplementalMessages } from './catalog.server';

/** Resolve a request using account metadata already available to the caller. */
export async function getLocaleForAccount(accountLocale?: unknown) {
  const cookieValue = (await cookies()).get(localeCookie)?.value;
  const fallback = negotiateLocale((await headers()).get('accept-language'));
  const locale = preferredLocale(accountLocale, cookieValue, fallback);
  await getSupplementalMessages(locale);
  return locale;
}

/** Resolve once per render so metadata, layouts and server pages use the same locale. */
export const getLocale = cache(async () => {
  // A saved device choice avoids stale identity metadata and an unnecessary Clerk request.
  const selected = (await cookies()).get(localeCookie)?.value;
  if (isLocale(selected)) { await getSupplementalMessages(selected); return selected; }
  const user = await currentUser().catch(() => null);
  return getLocaleForAccount(user?.unsafeMetadata.tgpiLocale);
});
