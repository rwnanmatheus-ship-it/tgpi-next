import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import PersonalPlanDashboard from "@/components/plan/PersonalPlanDashboard";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import { requireUser } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Personal Global Plan — TGPI",
  description:
    "Connect your Country Fit, comparisons, documents and learning progress in one private TGPI action plan.",
  robots: { index: false, follow: false },
};

export default async function PersonalPlanPage() {
  const [, user] = await Promise.all([requireUser(), currentUser()]);
  const onboarding = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const activation = normalizeActivationProgress(
    user?.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );
  const model = buildGlobalWorkspaceModel(
    onboarding,
    getAllCountries(),
    activation,
  );

  return (
    <PersonalPlanDashboard
      firstName={user?.firstName || user?.fullName || "Global explorer"}
      model={model}
    />
  );
}
