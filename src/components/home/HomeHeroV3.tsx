import Image from "next/image";
import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { homeSystemMetrics } from "@/data/home-system";

const decisionSignals = [
  ["Goal", "Live + build a career"],
  ["Shortlist", "Portugal · Canada · UK"],
  ["Next move", "Compare trade-offs"],
] as const;

export default function HomeHeroV3() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--tgpi-navy-deep)] px-3 pb-5 pt-3 sm:px-6 sm:pb-7 sm:pt-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_9%_10%,rgba(197,150,50,.2),transparent_25%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:auto,44px_44px,44px_44px]" />

      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border border-white/12 bg-[#06182d] shadow-[0_40px_130px_rgba(0,0,0,.45)] sm:rounded-[38px]">
        <Image
          src="/images/home/tgpi-home-global-knowledge-meridian-v1.webp"
          alt="TGPI global intelligence environment connecting countries, comparison and personal preparation"
          fill
          priority
          quality={88}
          sizes="(max-width: 767px) 100vw, (max-width: 1400px) 96vw, 1400px"
          className="object-cover object-[69%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,38,.99)_0%,rgba(3,20,38,.95)_38%,rgba(3,20,38,.62)_70%,rgba(3,20,38,.34)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,20,38,.06),rgba(3,20,38,.25)_55%,rgba(3,20,38,.94))]" />

        <div className="relative z-10 grid min-h-[760px] gap-10 px-5 py-10 sm:min-h-[720px] sm:px-9 sm:py-14 lg:min-h-[690px] lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-14 xl:px-16">
          <div className="min-w-0 max-w-[760px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--tgpi-gold)]/50 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)] sm:px-4">Global decision intelligence</span>
              <span className="rounded-full border border-white/15 bg-black/15 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/65 sm:px-4">Evidence → decision → action</span>
            </div>

            <h1 className="mt-7 max-w-[740px] font-[var(--tgpi-font-display)] text-[clamp(3.1rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-white">
              Don&apos;t choose countries. <span className="text-[var(--tgpi-gold-light)]">Find where your life fits.</span>
            </h1>
            <p className="mt-7 max-w-[650px] text-[15px] leading-7 text-[#D8E1EC] sm:text-lg sm:leading-8">
              Compare countries, understand the trade-offs and turn a global ambition into a personal plan—inside one connected TGPI system.
            </p>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Link href="/country-fit" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] shadow-[0_18px_44px_rgba(197,150,50,.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Start my Country Fit <NavigationIcon name="arrow" width={18} height={18} />
              </Link>
              <Link href="/compare?country=portugal&country=canada&country=united-kingdom" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/25 bg-[#071a32]/45 px-6 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold-light)] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)]">
                See Compare in action <NavigationIcon name="compare" width={18} height={18} />
              </Link>
            </div>

            <dl className="mt-8 grid max-w-[650px] grid-cols-3 overflow-hidden rounded-2xl border border-white/12 bg-[#041426]/62 backdrop-blur-md">
              {homeSystemMetrics.map(([value, label]) => (
                <div key={label} className="min-w-0 border-r border-white/10 px-3 py-4 last:border-r-0 sm:px-5">
                  <dt className="mt-1 text-[9px] font-extrabold uppercase leading-4 tracking-[0.1em] text-white/48 sm:text-[10px]">{label}</dt>
                  <dd className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-gold-light)] sm:text-3xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-w-0 lg:pl-6">
            <div className="tgpi-card-3d relative overflow-hidden rounded-[28px] border border-white/15 bg-[#071a32]/82 p-4 text-white backdrop-blur-xl sm:p-5" data-tgpi-depth="hero" data-tgpi-tone="glass">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">Live product preview</p>
                  <p className="mt-2 font-[var(--tgpi-font-display)] text-2xl font-semibold">Your global decision room</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 text-[var(--tgpi-gold-light)]"><NavigationIcon name="compass" /></span>
              </div>

              <div className="mt-4 grid gap-3">
                {decisionSignals.map(([label, value], index) => (
                  <div key={label} className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-3.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.07] text-[10px] font-extrabold text-[var(--tgpi-gold-light)]">0{index + 1}</span>
                    <div className="min-w-0"><p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/42">{label}</p><p className="mt-1 truncate text-sm font-bold text-white/90">{value}</p></div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Cost", "Career", "Lifestyle"].map((signal, index) => (
                  <div key={signal} className="rounded-xl border border-white/10 bg-white/[0.045] px-2 py-3 text-center">
                    <span className="mx-auto block h-1.5 rounded-full bg-white/10"><span className="block h-full rounded-full bg-[var(--tgpi-gold)]" style={{ width: `${58 + index * 13}%` }} /></span>
                    <span className="mt-2 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/58">{signal}</span>
                  </div>
                ))}
              </div>

              <Link href="/profile" className="mt-4 flex min-h-12 items-center justify-between rounded-2xl bg-white px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:bg-[var(--tgpi-gold-light)]">
                Open the connected workspace <NavigationIcon name="arrow" width={17} height={17} />
              </Link>
            </div>
            <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-white/42 lg:text-left">Product interface preview · your results depend on your context</p>
          </div>
        </div>
      </div>
    </section>
  );
}
