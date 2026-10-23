export type SearchableCountry = { name: string; slug: string; iso2: string; iso3: string; region: string };
export const normalizeCountrySearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
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
