import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import type {
  GlobalWorkspaceModel,
  WorkspaceActionStatus,
} from "@/lib/global-workspace";

type PersonalPlanDashboardProps = {
  firstName: string;
  model: GlobalWorkspaceModel;
};

const statusLabels: Record<WorkspaceActionStatus, string> = {
  completed: "Completed",
  in_progress: "In progress",
  needs_attention: "Context needed",
  not_started: "Ready to start",
};

const statusStyles: Record<WorkspaceActionStatus, string> = {
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  in_progress: "border-blue-200 bg-blue-50 text-blue-800",
  needs_attention: "border-amber-200 bg-amber-50 text-amber-900",
  not_started: "border-slate-200 bg-slate-50 text-slate-700",
};

const journeyIcons = {
  decide: "compare",
  develop: "book",
  discover: "compass",
  prepare: "file",
} as const;

export default function PersonalPlanDashboard({
  firstName,
  model,
}: PersonalPlanDashboardProps) {
  const currentStage =
    model.journey.find((stage) => stage.id === model.currentStageId) ??
    model.journey[0];
  const nextAction =
    model.actions.find((action) => action.status !== "completed") ??
    model.actions.at(-1);

  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] pb-24 text-[var(--tgpi-ink)] lg:pb-16">
      <section className="relative overflow-hidden bg-[var(--tgpi-navy-deep)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_10%,rgba(196,149,54,.24),transparent_28%),radial-gradient(circle_at_88%_8%,rgba(36,87,127,.42),transparent_30%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:auto,auto,42px_42px,42px_42px]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)] lg:items-end lg:px-8 lg:py-20">
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
              TGPI Personal Global Plan · V1
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl leading-[0.95] sm:text-5xl lg:text-7xl">
              Your next move,
              <br />connected.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              {firstName}, this is your canonical decision layer: one place for your goal,
              shortlist, evidence, preparation and learning progress.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {nextAction ? (
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-[var(--tgpi-gold)] px-5 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  href={nextAction.href}
                >
                  {nextAction.action}
                  <NavigationIcon name="arrow" width={18} height={18} />
                </Link>
              ) : null}
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-5 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold)]/60 hover:bg-white/[0.1]"
                href="/onboarding"
              >
                Edit plan context
              </Link>
            </div>
          </div>

          <aside className="min-w-0 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">
                  Plan foundation
                </p>
                <p className="mt-2 text-3xl font-extrabold text-white">
                  {model.completion}%
                </p>
              </div>
              <div
                aria-label={`${model.completion}% plan foundation complete`}
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full p-2"
                role="img"
                style={{
                  background: `conic-gradient(var(--tgpi-gold) ${model.completion}%, rgba(255,255,255,.12) 0)`,
                }}
              >
                <span className="grid h-full w-full place-items-center rounded-full bg-[var(--tgpi-navy-deep)] text-xs font-extrabold">
                  {model.progress.filter((item) => item.complete).length}/{model.progress.length}
                </span>
              </div>
            </div>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                Current stage
              </p>
              <p className="mt-1 text-lg font-extrabold">{currentStage.label}</p>
              <p className="mt-2 text-xs leading-6 text-white/60">
                {currentStage.description}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section aria-labelledby="journey-title">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                Connected decision system
              </p>
              <h2 id="journey-title" className="mt-2 text-3xl text-[var(--tgpi-navy)] sm:text-4xl">
                Your global decision journey
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--tgpi-muted)]">
              Every stage uses your saved context and real TGPI activity. Progress is never invented.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {model.journey.map((stage, index) => (
              <Link
                className={`group min-w-0 rounded-[1.5rem] border p-5 shadow-[var(--tgpi-shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--tgpi-shadow-soft)] ${
                  stage.id === model.currentStageId
                    ? "border-[var(--tgpi-gold)] bg-[var(--tgpi-navy)] text-white"
                    : "border-[var(--tgpi-border-soft)] bg-white text-[var(--tgpi-navy)]"
                }`}
                href={stage.href}
                key={stage.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${
                      stage.id === model.currentStageId
                        ? "bg-white/10 text-[var(--tgpi-gold-light)]"
                        : "bg-[var(--tgpi-blue-soft)] text-[var(--tgpi-blue)]"
                    }`}
                  >
                    <NavigationIcon name={journeyIcons[stage.id]} width={20} height={20} />
                  </span>
                  <span className="text-[10px] font-extrabold tracking-[0.18em] opacity-55">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-5 text-lg font-extrabold">{stage.label}</p>
                <p className="mt-2 min-h-12 text-xs leading-6 opacity-65">
                  {stage.description}
                </p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-current/10">
                  <div
                    className="h-full rounded-full bg-[var(--tgpi-gold)]"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-60">
                  <span>{statusLabels[stage.status]}</span>
                  <span>{stage.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)]">
          <section className="min-w-0 rounded-[1.75rem] border border-[var(--tgpi-border-soft)] bg-white p-5 shadow-[var(--tgpi-shadow-sm)] sm:p-7" aria-labelledby="context-title">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                  Canonical context
                </p>
                <h2 id="context-title" className="mt-2 text-3xl text-[var(--tgpi-navy)]">
                  Plan profile
                </h2>
              </div>
              <Link className="text-xs font-extrabold text-[var(--tgpi-gold-strong)]" href="/onboarding">
                Edit →
              </Link>
            </div>
            <dl className="mt-6 divide-y divide-[var(--tgpi-border-soft)]">
              {model.planSummary.map((item) => (
                <div className="grid gap-1 py-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-4" key={item.label}>
                  <dt className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-muted)]">
                    {item.label}
                  </dt>
                  <dd className="min-w-0 text-sm font-bold text-[var(--tgpi-navy)] sm:text-right">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="min-w-0 rounded-[1.75rem] border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-surface)] p-5 shadow-[var(--tgpi-shadow-sm)] sm:p-7" aria-labelledby="actions-title">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
              Priority engine
            </p>
            <h2 id="actions-title" className="mt-2 text-3xl text-[var(--tgpi-navy)]">
              Best next actions
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {model.actions.map((action) => (
                <Link
                  className="group min-w-0 rounded-2xl border border-[var(--tgpi-border-soft)] bg-white p-4 transition hover:border-[var(--tgpi-gold)] hover:shadow-[var(--tgpi-shadow-sm)]"
                  href={action.href}
                  key={action.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">
                      {action.eyebrow}
                    </p>
                    <span className={`rounded-full border px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] ${statusStyles[action.status]}`}>
                      {statusLabels[action.status]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl text-[var(--tgpi-navy)]">{action.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[var(--tgpi-muted)]">
                    {action.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[var(--tgpi-navy)] group-hover:text-[var(--tgpi-gold-strong)]">
                    {action.action}
                    <NavigationIcon name="arrow" width={16} height={16} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-[var(--tgpi-border-soft)] bg-white shadow-[var(--tgpi-shadow-sm)]" aria-labelledby="shortlist-title">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--tgpi-border-soft)] p-5 sm:flex-row sm:items-end sm:p-7">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                Decision shortlist
              </p>
              <h2 id="shortlist-title" className="mt-2 text-3xl text-[var(--tgpi-navy)]">
                Countries in your plan
              </h2>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--tgpi-border)] px-4 text-xs font-extrabold text-[var(--tgpi-navy)]" href="/country-fit">
                Refine Country Fit
              </Link>
              {model.selectedCountryCount >= 2 ? (
                <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--tgpi-navy)] px-4 text-xs font-extrabold text-white" href={model.compareHref}>
                  Compare shortlist
                </Link>
              ) : null}
            </div>
          </div>
          {model.countryFits.length ? (
            <div className="grid gap-px bg-[var(--tgpi-border-soft)] sm:grid-cols-2 lg:grid-cols-3">
              {model.countryFits.map(({ country, reasons, warning }) => (
                <article className="min-w-0 bg-white p-5 sm:p-6" key={country.slug}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">{country.emoji}</span>
                    <div className="min-w-0">
                      <h3 className="truncate text-xl text-[var(--tgpi-navy)]">{country.name}</h3>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-muted)]">{country.region}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs leading-5 text-[var(--tgpi-muted)]">
                    {(reasons.length ? reasons : ["Add priorities to personalize your research questions."]).map((reason) => (
                      <li className="flex gap-2" key={reason}><span className="text-[var(--tgpi-gold-strong)]">●</span><span>{reason}</span></li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-[var(--tgpi-border-soft)] pt-4 text-[10px] leading-5 text-[var(--tgpi-muted)]">
                    {warning}
                  </p>
                  <Link className="mt-4 inline-flex text-xs font-extrabold text-[var(--tgpi-gold-strong)]" href={`/countries/${country.slug}`}>
                    Open evidence dossier →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <p className="max-w-xl text-sm leading-7 text-[var(--tgpi-muted)]">
                Your shortlist is empty. Start with Country Fit to connect a destination to your goal, timeline and research priorities.
              </p>
              <Link className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--tgpi-navy)] px-5 text-sm font-extrabold text-white" href="/country-fit">
                Build my Country Fit
                <NavigationIcon name="arrow" width={17} height={17} />
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
