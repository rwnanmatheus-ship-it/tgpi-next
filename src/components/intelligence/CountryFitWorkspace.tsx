"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { INDICATOR_IDS, findObservation, personalResearchPlan, type CountryIdentity, type IntelligenceSnapshot, type ResearchContext } from "@/lib/intelligence/core";
import { EvidenceCard } from "./Evidence";
import ResearchWorkbench from "./ResearchWorkbench";
import { dossierFor, sourceFor } from "@/lib/intelligence/dossiers";
import SourceReviewNotice from "./SourceReviewNotice";

const EMPTY: ResearchContext = { primaryGoal: "study", budgetRange: "undecided", timeHorizon: "exploring", languages: [], profession: "", priorities: [] };
export default function CountryFitWorkspace({ countries, snapshot, initialContext = EMPTY, initialCountry = "portugal" }: { countries: CountryIdentity[]; snapshot: IntelligenceSnapshot; initialContext?: ResearchContext; initialCountry?: string }) {
  const { isSignedIn, user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [slug, setSlug] = useState(countries.some(c => c.slug === initialCountry) ? initialCountry : countries[0].slug);
  const [context, setContext] = useState({ ...initialContext, primaryGoal: initialContext.primaryGoal || "study", budgetRange: initialContext.budgetRange || "undecided", timeHorizon: initialContext.timeHorizon || "exploring" });
  const country = countries.find(c => c.slug === slug)!;
  const tasks = personalResearchPlan(context, country.name);
  const relevant = context.primaryGoal === "work" ? "SL.UEM.TOTL.ZS" : context.primaryGoal === "study" ? "SE.TER.ENRR" : "IT.NET.USER.ZS";
  const available = INDICATOR_IDS.filter(id => findObservation(snapshot, slug, id)).length;
  const dossier = dossierFor(slug);
  async function savePlan() {
    if (!isSignedIn || isSaving) return;
    setIsSaving(true);
    setSaveNotice("");
    try {
      const response = await fetch("/api/intelligence/plan", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ countrySlug: slug, context }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save your plan.");
      setSaveNotice("Saved to your private TGPI profile. Your other profile fields and existing shortlist are preserved.");
      try { await user?.reload(); } catch { /* The server confirmed persistence; retain the successful save message. */ }
    } catch (error) { setSaveNotice(error instanceof Error ? error.message : "Unable to save. Please try again."); }
    finally { setIsSaving(false); }
  }
  return <section className="ig-fit" aria-label="Country Fit and personal research plan">
    <div className="ig-panel"><p className="ig-eyebrow">01 / Your context</p><h2>A plan that starts with you.</h2><p className="ig-small">This is a research planner, not an automated country ranking. Changes stay on this page until you explicitly save them to your profile. No personal answers are sent to data suppliers.</p>
      <div className="ig-form-grid">
        <label>Country<select value={slug} onChange={e => setSlug(e.target.value)}>{countries.map(c => <option value={c.slug} key={c.slug}>{c.name}</option>)}</select></label>
        <label>Your goal<select value={context.primaryGoal} onChange={e => setContext({ ...context, primaryGoal: e.target.value })}>{["study", "work", "live", "travel", "learn"].map(g => <option key={g} value={g}>{g[0].toUpperCase() + g.slice(1)}</option>)}</select></label>
        <label>Monthly budget, USD<select value={context.budgetRange || "undecided"} onChange={e => setContext({ ...context, budgetRange: e.target.value })}><option value="undecided">Not defined yet</option><option value="under-1500">Under $1,500</option><option value="1500-3000">$1,500–3,000</option><option value="3000-5000">$3,000–5,000</option><option value="5000-plus">Over $5,000</option></select></label>
        <label>Time horizon<select value={context.timeHorizon || "exploring"} onChange={e => setContext({ ...context, timeHorizon: e.target.value })}><option value="exploring">Exploring</option><option value="now">Within 30 days</option><option value="3-months">Within 3 months</option><option value="6-months">Within 6 months</option><option value="12-months">Within 12 months</option></select></label>
        <label>Profession or field<input value={context.profession} maxLength={120} onChange={e => setContext({ ...context, profession: e.target.value })} placeholder="e.g. Engineering" /></label>
        <label>Languages, separated by commas<input value={context.languages.join(",")} maxLength={160} onChange={e => setContext({ ...context, languages: e.target.value.split(",").slice(0, 8) })} placeholder="e.g. Portuguese, English" /></label>
      </div>{isSignedIn ? <button type="button" className="ig-button" disabled={isSaving} onClick={savePlan}>{isSaving ? "Saving…" : "Save this research plan"}</button> : <Link href={`/sign-in?redirect_url=/country-fit%3Fcountry%3D${slug}`} className="ig-button">Sign in to save a plan</Link>}<p className="ig-small" role="status">{saveNotice}</p><Link href="/onboarding" className="ig-link">Review my full global profile →</Link>
    </div>
    <div className="ig-panel"><p className="ig-eyebrow">02 / Evidence, not a promise</p><h2>{country.name}: what can we support?</h2><SourceReviewNotice country={slug} /><p className="ig-small">{available}/4 national indicators available. Visa eligibility, safety, affordability, language fit and institutional quality are not established by these indicators.</p><EvidenceCard indicator={relevant} observation={findObservation(snapshot, slug, relevant)} countryCode={country.iso2} /><p className="ig-small">{dossier.claims.length} detailed evidence summaries available. The first dossiers focus on study; they do not establish permission to work or personal eligibility.</p>{dossier.claims.slice(0, 2).map(c => <a key={c.id} className="ig-link ig-source-action" href={sourceFor(c.sourceId)!.url} target="_blank" rel="noreferrer">{c.title} ↗</a>)}<Link className="ig-link" href={`/countries/${slug}#research-dossier`}>Inspect the full dossier and source limits →</Link></div>
    <div className="ig-panel ig-wide"><p className="ig-eyebrow">03 / Your next decisions</p><h2>Turn uncertainty into useful work.</h2><p className="ig-small">{context.priorities.length ? `Your profile priorities: ${context.priorities.join(", ")}. These need supporting evidence, not inferred fit scores.` : "Prioritize the questions that could change your decision."}</p><div className="ig-task-grid">{tasks.map((task, index) => <article key={task.id} className="ig-task"><span className="ig-step">0{index + 1}</span><h3>{task.title}</h3><p className="ig-small">{task.detail}</p><Link className="ig-link" href={task.href.startsWith("#") ? `/countries/${slug}${task.href}` : task.href}>Take the next step →</Link></article>)}</div><div className="ig-actions"><Link href={`/compare?country=${slug}`} className="ig-button">Compare an alternative →</Link><Link href="/profile" className="ig-button ig-secondary">Open my saved workspace</Link></div></div>
    <ResearchWorkbench country={slug} countryName={country.name} />
  </section>;
}
