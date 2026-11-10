import { getUserActivationView } from "@/lib/activation-store.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { getAccountMembershipLabel } from "@/lib/account-membership.server";
import { loadWorkspaceHistoryForProgress } from '@/lib/workspace-history.server';
import { getGlobalRankSignals } from '@/lib/global-rank-signals';
import { getGlobalRank } from '@/lib/global-ranks';
import { getFirestoreDocument, isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { buildWorkspaceResources, normalizeWorkspacePreferences, workspaceHistory } from '@/lib/workspace-control';
import { ensureMemberNumber } from '@/lib/members/identity.server';
import { courses } from "@/data/courses";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import GlobalWorkspaceOS from "@/components/profile/GlobalWorkspaceOS";
import { loadLearningSummary } from "@/lib/learning/unified-progress.server";
import { reconcileWorkspaceLearning } from "@/lib/workspace-intelligence";
import {
  getAccountProfileCompletion,
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
} from "@/lib/account-profile";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";

const sourceMetadata: Metadata = {
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
  const name = user?.fullName || user?.firstName || "Global explorer";
  const email = user?.primaryEmailAddress?.emailAddress;
  const emailVerified = user?.primaryEmailAddress?.verification?.status === "verified";
  const globalId = formatTgpiGlobalId(session.userId);
  const onboarding = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const { progress: activation, readOnly, historyArchived } = await getUserActivationView(session.userId, user?.privateMetadata);
  const [memberIdentity, savedPreferences, historyPage, membership, learning] = await Promise.all([
    ensureMemberNumber(session.userId).catch(() => null),
    !readOnly && isLearningStorageConfigured()
      ? getFirestoreDocument(`tgpiLearningUsers/${session.userId}/workspace/preferences`)
          .then(record => ({ record, available: true }))
          .catch(() => ({ record: null, available: false }))
      : { record: null, available: false },
    readOnly ? { events: [], cursor: null, coverageStartedAt: null, available: false, reconciliationPending: true } : loadWorkspaceHistoryForProgress(session.userId, activation, historyArchived)
      .catch(() => ({ events: [], cursor: null, coverageStartedAt: null, available: false, reconciliationPending: true })),
    getAccountMembershipLabel({ uid: session.userId, email, emailVerified }),
    loadLearningSummary(session.userId, activation),
  ]);
  const countries = getAllCountries();
  const resources = reconcileWorkspaceLearning(buildWorkspaceResources(activation, courses, countries), learning);
  const workspaceModel = buildGlobalWorkspaceModel(
    onboarding,
    countries,
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
    <GlobalWorkspaceOS
      learning={learning}
      progressReadOnly={readOnly}
      rank={rank}
      userId={session.userId}
      resources={resources}
      history={workspaceHistory({ ...activation, activities: [...historyPage.events, ...activation.activities] })}
      historyCursor={historyPage.cursor}
      historyCoverage={historyPage.coverageStartedAt}
      historyPending={historyPage.reconciliationPending}
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
    />
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
