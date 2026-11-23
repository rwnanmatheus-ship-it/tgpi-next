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
import { countrySearchTerms, localizedCountryName, rankCountryMatches } from "@/lib/country-search";
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
type ExplorerState = ReturnType<typeof normalizeExplorerFilters>;

const modes = [
  { value: "catalog", label: "Explore", icon: "compass" },
  { value: "atlas", label: "Interactive atlas", icon: "globe" },
  { value: "saved", label: "Saved", icon: "file" },
] as const;
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
  const { query, region, selection, limit, coverage, sort, view, mode } = useMemo(
    () => normalizeExplorerFilters(explorerFiltersFromSearch(search), countries),
    [search, countries],
  );
  const { user, isLoaded, journey } = useResearchProfile();
  const { progress, isLoading, error } = useActivationProgress();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [atlasLayer, setAtlasLayer] = useState<"satellite" | "countries">("countries");
  const [mapZoom, setMapZoom] = useState<{ region: string; id: CountryMapRegionId }>();
  const [atlasFocus, setAtlasFocus] = useState<{ slug: string; query: string; region: string; coverage: string }>();
  const showAtlas = mode === "atlas";
  const onlySaved = mode === "saved";
  const isFilteredAtlas = showAtlas && (query || region !== "all" || coverage !== "all");
  const terms = useMemo(() => new Map(countries.map(country => [country.slug, countrySearchTerms(country)])), [countries]);
  const bySlug = useMemo(() => new Map(countries.map(country => [country.slug, country])), [countries]);
  const sortedRegions = useMemo(() => [...new Set(countries.map(country => country.region))]
    .sort((a, b) => t(a).localeCompare(t(b), locale)), [countries, t, locale]);
  const mapCountries = useMemo(() => countries.map(country => ({
    ...country,
    visual: { alt: "", hasImage: true, url: `/images/countries/identity/${country.slug}.webp` },
  })), [countries]);
  const savedCountries = progress.savedCountries;
  const targetCountries = journey.targetCountries;
  const candidates = useMemo(() => {
    const shortlist = new Set(user ? [...targetCountries, ...savedCountries] : []);
    return countries.filter(country => (region === "all" || country.region === region)
      && (!onlySaved || shortlist.has(country.slug))
      && (coverage === "all" || country.dossierCount > 0));
  }, [countries, region, onlySaved, coverage, user, targetCountries, savedCountries]);
  const filtered = useMemo(() => rankCountryMatches(candidates, query, locale, terms,
    sort === "coverage" ? (a, b) => b.observations - a.observations || b.dossierCount - a.dossierCount : undefined,
    sort === "alphabetical"), [candidates, query, locale, terms, sort]);
  const atlasRegion = mapZoom?.region === region ? mapZoom.id : getCountryMapRegionId(region);
  const atlasCountry = atlasFocus?.query === query && atlasFocus.region === region && atlasFocus.coverage === coverage
    ? atlasFocus.slug
    : isFilteredAtlas
      ? filtered[0]?.slug ?? ""
      : "portugal";
  const reportCountry = bySlug.get(selection[0] ?? (showAtlas ? atlasCountry : filtered[0]?.slug) ?? "");
  const selectedSlugs = new Set(selection);
  const hasFilters = Boolean(query || region !== "all" || coverage !== "all" || sort !== "relevance");
  const savedLoading = onlySaved && (!isLoaded || isLoading);
  const savedGuest = onlySaved && isLoaded && !user;

  function updateUrl(next: Partial<ExplorerState>, push = false) {
    const url = new URL(window.location.href);
    const current = normalizeExplorerFilters(explorerFiltersFromSearch(url.search), countries);
    const values = { ...current, ...next };
    const params = explorerFiltersToSearch({
      q: values.query.slice(0, 120) || undefined,
      region: values.region === "all" ? undefined : values.region,
      selected: values.selection,
      limit: values.limit > PAGE_SIZE ? String(values.limit) : undefined,
      mode: values.mode === "catalog" ? undefined : values.mode,
      coverage: values.coverage === "all" ? undefined : values.coverage,
      sort: values.sort === "relevance" ? undefined : values.sort,
      view: values.view === "gallery" ? undefined : values.view,
    });
    for (const name of Object.keys(explorerFiltersFromSearch(url.search))) url.searchParams.delete(name);
    for (const [name, value] of new URLSearchParams(params)) url.searchParams.append(name, value);
    if (url.href === window.location.href) return;
    const href = `${url.pathname}${url.search}${url.hash}`;
    if (push) window.history.pushState(null, "", href);
    else window.history.replaceState(null, "", href);
    window.dispatchEvent(new Event(FILTERS_CHANGED));
  }

  function toggleSelection(slug: string) {
    updateUrl({ selection: selectedSlugs.has(slug) ? selection.filter(value => value !== slug) : [...selection, slug] });
  }

  function clearFilters() {
    setMapZoom(undefined);
    setAtlasFocus(undefined);
    updateUrl({ query: "", region: "all", coverage: "all", sort: "relevance", limit: PAGE_SIZE });
  }

  function setAtlasCountry(slug: string) {
    const params = new URLSearchParams(locationSearch());
    setAtlasFocus({ slug, query: params.get("q") ?? "", region: params.get("region") ?? "all", coverage: params.get("coverage") ?? "all" });
  }

  return (
    <section id="country-explorer" className={styles.explorer} aria-labelledby="countries-heading">
      <div className={styles.toolbar}>
        <div className={styles.toolbarHeading}>
          <h2 id="countries-heading">{t("Find your next destination.")}</h2>
        </div>
        <div className={styles.modes} role="group" aria-label={t("Display mode")}>
          {modes.map(({ value, label, icon }) => (
            <button key={value} type="button" aria-pressed={mode === value} onClick={() => {
              setMapZoom(undefined);
              setAtlasFocus(undefined);
              updateUrl({ mode: value, limit: PAGE_SIZE }, true);
            }}>
              <NavigationIcon name={icon} width={17} height={17} />
              <span>{t(label)}</span>
            </button>
          ))}
        </div>
        {!savedGuest && <div className={`country-search-bar ${styles.searchBar}`}>
          <CountrySearchInput key={locale} countries={candidates} terms={terms} query={query} onChange={value => updateUrl({ query: value, limit: PAGE_SIZE })} />
          <button className={styles.filtersToggle} type="button" aria-expanded={filtersOpen} aria-controls="country-directory-filters"
            onClick={() => setFiltersOpen(!filtersOpen)}>
            <NavigationIcon name="settings" width={17} height={17} />{t("Filters")}
          </button>
          <div id="country-directory-filters" className={styles.filterFields} data-open={filtersOpen}>
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
              <select value={coverage} onChange={event => updateUrl({ coverage: event.target.value === "dossiers" ? "dossiers" : "all", limit: PAGE_SIZE })}>
                <option value="all">{t("All destinations")}</option>
                <option value="dossiers">{t("Research summaries")}</option>
              </select>
            </label>
            <label>
              {t("Sort by")}
              <select value={sort} onChange={event => {
                const value = event.target.value;
                updateUrl({ sort: value === "coverage" || value === "alphabetical" ? value : "relevance", limit: PAGE_SIZE });
              }}>
                <option value="relevance">{t("Best search matches")}</option>
                <option value="alphabetical">{t("Alphabetical")}</option>
                <option value="coverage">{t("Data coverage")}</option>
              </select>
            </label>
          </div>
        </div>}
        {!savedGuest && hasFilters && <div className={styles.appliedFilters}>
          {query && <button type="button" onClick={() => updateUrl({ query: "", limit: PAGE_SIZE })} aria-label={`${t("Remove")} · ${query}`}>{query}<NavigationIcon name="close" width={13} height={13} /></button>}
          {region !== "all" && <button type="button" onClick={() => {
            setMapZoom(undefined);
            updateUrl({ region: "all", limit: PAGE_SIZE });
          }} aria-label={`${t("Remove")} · ${t(region)}`}>{t(region)}<NavigationIcon name="close" width={13} height={13} /></button>}
          {coverage !== "all" && <button type="button" onClick={() => updateUrl({ coverage: "all", limit: PAGE_SIZE })} aria-label={`${t("Remove")} · ${t("Research summaries")}`}>{t("Research summaries")}<NavigationIcon name="close" width={13} height={13} /></button>}
          {sort !== "relevance" && <button type="button" onClick={() => updateUrl({ sort: "relevance", limit: PAGE_SIZE })} aria-label={`${t("Remove")} · ${t("Sort by")}`}>{t(sort === "coverage" ? "Data coverage" : "Alphabetical")}<NavigationIcon name="close" width={13} height={13} /></button>}
          <button type="button" className={styles.reset} onClick={clearFilters}>{t("Reset filters")}</button>
        </div>}
      </div>

      {!savedGuest && !showAtlas && <div className={styles.discoveryBar}>
        <span className={styles.discoveryLabel}><NavigationIcon name="compass" width={16} height={16} />{t("Explore by region")}</span>
        <div className={styles.regionChips} role="group" aria-label={t("Statistical region")}>
          {["all", ...sortedRegions].map(value => <button key={value} type="button" aria-pressed={region === value}
            onClick={() => { setMapZoom(undefined); setAtlasFocus(undefined); updateUrl({ region: value, limit: PAGE_SIZE }); }}>
            {value === "all" ? t("World") : t(value)}
            <span>{value === "all" ? countries.length : countries.filter(country => country.region === value).length}</span>
          </button>)}
        </div>
      </div>}

      <div id="country-atlas-panel" hidden={!showAtlas} className={styles.atlasPanel}>
        {showAtlas && <>
          <div className="atlas-layer-tabs" role="group" aria-label={t("Atlas layers")}>
            <button type="button" aria-pressed={atlasLayer === "countries"} onClick={() => setAtlasLayer("countries")}>{t("Country boundaries")}</button>
            <button type="button" aria-pressed={atlasLayer === "satellite"} onClick={() => setAtlasLayer("satellite")}>{t("Satellite observations")}</button>
          </div>
          {atlasLayer === "satellite" ? (
            <SatelliteAtlas countries={countries} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} />
          ) : (
            <CountryAtlas
              countries={mapCountries}
              activeRegionId={atlasRegion}
              selectedSlug={atlasCountry}
              onCountryPreview={setAtlasCountry}
              onRegionChange={id => {
                const nextRegion = id === "world" ? "all" : id.endsWith("america") ? "Americas" : id.charAt(0).toUpperCase() + id.slice(1);
                setMapZoom({ region: nextRegion, id });
                setAtlasFocus(current => ({
                  slug: current?.query === query && current.region === region && current.coverage === coverage ? current.slug : atlasCountry,
                  query, region: nextRegion, coverage,
                }));
                updateUrl({ region: nextRegion, limit: PAGE_SIZE });
              }}
            />
          )}
        </>}
      </div>

      {!savedGuest && !savedLoading && <div className={styles.resultsBar}>
        <p aria-live="polite">
          <strong>{t(filtered.length === 1 ? "{count} destination" : "{count} destinations", { count: filtered.length })}</strong>
          <span aria-hidden="true"> · </span>{sort === "coverage" ? t("Data coverage") : sort === "relevance" && query.trim() ? t("Best search matches") : "A–Z"}
        </p>
        <div className={styles.viewToggle} role="group" aria-label={t("Display mode")}>
          <button type="button" aria-pressed={view === "gallery"} onClick={() => updateUrl({ view: "gallery" })} title={t("Gallery")} aria-label={t("Gallery")}><NavigationIcon name="apps" width={18} height={18} /></button>
          <button type="button" aria-pressed={view === "list"} onClick={() => updateUrl({ view: "list" })} title={t("Compact list")} aria-label={t("Compact list")}><NavigationIcon name="menu" width={18} height={18} /></button>
        </div>
      </div>}

      {selection.length > 0 && (
        <div className={styles.selection}>
          <span>{selection.slice(0, 4).map(slug => {
            const country = bySlug.get(slug);
            return country ? localizedCountryName(country, locale) : slug;
          }).join(" · ")}{selection.length > 4 ? ` +${selection.length - 4}` : ""}</span>
          <div>
            {selection.length >= 2
              ? <Link className={styles.selectionLink} href={comparisonPath(selection, "overall")}>{t("Compare")} {selection.length} <NavigationIcon name="arrow" width={16} height={16} /></Link>
              : <span className={styles.selectionHint}>{t("Select at least two countries to compare.")}</span>}
            <button type="button" className={styles.filterAction} onClick={() => updateUrl({ selection: [] })}>{t("Clear")}</button>
          </div>
        </div>
      )}

      {!savedGuest && !savedLoading && reportCountry && (query || selection.length > 0 || showAtlas) && (
        <details className={styles.brief}>
          <summary>{t("Decision brief: {country}", { country: localizedCountryName(reportCountry, locale) })}</summary>
          <ResearchReportCard key={reportCountry.slug} country={reportCountry.slug} name={reportCountry.name} />
        </details>
      )}

      {!savedGuest && !savedLoading && <div className={styles.results} data-view={view}>
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
      </div>}

      {savedLoading && <p className={styles.empty} role="status">{t("Loading the latest TGPI experience…")}</p>}
      {savedGuest && <div className={styles.empty}>
        <p>{t("Sign in to see your saved destinations.")}</p>
        <Link className={styles.selectionLink} href="/sign-in?redirect_url=%2Fcountries%3Fmode%3Dsaved">{t("Sign in")}</Link>
      </div>}
      {onlySaved && error && !savedLoading && <p className={styles.empty} role="status">{t(error)}</p>}
      {!savedGuest && !savedLoading && filtered.length === 0 && !(onlySaved && error) && <div className={styles.empty}>
        <NavigationIcon name={onlySaved && !hasFilters ? "file" : "search"} />
        <p>{t(onlySaved && !hasFilters ? "No saved destinations yet." : "No countries found.")}</p>
        {hasFilters && <button type="button" className={styles.filterAction} onClick={clearFilters}>{t("Reset filters")}</button>}
      </div>}
      {!savedGuest && !savedLoading && filtered.length > limit && (
        <div className={styles.pagination}>
          <button type="button" className="ig-button ig-secondary" onClick={() => updateUrl({ limit: Math.min(limit + PAGE_SIZE, countries.length) })}>{t("Show more countries")}</button>
        </div>
      )}
    </section>
  );
}
