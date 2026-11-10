"use client";

import { useEffect, useRef, useState } from "react";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText as Copy } from "@/components/localization/LocaleProvider";
import { DOSSIER_VERSION, dossierFor } from "@/lib/intelligence/dossiers";
import { sourceCheckIsStale, validateSourceChecks, type SourceCheck } from "@/lib/intelligence/source-checks";

const labels: Record<SourceCheck["status"], string> = {
  "markers-present": "Reference markers found",
  "review-needed": "Review needed",
  restricted: "Checker access restricted",
  unreachable: "Check inconclusive",
  redirect: "Redirect needs review",
  "not-checked": "Manual verification only",
};
const failure = "The source-check service could not complete this request.";
const unexpected = "Incomplete or unexpected source-check response. No result was accepted.";

export default function SourceWatch({ country }: { country: string }) {
  return <CountrySourceWatch key={country} country={country} />;
}

function CountrySourceWatch({ country }: { country: string }) {
  const [result, setResult] = useState<{ checks: SourceCheck[]; receivedAt: number }>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const { sources } = dossierFor(country);
  useEffect(() => () => controller.current?.abort(), []);
  if (!sources.length) return null;

  async function check() {
    if (controller.current) return;
    const request = new AbortController();
    controller.current = request;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/intelligence/sources/${encodeURIComponent(country)}`, { signal: request.signal });
      if (!response.ok) {
        setError(failure);
        return;
      }
      const body = await response.json();
      if (body.country !== country || body.version !== DOSSIER_VERSION || !validateSourceChecks(body.checks, sources)) {
        setError(unexpected);
        return;
      }
      setResult({ checks: body.checks, receivedAt: Date.now() });
    } catch {
      if (!request.signal.aborted) setError(failure);
    } finally {
      controller.current = null;
      if (!request.signal.aborted) setBusy(false);
    }
  }

  const checks = result?.checks.map(check => ({ ...check, stale: sourceCheckIsStale(check, result.receivedAt) }));
  const found = checks?.filter(check => check.status === "markers-present" && !check.stale).length ?? 0;
  const manual = checks?.filter(check => check.status === "not-checked").length ?? 0;
  return (
    <LocalizedElement as="section" className="ig-section ig-panel" aria-label="Source watch">
      <div className="ig-spread">
        <div><p className="ig-eyebrow"><Copy text="Source watch / Separate from editorial review" /></p><h2><Copy text="Inspect the update signals." /></h2></div>
        <button className="ig-button" type="button" onClick={() => void check()} disabled={busy}><Copy text={busy ? "Checking public sources…" : "Check source signals"} /></button>
      </div>
      <p className="ig-small"><Copy text="The checker reads registered public pages only. Results are cached for up to six hours; a daily job is configured, not a guarantee of continuous monitoring. HTTP access and selected text markers cannot prove that a rule is current or applies to you. Successful checks never renew editorial dates or clear outstanding review issues." /></p>
      <a className="ig-link" href="/intelligence/research#source-review"><Copy text="Inspect the source register and review queue →" /></a>
      <p role="status" className="ig-small">
        {error ? <Copy text={error} /> : busy ? <Copy text="Checking; your personal answers are not sent to any source." /> : checks
          ? <Copy text="{found} with markers present · {manual} manual checks · {attention} need attention" values={{ found, manual, attention: checks.length - found - manual }} /> : null}
      </p>
      {checks ? (
        <div className="ig-stack">
          {checks.map(check => {
            const source = sources.find(source => source.id === check.sourceId);
            if (!source) return null;
            return (
              <article className="ig-watch-row" key={check.sourceId}>
                <div className="ig-spread">
                  <a className="ig-link" href={source.url} target="_blank" rel="noreferrer">{source.publisher} <span aria-hidden="true">↗</span></a>
                  <span className={`ig-badge ${check.status === "markers-present" && !check.stale ? "ig-current" : "ig-historical"}`}><Copy text={check.stale ? "Older automated signal" : labels[check.status]} /></span>
                </div>
                <p className="ig-meta">
                  {check.checkedAt ? <Copy text={"Checked {value0} UTC"} values={{ value0: check.checkedAt.replace("T", " ").slice(0, 16) }} /> : <Copy text="No automated retrieval" />}
                  {check.httpStatus ? <Copy text={" · HTTP {value0}"} values={{ value0: check.httpStatus }} /> : null}
                  {" · "}{check.matchedMarkers}/{check.expectedMarkers} <Copy text="selected markers" />
                </p>
                <p className="ig-small"><Copy text={check.message} /></p>
                {check.contentSha256 ? <details className="ig-details"><summary><Copy text="Content fingerprint" /></summary><p className="ig-meta"><Copy text={"SHA-256 of normalized page text:"} /> {check.contentSha256}<Copy text={". A text change signals review, not necessarily a policy change."} /></p></details> : null}
              </article>
            );
          })}
        </div>
      ) : null}
    </LocalizedElement>
  );
}
