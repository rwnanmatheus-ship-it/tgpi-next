"use client";
import { useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import type { CountryMapRegionId } from "@/lib/country-map";
import Image from "next/image";
import Link from "next/link";
import { explorerFiltersFromSearch, explorerFiltersToSearch, normalizeExplorerFilters, type ExplorerFilterInput } from "@/lib/explorer-filters";
import SavedCountryButton from "@/components/activation/SavedCountryButton";

import { countrySearchScore, countrySearchTerms } from "@/lib/country-search";
import { useResearchProfile } from "./useResearchProfile";
import ResearchReportCard from "./ResearchReportCard";
type ExplorerCountry = { slug: string; name: string; emoji: string; region: string; iso2: string; iso3: string; dossierCount: number; observations: number };
const SatelliteAtlas = dynamic(() => import("@/components/countries/SatelliteAtlas"), { ssr: false, loading: () => <p className="ig-status">Preparing satellite explorer…</p> });
const CountryAtlas = dynamic(() => import("@/components/countries/CountriesWorldMap"), { ssr: false, loading: () => <p className="ig-status">Loading the interactive atlas…</p> });
type ExplorerFilters = ExplorerFilterInput;
const FILTERS_CHANGED = "tgpi:explorer-location";
function subscribeLocation(listener: () => void) {
  window.addEventListener("popstate",listener);
  window.addEventListener(FILTERS_CHANGED,listener);
  return () => { window.removeEventListener("popstate",listener); window.removeEventListener(FILTERS_CHANGED,listener); };
}
const locationSearch = () => window.location.search;
export default function EvidenceExplorer({ countries, initialFilters = {} }: { countries: ExplorerCountry[]; initialFilters?: ExplorerFilters }) {
  // Read the current URL again when Next restores a cached subtree on Back.
  // The server snapshot keeps SSR/hydration deterministic; no duplicate local filter state.
  const initialSearch = explorerFiltersToSearch(initialFilters);
  const search = useSyncExternalStore(subscribeLocation,locationSearch,() => initialSearch);
  const {query,region,selection,limit} = normalizeExplorerFilters(explorerFiltersFromSearch(search),countries);
  const { user, journey } = useResearchProfile();
  const [onlySaved, setOnlySaved] = useState(false);
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
    if (!selection.includes(slug) && selection.length >= 3) { setNotice("Compare up to three countries. Remove one to add another."); return; }
    const next = selection.includes(slug) ? selection.filter(value => value !== slug) : [...selection,slug];
    setNotice(""); updateUrl({selection:next});
  }
  const filtered = countries.map(c => ({ country: c, score: countrySearchScore(terms.get(c.slug) ?? [], query) })).filter(({ country: c, score }) => score > 0 && (region === "all" || c.region === region) && (!onlySaved || journey.targetCountries.includes(c.slug))).sort((a, b) => b.score - a.score || a.country.name.localeCompare(b.country.name)).map(c => c.country);
  // Search, restored URLs and region changes focus the best visible match.
  // An explicit map preview remains selected until those filters change.
  const atlasCountry = atlasFocus.query === query && atlasFocus.region === region
    ? atlasFocus.slug : filtered[0]?.slug ?? atlasFocus.slug;
  const params = new URLSearchParams(); selection.forEach(slug => params.append("country", slug));
  return <section id="country-explorer" className="ig-section">

    <div className="ig-spread"><h2>Find your next destination.</h2><p className="ig-meta" aria-live="polite">{filtered.length} {filtered.length === 1 ? "country" : "countries"} · {query ? "Best search matches" : "A–Z"}</p></div>
    <div className="ig-form-grid country-search-bar"><label>Search countries<input type="search" value={query} onChange={e => { updateUrl({query:e.target.value,limit:24}); }} placeholder="Country, translated name or ISO code…" /></label><label>Statistical region<select value={region} onChange={e => { updateUrl({region:e.target.value,limit:24}); setAtlasRegion(e.target.value === "all" || e.target.value === "Americas" ? "world" : e.target.value.toLowerCase() as CountryMapRegionId); }}><option value="all">All regions</option>{Array.from(new Set(countries.map(c => c.region))).sort().map(r => <option key={r}>{r}</option>)}</select></label></div>
    <div className="country-search-tools"><span>Search in English, Português, Español, Français, Deutsch or Italiano.</span>{user && <button className="ig-select" type="button" aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}>{onlySaved ? "Show all destinations" : "My profile shortlist"}</button>}<button type="button" className="ig-select" onClick={() => { setOnlySaved(false); setAtlasRegion("world"); updateUrl({ query: "", region: "all", limit: 24 }); }}>Reset filters</button></div>
    <div className="ig-panel mb-6"><div className="ig-spread"><div><p className="ig-eyebrow">Geospatial intelligence</p><h2>TGPI World Atlas.</h2></div><button type="button" className="ig-button ig-secondary" aria-expanded={showAtlas} onClick={() => setShowAtlas(!showAtlas)}>{showAtlas ? "Close atlas" : "Open interactive atlas"}</button></div>{showAtlas ? <><div className="atlas-layer-tabs" role="group" aria-label="Atlas layers"><button type="button" aria-pressed={atlasLayer === "satellite"} onClick={() => setAtlasLayer("satellite")}>Satellite observations</button><button type="button" aria-pressed={atlasLayer === "countries"} onClick={() => setAtlasLayer("countries")}>Country boundaries</button></div>{atlasLayer === "satellite" ? <SatelliteAtlas countries={countries} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} /> : <CountryAtlas countries={countries.map(c => ({ ...c, visual: { alt: `TGPI illustration of ${c.name}`, hasImage: true, url: `/images/countries/identity/${c.slug}.webp` } }))} activeRegionId={atlasRegion} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} onRegionChange={id => { setAtlasRegion(id); updateUrl({ region: id === "world" ? "all" : id.includes("america") ? "Americas" : id.charAt(0).toUpperCase() + id.slice(1), limit: 24 }); }} />}</> : null}</div>
    {selection.length ? <div className="ig-selection"><span>{selection.map(slug => countries.find(c => c.slug === slug)?.name).join(" · ")}</span><div className="ig-actions"><Link className="ig-button" href={`/compare?${params}`}>Compare {selection.length}/3 →</Link><button type="button" className="ig-button ig-secondary" onClick={() => { setNotice(""); updateUrl({selection:[]}); }}>Clear</button></div></div> : null}
    {(query || selection.length > 0 || showAtlas) && filtered.length > 0 && <ResearchReportCard country={selection[0] || (showAtlas ? atlasCountry : filtered[0].slug)} name={countries.find(c => c.slug === (selection[0] || (showAtlas ? atlasCountry : filtered[0].slug)))?.name || "Country"} />}
    <p className="ig-meta" role="status">{notice}</p>
    <div className="ig-country-grid">{filtered.slice(0, limit).map(country => <article key={country.slug} className="ig-country-card tgpi-card-3d" data-tgpi-tone="white" data-tgpi-interactive="true">
      <Link href={`/countries/${country.slug}`} className="ig-country-image"><Image src={`/images/countries/identity/${country.slug}.webp`} alt={`${country.name} destination visual`} fill sizes="(max-width: 359px) 100vw, (max-width: 767px) 50vw, (max-width: 1099px) 33vw, 320px" quality={88} className="object-cover" /></Link>
      <div className="ig-card-body"><div className="ig-spread"><p className="ig-eyebrow">{country.region}</p><span className="ig-meta" translate="no">{country.iso3}</span></div><h3><Link href={`/countries/${country.slug}`}>{country.emoji} {country.name}</Link></h3><p className="ig-small">{country.observations}/4 national indicators · {country.dossierCount ? `${country.dossierCount} research summaries` : "Core country profile"}</p><div className="ig-actions"><Link className="ig-link" href={`/countries/${country.slug}`}>Explore evidence →</Link><button type="button" aria-pressed={selection.includes(country.slug)} className="ig-select" onClick={() => toggleSelection(country.slug)}>{selection.includes(country.slug) ? "✓ Selected" : "+ Compare"}</button><SavedCountryButton countryName={country.name} countrySlug={country.slug} /></div></div>
    </article>)}</div>
    {!filtered.length ? <p className="ig-panel">No countries found. Try another name or clear the region filter.</p> : null}
    {filtered.length > limit ? <button type="button" className="ig-button ig-secondary" onClick={() => { const next = Math.min(limit + 24,countries.length); updateUrl({limit:next}); }}>Show more countries</button> : null}
  </section>;
}
