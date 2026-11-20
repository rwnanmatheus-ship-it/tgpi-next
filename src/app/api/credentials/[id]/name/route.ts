import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  getCertificateName,
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
} from "@/lib/account-profile";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { normalizeCertificateId } from "@/lib/certificate-reference";
import {
  correctOwnedCredentialName,
  CredentialNameCorrectionError,
} from "@/lib/credential-name-correction.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 2_048;
const inputSchema = z.object({
  expectedName: z.string().min(1).max(121),
  confirmedName: z.string().min(1).max(121),
  consent: z.literal(true),
}).strict();
const headers = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
  Vary: "Cookie",
};
const json = (data: unknown, status = 200) => Response.json(data, { status, headers });

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const sessionIdentity = await requireApiUser(request);
    if (request.headers.get("origin") !== new URL(request.url).origin) {
      return json({ error: "This certificate correction request is not allowed." }, 403);
    }
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return json({ error: "JSON content is required." }, 415);
    }
    if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
      return json({ error: "Certificate correction request is too large." }, 413);
    }
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return json({ error: "Certificate correction request is too large." }, 413);
    }
    const input = inputSchema.safeParse(JSON.parse(body));
    if (!input.success) return json({ error: "Confirm the displayed account name and certificate name before continuing." }, 400);
    const rawId = (await params).id;
    const id = normalizeCertificateId(rawId);
    if (!id || id !== rawId) return json({ error: "Invalid certificate reference." }, 400);

    const user = await currentUser();
    if (!user || user.id !== sessionIdentity.uid) throw new TgpiAuthenticationError();
    const profile = mergeAccountProfileWithOnboarding(user.unsafeMetadata.tgpiAccountProfile, user.unsafeMetadata.tgpiOnboarding);
    const identity = {
      uid: user.id,
      publicName: getCertificateName(normalizeAccountIdentity(user), profile),
      emailVerified: user.primaryEmailAddress?.verification?.status === "verified",
    };
    return json(await correctOwnedCredentialName(identity, id, input.data));
  } catch (error) {
    if (error instanceof SyntaxError) return json({ error: "Certificate correction request is not valid JSON." }, 400);
    if (error instanceof TgpiAuthenticationError) return json({ error: "Sign in to correct your certificate name." }, 401);
    if (error instanceof CredentialNameCorrectionError) return json({ error: error.message }, error.status);
    console.error("Certificate name correction failed", error instanceof Error ? error.name : "Unknown error");
    return json({ error: "Unable to correct your certificate name right now. Please try again." }, 503);
  }
}
