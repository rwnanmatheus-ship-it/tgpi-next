import Link from "next/link";
import type { Country } from "@/data/countries";

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group block overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 transition hover:-translate-y-1 hover:border-yellow-500"
    >
      <div className="border-b border-slate-800 p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-5xl">{country.emoji}</div>
            <h3 className="mt-4 text-2xl font-bold text-yellow-400">
              {country.name}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{country.region}</p>
          </div>

          <span className="rounded-full border border-yellow-700/30 bg-yellow-500/5 px-3 py-1 text-xs text-yellow-300">
            View Pathway
          </span>
        </div>

        <p className="text-sm leading-7 text-slate-300">
          {country.shortDescription}
        </p>
      </div>

      <div className="grid gap-3 p-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Language</p>
          <p className="mt-1 text-sm text-white">{country.language}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Capital</p>
          <p className="mt-1 text-sm text-white">{country.capital}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Currency</p>
          <p className="mt-1 text-sm text-white">{country.currencyCode}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Goal</p>
          <p className="mt-1 text-sm text-white">{country.mainGoal}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-6 pb-4">
        {country.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="px-6 pb-6 text-sm font-semibold text-yellow-300 group-hover:text-yellow-200">
        Open country page →
      </div>
    </Link>
  );
}