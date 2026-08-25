import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseOverviewExperience from "@/components/courses/CourseOverviewExperience";
import { courses, getCourse } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ id: course.id }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourse(id);

  if (!course) return { title: "Course not found | TGPI" };

  return {
    description: course.description,
    title: `${course.title} | TGPI Learning`,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourse(id);

  if (!course) notFound();

  return <CourseOverviewExperience course={course} />;
}
