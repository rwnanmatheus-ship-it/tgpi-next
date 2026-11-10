"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
import CountryFlag from "@/components/ui/CountryFlag";
import SourceWatch from "@/components/intelligence/SourceWatch";
import type { EvidenceLayer } from "@/lib/intelligence/dossiers";
import { evidenceSearchText, sourceRegisterHref, sourceReviewLabels, type SourceRecord } from "@/lib/intelligence/provenance";
import styles from "./provenance.module.css";

const pageSize = 6;
const topics: Record<EvidenceLayer, string> = {
  entry: "Entry / residence",
  education: "Education",
  cost: "Cost / funding",
};
const kinds: Record<SourceRecord["kind"], string> = {
  government: "Government",
  "public-agency": "Public agency",
  university: "University",
  "university-association": "University association",
};
const summaryStates: Record<SourceRecord["summaries"][number]["state"], string> = {
  reviewed: "Within review interval",
  "review-due": "Review overdue",
  expired: "Reference period ended",
  "not-effective": "Not yet effective",
};
type ReviewFilter = "all" | "attention" | SourceRecord["status"];
const reviews: Record<ReviewFilter, string> = {
  all: "All review states",
  attention: "Needs attention",
  ...sourceReviewLabels,
};

export default function ProvenanceExplorer({ records, initialCountry, initialSource }: {
  records: SourceRecord[];
  initialCountry: string;
  initialSource?: string;
}) {
  const { locale, t } = useLocale();
  const [country, setCountry] = useState(initialCountry);
  const [topic, setTopic] = useState<"" | EvidenceLayer>("");
  const [review, setReview] = useState<ReviewFilter>("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [pinned, setPinned] = useState(initialSource);
  const [watchCountry, setWatchCountry] = useState<string | null>(null);
  const countryToCheck = watchCountry ?? country;
  const [citation, setCitation] = useState<{ id: string; value: string; copied: boolean }>();
  const dates = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" });
  const countries = [...new Map(records.map(record => [record.country, t(record.countryName)]))].sort((a, b) => a[1].localeCompare(b[1], locale));
  const tokens = evidenceSearchText(query).split(" ").filter(Boolean);
  const filtered = records.filter(record => {
    if (country && record.country !== country) return false;
    if (topic && !record.summaries.some(summary => summary.topic === topic)) return false;
    if (review === "attention" ? !record.needsReview : review !== "all" && record.status !== review) return false;
    if (!tokens.length) return true;
    const haystack = evidenceSearchText([
      record.id, record.title, t(record.title), record.publisher, record.iso2, record.countryName,
      t(record.countryName), t(kinds[record.kind]), new URL(record.url).hostname,
      ...record.summaries.map(summary => `${t(summary.title)} ${t(topics[summary.topic])}`),
    ].join(" "));
    return tokens.every(token => haystack.includes(token));
  });
  const ordered = pinned ? [...filtered.filter(record => record.id === pinned), ...filtered.filter(record => record.id !== pinned)] : filtered;

  function resetResults() {
    setVisibleCount(pageSize);
    setPinned(undefined);
    setCitation(undefined);
  }
  function clearFilters() {
    setCountry("");
    setTopic("");
    setReview("all");
    setQuery("");
    setWatchCountry(null);
    resetResults();
  }
  async function copyCitation(record: SourceRecord) {
    const parts = [
      `${record.publisher}. ${record.title}.`,
      record.url,
      record.reviewedAt ? t("TGPI content review · {date}", { date: record.reviewedAt }) : t("No completed content review"),
      new URL(sourceRegisterHref({ source: record.id }), window.location.origin).href,
    ];
    const value = parts.join("\n");
    try {
      await navigator.clipboard.writeText(value);
      setCitation({ id: record.id, value, copied: true });
    } catch {
      setCitation({ id: record.id, value, copied: false });
    }
  }

  return (
    <>
      <div className={styles.filters} role="group" aria-label={t("Source filters")}>
        <label className={styles.searchField}>
          <span>{t("Search sources")}</span>
          <input type="search" maxLength={120} value={query} placeholder={t("Publisher, country or topic…")} onChange={event => { setQuery(event.target.value); resetResults(); }} />
        </label>
        <label>
          <span>{t("Destination")}</span>
          <select value={country} onChange={event => { setCountry(event.target.value); setWatchCountry(null); resetResults(); }}>
            <option value="">{t("All destinations")}</option>
            {countries.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
          </select>
        </label>
        <label>
          <span>{t("Topic")}</span>
          <select value={topic} onChange={event => { setTopic(event.target.value as typeof topic); resetResults(); }}>
            <option value="">{t("All topics")}</option>
            {Object.entries(topics).map(([id, label]) => <option key={id} value={id}>{t(label)}</option>)}
          </select>
        </label>
        <label>
          <span>{t("Editorial review")}</span>
          <select value={review} onChange={event => { setReview(event.target.value as ReviewFilter); resetResults(); }}>
            {Object.entries(reviews).map(([id, label]) => <option key={id} value={id}>{t(label)}</option>)}
          </select>
        </label>
      </div>
      <div className={styles.resultsBar}>
        <p role="status">{t("{count} of {total} registered references", { count: filtered.length, total: records.length })}</p>
        {(country || topic || query || review !== "all") ? <button type="button" className={styles.textButton} onClick={clearFilters}>{t("Clear filters")}</button> : null}
      </div>
      {ordered.length ? (
        <ul className={styles.registryGrid}>
          {ordered.slice(0, visibleCount).map(record => (
            <li key={record.id}>
              <article className={styles.sourceCard}>
                <div className={styles.sourceTop}>
                  <span className={styles.flagTile}><CountryFlag iso2={record.iso2} width={48} /></span>
                  <div><span className={styles.cardCountry}>{t(record.countryName)}</span><small>{t(kinds[record.kind])}</small></div>
                </div>
                <h3>{t(record.title)}</h3>
                <p className={styles.publisher}>{record.publisher}</p>
                <div className={styles.badges}>
                  <span className={record.status === "unconfirmed" ? styles.badgeCaution : styles.badge}>{t(sourceReviewLabels[record.status])}</span>
                  {record.needsReview ? <span className={styles.badgeCaution}>{t("Needs attention")}</span> : null}
                </div>
                <p className={styles.cardDate}>{record.reviewedAt ? t("TGPI content review · {date}", { date: dates.format(new Date(record.reviewedAt)) }) : t("No completed content review")}</p>
                <details className={styles.sourceDetails} open={record.id === pinned || undefined}>
                  <summary>{t("Scope and review details")}</summary>
                  <p>{t(record.note)}</p>
                  {record.summaries.length ? (
                    <ul className={styles.summaryList}>
                      {record.summaries.map(summary => <li key={summary.id}><strong>{t(summary.title)}</strong><span>{t(summary.period)} · {t(summaryStates[summary.state])}</span></li>)}
                    </ul>
                  ) : null}
                  {record.reviewIssue ? (
                    <div className={styles.issue}>
                      <strong>{t("Open review issue")}</strong>
                      <p>{t(record.reviewIssue.observation)} {t(record.reviewIssue.action)}</p>
                      <small>{t("Observed {date}", { date: dates.format(new Date(record.reviewIssue.observedAt)) })} · {t("Review by {date}", { date: dates.format(new Date(record.reviewIssue.reviewBy)) })}</small>
                    </div>
                  ) : null}
                  <p>{t(record.automaticCheck ? "Automatic signals enabled" : "Manual verification only")}</p>
                  <div className={styles.cardActions}>
                    <Link href={`/countries/${record.country}#research-dossier`} prefetch={false}>{t("Read country dossier")} <span aria-hidden="true">↗</span></Link>
                    <Link href={sourceRegisterHref({ source: record.id })} prefetch={false}>{t("Link to this record")} <span aria-hidden="true">↗</span></Link>
                  </div>
                </details>
                <div className={styles.cardActions}>
                  <a href={record.url} target="_blank" rel="noreferrer">{t("Open original source")} <span aria-hidden="true">↗</span></a>
                  <button type="button" className={styles.textButton} onClick={() => void copyCitation(record)}>{t("Copy citation")}</button>
                </div>
                {citation?.id === record.id ? (
                  citation.copied ? <p role="status" className={styles.copyNotice}>{t("Citation copied.")}</p>
                    : <label className={styles.copyNotice}>{t("Select the citation to copy it.")}<textarea readOnly value={citation.value} rows={4} onFocus={event => event.target.select()} /></label>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      ) : <p className={styles.empty}>{t("No references match these filters. Try another search or clear the filters.")}</p>}
      {ordered.length > visibleCount ? <button type="button" className={styles.moreButton} onClick={() => setVisibleCount(visibleCount + pageSize)}>{t("Show more sources")} <span aria-hidden="true">↓</span></button> : null}
      <div className={styles.watch}>
        <div>
          <p className={styles.kicker}><span aria-hidden="true" />{t("TGPI Source Watch")}</p>
          <h3>{t("Check signals by destination")}</h3>
          <p>{t("Look for access restrictions and content changes in the registered pages.")}</p>
        </div>
        <label>
          <span>{t("Destination for source checks")}</span>
          <select value={countryToCheck} onChange={event => setWatchCountry(event.target.value)} >
            <option value="">{t("Select a destination")}</option>
            {countries.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
          </select>
        </label>
        {countryToCheck ? <div className={styles.watchResults}><SourceWatch country={countryToCheck} /></div> : null}
      </div>
    </>
  );
}
