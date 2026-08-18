import Link from "next/link";
import TGPIEditorialVisual, {
  type TGPIVisualVariant,
} from "@/components/TGPIEditorialVisual";

type CountryCard = {
  name: string;
  href: string;
  compareHref: string;
  image: string;
  variant: TGPIVisualVariant;
  score: number;
  fit: string;
  pressure: string;
  signal: string;
};

const countries: CountryCard[] = [
  {
    name: "Portugal",
    href: "/countries/portugal",
    compareHref: "/compare?country=portugal&country=spain",
    image: "/images/home/tgpi-portugal-country.webp",
    variant: "portugal",
    score: 88,
    fit: "European access and easier cultural adaptation",
    pressure: "Rent-to-income balance",
    signal: "Lifestyle fit",
  },
  {
    name: "Canada",
    href: "/countries/canada",
    compareHref: "/compare?country=canada&country=united-kingdom",
    image: "/images/home/tgpi-canada-country.webp",
    variant: "canada",
    score: 91,
    fit: "Education, career pathways and long-term mobility",
    pressure: "Housing and entry planning",
    signal: "Career access",
  },
  {
    name: "United Kingdom",
    href: "/countries/united-kingdom",
    compareHref: "/compare?country=united-kingdom&country=canada",
    image: "/images/home/tgpi-united-kingdom-country.webp",
    variant: "england",
    score: 88,
    fit: "Academic leverage and global career exposure",
    pressure: "High cost and competition",
    signal: "Academic leverage",
  },
];

export default function HomeCountryCardsV2() {
  return (
    <section
      className="bg-[var(--tgpi-navy)] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="home-country-intelligence-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
              Country intelligence
            </p>
            <h2
              id="home-country-intelligence-title"
              className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-white"
            >
              Move from inspiration to a structured comparison.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#dce4ee] sm:text-lg">
              Use TGPI scores as directional signals, then verify current costs, rules and local conditions before committing.
            </p>
          </div>
          <Link
            href="/countries"
            className="hidden min-h-12 items-center justify-center rounded-2xl border border-white/20 px-6 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)] lg:inline-flex"
          >
            Explore all countries
          </Link>
        </div>

        <div
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
          aria-label="Featured TGPI country intelligence"
        >
          {countries.map((country) => (
            <article
              key={country.name}
              className="group min-w-[86vw] snap-center overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-[0_24px_70px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--tgpi-gold-light)] sm:min-w-[62vw] lg:min-w-0"
            >
              <Link
                href={country.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--tgpi-gold-light)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <TGPIEditorialVisual
                    variant={country.variant}
                    id={`home-country-v2-${country.name.toLowerCase()}`}
                    ariaLabel={`${country.name} country intelligence`}
                    imageSrc={country.image}
                    showContext={false}
                    className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a32] via-[#071a32]/22 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#071a32]/82 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                    <span className="text-[var(--tgpi-gold-light)]">TGPI model {country.score}</span>
                    <span className="text-white/35">•</span>
                    <span>{country.signal}</span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-[#071a32]/86 p-4 backdrop-blur-xl">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                      Main decision pressure
                    </p>
                    <p className="mt-2 font-[var(--tgpi-font-display)] text-2xl font-semibold leading-tight text-white">
                      {country.pressure}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/45">
                        Country profile
                      </p>
                      <h3 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">
                        {country.name}
                      </h3>
                    </div>
                    <span className="font-[var(--tgpi-font-display)] text-4xl font-semibold text-[var(--tgpi-gold-light)]">
                      {country.score}
                    </span>
                  </div>
                  <p className="mt-4 min-h-[3.5rem] text-sm leading-7 text-[#dce4ee]">
                    {country.fit}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm font-extrabold text-white">Open country intelligence</span>
                    <span className="text-xl text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>

              <div className="border-t border-white/10 px-5 py-4 sm:px-6">
                <Link
                  href={country.compareHref}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:bg-white/10 hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)]"
                >
                  Compare {country.name}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 grid gap-3 sm:flex">
          <Link
            href="/onboarding"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[#d1a644] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Find your country fit
          </Link>
          <Link
            href="/countries"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 px-6 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)] lg:hidden"
          >
            Explore countries
          </Link>
        </div>
      </div>
    </section>
  );
}
