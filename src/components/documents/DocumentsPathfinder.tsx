"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import DocumentReviewChecklist from "@/components/activation/DocumentReviewChecklist";
import CountrySearchInput from "@/components/countries/CountrySearchInput";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CountryFlag from "@/components/ui/CountryFlag";
import { localizedCountryName, type SearchableCountry } from "@/lib/country-search";
import { documentReviewItems } from "@/lib/document-review";
import { documentGoalPaths, documentsHref, type DocumentGoal } from "@/lib/documents-os";

const goalIcons = { travel: "compass", study: "book", work: "file", live: "home" } as const;

type Props = {
  countries: SearchableCountry[];
  initialGoal: DocumentGoal;
  initialCountry?: string;
  shortlist?: string[];
};

export default function DocumentsPathfinder({ countries, initialGoal, initialCountry, shortlist = [] }: Props) {
  const { locale, t } = useLocale();
  const { progress } = useActivationProgress();
  const [goal, setGoal] = useState(initialGoal);
  const [countrySlug, setCountrySlug] = useState(initialCountry);
  const [query, setQuery] = useState("");
  const [shareStatus, setShareStatus] = useState<"copied" | "unavailable">();
  const country = countries.find(item => item.slug === countrySlug);
  const path = documentGoalPaths.find(item => item.goal === goal) ?? documentGoalPaths[0];
  const quickPicks = [...new Set([...shortlist, "portugal", "canada", "japan", "spain"])]
    .flatMap(slug => countries.find(item => item.slug === slug) ?? [])
    .slice(0, 4);
  const destinationName = country ? localizedCountryName(country, locale) : "";
  const researchHref = `${documentsHref({ country: country?.slug, goal })}#preparation-paths`;

  const chooseCountry = useCallback((slug: string) => {
    setCountrySlug(slug);
    setQuery("");
    setShareStatus(undefined);
  }, []);

  function downloadBrief() {
    if (!country) return;
    const reviewed = new Set(progress.documentReviews[country.slug]?.completedItemIds);
    const text = [
      "TGPI Global Documents",
      t("Research brief for {country}", { country: destinationName }),
      t(path.label),
      "",
      t(path.description),
      "",
      t("Documents to verify"),
      ...documentReviewItems.map(item => `[${reviewed.has(item.id) ? "x" : " "}] ${t(item.title)}\n    ${t(item.text)}`),
      "",
      t("Open country sources"),
      new URL(`/countries/${country.slug}#country-sources`, window.location.origin).href,
      t("Confirm applicable requirements with the receiving authority."),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `tgpi-documents-${country.slug}-${goal}.txt`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 5_000);
  }

  async function copyResearchLink() {
    try {
      await navigator.clipboard.writeText(new URL(researchHref, window.location.origin).href);
      setShareStatus("copied");
    } catch {
      setShareStatus("unavailable");
    }
  }

  return (
    <section id="preparation-paths" className="documents-section" aria-labelledby="documents-studio-title">
      <div className="documents-section-heading">
        <div>
          <p className="documents-eyebrow">{t("Research studio")}</p>
          <h2 id="documents-studio-title">{t("Build your document plan")}</h2>
          <p>{t("Choose your purpose and destination to open the research checklist, find sources and create a brief.")}</p>
        </div>
      </div>

      <div className="documents-studio">
        <div className="documents-controls">
          <p className="documents-eyebrow">{t("Choose a global objective")}</p>
          <div className="documents-goals" role="group" aria-label={t("Choose a global objective")}>
            {documentGoalPaths.map(option => (
              <button key={option.goal} type="button" data-goal={option.goal} aria-pressed={goal === option.goal} onClick={() => {
                setGoal(option.goal);
                setShareStatus(undefined);
              }}>
                <span className="documents-icon"><NavigationIcon name={goalIcons[option.goal]} width={19} height={19} /></span>
                <span>{t(option.label)}</span>
              </button>
            ))}
          </div>
          <CountrySearchInput countries={countries} query={query} onChange={setQuery} onSelect={chooseCountry} />
          <div className="documents-quick-picks" role="group" aria-label={t("Quick destinations")}>
            {quickPicks.map(item => <button key={item.slug} type="button" aria-pressed={item.slug === country?.slug} onClick={() => chooseCountry(item.slug)}>
              <CountryFlag iso2={item.iso2} width={25} />
              {localizedCountryName(item, locale)}
            </button>)}
          </div>
        </div>

        <div className="documents-route-preview" data-goal={goal}>
          <div className="documents-route-title">
            <span className="documents-icon"><NavigationIcon name={goalIcons[goal]} /></span>
            <p className="documents-eyebrow">{t(path.eyebrow)}</p>
          </div>
          <h3>{t(path.title)}</h3>
          <p>{t(path.description)}</p>
          <ul className="documents-record-tags">
            {path.records.map(record => <li key={record}>{t(record)}</li>)}
          </ul>
          {country ? <div className="documents-route-destination" aria-live="polite">
            <CountryFlag iso2={country.iso2} width={41} />
            <div><span>{t("Selected destination")}</span><strong>{destinationName}</strong></div>
          </div> : <p className="documents-route-destination">{t("Select a destination to see its checklist.")}</p>}
        </div>
      </div>

      {country && <div className="documents-research-grid">
        <DocumentReviewChecklist
          key={country.slug}
          countryName={destinationName}
          countrySlug={country.slug}
          embedded
          signInHref={`/sign-in?next=${encodeURIComponent(researchHref)}`}
        />
        <aside className="documents-research-actions">
          <span className="documents-icon"><NavigationIcon name="file" /></span>
          <h3>{t("Take your research with you")}</h3>
          <p>{t("Download a text brief with your research questions, checklist and a link to the country sources.")}</p>
          <button className="documents-button" type="button" onClick={downloadBrief}>{t("Download research brief")}</button>
          <button className="documents-button secondary" type="button" onClick={() => void copyResearchLink()}>{t("Copy research link")}</button>
          {shareStatus && <p className="documents-share-status" role="status">
            {shareStatus === "copied" ? t("Research link copied.") : <Link className="documents-text-link" href={researchHref}>{t("Open shareable research link")}</Link>}
          </p>}
          <div className="documents-source-links">
            <Link className="documents-text-link" href={`/countries/${country.slug}#country-sources`} prefetch={false}>{t("Open country sources")} <span aria-hidden="true">↗</span></Link>
            <Link className="documents-text-link" href={`/country-fit?country=${country.slug}&goal=${goal}`} prefetch={false}>{t("Continue in Country Fit")} <span aria-hidden="true">↗</span></Link>
          </div>
        </aside>
      </div>}
    </section>
  );
}
