import { withSocialMetadata } from '@/lib/localization/social-metadata';
import { getLocale } from '@/lib/localization/server';
import { localizeAcademyCourse } from '@/lib/localization/academy-content';
import AcademyOverview from "@/components/courses/academy/AcademyOverview";
import { academyCourses, getAcademyCourse } from "@/data/courses/academy/catalog.server";
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
  return [...new Set([...courses, ...academyCourses].map(course => course.id))].map(id => ({ id }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const academy = getAcademyCourse(id);
  if (academy) {
    const locale = await getLocale();
    const localized = localizeAcademyCourse(academy, locale);
    const title = `${localized.title} | TGPI Learning`;
    const description = localized.description;
    const url = `/courses/${academy.id}`;
    const images = [{ url: academy.image, alt: localized.title }];
    return withSocialMetadata({
      title, description, alternates: { canonical: url },
      openGraph: { title, description, url, images },
      twitter: { card: 'summary_large_image', title, description, images },
    }, locale);
  }
  const professional = getProfessionalCourse(id);
  if (professional && professionalCourseEnabled(id, process.env.VERCEL_ENV || process.env.NODE_ENV)) return withSocialMetadata({
    title: `${professional.title} | TGPI Learning`, description: professional.outcomes.join(" "),
    alternates: { canonical: `/courses/${professional.id}` },
  }, await getLocale());
  const course = getCourse(id);

  if (!course) return { title: "Course not found | TGPI" };

  return withSocialMetadata({
    description: course.description,
    title: `${course.title} | TGPI Learning`,
    alternates: { canonical: `/courses/${course.id}` },
  }, await getLocale());
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const academy = getAcademyCourse(id);
  if (academy) { if (id !== academy.id) redirect(`/courses/${academy.id}`); return <AcademyOverview course={academy} />; }
  const professional = getProfessionalCourse(id);
  if (professional && professionalCourseEnabled(id, process.env.VERCEL_ENV || process.env.NODE_ENV)) return <ProfessionalOverview course={professional} />;
  const course = getCourse(id);

  if (!course) notFound();

  if (id !== course.id) redirect(`/courses/${course.id}`);

  return <CourseOverviewExperience course={course} workshop={<CourseWorkshop course={course} />} />;
}

