"use client";
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
  return <section className="ig-section ig-panel" aria-label="Source watch"><div className="ig-spread"><div><p className="ig-eyebrow">Source watch / Separate from editorial review</p><h2>Inspect the update signals.</h2></div><button className="ig-button" type="button" onClick={check} disabled={busy}>{busy ? "Checking public sources…" : "Check source signals"}</button></div><p className="ig-small">The checker reads registered public pages only. Results are cached for up to six hours; a daily job is configured, not a guarantee of continuous monitoring. HTTP access and selected text markers cannot prove that a rule is current or applies to you. Successful checks never renew editorial dates or clear outstanding review issues.</p><a className="ig-link" href="/intelligence/research#source-review">Inspect the source register and review queue →</a><p role="status" className="ig-small">{error || (busy ? "Checking; your personal answers are not sent to any source." : checks ? `${checks.filter(c => c.status === "markers-present").length} with markers present; ${checks.filter(c => c.status === "not-checked").length} manual-only; ${checks.filter(c => !["markers-present", "not-checked"].includes(c.status)).length} checks need attention.` : "")}</p>
    {checks ? <div className="ig-stack">{checks.map(check => { const source = sources.find(s => s.id === check.sourceId); if (!source) return null; return <article className="ig-watch-row" key={check.sourceId}><div className="ig-spread"><a className="ig-link" href={source.url} target="_blank" rel="noreferrer">{source.publisher} ↗</a><span className={`ig-badge ${check.status === "markers-present" ? "ig-current" : "ig-historical"}`}>{LABELS[check.status]}</span></div><p className="ig-meta">{check.checkedAt ? `Checked ${check.checkedAt.replace("T", " ").slice(0, 16)} UTC` : "No automated retrieval"}{check.httpStatus ? ` · HTTP ${check.httpStatus}` : ""} · {check.matchedMarkers}/{check.expectedMarkers} selected markers</p><p className="ig-small">{check.message}</p>{check.contentSha256 ? <details className="ig-details"><summary>Content fingerprint</summary><p className="ig-meta">SHA-256 of normalized page text: {check.contentSha256}. A text change signals review, not necessarily a policy change.</p></details> : null}</article>; })}</div> : null}
  </section>;
}
