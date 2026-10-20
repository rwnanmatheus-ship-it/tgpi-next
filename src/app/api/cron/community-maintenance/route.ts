import { timingSafeEqual } from "node:crypto";
import { runCommunityMaintenance } from "@/lib/community/lifecycle.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET,
    provided = Buffer.from(request.headers.get("authorization") || ""),
    expected = Buffer.from(`Bearer ${secret || ""}`);
  if (
    !secret ||
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  )
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.VERCEL_ENV !== "production")
    return Response.json(
      { error: "Production runtime required." },
      { status: 409 },
    );
  try {
    return Response.json(await runCommunityMaintenance(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    console.error("Community maintenance paused for retry");
    return Response.json(
      { error: "Maintenance paused at its last checkpoint." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
