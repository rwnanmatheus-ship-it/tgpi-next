"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { CountryExplorerItem } from "@/lib/countries";

type AtlasRegionId =
  | "north-america"
  | "south-america"
  | "europe"
  | "africa"
  | "asia"
  | "oceania";

type AtlasRegion = {
  id: AtlasRegionId;
  label: string;
  sourceRegions: readonly string[];
  position: { left: string; top: string };
};

type CountriesWorldJourneyProps = {
  countries: CountryExplorerItem[];
};

const ATLAS_REGIONS: readonly AtlasRegion[] = [
  {
    id: "north-america",
    label: "North America",
    sourceRegions: ["North America"],
    position: { left: "23%", top: "28%" },
  },
  {
    id: "south-america",
    label: "South America",
    sourceRegions: ["South America"],
    position: { left: "34%", top: "65%" },
  },
  {
    id: "europe",
    label: "Europe",
    sourceRegions: ["Europe", "Europe / Asia"],
    position: { left: "51%", top: "26%" },
  },
  {
    id: "africa",
    label: "Africa",
    sourceRegions: ["Africa", "Africa / Middle East"],
    position: { left: "53%", top: "57%" },
  },
  {
    id: "asia",
    label: "Asia",
    sourceRegions: ["Asia", "Asia / Europe"],
    position: { left: "72%", top: "33%" },
  },
  {
    id: "oceania",
    label: "Oceania",
    sourceRegions: ["Oceania"],
    position: { left: "83%", top: "69%" },
  },
] as const;

const MAX_VISIBLE_DESTINATIONS = 8;

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getSearchText(country: CountryExplorerItem) {
  return normalizeText(
    [
      country.name,
      country.slug,
      country.capital,
      country.region,
      country.language,
      country.currency,
      country.currencyCode,
      ...country.tags,
    ].join(" "),
  );
}

function getCostLabel(costLevel: CountryExplorerItem["costLevel"]) {
  if (costLevel === "low") return "Accessible";
  if (costLevel === "medium") return "Balanced";
  return "Premium";
}

export default function CountriesWorldJourney({
  countries,
}: CountriesWorldJourneyProps) {
  const [activeRegionId, setActiveRegionId] =
    useState<AtlasRegionId>("europe");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(
    () => countries.find((country) => country.slug === "portugal")?.slug ?? countries[0]?.slug ?? "",
  );
  const deferredQuery = useDeferredValue(query);

  const activeRegion =
    ATLAS_REGIONS.find((region) => region.id === activeRegionId) ?? ATLAS_REGIONS[2];

  const countriesByRegion = useMemo(
    () =>
      ATLAS_REGIONS.reduce<Record<AtlasRegionId, CountryExplorerItem[]>>(
        (result, region) => {
          result[region.id] = countries
            .filter((country) =>
              region.sourceRegions.some(
                (sourceRegion) => sourceRegion === country.region,
              ),
            )
            .sort(
              (first, second) =>
                second.tgpiScore - first.tgpiScore ||
                first.name.localeCompare(second.name),
            );
          return result;
        },
        {
          "north-america": [],
          "south-america": [],
          europe: [],
          africa: [],
          asia: [],
          oceania: [],
        },
      ),
    [countries],
  );

  const normalizedQuery = normalizeText(deferredQuery.trim());
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];

    return countries
      .filter((country) => getSearchText(country).includes(normalizedQuery))
      .sort(
        (first, second) =>
          second.tgpiScore - first.tgpiScore || first.name.localeCompare(second.name),
      );
  }, [countries, normalizedQuery]);

  const contextCountries = normalizedQuery
    ? searchResults
    : countriesByRegion[activeRegion.id];
  const visibleCountries = contextCountries.slice(0, MAX_VISIBLE_DESTINATIONS);
  const selectedCountry =
    countries.find((country) => country.slug === selectedSlug) ?? countries[0];

  function selectRegion(region: AtlasRegion) {
    setActiveRegionId(region.id);
    setQuery("");
    const firstCountry = countriesByRegion[region.id][0];
    if (firstCountry) setSelectedSlug(firstCountry.slug);
  }

  function showNextDestination() {
    const currentIndex = countries.findIndex(
      (country) => country.slug === selectedCountry?.slug,
    );
    const nextCountry = countries[(currentIndex + 37) % countries.length];
    if (nextCountry) setSelectedSlug(nextCountry.slug);
  }

  if (!selectedCountry) return null;

  return (
    <section
      id="world-journey"
      aria-labelledby="world-journey-title"
      className="mt-10 scroll-mt-24 overflow-hidden rounded-[34px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-premium)]"
    >
      <div className="grid gap-5 border-b border-[var(--tgpi-border)] p-6 sm:p-8 lg:grid-cols-[1fr_.66fr] lg:items-end lg:p-10">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
            TGPI Interactive World Atlas
          </p>
          <h2
            id="world-journey-title"
            className="mt-3 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[var(--tgpi-navy)]"
          >
            Choose a place. Begin a journey of understanding.
          </h2>
        </div>
        <p className="text-sm leading-7 text-[var(--tgpi-muted)]">
          Select a world region or search all {countries.length} country profiles by
          country, capital, language or currency. Every destination opens its own TGPI
          intelligence journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_.92fr]">
        <div className="relative min-h-[500px] overflow-hidden border-b border-white/10 bg-[var(--tgpi-navy-deep)] p-5 text-white sm:min-h-[620px] sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_50%_45%,rgba(31,80,124,.58),transparent_46%),linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:auto,38px_38px,38px_38px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[8%] rounded-[50%] border border-white/10 shadow-[inset_0_0_90px_rgba(72,135,185,.13)]"
          />
          <div aria-hidden="true" className="absolute left-[8%] top-[19%] h-[25%] w-[29%] -rotate-6 rounded-[48%_38%_58%_40%] border border-white/10 bg-white/[0.04]" />
          <div aria-hidden="true" className="absolute left-[26%] top-[47%] h-[34%] w-[14%] rotate-12 rounded-[43%_58%_72%_35%] border border-white/10 bg-white/[0.04]" />
          <div aria-hidden="true" className="absolute left-[44%] top-[18%] h-[18%] w-[16%] rotate-3 rounded-[42%_60%_36%_58%] border border-white/10 bg-white/[0.04]" />
          <div aria-hidden="true" className="absolute left-[44%] top-[39%] h-[35%] w-[18%] -rotate-3 rounded-[44%_55%_68%_40%] border border-white/10 bg-white/[0.04]" />
          <div aria-hidden="true" className="absolute left-[57%] top-[18%] h-[31%] w-[31%] rotate-3 rounded-[38%_58%_42%_64%] border border-white/10 bg-white/[0.04]" />
          <div aria-hidden="true" className="absolute left-[75%] top-[57%] h-[20%] w-[17%] rotate-12 rounded-[48%_56%_42%_63%] border border-white/10 bg-white/[0.04]" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                Step 1 · Choose a region
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/65">
                The atlas groups hybrid territories into their closest navigation region.
              </p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/70">
              {countries.length} profiles
            </span>
          </div>

          <div
            role="group"
            aria-label="Choose a world region"
            className="absolute inset-x-4 bottom-16 top-24 sm:inset-x-8 sm:bottom-20 sm:top-28 lg:inset-x-10"
          >
            {ATLAS_REGIONS.map((region) => {
              const isActive = activeRegion.id === region.id;
              const regionCount = countriesByRegion[region.id].length;

              return (
                <button
                  key={region.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${region.label}, ${regionCount} country profiles`}
                  onClick={() => selectRegion(region)}
                  style={region.position}
                  className={`absolute min-h-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left shadow-xl backdrop-blur-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-4 sm:py-3 ${
                    isActive
                      ? "z-10 scale-105 border-[var(--tgpi-gold-light)] bg-[var(--tgpi-gold)] text-[var(--tgpi-navy)]"
                      : "border-white/20 bg-[#071A32]/85 text-white hover:-translate-y-[55%] hover:border-[var(--tgpi-gold-light)] hover:bg-[#102D50]"
                  }`}
                >
                  <span className="block whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.08em] sm:text-xs">
                    {region.label}
                  </span>
                  <span
                    className={`mt-1 block text-[9px] font-bold ${
                      isActive ? "text-[var(--tgpi-navy)]/70" : "text-white/55"
                    }`}
                  >
                    {regionCount} countries
                  </span>
                </button>
              );
            })}
          </div>

          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45 sm:inset-x-8 lg:inset-x-10">
            <span>Region → country → intelligence</span>
            <span className="text-[var(--tgpi-gold-light)]">Explore with purpose</span>
          </div>
        </div>

        <div className="flex flex-col bg-[#FFFDF8] p-5 sm:p-8 lg:p-10">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
              Step 2 · Choose your destination
            </p>
            <label htmlFor="world-country-search" className="mt-3 block text-sm font-extrabold text-[var(--tgpi-navy)]">
              Search the world
            </label>
            <div className="relative mt-2">
              <input
                id="world-country-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Country, capital, language or currency…"
                className="min-h-14 w-full rounded-2xl border border-[var(--tgpi-border)] bg-white px-4 pr-24 text-sm font-semibold text-[var(--tgpi-navy)] shadow-sm outline-none transition placeholder:text-[var(--tgpi-muted)]/75 focus:border-[var(--tgpi-gold)] focus:ring-4 focus:ring-[var(--tgpi-gold)]/15"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-2 min-h-10 rounded-xl px-3 text-xs font-extrabold text-[var(--tgpi-muted)] transition hover:bg-[var(--tgpi-gold-soft)] hover:text-[var(--tgpi-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
                >
                  Clear
                </button>
              ) : (
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[var(--tgpi-gold-strong)]" aria-hidden="true">
                  ⌕
                </span>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div aria-live="polite">
              <p className="text-xs font-extrabold text-[var(--tgpi-navy)]">
                {normalizedQuery ? `Search results for “${deferredQuery.trim()}”` : activeRegion.label}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--tgpi-muted)]">
                {contextCountries.length} {contextCountries.length === 1 ? "destination" : "destinations"}
              </p>
            </div>
            <button
              type="button"
              onClick={showNextDestination}
              className="min-h-10 rounded-xl border border-[var(--tgpi-border)] bg-white px-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              Surprise me
            </button>
          </div>

          <nav aria-label="Country destinations" className="mt-4 grid grid-cols-2 gap-2">
            {visibleCountries.map((country) => {
              const isSelected = country.slug === selectedCountry.slug;
              return (
                <Link
                  key={country.slug}
                  href={`/countries/${country.slug}`}
                  onMouseEnter={() => setSelectedSlug(country.slug)}
                  onFocus={() => setSelectedSlug(country.slug)}
                  aria-label={`Begin the TGPI journey for ${country.name}`}
                  className={`group flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${
                    isSelected
                      ? "border-[var(--tgpi-gold)] bg-[var(--tgpi-gold-soft)] text-[var(--tgpi-navy)]"
                      : "border-[var(--tgpi-border)] bg-white text-[var(--tgpi-navy)] hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold-soft)]"
                  }`}
                >
                  <span aria-hidden="true" className="text-lg">{country.emoji}</span>
                  <span className="min-w-0 flex-1 truncate">{country.name}</span>
                  <span aria-hidden="true" className="text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-0.5">→</span>
                </Link>
              );
            })}
          </nav>

          {contextCountries.length > MAX_VISIBLE_DESTINATIONS ? (
            <p className="mt-3 text-xs leading-5 text-[var(--tgpi-muted)]">
              Showing {MAX_VISIBLE_DESTINATIONS} high-readiness destinations. Refine your
              search or use the complete explorer below to see all {contextCountries.length}.
            </p>
          ) : null}

          {contextCountries.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-[var(--tgpi-border)] bg-white p-5 text-sm leading-6 text-[var(--tgpi-muted)]">
              No country matches this search. Try the country name, its capital, a language
              or its currency code.
            </div>
          ) : null}

          <article className="relative mt-6 min-h-[270px] overflow-hidden rounded-[26px] border border-white/15 bg-[var(--tgpi-navy-deep)] text-white shadow-[0_24px_60px_rgba(7,26,50,.22)]">
            {selectedCountry.visual.hasImage ? (
              <Image
                src={selectedCountry.visual.url}
                alt={selectedCountry.visual.alt}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover opacity-45"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,74,.35),transparent_35%),linear-gradient(135deg,#173B60,#071A32_60%,#041426)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A32] via-[#071A32]/80 to-[#071A32]/30" />
            <div className="relative flex min-h-[270px] flex-col justify-end p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-3xl" aria-hidden="true">{selectedCountry.emoji}</p>
                  <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                    {selectedCountry.region} · {selectedCountry.capital}
                  </p>
                  <h3 className="mt-1 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none text-white">
                    {selectedCountry.name}
                  </h3>
                </div>
                <div className="rounded-2xl border border-[var(--tgpi-gold-light)]/35 bg-[#071A32]/80 px-3 py-2 text-center backdrop-blur">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-gold-light)]">TGPI score</p>
                  <p className="mt-1 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-none">{selectedCountry.tgpiScore}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <JourneyMetric label="Cost" value={getCostLabel(selectedCountry.costLevel)} />
                <JourneyMetric label="Safety" value={`${selectedCountry.intelligence.safetyScore}/100`} />
                <JourneyMetric label="English" value={`${selectedCountry.intelligence.englishFriendliness}/100`} />
              </div>

              <Link
                href={`/countries/${selectedCountry.slug}`}
                className="mt-4 inline-flex min-h-12 items-center justify-between rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[#D4AA49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Begin the {selectedCountry.name} journey
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          <a
            href="#country-explorer"
            className="mt-5 inline-flex min-h-11 items-center justify-center text-xs font-extrabold text-[var(--tgpi-navy)] underline decoration-[var(--tgpi-gold)] decoration-2 underline-offset-4 transition hover:text-[var(--tgpi-gold-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            Open advanced filters and compare countries
          </a>
        </div>
      </div>
    </section>
  );
}

function JourneyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/12 bg-white/[0.07] p-3 backdrop-blur">
      <p className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-white/55">{label}</p>
      <p className="mt-1 truncate text-xs font-extrabold text-white">{value}</p>
    </div>
  );
}
