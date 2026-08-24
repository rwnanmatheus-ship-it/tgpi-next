import Image from "next/image";
import Link from "next/link";
import {
  formatCurrencyAmount,
  getCountryImageAlt,
  getCountryImageUrl,
} from "@/lib/countries";
import type {
  GlobalWorkspaceModel,
  WorkspaceAction,
  WorkspaceActionStatus,
} from "@/lib/global-workspace";

type GlobalWorkspaceV1Props = {
  firstName: string;
  model: GlobalWorkspaceModel;
};

const actionNumbers: Record<WorkspaceAction["id"], string> = {
  compare: "01",
  documents: "02",
  learning: "03",
  cost: "04",
  profile: "05",
};

const statusLabels: Record<WorkspaceActionStatus, string> = {
  completed: "Completed",
  in_progress: "In progress",
  needs_attention: "Needs attention",
  not_started: "Not started",
};

export default function GlobalWorkspaceV1({
  firstName,
  model,
}: GlobalWorkspaceV1Props) {
  const primaryAction =
    model.actions.find((action) => action.status === "in_progress") ??
    model.actions.find((action) => action.status === "not_started") ??
    model.actions.find((action) => action.status === "needs_attention") ??
    model.actions[0];

  return (
    <div className="grid gap-8">
      <section className="overflow-hidden rounded-[32px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_24px_70px_rgba(11,31,58,0.08)]">
        <div className="grid lg:grid-cols-[1.12fr_.88fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
              Your plan, activated
            </p>
            <h2 className="mt-4 max-w-3xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              {firstName}, move from interest to an informed next step.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657082] sm:text-base sm:leading-8">
              TGPI has organized your goal, shortlist and priorities into one
              practical decision workspace.
            </p>

            {primaryAction ? (
              <Link
                href={primaryAction.href}
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(11,31,58,0.18)] transition hover:-translate-y-0.5 hover:bg-[#143454] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A2A]"
              >
                {primaryAction.action} →
              </Link>
            ) : null}
          </div>

          <div className="bg-[#0B1F3A] p-6 text-white sm:p-8 lg:p-10">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">
                  Global profile
                </p>
                <p className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold">
                  {model.completion}% complete
                </p>
              </div>
              <Link
                href="/onboarding"
                className="text-xs font-extrabold text-[#F0D58C] underline decoration-[#F0D58C]/40 underline-offset-4"
              >
                Edit plan
              </Link>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#E5BF5A]"
                style={{ width: `${model.completion}%` }}
              />
            </div>
            <div className="mt-6 grid gap-2">
              {model.progress.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-bold"
                >
                  <span className="text-[#D7E0EB]">{item.label}</span>
                  <span
                    className={
                      item.complete ? "text-[#A9E1C8]" : "text-[#F0D58C]"
                    }
                  >
                    {item.complete ? "Complete" : "Add details"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="activation-progress-title"
        className="overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_20px_60px_rgba(11,31,58,0.07)]"
      >
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="bg-[#0B1F3A] p-6 text-white sm:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#F0D58C]">
              Activation progress
            </p>
            <h2
              id="activation-progress-title"
              className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold"
            >
              {model.activationCompletion}% of your action system activated.
            </h2>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#E5BF5A]"
                style={{ width: `${model.activationCompletion}%` }}
              />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {model.activationStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#C7D0DC]">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-extrabold text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
                  Recent activity
                </p>
                <h2 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold">
                  Your work continues across devices.
                </h2>
              </div>
              <span className="rounded-full border border-[#D8D2C4] bg-[#F7F2E8] px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#657082]">
                Private
              </span>
            </div>

            {model.recentActivities.length ? (
              <div className="mt-5 grid gap-2">
                {model.recentActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={activity.href}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[#E4DED2] bg-[#FFFDF8] px-4 py-3 transition hover:border-[#B58A2A]"
                  >
                    <span>
                      <span className="block text-sm font-extrabold text-[#0B1F3A]">
                        {activity.title}
                      </span>
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#7A8390]">
                        {formatActivityDate(activity.occurredAt)}
                      </span>
                    </span>
                    <span className="font-extrabold text-[#B58A2A] transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-[#CFC7B8] bg-[#FFFDF8] p-6">
                <p className="text-sm font-extrabold text-[#0B1F3A]">
                  Your activity timeline starts with one practical action.
                </p>
                <p className="mt-2 text-xs leading-6 text-[#657082]">
                  Save a country, compare a shortlist, review documents, estimate costs or begin a learning path.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="global-plan-summary-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
              Global plan
            </p>
            <h2
              id="global-plan-summary-title"
              className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.035em]"
            >
              Your direction at a glance.
            </h2>
          </div>
          <p className="rounded-full border border-[#D8D2C4] bg-white px-4 py-2 text-xs font-extrabold text-[#657082]">
            {model.goalLabel}
          </p>
        </div>
        <dl className="mt-6 grid overflow-hidden rounded-[26px] border border-[#D8D2C4] bg-white sm:grid-cols-2 xl:grid-cols-5">
          {model.planSummary.map((item) => (
            <div
              key={item.label}
              className="border-b border-[#E4DED2] p-5 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0"
            >
              <dt className="text-[9px] font-extrabold uppercase tracking-[0.19em] text-[#7A8390]">
                {item.label}
              </dt>
              <dd className="mt-3 text-sm font-extrabold leading-6 text-[#0B1F3A]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="country-fit-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
              Country Fit Preview
            </p>
            <h2
              id="country-fit-title"
              className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.035em]"
            >
              Your shortlist, organized by fit.
            </h2>
          </div>
          {model.selectedCountryCount >= 2 ? (
            <Link
              href={model.compareHref}
              className="text-sm font-extrabold text-[#956A13] underline decoration-[#B58A2A]/40 underline-offset-4"
            >
              Open full comparison →
            </Link>
          ) : null}
        </div>

        {model.countryFits.length > 0 ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {model.countryFits.slice(0, 3).map((fit, index) => (
              <article
                key={fit.country.slug}
                className="group overflow-hidden rounded-[28px] border border-[#D8D2C4] bg-white shadow-[0_18px_55px_rgba(11,31,58,0.08)]"
              >
                <Link
                  href={`/countries/${fit.country.slug}`}
                  className="relative block aspect-[16/9] overflow-hidden bg-[#0B1F3A]"
                  aria-label={`Open ${fit.country.name} country intelligence report`}
                >
                  <Image
                    src={getCountryImageUrl(fit.country)}
                    alt={getCountryImageAlt(fit.country)}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041426]/90 via-transparent to-[#041426]/10" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                    <div>
                      <p className="text-2xl" aria-hidden="true">{fit.country.emoji}</p>
                      <h3 className="mt-1 font-[var(--tgpi-font-display)] text-3xl font-semibold">
                        {fit.country.name}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-[#F0D58C]/40 bg-[#071A32]/75 px-4 py-3 text-right backdrop-blur">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#F0D58C]">
                        Fit score
                      </p>
                      <p className="mt-1 text-2xl font-extrabold">{fit.score}</p>
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">
                      Match 0{index + 1}
                    </p>
                    <p className="text-xs font-bold text-[#657082]">
                      {formatCurrencyAmount(
                        fit.country,
                        fit.country.intelligence.averageMonthlyBudget,
                      )}{" "}
                      {fit.country.currencyCode} / month
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {fit.reasons.map((reason) => (
                      <span
                        key={reason}
                        className="rounded-full bg-[#F0E7D4] px-3 py-2 text-[10px] font-extrabold text-[#5C420F]"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-6 text-[#657082]">
                    {fit.warning}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 border-t border-[#E4DED2] pt-4 text-xs font-extrabold">
                    <Link href={`/countries/${fit.country.slug}`} className="text-[#0B1F3A]">
                      View report →
                    </Link>
                    <Link
                      href={`/countries/${fit.country.slug}#documents-to-verify`}
                      className="text-[#956A13]"
                    >
                      Documents →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[28px] border border-dashed border-[#CFC7B8] bg-white p-8 text-center">
            <h3 className="font-[var(--tgpi-font-display)] text-3xl font-semibold">
              Build your first country shortlist.
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#657082]">
              Select countries in your global profile to unlock fit signals,
              cost references and personalized comparison links.
            </p>
            <Link
              href="/onboarding"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white"
            >
              Choose countries
            </Link>
          </div>
        )}
        <p className="mt-4 text-xs leading-6 text-[#7A8390]">
          Fit scores are educational planning signals based on your declared goal,
          priorities and TGPI country data. They do not replace legal, immigration,
          financial or safety advice.
        </p>
      </section>

      <section aria-labelledby="next-actions-title">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
            Next Best Actions
          </p>
          <h2
            id="next-actions-title"
            className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.035em]"
          >
            Five ways to move your plan forward.
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {model.actions.map((item) => (
            <ActionCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionCard({ item }: { item: WorkspaceAction }) {
  return (
    <Link
      href={item.href}
      className={`group flex min-h-[280px] flex-col rounded-[26px] border p-5 transition hover:-translate-y-1 hover:border-[#B58A2A] hover:shadow-[0_20px_50px_rgba(11,31,58,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A2A] ${
        item.id === "compare"
          ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
          : "border-[#D8D2C4] bg-[#FFFDF8] text-[#0B1F3A]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={`text-[9px] font-extrabold uppercase tracking-[0.19em] ${
            item.id === "compare" ? "text-[#F0D58C]" : "text-[#956A13]"
          }`}
        >
          {item.eyebrow}
        </p>
        <span
          className={`grid h-9 w-9 place-items-center rounded-full text-[10px] font-extrabold ${
            item.id === "compare"
              ? "bg-white/10 text-[#F0D58C]"
              : "bg-[#F0E7D4] text-[#0B1F3A]"
          }`}
        >
          {actionNumbers[item.id]}
        </span>
      </div>
      <span
        className={`mt-5 w-fit rounded-full px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] ${
          item.status === "completed"
            ? "bg-[#E3F3EB] text-[#277352]"
            : item.status === "needs_attention"
              ? "bg-[#FFF0D8] text-[#8A5A0A]"
              : item.status === "in_progress"
                ? "bg-[#E8F1FC] text-[#315F98]"
                : "bg-[#F0EDE7] text-[#657082]"
        }`}
      >
        {statusLabels[item.status]}
      </span>
      <h3 className="mt-5 font-[var(--tgpi-font-display)] text-2xl font-semibold leading-[1.08]">
        {item.title}
      </h3>
      <p
        className={`mt-4 text-xs leading-6 ${
          item.id === "compare" ? "text-[#C7D0DC]" : "text-[#657082]"
        }`}
      >
        {item.description}
      </p>
      <span
        className={`mt-auto pt-6 text-xs font-extrabold ${
          item.id === "compare" ? "text-[#F0D58C]" : "text-[#0B1F3A]"
        }`}
      >
        {item.action}{" "}
        <span className="inline-block text-[#B58A2A] transition group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

function formatActivityDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent activity";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
