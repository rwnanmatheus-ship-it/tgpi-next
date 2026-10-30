import { requireApiUser } from "@/lib/auth/guards";
import { getProfessionalRecord, mutateProfessionalRecord } from "@/lib/learning/professional-records.server";
import { publicProfessionalQuestions } from "@/data/courses/professional/assessment-bank.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";

export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const identity = await requireApiUser(), { courseId } = await context.params;
    const record = await getProfessionalRecord(identity.uid, courseId);
    return professionalJson({ record, questions: publicProfessionalQuestions(courseId), publicName: identity.publicName });
  } catch (error) { return professionalError(error); }
}
export async function POST(request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const identity = await requireApiUser(); assertProfessionalOrigin(request);
    const { courseId } = await context.params;
    const input: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(await readProfessionalBody(request)));
    return professionalJson(await mutateProfessionalRecord(identity, courseId, input));
  } catch (error) { return professionalError(error); }
}
