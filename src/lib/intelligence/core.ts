// Pure, shared contracts. No synthetic country ratings are permitted in this graph.
export const METHODOLOGY_VERSION = "1.0.0";
export const INDICATORS = {
  "SP.POP.TOTL": { label: "Population", unit: "people", max: 2_000_000_000, maxAge: 3, explanation: "Total population. National context, not the size of your destination city." },
  "IT.NET.USER.ZS": { label: "Internet use", unit: "% of population", max: 100, maxAge: 3, explanation: "People using the internet. Not a measure of connection speed or service quality." },
  "SL.UEM.TOTL.ZS": { label: "Unemployment", unit: "% of labor force", max: 100, maxAge: 2, explanation: "Modeled ILO estimate of total unemployment. Not your probability of getting a job; profession and work authorization matter." },
  "SE.TER.ENRR": { label: "Tertiary enrollment", unit: "% gross", max: 1000, maxAge: 4, explanation: "Gross enrollment ratio includes students outside the official age group and can exceed 100%. Not university quality or admission probability." },
} as const;
export type IndicatorId = keyof typeof INDICATORS;
export const INDICATOR_IDS = Object.keys(INDICATORS) as IndicatorId[];
export const INDICATOR_PRODUCERS: Record<IndicatorId, string> = {
  "SP.POP.TOTL": "UN Population Division, national statistical offices, Eurostat and UN Statistics Division",
  "IT.NET.USER.ZS": "International Telecommunication Union (ITU), World Telecommunication/ICT Indicators Database",
  "SL.UEM.TOTL.ZS": "International Labour Organization (ILO), ILOSTAT modeled estimates",
  "SE.TER.ENRR": "UNESCO Institute for Statistics (UIS)",
};
export type CountryIdentity = { slug: string; name: string; iso2: string; iso3: string; m49: string; region: string; subregion: string };
export type Observation = { country: string; indicator: IndicatorId; value: number; year: number; retrievedAt: string; sourceUpdatedAt: string | null };
export type SeriesAudit = { indicator: IndicatorId; url: string; retrievedAt: string; sourceUpdatedAt: string | null; responseSha256: string; observations: number };
export type IntelligenceSnapshot = { schemaVersion: 1; methodologyVersion: string; revision: string; retrievedAt: string | null; observations: Observation[]; series: SeriesAudit[] };
export type IntelligenceState = { snapshot: IntelligenceSnapshot; status: "available" | "degraded" | "unavailable"; message: string | null };
export type EvidenceStatus = "current" | "historical" | "stale" | "missing";

export function indicatorUrl(id: IndicatorId, countryCode: string) {
  return `https://data.worldbank.org/indicator/${id}?locations=${countryCode}`;
}
export function sourceApiUrl(id: IndicatorId) {
  if (!INDICATOR_IDS.includes(id)) throw new Error("Unregistered indicator");
  return `https://api.worldbank.org/v2/country/all/indicator/${id}?source=2&format=json&mrnev=1&per_page=400`;
}
export function evidenceStatus(observation: Observation | undefined, now = new Date()): EvidenceStatus {
  if (!observation) return "missing";
  const ageDays = (now.getTime() - Date.parse(observation.retrievedAt)) / 86_400_000;
  if (!Number.isFinite(ageDays) || ageDays < -1 || ageDays > 7) return "stale";
  return now.getUTCFullYear() - observation.year > INDICATORS[observation.indicator].maxAge ? "historical" : "current";
}
export function evidenceLabel(status: EvidenceStatus) {
  return { current: "Source checked", historical: "Older observation", stale: "Refresh overdue", missing: "Not available" }[status];
}
export function formatObservation(observation: Observation | undefined) {
  if (!observation) return "Not available";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: observation.indicator === "SP.POP.TOTL" ? 0 : 1 }).format(observation.value);
}
export function findObservation(snapshot: IntelligenceSnapshot, country: string, indicator: IndicatorId) {
  return snapshot.observations.find(item => item.country === country && item.indicator === indicator);
}
function record(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("Invalid source object");
  return value as Record<string, unknown>;
}
export function parseWorldBankResponse(payload: unknown, indicator: IndicatorId, identities: CountryIdentity[], retrievedAt: string): Observation[] {
  if (!INDICATOR_IDS.includes(indicator)) throw new Error("Unregistered indicator");
  if (!Array.isArray(payload) || payload.length !== 2 || !Array.isArray(payload[1])) throw new Error("Invalid source envelope");
  const header = record(payload[0]);
  if (Number(header.pages) !== 1 || Number(header.page) !== 1 || Number(header.total) !== payload[1].length || payload[1].length > 400) throw new Error("Incomplete source pagination");
  const retrieved = new Date(retrievedAt);
  if (!Number.isFinite(retrieved.getTime())) throw new Error("Invalid retrieval date");
  const sourceUpdatedAt = typeof header.lastupdated === "string" && /^\d{4}-\d{2}-\d{2}$/.test(header.lastupdated) ? header.lastupdated : null;
  if (sourceUpdatedAt && (!Number.isFinite(Date.parse(sourceUpdatedAt)) || Date.parse(sourceUpdatedAt) > retrieved.getTime() + 86_400_000)) throw new Error("Invalid source update date");
  const byIso = new Map(identities.map(country => [country.iso3, country.slug]));
  const seen = new Set<string>();
  const output: Observation[] = [];
  for (const raw of payload[1]) {
    const row = record(raw);
    const country = byIso.get(String(row.countryiso3code));
    if (!country) continue; // Excludes aggregates and territories outside TGPI's declared catalog.
    if (record(row.indicator).id !== indicator) throw new Error("Source indicator mismatch");
    if (seen.has(country)) throw new Error("Duplicate country observation");
    seen.add(country);
    if (row.value === null) continue; // Missing is never zero and never filled from neighboring countries.
    const year = typeof row.date === "string" && /^\d{4}$/.test(row.date) ? Number(row.date) : NaN;
    if (!Number.isInteger(year) || year < 1960 || year > retrieved.getUTCFullYear()) throw new Error("Invalid observation year");
    if (typeof row.value !== "number" || !Number.isFinite(row.value) || row.value < 0 || row.value > INDICATORS[indicator].max) throw new Error("Invalid observation value");
    output.push({ country, indicator, value: row.value, year, retrievedAt, sourceUpdatedAt });
  }
  if (output.length < (indicator === "SP.POP.TOTL" ? 180 : 100)) throw new Error("Source coverage below publication gate");
  return output.sort((a, b) => a.country.localeCompare(b.country));
}

export type ResearchContext = { primaryGoal: string; budgetRange: string; timeHorizon: string; languages: string[]; profession: string; priorities: string[] };
export function personalResearchPlan(context: ResearchContext, country: string) {
  const urgent = ["now", "3-months"].includes(context.timeHorizon);
  return [
    { id: "eligibility", title: "Verify your legal route", detail: `${urgent ? "Before committing to your near-term timeline, verify" : "Verify"} nationality-specific entry, residence and ${context.primaryGoal === "work" ? "work authorization" : context.primaryGoal === "study" ? "study authorization" : "permitted activities"} for ${country}. TGPI does not determine eligibility.`, href: "#documents-to-verify" },
    { id: "budget", title: "Build a city-level budget", detail: `${context.budgetRange && context.budgetRange !== "undecided" ? `Your stated budget band is ${context.budgetRange} USD/month. ` : "Set your monthly budget first. "}Collect dated housing, insurance, transport and education quotes in one currency; include deposits and a contingency. National statistics cannot establish affordability.`, href: "#cost-of-living" },
    { id: "pathway", title: context.primaryGoal === "study" ? "Check the institution and program" : "Validate your professional pathway", detail: context.primaryGoal === "study" ? "Verify accreditation, admission criteria, language requirements, tuition and deadlines with the institution and competent authority." : `${context.profession ? `For ${context.profession.slice(0, 120)}, verify` : "Verify"} qualifications recognition, any professional licensing and actual opportunities. A national unemployment rate is only background context.`, href: "#documents-to-verify" },
    { id: "learning", title: "Prepare your learning plan", detail: `${context.languages.length ? `Your stated languages: ${context.languages.slice(0, 8).join(", ")}. ` : "Record your language skills. "}Compare them with your chosen course, employer and official process. Practice source evaluation before drawing conclusions.`, href: "/intelligence#learning" },
  ];
}
export function comparisonCaveat(observations: Array<Observation | undefined>) {
  if (observations.length < 2) return "Select at least two countries for a comparison.";
  if (observations.some(item => !item)) return "Incomplete coverage — missing values are not ranked or estimated.";
  if (new Set(observations.map(item => item?.year)).size > 1) return "Different reference years — values are not a same-year ranking.";
  return "Same reference year. National averages still conceal local and personal differences.";
}
