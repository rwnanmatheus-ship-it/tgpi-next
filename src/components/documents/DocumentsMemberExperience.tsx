import Link from "next/link";
import type { DocumentsMemberModel } from "@/lib/documents-os";

const statusLabels = {
  completed: "Ready",
  in_progress: "In progress",
  needs_attention: "Needs attention",
  not_started: "Not started",
} as const;

const statusStyles = {
  completed: "border-[#83C9A9]/45 bg-[#EAF7F0] text-[#176646]",
  in_progress: "border-[#D6B65F]/45 bg-[#FBF2D8] text-[#7B5818]",
  needs_attention: "border-[#D98B72]/45 bg-[#FFF0EA] text-[#91452E]",
  not_started: "border-[#D8D2C4] bg-[#F4F1EA] text-[#657082]",
} as const;

export default function DocumentsMemberExperience({
  firstName,
  globalId,
  model,
}: {
  firstName: string;
  globalId: string;
  model: DocumentsMemberModel;
}) {
  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <section className="relative overflow-hidden rounded-[36px] bg-[var(--tgpi-navy)] px-5 py-7 text-white shadow-[0_36px_100px_rgba(11,31,58,0.24)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[var(--tgpi-gold)]/20" />
          <div className="pointer-events-none absolute -bottom-36 right-24 h-80 w-80 rounded-full bg-[var(--tgpi-gold)]/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[var(--tgpi-gold)]">
                  TGPI Documents OS
                </p>
                <span className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/65">
                  Private command center
                </span>
              </div>
              <h1 className="mt-6 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3.2rem,7vw,6.2rem)] font-semibold leading-[0.87] tracking-[-0.055em]">
                {firstName}, turn preparation into progress.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Your destination research, readiness checks, learning evidence and
                verified achievements now share one strategic view.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={model.nextAction.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5"
                >
                  {model.nextAction.label}
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 px-6 text-sm font-extrabold text-white transition hover:border-white/45"
                >
                  Open global workspace
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[.9fr_1.1fr]">
              <article className="rounded-[28px] border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 p-6 backdrop-blur-sm">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold)]">
                  Document readiness
                </p>
                <p className="mt-5 font-[var(--tgpi-font-display)] text-7xl font-semibold leading-none tracking-[-0.06em]">
                  {model.readinessScore}
                  <span className="ml-1 text-2xl text-white/45">%</span>
                </p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[var(--tgpi-gold)]"
                    style={{ width: `${model.readinessScore}%` }}
                  />
                </div>
                <p className="mt-4 text-xs leading-6 text-white/55">
                  Preparation score, not legal approval or eligibility.
                </p>
              </article>

              <article className="rounded-[28px] border border-white/12 bg-white/[0.055] p-6 backdrop-blur-sm">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/45">
                  TGPI Global ID
                </p>
                <p className="mt-4 break-all font-[var(--tgpi-font-display)] text-2xl font-semibold text-white">
                  {globalId}
                </p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs text-white/45">Current objective</p>
                  <p className="mt-2 text-lg font-extrabold text-white">
                    {model.goalLabel}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-label="Document readiness metrics" className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            [String(model.countries.length), "Target countries"],
            [String(model.startedCountryReviews), "Reviews started"],
            [String(model.completedItems), "Items reviewed"],
            [model.goalLabel, "Primary objective"],
          ].map(([value, label]) => (
            <article key={label} className="rounded-[22px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-5">
              <p className="font-[var(--tgpi-font-display)] text-3xl font-semibold leading-none text-[var(--tgpi-navy)]">
                {value}
              </p>
              <p className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.17em] text-[var(--tgpi-muted)]">
                {label}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-5 shadow-[var(--tgpi-shadow-premium)] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
                  Destination files
                </p>
                <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em] text-[var(--tgpi-navy)]">
                  Country-aware preparation
                </h2>
              </div>
              <Link href="/countries" className="text-sm font-extrabold text-[var(--tgpi-gold-strong)]">
                Manage countries →
              </Link>
            </div>

            {model.countries.length > 0 ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {model.countries.map((country) => (
                  <article key={country.slug} className="rounded-[24px] border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span aria-hidden="true" className="text-3xl">{country.emoji}</span>
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-extrabold text-[var(--tgpi-navy)]">{country.name}</h3>
                          <p className="mt-1 text-xs text-[var(--tgpi-muted)]">
                            {country.totalItems > 0
                              ? `${country.completedItems}/${country.totalItems} research items`
                              : "Review not started"}
                          </p>
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full border px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] ${statusStyles[country.status]}`}>
                        {statusLabels[country.status]}
                      </span>
                    </div>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#E7E2D8]">
                      <div className="h-full rounded-full bg-[var(--tgpi-gold)]" style={{ width: `${country.percentage}%` }} />
                    </div>
                    <Link href={country.href} className="mt-5 inline-flex text-sm font-extrabold text-[var(--tgpi-gold-strong)]">
                      {country.status === "not_started" ? "Start document review" : "Continue document review"} →
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-[24px] border border-dashed border-[var(--tgpi-gold)]/55 bg-[var(--tgpi-gold-soft)] p-6 sm:p-8">
                <p className="text-lg font-extrabold text-[var(--tgpi-navy)]">No destination file yet.</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#4A3B1B]">
                  Choose a country and TGPI will connect its research checklist to this command center.
                </p>
                <Link href="/countries" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-5 text-sm font-extrabold text-white">
                  Choose my first country
                </Link>
              </div>
            )}
          </div>

          <aside className="rounded-[32px] bg-[#102B4C] p-6 text-white shadow-[0_28px_70px_rgba(11,31,58,0.18)] sm:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold)]">
              Next best action
            </p>
            <h2 className="mt-5 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em]">
              {model.nextAction.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/65">
              {model.nextAction.description}
            </p>
            <Link href={model.nextAction.href} className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy)]">
              {model.nextAction.label}
            </Link>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/40">System principle</p>
              <p className="mt-3 text-sm leading-7 text-white/65">
                TGPI measures preparation signals. It never presents a readiness score as a visa, admission or employment decision.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-[32px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-5 sm:p-8 lg:p-10">
          <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Readiness architecture</p>
              <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em] text-[var(--tgpi-navy)] sm:text-5xl">
                Six layers. One global strategy.
              </h2>
            </div>
            <p className="text-sm leading-7 text-[var(--tgpi-muted)]">
              Every layer has a distinct role. Identity and credentials remain separate from legal documents, while TGPI connects the evidence needed for better decisions.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {model.layers.map((layer, index) => (
              <Link key={layer.label} href={layer.href} className="group rounded-[24px] border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-5 transition hover:-translate-y-1 hover:border-[var(--tgpi-gold)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-gold-strong)]">0{index + 1}</span>
                  <span className={`rounded-full border px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] ${statusStyles[layer.status]}`}>
                    {statusLabels[layer.status]}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-[var(--tgpi-navy)]">{layer.label}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">{layer.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            ["Country Intelligence", "Validate the destination context behind every preparation decision.", "/countries", "Open countries"],
            ["TGPI Learning", "Build language and global capabilities that become meaningful evidence.", "/courses", "Open learning"],
            ["Verified Credentials", "Keep completed TGPI achievements distinct, signed and publicly verifiable.", "/certificates", "Open credentials"],
          ].map(([title, description, href, action]) => (
            <article key={title} className="rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-6 sm:p-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">Connected system</p>
              <h2 className="mt-4 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)]">{description}</p>
              <Link href={href} className="mt-7 inline-flex text-sm font-extrabold text-[var(--tgpi-gold-strong)]">{action} →</Link>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[28px] border border-[var(--tgpi-gold)]/45 bg-[var(--tgpi-gold-soft)] p-6 sm:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">Privacy boundary</p>
          <h2 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)]">Your workspace stores preparation progress — not copies of legal documents.</h2>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-[#4A3B1B]">
            TGPI will only request a legal file inside a clearly identified, secured verification workflow. A passport number, document image or TGPI Global ID is never a password or recovery secret.
          </p>
        </section>
      </div>
    </main>
  );
}
