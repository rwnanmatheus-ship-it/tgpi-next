import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import { guideChannel, guideCampaign } from "../src/app/guia-paises/campaign.ts";
import { guideCopy } from "../src/app/guia-paises/copy.ts";
import { isLocale } from "../src/lib/localization/config.ts";

const require = createRequire(import.meta.url);
const source = readFileSync("src/app/guia-paises/actions.ts", "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function harness() {
  const records = new Map();
  const deps = {
    "./campaign": { guideChannel, guideCampaign },
    "./copy": { guideCopy },
    "@/lib/localization/config": { isLocale },
    "@/lib/firestore-admin-rest.server": {
      createFirestoreUpdateWrite: (path, value) => ({ path, value }),
      runFirestoreTransaction: async (build) => {
        const plan = await build({ getDocuments: async () => records });
        for (const { path, value } of plan.writes) records.set(path, value);
      },
    },
  };
  const api = {};
  new Function("require", "exports", compiled)((id) => deps[id] ?? require(id), api);
  async function submit(fields = {}) {
    const body = new FormData();
    const initial = { email: " Reader@example.org ", locale: "pt-BR", source: "instagram", consent: "yes" };
    for (const [key, value] of Object.entries({ ...initial, ...fields })) body.set(key, value);
    return api.subscribeToGuides("idle", body);
  }
  return { records, submit };
}

test("guide requires a valid email and explicit consent and ignores bot submissions", async () => {
  const { records, submit } = harness();
  assert.equal(await submit({ consent: "" }), "invalid");
  assert.equal(await submit({ email: "invalid" }), "invalid");
  assert.equal(await submit({ website: "filled" }), "saved");
  assert.equal(records.size, 0);
});

test("guide preserves first attribution and consent without reactivating a suppressed entry", async () => {
  const { records, submit } = harness();
  assert.equal(await submit(), "saved");
  const [entry] = records.values();
  assert.equal(entry.email, "reader@example.org");
  assert.equal(entry.consentText, guideCopy["pt-BR"].consent);
  assert.equal(entry.source, "instagram");
  entry.emailOptIn = false;
  await submit({ email: "reader@example.org", source: "campinas" });
  assert.equal(records.size, 1);
  assert.equal(entry.emailOptIn, false);
  assert.equal(entry.source, "instagram");
});

test("guide stores only recognized sources", async () => {
  const { records, submit } = harness();
  await submit({ source: "unexpected" });
  assert.equal([...records.values()][0].source, "direto");
});
