import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import {
  activationLimits,
  addActivationActivity,
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
  type ActivationMutation,
  type TgpiActivationProgress,
} from "@/lib/activation-progress";
import { getCountry } from "@/lib/countries";
import { courses } from "@/data/courses";
import { isComparisonGoal } from "@/lib/tgpi-comparison";

const SAFE_ID = /^[a-z0-9][a-z0-9-]{0,79}$/;
const SAFE_ITEM_ID = /^[a-z0-9][a-z0-9-]{0,79}$/;
const MAX_ACTIVATION_METADATA_BYTES = 6_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireSafeId(value: unknown, label: string) {
  if (typeof value !== "string" || !SAFE_ID.test(value)) {
    throw new ActivationInputError(`${label} is not valid.`);
  }
  return value;
}

function requireCountrySlug(value: unknown) {
  const slug = requireSafeId(value, "Country");
  const country = getCountry(slug);
  if (!country) throw new ActivationInputError("Country was not found.");
  return country;
}

function requireCourse(value: unknown) {
  const courseId = requireSafeId(value, "Course");
  const course = courses.find((item) => item.id === courseId);
  if (!course) throw new ActivationInputError("Course was not found.");
  return course;
}

function getCourseLessonIds(course: (typeof courses)[number]) {
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => lesson.id),
  );
}

export class ActivationInputError extends Error {
  readonly status = 400;

  constructor(message: string) {
    super(message);
    this.name = "ActivationInputError";
  }
}

export function parseActivationMutation(value: unknown): ActivationMutation {
  if (!isRecord(value) || typeof value.type !== "string") {
    throw new ActivationInputError("Progress update is not valid.");
  }

  if (value.type === "save_country") {
    const country = requireCountrySlug(value.countrySlug);
    if (typeof value.saved !== "boolean") {
      throw new ActivationInputError("Saved-country state is not valid.");
    }
    return { countrySlug: country.slug, saved: value.saved, type: value.type };
  }

  if (value.type === "record_comparison") {
    if (!Array.isArray(value.countrySlugs)) {
      throw new ActivationInputError("Choose at least two countries.");
    }
    const countrySlugs = Array.from(
      new Set(value.countrySlugs.map((slug) => requireCountrySlug(slug).slug)),
    );
    if (countrySlugs.length < 2 || countrySlugs.length > 3) {
      throw new ActivationInputError("Compare two or three different countries.");
    }
    if (typeof value.goal !== "string" || !isComparisonGoal(value.goal)) {
      throw new ActivationInputError("Comparison goal is not valid.");
    }
    return { countrySlugs, goal: value.goal, type: value.type };
  }

  if (value.type === "update_documents") {
    const country = requireCountrySlug(value.countrySlug);
    if (
      typeof value.itemId !== "string" ||
      !SAFE_ITEM_ID.test(value.itemId) ||
      typeof value.complete !== "boolean"
    ) {
      throw new ActivationInputError("Document checklist update is not valid.");
    }
    const totalItems = Number(value.totalItems);
    if (!Number.isInteger(totalItems) || totalItems < 1 || totalItems > 12) {
      throw new ActivationInputError("Document checklist size is not valid.");
    }
    return {
      complete: value.complete,
      countrySlug: country.slug,
      itemId: value.itemId,
      totalItems,
      type: value.type,
    };
  }

  if (value.type === "start_course") {
    const course = requireCourse(value.courseId);
    return { courseId: course.id, type: value.type };
  }

  if (value.type === "complete_lesson") {
    const course = requireCourse(value.courseId);
    const lessonId = requireSafeId(value.lessonId, "Lesson");
    const lesson = course.modules
      .flatMap((courseModule) => courseModule.lessons)
      .find((courseLesson) => courseLesson.id === lessonId);
    if (!lesson) {
      throw new ActivationInputError("Lesson was not found in this course.");
    }
    const checkpointOptionId = requireSafeId(
      value.checkpointOptionId,
      "Checkpoint answer",
    );
    if (checkpointOptionId !== lesson.checkpoint.correctOptionId) {
      throw new ActivationInputError(
        "Pass the lesson checkpoint before completing it.",
      );
    }
    return {
      checkpointOptionId,
      courseId: course.id,
      lessonId,
      type: value.type,
    };
  }

  if (value.type === "save_cost_estimate") {
    const country = requireCountrySlug(value.countrySlug);
    const amount = Number(value.amount);
    if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000) {
      throw new ActivationInputError("Monthly estimate is not valid.");
    }
    if (
      typeof value.currency !== "string" ||
      value.currency.toUpperCase() !== country.currencyCode
    ) {
      throw new ActivationInputError("Estimate currency is not valid.");
    }
    return {
      amount: Math.round(amount),
      countrySlug: country.slug,
      currency: country.currencyCode,
      type: value.type,
    };
  }

  throw new ActivationInputError("Progress update type is not supported.");
}

function trimRecord<T extends { updatedAt: string }>(
  record: Record<string, T>,
  limit: number,
) {
  return Object.fromEntries(
    Object.entries(record)
      .sort(([, first], [, second]) =>
        first.updatedAt.localeCompare(second.updatedAt),
      )
      .slice(-limit),
  );
}

function ensureStorageLimit(progress: TgpiActivationProgress) {
  const size = Buffer.byteLength(JSON.stringify(progress), "utf8");

  if (size > MAX_ACTIVATION_METADATA_BYTES) {
    throw new ActivationInputError(
      "Your TGPI progress has reached the V1 storage limit. Remove an older saved item before continuing.",
    );
  }

  return progress;
}

function comparisonHref(countrySlugs: string[], goal: string) {
  const params = new URLSearchParams();
  countrySlugs.forEach((slug) => params.append("country", slug));
  if (goal !== "overall") params.set("goal", goal);
  return `/compare?${params.toString()}`;
}

export function applyActivationMutation(
  current: TgpiActivationProgress,
  mutation: ActivationMutation,
  now = new Date().toISOString(),
): TgpiActivationProgress {
  const next: TgpiActivationProgress = {
    ...current,
    activities: [...current.activities],
    comparisons: [...current.comparisons],
    costEstimates: { ...current.costEstimates },
    courseProgress: { ...current.courseProgress },
    documentReviews: { ...current.documentReviews },
    savedCountries: [...current.savedCountries],
    updatedAt: now,
    version: 1,
  };

  if (mutation.type === "save_country") {
    next.savedCountries = mutation.saved
      ? Array.from(new Set([mutation.countrySlug, ...next.savedCountries])).slice(
          0,
          activationLimits.savedCountries,
        )
      : next.savedCountries.filter((slug) => slug !== mutation.countrySlug);
    if (mutation.saved) {
      const country = getCountry(mutation.countrySlug);
      next.activities = addActivationActivity(
        next,
        {
          href: `/countries/${mutation.countrySlug}`,
          title: `${country?.name || mutation.countrySlug} saved to your shortlist`,
          type: "saved_country",
        },
        now,
      );
    }
  }

  if (mutation.type === "record_comparison") {
    const id = `${mutation.goal}:${[...mutation.countrySlugs].sort().join("+")}`;
    next.comparisons = [
      {
        countrySlugs: mutation.countrySlugs,
        goal: mutation.goal,
        id,
        updatedAt: now,
      },
      ...next.comparisons.filter((item) => item.id !== id),
    ].slice(0, activationLimits.comparisons);
    next.savedCountries = Array.from(
      new Set([...mutation.countrySlugs, ...next.savedCountries]),
    ).slice(0, activationLimits.savedCountries);
    const names = mutation.countrySlugs.map(
      (slug) => getCountry(slug)?.name || slug,
    );
    next.activities = addActivationActivity(
      next,
      {
        href: comparisonHref(mutation.countrySlugs, mutation.goal),
        title: `${names.join(" vs ")} comparison completed`,
        type: "comparison",
      },
      now,
    );
  }

  if (mutation.type === "update_documents") {
    const previous = next.documentReviews[mutation.countrySlug];
    const completedItemIds = mutation.complete
      ? Array.from(
          new Set([...(previous?.completedItemIds || []), mutation.itemId]),
        ).slice(0, mutation.totalItems)
      : (previous?.completedItemIds || []).filter(
          (itemId) => itemId !== mutation.itemId,
        );
    next.documentReviews[mutation.countrySlug] = {
      completedItemIds,
      totalItems: mutation.totalItems,
      updatedAt: now,
    };
    next.documentReviews = trimRecord(
      next.documentReviews,
      activationLimits.countryRecords,
    );
    const country = getCountry(mutation.countrySlug);
    const complete = completedItemIds.length >= mutation.totalItems;
    next.activities = addActivationActivity(
      next,
      {
        href: `/countries/${mutation.countrySlug}#documents-to-verify`,
        title: complete
          ? `${country?.name || mutation.countrySlug} document review completed`
          : `${country?.name || mutation.countrySlug} document review updated`,
        type: "documents",
      },
      now,
    );
  }

  if (mutation.type === "start_course" || mutation.type === "complete_lesson") {
    const course = requireCourse(mutation.courseId);
    const lessonIds = getCourseLessonIds(course);
    const previous = next.courseProgress[course.id];
    const isCurrentVersion = previous?.courseVersion === course.version;
    const retainedLessonIds = (previous?.completedLessonIds || []).filter(
      (lessonId) => lessonIds.includes(lessonId),
    );
    const completedLessonIds =
      mutation.type === "complete_lesson"
        ? Array.from(
            new Set([...retainedLessonIds, mutation.lessonId]),
          ).filter((lessonId) => lessonIds.includes(lessonId))
        : retainedLessonIds;
    const completed =
      lessonIds.length > 0 && completedLessonIds.length >= lessonIds.length;
    next.courseProgress[course.id] = {
      completedAt: completed
        ? isCurrentVersion
          ? previous?.completedAt || now
          : now
        : undefined,
      completedLessonIds,
      courseVersion: course.version,
      startedAt: previous?.startedAt || now,
      totalLessons: lessonIds.length,
      updatedAt: now,
    };
    next.courseProgress = trimRecord(
      next.courseProgress,
      activationLimits.courses,
    );
    next.activities = addActivationActivity(
      next,
      {
        href: `/courses/${course.id}`,
        title: completed
          ? `${course.title} completed`
          : mutation.type === "start_course"
            ? `${course.title} learning path started`
            : `${course.title} progress updated`,
        type: "course",
      },
      now,
    );
  }

  if (mutation.type === "save_cost_estimate") {
    next.costEstimates[mutation.countrySlug] = {
      amount: mutation.amount,
      currency: mutation.currency,
      updatedAt: now,
    };
    next.costEstimates = trimRecord(
      next.costEstimates,
      activationLimits.countryRecords,
    );
    const country = getCountry(mutation.countrySlug);
    next.activities = addActivationActivity(
      next,
      {
        href: `/countries/${mutation.countrySlug}#cost-of-living`,
        title: `${country?.name || mutation.countrySlug} monthly estimate saved`,
        type: "cost",
      },
      now,
    );
  }

  return ensureStorageLimit(normalizeActivationProgress(next));
}

export async function getUserActivationProgress(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return normalizeActivationProgress(
    user.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );
}

export async function updateUserActivationProgress(
  userId: string,
  mutation: ActivationMutation,
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const current = normalizeActivationProgress(
    user.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );
  const progress = applyActivationMutation(current, mutation);

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      [TGPI_ACTIVATION_METADATA_KEY]: progress,
    },
  });

  return progress;
}
