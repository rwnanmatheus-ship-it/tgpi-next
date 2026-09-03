import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as plan from "../src/lib/intelligence/research-plan.ts";
const ids = JSON.parse(readFileSync(new URL("../src/data/intelligence/identities.json", import.meta.url), "utf8"));
const valid = plan.emptyWorksheet("portugal", "EUR");
function harness({ userId = "test-owner", existing = valid, fail = false } = {}) {
  const writes = []; const reads = [];
  const imports = {
    "@clerk/nextjs/server": { auth: async () => ({ userId }), clerkClient: async () => ({ users: { getUser: async id => { reads.push(id); if (fail) throw Error("test failure"); return { unsafeMetadata: { tgpiResearchWorksheet: existing, unrelated: "must remain separate" } }; }, updateUserMetadata: async (...args) => { if (fail) throw Error("test failure"); writes.push(args); } } }) },
    "@/data/intelligence/identities.json": ids, "@/lib/intelligence/research-plan": plan,
  };
  const source = readFileSync(new URL("../src/app/api/intelligence/worksheet/route.ts", import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const exports = {}; vm.runInNewContext(code, { exports, require: key => { if (!(key in imports)) throw Error(key); return imports[key]; }, Response, Request, Buffer, URL, JSON, Date, SyntaxError });
  return { ...exports, writes, reads };
}
function request(body = valid, origin = "https://test.tgpi.example", extraHeaders = {}) { return new Request("https://test.tgpi.example/api/intelligence/worksheet", { method: "PATCH", headers: { ...(origin ? { origin } : {}), "content-type": "application/json", ...extraHeaders }, body: typeof body === "string" ? body : JSON.stringify(body) }); }
test("worksheet GET/PATCH reject anonymous access without touching metadata", async () => { const h = harness({ userId: null }); assert.equal((await h.GET()).status, 401); assert.equal((await h.PATCH(request())).status, 401); assert.equal(h.reads.length, 0); assert.equal(h.writes.length, 0); });
test("worksheet writes require the exact request origin, including rejecting absent origin", async () => { for (const origin of [null, "https://evil.example"]) { const h = harness(); assert.equal((await h.PATCH(request(valid, origin))).status, 403); assert.equal(h.writes.length, 0); } });
test("worksheet GET reads only the authenticated owner and disables caching", async () => { const h = harness(); const r = await h.GET(); assert.equal(r.status, 200); assert.deepEqual(h.reads, ["test-owner"]); assert.match(r.headers.get("cache-control"), /private, no-store/); assert.equal((await r.json()).worksheet.currency, "EUR"); });
test("worksheet writes send only the dedicated metadata key to the authenticated owner", async () => { const h = harness(); const r = await h.PATCH(request({ ...valid, userId: "different-account", premium: true })); assert.equal(r.status, 200); const [id, data] = h.writes[0]; assert.equal(id, "test-owner"); assert.deepEqual(Object.keys(data.unsafeMetadata), ["tgpiResearchWorksheet"]); assert.equal(data.unsafeMetadata.tgpiResearchWorksheet.premium, undefined); assert.equal(data.unsafeMetadata.tgpiResearchWorksheet.userId, undefined); assert.ok(data.unsafeMetadata.tgpiResearchWorksheet.updatedAt); });
test("malformed, oversized and invalid worksheet bodies cause no writes", async () => { for (const value of ["not-json", "x".repeat(4100), { ...valid, months: 0 }, { ...valid, country: "unknown" }, { ...valid, monthly: [] }]) { const h = harness(); assert.ok([400, 413].includes((await h.PATCH(request(value))).status)); assert.equal(h.writes.length, 0); } });
test("worksheet accepts only JSON content type", async () => { const h = harness(); assert.equal((await h.PATCH(request(valid, "https://test.tgpi.example", { "content-type": "text/plain" }))).status, 415); assert.equal(h.writes.length, 0); });
test("metadata service failures do not report a successful save or expose private details", async () => { const h = harness({ fail: true }); assert.equal((await h.GET()).status, 503); const r = await h.PATCH(request()); assert.equal(r.status, 503); assert.doesNotMatch(JSON.stringify(await r.json()), /test failure/); assert.equal(h.writes.length, 0); });
test("invalid saved metadata is not reflected to the browser", async () => { const h = harness({ existing: { ...valid, currency: "javascript:alert(1)" } }); assert.equal((await (await h.GET()).json()).worksheet, null); });
