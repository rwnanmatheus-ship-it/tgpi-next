import { notFound } from "next/navigation";
import ProfessionalStudy from "@/components/courses/ProfessionalStudy";
import { requireUser } from "@/lib/auth/guards";
import { getProfessionalCourse, professionalCourseEnabled } from "@/lib/learning/professional-runtime";
export const metadata = { title: "Meu percurso profissional | TGPI", robots: { index: false, follow: false } };
export default async function ProfessionalStudyPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params, course = getProfessionalCourse(id);
  if (!course || !professionalCourseEnabled(id, process.env.VERCEL_ENV || process.env.NODE_ENV)) notFound();
  return <ProfessionalStudy course={course} />;
}
