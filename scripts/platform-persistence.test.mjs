import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import * as activation from "../src/lib/activation-progress.ts";
import * as documentReview from "../src/lib/document-review.ts";
import { COMPARISON_CATALOG } from "../src/lib/comparison-catalog.ts";

// Run the real persistence function; Clerk and archive transports are isolated test doubles.
const fixture = { id:"global-budget",version:"1",title:"Global budget",modules:[{lessons:[{id:"costs"}]}] };
const compiled = ts.transpileModule(readFileSync(new URL("../src/lib/activation-store.server.ts",import.meta.url),"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function server({ archiveFails = false, prepareFails = false, clerkFails = false } = {}) {
  const writes=[];
  const user={privateMetadata:{tgpiBillingV1:{plan:"premium",customerId:"test-only"},tgpiActivationV1:activation.createEmptyActivationProgress()}};
  const client={users:{getUser:async()=>user,updateUserMetadata:async(uid,input)=>{if(clerkFails) throw new Error("Clerk unavailable");writes.push(input);Object.assign(user.privateMetadata,input.privateMetadata);return user;}}};
  const exports={};
  new Function("require","exports",compiled)((id)=>{
    if(id==="server-only")return {};
    if(id==="@/lib/workspace-history.server")return {prepareWorkspaceHistory:async()=>{if(prepareFails)throw new Error("Prepare unavailable");return "receipt";},commitWorkspaceHistory:async()=>{if(archiveFails)throw new Error("Synthetic archive outage");}};
    if(id==="@clerk/nextjs/server")return {clerkClient:async()=>client};
    if (id === "@/lib/document-review") return documentReview;
    if(id==="@/lib/activation-progress")return activation;
    if(id==="@/data/courses")return {courses:[fixture]};
    if(id==="@/lib/countries")return {getCountry:slug=>COMPARISON_CATALOG.includes(slug)?{slug,name:slug}:undefined};
    if(id==="@/lib/tgpi-comparison")return {isComparisonGoal:value=>["overall","work","study","live","travel"].includes(value)};
    throw new Error(`Unexpected dependency ${id}`);
  },exports);
  return {exports,user,writes};
}

test("progress persistence sends no stale billing or unrelated private metadata",async()=>{
  const {exports,user,writes}=server();
  await exports.updateUserActivationProgress("test-user",{type:"save_country",countrySlug:"portugal",saved:true});
  assert.deepEqual(Object.keys(writes[0].privateMetadata),[activation.TGPI_ACTIVATION_METADATA_KEY]);
  assert.equal(user.privateMetadata.tgpiBillingV1.plan,"premium");
  const restored=await exports.getUserActivationProgress("test-user");
  assert.deepEqual(restored.savedCountries,["portugal"]);
});

test("course position survives the actual persistence and read path",async()=>{
  const {exports}=server();
  await exports.updateUserActivationProgress("test-user",{type:"start_course",courseId:fixture.id});
  await exports.updateUserActivationProgress("test-user",{type:"visit_lesson",courseId:fixture.id,lessonId:"costs"});
  const restored=await exports.getUserActivationProgress("test-user");
  assert.equal(restored.courseProgress[fixture.id].lastLessonId,"costs");
  assert.deepEqual(restored.courseProgress[fixture.id].completedLessonIds,[]);
  assert.equal(restored.courseProgress[fixture.id].completedAt,undefined);
});

test("archive outages do not discard authoritative saved progress",async()=>{
  const {exports,user}=server({archiveFails:true});
  await exports.updateUserActivationProgress("test-user",{type:"save_country",countrySlug:"portugal",saved:true});
  assert.deepEqual(user.privateMetadata.tgpiActivationV1.savedCountries,["portugal"]);
});


test("a preparation outage prevents an unjournaled Clerk change",async()=>{
 const {exports,writes}=server({prepareFails:true});
 await assert.rejects(exports.updateUserActivationProgress("test-user",{type:"save_country",countrySlug:"portugal",saved:true}),/Prepare unavailable/);
 assert.equal(writes.length,0);
});
test("a failed Clerk write does not report a successful save",async()=>{
 const {exports,writes}=server({clerkFails:true});
 await assert.rejects(exports.updateUserActivationProgress("test-user",{type:"save_country",countrySlug:"portugal",saved:true}),/Clerk unavailable/);
 assert.equal(writes.length,0);
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
  const {exports,user,writes}=server();
  user.privateMetadata.tgpiActivationV1.documentReviews.portugal = {
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
