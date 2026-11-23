import { withSocialMetadata } from '@/lib/localization/social-metadata';
import GlobalDossierView from "@/components/intelligence/global/GlobalDossierView";
import { globalDossier } from "@/lib/intelligence/global-dossier.server";
import CountryFlag from "@/components/ui/CountryFlag";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import type { Metadata } from "next";
import Image from "@/components/localization/LocalizedImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import DocumentReviewChecklist from "@/components/activation/DocumentReviewChecklist";
import MonthlyCostPlanner from "@/components/activation/MonthlyCostPlanner";
import SavedCountryButton from "@/components/activation/SavedCountryButton";
import { EvidenceCard, GraphStatus } from "@/components/intelligence/Evidence";
import { getCountry } from "@/lib/countries";
import { documentsHref } from "@/lib/documents-os";
import { findObservation, INDICATOR_IDS } from "@/lib/intelligence/core";
import { getIntelligence, identities, identitySource } from "@/lib/intelligence/server";
import DossierEvidence, { CostReferences } from "@/components/intelligence/DossierEvidence";
import SourceWatch from "@/components/intelligence/SourceWatch";
import CountryResearchBrief from "@/components/intelligence/CountryResearchBrief";
import CountrySatellitePanel from "@/components/countries/CountrySatellitePanel";
import CountryContextPanel from "@/components/countries/CountryContextPanel";
import { getCountryContext } from "@/lib/intelligence/country-context.server";
import CountrySourcePassport from "@/components/countries/CountrySourcePassport";
import CountryDecisionGuide from "@/components/countries/CountryDecisionGuide";
import CountryLearningPath from "@/components/countries/CountryLearningPath";
import styles from "@/components/countries/CountryDetail.module.css";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { coursesOverview } from "@/data/courses-overview";
import { createCountryLearningPath } from "@/lib/country-learning";
import ResearchWorkbench from "@/components/intelligence/ResearchWorkbench";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";


export const dynamic = "force-dynamic";
export const maxDuration = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  const locale = await getLocale();
  const name = translate(locale, country.name);
  return withSocialMetadata({
    title: translate(locale, "{country}: Evidence, Comparison & Research Plan | TGPI", { country: name }),
    description: translate(locale, "Explore {country} through source-linked national statistics, reference years, explicit limitations and a practical personal research plan.", { country: name }),
    alternates: { canonical: `https://www.theglobalpolymath.com/countries/${slug}` },
  }, locale);
}
export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountry(slug);
  const identity = identities.find(c => c.slug === slug);
  if (!country || !identity) notFound();
  const expandedDossier = globalDossier(slug);
  const learningPath = createCountryLearningPath(country.language, coursesOverview);
  const [state, context] = await Promise.all([getIntelligence(), getCountryContext()]);
  return <ActivationProgressProvider><main className={`ig-shell country-studio ${styles.page}`}><div className="ig-container">
    <Link href="/countries" className="ig-link"><LocalizedText text={"← All countries"} /></Link>
    <header className="country-dossier-hero" id="overview"><Image src={`/images/countries/identity/${slug}.webp`} alt="" fill sizes="(max-width: 768px) 100vw, 1280px" className="object-cover" quality={88} priority /><div className="country-dossier-intro"><p className="ig-eyebrow"><NavigationIcon name="globe" width={15} height={15} /><LocalizedText text={"Country intelligence /"} />{" "}{identity.iso3} / <LocalizedText text={identity.region} /></p><div className="country-dossier-identity"><CountryFlag iso2={identity.iso2} width={60} /><h1><LocalizedText text={country.name} /></h1></div><p><LocalizedText text="One destination. Connected knowledge. A clearer next move." /></p><div className="ig-actions"><SavedCountryButton countryName={country.name} countrySlug={slug} /><Link className="ig-button" href={`/compare?country=${slug}`}><NavigationIcon name="compare" width={16} height={16} /><LocalizedText text="Compare destination" /></Link><a className="ig-button ig-secondary" href="#country-learning"><NavigationIcon name="book" width={16} height={16} /><LocalizedText text="Languages & mobility" /></a></div></div><aside className={styles.heroPanel}><span className={styles.panelKicker}><span translate="no">TGPI</span> / <LocalizedText text="Destination workspace" /></span><strong>{identity.iso3}<span>{identity.iso2}</span></strong><div><NavigationIcon name="book" width={16} height={16} /><span><LocalizedText text="Learning connected to your destination" /></span></div><div><NavigationIcon name="shield" width={16} height={16} /><span><LocalizedText text="Evidence, sources and preparation" /></span></div></aside></header>
    <LocalizedElement as="nav" className="country-section-nav" aria-label="Country research sections"><a href="#country-learning"><NavigationIcon name="book" width={15} height={15} /><LocalizedText text="Languages & mobility" /></a><a href="#research-workbench"><NavigationIcon name="target" width={15} height={15} /><LocalizedText text="Decision Lab" /></a><a href="#research-dossier"><LocalizedText text="Routes & education" /></a><a href="#decision-signals"><LocalizedText text="National context" /></a><a href="#country-sources"><LocalizedText text="Sources & methodology" /></a><a href="#decision-guide"><LocalizedText text="Preparation" /></a></LocalizedElement>
    <div className={styles.quickLinks}>
      <a href="#research-workbench"><NavigationIcon name="target" width={19} height={19} /><span><strong><LocalizedText text="Build my scenario" /></strong><small><LocalizedText text="Budget, priorities and evidence" /></small></span></a>
      <Link href={documentsHref({ country: slug })}><NavigationIcon name="file" width={19} height={19} /><span><strong><LocalizedText text="Prepare my documents" /></strong><small><LocalizedText text="A checklist for this destination" /></small></span></Link>
      <Link href={`/country-fit?country=${slug}`}><NavigationIcon name="compass" width={19} height={19} /><span><strong><LocalizedText text="Connect to my plan" /></strong><small><LocalizedText text="Your goals, with context" /></small></span></Link>
    </div>
    <CountryLearningPath key={slug} countryName={country.name} path={learningPath} />
    <CountryResearchBrief country={slug} name={country.name} />
    <details id="decision-signals" className={styles.dataPanel}><summary><NavigationIcon name="graph" width={20} height={20} /><span><strong><LocalizedText text="National context" /></strong><small><LocalizedText text="Inspect the statistics, reference years and data gaps." /></small></span><span className={styles.panelExpand} aria-hidden="true">+</span></summary><div className={styles.panelBody}><p className="ig-eyebrow"><LocalizedText text={"National context / Source-linked observations"} /></p><h2><LocalizedText text={"Facts with their boundaries."} /></h2><div className="ig-evidence-grid">{INDICATOR_IDS.map(id => <EvidenceCard key={id} indicator={id} countryCode={identity.iso2} observation={findObservation(state.snapshot, slug, id)} />)}</div></div></details>
    <CountrySourcePassport country={slug} iso2={identity.iso2} observations={state.snapshot.observations.filter(o => o.country === slug)} revision={state.snapshot.revision} retrievedAt={state.snapshot.retrievedAt} retained={state.status !== "available" || context.status !== "available"} contextObservations={context.snapshot.observations.filter(o => o.country === slug)} />
    <CountryDecisionGuide country={slug} />
    <ResearchWorkbench country={slug} countryName={country.name} />
    {expandedDossier ? <details className={styles.dataPanel}><summary><NavigationIcon name="globe" width={20} height={20} /><span><strong><LocalizedText text="Global research dossier" /></strong><small><LocalizedText text="Open the extended destination research." /></small></span><span className={styles.panelExpand} aria-hidden="true">+</span></summary><div className={styles.panelBody}><GlobalDossierView dossier={expandedDossier} /></div></details> : null}
    <DossierEvidence country={slug} />
    <div id="cost-of-living"><CostReferences country={slug} /></div>
    <details className={styles.dataPanel}><summary><NavigationIcon name="graph" width={20} height={20} /><span><strong><LocalizedText text="Health, infrastructure & economy" /></strong><small><LocalizedText text="Explore the context behind national averages." /></small></span><span className={styles.panelExpand} aria-hidden="true">+</span></summary><div className={styles.panelBody}><CountryContextPanel observations={context.snapshot.observations.filter(o => o.country === slug)} iso2={identity.iso2} /></div></details>
    <details className={styles.dataPanel}><summary><NavigationIcon name="globe" width={20} height={20} /><span><strong><LocalizedText text="Satellite" /></strong><small><LocalizedText text="Inspect the destination from above." /></small></span><span className={styles.panelExpand} aria-hidden="true">+</span></summary><div className={styles.panelBody}><CountrySatellitePanel country={slug} name={country.name} /></div></details>
    <details className="country-provenance"><summary><LocalizedText text={"Country identity, methodology & data status"} /></summary><GraphStatus state={state} /><p className="ig-small"><LocalizedText text={identity.name} /> · {identity.iso2} / {identity.iso3} · M49 {identity.m49} · <LocalizedText text={identity.subregion || identity.region} /></p><p className="ig-meta"><LocalizedText text={"Identity reference consulted"} />{" "}{identitySource.retrievedAt.slice(0, 10)}<LocalizedText text={". Statistical geography does not express a position on sovereignty or border disputes."} /></p><a className="ig-link" href={identitySource.url} target="_blank" rel="noreferrer"><LocalizedText text={"UN Statistics Division — M49 ↗"} /></a></details>

    <SourceWatch key={slug} country={slug} />
    <section id="strategic-fit" className="ig-section ig-panel"><h2><LocalizedText text={"What these data cannot tell you."} /></h2><p className="ig-small"><LocalizedText text={"Personal safety, salary, housing affordability, immigration eligibility, university quality and your chance of success require separate evidence. TGPI does not substitute macroeconomic indicators for these answers or issue an unsupported “best country” score."} /></p><Link className="ig-link" href={`/country-fit?country=${slug}`}><LocalizedText text={"Connect this evidence to my questions →"} /></Link></section>
    <details className="ig-section ig-panel"><summary className="ig-check-label"><LocalizedText text={"My existing quick monthly estimate"} /></summary><p className="ig-small"><LocalizedText text={"Your earlier USD estimate remains separate from the new detailed worksheet. It is not a country baseline and is not automatically added to your scenario."} /></p><MonthlyCostPlanner key={slug} baseline={0} countryName={country.name} countrySlug={slug} currency="USD" /></details>
    <section id="documents-to-verify" className="ig-section"><div className="ig-panel"><p className="ig-eyebrow"><LocalizedText text={"Research checklist / Personal confirmation"} /></p><h2><LocalizedText text={"Go to the responsible authority."} /></h2><p className="ig-small"><LocalizedText text={"Use the dossier’s source links where available and confirm the applicable route with the responsible authority. The summaries do not cover every nationality, programme, profession or family situation. Your existing checklist is preserved below; a checkmark is your research record, not a certified document or legal approval."} /></p><Link className="ig-link" href={`${documentsHref({ country: slug })}#preparation-paths`}><LocalizedText text="Open TGPI Global Documents" /> ↗</Link></div><div className="mt-5"><DocumentReviewChecklist countryName={country.name} countrySlug={slug} /></div></section>
    <section className="ig-section ig-panel"><p className="ig-eyebrow"><LocalizedText text={"Global Community / Shared experience"} /></p><h2><LocalizedText text={"Learn from people, alongside the evidence."} /></h2><p className="ig-small"><LocalizedText text={"Communities discussing this destination:"} />{" "}<LocalizedText text={country.name} /><LocalizedText text={". Member experiences are personal contributions, not official country guidance."} /></p><Link className="ig-link" href={`/community?destination=${encodeURIComponent(country.slug)}`}><LocalizedText text={"Explore communities:"} />{" "}<LocalizedText text={country.name} /> →</Link></section>
    <section id="next-step" className="ig-section ig-panel"><p className="ig-eyebrow"><LocalizedText text={"From information to action"} /></p><h2><LocalizedText text={"Give your shortlist a reason to exist."} /></h2><p className="ig-small"><LocalizedText text={"Compare another country, record the questions that remain open and connect them to your learning and personal plan."} /></p><div className="ig-actions"><Link href={`/compare?country=${slug}`} className="ig-button"><LocalizedText text={"Compare →"} /></Link><Link href={`/country-fit?country=${slug}`} className="ig-button ig-secondary"><LocalizedText text={"Country Fit & personal plan"} /></Link><Link href="/intelligence#learning" className="ig-link"><LocalizedText text={"Learn to evaluate evidence →"} /></Link></div></section>
  </div></main></ActivationProgressProvider>;
}
