import 'server-only';
import type { Locale } from './config';
import { registerSupplementalMessages, type SupplementalMessages } from './messages';

const loaders: Record<Locale, () => Promise<{ default: SupplementalMessages }>> = {
  en: () => import('../../../public/locales/en.json'),
  'pt-BR': () => import('../../../public/locales/pt-BR.json'),
  es: () => import('../../../public/locales/es.json'),
  fr: () => import('../../../public/locales/fr.json'),
  de: () => import('../../../public/locales/de.json'),
  it: () => import('../../../public/locales/it.json'),
};
const academyLoaders: typeof loaders = {
  en: () => import('../../../public/locales/academy/en.json'),
  'pt-BR': () => import('../../../public/locales/academy/pt-BR.json'),
  es: () => import('../../../public/locales/academy/es.json'),
  fr: () => import('../../../public/locales/academy/fr.json'),
  de: () => import('../../../public/locales/academy/de.json'),
  it: () => import('../../../public/locales/academy/it.json'),
};
const cache = new Map<Locale, Promise<SupplementalMessages>>();
export function getSupplementalMessages(locale: Locale): Promise<SupplementalMessages> {
  const existing = cache.get(locale);
  if (existing) return existing;
  const loading = Promise.all([loaders[locale](), academyLoaders[locale]()]).then(([base, academy]) => {
    const entries = { ...base.default, ...academy.default };
    registerSupplementalMessages(locale, entries);
    return entries;
  });
  cache.set(locale, loading);
  return loading;
}
