import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { normalizeOnboardingData } from "@/lib/onboarding";

const MAX_BODY_SIZE = 24_000;

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json(
      { error: "Sua sessão expirou. Entre novamente para salvar o plano." },
      { status: 401 },
    );
  }

  try {
    const body = await request.text();

    if (new TextEncoder().encode(body).byteLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "O plano enviado ultrapassa o limite permitido." },
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
        { error: "Os dados enviados não estão em um formato válido." },
        { status: 400 },
      );
    }

    console.error("Unable to save TGPI onboarding", error);

    return NextResponse.json(
      { error: "Não foi possível salvar agora. Tente novamente." },
      { status: 500 },
    );
  }
}
