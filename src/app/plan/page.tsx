import ActivationProgressNotice from "@/components/activation/ActivationProgressNotice";
import { getUserActivationView } from "@/lib/activation-store.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { loadLearningSummary } from "@/lib/learning/unified-progress.server";
import { connectPlanLearning } from "@/lib/personal-plan";
import { courses } from "@/data/courses";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import PersonalPlanDashboard from "@/components/plan/PersonalPlanDashboard";
import { requireUser } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";

export const dynamic = "force-dynamic";

const sourceMetadata: Metadata = {
  title: "Personal Global Plan — TGPI",
  description:
    "Connect your Country Fit, comparisons, documents and learning progress in one private TGPI action plan.",
  robots: { index: false, follow: false },
};

export default async function PersonalPlanPage() {
  const [session, user] = await Promise.all([requireUser(), currentUser()]);
  const onboarding = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const { progress: activation, readOnly } = await getUserActivationView(session.userId, user?.privateMetadata);
  const learning = await loadLearningSummary(session.userId, activation);
  const model = connectPlanLearning(buildGlobalWorkspaceModel(
    onboarding,
    getAllCountries(),
    activation,
    courses,
  ), learning);

  return (
    <>
      {readOnly && <ActivationProgressNotice />}
      <PersonalPlanDashboard
        firstName={user?.firstName || user?.fullName || "Global explorer"}
        model={model}
        learning={learning}
        timeHorizon={onboarding.timeHorizon}
      />
    </>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
