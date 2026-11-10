'use client';

import { createContext, useContext, useCallback, useMemo, useRef, useState, useEffect, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { type Locale } from '@/lib/localization/config';
import { translate, registerSupplementalMessages, type SupplementalMessages } from '@/lib/localization/messages';
import { localeCatalogVersion } from '@/lib/localization/catalog-version';
import { localeSyncKey, readLocaleSignal } from '@/lib/localization/preference';

type LocaleContextValue = {
  locale: Locale;
  pending: boolean;
  error: boolean;
  changeLocale: (locale: Locale) => Promise<void>;
  t: (key: string, values?: Record<string, string | number>) => string;
};
const LocaleContext = createContext<LocaleContextValue | null>(null);

const loadedCatalogs = new Map<Locale, Promise<void>>();
async function ensureLocaleMessages(locale: Locale) {
  const cached = loadedCatalogs.get(locale);
  if (cached) return cached;
  const loading = fetch(`/locales/${locale}.json?v=${localeCatalogVersion}`).then(async response => {
    if (!response.ok) throw new Error('Language catalog unavailable');
    const entries: unknown = await response.json();
    if (!entries || typeof entries !== 'object' || Array.isArray(entries) || Object.values(entries).some(value => typeof value !== 'string')) throw new Error('Invalid language catalog');
    registerSupplementalMessages(locale, entries as SupplementalMessages);
  }).catch(error => { loadedCatalogs.delete(locale); throw error; });
  loadedCatalogs.set(locale, loading);
  return loading;
}

export function LocaleProvider({ locale, messages, children }: { locale: Locale; messages?: SupplementalMessages; children: ReactNode }) {
  // Initialize before descendants render so SSR and hydration share the same copy.
  if (messages) { registerSupplementalMessages(locale, messages); loadedCatalogs.set(locale, Promise.resolve()); }
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
      void ensureLocaleMessages(selected).then(() => {
        setAppliedLocale(selected);
        startTransition(() => router.refresh());
      }).catch(() => setError(true));
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
      await ensureLocaleMessages(next);
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

export function LocalizedText({ text, values, dates }: { text: ReactNode; values?: Record<string, string | number>; dates?: Record<string, string> }) {
  const { locale, t } = useLocale();
  const formattedDates = dates ? Object.fromEntries(Object.entries(dates).map(([key, value]) => [key, new Intl.DateTimeFormat(locale, { timeZone: 'UTC' }).format(new Date(value))])) : {};
  return <>{typeof text === 'string' ? t(text, { ...values, ...formattedDates }) : text}</>;
}

/** Keep landmark names localized without making a server composition await a locale. */
export function LocalizedRegion({ as: Tag, label, className, children }: { as: 'section' | 'nav' | 'div'; label: string; className?: string; children: ReactNode }) {
  const { t } = useLocale();
  return <Tag className={className} aria-label={t(label)}>{children}</Tag>;
}
