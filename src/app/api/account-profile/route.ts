import { isUsernameEnabled } from "@/lib/auth/username-settings.server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  normalizeAccountIdentity,
  normalizeBirthDate,
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

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "This request is not allowed." }, { status: 403 });
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

    if (input.profile?.dateOfBirth && !normalizeBirthDate(input.profile.dateOfBirth)) {
      return NextResponse.json({ error: "Choose a valid birth date, no later than today." }, { status: 400 });
    }
    if (input.profile?.legalFullName && profile.legalFullName.split(/\s+/).length < 2) {
      return NextResponse.json({ error: "Enter your complete real name for certificates." }, { status: 400 });
    }
    if (!identity.firstName) {
      return NextResponse.json(
        { error: "Add your first name before saving your account." },
        { status: 400 },
      );
    }

    if (identity.username && (!/^[a-z][a-z0-9_]{2,29}$/.test(identity.username) ||
      ["admin", "support", "tgpi", "security", "billing", "official", "system"].includes(identity.username))) {
      return NextResponse.json({ error: "Choose an ID with 3–30 characters: start with a letter and use letters, numbers or underscores. This ID may be reserved." }, { status: 400 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(session.userId);
    const onboarding = normalizeOnboardingData(
      user.unsafeMetadata.tgpiOnboarding,
    );
    if (identity.username && identity.username !== user.username && !(await isUsernameEnabled())) {
      return NextResponse.json({ error: "TGPI @IDs are awaiting activation. Save your other settings without changing your ID." }, { status: 409 });
    }
    const now = new Date().toISOString();
    // Merge normalized known fields so older clients cannot erase newly added information.
    const savedProfile = { ...normalizeTgpiAccountProfile({
      ...normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile),
      ...input.profile,
    }), updatedAt: now };
    const syncedOnboarding = {
      ...onboarding,
      languages: savedProfile.languages,
      profession: savedProfile.profession,
      educationLevel: savedProfile.educationLevel,
      updatedAt: now,
    };

    const updatedUser = await client.users.updateUser(session.userId, {
      firstName: identity.firstName,
      lastName: identity.lastName,
      ...(identity.username && identity.username !== user.username ? { username: identity.username } : {}),
      unsafeMetadata: {
        ...user.unsafeMetadata,
        tgpiAccountProfile: savedProfile,
        tgpiOnboarding: syncedOnboarding,
      },
    });

    return NextResponse.json({
      identity: { ...identity, username: updatedUser.username || "" },
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

    const clerkErrors = typeof error === "object" && error !== null && "errors" in error
      ? (error as { errors?: { code?: string }[] }).errors : undefined;
    if (clerkErrors?.some((item) => item.code === "form_identifier_exists")) {
      return NextResponse.json({ error: "This @ID is already taken. Choose another one." }, { status: 409 });
    }
    if (clerkErrors?.some((item) => item.code?.startsWith("form_"))) {
      return NextResponse.json({ error: "Your identity could not be saved. Check your name and @ID. If IDs are unavailable, contact TGPI support." }, { status: 400 });
    }
    console.error("Unable to save TGPI account profile");

    return NextResponse.json(
      { error: "Unable to save your account right now. Please try again." },
      { status: 500 },
    );
  }
}
