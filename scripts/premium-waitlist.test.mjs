import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { z } from "zod";
import { PREMIUM_OFFER } from "../src/lib/commercial-offer.ts";

const moduleSource = ts.transpileModule(
  readFileSync(new URL("../src/app/api/premium-waitlist/route.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

function fixture() {
  const records = new Map();
  const writes = [];
  const dependencies = {
    "node:crypto": { createHash },
    zod: { z },
    "@/lib/commercial-offer": { PREMIUM_OFFER },
    "@/lib/firestore-admin-rest.server": {
      createFirestoreUpdateWrite: (path, data, precondition, times) => ({ path, data, precondition, times }),
      runFirestoreTransaction: async build => {
        const plan = await build({ getDocuments: async () => records });
        for (const write of plan.writes) {
          assert.equal(records.has(write.path), false);
          records.set(write.path, write.data);
          writes.push(write);
        }
      },
    },
  };
  const api = {};
  new Function("exports", "require", moduleSource)(api, id => dependencies[id]);
  const entry = { name: "Student", email: "  Student@example.test ", currentCountry: "",
    targetCountry: "Portugal", goal: "study", timeline: "researching", website: "" };
  const request = (value = entry, origin = "https://tgpi.test") => new Request("https://tgpi.test/api/premium-waitlist", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(value),
  });
  return { api, entry, request, writes };
}

test("waitlist keeps existing records private and preserves the first valid signup", async () => {
  const { api, entry, request, writes } = fixture();
  const response = await api.POST(request());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.deepEqual(await response.json(), { saved: true });

  const retry = await api.POST(request({ ...entry, name: "Another name" }));
  assert.deepEqual(await retry.json(), { saved: true });
  assert.equal(writes.length, 1);
  const [write] = writes;
  assert.equal(write.path, "premiumWaitlist/" + createHash("sha256").update("student@example.test").digest("hex"));
  assert.equal(write.data.name, "Student");
  assert.equal(write.data.email, "student@example.test");
  assert.deepEqual(write.precondition, { exists: false });
  assert.deepEqual(write.times, ["createdAt", "updatedAt"]);
});

test("waitlist validates form size, origin and fields before touching storage", async () => {
  const { api, entry, request, writes } = fixture();
  assert.equal((await api.POST(request(entry, "https://other.test"))).status, 403);
  assert.equal((await api.POST(request({ ...entry, email: "invalid" }))).status, 400);
  assert.equal((await api.POST(request({ ...entry, name: "a".repeat(4500) }))).status, 413);
  assert.deepEqual(await (await api.POST(request({ ...entry, website: "filled" }))).json(), { saved: true });
  assert.equal(writes.length, 0);
});
