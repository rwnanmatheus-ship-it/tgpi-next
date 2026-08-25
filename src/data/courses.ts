import { englishAbroadCourse } from "@/data/courses/english-abroad";
import type { Course, CourseLesson } from "@/types/course";

export type { Course, CourseLesson, CourseModule } from "@/types/course";

export const courses: Course[] = [englishAbroadCourse];

export function getCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function getCourseLessonCount(course: Course) {
  return course.modules.reduce(
    (total, courseModule) => total + courseModule.lessons.length,
    0,
  );
}

export function getCourseLessons(course: Course): CourseLesson[] {
  return course.modules.flatMap((courseModule) => courseModule.lessons);
}

export function getCourseLesson(course: Course, lessonId: string) {
  return getCourseLessons(course).find((lesson) => lesson.id === lessonId);
}

export function getCourseLessonPosition(course: Course, lessonId: string) {
  return getCourseLessons(course).findIndex((lesson) => lesson.id === lessonId);
}
