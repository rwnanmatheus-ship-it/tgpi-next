"use client";

import { sendClientFunnelEvent } from "@/lib/funnel.client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { blankBrief, briefCriteria, briefResearchPath, buildBriefText, finalistLimit, nextBriefCriterion, restoreBrief, type BriefCopy, type BriefCountry, type BriefCriterion, type BriefDraft, type BriefStatus } from "@/lib/comparison-brief";
import { comparisonPlanPath } from "@/lib/comparison-state";
import type { ComparisonGoal } from "@/lib/tgpi-comparison";
import styles from "./decision-brief.module.css";

type Props = { countries: BriefCountry[]; goal: ComparisonGoal; goalLabel: string; copy: BriefCopy };

export default function DecisionBrief(props: Props) {
  const [mode, setMode] = useState<"tab" | "memory" | null>(null);
  const { isLoaded, userId } = useAuth();
  const key = `tgpi:comparison-brief:v1:${userId ?? "guest"}:${props.goal}:${props.countries.map(c => c.slug).sort().join(",")}`;
  const storageKey = mode === "tab" && isLoaded ? key : undefined;
  return <section id="decision-brief" className={`compare-section ${styles.panel}`} aria-labelledby="brief-heading">
    <header><h2 id="brief-heading">{props.copy.title}</h2><p>{props.copy.intro}</p></header>
    <details onToggle={event => { if (event.currentTarget.open && mode === null) setMode(isLoaded ? "tab" : "memory"); }}>
      <summary>{props.copy.open}</summary>
      {mode !== null && <Editor key={storageKey ?? "memory"} {...props} storageKey={storageKey} />}
    </details>
  </section>;
}

function Editor({ countries, goal, goalLabel, copy, storageKey }: Props & { storageKey?: string }) {
  const [slug, setSlug] = useState(countries[0].slug);
  const [draft, setDraft] = useState(() => {
    if (!storageKey) return blankBrief();
    try { return restoreBrief(JSON.parse(sessionStorage.getItem(storageKey) ?? "null"), countries); }
    catch { return blankBrief(); }
  });
  const review = draft.reviews[slug] ?? {};
  const next = nextBriefCriterion(review);
  const chosen = draft.finalists.includes(slug);
  const full = draft.finalists.length >= finalistLimit;

  function save(updated: BriefDraft) {
    setDraft(updated);
    if (!storageKey) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify(updated)); }
    catch { /* The brief remains usable in memory when browser storage is unavailable. */ }
  }

  function assess(key: BriefCriterion, status: BriefStatus) {
    const updated = { ...review };
    if (status === "open") delete updated[key];
    else updated[key] = status;
    const reviews = { ...draft.reviews };
    if (Object.keys(updated).length) reviews[slug] = updated;
    else delete reviews[slug];
    save({ ...draft, reviews });
  }

  function toggleFinalist() {
    if (!chosen && full) return;
    const finalists = chosen ? draft.finalists.filter(value => value !== slug) : [...draft.finalists, slug];
    save({ ...draft, finalists });
  }

  function download() {
    const text = buildBriefText(countries, goal, goalLabel, draft, copy);
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "tgpi-decision-brief.txt";
    link.click();
    sendClientFunnelEvent("decision_brief_export_requested");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className={styles.editor}>
    <label className={styles.field}>{copy.country}
      <select value={slug} onChange={event => setSlug(event.target.value)}>
        {countries.map(country => <option key={country.slug} value={country.slug}>{country.name}</option>)}
      </select>
    </label>
    <div className={styles.criteria}>
      {briefCriteria.map(key => <label className={styles.field} key={key}>{copy.criteria[key]}
        <select value={review[key] ?? "open"} onChange={event => assess(key, event.target.value as BriefStatus)}>
          {(Object.keys(copy.statuses) as BriefStatus[]).map(status => <option key={status} value={status}>{copy.statuses[status]}</option>)}
        </select>
      </label>)}
    </div>
    <div className={styles.next} aria-live="polite">{next
      ? <><span>{copy.next}</span><Link href={briefResearchPath(slug, next)} prefetch={false}>{copy.criteria[next]} ↗</Link></>
      : <span>{copy.complete}</span>}</div>
    <label className={styles.check}><input type="checkbox" checked={chosen} disabled={!chosen && full} onChange={toggleFinalist}/>{copy.select}</label>
    <div className={styles.shortlist}>
      <h3>{copy.shortlist} · {draft.finalists.length}/{finalistLimit}</h3>
      {draft.finalists.length > 0 && <ul>{draft.finalists.map(value =>
        <li key={value}><button type="button" aria-pressed={value === slug} onClick={() => setSlug(value)}>{countries.find(c => c.slug === value)?.name}</button></li>)}</ul>}
      <p>{full ? copy.full : copy.limit}</p>
      <div className={styles.actions}>
        {draft.finalists.length >= 2 && <Link href={comparisonPlanPath(draft.finalists, goal)}>{copy.plan} →</Link>}
        <button type="button" disabled={!draft.finalists.length && !Object.keys(draft.reviews).length} onClick={download}>{copy.export} ↓</button>
      </div>
    </div>
  </div>;
}
