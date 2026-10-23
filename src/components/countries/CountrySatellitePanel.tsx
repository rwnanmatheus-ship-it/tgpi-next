"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
const SatelliteAtlas = dynamic(() => import("./SatelliteAtlas"), { ssr: false, loading: () => <p role="status">Preparing satellite explorer…</p> });
export default function CountrySatellitePanel({ country, name }: { country: string; name: string }) {
  const [open, setOpen] = useState(false);
  const countries = useMemo(() => [{ slug: country, name }], [country, name]);
  return <section id="satellite" className="ig-section ig-panel country-satellite-panel"><div className="ig-spread"><div><p className="ig-eyebrow">From country research to Earth observation</p><h2>{name}, from orbit.</h2><p className="ig-small">Explore dated NASA satellite observations and terrain.</p></div><button type="button" className="ig-button ig-secondary" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close satellite view" : "Open satellite view"}</button></div>{open && <SatelliteAtlas countries={countries} selectedSlug={country} onCountryPreview={() => {}} />}</section>;
}
