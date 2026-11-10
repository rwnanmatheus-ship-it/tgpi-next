import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createECDH, randomBytes } from "node:crypto";
import vm from "node:vm";
import ts from "typescript";
import * as model from "../src/lib/notifications/model.ts";
import * as paths from "../src/lib/notifications/paths.ts";
import * as policy from "../src/lib/notifications/push-policy.ts";
import * as text from "../src/lib/notifications/text.ts";
import * as config from "../src/lib/localization/config.ts";
const require = createRequire(import.meta.url);
const ec = createECDH("prime256v1");
ec.generateKeys();
const sub = (host = "fcm.googleapis.com", suffix = "device") => ({
  endpoint: `https://${host}/fcm/send/${suffix}`,
  keys: {
    p256dh: ec.getPublicKey().toString("base64url"),
    auth: randomBytes(16).toString("base64url"),
  },
});
const preferences = model.parsePreferences({ pushEnabled: true });
function harness() {
  const docs = new Map(),
    sent = [],
    errors = new Map();
  let serial = Promise.resolve();
  const firestore = {
    createFirestoreUpdateWrite: (path, data, condition) => ({
      path,
      data,
      condition,
    }),
    createFirestoreDeleteWrite: (path) => ({ path, delete: true }),
    getFirestoreDocument: async (path) => docs.get(path) || null,
    runFirestoreQuery: async () => [],
    runFirestoreTransaction: (build) => {
      const run = serial.then(async () => {
        const plan = await build({
          getDocuments: async (paths) =>
            new Map(paths.map((p) => [p, docs.get(p) || null])),
        });
        for (const w of plan.writes) {
          if (w.condition?.exists === false)
            assert.equal(docs.has(w.path), false);
          if (w.delete) docs.delete(w.path);
          else
            docs.set(w.path, {
              data: w.data,
              updateTime: String(Math.random()),
            });
        }
        return plan.result;
      });
      serial = run.catch(() => {});
      return run;
    },
  };
  const modules = new Map();
  function load(file) {
    if (modules.has(file)) return modules.get(file);
    const m = { exports: {} };
    const dep = (name) =>
      name === "server-only"
        ? {}
        : name === "node:crypto"
          ? require(name)
          : name === "@/lib/firestore-admin-rest.server"
            ? firestore
            : name === "./paths"
              ? paths
              : name === "./model"
                ? model
                : name === "./push-policy"
                  ? policy
                  : name === "./store.server"
                    ? { notificationsConfigured: () => true }
                    : name === "./text"
                      ? text
                      : name === "@/lib/localization/config"
                        ? config
                        : name === "@clerk/nextjs/server"
                          ? {
                              clerkClient: async () => ({
                                users: {
                                  getUser: async (uid) => {
                                    if (uid === "deleted")
                                      throw { status: 404 };
                                    return { id: uid };
                                  },
                                },
                              }),
                            }
                          : name === "web-push"
                            ? {
                                default: {
                                  sendNotification: async (
                                    subscription,
                                    payload,
                                  ) => {
                                    const error = errors.get(
                                      subscription.endpoint,
                                    );
                                    if (error) throw { statusCode: error };
                                    sent.push({
                                      endpoint: subscription.endpoint,
                                      payload: JSON.parse(payload),
                                    });
                                    return { statusCode: 201 };
                                  },
                                },
                              }
                            : require(name);
    vm.runInNewContext(
      ts.transpileModule(
        readFileSync(
          new URL(`../src/lib/notifications/${file}`, import.meta.url),
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
        module: m,
        exports: m.exports,
        require: dep,
        Buffer,
        console,
        URL,
        Intl,
        Date,
        process: {
          env: {
            TGPI_PUSH_VAPID_PRIVATE_KEY: "test-secret-key",
            TGPI_PUSH_VAPID_PUBLIC_KEY: "test-public-key",
            TGPI_FIREBASE_CLIENT_EMAIL: "test",
            TGPI_FIREBASE_PRIVATE_KEY: "test",
            TGPI_LEARNING_SECURITY_RULES_CONFIRMED: "true",
          },
        },
      },
    );
    modules.set(file, m.exports);
    return m.exports;
  }
  const api = load("push.server.ts");
  async function seed(uid = "user_A", id = "a".repeat(64), overrides = {}) {
    docs.set(paths.notificationItemPath(uid, id), {
      data: {
        ...model.welcomeEvent,
        id,
        uid,
        createdAt: new Date().toISOString(),
        readAt: null,
        archivedAt: null,
        ...overrides,
      },
    });
    docs.set(paths.notificationJobPath(id), {
      data: {
        uid,
        notificationId: id,
        status: "pending",
        attempts: 0,
        nextAttemptAt: 0,
        expiresAt: Date.now() + 86400000,
        createdAt: new Date().toISOString(),
        deliveredDevices: [],
      },
    });
    return id;
  }
  return { api, docs, sent, errors, seed, load };
}
test("push validation rejects arbitrary HTTPS hosts, credentials, nonstandard ports and malformed keys", () => {
  for (const endpoint of [
    "https://evil.example/send",
    "https://fcm.googleapis.com.evil.example/x",
    "http://fcm.googleapis.com/x",
    "https://fcm.googleapis.com:8443/x",
    "https://a:b@fcm.googleapis.com/x",
    "https://127.0.0.1/x",
  ])
    assert.equal(policy.allowedPushEndpoint(endpoint), false);
  for (const host of [
    "fcm.googleapis.com",
    "updates.push.services.mozilla.com",
    "web.push.apple.com",
    "wns2-bl2p.notify.windows.com",
  ])
    assert.equal(
      policy.parsePushSubscription(sub(host)).endpoint.includes(host),
      true,
    );
  assert.throws(() =>
    policy.parsePushSubscription({
      ...sub(),
      keys: { p256dh: "invalid", auth: "invalid" },
    }),
  );
});
test("preferences do not silently enable push and reject malformed timezones or limits", () => {
  assert.equal(
    model.parsePreferences({ pushEnabled: "true" }).pushEnabled,
    false,
  );
  assert.equal(
    model.parsePreferences({ timezone: "invalid/zone" }).timezone,
    "UTC",
  );
  assert.equal(model.parsePreferences({ dailyLimit: 999999 }).dailyLimit, 8);
  assert.equal(
    policy.pushCategoryEnabled(
      { ...model.welcomeEvent, category: "planning" },
      model.parsePreferences({ pushEnabled: true, pushPlanning: false }),
    ),
    false,
  );
});
test("quiet hours, pauses and DST determine the next allowed delivery instant", () => {
  const p = model.parsePreferences({
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
    timezone: "America/Sao_Paulo",
  });
  assert.equal(
    new Date(
      policy.nextPushTime(p, new Date("2026-11-10T02:00:00Z")),
    ).toISOString(),
    "2026-11-10T11:00:00.000Z",
  );
  assert.equal(policy.inQuietHours(p, new Date("2026-11-10T11:00:00Z")), false);
  const dst = model.parsePreferences({
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
    timezone: "America/New_York",
  });
  assert.equal(
    new Date(
      policy.nextPushTime(dst, new Date("2026-11-01T04:00:00Z")),
    ).toISOString(),
    "2026-11-01T13:00:00.000Z",
  );
  assert.equal(policy.retryPushAt(2, 0), 120000);
});
test("device secrets are encrypted at rest; owner isolation and device reassignment are enforced", async () => {
  const h = harness(),
    subscription = sub();
  const id = await h.api.registerPushDevice(
    "user_A",
    { subscription, enable: true, locale: "pt-BR" },
    "Windows",
  );
  const stored = h.docs.get(`${paths.notificationRoot}/devices/${id}`).data;
  assert.equal(JSON.stringify(stored).includes(subscription.endpoint), false);
  assert.equal(await h.api.removePushDevice("user_B", id), false);
  await h.api.registerPushDevice(
    "user_B",
    { subscription, enable: true },
    "Windows",
  );
  assert.equal((await h.api.getPushDevices("user_A")).length, 0);
  assert.equal((await h.api.getPushDevices("user_B")).length, 1);
  assert.equal(
    h.docs.get(paths.notificationUserPath("user_A")).data.deviceIds.length,
    0,
  );
});
test("concurrent workers claim a notification once and default push text protects message contents", async () => {
  const h = harness();
  await h.api.registerPushDevice(
    "user_A",
    { subscription: sub(), enable: true, locale: "pt-BR" },
    "Windows",
  );
  const id = await h.seed();
  await Promise.all([h.api.dispatchPushJob(id), h.api.dispatchPushJob(id)]);
  assert.equal(h.sent.length, 1);
  assert.equal(h.sent[0].payload.title, "TGPI");
  assert.match(h.sent[0].payload.body, /privada/);
  assert.equal(
    h.docs.get(paths.notificationJobPath(id)).data.status,
    "accepted",
  );
  assert.equal(
    h.docs.get(paths.notificationUserPath("user_A")).data.dailyCount,
    1,
  );
});
test("read, archived and opted-out notifications never leave the server", async () => {
  for (const changes of [
    { readAt: new Date().toISOString() },
    { archivedAt: new Date().toISOString() },
  ]) {
    const h = harness();
    await h.api.registerPushDevice(
      "user_A",
      { subscription: sub(), enable: true },
      "Windows",
    );
    const id = await h.seed("user_A", "b".repeat(64), changes);
    await h.api.dispatchPushJob(id);
    assert.equal(h.sent.length, 0);
  }
  const h = harness();
  await h.api.registerPushDevice(
    "user_A",
    { subscription: sub(), enable: true },
    "Windows",
  );
  h.docs.get(
    paths.notificationUserPath("user_A"),
  ).data.preferences.pushEnabled = false;
  const id = await h.seed();
  await h.api.dispatchPushJob(id);
  assert.equal(h.sent.length, 0);
});
test("a transient provider failure retries only undelivered devices and invalid endpoints are removed", async () => {
  const h = harness(),
    first = sub("fcm.googleapis.com", "first"),
    second = sub("fcm.googleapis.com", "second");
  await h.api.registerPushDevice(
    "user_A",
    { subscription: first, enable: true },
    "Windows",
  );
  await h.api.registerPushDevice(
    "user_A",
    { subscription: second, enable: true },
    "Android",
  );
  h.errors.set(second.endpoint, 503);
  const id = await h.seed();
  await h.api.dispatchPushJob(id);
  assert.equal(h.sent.length, 1);
  const job = h.docs.get(paths.notificationJobPath(id)).data;
  assert.equal(job.status, "retry");
  assert.equal(job.attempts, 1);
  job.nextAttemptAt = 0;
  h.errors.clear();
  await h.api.dispatchPushJob(id);
  assert.equal(h.sent.length, 2);
  assert.equal(h.sent.filter((s) => s.endpoint === first.endpoint).length, 1);
  h.errors.set(second.endpoint, 410);
  const next = await h.seed("user_A", "c".repeat(64));
  await h.api.dispatchPushJob(next);
  assert.equal((await h.api.getPushDevices("user_A")).length, 1);
});
test("quiet hours and daily caps defer jobs without claiming delivery", async () => {
  const h = harness();
  await h.api.registerPushDevice(
    "user_A",
    { subscription: sub(), enable: true },
    "Windows",
  );
  const state = h.docs.get(paths.notificationUserPath("user_A")).data;
  state.preferences.pausedUntil = new Date(Date.now() + 3600000).toISOString();
  const id = await h.seed();
  assert.equal(await h.api.dispatchPushJob(id), "deferred");
  assert.equal(h.sent.length, 0);
  state.preferences.pausedUntil = "";
  state.dailyDay = policy.pushLocalDay(state.preferences);
  state.dailyCount = 8;
  h.docs.get(paths.notificationJobPath(id)).data.nextAttemptAt = 0;
  assert.equal(await h.api.dispatchPushJob(id), "limited");
  assert.equal(h.sent.length, 0);
});
test("background resubscription does not turn a disabled channel back on", async () => {
  const h = harness(),
    subscription = sub();
  await h.api.registerPushDevice(
    "user_A",
    { subscription, enable: true },
    "Windows",
  );
  h.docs.get(
    paths.notificationUserPath("user_A"),
  ).data.preferences.pushEnabled = false;
  await h.api.registerPushDevice(
    "user_A",
    { subscription, enable: false },
    "Windows",
  );
  assert.equal(
    h.docs.get(paths.notificationUserPath("user_A")).data.preferences
      .pushEnabled,
    false,
  );
});
test("localized push and UI messages cover all six supported languages", () => {
  for (const locale of config.locales) {
    assert.ok(text.notificationText(locale, "privatePush"));
    assert.ok(text.notificationText(locale, "ios"));
    assert.ok(
      text.localizedNotification({ ...model.welcomeEvent }, locale).body,
    );
  }
});
test("service worker displays push and refuses external notification navigation", async () => {
  const handlers = {},
    shown = [],
    opened = [];
  const self = {
    location: { origin: "https://www.theglobalpolymath.com" },
    navigator: {},
    registration: { showNotification: async (...args) => shown.push(args) },
    clients: {
      matchAll: async () => [],
      openWindow: async (href) => opened.push(href),
    },
    addEventListener: (type, handler) => {
      (handlers[type] ||= []).push(handler);
    },
  };
  vm.runInNewContext(
    readFileSync(new URL("../public/sw.js", import.meta.url), "utf8"),
    { self, URL, Response, Number, console },
  );
  let done;
  handlers.push[0]({
    data: {
      json: () => ({
        title: "TGPI",
        body: "Test",
        href: "https://evil.example",
        id: "test",
      }),
    },
    waitUntil: (p) => (done = p),
  });
  await done;
  assert.equal(shown.length, 1);
  assert.equal(shown[0][1].data.href, "/notifications");
  handlers.notificationclick[0]({
    notification: { close() {}, data: { href: "//evil.example" } },
    waitUntil: (p) => (done = p),
  });
  await done;
  assert.equal(opened[0], "/notifications");
});
