export type SearchableCountry = {
  name: string;
  slug: string;
  iso2: string;
  iso3: string;
  region: string;
  /** Optional light metadata supplied by the server, never the full country dossier. */
  language?: string;
  capital?: string;
  subregion?: string;
  places?: readonly string[];
};

export const normalizeCountrySearch = (value: string) => value.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const locales = ["en", "pt", "es", "fr", "de", "it"];
const names = locales.map(locale => new Intl.DisplayNames([locale], { type: "region" }));
const languageNames = locales.map(locale => new Intl.DisplayNames([locale], { type: "language" }));
const aliases: Readonly<Record<string, string[]>> = {
  US: ["usa", "eua", "america", "united states of america"],
  GB: ["uk", "great britain", "inglaterra", "reino unido"],
  AE: ["uae", "emirados"], KR: ["coreia do sul", "south korea"],
  KP: ["coreia do norte", "north korea"], CZ: ["czech republic", "republica tcheca"],
  CI: ["ivory coast", "costa do marfim"], CV: ["cape verde", "cabo verde"],
  SZ: ["swaziland", "suazilandia"], TL: ["east timor", "timor leste"],
  VA: ["vatican", "holy see", "santa se"], MM: ["burma", "birmania"],
};
// Names already present in the country catalog, mapped only for multilingual discovery.
const languageCodes: Readonly<Record<string, string>> = {
  albanian: "sq", amharic: "am", arabic: "ar", armenian: "hy", azerbaijani: "az",
  belarusian: "be", bengali: "bn", bislama: "bi", bosnian: "bs", bulgarian: "bg",
  burmese: "my", catalan: "ca", chichewa: "ny", comorian: "swb", croatian: "hr",
  czech: "cs", danish: "da", dari: "prs", dhivehi: "dv", dutch: "nl", dzongkha: "dz",
  english: "en", estonian: "et", fijian: "fj", filipino: "fil", finnish: "fi", french: "fr",
  georgian: "ka", german: "de", gilbertese: "gil", greek: "el", guarani: "gn",
  "haitian creole": "ht", hebrew: "he", hindi: "hi", "hiri motu": "ho", hungarian: "hu",
  icelandic: "is", indonesian: "id", irish: "ga", italian: "it", japanese: "ja",
  kazakh: "kk", khmer: "km", kinyarwanda: "rw", kirundi: "rn", korean: "ko",
  kurdish: "ku", kyrgyz: "ky", lao: "lo", latin: "la", latvian: "lv", lithuanian: "lt",
  luxembourgish: "lb", macedonian: "mk", malagasy: "mg", malay: "ms", maltese: "mt",
  mandarin: "zh", "mandarin chinese": "zh", marshallese: "mh", mongolian: "mn",
  montenegrin: "sr-ME", maori: "mi", nauruan: "na", ndebele: "nd", nepali: "ne",
  norwegian: "no", palauan: "pau", pashto: "ps", persian: "fa", polish: "pl",
  portuguese: "pt", romanian: "ro", romansh: "rm", russian: "ru", samoan: "sm",
  sango: "sg", serbian: "sr", sesotho: "st", setswana: "tn", "seychellois creole": "crs",
  shona: "sn", sinhala: "si", slovak: "sk", slovene: "sl", somali: "so", spanish: "es",
  swahili: "sw", swazi: "ss", swedish: "sv", tajik: "tg", tamazight: "tzm", tamil: "ta",
  tetum: "tet", thai: "th", tigrinya: "ti", "tok pisin": "tpi", tongan: "to", turkish: "tr",
  turkmen: "tk", tuvaluan: "tvl", ukrainian: "uk", urdu: "ur", uzbek: "uz", vietnamese: "vi",
};
const regionCodes: Readonly<Record<string, string>> = {
  Africa: "002", Americas: "019", Asia: "142", Europe: "150", Oceania: "009",
  "Northern Africa": "015", "Sub-Saharan Africa": "202",
  "Northern America": "021", "Latin America and the Caribbean": "419",
  "Central Asia": "143", "Eastern Asia": "030", "South-eastern Asia": "035",
  "Southern Asia": "034", "Western Asia": "145", "Eastern Europe": "151",
  "Northern Europe": "154", "Southern Europe": "039", "Western Europe": "155",
  "Australia and New Zealand": "053", Melanesia: "054", Micronesia: "057", Polynesia: "061",
  "North America": "003", "South America": "005", "Central America": "013", Caribbean: "029",
};
const capitalAliases: Readonly<Record<string, string[]>> = {
  London: ["Londres", "Londra"], Berlin: ["Berlim", "Berlino", "Berlín"],
  Rome: ["Roma", "Rom"], Vienna: ["Viena", "Vienne", "Wien"],
  Brussels: ["Bruxelas", "Bruxelles", "Brüssel", "Bruselas"], Athens: ["Atenas", "Athènes", "Athen", "Atene"],
  Moscow: ["Moscou", "Moscú", "Moskau", "Mosca"], Warsaw: ["Varsóvia", "Varsovia", "Varsovie", "Warschau", "Varsavia"],
  Copenhagen: ["Copenhague", "Kopenhagen", "Copenaghen"], Stockholm: ["Estocolmo", "Stoccolma"],
  Lisbon: ["Lisboa", "Lisbonne", "Lissabon", "Lisbona"], Cairo: ["Cairo", "Le Caire", "Kairo"],
  Tokyo: ["Tóquio", "Tokio"], Beijing: ["Pequim", "Pekín", "Pékin", "Peking", "Pechino"],
  Seoul: ["Seul", "Séoul"], Pyongyang: ["Pionguiangue", "Pjöngjang"],
  "New Delhi": ["Nova Deli", "Nueva Delhi", "New Delhi", "Neu Delhi", "Nuova Delhi"],
  "Mexico City": ["Cidade do México", "Ciudad de México", "Mexico", "Mexiko Stadt", "Città del Messico"],
  "Washington, D.C.": ["Washington DC", "Washington"], Kyiv: ["Kiev", "Kiew"],
};
const stopWords = new Set([
  "country", "countries", "pais", "paises", "pays", "lander", "laender", "paese", "paesi",
  "language", "languages", "idioma", "idiomas", "langue", "langues", "sprache", "sprachen", "lingua", "lingue",
  "capital", "capitals", "capitais", "capitale", "capitali", "hauptstadt", "region", "regiao", "regioni",
  "in", "the", "of", "and", "with", "em", "na", "no", "nos", "nas", "de", "da", "do", "dos", "das", "com", "e",
  "en", "el", "la", "los", "las", "con", "y", "au", "aux", "du", "des", "dans", "avec", "et", "im", "mit", "und", "di", "con", "il", "lo", "gli",
]);

function translatedLanguages(language: string): string[] {
  return language.split(/\s*[/,&]\s*/).flatMap(part => {
    const code = languageCodes[normalizeCountrySearch(part)];
    return code ? [part, ...languageNames.map(display => display.of(code) ?? part), ...(code === "zh" ? ["mandarim", "mandarin", "mandarín", "chinese"] : [])] : [part];
  });
}

export function countrySearchTerms(country: SearchableCountry): string[] {
  const regions = [country.region, country.subregion ?? ""].flatMap(region => {
    const code = regionCodes[region];
    return code ? [region, ...names.map(display => display.of(code) ?? region)] : [region];
  });
  return [...new Set([
    country.name, country.slug, country.iso2, country.iso3, country.capital ?? "",
    ...(capitalAliases[country.capital ?? ""] ?? []),
    ...names.map(display => display.of(country.iso2) ?? ""), ...(aliases[country.iso2] ?? []),
    ...(country.places ?? []), ...regions, ...translatedLanguages(country.language ?? ""),
  ].map(normalizeCountrySearch).filter(Boolean))];
}

function editDistance(a: string, b: string): number {
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    row = next;
  }
  return row[b.length];
}
function closeSpelling(a: string, b: string): boolean {
  const tolerance = a.length > 7 ? 2 : 1;
  return a.length >= 4 && Math.abs(a.length - b.length) <= tolerance && editDistance(a, b) <= tolerance;
}
export function countrySearchScore(terms: string[], query: string): number {
  const q = normalizeCountrySearch(query).slice(0, 120);
  if (!q) return 1;
  if (terms.includes(q)) return 100;
  if (terms.some(term => term.startsWith(q))) return 80;
  const words = q.split(" ");
  if (terms.some(term => words.every(word => term.includes(word)))) return 60;
  const meaningful = words.filter(word => !stopWords.has(word));
  // An intent can cross metadata fields: "français Europe" or "idioma inglês na Europa".
  if (meaningful.length && meaningful.every(word => terms.some(term => term.split(" ").some(token => token === word || token.startsWith(word))))) return 50;
  if (q.length >= 4 && terms.some(term => closeSpelling(q, term))) return 30;
  if (meaningful.length > 1 && meaningful.every(word => terms.some(term => term.split(" ").some(token => token === word || token.startsWith(word) || closeSpelling(word, token))))) return 20;
  return 0;
}

const displayNamesByLocale = new Map<string, Intl.DisplayNames>();
/** The same visible name drives sorting, prefix suggestions and result ranking. */
export function localizedCountryName(country: SearchableCountry, locale: string): string {
  try {
    let display = displayNamesByLocale.get(locale);
    if (!display) { display = new Intl.DisplayNames([locale], { type: "region" }); displayNamesByLocale.set(locale, display); }
    return display.of(country.iso2) || country.name;
  } catch { return country.name; }
}
export function localizedCountryScore(country: SearchableCountry, query: string, locale: string, terms = countrySearchTerms(country)): number {
  const q = normalizeCountrySearch(query);
  if (!q) return 1;
  const name = normalizeCountrySearch(localizedCountryName(country, locale));
  if (name === q) return 140;
  if (q === normalizeCountrySearch(country.iso2) || q === normalizeCountrySearch(country.iso3)) return 130;
  if (name.startsWith(q)) return 120;
  // A single letter means a prefix in the selected interface language, never an ISO/foreign alias.
  if (q.length === 1) return 0;
  return countrySearchScore(terms, query);
}
export function countrySuggestions<T extends SearchableCountry>(countries: T[], query: string, locale: string, limit = 7): T[] {
  const q = normalizeCountrySearch(query);
  if (!q) return [];
  return countries.filter(country => normalizeCountrySearch(localizedCountryName(country, locale)).startsWith(q))
    .sort((a, b) => localizedCountryName(a, locale).localeCompare(localizedCountryName(b, locale), locale))
    .slice(0, limit);
}

/** Keep the autocomplete and directory on the same ranking and localized names. */
export function rankCountryMatches<T extends SearchableCountry>(
  countries: T[], query: string, locale: string, terms?: ReadonlyMap<string, string[]>,
  compareCoverage?: (a: T, b: T) => number, alphabetical = false,
): T[] {
  const collator = new Intl.Collator(locale);
  return countries.map(country => ({
    country, name: localizedCountryName(country, locale),
    score: query.trim() ? localizedCountryScore(country, query, locale, terms?.get(country.slug)) : 1,
  })).filter(({ score }) => score > 0)
    .sort((a, b) => (compareCoverage?.(a.country, b.country) ?? 0)
      || (alphabetical ? 0 : b.score - a.score) || collator.compare(a.name, b.name))
    .map(({ country }) => country);
}
