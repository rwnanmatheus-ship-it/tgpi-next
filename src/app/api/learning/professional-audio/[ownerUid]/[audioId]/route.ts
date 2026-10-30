import { requireApiUser } from "@/lib/auth/guards";
import { readProfessionalAudio } from "@/lib/learning/professional-records.server";
import { professionalError, professionalPrivateHeaders } from "@/lib/learning/professional-http.server";
export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ ownerUid: string; audioId: string }> }) {
  try {
    const user = await requireApiUser(), { ownerUid, audioId } = await context.params;
    const audio = await readProfessionalAudio(user.uid, ownerUid, audioId);
    return new Response(new Uint8Array(audio.bytes), { headers: { ...professionalPrivateHeaders, "Content-Type": audio.type, "Content-Disposition": "inline" } });
  } catch (error) { return professionalError(error); }
}
