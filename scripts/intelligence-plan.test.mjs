import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const root = new URL("../", import.meta.url);
function load(path, imports = {}) {
  const source = readFileSync(new URL(path, root), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: id => { if (!(id in imports)) throw Error(`Unexpected import ${id}`); return imports[id]; }, Request, Response, TextEncoder, URL, Date, JSON, SyntaxError, Set });
  return exports;
}
const types = load("src/types/onboarding.ts");
const normalizer = load("src/lib/onboarding.ts", { "@/types/onboarding": types });
const identities = JSON.parse(readFileSync(new URL("src/data/intelligence/identities.json", root), "utf8"));
const context = { primaryGoal: "work", budgetRange: "1500-3000", timeHorizon: "6-months", languages: ["English"], profession: "Synthetic test field" };
const request = (body = { countrySlug: "portugal", context }, origin = "https://example.test") => new Request("https://example.test/api/intelligence/plan", { method: "PATCH", headers: { Origin: origin, "Content-Type": "application/json" }, body: typeof body === "string" ? body : JSON.stringify(body) });
function handler({ userId = "test-user", previous = {}, fail = false } = {}) {
  const writes = []; let reads = 0;
  const route = load("src/app/api/intelligence/plan/route.ts", {
    "@clerk/nextjs/server": { auth: async () => ({ userId }), clerkClient: async () => ({ users: { getUser: async () => { reads++; return { unsafeMetadata: { tgpiOnboarding: previous } }; }, updateUserMetadata: async (...args) => { if (fail) throw Error("Mock upstream failure"); writes.push(args); } } }) },
    "@/lib/onboarding": normalizer,
    "@/data/intelligence/identities.json": identities,
  });
  return { patch: route.PATCH, writes, reads: () => reads };
}
test("anonymous requests cannot read or modify member plans", async () => { const h = handler({ userId: null }); assert.equal((await h.patch(request())).status, 401); assert.equal(h.reads(), 0); assert.equal(h.writes.length, 0); });
test("cross-origin changes are rejected before profile access", async () => { const h = handler(); assert.equal((await h.patch(request(undefined, "https://attacker.test"))).status, 403); assert.equal(h.reads(), 0); });
test("malformed, oversized and invalid-country input cannot mutate metadata", async () => { for (const body of ["not json", "x".repeat(8001), { countrySlug: "not-a-country", context }, { countrySlug: "portugal", context: { ...context, primaryGoal: "invalid" } }]) { const h = handler(); assert.ok([400, 413].includes((await h.patch(request(body))).status)); assert.equal(h.writes.length, 0); } });
test("saving preserves unrelated fields, completion and existing countries", async () => {
  const h = handler({ previous: { completed: true, currentStep: 5, targetCountries: ["canada"], educationLevel: "Test education", internationalExperience: "short-trips", priorities: ["safety"], completedAt: "2026-01-01" } });
  const response = await h.patch(request()); assert.equal(response.status, 200); assert.equal(response.headers.get("cache-control"), "no-store"); assert.equal(h.writes.length, 1);
  const [userId, metadata] = h.writes[0]; const saved = metadata.unsafeMetadata.tgpiOnboarding;
  assert.equal(userId, "test-user"); assert.equal(saved.educationLevel, "Test education"); assert.equal(saved.completed, true); assert.equal(saved.completedAt, "2026-01-01"); assert.deepEqual([...saved.targetCountries], ["portugal", "canada"]); assert.equal(saved.primaryGoal, "work"); assert.equal(saved.priorities[0], "safety");
});
test("full shortlist is not silently truncated", async () => { const h = handler({ previous: { targetCountries: ["canada", "japan", "spain", "france", "italy"] } }); assert.equal((await h.patch(request())).status, 409); assert.equal(h.writes.length, 0); });
test("client-provided account identifiers are ignored", async () => { const h = handler(); await h.patch(request({ countrySlug: "portugal", context, userId: "another-user" })); assert.equal(h.writes[0][0], "test-user"); });
test("upstream failure returns failure without reporting a successful save", async () => { const h = handler({ fail: true }); const response = await h.patch(request()); assert.equal(response.status, 500); assert.equal(h.writes.length, 0); assert.match((await response.json()).error, /Unable to save/); });
