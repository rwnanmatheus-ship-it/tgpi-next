import Link from "next/link";
import { countries } from "@/data/countries";

export default function CountriesPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12">
          <div className="mb-4 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            Global Country Pathways
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Explore Countries
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Discover premium country pathways designed to help people prepare
            for global life through language, culture, integration, and
            real-world readiness.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <article
              key={country.slug}
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:border-yellow-500/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 text-4xl">{country.emoji}</div>
                  <h2 className="text-2xl font-bold text-white">
                    {country.name}
                  </h2>
                </div>

                <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-yellow-300">
                  {country.mainGoal}
                </span>
              </div>

              <p className="mb-6 text-sm leading-7 text-slate-300">
                {country.shortDescription}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {country.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid gap-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <span>Language</span>
                  <span className="font-medium text-white">{country.language}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <span>Capital</span>
                  <span className="font-medium text-white">{country.capital}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <span>Currency</span>
                  <span className="font-medium text-white">
                    {country.currencyCode}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/countries/${country.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore Pathway
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}