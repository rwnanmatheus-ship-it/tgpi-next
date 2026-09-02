import type { Course } from "@/data/courses";
import type { TgpiActivationProgress } from "@/lib/activation-progress";
import type { Country } from "@/lib/countries";
import {
  buildGlobalWorkspaceModel,
  type WorkspaceAction,
} from "@/lib/global-workspace";
import type { ComparisonGoal } from "@/lib/tgpi-comparison";
import type { TgpiOnboardingData } from "@/types/onboarding";

export type PremiumCountryCard = {
  costEstimate?: {
    amount: number;
    currency: string;
  };
  documentProgress?: {
    completed: number;
    total: number;
  };
  emoji: string;
  fitScore: number | null;
  isSaved: boolean;
  name: string;
  region: string;
  slug: string;
};

export type PremiumComparisonSummary = {
  countryNames: string[];
  goal: ComparisonGoal;
  href: string;
  isSaved: boolean;
  updatedAt?: string;
};

export type PremiumLearningSummary = {
  completedLessons: number;
  href: string;
  percent: number;
  title: string;
  totalLessons: number;
};

export type PremiumDocumentSummary = {
  completed: number;
  countryName: string;
  href: string;
  percent: number;
  total: number;
};

export type PremiumCostSummary = {
  amount: number;
  countryName: string;
  currency: string;
  href: string;
  isPersonalEstimate: boolean;
};

export type PremiumCommandCenterModel = {
  activationCompletion: number;
  actions: WorkspaceAction[];
  comparison: PremiumComparisonSummary;
  cost: PremiumCostSummary;
  documents: PremiumDocumentSummary;
  learning: PremiumLearningSummary;
  nextAction: WorkspaceAction;
  planCompletion: number;
  planSummary: Array<{ label: string; value: string }>;
  readiness: number;
  recentActivities: TgpiActivationProgress["activities"];
  shortlist: PremiumCountryCard[];
  stats: Array<{ label: string; value: string }>;
};

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function buildComparisonHref(countrySlugs: string[], goal: ComparisonGoal) {
  const params = new URLSearchParams();
  countrySlugs.slice(0, 3).forEach((slug) => params.append("country", slug));
  if (goal !== "overall") params.set("goal", goal);
  const query = params.toString();
  return query ? `/compare?${query}` : "/compare";
}

function getCourseLessonCount(course: Course) {
  return course.modules.reduce(
    (total, courseModule) => total + courseModule.lessons.length,
    0,
  );
}

function getPrimaryAction(actions: WorkspaceAction[]) {
  return (
    actions.find((action) => action.status === "in_progress") ??
    actions.find((action) => action.status === "needs_attention") ??
    actions.find((action) => action.status === "not_started") ??
    actions[0]
  );
}

export function buildPremiumCommandCenterModel(
  onboarding: TgpiOnboardingData,
  activation: TgpiActivationProgress,
  allCountries: Country[],
  courses: Course[],
): PremiumCommandCenterModel {
  const workspace = buildGlobalWorkspaceModel(
    onboarding,
    allCountries,
    activation,
  );
  const countryBySlug = new Map(
    allCountries.map((country) => [country.slug, country]),
  );
  const fitScoreBySlug = new Map(
    workspace.countryFits.map((fit) => [fit.country.slug, fit.score]),
  );
  const shortlistSlugs = uniqueStrings([
    ...activation.savedCountries,
    ...onboarding.targetCountries,
  ]).filter((slug) => countryBySlug.has(slug));

  const shortlist = shortlistSlugs.slice(0, 4).map((slug) => {
    const country = countryBySlug.get(slug)!;
    const costEstimate = activation.costEstimates[slug];
    const documentReview = activation.documentReviews[slug];

    return {
      costEstimate: costEstimate
        ? { amount: costEstimate.amount, currency: costEstimate.currency }
        : undefined,
      documentProgress: documentReview
        ? {
            completed: documentReview.completedItemIds.length,
            total: documentReview.totalItems,
          }
        : undefined,
      emoji: country.emoji,
      fitScore: fitScoreBySlug.get(slug) ?? null,
      isSaved: activation.savedCountries.includes(slug),
      name: country.name,
      region: country.region,
      slug,
    } satisfies PremiumCountryCard;
  });

  const latestComparison = activation.comparisons[0];
  const suggestedComparisonSlugs = workspace.countryFits
    .slice(0, 3)
    .map((fit) => fit.country.slug);
  const comparisonSlugs = latestComparison?.countrySlugs.length
    ? latestComparison.countrySlugs
    : suggestedComparisonSlugs;
  const comparisonGoal = latestComparison?.goal ?? workspace.comparisonGoal;
  const comparison: PremiumComparisonSummary = {
    countryNames: comparisonSlugs
      .map((slug) => countryBySlug.get(slug)?.name)
      .filter((name): name is string => Boolean(name)),
    goal: comparisonGoal,
    href: buildComparisonHref(comparisonSlugs, comparisonGoal),
    isSaved: Boolean(latestComparison),
    updatedAt: latestComparison?.updatedAt,
  };

  const courseEntries = Object.entries(activation.courseProgress).sort(
    ([, first], [, second]) => second.updatedAt.localeCompare(first.updatedAt),
  );
  const activeCourseEntry = courseEntries.find(([courseId]) =>
    courses.some((course) => course.id === courseId),
  );
  const activeCourse = activeCourseEntry
    ? courses.find((course) => course.id === activeCourseEntry[0])
    : courses[0];
  const activeCourseProgress = activeCourseEntry?.[1];
  const activeLessonIds = new Set(
    activeCourse?.modules.flatMap((courseModule) =>
      courseModule.lessons.map((lesson) => lesson.id),
    ) || [],
  );
  const totalLessons = activeCourse ? getCourseLessonCount(activeCourse) : 0;
  const completedLessons =
    activeCourseProgress?.completedLessonIds.filter((lessonId) =>
      activeLessonIds.has(lessonId),
    ).length || 0;
  const learning: PremiumLearningSummary = {
    completedLessons,
    href: activeCourse ? `/courses/${activeCourse.id}` : "/courses",
    percent: totalLessons
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0,
    title: activeCourse?.title || "Explore TGPI learning paths",
    totalLessons,
  };

  const documentEntries = Object.entries(activation.documentReviews).sort(
    ([, first], [, second]) => second.updatedAt.localeCompare(first.updatedAt),
  );
  const documentEntry = documentEntries[0];
  const documentCountry = documentEntry
    ? countryBySlug.get(documentEntry[0])
    : workspace.countryFits[0]?.country;
  const documentProgress = documentEntry?.[1];
  const documentCompleted = documentProgress?.completedItemIds.length || 0;
  const documentTotal = documentProgress?.totalItems || 0;
  const documents: PremiumDocumentSummary = {
    completed: documentCompleted,
    countryName: documentCountry?.name || "your priority country",
    href: documentCountry
      ? `/countries/${documentCountry.slug}#documents-to-verify`
      : "/countries",
    percent: documentTotal
      ? Math.round((documentCompleted / documentTotal) * 100)
      : 0,
    total: documentTotal,
  };

  const costEntries = Object.entries(activation.costEstimates).sort(
    ([, first], [, second]) => second.updatedAt.localeCompare(first.updatedAt),
  );
  const costEntry = costEntries[0];
  const costCountry = costEntry
    ? countryBySlug.get(costEntry[0])
    : workspace.countryFits[0]?.country;
  const cost: PremiumCostSummary = {
    amount:
      costEntry?.[1].amount ||
      0,
    countryName: costCountry?.name || "your priority country",
    currency: costEntry?.[1].currency || "USD",
    href: costCountry
      ? `/countries/${costCountry.slug}#cost-of-living`
      : "/countries",
    isPersonalEstimate: Boolean(costEntry),
  };

  const readiness = Math.round(
    workspace.completion * 0.4 + workspace.activationCompletion * 0.6,
  );

  return {
    activationCompletion: workspace.activationCompletion,
    actions: workspace.actions,
    comparison,
    cost,
    documents,
    learning,
    nextAction: getPrimaryAction(workspace.actions),
    planCompletion: workspace.completion,
    planSummary: workspace.planSummary,
    readiness,
    recentActivities: workspace.recentActivities,
    shortlist,
    stats: [
      { label: "Workspace progress", value: `${readiness}%` },
      { label: "Countries in focus", value: String(shortlist.length) },
      {
        label: "Saved comparisons",
        value: String(activation.comparisons.length),
      },
      {
        label: "Learning progress",
        value: `${learning.percent}%`,
      },
    ],
  };
}
