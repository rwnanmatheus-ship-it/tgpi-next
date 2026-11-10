import { professionalWorkedLabs } from "@/data/courses/professional/worked-labs";
import { requireApiUser } from "@/lib/auth/guards";
import { getProfessionalRecord } from "@/lib/learning/professional-records.server";
import { getProfessionalCourse } from "@/lib/learning/professional-runtime";
import { professionalError, professionalPrivateHeaders } from "@/lib/learning/professional-http.server";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import { localizeAuthoredContent } from "@/lib/localization/authored-content";
export async function GET(_request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const identity = await requireApiUser(), { courseId } = await context.params;
    await getProfessionalRecord(identity.uid, courseId);
    const locale = await getLocale();
    const t = (text: string) => translate(locale, text);
    const course = localizeAuthoredContent(getProfessionalCourse(courseId)!, locale, { languagePractice: courseId === "ingles-carreira-internacional" });
    const heading = (text: string, level = 2) => `${"#".repeat(level)} ${t(text)}`;
    const parts = [`# ${course.title}`, `TGPI · ${t("Version")} ${course.version} · ${locale}`, heading("Outcomes"), ...course.outcomes.map(item => `- ${item}`), heading("Initial diagnostic"), course.diagnostic];
    for (const courseModule of course.modules) for (const lesson of courseModule.lessons) parts.push(`## ${lesson.title}`, `${t("Objective")}: ${lesson.objective}`, lesson.explanation, heading("Worked example", 3), lesson.workedExample, heading("Guided practice", 3), lesson.guidedPractice, heading("Independent practice", 3), lesson.independentPractice, heading("Success criteria", 3), ...lesson.successCriteria.map(item => `- ${item}`), heading("Common mistakes", 3), ...lesson.commonErrors.map(item => `- ${item}`), `${t("Recovery")}: ${lesson.recovery}`, heading("Your work", 3), `${t("Result")}:`, `${t("Reasoning")}:`, `${t("Identified limitation")}:`);
    parts.push(heading("Worked labs"), t("Fictional practice cases; these do not represent current data or student outcomes."), ...(professionalWorkedLabs[courseId] || []).map((text, index) => `### ${t("Module")} ${index + 1}\n\n${t(text)}`));
    parts.push(heading("Final project"), course.project.brief, ...course.project.deliverables.map(item => `- ${item}`), `${t("Transfer")}: ${course.project.transfer}`, heading("Rubric"), ...course.project.rubric.map(item => `- ${item.title}: ${item.description} ${t("Weight")} ${item.weight}%. ${item.essential ? `${t("Essential minimum")}: ${item.minimum}%.` : ""}`), heading("Next steps"), course.continuation, t("Keep your material secure. Do not include credentials or confidential data in exercises."));
    return new Response(parts.join("\n\n") + "\n", { headers: { ...professionalPrivateHeaders, "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": `attachment; filename="${courseId}-${locale}.md"`, "Content-Language": locale } });
  } catch (error) { return professionalError(error); }
}
