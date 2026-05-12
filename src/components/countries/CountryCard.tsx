// src/components/countries/CountryCard.tsx

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

type CountryCardProps = {
  country: Country;
};

function getScoreTone(score: number) {
  if (score >= 88) {
    return {
      label: "Elite",
      border: "border-[#D4AF37]/40",
      bg: "bg-[#D4AF37]/15",
      text: "text-[#F5D76E]",
    };
  }

  if (score >= 78) {
    return {
      label: "Strong",
      border: "border-[#38BDF8]/35",
      bg: "bg-[#2563EB]/15",
      text: "text-[#93C5FD]",
    };
  }

  return {
    label: "Watch",
    border: "border-white/15",
    bg: "bg-white/[0.04]",
    text: "text-slate-300",
  };
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

  const budget = `${formatCurrencyAmount(
    country,
    country.intelligence.averageMonthlyBudget,
  )} ${country.currencyCode}`;

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group relative block overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070A12] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_38%)]" />
      </div>

      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#111118] via-[#0B1F4D]/70 to-black">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-85 saturate-150 contrast-110 brightness-110 transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-150"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.28),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.28),transparent_38%),linear-gradient(135deg,#111118,#07111F_45%,#050505)]" />
        )}

        {!hasImage ? (
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px]" />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/25 via-transparent to-[#050505]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_38%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur">
            {country.region}
          </span>

          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur">
            {getVisualBadgeLabel(country)}
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-black backdrop-blur ${scoreTone.border} ${scoreTone.bg} ${scoreTone.text}`}
          >
            {scoreTone.label}
          </span>
        </div>

        <div className="absolute right-5 top-5 rounded-2xl border border-[#D4AF37]/25 bg-black/45 px-3 py-2 text-center backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5D76E]">
            TGPI
          </p>
          <p className="text-2xl font-black text-[#D4AF37]">
            {country.tgpiScore}
          </p>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          {!hasImage ? (
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-2xl font-black text-[#F5D76E] backdrop-blur">
                {country.slug.slice(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-[#F5D76E]">
                  Curated image pending
                </p>
                <p className="mt-1 truncate text-xs text-slate-300">
                  {imageProfile.credit}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-3 text-5xl drop-shadow-2xl">{country.emoji}</div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-2xl font-black tracking-tight text-white drop-shadow-xl">
              {country.name}
            </h3>
            <p className="mt-1 truncate text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 drop-shadow">
              {country.capital} • {country.currencyCode}
            </p>
          </div>
        </div>
      </div>

      <div className="relative space-y-5 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Strategic focus
          </p>
          <p className="mt-1 line-clamp-1 text-sm font-black text-white">
            {country.mainGoal}
          </p>
        </div>

        <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-300">
          {country.shortDescription}
        </p>

        <div className="grid grid-cols-3 gap-2">
          <MetricBox label="Budget" value={budget} tone="gold" />
          <MetricBox
            label="Safety"
            value={`${country.intelligence.safetyScore}/100`}
            tone="blue"
          />
          <MetricBox
            label="English"
            value={`${country.intelligence.englishFriendliness}/100`}
            tone="white"
          />
        </div>

        <div className="space-y-2">
          <ScoreLine
            label="Quality of life"
            value={country.intelligence.qualityOfLifeScore}
          />
          <ScoreLine label="Safety" value={country.intelligence.safetyScore} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tone="gold">{getCountryDecisionLabel(country)}</Badge>
          <Badge tone="blue">{getCostTone(country.costLevel)}</Badge>
          <Badge tone="white">{getDifficultyTone(country.difficulty)}</Badge>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Primary language</p>
            <p className="mt-1 line-clamp-1 text-sm font-bold text-slate-200">
              {country.language}
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-xs font-black text-[#F5D76E] transition group-hover:bg-[#D4AF37] group-hover:text-black">
            View profile
          </span>
        </div>

        <span className="sr-only">
          {getCountryCostLabel(country)}. {getCountryRiskLabel(country)}.
        </span>
      </div>
    </Link>
  );
}

type MetricBoxProps = {
  label: string;
  value: string;
  tone: "gold" | "blue" | "white";
};

function MetricBox({ label, value, tone }: MetricBoxProps) {
  const valueClass =
    tone === "gold"
      ? "text-[#D4AF37]"
      : tone === "blue"
        ? "text-[#38BDF8]"
        : "text-white";

  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/30 p-3">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className={`mt-1 truncate text-sm font-black ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

type ScoreLineProps = {
  label: string;
  value: number;
};

function ScoreLine({ label, value }: ScoreLineProps) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-400">{label}</p>
        <p className="text-xs font-black text-slate-200">{value}/100</p>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#38BDF8]"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

type BadgeProps = {
  children: React.ReactNode;
  tone: "gold" | "blue" | "white";
};

function Badge({ children, tone }: BadgeProps) {
  const className =
    tone === "gold"
      ? "border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#F5D76E]"
      : tone === "blue"
        ? "border-[#2563EB]/25 bg-[#2563EB]/10 text-[#93C5FD]"
        : "border-white/10 bg-white/[0.04] text-slate-300";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}