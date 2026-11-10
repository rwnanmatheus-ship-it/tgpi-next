import { getCredentialIssuerPublicKey } from "@/lib/credential-signing.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const key = getCredentialIssuerPublicKey();
  return Response.json({ keys: key ? [key] : [] }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
      "Content-Type": "application/jwk-set+json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
    status: key ? 200 : 503,
  });
}
