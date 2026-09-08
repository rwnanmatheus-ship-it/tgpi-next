import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  normalizeAccountIdentity,
  normalizeTgpiAccountProfile,
  type TgpiAccountUpdate,
} from "@/lib/account-profile";
import { normalizeOnboardingData } from "@/lib/onboarding";

const MAX_BODY_SIZE = 24_000;

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { error: "Your session has expired. Sign in again to save your account." },
      { status: 401 },
    );
  }

  try {
    const body = await request.text();

    if (new TextEncoder().encode(body).byteLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "The submitted profile exceeds the allowed size." },
        { status: 413 },
      );
    }

    const payload: unknown = JSON.parse(body);
    const input =
      typeof payload === "object" && payload !== null
        ? (payload as Partial<TgpiAccountUpdate>)
        : {};
    const identity = normalizeAccountIdentity(input.identity);
    const profile = normalizeTgpiAccountProfile(input.profile);

    if (!identity.firstName) {
      return NextResponse.json(
        { error: "Add your first name before saving your account." },
        { status: 400 },
      );
    }

    const client = await clerkClient();
    const user = await client.users.getUser(session.userId);
    const onboarding = normalizeOnboardingData(
      user.unsafeMetadata.tgpiOnboarding,
    );
    const now = new Date().toISOString();
    const savedProfile = { ...profile, updatedAt: now };
    const syncedOnboarding = {
      ...onboarding,
      languages: savedProfile.languages,
      profession: savedProfile.profession,
      educationLevel: savedProfile.educationLevel,
      updatedAt: now,
    };

    await Promise.all([
      client.users.updateUser(session.userId, {
        firstName: identity.firstName,
        lastName: identity.lastName,
      }),
      client.users.updateUserMetadata(session.userId, {
        unsafeMetadata: {
          tgpiAccountProfile: savedProfile,
          tgpiOnboarding: syncedOnboarding,
        },
      }),
    ]);

    return NextResponse.json({
      identity,
      profile: savedProfile,
      synchronized: [
        "country-fit",
        "compare",
        "personal-plan",
        "workspace",
        "documents",
        "learning",
      ],
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "The submitted data is not in a valid format." },
        { status: 400 },
      );
    }

    console.error("Unable to save TGPI account profile", error);

    return NextResponse.json(
      { error: "Unable to save your account right now. Please try again." },
      { status: 500 },
    );
  }
}
