import Link from "next/link";
import { INDICATORS, evidenceLabel, evidenceStatus, formatObservation, indicatorUrl, type IndicatorId, type IntelligenceState, type Observation } from "@/lib/intelligence/core";

export function EvidenceCard({ observation, indicator, countryCode }: { observation?: Observation; indicator: IndicatorId; countryCode: string }) {
  const definition = INDICATORS[indicator];
  const status = evidenceStatus(observation);
  return <article className="ig-evidence">
    <div className="ig-spread"><span className="ig-eyebrow">{definition.label}</span><span className={`ig-badge ig-${status}`}>{evidenceLabel(status)}</span></div>
    <p className="ig-value">{formatObservation(observation)}</p>
    <p className="ig-meta">{definition.unit}{observation ? ` · Reference year ${observation.year}` : " · No observation supplied"}</p>
    <p className="ig-small">{definition.explanation}</p>
    <details className="ig-details"><summary>Source & confidence</summary>
      <p className="ig-small">Publisher: World Bank, World Development Indicators. Upstream producers and methods are identified in the indicator metadata. Confidence here describes traceability and freshness, not a probability of truth.</p>
      <p className="ig-small">{observation ? `Collected ${observation.retrievedAt.slice(0, 10)}. Source dataset update: ${observation.sourceUpdatedAt ?? "not supplied"}.` : "No verified observation is currently available in TGPI for this indicator and country. No value is inferred."}</p>
      <p className="ig-small">{status === "current" ? "Registered source, valid schema and acceptable reference-year age under methodology v1." : status === "historical" ? "The observation is older than the indicator's reference-year threshold. Use only as historical context." : status === "stale" ? "The source has not been successfully checked within seven days; validate directly before use." : "Insufficient evidence for a quantitative conclusion."}</p>
      <a href={indicatorUrl(indicator, countryCode)} target="_blank" rel="noreferrer" className="ig-link">Open source and indicator metadata ↗</a>
    </details>
  </article>;
}

export function GraphStatus({ state }: { state: IntelligenceState }) {
  return <aside className="ig-status" aria-label="Intelligence data status">
    <div className="ig-spread"><span className="ig-eyebrow">TGPI Intelligence Graph · v1</span><Link className="ig-link" href="/intelligence">Methodology & coverage →</Link></div>
    <p className="ig-small">{state.message ?? "Source-linked observations. National context, not a personal recommendation or a real-time world feed."}</p>
    <p className="ig-meta">{state.snapshot.retrievedAt ? `Collection: ${state.snapshot.retrievedAt.slice(0, 16).replace("T", " ")} UTC · Revision ${state.snapshot.revision}` : "Statistical collection pending validation. Official country identities remain available."}</p>
  </aside>;
}

export function IntelligenceBanner() {
  return <section className="ig-banner"><div><p className="ig-eyebrow">A stronger foundation for your decisions</p><h2>Know the evidence. Understand the limits.</h2><p>Explore source-linked country research, compare context and build your next steps.</p></div><div className="ig-actions"><Link href="/country-fit" className="ig-button">Build my Country Fit →</Link><Link href="/intelligence" className="ig-button ig-secondary">Explore the methodology</Link></div></section>;
}
