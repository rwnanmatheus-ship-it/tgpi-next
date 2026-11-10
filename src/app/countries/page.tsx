import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import styles from "@/components/countries/CountryDirectory.module.css";
import { GraphStatus } from "@/components/intelligence/Evidence";
import EvidenceExplorer from "@/components/intelligence/EvidenceExplorer";
import ResearchLoading from "@/components/intelligence/ResearchLoading";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { getAllCountries } from "@/lib/countries";
import type { ExplorerFilterInput } from "@/lib/explorer-filters";
import { INDICATOR_IDS } from "@/lib/intelligence/core";
import { CONTEXT_INDICATOR_IDS } from "@/lib/intelligence/country-context";
import { getCountryContext } from "@/lib/intelligence/country-context.server";
import { dossierFor } from "@/lib/intelligence/dossiers";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { localizeMetadata } from "@/lib/localization/metadata.server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const sourceMetadata: Metadata = {
  title: "Countries — Source-linked research | TGPI",
  description: "Explore 195 country identities, available official statistics, source dates and the questions that matter to your international plan.",
  alternates: { canonical: "https://www.theglobalpolymath.com/countries" },
};

const shortcuts = [
  { href: "/compare", label: "Compare countries", icon: "compare" },
  { href: "/country-fit", label: "Country Fit", icon: "target" },
  { href: "/plan", label: "My Plan", icon: "file" },
  { href: "/intelligence", label: "Sources & methodology", icon: "book" },
] as const;

async function CountryResearch({ filters }: { filters: ExplorerFilterInput }) {
  const [state, context] = await Promise.all([getIntelligence(), getCountryContext()]);
  const aliases = new Map(getAllCountries().map(country => [country.slug, country]));
  const indicators = new Map<string, Set<string>>();

  for (const { country, indicator } of [...state.snapshot.observations, ...context.snapshot.observations]) {
    let available = indicators.get(country);
    if (!available) {
      available = new Set();
      indicators.set(country, available);
    }
    available.add(indicator);
  }

  const countries = identities.map(({ slug, name, region, iso2, iso3 }) => ({
    slug, name: aliases.get(slug)?.name ?? name, emoji: aliases.get(slug)?.emoji ?? "", region, iso2, iso3,
    dossierCount: dossierFor(slug).claims.length,
    observations: indicators.get(slug)?.size ?? 0,
  }));

  return (
    <>
      <ActivationProgressProvider>
        <EvidenceExplorer countries={countries} initialFilters={filters} indicatorTotal={INDICATOR_IDS.length + CONTEXT_INDICATOR_IDS.length} />
      </ActivationProgressProvider>
      <details className="country-provenance">
        <summary><LocalizedText text="Data coverage, sources & collection status" /></summary>
        <GraphStatus state={state} />
      </details>
    </>
  );
}

export default async function CountriesPage({ searchParams }: { searchParams?: Promise<ExplorerFilterInput> }) {
  const filters = await searchParams ?? {};

  return (
    <main className={`ig-shell country-studio ${styles.page}`}>
      <div className="ig-container">
        <header className={styles.hero}>
          <div className={styles.heroArt}>
            <Image
              src="/images/cinematic-2026/countries-orbital-earth-v2.webp"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1399px) 66vw, 924px"
              preload
            />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}><NavigationIcon name="globe" width={16} height={16} /><LocalizedText text="TGPI / Country Intelligence" /></p>
            <h1><LocalizedText text="Countries" /></h1>
            <p className={styles.heroDescription}><LocalizedText text="Explore 195 destinations. Build a shortlist, understand the evidence and shape your own international plan." /></p>
          </div>
          <div className={styles.heroCount}>
            <strong>{identities.length}</strong>
            <span><LocalizedText text="Destinations" /></span>
          </div>
        </header>
        <nav className={styles.shortcuts} aria-label="TGPI">
          {shortcuts.map(({ href, label, icon }) => (
            <Link key={href} href={href}>
              <NavigationIcon name={icon} width={17} height={17} />
              <LocalizedText text={label} />
              <NavigationIcon name="chevron" className={styles.shortcutArrow} width={14} height={14} />
            </Link>
          ))}
        </nav>
        <Suspense fallback={<ResearchLoading />}><CountryResearch filters={filters} /></Suspense>
        <section className={styles.methodology}>
          <div>
            <p className="ig-eyebrow"><LocalizedText text="Responsible intelligence" /></p>
            <h2><LocalizedText text="Coverage is not completeness." /></h2>
            <p className="ig-small"><LocalizedText text="Every country has a UNSD identity reference. Statistical coverage varies by indicator, country and year. A source-linked statistic does not verify a visa route, living budget or personal fit. Unsupported legacy country ratings have been removed from this research experience." /></p>
          </div>
          <Link href="/intelligence" className="ig-link"><LocalizedText text="Read our methodology and limitations →" /></Link>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata() {
  return localizeMetadata(sourceMetadata);
}
