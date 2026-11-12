// Publication contracts for the expanded dossier. Missing observations stay missing.
export const DEEP_INDICATORS = {
  "SL.TLF.CACT.ZS": { topic: "work", label: "Labour force participation", unit: "% ages 15+", min: 0, max: 100, maxAge: 3, producer: "ILO", limit: "Includes employed people and people seeking work; not a job-placement rate." },
  "SL.UEM.1524.ZS": { topic: "work", label: "Youth unemployment", unit: "% labour force ages 15–24", min: 0, max: 100, maxAge: 3, producer: "ILO", limit: "The denominator is the young labour force, not all young people. This does not predict your job prospects." },
  "SL.EMP.TOTL.SP.ZS": { topic: "work", label: "Employment to population", unit: "% ages 15+", min: 0, max: 100, maxAge: 3, producer: "ILO", limit: "Employment includes different forms of work and says nothing about your work authorisation or salary." },
  "SE.XPD.TOTL.GD.ZS": { topic: "education", label: "Public education expenditure", unit: "% of GDP", min: 0, max: 100, maxAge: 4, producer: "UNESCO UIS", limit: "Public spending across education levels; not tuition, a scholarship or a university quality score." },
  "SE.ADT.LITR.ZS": { topic: "education", label: "Adult literacy", unit: "% ages 15+", min: 0, max: 100, maxAge: 5, producer: "UNESCO UIS", limit: "Survey years and definitions vary. This is not foreign-language proficiency or a programme admission requirement." },
  "SH.XPD.OOPC.CH.ZS": { topic: "health", label: "Out-of-pocket health expenditure", unit: "% current health expenditure", min: 0, max: 100, maxAge: 4, producer: "WHO", limit: "National financing share; not the percentage of your medical bill or an insurance premium." },
  "SH.MED.PHYS.ZS": { topic: "health", label: "Physicians", unit: "per 1,000 people", min: 0, max: 50, maxAge: 5, producer: "WHO", limit: "National workforce density; local availability, waiting times and eligibility for care require separate checks." },
  "IT.NET.BBND.P2": { topic: "digital", label: "Fixed broadband subscriptions", unit: "per 100 people", min: 0, max: 300, maxAge: 3, producer: "ITU", limit: "Subscriptions are not individuals, speed measurements or a guarantee of service at your address." },
  "FP.CPI.TOTL.ZG": { topic: "cost", label: "Consumer price inflation", unit: "% annual change", min: -100, max: 100000, maxAge: 2, producer: "IMF / national statistical offices", limit: "A national consumer basket measures price change, not the price level or your city rent." },
  "NY.GDP.MKTP.KD.ZG": { topic: "economy", label: "Real GDP growth", unit: "% annual change", min: -100, max: 1000, maxAge: 2, producer: "World Bank / national accounts", limit: "National production growth is not individual income growth or a return on investment." },
  "SH.H2O.BASW.ZS": { topic: "housing", label: "Basic drinking-water services", unit: "% of population", min: 0, max: 100, maxAge: 4, producer: "WHO / UNICEF JMP", limit: "Basic service access does not certify tap-water safety in a particular building." },
  "EG.ELC.RNEW.ZS": { topic: "climate", label: "Renewable electricity output", unit: "% electricity output", min: 0, max: 100, maxAge: 5, producer: "International Energy Agency / World Bank", limit: "Electricity generation mix is not total energy use, grid reliability or an electricity tariff." },
} as const;
export type DeepIndicator = keyof typeof DEEP_INDICATORS;
export type DeepObservation = { country: string; indicator: DeepIndicator; value: number; year: number };
export type DeepSeries = { indicator: DeepIndicator; url: string; retrievedAt: string; sourceUpdatedAt: string | null; responseSha256: string; observations: number };
export type DeepSnapshot = { schemaVersion: 1; editorialVersion: string; series: DeepSeries[]; observations: DeepObservation[] };
export const DEEP_INDICATOR_IDS = Object.keys(DEEP_INDICATORS) as DeepIndicator[];

export function deepObservationState(row: DeepObservation | undefined, collectedAt: string | undefined, now = new Date()): "missing" | "stale" | "historical" | "current" {
  if (!row) return "missing";
  const age = now.getTime() - Date.parse(collectedAt ?? "");
  if (!Number.isFinite(age) || age < -86_400_000 || age > 90 * 86_400_000) return "stale";
  return now.getUTCFullYear() - row.year > DEEP_INDICATORS[row.indicator].maxAge ? "historical" : "current";
}

export function parseDeepSeries(payload: unknown, indicator: DeepIndicator, identities: readonly { slug: string; iso3: string }[], now = new Date()): DeepObservation[] {
  if (!Object.hasOwn(DEEP_INDICATORS, indicator)) throw new Error("Unknown indicator");
  if (!Array.isArray(payload) || payload.length !== 2 || !Array.isArray(payload[1])) throw new Error("Invalid response");
  const [header, rows] = payload;
  if (!header || Number(header.page) !== 1 || Number(header.pages) !== 1 || Number(header.total) !== rows.length || rows.length > 20000) throw new Error("Incomplete pagination");
  if (header.lastupdated && (!Number.isFinite(Date.parse(header.lastupdated)) || Date.parse(header.lastupdated) > now.getTime() + 86400000)) throw new Error("Invalid publisher date");
  const codes = new Map(identities.map(c => [c.iso3, c.slug]));
  const seen = new Set<string>();
  const latest = new Map<string, DeepObservation>();
  const definition = DEEP_INDICATORS[indicator];
  for (const row of rows) {
    if (!row || typeof row !== "object") throw new Error("Invalid observation");
    const country = codes.get(row.countryiso3code);
    if (!country) continue;
    if (row.indicator?.id !== indicator) throw new Error("Mismatched indicator");
    const key = `${country}:${row.date}`;
    if (seen.has(key)) throw new Error("Duplicate observation");
    seen.add(key);
    if (row.value === null) continue;
    const year = /^\d{4}$/.test(String(row.date)) ? Number(row.date) : NaN;
    if (!Number.isInteger(year) || year < 2015 || year > now.getUTCFullYear()) throw new Error("Invalid year");
    if (typeof row.value !== "number" || !Number.isFinite(row.value) || row.value < definition.min || row.value > definition.max) throw new Error("Invalid value");
    if (!latest.has(country) || latest.get(country)!.year < year) latest.set(country, { country, indicator, value: row.value, year });
  }
  if (latest.size < 50) throw new Error("Insufficient coverage");
  return [...latest.values()].sort((a, b) => a.country.localeCompare(b.country));
}
