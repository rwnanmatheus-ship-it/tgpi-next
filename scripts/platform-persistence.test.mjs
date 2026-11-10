import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import * as activation from "../src/lib/activation-progress.ts";
import * as documentReview from "../src/lib/document-review.ts";
import { COMPARISON_CATALOG } from "../src/lib/comparison-catalog.ts";

// Run the production store against an optimistic transaction double. Concurrent
// planners see the same snapshot, so the losing commit must replay its mutation.
class FirestoreAdminError extends Error { status = 429; code = "RESOURCE_EXHAUSTED"; }
const fixture = { id: "global-budget", version: "1", title: "Global budget", modules: [{ lessons: [{ id: "costs" }, { id: "income" }] }] };
const compiled = ts.transpileModule(readFileSync(new URL("../src/lib/activation-store.server.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function server({ archiveFails = false, commitFails = false, readFails = false } = {}) {
  const documents = new Map(), writes = [];
  let revision = 0, retries = 0;
  const metadata = { tgpiBillingV1: { plan: "premium" }, tgpiActivationV1: activation.createEmptyActivationProgress() };
  const exports = {};
  new Function("require", "exports", compiled)((id) => {
    if (id === "server-only") return {};
    if (id === "@/lib/workspace-history.server") return {
      workspaceHistoryWrites: async (uid, events) => {
        if (archiveFails) throw new Error("Archive unavailable");
        return events.map(event => ({ path: `history/${uid}/${event.id}`, data: event }));
      },
    };
    if (id === "@/lib/firestore-admin-rest.server") return {
      FirestoreAdminError,
      createFirestoreUpdateWrite: (path, data) => ({ path, data }),
      getFirestoreDocument: async path => {
        if (readFails) throw new FirestoreAdminError("Read unavailable");
        return documents.get(path);
      },
      runFirestoreTransaction: async plan => {
        for (let attempt = 0; attempt < 3; attempt++) {
          const started = revision, snapshot = new Map(documents);
          const { result, writes: batch } = await plan({ getDocuments: async paths => new Map(paths.map(path => [path, snapshot.get(path)])) });
          if (started !== revision) { retries++; continue; }
          if (commitFails) throw new Error("Commit unavailable");
          if (batch.length) {
            revision++;
            writes.push(batch);
            for (const write of batch) documents.set(write.path, { data: write.data });
          }
          return result;
        }
        throw new Error("Too much contention");
      },
    };
    if (id === "@clerk/nextjs/server") return { clerkClient: async () => ({ users: { getUser: async uid => ({ privateMetadata: uid === "test-user" ? metadata : {} }) } }) };
    if (id === "@/lib/document-review") return documentReview;
    if (id === "@/lib/activation-progress") return activation;
    if (id === "@/data/courses") return { courses: [fixture] };
    if (id === "@/lib/countries") return { getCountry: slug => COMPARISON_CATALOG.includes(slug) ? { slug, name: slug } : undefined };
    if (id === "@/lib/tgpi-comparison") return { isComparisonGoal: value => ["overall", "work", "study", "live", "travel"].includes(value) };
    throw new Error(`Unexpected dependency ${id}`);
  }, exports);
  return { exports, metadata, writes, documents, retries: () => retries };
}

const savePortugal = { type: "save_country", countrySlug: "portugal", saved: true };

test("the first write keeps legacy state and later reads use Firestore instead of Clerk", async () => {
  const { exports, metadata, writes } = server();
  metadata.tgpiActivationV1.savedCountries = ["spain"];
  await exports.updateUserActivationProgress("test-user", savePortugal);
  assert.deepEqual(metadata.tgpiActivationV1.savedCountries, ["spain"]);
  assert.equal(metadata.tgpiBillingV1.plan, "premium");
  assert.ok(writes[0].some(write => write.path.startsWith("history/test-user/")));
  assert.deepEqual((await exports.getUserActivationProgress("test-user")).savedCountries, ["portugal", "spain"]);
  assert.deepEqual((await exports.getUserActivationProgress("another-user")).savedCountries, []);
});

test("two devices completing different lessons both persist and retry is idempotent", async () => {
  const { exports, retries, writes } = server();
  const completion = lessonId => ({ type: "complete_lesson", courseId: fixture.id, lessonId });
  await Promise.all(["costs", "income"].map(lesson => exports.updateUserActivationProgress("test-user", completion(lesson))));
  assert.equal(retries(), 1);
  const restored = (await exports.getUserActivationProgress("test-user")).courseProgress[fixture.id];
  assert.deepEqual(restored.completedLessonIds.sort(), ["costs", "income"]);
  assert.ok(restored.completedAt);
  await exports.updateUserActivationProgress("test-user", completion("costs"));
  assert.equal(writes.length, 2);
});

test("course position survives the actual persistence and read path", async () => {
  const { exports } = server();
  await exports.updateUserActivationProgress("test-user", { type: "visit_lesson", courseId: fixture.id, lessonId: "costs" });
  const restored = (await exports.getUserActivationProgress("test-user")).courseProgress[fixture.id];
  assert.equal(restored.lastLessonId, "costs");
  assert.deepEqual(restored.completedLessonIds, []);
  assert.equal(restored.completedAt, undefined);
});

test("archive or commit failures leave both progress and history unchanged", async () => {
  for (const failure of ["archiveFails", "commitFails"]) {
    const { exports, documents } = server({ [failure]: true });
    await assert.rejects(exports.updateUserActivationProgress("test-user", savePortugal), /unavailable/);
    assert.equal(documents.size, 0);
    assert.deepEqual((await exports.getUserActivationProgress("test-user")).savedCountries, []);
  }
});

test("Firestore read outages return the Clerk copy only as a read-only view", async () => {
  const { exports, metadata, writes } = server({ readFails: true, commitFails: true });
  metadata.tgpiActivationV1.savedCountries = ["spain"];
  await assert.rejects(exports.getUserActivationProgress("test-user"), /Read unavailable/);
  const view = await exports.getUserActivationView("test-user");
  assert.equal(view.readOnly, true);
  assert.deepEqual(view.progress.savedCountries, ["spain"]);
  await assert.rejects(exports.updateUserActivationProgress("test-user", savePortugal), /Commit unavailable/);
  assert.equal(writes.length, 0);
});

test("all 195 countries survive actual comparison validation, storage and read-back", async()=>{
  const {exports}=server();
  for (const goal of ["work","study","live","travel"]) {
    const mutation=exports.parseActivationMutation({type:"record_comparison",countrySlugs:[...COMPARISON_CATALOG],goal});
    await exports.updateUserActivationProgress("test-user",mutation);
  }
  const restored=await exports.getUserActivationProgress("test-user");
  assert.equal(restored.comparisons.length,4);
  for(const comparison of restored.comparisons) assert.deepEqual(comparison.countrySlugs,[...COMPARISON_CATALOG]);
  assert.ok(restored.activities.every(item=>item.href.includes("set=v1.")));
  assert.throws(()=>exports.parseActivationMutation({type:"record_comparison",countrySlugs:[...COMPARISON_CATALOG,"portugal"],goal:"work"}));
});

test("canonical document checkpoints survive a retry and retain older saved checkpoints", async () => {
  const {exports,metadata,writes}=server();
  metadata.tgpiActivationV1.documentReviews.portugal = {
    completedItemIds: ["legacy-passport", "legacy-funding", "legacy-study", "legacy-housing"],
    totalItems: 4,
    updatedAt: "2026-10-10T00:00:00.000Z",
  };
  const payload = {
    type: "update_documents",
    countrySlug: "portugal",
    itemId: documentReview.documentReviewItems[0].id,
    complete: true,
    totalItems: documentReview.documentReviewItems.length,
  };
  assert.throws(() => exports.parseActivationMutation({ ...payload, itemId: "unlisted-item" }), /not valid/);
  assert.throws(() => exports.parseActivationMutation({ ...payload, totalItems: 1 }), /size is not valid/);
  const mutation = exports.parseActivationMutation(payload);
  await exports.updateUserActivationProgress("test-user", mutation);
  await exports.updateUserActivationProgress("test-user", mutation);
  assert.equal(writes.length, 1);
  const restored = await exports.getUserActivationProgress("test-user");
  const review = restored.documentReviews.portugal;
  assert.deepEqual(review.completedItemIds, [payload.itemId]);
  assert.equal(review.legacyCompletedItemIds.length, 4);
  assert.equal(documentReview.summarizeDocumentReview(review).percentage, 25);
  assert.match(restored.activities[0].title, /document review updated/);
});
