import Image from "next/image";
import Link from "next/link";
import GlobalRankBadge from "@/components/profile/GlobalRankBadge";
import { getCountryImageAlt, getCountryImageUrl } from "@/lib/countries";
import { GLOBAL_RANK_DISCLAIMER, type GlobalRank } from "@/lib/global-ranks";
import type {
  GlobalWorkspaceModel,
  WorkspaceAction,
  WorkspaceActionStatus,
} from "@/lib/global-workspace";

type WorkspaceIdentity = {
  avatarUrl: string;
  firstName: string;
  fullName: string;
  globalId: string;
  headline: string;
  membership: string;
  profileCompletion: number;
  publicProfileUrl: string;
};

type GlobalWorkspaceOSProps = {
  identity: WorkspaceIdentity;
  model: GlobalWorkspaceModel;
  onboardingCompleted?: boolean;
  rank: GlobalRank;
};

const workspaceNav = [
  { href: "/profile", icon: "⌂", label: "Dashboard" },
  { href: "/countries", icon: "🌍", label: "Countries" },
  { href: "/country-fit", icon: "◎", label: "Country Fit" },
  { href: "/compare", icon: "⚖", label: "Compare" },
  { href: "/documents", icon: "🛂", label: "Documents" },
  { href: "/courses", icon: "🎓", label: "Learning" },
  { href: "/profile/security#settings-public-profile", icon: "◉", label: "Global profile" },
] as const;

const actionIcons: Record<WorkspaceAction["id"], string> = {
  compare: "⚖",
  cost: "◒",
  documents: "🛂",
  learning: "🎓",
  profile: "◉",
};

const activityIcons: Record<string, string> = {
  comparison: "⚖",
  cost: "◒",
  course: "🎓",
  documents: "🛂",
  saved_country: "♥",
};

const statusLabels: Record<WorkspaceActionStatus, string> = {
  completed: "Completed",
  in_progress: "In progress",
  needs_attention: "Needs context",
  not_started: "Ready",
};

const statusClasses: Record<WorkspaceActionStatus, string> = {
  completed: "border-[#68BF96]/25 bg-[#68BF96]/10 text-[#AEE0C5]",
  in_progress: "border-[#6B9EE8]/25 bg-[#6B9EE8]/10 text-[#BBD6FA]",
  needs_attention: "border-[#E5B94B]/25 bg-[#E5B94B]/10 text-[#F4DA95]",
  not_started: "border-white/10 bg-white/5 text-[#B9C5D1]",
};

function WorkspaceAvatar({ identity, large = false }: { identity: WorkspaceIdentity; large?: boolean }) {
  const initials = identity.fullName
    .split(" ")
    .slice(0, 2)
    .map((part) => part.at(0))
    .join("")
    .toUpperCase() || "TG";
  return (
    <span
      aria-label={`${identity.fullName} profile image`}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-[#E5B94B] bg-[#132B47] bg-cover bg-center font-[var(--tgpi-font-display)] font-semibold text-[#F0D58C] ${large ? "h-20 w-20 text-2xl" : "h-11 w-11 text-sm"}`}
      role="img"
      style={identity.avatarUrl ? { backgroundImage: `url(${identity.avatarUrl})` } : undefined}
    >
      {!identity.avatarUrl ? initials : <span className="sr-only">{identity.fullName}</span>}
    </span>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div aria-label={label} aria-valuemax={100} aria-valuemin={0} aria-valuenow={value} className="h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar">
      <div className="h-full rounded-full bg-gradient-to-r from-[#B58A2A] via-[#E5B94B] to-[#F4D77C] transition-[width] duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}

function ActionItem({ action }: { action: WorkspaceAction }) {
  return (
    <Link className="group flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.028] p-4 transition hover:-translate-y-0.5 hover:border-[#E5B94B]/35 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B]" href={action.href}>
      <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#E5B94B]/20 bg-[#E5B94B]/10 text-xl text-[#F0D58C]">{actionIcons[action.id]}</span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2"><span className="text-sm font-extrabold text-white">{action.title}</span><span className={`rounded-full border px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] ${statusClasses[action.status]}`}>{statusLabels[action.status]}</span></span>
        <span className="mt-1.5 line-clamp-2 block text-xs leading-5 text-[#91A2B5]">{action.description}</span>
      </span>
      <span aria-hidden="true" className="text-xl text-[#E5B94B] transition group-hover:translate-x-1">→</span>
    </Link>
  );
}

function formatActivityDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short" }).format(date);
}

export default function GlobalWorkspaceOS({ identity, model, onboardingCompleted = false, rank }: GlobalWorkspaceOSProps) {
  const primaryAction = model.actions.find((action) => action.status === "in_progress") ?? model.actions.find((action) => action.status === "not_started") ?? model.actions.find((action) => action.status === "needs_attention") ?? model.actions[0];
  const primaryCountry = model.countryFits[0]?.country;
  const activityValues = new Map(model.activationStats.map((item) => [item.label, item.value]));
  const dashboardStats = [
    { icon: "✦", label: "Global rank", value: rank.name, hint: `${rank.points} / 1,000 points` },
    { icon: "◎", label: "Personal plan", value: `${model.completion}%`, hint: "decision context" },
    { icon: "♥", label: "Saved countries", value: activityValues.get("Saved countries") ?? "0", hint: "real activity" },
    { icon: "⚖", label: "Comparisons", value: activityValues.get("Comparisons") ?? "0", hint: "real activity" },
    { icon: "🛂", label: "Document reviews", value: activityValues.get("Document reviews") ?? "0", hint: "real activity" },
    { icon: "🎓", label: "Learning paths", value: activityValues.get("Learning paths") ?? "0", hint: "real activity" },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[#040B13] text-white">
      <div className="mx-auto max-w-[1720px] lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-[#06101B] px-4 py-4 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
          <div className="hidden lg:block"><p className="px-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E5B94B]">TGPI Workspace OS</p><p className="mt-3 px-2 font-[var(--tgpi-font-display)] text-[1.7rem] font-semibold leading-[1.05]">Global decisions, connected.</p></div>
          <nav aria-label="Workspace navigation" className="flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:grid lg:overflow-visible">
            {workspaceNav.map((item, index) => <Link aria-current={index === 0 ? "page" : undefined} className={`flex min-w-max items-center gap-3 rounded-2xl border px-3 py-3 text-xs font-extrabold transition lg:w-full ${index === 0 ? "border-[#E5B94B]/35 bg-[#E5B94B]/10 text-[#F3D982]" : "border-transparent text-[#A9B7C5] hover:border-white/10 hover:bg-white/5 hover:text-white"}`} href={item.href} key={item.href}><span aria-hidden="true" className={`grid h-8 w-8 place-items-center rounded-xl text-sm ${index === 0 ? "bg-[#E5B94B]/15" : "bg-white/5"}`}>{item.icon}</span>{item.label}</Link>)}
          </nav>
          <div className="mt-8 hidden lg:grid lg:gap-3">
            <article className="rounded-3xl border border-[#E5B94B]/20 bg-gradient-to-br from-[#E5B94B]/12 to-transparent p-4"><div className="flex items-center gap-3"><GlobalRankBadge rank={rank} size="small" /><div><p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F0D58C]">Current rank</p><p className="mt-1 text-sm font-extrabold">{rank.name}</p></div></div><p className="mt-3 text-xs leading-5 text-[#AEBBC9]">One connected identity across research, decisions and learning.</p><Link className="mt-4 inline-flex text-xs font-extrabold text-white" href="/profile/security#settings-progress">See progression →</Link></article>
            <Link className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3 transition hover:border-[#E5B94B]/30" href="/profile/security"><WorkspaceAvatar identity={identity} /><span className="min-w-0"><span className="block truncate text-xs font-extrabold">{identity.fullName}</span><span className="mt-1 block text-[11px] text-[#8C9CAF]">Manage identity</span></span></Link>
          </div>
        </aside>

        <div className="min-w-0 p-4 sm:p-6 xl:p-8 2xl:p-10">
          {onboardingCompleted ? <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#68BF96]/25 bg-[#68BF96]/10 px-4 py-3 text-xs text-[#CFEADB]" role="status"><p><span className="font-extrabold">Your global plan is ready.</span> The workspace has synchronized your decision context.</p><Link className="font-extrabold text-white" href="/onboarding">Review plan →</Link></div> : null}

          <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E5B94B]">Personal intelligence workspace</p><h1 className="mt-2 font-[var(--tgpi-font-display)] text-[2.65rem] font-semibold leading-none tracking-[-0.035em] sm:text-5xl">Welcome back, {identity.firstName}.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#9BAABC]">Continue from verified research to an informed international decision.</p></div>
            <div className="flex items-center gap-3"><form action="/search" className="relative min-w-0 flex-1 xl:w-[410px]" role="search"><label className="sr-only" htmlFor="workspace-search">Search TGPI</label><span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8999AB]">⌕</span><input className="h-12 w-full rounded-2xl border border-white/10 bg-[#0A1521] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#6F8195] focus:border-[#E5B94B]/55 focus:ring-4 focus:ring-[#E5B94B]/10" id="workspace-search" name="q" placeholder="Search countries, courses and resources" /></form><Link aria-label="Open account settings" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B]" href="/profile/security"><WorkspaceAvatar identity={identity} /></Link></div>
          </header>

          <section aria-label="Workspace indicators" className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-6">
            {dashboardStats.map((stat) => <article className="rounded-2xl border border-white/10 bg-[#0A1521] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]" key={stat.label}><div className="flex items-start justify-between gap-2"><p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#8798AA]">{stat.label}</p><span aria-hidden="true" className="text-sm text-[#E5B94B]">{stat.icon}</span></div><p className={`${stat.label === "Global rank" ? "text-base" : "text-2xl"} mt-2 truncate font-extrabold text-white`}>{stat.value}</p><p className="mt-1 text-[11px] text-[#8999AB]">{stat.hint}</p></article>)}
          </section>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_370px]">
            <div className="grid min-w-0 gap-5">
              <section aria-labelledby="mission-title" className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0A1521] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
                {primaryCountry ? <Image alt={getCountryImageAlt(primaryCountry)} className="absolute inset-0 h-full w-full object-cover object-center opacity-45" fill priority sizes="(min-width: 1280px) 60vw, 100vw" src={getCountryImageUrl(primaryCountry)} /> : null}<div className="absolute inset-0 bg-gradient-to-r from-[#06111E] via-[#071421]/95 to-[#071421]/40" />
                <div className="relative grid min-h-[330px] gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end"><div className="max-w-2xl"><div className="flex flex-wrap items-center gap-3"><p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#E5B94B]">Your current mission</p>{primaryCountry ? <span className="rounded-full border border-white/15 bg-[#06101B]/75 px-3 py-1.5 text-xs font-extrabold backdrop-blur">{primaryCountry.emoji} {primaryCountry.name}</span> : null}</div><h2 id="mission-title" className="mt-5 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none sm:text-5xl">{model.goalLabel}</h2><p className="mt-5 text-sm leading-7 text-[#C0CBD7]">{primaryCountry ? `${primaryCountry.name} is first in your shortlist. TGPI connects evidence and next actions without publishing an unsupported fit score.` : "Choose a shortlist so TGPI can connect your goal to evidence, comparisons and preparation."}</p>{primaryAction ? <Link className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#E5B94B] px-6 text-xs font-extrabold text-[#07182D] shadow-[0_12px_30px_rgba(229,185,75,0.2)] transition hover:-translate-y-0.5 hover:bg-[#F0C95F]" href={primaryAction.href}>{primaryAction.action} →</Link> : null}</div><div className="w-full rounded-2xl border border-white/10 bg-[#06101B]/85 p-5 backdrop-blur sm:w-72"><div className="flex items-end justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8999AB]">Decision profile</p><p className="mt-2 text-3xl font-extrabold">{model.completion}%</p></div><Link className="text-xs font-extrabold text-[#F0D58C]" href="/onboarding">Edit</Link></div><div className="mt-4"><ProgressBar label="Decision profile completeness" value={model.completion} /></div><p className="mt-3 text-[11px] leading-5 text-[#8C9CAF]">Goal, countries, timeline, budget and priorities.</p></div></div>
              </section>

              <section aria-labelledby="next-actions-title" className="rounded-[30px] border border-white/10 bg-[#08131F] p-5 sm:p-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">Next best actions</p><h2 id="next-actions-title" className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold sm:text-4xl">Move the plan forward.</h2></div><Link className="text-xs font-extrabold text-[#F0D58C]" href="/onboarding">Review full plan →</Link></div><div className="mt-6 grid gap-3 lg:grid-cols-2">{model.actions.map((action) => <ActionItem action={action} key={action.id} />)}</div></section>

              <section aria-labelledby="shortlist-title" className="rounded-[30px] border border-white/10 bg-[#08131F] p-5 sm:p-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">Country Fit shortlist</p><h2 id="shortlist-title" className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold sm:text-4xl">Evidence before ranking.</h2></div><Link className="text-xs font-extrabold text-[#F0D58C]" href={model.selectedCountryCount >= 2 ? model.compareHref : "/country-fit"}>{model.selectedCountryCount >= 2 ? "Compare shortlist →" : "Build shortlist →"}</Link></div>
                {model.countryFits.length ? <div className="mt-6 grid gap-4 lg:grid-cols-3">{model.countryFits.slice(0, 3).map((fit, index) => <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0A1726]" key={fit.country.slug}><Link aria-label={`Open ${fit.country.name} intelligence`} className="relative block aspect-[16/9] overflow-hidden" href={`/countries/${fit.country.slug}`}><Image alt={getCountryImageAlt(fit.country)} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(min-width:1280px) 22vw, 100vw" src={getCountryImageUrl(fit.country)} /><span className="absolute inset-0 bg-gradient-to-t from-[#06101B] via-transparent to-transparent" /><span className="absolute bottom-3 left-3 rounded-full bg-[#06101B]/75 px-3 py-1.5 text-sm font-extrabold text-white backdrop-blur">{fit.country.emoji} {fit.country.name}</span></Link><div className="p-4"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#8999AB]">Shortlist 0{index + 1}</span><span className="text-[10px] font-extrabold text-[#F0D58C]">Evidence review</span></div><p className="mt-3 text-xs leading-5 text-[#9AAABC]">{fit.warning}</p></div></article>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-8 text-center"><span aria-hidden="true" className="text-3xl">🌍</span><p className="mt-3 text-sm font-extrabold">No country shortlist yet.</p><p className="mt-2 text-xs leading-5 text-[#91A2B5]">Start Country Fit to connect your priorities to verifiable evidence.</p><Link className="mt-5 inline-flex text-xs font-extrabold text-[#F0D58C]" href="/country-fit">Open Country Fit →</Link></div>}
              </section>
            </div>

            <aside className="grid content-start gap-5">
              <section aria-labelledby="navigator-title" className="rounded-[28px] border border-[#E5B94B]/25 bg-gradient-to-br from-[#10243A] to-[#08131F] p-5 shadow-[0_24px_65px_rgba(0,0,0,0.24)] sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5B94B]">TGPI Intelligence Navigator</p><h2 id="navigator-title" className="mt-2 text-lg font-extrabold leading-6">Your context, translated into action.</h2></div><span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#E5B94B]/25 bg-[#E5B94B]/10 text-xl text-[#F0D58C]">✦</span></div><p className="mt-4 text-xs leading-6 text-[#B1BECC]">This navigator uses your saved plan and real activity. It does not invent eligibility, approval chances or country scores.</p><div className="mt-5 grid gap-2">{model.actions.slice(0, 3).map((action) => <Link className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-extrabold text-[#E0E7EE] transition hover:border-[#E5B94B]/35" href={action.href} key={action.id}><span aria-hidden="true">{actionIcons[action.id]}</span><span className="min-w-0 flex-1 truncate">{action.action}</span><span aria-hidden="true">→</span></Link>)}</div></section>

              <section aria-labelledby="rank-card-title" className="overflow-hidden rounded-[28px] border border-[#E5B94B]/20 bg-[radial-gradient(circle_at_top_right,rgba(34,99,156,0.32),transparent_45%),#0A1521] p-5 sm:p-6"><div className="flex items-center gap-4"><GlobalRankBadge rank={rank} size="medium" /><div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5B94B]">Your global rank</p><h2 id="rank-card-title" className="mt-1 font-[var(--tgpi-font-display)] text-2xl font-semibold">{rank.name}</h2><p className="mt-1 text-xs text-[#9DAEC0]">{rank.points} / 1,000 TGPI points</p></div></div><p className="mt-4 text-xs leading-5 text-[#AEBBC9]">{rank.description}</p><div className="mt-4"><div className="mb-2 flex justify-between gap-3 text-[10px] font-extrabold"><span>{rank.nextRank ? `Next: ${rank.nextRank.name}` : "Highest rank reached"}</span><span className="text-[#F0D58C]">{rank.nextRank ? `${rank.pointsToNext} pts` : "100%"}</span></div><ProgressBar label="Progress toward next TGPI rank" value={rank.progressWithinRank} /></div><p className="mt-4 text-[10px] leading-5 text-[#77899D]">{GLOBAL_RANK_DISCLAIMER}</p><Link className="mt-4 inline-flex text-xs font-extrabold text-[#F0D58C]" href="/profile/security#settings-progress">View rank journey →</Link></section>

              <section aria-labelledby="identity-card-title" className="rounded-[28px] border border-white/10 bg-[#0A1521] p-5 sm:p-6"><div className="flex items-center gap-4"><WorkspaceAvatar identity={identity} large /><div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#E5B94B]">Your global identity</p><h2 id="identity-card-title" className="mt-1 truncate text-lg font-extrabold">{identity.fullName}</h2><p className="mt-1 truncate text-xs text-[#91A2B5]">{identity.headline || "Complete your public headline"}</p></div></div><div className="mt-5 flex items-end justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8798AA]">Profile readiness</p><p className="mt-1 text-xl font-extrabold">{identity.profileCompletion}%</p></div><span className="text-[11px] font-extrabold text-[#AEE0C5]">{identity.membership}</span></div><div className="mt-3"><ProgressBar label="Global profile completeness" value={identity.profileCompletion} /></div><p className="mt-4 break-all text-[11px] text-[#7C8EA2]">{identity.globalId}</p><div className="mt-4 grid grid-cols-2 gap-2"><Link className="rounded-xl border border-white/10 px-3 py-3 text-center text-xs font-extrabold text-white hover:border-[#E5B94B]/35" href="/profile/security">Edit profile</Link><Link className="rounded-xl bg-[#E5B94B] px-3 py-3 text-center text-xs font-extrabold text-[#07182D]" href={identity.publicProfileUrl}>View profile</Link></div></section>

              <section aria-labelledby="plan-summary-title" className="rounded-[28px] border border-white/10 bg-[#0A1521] p-5 sm:p-6"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8798AA]">Connected plan</p><h2 id="plan-summary-title" className="mt-2 font-[var(--tgpi-font-display)] text-2xl font-semibold">Your direction at a glance.</h2><dl className="mt-4 grid gap-3">{model.planSummary.map((item) => <div className="border-b border-white/10 pb-3 last:border-0 last:pb-0" key={item.label}><dt className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#7C8EA2]">{item.label}</dt><dd className="mt-1 text-xs font-bold leading-5 text-[#D8E1EA]">{item.value}</dd></div>)}</dl></section>

              <section aria-labelledby="activity-title" className="rounded-[28px] border border-white/10 bg-[#0A1521] p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8798AA]">Recent activity</p><h2 id="activity-title" className="mt-1 text-base font-extrabold">Private timeline</h2></div><span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#9AAABC]">Only you</span></div>{model.recentActivities.length ? <div className="mt-4 grid gap-2">{model.recentActivities.map((activity) => <Link className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-3 transition hover:border-[#E5B94B]/30" href={activity.href} key={activity.id}><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-sm text-[#F0D58C]">{activityIcons[activity.type] ?? "•"}</span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-extrabold text-[#E2E8EE]">{activity.title}</span><span className="mt-1 block text-[10px] text-[#7C8EA2]">{formatActivityDate(activity.occurredAt)}</span></span><span aria-hidden="true" className="text-[#E5B94B]">→</span></Link>)}</div> : <p className="mt-4 text-xs leading-6 text-[#8999AB]">Your timeline starts when you save a country, compare options, review documents or begin learning.</p>}</section>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
