import { academyManifest } from "../../data/courses/academy/manifest";
import { courseArtwork } from "../cinematic-art";
import { professionalCourseDrafts } from "../../data/courses/professional";
import { professionalArtwork } from "../../data/courses/professional/artwork";
import { professionalCourseEnabled } from "./professional-runtime";
import type { CourseOverview, CourseGoal } from "../../types/course-overview";

export function professionalCatalog(environment: string | undefined): CourseOverview[] {
  return professionalCourseDrafts.filter(course => professionalCourseEnabled(course.id, environment)).map(course => {
    const goal: CourseGoal = course.id === "ingles-carreira-internacional" ? "global-mobility" : course.id === "planilhas-decisoes-profissionais" ? "global-economics" : course.id === "comunicacao-negociacao-pensamento-critico" ? "decision-intelligence" : "future-of-work";
    return { id: course.id, title: course.title, desc: course.outcomes.join(" "), audience: course.prerequisites.join(" "), benefits: course.outcomes,
      category: goal === "global-mobility" ? "Language & Mobility" : goal === "global-economics" ? "Economics & Opportunity" : goal === "decision-intelligence" ? "Decision Intelligence" : "Technology & Adaptability",
      duration: `${Math.floor(academyManifest[course.id].minutes / 60)}h ${academyManifest[course.id].minutes % 60}m`, format: `${academyManifest[course.id].lessons} lessons and laboratories`, goal,
      goalLabel: "Practical professional skills", href: `/courses/${course.id}`, image: courseArtwork(course.id), imageAlt: professionalArtwork[course.id].alt,
      level: "Fundamentos aplicados", status: "available", releaseLabel: "Expanded edition · Automatic assessment",
      learningPolicy: { kind: 'professional', publicationStatus: 'published', accessPolicy: 'free_account', assessmentPolicy: 'automatic_assessment', credentialStatus: 'criteria_available', instructionLanguage: 'pt-BR' } };
  });
}
