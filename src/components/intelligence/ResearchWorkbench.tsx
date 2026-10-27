"use client";
import { useEffect, useRef, useState } from "react";
import { useResearchProfile } from "./useResearchProfile";
import ResearchReportCard from "./ResearchReportCard";
import { announceProgressSaved, PROGRESS_SYNC_EVENT } from "@/lib/progress-sync";
import Link from "next/link";
import { COUNTRY_CURRENCIES, dossierFor, formatMoney, formatReference, referenceReviewState, sourceFor } from "@/lib/intelligence/dossiers";
import SourceReviewNotice from "./SourceReviewNotice";
import { COST_CATEGORIES, PLAN_CURRENCIES, RESEARCH_TASKS, emptyWorksheet, validateWorksheet, worksheetTotals, type ResearchWorksheet, type PlanningCurrency } from "@/lib/intelligence/research-plan";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export default function ResearchWorkbench({ country, countryName }: { country: string; countryName: string }) {
  const { user, isLoaded } = useResearchProfile();
  const [slot, setSlot] = useState("1");
  if (!isLoaded) return <section className="ig-panel" role="status">Loading your decision workspace…</section>;
  return <div className="decision-lab"><div className="research-slot-bar"><span>Decision Lab / Independent scenarios</span><div role="group" aria-label="Scenario slots">{["1", "2", "3"].map(id => <button type="button" aria-pressed={slot === id} key={id} onClick={() => setSlot(id)}><LocalizedText text="Scenario" />{" "}{id}</button>)}</div></div><Worksheet key={`${user?.id ?? "guest"}:${country}:${slot}`} owner={user?.id ?? "guest"} slot={slot} country={country} countryName={countryName} canSave={Boolean(user)} /></div>;
}
function Worksheet({ country, countryName, canSave, owner, slot }: { country: string; countryName: string; canSave: boolean; owner: string; slot: string }) {
  const [plan, setPlan] = useState<ResearchWorksheet>(() => emptyWorksheet(country, COUNTRY_CURRENCIES[country] ?? "USD"));
  const [notice, setNotice] = useState(""); const [busy, setBusy] = useState(false); const [dirty, setDirty] = useState(false);
  const [ready, setReady] = useState(false), [pendingCurrency, setPendingCurrency] = useState<PlanningCurrency | null>(null);
  const [discardRequested, setDiscardRequested] = useState(false);
  const [undoPlan, setUndoPlan] = useState<ResearchWorksheet | null>(null);
  const revision = useRef(0), cloudRevision = useRef<string | null>(null);
  const draftKey = `tgpi:research:v3:${owner}:${country}:${slot}`;
  const endpoint = `/api/intelligence/scenarios?country=${encodeURIComponent(country)}&slot=${slot}`;
  const totals = worksheetTotals(plan); const dossier = dossierFor(country);
  const valid = Boolean(validateWorksheet(plan, [country], RESEARCH_TASKS.map(t => t.id)));
  useEffect(() => {
    const controller = new AbortController(); let restored = false;
    try { const draft = JSON.parse(sessionStorage.getItem(draftKey) || "null"); const checked = validateWorksheet(draft?.worksheet, [country], RESEARCH_TASKS.map(t => t.id)); if (checked) { restored = true; setPlan(checked); cloudRevision.current = draft.revision ?? null; setDirty(true); setNotice("Your private tab draft has been restored. Save to sync across devices."); } } catch { /* Draft storage may be disabled. */ }
    const load = async () => {
      try {
        if (!canSave) return;
        const response = await fetch(endpoint, { cache: "no-store", signal: controller.signal }); const data = await response.json();
        if (!response.ok) throw Error(data.error || "Unable to load saved scenario.");
        if (restored) { if (cloudRevision.current !== data.revision) setNotice("A newer cloud version exists. Export your draft before reloading the saved version."); return; }
        if (revision.current !== 0) return;
        cloudRevision.current = data.revision;
        const saved = validateWorksheet(data.worksheet, [country], RESEARCH_TASKS.map(t => t.id));
        if (saved) { setPlan(saved); setNotice("Your saved scenario is ready. Profile context stays connected automatically."); }
      } catch (e) { if (!controller.signal.aborted) setNotice(e instanceof Error ? e.message : "Unable to load scenario."); }
      finally { if (!controller.signal.aborted) setReady(true); }
    };
    void load(); return () => controller.abort();
  }, [canSave, country, draftKey, endpoint]);
  useEffect(() => { if (!ready || !dirty) return; try { sessionStorage.setItem(draftKey, JSON.stringify({ worksheet: plan, revision: cloudRevision.current })); } catch { /* Cloud save and PDF remain available. */ } }, [plan, ready, dirty, draftKey]);
  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [dirty]);
  useEffect(() => { const changed = () => setNotice("Your TGPI context was refreshed. Scenario amounts remain your own estimates."); window.addEventListener(PROGRESS_SYNC_EVENT, changed); return () => window.removeEventListener(PROGRESS_SYNC_EVENT, changed); }, []);
  function update<K extends keyof ResearchWorksheet>(key: K, value: ResearchWorksheet[K]) { revision.current++; setPlan(p => ({ ...p, [key]: value })); setDirty(true); setNotice(""); }
  function numeric(value: string) { return value === "" ? null : Number(value); }
  function changeCurrency(currency: PlanningCurrency) { if (currency !== plan.currency) setPendingCurrency(currency); }
  function confirmCurrency() {
    if (!pendingCurrency) return;
    const currency = pendingCurrency;
    setUndoPlan(plan); revision.current++;
    setPlan(p => ({ ...emptyWorksheet(country, currency), city: p.city, months: p.months, bufferPercent: p.bufferPercent, completed: p.completed }));
    setDirty(true); setPendingCurrency(null); setNotice("Currency changed. Amounts and references were cleared without conversion. You can undo this change.");
  }
  async function save() {
    if (!validateWorksheet(plan, [country], RESEARCH_TASKS.map(t => t.id))) { setNotice("Check the amounts, dates and month count before saving."); return; }
    setBusy(true);
    const savingRevision = revision.current;
    try { const response = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ worksheet: plan, revision: cloudRevision.current }) }); const body = await response.json(); if (!response.ok) throw new Error(body.error || "Unable to save."); cloudRevision.current = body.revision;
      if (revision.current === savingRevision) { setDirty(false); try { sessionStorage.removeItem(draftKey); } catch {} }
      const active = await fetch("/api/intelligence/worksheet", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(plan) });
      announceProgressSaved();
      setNotice(revision.current !== savingRevision ? "Scenario saved. Your newer edits are still in the tab draft." : active.ok ? "Scenario saved to your account and synchronized as your active TGPI worksheet." : "Scenario saved. Updating the legacy active worksheet failed; retry saving to synchronize it."); }
    catch (e) { setNotice(e instanceof Error ? e.message : "Unable to save."); } finally { setBusy(false); }
  }
  async function loadSaved() {
    setBusy(true);
    const loadingRevision = revision.current;
    try { const response = await fetch(endpoint, { cache: "no-store" }); const body = await response.json(); if (!response.ok) throw new Error(body.error || "Unable to load."); const saved = validateWorksheet(body.worksheet, [country], RESEARCH_TASKS.map(t => t.id)); if (!saved) { setNotice("No saved worksheet for this destination. Your draft remains unchanged."); return; } if (revision.current !== loadingRevision) { setNotice("Loading was not applied because you made new edits. Your inputs were preserved."); return; } cloudRevision.current = body.revision; setPlan(saved); setDirty(false); try { sessionStorage.removeItem(draftKey); } catch {} setNotice("Your saved worksheet is loaded. Amounts remain your assumptions, not TGPI-verified prices."); }
    catch (e) { setNotice(e instanceof Error ? e.message : "Unable to load."); } finally { setBusy(false); }
  }
  function exportWorksheet() {
    const data = validateWorksheet(plan, [country], RESEARCH_TASKS.map(t => t.id)); if (!data) { setNotice("Check the worksheet fields before exporting."); return; }
    const output = { ...data, exportedAt: new Date().toISOString(), methodology: "User-authored scenario, not an eligibility decision or certified cost estimate", sources: dossier.sources.map(s => ({ id: s.id, url: s.url, reviewedAt: s.reviewedAt })), totals: worksheetTotals(data) };
    const url = URL.createObjectURL(new Blob([JSON.stringify(output, null, 2)], { type: "application/json" })); const a = document.createElement("a"); a.href = url; a.download = `tgpi-${country}-research.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <section id="research-workbench" className="ig-section ig-panel ig-wide research-workbench" aria-label="Personal decision worksheet">
    <div className="ig-spread"><div><p className="ig-eyebrow">Decision Lab / {countryName}</p><h2>Design your next move.</h2><SourceReviewNotice country={country} /></div><span className="ig-badge">Your assumptions · {plan.currency}</span></div>
    <p className="ig-small">Plan by city, period and currency. Blank means unknown; zero means not applicable. Each country has three independent scenarios. Drafts stay in this tab; save to access them on other devices.</p>
    {discardRequested && <div className="research-currency-confirm" role="alert"><strong>Replace this tab draft with the cloud version?</strong><p>Download the PDF or JSON first if you want to keep these edits.</p><button className="ig-button" type="button" onClick={() => { setDiscardRequested(false); void loadSaved(); }}>Load cloud version</button><button className="ig-select" type="button" onClick={() => setDiscardRequested(false)}>Keep draft</button></div>}
    {dirty && canSave && <button type="button" className="ig-select" disabled={busy} onClick={() => setDiscardRequested(true)}>Review saved cloud version</button>}
    {pendingCurrency && <div className="research-currency-confirm" role="alert"><strong>Start amounts in {pendingCurrency}?</strong><p>This clears prices and quote references. Your city, duration and contingency stay unchanged.</p><button type="button" className="ig-button" onClick={confirmCurrency}>Change currency</button><button type="button" className="ig-select" onClick={() => setPendingCurrency(null)}>Keep {plan.currency}</button></div>}
    {undoPlan && <button type="button" className="ig-select" onClick={() => { setPlan(undoPlan); setUndoPlan(null); setDirty(true); revision.current++; }}>Undo currency change</button>}
    <fieldset disabled={!ready || busy} className="research-fields"><legend>01 / Destination & timeline</legend>
    <div className="ig-form-grid"><label>Destination city<input value={plan.city} maxLength={80} placeholder="Your actual city, not a national average" onChange={e => update("city", e.target.value)} /></label><label>Planning currency<select value={plan.currency} onChange={e => changeCurrency(e.target.value as PlanningCurrency)}>{PLAN_CURRENCIES.map(c => <option key={c}>{c}</option>)}</select><span className="ig-meta">Changing currency clears amounts. No automatic FX.</span></label><label>Months in this scenario<input type="number" min={1} max={60} step={1} value={plan.months} onChange={e => update("months", Number(e.target.value))} /></label><label>Contingency, %<input type="number" min={0} max={50} step={1} value={plan.bufferPercent} onChange={e => update("bufferPercent", Number(e.target.value))} /></label></div>
    </fieldset><fieldset disabled={!ready || busy} className="research-fields"><legend>02 / Your costs & references</legend><div className="ig-form-grid">{COST_CATEGORIES.map(key => <label key={key}>{key[0].toUpperCase() + key.slice(1)}, per month ({plan.currency})<input type="number" inputMode="decimal" min={0} max={100000000} step="any" value={plan.monthly[key] ?? ""} placeholder="Unknown" onChange={e => update("monthly", { ...plan.monthly, [key]: numeric(e.target.value) })} /></label>)}<label>Tuition, entire selected period ({plan.currency})<input type="number" inputMode="decimal" min={0} max={100000000} step="any" value={plan.tuition ?? ""} placeholder="Unknown; 0 only if not applicable" onChange={e => update("tuition", numeric(e.target.value))} /></label><label>Arrival and one-time costs ({plan.currency})<input type="number" inputMode="decimal" min={0} max={100000000} step="any" value={plan.arrival ?? ""} placeholder="Visa, travel, deposits, setup…" onChange={e => update("arrival", numeric(e.target.value))} /></label><label>Quote reference date<input type="date" value={plan.quoteDate} max={new Date().toISOString().slice(0, 10)} onChange={e => update("quoteDate", e.target.value)} /></label><label className="ig-wide">Quote references / short note<input value={plan.sourceNote} maxLength={240} placeholder="e.g. Housing quote and university fee letter, checked on the date above" onChange={e => update("sourceNote", e.target.value)} /></label></div>
    </fieldset><div className="ig-budget-result" aria-live="polite"><p className="ig-eyebrow">{totals.complete ? "Scenario arithmetic / Not affordability approval" : "Partial subtotal / Not a complete budget"}</p><p className="ig-value">{valid ? totals.missing.length === 7 ? "Not calculated yet" : formatMoney(totals.total, plan.currency) : "Check your inputs"}</p><p className="ig-small">Known monthly amounts × {plan.months} months + tuition for the period + arrival costs + {plan.bufferPercent}% contingency.</p>{valid ? <p className="ig-meta">Known monthly amount: {formatMoney(totals.knownMonthly, plan.currency)} · Contingency: {formatMoney(totals.buffer, plan.currency)}</p> : <p className="ig-caution">Amounts must be non-negative, months 1–60, contingency 0–50%, and quote dates cannot be in the future. Use whole yen for JPY and at most two decimals for other currencies.</p>}{!totals.complete ? <p className="ig-caution">Still unknown: {totals.missing.join(", ")}. The subtotal must not be treated as the money you need.</p> : null}{!plan.quoteDate || !plan.sourceNote ? <p className="ig-caution">Your quote date or source note is missing. The arithmetic does not validate your inputs.</p> : null}</div>
    {dossier.costs.length ? <details className="ig-details"><summary>Consult published references without mixing scopes</summary>{dossier.costs.map(ref => <div key={ref.id}><h3>{ref.title}</h3><p className="ig-small">{formatReference(ref)} · {ref.referencePeriod}<br />{referenceReviewState(ref) !== "reviewed" ? "Review overdue or reference period ended — reconfirm before use." : "Source-reviewed reference; confirm it applies to your case."}<br />{ref.location} · {ref.audience}<br />{ref.category === "total-study" ? "Includes tuition: not comparable with living-only figures." : "Living-only reference: add tuition and other exclusions separately."}</p><a className="ig-link" href={sourceFor(ref.sourceId)!.url} target="_blank" rel="noreferrer">Original source and exclusions ↗</a></div>)}</details> : null}
    <details className="ig-section research-checkpoints"><summary>03 / Research checkpoints · {plan.completed.length}/{RESEARCH_TASKS.length}</summary><p className="ig-eyebrow">Research checkpoints / {plan.completed.length} of {RESEARCH_TASKS.length} recorded</p><h3>Resolve the decisions that could change your plan.</h3><p className="ig-small">Completion records your own review. It does not certify documents, legal compliance, admission or readiness to travel.</p><div className="ig-task-grid">{RESEARCH_TASKS.map(task => { const related = dossier.claims.filter(c => c.layer === task.layer); return <article className="ig-task" key={task.id}><label className="ig-check-label"><input type="checkbox" checked={plan.completed.includes(task.id)} onChange={e => update("completed", e.target.checked ? [...plan.completed, task.id] : plan.completed.filter(id => id !== task.id))} />{task.title}</label><p className="ig-small">{task.detail}</p>{related.length ? related.slice(0, 2).map(c => <a key={c.id} className="ig-link ig-source-action" href={sourceFor(c.sourceId)!.url} target="_blank" rel="noreferrer">{c.title} ↗</a>) : <p className="ig-meta">A destination-specific source for this step is still missing in this release. Verify directly with the competent authority.</p>}</article>; })}</div></details>
    <div className="ig-actions">{canSave ? <><button className="ig-button" onClick={save} disabled={busy || !ready}>{busy ? "Please wait…" : "Save scenario to my TGPI"}</button><button className="ig-button ig-secondary" onClick={loadSaved} disabled={busy || dirty}>Load saved worksheet</button></> : <Link className="ig-button" href={`/sign-in?redirect_url=${encodeURIComponent(`/country-fit?country=${country}#research-workbench`)}`}>Sign in to save this worksheet</Link>}<button className="ig-button ig-secondary" type="button" onClick={exportWorksheet}>Export my worksheet</button></div><p className="ig-small" role="status">{notice}</p><p className="ig-meta">{dirty ? "Unsaved changes. A private draft is kept in this browser tab when storage is available." : "Cloud saving updates only this scenario and your active worksheet; other countries and scenarios remain available."}</p>
    <ResearchReportCard country={country} name={countryName} worksheet={plan} />
  </section>;
}
