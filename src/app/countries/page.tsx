import CountryComparison from "@/components/CountryComparison";
import { countries } from "@/data/countries";
import Link from "next/link";

export default function CountriesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            Explore Countries
          </h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Discover global pathways, compare countries, and choose your next
            international direction with more clarity.
          </p>
        </section>

        <CountryComparison />

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500/40 hover:bg-slate-950"
            >
              <div className="mb-3 text-3xl">{country.emoji}</div>
              <h2 className="text-xl font-bold text-yellow-400">
                {country.name}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {country.shortDescription}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}