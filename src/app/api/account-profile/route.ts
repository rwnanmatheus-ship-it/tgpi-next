import { getMemberIdentity } from '@/lib/members/identity.server';
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  isCertificateName,
  normalizeAccountIdentity,
  normalizeBirthDate,
  normalizeTgpiAccountProfile,
  type TgpiAccountUpdate,
} from "@/lib/account-profile";
import { normalizeOnboardingData } from "@/lib/onboarding";

const MAX_BODY_SIZE = 24_000;

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session.userId || !session.sessionId || request.headers.get("x-tgpi-session") !== session.sessionId) {
    return NextResponse.json(
      { error: "Your session has expired. Sign in again to save your account." },
      { status: 401 },
    );
  }

  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "This request is not allowed." }, { status: 403 });
  }

  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ error: "JSON content is required." }, { status: 415 });
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
    if (input.profile?.legalFullName && !isCertificateName(profile.legalFullName)) {
      return NextResponse.json({ error: "Enter your complete real name for certificates." }, { status: 400 });
    }
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
    const existing = normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile);
    if (input.profile?.updatedAt !== existing.updatedAt) {
      return NextResponse.json({ error: "This profile changed in another session. Copy your edits, reload and review the latest version before saving." }, { status: 409 });
    }
    const previousTimestamp = Date.parse(existing.updatedAt ?? "");
    const now = new Date(Math.max(Date.now(), (previousTimestamp || 0) + 1)).toISOString();
    // Merge normalized known fields so older clients cannot erase newly added information.
    const savedProfile = { ...normalizeTgpiAccountProfile({
      ...existing,
      ...input.profile,
    }), updatedAt: now };
    const memberIdentity = await getMemberIdentity(session.userId).catch(() => null);
    if (identity.firstName !== user.firstName || identity.lastName !== (user.lastName || "")) {
      await client.users.updateUser(session.userId, {
        firstName: identity.firstName,
        lastName: identity.lastName,
      });
    }
    const sharedFields = { languages: savedProfile.languages, profession: savedProfile.profession, educationLevel: savedProfile.educationLevel };
    const changedPlan = sharedFields.profession !== onboarding.profession ||
      sharedFields.educationLevel !== onboarding.educationLevel ||
      JSON.stringify(sharedFields.languages) !== JSON.stringify(onboarding.languages);
    await client.users.updateUserMetadata(session.userId, {
      unsafeMetadata: {
        tgpiAccountProfile: savedProfile,
        ...(changedPlan ? { tgpiOnboarding: { ...sharedFields, updatedAt: now } } : {}),
      },
    });

    return NextResponse.json({
      identity: { ...identity, username: memberIdentity?.handle || "" },
      profile: savedProfile,
      synchronized: [
        "country-fit",
        "compare",
        "personal-plan",
        "workspace",
        "documents",
        "learning",
      ],
    }, { headers: { "Cache-Control": "private, no-store" } });
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
