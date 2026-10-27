import 'server-only';
import { cookies, headers } from 'next/headers';
import { isLocale, localeCookie, negotiateLocale } from './config';

export async function getLocale() {
  const selected = (await cookies()).get(localeCookie)?.value;
  return isLocale(selected) ? selected : negotiateLocale((await headers()).get('accept-language'));
}
