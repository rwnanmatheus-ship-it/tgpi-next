import { localizeMetadata } from "@/lib/localization/metadata.server";
import { notFound } from "next/navigation";
import AcademyStudy from "@/components/courses/academy/AcademyStudy";
import { getAcademyCourse } from "@/data/courses/academy/catalog.server";
import { requireUser } from "@/lib/auth/guards";

const sourceMetadata = { title: "Meu percurso profissional | TGPI", robots: { index: false, follow: false } };
export default async function ProfessionalStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireUser(`/courses/${id}/study`);
  const course = getAcademyCourse(id);
  if (!course) notFound();
  return <AcademyStudy course={course} />;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
