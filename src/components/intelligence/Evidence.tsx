import Link from "next/link";
import { INDICATORS, INDICATOR_PRODUCERS, evidenceLabel, evidenceStatus, formatObservation, indicatorUrl, type IndicatorId, type IntelligenceState, type Observation } from "@/lib/intelligence/core";

export function EvidenceCard({ observation, indicator, countryCode }: { observation?: Observation; indicator: IndicatorId; countryCode: string }) {
  const definition = INDICATORS[indicator];
  const status = evidenceStatus(observation);
  return <article className="ig-evidence">
    <div className="ig-spread"><span className="ig-eyebrow">{definition.label}</span><span className={`ig-badge ig-${status}`}>{evidenceLabel(status)}</span></div>
    <p className="ig-value">{formatObservation(observation)}</p>
    <p className="ig-meta">{definition.unit}{observation ? ` · Reference year ${observation.year}` : " · No observation supplied"}</p>
    <p className="ig-small">{definition.explanation}</p>
    <details className="ig-details"><summary>Source & confidence</summary>
      <p className="ig-small">Source: {INDICATOR_PRODUCERS[indicator]}, via World Bank, World Development Indicators. Indicator license: CC BY 4.0 (registry reviewed 2026-09-02). Values are rounded for display; no missing observations are imputed. Confidence here describes traceability and freshness, not a probability of truth.</p>
      <p className="ig-small">{observation ? `Collected ${observation.retrievedAt.slice(0, 10)}. Source dataset update: ${observation.sourceUpdatedAt ?? "not supplied"}.` : "No verified observation is currently available in TGPI for this indicator and country. No value is inferred."}</p>
      <p className="ig-small">{status === "current" ? "Registered source, valid schema and acceptable reference-year age under methodology v1." : status === "historical" ? "The observation is older than the indicator's reference-year threshold. Use only as historical context." : status === "stale" ? "The source has not been successfully checked within seven days; validate directly before use." : "Insufficient evidence for a quantitative conclusion."}</p>
      <a href={indicatorUrl(indicator, countryCode)} target="_blank" rel="noreferrer" className="ig-link">Open source and indicator metadata ↗</a>
    </details>
  </article>;
}

export function GraphStatus({ state }: { state: IntelligenceState }) {
  return <aside className="ig-status" aria-label="Intelligence data status">
    <div className="ig-spread"><span className="ig-eyebrow">TGPI Intelligence Graph · Statistical layer v1</span><Link className="ig-link" href="/intelligence">Methodology & coverage →</Link></div>
    <p className="ig-small">{state.message ?? "Source-linked observations. National context, not a personal recommendation or a real-time world feed."}</p>
    <p className="ig-meta">{state.snapshot.retrievedAt ? `Collection: ${state.snapshot.retrievedAt.slice(0, 16).replace("T", " ")} UTC · Revision ${state.snapshot.revision}` : "Statistical collection pending validation. Official country identities remain available."}</p>
  </aside>;
}

export function IntelligenceBanner() {
  return <section className="ig-banner"><div><p className="ig-eyebrow">Decision dossiers + Your personal scenario</p><h2>Know the evidence. Build your next move.</h2><p>Explore official study pathways, institution checks and scoped cost references. Compare the questions that matter, then build a personal plan.</p></div><div className="ig-actions"><Link href="/country-fit" className="ig-button">Build my Country Fit →</Link><Link href="/intelligence/research" className="ig-button ig-secondary">Explore decision dossiers</Link><Link href="/intelligence" className="ig-link">Sources & methodology</Link></div></section>;
}
