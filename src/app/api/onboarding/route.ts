import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { normalizeOnboardingData } from "@/lib/onboarding";

const MAX_BODY_SIZE = 24_000;

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { error: "Your session has expired. Sign in again to save your plan." },
      { status: 401 },
    );
  }

  try {
    const body = await request.text();

    if (new TextEncoder().encode(body).byteLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "The submitted plan exceeds the allowed size." },
        { status: 413 },
      );
    }

    const payload: unknown = JSON.parse(body);
    const onboarding = normalizeOnboardingData(payload);
    const now = new Date().toISOString();
    const client = await clerkClient();
    const user = await client.users.getUser(session.userId);
    const previous = normalizeOnboardingData(
      user.unsafeMetadata.tgpiOnboarding,
    );

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
      },
    });

    return NextResponse.json({ onboarding: savedOnboarding });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "The submitted data is not in a valid format." },
        { status: 400 },
      );
    }

    console.error("Unable to save TGPI onboarding", error);

    return NextResponse.json(
      { error: "Unable to save right now. Please try again." },
      { status: 500 },
    );
  }
}
