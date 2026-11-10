import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LocalizedText as Copy } from "@/components/localization/LocaleProvider";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import EvidenceLesson from "@/components/intelligence/EvidenceLesson";
import EvidenceAtlasLink from "@/components/intelligence/provenance/EvidenceAtlasLink";
import EvidenceCoverage from "@/components/intelligence/provenance/EvidenceCoverage";
import ProvenanceExplorer from "@/components/intelligence/provenance/ProvenanceExplorer";
import styles from "@/components/intelligence/provenance/provenance.module.css";
import { identities, identitySource } from "@/lib/intelligence/server";
import { INDICATOR_IDS } from "@/lib/intelligence/core";
import { CONTEXT_INDICATOR_IDS } from "@/lib/intelligence/country-context";
import { DOSSIER_CLAIMS, DOSSIER_COUNTRIES, DOSSIER_SOURCES, DOSSIER_VERSION } from "@/lib/intelligence/dossiers";
import { buildSourceRecords } from "@/lib/intelligence/provenance";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
const title = "Intelligence Graph — Sources & Methodology | TGPI";
const description = "Trace the sources, dates and limits behind TGPI’s global intelligence.";
const heroImage = "/images/intelligence/evidence-observatory-v1.webp";
const sourceMetadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.theglobalpolymath.com/intelligence" },
  openGraph: { title, description, images: [{ url: heroImage }] },
};

const sections = [
  ["source-register", "Source registry"],
  ["methodology", "Methodology"],
  ["coverage", "Data coverage"],
  ["applications", "Apply the evidence"],
] as const;
const workflow = [
  { title: "Identify the publisher", detail: "Register the exact page, the responsible publisher and the scope of the evidence." },
  { title: "Validate the collection", detail: "Check identifiers, year, numeric ranges, pagination and coverage before accepting a statistical series." },
  { title: "Separate the dates", detail: "Publish the reference period, collection date and editorial review separately. Retained data keeps its original dates." },
  { title: "Expose gaps and changes", detail: "Label missing observations, older values and pending reviews. A changed page opens a question for review." },
];
const destinations = [
  { href: "/countries", title: "Countries", detail: "Inspect the source, unit and reference year behind a destination’s indicators." },
  { href: "/compare", title: "Compare countries", detail: "Compare equal units and check whether the reference years differ." },
  { href: "/country-fit#research-workbench", title: "Country Fit", detail: "Turn questions about study, mobility and costs into research tasks." },
  { href: "/plan", title: "My Plan", detail: "Use dated quotes and personal assumptions in your own scenario." },
  { href: "/passport", title: "Documents", detail: "Prepare your documents and confirm the requirements with the competent authority." },
  { href: "/intelligence/research", title: "Decision dossiers", detail: "Read the published research, with the scope and limits of each summary." },
];

function Registry({ source, country }: { source?: string | string[]; country?: string | string[] }) {
  const records = buildSourceRecords(identities, new Date());
  const selected = typeof source === "string" ? records.find(record => record.id === source) : undefined;
  const initialCountry = selected?.country ?? (typeof country === "string" && DOSSIER_COUNTRIES.includes(country) ? country : "");
  return <ProvenanceExplorer key={selected?.id ?? initialCountry} records={records} initialCountry={initialCountry} initialSource={selected?.id} />;
}

export default async function IntelligencePage({ searchParams }: { searchParams: Promise<{ source?: string | string[]; country?: string | string[] }> }) {
  const params = await searchParams;
  const reviewed = DOSSIER_SOURCES.filter(source => source.reviewedAt).length;
  const pending = DOSSIER_SOURCES.filter(source => source.reviewIssue).length;
  const stats = [
    { value: identities.length, label: "Mapped country identities" },
    { value: INDICATOR_IDS.length + CONTEXT_INDICATOR_IDS.length, label: "Statistical indicators" },
    { value: DOSSIER_COUNTRIES.length, label: "Destinations with dossiers" },
    { value: DOSSIER_SOURCES.length, label: "Dossier source records" },
  ];

  return (
    <main className={styles.shell}>
      <header className={styles.hero} aria-labelledby="intelligence-title">
        <div className={styles.heroScene} aria-hidden="true">
          <Image src={heroImage} alt="" fill sizes="(max-width: 767px) 100vw, 72vw" quality={88} fetchPriority="high" />
        </div>
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span aria-hidden="true" /><Copy text="TGPI Intelligence Graph" /></p>
            <p className={styles.heroLabel}><Copy text="Sources & methodology" /></p>
            <h1 id="intelligence-title"><Copy text="Global intelligence," /><br /><em><Copy text="source by source." /></em></h1>
            <p className={styles.heroDescription}><Copy text={description} /> <Copy text="Open the original source before you make your next decision." /></p>
            <div className={styles.heroActions}>
              <a className={styles.goldButton} href="#source-register"><Copy text="Explore the sources" /><span aria-hidden="true">↓</span></a>
              <a className={styles.darkButton} href="#methodology"><Copy text="See how we verify" /><span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>
        <ul className={`${styles.wrap} ${styles.heroMetrics}`}>
          {stats.map(({ value, label }) => <li key={label}><strong>{value}</strong><span><Copy text={label} /></span></li>)}
        </ul>
      </header>

      <LocalizedElement as="nav" aria-label="Sources and methodology sections" className={styles.sectionNav}>
        <div className={styles.wrap}>
          {sections.map(([id, label], index) => <a href={`#${id}`} key={id}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><Copy text={label} /></a>)}
        </div>
      </LocalizedElement>

      <section className={`${styles.wrap} ${styles.section}`} id="source-register" aria-labelledby="register-title">
        <div className={styles.headingWithSeal}>
          <Image className={styles.seal} src="/images/intelligence/source-seal-v1.webp" alt="" width={88} height={88} />
          <div>
            <p className={styles.kicker}><span aria-hidden="true" /><Copy text="01 / Public evidence registry" /></p>
            <h2 id="register-title"><Copy text="Go to the original source." /></h2>
            <p><Copy text="See who published each reference, what TGPI reviewed and which questions remain open. Flags identify the destination covered." /></p>
          </div>
        </div>
        <div className={styles.primarySources}>
          <article>
            <p className={styles.kicker}><span aria-hidden="true" /><Copy text="01 / Statistical identity" /></p>
            <h3><Copy text="UN Statistics Division — M49" /></h3>
            <p><Copy text="TGPI uses UNSD M49 and ISO identifiers to match its country catalog to statistical records." /></p>
            <time className={styles.meta} dateTime={identitySource.retrievedAt}><Copy text="Catalog reference collected {date}" dates={{ date: identitySource.retrievedAt }} /></time>
            <a className={styles.inlineLink} href={identitySource.url} target="_blank" rel="noreferrer"><Copy text="Inspect country identity" /> <span aria-hidden="true">↗</span></a>
          </article>
          <article>
            <p className={styles.kicker}><span aria-hidden="true" /><Copy text="02 / National indicators" /></p>
            <h3><Copy text="World Development Indicators" /></h3>
            <p><Copy text="World Bank data brings together series from national and international producers. Each indicator links to its definitions and metadata." /></p>
            <a className={styles.inlineLink} href="https://datatopics.worldbank.org/world-development-indicators/sources-and-methods.html" target="_blank" rel="noreferrer"><Copy text="Open World Bank methodology" /> <span aria-hidden="true">↗</span></a>
          </article>
          <article>
            <p className={styles.kicker}><span aria-hidden="true" /><Copy text="03 / Editorial research" /></p>
            <h3><Copy text="Decision dossiers" /></h3>
            <p><Copy text="{count} summaries link to government, agency and university publications. Each summary has its own scope and review interval." values={{ count: DOSSIER_CLAIMS.length }} /></p>
            <p className={styles.meta}><Copy text="{reviewed} sources with a review date · {pending} open review issues" values={{ reviewed, pending }} /></p>
            <Link className={styles.inlineLink} href="/intelligence/research"><Copy text="Inspect dossier coverage →" /></Link>
          </article>
        </div>
        <Registry source={params.source} country={params.country} />
      </section>

      <section className={styles.method} id="methodology" aria-labelledby="method-title">
        <div className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.headingWithSeal}>
            <Image className={styles.seal} src="/images/intelligence/method-seal-v1.webp" alt="" width={88} height={88} />
            <div>
              <p className={styles.kicker}><span aria-hidden="true" /><Copy text="02 / TGPI methodology" /></p>
              <h2 id="method-title"><Copy text="How a source becomes evidence." /></h2>
              <p><Copy text="TGPI checks different things at different stages. The label on each record tells you which check was completed." /></p>
            </div>
          </div>
          <ol className={styles.workflow}>
            {workflow.map((step, index) => <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3><Copy text={step.title} /></h3><p><Copy text={step.detail} /></p></li>)}
          </ol>
          <div className={styles.methodNotes}>
            <article><h3><Copy text="Statistical freshness" /></h3><p><Copy text="The shared cache revalidates after six hours on request. An observation can pass the freshness checks when collected within seven days and its reference year is within the series limit. A failed refresh keeps the last accepted collection." /></p><p><Copy text="Enrollment uses a window starting in 2010. Electricity access and population density use a rolling window from six years before the query year through that year." /></p></article>
            <article><h3><Copy text="Editorial review" /> <small>v{DOSSIER_VERSION}</small></h3><p><Copy text="TGPI normally schedules a new review after 30 days for requirements and 90 days for other summaries. Shorter intervals and reference periods take priority. Confirm applicability and current rules directly with the authority." /></p></article>
            <article><h3><Copy text="Automated source signals" /></h3><p><Copy text="Source Watch checks registered public pages and selected markers. Access restrictions and redirects are surfaced for review. A content fingerprint can reveal a text change. Editorial dates and open issues change only after a separate review." /></p></article>
          </div>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section}`} id="coverage" aria-labelledby="coverage-title">
        <div className={styles.heading}>
          <p className={styles.kicker}><span aria-hidden="true" /><Copy text="03 / Coverage and freshness" /></p>
          <h2 id="coverage-title"><Copy text="See what the data covers." /></h2>
          <p><Copy text="Expand an indicator to see its producer, collection dates and how many destinations have current, older or missing observations." /></p>
        </div>
        <Suspense fallback={<p className={styles.empty} role="status"><Copy text="Loading statistical coverage…" /></p>}><EvidenceCoverage /></Suspense>
      </section>

      <section className={`${styles.wrap} ${styles.section} ${styles.applications}`} id="applications" aria-labelledby="applications-title">
        <div className={styles.heading}>
          <p className={styles.kicker}><span aria-hidden="true" /><Copy text="04 / Connected to your decision" /></p>
          <h2 id="applications-title"><Copy text="Put evidence to work." /></h2>
        </div>
        <ul className={styles.platformGrid}>
          {destinations.map(({ href, title, detail }) => <li key={href}><Link href={href} prefetch={false}><strong><Copy text={title} /><span aria-hidden="true">↗</span></strong><p><Copy text={detail} /></p></Link></li>)}
        </ul>
        <aside className={styles.atlas}>
          <Image className={styles.atlasAvatar} src="/brand/atlas/avatar.webp" alt="" width={74} height={74} />
          <div><p className={styles.kicker}><span aria-hidden="true" /><Copy text="TGPI Atlas AI" /></p><h3><Copy text="Ask better research questions." /></h3><p><Copy text="Atlas can help you interpret indicators and prepare questions for the original publisher. Check current rules directly with the responsible institution." /></p></div>
          <EvidenceAtlasLink />
        </aside>
        <EvidenceLesson />
      </section>

      <section className={`${styles.wrap} ${styles.section} ${styles.disclosures}`} aria-labelledby="disclosures-title">
        <div className={styles.heading}><h2 id="disclosures-title"><Copy text="Limits, attribution and corrections" /></h2></div>
        <details><summary><Copy text="What TGPI evidence can establish" /></summary><p><Copy text="National observations describe countries at a point in time. Dossiers cover selected study questions. Confirm personal eligibility, admission, accreditation, costs and work rights with the responsible authority or institution." /></p><p><Copy text="TGPI operates independently and cites each institution for the information it publishes." /></p></details>
        <details><summary><Copy text="Visual provenance and reuse" /></summary><p><Copy text="The observatory and TGPI medallions are AI-generated illustrations. Atlas geometry is sourced separately from Natural Earth. Country flags identify the scope of the record." /></p><p><Copy text="Review the reuse terms and third-party rights on each source. World Bank indicator licensing guidance applies to the corresponding statistical material." /></p><div className={styles.inlineActions}><a href="https://www.naturalearthdata.com/about/terms-of-use/" className={styles.inlineLink} target="_blank" rel="noreferrer"><Copy text="Natural Earth" /> <span aria-hidden="true">↗</span></a><a href="https://datacatalog.worldbank.org/public-licenses" className={styles.inlineLink} target="_blank" rel="noreferrer"><Copy text="World Bank data licensing guidance ↗" /></a></div></details>
        <div className={styles.correction}><p><strong><Copy text="Report a source issue" /></strong><br /><Copy text="Send the source link, indicator or destination, and the date you checked. Share only public evidence." /></p><a href="mailto:contact@theglobalpolymath.com?subject=TGPI%20source%20review" className={styles.inlineLink}><Copy text="Contact TGPI" /> <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
