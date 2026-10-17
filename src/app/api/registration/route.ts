import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { normalizeTgpiAccountProfile } from "@/lib/account-profile";
import { validateRegistration } from "@/lib/auth/registration";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Sign in again to complete your profile." }, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "This request is not allowed." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "Send a valid profile." }, { status: 415 });
  // Bound the streamed body before decoding; Content-Length alone is untrusted.
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "Your profile is missing." }, { status: 400 });
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) { await reader.cancel(); return NextResponse.json({ error: "The submitted profile is too large." }, { status: 413 }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const input = validateRegistration(JSON.parse(new TextDecoder().decode(bytes)));
    if (!input) return NextResponse.json({ error: "Check your name, country, language and terms acceptance." }, { status: 400 });
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    if (!user.emailAddresses.some(email => email.id === user.primaryEmailAddressId && email.verification?.status === "verified")) return NextResponse.json({ error: "Verify your primary email before completing registration." }, { status: 403 });
    const now = new Date().toISOString();
    const country = new Intl.DisplayNames(["en"], { type: "region" }).of(input.currentCountry) || input.currentCountry;
    const profile = normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile);
    await client.users.updateUser(userId, {
      firstName: input.firstName, lastName: input.lastName,
      unsafeMetadata: { ...user.unsafeMetadata, tgpiAccountProfile: { ...profile, currentCountry: country, preferredLanguage: input.preferredLanguage, updatedAt: now } },
      privateMetadata: { ...user.privateMetadata, tgpiRegistration: { completedAt: now, termsVersion: "2026-10-17", termsAcceptedAt: now } },
    });
    return NextResponse.json({ saved: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof SyntaxError) return NextResponse.json({ error: "Send a valid profile." }, { status: 400 });
    console.error("TGPI registration profile could not be saved");
    return NextResponse.json({ error: "Unable to save your profile. Please try again." }, { status: 500 });
  } finally { reader.releaseLock(); }
}
