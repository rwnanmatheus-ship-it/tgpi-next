import type { Metadata } from "next";
import Link from "next/link";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CompareCountryPicker from "@/components/compare/CompareCountryPicker";
import { EvidenceCard, GraphStatus } from "@/components/intelligence/Evidence";
import { getAllCountries } from "@/lib/countries";
import { INDICATOR_IDS, INDICATORS, findObservation, comparisonCaveat } from "@/lib/intelligence/core";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { isComparisonGoal, getComparisonGoalConfig } from "@/lib/tgpi-comparison";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const metadata: Metadata = { title: "Compare Countries — Evidence & Trade-offs | TGPI", description: "Compare up to three countries using source-linked observations, visible reference years and explicit gaps. No unsupported country ratings.", alternates: { canonical: "https://www.theglobalpolymath.com/compare" } };
export default async function ComparePage({ searchParams }: { searchParams?: Promise<{ country?: string | string[]; goal?: string }> }) {
  const params = await searchParams;
  const raw = params?.country ? (Array.isArray(params.country) ? params.country : [params.country]) : [];
  const requested = Array.from(new Set(raw)).slice(0, 3);
  const valid = new Set(identities.map(c => c.slug));
  const slugs = requested.length ? requested.filter(s => valid.has(s)) : ["portugal", "canada", "japan"];
  const selected = slugs.map(slug => identities.find(c => c.slug === slug)!);
  const goal = isComparisonGoal(params?.goal) ? params.goal : "overall";
  const state = await getIntelligence();
  const countries = getAllCountries().map(({ slug, name, emoji, region }) => ({ slug, name, emoji, region })).sort((a, b) => a.name.localeCompare(b.name));
  return <ActivationProgressProvider><main className="ig-shell"><div className="ig-container">
    <header className="ig-hero"><p className="ig-eyebrow">TGPI / Compare</p><h1>Compare evidence.<br />Not promises.</h1><p>Put up to three countries side by side. See the source, reference year and limitations behind each observation, then investigate what matters to your own life.</p></header>
    <GraphStatus state={state} />
    <CompareCountryPicker countries={countries} initialSlugs={slugs} initialGoal={goal} hasExplicitSelection={requested.length > 0} />
    {raw.length > 3 || requested.some(s => !valid.has(s)) ? <p className="ig-status">Only valid country selections are shown, up to three at a time.</p> : null}
    <section className="ig-section ig-panel"><p className="ig-eyebrow">Your decision lens / {getComparisonGoalConfig(goal).shortLabel}</p><h2>The best next step is a better question.</h2><p className="ig-small">{getComparisonGoalConfig(goal).description} This lens guides your research; it does not reweight statistics into a personal fit score. The first release deliberately withholds safety, affordability and immigration rankings without sufficient evidence.</p></section>
    {selected.length < 2 ? <p className="ig-status">Choose at least two countries above to build a comparison. A single dossier can still be explored below.</p> : null}
    <div id="comparison-matrix">{INDICATOR_IDS.map(id => <section className="ig-section" key={id}><h2>{INDICATORS[id].label}</h2><p className="ig-small">{comparisonCaveat(selected.map(c => findObservation(state.snapshot, c.slug, id)))}</p><div className="ig-compare-row">{selected.map(c => <div key={c.slug}><h3 className="mb-3 text-xl font-bold"><Link href={`/countries/${c.slug}`}>{countries.find(a => a.slug === c.slug)?.name ?? c.name}</Link></h3><EvidenceCard indicator={id} countryCode={c.iso2} observation={findObservation(state.snapshot, c.slug, id)} /></div>)}</div></section>)}</div>
    <section className="ig-section ig-panel"><h2>Complete the decision, not just the table.</h2><p className="ig-small">The missing layers — a city budget, your nationality and legal route, institution or profession, language requirements and timeline — belong in your personal research plan.</p><div className="ig-actions">{selected.map(c => <Link key={c.slug} className="ig-button" href={`/country-fit?country=${c.slug}`}>Plan for {countries.find(a => a.slug === c.slug)?.name ?? c.name} →</Link>)}<Link className="ig-link" href="/intelligence">Methodology & source coverage</Link></div></section>
  </div></main></ActivationProgressProvider>;
}
