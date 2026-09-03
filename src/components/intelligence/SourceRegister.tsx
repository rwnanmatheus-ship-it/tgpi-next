import Link from "next/link";
import { getCountry } from "@/lib/countries";
import { DOSSIER_COUNTRIES, DOSSIER_SOURCES, dossierFor } from "@/lib/intelligence/dossiers";

export default function SourceRegister() {
  const issues = DOSSIER_SOURCES.filter(s => s.reviewIssue);
  const manual = DOSSIER_SOURCES.filter(s => !s.automaticCheck);
  return <section id="source-review" className="ig-section ig-panel" aria-label="Source register and review queue">
    <p className="ig-eyebrow">Evidence operations / Public review register</p><h2>Every gap has a next step.</h2>
    <p className="ig-small">{DOSSIER_SOURCES.length} registered sources · {manual.length} manual-only · {issues.length} open review issues. A past content review and today’s checker access are different facts. An issue remains open until an explicit editorial review closes it; HTTP 200 cannot close it automatically.</p>
    <div className="ig-stack">{issues.map(source => <article className="ig-watch-row" key={source.id}><div className="ig-spread"><h3>{getCountry(source.country)?.name} · {source.title}</h3><span className="ig-badge ig-historical">{source.reviewIssue!.reason.replaceAll("-", " ")}</span></div><p className="ig-small">{source.reviewIssue!.observation}</p><p className="ig-small"><strong>Next step:</strong> {source.reviewIssue!.action}</p><p className="ig-meta">Observed {source.reviewIssue!.observedAt} · Review by {source.reviewIssue!.reviewBy} · {source.automaticCheck ? "Automatic signals remain enabled" : "Manual verification only"}</p><a className="ig-link" href={source.url} target="_blank" rel="noreferrer">Open the public source ↗</a></article>)}</div>
    <h3 className="ig-section">Inspect the full source register</h3>
    <div className="ig-stack">{DOSSIER_COUNTRIES.map(country => { const dossier = dossierFor(country); return <details className="ig-details" key={country}><summary>{getCountry(country)?.name} — {dossier.sources.length} {dossier.sources.length === 1 ? "source" : "sources"}</summary>{dossier.sources.map(source => {
      const claims = dossier.claims.filter(c => c.sourceId === source.id);
      const nextReviews = claims.map(c => new Date(Date.parse(c.reviewedAt) + c.reviewDays * 86400000).toISOString().slice(0, 10));
      return <article className="ig-watch-row" key={source.id}><a className="ig-link" href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><p className="ig-meta">{source.publisher} · {source.kind.replaceAll("-", " ")} · {source.status === "unconfirmed" ? "Content unconfirmed" : source.status === "limited" ? "Limited-scope content review" : "Content reviewed"}</p><p className="ig-small">{source.note}</p><p className="ig-meta">{source.reviewedAt ? `Reviewed ${source.reviewedAt}` : "No completed content review"} · {claims.length} linked {claims.length === 1 ? "summary" : "summaries"} · {source.automaticCheck ? "Automatic signals enabled" : "Manual verification only"}{nextReviews.length ? ` · Next content review by ${nextReviews.sort()[0]}` : ""}</p>{source.reviewIssue ? <p className="ig-caution">Open review issue — action above. A previously reviewed summary is not independently recertified by the automated check.</p> : null}</article>;
    })}<Link className="ig-link" href={`/countries/${country}#research-dossier`}>Read this destination’s evidence →</Link></details>; })}</div>
  </section>;
}
