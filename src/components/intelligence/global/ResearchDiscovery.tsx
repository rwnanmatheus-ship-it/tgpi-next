"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
import CountryFlag from "@/components/ui/CountryFlag";
import { RESEARCH_COUNTRIES, RESEARCH_SOURCES, RESEARCH_TOPICS, researchSearchText, researchSourcesFor, researchSourceUrl } from "@/lib/intelligence/global-research";
import { RESEARCH_CHAPTERS } from "@/lib/intelligence/research-chapters";
import styles from "./global-research.module.css";

export default function ResearchDiscovery({ mode = "sources", initialCountry = "", initialTopic = "" }: { mode?: "sources" | "countries"; initialCountry?: string; initialTopic?: string }) {
  const { locale, t } = useLocale();
  const [country, setCountry] = useState(RESEARCH_COUNTRIES.some(c => c.slug === initialCountry) ? initialCountry : "");
  const [topic, setTopic] = useState<string>(RESEARCH_TOPICS.some(id => id === initialTopic) ? initialTopic : "");
  const [region, setRegion] = useState("");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(12);
  const [copied, setCopied] = useState("");
  const [citationFallback, setCitationFallback] = useState("");
  const tokens = researchSearchText(query).split(/\s+/).filter(Boolean);
  const match = (values: string[]) => tokens.every(token => researchSearchText(values.join(" ")).includes(token));
  const sortedCountries = [...RESEARCH_COUNTRIES].sort((a,b) => t(a.name).localeCompare(t(b.name), locale));
  const countries = sortedCountries.filter(c => (!region || c.region === region) && match([c.name, t(c.name), c.iso2, c.iso3, c.subregion, t(c.region)]));
  const sources = (country ? researchSourcesFor(country) : RESEARCH_SOURCES).filter(s => (!topic || s.topics.some(id => id === topic)) && match([s.title, t(s.title), s.publisher, s.url, s.country ?? "", s.country ? t(RESEARCH_COUNTRIES.find(c => c.slug === s.country)?.name ?? "") : t("International reference"), ...s.topics.map(id => t(RESEARCH_CHAPTERS[id].title))]));
  function reset() { setCount(12); setCopied(""); setCitationFallback(""); }
  async function copy(id: string) {
    const source = sources.find(s => s.id === id);
    if (!source) return;
    const value = `${source.publisher}. ${source.title}. ${country ? researchSourceUrl(source,country) : source.url}\n${t("Review scope")}: ${t(source.reviewScope === "legacy-summary" ? "Selected editorial summaries" : "Publisher and portal")}. ${source.reviewedAt ?? t("Not available")}\n${source.scope}`;
    try { await navigator.clipboard.writeText(value); setCopied(id); setCitationFallback(""); } catch { setCopied(id); setCitationFallback(value); }
  }
  return <div className={styles.discovery}>
    <div className={styles.filters}>
      <label className={styles.search}><span>{t(mode === "sources" ? "Search sources" : "Search countries")}</span><input type="search" maxLength={120} value={query} placeholder={t(mode === "sources" ? "Publisher, country or topic…" : "Country, region or ISO code…")} onChange={e => { setQuery(e.target.value); reset(); }} /></label>
      {mode === "sources" ? <><label><span>{t("Destination")}</span><select value={country} onChange={e => { setCountry(e.target.value); reset(); }}><option value="">{t("All destinations")}</option>{sortedCountries.map(c => <option key={c.slug} value={c.slug}>{t(c.name)}</option>)}</select></label><label><span>{t("Topic")}</span><select value={topic} onChange={e => { setTopic(e.target.value); reset(); }}><option value="">{t("All topics")}</option>{RESEARCH_TOPICS.map(id => <option key={id} value={id}>{t(RESEARCH_CHAPTERS[id].title)}</option>)}</select></label></> : <label><span>{t("Region")}</span><select value={region} onChange={e => { setRegion(e.target.value); reset(); }}><option value="">{t("All regions")}</option>{[...new Set(RESEARCH_COUNTRIES.map(c => c.region))].map(r => <option key={r} value={r}>{t(r)}</option>)}</select></label>}
    </div>
    <div className={styles.resultBar}><p role="status">{t((mode === "sources" ? sources.length : countries.length) === 1 ? "1 result" : "{count} results", { count: mode === "sources" ? sources.length : countries.length })}</p>{query || topic || region || country ? <button type="button" onClick={() => {setQuery("");setTopic("");setRegion("");setCountry("");reset();}}>{t("Clear filters")}</button> : null}</div>
    {mode === "countries" ? <div className={styles.countryGrid}>{countries.slice(0,count).map(c => {
      const national = RESEARCH_SOURCES.filter(s => s.country === c.slug).length;
      return <article className={styles.countryCard} key={c.slug}><CountryFlag iso2={c.iso2} width={48} /><p className={styles.eyebrow}>{t(c.region)} · {c.iso3}</p><h3>{t(c.name)}</h3><p>{t("12 structured research chapters")}</p><p className={styles.meta}>{t("{count} applicable source references", { count: researchSourcesFor(c.slug).length })}</p><p className={styles.meta}>{t(national === 1 ? "1 destination-specific reference" : "{count} destination-specific references", { count: national })}</p><Link href={`/countries/${c.slug}#global-dossier`} prefetch={false}>{t("Open dossier →")}</Link></article>;
    })}</div> : <div className={styles.sourceGrid}>{sources.slice(0,count).map(source => {
      const identity = RESEARCH_COUNTRIES.find(c => c.slug === source.country);
      return <article className={styles.sourceCard} key={source.id} id={`reference-${source.id}`}>
        <div className={styles.sourceHeading}>{identity ? <CountryFlag iso2={identity.iso2} width={40} /> : <span className={styles.globe} aria-hidden="true">◎</span>}<span>{identity ? t(identity.name) : t("International reference")}</span></div>
        <h3>{source.publisher}</h3><p>{t(source.title)}</p>
        <div className={styles.badges}>{source.topics.slice(0,3).map(id => <span className={styles.badge} key={id}>{t(RESEARCH_CHAPTERS[id].title)}</span>)}</div>
        <p className={styles.meta}>{t("Review scope")}: {t(source.reviewScope === "legacy-summary" ? "Selected editorial summaries" : "Publisher and portal")} · {source.reviewedAt ?? t("Not available")}</p>
        <details className={styles.audit}><summary>{t("Scope, access and traceability")}</summary><p>{t(source.scope)}</p><p>{t("Access check")}: {t(source.access.status === "retrieved" ? "Page retrieved" : source.access.status === "restricted" ? "Automated access restricted" : "Manual review")}{source.access.checkedAt ? ` · ${source.access.checkedAt}` : ""}</p><p>{t("Portal review identifies the publisher and its scope. It does not certify every rule or individual eligibility.")}</p><a href={source.authorityUrl} target="_blank" rel="noreferrer">{t("Inspect publisher provenance")} ↗</a><code>{source.id}</code></details>
        <div className={styles.cardActions}><a href={country ? researchSourceUrl(source,country) : source.url} target="_blank" rel="noreferrer">{t("Open original source")} ↗</a><button type="button" onClick={() => void copy(source.id)}>{t("Copy citation")}</button></div>
        {copied === source.id ? citationFallback ? <textarea aria-label={t("Citation")} readOnly value={citationFallback} rows={5} onFocus={e=>e.target.select()} /> : <p className={styles.meta} role="status">{t("Citation copied.")}</p> : null}
      </article>;
    })}</div>}
    {(mode === "sources" ? sources.length : countries.length) > count ? <button className={styles.more} type="button" onClick={() => setCount(count+24)}>{t(mode === "sources" ? "Show more sources" : "Show more countries")} ↓</button> : null}
    {!(mode === "sources" ? sources.length : countries.length) ? <p className={styles.empty}>{t("No references match these filters. Try another search or clear the filters.")}</p> : null}
  </div>;
}
