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
import DossierEvidence, { CostReferences } from "@/components/intelligence/DossierEvidence";
import SourceWatch from "@/components/intelligence/SourceWatch";
import ResearchWorkbench from "@/components/intelligence/ResearchWorkbench";

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
  return <ActivationProgressProvider><main className="ig-shell"><div className="ig-container">
    <Link href="/countries" className="ig-link">← All countries</Link>
    <header className="ig-hero" id="overview"><p className="ig-eyebrow">Country dossier / {identity.iso3} / {identity.region}</p><h1>{country.emoji} {country.name}</h1><p>Understand the context. Inspect the evidence. Decide what you still need to learn.</p><div className="ig-actions"><SavedCountryButton countryName={country.name} countrySlug={slug} /><Link className="ig-button" href={`/compare?country=${slug}`}>Compare an alternative →</Link><Link className="ig-button ig-secondary" href={`/country-fit?country=${slug}`}>Build my research plan</Link></div></header>
    <nav className="ig-actions" aria-label="Country research sections"><a href="#research-dossier" className="ig-link">Decision dossier</a><a href="#decision-signals" className="ig-link">National context</a><a href="#cost-of-living" className="ig-link">Cost references</a><a href="#research-workbench" className="ig-link">My scenario</a><a href="#documents-to-verify" className="ig-link">Research checklist</a></nav>
    <GraphStatus state={state} />
    <section className="ig-section ig-fit"><div className="ig-panel"><p className="ig-eyebrow">Verified identity mapping</p><h2>A stable reference for your research.</h2><p className="ig-small">UNSD name: {identity.name}<br />ISO: {identity.iso2} / {identity.iso3} · M49: {identity.m49}<br />Statistical geography: {identity.subregion || identity.region}</p><p className="ig-meta">Identity source consulted: {identitySource.retrievedAt.slice(0, 10)}. Statistical geography does not express a position on sovereignty or border disputes.</p><a className="ig-link" href={identitySource.url} target="_blank" rel="noreferrer">UN Statistics Division — M49 ↗</a></div><figure className="relative min-h-[250px] overflow-hidden rounded-[22px]"><Image src={`/images/countries/identity/${slug}.webp`} alt={`TGPI editorial illustration inspired by ${country.name}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" priority /><figcaption className="ig-image-label">AI-generated editorial illustration · Not documentary evidence</figcaption></figure></section>
    <section id="decision-signals" className="ig-section"><p className="ig-eyebrow">National context / Source-linked observations</p><h2>Facts with their boundaries.</h2><div className="ig-evidence-grid">{INDICATOR_IDS.map(id => <EvidenceCard key={id} indicator={id} countryCode={identity.iso2} observation={findObservation(state.snapshot, slug, id)} />)}</div></section>
    <DossierEvidence country={slug} />
    <SourceWatch key={slug} country={slug} />
    <section id="strategic-fit" className="ig-section ig-panel"><h2>What these data cannot tell you.</h2><p className="ig-small">Personal safety, salary, housing affordability, immigration eligibility, university quality and your chance of success require separate evidence. TGPI does not substitute macroeconomic indicators for these answers or issue an unsupported “best country” score.</p><Link className="ig-link" href={`/country-fit?country=${slug}`}>Connect this evidence to my questions →</Link></section>
    <div id="cost-of-living"><CostReferences country={slug} /></div>
    <ResearchWorkbench country={slug} countryName={country.name} />
    <details className="ig-section ig-panel"><summary className="ig-check-label">My existing quick monthly estimate</summary><p className="ig-small">Your earlier USD estimate remains separate from the new detailed worksheet. It is not a country baseline and is not automatically added to your scenario.</p><MonthlyCostPlanner key={slug} baseline={0} countryName={country.name} countrySlug={slug} currency="USD" /></details>
    <section id="documents-to-verify" className="ig-section"><div className="ig-panel"><p className="ig-eyebrow">Research checklist / Personal confirmation</p><h2>Go to the responsible authority.</h2><p className="ig-small">Use the dossier’s source links where available and confirm the applicable route with the responsible authority. The summaries do not cover every nationality, programme, profession or family situation. Your existing checklist is preserved below; a checkmark is your research record, not a certified document or legal approval.</p></div><div className="mt-5"><DocumentReviewChecklist countryName={country.name} countrySlug={slug} items={CHECKLIST} /></div></section>
    <section id="next-step" className="ig-section ig-panel"><p className="ig-eyebrow">From information to action</p><h2>Give your shortlist a reason to exist.</h2><p className="ig-small">Compare another country, record the questions that remain open and connect them to your learning and personal plan.</p><div className="ig-actions"><Link href={`/compare?country=${slug}`} className="ig-button">Compare →</Link><Link href={`/country-fit?country=${slug}`} className="ig-button ig-secondary">Country Fit & personal plan</Link><Link href="/intelligence#learning" className="ig-link">Learn to evaluate evidence →</Link></div></section>
  </div></main></ActivationProgressProvider>;
}
