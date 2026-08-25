import type { ComparisonGoal } from "@/lib/tgpi-comparison";

export const TGPI_ACTIVATION_METADATA_KEY = "tgpiActivationV1";

export type ActivationStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "needs_attention";

export type ActivationActivityType =
  | "comparison"
  | "cost"
  | "course"
  | "documents"
  | "saved_country";

export type ActivationActivity = {
  href: string;
  id: string;
  occurredAt: string;
  title: string;
  type: ActivationActivityType;
};

export type SavedComparison = {
  countrySlugs: string[];
  goal: ComparisonGoal;
  id: string;
  updatedAt: string;
};

export type DocumentReviewProgress = {
  completedItemIds: string[];
  totalItems: number;
  updatedAt: string;
};

export type CourseProgress = {
  completedAt?: string;
  completedLessonIds: string[];
  courseVersion: string;
  startedAt: string;
  totalLessons: number;
  updatedAt: string;
};

export type CostEstimate = {
  amount: number;
  currency: string;
  updatedAt: string;
};

export type TgpiActivationProgress = {
  activities: ActivationActivity[];
  comparisons: SavedComparison[];
  costEstimates: Record<string, CostEstimate>;
  courseProgress: Record<string, CourseProgress>;
  documentReviews: Record<string, DocumentReviewProgress>;
  savedCountries: string[];
  updatedAt?: string;
  version: 1;
};

export type ActivationMutation =
  | {
      countrySlug: string;
      saved: boolean;
      type: "save_country";
    }
  | {
      countrySlugs: string[];
      goal: ComparisonGoal;
      type: "record_comparison";
    }
  | {
      complete: boolean;
      countrySlug: string;
      itemId: string;
      totalItems: number;
      type: "update_documents";
    }
  | {
      courseId: string;
      type: "start_course";
    }
  | {
      checkpointOptionId: string;
      courseId: string;
      lessonId: string;
      type: "complete_lesson";
    }
  | {
      amount: number;
      countrySlug: string;
      currency: string;
      type: "save_cost_estimate";
    };

const MAX_ACTIVITIES = 6;
const MAX_COMPARISONS = 4;
const MAX_COUNTRY_RECORDS = 4;
const MAX_COURSES = 4;
const MAX_SAVED_COUNTRIES = 8;

export function createEmptyActivationProgress(): TgpiActivationProgress {
  return {
    activities: [],
    comparisons: [],
    costEstimates: {},
    courseProgress: {},
    documentReviews: {},
    savedCountries: [],
    version: 1,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function safeString(value: unknown, maxLength = 120) {
  return typeof value === "string" ? value.slice(0, maxLength) : "";
}

function safeStringArray(value: unknown, limit: number) {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.slice(0, 80))
        .filter(Boolean),
    ),
  ).slice(0, limit);
}

function safeDate(value: unknown) {
  if (typeof value !== "string") return "";
  const time = Date.parse(value);
  return Number.isNaN(time) ? "" : new Date(time).toISOString();
}

function normalizeActivities(value: unknown): ActivationActivity[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(isRecord)
    .map((item) => ({
      href: safeString(item.href, 180),
      id: safeString(item.id, 160),
      occurredAt: safeDate(item.occurredAt),
      title: safeString(item.title, 120),
      type: safeString(item.type, 40) as ActivationActivityType,
    }))
    .filter(
      (item) =>
        item.id &&
        item.title &&
        item.href.startsWith("/") &&
        item.occurredAt &&
        ["comparison", "cost", "course", "documents", "saved_country"].includes(
          item.type,
        ),
    )
    .slice(0, MAX_ACTIVITIES);
}

function normalizeComparisons(value: unknown): SavedComparison[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(isRecord)
    .map((item) => ({
      countrySlugs: safeStringArray(item.countrySlugs, 3),
      goal: safeString(item.goal, 40) as ComparisonGoal,
      id: safeString(item.id, 160),
      updatedAt: safeDate(item.updatedAt),
    }))
    .filter(
      (item) =>
        item.id &&
        item.countrySlugs.length >= 2 &&
        item.updatedAt &&
        ["overall", "travel", "study", "work", "live"].includes(item.goal),
    )
    .slice(0, MAX_COMPARISONS);
}

function normalizeDocumentReviews(value: unknown) {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => isRecord(item))
      .map(([countrySlug, item]) => {
        const review = item as Record<string, unknown>;
        return [
          countrySlug.slice(0, 80),
          {
            completedItemIds: safeStringArray(review.completedItemIds, 12),
            totalItems: Math.min(
              Math.max(Number(review.totalItems) || 0, 0),
              12,
            ),
            updatedAt: safeDate(review.updatedAt),
          },
        ];
      })
      .filter(([, item]) => {
        const review = item as DocumentReviewProgress;
        return review.totalItems > 0 && review.updatedAt;
      })
      .slice(0, MAX_COUNTRY_RECORDS),
  ) as Record<string, DocumentReviewProgress>;
}

function normalizeCourseProgress(value: unknown) {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => isRecord(item))
      .map(([courseId, item]) => {
        const progress = item as Record<string, unknown>;
        return [
          courseId.slice(0, 80),
          {
            completedAt: safeDate(progress.completedAt) || undefined,
            completedLessonIds: safeStringArray(progress.completedLessonIds, 40),
            courseVersion: safeString(progress.courseVersion, 24),
            startedAt: safeDate(progress.startedAt),
            totalLessons: Math.min(
              Math.max(Number(progress.totalLessons) || 0, 0),
              40,
            ),
            updatedAt: safeDate(progress.updatedAt),
          },
        ];
      })
      .filter(([, item]) => {
        const progress = item as CourseProgress;
        return progress.startedAt && progress.totalLessons > 0;
      })
      .slice(0, MAX_COURSES),
  ) as Record<string, CourseProgress>;
}

function normalizeCostEstimates(value: unknown) {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => isRecord(item))
      .map(([countrySlug, item]) => {
        const estimate = item as Record<string, unknown>;
        return [
          countrySlug.slice(0, 80),
          {
            amount: Math.max(Number(estimate.amount) || 0, 0),
            currency: safeString(estimate.currency, 8).toUpperCase(),
            updatedAt: safeDate(estimate.updatedAt),
          },
        ];
      })
      .filter(([, item]) => {
        const estimate = item as CostEstimate;
        return estimate.amount > 0 && estimate.currency && estimate.updatedAt;
      })
      .slice(0, MAX_COUNTRY_RECORDS),
  ) as Record<string, CostEstimate>;
}

export function normalizeActivationProgress(
  value: unknown,
): TgpiActivationProgress {
  if (!isRecord(value)) return createEmptyActivationProgress();

  return {
    activities: normalizeActivities(value.activities),
    comparisons: normalizeComparisons(value.comparisons),
    costEstimates: normalizeCostEstimates(value.costEstimates),
    courseProgress: normalizeCourseProgress(value.courseProgress),
    documentReviews: normalizeDocumentReviews(value.documentReviews),
    savedCountries: safeStringArray(
      value.savedCountries,
      MAX_SAVED_COUNTRIES,
    ),
    updatedAt: safeDate(value.updatedAt) || undefined,
    version: 1,
  };
}

export function createProgressItemId(title: string, index: number) {
  const normalized = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return `item-${index + 1}-${normalized || "step"}`;
}

export function getDocumentReviewStatus(
  progress?: DocumentReviewProgress,
): ActivationStatus {
  if (!progress || progress.completedItemIds.length === 0) return "not_started";
  if (progress.completedItemIds.length >= progress.totalItems) return "completed";
  return "in_progress";
}

export function getCourseProgressStatus(
  progress?: CourseProgress,
): ActivationStatus {
  if (!progress) return "not_started";
  if (
    progress.courseVersion &&
    progress.completedAt &&
    progress.totalLessons > 0 &&
    progress.completedLessonIds.length >= progress.totalLessons
  ) {
    return "completed";
  }
  return "in_progress";
}

export function getActivationCompletion(progress: TgpiActivationProgress) {
  const categories = [
    progress.comparisons.length > 0,
    Object.values(progress.documentReviews).some(
      (review) => getDocumentReviewStatus(review) === "completed",
    ),
    Object.values(progress.courseProgress).some(
      (course) => getCourseProgressStatus(course) === "completed",
    ),
    Object.keys(progress.costEstimates).length > 0,
  ];

  return Math.round(
    (categories.filter(Boolean).length / categories.length) * 100,
  );
}

export function addActivationActivity(
  progress: TgpiActivationProgress,
  activity: Omit<ActivationActivity, "id" | "occurredAt">,
  now: string,
) {
  const id = `${activity.type}:${now}`;
  return [
    { ...activity, id, occurredAt: now },
    ...progress.activities.filter(
      (item) => !(item.type === activity.type && item.href === activity.href),
    ),
  ].slice(0, MAX_ACTIVITIES);
}

export const activationLimits = {
  activities: MAX_ACTIVITIES,
  comparisons: MAX_COMPARISONS,
  countryRecords: MAX_COUNTRY_RECORDS,
  courses: MAX_COURSES,
  savedCountries: MAX_SAVED_COUNTRIES,
} as const;
