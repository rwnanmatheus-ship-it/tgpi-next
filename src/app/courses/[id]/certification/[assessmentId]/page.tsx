import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import { getLocale } from '@/lib/localization/server';
import { assessmentTranslations } from '@/lib/localization/assessment.server';
import { notFound, redirect } from "next/navigation";
import AssessmentExperience from "@/components/courses/AssessmentExperience";
import {
  getEnglishAbroadAssessment,
  toPublicLearningAssessment,
} from "@/data/courses/english-abroad/assessment-bank.server";
import { getCourse } from "@/data/courses";
import { requireUser } from "@/lib/auth/guards";

const sourceMetadata: Metadata = {
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
  if (!course || course.id !== "global-english-2026" || !assessment) notFound();
  if (id !== course.id) redirect(`/courses/${course.id}/certification/${assessmentId}`);
  const locale = await getLocale();
  const publicAssessment = toPublicLearningAssessment(assessment);
  const translatedAssessment = { ...publicAssessment, title: assessmentTranslations(publicAssessment.title)[locale], description: assessmentTranslations(publicAssessment.description)[locale], reflectionPrompt: publicAssessment.reflectionPrompt ? assessmentTranslations(publicAssessment.reflectionPrompt)[locale] : undefined, questions: publicAssessment.questions.map(question => ({ ...question, prompt: assessmentTranslations(question.prompt)[locale] })) };

  return (
    <AssessmentExperience
      assessment={translatedAssessment}
      courseId={course.id}
    />
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
