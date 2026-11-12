import ActivationProgressNotice from "@/components/activation/ActivationProgressNotice";
import { getUserActivationView } from "@/lib/activation-store.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { loadLearningSummary } from "@/lib/learning/unified-progress.server";
import { buildPersonalPlan } from "@/lib/personal-plan";
import { loadPlanBudgetEvidence } from "@/lib/plan-budget.server";
import { courses } from "@/data/courses";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import PersonalPlanDashboard from "@/components/plan/PersonalPlanDashboard";
import { requireUser } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { normalizeOnboardingData } from "@/lib/onboarding";

export const dynamic = "force-dynamic";

const sourceMetadata: Metadata = {
  title: "Personal Global Plan — TGPI",
  description:
    "Connect your Country Fit, comparisons, documents and learning progress in one private TGPI action plan.",
  robots: { index: false, follow: false },
};

export default async function PersonalPlanPage({ searchParams }: { searchParams: Promise<{ country?: string | string[]; scenario?: string | string[] }> }) {
  const [session, user] = await Promise.all([requireUser("/plan"), currentUser()]);
  const onboarding = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const countries = getAllCountries();
  const destinations = onboarding.targetCountries.filter(slug => countries.some(country => country.slug === slug));
  const [{ progress: activation, readOnly }, budgets, query] = await Promise.all([
    getUserActivationView(session.userId, user?.privateMetadata),
    loadPlanBudgetEvidence(session.userId, destinations, user?.unsafeMetadata.tgpiResearchWorksheet),
    searchParams,
  ]);
  const learning = await loadLearningSummary(session.userId, activation);
  const { model, path, preparation } = buildPersonalPlan(onboarding, countries, activation, learning, courses, budgets, readOnly);
  const budgetCountry = typeof query.country === 'string' && destinations.includes(query.country) ? query.country : undefined;

  const scenario = query.scenario;
  const budgetSlot = budgetCountry && (scenario === '1' || scenario === '2' || scenario === '3') ? scenario : undefined;
  return (
    <>
      {readOnly && <ActivationProgressNotice />}
      <PersonalPlanDashboard
        firstName={user?.firstName || user?.fullName || "Global explorer"}
        model={model}
        learning={learning}
        path={path}
        preparation={preparation}
        budgetCountry={budgetCountry}
        budgetSlot={budgetSlot}
        activationReadOnly={readOnly}
      />
    </>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
