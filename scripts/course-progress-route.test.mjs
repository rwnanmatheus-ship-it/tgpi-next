import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const code = ts.transpileModule(readFileSync(new URL("../src/app/api/progress/route.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function route(userId) {
  const exports = {};
  const expected = { courseProgress: {} };
  new Function("require", "exports", code)((id) => {
    if (id === "@/lib/firestore-admin-rest.server") return { FirestoreAdminError: class extends Error {} };
    if (id === "@/lib/funnel.server") return { recordFunnelEvent: () => undefined, requestFunnelConsent: () => false };
    if (id === "@clerk/nextjs/server") return { auth: async () => ({ userId, sessionId: userId ? "active-session" : null }) };
    if (id === "@/lib/notifications/schedule.server") return { scheduleNotificationReconciliation: () => undefined };
    if (id === "next/cache") return { unstable_cache: () => { throw new Error("Request-scoped Clerk client cannot run in a cache scope"); } };
    if (id === "next/server") return { NextResponse: { json: (body, init) => Response.json(body, init) } };
    if (id === "@/lib/activation-store.server") return { parseActivationMutation: value => value, updateUserActivationProgress: async uid => { assert.equal(uid, userId); return expected; }, getUserActivationView: async (uid) => { assert.equal(uid, userId); return { progress: expected, readOnly: false }; } };
    throw new Error(`Unexpected dependency ${id}`);
  }, exports);
  return exports;
}
test("authenticated progress reads succeed outside a Next cache scope", async () => {
  const response = await route("learner-test").GET(new Request("https://tgpi.test/api/progress"));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { progress: { courseProgress: {} } });
  assert.match(response.headers.get("Cache-Control"), /private, no-store/);
});
test("anonymous progress reads remain unauthorized", async () => {
  assert.equal((await route(null).GET(new Request("https://tgpi.test/api/progress"))).status, 401);
});


test("stale session or missing origin cannot mutate another active account", async () => {
  const api = route("learner-test");
  const request = (session, origin) => new Request("https://tgpi.test/api/progress", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-TGPI-Session": session, ...(origin ? { Origin: origin } : {}) },
    body: JSON.stringify({ type: "start_course", userId: "spoofed-account" }),
  });
  assert.equal((await api.PATCH(request("previous-session", "https://tgpi.test"))).status, 401);
  assert.equal((await api.PATCH(request("active-session", "http://tgpi.test"))).status, 403);
  assert.equal((await api.PATCH(request("active-session"))).status, 403);
  assert.equal((await api.PATCH(request("active-session", "https://tgpi.test"))).status, 200);
  assert.equal((await api.GET(request("previous-session", "https://tgpi.test"))).status, 401);
});
