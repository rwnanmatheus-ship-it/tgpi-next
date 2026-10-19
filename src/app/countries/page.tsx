import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AreaHero from "@/components/ui/AreaHero";
import ResearchLoading from "@/components/intelligence/ResearchLoading";
import { getAllCountries } from "@/lib/countries";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { GraphStatus } from "@/components/intelligence/Evidence";
import EvidenceExplorer from "@/components/intelligence/EvidenceExplorer";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const metadata: Metadata = { title: "Countries — Source-linked research | TGPI", description: "Explore 195 country identities, available official statistics, source dates and the questions that matter to your international plan.", alternates: { canonical: "https://www.theglobalpolymath.com/countries" } };
type Filters = { q?: string; region?: string; selected?: string | string[]; limit?: string };

async function CountryResearch({ filters }: { filters: Filters }) {
  const state = await getIntelligence();
  const aliases = new Map(getAllCountries().map(country => [country.slug, country]));
  const observations = new Map<string, number>();
  for (const observation of state.snapshot.observations) observations.set(observation.country, (observations.get(observation.country) ?? 0) + 1);
  const countries = identities.map(country => ({ slug: country.slug, name: aliases.get(country.slug)?.name ?? country.name, emoji: aliases.get(country.slug)?.emoji ?? "", region: country.region, iso3: country.iso3, observations: observations.get(country.slug) ?? 0 })).sort((a, b) => a.name.localeCompare(b.name));
  return <><GraphStatus state={state} /><ActivationProgressProvider><EvidenceExplorer countries={countries} initialFilters={filters} /></ActivationProgressProvider></>;
}

export default async function CountriesPage({ searchParams }: { searchParams?: Promise<Filters> }) {
  const filters = await searchParams ?? {};
  return <main className="ig-shell"><div className="ig-container">
    <AreaHero id="countries-title" eyebrow="TGPI / Explore the world" title={<>A wider world.<br />A clearer perspective.</>} description="Explore 195 country identities, inspect available evidence and build a shortlist around the life you want to prepare for." actions={[{ href: "#country-explorer", label: "Explore countries" }, { href: "/country-fit", label: "Find my Country Fit" }]} />
    <Suspense fallback={<ResearchLoading />}><CountryResearch filters={filters} /></Suspense>
    <section className="ig-section ig-panel"><p className="ig-eyebrow">Responsible intelligence</p><h2>Coverage is not completeness.</h2><p className="ig-small">Every country has a UNSD identity reference. Statistical coverage varies by indicator, country and year. A source-linked statistic does not verify a visa route, living budget or personal fit. Unsupported legacy country ratings have been removed from this research experience.</p><Link href="/intelligence" className="ig-link">Read our methodology and limitations →</Link></section>
  </div></main>;
}
