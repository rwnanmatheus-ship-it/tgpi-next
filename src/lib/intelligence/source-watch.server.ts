import "server-only";
import { unstable_cache } from "next/cache";
import { DOSSIER_VERSION, DOSSIER_SOURCES, dossierFor } from "./dossiers";
import { retrieveRegisteredSource, type SourceCheck } from "./source-checks";

const pending = new Map<string, Promise<SourceCheck>>();
const cachedSourceCheck = unstable_cache(async (id: string) => {
  if (!pending.has(id)) pending.set(id, retrieveRegisteredSource(id, DOSSIER_SOURCES).finally(() => pending.delete(id)));
  return pending.get(id)!;
}, ["tgpi-dossier-source-watch", DOSSIER_VERSION], { revalidate: 21600 });

export async function checkCountrySources(country: string) {
  const sources = dossierFor(country).sources;
  const checks: SourceCheck[] = [];
  // At most three simultaneous source connections per country request.
  for (let i = 0; i < sources.length; i += 3) checks.push(...await Promise.all(sources.slice(i, i + 3).map(s => cachedSourceCheck(s.id))));
  return checks;
}
