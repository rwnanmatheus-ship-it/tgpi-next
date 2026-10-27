import type { ExplorerFilterInput } from "@/lib/explorer-filters";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { dossierFor } from "@/lib/intelligence/dossiers";
import ResearchLoading from "@/components/intelligence/ResearchLoading";
import { getAllCountries } from "@/lib/countries";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { GraphStatus } from "@/components/intelligence/Evidence";
import EvidenceExplorer from "@/components/intelligence/EvidenceExplorer";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const metadata: Metadata = { title: "Countries — Source-linked research | TGPI", description: "Explore 195 country identities, available official statistics, source dates and the questions that matter to your international plan.", alternates: { canonical: "https://www.theglobalpolymath.com/countries" } };
type Filters = ExplorerFilterInput;

async function CountryResearch({ filters }: { filters: Filters }) {
  const state = await getIntelligence();
  const aliases = new Map(getAllCountries().map(country => [country.slug, country]));
  const observations = new Map<string, number>();
  for (const observation of state.snapshot.observations) observations.set(observation.country, (observations.get(observation.country) ?? 0) + 1);
  const countries = identities.map(country => ({ slug: country.slug, name: aliases.get(country.slug)?.name ?? country.name, emoji: aliases.get(country.slug)?.emoji ?? "", region: country.region, iso2: country.iso2, iso3: country.iso3, dossierCount: dossierFor(country.slug).claims.length, observations: observations.get(country.slug) ?? 0 })).sort((a, b) => a.name.localeCompare(b.name));
  return <><ActivationProgressProvider><EvidenceExplorer countries={countries} initialFilters={filters} /></ActivationProgressProvider><details className="country-provenance"><summary><LocalizedText text="Data coverage, sources & collection status" /></summary><GraphStatus state={state} /></details></>;
}

export default async function CountriesPage({ searchParams }: { searchParams?: Promise<Filters> }) {
  const filters = await searchParams ?? {};
  return <main className="ig-shell country-studio"><div className="ig-container">
    <header className="country-explorer-hero"><div><p className="ig-eyebrow"><LocalizedText text="TGPI / Country Intelligence" /></p><h1><LocalizedText text="Your world." /><br /><em><LocalizedText text="Your next move." /></em></h1><p><LocalizedText text="Explore 195 destinations. Build a shortlist, understand the evidence and shape your own international plan." /></p><div className="ig-actions"><a className="ig-button" href="#country-explorer"><LocalizedText text="Find a destination ↓" /></a><Link className="ig-link" href="/country-fit"><LocalizedText text="My Country Fit →" /></Link></div></div><div className="country-hero-stat"><strong>195</strong><span><LocalizedText text="destinations. One connected journey." /></span></div></header>
    <Suspense fallback={<ResearchLoading />}><CountryResearch filters={filters} /></Suspense>
    <section className="ig-section ig-panel"><p className="ig-eyebrow"><LocalizedText text="Responsible intelligence" /></p><h2><LocalizedText text="Coverage is not completeness." /></h2><p className="ig-small">Every country has a UNSD identity reference. Statistical coverage varies by indicator, country and year. A source-linked statistic does not verify a visa route, living budget or personal fit. Unsupported legacy country ratings have been removed from this research experience.</p><Link href="/intelligence" className="ig-link"><LocalizedText text="Read our methodology and limitations →" /></Link></section>
  </div></main>;
}
