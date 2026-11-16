import 'server-only';

import type { Locale } from './config';
import type { SupplementalMessages } from './messages';

const curricula: Record<Locale, () => Promise<{ default: SupplementalMessages }>> = {
  en: () => import('./academy-curricula/en.json'),
  'pt-BR': () => import('./academy-curricula/pt-BR.json'),
  es: () => import('./academy-curricula/es.json'),
  fr: () => import('./academy-curricula/fr.json'),
  de: () => import('./academy-curricula/de.json'),
  it: () => import('./academy-curricula/it.json'),
};

/** The full translation pack stays outside the public assets and root LocaleProvider. */
export async function getAcademyCurriculumMessages(locale: Locale) {
  return (await curricula[locale]()).default;
}
