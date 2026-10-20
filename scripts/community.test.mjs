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
const dataUrl = (s) =>
  `data:text/javascript;base64,${Buffer.from(s).toString("base64")}`;
const modelUrl = dataUrl(
    compile(fs.readFileSync("src/lib/community/model.ts", "utf8")),
  ),
  model = await import(modelUrl);
const db = new Map();
let queue = Promise.resolve();
globalThis.__communityTest = {
  write: (path, data) => ({ path, data }),
  get: async (path) =>
    db.has(path) ? { data: structuredClone(db.get(path)) } : null,
  query: async (q, parent) => {
    const prefix = `${parent}/${q.from[0].collectionId}/`;
    const chronological = q.orderBy.length === 2;
    let rows = [...db]
      .filter(
        ([p]) =>
          p.startsWith(prefix) &&
          p.split("/").length === parent.split("/").length + 2,
      )
      .sort(([a, av], [b, bv]) =>
        chronological
          ? bv.createdAt.localeCompare(av.createdAt) || b.localeCompare(a)
          : a.localeCompare(b),
      );
    if (q.startAt) {
      const values = q.startAt.values,
        p = values.at(-1).referenceValue.split("/documents/")[1];
      rows = rows.filter(([name, v]) =>
        chronological
          ? v.createdAt < values[0].stringValue ||
            (v.createdAt === values[0].stringValue && name < p)
          : name > p,
      );
    }
    if (q.where) {
      const f = q.where.fieldFilter;
      rows = rows.filter(
        ([, v]) =>
          Array.isArray(v[f.field.fieldPath]) &&
          v[f.field.fieldPath].includes(f.value.stringValue),
      );
    }
    return rows
      .slice(0, q.limit)
      .map(([name, data]) => ({ name, data: structuredClone(data) }));
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
      const paths = plan.writes.map((w) => w.path);
      assert.equal(
        new Set(paths).size,
        paths.length,
        "transaction writes must have unique paths",
      );
      for (const w of plan.writes) db.set(w.path, structuredClone(w.data));
      return plan.result;
    });
    queue = next.catch(() => {});
    return next;
  },
};
const featuresUrl = dataUrl(
  compile(
    fs
      .readFileSync("src/lib/community/features.ts", "utf8")
      .replace(/from ["']\.\/model["']/, `from '${modelUrl}'`),
  ),
);
const source = fs
  .readFileSync("src/lib/community/store.server.ts", "utf8")
  .replace(
    /import\s*\{\s*getCourse\s*\}\s*from ["']@\/data\/courses["'];/,
    'const getCourse=id=>id==="global-english-2026"?{id}:null;',
  )
  .replace(/import ["']server-only["'];?/, "")
  .replace(
    /import\s*\{\s*createFirestoreUpdateWrite[\s\S]*?from ["']@\/lib\/firestore-admin-rest.server["'];/,
    "const {write,get,query,transaction}=globalThis.__communityTest;",
  )
  .replace(/from ["']\.\/model["']/, `from '${modelUrl}'`)
  .replace(/from ["']\.\/features["']/, `from '${featuresUrl}'`)
  .replace(
    /import\s*\{\s*resolveMember\s*\}\s*from ["']@\/lib\/members\/identity.server["'];/,
    "const resolveMember=async()=>null;",
  );
const store = await import(dataUrl(compile(source)));
process.env.TGPI_FIREBASE_CLIENT_EMAIL = "test";
process.env.TGPI_FIREBASE_PRIVATE_KEY = "test";
process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED = "true";
process.env.TGPI_NOTIFICATIONS_SECURITY_RULES_CONFIRMED = "true";
const owner = {
    uid: "user_owner",
    name: "Owner",
    handle: "owner",
    admin: false,
  },
  member = {
    uid: "user_member",
    name: "Member",
    handle: "member",
    admin: false,
  },
  other = { uid: "user_other", name: "Other", handle: "other", admin: false };
const cp = (id) => `tgpiLearningUsers/_community/communities/${id}`;
const act = (a, id, action, input = {}) =>
  store.mutate(a, { community: id, action, ...input });
const create = (id, visibility = "public", admission = "instant") =>
  act(owner, id, "create", {
    name: "Global circle",
    description: "Useful international experiences",
    language: "English",
    theme: "Life abroad",
    rules: model.defaultRules,
    visibility,
    admission,
  });
test("community server workflows with isolated transactional persistence", async (t) => {
  await t.test("visibility separate from admission", () => {
    assert.deepEqual(model.validateAccess("private", "instant"), {
      visibility: "private",
      admission: "instant",
    });
    assert.throws(() => model.validateAccess("hidden", "instant"));
  });
  await t.test("unique community creation", async () => {
    await create("public-circle");
    await assert.rejects(create("public-circle"), /taken/);
    assert.equal(db.get(cp("public-circle")).memberCount, 1);
  });
  await t.test("exact rules acceptance and duplicate join", async () => {
    await assert.rejects(act(member, "public-circle", "join"), /current rules/);
    await Promise.all([
      act(member, "public-circle", "join", { acceptedVersion: 1 }),
      act(member, "public-circle", "join", { acceptedVersion: 1 }),
    ]);
    assert.equal(db.get(cp("public-circle")).memberCount, 2);
  });
  await t.test("participation pointer exposes own communities", async () => {
    assert.equal((await store.mine(member.uid)).items[0].id, "public-circle");
  });
  await t.test("non-member cannot post or self-promote", async () => {
    await assert.rejects(
      act(other, "public-circle", "post", {
        id: "post-one",
        kind: "question",
        title: "Help",
        body: "Context",
      }),
      /membership/,
    );
    await assert.rejects(
      act(member, "public-circle", "promote", { target: member.uid }),
      /permission/,
    );
  });
  await t.test("pending private request cannot read posts", async () => {
    await create("private-circle", "private", "approval");
    await act(member, "private-circle", "join", { acceptedVersion: 1 });
    const d = await store.detail("private-circle", member.uid);
    assert.equal(d.membership.state, "pending");
    assert.deepEqual(d.posts, []);
    assert.equal(d.community.owner, "");
    assert.equal(model.canRead(d.community, d.membership), false);
  });
  await t.test("approval grants access once", async () => {
    await act(owner, "private-circle", "approve", { target: member.uid });
    await assert.rejects(
      act(owner, "private-circle", "approve", { target: member.uid }),
      /no longer pending/,
    );
    assert.equal(db.get(cp("private-circle")).memberCount, 2);
  });
  await t.test("request cancel and refusal", async () => {
    await act(other, "private-circle", "join", { acceptedVersion: 1 });
    await act(other, "private-circle", "cancel");
    assert.equal(
      (await store.detail("private-circle", other.uid)).membership.state,
      "left",
    );
    await act(other, "private-circle", "join", { acceptedVersion: 1 });
    await act(owner, "private-circle", "decline", {
      target: other.uid,
      reason: "Not within this group topic.",
    });
    assert.equal(
      (await store.detail("private-circle", other.uid)).membership.state,
      "declined",
    );
  });
  await t.test("post creation retries are idempotent", async () => {
    const data = {
      id: "question-one",
      kind: "question",
      title: "How to settle in?",
      body: "Personal experiences welcome.",
      source: "https://example.org",
    };
    await act(member, "private-circle", "post", data);
    await act(member, "private-circle", "post", data);
    assert.equal(
      (await store.detail("private-circle", member.uid)).posts.length,
      1,
    );
  });
  await t.test("replies and answer acceptance", async () => {
    await act(owner, "private-circle", "comment", {
      post: "question-one",
      id: "comment-one",
      body: "My experience.",
    });
    await act(member, "private-circle", "accept", {
      post: "question-one",
      comment: "comment-one",
    });
    assert.equal(
      (await store.detail("private-circle", member.uid)).posts[0].accepted,
      "comment-one",
    );
  });
  await t.test("persistent saved state", async () => {
    await act(member, "private-circle", "save", {
      post: "question-one",
      saved: true,
    });
    assert.equal((await store.saved(member.uid)).items.length, 1);
    assert.equal(
      (await store.detail("private-circle", member.uid)).posts[0].saved,
      true,
    );
  });
  await t.test("only author edits publication", async () => {
    await assert.rejects(
      act(owner, "private-circle", "edit", {
        post: "question-one",
        title: "Overwrite",
        body: "Overwrite",
      }),
      /Only the author/,
    );
    await act(member, "private-circle", "edit", {
      post: "question-one",
      title: "Updated question",
      body: "More context",
    });
  });
  await t.test("report queue and moderator decision", async () => {
    await act(member, "private-circle", "report", {
      post: "question-one",
      reason: "Privacy concern",
    });
    const r = (await store.management("private-circle", owner.uid, "reports"))
      .items[0];
    await act(owner, "private-circle", "resolve-report", {
      report: r.id,
      reason: "Reviewed; no personal data found.",
    });
    assert.equal(
      (await store.management("private-circle", owner.uid, "reports")).items[0]
        .status,
      "reviewed",
    );
  });
  await t.test("members cannot access moderator queue", async () => {
    await assert.rejects(
      store.management("private-circle", member.uid),
      /permission/,
    );
  });
  await t.test(
    "accepted reply deletion clears accepted-answer pointer",
    async () => {
      await act(owner, "private-circle", "delete-comment", {
        post: "question-one",
        comment: "comment-one",
      });
      assert.equal(
        (await store.detail("private-circle", member.uid)).posts[0].accepted,
        "",
      );
      assert.equal(
        (await store.comments("private-circle", "question-one", member.uid))
          .items.length,
        0,
      );
    },
  );
  await t.test("rule version update requires new acceptance", async () => {
    await act(owner, "private-circle", "rules", {
      rules: "1. Respect people.\n2. Include dated sources.",
    });
    await assert.rejects(
      act(member, "private-circle", "post", {
        id: "post-two",
        kind: "discussion",
        title: "Hello",
        body: "Hi",
      }),
      /current rules/,
    );
    await act(member, "private-circle", "accept-rules", { acceptedVersion: 2 });
  });
  await t.test("ban revokes posts, comments, saved and reentry", async () => {
    await act(owner, "private-circle", "ban", {
      target: member.uid,
      reason: "Repeated privacy violation.",
    });
    assert.deepEqual(
      (await store.detail("private-circle", member.uid)).posts,
      [],
    );
    assert.equal((await store.saved(member.uid)).items.length, 0);
    await assert.rejects(
      store.comments("private-circle", "question-one", member.uid),
      /Membership/,
    );
    await assert.rejects(
      act(member, "private-circle", "join", { acceptedVersion: 2 }),
      /unavailable/,
    );
  });
  await t.test("hidden community not discoverable or enumerable", async () => {
    await create("hidden-circle", "hidden", "invite");
    assert.equal(
      (await store.discover(other.uid)).items.some(
        (x) => x.id === "hidden-circle",
      ),
      false,
    );
    await assert.rejects(
      store.detail("hidden-circle", other.uid),
      /unavailable/,
    );
  });
  await t.test("single-use invitation hashed, atomic and usable", async () => {
    const i = await act(owner, "hidden-circle", "invite");
    assert.equal(i.token.length, 64);
    assert.equal(JSON.stringify([...db.values()]).includes(i.token), false);
    assert.equal(
      (await store.detail("hidden-circle", member.uid, "", i.token)).community
        .id,
      "hidden-circle",
    );
    await act(member, "hidden-circle", "redeem", {
      token: i.token,
      acceptedVersion: 1,
    });
    await assert.rejects(
      act(other, "hidden-circle", "redeem", {
        token: i.token,
        acceptedVersion: 1,
      }),
      /unavailable/,
    );
  });
  await t.test(
    "existing member keeps access after consuming a single-use invite",
    async () => {
      const oldToken = "f".repeat(64);
      const d = await store.detail("hidden-circle", member.uid, "", oldToken);
      assert.equal(d.membership.state, "active");
    },
  );
  await t.test("revoked invite rejected", async () => {
    const i = await act(owner, "hidden-circle", "invite");
    const r = (
      await store.management("hidden-circle", owner.uid, "invites")
    ).items.find((x) => !x.uses);
    await act(owner, "hidden-circle", "revoke", { invite: r.id });
    await assert.rejects(
      act(other, "hidden-circle", "redeem", {
        token: i.token,
        acceptedVersion: 1,
      }),
      /unavailable/,
    );
  });
  await t.test("expired invite rejected", async () => {
    const i = await act(owner, "hidden-circle", "invite");
    const r = (
      await store.management("hidden-circle", owner.uid, "invites")
    ).items.find((x) => !x.revoked && !x.uses);
    db.get(`${cp("hidden-circle")}/invites/${r.id}`).expiresAt =
      "2000-01-01T00:00:00Z";
    await assert.rejects(
      act(other, "hidden-circle", "redeem", {
        token: i.token,
        acceptedVersion: 1,
      }),
      /unavailable/,
    );
  });
  await t.test(
    "last owner cannot leave; transfer needs recipient acceptance",
    async () => {
      await assert.rejects(
        act(owner, "public-circle", "leave"),
        /Transfer ownership/,
      );
      await act(owner, "public-circle", "transfer", { target: member.uid });
      assert.equal(db.get(cp("public-circle")).owner, owner.uid);
      await assert.rejects(
        act(other, "public-circle", "accept-transfer"),
        /No ownership/,
      );
      await act(member, "public-circle", "accept-transfer");
      assert.equal(db.get(cp("public-circle")).owner, member.uid);
      await act(owner, "public-circle", "leave");
      assert.equal(db.get(cp("public-circle")).memberCount, 1);
    },
  );
  await t.test("sessions and duplicate RSVP preserve capacity", async () => {
    await act(member, "public-circle", "create-event", {
      id: "session-one",
      title: "Global conversation",
      description: "An exchange of experiences.",
      startsAt: new Date(Date.now() + 86400000).toISOString(),
      timeZone: "America/Sao_Paulo",
      capacity: 1,
      url: "https://example.org/meeting",
    });
    await Promise.all([
      act(member, "public-circle", "rsvp", {
        event: "session-one",
        attending: true,
      }),
      act(member, "public-circle", "rsvp", {
        event: "session-one",
        attending: true,
      }),
    ]);
    const e = (await store.sessions("public-circle", member.uid)).items[0];
    assert.equal(e.attendeeCount, 1);
    assert.equal(e.attending, true);
    assert.equal((await store.sessions("public-circle", "")).items[0].url, "");
    await act(member, "public-circle", "rsvp", {
      event: "session-one",
      attending: false,
    });
    assert.equal(
      (await store.sessions("public-circle", member.uid)).items[0]
        .attendeeCount,
      0,
    );
  });
  await t.test("draft is persistent and grants no membership", async () => {
    await act(other, "draft", "draft", {
      name: "Draft circle",
      community: "new-circle",
    });
    assert.equal((await store.draft(other.uid)).name, "Draft circle");
    assert.equal(db.has(cp("new-circle")), false);
  });
  await t.test("dangerous URLs and identifiers rejected", () => {
    for (const v of [
      "javascript:alert(1)",
      "data:text/html,hi",
      "https://user:pass@example.org",
    ])
      assert.throws(() => model.sourceUrl(v));
    for (const v of ["../secret", "hello/world", "UPPER"])
      assert.throws(() => model.identifier(v));
  });
  await t.test("notification text does not leak private title or body", () => {
    const inbox = [...db]
      .filter(([p]) => p.startsWith("tgpiNotificationInbox/"))
      .map(([, v]) => v);
    assert.ok(inbox.length);
    assert.ok(
      inbox.every(
        (x) => x.href === "/community" && !x.body.includes("More context"),
      ),
    );
  });
  await t.test(
    "chronological feed paginates without duplicates and direct link reads older post",
    async () => {
      for (let i = 0; i < 28; i++) {
        const id = `page-post-${String(i).padStart(3, "0")}`;
        db.set(`${cp("public-circle")}/posts/${id}`, {
          id,
          community: "public-circle",
          author: member.uid,
          authorName: "Member",
          kind: "discussion",
          title: `Post ${i}`,
          body: "Pagination test",
          removed: false,
          createdAt: new Date(1700000000000 + i * 1000).toISOString(),
          updatedAt: new Date(1700000000000 + i * 1000).toISOString(),
        });
      }
      const first = await store.detail("public-circle", member.uid);
      assert.equal(first.posts.length, 25);
      assert.ok(first.next);
      assert.equal(first.posts[0].id, "page-post-027");
      const last = await store.detail("public-circle", member.uid, first.next);
      assert.equal(last.posts.length, 3);
      assert.equal(
        new Set([...first.posts, ...last.posts].map((p) => p.id)).size,
        28,
      );
      assert.equal(
        (await store.publication("public-circle", "page-post-000", member.uid))
          .posts[0].id,
        "page-post-000",
      );
      await assert.rejects(
        store.detail("public-circle", member.uid, "invalid"),
        /cursor/,
      );
    },
  );
  await t.test(
    "private single-post route also checks revoked membership",
    async () => {
      await assert.rejects(
        store.publication("private-circle", "question-one", member.uid),
        /Membership/,
      );
    },
  );
  await t.test(
    "explicit interests explain recommendations and hiding does not grant access",
    async () => {
      await act(other, "preferences", "preferences", {
        personalized: true,
        interests: ["Life abroad"],
        muted: [],
        hidden: [],
      });
      let cards = (await store.discover(other.uid)).items;
      assert.ok(
        cards.some(
          (c) =>
            c.id === "public-circle" &&
            c.recommendation.includes("Life abroad"),
        ),
      );
      assert.equal(
        cards.some((c) => c.id === "hidden-circle"),
        false,
      );
      await act(other, "preferences", "preferences", {
        personalized: false,
        interests: ["Life abroad"],
        hidden: ["public-circle"],
        muted: [],
      });
      assert.equal(
        (await store.discover(other.uid)).items.some(
          (c) => c.id === "public-circle",
        ),
        false,
      );
    },
  );
  await t.test(
    "approval preserves the rules version the applicant actually accepted",
    async () => {
      const path = `${cp("private-circle")}/members/${other.uid}`;
      db.set(path, {
        uid: other.uid,
        state: "pending",
        role: "member",
        acceptedVersion: 1,
        answers: "QA",
        updatedAt: new Date().toISOString(),
        reason: "",
      });
      await act(owner, "private-circle", "approve", { target: other.uid });
      assert.equal(db.get(path).acceptedVersion, 1);
      await assert.rejects(
        act(other, "private-circle", "post", {
          id: "stale-rules",
          kind: "discussion",
          title: "Hello",
          body: "Context",
        }),
        /current rules/,
      );
    },
  );
  await t.test("muting suppresses community notifications", async () => {
    await act(member, "preferences", "preferences", {
      personalized: false,
      interests: [],
      hidden: [],
      muted: ["hidden-circle"],
    });
    const before = [...db.keys()].filter((p) =>
      p.startsWith("tgpiNotificationInbox/"),
    ).length;
    await act(owner, "hidden-circle", "suspend", {
      target: member.uid,
      reason: "QA moderation reason",
    });
    assert.equal(
      [...db.keys()].filter((p) => p.startsWith("tgpiNotificationInbox/"))
        .length,
      before,
    );
  });
  await t.test(
    "cursor is opaque and cannot be replayed across collection scopes",
    async () => {
      const page = await store.detail("public-circle", member.uid);
      assert.ok(page.next);
      assert.equal(
        Buffer.from(page.next, "base64url")
          .toString("utf8")
          .includes("page-post-"),
        false,
      );
      await assert.rejects(
        store.comments("public-circle", "page-post-000", member.uid, page.next),
        /cursor/,
      );
      const broken = page.next.slice(0, -8) + "aaaaaaaa";
      await assert.rejects(
        store.detail("public-circle", member.uid, broken),
        /cursor/,
      );
    },
  );
  await t.test("release extensions preserve scoped permissions", async () => {
    db.clear();
    await create("release-circle");
    await act(member, "release-circle", "join", { acceptedVersion: 1 });
    await act(owner, "release-circle", "settings", {
      postApproval: true,
      slowModeSeconds: 30,
    });
    await act(member, "release-circle", "post", {
      id: "review-post",
      kind: "question",
      title: "Needs review",
      body: "Practical context",
    });
    assert.equal(
      (await store.detail("release-circle", other.uid)).posts.length,
      0,
    );
    await assert.rejects(
      store.publication("release-circle", "review-post", other.uid),
      /unavailable/,
    );
    await assert.rejects(
      act(other, "release-circle", "save", {
        post: "review-post",
        saved: true,
      }),
      /unavailable/,
    );
    assert.equal(
      (await store.pendingPosts("release-circle", owner.uid)).items.length,
      1,
    );
    await assert.rejects(
      act(member, "release-circle", "approve-post", { post: "review-post" }),
      /permission/,
    );
    await act(owner, "release-circle", "approve-post", { post: "review-post" });
    await Promise.all([
      act(member, "release-circle", "reaction", {
        post: "review-post",
        helpful: true,
      }),
      act(member, "release-circle", "reaction", {
        post: "review-post",
        helpful: true,
      }),
    ]);
    assert.equal(
      (await store.publication("release-circle", "review-post", member.uid))
        .posts[0].helpfulCount,
      1,
    );
    await assert.rejects(
      act(member, "release-circle", "post", {
        id: "too-fast",
        kind: "discussion",
        title: "Another",
        body: "Too fast",
      }),
      /Slow mode/,
    );
    await act(owner, "release-circle", "playbook", {
      id: "arrival-guide",
      title: "Arrival",
      description: "Reading path",
      posts: ["review-post"],
    });
    const books = await store.playbooks("release-circle", other.uid);
    assert.equal(books.items[0].sources[0].authorName, member.name);
    await act(owner, "release-circle", "report-member", {
      target: member.uid,
      reason: "Test report",
    });
    await assert.rejects(
      store.globalReports(member.uid, false),
      /Administrator/,
    );
    assert.equal((await store.globalReports(owner.uid, true)).items.length, 1);
    const report = (
      await store.management("release-circle", owner.uid, "reports")
    ).items[0];
    await act(owner, "release-circle", "resolve-report", {
      report: report.id,
      reason: "Reviewed with context",
    });
    assert.equal(
      (await store.globalReports(owner.uid, true)).items[0].status,
      "reviewed",
    );
    await act(owner, "release-circle", "block", {
      target: member.uid,
      blocked: true,
    });
    assert.equal(
      (await store.detail("release-circle", owner.uid)).posts.length,
      0,
    );
    await assert.rejects(
      store.publication("release-circle", "review-post", owner.uid),
      /unavailable/,
    );
    assert.equal((await store.blocks(owner.uid)).items.length, 1);
    await act(owner, "preferences", "unblock", { target: member.uid });
    assert.equal((await store.blocks(owner.uid)).items.length, 0);
    await act(owner, "release-circle", "suspend", {
      target: member.uid,
      reason: "Test suspension",
    });
    await act(member, "release-circle", "appeal", {
      body: "Please review this decision",
    });
    const appeals = await store.management(
      "release-circle",
      owner.uid,
      "appeals",
    );
    assert.equal(appeals.items[0].state, "pending");
    await act(owner, "release-circle", "appeal-decision", {
      target: member.uid,
      reason: "Participation restored",
      restore: true,
    });
    assert.equal(
      (await store.detail("release-circle", member.uid)).membership.state,
      "active",
    );
    assert.equal(
      (await store.discover(other.uid, "", "glob")).items[0].id,
      "release-circle",
    );
  });
  await t.test(
    "attachment identifiers reject document path injection",
    async () => {
      await assert.rejects(
        act(member, "release-circle", "post", {
          id: "malicious-file",
          kind: "discussion",
          title: "File",
          body: "Image",
          attachments: [{ id: "../../other", alt: "Example" }],
        }),
      );
    },
  );
  await t.test(
    "protected image persistence and revocation use existing datastore",
    async () => {
      globalThis.__communitySharp = (await import("sharp")).default;
      const code = fs
        .readFileSync("src/lib/community/assets.server.ts", "utf8")
        .replace(/import ['"]server-only['"];?/, "")
        .replace(
          /import sharp from ['"]sharp['"];?/,
          "const sharp=globalThis.__communitySharp;",
        )
        .replace(
          /import\s*\{\s*getFirestoreDocument[\s\S]*?from ['"]@\/lib\/firestore-admin-rest.server['"];?/,
          "const {get,write,transaction}=globalThis.__communityTest;",
        )
        .replace(/from ['"]\.\/model['"]/, `from '${modelUrl}'`)
        .replace(
          /import\s*\{\s*googleStorage\s*\}\s*from ['"]\.\/google.server['"];?/,
          'const googleStorage=async()=>{throw Error("Unexpected external image storage");};',
        );
      const assets = await import(dataUrl(compile(code)));
      process.env.TGPI_COMMUNITY_MEDIA_KEY = Buffer.alloc(32, 1).toString(
        "base64",
      );
      delete process.env.TGPI_COMMUNITY_STORAGE_BUCKET;
      const png = await globalThis
        .__communitySharp({
          create: {
            width: 400,
            height: 250,
            channels: 3,
            background: "#154272",
          },
        })
        .png()
        .toBuffer();
      const image = await assets.uploadCommunityAsset(
        owner.uid,
        "release-circle",
        {
          bytes: png,
          kind: "post",
          post: "image-publication",
          alt: "QA image",
        },
      );
      const stored = db.get(cp("release-circle") + "/assets/" + image.id);
      assert.ok(stored.ciphertext);
      assert.equal(stored.ciphertext.includes(png.toString("base64")), false);
      await assert.rejects(
        assets.readCommunityAsset(member.uid, "release-circle", image.id),
        /unavailable/,
      );
      await act(owner, "release-circle", "post", {
        id: "image-publication",
        kind: "experience",
        title: "Photo",
        body: "Context",
        attachments: [{ id: image.id, alt: image.alt }],
      });
      const bytes = await assets.readCommunityAsset(
        member.uid,
        "release-circle",
        image.id,
      );
      assert.equal(
        (await globalThis.__communitySharp(bytes).metadata()).format,
        "webp",
      );
      await act(owner, "release-circle", "delete", {
        post: "image-publication",
      });
      await assert.rejects(
        assets.readCommunityAsset(member.uid, "release-circle", image.id),
        /unavailable/,
      );
      await assert.rejects(
        assets.uploadCommunityAsset(owner.uid, "release-circle", {
          bytes: Buffer.from("<svg></svg>"),
          kind: "post",
          post: "svg-post",
          alt: "Bad file",
        }),
      );
    },
  );
  await t.test("configuration gate fails closed", async () => {
    delete process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED;
    await assert.rejects(store.discover(""), /unavailable/);
    process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED = "true";
  });
});
