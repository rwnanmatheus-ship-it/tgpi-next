import { auth, clerkClient } from "@clerk/nextjs/server";
import identities from "@/data/intelligence/identities.json";
import { RESEARCH_TASKS, validateWorksheet } from "@/lib/intelligence/research-plan";
import { getFirestoreDocument, runFirestoreTransaction, createFirestoreUpdateWrite, isLearningStorageConfigured, type JsonValue } from "@/lib/firestore-admin-rest.server";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
const countries = identities.countries.map(c => c.slug), tasks = RESEARCH_TASKS.map(t => t.id);
function location(request: Request, uid: string) {
  const q = new URL(request.url).searchParams, country = q.get("country") || "", slot = q.get("slot") || "1";
  if (!countries.includes(country) || !["1", "2", "3"].includes(slot)) return null;
  return { country, slot, path: `tgpiLearningUsers/${uid}/researchScenarios/${country}-${slot}` };
}
export async function GET(request: Request) {
  const { userId } = await auth(); if (!userId) return Response.json({ error: "Sign in to load your scenarios." }, { status: 401, headers });
  const target = location(request, userId); if (!target) return Response.json({ error: "Invalid scenario." }, { status: 400, headers });
  try {
    if (!isLearningStorageConfigured()) throw Error("Unavailable");
    const saved = await getFirestoreDocument<{ worksheet: unknown; revision: string }>(target.path);
    if (saved) return Response.json({ worksheet: validateWorksheet(saved.data.worksheet, [target.country], tasks), revision: saved.data.revision }, { headers });
    // Read legacy data without modifying or discarding it.
    const user = await (await clerkClient()).users.getUser(userId);
    return Response.json({ worksheet: target.slot === "1" ? validateWorksheet(user.unsafeMetadata.tgpiResearchWorksheet, [target.country], tasks) : null, revision: null }, { headers });
  } catch { return Response.json({ error: "Cloud scenarios are temporarily unavailable. Your local draft remains available." }, { status: 503, headers }); }
}
export async function PATCH(request: Request) {
  const { userId } = await auth(); if (!userId) return Response.json({ error: "Sign in to save your scenarios." }, { status: 401, headers });
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Same-origin request required." }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required." }, { status: 415, headers });
  const target = location(request, userId); if (!target) return Response.json({ error: "Invalid scenario." }, { status: 400, headers });
  try {
    const reader = request.body?.getReader(); if (!reader) throw new SyntaxError();
    const parts: Uint8Array[] = []; let length = 0;
    while (true) { const part = await reader.read(); if (part.done) break; length += part.value.length; if (length > 6000) { await reader.cancel(); return Response.json({ error: "Scenario too large." }, { status: 413, headers }); } parts.push(part.value); }
    const body = JSON.parse(Buffer.concat(parts).toString("utf8"));
    const worksheet = validateWorksheet(body.worksheet, [target.country], tasks);
    if (!worksheet || !(body.revision === null || typeof body.revision === "string" && body.revision.length < 60)) return Response.json({ error: "Check the scenario fields." }, { status: 400, headers });
    if (!isLearningStorageConfigured()) throw Error("Unavailable");
    const result = await runFirestoreTransaction(async tx => {
      const current = (await tx.getDocuments<{ revision: string }>([target.path])).get(target.path);
      if ((current?.data.revision ?? null) !== body.revision) return { writes: [], result: { conflict: true, revision: "" } };
      const revision = crypto.randomUUID();
      return { writes: [createFirestoreUpdateWrite(target.path, { worksheet: worksheet as unknown as JsonValue, revision, updatedAt: new Date().toISOString() })], result: { conflict: false, revision } };
    });
    if (result.conflict) return Response.json({ error: "This scenario changed in another tab. Export your draft, then reload to review the saved version." }, { status: 409, headers });
    return Response.json({ saved: true, revision: result.revision }, { headers });
  } catch (e) { return Response.json({ error: e instanceof SyntaxError ? "Invalid JSON." : "Cloud save failed. Your draft has not been discarded." }, { status: e instanceof SyntaxError ? 400 : 503, headers }); }
}
