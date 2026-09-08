import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";
import TgpiAccountCenter from "@/components/profile/TgpiAccountCenter";
import {
  getAccountProfileCompletion,
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
} from "@/lib/account-profile";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";
import {
  normalizeSubscriptionRecord,
  TGPI_BILLING_METADATA_KEY,
} from "@/lib/billing";
import { getAllCountries } from "@/lib/countries";
import { getGlobalRank } from "@/lib/global-ranks";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
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
  const identity = normalizeAccountIdentity({
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
  const activation = normalizeActivationProgress(
    user?.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
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
  const countryBySlug = new Map(
    countries.map((country) => [country.slug, country]),
  );
  const workspaceModel = buildGlobalWorkspaceModel(onboarding, countries, activation);
  const rank = getGlobalRank({
    activationCompletion: workspaceModel.activationCompletion,
    comparisons: activation.comparisons.length,
    documentReviews: Object.keys(activation.documentReviews).length,
    learningPaths: Object.keys(activation.courseProgress).length,
    planCompletion: workspaceModel.completion,
    profileCompletion: getAccountProfileCompletion(identity, profile),
    savedCountries: activation.savedCountries.length,
  });

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-6 text-[#0B1F3A] sm:px-6 sm:py-10 lg:py-14">
      <TgpiAccountCenter
        account={{
          avatarUrl: user?.imageUrl || "",
          email,
          emailVerified,
          globalId: formatTgpiGlobalId(session.userId),
          membership,
          publicProfileUrl: `/member/${session.userId}`,
        }}
        countries={countries
          .map((country) => ({ emoji: country.emoji, name: country.name, slug: country.slug }))
          .sort((first, second) =>
            first.name.localeCompare(second.name, "en-US"),
          )}
        decisionContext={{
          completed: onboarding.completed,
          countries: onboarding.targetCountries
            .flatMap((slug) => {
              const country = countryBySlug.get(slug);
              return country
                ? [{ emoji: country.emoji, name: country.name, slug: country.slug }]
                : [];
            })
            .slice(0, 5),
          goal: onboarding.primaryGoal,
          progress: getDecisionProgress(onboarding),
        }}
        initialIdentity={identity}
        initialProfile={profile}
        rank={rank}
      >
        <UserProfile
          appearance={tgpiClerkAppearance}
          path="/profile/security"
          routing="path"
        />
      </TgpiAccountCenter>
    </main>
  );
}
