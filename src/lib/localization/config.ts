export const locales = ['en', 'pt-BR', 'es', 'fr', 'de', 'it'] as const;
export type Locale = typeof locales[number];
export const localeCookie = 'tgpi_locale';
export const localeOptions = [
  { code: 'en', name: 'English', profileName: 'English', flag: '/images/flags/us.svg' },
  { code: 'pt-BR', name: 'Português', profileName: 'Portuguese', flag: '/images/flags/br.svg' },
  { code: 'es', name: 'Español', profileName: 'Spanish', flag: '/images/flags/es.svg' },
  { code: 'fr', name: 'Français', profileName: 'French', flag: '/images/flags/fr.svg' },
  { code: 'de', name: 'Deutsch', profileName: 'German', flag: '/images/flags/de.svg' },
  { code: 'it', name: 'Italiano', profileName: 'Italian', flag: '/images/flags/it.svg' },
] as const satisfies readonly { code: Locale; name: string; profileName: string; flag: string }[];
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}
export function resolveLocale(value: unknown): Locale | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  return localeOptions.find(option => option.code.toLowerCase() === normalized || option.name.toLowerCase() === normalized || option.profileName.toLowerCase() === normalized)?.code
    ?? ({ en: 'en', pt: 'pt-BR', es: 'es', fr: 'fr', de: 'de', it: 'it' } as Record<string, Locale>)[normalized.split('-')[0]];
}
export function negotiateLocale(header: string | null): Locale {
  return (header ?? '').split(',').map((part, index) => {
    const [language, ...parameters] = part.trim().split(';');
    const quality = parameters.find(parameter => parameter.trim().startsWith('q='));
    const weight = quality ? Number(quality.trim().slice(2)) : 1;
    return { locale: resolveLocale(language), weight, index };
  }).filter(item => item.locale && Number.isFinite(item.weight) && item.weight > 0 && item.weight <= 1)
    .sort((a, b) => b.weight - a.weight || a.index - b.index)[0]?.locale ?? 'en';
}
