import { requireApiUser } from "@/lib/auth/guards";
import { changeProfessionalCredential } from "@/lib/learning/professional-records.server";
import { assertProfessionalOrigin, professionalError, professionalJson, readProfessionalBody } from "@/lib/learning/professional-http.server";
export async function POST(request: Request) {
  try {
    const user = await requireApiUser(); assertProfessionalOrigin(request);
    const input: unknown = JSON.parse(new TextDecoder().decode(await readProfessionalBody(request, 6000)));
    return professionalJson(await changeProfessionalCredential(user.uid, input));
  } catch (error) { return professionalError(error); }
}
