import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import {
  defaultPreferences,
  parsePreferences,
  wantsEmail,
  welcomeEvent,
  safeNotificationHref,
  billingEvent,
} from "../src/lib/notifications/model.ts";
const require = createRequire(import.meta.url);
function storeHarness() {
  const documents = new Map();
  const writes = [];
  const firestore = {
    createFirestoreUpdateWrite: (path, data, condition) => ({
      path,
      data,
      condition,
    }),
    getFirestoreDocument: async (path) => documents.get(path) || null,
    runFirestoreQuery: async () => [],
    runFirestoreTransaction: async (build) => {
      const plan = await build({
        getDocuments: async (paths) =>
          new Map(paths.map((path) => [path, documents.get(path) || null])),
      });
      for (const write of plan.writes) {
        if (write.condition?.exists === false)
          assert.equal(documents.has(write.path), false);
        documents.set(write.path, { data: write.data, updateTime: "version" });
        writes.push(write);
      }
      return plan.result;
    },
  };
  const testModule = { exports: {} };
  vm.runInNewContext(
    ts.transpileModule(
      readFileSync(
        new URL("../src/lib/notifications/store.server.ts", import.meta.url),
        "utf8",
      ),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
        },
      },
    ).outputText,
    {
      module: testModule,
      exports: testModule.exports,
      Buffer,
      console,
      process: {
        env: {
          TGPI_FIREBASE_CLIENT_EMAIL: "test",
          TGPI_FIREBASE_PRIVATE_KEY: "test",
          TGPI_NOTIFICATIONS_SECURITY_RULES_CONFIRMED: "true",
        },
      },
      require: (name) =>
        name === "server-only"
          ? {}
          : name.includes("firestore-admin")
            ? firestore
            : name === "./model"
              ? { parsePreferences, safeNotificationHref, wantsEmail }
              : require(name),
    },
  );
  return { api: testModule.exports, documents, writes };
}
test("optional emails require opt-in; malformed preferences cannot enable them", () => {
  assert.equal(
    wantsEmail({ ...welcomeEvent, category: "product" }, defaultPreferences),
    false,
  );
  assert.equal(wantsEmail(welcomeEvent, defaultPreferences), true);
  assert.equal(
    wantsEmail(welcomeEvent, parsePreferences({ emailImportant: false })),
    false,
  );
  assert.equal(parsePreferences({ emailProduct: "true" }).emailProduct, false);
});
test("notification actions reject external and ambiguous URLs", () => {
  for (const url of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/\nevil",
    "javascript:alert(1)",
  ])
    assert.equal(safeNotificationHref(url), false);
  assert.equal(
    safeNotificationHref("/compare?country=portugal&country=spain"),
    true,
  );
});
test("welcome retries create one inbox item and one atomic email intent", async () => {
  const { api, writes } = storeHarness();
  const first = await api.publishNotification("user_A", welcomeEvent);
  const second = await api.publishNotification("user_A", welcomeEvent);
  assert.equal(first, second);
  assert.equal(writes.length, 2);
  assert.equal(writes[1].data.status, "awaiting_provider");
});
test("same event is isolated across users; foreign read and archive are denied", async () => {
  const { api, documents, writes } = storeHarness();
  const a = await api.publishNotification("user_A", welcomeEvent);
  const b = await api.publishNotification("user_B", welcomeEvent);
  assert.notEqual(a, b);
  const count = writes.length;
  assert.equal(await api.mutateNotification("user_B", a, "archive"), false);
  assert.equal(writes.length, count);
  await api.mutateNotification("user_A", a, "read");
  assert.ok(documents.get(`tgpiNotificationInbox/${a}`).data.readAt);
  await api.mutateNotification("user_A", a, "unread");
  assert.equal(documents.get(`tgpiNotificationInbox/${a}`).data.readAt, null);
});
test("email opt-out persists and prevents the outbox intent", async () => {
  const { api, writes } = storeHarness();
  await api.saveNotificationPreferences("user_A", { emailImportant: false });
  await api.publishNotification("user_A", welcomeEvent);
  assert.equal(
    writes.some((w) => w.path.startsWith("tgpiNotificationEmailOutbox")),
    false,
  );
});
test("billing messages distinguish failed payment, pending payment and cancellation", () => {
  assert.match(billingEvent("sub", "past_due", false).title, /attention/);
  assert.doesNotMatch(billingEvent("sub", "incomplete", false).title, /active/);
  assert.match(billingEvent("sub", "active", true).title, /cancellation/);
  assert.notEqual(
    billingEvent("sub", "active", false, "2026-11-01").key,
    billingEvent("sub", "active", false, "2026-12-01").key,
  );
});
