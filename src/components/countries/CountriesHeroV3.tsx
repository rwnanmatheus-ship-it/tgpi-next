import Link from "next/link";

interface CountriesHeroV3Props {
  countryCount: number;
  regionCount: number;
}

const intents = [
  ["Study abroad", "education"],
  ["Build a career", "career"],
  ["Remote work", "remote"],
  ["Lower cost", "cost"],
  ["Quality of life", "lifestyle"],
  ["Long-term mobility", "mobility"],
] as const;

export default function CountriesHeroV3({
  countryCount,
  regionCount,
}: CountriesHeroV3Props) {
  return (
    <section aria-labelledby="countries-hero-title" className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[var(--tgpi-navy-deep)] text-white shadow-[var(--tgpi-shadow-premium)]">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(197,150,50,.42),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,.12),transparent_24%),linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:auto,auto,38px_38px,38px_38px]" />
      <div className="relative grid lg:grid-cols-[1.02fr_.98fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <p className="w-fit rounded-full border border-[var(--tgpi-gold-light)]/35 bg-[var(--tgpi-gold)]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
            TGPI Country Intelligence
          </p>
          <h1 id="countries-hero-title" className="mt-6 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3.35rem,7vw,6.3rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white">
            Explore the world through evidence, not assumptions.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#CAD5E3] sm:text-lg">
            Search and compare {countryCount} countries through cost, career, education, culture, safety and mobility signals.
          </p>

          <div className="mt-8 grid gap-3 sm:flex">
            <a href="#country-explorer" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-7 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[#D4AA49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Explore {countryCount} countries
            </a>
            <Link href="/onboarding" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
              Find your country fit
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" aria-label="Explore countries by objective">
            {intents.map(([label, intent]) => (
              <Link key={intent} href={`/countries?intent=${intent}#country-explorer`} className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/[0.055] px-4 text-xs font-bold text-[#D7E0EB] transition hover:border-[var(--tgpi-gold-light)]/55 hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative border-t border-white/10 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div className="rounded-[28px] border border-white/15 bg-white/[0.055] p-5 shadow-[0_35px_100px_rgba(0,0,0,.3)] backdrop-blur-xl sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">Global explorer status</p>
                <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">One framework. Every country.</h2>
              </div>
              <span className="rounded-full border border-[var(--tgpi-gold-light)]/30 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-xs font-bold text-[var(--tgpi-gold-light)]">Coverage</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric label="Country profiles" value={String(countryCount)} />
              <Metric label="Regions" value={String(regionCount)} />
              <Metric label="Knowledge areas" value="8" />
              <Metric label="Compare at once" value="Up to 3" />
            </div>

            <Link href="/compare" className="mt-5 flex min-h-14 items-center justify-between rounded-2xl border border-white/12 bg-white/[0.045] px-5 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)]/55 hover:bg-white/[0.08]">
              Compare countries
              <span className="text-[var(--tgpi-gold-light)]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
