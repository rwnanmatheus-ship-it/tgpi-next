export type SearchableCountry = { name: string; slug: string; iso2: string; iso3: string; region: string };
export const normalizeCountrySearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const names = ["en", "pt", "es", "fr", "de", "it"].map(locale => new Intl.DisplayNames([locale], { type: "region" }));
const aliases: Record<string, string[]> = { US: ["usa", "eua", "america"], GB: ["uk", "great britain", "inglaterra"], AE: ["uae", "emirados"], KR: ["coreia do sul"], CZ: ["czech republic", "republica tcheca"] };
export function countrySearchTerms(country: SearchableCountry): string[] {
  return [country.name, country.slug, country.iso2, country.iso3, ...names.map(n => n.of(country.iso2) ?? ""), ...(aliases[country.iso2] ?? [])].map(normalizeCountrySearch);
}
function editDistance(a: string, b: string) {
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) { const next = [i]; for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); row = next; }
  return row[b.length];
}
export function countrySearchScore(terms: string[], query: string): number {
  const q = normalizeCountrySearch(query); if (!q) return 1;
  if (terms.includes(q)) return 100;
  if (terms.some(t => t.startsWith(q))) return 80;
  if (terms.some(t => q.split(" ").every(word => t.includes(word)))) return 60;
  if (q.length >= 4 && terms.some(t => Math.abs(t.length - q.length) <= 2 && editDistance(t, q) <= (q.length > 7 ? 2 : 1))) return 30;
  return 0;
}

const displayNamesByLocale = new Map<string, Intl.DisplayNames>();
/** The same visible name drives sorting, prefix suggestions and result ranking. */
export function localizedCountryName(country: SearchableCountry, locale: string): string {
  try {
    let names = displayNamesByLocale.get(locale);
    if (!names) { names = new Intl.DisplayNames([locale], { type: "region" }); displayNamesByLocale.set(locale, names); }
    return names.of(country.iso2) || country.name;
  }
  catch { return country.name; }
}
export function localizedCountryScore(country: SearchableCountry, query: string, locale: string, terms = countrySearchTerms(country)): number {
  const q = normalizeCountrySearch(query);
  if (!q) return 1;
  const name = normalizeCountrySearch(localizedCountryName(country, locale));
  if (name === q) return 140;
  if (name.startsWith(q)) return 120;
  // A single letter means a prefix in the selected interface language, never an ISO/foreign alias.
  if (q.length === 1) return 0;
  return countrySearchScore(terms, query);
}
export function countrySuggestions<T extends SearchableCountry>(countries: T[], query: string, locale: string, limit = 7): T[] {
  const q = normalizeCountrySearch(query);
  if (!q) return [];
  return countries.filter(c => normalizeCountrySearch(localizedCountryName(c, locale)).startsWith(q))
    .sort((a, b) => localizedCountryName(a, locale).localeCompare(localizedCountryName(b, locale), locale))
    .slice(0, limit);
}
