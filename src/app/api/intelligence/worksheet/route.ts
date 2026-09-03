import { auth, clerkClient } from "@clerk/nextjs/server";
import identities from "@/data/intelligence/identities.json";
import { RESEARCH_TASKS, validateWorksheet } from "@/lib/intelligence/research-plan";

const countries = identities.countries.map(c => c.slug);
const tasks = RESEARCH_TASKS.map(t => t.id);
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
export async function GET() {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Sign in to view your private worksheet." }, { status: 401, headers });
  try {
    const client = await clerkClient(); const user = await client.users.getUser(session.userId);
    const worksheet = validateWorksheet(user.unsafeMetadata.tgpiResearchWorksheet, countries, tasks);
    return Response.json({ worksheet }, { headers });
  } catch { return Response.json({ error: "Your saved worksheet could not be loaded." }, { status: 503, headers }); }
}
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session.userId) return Response.json({ error: "Sign in to save your worksheet." }, { status: 401, headers });
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "A same-origin request is required." }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON is required." }, { status: 415, headers });
  if (Number(request.headers.get("content-length")) > 4096) return Response.json({ error: "Worksheet too large." }, { status: 413, headers });
  try {
    const reader = request.body?.getReader(); if (!reader) return Response.json({ error: "Worksheet is required." }, { status: 400, headers });
    const parts: Uint8Array[] = []; let bytes = 0;
    while (true) { const part = await reader.read(); if (part.done) break; bytes += part.value.byteLength; if (bytes > 4096) { await reader.cancel(); return Response.json({ error: "Worksheet too large." }, { status: 413, headers }); } parts.push(part.value); }
    const plan = validateWorksheet(JSON.parse(Buffer.concat(parts).toString("utf8")), countries, tasks);
    if (!plan) return Response.json({ error: "Check the country, amounts, dates and worksheet fields." }, { status: 400, headers });
    const client = await clerkClient();
    // Store only this small, user-authored active worksheet. Never attach source HTML or identity documents.
    await client.users.updateUserMetadata(session.userId, { unsafeMetadata: { tgpiResearchWorksheet: { ...plan, updatedAt: new Date().toISOString() } } });
    return Response.json({ saved: true }, { headers });
  } catch (error) { return Response.json({ error: error instanceof SyntaxError ? "Invalid worksheet JSON." : "The worksheet could not be saved. Your page inputs are unchanged." }, { status: error instanceof SyntaxError ? 400 : 503, headers }); }
}
