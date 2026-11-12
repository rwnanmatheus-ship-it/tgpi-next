import 'server-only';

import { getFirestoreDocuments, isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { RESEARCH_TASKS, validateWorksheet, worksheetTotals } from '@/lib/intelligence/research-plan';
import type { PlanBudgetEvidence } from '@/lib/personal-plan';

export async function loadPlanBudgetEvidence(uid: string, destinations: string[], legacy: unknown) {
  const evidence: Record<string, PlanBudgetEvidence> = {};
  if (!destinations.length) return evidence;
  if (!isLearningStorageConfigured()) return null;

  const targets = destinations.flatMap(country => (['1', '2', '3'] as const).map(slot => ({
    country, slot, path: `tgpiLearningUsers/${uid}/researchScenarios/${country}-${slot}`,
  })));
  try {
    const rows = await getFirestoreDocuments<{ worksheet: unknown }>(targets.map(item => item.path));
    const taskIds = RESEARCH_TASKS.map(item => item.id);
    for (const { country, slot, path } of targets) {
      const row = rows.get(path);
      const worksheet = validateWorksheet(row ? row.data.worksheet : slot === '1' ? legacy : null, [country], taskIds);
      if (!worksheet || evidence[country]?.status === 'complete') continue;
      const complete = worksheetTotals(worksheet).complete && worksheet.city && worksheet.quoteDate && worksheet.sourceNote;
      if (complete || !evidence[country]) evidence[country] = { status: complete ? 'complete' : 'partial', slot };
    }
    return evidence;
  } catch {
    return null;
  }
}
