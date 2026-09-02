import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import CountryFitWorkspace from "@/components/intelligence/CountryFitWorkspace";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import GlobalWorkspaceV1 from "@/components/profile/GlobalWorkspaceV1";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";
import {
  normalizeSubscriptionRecord,
  TGPI_BILLING_METADATA_KEY,
} from "@/lib/billing";
import { getAllCountries } from "@/lib/countries";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { getControlledPremiumAccessMode } from "@/lib/premium-access.server";

export const metadata: Metadata = {
  title: "My global workspace — TGPI",
  description:
    "Turn your TGPI global profile into country comparisons, cost planning, documentation research and practical learning actions.",
  robots: { index: false, follow: false },
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ onboarding?: string }>;
}) {
  const [session, user, params] = await Promise.all([
    requireUser(),
    currentUser(),
    searchParams,
  ]);
  const name = user?.fullName || user?.firstName || "Global explorer";
  const email = user?.primaryEmailAddress?.emailAddress || "No primary email";
  const emailVerified = user?.primaryEmailAddress?.verification?.status === "verified";
  const globalId = formatTgpiGlobalId(session.userId);
  const onboarding = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const activation = normalizeActivationProgress(
    user?.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );
  const billing = normalizeSubscriptionRecord(
    user?.privateMetadata[TGPI_BILLING_METADATA_KEY],
    session.userId,
  );
  const controlledAccessMode = await getControlledPremiumAccessMode(
    {
      uid: session.userId,
      email,
      emailVerified,
    },
  );
  const hasPremiumAccess =
    billing.plan === "premium" || Boolean(controlledAccessMode);
  const workspaceModel = buildGlobalWorkspaceModel(
    onboarding,
    getAllCountries(),
    activation,
  );

  const intelligence = await getIntelligence();

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#0B1F3A]">
      <section className="border-b border-[#D8D2C4] bg-[#FFFDF8] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#956A13]">TGPI Global Workspace</p>
              <h1 className="mt-4 font-[var(--tgpi-font-display)] text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl">Welcome, {name}.</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#657082]">Your secure starting point for country intelligence, global decisions and learning progress.</p>
            </div>
            <Link href="/profile/security" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D8D2C4] bg-white px-5 text-sm font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]">Manage Global Key</Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_.8fr_.8fr_.8fr]">
            <article className="rounded-[26px] bg-[#0B1F3A] p-6 text-white shadow-[0_22px_55px_rgba(11,31,58,0.17)] sm:p-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">TGPI Global ID</p>
              <p className="mt-4 break-all font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[0.02em]">{globalId}</p>
              <p className="mt-3 text-sm leading-6 text-[#C7D0DC]">A public identity reference. It is never used as a password or security secret.</p>
            </article>
            <article className="rounded-[26px] border border-[#D8D2C4] bg-white p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7A8390]">Primary identity</p>
              <p className="mt-4 truncate text-sm font-extrabold text-[#0B1F3A]">{email}</p>
              <p className={`mt-3 text-xs font-bold ${emailVerified ? "text-[#277352]" : "text-[#9A6010]"}`}>{emailVerified ? "Verified email" : "Verification required"}</p>
            </article>
            <article className="rounded-[26px] border border-[#D8D2C4] bg-white p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7A8390]">Account protection</p>
              <p className="mt-4 text-lg font-extrabold text-[#0B1F3A]">Session protected</p>
              <Link href="/profile/security" className="mt-3 inline-flex text-xs font-extrabold text-[#956A13]">Review devices & methods →</Link>
            </article>
            <article className="rounded-[26px] border border-[#D8D2C4] bg-white p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7A8390]">Membership</p>
              <p className="mt-4 text-lg font-extrabold text-[#0B1F3A]">
                {controlledAccessMode === "founder"
                  ? "TGPI Founder"
                  : controlledAccessMode === "preview"
                    ? "Premium Preview"
                  : billing.plan === "premium"
                    ? "TGPI Premium"
                    : "TGPI Free"}
              </p>
              <Link href={hasPremiumAccess ? "/premium" : "/pricing"} className="mt-3 inline-flex text-xs font-extrabold text-[#956A13]">
                {hasPremiumAccess ? "Open Premium →" : "View Premium →"}
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {params.onboarding === "completed" ? (
            <div
              role="status"
              className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D0B168] bg-[#FBF2D8] px-5 py-4 text-sm text-[#0B1F3A]"
            >
              <p>
                <span className="font-extrabold">Your global plan is ready.</span>{" "}
                TGPI will use your preferences to organize the next steps.
              </p>
              <Link href="/onboarding" className="font-extrabold text-[#8A641F]">
                Review plan →
              </Link>
            </div>
          ) : null}
          <div className="ig-section mb-8"><CountryFitWorkspace countries={identities} snapshot={intelligence.snapshot} initialContext={onboarding} initialCountry={onboarding.targetCountries[0]} /></div>
          <GlobalWorkspaceV1
            firstName={user?.firstName || name}
            model={workspaceModel}
          />
        </div>
      </section>
    </main>
  );
}
