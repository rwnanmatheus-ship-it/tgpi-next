import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const compile = (s) =>
  ts.transpileModule(s, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
const url = (s) =>
  "data:text/javascript;base64," + Buffer.from(compile(s)).toString("base64");
const modelUrl = url(fs.readFileSync("src/lib/community/model.ts", "utf8"));
const db = new Map();
let queue = Promise.resolve(),
  failQuery = false,
  failIdentity = false;
const identities = new Set();
globalThis.__lifecycle = {
  write: (path, data) => ({ path, data }),
  remove: (path) => ({ delete: path }),
  get: async (path) =>
    db.has(path) ? { data: structuredClone(db.get(path)) } : null,
  collections: async (path) => [
    ...new Set(
      [...db.keys()]
        .filter(
          (p) =>
            p.startsWith(path + "/") &&
            p.split("/").length > path.split("/").length + 1,
        )
        .map((p) => p.slice(path.length + 1).split("/")[0]),
    ),
  ],
  query: async (q, parent = "") => {
    if (failQuery) {
      failQuery = false;
      throw Error("Transient query failure");
    }
    const collection = q.from[0].collectionId,
      prefix = (parent ? parent + "/" : "") + collection + "/";
    let rows = [...db].filter(
      ([p]) =>
        p.startsWith(prefix) &&
        p.split("/").length === prefix.split("/").length,
    );
    const filter = q.where?.fieldFilter;
    if (filter)
      rows = rows.filter(([, d]) =>
        filter.op === "EQUAL"
          ? d[filter.field.fieldPath] === filter.value.stringValue
          : filter.value.arrayValue.values.some(
              (x) => x.stringValue === d[filter.field.fieldPath],
            ),
      );
    rows.sort(([a], [b]) => a.localeCompare(b));
    if (q.startAt)
      rows = rows.filter(
        ([p]) =>
          p > q.startAt.values.at(-1).referenceValue.split("/documents/")[1],
      );
    return rows.slice(0, q.limit || 25).map(([name, data]) => ({
      name: "projects/test/databases/(default)/documents/" + name,
      data: structuredClone(data),
    }));
  },
  transaction: (fn) => {
    const next = queue.then(async () => {
      const plan = await fn({
        getDocuments: async (paths) =>
          new Map(
            paths.map((p) => [
              p,
              db.has(p) ? { data: structuredClone(db.get(p)) } : null,
            ]),
          ),
      });
      const paths = plan.writes.map((w) => w.path || w.delete);
      assert.equal(
        new Set(paths).size,
        paths.length,
        "unique transaction writes",
      );
      for (const w of plan.writes)
        if (w.delete) db.delete(w.delete);
        else db.set(w.path, structuredClone(w.data));
      return plan.result;
    });
    queue = next.catch(() => {});
    return next;
  },
  clerkClient: async () => ({
    users: {
      getUser: async (uid) => {
        if (failIdentity)
          throw Object.assign(Error("Temporary outage"), { status: 503 });
        if (identities.has(uid)) return { id: uid };
        throw Object.assign(Error("User unavailable"), { status: 404 });
      },
    },
  }),
};
const privacyUrl = url(
  fs
    .readFileSync("src/lib/community/privacy.server.ts", "utf8")
    .replace(/import ['"]server-only['"];?/, "")
    .replace(
      /import\s*\{\s*getFirestoreDocument\s*\}\s*from ['"]@\/lib\/firestore-admin-rest.server['"];?/,
      "const getFirestoreDocument=globalThis.__lifecycle.get;",
    )
    .replace(/from ['"]\.\/model['"]/, `from '${modelUrl}'`),
);
const source = fs
  .readFileSync("src/lib/community/lifecycle.server.ts", "utf8")
  .replace(/import ['"]server-only['"];?/, "")
  .replace(
    /import\s*\{\s*clerkClient\s*\}\s*from ['"]@clerk\/nextjs\/server['"];?/,
    "const {clerkClient}=globalThis.__lifecycle;",
  )
  .replace(
    /import\s*\{\s*createFirestoreUpdateWrite[\s\S]*?from ['"]@\/lib\/firestore-admin-rest.server['"];?/,
    "const {write,remove,get,collections,query,transaction}=globalThis.__lifecycle;",
  )
  .replace(/from ['"]\.\/model['"]/, `from '${modelUrl}'`)
  .replace(/from ['"]\.\/privacy.server['"]/, `from '${privacyUrl}'`)
  .replace(
    /import\s*\{\s*googleStorage\s*\}\s*from ['"]\.\/google.server['"];?/,
    'const googleStorage=async()=>{throw Error("Unexpected GCS call");};',
  );
const lifecycle = await import(url(source)),
  privacy = await import(privacyUrl);
process.env.TGPI_FIREBASE_PRIVATE_KEY = "unit-test-private-key";
process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED = "true";
process.env.TGPI_FIREBASE_PROJECT_ID = "test";
const root = "tgpiLearningUsers/_community",
  uid = "user_target",
  other = "user_other",
  cp = root + "/communities/test-circle",
  now = new Date().toISOString(),
  old = new Date(Date.now() - 100 * 86400000).toISOString();
function seed() {
  db.clear();
  identities.clear();
  identities.add(uid);
  identities.add(other);
  db.set(cp, {
    id: "test-circle",
    name: "Test circle",
    owner: other,
    memberCount: 2,
    archived: false,
    visibility: "private",
    admission: "approval",
    rules: "Respect privacy.",
    rulesVersion: 1,
    transferTo: "",
    createdAt: now,
    updatedAt: now,
  });
  for (const id of [uid, other]) {
    db.set(cp + "/members/" + id, {
      uid: id,
      state: "active",
      role: id === other ? "owner" : "member",
      acceptedVersion: 1,
      answers: "Personal entry answers",
      updatedAt: now,
      reason: "",
    });
    db.set(root + "/people/" + id + "/memberships/test-circle", {
      community: "test-circle",
      state: "active",
      updatedAt: now,
    });
  }
  db.set(cp + "/posts/own-post", {
    id: "own-post",
    author: uid,
    authorName: "Target name",
    authorImage: "https://example.com/personal-avatar.png",
    handle: "personal-handle",
    handle: "target",
    body: "Personal content",
    title: "Personal title",
    removed: false,
    createdAt: now,
    updatedAt: now,
    attachments: [{ id: "own-photo", alt: "Personal photo" }],
  });
  db.set(cp + "/posts/other-post", {
    id: "other-post",
    author: other,
    authorName: "Other member",
    body: "Keep this knowledge",
    title: "Other title",
    removed: false,
    helpfulCount: 1,
    accepted: "own-reply",
    createdAt: now,
    updatedAt: now,
  });
  db.set(cp + "/posts/other-post/comments/own-reply", {
    id: "own-reply",
    author: uid,
    authorName: "Target name",
    authorImage: "https://example.com/personal-avatar.png",
    handle: "personal-handle",
    body: "Personal reply",
    attachments: [{ id: "message-photo", alt: "Personal image" }],
    removed: false,
    createdAt: now,
    updatedAt: now,
  });
  db.set(cp + "/posts/other-post/comments/other-reply", {
    id: "other-reply",
    author: other,
    body: "Keep this reply",
    removed: false,
    createdAt: now,
    updatedAt: now,
  });
  db.set(cp + "/posts/other-post/reactions/" + uid, { uid, helpful: true });
  db.set(cp + "/assets/own-photo", {
    owner: uid,
    kind: "post",
    post: "own-post",
    ciphertext: "encrypted-personal-photo",
    createdAt: now,
  });
  db.set(cp + "/assets/message-photo", {
    owner: uid,
    kind: "comment",
    post: "other-post",
    comment: "own-reply",
    ciphertext: "encrypted-message-photo",
    createdAt: old,
  });
  db.set(cp + "/sessions/test-session", {
    id: "test-session",
    title: "Keep community session",
    createdBy: other,
    attendeeCount: 1,
    createdAt: now,
  });
  db.set(cp + "/sessions/test-session/attendees/" + uid, { attending: true });
  db.set(cp + "/audit/test-audit", {
    actor: uid,
    target: "own-post",
    action: "post",
    reason: "Personal context",
    createdAt: now,
  });
  db.set(cp + "/playbooks/own-guide", { editor: uid, title: "Personal guide" });
  db.set(root + "/people/" + uid + "/preferences/current", {
    interests: ["Portugal"],
  });
  db.set(root + "/saved/" + uid + "/items/one", { saved: true });
  db.set(root + "/creation/" + uid, { count: 5 });
  db.set("tgpiNotificationInbox/community", {
    uid,
    key: "community:opaque",
    createdAt: now,
  });
  db.set("tgpiNotificationInbox/billing", {
    uid,
    key: "billing:keep",
    createdAt: now,
  });
}
async function finish(budget = 2) {
  for (let i = 0; i < 100; i++) {
    const j = db.get(privacy.privacyPath(uid));
    if (j?.state === "complete") return;
    await lifecycle.runErasureJob(privacy.privacyKey(uid), budget);
  }
  throw Error("Job did not finish");
}
test("community lifecycle privacy and retention", async (t) => {
  await t.test(
    "requires ownership transfer or archive before self removal",
    async () => {
      seed();
      db.set(cp, { ...db.get(cp), owner: uid });
      await assert.rejects(
        lifecycle.requestCommunityErasure(uid),
        /Transfer ownership/,
      );
      assert.equal(db.has(privacy.privacyPath(uid)), false);
    },
  );
  await t.test(
    "queues once and immediately closes authored-content access",
    async () => {
      seed();
      await Promise.all([
        lifecycle.requestCommunityErasure(uid),
        lifecycle.requestCommunityErasure(uid),
      ]);
      assert.equal((await lifecycle.privacyStatus(uid)).job.state, "queued");
      assert.equal(await privacy.authorAvailable(uid), false);
      await assert.rejects(privacy.assertCommunityAvailable(uid), /removal/);
    },
  );
  await t.test(
    "resumes small batches and removes only the selected member data",
    async () => {
      await finish(1);
      assert.equal(db.get(privacy.privacyPath(uid)).state, "complete");
      assert.equal(db.get(privacy.privacyPath(uid)).targetUid, "");
      assert.equal(db.get(cp).memberCount, 1);
      assert.equal(db.has(cp + "/members/" + uid), false);
      assert.equal(db.get(cp + "/posts/own-post").body, "");
      assert.equal(db.get(cp + "/posts/own-post").author, "deleted");
      assert.equal(
        db.get(cp + "/posts/other-post").body,
        "Keep this knowledge",
      );
      assert.equal(db.get(cp + "/posts/other-post").accepted, "");
      assert.equal(db.get(cp + "/posts/other-post").helpfulCount, 0);
      assert.equal(
        db.get(cp + "/posts/other-post/comments/own-reply").body,
        "",
      );
      assert.equal(
        db.get(cp + "/posts/other-post/comments/other-reply").body,
        "Keep this reply",
      );
      assert.equal(db.has(cp + "/assets/own-photo"), false);
      assert.equal(db.has(cp + "/assets/message-photo"), false);
      const reply = db.get(cp + "/posts/other-post/comments/own-reply");
      assert.deepEqual(reply.attachments, []);
      assert.equal(reply.authorImage, "");
      assert.equal(reply.handle, "");
      assert.equal(db.get(cp + "/posts/own-post").authorImage, "");
      assert.equal(
        db.has(root + "/people/" + uid + "/preferences/current"),
        false,
      );
      assert.equal(db.has(root + "/saved/" + uid + "/items/one"), false);
      assert.equal(db.get(root + "/trust/" + privacy.privacyKey(uid)).count, 5);
      assert.equal(db.has("tgpiNotificationInbox/community"), false);
      assert.equal(db.has("tgpiNotificationInbox/billing"), true);
      assert.ok(db.get(cp + "/audit/test-audit").actor.startsWith("retained-"));
      assert.equal(db.get(cp + "/sessions/test-session").attendeeCount, 0);
    },
  );
  await t.test(
    "concurrent workers cannot double decrement participation",
    async () => {
      seed();
      await lifecycle.requestCommunityErasure(uid);
      await Promise.all([
        lifecycle.runErasureJob(privacy.privacyKey(uid), 5),
        lifecycle.runErasureJob(privacy.privacyKey(uid), 5),
      ]);
      await finish();
      assert.equal(db.get(cp).memberCount, 1);
    },
  );
  await t.test(
    "storage failure records durable retry and does not lose cursor",
    async () => {
      seed();
      await lifecycle.requestCommunityErasure(uid);
      failQuery = true;
      await assert.rejects(
        lifecycle.runErasureJob(privacy.privacyKey(uid), 5),
        /Transient/,
      );
      const j = db.get(privacy.privacyPath(uid));
      assert.equal(j.state, "queued");
      assert.ok(j.lastError);
      assert.equal(j.processed, 0);
      db.set(privacy.privacyPath(uid), { ...j, nextAttemptAt: 0 });
      await finish();
      assert.equal(db.get(cp).memberCount, 1);
    },
  );
  await t.test(
    "bans survive removal without keeping the membership profile",
    async () => {
      seed();
      db.set(cp + "/members/" + uid, {
        ...db.get(cp + "/members/" + uid),
        state: "banned",
      });
      db.set(cp, { ...db.get(cp), memberCount: 1 });
      await lifecycle.requestCommunityErasure(uid);
      await finish();
      assert.equal(
        db.get(cp + "/restrictions/" + privacy.privacyKey(uid)).state,
        "banned",
      );
      assert.equal(db.get(cp).memberCount, 1);
    },
  );
  await t.test(
    "deleted Clerk owner is archived and cannot keep a live owner identity",
    async () => {
      seed();
      db.set(cp, { ...db.get(cp), owner: uid });
      await lifecycle.requestCommunityErasure(uid, true);
      assert.equal(db.get(cp).archived, true);
      await finish();
      assert.equal(db.get(cp).owner, "deleted");
      assert.equal(db.get(cp).visibility, "hidden");
      assert.equal(db.get(cp).name, "Archived community");
      assert.equal(await privacy.authorAvailable(uid), false);
    },
  );
  await t.test(
    "retention keeps attached images and pending reports",
    async () => {
      seed();
      db.set(cp + "/assets/own-photo", {
        ...db.get(cp + "/assets/own-photo"),
        createdAt: old,
      });
      db.set(cp + "/assets/orphan", {
        owner: uid,
        kind: "post",
        post: "missing-post",
        ciphertext: "old-orphan",
        createdAt: old,
      });
      db.set(cp + "/reports/pending", {
        status: "pending",
        createdAt: old,
        reason: "Preserve review",
      });
      db.set(cp + "/reports/reviewed", {
        status: "reviewed",
        createdAt: old,
        reviewedAt: old,
      });
      db.set(cp + "/invites/expired", { expiresAt: old });
      db.set(root + "/drafts/" + uid, { updatedAt: old, body: "Old draft" });
      for (let i = 0; i < 8; i++) {
        const result = await lifecycle.runCommunityMaintenance(40);
        if (result.cycleComplete) break;
      }
      assert.ok(db.has(cp + "/assets/own-photo"));
      assert.equal(db.has(cp + "/assets/orphan"), false);
      assert.ok(db.has(cp + "/reports/pending"));
      assert.equal(db.has(cp + "/reports/reviewed"), false);
      assert.equal(db.has(cp + "/invites/expired"), false);
      assert.equal(db.has(root + "/drafts/" + uid), false);
    },
  );
  await t.test(
    "retention preserves photos attached to community messages",
    async () => {
      seed();
      for (let i = 0; i < 8; i++) {
        const result = await lifecycle.runCommunityMaintenance(40);
        if (result.cycleComplete) break;
      }
      assert.equal(db.has(cp + "/assets/message-photo"), true);
      db.set(cp + "/posts/other-post/comments/own-reply", {
        ...db.get(cp + "/posts/other-post/comments/own-reply"),
        removed: true,
      });
      for (let i = 0; i < 8; i++) {
        const result = await lifecycle.runCommunityMaintenance(40);
        if (result.cycleComplete) break;
      }
      assert.equal(db.has(cp + "/assets/message-photo"), false);
    },
  );
  await t.test(
    "retention purges descendants of old removed threads",
    async () => {
      seed();
      db.set(cp + "/posts/own-post", {
        ...db.get(cp + "/posts/own-post"),
        removed: true,
        body: "",
        updatedAt: old,
      });
      db.set(cp + "/posts/own-post/comments/nested", {
        author: other,
        body: "Old removed thread reply",
        createdAt: old,
      });
      for (let i = 0; i < 8; i++) {
        const result = await lifecycle.runCommunityMaintenance(40);
        if (result.cycleComplete) break;
      }
      assert.equal(db.has(cp + "/posts/own-post"), false);
      assert.equal(db.has(cp + "/posts/own-post/comments/nested"), false);
      assert.ok(db.has(cp + "/posts/other-post"));
    },
  );
  await t.test(
    "temporary identity failure cannot remove a live member",
    async () => {
      seed();
      failIdentity = true;
      try {
        await lifecycle.runCommunityMaintenance(80);
      } finally {
        failIdentity = false;
      }
      assert.equal(db.has(privacy.privacyPath(uid)), false);
      assert.equal(db.get(cp).archived, false);
    },
  );
  await t.test("missing identity triggers removal", async () => {
    seed();
    identities.delete(uid);
    await lifecycle.runCommunityMaintenance(80);
    assert.ok(db.has(privacy.privacyPath(uid)));
    assert.equal(db.get(privacy.privacyPath(uid)).accountDeleted, true);
  });
});
