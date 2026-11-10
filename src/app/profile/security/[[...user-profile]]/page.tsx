import { getUserActivationProgress } from "@/lib/activation-store.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { getAccountMembershipLabel } from "@/lib/account-membership.server";
import { ensureMemberNumber } from '@/lib/members/identity.server';
import { courses } from "@/data/courses";
import { getGlobalRankSignals } from "@/lib/global-rank-signals";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";
import TgpiAccountCenter from "@/components/profile/TgpiAccountCenter";
import {
  getAccountProfileCompletion,
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
} from "@/lib/account-profile";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { getGlobalRank } from "@/lib/global-ranks";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";

const sourceMetadata: Metadata = {
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
  const [memberIdentity, membership, activation] = await Promise.all([
    ensureMemberNumber(session.userId).catch(() => null),
    getAccountMembershipLabel({ uid: session.userId, email, emailVerified }),
    getUserActivationProgress(session.userId, user?.privateMetadata).catch(() => null),
  ]);
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
    username: memberIdentity?.handle || "",
  });
  const countries = getAllCountries();
  const countryBySlug = new Map(
    countries.map((country) => [country.slug, country]),
  );
  const workspaceModel = activation ? buildGlobalWorkspaceModel(onboarding, countries, activation, courses) : null;
  const rank = activation && workspaceModel ? getGlobalRank({
    ...getGlobalRankSignals(activation),
    activationCompletion: workspaceModel.activationCompletion,
    planCompletion: workspaceModel.completion,
    profileCompletion: getAccountProfileCompletion(identity, profile),
  }) : null;

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-6 text-[var(--tgpi-navy-raised)] sm:px-6 sm:py-10 lg:py-14">
      <TgpiAccountCenter
        key={session.sessionId}
        sessionId={session.sessionId}
        account={{
          avatarUrl: user?.imageUrl || "",
          email,
          emailVerified,
          globalId: formatTgpiGlobalId(session.userId),
          membership,
          publicProfileUrl: memberIdentity ? `/member/${memberIdentity.number}` : `/member/${session.userId}`,
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

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
