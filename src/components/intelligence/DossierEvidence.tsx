
import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import { dossierFor, formatMoney, referenceReviewState, reviewState, sourceFor, type DossierClaim, type EvidenceLayer } from "@/lib/intelligence/dossiers";

const KIND_LABELS = { requirement: "Requirement", directory: "Directory", estimate: "Estimate", guidance: "Guidance" } as const;
const LAYERS: Record<EvidenceLayer, string> = { entry: "Entry & residence", education: "Education & recognition", cost: "Costs & funding" };
export function ClaimCard({ claim }: { claim: DossierClaim }) {
  const source = sourceFor(claim.sourceId)!;
  const state = reviewState(claim);
  const label = state === "reviewed" ? source.status === "limited" ? "Limited-scope review" : "Source reviewed" : state === "review-due" ? "Review overdue" : state === "expired" ? "Reference period ended" : "Not yet effective";
  return <article className="ig-evidence ig-claim">
    <div className="ig-spread"><span className="ig-eyebrow"><LocalizedText text={LAYERS[claim.layer]} /> / <LocalizedText text={KIND_LABELS[claim.kind]} /></span><span className={`ig-badge ${state === "reviewed" && source.status === "reviewed" ? "ig-current" : "ig-historical"}`}><LocalizedText text={label} /></span></div>
    <h3><LocalizedText text={claim.title} /></h3><p className="ig-small"><LocalizedText text={claim.summary} /></p>
    {state !== "reviewed" ? <p className="ig-caution"><LocalizedText text={"Do not rely on this as current guidance. Open the official source and obtain a new review."} /></p> : null}
    {source.reviewIssue ? <p className="ig-caution"><LocalizedText text={"Open source-review issue, observed"} />{" "}{source.reviewIssue.observedAt}: <LocalizedText text={source.reviewIssue.observation} /> <Link className="ig-link" href="/intelligence/research#source-review"><LocalizedText text={"Review action and deadline →"} /></Link></p> : null}
    <p className="ig-meta"><strong><LocalizedText text={"Applies to:"} /></strong> <LocalizedText text={claim.audience} /></p>
    <p className="ig-meta"><strong><LocalizedText text={"Reference:"} /></strong> <LocalizedText text={claim.referencePeriod} />{claim.effectiveFrom ? <LocalizedText text={" · Effective from {value0}"} values={{value0: String(claim.effectiveFrom)}} /> : ""}</p>
    <details className="ig-details"><summary><LocalizedText text={"Limits, questions and provenance"} /></summary><p className="ig-small"><LocalizedText text={claim.limits} /></p><ul className="ig-question-list">{claim.questions.map(q => <li key={q}><LocalizedText text={q} /></li>)}</ul><p className="ig-meta"><LocalizedText text={"Source reviewed"} />{" "}{claim.reviewedAt}{" "}<LocalizedText text={"· Review interval"} />{" "}{claim.reviewDays}{" "}<LocalizedText text={"days · Claim"} />{" "}{claim.id}<LocalizedText text={". Review means a source-content check, not a personal eligibility determination."} /></p></details>
    <a href={source.url} className="ig-link" target="_blank" rel="noreferrer">{source.publisher}{" "}<LocalizedText text={"— inspect source ↗"} /></a>
  </article>;
}
export async function CostReferences({ country }: { country: string }) {
  const { costs } = dossierFor(country);
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);
  const formatCost = (cost: (typeof costs)[number]) => `${formatMoney(cost.low, cost.currency, locale)}${cost.high === cost.low ? "" : `–${formatMoney(cost.high, cost.currency, locale)}`} / ${cost.periodMonths} ${t(cost.periodMonths === 1 ? "month" : "months")}`;
  return <LocalizedElement as="section" className="ig-section" aria-label="Published cost references"><p className="ig-eyebrow"><LocalizedText text={"Published references / Keep the scope attached"} /></p><h2><LocalizedText text={"A reference, not your final budget."} /></h2>
    {costs.length ? <div className="ig-evidence-grid">{costs.map(cost => <article className="ig-evidence" key={cost.id}><div className="ig-spread"><span className="ig-badge">{cost.category === "living" ? <LocalizedText text={"Living expenses"} /> : <LocalizedText text={"Total study budget"} />}</span><span className={`ig-badge ${cost.historical ? "ig-historical" : ""}`}><LocalizedText text={cost.referencePeriod} /></span></div><h3><LocalizedText text={cost.title} /></h3><p className="ig-value">{formatCost(cost)}</p><p className="ig-meta"><LocalizedText text={cost.location} /> · <LocalizedText text={cost.audience} /></p><p className="ig-small"><strong><LocalizedText text={"Includes:"} /></strong> <LocalizedText text={cost.includes} /><br /><strong><LocalizedText text={"Separate or excluded:"} /></strong> <LocalizedText text={cost.excludes} /></p><p className="ig-caution">{referenceReviewState(cost) !== "reviewed" ? <LocalizedText text={"The review is overdue or the reference period has ended. Obtain a new source review before using this figure."} /> : cost.historical ? <LocalizedText text={"Historical observation: obtain current local quotes before planning."} /> : <LocalizedText text={"Different currencies, periods and coverage are not ranked or silently converted."} />}</p><a className="ig-link" href={sourceFor(cost.sourceId)!.url} target="_blank" rel="noreferrer"><LocalizedText text={"Read the original estimate ↗"} /></a></article>)}</div> : <p className="ig-status"><LocalizedText text={"No numeric living-cost estimate has passed this layer’s publication review for this destination. An immigration funds threshold or tuition policy must not fill that gap. Use the worksheet with your own dated quotes."} /></p>}
  </LocalizedElement>;
}
export default function DossierEvidence({ country, compact = false }: { country: string; compact?: boolean }) {
  const dossier = dossierFor(country);
  return <section id="research-dossier" className="ig-section"><p className="ig-eyebrow"><LocalizedText text={"Decision dossier / Layer-specific evidence"} /></p><h2><LocalizedText text={"What matters beyond national averages."} /></h2>
    <p className="ig-small"><LocalizedText text={"Reviewed summaries, precise audiences and unresolved questions. These initial dossiers focus on study decisions; work, tax and regulated-profession eligibility are not automatically established."} /></p>
    {dossier.claims.length ? <div className={compact ? "ig-stack" : "ig-evidence-grid"}>{dossier.claims.map(c => <ClaimCard key={c.id} claim={c} />)}</div> : <p className="ig-status"><LocalizedText text={"The global dossier above covers twelve research topics. Additional destination-specific study summaries are not yet published here; confirm individual rules with the competent authority."} /></p>}
    {dossier.sources.some(s => s.status === "unconfirmed") ? <div className="ig-panel ig-section"><h3><LocalizedText text={"Sources still awaiting content verification"} /></h3>{dossier.sources.filter(s => s.status === "unconfirmed").map(s => <div key={s.id}><a className="ig-link" href={s.url} target="_blank" rel="noreferrer"><LocalizedText text={s.title} /> ↗</a><p className="ig-small"><LocalizedText text={s.note} /></p></div>)}</div> : null}
    <Link href={`/country-fit?country=${country}#research-workbench`} className="ig-link"><LocalizedText text={"Turn these questions into my worksheet →"} /></Link>
  </section>;
}
