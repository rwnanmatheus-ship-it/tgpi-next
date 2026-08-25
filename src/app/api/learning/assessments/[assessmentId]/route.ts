import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { FirestoreAdminError } from "@/lib/firestore-admin-rest.server";
import {
  LearningInputError,
  submitLearningAssessment,
} from "@/lib/learning-records.server";

const MAX_BODY_SIZE = 16_000;

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, no-store, max-age=0" },
    status,
  });
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ assessmentId: string }> },
) {
  try {
    const identity = await requireApiUser();
    if (!hasSameOrigin(request)) {
      return json({ error: "This assessment request could not be verified." }, 403);
    }
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_SIZE) {
      return json({ error: "Assessment submission is too large." }, 413);
    }
    const input = JSON.parse(body) as { courseId?: unknown };
    if (typeof input.courseId !== "string") {
      return json({ error: "Course ID is required." }, 400);
    }
    const { assessmentId } = await params;
    const outcome = await submitLearningAssessment(
      identity,
      input.courseId,
      assessmentId,
      input,
    );
    return json(outcome);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return json({ error: "Assessment submission is not valid JSON." }, 400);
    }
    if (error instanceof TgpiAuthenticationError) {
      return json({ error: "Sign in to submit an assessment." }, 401);
    }
    if (error instanceof LearningInputError) {
      return json({ error: error.message }, error.status);
    }
    if (error instanceof FirestoreAdminError) {
      console.error("TGPI assessment storage request failed", error);
      return json({ error: "Secure assessment storage is unavailable." }, 503);
    }
    console.error("Unable to score TGPI assessment", error);
    return json({ error: "Unable to score this assessment right now." }, 500);
  }
}
