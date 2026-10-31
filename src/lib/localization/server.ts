import 'server-only';
import { cache } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { cookies, headers } from 'next/headers';
import { localeCookie, negotiateLocale } from './config';
import { preferredLocale } from './preference';

/** Resolve once per render so metadata, layouts and server pages use the same locale. */
export const getLocale = cache(async () => {
  const cookieValue = (await cookies()).get(localeCookie)?.value;
  const fallback = negotiateLocale((await headers()).get('accept-language'));
  try {
    const user = await currentUser();
    return preferredLocale(user?.unsafeMetadata.tgpiLocale, cookieValue, fallback);
  } catch {
    // Existing guest browsing remains available if the account provider is unreachable.
    return preferredLocale(undefined, cookieValue, fallback);
  }
});
