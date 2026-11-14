import { COMPARISON_CATALOG, MAX_COMPARISON_COUNTRIES, decodeCountrySet, encodeCountrySet } from "./comparison-catalog.ts";
/** Public comparison context only. Never serialize profile fields in a shared URL. */
export function comparisonPath(slugs: readonly string[], goal: string): string {
  const params = new URLSearchParams();
  const selected = [...new Set(slugs.filter(slug => (COMPARISON_CATALOG as readonly string[]).includes(slug)))].slice(0, MAX_COMPARISON_COUNTRIES);
  if (selected.length > 8) params.set("set", encodeCountrySet(selected));
  else if (!selected.length) params.set("country", "");
  else selected.forEach(slug => params.append("country", slug));
  if (["study", "work", "live", "travel"].includes(goal)) params.set("goal", goal);
  return `/compare?${params.toString()}`;
}

export function comparisonPlanPath(slugs: readonly string[], goal: string): string {
  const countries = [...new Set(slugs.filter(slug => (COMPARISON_CATALOG as readonly string[]).includes(slug)))];
  const params = new URLSearchParams({ source: "compare" });
  countries.slice(0, 5).forEach(slug => params.append("country", slug));
  if (["study", "work", "live", "travel"].includes(goal)) params.set("goal", goal);
  return `/onboarding?${params.toString()}`;
}

export function restoreComparison(value: unknown, validSlugs: ReadonlySet<string>, validGoals: readonly string[]) {
  const record = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
  const raw = Array.isArray(value) ? value : record?.countrySlugs;
  if (!Array.isArray(raw)) return null;
  const countrySlugs = [...new Set(raw.filter((slug): slug is string => typeof slug === "string" && validSlugs.has(slug)))].slice(0, MAX_COMPARISON_COUNTRIES);
  if (countrySlugs.length < 2) return null;
  const goal = typeof record?.goal === "string" && validGoals.includes(record.goal) ? record.goal : "overall";
  return { countrySlugs, goal };
}

type ComparisonQuery = {
  country?: string | string[];
  set?: string | string[];
  goal?: string | string[];
  view?: string | string[];
};

export function readComparisonSelection(params: ComparisonQuery | undefined, validSlugs: ReadonlySet<string>, defaults: readonly string[]) {
  const hasCountries = params?.country !== undefined || params?.set !== undefined;
  const raw = params?.set !== undefined
    ? decodeCountrySet(params.set)
    : [params?.country].flat().filter((value): value is string => value !== undefined);
  const candidates = hasCountries ? raw : defaults;
  return {
    slugs: [...new Set(candidates)].filter(slug => validSlugs.has(slug)),
    invalid: hasCountries && !(params?.set === undefined && raw.length === 1 && raw[0] === "")
      && (!raw.length || raw.some(slug => !validSlugs.has(slug))),
    allowRestore: !hasCountries && params?.goal === undefined && params?.view === undefined,
  };
}

/** Only observations of the same series and reference year support a direct delta. */
export function comparisonDelta(
  observation: { indicator: string; value: number; year: number } | undefined,
  baseline: { indicator: string; value: number; year: number } | undefined,
): number | null {
  if (!observation || !baseline || observation.indicator !== baseline.indicator || observation.year !== baseline.year) return null;
  return observation.value - baseline.value;
}
