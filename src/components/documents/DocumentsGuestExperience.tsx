import Link from "next/link";
import DocumentsPathfinder from "@/components/documents/DocumentsPathfinder";

const method = [
  {
    number: "01",
    title: "Discover",
    description: "Understand which records matter for your objective and destination.",
  },
  {
    number: "02",
    title: "Prepare",
    description: "Turn scattered requirements into a sequenced readiness plan.",
  },
  {
    number: "03",
    title: "Review",
    description: "Track research gaps and keep time-sensitive information visible.",
  },
  {
    number: "04",
    title: "Connect",
    description: "Link country, learning and credential evidence to one global identity.",
  },
];

const connectedSystem = [
  {
    eyebrow: "Country Intelligence",
    title: "Requirements need context.",
    description:
      "Move from a generic list to destination-aware research, comparison and next actions.",
    href: "/countries",
    action: "Explore countries",
  },
  {
    eyebrow: "TGPI Learning",
    title: "Skills become evidence.",
    description:
      "Build the language and global capabilities that strengthen real mobility outcomes.",
    href: "/courses",
    action: "Explore learning",
  },
  {
    eyebrow: "Global Workspace",
    title: "One decision system.",
    description:
      "Keep objectives, countries, readiness and future verified achievements connected.",
    href: "/sign-up?redirect_url=/passport",
    action: "Create my workspace",
  },
];

function DocumentsHeroVisual() {
  return (
    <div
      aria-label="Illustration of the TGPI document readiness system"
      role="img"
      className="relative min-h-[390px] overflow-hidden rounded-[30px] border border-white/12 bg-[#102B4C] p-5 shadow-[0_32px_90px_rgba(0,0,0,0.28)] sm:min-h-[440px] sm:p-7"
    >
      <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[var(--tgpi-gold)]/30" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[var(--tgpi-gold)]/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/50">
          Readiness architecture
        </p>
        <span className="rounded-full border border-[#9FE0C2]/25 bg-[#9FE0C2]/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#BDEBD5]">
          Privacy first
        </span>
      </div>

      <div className="relative mt-12 grid gap-3">
        {[
          ["Identity", "Foundation", "100%"],
          ["Country research", "Destination intelligence", "78%"],
          ["Document review", "Preparation progress", "58%"],
          ["Verified evidence", "Skills & credentials", "32%"],
        ].map(([label, detail, completion], index) => (
          <div
            key={label}
            className={`rounded-2xl border p-4 backdrop-blur-sm ${
              index === 0
                ? "border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold)]/10"
                : "border-white/10 bg-white/[0.055]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold text-white">{label}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
                  {detail}
                </p>
              </div>
              <p className="font-[var(--tgpi-font-display)] text-xl font-semibold text-[var(--tgpi-gold)]">
                {completion}
              </p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[var(--tgpi-gold)]"
                style={{ width: completion }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#081A30]/70 px-4 py-3">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">
          TGPI Global ID
        </p>
        <p className="text-xs font-extrabold tracking-[0.12em] text-white">
          ONE CONNECTED IDENTITY
        </p>
      </div>
    </div>
  );
}

export default function DocumentsGuestExperience({
  countryCount,
}: {
  countryCount: number;
}) {
  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <section className="relative overflow-hidden rounded-[36px] bg-[var(--tgpi-navy)] px-5 py-7 text-white shadow-[0_36px_100px_rgba(11,31,58,0.24)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/[0.06]" />
          <div className="relative grid gap-9 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[var(--tgpi-gold)]">
                  TGPI Documents OS
                </p>
                <span className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/65">
                  Research · readiness · evidence
                </span>
              </div>
              <h1 className="mt-6 max-w-3xl font-[var(--tgpi-font-display)] text-[clamp(3.25rem,7vw,6.4rem)] font-semibold leading-[0.86] tracking-[-0.055em]">
                Your global plans deserve more than a checklist.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Build a living preparation system around your identity, destination,
                objective and evidence. TGPI helps you know what to research, what to
                prepare and what comes next.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sign-up?redirect_url=/passport"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5"
                >
                  Build my document strategy
                </Link>
                <Link
                  href="/sign-in?redirect_url=/passport"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 px-6 text-sm font-extrabold text-white transition hover:border-white/45"
                >
                  Open my workspace
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-7">
                {[
                  [String(countryCount), "country profiles"],
                  ["4", "global objectives"],
                  ["1", "connected identity"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-[var(--tgpi-font-display)] text-3xl font-semibold text-white sm:text-4xl">
                      {value}
                    </p>
                    <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <DocumentsHeroVisual />
          </div>
        </section>

        <DocumentsPathfinder />

        <section className="mt-8 rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-5 sm:p-8 lg:p-10">
          <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
                The TGPI method
              </p>
              <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em] text-[var(--tgpi-navy)] sm:text-5xl">
                From uncertainty to an executable plan.
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-[var(--tgpi-muted)]">
              TGPI does not decide legal eligibility or replace official authorities.
              It gives every user a clearer research architecture and a responsible
              path to verify current requirements.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {method.map((step) => (
              <article key={step.number} className="rounded-[24px] border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-5">
                <p className="font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-gold-strong)]">
                  {step.number}
                </p>
                <h3 className="mt-6 text-xl font-extrabold text-[var(--tgpi-navy)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="documents-connected-title" className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
            One TGPI system
          </p>
          <h2 id="documents-connected-title" className="mt-3 max-w-4xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em] text-[var(--tgpi-navy)] sm:text-5xl">
            Documents become more valuable when they connect to the whole journey.
          </h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {connectedSystem.map((item) => (
              <article key={item.eyebrow} className="group rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--tgpi-gold)] sm:p-7">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)]">
                  {item.description}
                </p>
                <Link href={item.href} className="mt-7 inline-flex text-sm font-extrabold text-[var(--tgpi-gold-strong)]">
                  {item.action} →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold-soft)] p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
                A responsible boundary
              </p>
              <h2 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)]">
                TGPI organizes readiness — official authorities make legal decisions.
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[#4A3B1B]">
                Requirements change by citizenship, personal profile, destination and
                time. Always validate critical information with the relevant government,
                institution or qualified professional.
              </p>
            </div>
            <Link href="/authority" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#8A641F]/30 bg-white/65 px-5 text-sm font-extrabold text-[var(--tgpi-navy)]">
              View TGPI methodology
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
