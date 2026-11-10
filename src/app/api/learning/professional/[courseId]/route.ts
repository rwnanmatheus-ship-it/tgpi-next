import { requireApiUser } from "@/lib/auth/guards";
import { assessmentTranslations } from "@/lib/localization/assessment.server";
import { getProfessionalRecord, mutateProfessionalRecord } from "@/lib/learning/professional-records.server";
import { publicProfessionalQuestions } from "@/data/courses/professional/assessment-bank.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";

export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const identity = await requireApiUser(), { courseId } = await context.params;
    const record = await getProfessionalRecord(identity.uid, courseId);
    const questions = publicProfessionalQuestions(courseId).map(question => ({
      ...question, promptTranslations: assessmentTranslations(question.prompt),
      options: question.options.map(option => ({ ...option, labelTranslations: courseId === 'ingles-carreira-internacional' ? undefined : assessmentTranslations(option.label) })),
    }));
    return professionalJson({ record, questions, publicName: identity.publicName });
  } catch (error) { return professionalError(error); }
}
export async function POST(request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const identity = await requireApiUser(); assertProfessionalOrigin(request);
    const { courseId } = await context.params;
    const input: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(await readProfessionalBody(request)));
    const action = typeof input === "object" && input !== null && "action" in input ? input.action : undefined;
    if (!["issue", "sharing"].includes(String(action))) return professionalJson({ error: "This edition is archived. Continue in the expanded course with automatic assessments.", href: `/courses/${courseId}/study` }, 409);
    const result = await mutateProfessionalRecord(identity, courseId, input);
    return professionalJson({ ...result, ...('feedback' in result && result.feedback ? { feedback: result.feedback.map(item => ({ ...item, explanationTranslations: assessmentTranslations(item.explanation) })) } : {}) });
  } catch (error) { return professionalError(error); }
}
