import 'server-only';
import identities from '@/data/intelligence/identities.json';
import { isLearningStorageConfigured, listFirestoreDocumentPage } from '@/lib/firestore-admin-rest.server';
import { RESEARCH_TASKS, validateWorksheet } from '@/lib/intelligence/research-plan';
import type { PremiumScenarioPage, SavedPremiumScenario } from '@/lib/premium-scenarios';

export async function loadPremiumScenarios(uid: string, cursor?: string): Promise<PremiumScenarioPage> {
  if (!isLearningStorageConfigured()) throw new Error('Scenario storage unavailable.');
  const page = await listFirestoreDocumentPage<{worksheet:unknown;updatedAt?:string}>(`tgpiLearningUsers/${uid}`,'researchScenarios',cursor);
  const scenarios: SavedPremiumScenario[] = [];
  for (const row of page.items) {
    const id = row.name.split('/').at(-1) ?? '';
    const match = /^(.*)-([123])$/.exec(id);
    const country = identities.countries.find(c => c.slug === match?.[1]);
    if (!country || !match) continue;
    const worksheet = validateWorksheet(row.data.worksheet,[country.slug],RESEARCH_TASKS.map(t => t.id));
    if (!worksheet) continue;
    scenarios.push({id,slot:match[2],countryName:country.name,iso2:country.iso2,worksheet,updatedAt:typeof row.data.updatedAt === 'string' && Number.isFinite(Date.parse(row.data.updatedAt)) ? row.data.updatedAt : null});
  }
  return { scenarios,cursor:page.nextPageToken,omitted:page.items.length-scenarios.length };
}
