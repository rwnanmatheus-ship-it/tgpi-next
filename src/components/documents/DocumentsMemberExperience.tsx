"use client";

import Image from "next/image";
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
        <nav className="documents-breadcrumb" aria-label="Breadcrumb"><Link href="/profile"><LocalizedText text="Workspace" /></Link><span aria-hidden="true">/</span><span><LocalizedText text="Documents" /></span></nav>
        <header className="documents-hero">
          <Image src="/images/documents/tgpi-documents-hero-v2.webp" alt="" fill priority sizes="(max-width: 900px) 100vw, 85rem" quality={85} className="documents-hero-image" />
          <div className="documents-hero-copy">
            <p className="documents-eyebrow">TGPI · Preparation intelligence</p>
            <h1>{firstName}, make your next move a prepared one.</h1>
            <p className="documents-intro">Your destination files, planning context and learning evidence. Connected to one identity, with a clear next step.</p>
            <div className="documents-actions"><Link className="documents-button" href={model.nextAction.href}>{model.nextAction.label} <span aria-hidden="true">↗</span></Link><a className="documents-button secondary" href="#destination-files">View my files ↓</a></div>
            <div className="documents-identity"><Link href="/global-key">{globalId}</Link><span>{model.goalLabel}</span></div>
          </div>
          <aside className="documents-score" aria-label="Preparation score">
            <p className="documents-eyebrow">Preparation signals</p><strong>{model.readinessScore}<small>/100</small></strong>
            <progress max={100} value={model.readinessScore} aria-label="Preparation signals achieved" />
            <p>A planning indicator based on your profile and checklist activity. Review the breakdown below.</p>
            <WorkspaceSyncButton />
          </aside>
        </header>
        <nav className="documents-jump" aria-label="Documents sections"><a href="#destination-files"><LocalizedText text="Destination files" /></a><a href="#readiness-architecture"><LocalizedText text="Readiness architecture" /></a><a href="#preparation-signals">Score breakdown</a><Link href="/profile/settings">Planning settings ↗</Link></nav>
        <section className="documents-stats" aria-label="Your preparation overview">
          {[[model.countries.length, "Connected destinations"], [remaining, "Research items remaining"], [model.completedCourses, "Courses completed"], [model.credentialCount ?? "—", "Active certificates"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </section>
        <section className="documents-next" aria-labelledby="next-step-title"><div><p className="documents-eyebrow">Recommended next step</p><h2 id="next-step-title">{model.nextAction.title}</h2><p>{model.nextAction.description}</p></div><Link className="documents-button" href={model.nextAction.href}>{model.nextAction.label} →</Link></section>
        <section id="destination-files" className="documents-section">
          <div className="documents-section-heading"><div><p className="documents-eyebrow">Your research portfolio</p><h2><LocalizedText text="Destination files" /></h2><p>See what you have reviewed and where preparation still needs attention.</p></div><Link className="documents-text-link" href="/countries">Add a destination ↗</Link></div>
          <div className="documents-toolbar"><div className="documents-filters" role="group" aria-label="Filter destination files">{([ ["all", "All files"], ["pending", "To review"], ["completed", "Reviewed"] ] as const).map(([value, label]) => <button type="button" aria-pressed={filter === value} key={value} onClick={() => setFilter(value)}>{label}</button>)}</div><label className="documents-search"><span className="sr-only">Search your destinations</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search destinations…" /></label></div>
          <p className="documents-result-count" role="status">{countries.length} of {model.countries.length} destination files · {model.completedItems}/{model.totalItems} research items reviewed</p>
          <div className="documents-country-grid">{countries.map(country => <article className="documents-country" key={country.slug}>
            <div className="documents-country-heading"><span aria-hidden="true" className="documents-flag">{country.emoji}</span><span className="documents-status" data-status={country.status}>{statusLabels[country.status]}</span></div>
            <h3><LocalizedText text={country.name} /></h3><p>{country.totalItems ? `${country.completedItems} of ${country.totalItems} research items reviewed` : "Open the checklist to establish your preparation baseline."}</p>
            <div className="documents-progress-label"><span>Checklist progress</span><strong>{country.percentage}%</strong></div><progress value={country.percentage} max={100} aria-label={`${country.name} checklist progress`} />
            <p className="documents-updated">{country.updatedAt ? `Last checklist change: ${new Date(country.updatedAt).toISOString().slice(0, 10)}` : "No checklist activity recorded"}</p>
            <Link className="documents-country-link" href={country.href}>{country.status === "not_started" ? "Start research" : "Open checklist"}<span aria-hidden="true">↗</span></Link>
          </article>)}</div>
          {countries.length === 0 && <div className="documents-empty"><h3>{model.countries.length ? "No files match this view." : "Your first destination starts here."}</h3><p>{model.countries.length ? "Try another name or show all files." : "Choose a destination to connect its document checklist to your plan."}</p>{model.countries.length ? <button className="documents-button" type="button" onClick={() => { setSearch(""); setFilter("all"); }}>Show all files</button> : <Link className="documents-button" href="/countries">Choose a destination →</Link>}</div>}
        </section>
        <section id="readiness-architecture" className="documents-section"><div className="documents-section-heading"><div><p className="documents-eyebrow"><LocalizedText text="Readiness architecture" /></p><h2>Six layers. Clear priorities.</h2><p>Open any layer to strengthen the evidence behind your global plan.</p></div><span className="documents-completion">{model.layers.filter(layer => layer.status === "completed").length}/6 layers with progress achieved</span></div><div className="documents-layer-grid">{model.layers.map((layer, index) => <Link className="documents-layer" key={layer.label} href={layer.href}><div className="documents-layer-top"><span className="documents-layer-number">0{index + 1}</span><span className="documents-status" data-status={layer.status}>{layer.status === "completed" ? "Connected" : statusLabels[layer.status]}</span></div><h3>{layer.label}<span aria-hidden="true">↗</span></h3><p>{layer.description}</p></Link>)}</div></section>
        <section id="preparation-signals" className="documents-section documents-breakdown"><div><p className="documents-eyebrow">Transparent by design</p><h2>Understand your score.</h2><p>Each confirmed signal adds its stated weight. Learning achievements are shown separately and never imply immigration eligibility.</p><p className="documents-sync-note">Saved changes refresh this workspace and other open TGPI tabs. Changes from another device reconcile while this page is visible, up to every 60 seconds.</p></div><ul>{model.signals.map(signal => <li key={signal.label}><span aria-hidden="true" className={signal.achieved ? "achieved" : ""}>{signal.achieved ? "✓" : "○"}</span><span>{signal.label}</span><strong>{signal.achieved ? signal.weight : 0}/{signal.weight}</strong></li>)}</ul></section>
        <CapabilitySystemRail active="documents" metric={{ label: "Connected preparation", value: `${model.readinessScore}%`, detail: "Identity, country research, learning and credentials — each with its own evidence." }} />
        <footer className="documents-privacy"><div><p className="documents-eyebrow">Private preparation workspace</p><h2>Track preparation. Protect your documents.</h2><p>This workspace stores checklist activity, not passport scans or legal files. Checklist completion records your research; it does not verify a document or grant a visa. Confirm requirements with the relevant official authority.</p></div><Link className="documents-text-link" href="/profile/security">Manage account security ↗</Link></footer>
      </div>
    </main>
  );
}
