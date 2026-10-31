"use client";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { emptyWorksheet, validateWorksheet, RESEARCH_TASKS, type ResearchWorksheet } from "@/lib/intelligence/research-plan";
import { COUNTRY_CURRENCIES } from "@/lib/intelligence/dossiers";
export default function ResearchReportCard({ country, name, worksheet }: { country: string; name: string; worksheet?: ResearchWorksheet }) {
  const { isLoaded, user } = useUser();
  const [slot, setSlot] = useState("1");
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function download() {
    setBusy(true); setError("");
    try {
      let reportWorksheet = worksheet ?? emptyWorksheet(country, COUNTRY_CURRENCIES[country] ?? "USD");
      if (!worksheet && user) {
        const saved = await fetch(`/api/intelligence/scenarios?country=${encodeURIComponent(country)}&slot=${slot}`, { cache: "no-store" });
        if (!saved.ok) throw Error("Your saved scenario could not be loaded. Open the Decision Lab to review your draft before exporting.");
        const data = await saved.json();
        if (data.worksheet) {
          const valid = validateWorksheet(data.worksheet, [country], RESEARCH_TASKS.map(task => task.id));
          if (!valid) throw Error("Review your saved scenario in the Decision Lab before exporting.");
          reportWorksheet = valid;
        }
      }
      const response = await fetch("/api/intelligence/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reportWorksheet) });
      if (!response.ok) { const data = await response.json(); throw Error(data.error || "Unable to create report."); }
      const url = URL.createObjectURL(await response.blob()); const link = document.createElement("a"); link.href = url; link.download = `TGPI-${country}-research.pdf`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); } finally { setBusy(false); }
  }
  return <aside className="research-report-card"><div><p className="ig-eyebrow">TGPI / Research edition</p><strong>Your {name} decision brief</strong><p>{worksheet ? "Download this scenario with your evidence, checkpoints and dated sources." : user ? "Download a saved scenario with published country evidence. Unsaved drafts are available in the Decision Lab." : "Download published country evidence and an empty planning worksheet."}</p></div>{!worksheet && user && <label className="report-scenario-select">Saved scenario<select value={slot} disabled={busy || !isLoaded} onChange={event => setSlot(event.target.value)}>{["1", "2", "3"].map(id => <option key={id} value={id}><LocalizedText text="Scenario" />{" "}{id}</option>)}</select></label>}<button type="button" className="ig-button" disabled={busy || !isLoaded} onClick={download}>{busy ? "Preparing PDF…" : "Download research PDF ↓"}</button>{error && <p role="alert">{error}</p>}</aside>;
}
