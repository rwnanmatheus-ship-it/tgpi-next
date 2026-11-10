"use client";

import CountryFlag from "@/components/ui/CountryFlag";

import { useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import { INDICATORS, INDICATOR_IDS, INDICATOR_PRODUCERS, comparisonCaveat, evidenceLabel, evidenceStatus, formatObservation, indicatorUrl, type IndicatorId, type Observation } from "@/lib/intelligence/core";
import { comparisonCsv } from "@/lib/comparison-export";
import type { ComparisonGoal } from "@/lib/tgpi-comparison";
export type MatrixCountry = { slug: string; name: string; iso2: string; emoji: string };

export default function ComparisonMatrix({ countries, allCountries, observations, goal }: {countries:MatrixCountry[];allCountries:MatrixCountry[];observations:Observation[];goal:ComparisonGoal}) {
  const {t,locale}=useLocale();
  const [onlyDifferences,setOnlyDifferences]=useState(false);
  const [metric,setMetric]=useState("all");
  const priority:IndicatorId = goal === "study" ? "SE.TER.ENRR" : goal === "work" ? "SL.UEM.TOTL.ZS" : "IT.NET.USER.ZS";
  const ids=[priority,...INDICATOR_IDS.filter(id=>id!==priority)].filter(id=>metric === "all" || metric === id);
  const get=(slug:string,id:IndicatorId)=>observations.find(o=>o.country===slug && o.indicator===id);
  const rows=ids.filter(id=>!onlyDifferences || new Set(countries.map(c=>{const o=get(c.slug,id);return o?`${o.value}:${o.year}`:"missing";})).size>1);
  function download() {
    const csv=comparisonCsv(allCountries,observations,{locale,translate:t});
    const url=URL.createObjectURL(new Blob(["\uFEFF",csv],{type:"text/csv;charset=utf-8"}));
    const link=document.createElement("a");link.href=url;link.download="tgpi-country-comparison.csv";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <section id="comparison-matrix" className="compare-section" aria-labelledby="matrix-title"><div className="compare-section-head"><div><p className="compare-kicker">03 / {t("Sources & evidence")}</p><h2 id="matrix-title">{t("The details that make a difference.")}</h2><p>{t("Read values, reference years and sources together. Missing data is never zero.")}</p></div><button type="button" className="compare-button" onClick={download}>{t("Export all selected countries")}{" ↓"}</button></div>
    <div className="compare-matrix-tools"><label>{t("Indicator")}<select value={metric} onChange={e=>setMetric(e.target.value)}><option value="all">{t("All indicators")}</option>{INDICATOR_IDS.map(id=><option value={id} key={id}>{t(INDICATORS[id].label)}</option>)}</select></label><label className="compare-toggle"><input type="checkbox" checked={onlyDifferences} onChange={e=>setOnlyDifferences(e.target.checked)} />{t("Only differences in this group")}</label></div>
    <div className="compare-table-scroll" role="region" aria-label={t("Country comparison table")} tabIndex={0}><table className="compare-table"><caption>{t("National indicators for the visible countries")}</caption><thead><tr><th scope="col">{t("Indicator")}</th>{countries.map(c=><th scope="col" key={c.slug}><CountryFlag iso2={c.iso2} width={32} /> {c.name}</th>)}</tr></thead><tbody>{rows.map(id=><tr key={id}><th scope="row"><strong>{t(INDICATORS[id].label)}</strong><small>{t(INDICATORS[id].unit)}</small><details><summary>{t("How to read this")}</summary><p>{t(INDICATORS[id].explanation)}</p><p>{t(comparisonCaveat(countries.map(c=>get(c.slug,id))))}</p></details></th>{countries.map(c=>{const o=get(c.slug,id);const status=evidenceStatus(o);return <td key={c.slug}><strong className="compare-metric-value">{o?formatObservation(o,locale):"—"}</strong><span className="compare-metric-year">{o?t("Reference year {year}",{year:o.year}):t("Not available")}</span><span className={`compare-evidence-status compare-evidence-${status}`}>{t(evidenceLabel(status))}</span><details className="compare-cell-source"><summary>{t("Source & confidence")}</summary><p>{INDICATOR_PRODUCERS[id]} · {t("World Bank WDI")}</p>{o && <p>{t("Collected {date}. Source dataset update: {updated}.",{date:new Intl.DateTimeFormat(locale).format(new Date(o.retrievedAt)),updated:o.sourceUpdatedAt??t("not supplied")})}</p>}<a href={indicatorUrl(id,c.iso2)} target="_blank" rel="noreferrer">{t("Open source and indicator metadata ↗")}</a></details></td>;})}</tr>)}</tbody></table></div>{!rows.length && <p role="status" className="compare-empty">{t("No differences for the active filter. Show all indicators to continue.")}</p>}
    <p className="compare-note">{t("National indicators provide context. They do not measure your eligibility, city budget or personal fit.")}</p>
  </section>;
}
