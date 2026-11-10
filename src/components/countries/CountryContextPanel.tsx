"use client";

import { useLocale } from "@/components/localization/LocaleProvider";
import { evidenceLabel } from "@/lib/intelligence/core";
import { CONTEXT_INDICATORS, CONTEXT_INDICATOR_IDS, contextEvidenceStatus, contextSourceUrl, contextMetadataUrl, type ContextObservation } from "@/lib/intelligence/country-context";
export default function CountryContextPanel({ observations, iso2 }: { observations: ContextObservation[]; iso2: string }) {
  const { locale, t } = useLocale();
  const date = (value: string) => new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
  return <section id="country-context" className="ig-section"><p className="ig-eyebrow">{t("Health, infrastructure & economy")}</p><h2>{t("A broader view of everyday life.")}</h2><p className="ig-small">{t("Official national context with reference years. Use local evidence to evaluate a city, household or personal situation.")}</p><div className="country-context-grid">{CONTEXT_INDICATOR_IDS.map(id => {
    const definition = CONTEXT_INDICATORS[id];
    const row = observations.find(o => o.indicator === id);
    const status = contextEvidenceStatus(row);
    return <article className="ig-evidence" key={id}><div className="ig-spread"><span className="ig-eyebrow">{t(definition.label)}</span><span className={`ig-badge ig-${status}`}>{t(evidenceLabel(status))}</span></div><p className="ig-value">{row ? new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(row.value) : t("Not available")}</p><p className="ig-meta">{t(definition.unit)} · {row ? t("Reference year {year}", { year: row.year }) : t("No observation supplied")}</p><p className="ig-small">{t(definition.explanation)}</p><a href={contextSourceUrl(id, iso2)} target="_blank" rel="noreferrer" className="ig-link">{t("Open source and indicator metadata ↗")}</a><details className="ig-details"><summary>{t("Source & confidence")}</summary><p className="ig-small">{t(definition.producer)} · {t("World Bank WDI")}</p><p className="ig-small">{row ? t("Collected {date}. Source dataset update: {updated}.", { date: date(row.retrievedAt), updated: row.sourceUpdatedAt ? date(row.sourceUpdatedAt) : t("not supplied") }) : t("No verified observation is currently available in TGPI for this indicator and country. No value is inferred.")}</p><a href={contextMetadataUrl(id)} target="_blank" rel="noreferrer" className="ig-link">{t("Sources & methodology")} ↗</a></details></article>;
  })}</div></section>;
}
