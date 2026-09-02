import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import DocumentReviewChecklist from "@/components/activation/DocumentReviewChecklist";
import MonthlyCostPlanner from "@/components/activation/MonthlyCostPlanner";
import SavedCountryButton from "@/components/activation/SavedCountryButton";
import { EvidenceCard, GraphStatus } from "@/components/intelligence/Evidence";
import { getCountry } from "@/lib/countries";
import { findObservation, INDICATOR_IDS } from "@/lib/intelligence/core";
import { getIntelligence, identities, identitySource } from "@/lib/intelligence/server";
import { GOVERNMENT_PORTALS, PORTAL_REVIEW_DATE } from "@/lib/intelligence/sources";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return { title: `${country.name}: Evidence, Comparison & Research Plan | TGPI`, description: `Explore ${country.name} through source-linked national statistics, reference years, explicit limitations and a practical personal research plan.`, alternates: { canonical: `https://www.theglobalpolymath.com/countries/${slug}` } };
}
const CHECKLIST = [
  { title: "Evidence v1 — nationality and route", text: "Use the destination government's or consulate's official service to establish the correct route for your nationality, purpose and duration." },
  { title: "Evidence v1 — institution or profession", text: "Confirm accreditation, admission or professional licensing with the responsible institution or regulator. Do not infer eligibility from country statistics." },
  { title: "Evidence v1 — current requirements", text: "Record the official source URL, its effective date and the date you reviewed it. Confirm required documents and fees directly before applying." },
  { title: "Evidence v1 — independent confirmation", text: "Resolve ambiguous or conflicting requirements with the competent authority or a qualified professional. A checked box records your research, not legal approval." },
];
export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountry(slug);
  const identity = identities.find(c => c.slug === slug);
  if (!country || !identity) notFound();
  const state = await getIntelligence();
  const portal = GOVERNMENT_PORTALS[slug];
  return <ActivationProgressProvider><main className="ig-shell"><div className="ig-container">
    <Link href="/countries" className="ig-link">← All countries</Link>
    <header className="ig-hero" id="overview"><p className="ig-eyebrow">Country dossier / {identity.iso3} / {identity.region}</p><h1>{country.emoji} {country.name}</h1><p>Understand the context. Inspect the evidence. Decide what you still need to learn.</p><div className="ig-actions"><SavedCountryButton countryName={country.name} countrySlug={slug} /><Link className="ig-button" href={`/compare?country=${slug}`}>Compare an alternative →</Link><Link className="ig-button ig-secondary" href={`/country-fit?country=${slug}`}>Build my research plan</Link></div></header>
    <nav className="ig-actions" aria-label="Country research sections"><a href="#decision-signals" className="ig-link">Evidence</a><a href="#cost-of-living" className="ig-link">Budget</a><a href="#documents-to-verify" className="ig-link">Official requirements</a><a href="#next-step" className="ig-link">Next step</a></nav>
    <GraphStatus state={state} />
    <section className="ig-section ig-fit"><div className="ig-panel"><p className="ig-eyebrow">Verified identity mapping</p><h2>A stable reference for your research.</h2><p className="ig-small">UNSD name: {identity.name}<br />ISO: {identity.iso2} / {identity.iso3} · M49: {identity.m49}<br />Statistical geography: {identity.subregion || identity.region}</p><p className="ig-meta">Identity source consulted: {identitySource.retrievedAt.slice(0, 10)}. Statistical geography does not express a position on sovereignty or border disputes.</p><a className="ig-link" href={identitySource.url} target="_blank" rel="noreferrer">UN Statistics Division — M49 ↗</a></div><figure className="relative min-h-[250px] overflow-hidden rounded-[22px]"><Image src={`/images/countries/identity/${slug}.webp`} alt={`TGPI editorial illustration inspired by ${country.name}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" priority /><figcaption className="ig-image-label">AI-generated editorial illustration · Not documentary evidence</figcaption></figure></section>
    <section id="decision-signals" className="ig-section"><p className="ig-eyebrow">National context / Source-linked observations</p><h2>Facts with their boundaries.</h2><div className="ig-evidence-grid">{INDICATOR_IDS.map(id => <EvidenceCard key={id} indicator={id} countryCode={identity.iso2} observation={findObservation(state.snapshot, slug, id)} />)}</div></section>
    <section id="strategic-fit" className="ig-section ig-panel"><h2>What these data cannot tell you.</h2><p className="ig-small">Personal safety, salary, housing affordability, immigration eligibility, university quality and your chance of success require separate evidence. TGPI does not substitute macroeconomic indicators for these answers or issue an unsupported “best country” score.</p><Link className="ig-link" href={`/country-fit?country=${slug}`}>Connect this evidence to my questions →</Link></section>
    <section id="cost-of-living" className="ig-section ig-panel"><p className="ig-eyebrow">Your assumptions / Not a national estimate</p><h2>Build a budget for the life you intend.</h2><p className="ig-small">No verified city-level cost dataset is connected yet. Start from your own dated quotes for rent, food, insurance, transport and education. The amount below is your input, not a TGPI recommendation. USD is a planning unit, not the local currency.</p><MonthlyCostPlanner key={slug} baseline={0} countryName={country.name} countrySlug={slug} currency="USD" /></section>
    <section id="documents-to-verify" className="ig-section"><div className="ig-panel"><p className="ig-eyebrow">Official requirements / Human verification</p><h2>Go to the responsible authority.</h2>{portal ? <><a className="ig-link" href={portal.url} target="_blank" rel="noreferrer">{portal.title} ↗</a><p className="ig-small">{portal.scope}</p><p className="ig-meta">Portal registry reviewed {PORTAL_REVIEW_DATE}. No legal requirements have been extracted or certified by TGPI. Recheck the current official page.</p></> : <p className="ig-small">A country-specific government portal has not yet been reviewed in this registry. Locate the destination&apos;s embassy, immigration authority and education regulator directly. The absence of a reviewed link is shown explicitly; TGPI will not substitute an unverified website.</p>}</div><div className="mt-5"><DocumentReviewChecklist countryName={country.name} countrySlug={slug} items={CHECKLIST} /></div></section>
    <section id="next-step" className="ig-section ig-panel"><p className="ig-eyebrow">From information to action</p><h2>Give your shortlist a reason to exist.</h2><p className="ig-small">Compare another country, record the questions that remain open and connect them to your learning and personal plan.</p><div className="ig-actions"><Link href={`/compare?country=${slug}`} className="ig-button">Compare →</Link><Link href={`/country-fit?country=${slug}`} className="ig-button ig-secondary">Country Fit & personal plan</Link><Link href="/intelligence#learning" className="ig-link">Learn to evaluate evidence →</Link></div></section>
  </div></main></ActivationProgressProvider>;
}
