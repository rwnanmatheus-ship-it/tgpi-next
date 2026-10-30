import Link from "next/link";
import { listFirestoreDocuments, isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import type { ProfessionalRecord } from "@/lib/learning/professional-model";
import { getProfessionalCourse, professionalCourseEnabled } from "@/lib/learning/professional-runtime";

export default async function ProfessionalResume({ uid }: { uid: string }) {
  if (!isLearningStorageConfigured() || !professionalCourseEnabled("ia-trabalho-global", process.env.VERCEL_ENV || process.env.NODE_ENV)) return null;
  let records: ProfessionalRecord[];
  try { records = (await listFirestoreDocuments<ProfessionalRecord>(`tgpiLearningUsers/${uid}`, "professionalCourses", 50)).map(item => item.data).filter(record => record.uid === uid).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)); }
  catch { return <aside className="mx-auto my-4 max-w-6xl rounded-xl border p-4 text-sm"><Link href="/courses">Não foi possível consultar seus percursos profissionais. Abra Cursos para tentar novamente.</Link></aside>; }
  const record = records.find(item => getProfessionalCourse(item.courseId)?.version === item.version);
  const course = record ? getProfessionalCourse(record.courseId) : null;
  if (!record || !course) return null;
  return <aside lang="pt-BR" className="mx-auto my-5 max-w-6xl rounded-2xl border border-blue-200 bg-blue-50 p-5"><p className="text-xs font-semibold uppercase tracking-widest text-blue-700">Seu percurso profissional</p><div className="mt-2 flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-semibold">{course.title}</h2><p className="mt-2 text-sm">{Object.keys(record.activities).length}/{course.modules.length} práticas registradas · {record.state === "approved" ? "projeto aprovado" : record.state === "submitted" || record.state === "appealed" ? "aguardando devolutiva" : "próxima atividade disponível"}</p></div><Link href={`/courses/${course.id}/study`} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">Retomar curso →</Link></div></aside>;
}
