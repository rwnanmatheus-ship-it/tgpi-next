import Link from "next/link";

const shortlist = [
  ["Portugal", "84", "Adaptation + mobility"],
  ["Spain", "82", "Lifestyle + language"],
  ["Netherlands", "79", "Career + infrastructure"],
] as const;

const trustSignals = ["195 countries", "100+ signals", "Official sources", "Editorial review"] as const;

export default function HomeHeroV3() {
  return (
    <section className="relative overflow-hidden bg-[var(--tgpi-navy-deep)] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_18%,rgba(197,150,50,.18),transparent_24%),radial-gradient(circle_at_88%_12%,rgba(45,103,160,.28),transparent_28%),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:auto,auto,42px_42px,42px_42px]" />

      <div className="relative mx-auto grid max-w-[1320px] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(7,26,50,.96),rgba(11,36,66,.94))] shadow-[0_35px_120px_rgba(0,0,0,.42)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-20">
          <p className="w-fit rounded-full border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold)]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
            Global decision intelligence
          </p>

          <h1 className="mt-7 max-w-3xl font-[var(--tgpi-font-display)] text-[clamp(3.35rem,7vw,6.35rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white">
            Compare the world before you <span className="text-[var(--tgpi-gold-light)]">choose.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#cfdae7] sm:text-lg">
            Build your international strategy through countries, careers, costs, education, documents and decision tools in one connected system.
          </p>

          <div className="mt-8 grid gap-3 sm:flex">
            <Link
              href="/onboarding"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-7 text-sm font-extrabold text-[var(--tgpi-navy)] shadow-[0_18px_45px_rgba(197,150,50,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8aa4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Find your country fit →
            </Link>
            <Link
              href="/countries"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              Explore 195 countries
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trustSignals.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.12em] text-white/65 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] overflow-hidden p-5 text-white sm:p-8 lg:min-h-[680px] lg:p-10">
          <div className="absolute -right-28 top-4 h-[560px] w-[560px] rounded-full border border-[var(--tgpi-gold)]/15 bg-[radial-gradient(circle_at_35%_35%,rgba(240,213,140,.28),rgba(19,58,96,.28)_35%,rgba(7,26,50,.12)_62%,transparent_68%)] shadow-[0_0_120px_rgba(197,150,50,.14)]" />
          <div className="absolute -right-16 top-16 h-[440px] w-[440px] rounded-full border border-white/10 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="absolute right-20 top-24 h-2 w-2 rounded-full bg-[var(--tgpi-gold-light)] shadow-[0_0_22px_6px_rgba(240,213,140,.45)]" />
          <div className="absolute right-56 top-52 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_5px_rgba(255,255,255,.35)]" />
          <div className="absolute right-32 top-80 h-1.5 w-1.5 rounded-full bg-[var(--tgpi-gold)] shadow-[0_0_18px_5px_rgba(197,150,50,.4)]" />

          <div className="relative z-10 mt-16 rounded-[30px] border border-white/15 bg-[#0b2747]/88 p-5 shadow-[0_35px_90px_rgba(0,0,0,.38)] backdrop-blur-2xl sm:p-7 lg:mt-24">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">TGPI Decision OS</p>
                <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white sm:text-4xl">Move to Europe</h2>
              </div>
              <span className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-200">Profile active</span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_.8fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/55">Country fit</p>
                    <p className="mt-2 font-[var(--tgpi-font-display)] text-6xl font-semibold text-[var(--tgpi-gold-light)]">84%</p>
                  </div>
                  <p className="text-xs font-bold text-emerald-200">+6 this month</p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[84%] rounded-full bg-[linear-gradient(90deg,#c59632,#f0d58c)]" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/55">Next blocker</p>
                <p className="mt-3 text-lg font-bold text-white">Language certificate</p>
                <p className="mt-2 text-sm text-white/55">Prepare · Validate · Submit</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {shortlist.map(([country, score, note], index) => (
                <div key={country} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/50 hover:bg-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-extrabold text-[var(--tgpi-gold-light)]">{index + 1}</span>
                    <div>
                      <p className="font-bold text-white">{country}</p>
                      <p className="text-xs text-white/45">{note}</p>
                    </div>
                  </div>
                  <span className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-gold-light)]">{score}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2">
              {[["Budget", "72"], ["Skills", "84"], ["Docs", "58"], ["Timeline", "66"]].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/10 p-3 text-center">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/40">{label}</p>
                  <p className="mt-1 text-sm font-extrabold text-white">{value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
