"use client";
import { useState } from "react";
import { emptyWorksheet, type ResearchWorksheet } from "@/lib/intelligence/research-plan";
import { COUNTRY_CURRENCIES } from "@/lib/intelligence/dossiers";
export default function ResearchReportCard({ country, name, worksheet }: { country: string; name: string; worksheet?: ResearchWorksheet }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function download() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/intelligence/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(worksheet ?? emptyWorksheet(country, COUNTRY_CURRENCIES[country] ?? "USD")) });
      if (!response.ok) { const data = await response.json(); throw Error(data.error || "Unable to create report."); }
      const url = URL.createObjectURL(await response.blob()); const link = document.createElement("a"); link.href = url; link.download = `TGPI-${country}-research.pdf`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); } finally { setBusy(false); }
  }
  return <aside className="research-report-card"><div><p className="ig-eyebrow">TGPI / Research edition</p><strong>Your {name} decision brief</strong><p>Take your scenario, research priorities, evidence and dated sources with you.</p></div><button type="button" className="ig-button" disabled={busy} onClick={download}>{busy ? "Preparing PDF…" : "Download research PDF ↓"}</button>{error && <p role="alert">{error}</p>}</aside>;
}
