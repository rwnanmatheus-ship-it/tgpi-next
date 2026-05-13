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

type CountryCardProps = { country: Country };

function getScoreTone(score: number) {
  if (score >= 88) return { label: "Elite", border: "border-[#D9BD70]", bg: "bg-[#FFF7DE]", text: "text-[#8A5B09]" };
  if (score >= 78) return { label: "Strong", border: "border-[#C8D7EF]", bg: "bg-[#EEF5FF]", text: "text-[#123A6F]" };
  return { label: "Watch", border: "border-[#E7E0D3]", bg: "bg-[#FBF8F1]", text: "text-[#5B6472]" };
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
    <Link href={`/countries/${country.slug}`} className="group relative block overflow-hidden rounded-[1.75rem] border border-[#E7E0D3] bg-white shadow-[0_24px_70px_rgba(17,24,39,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#C8A24A] hover:shadow-[0_30px_90px_rgba(17,24,39,0.12)]">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#FFFDF8] via-[#EEF5FF] to-[#FFF7DE]">
        {hasImage ? <img src={imageUrl} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover opacity-90 saturate-110 contrast-105 transition duration-500 group-hover:scale-105 group-hover:opacity-100" loading="lazy" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,162,74,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(18,58,111,0.14),transparent_38%),linear-gradient(135deg,#FFFDF8,#EEF5FF_45%,#FFF7DE)]" />}
        {!hasImage ? <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(17,24,39,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.06)_1px,transparent_1px)] [background-size:34px_34px]" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C8A24A]/60 to-transparent" />

        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-bold text-[#111827] backdrop-blur">{country.region}</span>
          <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-bold text-[#111827] backdrop-blur">{getVisualBadgeLabel(country)}</span>
          <span className={`rounded-full border px-3 py-1 text-xs font-black backdrop-blur ${scoreTone.border} ${scoreTone.bg} ${scoreTone.text}`}>{scoreTone.label}</span>
        </div>

        <div className="absolute right-5 top-5 rounded-2xl border border-[#D9BD70] bg-white/85 px-3 py-2 text-center backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A5B09]">TGPI</p>
          <p className="text-2xl font-black text-[#8A5B09]">{country.tgpiScore}</p>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          {!hasImage ? <div className="mb-4 flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D9BD70] bg-[#FFF7DE] text-2xl font-black text-[#8A5B09] backdrop-blur">{country.slug.slice(0, 2).toUpperCase()}</div><div className="min-w-0"><p className="text-xs uppercase tracking-[0.24em] text-[#FFF7DE]">Curated image pending</p><p className="mt-1 truncate text-xs text-white/90">{imageProfile.credit}</p></div></div> : <div className="mb-3 text-5xl drop-shadow-2xl">{country.emoji}</div>}
          <h3 className="truncate text-2xl font-black tracking-tight text-white drop-shadow-xl">{country.name}</h3>
          <p className="mt-1 truncate text-xs font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow">{country.capital} • {country.currencyCode}</p>
        </div>
      </div>

      <div className="relative space-y-5 p-5">
        <div><p className="text-xs uppercase tracking-[0.22em] text-[#64748B]">Strategic focus</p><p className="mt-1 line-clamp-1 text-sm font-black text-[#111827]">{country.mainGoal}</p></div>
        <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-[#5B6472]">{country.shortDescription}</p>
        <div className="grid grid-cols-3 gap-2"><MetricBox label="Budget" value={budget} tone="gold" /><MetricBox label="Safety" value={`${country.intelligence.safetyScore}/100`} tone="blue" /><MetricBox label="English" value={`${country.intelligence.englishFriendliness}/100`} tone="graphite" /></div>
        <div className="space-y-2"><ScoreLine label="Quality of life" value={country.intelligence.qualityOfLifeScore} /><ScoreLine label="Safety" value={country.intelligence.safetyScore} /></div>
        <div className="flex flex-wrap gap-2"><Badge tone="gold">{getCountryDecisionLabel(country)}</Badge><Badge tone="blue">{getCostTone(country.costLevel)}</Badge><Badge tone="neutral">{getDifficultyTone(country.difficulty)}</Badge></div>
        <div className="flex items-center justify-between gap-4 border-t border-[#E7E0D3] pt-4"><div className="min-w-0"><p className="text-xs text-[#64748B]">Primary language</p><p className="mt-1 line-clamp-1 text-sm font-bold text-[#111827]">{country.language}</p></div><span className="shrink-0 rounded-full border border-[#D9BD70] bg-[#FFF7DE] px-3 py-2 text-xs font-black text-[#8A5B09] transition group-hover:bg-[#111827] group-hover:text-white">View profile</span></div>
        <span className="sr-only">{getCountryCostLabel(country)}. {getCountryRiskLabel(country)}.</span>
      </div>
    </Link>
  );
}

function MetricBox({ label, value, tone }: { label: string; value: string; tone: "gold" | "blue" | "graphite" }) {
  const valueClass = tone === "gold" ? "text-[#8A5B09]" : tone === "blue" ? "text-[#123A6F]" : "text-[#111827]";
  return <div className="min-w-0 rounded-2xl border border-[#E7E0D3] bg-[#FBF8F1] p-3"><p className="text-[11px] text-[#64748B]">{label}</p><p className={`mt-1 truncate text-sm font-black ${valueClass}`}>{value}</p></div>;
}

function ScoreLine({ label, value }: { label: string; value: number }) {
  return <div><div className="mb-1 flex items-center justify-between gap-3"><p className="text-xs font-semibold text-[#5B6472]">{label}</p><p className="text-xs font-black text-[#111827]">{value}/100</p></div><div className="h-1.5 overflow-hidden rounded-full bg-[#E7E0D3]"><div className="h-full rounded-full bg-gradient-to-r from-[#C8A24A] to-[#123A6F]" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} /></div></div>;
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "gold" | "blue" | "neutral" }) {
  const className = tone === "gold" ? "border-[#D9BD70] bg-[#FFF7DE] text-[#8A5B09]" : tone === "blue" ? "border-[#C8D7EF] bg-[#EEF5FF] text-[#123A6F]" : "border-[#E7E0D3] bg-[#FBF8F1] text-[#5B6472]";
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}
