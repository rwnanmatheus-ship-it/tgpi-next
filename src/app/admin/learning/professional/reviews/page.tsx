import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guards";
import { listProfessionalReviews } from "@/lib/learning/professional-records.server";
import { professionalCourseDrafts } from "@/data/courses/professional";
import ProfessionalReviewPanel from "@/components/courses/ProfessionalReviewPanel";
const sourceMetadata = { title: "Avaliação de projetos profissionais | TGPI", robots: { index: false, follow: false } };
export default async function ProfessionalReviewsPage() {
  const admin = await requireAdmin();
  let records: Awaited<ReturnType<typeof listProfessionalReviews>> = [], unavailable = false;
  try { records = await listProfessionalReviews(admin.userId); } catch { unavailable = true; }
  return <main className="mx-auto max-w-5xl px-4 py-8 text-slate-950"><Link className="underline" href="/admin/learning/professional"><LocalizedText text={"← Revisão dos cursos"} /></Link><h1 className="mt-6 text-3xl font-semibold"><LocalizedText text={"Projetos e contestações"} /></h1>{unavailable ? <p role="alert" className="mt-5 rounded-xl border p-5"><LocalizedText text={"Não foi possível consultar a fila segura. Recarregue para tentar novamente; nenhum projeto foi avaliado."} /></p> : <ProfessionalReviewPanel initialRecords={records} courses={professionalCourseDrafts} />}</main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
