"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import CountryDirectoryCard, { type DirectoryCountry } from "@/components/countries/CountryDirectoryCard";
import styles from "@/components/countries/CountryDirectory.module.css";
import CountrySearchInput from "@/components/countries/CountrySearchInput";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { comparisonPath } from "@/lib/comparison-state";
import { getCountryMapRegionId, type CountryMapRegionId } from "@/lib/country-map";
import { countrySearchTerms, localizedCountryName, localizedCountryScore } from "@/lib/country-search";
import { explorerFiltersFromSearch, explorerFiltersToSearch, normalizeExplorerFilters, type ExplorerFilterInput } from "@/lib/explorer-filters";
import ResearchReportCard from "./ResearchReportCard";
import { useResearchProfile } from "./useResearchProfile";

const SatelliteAtlas = dynamic(() => import("@/components/countries/SatelliteAtlas"), {
  ssr: false,
  loading: () => <p className="ig-status"><LocalizedText text="Preparing satellite explorer…" /></p>,
});
const CountryAtlas = dynamic(() => import("@/components/countries/CountriesWorldMap"), {
  ssr: false,
  loading: () => <p className="ig-status"><LocalizedText text="Loading the interactive atlas…" /></p>,
});

const PAGE_SIZE = 24;
const FILTERS_CHANGED = "tgpi:explorer-location";

function subscribeLocation(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener(FILTERS_CHANGED, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(FILTERS_CHANGED, listener);
  };
}

const locationSearch = () => window.location.search;

export default function EvidenceExplorer({ countries, initialFilters, indicatorTotal }: {
  countries: DirectoryCountry[];
  initialFilters: ExplorerFilterInput;
  indicatorTotal: number;
}) {
  const { t, locale } = useLocale();
  // Read the URL when Next restores a cached subtree. The server snapshot keeps hydration deterministic.
  const initialSearch = explorerFiltersToSearch(initialFilters);
  const search = useSyncExternalStore(subscribeLocation, locationSearch, () => initialSearch);
  const { query, region, selection, limit } = useMemo(
    () => normalizeExplorerFilters(explorerFiltersFromSearch(search), countries),
    [search, countries],
  );
  const { user, journey } = useResearchProfile();
  const { progress } = useActivationProgress();
  const [onlySaved, setOnlySaved] = useState(false);
  const [view, setView] = useState<"gallery" | "list">("gallery");
  const [coverage, setCoverage] = useState<"all" | "dossiers">("all");
  const [showAtlas, setShowAtlas] = useState(false);
  const [atlasLayer, setAtlasLayer] = useState<"satellite" | "countries">("satellite");
  const [mapZoom, setMapZoom] = useState<{ region: string; id: CountryMapRegionId }>();
  const [atlasFocus, setAtlasFocus] = useState<{ slug: string; query: string; region: string }>();
  const terms = useMemo(() => new Map(countries.map(country => [country.slug, countrySearchTerms(country)])), [countries]);
  const bySlug = useMemo(() => new Map(countries.map(country => [country.slug, country])), [countries]);
  const regions = useMemo(() => [...new Set(countries.map(country => country.region))], [countries]);
  const sortedRegions = regions.toSorted((a, b) => t(a).localeCompare(t(b), locale));
  const shortlist = new Set([...journey.targetCountries, ...progress.savedCountries]);
  const candidates = countries.filter(country => (
    (region === "all" || country.region === region)
    && (!onlySaved || shortlist.has(country.slug))
    && (coverage === "all" || country.dossierCount > 0)
  ));
  const filtered = candidates
    .map(country => ({ country, score: localizedCountryScore(country, query, locale, terms.get(country.slug) ?? []) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || localizedCountryName(a.country, locale).localeCompare(localizedCountryName(b.country, locale), locale))
    .map(({ country }) => country);

  const atlasRegion = mapZoom?.region === region ? mapZoom.id : getCountryMapRegionId(region);
  const atlasCountry = atlasFocus?.query === query && atlasFocus.region === region
    ? atlasFocus.slug
    : !query && region === "all" && !onlySaved && coverage === "all" ? "portugal" : filtered[0]?.slug ?? "portugal";
  const reportCountry = bySlug.get(selection[0] ?? (showAtlas ? atlasCountry : filtered[0]?.slug) ?? "");
  const selectedSlugs = new Set(selection);
  const hasFilters = Boolean(query || region !== "all" || onlySaved || coverage !== "all");

  function updateUrl(next: { query?: string; region?: string; selection?: string[]; limit?: number }) {
    const url = new URL(window.location.href);
    const values = { query, region, selection, limit, ...next };
    for (const name of ["q", "region", "selected", "limit"]) url.searchParams.delete(name);
    if (values.query) url.searchParams.set("q", values.query.slice(0, 120));
    if (values.region !== "all") url.searchParams.set("region", values.region);
    values.selection.forEach(slug => url.searchParams.append("selected", slug));
    if (values.limit > PAGE_SIZE) url.searchParams.set("limit", String(values.limit));
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(FILTERS_CHANGED));
  }

  function toggleSelection(slug: string) {
    updateUrl({ selection: selectedSlugs.has(slug) ? selection.filter(value => value !== slug) : [...selection, slug] });
  }

  function clearFilters() {
    setOnlySaved(false);
    setCoverage("all");
    setMapZoom(undefined);
    setAtlasFocus(undefined);
    updateUrl({ query: "", region: "all", limit: PAGE_SIZE });
  }

  function setAtlasCountry(slug: string) {
    setAtlasFocus({ slug, query, region });
  }

  return (
    <section id="country-explorer" className={styles.explorer} aria-labelledby="countries-heading">
      <div className={styles.toolbar}>
        <div className={styles.toolbarHeading}>
          <h2 id="countries-heading">{t("Find your next destination.")}</h2>
          <button type="button" className={styles.atlasButton} aria-expanded={showAtlas} aria-controls="country-atlas-panel" onClick={() => setShowAtlas(!showAtlas)}>
            <NavigationIcon name="globe" width={18} height={18} />
            {showAtlas ? t("Close atlas") : t("Open interactive atlas")}
          </button>
        </div>
        <div className={`country-search-bar ${styles.searchBar}`}>
          <CountrySearchInput key={locale} countries={candidates} query={query} onChange={value => updateUrl({ query: value, limit: PAGE_SIZE })} />
          <label>
            {t("Statistical region")}
            <select value={region} onChange={event => {
              setMapZoom(undefined);
              updateUrl({ region: event.target.value, limit: PAGE_SIZE });
            }}>
              <option value="all">{t("All regions")}</option>
              {sortedRegions.map(value => <option key={value} value={value}>{t(value)}</option>)}
            </select>
          </label>
          <label>
            {t("Research coverage")}
            <select value={coverage} onChange={event => {
              setCoverage(event.target.value === "dossiers" ? "dossiers" : "all");
              updateUrl({ limit: PAGE_SIZE });
            }}>
              <option value="all">{t("All destinations")}</option>
              <option value="dossiers">{t("Research summaries")}</option>
            </select>
          </label>
        </div>
      </div>

      <div id="country-atlas-panel" hidden={!showAtlas} className={styles.atlasPanel}>
        {showAtlas && <>
          <div className="atlas-layer-tabs" role="group" aria-label={t("Atlas layers")}>
            <button type="button" aria-pressed={atlasLayer === "satellite"} onClick={() => setAtlasLayer("satellite")}>{t("Satellite observations")}</button>
            <button type="button" aria-pressed={atlasLayer === "countries"} onClick={() => setAtlasLayer("countries")}>{t("Country boundaries")}</button>
          </div>
          {atlasLayer === "satellite" ? (
            <SatelliteAtlas countries={countries} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} />
          ) : (
            <CountryAtlas
              countries={countries.map(country => ({
                ...country,
                visual: { alt: `TGPI illustration of ${country.name}`, hasImage: true, url: `/images/countries/identity/${country.slug}.webp` },
              }))}
              activeRegionId={atlasRegion}
              selectedSlug={atlasCountry}
              onCountryPreview={setAtlasCountry}
              onRegionChange={id => {
                const nextRegion = id === "world" ? "all" : id.endsWith("america") ? "Americas" : id.charAt(0).toUpperCase() + id.slice(1);
                setMapZoom({ region: nextRegion, id });
                updateUrl({ region: nextRegion, limit: PAGE_SIZE });
              }}
            />
          )}
        </>}
      </div>

      <div className={styles.resultsBar}>
        <p aria-live="polite">
          <strong>{t(filtered.length === 1 ? "{count} destination" : "{count} destinations", { count: filtered.length })}</strong>
          <span aria-hidden="true"> · </span>{query.trim() ? t("Best search matches") : "A–Z"}
        </p>
        <div className={styles.resultsTools}>
          {user && <button type="button" className={styles.filterAction} aria-pressed={onlySaved} onClick={() => {
            setOnlySaved(!onlySaved);
            updateUrl({ limit: PAGE_SIZE });
          }}>{t("My profile shortlist")}</button>}
          {hasFilters && <button type="button" className={styles.filterAction} onClick={clearFilters}>{t("Reset filters")}</button>}
          <div className={styles.viewToggle} role="group" aria-label={t("Display mode")}>
            <button type="button" aria-pressed={view === "gallery"} onClick={() => setView("gallery")} title={t("Gallery")} aria-label={t("Gallery")}><NavigationIcon name="apps" width={18} height={18} /></button>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")} title={t("Compact list")} aria-label={t("Compact list")}><NavigationIcon name="menu" width={18} height={18} /></button>
          </div>
        </div>
      </div>

      {selection.length > 0 && (
        <div className={styles.selection}>
          <span>{selection.slice(0, 4).map(slug => {
            const country = bySlug.get(slug);
            return country ? localizedCountryName(country, locale) : slug;
          }).join(" · ")}{selection.length > 4 ? ` +${selection.length - 4}` : ""}</span>
          <div>
            <Link className={styles.selectionLink} href={comparisonPath(selection, "overall")}>{t("Compare")} {selection.length} <NavigationIcon name="arrow" width={16} height={16} /></Link>
            <button type="button" className={styles.filterAction} onClick={() => updateUrl({ selection: [] })}>{t("Clear")}</button>
          </div>
        </div>
      )}

      {reportCountry && (query || selection.length > 0 || showAtlas) && (
        <details className={styles.brief}>
          <summary>{t("Decision brief: {country}", { country: localizedCountryName(reportCountry, locale) })}</summary>
          <ResearchReportCard key={reportCountry.slug} country={reportCountry.slug} name={reportCountry.name} />
        </details>
      )}

      <div className={styles.results} data-view={view}>
        {filtered.slice(0, limit).map(country => (
          <CountryDirectoryCard
            key={country.slug}
            country={country}
            indicatorTotal={indicatorTotal}
            selected={selectedSlugs.has(country.slug)}
            compact={view === "list"}
            onCompare={toggleSelection}
          />
        ))}
      </div>

      {filtered.length === 0 && <div className={styles.empty}><NavigationIcon name="search" /><p>{t("No countries found.")}</p></div>}
      {filtered.length > limit && (
        <div className={styles.pagination}>
          <button type="button" className="ig-button ig-secondary" onClick={() => updateUrl({ limit: Math.min(limit + PAGE_SIZE, countries.length) })}>{t("Show more countries")}</button>
        </div>
      )}
    </section>
  );
}
