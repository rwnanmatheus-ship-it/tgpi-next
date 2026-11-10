import { COMPARISON_CATALOG, MAX_COMPARISON_COUNTRIES, encodeCountrySet } from "./comparison-catalog.ts";
/** Public comparison context only. Never serialize profile fields in a shared URL. */
export function comparisonPath(slugs: readonly string[], goal: string): string {
  const params = new URLSearchParams();
  const selected = [...new Set(slugs.filter(slug => (COMPARISON_CATALOG as readonly string[]).includes(slug)))].slice(0, MAX_COMPARISON_COUNTRIES);
  if (selected.length > 8) params.set("set", encodeCountrySet(selected));
  else selected.forEach(slug => params.append("country", slug));
  if (["study", "work", "live", "travel"].includes(goal)) params.set("goal", goal);
  return `/compare?${params.toString()}`;
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
