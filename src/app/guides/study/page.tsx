import { redirect } from "next/navigation";
import { studyPath, studyReaderLocale } from "@/data/study-guides";
import { getLocale } from "@/lib/localization/server";

export default async function StudyGuidesEntry() {
  redirect(studyPath(studyReaderLocale(await getLocale())));
}
