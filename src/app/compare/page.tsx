import "./compare.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CinematicImage from "@/components/ui/CinematicImage";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CompareCountryPicker from "@/components/compare/CompareCountryPicker";
import ComparisonMatrix from "@/components/compare/ComparisonMatrix";
import ComparisonNavigation from "@/components/compare/ComparisonNavigation";
import DecisionLabs from "@/components/compare/DecisionLabs";
import DecisionOverview from "@/components/compare/DecisionOverview";
import { GraphStatus } from "@/components/intelligence/Evidence";
import ResearchLoading from "@/components/intelligence/ResearchLoading";
import DossierComparison from "@/components/intelligence/DossierComparison";
import { getLocale } from "@/lib/localization/server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { translate } from "@/lib/localization/messages";
import { localizedCountryName, type SearchableCountry } from "@/lib/country-search";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { isComparisonGoal, type ComparisonGoal } from "@/lib/tgpi-comparison";
import { documentsHref, resolveDocumentGoal } from "@/lib/documents-os";
import { comparisonPlanPath, readComparisonSelection } from "@/lib/comparison-state";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const sourceMetadata: Metadata = {
  title: "Compare Countries — Decision Studio | TGPI",
  description: "Compare all selected countries with source-linked indicators, reference years, decision lenses and personal planning tools.",
  alternates: { canonical: "https://www.theglobalpolymath.com/compare" },
};

const DEFAULT_COUNTRIES = ["portugal", "canada", "japan"];
const PAGE_SIZE = 4;

export default async function ComparePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [params, locale] = await Promise.all([searchParams, getLocale()]);
  const t = (message: string) => translate(locale, message);
  const countries: SearchableCountry[] = identities.map(({ slug, name, region, iso2, iso3 }) => ({
    slug, region, iso2, iso3, name: localizedCountryName({ slug, name, region, iso2, iso3 }, locale),
  }));
  const bySlug = new Map(countries.map(country => [country.slug, country]));
  const { slugs, invalid, allowRestore } = readComparisonSelection(params, new Set(bySlug.keys()), DEFAULT_COUNTRIES);
  const goal = typeof params.goal === "string" && isComparisonGoal(params.goal) ? params.goal : "overall";
  const selected = slugs.map(slug => bySlug.get(slug)!);
  const requestedPage = typeof params.view === "string" ? Number(params.view) : 1;
  const page = Math.max(1, Math.min(Math.ceil(selected.length / PAGE_SIZE), Number.isSafeInteger(requestedPage) ? requestedPage : 1));
  const visible = selected.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasExplicitCountries = params.country !== undefined || params.set !== undefined;
  const canImportToPlan = hasExplicitCountries && selected.length >= 2 && selected.length <= 5;
  const planHref = canImportToPlan ? comparisonPlanPath(slugs, goal) : "/plan";
  const preparationHref = documentsHref({ country: hasExplicitCountries ? selected[0]?.slug : undefined, goal: resolveDocumentGoal(goal) });

  return (
    <ActivationProgressProvider>
      <main className="ig-shell compare-command">
        <div className="ig-container">
          <header className="compare-hero">
            <div className="compare-hero-copy">
              <p className="compare-kicker">{t("TGPI /")} {t("Decision Studio")}</p>
              <h1 id="compare-title">{t("Compare countries")}</h1>
              <p>{t("Your destinations. Your priorities. One clear view of the evidence and your next steps.")}</p>
              <div className="compare-hero-links">
                <a href="#comparison-builder">{t("Build my comparison")} <span aria-hidden="true">↓</span></a>
                <Link href="/plan">{t("My plan")} <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="compare-hero-meta">
                <span>{countries.length} {t("countries")}</span>
                <span>{t("Source-linked data")}</span>
              </div>
            </div>
            <div className="compare-hero-art" aria-hidden="true">
              <CinematicImage asset="decision-comparison" alt="" priority
                sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1440px) 58vw, 820px" position="58% center" />
            </div>
          </header>
          <CompareCountryPicker key={`${slugs.join(",")}:${goal}:${locale}:${allowRestore}`} countries={countries}
            initialSlugs={slugs} initialGoal={goal} allowRestore={allowRestore} invalidSelection={invalid} />
          {selected.length >= 2 ? <>
            <nav className="compare-nav" aria-label={t("Comparison sections")}>
              {[
                ["#comparison-builder", "Choose countries"],
                ["#decision-overview", "Overview"],
                ["#comparison-matrix", "Sources & evidence"],
                ["#decision-details", "Detailed comparison"],
                ["#decision-labs", "Decision Lab"],
                ["#decision-actions", "Next steps"],
              ].map(([href, label]) => <a href={href} key={href}>{t(label)}</a>)}
            </nav>
            <section id="decision-overview" className="compare-section" aria-labelledby="decision-overview-title">
              <ComparisonNavigation countries={selected} goal={goal} page={page} pageSize={PAGE_SIZE} />
              <DecisionOverview countries={visible} />
            </section>
            <div id="comparison-matrix" className="compare-section">
              <Suspense fallback={<ResearchLoading />}>
                <ComparisonEvidence key={slugs.join(",")} visible={visible} selected={selected} goal={goal} />
              </Suspense>
            </div>
            <section id="decision-details" className="compare-section">
              <div className="compare-section-head">
                <div>
                  <h2>{t("Detailed comparison")}</h2>
                  <p>{t("Check legal pathways, education and cost references before committing.")}</p>
                </div>
                <Link className="compare-button" href="/intelligence">{t("Methodology & source coverage")} ↗</Link>
              </div>
              <details className="compare-dossier-disclosure">
                <summary>{t("Open destination evidence and limitations")}</summary>
                <DossierComparison countries={visible} />
              </details>
            </section>
            <section id="decision-labs" className="compare-section compare-labs">
              <div className="compare-section-head">
                <div>
                  <h2>{t("Decision Lab")}</h2>
                  <p>{t("Build a city budget and a preparation checklist for each destination. Your estimates remain separate from published evidence.")}</p>
                </div>
              </div>
              <DecisionLabs key={visible.map(country => country.slug).join(",")} countries={visible} />
            </section>
            {selected.length > PAGE_SIZE && <ComparisonNavigation countries={selected} goal={goal} page={page} pageSize={PAGE_SIZE} />}
          </> : <section className="compare-empty">
            <h2>{t("Choose at least two countries to build a comparison.")}</h2>
            <a className="compare-button" href="#comparison-builder">{t("Choose countries")} ↑</a>
          </section>}
          <section id="decision-actions" className="compare-section compare-next">
            <h2>{t("Next steps")}</h2>
            <p>{t("Connect your research to a plan, learning and practical preparation.")}</p>
            <div className="compare-next-grid">
              {[
                [planHref, "My plan"], ["/countries", "Explore destinations"], ["/learn", "Learn"],
                [preparationHref, "Documents"], ["/atlas?guide=evidence", "Ask Atlas"], ["/profile", "Workspace"],
              ].map(([href, label]) => <Link href={href} key={href}>{t(label)}<span aria-hidden="true">↗</span></Link>)}
            </div>
          </section>
        </div>
      </main>
    </ActivationProgressProvider>
  );
}

async function ComparisonEvidence({ visible, selected, goal }: { visible: SearchableCountry[]; selected: SearchableCountry[]; goal: ComparisonGoal }) {
  const state = await getIntelligence();
  const wanted = new Set(selected.map(country => country.slug));
  return <>
    <ComparisonMatrix countries={visible} allCountries={selected}
      observations={state.snapshot.observations.filter(observation => wanted.has(observation.country))} goal={goal} />
    <GraphStatus state={{ ...state, snapshot: { ...state.snapshot, observations: [] } }} />
  </>;
}

export async function generateMetadata() {
  return localizeMetadata(sourceMetadata);
}
