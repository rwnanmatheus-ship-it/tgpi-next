"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { CountryMapRegionId } from "@/lib/country-map";
import Image from "next/image";
import Link from "next/link";
import SavedCountryButton from "@/components/activation/SavedCountryButton";

type ExplorerCountry = { slug: string; name: string; emoji: string; region: string; iso3: string; observations: number };
const CountryAtlas = dynamic(() => import("@/components/countries/CountriesWorldMap"), { ssr: false, loading: () => <p className="ig-status">Loading the interactive atlas…</p> });
type ExplorerFilters = { q?: string; region?: string; selected?: string | string[]; limit?: string };
export default function EvidenceExplorer({ countries, initialFilters = {} }: { countries: ExplorerCountry[]; initialFilters?: ExplorerFilters }) {
  const validSelections = (values: string[]) => [...new Set(values)].filter(slug => countries.some(country => country.slug === slug)).slice(0,3);
  const [query, setQuery] = useState(initialFilters.q?.slice(0,120) ?? "");
  const [showAtlas, setShowAtlas] = useState(false);
  const [atlasRegion, setAtlasRegion] = useState<CountryMapRegionId>("world");
  const [atlasCountry, setAtlasCountry] = useState("portugal");
  const [region, setRegion] = useState(countries.some(country => country.region === initialFilters.region) ? initialFilters.region! : "all");
  const [selection, setSelection] = useState<string[]>(validSelections(typeof initialFilters.selected === "string" ? [initialFilters.selected] : initialFilters.selected ?? []));
  const [notice, setNotice] = useState("");
  const [limit, setLimit] = useState(Math.max(24,Math.min(195,Number(initialFilters.limit) || 24)));
  useEffect(() => {
    const restore = () => {
      const parameters = new URLSearchParams(window.location.search);
      setQuery((parameters.get("q") ?? "").slice(0,120));
      const value = parameters.get("region");
      setRegion(countries.some(country => country.region === value) ? value! : "all");
      setSelection([...new Set(parameters.getAll("selected"))].filter(slug => countries.some(country => country.slug === slug)).slice(0,3));
      setLimit(Math.max(24,Math.min(195,Number(parameters.get("limit")) || 24)));
    };
    window.addEventListener("popstate",restore);
    return () => window.removeEventListener("popstate",restore);
  },[countries]);
  function updateUrl(next: {query?:string;region?:string;selection?:string[];limit?:number}) {
    const url = new URL(window.location.href);
    const values = {query,region,selection,limit,...next};
    for (const name of ["q","region","selected","limit"]) url.searchParams.delete(name);
    if (values.query) url.searchParams.set("q",values.query.slice(0,120));
    if (values.region !== "all") url.searchParams.set("region",values.region);
    values.selection.forEach(slug => url.searchParams.append("selected",slug));
    if (values.limit > 24) url.searchParams.set("limit",String(values.limit));
    window.history.replaceState(null,"",`${url.pathname}${url.search}${url.hash}`);
  }
  function toggleSelection(slug: string) {
    if (!selection.includes(slug) && selection.length >= 3) { setNotice("Compare up to three countries. Remove one to add another."); return; }
    const next = selection.includes(slug) ? selection.filter(value => value !== slug) : [...selection,slug];
    setSelection(next); setNotice(""); updateUrl({selection:next});
  }
  const normalized = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  const filtered = countries.filter(c => (region === "all" || c.region === region) && `${c.name} ${c.slug} ${c.iso3}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalized));
  const params = new URLSearchParams(); selection.forEach(slug => params.append("country", slug));
  return <section id="country-explorer" className="ig-section">
    <div className="ig-panel mb-6"><div className="ig-spread"><div><p className="ig-eyebrow">Explore spatially</p><h2>An atlas, not a ranking.</h2></div><button type="button" className="ig-button ig-secondary" aria-expanded={showAtlas} onClick={() => setShowAtlas(!showAtlas)}>{showAtlas ? "Close atlas" : "Open interactive atlas"}</button></div>{showAtlas ? <><p className="ig-small">Select a country to preview its dossier. Map geometry is an exploration aid, not an authoritative boundary determination.</p><CountryAtlas countries={countries.map(c => ({ ...c, visual: { alt: `TGPI illustration of ${c.name}`, hasImage: true, url: `/images/countries/identity/${c.slug}.webp` } }))} activeRegionId={atlasRegion} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} onRegionChange={setAtlasRegion} /></> : null}</div>
    <div className="ig-spread"><h2>Find your next research question.</h2><p className="ig-meta" aria-live="polite">{filtered.length} {filtered.length === 1 ? "country" : "countries"} · Alphabetical order</p></div>
    <div className="ig-form-grid"><label>Search countries<input type="search" value={query} onChange={e => { setQuery(e.target.value.slice(0,120)); setLimit(24); updateUrl({query:e.target.value,limit:24}); }} placeholder="Country name or ISO code" /></label><label>Statistical region<select value={region} onChange={e => { setRegion(e.target.value); setLimit(24); updateUrl({region:e.target.value,limit:24}); }}><option value="all">All regions</option>{Array.from(new Set(countries.map(c => c.region))).sort().map(r => <option key={r}>{r}</option>)}</select></label></div>
    {selection.length ? <div className="ig-selection"><span>{selection.map(slug => countries.find(c => c.slug === slug)?.name).join(" · ")}</span><div className="ig-actions"><Link className="ig-button" href={`/compare?${params}`}>Compare {selection.length}/3 →</Link><button type="button" className="ig-button ig-secondary" onClick={() => { setSelection([]); setNotice(""); updateUrl({selection:[]}); }}>Clear</button></div></div> : null}
    <p className="ig-meta" role="status">{notice}</p>
    <div className="ig-country-grid">{filtered.slice(0, limit).map(country => <article key={country.slug} className="ig-country-card tgpi-card-3d" data-tgpi-tone="white" data-tgpi-interactive="true">
      <Link href={`/countries/${country.slug}`} className="ig-country-image"><Image src={`/images/countries/identity/${country.slug}.webp`} alt={`TGPI illustration inspired by ${country.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" className="object-cover" /><span className="ig-image-label">Editorial illustration</span></Link>
      <div className="ig-card-body"><div className="ig-spread"><p className="ig-eyebrow">{country.region}</p><span className="ig-meta">{country.iso3}</span></div><h3><Link href={`/countries/${country.slug}`}>{country.emoji} {country.name}</Link></h3><p className="ig-small">{country.observations}/4 statistical observations available. Identity mapped to UNSD.</p><div className="ig-actions"><Link className="ig-link" href={`/countries/${country.slug}`}>Explore evidence →</Link><button type="button" aria-pressed={selection.includes(country.slug)} className="ig-select" onClick={() => toggleSelection(country.slug)}>{selection.includes(country.slug) ? "✓ Selected" : "+ Compare"}</button><SavedCountryButton countryName={country.name} countrySlug={country.slug} /></div></div>
    </article>)}</div>
    {!filtered.length ? <p className="ig-panel">No countries found. Try another name or clear the region filter.</p> : null}
    {filtered.length > limit ? <button type="button" className="ig-button ig-secondary" onClick={() => { const next = Math.min(limit + 24,countries.length); setLimit(next); updateUrl({limit:next}); }}>Show more countries</button> : null}
  </section>;
}
