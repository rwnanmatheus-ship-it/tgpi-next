import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import {
  getLearningCertificationStatus,
  LearningInputError,
} from "@/lib/learning-records.server";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, no-store, max-age=0" },
    status,
  });
}

export async function GET(request: Request) {
  try {
    const identity = await requireApiUser();
    const courseId = new URL(request.url).searchParams.get("courseId") || "";
    const status = await getLearningCertificationStatus(identity, courseId);
    return json({ status });
  } catch (error) {
    if (error instanceof TgpiAuthenticationError) {
      return json({ error: "Sign in to access your certification record." }, 401);
    }
    if (error instanceof LearningInputError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Unable to load TGPI certification status", error);
    return json(
      { error: "Unable to load your certification record right now." },
      500,
    );
  }
}
