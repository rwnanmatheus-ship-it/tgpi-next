import Link from "next/link";
import { dossierFor, formatReference, referenceReviewState, reviewState, sourceFor, type DossierClaim, type EvidenceLayer } from "@/lib/intelligence/dossiers";

const LAYERS: Record<EvidenceLayer, string> = { entry: "Entry & residence", education: "Education & recognition", cost: "Costs & funding" };
export function ClaimCard({ claim }: { claim: DossierClaim }) {
  const source = sourceFor(claim.sourceId)!;
  const state = reviewState(claim);
  const label = state === "reviewed" ? source.status === "limited" ? "Limited-scope review" : "Source reviewed" : state === "review-due" ? "Review overdue" : state === "expired" ? "Reference period ended" : "Not yet effective";
  return <article className="ig-evidence ig-claim">
    <div className="ig-spread"><span className="ig-eyebrow">{LAYERS[claim.layer]} / {claim.kind}</span><span className={`ig-badge ${state === "reviewed" && source.status === "reviewed" ? "ig-current" : "ig-historical"}`}>{label}</span></div>
    <h3>{claim.title}</h3><p className="ig-small">{claim.summary}</p>
    {state !== "reviewed" ? <p className="ig-caution">Do not rely on this as current guidance. Open the official source and obtain a new review.</p> : null}
    {source.reviewIssue ? <p className="ig-caution">Open source-review issue, observed {source.reviewIssue.observedAt}: {source.reviewIssue.observation} <Link className="ig-link" href="/intelligence/research#source-review">Review action and deadline →</Link></p> : null}
    <p className="ig-meta"><strong>Applies to:</strong> {claim.audience}</p>
    <p className="ig-meta"><strong>Reference:</strong> {claim.referencePeriod}{claim.effectiveFrom ? ` · Effective from ${claim.effectiveFrom}` : ""}</p>
    <details className="ig-details"><summary>Limits, questions and provenance</summary><p className="ig-small">{claim.limits}</p><ul className="ig-question-list">{claim.questions.map(q => <li key={q}>{q}</li>)}</ul><p className="ig-meta">Source reviewed {claim.reviewedAt} · Review interval {claim.reviewDays} days · Claim {claim.id}. Review means a source-content check, not a personal eligibility determination.</p></details>
    <a href={source.url} className="ig-link" target="_blank" rel="noreferrer">{source.publisher} — inspect source ↗</a>
  </article>;
}
export function CostReferences({ country }: { country: string }) {
  const { costs } = dossierFor(country);
  return <section className="ig-section" aria-label="Published cost references"><p className="ig-eyebrow">Published references / Keep the scope attached</p><h2>A reference, not your final budget.</h2>
    {costs.length ? <div className="ig-evidence-grid">{costs.map(cost => <article className="ig-evidence" key={cost.id}><div className="ig-spread"><span className="ig-badge">{cost.category === "living" ? "Living expenses" : "Total study budget"}</span><span className={`ig-badge ${cost.historical ? "ig-historical" : ""}`}>{cost.referencePeriod}</span></div><h3>{cost.title}</h3><p className="ig-value">{formatReference(cost)}</p><p className="ig-meta">{cost.location} · {cost.audience}</p><p className="ig-small"><strong>Includes:</strong> {cost.includes}<br /><strong>Separate or excluded:</strong> {cost.excludes}</p><p className="ig-caution">{referenceReviewState(cost) !== "reviewed" ? "The review is overdue or the reference period has ended. Obtain a new source review before using this figure." : cost.historical ? "Historical observation: obtain current local quotes before planning." : "Different currencies, periods and coverage are not ranked or silently converted."}</p><a className="ig-link" href={sourceFor(cost.sourceId)!.url} target="_blank" rel="noreferrer">Read the original estimate ↗</a></article>)}</div> : <p className="ig-status">No numeric living-cost estimate has passed this layer’s publication review for this destination. An immigration funds threshold or tuition policy must not fill that gap. Use the worksheet with your own dated quotes.</p>}
  </section>;
}
export default function DossierEvidence({ country, compact = false }: { country: string; compact?: boolean }) {
  const dossier = dossierFor(country);
  return <section id="research-dossier" className="ig-section"><p className="ig-eyebrow">Decision dossier / Layer-specific evidence</p><h2>What matters beyond national averages.</h2>
    <p className="ig-small">Reviewed summaries, precise audiences and unresolved questions. These initial dossiers focus on study decisions; work, tax and regulated-profession eligibility are not automatically established.</p>
    {dossier.claims.length ? <div className={compact ? "ig-stack" : "ig-evidence-grid"}>{dossier.claims.map(c => <ClaimCard key={c.id} claim={c} />)}</div> : <p className="ig-status">This destination has national statistics, but no reviewed detailed dossier in this release. Your personal worksheet remains available. Missing evidence is not replaced by a generic country rule.</p>}
    {dossier.sources.some(s => s.status === "unconfirmed") ? <div className="ig-panel ig-section"><h3>Sources still awaiting content verification</h3>{dossier.sources.filter(s => s.status === "unconfirmed").map(s => <div key={s.id}><a className="ig-link" href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a><p className="ig-small">{s.note}</p></div>)}</div> : null}
    <Link href={`/country-fit?country=${country}#research-workbench`} className="ig-link">Turn these questions into my worksheet →</Link>
  </section>;
}
