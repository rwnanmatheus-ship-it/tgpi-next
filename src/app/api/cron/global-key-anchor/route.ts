import { timingSafeEqual } from "node:crypto";
import {
  anchorPendingGlobalKeys,
  GlobalKeyAnchorError,
} from "@/lib/global-key-anchor.server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

function safeTokenEqual(first: string, second: string) {
  const firstBuffer = Buffer.from(first, "utf8");
  const secondBuffer = Buffer.from(second, "utf8");
  return (
    firstBuffer.length === secondBuffer.length &&
    timingSafeEqual(firstBuffer, secondBuffer)
  );
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authorization = request.headers.get("authorization") || "";
  if (
    !cronSecret ||
    !safeTokenEqual(authorization, `Bearer ${cronSecret}`)
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (process.env.VERCEL_ENV !== "production") {
    return Response.json({ error: "Production runtime required" }, { status: 409 });
  }

  try {
    const result = await anchorPendingGlobalKeys();
    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof GlobalKeyAnchorError) {
      return Response.json({ error: error.message }, { status: 503 });
    }
    console.error("Unable to run the TGPI Base Mainnet anchor batch", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return Response.json(
      { error: "The public anchor batch could not be completed." },
      { status: 500 },
    );
  }
}
