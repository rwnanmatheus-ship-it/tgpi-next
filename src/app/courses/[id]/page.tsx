import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseOverviewExperience from "@/components/courses/CourseOverviewExperience";
import { courses, getCourse } from "@/data/courses";
import { buildMetadata, privateRobots } from "@/seo";
import JsonLd from "@/seo/json-ld";
import { buildCourseSchema } from "@/seo/schemas/course";

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

  if (!course) return { title: "Course not found", robots: privateRobots };

  return buildMetadata({
    description: course.description,
    title: course.title,
    path: `/courses/${course.id}`,
    image: {
      url: "/images/courses/global-english-abroad.webp",
      alt: `${course.title} by TGPI`,
    },
  });
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourse(id);

  if (!course) notFound();

  return (
    <>
      <JsonLd data={buildCourseSchema(course)} />
      <CourseOverviewExperience course={course} />
    </>
  );
}
