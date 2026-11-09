import 'server-only';
import { cache } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { cookies, headers } from 'next/headers';
import { localeCookie, negotiateLocale } from './config';
import { preferredLocale } from './preference';

/** Resolve a request using account metadata already available to the caller. */
export async function getLocaleForAccount(accountLocale?: unknown) {
  const cookieValue = (await cookies()).get(localeCookie)?.value;
  const fallback = negotiateLocale((await headers()).get('accept-language'));
  return preferredLocale(accountLocale, cookieValue, fallback);
}

/** Resolve once per render so metadata, layouts and server pages use the same locale. */
export const getLocale = cache(async () => {
  const user = await currentUser().catch(() => null);
  return getLocaleForAccount(user?.unsafeMetadata.tgpiLocale);
});
