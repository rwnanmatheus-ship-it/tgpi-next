import { professionalCourseDrafts } from "../../data/courses/professional";

/** Explicit release boundary. Empty until live learner/reviewer acceptance passes. */
export const publishedProfessionalCourseIds: readonly string[] = [];

export function getProfessionalCourse(id: string) {
  return professionalCourseDrafts.find(course => course.id === id);
}

export function professionalCourseEnabled(id: string, environment: string | undefined) {
  return Boolean(getProfessionalCourse(id)) && (environment === "preview" || environment === "development" || publishedProfessionalCourseIds.includes(id));
}
