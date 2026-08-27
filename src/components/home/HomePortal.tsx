import Link from "next/link";
import { homeIntents, homeSystemStages } from "@/data/home-system";

export default function HomePortal() {
  return (
    <section
      id="home-portal"
      className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="home-portal-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
              Enter by intention
            </p>
            <h2
              id="home-portal-title"
              className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]"
            >
              Start with the decision in front of you.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              You do not need to understand the entire platform first. Choose your current objective and TGPI connects the next relevant layer.
            </p>
          </div>
          <span className="w-fit rounded-full border border-[var(--tgpi-border)] bg-white px-4 py-2 text-xs font-extrabold text-[var(--tgpi-navy)] shadow-[var(--tgpi-shadow-sm)]">
            Explore publicly · connect progress later
          </span>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {homeIntents.map((intent, index) => (
            <Link
              key={intent.label}
              href={intent.href}
              data-tgpi-home-entry={intent.label}
              className="group relative overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-6 shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)] hover:shadow-[var(--tgpi-shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[var(--tgpi-gold)]/18 bg-[var(--tgpi-gold-soft)]/40 transition duration-500 group-hover:scale-125" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.21em] text-[var(--tgpi-gold-strong)]">
                    {intent.label}
                  </p>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--tgpi-border)] bg-white text-xs font-extrabold text-[var(--tgpi-navy)]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-8 max-w-xl font-[var(--tgpi-font-display)] text-3xl font-semibold leading-tight text-[var(--tgpi-navy)] sm:text-4xl">
                  {intent.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--tgpi-muted)]">
                  {intent.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--tgpi-navy)]">
                  {intent.action}
                  <span className="text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[32px] border border-white/10 bg-[var(--tgpi-navy-deep)] p-5 text-white shadow-[0_34px_95px_rgba(7,26,50,.22)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_88%_0%,rgba(39,92,145,.34),transparent_28%),radial-gradient(circle_at_14%_20%,rgba(197,150,50,.17),transparent_25%),linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] [background-size:auto,auto,38px_38px,38px_38px]" />
          <div className="relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">
                  TGPI product architecture
                </p>
                <h3 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.96] sm:text-5xl">
                  One decision. Five connected layers.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#C9D5E3] sm:text-base">
                  Every product has a distinct job, but none is designed as an isolated destination.
                </p>
              </div>
              <Link
                href="/why"
                className="inline-flex min-h-12 w-fit items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)]"
              >
                Why the system exists
              </Link>
            </div>

            <nav
              className="-mx-1 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
              aria-label="TGPI product architecture"
            >
              {homeSystemStages.map((stage) => (
                <Link
                  key={stage.number}
                  href={stage.href}
                  data-tgpi-system-stage={stage.title}
                  className="group min-w-[78vw] snap-center rounded-[24px] border border-white/12 bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)]/60 hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold-light)] sm:min-w-[46vw] lg:min-w-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-extrabold tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                      {stage.number}
                    </span>
                    <span className="text-[var(--tgpi-gold-light)]/60 transition group-hover:translate-x-1">→</span>
                  </div>
                  <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                    {stage.product}
                  </p>
                  <h4 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">
                    {stage.title}
                  </h4>
                  <p className="mt-3 min-h-[5.25rem] text-xs leading-6 text-white/55">
                    {stage.description}
                  </p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]">
                      Designed outcome
                    </p>
                    <p className="mt-2 text-xs font-bold leading-5 text-white/75">{stage.outcome}</p>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
