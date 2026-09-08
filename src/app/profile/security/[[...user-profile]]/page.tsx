import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";
import TgpiAccountCenter from "@/components/profile/TgpiAccountCenter";
import {
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
} from "@/lib/account-profile";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";
import {
  normalizeSubscriptionRecord,
  TGPI_BILLING_METADATA_KEY,
} from "@/lib/billing";
import { getAllCountries } from "@/lib/countries";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { getControlledPremiumAccessMode } from "@/lib/premium-access.server";

export const metadata: Metadata = {
  title: "Account & identity — TGPI Global Key",
  description:
    "Manage the identity, preferences and decision context connected to your TGPI Global Key.",
  robots: { index: false, follow: false },
};

function getDecisionProgress(onboarding: ReturnType<typeof normalizeOnboardingData>) {
  const signals = [
    Boolean(onboarding.primaryGoal),
    onboarding.targetCountries.length > 0,
    Boolean(onboarding.timeHorizon && onboarding.budgetRange),
    Boolean(onboarding.languages.length && onboarding.internationalExperience),
    onboarding.priorities.length >= 3,
  ];

  return signals.filter(Boolean).length * 20;
}

export default async function SecurityPage() {
  const [session, user] = await Promise.all([requireUser(), currentUser()]);
  const email = user?.primaryEmailAddress?.emailAddress || "No primary email";
  const emailVerified =
    user?.primaryEmailAddress?.verification?.status === "verified";
  const onboarding = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const profile = mergeAccountProfileWithOnboarding(
    user?.unsafeMetadata.tgpiAccountProfile,
    onboarding,
  );
  const billing = normalizeSubscriptionRecord(
    user?.privateMetadata[TGPI_BILLING_METADATA_KEY],
    session.userId,
  );
  const controlledAccessMode = await getControlledPremiumAccessMode({
    uid: session.userId,
    email,
    emailVerified,
  });
  const membership =
    controlledAccessMode === "founder"
      ? "TGPI Founder"
      : controlledAccessMode === "preview"
        ? "Premium Preview"
        : billing.plan === "premium"
          ? "TGPI Premium"
          : "TGPI Free";
  const countries = getAllCountries();
  const countryNameBySlug = new Map(
    countries.map((country) => [country.slug, country.name]),
  );

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-6 text-[#0B1F3A] sm:px-6 sm:py-10 lg:py-14">
      <TgpiAccountCenter
        account={{
          email,
          emailVerified,
          globalId: formatTgpiGlobalId(session.userId),
          membership,
        }}
        countries={countries
          .map((country) => ({ name: country.name, slug: country.slug }))
          .sort((first, second) =>
            first.name.localeCompare(second.name, "en-US"),
          )}
        decisionContext={{
          completed: onboarding.completed,
          countries: onboarding.targetCountries
            .map((slug) => countryNameBySlug.get(slug) || slug)
            .slice(0, 5),
          goal: onboarding.primaryGoal,
          progress: getDecisionProgress(onboarding),
        }}
        initialIdentity={normalizeAccountIdentity({
          firstName: user?.firstName,
          lastName: user?.lastName,
        })}
        initialProfile={profile}
      />

      <section
        className="mx-auto mt-6 max-w-7xl scroll-mt-24 rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] p-4 shadow-[0_24px_70px_rgba(11,31,58,0.08)] sm:p-8"
        id="security-center"
      >
        <div className="mb-7 border-b border-[#E2DDD2] pb-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#956A13]">
            05 · Clerk protected
          </p>
          <h2 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[-0.035em] text-[#0B1F3A] sm:text-4xl">
            Login and security
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085]">
            Manage verified emails, passwords, connected login methods, passkeys,
            multi-factor authentication and active devices through your protected
            TGPI Global Key.
          </p>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-[#E2DDD2] bg-white p-3 sm:p-5">
          <UserProfile
            appearance={tgpiClerkAppearance}
            path="/profile/security"
            routing="path"
          />
        </div>
      </section>
    </main>
  );
}
