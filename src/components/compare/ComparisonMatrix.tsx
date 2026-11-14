"use client";

import { useMemo, useState } from "react";
import CountryFlag from "@/components/ui/CountryFlag";
import { useLocale } from "@/components/localization/LocaleProvider";
import {
  INDICATORS, INDICATOR_IDS, INDICATOR_PRODUCERS, comparisonCaveat, evidenceLabel,
  evidenceStatus, formatObservation, indicatorUrl, type IndicatorId, type Observation,
} from "@/lib/intelligence/core";
import { comparisonCsv } from "@/lib/comparison-export";
import { comparisonDelta } from "@/lib/comparison-state";
import type { ComparisonGoal } from "@/lib/tgpi-comparison";

type MatrixCountry = { slug: string; name: string; iso2: string };
type Props = { countries: MatrixCountry[]; allCountries: MatrixCountry[]; observations: Observation[]; goal: ComparisonGoal };

export default function ComparisonMatrix({ countries, allCountries, observations, goal }: Props) {
  const { t, locale } = useLocale();
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const [sameYearOnly, setSameYearOnly] = useState(false);
  const [metric, setMetric] = useState("all");
  const [baselineSlug, setBaselineSlug] = useState("");
  const byPair = useMemo(() => new Map(observations.map(item => [`${item.country}:${item.indicator}`, item])), [observations]);
  const baseline = allCountries.find(country => country.slug === baselineSlug);
  const priority: IndicatorId = goal === "study" ? "SE.TER.ENRR" : goal === "work" ? "SL.UEM.TOTL.ZS" : "IT.NET.USER.ZS";
  const deltaNumber = new Intl.NumberFormat(locale, { maximumFractionDigits: 1, signDisplay: "exceptZero" });
  const dates = new Intl.DateTimeFormat(locale, { timeZone: "UTC" });
  const ids = [priority, ...INDICATOR_IDS.filter(id => id !== priority)].filter(id => metric === "all" || metric === id);
  const rows = ids.flatMap(id => {
    const cells = countries.map(country => byPair.get(`${country.slug}:${id}`));
    const reference = baseline && byPair.get(`${baseline.slug}:${id}`);
    const hasPeer = cells.length > 1 || Boolean(baseline && baseline.slug !== countries[0]?.slug);
    const comparable = hasPeer && cells.every(item => item && item.year === cells[0]?.year && (!baseline || item.year === reference?.year));
    if (sameYearOnly && !comparable) return [];
    if (onlyDifferences && new Set(cells.map(item => item ? `${item.value}:${item.year}` : null)).size <= 1) return [];
    return [{ id, cells, reference }];
  });

  function download() {
    const csv = comparisonCsv(allCountries, observations, { locale, translate: t });
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "tgpi-country-comparison.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section className="compare-matrix" aria-labelledby="matrix-title">
      <div className="compare-section-head">
        <div>
          <h2 id="matrix-title">{t("Sources & evidence")}</h2>
          <p>{t("Read values, reference years and sources together. Missing data is never zero.")}</p>
        </div>
        <button type="button" className="compare-button" onClick={download}>{t("Export all selected countries")} ↓</button>
      </div>
      <div className="compare-matrix-tools">
        <label><span>{t("Indicator")}</span>
          <select value={metric} onChange={event => setMetric(event.target.value)}>
            <option value="all">{t("All indicators")}</option>
            {INDICATOR_IDS.map(id => <option value={id} key={id}>{t(INDICATORS[id].label)}</option>)}
          </select>
        </label>
        <label><span>{t("Reference country")}</span>
          <select value={baselineSlug} onChange={event => setBaselineSlug(event.target.value)}>
            <option value="">{t("No reference country")}</option>
            {allCountries.map(country => <option value={country.slug} key={country.slug}>{country.name}</option>)}
          </select>
        </label>
        <div className="compare-matrix-toggles">
          <label className="compare-toggle">
            <input type="checkbox" checked={sameYearOnly} onChange={event => setSameYearOnly(event.target.checked)} />
            {t("Same reference year only")}
          </label>
          <label className="compare-toggle">
            <input type="checkbox" checked={onlyDifferences} onChange={event => setOnlyDifferences(event.target.checked)} />
            {t("Only differences in this group")}
          </label>
        </div>
      </div>
      {baseline && <p className="compare-note">{t("Differences from {country} appear when both values use the same reference year.", { country: baseline.name })}</p>}
      {rows.length ? <div className="compare-table-scroll" role="region" aria-label={t("Country comparison table")} tabIndex={0}>
        <table className="compare-table" style={{ minWidth: `${8 + countries.length * 9}rem` }}>
          <caption>{t("National indicators for the visible countries")}</caption>
          <colgroup><col className="compare-indicator-col" />{countries.map(country => <col key={country.slug} />)}</colgroup>
          <thead>
            <tr><th scope="col">{t("Indicator")}</th>{countries.map(country =>
              <th scope="col" key={country.slug}><CountryFlag iso2={country.iso2} width={32} /> {country.name}</th>,
            )}</tr>
          </thead>
          <tbody>
            {rows.map(({ id, cells, reference }) => (
              <tr key={id}>
                <th scope="row">
                  <strong>{t(INDICATORS[id].label)}</strong>
                  <small>{t(INDICATORS[id].unit)}</small>
                  <details>
                    <summary>{t("How to read this")}</summary>
                    <p>{t(INDICATORS[id].explanation)}</p>
                    <p>{t(comparisonCaveat(cells))}</p>
                  </details>
                </th>
                {countries.map((country, index) => {
                  const observation = cells[index];
                  const status = evidenceStatus(observation);
                  const isBaseline = country.slug === baselineSlug;
                  const delta = isBaseline ? null : comparisonDelta(observation, reference);
                  return (
                    <td key={country.slug}>
                      <strong className="compare-metric-value">{observation ? formatObservation(observation, locale) : "—"}</strong>
                      {observation && <span className="compare-metric-year">{t("Reference year {year}", { year: observation.year })}</span>}
                      {isBaseline && <span className="compare-delta">{t("Reference country")}</span>}
                      {delta !== null && <span className="compare-delta">
                        {t(id === "SP.POP.TOTL" ? "{value} people" : "{value} percentage points", { value: deltaNumber.format(delta) })}
                      </span>}
                      <span className={`compare-evidence-status compare-evidence-${status}`}>{t(evidenceLabel(status))}</span>
                      <details className="compare-cell-source">
                        <summary>{t("Source & confidence")}</summary>
                        <p>{INDICATOR_PRODUCERS[id]} · {t("World Bank WDI")}</p>
                        {observation && <p>{t("Collected {date}. Source dataset update: {updated}.", {
                          date: dates.format(new Date(observation.retrievedAt)),
                          updated: observation.sourceUpdatedAt ?? t("not supplied"),
                        })}</p>}
                        <a href={indicatorUrl(id, country.iso2)} target="_blank" rel="noreferrer">{t("Open source and indicator metadata ↗")}</a>
                      </details>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div className="compare-note">
        <p role="status">{t("No indicators match these filters.")}</p>
        <button type="button" className="compare-button" onClick={() => { setMetric("all"); setSameYearOnly(false); setOnlyDifferences(false); }}>
          {t("Reset filters")}
        </button>
      </div>}
      <p className="compare-note">{t("National indicators provide context. They do not measure your eligibility, city budget or personal fit.")}</p>
    </section>
  );
}
