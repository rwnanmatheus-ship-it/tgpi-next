import Image from "next/image";
import Link from "next/link";
import { COUNTRY_DECISION_PRESETS } from "@/data/country-page-system";

interface CountriesHeroProps {
  countryCount: number;
  regionCount: number;
}

const HERO_IMAGE =
  "/images/countries/tgpi-country-intelligence-observatory-v1.webp";

export default function CountriesHero({
  countryCount,
  regionCount,
}: CountriesHeroProps) {
  return (
    <section
      aria-labelledby="countries-hero-title"
      className="relative min-h-[650px] overflow-hidden rounded-[34px] border border-white/10 bg-[var(--tgpi-navy-deep)] text-white shadow-[var(--tgpi-shadow-premium)] sm:min-h-[620px] lg:h-[540px] lg:min-h-0"
    >
      <Image
        src={HERO_IMAGE}
        alt="Global country intelligence observatory with an illuminated world atlas and international architecture"
        fill
        priority
        quality={88}
        sizes="(max-width: 1440px) 100vw, 1360px"
        className="object-cover object-[68%_center]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,38,.99)_0%,rgba(3,20,38,.94)_38%,rgba(3,20,38,.55)_62%,rgba(3,20,38,.16)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,20,38,.12)_0%,transparent_45%,rgba(3,20,38,.92)_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative flex h-full flex-col px-6 pb-32 pt-8 sm:px-10 sm:pb-28 sm:pt-10 lg:justify-center lg:px-14 lg:pb-24 lg:pt-8">
        <div className="max-w-[720px]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="w-fit rounded-full border border-[var(--tgpi-gold-light)]/35 bg-[#061B33]/65 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)] backdrop-blur-xl">
              TGPI Country Intelligence
            </p>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/55">
              Global research system
            </span>
          </div>

          <h1
            id="countries-hero-title"
            className="mt-5 max-w-3xl font-[var(--tgpi-font-display)] text-[clamp(3.05rem,6vw,5.35rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-white"
          >
            Understand a country before you choose a future.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#D2DCE7] sm:text-lg sm:leading-8">
            Explore {countryCount} country systems through cost, safety, language,
            education, careers, culture and mobility—then carry the decision into
            comparison, documents and learning.
          </p>

          <div className="mt-7 grid gap-3 sm:flex">
            <a
              href="#world-journey"
              className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-7 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[#D4AA49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Open the world atlas
            </a>
            <a
              href="#country-explorer"
              className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/22 bg-[#061B33]/55 px-7 text-sm font-extrabold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              Build a shortlist
            </a>
          </div>

          <nav
            aria-label="Explore countries by decision objective"
            className="mt-6 flex max-w-2xl gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {COUNTRY_DECISION_PRESETS.map((preset) => (
              <Link
                key={preset.id}
                href={`/countries?intent=${preset.id}#country-explorer`}
                className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-white/15 bg-[#061B33]/55 px-3 text-[11px] font-bold text-[#D7E0EB] backdrop-blur-xl transition hover:border-[var(--tgpi-gold-light)]/60 hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
              >
                {preset.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-white/12 bg-[#031426]/88 backdrop-blur-xl sm:grid-cols-4">
        <HeroMetric label="Country profiles" value={String(countryCount)} />
        <HeroMetric label="World regions" value={String(regionCount)} />
        <HeroMetric label="Evidence domains" value="8" />
        <HeroMetric label="Compare at once" value="Up to 3" />
      </div>
    </section>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-white/10 px-4 py-3 last:border-r-0 sm:px-5 sm:py-4">
      <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-white/45">
        {label}
      </p>
      <p className="mt-1 font-[var(--tgpi-font-display)] text-xl font-semibold text-white sm:text-2xl">
        {value}
      </p>
    </div>
  );
}
