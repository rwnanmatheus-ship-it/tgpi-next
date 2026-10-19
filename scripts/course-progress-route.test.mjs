import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const code = ts.transpileModule(readFileSync(new URL("../src/app/api/progress/route.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function route(userId) {
  const exports = {};
  const expected = { courseProgress: {} };
  new Function("require", "exports", code)((id) => {
    if (id === "@/lib/funnel.server") return { recordFunnelEvent: () => undefined, requestFunnelConsent: () => false };
    if (id === "@clerk/nextjs/server") return { auth: async () => ({ userId }) };
    if (id === "@/lib/notifications/schedule.server") return { scheduleNotificationReconciliation: () => undefined };
    if (id === "next/cache") return { unstable_cache: () => { throw new Error("Request-scoped Clerk client cannot run in a cache scope"); } };
    if (id === "next/server") return { NextResponse: { json: (body, init) => Response.json(body, init) } };
    if (id === "@/lib/activation-store.server") return { getUserActivationProgress: async (uid) => { assert.equal(uid, userId); return expected; } };
    throw new Error(`Unexpected dependency ${id}`);
  }, exports);
  return exports;
}
test("authenticated progress reads succeed outside a Next cache scope", async () => {
  const response = await route("learner-test").GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { progress: { courseProgress: {} } });
  assert.match(response.headers.get("Cache-Control"), /private, no-store/);
});
test("anonymous progress reads remain unauthorized", async () => {
  assert.equal((await route(null).GET()).status, 401);
});
