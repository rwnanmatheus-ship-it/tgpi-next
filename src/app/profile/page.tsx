import { getUserBillingRecord } from "@/lib/billing.server";
import { archiveWorkspaceHistory, loadWorkspaceHistory } from '@/lib/workspace-history.server';
import { getGlobalRankSignals } from '@/lib/global-rank-signals';
import { getGlobalRank } from '@/lib/global-ranks';
import { getFirestoreDocument, isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { buildWorkspaceResources, normalizeWorkspacePreferences, workspaceHistory } from '@/lib/workspace-control';
import { ensureMemberNumber } from '@/lib/members/identity.server';
import { courses } from "@/data/courses";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import GlobalWorkspaceOS from "@/components/profile/GlobalWorkspaceOS";
import ProfessionalResume from "@/components/courses/ProfessionalResume";
import { Suspense } from "react";
import {
  getAccountProfileCompletion,
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
} from "@/lib/account-profile";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { getControlledPremiumAccessMode } from "@/lib/premium-access.server";

export const metadata: Metadata = {
  title: "Workspace Intelligence Home — TGPI",
  description:
    "See your global decision journey, prioritized actions, country shortlist, private progress and connected TGPI identity in one workspace.",
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
  if (!user) throw new Error("Your account could not be loaded. Please retry.");
  const [memberIdentity, savedPreferences] = await Promise.all([
    ensureMemberNumber(session.userId).catch(() => null),
    isLearningStorageConfigured() ? getFirestoreDocument(`tgpiLearningUsers/${session.userId}/workspace/preferences`).then(record => ({ record, available: true })).catch(() => ({ record: null, available: false })) : Promise.resolve({ record: null, available: false }),
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
  await archiveWorkspaceHistory(session.userId, activation).catch(() => null);
  const historyPage = await loadWorkspaceHistory(session.userId).catch(() => ({ events: [], cursor: null, coverageStartedAt: null, available: false }));
  const billing = await getUserBillingRecord(session.userId);
  const controlledAccessMode = await getControlledPremiumAccessMode(
    {
      uid: session.userId,
      email,
      emailVerified,
    },
  );
  const membership =
    controlledAccessMode === "founder"
      ? "TGPI Founder"
      : controlledAccessMode === "preview"
        ? "Premium Preview"
        : billing.plan === "premium"
          ? "TGPI Premium"
          : "TGPI Free";
  const workspaceModel = buildGlobalWorkspaceModel(
    onboarding,
    getAllCountries(),
    activation,
    courses,
  );
  const identity = normalizeAccountIdentity({
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
  const accountProfile = mergeAccountProfileWithOnboarding(
    user?.unsafeMetadata.tgpiAccountProfile,
    onboarding,
  );
  const profileCompletion = getAccountProfileCompletion(identity, accountProfile);


  const rank = getGlobalRank({ ...getGlobalRankSignals(activation), activationCompletion: workspaceModel.activationCompletion, planCompletion: workspaceModel.completion, profileCompletion });
  return (
    <><Suspense fallback={null}><ProfessionalResume uid={session.userId} /></Suspense><GlobalWorkspaceOS
      rank={rank}
      userId={session.userId}
      resources={buildWorkspaceResources(activation, courses, getAllCountries())}
      history={workspaceHistory({ ...activation, activities: [...historyPage.events, ...activation.activities] })}
      historyCursor={historyPage.cursor}
      historyCoverage={historyPage.coverageStartedAt}
      historyAvailable={historyPage.available}
      preferences={normalizeWorkspacePreferences(savedPreferences.record?.data)}
      preferencesAvailable={savedPreferences.available}
      identity={{
        handle: memberIdentity?.handle || user.username || undefined,
        avatarUrl: user?.imageUrl || "",
        firstName: user?.firstName || name,
        fullName: accountProfile.displayName || name,
        globalId,
        headline: accountProfile.headline,
        membership,
        profileCompletion,
        publicProfileUrl: memberIdentity ? `/member/${memberIdentity.number}` : `/member/${session.userId}`,
      }}
      model={workspaceModel}
      onboardingCompleted={params.onboarding === "completed"}
    /></>
  );
}
