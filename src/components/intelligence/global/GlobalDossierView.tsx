"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
import type { GlobalDossier } from "@/lib/intelligence/global-dossier.server";
import { type ResearchTopic } from "@/lib/intelligence/global-research";
import styles from "./global-research.module.css";

const researchSearchText = (text: string) => text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().trim();
const goals: Record<string, ResearchTopic[]> = {
  all: [], study: ["entry", "education", "cost", "housing", "health", "documents"],
  work: ["entry", "work", "digital", "economy", "documents", "cost"],
  settle: ["entry", "housing", "health", "safety", "cost", "climate", "identity"],
};
const goalLabels = { all: "All topics", study: "Study", work: "Work", settle: "Live abroad" };
const states = { current: "Within reference interval", historical: "Older observation", stale: "Refresh overdue", missing: "Not available" };

export default function GlobalDossierView({ dossier }: { dossier: GlobalDossier }) {
  const { locale, t } = useLocale();
  const [goal, setGoal] = useState("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const terms = researchSearchText(query).split(/\s+/).filter(Boolean);
  const chapters = dossier.chapters.filter(c => (!goals[goal].length || goals[goal].includes(c.id)) && terms.every(term => researchSearchText([t(c.title), t(c.description), ...c.checks.map(check => t(check)), ...dossier.indicators.filter(i => i.topic === c.id).map(i => t(i.label))].join(" ")).includes(term)));
  const available = dossier.indicators.filter(i => i.observation).length;
  const dates = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "America/Sao_Paulo" });

  return <section id="global-dossier" className={styles.dossier} aria-labelledby="global-dossier-title">
    <header className={styles.dossierHero}>
      <p className={styles.eyebrow}>{"TGPI /"} {dossier.coverage.iso3} / {t("Global research dossier")}</p>
      <h2 id="global-dossier-title">{t("Understand the destination. Prepare the decision.")}</h2>
      <p>{t("Twelve research chapters connect national evidence, official sources and practical next steps. Coverage of a chapter does not mean that every local rule has been verified.")}</p>
      <div className={styles.metrics}>
        <div><strong>{dossier.chapters.length}</strong><span>{t("Research chapters")}</span></div>
        <div><strong>{available}/{dossier.indicators.length}</strong><span>{t("Additional indicators available")}</span></div>
        <div><strong>{dossier.sources.length}</strong><span>{t("Applicable source references")}</span></div>
        <div><strong>{dossier.coverage.nationalSources}</strong><span>{t("Destination-specific references")}</span></div>
      </div>
      <div className={styles.actions}>
        <Link href={`/api/intelligence/dossiers?country=${dossier.coverage.slug}`} target="_blank" prefetch={false}>{t("Export dossier JSON")} ↗</Link>
        <Link href={`/intelligence?destination=${dossier.coverage.slug}#global-source-register`} prefetch={false}>{t("Explore destination sources")} ↗</Link>
        <button type="button" onClick={() => setExpanded(!expanded)}>{t(expanded ? "Collapse chapters" : "Expand chapters")}</button>
      </div>
    </header>
    <div className={styles.controls}>
      <div className={styles.tabs} role="group" aria-label={t("Dossier research goal")}>{Object.entries(goalLabels).map(([key, label]) => <button key={key} type="button" aria-pressed={goal === key} onClick={() => setGoal(key)}>{t(label)}</button>)}</div>
      <label className={styles.search}><span>{t("Search this dossier")}</span><input type="search" maxLength={120} value={query} placeholder={t("Topic, evidence or next step…")} onChange={e => setQuery(e.target.value)} /></label>
    </div>
    <p className={styles.meta} role="status">{t("{count} of {total} chapters", { count: chapters.length, total: dossier.chapters.length })} · {t(dossier.coverage.name)} · {t(dossier.coverage.subregion)}</p>
    <div className={styles.chapterList}>
      {chapters.map(chapter => {
        const indicators = dossier.indicators.filter(i => i.topic === chapter.id);
        const sources = chapter.sourceIds.map(id => dossier.sources.find(s => s.id === id)).filter(s => s !== undefined);
        return <details className={styles.chapter} key={`${chapter.id}-${expanded}-${query}`} open={expanded || Boolean(query) || chapter.id === "identity"}>
          <summary><span className={styles.chapterNumber}>{String(dossier.chapters.findIndex(c => c.id === chapter.id) + 1).padStart(2, "0")}</span><span><strong>{t(chapter.title)}</strong><small>{t(sources.length === 1 ? "1 source reference" : "{count} source references", { count: sources.length })}{indicators.length ? ` · ${t(indicators.length === 1 ? "1 indicator" : "{count} indicators", { count: indicators.length })}` : ""}</small></span><span className={styles.plus} aria-hidden="true">+</span></summary>
          <div className={styles.chapterBody}>
            <p className={styles.description}>{t(chapter.description)}</p>
            {chapter.id === "identity" ? <dl className={styles.identity}><div><dt>{t("Country")}</dt><dd>{t(dossier.coverage.name)}</dd></div><div><dt>{t("Statistical region")}</dt><dd>{t(dossier.coverage.subregion)}</dd></div><div><dt>{t("ISO / M49")}</dt><dd>{dossier.coverage.iso2} · {dossier.coverage.iso3} · {dossier.coverage.m49}</dd></div></dl> : null}
            {indicators.length ? <div className={styles.indicators}>{indicators.map(indicator => <article key={indicator.id} className={styles.indicator}>
              <span className={styles.badge} data-state={indicator.state}>{t(states[indicator.state])}</span>
              <h4>{t(indicator.label)}</h4>
              <p className={styles.value}>{indicator.observation ? new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(indicator.observation.value) : "—"}<small>{t(indicator.unit)}</small></p>
              <p className={styles.meta}>{t("Reference year")}: {indicator.observation?.year ?? t("Not available")} · {indicator.producer}</p>
              <p>{t(indicator.limit)}</p>
              <details className={styles.audit}><summary>{t("Source and collection record")}</summary><code>{indicator.id}</code><p>{t("Collection date")}: {indicator.series ? dates.format(new Date(indicator.series.retrievedAt)) : t("Not available")}</p><p>{t("Publisher update")}: {indicator.series?.sourceUpdatedAt ?? t("Not available")}</p>{indicator.series ? <a href={indicator.series.url} target="_blank" rel="noreferrer">{t("Original API response")} ↗</a> : null}</details>
              <a href={`https://data.worldbank.org/indicator/${indicator.id}?locations=${dossier.coverage.iso2}`} target="_blank" rel="noreferrer">{t("Open indicator and definitions")} ↗</a>
            </article>)}</div> : null}
            <div className={styles.researchGrid}>
              <div><h4>{t("What to verify next")}</h4><ul>{chapter.checks.map(check => <li key={check}>{t(check)}</li>)}</ul><p className={styles.deliverable}><strong>{t("Expected research output")}</strong>{t(chapter.output)}</p></div>
              <div><h4>{t("Go to the responsible source")}</h4><p className={styles.meta}>{t("Portal review identifies the publisher and its scope. It does not certify every rule or individual eligibility.")}</p><ul className={styles.sourceLinks}>{sources.slice(0, 4).map(source => <li key={source.id}><a href={source.destinationUrl} target="_blank" rel="noreferrer"><strong>{source.publisher}</strong><span>{t(source.title)} ↗</span></a></li>)}</ul>{sources.length > 4 ? <Link href={`/intelligence?destination=${dossier.coverage.slug}&topic=${chapter.id}#global-source-register`} prefetch={false}>{t("See all sources for this topic")} ↗</Link> : null}</div>
            </div>
          </div>
        </details>;
      })}
    </div>
    {!chapters.length ? <p className={styles.empty}>{t("No chapters match. Clear the search or choose all topics.")}</p> : null}
    <p className={styles.footnote}>{t("National statistics, editorial summaries and personal research tasks are different evidence layers. Missing data stays missing; a source access check never renews a legal review.")}</p>
  </section>;
}
