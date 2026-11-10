"use client";


import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useState } from "react";
import { DOSSIER_VERSION, dossierFor } from "@/lib/intelligence/dossiers";
import { validateSourceChecks, type SourceCheck } from "@/lib/intelligence/source-checks";

const LABELS: Record<SourceCheck["status"], string> = { "markers-present": "Reference markers found", "review-needed": "Review needed", restricted: "Checker access restricted", unreachable: "Check inconclusive", redirect: "Redirect needs review", "not-checked": "Manual verification only" };
export default function SourceWatch({ country }: { country: string }) {
  return <CountrySourceWatch key={country} country={country} />;
}
function CountrySourceWatch({ country }: { country: string }) {
  const [checks, setChecks] = useState<SourceCheck[] | null>(null);
  const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const { sources } = dossierFor(country);
  if (!sources.length) return null;
  async function check() {
    setBusy(true); setError(""); setChecks(null);
    try {
      const response = await fetch(`/api/intelligence/sources/${encodeURIComponent(country)}`);
      if (!response.ok) throw new Error("The source-check service could not complete this request.");
      const body = await response.json();
      if (body.country !== country || body.version !== DOSSIER_VERSION || !validateSourceChecks(body.checks, sources)) throw new Error("Incomplete or unexpected source-check response. No result was accepted.");
      setChecks(body.checks);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to check sources."); }
    finally { setBusy(false); }
  }
  return <LocalizedElement as="section" className="ig-section ig-panel" aria-label="Source watch"><div className="ig-spread"><div><p className="ig-eyebrow"><LocalizedText text={"Source watch / Separate from editorial review"} /></p><h2><LocalizedText text={"Inspect the update signals."} /></h2></div><button className="ig-button" type="button" onClick={check} disabled={busy}>{busy ? <LocalizedText text={"Checking public sources…"} /> : <LocalizedText text={"Check source signals"} />}</button></div><p className="ig-small"><LocalizedText text={"The checker reads registered public pages only. Results are cached for up to six hours; a daily job is configured, not a guarantee of continuous monitoring. HTTP access and selected text markers cannot prove that a rule is current or applies to you. Successful checks never renew editorial dates or clear outstanding review issues."} /></p><a className="ig-link" href="/intelligence/research#source-review"><LocalizedText text={"Inspect the source register and review queue →"} /></a><p role="status" className="ig-small">{error ? <LocalizedText text={error} /> : (busy ? <LocalizedText text={"Checking; your personal answers are not sent to any source."} /> : checks ? <LocalizedText text={"{value0} with markers present; {value1} manual-only; {value2} checks need attention."} values={{value0: String(checks.filter(c => c.status === "markers-present").length), value1: String(checks.filter(c => c.status === "not-checked").length), value2: String(checks.filter(c => !["markers-present", "not-checked"].includes(c.status)).length)}} /> : "")}</p>
    {checks ? <div className="ig-stack">{checks.map(check => { const source = sources.find(s => s.id === check.sourceId); if (!source) return null; return <article className="ig-watch-row" key={check.sourceId}><div className="ig-spread"><a className="ig-link" href={source.url} target="_blank" rel="noreferrer">{source.publisher} ↗</a><span className={`ig-badge ${check.status === "markers-present" ? "ig-current" : "ig-historical"}`}><LocalizedText text={LABELS[check.status]} /></span></div><p className="ig-meta">{check.checkedAt ? <LocalizedText text={"Checked {value0} UTC"} values={{value0: String(check.checkedAt.replace("T", " ").slice(0, 16))}} /> : <LocalizedText text={"No automated retrieval"} />}{check.httpStatus ? <LocalizedText text={" · HTTP {value0}"} values={{value0: String(check.httpStatus)}} /> : ""} · {check.matchedMarkers}/{check.expectedMarkers}{" "}<LocalizedText text={"selected markers"} /></p><p className="ig-small"><LocalizedText text={check.message} /></p>{check.contentSha256 ? <details className="ig-details"><summary><LocalizedText text={"Content fingerprint"} /></summary><p className="ig-meta"><LocalizedText text={"SHA-256 of normalized page text:"} />{" "}{check.contentSha256}<LocalizedText text={". A text change signals review, not necessarily a policy change."} /></p></details> : null}</article>; })}</div> : null}
  </LocalizedElement>;
}
