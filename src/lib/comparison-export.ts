import { INDICATORS, INDICATOR_IDS, evidenceLabel, evidenceStatus, indicatorUrl, type Observation } from "./intelligence/core.ts";
type ExportCountry = { slug: string; name: string; iso2: string };
/** Quote all cells and neutralize spreadsheet formula prefixes. No profile data is exported. */
export function csvCell(value: string | number) {
  const text = String(value);
  return `"${(/^[=+@\-\t\r]/.test(text) ? "'" + text : text).replace(/"/g, '""')}"`;
}
export function comparisonCsv(countries: ExportCountry[], observations: Observation[], options?: { locale: string; translate: (key:string)=>string }) {
  const t=options?.translate ?? ((key:string)=>key);
  const rows: Array<Array<string|number>> = [["Country","ISO","Indicator","Value","Unit","Reference year","Status","Source","Collected at"].map(t)];
  for(const country of countries) for(const id of INDICATOR_IDS) {
    const o=observations.find(item=>item.country===country.slug && item.indicator===id);
    rows.push([t(country.name),country.iso2,t(INDICATORS[id].label),o?.value??"",t(INDICATORS[id].unit),o?.year??"",t(evidenceLabel(evidenceStatus(o))),indicatorUrl(id,country.iso2),o?.retrievedAt??""]);
  }
  return rows.map(row=>row.map(csvCell).join(",")).join("\r\n");
}
