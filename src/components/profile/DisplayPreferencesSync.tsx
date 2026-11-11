'use client';

import { useEffect } from 'react';
import { displayEvent, displayStorageKey, readDisplayPreferences } from '@/lib/display-preferences';

/** Device-only presentation choices contain no account or personal data. */
export default function DisplayPreferencesSync() {
  useEffect(() => {
    const apply = () => {
      const prefs = readDisplayPreferences();
      const root = document.documentElement;
      root.dataset.tgpiMotion = prefs.reducedMotion ? 'reduced' : 'system';
      root.dataset.tgpiText = prefs.largerText ? 'large' : 'standard';
      root.dataset.tgpiFocus = prefs.strongerFocus ? 'strong' : 'standard';
    };
    const sync = (event: StorageEvent) => { if (event.key === displayStorageKey || event.key === null) apply(); };
    apply();
    window.addEventListener(displayEvent, apply);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(displayEvent, apply); window.removeEventListener('storage', sync); };
  }, []);
  return null;
}
