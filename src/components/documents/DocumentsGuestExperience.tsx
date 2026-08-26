import Image from "next/image";
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

export default function DocumentsGuestExperience({
  countryCount,
}: {
  countryCount: number;
}) {
  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <section className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)] sm:rounded-[36px]">
          <Image
            src="/images/documents/tgpi-documents-hero-v2.webp"
            alt="TGPI global evidence observatory connecting an illuminated world atlas with organized document research"
            fill
            priority
            quality={88}
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,38,0.94)_0%,rgba(4,20,38,0.89)_70%,rgba(4,20,38,0.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,20,38,0.99)_0%,rgba(4,20,38,0.94)_43%,rgba(4,20,38,0.38)_72%,rgba(4,20,38,0.12)_100%)]" />
          <div className="pointer-events-none absolute -left-24 top-[-7rem] h-80 w-80 rounded-full bg-[var(--tgpi-gold)]/10 blur-3xl" aria-hidden="true" />

          <div className="relative z-10 flex min-h-[620px] flex-col justify-center p-7 sm:min-h-[580px] sm:p-9 lg:h-[540px] lg:min-h-0 lg:p-10 xl:p-12">
            <div className="max-w-[680px]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                  TGPI Documents OS
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/60">
                  Research · readiness · evidence
                </span>
              </div>
              <h1 className="mt-5 max-w-2xl font-[var(--tgpi-font-display)] text-[clamp(2.65rem,4.5vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
                Your global plans deserve more than a checklist.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                Build a living preparation system around your identity, destination,
                objective and evidence. Know what to research, what to prepare and
                what comes next.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sign-up?redirect_url=/passport"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Build my document strategy
                </Link>
                <Link
                  href="/sign-in?redirect_url=/passport"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
                >
                  Open my workspace
                </Link>
              </div>

              <dl className="mt-6 grid max-w-xl grid-cols-3 gap-2 border-t border-white/10 pt-5">
                {[
                  [String(countryCount), "Country profiles"],
                  ["04", "Global objectives"],
                  ["01", "Connected identity"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="text-2xl font-extrabold text-[var(--tgpi-gold-light)]">
                      {value}
                    </dt>
                    <dd className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/45">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="absolute bottom-8 right-9 hidden max-w-[270px] rounded-[22px] border border-white/15 bg-[var(--tgpi-navy-deep)]/55 p-5 text-right backdrop-blur-md lg:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                The TGPI Documents System
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-white/85">
                One connected readiness profile for global action.
              </p>
            </div>
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
