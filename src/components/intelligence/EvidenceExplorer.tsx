"use client";
import CountryFlag from "@/components/ui/CountryFlag";
import { useLocale } from "@/components/localization/LocaleProvider";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import type { CountryMapRegionId } from "@/lib/country-map";
import Image from "next/image";
import Link from "next/link";
import { comparisonPath } from "@/lib/comparison-state";
import { explorerFiltersFromSearch, explorerFiltersToSearch, normalizeExplorerFilters, type ExplorerFilterInput } from "@/lib/explorer-filters";
import SavedCountryButton from "@/components/activation/SavedCountryButton";

import CountrySearchInput from "@/components/countries/CountrySearchInput";
import { localizedCountryName, localizedCountryScore, countrySearchTerms } from "@/lib/country-search";
import { useResearchProfile } from "./useResearchProfile";
import ResearchReportCard from "./ResearchReportCard";
type ExplorerCountry = { slug: string; name: string; emoji: string; region: string; iso2: string; iso3: string; dossierCount: number; observations: number };
const SatelliteAtlas = dynamic(() => import("@/components/countries/SatelliteAtlas"), { ssr: false, loading: () => <p className="ig-status"><LocalizedText text="Preparing satellite explorer…" /></p> });
const CountryAtlas = dynamic(() => import("@/components/countries/CountriesWorldMap"), { ssr: false, loading: () => <p className="ig-status"><LocalizedText text="Loading the interactive atlas…" /></p> });
type ExplorerFilters = ExplorerFilterInput;
const FILTERS_CHANGED = "tgpi:explorer-location";
function subscribeLocation(listener: () => void) {
  window.addEventListener("popstate",listener);
  window.addEventListener(FILTERS_CHANGED,listener);
  return () => { window.removeEventListener("popstate",listener); window.removeEventListener(FILTERS_CHANGED,listener); };
}
const locationSearch = () => window.location.search;
export default function EvidenceExplorer({ countries, initialFilters = {} }: { countries: ExplorerCountry[]; initialFilters?: ExplorerFilters }) {
  const { t, locale } = useLocale();
  // Read the current URL again when Next restores a cached subtree on Back.
  // The server snapshot keeps SSR/hydration deterministic; no duplicate local filter state.
  const initialSearch = explorerFiltersToSearch(initialFilters);
  const search = useSyncExternalStore(subscribeLocation,locationSearch,() => initialSearch);
  const {query,region,selection,limit} = normalizeExplorerFilters(explorerFiltersFromSearch(search),countries);
  const { user, journey } = useResearchProfile();
  const [onlySaved, setOnlySaved] = useState(false);
  const [view, setView] = useState<"gallery" | "list">("gallery");
  const [coverage, setCoverage] = useState<"all" | "dossiers">("all");
  const terms = useMemo(() => new Map(countries.map(c => [c.slug, countrySearchTerms(c)])), [countries]);
  const [showAtlas, setShowAtlas] = useState(false);
  const [atlasLayer, setAtlasLayer] = useState<"satellite" | "countries">("satellite");
  const [atlasRegion, setAtlasRegion] = useState<CountryMapRegionId>("world");
  const [atlasFocus, setAtlasFocus] = useState({ slug: "portugal", query: "", region: "all" });
  function setAtlasCountry(slug: string) { setAtlasFocus({ slug, query, region }); }
  const [notice, setNotice] = useState("");
  function updateUrl(next: {query?:string;region?:string;selection?:string[];limit?:number}) {
    const url = new URL(window.location.href);
    const values = {query,region,selection,limit,...next};
    for (const name of ["q","region","selected","limit"]) url.searchParams.delete(name);
    if (values.query) url.searchParams.set("q",values.query.slice(0,120));
    if (values.region !== "all") url.searchParams.set("region",values.region);
    values.selection.forEach(slug => url.searchParams.append("selected",slug));
    if (values.limit > 24) url.searchParams.set("limit",String(values.limit));
    window.history.replaceState(null,"",`${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(FILTERS_CHANGED));
  }
  function toggleSelection(slug: string) {
    const next = selection.includes(slug) ? selection.filter(value => value !== slug) : [...selection,slug];
    setNotice(""); updateUrl({selection:next});
  }
  const filtered = countries.map(c => ({ country: c, score: localizedCountryScore(c, query, locale, terms.get(c.slug) ?? []) })).filter(({ country: c, score }) => score > 0 && (region === "all" || c.region === region) && (!onlySaved || journey.targetCountries.includes(c.slug)) && (coverage === "all" || c.dossierCount > 0)).sort((a, b) => b.score - a.score || localizedCountryName(a.country, locale).localeCompare(localizedCountryName(b.country, locale), locale)).map(c => c.country);
  // Search, restored URLs and region changes focus the best visible match.
  // An explicit map preview remains selected until those filters change.
  const atlasCountry = atlasFocus.query === query && atlasFocus.region === region
    ? atlasFocus.slug : filtered[0]?.slug ?? atlasFocus.slug;
  const compareHref = comparisonPath(selection, "overall");
  return <section id="country-explorer" className="ig-section">

    <div className="ig-spread"><h2>{t("Find your next destination.")}</h2><p className="ig-meta" aria-live="polite">{t(filtered.length === 1 ? "{count} destination" : "{count} destinations", { count: filtered.length })} · {query ? t("Best search matches") : "A–Z"}</p></div>
    <div className="ig-form-grid country-search-bar"><CountrySearchInput key={locale} countries={countries.filter(c => (region === "all" || c.region === region) && (!onlySaved || journey.targetCountries.includes(c.slug)) && (coverage === "all" || c.dossierCount > 0))} query={query} onChange={value => updateUrl({query:value,limit:24})} /><label><LocalizedText text="Statistical region" /><select value={region} onChange={e => { updateUrl({region:e.target.value,limit:24}); setAtlasRegion(e.target.value === "all" || e.target.value === "Americas" ? "world" : e.target.value.toLowerCase() as CountryMapRegionId); }}><option value="all"><LocalizedText text={t("All regions")} /></option>{Array.from(new Set(countries.map(c => c.region))).sort().map(r => <option key={r} value={r}><LocalizedText text={t(r)} /></option>)}</select></label></div>
    <div className="country-search-tools"><span>{t("Search in English, Português, Español, Français, Deutsch or Italiano.")}</span>{user && <button className="ig-select" type="button" aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}>{t(onlySaved ? "Show all destinations" : "My profile shortlist")}</button>}<button type="button" className="ig-select" onClick={() => { setOnlySaved(false); setCoverage("all"); setAtlasRegion("world"); updateUrl({ query: "", region: "all", limit: 24 }); }}><LocalizedText text="Reset filters" /></button></div>
    <div className="country-explorer-controls"><div role="group" aria-label={t("Research coverage")}><button type="button" aria-pressed={coverage === "all"} onClick={() => setCoverage("all")}>{t("All destinations")}</button><button type="button" aria-pressed={coverage === "dossiers"} onClick={() => setCoverage("dossiers")}>{t("With research summaries")}</button></div><div role="group" aria-label={t("Display mode")}><button type="button" aria-pressed={view === "gallery"} onClick={() => setView("gallery")}>{t("Gallery")}</button><button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>{t("Compact list")}</button></div></div>
    <div className="ig-panel country-atlas-toggle mb-6"><div className="ig-spread"><div><p className="ig-eyebrow"><LocalizedText text="Geospatial intelligence" /></p><h2><LocalizedText text="TGPI World Atlas." /></h2></div><button type="button" className="ig-button ig-secondary" aria-expanded={showAtlas} onClick={() => setShowAtlas(!showAtlas)}>{showAtlas ? t("Close atlas") : t("Open interactive atlas")}</button></div>{showAtlas ? <><div className="atlas-layer-tabs" role="group" aria-label={t("Atlas layers")}><button type="button" aria-pressed={atlasLayer === "satellite"} onClick={() => setAtlasLayer("satellite")}><LocalizedText text="Satellite observations" /></button><button type="button" aria-pressed={atlasLayer === "countries"} onClick={() => setAtlasLayer("countries")}><LocalizedText text="Country boundaries" /></button></div>{atlasLayer === "satellite" ? <SatelliteAtlas countries={countries} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} /> : <CountryAtlas countries={countries.map(c => ({ ...c, visual: { alt: `TGPI illustration of ${c.name}`, hasImage: true, url: `/images/countries/identity/${c.slug}.webp` } }))} activeRegionId={atlasRegion} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} onRegionChange={id => { setAtlasRegion(id); updateUrl({ region: id === "world" ? "all" : id.includes("america") ? "Americas" : id.charAt(0).toUpperCase() + id.slice(1), limit: 24 }); }} />}</> : null}</div>
    {selection.length ? <div className="ig-selection"><span>{selection.slice(0, 4).map(slug => { const c = countries.find(c => c.slug === slug); return c ? localizedCountryName(c, locale) : slug; }).join(" · ")}{selection.length > 4 ? ` +${selection.length - 4}` : ""}</span><div className="ig-actions"><Link className="ig-button" href={compareHref}><LocalizedText text="Compare" />{" "}{selection.length} →</Link><button type="button" className="ig-button ig-secondary" onClick={() => { setNotice(""); updateUrl({selection:[]}); }}><LocalizedText text="Clear" /></button></div></div> : null}
    {(query || selection.length > 0 || showAtlas) && filtered.length > 0 && <ResearchReportCard country={selection[0] || (showAtlas ? atlasCountry : filtered[0].slug)} name={countries.find(c => c.slug === (selection[0] || (showAtlas ? atlasCountry : filtered[0].slug)))?.name || "Country"} />}
    <p className="ig-meta" role="status">{t(notice)}</p>
    <div className={`ig-country-grid country-results-${view}`}>{filtered.slice(0, limit).map(country => <article key={country.slug} className="ig-country-card tgpi-card-3d" data-tgpi-tone="white" data-tgpi-interactive="true">
      <Link href={`/countries/${country.slug}`} className="ig-country-image"><Image src={`/images/countries/identity/${country.slug}.webp`} alt={t("Destination: {country}", { country: localizedCountryName(country, locale) })} fill sizes="(max-width: 599px) 100vw, (max-width: 1099px) 50vw, 420px" quality={88} className="object-cover" /></Link>
      <div className="ig-card-body"><div className="country-card-identity"><CountryFlag iso2={country.iso2} width={56} /><div><p className="ig-eyebrow"><LocalizedText text={country.region} /> · <span translate="no">{country.iso3}</span></p><h3><Link href={`/countries/${country.slug}`}>{localizedCountryName(country, locale)}</Link></h3></div></div><p className="ig-small">{t("{count}/9 national indicators", { count: country.observations })} · {country.dossierCount ? t("{count} research summaries", { count: country.dossierCount }) : t("Core country profile")}</p><div className="ig-actions"><Link className="ig-link" href={`/countries/${country.slug}`}>{t("Explore evidence")} →</Link><button type="button" aria-pressed={selection.includes(country.slug)} className="ig-select" aria-label={`${t("Compare")} ${localizedCountryName(country, locale)}`} onClick={() => toggleSelection(country.slug)}>{selection.includes(country.slug) ? <LocalizedText text={"✓ {value0}"} values={{value0: String(t("Selected"))}} /> : <LocalizedText text={"+ {value0}"} values={{value0: String(t("Compare"))}} />}</button><SavedCountryButton countryName={country.name} countrySlug={country.slug} /></div></div>
    </article>)}</div>
    {!filtered.length ? <p className="ig-panel">{t("No countries found. Try another name or clear the region filter.")}</p> : null}
    {filtered.length > limit ? <button type="button" className="ig-button ig-secondary" onClick={() => { const next = Math.min(limit + 24,countries.length); updateUrl({limit:next}); }}><LocalizedText text="Show more countries" /></button> : null}
  </section>;
}
