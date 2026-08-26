import Link from "next/link";

const journey = [
  {
    number: "01",
    label: "Explore",
    title: "Discover the full country system",
    description: "Move beyond tourism and understand how daily life, work, study, rules and mobility connect.",
    href: "#country-explorer",
    action: "Explore countries",
  },
  {
    number: "02",
    label: "Compare",
    title: "See the trade-offs clearly",
    description: "Place up to three destinations side by side using the same decision framework.",
    href: "/compare",
    action: "Open comparison",
  },
  {
    number: "03",
    label: "Prepare",
    title: "Turn knowledge into readiness",
    description: "Connect the country to documents, checklists, risks and practical next actions.",
    href: "/passport",
    action: "Open Documents OS",
  },
  {
    number: "04",
    label: "Prove",
    title: "Transform study into evidence",
    description: "Use assessments and learning records to build verifiable country knowledge over time.",
    href: "/certificates",
    action: "View certificates",
  },
] as const;

const knowledgeAreas = [
  ["Culture & etiquette", "Social rules, communication and daily behaviour"],
  ["Money & daily life", "Currencies, payments, housing and realistic cost profiles"],
  ["Work & careers", "Labour context, professional norms and opportunity signals"],
  ["Study & recognition", "Education routes, institutions and credential questions"],
  ["Entry & documents", "Visas, identity documents and official verification paths"],
  ["Family & pets", "Dependants, minors, animals and household mobility"],
  ["Law & safety", "Local rules, common risks and responsible preparation"],
  ["Mobility & services", "Transport, healthcare, connectivity and public systems"],
] as const;

const standards = [
  "Show a source and review date for changeable facts.",
  "Separate national context from city-level conditions.",
  "Explain how rules change by nationality, goal and personal profile.",
] as const;

export default function CountriesLearningOS() {
  return (
    <section aria-labelledby="country-learning-os-title" className="mt-10 overflow-hidden rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-soft)]">
      <div className="grid lg:grid-cols-[1.08fr_.92fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
            TGPI Country Learning OS
          </p>
          <h2 id="country-learning-os-title" className="mt-4 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.94] text-[var(--tgpi-navy)]">
            A country is a system you can learn.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tgpi-muted)]">
            Every TGPI country profile should teach users how to understand a place,
            compare it responsibly, prepare for real situations and prove what they learned.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {journey.map((item) => (
              <Link key={item.number} href={item.href} className="group rounded-[24px] border border-[var(--tgpi-border)] bg-white p-5 transition hover:-translate-y-1 hover:border-[var(--tgpi-gold)] hover:shadow-[var(--tgpi-shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">{item.label}</p>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--tgpi-gold-soft)] text-xs font-extrabold text-[var(--tgpi-navy)]">{item.number}</span>
                </div>
                <h3 className="mt-5 font-[var(--tgpi-font-display)] text-2xl font-semibold leading-tight text-[var(--tgpi-navy)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--tgpi-navy)]">
                  {item.action}<span className="text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-[var(--tgpi-navy)] p-6 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">Knowledge architecture</p>
          <h3 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">What every country should teach</h3>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {knowledgeAreas.map(([title, description], index) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <div className="flex gap-3">
                  <span className="mt-0.5 text-xs font-extrabold text-[var(--tgpi-gold-light)]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-extrabold text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#B9C7D8]">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-[var(--tgpi-gold-light)]/25 bg-black/15 p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">Country knowledge standard</p>
            <ul className="mt-4 grid gap-3">
              {standards.map((standard) => (
                <li key={standard} className="flex gap-3 text-sm leading-6 text-[#D7E0EB]">
                  <span aria-hidden="true" className="text-[var(--tgpi-gold-light)]">✓</span>
                  {standard}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
