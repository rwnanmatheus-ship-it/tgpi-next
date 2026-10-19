export type ExplorerFilterInput = {
  q?: string | string[];
  region?: string | string[];
  selected?: string | string[];
  limit?: string | string[];
};

const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] ?? "" : value ?? "";

export function normalizeExplorerFilters(input: ExplorerFilterInput, countries: readonly { slug: string; region: string }[]) {
  const region = first(input.region);
  const slugs = new Set(countries.map(country => country.slug));
  const selection = typeof input.selected === "string" ? [input.selected] : input.selected ?? [];
  return {
    query: first(input.q).slice(0, 120),
    region: countries.some(country => country.region === region) ? region : "all",
    selection: [...new Set(selection)].filter(slug => slugs.has(slug)).slice(0, 3),
    limit: Math.max(24, Math.min(195, Math.floor(Number(first(input.limit)) || 24))),
  };
}
