"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { CountryMapRegionId } from "@/lib/country-map";
import Image from "next/image";
import Link from "next/link";

type ExplorerCountry = { slug: string; name: string; emoji: string; region: string; iso3: string; observations: number };
const CountryAtlas = dynamic(() => import("@/components/countries/CountriesWorldMap"), { ssr: false, loading: () => <p className="ig-status">Loading the interactive atlas…</p> });
export default function EvidenceExplorer({ countries }: { countries: ExplorerCountry[] }) {
  const [query, setQuery] = useState("");
  const [showAtlas, setShowAtlas] = useState(false);
  const [atlasRegion, setAtlasRegion] = useState<CountryMapRegionId>("world");
  const [atlasCountry, setAtlasCountry] = useState("portugal");
  const [region, setRegion] = useState("all");
  const [selection, setSelection] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [limit, setLimit] = useState(24);
  const normalized = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  const filtered = countries.filter(c => (region === "all" || c.region === region) && `${c.name} ${c.slug} ${c.iso3}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalized));
  const params = new URLSearchParams(); selection.forEach(slug => params.append("country", slug));
  return <section id="country-explorer" className="ig-section">
    <div className="ig-panel mb-6"><div className="ig-spread"><div><p className="ig-eyebrow">Explore spatially</p><h2>An atlas, not a ranking.</h2></div><button type="button" className="ig-button ig-secondary" aria-expanded={showAtlas} onClick={() => setShowAtlas(!showAtlas)}>{showAtlas ? "Close atlas" : "Open interactive atlas"}</button></div>{showAtlas ? <><p className="ig-small">Select a country to preview its dossier. Map geometry is an exploration aid, not an authoritative boundary determination.</p><CountryAtlas countries={countries.map(c => ({ ...c, visual: { alt: `TGPI illustration of ${c.name}`, hasImage: true, url: `/images/countries/identity/${c.slug}.webp` } }))} activeRegionId={atlasRegion} selectedSlug={atlasCountry} onCountryPreview={setAtlasCountry} onRegionChange={setAtlasRegion} /></> : null}</div>
    <div className="ig-spread"><h2>Find your next research question.</h2><p className="ig-meta" aria-live="polite">{filtered.length} countries · Alphabetical order</p></div>
    <div className="ig-form-grid"><label>Search countries<input type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(24); }} placeholder="Country name or ISO code" /></label><label>Statistical region<select value={region} onChange={e => { setRegion(e.target.value); setLimit(24); }}><option value="all">All regions</option>{Array.from(new Set(countries.map(c => c.region))).sort().map(r => <option key={r}>{r}</option>)}</select></label></div>
    {selection.length ? <div className="ig-selection"><span>{selection.map(slug => countries.find(c => c.slug === slug)?.name).join(" · ")}</span><div className="ig-actions"><Link className="ig-button" href={`/compare?${params}`}>Compare {selection.length}/3 →</Link><button type="button" className="ig-button ig-secondary" onClick={() => { setSelection([]); setNotice(""); }}>Clear</button></div></div> : null}
    <p className="ig-meta" role="status">{notice}</p>
    <div className="ig-country-grid">{filtered.slice(0, limit).map(country => <article key={country.slug} className="ig-country-card">
      <Link href={`/countries/${country.slug}`} className="ig-country-image"><Image src={`/images/countries/identity/${country.slug}.webp`} alt={`TGPI illustration inspired by ${country.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" className="object-cover" /><span className="ig-image-label">Editorial illustration</span></Link>
      <div className="ig-card-body"><div className="ig-spread"><p className="ig-eyebrow">{country.region}</p><span className="ig-meta">{country.iso3}</span></div><h3><Link href={`/countries/${country.slug}`}>{country.emoji} {country.name}</Link></h3><p className="ig-small">{country.observations}/4 statistical observations available. Identity mapped to UNSD.</p><div className="ig-actions"><Link className="ig-link" href={`/countries/${country.slug}`}>Explore evidence →</Link><button type="button" aria-pressed={selection.includes(country.slug)} className="ig-select" onClick={() => { if (selection.includes(country.slug)) { setSelection(selection.filter(s => s !== country.slug)); setNotice(""); } else if (selection.length < 3) { setSelection([...selection, country.slug]); setNotice(""); } else setNotice("Compare up to three countries. Remove one to add another."); }}>{selection.includes(country.slug) ? "✓ Selected" : "+ Compare"}</button></div></div>
    </article>)}</div>
    {!filtered.length ? <p className="ig-panel">No countries found. Try another name or clear the region filter.</p> : null}
    {filtered.length > limit ? <button type="button" className="ig-button ig-secondary" onClick={() => setLimit(limit + 24)}>Show more countries</button> : null}
  </section>;
}
