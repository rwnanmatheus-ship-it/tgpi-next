"use client";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";

import CinematicImage from "@/components/ui/CinematicImage";
import Link from "next/link";
import { useState } from "react";
import type { DocumentsMemberModel } from "@/lib/documents-os";
import CapabilitySystemRail from "@/components/capability/CapabilitySystemRail";
import WorkspaceSyncButton from "@/components/profile/WorkspaceSyncButton";
import { LocalizedText } from "@/components/localization/LocaleProvider";


const statusLabels = { completed: "Reviewed", in_progress: "In progress", needs_attention: "Check required", not_started: "Not started" } as const;
type Filter = "all" | "pending" | "completed";

export default function DocumentsMemberExperience({ firstName, globalId, model }: {
  firstName: string; globalId: string; model: DocumentsMemberModel;
}) {
  const { t: localizeLabel } = useInterfaceLocale();

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const countries = model.countries.filter(country =>
    country.name.toLowerCase().includes(search.trim().toLowerCase()) &&
    (filter === "all" || (filter === "completed" ? country.status === "completed" : country.status !== "completed")),
  );
  const remaining = Math.max(0, model.totalItems - model.completedItems);
  return (
    <main className="documents-os">
      <div className="tgpi-capability-frame documents-shell">
        <LocalizedElement as="nav" className="documents-breadcrumb" aria-label="Breadcrumb"><Link href="/profile"><LocalizedText text="Workspace" /></Link><span aria-hidden="true">/</span><span><LocalizedText text="Documents" /></span></LocalizedElement>
        <header className="documents-hero">
          <CinematicImage asset="global-documents-precision" alt="" priority sizes="(max-width: 900px) 100vw, 85rem" className="documents-hero-image" />
          <div className="documents-hero-copy">
            <p className="documents-eyebrow"><LocalizedText text={"TGPI · Preparation intelligence"} /></p>
            <h1>{firstName}<LocalizedText text={", make your next move a prepared one."} /></h1>
            <p className="documents-intro"><LocalizedText text={"Your destination files, planning context and learning evidence. Connected to one identity, with a clear next step."} /></p>
            <div className="documents-actions"><Link className="documents-button" href={model.nextAction.href}><LocalizedText text={model.nextAction.label} /> <span aria-hidden="true">↗</span></Link><a className="documents-button secondary" href="#destination-files"><LocalizedText text={"View my files ↓"} /></a></div>
            <div className="documents-identity"><Link href="/global-key">{globalId}</Link><span><LocalizedText text={model.goalLabel} /></span></div>
          </div>
          <aside className="documents-score" aria-label={localizeLabel("Preparation score")}>
            <p className="documents-eyebrow"><LocalizedText text={"Preparation signals"} /></p><strong>{model.readinessScore}<small>/100</small></strong>
            <LocalizedElement as="progress" max={100} value={model.readinessScore} aria-label="Preparation signals achieved" />
            <p><LocalizedText text={"A planning indicator based on your profile and checklist activity. Review the breakdown below."} /></p>
            <WorkspaceSyncButton />
          </aside>
        </header>
        <LocalizedElement as="nav" className="documents-jump" aria-label="Documents sections"><a href="#destination-files"><LocalizedText text="Destination files" /></a><a href="#readiness-architecture"><LocalizedText text="Readiness architecture" /></a><a href="#preparation-signals"><LocalizedText text={"Score breakdown"} /></a><Link href="/profile/settings"><LocalizedText text={"Planning settings ↗"} /></Link></LocalizedElement>
        <LocalizedElement as="section" className="documents-stats" aria-label="Your preparation overview">
          {[[model.countries.length, "Connected destinations"], [remaining, "Research items remaining"], [model.completedCourses, "Courses completed"], [model.credentialCount ?? "—", "Active certificates"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span><LocalizedText text={label} /></span></div>)}
        </LocalizedElement>
        <section className="documents-next" aria-labelledby="next-step-title"><div><p className="documents-eyebrow"><LocalizedText text={"Recommended next step"} /></p><h2 id="next-step-title"><LocalizedText text={model.nextAction.title} /></h2><p><LocalizedText text={model.nextAction.description} /></p></div><Link className="documents-button" href={model.nextAction.href}><LocalizedText text={model.nextAction.label} /> →</Link></section>
        <section id="destination-files" className="documents-section">
          <div className="documents-section-heading"><div><p className="documents-eyebrow"><LocalizedText text={"Your research portfolio"} /></p><h2><LocalizedText text="Destination files" /></h2><p><LocalizedText text={"See what you have reviewed and where preparation still needs attention."} /></p></div><Link className="documents-text-link" href="/countries"><LocalizedText text={"Add a destination ↗"} /></Link></div>
          <div className="documents-toolbar"><LocalizedElement as="div" className="documents-filters" role="group" aria-label="Filter destination files">{([ ["all", "All files"], ["pending", "To review"], ["completed", "Reviewed"] ] as const).map(([value, label]) => <button type="button" aria-pressed={filter === value} key={value} onClick={() => setFilter(value)}><LocalizedText text={label} /></button>)}</LocalizedElement><label className="documents-search"><span className="sr-only"><LocalizedText text={"Search your destinations"} /></span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={localizeLabel("Search destinations…")} /></label></div>
          <p className="documents-result-count" role="status">{countries.length}{" "}<LocalizedText text="of" />{" "}{model.countries.length}{" "}<LocalizedText text={"destination files ·"} />{" "}{model.completedItems}/{model.totalItems}{" "}<LocalizedText text={"research items reviewed"} /></p>
          <div className="documents-country-grid">{countries.map(country => <article className="documents-country" key={country.slug}>
            <div className="documents-country-heading"><span aria-hidden="true" className="documents-flag">{country.emoji}</span><span className="documents-status" data-status={country.status}><LocalizedText text={statusLabels[country.status]} /></span></div>
            <h3><LocalizedText text={country.name} /></h3><p>{country.totalItems ? <LocalizedText text={"{value0} of {value1} research items reviewed"} values={{value0: String(country.completedItems), value1: String(country.totalItems)}} /> : <LocalizedText text={"Open the checklist to establish your preparation baseline."} />}</p>
            <div className="documents-progress-label"><span><LocalizedText text={"Checklist progress"} /></span><strong>{country.percentage}%</strong></div><LocalizedElement as="progress" value={country.percentage} max={100} aria-label={`${country.name} checklist progress`} />
            <p className="documents-updated">{country.updatedAt ? <LocalizedText text={"Last checklist change: {value0}"} values={{value0: String(new Date(country.updatedAt).toISOString().slice(0, 10))}} /> : <LocalizedText text={"No checklist activity recorded"} />}</p>
            <Link className="documents-country-link" href={country.href}>{country.status === "not_started" ? <LocalizedText text={"Start research"} /> : <LocalizedText text={"Open checklist"} />}<span aria-hidden="true">↗</span></Link>
          </article>)}</div>
          {countries.length === 0 && <div className="documents-empty"><h3>{model.countries.length ? <LocalizedText text={"No files match this view."} /> : <LocalizedText text={"Your first destination starts here."} />}</h3><p>{model.countries.length ? <LocalizedText text={"Try another name or show all files."} /> : <LocalizedText text={"Choose a destination to connect its document checklist to your plan."} />}</p>{model.countries.length ? <button className="documents-button" type="button" onClick={() => { setSearch(""); setFilter("all"); }}><LocalizedText text={"Show all files"} /></button> : <Link className="documents-button" href="/countries"><LocalizedText text={"Choose a destination →"} /></Link>}</div>}
        </section>
        <section id="readiness-architecture" className="documents-section"><div className="documents-section-heading"><div><p className="documents-eyebrow"><LocalizedText text="Readiness architecture" /></p><h2><LocalizedText text={"Six layers. Clear priorities."} /></h2><p><LocalizedText text={"Open any layer to strengthen the evidence behind your global plan."} /></p></div><span className="documents-completion">{model.layers.filter(layer => layer.status === "completed").length}<LocalizedText text={"/6 layers with progress achieved"} /></span></div><div className="documents-layer-grid">{model.layers.map((layer, index) => <Link className="documents-layer" key={layer.label} href={layer.href}><div className="documents-layer-top"><span className="documents-layer-number">0{index + 1}</span><span className="documents-status" data-status={layer.status}>{layer.status === "completed" ? <LocalizedText text={"Connected"} /> : statusLabels[layer.status]}</span></div><h3><LocalizedText text={layer.label} /><span aria-hidden="true">↗</span></h3><p><LocalizedText text={layer.description} /></p></Link>)}</div></section>
        <section id="preparation-signals" className="documents-section documents-breakdown"><div><p className="documents-eyebrow"><LocalizedText text={"Transparent by design"} /></p><h2><LocalizedText text={"Understand your score."} /></h2><p><LocalizedText text={"Each confirmed signal adds its stated weight. Learning achievements are shown separately and never imply immigration eligibility."} /></p><p className="documents-sync-note"><LocalizedText text={"Saved changes refresh this workspace and other open TGPI tabs. Changes from another device reconcile while this page is visible, up to every 60 seconds."} /></p></div><ul>{model.signals.map(signal => <li key={signal.label}><span aria-hidden="true" className={signal.achieved ? "achieved" : ""}>{signal.achieved ? "✓" : "○"}</span><span><LocalizedText text={signal.label} /></span><strong>{signal.achieved ? signal.weight : 0}/{signal.weight}</strong></li>)}</ul></section>
        <CapabilitySystemRail active="documents" metric={{ label: "Connected preparation", value: `${model.readinessScore}%`, detail: "Identity, country research, learning and credentials — each with its own evidence." }} />
        <footer className="documents-privacy"><div><p className="documents-eyebrow"><LocalizedText text={"Private preparation workspace"} /></p><h2><LocalizedText text={"Track preparation. Protect your documents."} /></h2><p><LocalizedText text={"This workspace stores checklist activity, not passport scans or legal files. Checklist completion records your research; it does not verify a document or grant a visa. Confirm requirements with the relevant official authority."} /></p></div><Link className="documents-text-link" href="/profile/security"><LocalizedText text={"Manage account security ↗"} /></Link></footer>
      </div>
    </main>
  );
}
