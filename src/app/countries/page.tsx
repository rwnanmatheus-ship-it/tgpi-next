import CountryCard from "@/components/CountryCard";
import SectionHeader from "@/components/SectionHeader";
import { countries } from "@/data/countries";

export default function CountriesPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
          <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            Global Country Pathways
          </p>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Explore Countries
          </h1>

          <p className="max-w-3xl text-slate-300">
            Discover premium country pathways designed to help people live,
            work, and integrate anywhere in the world through language,
            culture, and real-world preparation.
          </p>
        </div>

        <SectionHeader
          title="Featured Country Entries"
          description="Premium starting points for your global preparation journey."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <CountryCard
              key={country.slug}
              emoji={country.emoji}
              name={country.name}
              description={country.shortDescription}
              href={`/countries/${country.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}