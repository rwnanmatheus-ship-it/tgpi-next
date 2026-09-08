import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import GlobalWorkspaceOS from "@/components/profile/GlobalWorkspaceOS";
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

  return (
    <GlobalWorkspaceOS
      identity={{
        avatarUrl: user?.imageUrl || "",
        firstName: user?.firstName || name,
        fullName: name,
        globalId,
        headline: accountProfile.headline,
        membership,
        profileCompletion,
        publicProfileUrl: `/member/${session.userId}`,
      }}
      model={workspaceModel}
      onboardingCompleted={params.onboarding === "completed"}
    />
  );
}
