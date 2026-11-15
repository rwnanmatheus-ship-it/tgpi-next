import 'server-only';

import { getFirestoreDocuments, isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { RESEARCH_TASKS, validateWorksheet, worksheetTotals } from '@/lib/intelligence/research-plan';
import type { PlanBudgetEvidence, PlanFundScenario } from '@/lib/personal-plan';

export async function loadPlanBudgetEvidence(uid: string, destinations: string[], legacy: unknown) {
  const evidence: Record<string, PlanBudgetEvidence> = {};
  const scenarios: PlanFundScenario[] = [];
  if (!destinations.length) return { evidence, scenarios };
  if (!isLearningStorageConfigured()) return { evidence: null, scenarios };

  const targets = destinations.flatMap(country => (['1', '2', '3'] as const).map(slot => ({
    country, slot, path: `tgpiLearningUsers/${uid}/researchScenarios/${country}-${slot}`,
  })));
  try {
    const rows = await getFirestoreDocuments<{ worksheet: unknown }>(targets.map(item => item.path));
    const taskIds = RESEARCH_TASKS.map(item => item.id);
    for (const { country, slot, path } of targets) {
      const row = rows.get(path);
      const worksheet = validateWorksheet(row ? row.data.worksheet : slot === '1' ? legacy : null, [country], taskIds);
      if (!worksheet) continue;
      const totals = worksheetTotals(worksheet);
      const complete = totals.complete && Boolean(worksheet.city && worksheet.quoteDate && worksheet.sourceNote);
      if (complete) scenarios.push({ country, slot, city: worksheet.city, quoteDate: worksheet.quoteDate, currency: worksheet.currency, total: totals.total });
      if (!evidence[country] || (complete && evidence[country].status !== 'complete')) {
        evidence[country] = { status: complete ? 'complete' : 'partial', slot };
      }
    }
    return { evidence, scenarios };
  } catch {
    return { evidence: null, scenarios: [] };
  }
}
