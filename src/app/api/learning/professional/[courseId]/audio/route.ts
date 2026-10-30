import { requireApiUser } from "@/lib/auth/guards";
import { uploadProfessionalAudio } from "@/lib/learning/professional-records.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";
export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const user = await requireApiUser(); assertProfessionalOrigin(request);
    const { courseId } = await context.params;
    return professionalJson(await uploadProfessionalAudio(user.uid, courseId, await readProfessionalBody(request, 600_000), request.headers.get("content-type")?.split(";")[0] || "", request.headers.get("x-audio-consent") === "true"));
  } catch (error) { return professionalError(error); }
}
