import { isPremiumAcademyCourse } from "@/data/courses/academy/premium-policy";
import { requireApiUser, requirePremiumApiUser } from "@/lib/auth/guards";
import { uploadProfessionalAudio } from "@/lib/learning/professional-records.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";
export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await context.params;
  try {
    const user = await (isPremiumAcademyCourse(courseId) ? requirePremiumApiUser() : requireApiUser()); assertProfessionalOrigin(request);
    return professionalJson(await uploadProfessionalAudio(user.uid, courseId, await readProfessionalBody(request, 600_000), request.headers.get("content-type")?.split(";")[0] || "", request.headers.get("x-audio-consent") === "true"));
  } catch (error) { return professionalError(error, courseId); }
}
