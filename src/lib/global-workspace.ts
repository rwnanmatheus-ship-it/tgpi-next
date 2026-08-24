import type { Country, CountryDifficulty, CountryGoal } from "@/lib/countries";
import {
  getCountryComparisonScore,
  getCountryCostBandScore,
  getComparisonGoalConfig,
  type ComparisonGoal,
} from "@/lib/tgpi-comparison";
import type {
  OnboardingGoal,
  OnboardingPriority,
  TgpiOnboardingData,
} from "@/types/onboarding";

export type WorkspaceActionStatus = "available" | "needs-input" | "ready";

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
  score: number;
  warning: string;
};

export type WorkspaceProgressItem = {
  complete: boolean;
  label: string;
};

export type GlobalWorkspaceModel = {
  actions: WorkspaceAction[];
  compareHref: string;
  comparisonGoal: ComparisonGoal;
  completion: number;
  countryFits: WorkspaceCountryFit[];
  goalLabel: string;
  planSummary: Array<{ label: string; value: string }>;
  progress: WorkspaceProgressItem[];
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

const difficultyScores: Record<CountryDifficulty, number> = {
  easy: 92,
  hard: 38,
  medium: 65,
};

function getComparisonGoal(goal: TgpiOnboardingData["primaryGoal"]): ComparisonGoal {
  return goal === "learn" || !goal ? "overall" : goal;
}

function getGoalMatchScore(country: Country, goal: CountryGoal) {
  return country.idealFor.includes(goal) ? 92 : 55;
}

function getPriorityScore(country: Country, priority: OnboardingPriority) {
  if (priority === "safety") return country.intelligence.safetyScore;
  if (priority === "cost") return getCountryCostBandScore(country);
  if (priority === "quality-of-life") {
    return country.intelligence.qualityOfLifeScore;
  }
  if (priority === "language") {
    return country.intelligence.englishFriendliness;
  }
  if (priority === "documentation") {
    return difficultyScores[country.intelligence.immigrationDifficulty];
  }
  if (priority === "career") return getGoalMatchScore(country, "work");
  if (priority === "education") return getGoalMatchScore(country, "study");
  return getGoalMatchScore(country, "cultural");
}

function getPersonalFitScore(
  country: Country,
  onboarding: TgpiOnboardingData,
  comparisonGoal: ComparisonGoal,
) {
  const goalScore = getCountryComparisonScore(country, comparisonGoal);

  if (onboarding.priorities.length === 0) return goalScore;

  const priorityAverage =
    onboarding.priorities.reduce(
      (total, priority) => total + getPriorityScore(country, priority),
      0,
    ) / onboarding.priorities.length;

  return Math.round(goalScore * 0.65 + priorityAverage * 0.35);
}

function getPriorityReason(country: Country, priority: OnboardingPriority) {
  if (priority === "safety") {
    return `${country.intelligence.safetyScore}/100 safety signal`;
  }
  if (priority === "cost") {
    return `${country.costLevel} relative cost band`;
  }
  if (priority === "quality-of-life") {
    return `${country.intelligence.qualityOfLifeScore}/100 quality of life`;
  }
  if (priority === "language") {
    return `${country.intelligence.englishFriendliness}/100 English access`;
  }
  if (priority === "documentation") {
    return `${country.intelligence.immigrationDifficulty} immigration complexity`;
  }
  if (priority === "career") {
    return country.idealFor.includes("work")
      ? "Aligned with international work"
      : "Career validation required";
  }
  if (priority === "education") {
    return country.idealFor.includes("study")
      ? "Aligned with study goals"
      : "Education pathway requires review";
  }
  return country.idealFor.includes("cultural")
    ? "Strong cultural learning signal"
    : "Cultural adaptation requires research";
}

function getCountryWarning(country: Country) {
  if (country.intelligence.immigrationDifficulty === "hard") {
    return "Higher documentation and adaptation effort.";
  }
  if (country.costLevel === "high") {
    return "Premium cost profile requires budget validation.";
  }
  if (country.intelligence.englishFriendliness < 55) {
    return "Local-language preparation will be important.";
  }
  return "Validate city-level conditions and official requirements.";
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
        .map((priority) => getPriorityReason(country, priority)),
      score: getPersonalFitScore(country, onboarding, comparisonGoal),
      warning: getCountryWarning(country),
    }))
    .sort((first, second) => second.score - first.score);
  const countriesForComparison = countryFits
    .slice(0, 3)
    .map((fit) => fit.country);
  const primaryCountry = countryFits[0]?.country;
  const compareHref = buildCompareHref(countriesForComparison, comparisonGoal);
  const canCompare = countriesForComparison.length >= 2;
  const hasCountry = Boolean(primaryCountry);
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
  const completion = progress.filter((item) => item.complete).length * 20;
  const selectedNames = selectedCountries.map((country) => country.name);

  const actions: WorkspaceAction[] = [
    {
      action: canCompare ? "Open personalized comparison" : "Add countries",
      description: canCompare
        ? `Compare ${joinLabels(
            countriesForComparison.map((country) => country.name),
            "your shortlist",
          )} through the ${getComparisonGoalConfig(comparisonGoal).shortLabel.toLowerCase()} lens.`
        : "Select at least two countries so TGPI can build a meaningful side-by-side decision.",
      eyebrow: "Decide",
      href: canCompare ? compareHref : "/onboarding",
      id: "compare",
      status: canCompare ? "ready" : "needs-input",
      title: "Compare selected countries",
    },
    {
      action: hasCountry ? `Review ${primaryCountry.name}` : "Choose a country",
      description: hasCountry
        ? `Open the documentation checklist for ${primaryCountry.name}, your strongest current fit.`
        : "Choose a country before reviewing visa and residence pathways.",
      eyebrow: "Prepare",
      href: hasCountry
        ? `/countries/${primaryCountry.slug}#documents-to-verify`
        : "/countries",
      id: "documents",
      status: hasCountry ? "ready" : "needs-input",
      title: "Review visa requirements",
    },
    {
      action: "Explore learning paths",
      description:
        onboarding.primaryGoal === "learn"
          ? "Turn your global curiosity into a structured practical learning path."
          : `Build the language, decision and readiness skills that support your ${getComparisonGoalConfig(comparisonGoal).shortLabel.toLowerCase()} goal.`,
      eyebrow: "Develop",
      href: "/courses#learning-paths",
      id: "learning",
      status: "available",
      title: "Start a learning path",
    },
    {
      action: hasCountry ? "Open cost intelligence" : "Explore country costs",
      description: hasCountry
        ? canCompare
          ? `Review monthly budget references for ${joinLabels(
              countriesForComparison.map((country) => country.name),
              "your shortlist",
            )}.`
          : `Review the local monthly budget reference and cost breakdown for ${primaryCountry.name}.`
        : "Choose a country to unlock local monthly budget references.",
      eyebrow: "Plan",
      href: canCompare
        ? `${compareHref}#comparison-matrix`
        : hasCountry
          ? `/countries/${primaryCountry.slug}#cost-of-living`
          : "/countries",
      id: "cost",
      status: hasCountry ? "ready" : "needs-input",
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
      status: onboarding.completed ? "ready" : "needs-input",
      title: "Complete your global profile",
    },
  ];

  return {
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
    selectedCountryCount: selectedCountries.length,
  };
}
