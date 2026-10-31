import { requireApiUser } from "@/lib/auth/guards";
import { readProfessionalFile } from "@/lib/learning/professional-records.server";
import { professionalError, professionalPrivateHeaders } from "@/lib/learning/professional-http.server";
export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ ownerUid: string; fileId: string }> }) {
  try {
    const user = await requireApiUser(), { ownerUid, fileId } = await context.params;
    const file = await readProfessionalFile(user.uid, ownerUid, fileId);
    return new Response(new Uint8Array(file.bytes), { headers: { ...professionalPrivateHeaders, "Content-Type": "application/octet-stream", "Content-Disposition": `attachment; filename="${file.name}"` } });
  } catch (error) { return professionalError(error); }
}
