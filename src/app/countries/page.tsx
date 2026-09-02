import type { Metadata } from "next";
import Link from "next/link";
import { getAllCountries } from "@/lib/countries";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { GraphStatus } from "@/components/intelligence/Evidence";
import EvidenceExplorer from "@/components/intelligence/EvidenceExplorer";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const metadata: Metadata = { title: "Countries — Source-linked research | TGPI", description: "Explore 195 country identities, available official statistics, source dates and the questions that matter to your international plan.", alternates: { canonical: "https://www.theglobalpolymath.com/countries" } };
export default async function CountriesPage() {
  const state = await getIntelligence();
  const aliases = new Map(getAllCountries().map(c => [c.slug, c]));
  const countries = identities.map(c => ({ slug: c.slug, name: aliases.get(c.slug)?.name ?? c.name, emoji: aliases.get(c.slug)?.emoji ?? "", region: c.region, iso3: c.iso3, observations: state.snapshot.observations.filter(o => o.country === c.slug).length })).sort((a, b) => a.name.localeCompare(b.name));
  return <main className="ig-shell"><div className="ig-container">
    <header className="ig-hero"><p className="ig-eyebrow">TGPI / Country intelligence</p><h1>The world, with evidence attached.</h1><p>195 country identities. Traceable statistics where available. One connected space to explore your options, understand uncertainty and build a plan you can explain.</p><div className="ig-actions"><a href="#country-explorer" className="ig-button">Explore countries ↓</a><Link href="/country-fit" className="ig-button ig-secondary">Find my Country Fit</Link></div></header>
    <GraphStatus state={state} /><EvidenceExplorer countries={countries} />
    <section className="ig-section ig-panel"><p className="ig-eyebrow">Responsible intelligence</p><h2>Coverage is not completeness.</h2><p className="ig-small">Every country has a UNSD identity reference. Statistical coverage varies by indicator, country and year. A source-linked statistic does not verify a visa route, living budget or personal fit. Unsupported legacy country ratings have been removed from this research experience.</p><Link href="/intelligence" className="ig-link">Read our methodology and limitations →</Link></section>
  </div></main>;
}
