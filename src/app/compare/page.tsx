import { localizeMetadata } from "@/lib/localization/metadata.server";
import "./compare.css";
import CinematicImage from "@/components/ui/CinematicImage";
import DecisionLabs from "@/components/compare/DecisionLabs";
import DecisionOverview from "@/components/compare/DecisionOverview";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import ResearchLoading from "@/components/intelligence/ResearchLoading";
import { Suspense } from "react";
import PersonalResearchContext from "@/components/profile/PersonalResearchContext";
import type { Metadata } from "next";
import Link from "next/link";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CompareCountryPicker from "@/components/compare/CompareCountryPicker";
import { EvidenceCard, GraphStatus } from "@/components/intelligence/Evidence";
import { getAllCountries } from "@/lib/countries";
import { INDICATOR_IDS, INDICATORS, findObservation, comparisonCaveat } from "@/lib/intelligence/core";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { isComparisonGoal, getComparisonGoalConfig } from "@/lib/tgpi-comparison";
import DossierComparison from "@/components/intelligence/DossierComparison";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export const dynamic = "force-dynamic";
export const maxDuration = 60;
const sourceMetadata: Metadata = { title: "Compare Countries — Evidence & Trade-offs | TGPI", description: "Compare up to three countries using source-linked observations, visible reference years and explicit gaps. No unsupported country ratings.", alternates: { canonical: "https://www.theglobalpolymath.com/compare" } };
export default async function ComparePage({ searchParams }: { searchParams?: Promise<{ country?: string | string[]; goal?: string }> }) {
  const params = await searchParams;
  const locale = await getLocale();
  const t = (text: string) => translate(locale, text);
  const raw = params?.country ? (Array.isArray(params.country) ? params.country : [params.country]) : [];
  const requested = Array.from(new Set(raw)).slice(0, 3);
  const valid = new Set(identities.map(c => c.slug));
  const slugs = requested.length ? requested.filter(s => valid.has(s)) : ["portugal", "canada", "japan"];
  const selected = slugs.map(slug => identities.find(c => c.slug === slug)!);
  const goal = isComparisonGoal(params?.goal) ? params.goal : "overall";
  const countries = getAllCountries().map(({ slug, name, emoji, region }) => ({ slug, name, emoji, region, iso2: identities.find(c => c.slug === slug)?.iso2, iso3: identities.find(c => c.slug === slug)?.iso3 })).sort((a, b) => a.name.localeCompare(b.name));
  return <ActivationProgressProvider><main className="ig-shell compare-command"><div className="ig-container">
    <header className="product-page-heading compare-page-heading"><div><p className="product-kicker"><LocalizedText text={"TGPI /"} />{" "}{t("Decision Intelligence")}</p><h1 id="compare-title">{t("Compare the world.")}</h1><p>{t("Put up to three countries side by side. Inspect the sources, dates and gaps, then connect the trade-offs to your own priorities.")}</p></div><nav className="product-page-links" aria-label={t("Connected learning tools")}><Link href="/countries">{t("Explore destinations")} ↗</Link><Link href="/plan">{t("My plan")} ↗</Link></nav><div className="compare-research-art" aria-hidden="true"><CinematicImage asset="decision-comparison" alt="" priority sizes="(max-width: 767px) calc(100vw - 40px), 340px" /></div></header>
    <CompareCountryPicker key={`${slugs.join(",")}:${goal}`} countries={countries} initialSlugs={slugs} initialGoal={goal} hasExplicitSelection={requested.length > 0} />
    <PersonalResearchContext />
    <nav className="compare-nav" aria-label={t("Comparison sections")}>{[["#comparison-builder", "Build my comparison"], ["#decision-overview", "Overview"], ["#decision-details", "Detailed comparison"], ["#comparison-matrix", "Sources & evidence"], ["#decision-labs", "Decision Lab"], ["#decision-actions", "Next steps"]].map(([href, label]) => <a key={href} href={href}><LocalizedText text={label} /></a>)}</nav>
    {raw.length > 3 || requested.some(s => !valid.has(s)) ? <p className="ig-status"><LocalizedText text="Only valid country selections are shown, up to three at a time." /></p> : null}
    <DecisionOverview countries={slugs.map(slug => countries.find(country => country.slug === slug)!)} />
    <section className="ig-section ig-panel"><p className="ig-eyebrow">{t("Your decision lens")} / {t(getComparisonGoalConfig(goal).shortLabel)}</p><h2><LocalizedText text="The best next step is a better question." /></h2><p className="ig-small">{t(getComparisonGoalConfig(goal).description)} {t("This lens guides your research; it does not reweight statistics into a personal fit score. The first release deliberately withholds safety, affordability and immigration rankings without sufficient evidence.")}</p></section>
    {selected.length < 2 ? <p className="ig-status"><LocalizedText text="Choose at least two countries above to build a comparison. A single dossier can still be explored below." /></p> : null}
    <div id="decision-details"><DossierComparison countries={selected.map(c => ({ slug: c.slug, name: countries.find(a => a.slug === c.slug)?.name ?? c.name }))} /></div>
    <Suspense fallback={<ResearchLoading />}><ComparisonEvidence selected={selected} countries={countries} /></Suspense>
    <section id="decision-labs" className="ig-section ig-panel"><p className="ig-eyebrow"><LocalizedText text={"TGPI /"} />{" "}<LocalizedText text="Decision Lab" /></p><h2><LocalizedText text="Turn insight into action." /></h2><p className="ig-small"><LocalizedText text="Build a city budget and a preparation checklist for each destination. Your estimates remain separate from published evidence." /></p><DecisionLabs countries={selected.map(c => ({ slug: c.slug, name: countries.find(country => country.slug === c.slug)?.name ?? c.name }))} /></section>
    <section id="decision-actions" className="ig-section ig-panel"><h2><LocalizedText text="Complete the decision, not just the table." /></h2><p className="ig-small"><LocalizedText text="The missing layers — a city budget, your nationality and legal route, institution or profession, language requirements and timeline — belong in your personal research plan." /></p><div className="ig-actions">{selected.map(c => <Link key={c.slug} className="ig-button" href={`/country-fit?country=${c.slug}`}>{t("Plan for")} {countries.find(a => a.slug === c.slug)?.name ?? c.name} →</Link>)}<Link className="ig-link" href="/intelligence"><LocalizedText text="Methodology & source coverage" /></Link></div><div className="compare-next-grid">{[["/dashboard", "Workspace"], ["/learn", "Learn"], ["/documents", "Documents"], ["/atlas", "Ask Atlas"]].map(([href, label]) => <Link key={href} href={href}><LocalizedText text={label} /><span aria-hidden="true">↗</span></Link>)}</div></section>
  </div></main></ActivationProgressProvider>;
}

async function ComparisonEvidence({ selected, countries }: { selected: typeof identities; countries: Array<{slug:string;name:string}> }) {
  const [state, locale] = await Promise.all([getIntelligence(), getLocale()]);
  const t = (text: string) => translate(locale, text);
  return (
    <><GraphStatus state={state} /><div id="comparison-matrix">{INDICATOR_IDS.map(id => <section className="ig-section" key={id}><h2>{t(INDICATORS[id].label)}</h2><p className="ig-small">{t(comparisonCaveat(selected.map(c => findObservation(state.snapshot, c.slug, id))))}</p><div className="ig-compare-row">{selected.map(c => <div key={c.slug}><h3 className="mb-3 text-xl font-bold"><Link href={`/countries/${c.slug}`}>{t(countries.find(a => a.slug === c.slug)?.name ?? c.name)}</Link></h3><EvidenceCard indicator={id} countryCode={c.iso2} observation={findObservation(state.snapshot, c.slug, id)} /></div>)}</div></section>)}</div></>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
