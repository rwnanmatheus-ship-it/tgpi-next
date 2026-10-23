"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type * as Leaflet from "leaflet";
import locations from "@/data/country-map-locations.json";
import { BASEMAP_URL, SATELLITE_LAYERS, isSatelliteDate, satelliteTileUrl, type SatelliteCatalog, type SatelliteSensor } from "@/lib/satellite";

export type SatelliteCountry = { slug: string; name: string };
const points: Record<string, { lat: number; lng: number; zoom: number }> = locations;
export default function SatelliteAtlas({ countries, selectedSlug, onCountryPreview }: {
  countries: SatelliteCountry[]; selectedSlug: string; onCountryPreview: (slug: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const engine = useRef<typeof Leaflet | null>(null);
  const preview = useRef(onCountryPreview);
  const [map, setMap] = useState<Leaflet.Map | null>(null);
  const [catalog, setCatalog] = useState<SatelliteCatalog | null>(null);
  const [catalogError, setCatalogError] = useState("");
  const [sensor, setSensor] = useState<SatelliteSensor>("viirs");
  const [mode, setMode] = useState<"observations" | "terrain">("observations");
  const [selectedDate, setSelectedDate] = useState("");
  const [followLatest, setFollowLatest] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [tileStatus, setTileStatus] = useState("Preparing satellite map…");
  const [expanded, setExpanded] = useState(false);
  const latest = catalog?.layers[sensor].latest || "";
  const previous = latest ? new Date(Date.parse(`${latest}T12:00:00Z`) - 86_400_000).toISOString().slice(0, 10) : "";
  const date = selectedDate || (followLatest ? latest : previous);
  const country = countries.find(c => c.slug === selectedSlug);
  useEffect(() => { preview.current = onCountryPreview; }, [onCountryPreview]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch("/api/intelligence/satellite", { signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("NASA dates could not be refreshed. Retry or choose Terrain reference.");
        const next: SatelliteCatalog = await response.json();
        if (!next.layers?.viirs || !next.layers?.terra || !isSatelliteDate(next.layers.viirs.latest) || !isSatelliteDate(next.layers.terra.latest)) throw new Error("Invalid satellite catalog.");
        setCatalog(next); setCatalogError("");
      } catch (error) {
        if (!controller.signal.aborted) setCatalogError(error instanceof Error ? error.message : "Satellite catalog unavailable.");
      }
    };
    void load();
    const interval = window.setInterval(() => { if (!document.hidden) void load(); }, 900_000);
    return () => { controller.abort(); window.clearInterval(interval); };
  }, [refresh]);

  useEffect(() => {
    let cancelled = false;
    let instance: Leaflet.Map | undefined;
    let observer: ResizeObserver | undefined;
    void import("leaflet").then(L => {
      if (cancelled || !container.current) return;
      engine.current = L;
      instance = L.map(container.current, { center: [20, 0], zoom: 2, minZoom: 1, maxZoom: 9, scrollWheelZoom: false, worldCopyJump: true, zoomControl: true });
      instance.attributionControl.setPrefix(false);
      observer = new ResizeObserver(() => instance?.invalidateSize({ pan: false }));
      observer.observe(container.current);
      setMap(instance);
    }).catch(() => setTileStatus("The map could not start. Reload the page to retry."));
    return () => { cancelled = true; observer?.disconnect(); instance?.remove(); };
  }, []);

  useEffect(() => {
    if (!map || !engine.current || (mode === "observations" && !date)) return;
    const L = engine.current;
    let failed = false;
    const layer = L.tileLayer(mode === "terrain" ? BASEMAP_URL : satelliteTileUrl(sensor, date), {
      maxNativeZoom: mode === "terrain" ? 8 : 9, maxZoom: 9, noWrap: false,
      attribution: 'Imagery: <a href="https://earthdata.nasa.gov/gibs" target="_blank" rel="noreferrer">NASA GIBS / LANCE</a>',
      keepBuffer: 1,
    });
    layer.on("loading", () => { failed = false; setTileStatus("Loading imagery…"); });
    layer.on("tileerror", () => { failed = true; setTileStatus("Some imagery tiles are unavailable. Try the previous day, another sensor or Terrain reference."); });
    layer.on("load", () => { if (!failed) setTileStatus(mode === "terrain" ? "Terrain reference loaded · Historical composite, not current observations." : `Imagery tiles loaded for ${date} UTC · Coverage may be incomplete or obscured by clouds.`); });
    layer.addTo(map);
    return () => { layer.off(); layer.remove(); };
  }, [map, date, sensor, mode, refresh]);

  useEffect(() => {
    if (!map || !engine.current) return;
    const L = engine.current;
    const group = L.layerGroup().addTo(map);
    for (const item of countries) {
      const point = points[item.slug]; if (!point) continue;
      const selected = item.slug === selectedSlug;
      const label = document.createElement("span"); label.textContent = item.name;
      L.circleMarker([point.lat, point.lng], { radius: selected ? 8 : 4, color: selected ? "#ffda80" : "#fff", weight: selected ? 3 : 1, fillColor: selected ? "#e0b356" : "#0a2842", fillOpacity: .9 }).bindTooltip(label, { direction: "top" }).on("click", () => preview.current(item.slug)).addTo(group);
    }
    return () => { group.remove(); };
  }, [map, countries, selectedSlug]);

  useEffect(() => {
    const point = points[selectedSlug];
    if (map && point) map.setView([point.lat, point.lng], point.zoom, { animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches });
  }, [map, selectedSlug]);

  function previousDay() {
    if (!date) return;
    const prior = new Date(`${date}T12:00:00Z`); prior.setUTCDate(prior.getUTCDate() - 1);
    setSelectedDate(prior.toISOString().slice(0, 10));
  }
  return <div className={`satellite-atlas${expanded ? " satellite-expanded" : ""}`}>
    <div className="satellite-heading"><div><p className="ig-eyebrow">TGPI / Earth observation</p><h3>A real view of your destination.</h3></div><span className="satellite-badge">{mode === "terrain" ? "Historical terrain" : "Near real-time source"}</span></div>
    <div className="satellite-controls">
      <label>Destination<select value={selectedSlug} onChange={event => onCountryPreview(event.target.value)}>{countries.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
      <label>Imagery layer<select value={mode} onChange={event => setMode(event.target.value as typeof mode)}><option value="observations">Recent satellite observations</option><option value="terrain">Terrain reference · historical</option></select></label>
      <label>Satellite sensor<select value={sensor} disabled={mode === "terrain"} onChange={event => { setSensor(event.target.value as SatelliteSensor); setSelectedDate(""); }}><option value="viirs">Suomi NPP / VIIRS</option><option value="terra">Terra / MODIS</option></select></label>
      <label>Observation day · UTC<input type="date" value={date} min={catalog?.layers[sensor].earliest} max={catalog?.layers[sensor].latest} disabled={mode === "terrain" || !catalog} onChange={event => { const value = event.target.value; if (catalog && isSatelliteDate(value) && value >= catalog.layers[sensor].earliest && value <= catalog.layers[sensor].latest) setSelectedDate(value); }} /></label>
    </div>
    <div className="satellite-actions"><button type="button" disabled={!date || mode === "terrain" || date === catalog?.layers[sensor].earliest} onClick={previousDay}>← Previous day</button><button type="button" disabled={!catalog || mode === "terrain"} onClick={() => { setSelectedDate(""); setFollowLatest(true); setRefresh(value => value + 1); }}>Latest available</button><button type="button" onClick={() => setRefresh(value => value + 1)}>Refresh imagery</button><button type="button" onClick={() => map?.setView([20, 0], 2)}>World view</button><button type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Compact map" : "Expand map"}</button></div>
    {catalogError && <p className="ig-caution" role="alert">{catalogError}{catalog ? ` Last successful catalog check: ${catalog.checkedAt.slice(0, 16).replace("T", " ")} UTC.` : ""}</p>}
    <div ref={container} className="satellite-map" role="region" aria-label={`Satellite imagery for ${country?.name || "the world"}. Use arrow keys to pan and plus or minus to zoom.`} />
    <div className="satellite-status"><p role="status">{tileStatus}</p>{country && <Link className="ig-link" href={`/countries/${country.slug}`}>Explore {country.name} →</Link>}</div>
    <div className="satellite-facts"><span><strong>{mode === "terrain" ? "Reference composite" : date || "Checking source…"}</strong>{mode === "terrain" ? "Not a current capture" : "Observation day · UTC"}</span><span><strong>{mode === "terrain" ? "NASA Blue Marble" : SATELLITE_LAYERS[sensor].label}</strong>{mode === "terrain" ? "Relief & bathymetry" : SATELLITE_LAYERS[sensor].resolution}</span><span><strong>{catalog ? catalog.checkedAt.slice(11, 16) + " UTC" : "Pending"}</strong>Catalog checked{catalog ? ` · ${catalog.checkedAt.slice(0, 10)}` : ""}</span></div>
    <p className="ig-small">Daily satellite imagery, not live video or street-level photography. The initial view uses the previous source day for broader coverage; choose Latest available to inspect the newest day. Black areas can mean no observations. Near real-time products generally arrive within a few hours of observation; today’s coverage can be partial. Clouds, night and missing passes can obscure the surface. Try another date or sensor. The selected day is not an exact capture timestamp for every pixel. Markers locate countries approximately and do not define borders.</p>
    <a className="ig-link" href="https://worldview.earthdata.nasa.gov/" target="_blank" rel="noreferrer">Inspect imagery in NASA Worldview ↗</a>
  </div>;
}
