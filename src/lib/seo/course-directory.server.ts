import "server-only";
import { coursesOverview } from "@/data/courses-overview";
import { professionalCatalog } from "@/lib/learning/professional-catalog";
import { selectPublishedCourses } from "./course-directory";
// Public discovery always follows production policy, including on preview deployments.
export const publishedDirectory = selectPublishedCourses([...professionalCatalog("production"), ...coursesOverview]);
