'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  appearanceStorageKey, colorSchemeQuery, normalizeAppearance,
  resolveAppearance, themeColors, type AppearanceMode, type ColorScheme,
} from '@/lib/appearance';

const missingProvider = 'useAppearance requires AppearanceProvider';

const AppearanceContext = createContext<{
  mode: AppearanceMode;
  scheme: ColorScheme | null;
  ready: boolean;
  persisted: boolean;
  changeMode: (mode: AppearanceMode) => void;
} | null>(null);

function applyAppearance(mode: AppearanceMode, prefersDark: boolean) {
  const scheme = resolveAppearance(mode, prefersDark);
  document.documentElement.dataset.tgpiTheme = scheme;
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.content = themeColors[scheme];
  }
  return scheme;
}

export default function AppearanceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppearanceMode>('system');
  const [scheme, setScheme] = useState<ColorScheme | null>(null);
  const [persisted, setPersisted] = useState(true);
  const ready = scheme !== null;

  useEffect(() => {
    const media = window.matchMedia(colorSchemeQuery);
    const synchronize = () => {
      const next = normalizeAppearance(localStorage.getItem(appearanceStorageKey));
      setMode(next);
      setScheme(applyAppearance(next, media.matches));
      setPersisted(true);
    };
    const applyDefault = () => {
      setScheme(applyAppearance('system', media.matches));
      setPersisted(false);
    };
    try { synchronize(); } catch { applyDefault(); }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== appearanceStorageKey && event.key !== null) return;
      try { synchronize(); } catch { /* Keep the live choice if storage becomes unavailable. */ }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia(colorSchemeQuery);
    const onChange = () => setScheme(applyAppearance(mode, media.matches));
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [mode, ready]);

  function changeMode(next: AppearanceMode) {
    setMode(next);
    setScheme(applyAppearance(next, window.matchMedia(colorSchemeQuery).matches));
    try {
      localStorage.setItem(appearanceStorageKey, next);
      setPersisted(true);
    } catch { setPersisted(false); }
  }

  return <AppearanceContext.Provider value={{ mode, scheme, ready, persisted, changeMode }}>{children}</AppearanceContext.Provider>;
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) throw new Error(missingProvider);
  return context;
}
