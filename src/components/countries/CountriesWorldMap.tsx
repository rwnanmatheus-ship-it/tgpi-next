"use client";

import Link from "next/link";
import Image from "@/components/localization/LocalizedImage";
import { startTransition, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import CountryFlag from "@/components/ui/CountryFlag";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import { countryFlagCode } from "@/lib/country-flag";
import type { CountryExplorerItem } from "@/lib/countries";
import { COUNTRY_MAP_REGIONS, type CountryMapRegionId } from "@/lib/country-map";
import physicalGeography from "@/data/world-physical.json";
import locations from "@/data/country-map-locations.json";
import styles from "./CountriesWorldMap.module.css";

type MapCountry = Pick<CountryExplorerItem, "slug" | "name" | "emoji" | "region" | "visual"> & { iso3?: string; capital?: string; language?: string };
type WorldMapFeature = { name: string; isoA3: string; continent: string; label: [number, number]; marker: boolean; path: string };
type WorldMapData = { features: WorldMapFeature[] };
type MappedFeature = WorldMapFeature & { country?: MapCountry };
type Props = {
  countries: MapCountry[];
  activeRegionId: CountryMapRegionId;
  selectedSlug: string;
  onCountryPreview: (slug: string) => void;
  onRegionChange: (regionId: CountryMapRegionId) => void;
};
const OCEANS = [
  { name: "Pacific Ocean", x: 135, y: 260 }, { name: "Atlantic Ocean", x: 425, y: 285 },
  { name: "Indian Ocean", x: 735, y: 335 }, { name: "Arctic Ocean", x: 540, y: 30 },
  { name: "Southern Ocean", x: 510, y: 450 },
];
const LANDFORMS = [
  { name: "Andes", x: 300, y: 340 }, { name: "Amazon Basin", x: 340, y: 265 },
  { name: "Sahara", x: 530, y: 180 }, { name: "Himalayas", x: 735, y: 170 },
  { name: "Rocky Mountains", x: 205, y: 130 }, { name: "Alps", x: 525, y: 121 },
];
const MAP_DATA_URL = "/maps/tgpi-world-countries-50m.json";
const FEATURE_NAME_TO_SLUG: Readonly<Record<string, string>> = {
  "the bahamas": "bahamas", "republic of the congo": "congo", "federated states of micronesia": "micronesia",
  "republic of serbia": "serbia", "united republic of tanzania": "tanzania", "east timor": "timor-leste",
  "united states of america": "united-states", vatican: "vatican-city",
};
const FEATURE_ISO_ALIASES: Readonly<Record<string, string>> = { PSX: "PSE", SDS: "SSD" };
function normalizeCountryName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase();
}
function isWorldMapData(value: unknown): value is WorldMapData {
  if (!value || typeof value !== "object" || !("features" in value) || !Array.isArray(value.features)) return false;
  return value.features.length > 0 && value.features.every((feature: unknown) => {
    if (!feature || typeof feature !== "object") return false;
    const candidate = feature as Partial<WorldMapFeature>;
    return typeof candidate.name === "string" && typeof candidate.isoA3 === "string" && typeof candidate.continent === "string"
      && typeof candidate.path === "string" && Array.isArray(candidate.label) && candidate.label.length === 2 && candidate.label.every(Number.isFinite);
  });
}
function regionTransform(regionId: CountryMapRegionId) {
  const [x, y, width, height] = (COUNTRY_MAP_REGIONS.find(region => region.id === regionId) ?? COUNTRY_MAP_REGIONS[0]).viewport;
  const scale = Math.min(1000 / width, 500 / height) * .96;
  return { scale, x: (1000 - width * scale) / 2 - x * scale, y: (500 - height * scale) / 2 - y * scale };
}

export default function CountriesWorldMap({ countries, activeRegionId, selectedSlug, onCountryPreview, onRegionChange }: Props) {
  const { t, locale } = useLocale();
  const router = useRouter();
  const id = `atlas-${useId().replace(/:/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const prefetched = useRef(new Set<string>());
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const moved = useRef(false);
  const [navigation, setNavigation] = useState({ region: activeRegionId, scale: 1, x: 0, y: 0 });
  const [mapData, setMapData] = useState<WorldMapData | null>(null);
  const [mapError, setMapError] = useState(false);
  const [layer, setLayer] = useState<"physical" | "political">("physical");
  const [labels, setLabels] = useState(true);
  const [water, setWater] = useState(true);
  const [grid, setGrid] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [screenScale, setScreenScale] = useState(1);
  const [textureError, setTextureError] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState("");
  const [dragging, setDragging] = useState(false);
  const current = navigation.region === activeRegionId ? navigation : { region: activeRegionId, scale: 1, x: 0, y: 0 };
  const base = regionTransform(activeRegionId);
  const zoom = { scale: base.scale * current.scale, x: 500 + (base.x - 500) * current.scale + current.x, y: 250 + (base.y - 250) * current.scale + current.y };

  useEffect(() => {
    const controller = new AbortController();
    void fetch(MAP_DATA_URL, { cache: "force-cache", signal: controller.signal }).then(async response => {
      if (!response.ok) throw Error("Map unavailable");
      const data: unknown = await response.json();
      if (!isWorldMapData(data)) throw Error("Invalid map data");
      startTransition(() => setMapData(data));
    }).catch(() => { if (!controller.signal.aborted) setMapError(true); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const element = svgRef.current;
    if (!element) return;
    const observer = new ResizeObserver(entries => {
      const rect = entries[0]?.contentRect;
      if (rect) setScreenScale(Math.max(.1, Math.min(rect.width / 1000, rect.height / 500)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const countryBySlug = useMemo(() => new Map(countries.map(country => [country.slug, country])), [countries]);
  const features = useMemo<MappedFeature[]>(() => {
    const byIso = new Map(countries.filter(country => country.iso3).map(country => [country.iso3, country]));
    const byName = new Map(countries.map(country => [normalizeCountryName(country.name), country]));
    return (mapData?.features ?? []).map(feature => {
      const name = normalizeCountryName(feature.name);
      return { ...feature, country: byIso.get(FEATURE_ISO_ALIASES[feature.isoA3] ?? feature.isoA3)
        ?? countryBySlug.get(FEATURE_NAME_TO_SLUG[name] ?? name.replace(/\s+/g, "-")) ?? byName.get(name) };
    });
  }, [mapData, countries, countryBySlug]);
  const interactiveCountries = useMemo(() => [...new Map(features.flatMap(feature => feature.country ? [[feature.country.slug, feature.country] as const] : [])).values()]
    .sort((a, b) => t(a.name).localeCompare(t(b.name), locale)), [features, t, locale]);
  const keyboardCountries = useMemo(() => {
    if (activeRegionId === "world") return interactiveCountries;
    const region = COUNTRY_MAP_REGIONS.find(candidate => candidate.id === activeRegionId);
    const continents = new Map(features.map(feature => [feature.country?.slug, feature.continent]));
    return interactiveCountries.filter(country => region?.sourceRegions.includes(continents.get(country.slug) ?? country.region));
  }, [activeRegionId, interactiveCountries, features]);
  const selectedCountry = countryBySlug.get(selectedSlug);
  const selectedFeature = features.find(feature => feature.country?.slug === selectedSlug);
  const focusSlug = keyboardCountries.some(country => country.slug === selectedSlug) ? selectedSlug : keyboardCountries[0]?.slug;
  const displayedFeatures = useMemo(() => activeRegionId === "oceania" ? [...features, ...features.filter(feature => feature.country?.region === "Oceania" && feature.label[0] < 150)
    .map(feature => ({ ...feature, duplicate: true }))] : features, [features, activeRegionId]);

  // Reject overlapping labels in projected screen coordinates, prioritizing the selected territory.
  const countryLabels = useMemo(() => {
    const boxes: { x: number; y: number; width: number }[] = [];
    return [...displayedFeatures].sort((a, b) => Number(b.country?.slug === selectedSlug) - Number(a.country?.slug === selectedSlug)).filter(feature => {
      if (!feature.country || feature.marker) return false;
      const x = (feature.label[0] + ("duplicate" in feature ? 1000 : 0)) * zoom.scale + zoom.x;
      const y = feature.label[1] * zoom.scale + zoom.y;
      if (x < 30 || x > 970 || y < 35 || y > 465) return false;
      const width = (t(feature.country.name).length * 6.2 + 14) / screenScale;
      if (boxes.some(box => Math.abs(box.x - x) < (box.width + width) / 2 && Math.abs(box.y - y) < 24 / screenScale)) return false;
      boxes.push({ x, y, width });
      return true;
    });
  }, [displayedFeatures, selectedSlug, zoom.scale, zoom.x, zoom.y, screenScale, t]);
  const selectedLocation = selectedSlug in locations ? locations[selectedSlug as keyof typeof locations] : undefined;
  const selectedCapital = physicalGeography.capitals.find(capital => capital.iso3 === (selectedCountry?.iso3 ?? FEATURE_ISO_ALIASES[selectedFeature?.isoA3 ?? ""] ?? selectedFeature?.isoA3));
  const physical = layer === "physical" && !textureError && !contrast;

  function previewCountry(slug: string, prefetch = true) {
    onCountryPreview(slug);
    const route = `/countries/${slug}`;
    if (prefetch && !prefetched.current.has(route)) { prefetched.current.add(route); router.prefetch(route); }
  }
  function changeRegion(region: CountryMapRegionId) {
    setNavigation({ region, scale: 1, x: 0, y: 0 });
    onRegionChange(region);
  }
  function changeZoom(delta: number) {
    setNavigation({ ...current, scale: Math.max(1, Math.min(6, current.scale + delta)) });
  }
  function focusSelection() {
    if (!selectedFeature) return;
    const scale = Math.max(base.scale, Math.min(5, base.scale * 2));
    const x = selectedFeature.label[0] + (activeRegionId === "oceania" && selectedFeature.label[0] < 150 ? 1000 : 0);
    setNavigation({ region: activeRegionId, scale: scale / base.scale, x: 500 - x * scale - (500 + (base.x - 500) * scale / base.scale), y: 250 - selectedFeature.label[1] * scale - (250 + (base.y - 250) * scale / base.scale) });
  }
  function handleCountryKeyDown(event: KeyboardEvent<SVGElement>, slug: string) {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); router.push(`/countries/${slug}`); return; }
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key) || !keyboardCountries.length) return;
    event.preventDefault();
    const offset = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = keyboardCountries[(keyboardCountries.findIndex(country => country.slug === slug) + offset + keyboardCountries.length) % keyboardCountries.length];
    previewCountry(next.slug, false);
    window.requestAnimationFrame(() => {
      const target = svgRef.current?.querySelector<SVGElement>(`[data-country-slug="${next.slug}"][data-map-focus="true"]`);
      target?.focus();
    });
  }

  return <div className={`${styles.atlas} country-atlas`} data-expanded={expanded}>
    <div className={styles.topbar}>
      <div className={styles.heading}><span className={styles.overline}>{t("TGPI Atlas")}</span><h3>{t("Explore the world")}</h3></div>
      <LocalizedElement as="div" role="group" aria-label="Zoom the world map by region" className={styles.regions}>
        {COUNTRY_MAP_REGIONS.map(region => <button key={region.id} type="button" aria-pressed={activeRegionId === region.id} onClick={() => changeRegion(region.id)}>{t(region.label)}</button>)}
      </LocalizedElement>
    </div>
    <div className={styles.controls}>
      <label className={styles.locator}><span>{t("Locate a destination")}</span><LocalizedElement as="select" aria-label="Locate a destination on the atlas" value={selectedSlug} onChange={event => { previewCountry(event.target.value); changeRegion("world"); }}>
        {!selectedSlug && <option value="" disabled>{t("Select a destination")}</option>}{interactiveCountries.map(country => <option key={country.slug} value={country.slug}>{t(country.name)}</option>)}
      </LocalizedElement></label>
      <div className={styles.tools} role="group" aria-label={t("Map zoom")}>
        <button type="button" aria-pressed={contrast} onClick={() => setContrast(!contrast)}>{t("High contrast")}</button>
        <button type="button" disabled={!selectedFeature} onClick={focusSelection}>{t("Focus destination")}</button>
        <button type="button" aria-label={t("Zoom out")} disabled={current.scale <= 1} onClick={() => changeZoom(-.5)}>−</button>
        <output>{Math.round(current.scale * 100)}%</output>
        <button type="button" aria-label={t("Zoom in")} disabled={current.scale >= 6} onClick={() => changeZoom(.5)}>+</button>
        <button type="button" onClick={() => changeRegion("world")}>{t("Reset")}</button>
      </div>
    </div>
    <div className={styles.layerBar}>
      <div role="group" aria-label={t("Map appearance")} className={styles.layerSwitch}>
        <button type="button" aria-pressed={layer === "physical"} onClick={() => setLayer("physical")}>{t("Physical Earth")}</button>
        <button type="button" aria-pressed={layer === "political"} onClick={() => setLayer("political")}>{t("Political atlas")}</button>
      </div>
      <div className={styles.layerOptions}>
        <button type="button" aria-pressed={labels} onClick={() => setLabels(!labels)}>{t("Place names")}</button>
        <button type="button" aria-pressed={grid} onClick={() => setGrid(!grid)}>{t("Coordinates")}</button>
        <button type="button" aria-pressed={water} onClick={() => setWater(!water)}>{t("Rivers & lakes")}</button>
        <button type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{t(expanded ? "Compact map" : "Expand map")}</button>
      </div>
    </div>
    <div className={styles.frame} data-contrast={contrast} data-layer={physical ? "physical" : "political"}>
      <svg ref={svgRef} viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" className={styles.canvas}
        aria-labelledby={`${id}-title ${id}-description`} style={{ touchAction: current.scale > 1 ? "none" : "pan-y" }}
        onPointerDown={event => { moved.current = false; if (current.scale > 1) drag.current = { x: event.clientX, y: event.clientY, px: current.x, py: current.y }; }}
        onPointerMove={event => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x, dy = event.clientY - drag.current.y;
          if (Math.abs(dx) + Math.abs(dy) < 7 && !moved.current) return;
          moved.current = true; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId);
          const rect = event.currentTarget.getBoundingClientRect();
          const units = Math.max(1000 / rect.width, 500 / rect.height);
          const originX = zoom.x - current.x, originY = zoom.y - current.y;
          const extent = activeRegionId === "oceania" ? 1160 : 1000;
          setNavigation({ ...current,
            x: Math.max(1000 - extent * zoom.scale - originX, Math.min(-originX, drag.current.px + dx * units)),
            y: Math.max(500 - 500 * zoom.scale - originY, Math.min(-originY, drag.current.py + dy * units)),
          });
        }}
        onPointerUp={() => { drag.current = null; setDragging(false); }} onPointerCancel={() => { drag.current = null; setDragging(false); }} onPointerLeave={() => { if (!moved.current) drag.current = null; setHoveredSlug(""); }}
        onKeyDown={event => { if (event.key === "+" || event.key === "=") { event.preventDefault(); changeZoom(.5); } else if (event.key === "-") { event.preventDefault(); changeZoom(-.5); } else if (event.key === "Escape" || event.key === "0") { event.preventDefault(); changeRegion("world"); } }}>
        <title id={`${id}-title`}>{t("TGPI interactive country map")}</title>
        <desc id={`${id}-description`}>{t("Real country boundaries. Hover or focus a territory to preview it, then select to preview or press Enter to open its country intelligence page. Use arrow keys to move between countries.")}</desc>
        <defs>
          <radialGradient id={`${id}-water`} cx="55%" cy="35%" r="78%"><stop stopColor="#153f60"/><stop offset=".55" stopColor="#09243b"/><stop offset="1" stopColor="#030e1d"/></radialGradient>
          <linearGradient id={`${id}-land`} x1="0" y1="0" x2=".6" y2="1"><stop stopColor={contrast ? "#b9dbea" : "#638ca3"}/><stop offset=".45" stopColor={contrast ? "#7eb6d0" : "#2e5b75"}/><stop offset="1" stopColor={contrast ? "#5086a4" : "#13334f"}/></linearGradient>
          <linearGradient id={`${id}-selected`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f9e4a8"/><stop offset=".6" stopColor="#d2ae55"/><stop offset="1" stopColor="#94702c"/></linearGradient>
        </defs>
        <rect width="1000" height="500" fill={`url(#${id}-water)`}/>
        <g className={styles.geography} data-dragging={dragging} transform={`translate(${zoom.x} ${zoom.y}) scale(${zoom.scale})`}>
          {physical && <g pointerEvents="none" className={styles.earthTexture}>
            <image href="/maps/earth-blue-marble-4k.webp" x="0" y="0" width="1000" height="500" preserveAspectRatio="none" onError={() => setTextureError(true)}/>
            {activeRegionId === "oceania" && <image href="/maps/earth-blue-marble-4k.webp" x="1000" y="0" width="1000" height="500" preserveAspectRatio="none"/>}
          </g>}
          {grid && <g pointerEvents="none" className={styles.graticule}>
            {Array.from({ length: 13 }, (_, i) => <line key={`lng-${i}`} x1={i * 1000 / 12} x2={i * 1000 / 12} y1="0" y2="500" vectorEffect="non-scaling-stroke"/>)}
            {[-66.56, -23.44, 0, 23.44, 66.56].map(lat => <line key={lat} x1="0" x2="2000" y1={(90 - lat) / 180 * 500} y2={(90 - lat) / 180 * 500} data-equator={lat === 0} vectorEffect="non-scaling-stroke"/>)}
            {[-60, -30, 0, 30, 60].map(lat => <text key={lat} x={8 / zoom.scale} y={(90 - lat) / 180 * 500 - 4 / zoom.scale} fontSize={12 / zoom.scale / screenScale}>{Math.abs(lat)}°{lat > 0 ? " N" : lat < 0 ? " S" : ""}</text>)}
          </g>}
          {displayedFeatures.map(feature => {
            const country = feature.country;
            const duplicate = "duplicate" in feature;
            const pacific = activeRegionId === "oceania" && country?.region === "Oceania" && feature.label[0] < 150;
            const active = country?.slug === selectedSlug;
            const visible = duplicate || !pacific;
            const x = feature.label[0] + (duplicate ? 1000 : 0);
            return <g key={`${feature.isoA3}-${feature.name}-${duplicate ? "pacific" : "main"}`}>
              <LocalizedElement as="path" d={feature.path} transform={duplicate ? "translate(1000 0)" : undefined} data-country-slug={country?.slug}
                data-map-focus={visible} role={country ? "button" : undefined} tabIndex={country?.slug === focusSlug && visible ? 0 : -1}
                aria-label={country ? t("Preview {country} on the map", { country: t(country.name) }) : undefined} aria-pressed={country ? active : undefined}
                aria-keyshortcuts={country ? "Enter ArrowLeft ArrowRight ArrowUp ArrowDown" : undefined}
                onMouseEnter={country ? () => setHoveredSlug(country.slug) : undefined} onFocus={country ? () => previewCountry(country.slug, false) : undefined}
                onClick={country ? () => { if (!moved.current) previewCountry(country.slug); } : undefined}
                onDoubleClick={country ? () => { if (!moved.current) router.push(`/countries/${country.slug}`); } : undefined}
                onKeyDown={country ? event => handleCountryKeyDown(event, country.slug) : undefined}
                className={styles.territory} data-interactive={Boolean(country)} data-selected={active} vectorEffect="non-scaling-stroke"
                fill={physical ? active ? "#e7bd5550" : "transparent" : active ? `url(#${id}-selected)` : country ? `url(#${id}-land)` : "#122b41"}>
                <title>{country ? t(country.name) : feature.name}</title>
              </LocalizedElement>
              {feature.marker && country && <g className={styles.marker} aria-hidden="true" onClick={() => { if (!moved.current) previewCountry(country.slug); }}>
                <circle cx={x} cy={feature.label[1]} r={9 / zoom.scale} fill="transparent"/>
                <circle cx={x} cy={feature.label[1]} r={(active ? 2.7 : 1.8) / zoom.scale} fill={active ? "#fff2c8" : "#b6d3e3"} stroke="#071629" strokeWidth={.6 / zoom.scale}/>
              </g>}
            </g>;
          })}
          {water && <g pointerEvents="none" className={styles.hydrology} aria-hidden="true">{physicalGeography.water.map(feature => <path key={`${feature.type}-${feature.name}`} d={feature.path} data-type={feature.type} vectorEffect="non-scaling-stroke"><title>{feature.name}</title></path>)}</g>}
          {selectedCapital && <g pointerEvents="none" aria-hidden="true" className={styles.capitalMarker} transform={`translate(${selectedCapital.point[0] + (activeRegionId === "oceania" && selectedCapital.point[0] < 150 ? 1000 : 0)} ${selectedCapital.point[1]}) scale(${1 / zoom.scale / screenScale})`}>
            <circle r="4"/><circle r="1.5"/>
            {labels && zoom.scale > 1.5 && <text x="8" y="14" fontSize="10">{selectedCapital.names[locale] || selectedCapital.name}</text>}
          </g>}
          {labels && <g pointerEvents="none" aria-hidden="true" className={styles.placeLabels}>
            {OCEANS.map(ocean => <text key={ocean.name} x={ocean.x} y={ocean.y} fontSize={Math.min(20, 12 / screenScale) / Math.sqrt(zoom.scale)} className={styles.oceanLabel} style={{ strokeWidth: 2 / zoom.scale / screenScale }}>{t(ocean.name)}</text>)}
            {physical && zoom.scale > 1.5 && LANDFORMS.map(place => <text key={place.name} x={place.x} y={place.y} fontSize={12 / zoom.scale / screenScale} className={styles.landformLabel} style={{ strokeWidth: 2 / zoom.scale / screenScale }}>{t(place.name)}</text>)}
            {countryLabels.map(feature => <text key={`${feature.isoA3}-${"duplicate" in feature}`} x={feature.label[0] + ("duplicate" in feature ? 1000 : 0)} y={feature.label[1] - 10 / zoom.scale / screenScale} fontSize={12 / zoom.scale / screenScale} style={{ strokeWidth: 2.8 / zoom.scale / screenScale }} data-selected={feature.country?.slug === selectedSlug}>{t(feature.country!.name)}</text>)}
          </g>}
          {selectedFeature && <g aria-hidden="true" pointerEvents="none"><circle cx={selectedFeature.label[0] + (activeRegionId === "oceania" && selectedFeature.label[0] < 150 ? 1000 : 0)} cy={selectedFeature.label[1]} r={10 / zoom.scale} fill="none" stroke="#ffe5a1" strokeWidth={.8 / zoom.scale}/><circle cx={selectedFeature.label[0] + (activeRegionId === "oceania" && selectedFeature.label[0] < 150 ? 1000 : 0)} cy={selectedFeature.label[1]} r={17 / zoom.scale} fill="none" stroke="#ffe5a1" strokeOpacity=".32" strokeWidth={.65 / zoom.scale}/></g>}
        </g>
      </svg>
      <div className={styles.seal} aria-label={t("TGPI Atlas")}><Image src="/brand/tgpi-crest-metal-v3-256.png" alt="" width={35} height={42}/><span><strong>TGPI</strong><small>{t("ATLAS")}</small></span></div>
      {hoveredSlug && countryBySlug.has(hoveredSlug) && <div className={styles.hoverLabel} aria-hidden="true">{t(countryBySlug.get(hoveredSlug)!.name)}</div>}
      {!mapData && <div className={styles.status} role="status"><span className={styles.loader} aria-hidden="true"/>{t(mapError ? "The geographic layer could not be loaded. Use country search to continue." : "Loading real borders")}</div>}
      <div className={styles.mapMeta}>{mapData && <span>{interactiveCountries.length}/{countries.length} {t("profiles mapped")}</span>}<span>{physical ? "4K · Blue Marble" : `1:50M · ${t("Vector map")}`}</span></div>
    </div>
    <div className={styles.selection}>
      {selectedCountry ? <><div className={styles.selectionIdentity}><div className={styles.selectionImage}><Image src={selectedCountry.visual.url} alt="" fill sizes="64px" className="object-cover"/></div><CountryFlag iso2={countryFlagCode(selectedCountry.emoji)} width={30}/><div><span>{t("Intelligence preview")}</span><strong>{t(selectedCountry.name)}</strong></div></div><div className={styles.selectionActions}><button type="button" onClick={focusSelection} disabled={!selectedFeature}>{t("Focus destination")}</button><Link href={`/countries/${selectedCountry.slug}`}>{t("Open country dossier")}</Link></div></>
        : <p>{t("Select a destination")}</p>}
    </div>
    {selectedCountry && <dl className={styles.facts} aria-label={t("Geographic context")}>
      <div><dt>{t("Region")}</dt><dd>{t(selectedCountry.region)}</dd></div>
      {selectedCountry.capital && <div><dt>{t("Capital")}</dt><dd>{t(selectedCountry.capital)}</dd></div>}
      {selectedCountry.language && <div><dt>{t("Language")}</dt><dd>{t(selectedCountry.language)}</dd></div>}
      {selectedLocation && <div><dt>{t("Reference coordinates")}</dt><dd translate="no">{Math.abs(selectedLocation.lat).toFixed(2)}° {selectedLocation.lat >= 0 ? "N" : "S"} · {Math.abs(selectedLocation.lng).toFixed(2)}° {selectedLocation.lng >= 0 ? "E" : "W"}</dd></div>}
    </dl>}
    {selectedCapital && <p className={styles.capitalInfo}>{t("Capital reference")}: <strong>{selectedCapital.names[locale] || selectedCapital.name}</strong> · <span translate="no">{selectedCapital.timezone}</span></p>}
    <div className={styles.legend}><span><i/>{t("Selected destination")}</span><span><i/>{t("Country boundaries")}</span><span>{t("Equirectangular projection")}</span></div>
    <p className={styles.imageryNote}>{t("Physical imagery is a historical composite, not live satellite coverage.")} <a href="https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/" target="_blank" rel="noreferrer"><LocalizedText text="NASA Blue Marble" /></a> · <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer"><LocalizedText text="Natural Earth" /></a></p>
    <div className={styles.footnote}><span>{t("Select to preview · Zoom to drag")}</span><span>{t("Keyboard: arrows + Enter")}</span></div>
    <p className={styles.attribution}><LocalizedText text="Boundary reference: Natural Earth de facto cartography. Disputed areas may vary by legal or political point of view." /></p>
  </div>;
}
