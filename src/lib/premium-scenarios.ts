import { RESEARCH_TASKS, validateWorksheet, worksheetTotals, type ResearchWorksheet } from './intelligence/research-plan';

export type SavedPremiumScenario = { id: string; slot: string; countryName: string; iso2: string; worksheet: ResearchWorksheet; updatedAt: string | null };
export type PremiumScenarioPage = { scenarios: SavedPremiumScenario[]; cursor: string | null; omitted: number };
export type ComparisonReadiness = 'ready' | 'selection' | 'currency' | 'period' | 'incomplete';

export function parsePremiumScenarioPage(value: unknown): PremiumScenarioPage | null {
  if (!value || typeof value !== 'object') return null;
  const page = value as Record<string,unknown>;
  if (!Array.isArray(page.scenarios) || page.scenarios.length > 12 || !(page.cursor === null || typeof page.cursor === 'string' && page.cursor.length <= 4096) || typeof page.omitted !== 'number' || !Number.isInteger(page.omitted) || page.omitted < 0 || page.omitted > 12) return null;
  const scenarios: SavedPremiumScenario[] = [];
  for (const raw of page.scenarios) {
    if (!raw || typeof raw !== 'object') return null;
    const row = raw as Record<string,unknown>;
    if (typeof row.id !== 'string' || typeof row.slot !== 'string' || !['1','2','3'].includes(row.slot) || typeof row.iso2 !== 'string' || !/^[A-Z]{2}$/.test(row.iso2) || typeof row.countryName !== 'string' || row.countryName.length > 100 || !(row.updatedAt === null || typeof row.updatedAt === 'string' && Number.isFinite(Date.parse(row.updatedAt)))) return null;
    const country = row.id.slice(0,-2);
    if (row.id !== `${country}-${row.slot}` || !/^[a-z-]{2,80}$/.test(country)) return null;
    const worksheet = validateWorksheet(row.worksheet,[country],RESEARCH_TASKS.map(task => task.id));
    if (!worksheet) return null;
    scenarios.push({id:row.id,slot:row.slot,iso2:row.iso2,countryName:row.countryName,updatedAt:row.updatedAt,worksheet});
  }
  return {scenarios,cursor:page.cursor,omitted:page.omitted};
}

export function scenarioComparisonReadiness(scenarios: readonly SavedPremiumScenario[]): ComparisonReadiness {
  if (scenarios.length < 2 || scenarios.length > 3) return 'selection';
  if (new Set(scenarios.map(s => s.worksheet.currency)).size !== 1) return 'currency';
  if (new Set(scenarios.map(s => s.worksheet.months)).size !== 1) return 'period';
  if (scenarios.some(s => !worksheetTotals(s.worksheet).complete)) return 'incomplete';
  return 'ready';
}

export function scenarioTotalDifference(scenario: SavedPremiumScenario, baseline: SavedPremiumScenario): number | null {
  if (scenarioComparisonReadiness([baseline,scenario]) !== 'ready') return null;
  const scale = scenario.worksheet.currency === 'JPY' ? 1 : 100;
  return Math.round((worksheetTotals(scenario.worksheet).total - worksheetTotals(baseline.worksheet).total) * scale) / scale;
}

/** Machine-readable snapshot: missing amounts remain null, never invented zero values. */
export function exportScenarioComparison(scenarios: readonly SavedPremiumScenario[], now = new Date(), source: 'member_saved_worksheets' | 'illustrative_examples' = 'member_saved_worksheets') {
  const selected = scenarios.slice(0,3);
  const comparison = scenarioComparisonReadiness(selected);
  return JSON.stringify({ schema:'tgpi.scenario-comparison', version:1, exportedAt:now.toISOString(), source, comparison, baselineId:selected[0]?.id ?? null,
    scenarios:selected.map(s => ({ ...s, totals:worksheetTotals(s.worksheet), differenceFromBaseline: comparison === 'ready' && selected[0] ? scenarioTotalDifference(s,selected[0]) : null })) },null,2);
}
