import { isPremiumAcademyCourse } from "@/data/courses/academy/premium-policy";
import { requireApiUser, requirePremiumApiUser } from "@/lib/auth/guards";
import { uploadProfessionalFile } from "@/lib/learning/professional-records.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";
export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await context.params;
  try {
    const user = await (isPremiumAcademyCourse(courseId) ? requirePremiumApiUser() : requireApiUser()); assertProfessionalOrigin(request);
    const name = decodeURIComponent(request.headers.get("x-file-name") || "");
    return professionalJson(await uploadProfessionalFile(user.uid, courseId, await readProfessionalBody(request, 3_000_000), name));
  } catch (error) { return professionalError(error, courseId); }
}
