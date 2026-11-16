import { recordFunnelEvent, requestFunnelConsent } from "@/lib/funnel.server";
import { isPremiumAcademyCourse } from "@/data/courses/academy/premium-policy";
import { requireApiUser, requirePremiumApiUser } from "@/lib/auth/guards";
import { assessmentTranslations } from "@/lib/localization/assessment.server";
import { getProfessionalRecord, mutateProfessionalRecord } from "@/lib/learning/professional-records.server";
import { publicProfessionalQuestions } from "@/data/courses/professional/assessment-bank.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";

export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await context.params;
  try {
    const identity = await requireApiUser();
    const record = await getProfessionalRecord(identity.uid, courseId);
    const questions = (isPremiumAcademyCourse(courseId) ? [] : publicProfessionalQuestions(courseId)).map(question => ({
      ...question, promptTranslations: assessmentTranslations(question.prompt),
      options: question.options.map(option => ({ ...option, labelTranslations: courseId === 'ingles-carreira-internacional' ? undefined : assessmentTranslations(option.label) })),
    }));
    return professionalJson({ record, questions, publicName: identity.publicName });
  } catch (error) { return professionalError(error, courseId); }
}
export async function POST(request: Request, context: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await context.params;
  try {
    const identity = await requireApiUser(); assertProfessionalOrigin(request);
    const input: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(await readProfessionalBody(request)));
    const action = typeof input === "object" && input !== null && "action" in input ? input.action : undefined;
    if (!["issue", "sharing"].includes(String(action))) return professionalJson({ error: "This edition is archived. Continue in the expanded course with automatic assessments.", href: `/courses/${courseId}/study` }, 409);
    if (action === "issue" && isPremiumAcademyCourse(courseId)) await requirePremiumApiUser();
    const result = await mutateProfessionalRecord(identity, courseId, input, () => recordFunnelEvent("credential_issued", requestFunnelConsent(request)));
    return professionalJson({ ...result, ...('feedback' in result && result.feedback ? { feedback: result.feedback.map(item => ({ ...item, explanationTranslations: assessmentTranslations(item.explanation) })) } : {}) });
  } catch (error) { return professionalError(error, courseId); }
}
