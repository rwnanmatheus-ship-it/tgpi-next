"use client";
import { useState } from "react";
import Link from "next/link";
export default function AppliedCredentialButton({ courseId, publicName }: { courseId: string; publicName: string }) {
  const [consent, setConsent] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [credentialId, setCredentialId] = useState("");
  async function issue() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/learning/credentials/issue", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId, publicNameConsent: consent }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Issuance failed. Please retry.");
      setCredentialId(data.credentialId);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Issuance is unavailable. Please retry."); }
    finally { setBusy(false); }
  }
  return <div className="mt-5 border-t pt-5">{credentialId ? <Link href={`/certificates/${encodeURIComponent(credentialId)}`} className="inline-flex min-h-12 items-center font-bold underline">Open your issued certificate →</Link> : <><label className="flex gap-3 text-sm leading-7"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-2 h-4 w-4" />I confirm the name “{publicName}” and consent to its display on the public verification page. I can correct my account name before issuance.</label><button type="button" disabled={!consent || busy} onClick={() => void issue()} className="mt-4 min-h-12 rounded-xl bg-[var(--tgpi-navy)] px-5 font-bold text-white disabled:opacity-50">{busy ? "Issuing…" : "Issue course certificate"}</button></>}<p role="status" className="mt-3 text-sm leading-6">{error}</p></div>;
}
