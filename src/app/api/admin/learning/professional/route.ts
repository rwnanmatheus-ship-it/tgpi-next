import { requireApiUser } from "@/lib/auth/guards";
import { listProfessionalReviews, reviewProfessionalProject } from "@/lib/learning/professional-records.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";
export async function GET() {
  try { const user = await requireApiUser(); return professionalJson({ records: await listProfessionalReviews(user.uid) }); }
  catch (error) { return professionalError(error); }
}
export async function POST(request: Request) {
  try {
    const user = await requireApiUser(); assertProfessionalOrigin(request);
    const input: unknown = JSON.parse(new TextDecoder().decode(await readProfessionalBody(request, 16_000)));
    return professionalJson({ record: await reviewProfessionalProject(user.uid, input) });
  } catch (error) { return professionalError(error); }
}
