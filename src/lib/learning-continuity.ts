import type { CourseProgress } from "./activation-progress.ts";
import type { Course } from "../types/course.ts";

/** Resolve only actual catalogue entries; old records never create dead links. */
export function getLearningContinuation(
  catalogue: readonly Course[],
  records: Readonly<Record<string, CourseProgress>>,
) {
  const candidates = Object.entries(records).flatMap(([id, progress]) => {
    const course = catalogue.find(item => item.id === (id === "english-abroad" ? "global-english-2026" : id));
    if (!course) return [];
    const lessons = course.modules.flatMap(module => module.lessons);
    if (!lessons.length) return [];
    const sameVersion = progress.courseVersion === course.version;
    const completed = new Set(sameVersion ? progress.completedLessonIds : []);
    const remaining = lessons.filter(lesson => !completed.has(lesson.id));
    const next = remaining.find(lesson => lesson.id === progress.lastLessonId) ?? remaining[0];
    return [{
      courseId: course.id,
      complete: sameVersion && remaining.length === 0,
      href: sameVersion && next
        ? `/courses/${course.id}/lessons/${next.id}`
        : `/courses/${course.id}`,
      updatedAt: progress.updatedAt,
    }];
  });
  candidates.sort((a, b) => Number(a.complete) - Number(b.complete) || b.updatedAt.localeCompare(a.updatedAt));
  return candidates[0];
}
