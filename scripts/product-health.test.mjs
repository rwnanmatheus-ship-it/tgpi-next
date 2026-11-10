import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

function load(path, dependencies, environment = {}) {
  const source = readFileSync(new URL(`../src/lib/${path}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  const require = (id) => {
    assert.ok(Object.hasOwn(dependencies, id), `Unexpected dependency ${id}`);
    return dependencies[id];
  };
  new Function("exports", "require", "process", "console", outputText)(
    exports, require, { env: environment }, { warn() {} },
  );
  return exports;
}

function fixture({ userId = "user_admin", role = "admin", storageFailure, matchesOffer = true, live = true, ...env } = {}) {
  const calls = [];
  const { requireAdmin } = load("auth/guards.ts", {
    "server-only": {},
    "node:crypto": {},
    "next/navigation": {
      notFound: () => { throw new Error("not-found"); },
      redirect: (path) => { throw new Error(path); },
    },
    "@/lib/billing.server": {},
    "@/lib/premium-access.server": {},
    "@/lib/account-profile": {},
    "@clerk/nextjs/server": {
      auth: async () => ({ userId }),
      clerkClient: async () => ({
        users: { getUser: async () => ({ privateMetadata: { role }, unsafeMetadata: { role: "admin" } }) },
      }),
    },
  });

  const { getProductHealth } = load("admin/product-health.server.ts", {
    "server-only": {},
    "@/lib/auth/guards": { requireAdmin },
    "@/lib/atlas/http.server": { requireAtlasGeneration: (uid) => calls.push(uid) },
    "@/lib/commercial-offer": { matchesPremiumOffer: () => matchesOffer },
    "@/lib/credential-signing.server": { getCredentialIssuerPublicKey: () => ({ x: "unused-proof-key" }) },
    "@/lib/firestore-admin-rest.server": {
      isLearningStorageConfigured: () => true,
      isFirestoreQuotaError: (error) => error.code === "RESOURCE_EXHAUSTED",
      getFirestoreDocuments: async (paths, transaction, signal) => {
        calls.push("firestore");
        assert.deepEqual(paths, ["tgpiOpsDiagnostics/read-probe"]);
        assert.equal(transaction, undefined);
        assert.ok(signal instanceof AbortSignal);
        if (storageFailure) throw storageFailure;
        return new Map([[paths[0], null]]);
      },
    },
    "@/lib/global-key-anchor.server": { isBaseMainnetAnchorConfigured: () => true },
    "@/lib/notifications/push.server": { pushConfigured: () => true },
    "@/lib/stripe": {
      TGPI_PREMIUM_PRICE_ID: "price_fixture",
      getStripeServer: () => ({
        prices: { retrieve: async (price, params, options) => {
          calls.push("stripe");
          assert.equal(price, "price_fixture");
          assert.deepEqual(params, {});
          assert.deepEqual(options, { timeout: 4000, maxNetworkRetries: 0 });
          return { livemode: live };
        } },
      }),
    },
  }, { STRIPE_SECRET_KEY: "fixture", STRIPE_WEBHOOK_SECRET: "fixture", CRON_SECRET: "fixture", VERCEL_ENV: "production", ...env });
  return { getProductHealth, calls };
}

test("signed-out and ordinary accounts cannot start diagnostics, including spoofed editable roles", async () => {
  for (const [options, expected] of [[{ userId: null }, /sign-in/], [{ role: "member" }, /not-found/]]) {
    const { getProductHealth, calls } = fixture(options);
    await assert.rejects(getProductHealth(), expected);
    assert.deepEqual(calls, []);
  }
});

test("verified reads and local configuration checks have distinct states", async () => {
  const { getProductHealth, calls } = fixture();
  const report = await getProductHealth();
  assert.equal(report.environment, "Produção");
  assert.ok(Number.isFinite(Date.parse(report.checkedAt)));
  assert.deepEqual(Object.fromEntries(report.checks.map(({ id, state }) => [id, state])), {
    access: "verified", storage: "verified", billing: "verified", credentials: "verified",
    atlas: "configured", notifications: "configured", integrity: "configured",
  });
  assert.deepEqual(calls.sort(), ["firestore", "stripe", "user_admin"]);
  assert.doesNotMatch(JSON.stringify(report), /user_admin|unused-proof-key|price_fixture/);
});

test("quota and timeout failures remain isolated and redact provider messages", async () => {
  for (const storageFailure of [
    Object.assign(new Error("sensitive provider details"), { code: "RESOURCE_EXHAUSTED" }),
    new DOMException("sensitive provider details", "TimeoutError"),
  ]) {
    const { getProductHealth } = fixture({ storageFailure, live: false });
    const report = await getProductHealth();
    assert.equal(report.checks.find(({ id }) => id === "storage").state, "failed");
    assert.equal(report.checks.find(({ id }) => id === "billing").state, "attention");
    assert.equal(report.checks.find(({ id }) => id === "credentials").state, "verified");
    assert.doesNotMatch(JSON.stringify(report), /sensitive provider details/);
  }
});

test("a missing webhook secret or mismatched offer requires attention even when Stripe responds", async () => {
  for (const options of [{ STRIPE_WEBHOOK_SECRET: "" }, { matchesOffer: false }]) {
    const { getProductHealth } = fixture(options);
    const { checks } = await getProductHealth();
    assert.equal(checks.find(({ id }) => id === "billing").state, "attention");
  }
});
