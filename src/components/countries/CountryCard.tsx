// src/components/countries/CountryCard.tsx

import Link from "next/link";
import {
  formatCurrencyAmount,
  getCountryCostLabel,
  getCountryDecisionLabel,
  getCountryRiskLabel,
  type Country,
} from "@/lib/countries";

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B0F19] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
    >
      <div className="relative h-40 bg-gradient-to-br from-[#111118] via-[#0B1F4D]/70 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.3),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.28),transparent_38%)]" />

        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur">
          {country.region}
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 text-5xl">{country.emoji}</div>
            <h3 className="truncate text-2xl font-black tracking-tight text-white">
              {country.name}
            </h3>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5D76E]">
              Score
            </p>
            <p className="text-xl font-black text-[#D4AF37]">
              {country.tgpiScore}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Main focus
          </p>
          <p className="mt-1 text-sm font-bold text-white">
            {country.mainGoal}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-300">
          {country.shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <p className="text-xs text-slate-500">Budget</p>
            <p className="mt-1 font-black text-[#D4AF37]">
              {formatCurrencyAmount(
                country,
                country.intelligence.averageMonthlyBudget,
              )}{" "}
              {country.currencyCode}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <p className="text-xs text-slate-500">Safety</p>
            <p className="mt-1 font-black text-[#38BDF8]">
              {country.intelligence.safetyScore}/100
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F5D76E]">
            {getCountryDecisionLabel(country)}
          </span>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-slate-300">
            {getCountryCostLabel(country)}
          </span>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-slate-300">
            {getCountryRiskLabel(country)}
          </span>
        </div>
      </div>
    </Link>
  );
}