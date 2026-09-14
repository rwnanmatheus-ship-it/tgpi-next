import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CertificationExperience from "@/components/courses/CertificationExperience";
import {
  getEnglishAbroadAssessmentBank,
  toPublicLearningAssessment,
} from "@/data/courses/english-abroad/assessment-bank.server";
import { getCourse } from "@/data/courses";

export const metadata: Metadata = {
  title: "Certification path | TGPI Learning",
  robots: { follow: false, index: false },
};

export default async function CertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course || id !== "english-abroad") notFound();
  const assessments = getEnglishAbroadAssessmentBank().map(
    toPublicLearningAssessment,
  );
  return <CertificationExperience assessments={assessments} course={course} />;
}
