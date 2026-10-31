import { professionalCourseDrafts } from "../../data/courses/professional";
import { professionalArtwork } from "../../data/courses/professional/artwork";
import { professionalCourseEnabled } from "./professional-runtime";
import { estimateProfessionalMinutes } from "./professional-policy";
import type { CourseOverview, CourseGoal } from "../../types/course-overview";

export function professionalCatalog(environment: string | undefined): CourseOverview[] {
  return professionalCourseDrafts.filter(course => professionalCourseEnabled(course.id, environment)).map(course => {
    const goal: CourseGoal = course.id === "ingles-carreira-internacional" ? "global-mobility" : course.id === "planilhas-decisoes-profissionais" ? "global-economics" : course.id === "comunicacao-negociacao-pensamento-critico" ? "decision-intelligence" : "future-of-work";
    return { id: course.id, title: course.title, desc: "Acesso antecipado. " + course.outcomes.join(" "), audience: course.prerequisites.join(" "), benefits: course.outcomes,
      category: goal === "global-mobility" ? "Language & Mobility" : goal === "global-economics" ? "Economics & Opportunity" : goal === "decision-intelligence" ? "Decision Intelligence" : "Technology & Adaptability",
      duration: `${estimateProfessionalMinutes(course) / 60}h estimadas`, format: "8 módulos, práticas e projeto", goal,
      goalLabel: "Practical professional skills", href: `/courses/${course.id}`, image: `/images/courses/professional/${professionalArtwork[course.id].key}.webp`, imageAlt: professionalArtwork[course.id].alt,
      level: "Fundamentos aplicados", status: "available", releaseLabel: "Acesso antecipado · português" };
  });
}
