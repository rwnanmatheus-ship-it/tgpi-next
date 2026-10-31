import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CourseWorkshop from "@/components/courses/CourseWorkshop";
import CourseOverviewExperience from "@/components/courses/CourseOverviewExperience";
import { courses, getCourse } from "@/data/courses";
import ProfessionalOverview from "@/components/courses/ProfessionalOverview";
import { getProfessionalCourse, professionalCourseEnabled } from "@/lib/learning/professional-runtime";

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
  const professional = getProfessionalCourse(id);
  if (professional && professionalCourseEnabled(id, process.env.VERCEL_ENV || process.env.NODE_ENV)) return { title: `${professional.title} | TGPI Learning`, description: professional.outcomes.join(" ") };
  const course = getCourse(id);

  if (!course) return { title: "Course not found | TGPI" };

  return {
    description: course.description,
    title: `${course.title} | TGPI Learning`,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const professional = getProfessionalCourse(id);
  if (professional && professionalCourseEnabled(id, process.env.VERCEL_ENV || process.env.NODE_ENV)) return <ProfessionalOverview course={professional} />;
  const course = getCourse(id);

  if (!course) notFound();

  if (id !== course.id) redirect(`/courses/${course.id}`);

  return <CourseOverviewExperience course={course} workshop={<CourseWorkshop course={course} />} />;
}
