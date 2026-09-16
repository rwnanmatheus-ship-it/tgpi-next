import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";

const fitSignals = [
  ["Priorities", "Career · language · long-term mobility"],
  ["Context", "Budget, timeline and personal constraints"],
  ["Output", "Questions, gaps and next actions"],
] as const;

const comparison = [
  { country: "Portugal", code: "PRT", signals: ["Lifestyle context", "Language pathway", "Housing pressure"] },
  { country: "Canada", code: "CAN", signals: ["Career context", "Institution checks", "Housing pressure"] },
  { country: "United Kingdom", code: "GBR", signals: ["Academic leverage", "Employer pathway", "Cost pressure"] },
] as const;

const graphNodes = [
  ["Country data", "Source-linked national context", "globe"],
  ["Your priorities", "Goals, budget, languages and timeline", "target"],
  ["Decision model", "Visible criteria and trade-offs", "compare"],
  ["Action plan", "Research, documents and capability", "check"],
] as const;

export default function HomeDecisionLab() {
  return (
    <section className="overflow-hidden bg-[var(--tgpi-navy-deep)] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8" aria-labelledby="decision-lab-title">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-light)]">See the system before you commit</p>
          <h2 id="decision-lab-title" className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5.6vw,5.3rem)] font-semibold leading-[.92] tracking-[-.05em] text-white">
            From personal context to an explainable decision.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#CAD6E4] sm:text-lg">TGPI does not produce a mysterious score. It connects your context to visible evidence, exposes uncertainty and helps you choose the next question.</p>
        </div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
          <article className="tgpi-card-3d min-w-0 rounded-[30px] border border-white/12 bg-white/[.05] p-5 sm:p-7" data-tgpi-depth="floating" data-tgpi-tone="glass">
            <div className="flex items-start justify-between gap-5">
              <div><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[var(--tgpi-gold-light)]">Country Fit demo</p><h3 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold sm:text-4xl">Your context comes first.</h3></div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--tgpi-gold)]/12 text-[var(--tgpi-gold-light)]"><NavigationIcon name="compass" /></span>
            </div>
            <div className="mt-7 grid gap-3">
              {fitSignals.map(([label, value], index) => (
                <div key={label} className="grid grid-cols-[38px_minmax(0,1fr)] gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-[10px] font-extrabold text-[var(--tgpi-gold-light)]">0{index + 1}</span>
                  <div><p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-white/42">{label}</p><p className="mt-1 text-sm font-bold leading-6 text-white/88">{value}</p></div>
                </div>
              ))}
            </div>
            <Link href="/country-fit?country=portugal&goal=work" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)]">Open Country Fit <NavigationIcon name="arrow" width={18} height={18} /></Link>
          </article>

          <article className="tgpi-card-3d min-w-0 overflow-hidden rounded-[30px] border border-white/12 bg-white/[.05]" data-tgpi-depth="floating" data-tgpi-tone="glass">
            <div className="flex items-start justify-between gap-5 p-5 sm:p-7">
              <div><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[var(--tgpi-gold-light)]">Compare demo</p><h3 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold sm:text-4xl">Three futures. One frame.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">A qualitative preview of the questions each option raises—not a destination ranking.</p></div>
              <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--tgpi-gold)]/12 text-[var(--tgpi-gold-light)] sm:grid"><NavigationIcon name="compare" /></span>
            </div>
            <div className="overflow-x-auto px-5 pb-5 [scrollbar-width:thin] sm:px-7 sm:pb-7">
              <div className="grid min-w-[690px] grid-cols-3 gap-3">
                {comparison.map((item) => (
                  <div key={item.code} className="rounded-[22px] border border-white/10 bg-black/10 p-4">
                    <p className="text-[10px] font-extrabold tracking-[.18em] text-[var(--tgpi-gold-light)]">{item.code}</p>
                    <h4 className="mt-2 font-[var(--tgpi-font-display)] text-2xl font-semibold">{item.country}</h4>
                    <ul className="mt-5 space-y-2">
                      {item.signals.map((signal, index) => <li key={signal} className="flex items-center gap-2 rounded-xl bg-white/[.05] px-3 py-2 text-xs font-bold text-white/70"><span className={index === 2 ? "text-[#E8B76A]" : "text-[#7EC6B8]"}>{index === 2 ? "!" : "✓"}</span>{signal}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 p-5 sm:px-7">
              <Link href="/compare?country=portugal&country=canada&country=united-kingdom&goal=work" className="inline-flex min-h-12 items-center gap-3 text-sm font-extrabold text-[var(--tgpi-gold-light)] transition hover:text-white">Open this comparison <NavigationIcon name="arrow" width={18} height={18} /></Link>
            </div>
          </article>
        </div>

        <article className="relative mt-5 overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(120deg,#102d50,#06182d)] p-5 shadow-[0_34px_90px_rgba(0,0,0,.25)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_85%_18%,rgba(196,149,54,.2),transparent_25%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:auto,36px_36px,36px_36px]" />
          <div className="relative grid gap-9 lg:grid-cols-[.62fr_1.38fr] lg:items-center">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[var(--tgpi-gold-light)]">TGPI Intelligence Graph</p>
              <h3 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[.96] sm:text-5xl">Understand why a path fits.</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">The graph connects evidence, personal context and capability gaps. Every conclusion remains traceable to the inputs that shaped it.</p>
              <Link href="/intelligence" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-2xl border border-white/18 px-5 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)]">View sources & methodology <NavigationIcon name="arrow" width={18} height={18} /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {graphNodes.map(([title, detail, icon], index) => (
                <div key={title} className="tgpi-card-3d relative min-w-0 rounded-[22px] border border-white/10 bg-white/[.055] p-5" data-tgpi-depth="subtle" data-tgpi-tone="glass">
                  <div className="flex items-center justify-between gap-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.07] text-[var(--tgpi-gold-light)]"><NavigationIcon name={icon as "globe" | "target" | "compare" | "check"} width={19} height={19} /></span><span className="text-[10px] font-extrabold text-white/28">0{index + 1}</span></div>
                  <h4 className="mt-5 font-[var(--tgpi-font-display)] text-2xl font-semibold">{title}</h4><p className="mt-2 text-xs leading-6 text-white/50">{detail}</p>
                  {index < graphNodes.length - 1 ? <span aria-hidden="true" className="absolute -bottom-4 left-1/2 z-10 text-[var(--tgpi-gold-light)]/45 sm:-right-4 sm:bottom-auto sm:left-auto sm:top-1/2">→</span> : null}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
