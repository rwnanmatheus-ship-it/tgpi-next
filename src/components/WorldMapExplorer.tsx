import Link from "next/link";
import { countries } from "@/data/countries";

const regionConfig = [
  {
    title: "Asia",
    description: "Innovation, language depth, and global work pathways.",
    countries: countries.filter((country) => country.region === "Asia"),
  },
  {
    title: "South America",
    description: "Regional integration, language, and daily-life readiness.",
    countries: countries.filter((country) => country.region === "South America"),
  },
  {
    title: "Africa",
    description: "Civilizational depth, heritage, and cultural intelligence.",
    countries: countries.filter((country) => country.region === "Africa"),
  },
];

export default function WorldMapExplorer() {
  return (
    <section className="mt-12 rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-yellow-400">
          Global Discovery Map
        </h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          A visual exploration layer by region. Use it to navigate the global
          structure of TGPI and jump into country pathways.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {regionConfig.map((region) => (
          <div
            key={region.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-yellow-400">
                {region.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {region.description}
              </p>
            </div>

            <div className="space-y-3">
              {region.countries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/countries/${country.slug}`}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:border-yellow-500"
                >
                  <span className="text-slate-200">
                    {country.emoji} {country.name}
                  </span>
                  <span className="text-sm text-yellow-300">Open →</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}