"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CountryExplorerItem } from "@/lib/countries";
import {
  COUNTRY_MAP_REGIONS,
  type CountryMapRegionId,
} from "@/lib/country-map";

type MapCountry = Pick<
  CountryExplorerItem,
  "slug" | "name" | "emoji" | "region"
>;

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
  const [mapData, setMapData] = useState<WorldMapData | null>(null);
  const [mapError, setMapError] = useState("");

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

    return interactiveCountries.filter((country) =>
      region.sourceRegions.includes(country.region),
    );
  }, [activeRegionId, interactiveCountries]);

  const selectedCountry = countryBySlug.get(selectedSlug);
  const zoom = getZoomTransform(activeRegionId);

  function openCountry(slug: string) {
    router.push(`/countries/${slug}`);
  }

  function previewCountry(slug: string) {
    onCountryPreview(slug);
    router.prefetch(`/countries/${slug}`);
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
              onClick={() => onRegionChange(region.id)}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-[9px] font-extrabold uppercase tracking-[0.1em] backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
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

      <div className="relative mt-3 h-[340px] overflow-hidden rounded-[26px] border border-white/12 bg-[#06172B] shadow-[inset_0_0_110px_rgba(56,113,158,.18),0_24px_70px_rgba(0,0,0,.2)] sm:h-[440px] lg:h-[500px]">
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
          </g>
        </svg>

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

        {selectedCountry && mapData ? (
          <div className="pointer-events-none absolute bottom-3 left-3 max-w-[75%] rounded-2xl border border-white/15 bg-[#041426]/88 px-4 py-3 text-white shadow-xl backdrop-blur-md">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[var(--tgpi-gold-light)]">Selected territory</p>
            <p className="mt-1 truncate text-sm font-extrabold">{selectedCountry.emoji} {selectedCountry.name}</p>
          </div>
        ) : null}

        {mapData ? (
          <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/10 bg-[#041426]/75 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/65 backdrop-blur">
            {interactiveCountries.length}/{countries.length} profiles mapped
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">
        <span>Hover to preview · Click to open</span>
        <span>Keyboard: arrows + Enter</span>
      </div>
      <p className="mt-2 text-[9px] leading-4 text-white/35">
        Boundary reference: Natural Earth de facto cartography. Disputed areas may vary
        by legal or political point of view.
      </p>
    </div>
  );
}
