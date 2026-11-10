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
const cache = new Map<Locale, Promise<SupplementalMessages>>();
export function getSupplementalMessages(locale: Locale): Promise<SupplementalMessages> {
  const existing = cache.get(locale);
  if (existing) return existing;
  const loading = loaders[locale]().then(module => {
    registerSupplementalMessages(locale, module.default);
    return module.default;
  });
  cache.set(locale, loading);
  return loading;
}
