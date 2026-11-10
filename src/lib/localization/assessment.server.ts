import 'server-only';
import { locales, type Locale } from './config';
import { translate } from './messages';
import entries from './assessment-messages.json';

const catalog: Readonly<Record<string, Readonly<Record<Locale, string>>>> = entries;
/** Called only after the normal route has authorized disclosure of this question/feedback. */
export function assessmentTranslations(source: string): Readonly<Record<Locale, string>> {
  return catalog[source.replace(/\s+/g, ' ').trim()] ?? Object.fromEntries(locales.map(locale => [locale, translate(locale, source)])) as Readonly<Record<Locale, string>>;
}
