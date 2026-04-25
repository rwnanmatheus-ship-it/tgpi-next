import TGPIPageShell from "@/components/TGPIPageShell";
import Link from "next/link";

const countries = [
  { name: "Japan", slug: "japan", region: "Asia", flag: "🇯🇵", icon: "🏯" },
  { name: "Brazil", slug: "brazil", region: "South America", flag: "🇧🇷", icon: "🌴" },
  { name: "Egypt", slug: "egypt", region: "Africa", flag: "🇪🇬", icon: "🏜️" },
  { name: "Canada", slug: "canada", region: "North America", flag: "🇨🇦", icon: "🏙️" },
  { name: "France", slug: "france", region: "Europe", flag: "🇫🇷", icon: "🗼" },
  { name: "India", slug: "india", region: "Asia", flag: "🇮🇳", icon: "🕌" },
  { name: "South Africa", slug: "south-africa", region: "Africa", flag: "🇿🇦", icon: "🌍" },
  { name: "Australia", slug: "australia", region: "Oceania", flag: "🇦🇺", icon: "🌊" },
];

export default function CountriesPage() {
  return (
    <TGPIPageShell>
      <section>
        <p className="text-sm text-slate-500">Home › Countries</p>

        <h1 className="mt-4 text-5xl font-bold">
          Explore the world and its <span className="text-yellow-400">cultures</span>
        </h1>

        <p className="mt-4 text-slate-400">
          Discover countries, languages, opportunities, and global pathways.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {["All", "America", "Europe", "Asia", "Africa", "Oceania"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:border-yellow-400 hover:text-yellow-400"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-4">
        {countries.map((c) => (
          <Link
            key={c.slug}
            href={`/countries/${c.slug}`}
            className="group rounded-3xl border border-white/10 bg-[#07111f] p-5 transition hover:border-yellow-400"
          >
            <div className="flex h-40 items-center justify-center text-6xl">
              {c.icon}
            </div>

            <h2 className="mt-4 text-lg font-bold">{c.name}</h2>
            <p className="text-sm text-slate-400">{c.region}</p>

            <p className="mt-2 text-2xl">{c.flag}</p>
          </Link>
        ))}
      </section>
    </TGPIPageShell>
  );
}