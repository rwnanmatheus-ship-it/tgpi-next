// Additive national context. These measures never imply personal eligibility or affordability.
export const CONTEXT_VERSION = "1.0.0";
export const CONTEXT_INDICATORS = {
  "SP.DYN.LE00.IN": { label: "Life expectancy", unit: "years", max: 130, maxAge: 3, producer: "UN Population Division, national statistical offices and Eurostat", explanation: "Population health context, not a prediction of your lifespan or access to care." },
  "EG.ELC.ACCS.ZS": { label: "Electricity access", unit: "% of population", max: 100, maxAge: 3, producer: "World Bank, SDG 7.1.1 Electrification Dataset", explanation: "Access to electricity does not measure reliability, outages or household tariffs." },
  "SP.URB.TOTL.IN.ZS": { label: "Urban population", unit: "% of population", max: 100, maxAge: 3, producer: "UN Population Division, World Urbanization Prospects", explanation: "National urban share; definitions differ and it does not describe a particular city." },
  "NY.GDP.PCAP.CD": { label: "GDP per capita", unit: "current USD", max: 1_000_000, maxAge: 3, producer: "National statistical offices, central banks, OECD and World Bank", explanation: "Economic output per person, not a salary, disposable income or living-cost budget." },
  "EN.POP.DNST": { label: "Population density", unit: "people per km²", max: 100_000, maxAge: 3, producer: "Food and Agriculture Organization and World Bank", explanation: "National average density does not describe neighbourhood crowding or housing availability." },
} as const;
export type ContextIndicatorId = keyof typeof CONTEXT_INDICATORS;
export const CONTEXT_INDICATOR_IDS = Object.keys(CONTEXT_INDICATORS) as ContextIndicatorId[];
export type ContextObservation = { country: string; indicator: ContextIndicatorId; value: number; year: number; retrievedAt: string; sourceUpdatedAt: string | null };
export type ContextSeries = { indicator: ContextIndicatorId; url: string; retrievedAt: string; sourceUpdatedAt: string | null; responseSha256: string; observations: number };
export type ContextSnapshot = { schemaVersion: 1; methodologyVersion: string; revision: string; retrievedAt: string | null; observations: ContextObservation[]; series: ContextSeries[] };
export type ContextState = { snapshot: ContextSnapshot; status: "available" | "degraded" | "unavailable"; message: string | null };
type Identity = { slug: string; iso3: string };

export function contextApiUrl(id: ContextIndicatorId, year = new Date().getUTCFullYear()) {
  if (!CONTEXT_INDICATOR_IDS.includes(id)) throw new Error("Unregistered context indicator");
  const range = id === "EG.ELC.ACCS.ZS" || id === "EN.POP.DNST";
  if (!Number.isInteger(year) || year < 2020 || year > 2100) throw new Error("Invalid context query year");
  return `https://api.worldbank.org/v2/country/all/indicator/${id}?source=2&format=json&${range ? `date=${year - 6}:${year}&per_page=2000` : "mrnev=1&per_page=400"}`;
}
export function contextSourceUrl(id: ContextIndicatorId, iso2: string) {
  if (!CONTEXT_INDICATOR_IDS.includes(id) || !/^[A-Z]{2}$/.test(iso2)) throw new Error("Invalid context source");
  return `https://data.worldbank.org/indicator/${id}?locations=${iso2}`;
}
export function contextMetadataUrl(id: ContextIndicatorId) {
  if (!CONTEXT_INDICATOR_IDS.includes(id)) throw new Error("Unregistered context indicator");
  return `https://databank.worldbank.org/metadataglossary/world-development-indicators/series/${id}`;
}
export function contextObservation(snapshot: ContextSnapshot, country: string, indicator: ContextIndicatorId) {
  return snapshot.observations.find(row => row.country === country && row.indicator === indicator);
}
export function contextEvidenceStatus(row?: ContextObservation, now = new Date()): "current" | "historical" | "stale" | "missing" {
  if (!row) return "missing";
  const age = (now.getTime() - Date.parse(row.retrievedAt)) / 86_400_000;
  if (!Number.isFinite(age) || age < -1 || age > 7) return "stale";
  return now.getUTCFullYear() - row.year > CONTEXT_INDICATORS[row.indicator].maxAge ? "historical" : "current";
}
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid context source object");
  return value as Record<string, unknown>;
}
export function parseContextResponse(payload: unknown, indicator: ContextIndicatorId, identities: readonly Identity[], retrievedAt: string): ContextObservation[] {
  if (!CONTEXT_INDICATOR_IDS.includes(indicator)) throw new Error("Unregistered context indicator");
  if (!Array.isArray(payload) || payload.length !== 2 || !Array.isArray(payload[1])) throw new Error("Invalid context source envelope");
  const range = indicator === "EG.ELC.ACCS.ZS" || indicator === "EN.POP.DNST";
  const header = record(payload[0]);
  if (Number(header.pages) !== 1 || Number(header.page) !== 1 || Number(header.total) !== payload[1].length || payload[1].length > (range ? 2000 : 400)) throw new Error("Incomplete context source pagination");
  if (header.sourceid != null && String(header.sourceid) !== "2") throw new Error("Unexpected context source dataset");
  const retrieved = new Date(retrievedAt);
  if (!Number.isFinite(retrieved.getTime())) throw new Error("Invalid context retrieval date");
  const sourceUpdatedAt = typeof header.lastupdated === "string" && /^\d{4}-\d{2}-\d{2}$/.test(header.lastupdated) ? header.lastupdated : null;
  if (sourceUpdatedAt && (!Number.isFinite(Date.parse(sourceUpdatedAt)) || Date.parse(sourceUpdatedAt) > retrieved.getTime() + 86_400_000)) throw new Error("Invalid context source update date");
  const countryByIso = new Map(identities.map(country => [country.iso3, country.slug]));
  const seen = new Set<string>();
  const output: ContextObservation[] = [];
  for (const value of payload[1]) {
    const row = record(value);
    const country = countryByIso.get(String(row.countryiso3code));
    if (!country) continue;
    if (record(row.indicator).id !== indicator) throw new Error("Context indicator mismatch");
    const key = range ? `${country}:${row.date}` : country;
    if (seen.has(key)) throw new Error("Duplicate context country");
    seen.add(key);
    if (row.value === null) continue;
    const year = typeof row.date === "string" && /^\d{4}$/.test(row.date) ? Number(row.date) : NaN;
    if (!Number.isInteger(year) || year < 1960 || year > retrieved.getUTCFullYear()) throw new Error("Invalid context year");
    if (typeof row.value !== "number" || !Number.isFinite(row.value) || row.value < 0 || row.value > CONTEXT_INDICATORS[indicator].max) throw new Error("Invalid context value");
    if (range && year < retrieved.getUTCFullYear() - 6) throw new Error("Context year outside registered window");
    const existing = output.findIndex(row => row.country === country);
    if (existing < 0) output.push({ country, indicator, value: row.value, year, retrievedAt, sourceUpdatedAt });
    else if (output[existing].year < year) output[existing] = { country, indicator, value: row.value, year, retrievedAt, sourceUpdatedAt };
  }
  if (output.length < 150) throw new Error("Context coverage below publication gate");
  return output.sort((a, b) => a.country.localeCompare(b.country));
}

// A broken source cannot renew timestamps or replace good data with a coverage collapse.
export function mergeContextSeries(previous: ContextSnapshot, updates: { observations: ContextObservation[]; audit: ContextSeries }[], revision: string): ContextSnapshot {
  const accepted = updates.filter(update => {
    const previousCount = previous.series.find(series => series.indicator === update.audit.indicator)?.observations ?? 0;
    return update.observations.length >= 150 && (!previousCount || update.observations.length >= previousCount * 0.9);
  });
  const replaced = new Set(accepted.map(update => update.audit.indicator));
  const series = [...previous.series.filter(row => !replaced.has(row.indicator)), ...accepted.map(update => update.audit)].sort((a, b) => a.indicator.localeCompare(b.indicator));
  return {
    schemaVersion: 1, methodologyVersion: CONTEXT_VERSION, revision,
    // Conservative collection date: the oldest successfully collected retained series.
    retrievedAt: series.map(row => row.retrievedAt).sort()[0] ?? null,
    series,
    observations: [...previous.observations.filter(row => !replaced.has(row.indicator)), ...accepted.flatMap(update => update.observations)].sort((a, b) => a.country.localeCompare(b.country) || a.indicator.localeCompare(b.indicator)),
  };
}
