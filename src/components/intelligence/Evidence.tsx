"use client";

import Link from "next/link";
import { INDICATORS, INDICATOR_PRODUCERS, evidenceLabel, evidenceStatus, formatObservation, indicatorUrl, type IndicatorId, type IntelligenceState, type Observation } from "@/lib/intelligence/core";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";


export function EvidenceCard({ observation, indicator, countryCode }: { observation?: Observation; indicator: IndicatorId; countryCode: string }) {
  const { locale, t } = useLocale();
  const date = (value: string) => new Intl.DateTimeFormat(locale, { timeZone: "UTC" }).format(new Date(value));
  const definition = INDICATORS[indicator];
  const status = evidenceStatus(observation);
  return <article className="ig-evidence">
    <div className="ig-spread"><span className="ig-eyebrow">{t(definition.label)}</span><span className={`ig-badge ig-${status}`}>{t(evidenceLabel(status))}</span></div>
    <p className="ig-value">{observation ? formatObservation(observation, locale) : t("Not available")}</p>
    <p className="ig-meta">{t(definition.unit)} · {observation ? t("Reference year {year}", { year: observation.year }) : t("No observation supplied")}</p>
    <p className="ig-small">{t(definition.explanation)}</p>
    <details className="ig-details"><summary>{t("Source & confidence")}</summary>
      <p className="ig-small">{t("Source: {producer}, via World Bank, World Development Indicators. Indicator license: CC BY 4.0 (registry reviewed 2026-09-02). Values are rounded for display; no missing observations are imputed. Confidence here describes traceability and freshness, not a probability of truth.", { producer: INDICATOR_PRODUCERS[indicator] })}</p>
      <p className="ig-small">{observation ? t("Collected {date}. Source dataset update: {updated}.", { date: date(observation.retrievedAt), updated: observation.sourceUpdatedAt ? date(observation.sourceUpdatedAt) : t("not supplied") }) : t("No verified observation is currently available in TGPI for this indicator and country. No value is inferred.")}</p>
      <p className="ig-small">{t(status === "current" ? "Registered source, valid schema and acceptable reference-year age under methodology v1." : status === "historical" ? "The observation is older than the indicator's reference-year threshold. Use only as historical context." : status === "stale" ? "The source has not been successfully checked within seven days; validate directly before use." : "Insufficient evidence for a quantitative conclusion.")}</p>
      <a href={indicatorUrl(indicator, countryCode)} target="_blank" rel="noreferrer" className="ig-link">{t("Open source and indicator metadata ↗")}</a>
    </details>
  </article>;
}

export function GraphStatus({ state }: { state: IntelligenceState }) {
  const { locale, t } = useLocale();
  return <aside className="ig-status" aria-label={t("Intelligence data status")}>
    <div className="ig-spread"><span className="ig-eyebrow">{t("TGPI Intelligence Graph · Statistical layer v1")}</span><Link className="ig-link" href="/intelligence">{t("Methodology & coverage →")}</Link></div>
    <p className="ig-small">{t(state.message ?? "Source-linked observations. National context, not a personal recommendation or a real-time world feed.")}</p>
    <p className="ig-meta">{state.snapshot.retrievedAt ? t("Collection: {date} UTC · Revision {revision}", { date: new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short", timeZone: "UTC" }).format(new Date(state.snapshot.retrievedAt)), revision: state.snapshot.revision }) : t("Statistical collection pending validation. Official country identities remain available.")}</p>
  </aside>;
}

export function IntelligenceBanner() {
  const { t } = useLocale();
  return <section className="ig-banner"><div><p className="ig-eyebrow">{t("Decision dossiers + Your personal scenario")}</p><h2>{t("Know the evidence. Build your next move.")}</h2><p>{t("Explore official study pathways, institution checks and scoped cost references. Compare the questions that matter, then build a personal plan.")}</p></div><div className="ig-actions"><Link href="/country-fit" className="ig-button">{t("Build my Country Fit →")}</Link><Link href="/intelligence/research" className="ig-button ig-secondary">{t("Explore decision dossiers")}</Link><Link href="/intelligence" className="ig-link"><LocalizedText text="Sources & methodology" /></Link></div></section>;
}
