export const locales = ['en', 'pt-BR', 'es', 'fr', 'de', 'it'] as const;
export type Locale = typeof locales[number];
export const localeCookie = 'tgpi_locale';
export const localeOptions = [
  { code: 'en', name: 'English', profileName: 'English', iso2: 'us', flag: '/images/country-flags/us.svg' },
  { code: 'pt-BR', name: 'Português', profileName: 'Portuguese', iso2: 'br', flag: '/images/country-flags/br.svg' },
  { code: 'es', name: 'Español', profileName: 'Spanish', iso2: 'es', flag: '/images/country-flags/es.svg' },
  { code: 'fr', name: 'Français', profileName: 'French', iso2: 'fr', flag: '/images/country-flags/fr.svg' },
  { code: 'de', name: 'Deutsch', profileName: 'German', iso2: 'de', flag: '/images/country-flags/de.svg' },
  { code: 'it', name: 'Italiano', profileName: 'Italian', iso2: 'it', flag: '/images/country-flags/it.svg' },
] as const satisfies readonly { code: Locale; name: string; profileName: string; iso2: string; flag: string }[];
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}
export function resolveLocale(value: unknown): Locale | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  const match = localeOptions.find(option => option.code.toLowerCase() === normalized || option.name.toLowerCase() === normalized || option.profileName.toLowerCase() === normalized)?.code
  const primary = normalized.split('-')[0];
  return match ?? (primary === 'pt' ? 'pt-BR' : isLocale(primary) ? primary : undefined);
}
export function negotiateLocale(header: string | null): Locale {
  const candidates = (header ?? '').split(',').flatMap((part, index) => {
    const match = /^([a-z]{2,8}(?:-[a-z\d]{1,8})*)(?:\s*;\s*q\s*=\s*(0(?:\.\d{0,3})?|1(?:\.0{0,3})?))?$/i.exec(part.trim());
    if (!match) return [];
    const [, language, quality] = match;
    const primary = language.toLowerCase().split('-')[0];
    const locale = primary === 'pt' ? 'pt-BR' : primary;
    if (!isLocale(locale)) return [];
    return [{ locale, weight: quality === undefined ? 1 : Number(quality), index }];
  });
  return candidates.filter(item => item.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index)[0]?.locale ?? 'en';
}
