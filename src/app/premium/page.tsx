import type { Metadata } from "next";
import Link from "next/link";
import { requirePremium } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Premium command center — TGPI",
  description:
    "Your protected TGPI workspace for connected country intelligence, comparisons, learning and global planning.",
  robots: { index: false, follow: false },
};

const premiumActions = [
  {
    number: "01",
    eyebrow: "Decide",
    title: "Compare countries",
    description:
      "Connect cost, safety, opportunity and quality-of-life signals before choosing your next destination.",
    href: "/compare",
    cta: "Open comparison",
  },
  {
    number: "02",
    eyebrow: "Prepare",
    title: "Review country intelligence",
    description:
      "Return to the countries in your plan and organize the questions that matter for travel, study or work.",
    href: "/countries",
    cta: "Explore countries",
  },
  {
    number: "03",
    eyebrow: "Develop",
    title: "Continue learning",
    description:
      "Build practical knowledge through structured learning paths connected to your global objectives.",
    href: "/courses",
    cta: "View learning paths",
  },
  {
    number: "04",
    eyebrow: "Organize",
    title: "Open your Global Key",
    description:
      "Keep your identity, onboarding preferences and activation progress together in one protected workspace.",
    href: "/profile",
    cta: "Open Global Key",
  },
] as const;

function formatStatus(status: string) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatPeriodEnd(value: string) {
  if (!value) return "Managed securely through Stripe";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Managed securely through Stripe";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function PremiumPage() {
  const { accessMode, billing } = await requirePremium();
  const isPreviewAccess = accessMode === "preview";
  const periodLabel = isPreviewAccess
    ? "Temporary founder/test access for this Vercel Preview. No payment or subscription was created."
    : billing.cancelAtPeriodEnd
      ? `Access available until ${formatPeriodEnd(billing.currentPeriodEnd)}`
      : billing.currentPeriodEnd
        ? `Next renewal: ${formatPeriodEnd(billing.currentPeriodEnd)}`
        : "Managed securely through Stripe";

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#0B1F3A]">
      <section className="border-b border-[#D8D2C4] bg-[#FFFDF8] px-4 py-10 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] bg-[#0B1F3A] text-white shadow-[0_28px_80px_rgba(11,31,58,0.2)]">
            <div className="grid lg:grid-cols-[1.35fr_.65fr]">
              <div className="relative overflow-hidden p-7 sm:p-10 lg:p-14">
                <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#D8AE49]/35" aria-hidden="true" />
                <div className="absolute -right-8 -top-12 h-52 w-52 rounded-full border border-[#D8AE49]/25" aria-hidden="true" />
                <p className="relative text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#F0D58C]">
                  TGPI Premium command center
                </p>
                <h1 className="relative mt-5 max-w-3xl font-[var(--tgpi-font-display)] text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  Your global strategy, connected.
                </h1>
                <p className="relative mt-6 max-w-2xl text-base leading-8 text-[#CAD4E1] sm:text-lg">
                  Move from curiosity to clear decisions with one protected place for country intelligence, comparisons, learning and your global plan.
                </p>
              </div>

              <aside className="border-t border-white/10 bg-[#102A4C] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#F0D58C]">
                  {isPreviewAccess ? "Controlled access" : "Membership"}
                </p>
                <p className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold">
                  {isPreviewAccess ? "Premium Preview" : "TGPI Premium"}
                </p>
                <div className="mt-8 space-y-5 border-t border-white/15 pt-6 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#AEBCCE]">Status</span>
                    <span className="rounded-full bg-[#D8AE49] px-3 py-1 text-xs font-extrabold text-[#0B1F3A]">
                      {isPreviewAccess ? "Preview" : formatStatus(billing.status)}
                    </span>
                  </div>
                  <p className="leading-6 text-[#D7DEE8]">{periodLabel}</p>
                </div>
                <Link
                  href={isPreviewAccess ? "/profile" : "/pricing"}
                  className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-extrabold transition hover:border-[#D8AE49] hover:bg-white/10"
                >
                  {isPreviewAccess ? "Return to workspace" : "Manage billing"}
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#956A13]">
              Continue your journey
            </p>
            <h2 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em] sm:text-5xl">
              Choose your next move.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#657082]">
              Premium brings the essential TGPI tools into a single decision flow. Start with the action that matters most today.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {premiumActions.map((action) => (
              <article
                key={action.href}
                className="group flex min-h-72 flex-col rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-7 transition hover:-translate-y-1 hover:border-[#B58A2A] hover:shadow-[0_20px_45px_rgba(11,31,58,0.1)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
                    {action.eyebrow}
                  </p>
                  <span className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[#C5A252]">
                    {action.number}
                  </span>
                </div>
                <h3 className="mt-8 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-tight tracking-[-0.025em]">
                  {action.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#657082]">
                  {action.description}
                </p>
                <Link
                  href={action.href}
                  className="mt-auto inline-flex min-h-12 items-center pt-7 text-sm font-extrabold text-[#8A641F] transition group-hover:text-[#0B1F3A]"
                >
                  {action.cta} →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D8D2C4] bg-white px-6 py-5 text-sm">
            <p className="text-[#657082]">
              {isPreviewAccess
                ? "Preview access is temporary, server-controlled and unavailable on the official production domain."
                : "Your Premium access is linked to your authenticated TGPI Global Key."}
            </p>
            <Link href="/profile/security" className="font-extrabold text-[#8A641F]">
              Review account security →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
