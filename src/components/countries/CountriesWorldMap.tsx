"use client";

import Image from "next/image";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CountryExplorerItem } from "@/lib/countries";
import {
  COUNTRY_MAP_REGIONS,
  type CountryMapRegionId,
} from "@/lib/country-map";

type MapCountry = Pick<
  CountryExplorerItem,
  "slug" | "name" | "emoji" | "region" | "visual"
>;

type CinematicPhase = "idle" | "locking" | "resolving" | "entering";

type WorldMapFeature = {
  name: string;
  isoA3: string;
  continent: string;
  label: [number, number];
  marker: boolean;
  path: string;
};

type WorldMapData = {
  version: number;
  source: string;
  sourceUrl: string;
  license: string;
  projection: string;
  viewBox: [number, number, number, number];
  features: WorldMapFeature[];
};

type MappedFeature = WorldMapFeature & {
  country?: MapCountry;
};

type CountriesWorldMapProps = {
  countries: MapCountry[];
  activeRegionId: CountryMapRegionId;
  selectedSlug: string;
  onCountryPreview: (slug: string) => void;
  onRegionChange: (regionId: CountryMapRegionId) => void;
};

const MAP_DATA_URL = "/maps/tgpi-world-countries-50m.json";

const CINEMATIC_PHASE_COPY: Record<Exclude<CinematicPhase, "idle">, string> = {
  locking: "Territory acquired",
  resolving: "Synchronizing evidence layers",
  entering: "Entering Country Intelligence",
};

const FEATURE_NAME_TO_SLUG: Readonly<Record<string, string>> = {
  "the bahamas": "bahamas",
  "republic of the congo": "congo",
  "federated states of micronesia": "micronesia",
  "republic of serbia": "serbia",
  "united republic of tanzania": "tanzania",
  "east timor": "timor-leste",
  "united states of america": "united-states",
  vatican: "vatican-city",
};

function normalizeCountryName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function isWorldMapData(value: unknown): value is WorldMapData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<WorldMapData>;

  return (
    Array.isArray(candidate.viewBox) &&
    candidate.viewBox.length === 4 &&
    Array.isArray(candidate.features) &&
    candidate.features.every(
      (feature) =>
        feature &&
        typeof feature.name === "string" &&
        typeof feature.path === "string" &&
        Array.isArray(feature.label),
    )
  );
}

function getZoomTransform(regionId: CountryMapRegionId) {
  const region =
    COUNTRY_MAP_REGIONS.find((candidate) => candidate.id === regionId) ??
    COUNTRY_MAP_REGIONS[0];
  const [x, y, width, height] = region.viewport;
  const scale = Math.min(1000 / width, 500 / height) * 0.92;
  const translateX = (1000 - width * scale) / 2 - x * scale;
  const translateY = (500 - height * scale) / 2 - y * scale;

  return { scale, translateX, translateY };
}

export default function CountriesWorldMap({
  countries,
  activeRegionId,
  selectedSlug,
  onCountryPreview,
  onRegionChange,
}: CountriesWorldMapProps) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const navigationTimersRef = useRef<number[]>([]);
  const prefetchedRoutesRef = useRef(new Set<string>());
  const [mapData, setMapData] = useState<WorldMapData | null>(null);
  const [mapError, setMapError] = useState("");
  const [cinematic, setCinematic] = useState<{
    phase: CinematicPhase;
    targetSlug: string;
  }>({ phase: "idle", targetSlug: "" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadMap() {
      try {
        const response = await fetch(MAP_DATA_URL, {
          cache: "force-cache",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Map request failed: ${response.status}`);

        const data: unknown = await response.json();
        if (!isWorldMapData(data)) throw new Error("Invalid map data format");

        startTransition(() => setMapData(data));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setMapError("The geographic layer could not be loaded. Use country search to continue.");
      }
    }

    void loadMap();
    return () => controller.abort();
  }, []);

  useEffect(
    () => () => {
      navigationTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  const countryBySlug = useMemo(
    () => new Map(countries.map((country) => [country.slug, country])),
    [countries],
  );

  const countryByName = useMemo(
    () =>
      new Map(
        countries.map((country) => [normalizeCountryName(country.name), country]),
      ),
    [countries],
  );

  const features = useMemo<MappedFeature[]>(() => {
    if (!mapData) return [];

    return mapData.features.map((feature) => {
      const normalizedName = normalizeCountryName(feature.name);
      const aliasSlug = FEATURE_NAME_TO_SLUG[normalizedName];
      const country = aliasSlug
        ? countryBySlug.get(aliasSlug)
        : countryByName.get(normalizedName);

      return { ...feature, country };
    });
  }, [countryByName, countryBySlug, mapData]);

  const interactiveCountries = useMemo(() => {
    const uniqueCountries = new Map<string, MapCountry>();
    features.forEach((feature) => {
      if (feature.country) uniqueCountries.set(feature.country.slug, feature.country);
    });

    return [...uniqueCountries.values()].sort((first, second) =>
      first.name.localeCompare(second.name),
    );
  }, [features]);

  const keyboardCountries = useMemo(() => {
    if (activeRegionId === "world") return interactiveCountries;
    const region = COUNTRY_MAP_REGIONS.find(
      (candidate) => candidate.id === activeRegionId,
    );
    if (!region) return interactiveCountries;

    // Map navigation follows the cartographic dataset, not UNSD's broader "Americas" region.
    const continents = new Map(features.map(feature => [feature.country?.slug, feature.continent]));
    return interactiveCountries.filter((country) =>
      region.sourceRegions.includes(continents.get(country.slug) ?? country.region),
    );
  }, [activeRegionId, interactiveCountries, features]);

  const selectedCountry = countryBySlug.get(selectedSlug);
  const selectedFeature = features.find(
    (feature) => feature.country?.slug === selectedSlug,
  );
  const zoom = getZoomTransform(activeRegionId);
  const selectedFeatureX = selectedFeature
    ? activeRegionId === "oceania" &&
      selectedFeature.country?.region === "Oceania" &&
      selectedFeature.label[0] < 150
      ? selectedFeature.label[0] + 1000
      : selectedFeature.label[0]
    : 0;

  const mapFocusPoint = useMemo(() => {
    const targetSlug = cinematic.targetSlug || selectedSlug;
    const feature = features.find(
      (candidate) => candidate.country?.slug === targetSlug,
    );
    if (!feature) return { x: 50, y: 50 };

    const labelX =
      activeRegionId === "oceania" &&
      feature.country?.region === "Oceania" &&
      feature.label[0] < 150
        ? feature.label[0] + 1000
        : feature.label[0];
    const screenX = labelX * zoom.scale + zoom.translateX;
    const screenY = feature.label[1] * zoom.scale + zoom.translateY;

    return {
      x: Math.max(5, Math.min(95, screenX / 10)),
      y: Math.max(8, Math.min(92, screenY / 5)),
    };
  }, [activeRegionId, cinematic.targetSlug, features, selectedSlug, zoom.scale, zoom.translateX, zoom.translateY]);

  function openCountry(slug: string) {
    if (cinematic.phase !== "idle") return;
    const route = `/countries/${slug}`;
    router.prefetch(route);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(route);
      return;
    }

    onCountryPreview(slug);
    setCinematic({ phase: "locking", targetSlug: slug });
    navigationTimersRef.current = [
      window.setTimeout(
        () => setCinematic({ phase: "resolving", targetSlug: slug }),
        290,
      ),
      window.setTimeout(
        () => setCinematic({ phase: "entering", targetSlug: slug }),
        610,
      ),
      window.setTimeout(() => router.push(route), 940),
    ];
  }

  function previewCountry(slug: string) {
    onCountryPreview(slug);
    const route = `/countries/${slug}`;
    if (!prefetchedRoutesRef.current.has(route)) {
      prefetchedRoutesRef.current.add(route);
      router.prefetch(route);
    }
  }

  function focusCountryByOffset(currentSlug: string, offset: number) {
    if (!keyboardCountries.length) return;
    const currentIndex = keyboardCountries.findIndex(
      (country) => country.slug === currentSlug,
    );
    const nextIndex =
      (currentIndex + offset + keyboardCountries.length) %
      keyboardCountries.length;
    const nextCountry = keyboardCountries[nextIndex];
    if (!nextCountry) return;
    const nextFeature = features.find(
      (feature) => feature.country?.slug === nextCountry.slug,
    );
    const usesPacificDuplicate =
      activeRegionId === "oceania" &&
      nextCountry.region === "Oceania" &&
      (nextFeature?.label[0] ?? 1000) < 150;
    const selector = usesPacificDuplicate
      ? `[data-country-slug="${nextCountry.slug}"][data-pacific-duplicate="true"]`
      : `[data-country-slug="${nextCountry.slug}"]`;

    onCountryPreview(nextCountry.slug);
    window.requestAnimationFrame(() => {
      svgRef.current
        ?.querySelector<SVGPathElement>(selector)
        ?.focus();
    });
  }

  function handleCountryKeyDown(
    event: React.KeyboardEvent<SVGPathElement>,
    slug: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCountry(slug);
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusCountryByOffset(slug, 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusCountryByOffset(slug, -1);
    }
  }

  return (
    <div className="relative mt-5">
      <div
        role="group"
        aria-label="Zoom the world map by region"
        className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {COUNTRY_MAP_REGIONS.map((region) => {
          const isActive = activeRegionId === region.id;
          return (
            <button
              key={region.id}
              type="button"
              aria-pressed={isActive}
              disabled={cinematic.phase !== "idle"}
              onClick={() => onRegionChange(region.id)}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-[9px] font-extrabold uppercase tracking-[0.1em] backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-50 ${
                isActive
                  ? "border-[var(--tgpi-gold-light)] bg-[var(--tgpi-gold)] text-[var(--tgpi-navy)]"
                  : "border-white/15 bg-white/[0.055] text-white/70 hover:border-[var(--tgpi-gold-light)]/60 hover:text-white"
              }`}
            >
              {region.label}
            </button>
          );
        })}
      </div>

      <div
        className="tgpi-map-cinematic-frame relative mt-3 h-[340px] overflow-hidden rounded-[26px] border border-white/12 bg-[#06172B] shadow-[inset_0_0_110px_rgba(56,113,158,.18),0_24px_70px_rgba(0,0,0,.2)] sm:h-[440px] lg:h-[500px]"
        data-phase={cinematic.phase}
        aria-busy={cinematic.phase !== "idle"}
        style={{
          "--tgpi-map-focus-x": `${mapFocusPoint.x}%`,
          "--tgpi-map-focus-y": `${mapFocusPoint.y}%`,
        } as React.CSSProperties}
      >
        <div className={`tgpi-map-canvas absolute inset-0 ${cinematic.phase === "idle" ? "" : "will-change-transform"}`}>
          <svg
            ref={svgRef}
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            aria-labelledby="tgpi-world-map-title tgpi-world-map-description"
            className="h-full w-full"
          >
          <title id="tgpi-world-map-title">TGPI interactive country map</title>
          <desc id="tgpi-world-map-description">
            Real country boundaries. Hover or focus a territory to preview it, then
            click or press Enter to open its country intelligence page. Use arrow keys
            to move between countries.
          </desc>
          <defs>
            <linearGradient id="tgpi-map-water" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#09213B" />
              <stop offset="0.5" stopColor="#0A2D4D" />
              <stop offset="1" stopColor="#031426" />
            </linearGradient>
            <pattern id="tgpi-map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9CC3DE" strokeOpacity="0.08" strokeWidth="0.7" />
            </pattern>
            <filter id="tgpi-map-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="1000" height="500" fill="url(#tgpi-map-water)" />
          <rect width="1000" height="500" fill="url(#tgpi-map-grid)" />
          <ellipse cx="500" cy="250" rx="485" ry="235" fill="none" stroke="#B7D5E8" strokeOpacity="0.08" />
          <ellipse cx="500" cy="250" rx="365" ry="176" fill="none" stroke="#B7D5E8" strokeOpacity="0.045" />
          <g aria-hidden="true" fill="none" stroke="#F2D997" strokeOpacity="0.16" strokeWidth="1.1" strokeDasharray="5 9">
            <path d="M176 196 Q356 60 525 191 T820 156" />
            <path d="M122 318 Q322 215 500 300 T886 286" />
            <path d="M300 90 Q488 215 714 88" />
          </g>
          <g aria-hidden="true" fill="#F2D997" opacity="0.55">
            <circle cx="176" cy="196" r="2.1" />
            <circle cx="525" cy="191" r="2.1" />
            <circle cx="820" cy="156" r="2.1" />
            <circle cx="500" cy="300" r="2.1" />
            <circle cx="714" cy="88" r="2.1" />
          </g>

          <g
            className="transition-transform duration-700 ease-out"
            style={{
              transform: `translate(${zoom.translateX}px, ${zoom.translateY}px) scale(${zoom.scale})`,
              transformOrigin: "0 0",
            }}
          >
            {features.map((feature) => {
              const country = feature.country;
              const isSelected = country?.slug === selectedSlug;
              const usesPacificDuplicate =
                activeRegionId === "oceania" &&
                country?.region === "Oceania" &&
                feature.label[0] < 150;

              return (
                <path
                  key={`${feature.isoA3}-${feature.name}`}
                  d={feature.path}
                  data-country-slug={country?.slug}
                  role={country ? "link" : undefined}
                  tabIndex={country && isSelected && !usesPacificDuplicate ? 0 : -1}
                  aria-label={country ? `Open ${country.name} country profile` : undefined}
                  aria-keyshortcuts={country ? "Enter ArrowLeft ArrowRight ArrowUp ArrowDown" : undefined}
                  onMouseEnter={country ? () => previewCountry(country.slug) : undefined}
                  onFocus={country ? () => previewCountry(country.slug) : undefined}
                  onClick={country ? () => openCountry(country.slug) : undefined}
                  onKeyDown={country ? (event) => handleCountryKeyDown(event, country.slug) : undefined}
                  vectorEffect="non-scaling-stroke"
                  className={`stroke-[0.72] transition-[fill,stroke,opacity] duration-200 focus-visible:outline-none ${
                    country
                      ? "cursor-pointer stroke-[#94BBD5]/45 hover:fill-[var(--tgpi-gold)] hover:stroke-[var(--tgpi-gold-light)] focus-visible:fill-[var(--tgpi-gold)] focus-visible:stroke-white"
                      : "pointer-events-none fill-[#0D2A45] stroke-white/10"
                  } ${
                    country && isSelected
                      ? "fill-[var(--tgpi-gold)] stroke-[var(--tgpi-gold-light)]"
                      : country
                        ? "fill-[#1A4A70]"
                        : ""
                  }`}
                >
                  <title>{country ? `${country.name} — open profile` : feature.name}</title>
                </path>
              );
            })}

            {activeRegionId === "oceania"
              ? features
                  .filter(
                    (feature) =>
                      feature.country?.region === "Oceania" && feature.label[0] < 150,
                  )
                  .map((feature) => {
                    const country = feature.country;
                    if (!country) return null;
                    const isSelected = country.slug === selectedSlug;

                    return (
                      <path
                        key={`pacific-${feature.isoA3}-${feature.name}`}
                        d={feature.path}
                        transform="translate(1000 0)"
                        data-country-slug={country.slug}
                        data-pacific-duplicate="true"
                        role="link"
                        tabIndex={isSelected ? 0 : -1}
                        aria-label={`Open ${country.name} country profile`}
                        aria-keyshortcuts="Enter ArrowLeft ArrowRight ArrowUp ArrowDown"
                        onMouseEnter={() => previewCountry(country.slug)}
                        onFocus={() => previewCountry(country.slug)}
                        onClick={() => openCountry(country.slug)}
                        onKeyDown={(event) => handleCountryKeyDown(event, country.slug)}
                        vectorEffect="non-scaling-stroke"
                        className={`cursor-pointer stroke-[0.72] transition-[fill,stroke] duration-200 hover:fill-[var(--tgpi-gold)] hover:stroke-[var(--tgpi-gold-light)] focus-visible:fill-[var(--tgpi-gold)] focus-visible:stroke-white focus-visible:outline-none ${
                          isSelected
                            ? "fill-[var(--tgpi-gold)] stroke-[var(--tgpi-gold-light)]"
                            : "fill-[#1A4A70] stroke-[#94BBD5]/45"
                        }`}
                      >
                        <title>{country.name} — open profile</title>
                      </path>
                    );
                  })
              : null}

            {features.map((feature) => {
              const country = feature.country;
              if (!feature.marker || !country) return null;
              const isSelected = country.slug === selectedSlug;
              const hitRadius = 5.5 / zoom.scale;
              const visualRadius = (isSelected ? 2.4 : 1.65) / zoom.scale;

              return (
                <g
                  key={`marker-${feature.isoA3}-${feature.name}`}
                  aria-hidden="true"
                  className="cursor-pointer"
                  onMouseEnter={() => previewCountry(country.slug)}
                  onClick={() => openCountry(country.slug)}
                >
                  <circle cx={feature.label[0]} cy={feature.label[1]} r={hitRadius} fill="transparent" />
                  <circle
                    cx={feature.label[0]}
                    cy={feature.label[1]}
                    r={visualRadius}
                    fill={isSelected ? "#F0D58C" : "#C59632"}
                    stroke="#FFF7DE"
                    strokeWidth={0.75 / zoom.scale}
                    filter={isSelected ? "url(#tgpi-map-glow)" : undefined}
                  />
                </g>
              );
            })}

            {activeRegionId === "oceania"
              ? features
                  .filter(
                    (feature) =>
                      feature.marker &&
                      feature.country?.region === "Oceania" &&
                      feature.label[0] < 150,
                  )
                  .map((feature) => {
                    const country = feature.country;
                    if (!country) return null;
                    const isSelected = country.slug === selectedSlug;

                    return (
                      <g
                        key={`pacific-marker-${feature.isoA3}-${feature.name}`}
                        aria-hidden="true"
                        className="cursor-pointer"
                        onMouseEnter={() => previewCountry(country.slug)}
                        onClick={() => openCountry(country.slug)}
                      >
                        <circle cx={feature.label[0] + 1000} cy={feature.label[1]} r={5.5 / zoom.scale} fill="transparent" />
                        <circle
                          cx={feature.label[0] + 1000}
                          cy={feature.label[1]}
                          r={(isSelected ? 2.4 : 1.65) / zoom.scale}
                          fill={isSelected ? "#F0D58C" : "#C59632"}
                          stroke="#FFF7DE"
                          strokeWidth={0.75 / zoom.scale}
                          filter={isSelected ? "url(#tgpi-map-glow)" : undefined}
                        />
                      </g>
                    );
                  })
              : null}

            {selectedFeature ? (
              <g aria-hidden="true" pointerEvents="none">
                <circle
                  cx={selectedFeatureX}
                  cy={selectedFeature.label[1]}
                  r={8 / zoom.scale}
                  fill="none"
                  stroke="#F2D997"
                  strokeOpacity="0.7"
                  strokeWidth={0.8 / zoom.scale}
                  strokeDasharray={`${2.5 / zoom.scale} ${2 / zoom.scale}`}
                />
                <circle
                  cx={selectedFeatureX}
                  cy={selectedFeature.label[1]}
                  r={13 / zoom.scale}
                  fill="none"
                  stroke="#F2D997"
                  strokeOpacity="0.24"
                  strokeWidth={0.6 / zoom.scale}
                />
              </g>
            ) : null}
          </g>
          </svg>
        </div>

        {!mapData && !mapError ? (
          <div className="absolute inset-0 grid place-items-center bg-[#06172B]/70 backdrop-blur-sm" role="status">
            <div className="text-center">
              <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-[var(--tgpi-gold)]" />
              <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/60">Loading real borders</p>
            </div>
          </div>
        ) : null}

        {mapError ? (
          <div className="absolute inset-4 grid place-items-center rounded-2xl border border-[#F0D58C]/25 bg-[#071A32]/95 p-6 text-center" role="status">
            <p className="max-w-sm text-sm font-bold leading-6 text-white">{mapError}</p>
          </div>
        ) : null}

        {selectedCountry && mapData && cinematic.phase === "idle" ? (
          <div key={selectedCountry.slug} className="tgpi-map-preview pointer-events-none absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-2xl border border-white/15 bg-[#041426]/90 p-2 pr-4 text-white shadow-2xl backdrop-blur-md sm:max-w-[330px]">
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
              <Image
                src={selectedCountry.visual.url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-gold-light)]">Intelligence preview</p>
              <p className="mt-0.5 truncate text-sm font-extrabold">{selectedCountry.emoji} {selectedCountry.name}</p>
              <p className="truncate text-[9px] font-bold text-white/55">Open source-linked country research</p>
            </div>
          </div>
        ) : null}

        {mapData ? (
          <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/10 bg-[#041426]/75 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/65 backdrop-blur">
            {interactiveCountries.length}/{countries.length} profiles mapped
          </div>
        ) : null}

        {cinematic.phase !== "idle" ? (
          <div className="tgpi-map-transition pointer-events-none absolute inset-0 z-20 overflow-hidden bg-[#020A14]/30" role="status" aria-live="polite">
            <div className="tgpi-map-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--tgpi-gold-light)] to-transparent shadow-[0_0_18px_rgba(242,217,151,.9)]" />
            <div className="tgpi-map-reticle absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--tgpi-gold-light)]/70" style={{ left: `${mapFocusPoint.x}%`, top: `${mapFocusPoint.y}%` }}>
              <span className="absolute inset-3 rounded-full border border-dashed border-white/55" />
              <span className="absolute left-1/2 top-[-18px] h-[148px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--tgpi-gold-light)]/70 to-transparent" />
              <span className="absolute left-[-18px] top-1/2 h-px w-[148px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--tgpi-gold-light)]/70 to-transparent" />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-[var(--tgpi-gold-light)]/30 bg-[#020A14]/86 p-4 text-white shadow-2xl backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[360px]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">TGPI Geospatial Link</p>
                <span className="font-mono text-[9px] text-white/45">{cinematic.phase === "locking" ? "01" : cinematic.phase === "resolving" ? "02" : "03"}/03</span>
              </div>
              <p className="mt-2 font-[var(--tgpi-font-display)] text-xl font-semibold">{CINEMATIC_PHASE_COPY[cinematic.phase]}</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="tgpi-map-progress h-full rounded-full bg-[var(--tgpi-gold-light)]" />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">
        <span>Hover to preview · Click to enter</span>
        <span>Keyboard: arrows + Enter</span>
      </div>
      <p className="mt-2 text-[9px] leading-4 text-white/35">
        Boundary reference: Natural Earth de facto cartography. Disputed areas may vary
        by legal or political point of view.
      </p>
    </div>
  );
}
