import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonExperience from "@/components/courses/LessonExperience";
import {
  courses,
  getCourse,
  getCourseLesson,
  getCourseLessonPosition,
  getCourseLessons,
} from "@/data/courses";

type LessonPageProps = {
  params: Promise<{ id: string; lessonId: string }>;
};

export function generateStaticParams() {
  return courses.flatMap((course) =>
    getCourseLessons(course).map((lesson) => ({
      id: course.id,
      lessonId: lesson.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { id, lessonId } = await params;
  const course = getCourse(id);
  const lesson = course ? getCourseLesson(course, lessonId) : undefined;

  if (!course || !lesson) return { title: "Lesson not found | TGPI" };

  return {
    description: lesson.summary,
    title: `${lesson.title} | ${course.title}`,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id, lessonId } = await params;
  const course = getCourse(id);
  const lesson = course ? getCourseLesson(course, lessonId) : undefined;

  if (!course || !lesson) notFound();

  const lessons = getCourseLessons(course);
  const lessonIndex = getCourseLessonPosition(course, lesson.id);
  const courseModule = course.modules.find((item) =>
    item.lessons.some((moduleLesson) => moduleLesson.id === lesson.id),
  );

  if (!courseModule || lessonIndex < 0) notFound();

  return (
    <LessonExperience
      course={course}
      courseModule={courseModule}
      lesson={lesson}
      lessonIndex={lessonIndex}
      nextLesson={lessons[lessonIndex + 1]}
      previousLesson={lessons[lessonIndex - 1]}
    />
  );
}
