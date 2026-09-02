import { auth, clerkClient } from "@clerk/nextjs/server";
import { normalizeOnboardingData } from "@/lib/onboarding";
import identityData from "@/data/intelligence/identities.json";

// Explicit member action only. Public source refresh never calls this route.
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Sign in to save your research plan." }, { status: 401 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Cross-origin requests are not accepted." }, { status: 403 });
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 8000) return Response.json({ error: "Plan exceeds the allowed size." }, { status: 413 });
    const body: unknown = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "Invalid plan." }, { status: 400 });
    const payload = body as { countrySlug?: unknown; context?: unknown };
    if (typeof payload.countrySlug !== "string" || !identityData.countries.some(c => c.slug === payload.countrySlug) || !payload.context || typeof payload.context !== "object" || Array.isArray(payload.context)) return Response.json({ error: "Select a valid country and goal." }, { status: 400 });
    const context = normalizeOnboardingData(payload.context);
    if (!context.primaryGoal || !context.timeHorizon || !context.budgetRange) return Response.json({ error: "Select a goal, timeline and budget option." }, { status: 400 });
    const client = await clerkClient();
    const user = await client.users.getUser(session.userId);
    const previous = normalizeOnboardingData(user.unsafeMetadata.tgpiOnboarding);
    if (previous.targetCountries.length >= 5 && !previous.targetCountries.includes(payload.countrySlug)) return Response.json({ error: "Your five-country shortlist is full. Manage it in your profile before adding another destination." }, { status: 409 });
    const onboarding = { ...previous, primaryGoal: context.primaryGoal, timeHorizon: context.timeHorizon, budgetRange: context.budgetRange, languages: context.languages, profession: context.profession, targetCountries: Array.from(new Set([payload.countrySlug, ...previous.targetCountries])), updatedAt: new Date().toISOString() };
    await client.users.updateUserMetadata(session.userId, { unsafeMetadata: { tgpiOnboarding: onboarding } });
    return Response.json({ saved: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof SyntaxError) return Response.json({ error: "Invalid plan format." }, { status: 400 });
    return Response.json({ error: "Unable to save. Your inputs remain on this page; please try again." }, { status: 500 });
  }
}
