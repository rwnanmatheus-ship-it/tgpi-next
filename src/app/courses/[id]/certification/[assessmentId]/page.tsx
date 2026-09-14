import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssessmentExperience from "@/components/courses/AssessmentExperience";
import {
  getEnglishAbroadAssessment,
  toPublicLearningAssessment,
} from "@/data/courses/english-abroad/assessment-bank.server";
import { getCourse } from "@/data/courses";
import { requireUser } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Protected assessment | TGPI Learning",
  robots: { follow: false, index: false },
};

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ assessmentId: string; id: string }>;
}) {
  await requireUser();
  const { assessmentId, id } = await params;
  const course = getCourse(id);
  const assessment = getEnglishAbroadAssessment(assessmentId);
  if (!course || id !== "english-abroad" || !assessment) notFound();
  return (
    <AssessmentExperience
      assessment={toPublicLearningAssessment(assessment)}
      courseId={course.id}
    />
  );
}
