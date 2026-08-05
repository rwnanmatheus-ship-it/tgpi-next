// src/components/countries/CountryCard.tsx

import Image from "next/image";
import Link from "next/link";
import {
  formatCurrencyAmount,
  getCountryCostLabel,
  getCountryDecisionLabel,
  getCountryImageAlt,
  getCountryImageProfile,
  getCountryImageUrl,
  getCountryRiskLabel,
  hasVerifiedCountryImage,
  type Country,
} from "@/lib/countries";

type CountryCardProps = { country: Country };

function getScoreTone(score: number) {
  if (score >= 88) return { label: "Elite fit", className: "border-[#D9BD70] bg-[#FFF7DE] text-[#765009]" };
  if (score >= 78) return { label: "Strong fit", className: "border-[#C8D7EF] bg-[#EEF5FF] text-[#123A6F]" };
  return { label: "Consider", className: "border-[#E7E0D3] bg-[#FBF8F1] text-[#5B6472]" };
}

function getCostTone(costLevel: Country["costLevel"]) {
  if (costLevel === "low") return "Low cost";
  if (costLevel === "medium") return "Balanced cost";
  return "Premium cost";
}

function getDifficultyTone(difficulty: Country["difficulty"]) {
  if (difficulty === "easy") return "Low friction";
  if (difficulty === "medium") return "Moderate friction";
  return "High discipline";
}

function getVisualBadgeLabel(country: Country) {
  return hasVerifiedCountryImage(country) ? "Verified visual" : "TGPI visual";
}

export function CountryCard({ country }: CountryCardProps) {
  const scoreTone = getScoreTone(country.tgpiScore);
  const imageProfile = getCountryImageProfile(country);
  const imageUrl = getCountryImageUrl(country);
  const imageAlt = getCountryImageAlt(country);
  const hasImage = hasVerifiedCountryImage(country);
  const budget = `${formatCurrencyAmount(country, country.intelligence.averageMonthlyBudget)} ${country.currencyCode}`;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)] hover:shadow-[var(--tgpi-shadow-premium)]">
      <Link href={`/countries/${country.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--tgpi-gold)]">
        <div className="relative h-52 overflow-hidden bg-[linear-gradient(135deg,#FFFDF8,#EEF5FF_48%,#FFF7DE)]">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              unoptimized
              className="object-cover opacity-90 saturate-110 contrast-105 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,74,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(18,58,111,0.18),transparent_38%),linear-gradient(135deg,#FFFDF8,#EEF5FF_45%,#FFF7DE)]" />
          )}

          {!hasImage ? (
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(17,24,39,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.06)_1px,transparent_1px)] [background-size:34px_34px]" />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-t from-[#071A32]/90 via-[#071A32]/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--tgpi-gold)]/70 to-transparent" />

          <div className="absolute left-4 top-4 flex max-w-[70%] flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/35 bg-[#071A32]/72 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-xl">{country.region}</span>
            <span className="rounded-full border border-white/30 bg-white/85 px-3 py-1 text-[10px] font-bold text-[var(--tgpi-navy)] backdrop-blur">{getVisualBadgeLabel(country)}</span>
          </div>

          <div className="absolute right-4 top-4 rounded-2xl border border-[var(--tgpi-gold-light)]/60 bg-[#071A32]/84 px-3 py-2 text-center text-white backdrop-blur-xl">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">TGPI score</p>
            <p className="mt-0.5 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-none">{country.tgpiScore}</p>
          </div>

          <div className="absolute inset-x-5 bottom-5">
            {!hasImage ? (
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--tgpi-gold-light)]/55 bg-[#FFF7DE] text-xl font-black text-[#765009]">{country.slug.slice(0, 2).toUpperCase()}</div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#FFF7DE]">Curated image pending</p>
                  <p className="mt-1 truncate text-xs text-white/80">{imageProfile.credit}</p>
                </div>
              </div>
            ) : (
              <div className="mb-2 text-4xl drop-shadow-2xl">{country.emoji}</div>
            )}
            <h3 className="truncate font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[-0.02em] text-white drop-shadow-xl">{country.name}</h3>
            <p className="mt-1 truncate text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/75">{country.capital} · {country.currencyCode}</p>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Best for</p>
              <p className="mt-2 line-clamp-2 font-[var(--tgpi-font-display)] text-2xl font-semibold leading-tight text-[var(--tgpi-navy)]">{country.mainGoal}</p>
            </div>
            <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ${scoreTone.className}`}>{scoreTone.label}</span>
          </div>

          <p className="line-clamp-2 min-h-12 text-sm leading-6 text-[var(--tgpi-muted)]">{country.shortDescription}</p>

          <div className="rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Decision pressure</p>
            <p className="mt-2 text-sm font-bold leading-6 text-[var(--tgpi-navy)]">{getCountryRiskLabel(country)}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <MetricBox label="Budget" value={budget} />
            <MetricBox label="Safety" value={`${country.intelligence.safetyScore}`} />
            <MetricBox label="English" value={`${country.intelligence.englishFriendliness}`} />
          </div>

          <div className="space-y-3">
            <ScoreLine label="Quality of life" value={country.intelligence.qualityOfLifeScore} />
            <ScoreLine label="Safety" value={country.intelligence.safetyScore} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>{getCountryDecisionLabel(country)}</Badge>
            <Badge>{getCostTone(country.costLevel)}</Badge>
            <Badge>{getDifficultyTone(country.difficulty)}</Badge>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--tgpi-border)] pt-4">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-muted)]">Primary language</p>
              <p className="mt-1 line-clamp-1 text-sm font-bold text-[var(--tgpi-navy)]">{country.language}</p>
            </div>
            <span className="inline-flex min-h-11 shrink-0 items-center rounded-xl bg-[var(--tgpi-navy)] px-4 text-xs font-extrabold text-white transition group-hover:bg-[var(--tgpi-gold)] group-hover:text-[var(--tgpi-navy)]">View report →</span>
          </div>

          <span className="sr-only">{getCountryCostLabel(country)}.</span>
        </div>
      </Link>
    </article>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[var(--tgpi-border)] bg-[#FFFDF8] p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--tgpi-muted)]">{label}</p>
      <p className="mt-1 truncate text-sm font-extrabold text-[var(--tgpi-navy)]">{value}</p>
    </div>
  );
}

function ScoreLine({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[var(--tgpi-muted)]">{label}</p>
        <p className="text-xs font-extrabold text-[var(--tgpi-navy)]">{value}/100</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#E7E0D3]">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--tgpi-gold)] to-[var(--tgpi-navy)]" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] px-3 py-1 text-[11px] font-semibold text-[var(--tgpi-navy)]">{children}</span>;
}
