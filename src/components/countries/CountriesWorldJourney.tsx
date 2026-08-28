"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import CountriesWorldMap from "@/components/countries/CountriesWorldMap";
import type { CountryExplorerItem } from "@/lib/countries";
import {
  COUNTRY_MAP_REGIONS,
  getCountryMapRegionId,
  type CountryMapRegionId,
} from "@/lib/country-map";

type CountriesWorldJourneyProps = { countries: CountryExplorerItem[] };

const MAX_VISIBLE_DESTINATIONS = 6;

function normalizeText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getSearchText(country: CountryExplorerItem) {
  return normalizeText([
    country.name,
    country.slug,
    country.capital,
    country.region,
    country.language,
    country.currency,
    country.currencyCode,
    ...country.tags,
  ].join(" "));
}

function getCostLabel(costLevel: CountryExplorerItem["costLevel"]) {
  if (costLevel === "low") return "Accessible";
  if (costLevel === "medium") return "Balanced";
  return "Premium";
}

export default function CountriesWorldJourney({ countries }: CountriesWorldJourneyProps) {
  const [activeRegionId, setActiveRegionId] = useState<CountryMapRegionId>("world");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(
    () => countries.find((country) => country.slug === "portugal")?.slug ?? countries[0]?.slug ?? "",
  );
  const deferredQuery = useDeferredValue(query);

  const countriesByRegion = useMemo(
    () => COUNTRY_MAP_REGIONS.reduce<Record<CountryMapRegionId, CountryExplorerItem[]>>(
      (result, region) => {
        result[region.id] = (region.id === "world"
          ? countries
          : countries.filter((country) =>
              region.sourceRegions.some((sourceRegion) => sourceRegion === country.region),
            )
        ).toSorted(
          (first, second) => second.tgpiScore - first.tgpiScore || first.name.localeCompare(second.name),
        );
        return result;
      },
      {
        world: [],
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

  const activeRegion = COUNTRY_MAP_REGIONS.find((region) => region.id === activeRegionId) ?? COUNTRY_MAP_REGIONS[0];
  const normalizedQuery = normalizeText(deferredQuery.trim());
  const contextCountries = useMemo(() => {
    if (!normalizedQuery) return countriesByRegion[activeRegionId];
    return countries
      .filter((country) => getSearchText(country).includes(normalizedQuery))
      .toSorted(
        (first, second) => second.tgpiScore - first.tgpiScore || first.name.localeCompare(second.name),
      );
  }, [activeRegionId, countries, countriesByRegion, normalizedQuery]);
  const visibleCountries = contextCountries.slice(0, MAX_VISIBLE_DESTINATIONS);
  const selectedCountry = countries.find((country) => country.slug === selectedSlug) ?? countries[0];

  function selectRegion(regionId: CountryMapRegionId) {
    setActiveRegionId(regionId);
    setQuery("");
    if (regionId === "world") return;
    const firstCountry = countriesByRegion[regionId][0];
    if (firstCountry) setSelectedSlug(firstCountry.slug);
  }

  function showNextDestination() {
    if (!selectedCountry) return;
    const currentIndex = countries.findIndex((country) => country.slug === selectedCountry.slug);
    const nextCountry = countries[(currentIndex + 37) % countries.length];
    if (!nextCountry) return;
    setSelectedSlug(nextCountry.slug);
    setActiveRegionId(getCountryMapRegionId(nextCountry.region));
  }

  if (!selectedCountry) return null;

  return (
    <section
      id="world-journey"
      aria-labelledby="world-journey-title"
      className="mt-8 scroll-mt-24 overflow-hidden rounded-[34px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-premium)]"
    >
      <div className="grid gap-5 border-b border-[var(--tgpi-border)] p-6 sm:p-8 lg:grid-cols-[1fr_.54fr] lg:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
            TGPI Interactive World Atlas
          </p>
          <h2
            id="world-journey-title"
            className="mt-3 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.65rem,5vw,4.35rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[var(--tgpi-navy)]"
          >
            Move from territory to decision in one frame.
          </h2>
        </div>
        <div>
          <p className="text-sm leading-7 text-[var(--tgpi-muted)]">
            Inspect real country boundaries, preview each destination and move from geography to an evidence-backed dossier in one continuous system.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[9px] font-extrabold uppercase tracking-[0.12em]">
            <span className="rounded-full bg-[var(--tgpi-blue-soft)] px-3 py-2 text-[var(--tgpi-blue)]">Natural Earth · 50m</span>
            <span className="rounded-full bg-[var(--tgpi-teal-soft)] px-3 py-2 text-[var(--tgpi-teal)]">{countries.length}/{countries.length} profiles mapped</span>
            <span className="rounded-full bg-[var(--tgpi-gold-soft)] px-3 py-2 text-[var(--tgpi-gold-strong)]">Intent-aware preloading</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.48fr_.52fr]">
        <div className="relative overflow-hidden border-b border-white/10 bg-[var(--tgpi-navy-deep)] p-5 text-white sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(36,87,127,.42),transparent_45%),radial-gradient(circle_at_8%_85%,rgba(46,103,104,.22),transparent_34%)]" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">Geographic intelligence layer</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Hover or focus to preview. Select a territory to activate the geospatial link and enter its full country dossier.</p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/65">Real boundaries · Accessible motion</span>
          </div>
          <div className="relative">
            <CountriesWorldMap
              countries={countries}
              activeRegionId={activeRegionId}
              selectedSlug={selectedCountry.slug}
              onCountryPreview={setSelectedSlug}
              onRegionChange={selectRegion}
            />
          </div>
        </div>

        <aside className="flex flex-col bg-[#FFFDF8] p-5 sm:p-7 lg:p-8" aria-label="Selected country intelligence preview">
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Country navigator</p>
              <button
                type="button"
                onClick={showNextDestination}
                className="min-h-9 rounded-xl border border-[var(--tgpi-border)] bg-white px-3 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
              >
                Surprise me
              </button>
            </div>
            <label htmlFor="world-country-search" className="sr-only">Search all countries</label>
            <div className="relative mt-3">
              <input
                id="world-country-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Country, capital, language…"
                className="min-h-12 w-full rounded-2xl border border-[var(--tgpi-border)] bg-white px-4 pr-16 text-sm font-semibold text-[var(--tgpi-navy)] shadow-sm outline-none transition placeholder:text-[var(--tgpi-muted)]/75 focus:border-[var(--tgpi-gold)] focus:ring-4 focus:ring-[var(--tgpi-gold)]/15"
              />
              {query ? (
                <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 min-h-9 -translate-y-1/2 rounded-xl px-3 text-[10px] font-extrabold text-[var(--tgpi-muted)] hover:bg-[var(--tgpi-gold-soft)]">Clear</button>
              ) : (
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--tgpi-gold-strong)]" aria-hidden="true">⌕</span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3" aria-live="polite">
            <div>
              <p className="text-xs font-extrabold text-[var(--tgpi-navy)]">{normalizedQuery ? `Results for “${deferredQuery.trim()}”` : activeRegion.label}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--tgpi-muted)]">{contextCountries.length} destinations</p>
            </div>
            <a href="#country-explorer" className="text-[10px] font-extrabold text-[var(--tgpi-gold-strong)] underline decoration-[var(--tgpi-gold)] underline-offset-4">Advanced index</a>
          </div>

          {visibleCountries.length ? (
            <nav aria-label="Country destinations" className="mt-3 grid grid-cols-2 gap-2">
              {visibleCountries.map((country) => {
                const isSelected = country.slug === selectedCountry.slug;
                return (
                  <button
                    key={country.slug}
                    type="button"
                    onClick={() => setSelectedSlug(country.slug)}
                    className={`flex min-h-10 min-w-0 items-center gap-2 rounded-xl border px-3 text-left text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${isSelected ? "border-[var(--tgpi-gold)] bg-[var(--tgpi-gold-soft)] text-[var(--tgpi-navy)]" : "border-[var(--tgpi-border)] bg-white text-[var(--tgpi-navy)] hover:border-[var(--tgpi-gold)]"}`}
                  >
                    <span aria-hidden="true">{country.emoji}</span>
                    <span className="truncate">{country.name}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <p className="mt-3 rounded-2xl border border-dashed border-[var(--tgpi-border)] bg-white p-4 text-sm leading-6 text-[var(--tgpi-muted)]">No country matches this search. Try a capital, language or currency code.</p>
          )}

          <article className="relative mt-5 min-h-[260px] overflow-hidden rounded-[24px] border border-white/15 bg-[var(--tgpi-navy-deep)] text-white shadow-[0_24px_60px_rgba(7,26,50,.2)]">
            <Image
              src={selectedCountry.visual.url}
              alt={selectedCountry.visual.alt}
              fill
              quality={84}
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031426] via-[#031426]/76 to-[#031426]/15" />
            <div className="relative flex min-h-[260px] flex-col justify-end p-5">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-gold-light)]">{selectedCountry.region} · {selectedCountry.capital}</p>
                  <h3 className="mt-1 truncate font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">{selectedCountry.emoji} {selectedCountry.name}</h3>
                </div>
                <div className="shrink-0 rounded-xl border border-[var(--tgpi-gold-light)]/35 bg-[#031426]/80 px-3 py-2 text-center backdrop-blur">
                  <p className="text-[7px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-gold-light)]">TGPI signal</p>
                  <p className="font-[var(--tgpi-font-display)] text-2xl font-semibold">{selectedCountry.tgpiScore}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <JourneyMetric label="Cost" value={getCostLabel(selectedCountry.costLevel)} />
                <JourneyMetric label="Safety" value={`${selectedCountry.intelligence.safetyScore}/100`} />
                <JourneyMetric label="English" value={`${selectedCountry.intelligence.englishFriendliness}/100`} />
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                <Link href={`/countries/${selectedCountry.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--tgpi-gold)] px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:bg-[#D4AA49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Open dossier →</Link>
                <Link href={`/compare?country=${selectedCountry.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-[#031426]/70 px-4 text-xs font-extrabold text-white backdrop-blur transition hover:border-[var(--tgpi-gold-light)]">Compare</Link>
              </div>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}

function JourneyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/12 bg-[#031426]/64 p-2.5 backdrop-blur">
      <p className="text-[7px] font-extrabold uppercase tracking-[0.1em] text-white/55">{label}</p>
      <p className="mt-1 truncate text-[11px] font-extrabold text-white">{value}</p>
    </div>
  );
}
