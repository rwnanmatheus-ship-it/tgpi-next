import Image from "next/image";
import Link from "next/link";
import {
  getCountryImageAlt,
  getCountryImageUrl,
  getCountry,
} from "@/lib/countries";
import type {
  PremiumCommandCenterModel,
  PremiumCountryCard,
} from "@/lib/premium-command-center";
import type {
  WorkspaceAction,
  WorkspaceActionStatus,
} from "@/lib/global-workspace";

type PremiumCommandCenterV2Props = {
  firstName: string;
  isPreviewAccess: boolean;
  membershipStatus: string;
  model: PremiumCommandCenterModel;
  periodLabel: string;
};

const statusLabels: Record<WorkspaceActionStatus, string> = {
  completed: "Completed",
  in_progress: "In progress",
  needs_attention: "Needs attention",
  not_started: "Not started",
};

const statusClasses: Record<WorkspaceActionStatus, string> = {
  completed: "border-[#B9DCCA] bg-[#EDF8F1] text-[#1F6848]",
  in_progress: "border-[#DCC785] bg-[#FBF2D8] text-[#79550F]",
  needs_attention: "border-[#E5C1AE] bg-[#FFF1E9] text-[#8A421D]",
  not_started: "border-[#D8D2C4] bg-[#F7F4ED] text-[#657082]",
};

const actionNumbers: Record<WorkspaceAction["id"], string> = {
  compare: "01",
  documents: "02",
  learning: "03",
  cost: "04",
  profile: "05",
};

const comparisonGoalLabels = {
  live: "Living abroad",
  overall: "Overall fit",
  study: "Studying abroad",
  travel: "Travel",
  work: "Working globally",
} as const;

function formatMoney(amount: number, currency: string) {
  if (!amount) return "Not estimated";

  try {
    return new Intl.NumberFormat("en-US", {
      currency,
      maximumFractionDigits: 0,
      style: "currency",
    }).format(amount);
  } catch {
    return `${currency} ${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(amount)}`;
  }
}

function formatDate(value?: string) {
  if (!value) return "Ready to start";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(date);
}

function formatList(values: string[], fallback: string) {
  if (!values.length) return fallback;
  return new Intl.ListFormat("en", {
    style: "short",
    type: "conjunction",
  }).format(values);
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-xs font-extrabold">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div
        aria-label={`${label}: ${value}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-[#E5BF5A]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function CountryCard({ country }: { country: PremiumCountryCard }) {
  const countryData = getCountry(country.slug);

  if (!countryData) return null;

  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#D8D2C4] bg-[#FFFDF8] transition hover:-translate-y-1 hover:border-[#B58A2A] hover:shadow-[0_18px_40px_rgba(11,31,58,0.1)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#D9D2C4]">
        <Image
          alt={getCountryImageAlt(countryData)}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          src={getCountryImageUrl(countryData)}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#081A31]/80 via-transparent to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#F0D58C]">
              {country.region}
            </p>
            <h3 className="mt-1 text-lg font-extrabold">
              <span aria-hidden="true">{country.emoji} </span>
              {country.name}
            </h3>
          </div>
          <span className="rounded-full border border-white/25 bg-[#081A31]/70 px-3 py-1 text-xs font-extrabold backdrop-blur-sm">
            {country.fitScore}% fit
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x divide-[#E4DED2] border-b border-[#E4DED2] text-xs">
        <div className="p-4">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#7A8390]">
            Cost plan
          </p>
          <p className="mt-2 font-extrabold text-[#0B1F3A]">
            {country.costEstimate
              ? formatMoney(
                  country.costEstimate.amount,
                  country.costEstimate.currency,
                )
              : "Not saved"}
          </p>
        </div>
        <div className="p-4">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#7A8390]">
            Documents
          </p>
          <p className="mt-2 font-extrabold text-[#0B1F3A]">
            {country.documentProgress
              ? `${country.documentProgress.completed}/${country.documentProgress.total} reviewed`
              : "Not reviewed"}
          </p>
        </div>
      </div>
      <Link
        className="flex min-h-12 items-center justify-between px-4 text-xs font-extrabold text-[#79550F] transition hover:bg-[#F7F2E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B58A2A]"
        href={`/countries/${country.slug}`}
      >
        Open country intelligence <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default function PremiumCommandCenterV2({
  firstName,
  isPreviewAccess,
  membershipStatus,
  model,
  periodLabel,
}: PremiumCommandCenterV2Props) {
  const comparisonTitle = formatList(
    model.comparison.countryNames,
    "Build your first comparison",
  );

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#0B1F3A]">
      <section className="border-b border-[#D8D2C4] bg-[#FFFDF8] px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] bg-[#0B1F3A] text-white shadow-[0_28px_80px_rgba(11,31,58,0.2)]">
            <div className="grid lg:grid-cols-[1.3fr_.7fr]">
              <div className="relative overflow-hidden p-7 sm:p-10 lg:p-14">
                <div
                  aria-hidden="true"
                  className="absolute -right-24 -top-36 h-96 w-96 rounded-full border border-[#D8AE49]/30"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -top-10 h-56 w-56 rounded-full border border-[#D8AE49]/20"
                />
                <p className="relative text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#F0D58C]">
                  TGPI Premium command center
                </p>
                <h1 className="relative mt-5 max-w-3xl font-[var(--tgpi-font-display)] text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  {firstName}, your next global move starts here.
                </h1>
                <p className="relative mt-6 max-w-2xl text-base leading-8 text-[#CAD4E1] sm:text-lg">
                  Your country intelligence, decisions and preparation are now connected in one private operating system.
                </p>

                <div className="relative mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">
                        Next best action
                      </p>
                      <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold">
                        {model.nextAction.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7E0EB]">
                        {model.nextAction.description}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] ${statusClasses[model.nextAction.status]}`}
                    >
                      {statusLabels[model.nextAction.status]}
                    </span>
                  </div>
                  <Link
                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#E5BF5A] px-6 text-sm font-extrabold text-[#0B1F3A] transition hover:-translate-y-0.5 hover:bg-[#F0D58C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    href={model.nextAction.href}
                  >
                    {model.nextAction.action} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <aside className="border-t border-white/10 bg-[#102A4C] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#F0D58C]">
                  {isPreviewAccess ? "Controlled access" : "Membership"}
                </p>
                <p className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold">
                  {isPreviewAccess ? "Premium Preview" : "TGPI Premium"}
                </p>
                <div className="mt-8 space-y-6 border-t border-white/15 pt-6">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#AEBCCE]">Status</span>
                    <span className="rounded-full bg-[#D8AE49] px-3 py-1 text-xs font-extrabold text-[#0B1F3A]">
                      {membershipStatus}
                    </span>
                  </div>
                  <ProgressBar label="Strategy readiness" value={model.readiness} />
                  <ProgressBar label="Global profile" value={model.planCompletion} />
                  <p className="text-xs leading-6 text-[#D7DEE8]">{periodLabel}</p>
                </div>
                <Link
                  className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-extrabold transition hover:border-[#D8AE49] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8AE49]"
                  href={isPreviewAccess ? "/profile/security" : "/pricing"}
                >
                  {isPreviewAccess ? "Review account security" : "Manage billing"}
                </Link>
              </aside>
            </div>
          </div>

          <dl className="mt-4 grid overflow-hidden rounded-[24px] border border-[#D8D2C4] bg-white sm:grid-cols-2 lg:grid-cols-4">
            {model.stats.map((stat) => (
              <div
                className="border-b border-[#E4DED2] p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
                key={stat.label}
              >
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7A8390]">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="shortlist-title"
        className="px-4 py-12 sm:px-6 lg:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#79550F]">
                Decision board
              </p>
              <h2
                className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"
                id="shortlist-title"
              >
                Your countries in focus.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#657082]">
                Keep the strongest options visible while you compare evidence, costs and preparation requirements.
              </p>
            </div>
            <Link
              className="inline-flex min-h-11 items-center rounded-xl border border-[#CFC7B8] bg-white px-5 text-sm font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]"
              href="/countries"
            >
              Explore all countries <span aria-hidden="true">→</span>
            </Link>
          </div>

          {model.shortlist.length ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {model.shortlist.map((country) => (
                <CountryCard country={country} key={country.slug} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[26px] border border-dashed border-[#CFC7B8] bg-[#FFFDF8] p-7 sm:p-10">
              <p className="text-sm font-extrabold">Your shortlist is ready to be built.</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#657082]">
                Select countries in your global profile or save them while exploring. TGPI will bring them here automatically.
              </p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#0B1F3A] px-5 text-sm font-extrabold text-white"
                href="/onboarding"
              >
                Build my shortlist <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-[#D8D2C4] bg-[#FFFDF8] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="flex min-h-80 flex-col rounded-[28px] bg-[#0B1F3A] p-7 text-white shadow-[0_18px_50px_rgba(11,31,58,0.14)] sm:p-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">
                Latest comparison
              </p>
              <h2 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-tight">
                {comparisonTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#CAD4E1]">
                {model.comparison.isSaved
                  ? `Your saved ${comparisonGoalLabels[model.comparison.goal].toLowerCase()} comparison is ready to continue.`
                  : model.comparison.countryNames.length >= 2
                    ? `TGPI prepared a ${comparisonGoalLabels[model.comparison.goal].toLowerCase()} comparison from your shortlist.`
                    : "Choose at least two countries to create a meaningful side-by-side decision."}
              </p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#AEBCCE]">
                {formatDate(model.comparison.updatedAt)}
              </p>
              <Link
                className="mt-auto inline-flex min-h-12 items-center pt-7 text-sm font-extrabold text-[#F0D58C]"
                href={model.comparison.href}
              >
                {model.comparison.isSaved ? "Continue comparison" : "Open comparator"} <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="flex min-h-80 flex-col rounded-[28px] border border-[#D8D2C4] bg-white p-7 sm:p-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#79550F]">
                Monthly cost plan
              </p>
              <p className="mt-5 font-[var(--tgpi-font-display)] text-5xl font-semibold tracking-[-0.035em]">
                {formatMoney(model.cost.amount, model.cost.currency)}
              </p>
              <p className="mt-3 text-sm font-extrabold text-[#0B1F3A]">
                {model.cost.countryName}
              </p>
              <p className="mt-4 text-sm leading-7 text-[#657082]">
                {model.cost.isPersonalEstimate
                  ? "Your saved monthly estimate. Revisit it when housing, city or lifestyle assumptions change."
                  : "TGPI reference budget. Create a personal estimate to make this figure useful for your real plan."}
              </p>
              <Link
                className="mt-auto inline-flex min-h-12 items-center pt-7 text-sm font-extrabold text-[#79550F]"
                href={model.cost.href}
              >
                {model.cost.isPersonalEstimate ? "Review cost plan" : "Create cost estimate"} <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="flex min-h-80 flex-col rounded-[28px] border border-[#D8D2C4] bg-[#F7F2E8] p-7 sm:p-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#79550F]">
                Document readiness
              </p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="font-[var(--tgpi-font-display)] text-5xl font-semibold">
                  {model.documents.percent}%
                </p>
                <p className="text-xs font-extrabold text-[#657082]">
                  {model.documents.total
                    ? `${model.documents.completed}/${model.documents.total} reviewed`
                    : "Checklist not started"}
                </p>
              </div>
              <div
                aria-label={`Document readiness: ${model.documents.percent}%`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={model.documents.percent}
                className="mt-5 h-2 overflow-hidden rounded-full bg-[#D9D2C4]"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-[#B58A2A]"
                  style={{ width: `${model.documents.percent}%` }}
                />
              </div>
              <p className="mt-5 text-sm leading-7 text-[#657082]">
                Review the practical document checklist for {model.documents.countryName}. Always validate legal requirements with official authorities.
              </p>
              <Link
                className="mt-auto inline-flex min-h-12 items-center pt-7 text-sm font-extrabold text-[#79550F]"
                href={model.documents.href}
              >
                {model.documents.total ? "Continue checklist" : "Start document review"} <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <section
            aria-labelledby="action-system-title"
            className="rounded-[30px] border border-[#D8D2C4] bg-white p-6 sm:p-8"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#79550F]">
              Action system
            </p>
            <h2
              className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold"
              id="action-system-title"
            >
              Five moves. One connected strategy.
            </h2>
            <div className="mt-7 grid gap-3">
              {model.actions.map((action) => (
                <Link
                  className="group grid gap-4 rounded-2xl border border-[#E4DED2] bg-[#FFFDF8] p-5 transition hover:border-[#B58A2A] sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  href={action.href}
                  key={action.id}
                >
                  <span className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[#B58A2A]">
                    {actionNumbers[action.id]}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-[#0B1F3A]">
                      {action.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-[#657082]">
                      {action.description}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-3 sm:justify-end">
                    <span
                      className={`rounded-full border px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] ${statusClasses[action.status]}`}
                    >
                      {statusLabels[action.status]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-extrabold text-[#B58A2A] transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid gap-6">
            <article className="rounded-[30px] bg-[#0B1F3A] p-7 text-white sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">
                    Learning path
                  </p>
                  <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold">
                    {model.learning.title}
                  </h2>
                </div>
                <span className="font-[var(--tgpi-font-display)] text-3xl font-semibold text-[#F0D58C]">
                  {model.learning.percent}%
                </span>
              </div>
              <div
                aria-label={`Learning progress: ${model.learning.percent}%`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={model.learning.percent}
                className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-[#E5BF5A]"
                  style={{ width: `${model.learning.percent}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-7 text-[#CAD4E1]">
                {model.learning.totalLessons
                  ? `${model.learning.completedLessons} of ${model.learning.totalLessons} lessons completed. Build practical capability alongside your country decisions.`
                  : "Choose a structured learning path to build the skills behind your global plan."}
              </p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center text-sm font-extrabold text-[#F0D58C]"
                href={model.learning.href}
              >
                {model.learning.percent ? "Continue learning" : "Start learning path"} <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] p-7 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#79550F]">
                    Your global plan
                  </p>
                  <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold">
                    The context behind every recommendation.
                  </h2>
                </div>
                <Link
                  className="text-xs font-extrabold text-[#79550F] underline decoration-[#B58A2A]/40 underline-offset-4"
                  href="/onboarding"
                >
                  Edit plan
                </Link>
              </div>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {model.planSummary.map((item) => (
                  <div
                    className="rounded-2xl border border-[#E4DED2] bg-white p-4"
                    key={item.label}
                  >
                    <dt className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#7A8390]">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-sm font-extrabold leading-6 text-[#0B1F3A]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-[#E4DED2] pt-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#79550F]">
                    Recent activity
                  </p>
                  <span className="rounded-full border border-[#D8D2C4] bg-white px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#657082]">
                    Private
                  </span>
                </div>
                {model.recentActivities.length ? (
                  <div className="mt-4 grid gap-2">
                    {model.recentActivities.slice(0, 3).map((activity) => (
                      <Link
                        className="group flex items-center justify-between gap-4 rounded-xl border border-[#E4DED2] bg-white px-4 py-3 transition hover:border-[#B58A2A]"
                        href={activity.href}
                        key={activity.id}
                      >
                        <span>
                          <span className="block text-xs font-extrabold text-[#0B1F3A]">
                            {activity.title}
                          </span>
                          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#7A8390]">
                            {formatDate(activity.occurredAt)}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-extrabold text-[#B58A2A] transition group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl border border-dashed border-[#CFC7B8] bg-white p-4 text-xs leading-6 text-[#657082]">
                    Your timeline will begin when you save a country, compare options, review documents, estimate costs or start a course.
                  </p>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-[#D8D2C4] bg-[#FFFDF8] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs leading-6 text-[#657082]">
          <p className="max-w-3xl">
            Your command center uses your private TGPI profile and activity to organize recommendations. It never replaces official legal, immigration, tax or financial advice.
          </p>
          <Link className="font-extrabold text-[#79550F]" href="/profile/security">
            Review privacy & security <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
