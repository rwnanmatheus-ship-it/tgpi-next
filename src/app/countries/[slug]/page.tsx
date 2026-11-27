import type { Metadata } from "next";
import Link from "next/link";
import { enemGuidePath } from "@/app/guia-paises/campaign";
import { guideCopy } from "@/app/guia-paises/copy";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import DocumentReviewChecklist from "@/components/activation/DocumentReviewChecklist";
import MonthlyCostPlanner from "@/components/activation/MonthlyCostPlanner";
import CountryContextPanel from "@/components/countries/CountryContextPanel";
import CountryDecisionGuide from "@/components/countries/CountryDecisionGuide";
import CountryLearningPath from "@/components/countries/CountryLearningPath";
import CountryPresentation from "@/components/countries/CountryPresentation";
import CountryProfileIndex from "@/components/countries/CountryProfileIndex";
import CountryProfileMasthead from "@/components/countries/CountryProfileMasthead";
import CountrySatellitePanel from "@/components/countries/CountrySatellitePanel";
import CountrySourcePassport from "@/components/countries/CountrySourcePassport";
import styles from "@/components/countries/CountryDetail.module.css";
import CountryResearchBrief from "@/components/intelligence/CountryResearchBrief";
import DossierEvidence, { CostReferences } from "@/components/intelligence/DossierEvidence";
import { EvidenceCard, GraphStatus } from "@/components/intelligence/Evidence";
import GlobalDossierView from "@/components/intelligence/global/GlobalDossierView";
import ResearchWorkbench from "@/components/intelligence/ResearchWorkbench";
import SourceWatch from "@/components/intelligence/SourceWatch";
import Image from "@/components/localization/LocalizedImage";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { coursesOverview } from "@/data/courses-overview";
import mapLocations from "@/data/country-map-locations.json";
import { getCountry, getCountryImageUrl } from "@/lib/countries";
import { structuredDataJson } from "@/lib/seo/course-directory";
import { getCountryPhotos, type CountryPhoto } from "@/lib/countries/editorial-photography";
import { createCountryLearningPath } from "@/lib/country-learning";
import { documentsHref } from "@/lib/documents-os";
import { findObservation, INDICATOR_IDS } from "@/lib/intelligence/core";
import { getCountryContext } from "@/lib/intelligence/country-context.server";
import { globalDossier } from "@/lib/intelligence/global-dossier.server";
import { getIntelligence, identities, identitySource } from "@/lib/intelligence/server";
import { translate } from "@/lib/localization/messages";
import { getLocale } from "@/lib/localization/server";
import { withSocialMetadata } from "@/lib/localization/social-metadata";
import type { NavigationIconName } from "@/lib/navigation-system";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
type Props = { params: Promise<{ slug: string }> };
const countryDirectoryUrl = "https://www.theglobalpolymath.com/countries";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country || !identities.some(identity => identity.slug === slug)) notFound();
  const locale = await getLocale();
  const name = translate(locale, country.name);
  const scene = getCountryPhotos(slug)[0];
  return withSocialMetadata({
    title: translate(locale, "{country}: Evidence, Comparison & Research Plan | TGPI", { country: name }),
    description: translate(locale, "Explore {country} through source-linked national statistics, reference years, explicit limitations and a practical personal research plan.", { country: name }),
    alternates: { canonical: `${countryDirectoryUrl}/${country.slug}` },
    openGraph: {
      images: [scene ? {
        url: scene.src,
        alt: translate(locale, scene.alt),
      } : {
        url: getCountryImageUrl(country),
        width: 1600,
        height: 900,
        alt: `${translate(locale, "Country profile")} · ${name} | TGPI`,
      }],
    },
  }, locale);
}

type DisclosureProps = { id?: string; title: string; hint?: string; icon: NavigationIconName; children: ReactNode };

function Disclosure({ id, title, hint, icon, children }: DisclosureProps) {
  return <details id={id} className={styles.dataPanel}>
    <summary><NavigationIcon name={icon} width={20} height={20} />
      <span><strong><LocalizedText text={title} /></strong>{hint && <small><LocalizedText text={hint} /></small>}</span>
      <span className={styles.panelExpand} aria-hidden="true">+</span>
    </summary>
    <div className={styles.panelBody}>{children}</div>
  </details>;
}

function ChapterArt({ photo, fallback, children }: { photo?: CountryPhoto; fallback: string; children: ReactNode }) {
  return <div className={styles.chapterArt}>
    <div className={styles.chapterCopy}>{children}</div>
    <figure>
      <Image src={photo?.src ?? fallback} alt={photo?.alt ?? ""} fill quality={88}
        sizes="(max-width: 700px) 100vw, (max-width: 1440px) 43vw, 600px"
        style={{ objectFit: "cover", objectPosition: photo?.position ?? "center" }} />
      {photo && <figcaption><span>{photo.location}</span><a href={photo.creditUrl} target="_blank" rel="noreferrer">{photo.photographer} ↗</a></figcaption>}
    </figure>
  </div>;
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountry(slug);
  const identity = identities.find(entry => entry.slug === slug);
  if (!country || !identity) notFound();
  const photos = getCountryPhotos(slug);
  const referencePoints: Readonly<Record<string, { lat: number; lng: number }>> = mapLocations;
  const expandedDossier = globalDossier(slug);
  const learningPath = createCountryLearningPath(country.language, coursesOverview);
  const [state, context, locale] = await Promise.all([getIntelligence(), getCountryContext(), getLocale()]);
  const countryName = translate(locale, country.name);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: translate(locale, "Countries"), item: countryDirectoryUrl },
      { "@type": "ListItem", position: 2, name: countryName, item: `${countryDirectoryUrl}/${country.slug}` },
    ],
  };
  const observations = state.snapshot.observations.filter(observation => observation.country === slug);
  const contextObservations = context.snapshot.observations.filter(observation => observation.country === slug);

  return <ActivationProgressProvider><main className={`ig-shell country-studio ${styles.page}`}><div key={slug} className="ig-container">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson(breadcrumb) }} />
    <CountryProfileMasthead slug={slug} name={country.name} iso2={identity.iso2} region={identity.region} photos={photos} />
    <div className={styles.factRow}>
      <dl className={styles.facts}>
        <div><dt><LocalizedText text="Capital" /></dt><dd><LocalizedText text={country.capital} /></dd></div>
        <div><dt><LocalizedText text="Language" /></dt><dd><LocalizedText text={country.language} /></dd></div>
        <div><dt><LocalizedText text="Currency" /></dt><dd>{country.currencyCode}</dd></div>
      </dl>
      <div className={styles.factActions}>
        <Link className={styles.primaryAction} href={`/compare?country=${slug}`}><NavigationIcon name="compare" width={16} height={16} /><LocalizedText text="Compare destination" /></Link>
        <CountryPresentation slug={slug} name={country.name} region={identity.region} capital={country.capital} language={country.language}
          photos={photos} currency={country.currencyCode} course={learningPath.courses[0]} />
      </div>
    </div>

    <CountryProfileIndex />
    <div className={styles.quickLinks}>
      <a href="#country-learning"><NavigationIcon name="book" /><span><LocalizedText text="Study the language" /></span><NavigationIcon name="arrow" /></a>
      <a href="#country-budget"><NavigationIcon name="graph" /><span><LocalizedText text="Plan my budget" /></span><NavigationIcon name="arrow" /></a>
      <Link href={documentsHref({ country: slug })}><NavigationIcon name="file" /><span><LocalizedText text="Prepare my documents" /></span><NavigationIcon name="arrow" /></Link>
    </div>
    <CountryLearningPath countryName={country.name} path={learningPath} />
    {(slug === "portugal" || slug === "spain") && (
      <p><Link className="ig-link" href={enemGuidePath} hrefLang="pt-BR">{guideCopy[locale].enemGuide}</Link></p>
    )}

    <section id="country-budget" className={styles.chapter}>
      <ChapterArt photo={photos[1]} fallback="/images/cinematic-2026/budget-planning-1200.webp">
        <p><NavigationIcon name="graph" width={16} height={16} /><LocalizedText text="Costs & funding" /></p>
        <h2><LocalizedText text="How much would a month in {country} cost you?" values={{ country: countryName }} /></h2>
        <div><LocalizedText text="Choose a planning currency and enter local quotes for rent and daily expenses." /></div>
        <a href="#budget-worksheet"><LocalizedText text="Build my scenario" /><NavigationIcon name="arrow" width={16} height={16} /></a>
      </ChapterArt>
      <Disclosure id="budget-worksheet" title="Decision Lab" hint="Budget, priorities and evidence" icon="target">
        <ResearchWorkbench country={slug} countryName={country.name} />
      </Disclosure>
      <div id="cost-of-living"><CostReferences country={slug} /></div>
      <Disclosure title="My existing quick monthly estimate" icon="graph">
        <p className="ig-small"><LocalizedText text="Your earlier USD estimate remains separate from the new detailed worksheet. It is not a country baseline and is not automatically added to your scenario." /></p>
        <MonthlyCostPlanner key={slug} baseline={0} countryName={country.name} countrySlug={slug} currency="USD" />
      </Disclosure>
    </section>

    <section id="country-research" className={styles.chapter}>
      {expandedDossier && <Disclosure title="Global research dossier" hint="Open the extended destination research." icon="globe"><GlobalDossierView dossier={expandedDossier} /></Disclosure>}
      <DossierEvidence country={slug} />
      <CountrySourcePassport country={slug} iso2={identity.iso2} observations={observations} revision={state.snapshot.revision}
        retrievedAt={state.snapshot.retrievedAt} retained={state.status !== "available" || context.status !== "available"} contextObservations={contextObservations} />
      <Disclosure id="decision-signals" title="National context" hint="Inspect the statistics, reference years and data gaps." icon="graph">
        <p className="ig-eyebrow"><LocalizedText text="National context / Source-linked observations" /></p><h2><LocalizedText text="Facts with their boundaries." /></h2>
        <div className="ig-evidence-grid">{INDICATOR_IDS.map(id => <EvidenceCard key={id} indicator={id} countryCode={identity.iso2} observation={findObservation(state.snapshot, slug, id)} />)}</div>
      </Disclosure>
      <Disclosure title="Health, infrastructure & economy" hint="Explore the context behind national averages." icon="graph"><CountryContextPanel observations={contextObservations} iso2={identity.iso2} /></Disclosure>
      <CountrySatellitePanel country={slug} name={country.name} point={referencePoints[slug]} />
      <details className="country-provenance">
        <summary><LocalizedText text="Country identity, methodology & data status" /></summary><GraphStatus state={state} />
        <p className="ig-small"><LocalizedText text={identity.name} /> · {identity.iso2} / {identity.iso3} · M49 {identity.m49} · <LocalizedText text={identity.subregion || identity.region} /></p>
        <p className="ig-meta"><LocalizedText text="Identity reference consulted" /> {identitySource.retrievedAt.slice(0, 10)}<LocalizedText text=". Statistical geography does not express a position on sovereignty or border disputes." /></p>
        <a className="ig-link" href={identitySource.url} target="_blank" rel="noreferrer"><LocalizedText text="UN Statistics Division — M49 ↗" /></a>
      </details>
      <SourceWatch key={slug} country={slug} />
      <section id="strategic-fit" className="ig-section ig-panel"><h2><LocalizedText text="What these data cannot tell you." /></h2>
        <p className="ig-small"><LocalizedText text="Personal safety, salary, housing affordability, immigration eligibility, university quality and your chance of success require separate evidence. TGPI does not substitute macroeconomic indicators for these answers or issue an unsupported “best country” score." /></p>
        <Link className="ig-link" href={`/country-fit?country=${slug}`}><LocalizedText text="Connect this evidence to my questions →" /></Link>
      </section>
    </section>

    <section id="country-preparation" className={styles.chapter}>
      <CountryResearchBrief country={slug} name={country.name} />
      <CountryDecisionGuide country={slug} />
      <section id="documents-to-verify" className="ig-section">
        <div className="ig-panel"><p className="ig-eyebrow"><LocalizedText text="Research checklist / Personal confirmation" /></p>
          <h2><LocalizedText text="Go to the responsible authority." /></h2>
          <p className="ig-small"><LocalizedText text="Use the dossier’s source links where available and confirm the applicable route with the responsible authority. The summaries do not cover every nationality, programme, profession or family situation. Your existing checklist is preserved below; a checkmark is your research record, not a certified document or legal approval." /></p>
          <Link className="ig-link" href={`${documentsHref({ country: slug })}#preparation-paths`}><LocalizedText text="Open TGPI Global Documents" /> ↗</Link>
        </div><div className="mt-5"><DocumentReviewChecklist countryName={country.name} countrySlug={slug} /></div>
      </section>
      <section className="ig-section ig-panel"><p className="ig-eyebrow"><LocalizedText text="Global Community / Shared experience" /></p>
        <h2><LocalizedText text="Learn from people, alongside the evidence." /></h2>
        <p className="ig-small"><LocalizedText text="Communities discussing this destination:" /> <LocalizedText text={country.name} /><LocalizedText text=". Member experiences are personal contributions, not official country guidance." /></p>
        <Link className="ig-link" href={`/community?destination=${encodeURIComponent(slug)}`}><LocalizedText text="Explore communities:" /> <LocalizedText text={country.name} /> →</Link>
      </section>
      <div id="next-step">
        <ChapterArt photo={photos[2]} fallback="/images/cinematic-2026/atlas-intelligence-1200.webp">
          <p><NavigationIcon name="compass" width={16} height={16} /><LocalizedText text="From information to action" /></p>
          <h2><LocalizedText text="Which destination fits your plans?" /></h2>
          <div><LocalizedText text="Compare another country, record the questions that remain open and connect them to your learning and personal plan." /></div>
          <Link href={`/compare?country=${slug}`}><LocalizedText text="Compare {country} with another destination" values={{ country: countryName }} /><NavigationIcon name="arrow" width={16} height={16} /></Link>
        </ChapterArt>
        <div className={styles.finalLinks}><Link href={`/country-fit?country=${slug}`}><LocalizedText text="Country Fit & personal plan" /> →</Link><Link href="/intelligence#learning"><LocalizedText text="Learn to evaluate evidence →" /></Link></div>
      </div>
    </section>
  </div></main></ActivationProgressProvider>;
}
