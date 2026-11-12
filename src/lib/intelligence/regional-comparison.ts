import type { DeepObservation } from "./deep-context.ts";

type Identity = { slug: string; region: string };

/** Descriptive context, never a score: other catalog countries, same region and year. */
export function regionalComparison(row: DeepObservation | undefined, observations: readonly DeepObservation[], countries: readonly Identity[]) {
  if (!row) return null;
  const region = countries.find(country => country.slug === row.country)?.region;
  if (!region) return null;
  const peers = new Set(countries.filter(country => country.region === region && country.slug !== row.country).map(country => country.slug));
  const values = observations.filter(other => peers.has(other.country) && other.indicator === row.indicator && other.year === row.year && Number.isFinite(other.value));
  // Ambiguous duplicates must not silently bias a comparison.
  if (values.length < 5 || new Set(values.map(other => other.country)).size !== values.length) return null;
  const sorted = values.map(other => other.value).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  return { region, year: row.year, peers: sorted.length, median, method: "unweighted-median-other-catalog-countries-same-year" as const };
}
