import baseData from "../../data/intelligence/snapshot.json" with { type: "json" };
import contextData from "../../data/intelligence/country-context.json" with { type: "json" };
import { INDICATORS, INDICATOR_IDS, INDICATOR_PRODUCERS, evidenceStatus, type IntelligenceSnapshot } from "./core.ts";
import { CONTEXT_INDICATORS, CONTEXT_INDICATOR_IDS, contextEvidenceStatus, type ContextSnapshot } from "./country-context.ts";

const base = baseData as IntelligenceSnapshot;
const context = contextData as ContextSnapshot;

// Additive export: the original twelve-indicator contract is preserved.
export function nationalDossierIndicators(country: string, now = new Date()) {
  return [
    ...INDICATOR_IDS.map(id => {
      const observation = base.observations.find(row => row.country === country && row.indicator === id);
      return { id, ...INDICATORS[id], producer: INDICATOR_PRODUCERS[id], observation: observation ?? null, series: base.series.find(series => series.indicator === id) ?? null, state: evidenceStatus(observation, now) };
    }),
    ...CONTEXT_INDICATOR_IDS.map(id => {
      const observation = context.observations.find(row => row.country === country && row.indicator === id);
      return { id, ...CONTEXT_INDICATORS[id], observation: observation ?? null, series: context.series.find(series => series.indicator === id) ?? null, state: contextEvidenceStatus(observation, now) };
    }),
  ];
}
