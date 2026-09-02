// src/components/countries/CountryCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { CountryExplorerItem } from "@/lib/countries";

type CountryCardCountry = Omit<CountryExplorerItem, "visual"> & {
  visual?: CountryExplorerItem["visual"];
};

type CountryCardProps = { country: CountryCardCountry };

function getScoreTone(score: number) {
  if (score >= 88) {
    return {
      label: "Elite fit",
      className: "border-[#D9BD70] bg-[#FFF7DE] text-[#765009]",
    };
  }
  if (score >= 78) {
    return {
      label: "Strong fit",
      className: "border-[#C8D7EF] bg-[#EEF5FF] text-[#123A6F]",
    };
  }
  return {
    label: "Consider",
    className: "border-[#E7E0D3] bg-[#FBF8F1] text-[#5B6472]",
  };
}

function getCostTone(costLevel: CountryExplorerItem["costLevel"]) {
  if (costLevel === "low") return "Accessible";
  if (costLevel === "medium") return "Balanced";
  return "Premium";
}

function getDifficultyTone(difficulty: CountryExplorerItem["difficulty"]) {
  if (difficulty === "easy") return "Low friction";
  if (difficulty === "medium") return "Moderate";
  return "High discipline";
}

function getRiskLabel(country: CountryCardCountry) {
  if (country.difficulty === "easy") return "Low adaptation friction";
  if (country.difficulty === "medium") return "Moderate adaptation friction";
  return "High adaptation discipline required";
}

function getVisualBadgeLabel(country: CountryCardCountry) {
  return country.visual?.hasImage ? "Original TGPI art" : "TGPI country profile";
}

export function CountryCard({ country }: CountryCardProps) {
  const scoreTone = getScoreTone(country.tgpiScore);
  const imageUrl = country.visual?.url ?? "";
  const imageAlt = country.visual?.alt ?? `TGPI country profile for ${country.name}, focused on ${country.capital}.`;
  const hasImage = country.visual?.hasImage ?? false;

  return (
    <article className="mobile-country-card group overflow-hidden rounded-[1.75rem] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)] hover:shadow-[var(--tgpi-shadow-premium)]">
      <Link
        aria-label={`Open ${country.name} country intelligence profile`}
        href={`/countries/${country.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--tgpi-gold)]"
      >
        <div className="relative h-44 overflow-hidden bg-[linear-gradient(135deg,#FFFDF8,#EEF5FF_48%,#FFF7DE)]">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              quality={82}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover opacity-90 saturate-110 contrast-105 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,74,0.32),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(18,58,111,0.24),transparent_40%),linear-gradient(135deg,#102D50,#071A32_55%,#041426)]">
              <span aria-hidden="true" className="absolute -right-5 -top-8 text-[9rem] opacity-15 grayscale">
                {country.emoji}
              </span>
              <span aria-hidden="true" className="absolute left-5 top-16 font-[var(--tgpi-font-display)] text-7xl font-semibold text-white/10">
                {country.slug.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#071A32]/95 via-[#071A32]/20 to-[#071A32]/10" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--tgpi-gold)]/70 to-transparent" />

          <div className="absolute left-4 top-4 flex max-w-[66%] flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/35 bg-[#071A32]/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-xl">
              {country.region}
            </span>
            <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[10px] font-bold text-[var(--tgpi-navy)] backdrop-blur">
              {getVisualBadgeLabel(country)}
            </span>
          </div>

          <div className="absolute right-4 top-4 rounded-2xl border border-[var(--tgpi-gold-light)]/60 bg-[#071A32]/95 px-3 py-2 text-center text-white backdrop-blur-xl">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">TGPI score</p>
            <p className="mt-0.5 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-none">{country.tgpiScore}</p>
          </div>

          <div className="absolute inset-x-5 bottom-4">
            <div className="mb-1 text-2xl drop-shadow-2xl">{country.emoji}</div>
            <h3 className="truncate font-[var(--tgpi-font-display)] text-[1.7rem] font-semibold tracking-[-0.02em] text-white drop-shadow-xl">
              {country.name}
            </h3>
            <p className="mt-1 truncate text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/80">
              {country.capital} · {country.currencyCode}
            </p>
          </div>
        </div>

        <div className="space-y-3.5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Best for</p>
              <p className="mt-1.5 line-clamp-2 font-[var(--tgpi-font-display)] text-xl font-semibold leading-tight text-[var(--tgpi-navy)]">
                {country.mainGoal}
              </p>
            </div>
            <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ${scoreTone.className}`}>
              {scoreTone.label}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <MetricBox label="Cost profile" value={getCostTone(country.costLevel)} />
            <MetricBox label="Safety" value={`${country.intelligence.safetyScore}/100`} />
            <MetricBox label="English access" value={`${country.intelligence.englishFriendliness}/100`} />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] px-4 py-3">
            <div className="min-w-0">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-[var(--tgpi-gold-strong)]">Adaptation signal</p>
              <p className="mt-1 truncate text-xs font-bold text-[var(--tgpi-navy)]">{getRiskLabel(country)}</p>
            </div>
            <span className="shrink-0 rounded-full border border-[var(--tgpi-border)] bg-white px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[var(--tgpi-navy)]">{getDifficultyTone(country.difficulty)}</span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--tgpi-border)] pt-4">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-muted)]">Primary language</p>
              <p className="mt-1 line-clamp-1 text-sm font-bold text-[var(--tgpi-navy)]">{country.language}</p>
            </div>
            <span className="inline-flex min-h-11 shrink-0 items-center rounded-xl bg-[var(--tgpi-navy)] px-4 text-xs font-extrabold text-white transition group-hover:bg-[var(--tgpi-gold)] group-hover:text-[var(--tgpi-navy)]">
              Open profile →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[var(--tgpi-border)] bg-[#FFFDF8] p-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--tgpi-muted)]">{label}</p>
      <p className="mt-1 truncate text-sm font-extrabold text-[var(--tgpi-navy)]">{value}</p>
    </div>
  );
}
