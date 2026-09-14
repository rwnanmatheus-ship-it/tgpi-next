import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import {
  issueLearningCredential,
  LearningInputError,
} from "@/lib/learning-records.server";

const MAX_BODY_SIZE = 1_000;

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

export async function POST(request: Request) {
  try {
    const identity = await requireApiUser();
    if (!hasSameOrigin(request)) {
      return json({ error: "This credential request could not be verified." }, 403);
    }
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_SIZE) {
      return json({ error: "Credential request is too large." }, 413);
    }
    const input = JSON.parse(body) as {
      courseId?: unknown;
      publicNameConsent?: unknown;
    };
    if (typeof input.courseId !== "string") {
      return json({ error: "Course ID is required." }, 400);
    }
    if (input.publicNameConsent !== true) {
      return json(
        { error: "Confirm the public credential name before issuance." },
        400,
      );
    }
    const credentialId = await issueLearningCredential(identity, input.courseId);
    return json({ credentialId });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return json({ error: "Credential request is not valid JSON." }, 400);
    }
    if (error instanceof TgpiAuthenticationError) {
      return json({ error: "Sign in to issue a credential." }, 401);
    }
    if (error instanceof LearningInputError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Unable to issue TGPI learning credential", error);
    return json({ error: "Unable to issue this credential right now." }, 500);
  }
}
