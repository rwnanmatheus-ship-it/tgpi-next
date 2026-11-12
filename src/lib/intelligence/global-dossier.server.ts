import "server-only";
import deepData from "@/data/intelligence/deep-context.json";
import { DEEP_INDICATORS, DEEP_INDICATOR_IDS, deepObservationState, type DeepSnapshot } from "./deep-context";
import { researchCoverage, researchSourcesFor, researchSourceUrl, RESEARCH_TOPICS, RESEARCH_VERSION } from "./global-research";
import { RESEARCH_CHAPTERS } from "./research-chapters";
const snapshot = deepData as DeepSnapshot;

export function globalDossier(country: string) {
  const coverage = researchCoverage(country);
  if (!coverage) return null;
  const sources = researchSourcesFor(country).map(source => ({ ...source, destinationUrl: researchSourceUrl(source, country) }));
  const observations = snapshot.observations.filter(row => row.country === country);
  return {
    version: RESEARCH_VERSION, coverage, sources,
    indicators: DEEP_INDICATOR_IDS.map(id => {
      const observation = observations.find(row => row.indicator === id);
      const series = snapshot.series.find(s => s.indicator === id);
      return { id, ...DEEP_INDICATORS[id], observation: observation ?? null, series: series ?? null, state: deepObservationState(observation, series?.retrievedAt) };
    }),
    chapters: RESEARCH_TOPICS.map(id => {
      const definition = RESEARCH_CHAPTERS[id];
      const available = sources.filter(s => s.topics.includes(id));
      return { id, ...definition, sourceIds: [...available.filter(s => s.country), ...available.filter(s => !s.country).sort((a, b) => {
        const score = (sourceId: string) => definition.preferred.includes(sourceId) ? definition.preferred.indexOf(sourceId) : 100;
        return score(a.id) - score(b.id);
      })].map(s => s.id) };
    }),
  };
}
export type GlobalDossier = NonNullable<ReturnType<typeof globalDossier>>;
