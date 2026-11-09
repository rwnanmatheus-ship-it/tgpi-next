export type CatalogFilters = { query: string; goal: string; series: string; availability: string; credential: string; language: string };
export const defaultCatalogFilters: CatalogFilters = { query: '', goal: 'all', series: 'all', availability: 'available', credential: 'all', language: 'all' };
export function parseCatalogFilters(params: URLSearchParams): CatalogFilters {
  const oneOf = (name: string, options: readonly string[], fallback: string) => { const value = params.get(name); return value && options.includes(value) ? value : fallback; };
  return {
    query: (params.get('q') ?? '').slice(0, 160),
    goal: oneOf('goal', ['all','global-mobility','decision-intelligence','global-economics','future-of-work'], 'all'),
    series: oneOf('series', ['all','First 30 Days','Career Without Borders','The Intelligence Toolkit','The Global Money Series'], 'all'),
    availability: oneOf('availability', ['all','available','planned'], 'available'),
    credential: oneOf('credential', ['all','criteria_available','none'], 'all'),
    language: oneOf('language', ['all','en','pt-BR'], 'all'),
  };
}
export function catalogFilterParams(filters: CatalogFilters, current = new URLSearchParams()): URLSearchParams {
  const params = new URLSearchParams(current);
  for (const [key,value] of Object.entries(filters)) {
    const name = key === 'query' ? 'q' : key;
    if (value === defaultCatalogFilters[key as keyof CatalogFilters]) params.delete(name); else params.set(name,value);
  }
  return params;
}
