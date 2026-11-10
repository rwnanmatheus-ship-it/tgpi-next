import { isLocale, resolveLocale, type Locale } from './config';

export const localeSyncKey = 'tgpi:locale:changed';

/** An explicit choice on this device wins; the account restores it on a new device. */
export function preferredLocale(accountValue: unknown, cookieValue: unknown, fallback: Locale): Locale {
  return (isLocale(cookieValue) ? cookieValue : undefined) ?? resolveLocale(accountValue) ?? fallback;
}

/** Storage events carry a language only, never identity or profile information. */
export function readLocaleSignal(raw: string | null): Locale | undefined {
  if (!raw || raw.length > 128) return undefined;
  try {
    const value: unknown = JSON.parse(raw);
    return value && typeof value === 'object' && 'locale' in value && isLocale(value.locale) ? value.locale : undefined;
  } catch { return undefined; }
}
