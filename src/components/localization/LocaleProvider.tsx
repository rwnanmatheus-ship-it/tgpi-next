'use client';

import { createContext, useContext, useCallback, useMemo, useRef, useState, useEffect, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { type Locale } from '@/lib/localization/config';
import { translate } from '@/lib/localization/messages';
import { localeSyncKey, readLocaleSignal } from '@/lib/localization/preference';

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
  const [appliedLocale, setAppliedLocale] = useState(locale);
  useEffect(() => { setAppliedLocale(locale); }, [locale]);
  useEffect(() => { document.documentElement.lang = appliedLocale; }, [appliedLocale]);
  useEffect(() => {
    const synchronize = (event: StorageEvent) => {
      if (event.key !== localeSyncKey) return;
      const selected = readLocaleSignal(event.newValue);
      if (!selected) return;
      setAppliedLocale(selected);
      startTransition(() => router.refresh());
    };
    window.addEventListener('storage', synchronize);
    return () => window.removeEventListener('storage', synchronize);
  }, [router]);
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
      setAppliedLocale(next);
      try { localStorage.setItem(localeSyncKey, JSON.stringify({ locale: next, at: Date.now() })); } catch { /* Storage may be unavailable in private browser modes. */ }
      startTransition(() => router.refresh());
    } catch {
      setError(true);
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }, [router]);
  const value = useMemo(() => ({ locale: appliedLocale, pending: pending || refreshing, error, changeLocale, t: (key: string, values?: Record<string, string | number>) => translate(appliedLocale, key, values) }), [appliedLocale, pending, refreshing, error, changeLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale requires LocaleProvider');
  return value;
}

/** Refresh on identity transitions; restoring a preference never writes stale SDK metadata. */
export function AccountLocaleSync() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const identity = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (!isLoaded) return;
    const next = user?.id ?? null;
    if (identity.current === next) return;
    const previous = identity.current;
    identity.current = next;
    if (previous !== undefined || next !== null) router.refresh();
  }, [isLoaded, user?.id, router]);
  return null;
}

export function LocalizedText({ text }: { text: string }) {
  const { t } = useLocale();
  return <>{t(text)}</>;
}
