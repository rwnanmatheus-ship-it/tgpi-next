import { timingSafeEqual } from "node:crypto";
import { getIntelligence } from "@/lib/intelligence/server";
import { getCountryContext } from "@/lib/intelligence/country-context.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret || ""}`);
  if (!secret || provided.length !== expected.length || !timingSafeEqual(provided, expected)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.VERCEL_ENV !== "production") return Response.json({ error: "Production runtime required." }, { status: 409 });
  const [core, context] = await Promise.all([getIntelligence(), getCountryContext()]);
  return Response.json({ core: { status: core.status, revision: core.snapshot.revision }, context: { status: context.status, revision: context.snapshot.revision } }, { headers: { "Cache-Control": "no-store" } });
}
