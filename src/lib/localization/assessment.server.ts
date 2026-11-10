import 'server-only';
import type { Locale } from './config';
import entries from './assessment-messages.json';

const catalog: Readonly<Record<string, Readonly<Record<Locale, string>>>> = entries;
/** Called only after the normal route has authorized disclosure of this question/feedback. */
export function assessmentTranslations(source: string): Readonly<Record<Locale, string>> {
  return catalog[source.replace(/\s+/g, ' ').trim()] ?? { en: source, 'pt-BR': source, es: source, fr: source, de: source, it: source };
}
