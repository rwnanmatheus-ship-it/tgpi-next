import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CertificationExperience from "@/components/courses/CertificationExperience";
import {
  getEnglishAbroadAssessmentBank,
  toPublicLearningAssessment,
} from "@/data/courses/english-abroad/assessment-bank.server";
import { getCourse } from "@/data/courses";
import { requireUser } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Certification path | TGPI Learning",
  robots: { follow: false, index: false },
};

export default async function CertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();
  if (course.id !== "global-english-2026") redirect(`/courses/${course.id}/project`);
  if (id !== course.id) redirect(`/courses/${course.id}/certification`);

  const assessments = getEnglishAbroadAssessmentBank().map(
    toPublicLearningAssessment,
  );
  return <CertificationExperience assessments={assessments} course={course} />;
}
