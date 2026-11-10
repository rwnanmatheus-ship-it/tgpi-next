"use client";

import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
import { evidenceStatus, INDICATORS, INDICATOR_IDS, type Observation } from "@/lib/intelligence/core";
import { CONTEXT_INDICATOR_IDS, CONTEXT_INDICATORS, contextEvidenceStatus, type ContextObservation } from "@/lib/intelligence/country-context";
import { dossierFor, reviewState } from "@/lib/intelligence/dossiers";
import { sourceRegisterHref } from "@/lib/intelligence/provenance";

type Props = { country: string; iso2: string; observations: Observation[]; revision: string; retrievedAt: string | null; retained: boolean; contextObservations: ContextObservation[] };
export function EvidenceSeal({ checked }: { checked: boolean }) {
  return <svg className={`country-evidence-seal ${checked ? "is-checked" : "is-pending"}`} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m24 3 6 4 7 1 3 7 5 9-5 8-3 8-7 1-6 4-6-4-7-1-3-8-5-8 5-9 3-7 7-1Z" fill="currentColor" opacity=".12"/><path d="M24 8 37 13v10c0 9-8 15-13 18-5-3-13-9-13-18V13L24 8Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="24" cy="23" r="9" stroke="currentColor" strokeWidth=".7"/>{checked ? <path d="m19 23 3.5 3.5L29 20" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/> : <path d="M24 18v7m0 3v1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>}</svg>;
}
export default function CountrySourcePassport({ country, iso2, observations, revision, retrievedAt, retained, contextObservations }: Props) {
  const { locale, t } = useLocale();
  const dossier = dossierFor(country);
  const current = observations.filter(o => evidenceStatus(o) === "current").length + contextObservations.filter(o => contextEvidenceStatus(o) === "current").length;
  const total = INDICATOR_IDS.length + CONTEXT_INDICATOR_IDS.length;
  const verified = !retained && current === total;
  const due = dossier.claims.filter(c => reviewState(c) !== "reviewed").length;
  const date = (value: string) => new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
  return <section className="country-source-passport ig-section" id="country-sources">
    <div className="country-passport-heading"><EvidenceSeal checked={verified} /><div><p className="ig-eyebrow">{t("TGPI Evidence Passport")}</p><h2>{t("Know where every fact comes from.")}</h2></div><Link href={dossier.sources.length ? sourceRegisterHref({ country }) : "/intelligence#coverage"} className="ig-link">{t("Sources & methodology")} ↗</Link></div>
    <p className="ig-small">{t("The seal checks source traceability, data validation and collection freshness. It does not certify a country, visa or personal outcome.")}</p>
    <div className="country-source-metrics"><div><strong>{observations.length + contextObservations.length}/{total}</strong><span>{t("National indicators")}</span></div><div><strong>{current}</strong><span>{t("Within freshness thresholds")}</span></div><div><strong>{dossier.claims.length}</strong><span>{t("Research summaries")}</span></div><div><strong>{due}</strong><span>{t("Summaries needing review")}</span></div></div>
    <details className="country-passport-details"><summary>{t("Source & confidence")} ↓</summary><div className="country-source-grid">
      <article><span className={`ig-badge ${verified ? "ig-current" : "ig-historical"}`}>{t(verified ? "Validated statistical records" : retained ? "Retained evidence · check dates" : "Check indicator coverage and dates")}</span><h3>{t("World Bank WDI")}</h3><p>{retrievedAt ? `${t("Collection date")}: ${date(retrievedAt)}` : t("Not available")}</p><p>{t("Each indicator keeps its own reference year. Missing values are never estimated.")}</p><a href={`https://data.worldbank.org/country/${iso2.toLowerCase()}`} className="ig-link" target="_blank" rel="noreferrer">{t("Open country data")} ↗</a><details><summary>{t("Collection record")}</summary><p translate="no">{revision}</p>{observations.map(o => <p key={o.indicator}>{t(INDICATORS[o.indicator].label)} · {o.year} · {date(o.retrievedAt)}</p>)}{contextObservations.map(o => <p key={o.indicator}>{t(CONTEXT_INDICATORS[o.indicator].label)} · {o.year} · {date(o.retrievedAt)}</p>)}</details></article>
      <article><span className="ig-badge">{t("Official identity reference")}</span><h3>{t("UN Statistics Division — M49")}</h3><p>{t("Country identity and statistical geography. This reference does not validate immigration rules.")}</p><a href="https://unstats.un.org/unsd/methodology/m49/" className="ig-link" target="_blank" rel="noreferrer">{t("Inspect country identity")} ↗</a></article>
      <article><span className={`ig-badge ${due || !dossier.claims.length ? "ig-historical" : "ig-current"}`}>{t(due ? "Review overdue" : dossier.claims.length ? "Source-linked research" : "Research gap")}</span><h3>{t("Entry, education & costs")}</h3><p>{t("Review dates and unresolved issues remain visible. A successful website check cannot renew legal or cost guidance.")}</p><a href="#research-dossier" className="ig-link">{t("Inspect destination research")} ↓</a></article>
    </div></details>
    {dossier.sources.length > 0 && <details className="country-source-directory"><summary>{t("Destination source directory")} · {dossier.sources.length}</summary><div>{dossier.sources.map(source => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.publisher}</strong><small>{t(source.title)}</small></span><span aria-hidden="true">↗</span></a>)}</div></details>}
  </section>;
}
