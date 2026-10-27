'use client';

import { createContext, useContext, useCallback, useMemo, useRef, useState, useEffect, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { type Locale, resolveLocale } from '@/lib/localization/config';
import { translate } from '@/lib/localization/messages';

type LocaleContextValue = {
  locale: Locale;
  pending: boolean;
  error: boolean;
  changeLocale: (locale: Locale) => Promise<void>;
  t: (key: string, values?: Record<string, string | number>) => string;
};
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const router = useRouter();
  const [refreshing, startTransition] = useTransition();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const inFlight = useRef(false);
  const changeLocale = useCallback(async (next: Locale) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setError(false);
    try {
      const response = await fetch('/api/preferences/locale', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ locale: next }),
      });
      if (!response.ok) throw new Error('Locale preference could not be saved');
      startTransition(() => router.refresh());
    } catch {
      setError(true);
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }, [router]);
  const value = useMemo(() => ({ locale, pending: pending || refreshing, error, changeLocale, t: (key: string, values?: Record<string, string | number>) => translate(locale, key, values) }), [locale, pending, refreshing, error, changeLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale requires LocaleProvider');
  return value;
}

/** Restore an explicit account choice once per signed-in identity, including a new device. */
export function AccountLocaleSync() {
  const { user, isLoaded } = useUser();
  const { locale, changeLocale } = useLocale();
  const synced = useRef<string | null>(null);
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { synced.current = null; return; }
    if (synced.current === user.id) return;
    synced.current = user.id;
    const saved = resolveLocale(user.unsafeMetadata.tgpiLocale);
    if (saved && saved !== locale) void changeLocale(saved);
  }, [isLoaded, user, locale, changeLocale]);
  return null;
}

export function LocalizedText({ text }: { text: string }) {
  const { t } = useLocale();
  return <>{t(text)}</>;
}
