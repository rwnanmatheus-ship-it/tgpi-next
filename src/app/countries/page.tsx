import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CountryDirectoryCover from "@/components/countries/CountryDirectoryCover";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CountryAlphabeticalIndex from "@/components/countries/CountryAlphabeticalIndex";
import styles from "@/components/countries/CountryDirectory.module.css";
import { GraphStatus } from "@/components/intelligence/Evidence";
import EvidenceExplorer from "@/components/intelligence/EvidenceExplorer";
import ResearchLoading from "@/components/intelligence/ResearchLoading";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { getCountryPhotos } from "@/lib/countries/editorial-photography";
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

const coverSlugs = ["australia", "japan", "portugal", "south-africa", "brazil", "canada"];
const coverScenes = coverSlugs.flatMap(slug => {
  const identity = identities.find(country => country.slug === slug);
  const photo = getCountryPhotos(slug)[0];
  return identity && photo ? [{ ...identity, photo }] : [];
});

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

  const countries = identities.map(({ slug, name, region, subregion, iso2, iso3 }) => {
    const profile = aliases.get(slug);
    const photos = getCountryPhotos(slug);
    return {
      slug, name: profile?.name ?? name, emoji: profile?.emoji ?? "", region, subregion, iso2, iso3,
      capital: profile?.capital ?? "", language: profile?.language ?? "",
      photo: photos[0], places: [...new Set(photos.map(photo => photo.location))],
      dossierCount: dossierFor(slug).claims.length, observations: indicators.get(slug)?.size ?? 0,
    };
  });

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
        <CountryDirectoryCover count={identities.length} covers={coverScenes} />
        <Suspense fallback={<ResearchLoading />}><CountryResearch filters={filters} /></Suspense>
        <CountryAlphabeticalIndex />
        <section className={styles.methodology}>
          <div>
            <p className="ig-eyebrow"><LocalizedText text="Responsible intelligence" /></p>
            <h2><LocalizedText text="Research coverage" /></h2>
            <p className="ig-small"><LocalizedText text="Every country has a UNSD identity reference. Statistical coverage varies by indicator, country and year. A source-linked statistic does not verify a visa route, living budget or personal fit. Unsupported legacy country ratings have been removed from this research experience." /></p>
          </div>
          <Link href="/intelligence" className="ig-link"><LocalizedText text="Read our methodology and limitations →" /></Link>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata() {
  const cover = coverScenes[0];
  return localizeMetadata({
    ...sourceMetadata,
    ...(cover && { openGraph: { images: [{ url: cover.photo.src, alt: cover.photo.alt }] } }),
  });
}
