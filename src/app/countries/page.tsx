import TGPIPageShell from "@/components/TGPIPageShell";
import Link from "next/link";
import { tgpiImages } from "@/data/tgpi-images";

const countries = [
  { name: "Japan", slug: "japan", region: "Asia", flag: "🇯🇵", image: tgpiImages.japan },
  { name: "Brazil", slug: "brazil", region: "South America", flag: "🇧🇷", image: tgpiImages.brazil },
  { name: "Egypt", slug: "egypt", region: "Africa", flag: "🇪🇬", image: tgpiImages.egypt },
  { name: "Canada", slug: "canada", region: "North America", flag: "🇨🇦", image: tgpiImages.canada },
  { name: "France", slug: "france", region: "Europe", flag: "🇫🇷", image: tgpiImages.france },
  { name: "India", slug: "india", region: "Asia", flag: "🇮🇳", image: tgpiImages.india },
  { name: "Australia", slug: "australia", region: "Oceania", flag: "🇦🇺", image: tgpiImages.australia },
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
          Discover destinations, languages, opportunities, and global pathways.
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-4">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/countries/${country.slug}`}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#07111f] transition hover:border-yellow-400"
          >
            <div
              className="h-44 bg-cover bg-center transition group-hover:scale-105"
              style={{ backgroundImage: `url(${country.image})` }}
            />

            <div className="p-5">
              <p className="text-3xl">{country.flag}</p>
              <h2 className="mt-3 text-lg font-bold">{country.name}</h2>
              <p className="text-sm text-slate-400">{country.region}</p>
            </div>
          </Link>
        ))}
      </section>
    </TGPIPageShell>
  );
}