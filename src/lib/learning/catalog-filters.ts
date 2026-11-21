import { courseSectors } from './international-covers.ts';
import { courseRegions } from './course-regions.ts';
import { locales } from '../localization/config.ts';
import { professionalAreas } from './professional-areas.ts';

export const PREMIUM_SPECIALIZATIONS_SERIES = 'Premium Specializations';

export type CatalogFilters = { query: string; goal: string; series: string; availability: string; credential: string; language: string; access: string; area: string; region: string; sector: string };
export const defaultCatalogFilters: CatalogFilters = { query: '', goal: 'all', series: 'all', availability: 'available', credential: 'all', language: 'all', access: 'all', area: 'all', region: 'all', sector: 'all' };
export function parseCatalogFilters(params: URLSearchParams): CatalogFilters {
  const oneOf = (name: string, options: readonly string[], fallback: string) => { const value = params.get(name); return value && options.includes(value) ? value : fallback; };
  return {
    sector: oneOf('sector', ['all', ...courseSectors.map(sector => sector.id)], 'all'),
    region: oneOf('region', ['all', ...courseRegions.map(([id]) => id)], 'all'),
    area: oneOf('area', ['all', ...professionalAreas.map(([id]) => id)], 'all'),
    query: (params.get('q') ?? '').slice(0, 160),
    goal: oneOf('goal', ['all','global-mobility','decision-intelligence','global-economics','future-of-work','emergency-readiness'], 'all'),
    series: oneOf('series', ['all','First 30 Days','Career Without Borders','The Intelligence Toolkit','The Global Money Series', PREMIUM_SPECIALIZATIONS_SERIES], 'all'),
    availability: oneOf('availability', ['all','available','planned'], 'available'),
    credential: oneOf('credential', ['all','criteria_available','none'], 'all'),
    access: oneOf('access', ['all','free_account','premium'], 'all'),
    language: oneOf('language', ['all', ...locales], 'all'),
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

