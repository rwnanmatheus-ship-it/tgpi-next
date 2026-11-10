import { timingSafeEqual } from "node:crypto";
import {
  dispatchPushBatch,
  pushConfigured,
} from "@/lib/notifications/push.server";
import { reconcileNotificationBatch } from "@/lib/notifications/automation.server";
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
  if (!pushConfigured())
    return Response.json({ error: "Push is not configured." }, { status: 503 });
  try {
    const delivery = await dispatchPushBatch();
    const sync = await reconcileNotificationBatch();
    return Response.json(
      { delivery, sync },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Notification processing will retry." },
      { status: 503 },
    );
  }
}
