/** Public comparison context only. Never serialize profile fields in a shared URL. */
export function comparisonPath(slugs: readonly string[], goal: string): string {
  const params = new URLSearchParams();
  [...new Set(slugs.filter(Boolean))].slice(0, 3).forEach(slug => params.append("country", slug));
  if (goal !== "overall") params.set("goal", goal);
  return `/compare?${params.toString()}`;
}

export function restoreComparison(value: unknown, validSlugs: ReadonlySet<string>, validGoals: readonly string[]) {
  const record = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
  const raw = Array.isArray(value) ? value : record?.countrySlugs;
  if (!Array.isArray(raw)) return null;
  const countrySlugs = [...new Set(raw.filter((slug): slug is string => typeof slug === "string" && validSlugs.has(slug)))].slice(0, 3);
  if (countrySlugs.length < 2) return null;
  const goal = typeof record?.goal === "string" && validGoals.includes(record.goal) ? record.goal : "overall";
  return { countrySlugs, goal };
}
