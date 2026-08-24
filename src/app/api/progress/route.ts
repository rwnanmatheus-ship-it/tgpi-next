import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  ActivationInputError,
  getUserActivationProgress,
  parseActivationMutation,
  updateUserActivationProgress,
} from "@/lib/activation-store.server";

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

export async function GET() {
  const session = await auth();
  if (!session.userId) {
    return json({ error: "Sign in to access your TGPI progress." }, 401);
  }

  try {
    const progress = await getUserActivationProgress(session.userId);
    return json({ progress });
  } catch (error) {
    console.error("Unable to load TGPI activation progress", error);
    return json({ error: "Unable to load your TGPI progress right now." }, 500);
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session.userId) {
    return json({ error: "Sign in to save your TGPI progress." }, 401);
  }

  if (!hasSameOrigin(request)) {
    return json({ error: "This progress request could not be verified." }, 403);
  }

  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_SIZE) {
      return json({ error: "Progress update is too large." }, 413);
    }

    const mutation = parseActivationMutation(JSON.parse(body) as unknown);
    const progress = await updateUserActivationProgress(
      session.userId,
      mutation,
    );
    return json({ progress });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return json({ error: "Progress update is not valid JSON." }, 400);
    }
    if (error instanceof ActivationInputError) {
      return json({ error: error.message }, error.status);
    }

    console.error("Unable to update TGPI activation progress", error);
    return json({ error: "Unable to save your TGPI progress right now." }, 500);
  }
}
