import Link from "next/link";

const journey = [
  { number: "01", title: "Explore", description: "Scan 195 country profiles", href: "/countries" },
  { number: "02", title: "Compare", description: "See trade-offs side by side", href: "/compare" },
  { number: "03", title: "Learn", description: "Build practical global skills", href: "/courses" },
  { number: "04", title: "Prepare", description: "Turn a goal into next actions", href: "/onboarding" },
] as const;

const platformSignals = [
  "195 country profiles",
  "Side-by-side comparison",
  "Practical learning paths",
  "Connected planning",
] as const;

export default function HomeHeroV3() {
  return (
    <section className="relative overflow-hidden bg-[var(--tgpi-navy-deep)] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_18%,rgba(197,150,50,.18),transparent_24%),radial-gradient(circle_at_88%_12%,rgba(45,103,160,.28),transparent_28%),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:auto,auto,42px_42px,42px_42px]" />

      <div className="relative mx-auto grid max-w-[1320px] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(7,26,50,.98),rgba(11,36,66,.94))] shadow-[0_35px_120px_rgba(0,0,0,.42)] lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-20">
          <p className="w-fit rounded-full border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold)]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
            Global decision &amp; learning platform
          </p>

          <h1 className="mt-7 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3.35rem,7vw,6.35rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white">
            Explore the world. Build the skills to{" "}
            <span className="text-[var(--tgpi-gold-light)]">move through it.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#d7e0eb] sm:text-lg">
            Compare countries, understand trade-offs, learn practical skills and organize your next international move in one connected TGPI experience.
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Link href="/countries" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-7 text-sm font-extrabold text-[var(--tgpi-navy)] shadow-[0_18px_45px_rgba(197,150,50,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d8aa4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Explore 195 countries
            </Link>
            <Link href="/onboarding" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-7 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
              Build my global plan
            </Link>
            <Link href="/courses" className="inline-flex min-h-12 items-center justify-center px-3 text-sm font-extrabold text-[var(--tgpi-gold-light)] underline decoration-white/20 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
              Discover courses →
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="TGPI platform highlights">
            {platformSignals.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/70 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[560px] items-center overflow-hidden p-5 sm:p-8 lg:min-h-[680px] lg:p-10">
          <div className="absolute -right-32 top-8 h-[560px] w-[560px] rounded-full border border-[var(--tgpi-gold)]/15 bg-[radial-gradient(circle_at_35%_35%,rgba(240,213,140,.25),rgba(19,58,96,.28)_35%,rgba(7,26,50,.12)_62%,transparent_68%)] shadow-[0_0_120px_rgba(197,150,50,.14)]" />
          <div className="absolute -right-12 top-20 h-[420px] w-[420px] rounded-full border border-white/10 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:34px_34px]" />

          <div className="relative z-10 w-full rounded-[30px] border border-white/15 bg-[#0b2747]/90 p-5 text-white shadow-[0_35px_90px_rgba(0,0,0,.38)] backdrop-blur-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">Start with what you need</p>
                <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white sm:text-4xl">Your TGPI journey</h2>
              </div>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/65">Portal preview</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {journey.map((step) => (
                <Link key={step.title} href={step.href} className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-extrabold tracking-[0.2em] text-[var(--tgpi-gold-light)]">{step.number}</span>
                    <span className="text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
                  </div>
                  <h3 className="mt-5 font-[var(--tgpi-font-display)] text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/55">{step.description}</p>
                </Link>
              ))}
            </div>

            <p className="mt-5 rounded-2xl border border-[var(--tgpi-gold)]/20 bg-[var(--tgpi-gold)]/10 px-4 py-3 text-xs leading-6 text-[#e9dfc8]">
              Start anywhere. Each path connects back to the same global plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
