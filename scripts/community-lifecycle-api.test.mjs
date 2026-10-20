import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const moduleUrl = (source) =>
  "data:text/javascript;base64," +
  Buffer.from(
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
  ).toString("base64");
const model = moduleUrl(fs.readFileSync("src/lib/community/model.ts", "utf8"));
let uid = "",
  admin = false,
  requests = 0,
  runs = 0;
globalThis.__lifecycleApi = {
  auth: async () => ({ userId: uid }),
  currentUser: async () =>
    uid ? { privateMetadata: { role: admin ? "admin" : "member" } } : null,
  after: () => {},
  privacyKey: () => "a".repeat(64),
  privacyStatus: async () => ({ job: null, ownedActive: [] }),
  requestCommunityErasure: async () => {
    requests++;
    return { state: "queued" };
  },
  runErasureJob: async () => {},
  lifecycleOperations: async () => ({ pendingSample: [] }),
  runCommunityMaintenance: async () => {
    runs++;
    return { processed: 1 };
  },
};
function route(file) {
  return import(
    moduleUrl(
      fs
        .readFileSync(file, "utf8")
        .replace(
          /import\s*\{([^}]+)\}\s*from\s*["'](?:@clerk\/nextjs\/server|next\/server|@\/lib\/community\/(?:lifecycle|privacy)\.server)["'];?/g,
          (_, names) => `const {${names}}=globalThis.__lifecycleApi;`,
        )
        .replace(/from ["']@\/lib\/community\/model["']/, `from '${model}'`),
    )
  );
}
const privacy = await route("src/app/api/community/privacy/route.ts"),
  operations = await route("src/app/api/community/operations/route.ts"),
  cron = await route("src/app/api/cron/community-maintenance/route.ts");
const request = (path, body, origin = "https://tgpi.test") =>
  new Request("https://tgpi.test" + path, {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
test("community privacy endpoints authenticate and enforce confirmation before queueing", async () => {
  assert.equal((await privacy.GET()).status, 401);
  uid = "user_test";
  assert.equal(
    (
      await privacy.POST(
        request(
          "/privacy",
          { confirmation: "ERASE MY COMMUNITY DATA" },
          "https://other.test",
        ),
      )
    ).status,
    403,
  );
  assert.equal(
    (await privacy.POST(request("/privacy", { confirmation: "wrong" }))).status,
    400,
  );
  assert.equal(
    (
      await privacy.POST(
        request("/privacy", { confirmation: "x".repeat(1500) }),
      )
    ).status,
    413,
  );
  assert.equal(requests, 0);
  assert.equal(
    (
      await privacy.POST(
        request("/privacy", { confirmation: "ERASE MY COMMUNITY DATA" }),
      )
    ).status,
    202,
  );
  assert.equal(requests, 1);
});
test("maintenance operations reject ordinary members and cross-origin administrators", async () => {
  admin = false;
  assert.equal((await operations.GET()).status, 403);
  assert.equal((await operations.POST(request("/operations", {}))).status, 403);
  admin = true;
  assert.equal(
    (await operations.POST(request("/operations", {}, "https://other.test")))
      .status,
    403,
  );
  assert.equal(runs, 0);
  assert.equal((await operations.GET()).status, 200);
  assert.equal((await operations.POST(request("/operations", {}))).status, 200);
  assert.equal(runs, 1);
});
test("scheduled maintenance requires a valid secret and production runtime", async () => {
  const previous = {
    secret: process.env.CRON_SECRET,
    env: process.env.VERCEL_ENV,
  };
  try {
    delete process.env.CRON_SECRET;
    assert.equal(
      (await cron.GET(new Request("https://tgpi.test/cron"))).status,
      401,
    );
    process.env.CRON_SECRET = "test-scheduler-secret";
    assert.equal(
      (
        await cron.GET(
          new Request("https://tgpi.test/cron", {
            headers: { authorization: "Bearer wrong" },
          }),
        )
      ).status,
      401,
    );
    const r = () =>
      new Request("https://tgpi.test/cron", {
        headers: { authorization: "Bearer test-scheduler-secret" },
      });
    process.env.VERCEL_ENV = "preview";
    assert.equal((await cron.GET(r())).status, 409);
    process.env.VERCEL_ENV = "production";
    assert.equal((await cron.GET(r())).status, 200);
    assert.equal(runs, 2);
  } finally {
    if (previous.secret === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previous.secret;
    if (previous.env === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previous.env;
  }
});
