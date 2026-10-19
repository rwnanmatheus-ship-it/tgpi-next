export type ExplorerFilterInput = {
  q?: string | string[];
  region?: string | string[];
  selected?: string | string[];
  limit?: string | string[];
};

const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] ?? "" : value ?? "";

export function explorerFiltersFromSearch(search: string): ExplorerFilterInput {
  const params = new URLSearchParams(search);
  return { q: params.getAll("q"), region: params.getAll("region"), selected: params.getAll("selected"), limit: params.getAll("limit") };
}

export function explorerFiltersToSearch(input: ExplorerFilterInput) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    for (const item of typeof value === "string" ? [value] : value ?? []) params.append(key, item);
  }
  return params.toString();
}

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
