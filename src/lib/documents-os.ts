import type {
  ActivationStatus,
  TgpiActivationProgress,
} from "@/lib/activation-progress";
import { getDocumentReviewStatus } from "@/lib/activation-progress";
import type { Country } from "@/lib/countries";
import type { TgpiOnboardingData } from "@/types/onboarding";

export type DocumentGoal = "live" | "study" | "travel" | "work";

export type DocumentGoalPath = {
  eyebrow: string;
  goal: DocumentGoal;
  label: string;
  title: string;
  description: string;
  outcome: string;
  records: string[];
};

export type DocumentCountryProgress = {
  completedItems: number;
  href: string;
  name: string;
  emoji: string;
  percentage: number;
  slug: string;
  status: ActivationStatus;
  totalItems: number;
  updatedAt?: string;
};

export type DocumentReadinessLayer = {
  description: string;
  href: string;
  label: string;
  status: ActivationStatus;
};

export type DocumentsMemberModel = {
  credentialCount: number | null;
  completedCourses: number;
  totalItems: number;
  signals: { label: string; achieved: boolean; weight: number }[];
  completedCountryReviews: number;
  completedItems: number;
  countries: DocumentCountryProgress[];
  goal: DocumentGoal;
  goalLabel: string;
  layers: DocumentReadinessLayer[];
  nextAction: {
    description: string;
    href: string;
    label: string;
    title: string;
  };
  readinessScore: number;
  startedCountryReviews: number;
};

export const documentGoalPaths: DocumentGoalPath[] = [
  {
    eyebrow: "Mobility file",
    goal: "travel",
    label: "Travel",
    title: "Arrive prepared, not surprised.",
    description:
      "Organize entry requirements, passport validity, insurance and evidence before a trip becomes urgent.",
    outcome: "A destination-specific preparation map",
    records: ["Identity", "Entry", "Health", "Travel evidence"],
  },
  {
    eyebrow: "Education file",
    goal: "study",
    label: "Study",
    title: "Build an application-ready academic file.",
    description:
      "Connect identity, academic history, translations and funding evidence to your study objective.",
    outcome: "A structured academic readiness path",
    records: ["Identity", "Academic", "Language", "Funding"],
  },
  {
    eyebrow: "Career file",
    goal: "work",
    label: "Work",
    title: "Turn experience into portable evidence.",
    description:
      "Map identity, qualifications, employment records and professional requirements for a global move.",
    outcome: "A country-aware professional evidence map",
    records: ["Identity", "Career", "Qualifications", "Eligibility"],
  },
  {
    eyebrow: "Relocation file",
    goal: "live",
    label: "Live abroad",
    title: "Prepare the life behind the move.",
    description:
      "Coordinate civil, financial, housing and residency records around a destination and timeline.",
    outcome: "A complete relocation readiness view",
    records: ["Identity", "Civil", "Financial", "Residency"],
  },
];

const goalLabels: Record<DocumentGoal, string> = {
  live: "Live abroad",
  study: "Study abroad",
  travel: "Travel globally",
  work: "Work internationally",
};

function normalizeGoal(goal: TgpiOnboardingData["primaryGoal"]): DocumentGoal {
  if (goal === "live" || goal === "study" || goal === "travel" || goal === "work") {
    return goal;
  }

  if (goal === "learn") return "study";

  return "travel";
}

function buildCountryProgress(
  onboarding: TgpiOnboardingData,
  activation: TgpiActivationProgress,
  countries: Country[],
) {
  const availableCountries = new Map(countries.map((country) => [country.slug, country]));
  const selectedSlugs = Array.from(
    new Set([
      ...onboarding.targetCountries,
      ...Object.keys(activation.documentReviews),
      ...activation.savedCountries,
    ]),
  );

  return selectedSlugs.flatMap((slug): DocumentCountryProgress[] => {
    const country = availableCountries.get(slug);
    if (!country) return [];

    const review = activation.documentReviews[slug];
    const completedItems = review?.completedItemIds.length || 0;
    const totalItems = review?.totalItems || 0;

    return [
      {
        completedItems: Math.min(completedItems, totalItems),
        updatedAt: review?.updatedAt,
        emoji: country.emoji,
        href: `/countries/${country.slug}#documents-to-verify`,
        name: country.name,
        percentage:
          totalItems > 0
            ? Math.min(100, Math.round((completedItems / totalItems) * 100))
            : 0,
        slug: country.slug,
        status: totalItems > 0 ? getDocumentReviewStatus(review) : "not_started",
        totalItems,
      },
    ];
  });
}

export function buildDocumentsMemberModel(
  onboarding: TgpiOnboardingData,
  activation: TgpiActivationProgress,
  countries: Country[],
  emailVerified: boolean,
  credentialCount: number | null = null,
): DocumentsMemberModel {
  const goal = normalizeGoal(onboarding.primaryGoal);
  const countryProgress = buildCountryProgress(onboarding, activation, countries);
  const startedCountryReviews = countryProgress.filter(
    (country) => country.status !== "not_started",
  ).length;
  const completedCountryReviews = countryProgress.filter(
    (country) => country.status === "completed",
  ).length;
  const completedItems = countryProgress.reduce(
    (total, country) => total + country.completedItems,
    0,
  );

  const completedCourses = Object.values(activation.courseProgress).filter((course) => Boolean(course.completedAt)).length;
  const totalItems = countryProgress.reduce((sum, country) => sum + country.totalItems, 0);
  const readinessSignals = [
    { label: "Verified email", achieved: emailVerified, weight: 15 },
    { label: "Planning profile", achieved: onboarding.completed, weight: 20 },
    { label: "Destination selected", achieved: countryProgress.length > 0, weight: 15 },
    { label: "Primary objective", achieved: Boolean(onboarding.primaryGoal), weight: 10 },
    {
      label: "Timeline and budget",
      achieved: Boolean(onboarding.timeHorizon && onboarding.budgetRange && onboarding.budgetRange !== "undecided"),
      weight: 10,
    },
    { label: "Document research started", achieved: startedCountryReviews > 0, weight: 15 },
    { label: "All destination checklists reviewed", achieved: countryProgress.length > 0 && completedCountryReviews === countryProgress.length, weight: 15 },
  ];
  const readinessScore = readinessSignals.reduce(
    (score, signal) => score + (signal.achieved ? signal.weight : 0),
    0,
  );

  let nextAction = {
    description:
      "Verify your primary email before connecting personal readiness records to your account.",
    href: "/profile/security",
    label: "Secure my identity",
    title: "Strengthen your identity layer",
  };

  if (emailVerified && !onboarding.completed) {
    nextAction = {
      description:
        "Tell TGPI your objective, timeline and destination so the system can prioritize the right research.",
      href: "/onboarding",
      label: "Complete my global plan",
      title: "Create your document strategy",
    };
  } else if (emailVerified && onboarding.completed && countryProgress.length === 0) {
    nextAction = {
      description:
        "Choose a destination to connect country intelligence with a practical document review.",
      href: "/countries",
      label: "Choose a country",
      title: "Add your first destination",
    };
  } else if (emailVerified && onboarding.completed && countryProgress.length > 0) {
    const priorityCountry =
      countryProgress.find((country) => country.status === "in_progress") ||
      countryProgress.find((country) => country.status === "not_started") ||
      countryProgress[0];

    nextAction = {
      description: `Review the country-specific checklist for ${priorityCountry.name} and record what is already prepared.`,
      href: priorityCountry.href,
      label:
        priorityCountry.status === "completed" ? "Review again" : "Continue review",
      title:
        priorityCountry.status === "completed"
          ? "Keep your research current"
          : `Advance your ${priorityCountry.name} file`,
    };
  }

  const layers: DocumentReadinessLayer[] = [
    {
      description: emailVerified
        ? "Primary email verified and linked to your TGPI identity."
        : "Verification is required before building trusted records.",
      href: "/profile/security",
      label: "Identity",
      status: emailVerified ? "completed" : "needs_attention",
    },
    {
      description: onboarding.completed
        ? "Objective, timeline and planning context are connected."
        : "Complete your planning context to personalize the system.",
      href: "/onboarding",
      label: "Personal context",
      status: onboarding.completed ? "completed" : "in_progress",
    },
    {
      description:
        countryProgress.length > 0
          ? `${countryProgress.length} destination${countryProgress.length === 1 ? "" : "s"} connected to your workspace.`
          : "No destination has been connected yet.",
      href: "/countries",
      label: "Country intelligence",
      status: countryProgress.length > 0 ? "completed" : "not_started",
    },
    {
      description:
        startedCountryReviews > 0
          ? `${completedItems} checklist item${completedItems === 1 ? "" : "s"} reviewed across your targets.`
          : "Start a country checklist to map preparation gaps.",
      href: countryProgress.find((country) => country.status !== "completed")?.href || countryProgress[0]?.href || "/countries",
      label: "Document review",
      status:
        countryProgress.length > 0 && completedCountryReviews === countryProgress.length
          ? "completed"
          : startedCountryReviews > 0
            ? "in_progress"
            : "not_started",
    },
    {
      description:
        "TGPI learning evidence can strengthen language and mobility readiness over time.",
      href: "/courses",
      label: "Learning evidence",
      status:
        completedCourses > 0 ? "completed" : Object.keys(activation.courseProgress).length > 0
          ? "in_progress"
          : "not_started",
    },
    {
      href: "/certificates",
      label: "Verified credentials",
      status: credentialCount === null ? "needs_attention" : credentialCount > 0 ? "completed" : "not_started",
      description: credentialCount === null ? "Certificate records could not be confirmed. Open certificates to retry." : `${credentialCount} active, issued certificate${credentialCount === 1 ? "" : "s"}. These are learning achievements, separate from legal documents.`,
    },
  ];

  return {
    credentialCount,
    completedCourses,
    totalItems,
    signals: readinessSignals,
    completedCountryReviews,
    completedItems,
    countries: countryProgress,
    goal,
    goalLabel: goalLabels[goal],
    layers,
    nextAction,
    readinessScore,
    startedCountryReviews,
  };
}
