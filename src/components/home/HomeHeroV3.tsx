import Image from "next/image";
import Link from "next/link";
import { homeSystemMetrics } from "@/data/home-system";

export default function HomeHeroV3() {
  return (
    <section className="relative overflow-hidden bg-[var(--tgpi-navy-deep)] px-4 pb-4 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_10%_8%,rgba(197,150,50,.18),transparent_24%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:auto,42px_42px,42px_42px]" />

      <div className="relative mx-auto min-h-[720px] max-w-[1320px] overflow-hidden rounded-[34px] border border-white/12 bg-[#071a32] shadow-[0_36px_120px_rgba(0,0,0,.44)] sm:min-h-[680px] lg:min-h-[620px]">
        <Image
          src="/images/home/tgpi-home-global-knowledge-meridian-v1.webp"
          alt="TGPI Global Knowledge Meridian connecting country intelligence, comparison, preparation and learning"
          fill
          priority
          quality={88}
          sizes="(max-width: 767px) 100vw, (max-width: 1320px) 96vw, 1320px"
          className="object-cover object-[66%_center] sm:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,38,.99)_0%,rgba(4,20,38,.96)_34%,rgba(4,20,38,.68)_56%,rgba(4,20,38,.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,38,.16),transparent_55%,rgba(4,20,38,.88))]" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />

        <div className="relative z-10 flex min-h-[720px] flex-col justify-center px-6 py-11 sm:min-h-[680px] sm:px-10 lg:min-h-[620px] lg:px-14 lg:py-12">
          <div className="max-w-[700px]">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold)]/10 px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.23em] text-[var(--tgpi-gold-light)] sm:text-[10px]">
                Global decision intelligence
              </span>
              <span className="rounded-full border border-white/15 bg-black/15 px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/60 sm:text-[10px]">
                Built for life abroad
              </span>
            </div>

            <h1 className="mt-6 max-w-[690px] font-[var(--tgpi-font-display)] text-[clamp(3.2rem,6.2vw,5.55rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">
              Choose where to live, work or study—
              <span className="text-[var(--tgpi-gold-light)]">with evidence.</span>
            </h1>

            <p className="mt-6 max-w-[640px] text-base leading-8 text-[#D7E1EC] sm:text-lg">
              TGPI connects country intelligence, transparent comparison, document preparation and practical learning in one global decision system.
            </p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/onboarding"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-7 text-sm font-extrabold text-[var(--tgpi-navy-deep)] shadow-[0_18px_44px_rgba(197,150,50,.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Find my country fit
              </Link>
              <Link
                href="/compare"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-[#071a32]/35 px-7 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold-light)] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)]"
              >
                Compare countries
              </Link>
              <Link
                href="/countries"
                className="inline-flex min-h-12 items-center justify-center px-2 text-sm font-extrabold text-[var(--tgpi-gold-light)] underline decoration-white/20 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)]"
              >
                Explore all 195 profiles →
              </Link>
            </div>

            <dl className="mt-8 grid max-w-[650px] grid-cols-3 overflow-hidden rounded-2xl border border-white/12 bg-[#041426]/58 backdrop-blur-md">
              {homeSystemMetrics.map(([value, label]) => (
                <div key={label} className="border-r border-white/10 px-3 py-4 last:border-r-0 sm:px-5">
                  <dt className="mt-1 text-[8px] font-extrabold uppercase leading-4 tracking-[0.12em] text-white/45 sm:text-[9px]">
                    {label}
                  </dt>
                  <dd className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-gold-light)] sm:text-3xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden max-w-[270px] rounded-[22px] border border-white/15 bg-[#041426]/72 p-5 text-white shadow-[0_20px_55px_rgba(0,0,0,.28)] backdrop-blur-xl xl:block">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
            One connected architecture
          </p>
          <p className="mt-3 font-[var(--tgpi-font-display)] text-2xl font-semibold leading-tight">
            Explore. Compare. Prepare. Learn. Prove.
          </p>
        </div>
      </div>
    </section>
  );
}
