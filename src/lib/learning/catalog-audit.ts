import type { Course } from "@/types/course";
import type { LearningWorkshop } from "@/data/courses/learning-workshops";

/** Structural checks are necessary, never evidence of educational effectiveness. */
export function auditCourseStructure(course: Course, workshop?: LearningWorkshop) {
  const problems: string[] = [];
  const skills = new Set(course.competencies.map(item => item.id));
  const seen = new Set<string>();
  if (!course.id || !course.version || !course.audience || !course.outcomes.length) problems.push("Course identity, audience or outcomes missing");
  if (!course.modules.length || !skills.size) problems.push("Modules or competencies missing");
  for (const courseModule of course.modules) {
    if (!courseModule.lessons.length || !courseModule.competencyIds.length || courseModule.competencyIds.some(id => !skills.has(id))) problems.push(`Module mapping incomplete: ${courseModule.id}`);
    for (const lesson of courseModule.lessons) {
      if (seen.has(lesson.id)) problems.push(`Duplicate lesson ID: ${lesson.id}`);
      seen.add(lesson.id);
      if (!lesson.objective.trim() || !lesson.summary.trim() || !lesson.scenario.trim() || !lesson.practiceTask.prompt.trim() || !lesson.checkpoint.explanation.trim() || !lesson.dialogue.length || !lesson.coachNotes.length) problems.push(`Lesson content incomplete: ${lesson.id}`);
      const options = lesson.checkpoint.options.map(item => item.id);
      if (options.length < 2 || new Set(options).size !== options.length || !options.includes(lesson.checkpoint.correctOptionId)) problems.push(`Invalid checkpoint: ${lesson.id}`);
      if (!Number.isFinite(lesson.durationMinutes) || lesson.durationMinutes <= 0) problems.push(`Invalid duration: ${lesson.id}`);
    }
  }
  for (const skill of skills) if (!course.modules.some(courseModule => courseModule.competencyIds.includes(skill))) problems.push(`Unmapped competency: ${skill}`);
  if (!course.completionRequirements.length || !course.assessment.rubric.length) problems.push("Completion criteria missing");
  if (!workshop || Object.values(workshop).some(value => typeof value === "string" && !value.trim()) || workshop.criteria.length !== 4) problems.push("Applied workshop incomplete");
  return { courseId: course.id, title: course.title, version: course.version, lessons: seen.size, competencies: skills.size, kind: seen.size <= 3 ? "Microcourse" : "Course", problems, structurallyValid: problems.length === 0,
    credentialStatus: course.credential.status,
    releaseBlockers: [
      "Independent subject/content review not recorded",
      "Equivalent retake variants and essential competency minima need validation",
      "Practical artifact evaluation and appeals operation need validation",
      "Controlled authenticated certification flow must be verified in Preview",
      ...(course.id === "global-english-2026" ? [] : ["Practical certification uses an authorized reviewer; live operational validation pending"]),
    ],
  };
}
