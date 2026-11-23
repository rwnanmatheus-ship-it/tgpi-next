import { recordFunnelEvent, requestFunnelConsent } from "@/lib/funnel.server";
import { normalizeTgpiAccountProfile } from "@/lib/account-profile";
import { scheduleNotificationReconciliation } from "@/lib/notifications/schedule.server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { isOnboardingInput, onboardingConflictMessage } from "@/lib/onboarding-input";

const MAX_BODY_SIZE = 24_000;

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session.userId || !session.sessionId || request.headers.get("x-tgpi-session") !== session.sessionId) {
    return NextResponse.json(
      { error: "Your session has expired. Sign in again to save your plan." },
      { status: 401 },
    );
  }

  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "This request is not allowed." }, { status: 403 });
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return NextResponse.json({ error: "JSON content is required." }, { status: 415 });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "The submitted data is not in a valid format." }, { status: 400 });

  try {
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_SIZE) {
        await reader.cancel();
        return NextResponse.json({ error: "The submitted plan exceeds the allowed size." }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const payload: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!isOnboardingInput(payload)) return NextResponse.json({ error: "The submitted data is not in a valid format." }, { status: 400 });
    const onboarding = normalizeOnboardingData(payload);
    const client = await clerkClient();
    const user = await client.users.getUser(session.userId);
    const previous = normalizeOnboardingData(
      user.unsafeMetadata.tgpiOnboarding,
    );
    if (onboarding.updatedAt !== previous.updatedAt) return NextResponse.json({ error: onboardingConflictMessage }, { status: 409 });
    const now = new Date(Math.max(Date.now(), (Date.parse(previous.updatedAt || "") || 0) + 1)).toISOString();

    const savedOnboarding = {
      ...onboarding,
      updatedAt: now,
      completedAt: onboarding.completed
        ? previous.completedAt || now
        : undefined,
    };

    await client.users.updateUserMetadata(session.userId, {
      unsafeMetadata: {
        tgpiOnboarding: savedOnboarding,
        tgpiAccountProfile: {
          ...normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile),
          profession: savedOnboarding.profession,
          educationLevel: savedOnboarding.educationLevel,
          languages: savedOnboarding.languages,
          updatedAt: now,
        },
      },
    });

    if (savedOnboarding.completed && !previous.completed) {
      recordFunnelEvent("plan_context_saved", requestFunnelConsent(request));
    }
    scheduleNotificationReconciliation(session.userId);
    return NextResponse.json({ onboarding: savedOnboarding }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "The submitted data is not in a valid format." },
        { status: 400 },
      );
    }

    if (typeof error === "object" && error !== null && "status" in error && error.status === 429) {
      const retryAfter = "retryAfter" in error && typeof error.retryAfter === "number" && Number.isFinite(error.retryAfter) ? Math.max(1, Math.ceil(error.retryAfter)) : 10;
      return NextResponse.json({ error: "Unable to save right now. Please try again." }, { status: 503, headers: { "Retry-After": String(retryAfter), "Cache-Control": "private, no-store" } });
    }

    console.error("Unable to save TGPI onboarding");

    return NextResponse.json(
      { error: "Unable to save right now. Please try again." },
      { status: 500 },
    );
  } finally { reader.releaseLock(); }
}
