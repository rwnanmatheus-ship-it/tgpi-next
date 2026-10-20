import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import * as activation from "../src/lib/activation-progress.ts";

// Run the real persistence function; Clerk and archive transports are isolated test doubles.
const fixture = { id:"global-budget",version:"1",title:"Global budget",modules:[{lessons:[{id:"costs"}]}] };
const compiled = ts.transpileModule(readFileSync(new URL("../src/lib/activation-store.server.ts",import.meta.url),"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function server({ archiveFails = false } = {}) {
  const writes=[];
  const user={privateMetadata:{tgpiBillingV1:{plan:"premium",customerId:"test-only"},tgpiActivationV1:activation.createEmptyActivationProgress()}};
  const client={users:{getUser:async()=>user,updateUserMetadata:async(uid,input)=>{writes.push(input);Object.assign(user.privateMetadata,input.privateMetadata);return user;}}};
  const exports={};
  new Function("require","exports",compiled)((id)=>{
    if(id==="server-only")return {};
    if(id==="@/lib/workspace-history.server")return {archiveWorkspaceHistory:async()=>{if(archiveFails)throw new Error("Synthetic archive outage");}};
    if(id==="@clerk/nextjs/server")return {clerkClient:async()=>client};
    if(id==="@/lib/activation-progress")return activation;
    if(id==="@/data/courses")return {courses:[fixture]};
    if(id==="@/lib/countries")return {getCountry:slug=>slug==="portugal"?{slug,name:"Portugal"}:undefined};
    if(id==="@/lib/tgpi-comparison")return {isComparisonGoal:value=>value==="work"};
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
