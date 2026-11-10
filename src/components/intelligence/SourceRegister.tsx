
import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import { getCountry } from "@/lib/countries";
import { DOSSIER_COUNTRIES, DOSSIER_SOURCES, dossierFor } from "@/lib/intelligence/dossiers";

export default function SourceRegister() {
  const issues = DOSSIER_SOURCES.filter(s => s.reviewIssue);
  const manual = DOSSIER_SOURCES.filter(s => !s.automaticCheck);
  return <LocalizedElement as="section" id="source-review" className="ig-section ig-panel" aria-label="Source register and review queue">
    <p className="ig-eyebrow"><LocalizedText text={"Evidence operations / Public review register"} /></p><h2><LocalizedText text={"Every gap has a next step."} /></h2>
    <p className="ig-small">{DOSSIER_SOURCES.length}{" "}<LocalizedText text={"registered sources ·"} />{" "}{manual.length}{" "}<LocalizedText text={"manual-only ·"} />{" "}{issues.length}{" "}<LocalizedText text={"open review issues. A past content review and today’s checker access are different facts. An issue remains open until an explicit editorial review closes it; HTTP 200 cannot close it automatically."} /></p>
    <div className="ig-stack">{issues.map(source => <article className="ig-watch-row" key={source.id}><div className="ig-spread"><h3>{getCountry(source.country)?.name} · <LocalizedText text={source.title} /></h3><span className="ig-badge ig-historical">{source.reviewIssue!.reason.replaceAll("-", " ")}</span></div><p className="ig-small"><LocalizedText text={source.reviewIssue!.observation} /></p><p className="ig-small"><strong><LocalizedText text={"Next step:"} /></strong> <LocalizedText text={source.reviewIssue!.action} /></p><p className="ig-meta"><LocalizedText text={"Observed"} />{" "}{source.reviewIssue!.observedAt}{" "}<LocalizedText text={"· Review by"} />{" "}{source.reviewIssue!.reviewBy} · {source.automaticCheck ? <LocalizedText text={"Automatic signals remain enabled"} /> : <LocalizedText text={"Manual verification only"} />}</p><a className="ig-link" href={source.url} target="_blank" rel="noreferrer"><LocalizedText text={"Open the public source ↗"} /></a></article>)}</div>
    <h3 className="ig-section"><LocalizedText text={"Inspect the full source register"} /></h3>
    <div className="ig-stack">{DOSSIER_COUNTRIES.map(country => { const dossier = dossierFor(country); return <details className="ig-details" key={country}><summary>{getCountry(country)?.name} — {dossier.sources.length} {dossier.sources.length === 1 ? <LocalizedText text={"source"} /> : <LocalizedText text={"sources"} />}</summary>{dossier.sources.map(source => {
      const claims = dossier.claims.filter(c => c.sourceId === source.id);
      const nextReviews = claims.map(c => new Date(Date.parse(c.reviewedAt) + c.reviewDays * 86400000).toISOString().slice(0, 10));
      return <article className="ig-watch-row" key={source.id}><a className="ig-link" href={source.url} target="_blank" rel="noreferrer"><LocalizedText text={source.title} /> ↗</a><p className="ig-meta">{source.publisher} · {source.kind.replaceAll("-", " ")} · {source.status === "unconfirmed" ? <LocalizedText text={"Content unconfirmed"} /> : source.status === "limited" ? <LocalizedText text={"Limited-scope content review"} /> : <LocalizedText text={"Content reviewed"} />}</p><p className="ig-small"><LocalizedText text={source.note} /></p><p className="ig-meta">{source.reviewedAt ? <LocalizedText text={"Reviewed {value0}"} values={{value0: String(source.reviewedAt)}} /> : <LocalizedText text={"No completed content review"} />} · {claims.length}{" "}<LocalizedText text={"linked"} />{" "}{claims.length === 1 ? <LocalizedText text={"summary"} /> : <LocalizedText text={"summaries"} />} · {source.automaticCheck ? <LocalizedText text={"Automatic signals enabled"} /> : <LocalizedText text={"Manual verification only"} />}{nextReviews.length ? <LocalizedText text={" · Next content review by {value0}"} values={{value0: String(nextReviews.sort()[0])}} /> : ""}</p>{source.reviewIssue ? <p className="ig-caution"><LocalizedText text={"Open review issue — action above. A previously reviewed summary is not independently recertified by the automated check."} /></p> : null}</article>;
    })}<Link className="ig-link" href={`/countries/${country}#research-dossier`}><LocalizedText text={"Read this destination’s evidence →"} /></Link></details>; })}</div>
  </LocalizedElement>;
}
