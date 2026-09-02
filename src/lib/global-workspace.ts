import type { Country } from "@/lib/countries";
import {
  createEmptyActivationProgress,
  getCourseProgressStatus,
  getDocumentReviewStatus,
  type ActivationActivity,
  type ActivationStatus,
} from "@/lib/activation-progress";
import {
  getComparisonGoalConfig,
  type ComparisonGoal,
} from "@/lib/tgpi-comparison";
import type {
  OnboardingGoal,
  OnboardingPriority,
  TgpiOnboardingData,
} from "@/types/onboarding";

export type WorkspaceActionStatus = ActivationStatus;

export type WorkspaceAction = {
  action: string;
  description: string;
  eyebrow: string;
  href: string;
  id: "compare" | "documents" | "learning" | "cost" | "profile";
  status: WorkspaceActionStatus;
  title: string;
};

export type WorkspaceCountryFit = {
  country: Country;
  reasons: string[];
  score: number | null;
  warning: string;
};

export type WorkspaceProgressItem = {
  complete: boolean;
  label: string;
};

export type GlobalWorkspaceModel = {
  activationCompletion: number;
  activationStats: Array<{ label: string; value: string }>;
  actions: WorkspaceAction[];
  compareHref: string;
  comparisonGoal: ComparisonGoal;
  completion: number;
  countryFits: WorkspaceCountryFit[];
  goalLabel: string;
  planSummary: Array<{ label: string; value: string }>;
  progress: WorkspaceProgressItem[];
  recentActivities: ActivationActivity[];
  selectedCountryCount: number;
};

const goalLabels: Record<OnboardingGoal, string> = {
  learn: "Expand global knowledge",
  live: "Live in another country",
  study: "Study abroad",
  travel: "Travel smarter",
  work: "Work globally",
};

const timelineLabels: Record<
  Exclude<TgpiOnboardingData["timeHorizon"], "">,
  string
> = {
  "12-months": "Within 12 months",
  "3-months": "Within 3 months",
  "6-months": "Within 6 months",
  exploring: "Still exploring",
  now: "Within 30 days",
};

const budgetLabels: Record<
  Exclude<TgpiOnboardingData["budgetRange"], "">,
  string
> = {
  "1500-3000": "US$1,500–3,000 / month",
  "3000-5000": "US$3,000–5,000 / month",
  "5000-plus": "Over US$5,000 / month",
  "under-1500": "Up to US$1,500 / month",
  undecided: "Budget not defined yet",
};

const priorityLabels: Record<OnboardingPriority, string> = {
  career: "Career",
  cost: "Cost of living",
  culture: "Culture",
  documentation: "Documentation",
  education: "Education",
  language: "Language",
  "quality-of-life": "Quality of life",
  safety: "Safety",
};

function getComparisonGoal(goal: TgpiOnboardingData["primaryGoal"]): ComparisonGoal {
  return goal === "learn" || !goal ? "overall" : goal;
}

function getPriorityReason(priority: OnboardingPriority) {
  return `${priorityLabels[priority]}: evidence required`;
}

function buildCompareHref(countries: Country[], goal: ComparisonGoal) {
  const params = new URLSearchParams();
  countries.slice(0, 3).forEach((country) => {
    params.append("country", country.slug);
  });
  if (goal !== "overall") params.set("goal", goal);
  return `/compare?${params.toString()}`;
}

function joinLabels(values: string[], fallback: string) {
  if (values.length === 0) return fallback;
  return new Intl.ListFormat("en", {
    style: "short",
    type: "conjunction",
  }).format(values);
}

export function buildGlobalWorkspaceModel(
  onboarding: TgpiOnboardingData,
  allCountries: Country[],
  activation = createEmptyActivationProgress(),
): GlobalWorkspaceModel {
  const comparisonGoal = getComparisonGoal(onboarding.primaryGoal);
  const selectedCountries = onboarding.targetCountries
    .map((slug) => allCountries.find((country) => country.slug === slug))
    .filter((country): country is Country => Boolean(country));
  const countryFits = selectedCountries
    .map((country) => ({
      country,
      reasons: onboarding.priorities
        .slice(0, 2)
        .map((priority) => getPriorityReason(priority)),
      score: null,
      warning: "No fit score is published without sufficient evidence. Validate your legal route, local budget and personal requirements.",
    }));
  const countriesForComparison = countryFits
    .slice(0, 3)
    .map((fit) => fit.country);
  const primaryCountry = countryFits[0]?.country;
  const compareHref = buildCompareHref(countriesForComparison, comparisonGoal);
  const canCompare = countriesForComparison.length >= 2;
  const hasCountry = Boolean(primaryCountry);
  const documentEntries = Object.entries(activation.documentReviews).sort(
    ([, first], [, second]) => second.updatedAt.localeCompare(first.updatedAt),
  );
  const latestDocumentEntry = documentEntries[0];
  const documentStatuses = documentEntries.map(([, review]) =>
    getDocumentReviewStatus(review),
  );
  const documentStatus: ActivationStatus = documentStatuses.includes("completed")
    ? "completed"
    : documentStatuses.includes("in_progress")
      ? "in_progress"
      : hasCountry
        ? "not_started"
        : "needs_attention";
  const courseStatuses = Object.values(activation.courseProgress).map((course) =>
    getCourseProgressStatus(course),
  );
  const learningStatus: ActivationStatus = courseStatuses.includes("completed")
    ? "completed"
    : courseStatuses.includes("in_progress")
      ? "in_progress"
      : "not_started";
  const compareStatus: ActivationStatus = activation.comparisons.length
    ? "completed"
    : canCompare
      ? "not_started"
      : "needs_attention";
  const costStatus: ActivationStatus = Object.keys(activation.costEstimates).length
    ? "completed"
    : hasCountry
      ? "not_started"
      : "needs_attention";
  const latestComparison = activation.comparisons[0];
  const latestCostCountry = Object.entries(activation.costEstimates).sort(
    ([, first], [, second]) => second.updatedAt.localeCompare(first.updatedAt),
  )[0]?.[0];
  const progress: WorkspaceProgressItem[] = [
    { complete: Boolean(onboarding.primaryGoal), label: "Primary goal" },
    {
      complete: onboarding.targetCountries.length > 0,
      label: "Country shortlist",
    },
    {
      complete: Boolean(onboarding.timeHorizon && onboarding.budgetRange),
      label: "Timeline and budget",
    },
    {
      complete: Boolean(
        onboarding.languages.length > 0 && onboarding.internationalExperience,
      ),
      label: "Personal context",
    },
    {
      complete: onboarding.priorities.length >= 3,
      label: "Decision priorities",
    },
  ];
  const profileStatus: ActivationStatus = onboarding.completed
    ? "completed"
    : progress.some((item) => item.complete)
      ? "in_progress"
      : "not_started";
  const completion = progress.filter((item) => item.complete).length * 20;
  const selectedNames = selectedCountries.map((country) => country.name);

  const actions: WorkspaceAction[] = [
    {
      action:
        compareStatus === "completed"
          ? "Review saved comparison"
          : canCompare
            ? "Open personalized comparison"
            : "Add countries",
      description: canCompare
        ? `Compare ${joinLabels(
            countriesForComparison.map((country) => country.name),
            "your shortlist",
          )} through the ${getComparisonGoalConfig(comparisonGoal).shortLabel.toLowerCase()} lens.`
        : "Select at least two countries so TGPI can build a meaningful side-by-side decision.",
      eyebrow: "Decide",
      href: latestComparison
        ? buildCompareHref(
            latestComparison.countrySlugs
              .map((slug) => allCountries.find((country) => country.slug === slug))
              .filter((country): country is Country => Boolean(country)),
            latestComparison.goal,
          )
        : canCompare
          ? compareHref
          : "/onboarding",
      id: "compare",
      status: compareStatus,
      title: "Compare selected countries",
    },
    {
      action: hasCountry ? `Review ${primaryCountry.name}` : "Choose a country",
      description: hasCountry
        ? `Open the documentation checklist for ${primaryCountry.name}, your strongest current fit.`
        : "Choose a country before reviewing visa and residence pathways.",
      eyebrow: "Prepare",
      href: latestDocumentEntry
        ? `/countries/${latestDocumentEntry[0]}#documents-to-verify`
        : hasCountry
          ? `/countries/${primaryCountry.slug}#documents-to-verify`
        : "/countries",
      id: "documents",
      status: documentStatus,
      title: "Review visa requirements",
    },
    {
      action:
        learningStatus === "completed"
          ? "Review completed path"
          : learningStatus === "in_progress"
            ? "Continue learning"
            : "Explore learning paths",
      description:
        onboarding.primaryGoal === "learn"
          ? "Turn your global curiosity into a structured practical learning path."
          : `Build the language, decision and readiness skills that support your ${getComparisonGoalConfig(comparisonGoal).shortLabel.toLowerCase()} goal.`,
      eyebrow: "Develop",
      href:
        learningStatus === "in_progress" || learningStatus === "completed"
          ? "/courses/english-abroad"
          : "/courses#learning-paths",
      id: "learning",
      status: learningStatus,
      title: "Start a learning path",
    },
    {
      action:
        costStatus === "completed"
          ? "Review saved estimate"
          : hasCountry
            ? "Open cost intelligence"
            : "Explore country costs",
      description: hasCountry
        ? canCompare
          ? `Review monthly budget references for ${joinLabels(
              countriesForComparison.map((country) => country.name),
              "your shortlist",
            )}.`
          : `Review the local monthly budget reference and cost breakdown for ${primaryCountry.name}.`
        : "Choose a country to unlock local monthly budget references.",
      eyebrow: "Plan",
      href: latestCostCountry
        ? `/countries/${latestCostCountry}#cost-of-living`
        : canCompare
          ? `${compareHref}#comparison-matrix`
          : hasCountry
            ? `/countries/${primaryCountry.slug}#cost-of-living`
            : "/countries",
      id: "cost",
      status: costStatus,
      title: "Estimate monthly costs",
    },
    {
      action: onboarding.completed ? "Review global profile" : "Complete profile",
      description: onboarding.completed
        ? "Your core plan is complete. Review it whenever your direction, budget or priorities change."
        : "Complete your goal, shortlist, timeline, context and priorities to improve every TGPI recommendation.",
      eyebrow: "Personalize",
      href: "/onboarding",
      id: "profile",
      status: profileStatus,
      title: "Complete your global profile",
    },
  ];

  const completedActionCount = actions.filter(
    (action) => action.status === "completed",
  ).length;

  return {
    activationCompletion: completedActionCount * 20,
    activationStats: [
      {
        label: "Saved countries",
        value: String(activation.savedCountries.length),
      },
      {
        label: "Comparisons",
        value: String(activation.comparisons.length),
      },
      {
        label: "Document reviews",
        value: String(documentEntries.length),
      },
      {
        label: "Learning paths",
        value: String(Object.keys(activation.courseProgress).length),
      },
    ],
    actions,
    compareHref,
    comparisonGoal,
    completion,
    countryFits,
    goalLabel: onboarding.primaryGoal
      ? goalLabels[onboarding.primaryGoal]
      : "Goal not defined",
    planSummary: [
      {
        label: "Primary goal",
        value: onboarding.primaryGoal
          ? goalLabels[onboarding.primaryGoal]
          : "Not defined",
      },
      {
        label: "Countries",
        value: joinLabels(selectedNames, "No shortlist yet"),
      },
      {
        label: "Timeline",
        value: onboarding.timeHorizon
          ? timelineLabels[onboarding.timeHorizon]
          : "Not defined",
      },
      {
        label: "Budget",
        value: onboarding.budgetRange
          ? budgetLabels[onboarding.budgetRange]
          : "Not defined",
      },
      {
        label: "Priorities",
        value: joinLabels(
          onboarding.priorities.map((priority) => priorityLabels[priority]),
          "Not defined",
        ),
      },
    ],
    progress,
    recentActivities: activation.activities.slice(0, 5),
    selectedCountryCount: selectedCountries.length,
  };
}
