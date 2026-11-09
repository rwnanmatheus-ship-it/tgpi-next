import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { projectLearningProgress } from '../src/lib/learning/unified-progress.ts';
import { courseLearningPolicy, credentialLabel } from '../src/lib/learning/catalog-policy.ts';
import { parseCatalogFilters, catalogFilterParams, defaultCatalogFilters } from '../src/lib/learning/catalog-filters.ts';
const courses=[{id:'global-english-2026',title:'English',version:'v2',modules:[{lessons:[{id:'one'},{id:'two'}]}]}];
const record={courseVersion:'v2',completedLessonIds:['one'],lastLessonId:'two',totalLessons:2,updatedAt:'2026-11-09T10:00:00Z'};
const pro={uid:'member-a',courseId:'pro',version:'v2',activities:{one:'answer',forged:'ignore'},state:'studying',updatedAt:'2026-11-09T12:00:00Z'};
const input=(extra={})=>({uid:'member-a',legacy:{'global-english-2026':record},courses,professional:[pro],professionalCourses:[{id:'pro',title:'Professional',version:'v2',lessonIds:['one','two']}],...extra});
test('one projection resumes both learning systems without changing source records',()=>{
 const source=input(),before=JSON.stringify(source),items=projectLearningProgress(source);
 assert.equal(items.length,2);assert.equal(items[0].courseId,'pro');assert.equal(items[0].completed,1);
 assert.equal(items[1].href,'/courses/global-english-2026/lessons/two');assert.equal(JSON.stringify(source),before);
});
test('cross-user professional records never reach the summary',()=>{
 assert.equal(projectLearningProgress(input({professional:[{...pro,uid:'member-b'}]})).length,1);
});
test('current edition wins and prior editions remain available without inheriting completion',()=>{
 const old={...pro,version:'v1',credentialId:'old-certificate',updatedAt:'2026-11-09T15:00:00Z'};
 assert.equal(projectLearningProgress(input({professional:[old,pro]}))[0].status,'in_progress');
 const item=projectLearningProgress(input({professional:[old]})).find(item=>item.kind==='professional');
 assert.equal(item.status,'edition_changed');assert.equal(item.completed,0);assert.equal(item.href,'/courses/pro');
});
test('practice completion cannot bypass project review or certify a professional course',()=>{
 for(const [state,status] of [['studying','in_progress'],['submitted','awaiting_review'],['appealed','awaiting_review'],['revision_requested','revision_requested'],['approved','approved']]){
 const item=projectLearningProgress(input({professional:[{...pro,state,activities:{one:'a',two:'b'}}]}))[0];assert.equal(item.status,status);
 }
 assert.equal(projectLearningProgress(input({legacy:{},professional:[{...pro,credentialId:'verified-record'}]}))[0].status,'completed');
});
test('legacy aliases deduplicate and stale records never inherit current-edition completion',()=>{
 const result=projectLearningProgress(input({professional:[],legacy:{'english-abroad':record,'global-english-2026':record}}));assert.equal(result.length,1);
 const stale=projectLearningProgress(input({professional:[],legacy:{'global-english-2026':{...record,courseVersion:'v1',completedLessonIds:['one','two']}}}))[0];
 assert.equal(stale.status,'edition_changed');assert.equal(stale.completed,0);
});
test('credential display distinguishes professional, flagship, practice and planned pathways',()=>{
 const base={id:'practice',status:'available'};
 assert.equal(credentialLabel(courseLearningPolicy(base)),'Applied practice · No certificate');
 assert.equal(credentialLabel(courseLearningPolicy({...base,id:'global-english-2026'})),'Verified certification pathway');
 assert.equal(credentialLabel(courseLearningPolicy({...base,status:'planned'})),'Planned curriculum');
 const professional=courseLearningPolicy({...base,learningPolicy:{assessmentPolicy:'quiz_project_review',publicationStatus:'early_access',credentialStatus:'criteria_available'}});
 assert.match(credentialLabel(professional),/human review/);
});
test('catalogue filter links round-trip, reject invalid enums and preserve unrelated context',()=>{
 const wanted={...defaultCatalogFilters,query:'dados & IA',credential:'criteria_available',language:'pt-BR',goal:'future-of-work'};
 const params=catalogFilterParams(wanted,new URLSearchParams('source=workspace'));assert.deepEqual(parseCatalogFilters(params),wanted);assert.equal(params.get('source'),'workspace');
 assert.deepEqual(parseCatalogFilters(new URLSearchParams('goal=admin&language=xx&credential=issued')),defaultCatalogFilters);
 assert.equal(parseCatalogFilters(new URLSearchParams('q='+ 'x'.repeat(1000))).query.length,160);
 assert.equal(catalogFilterParams(defaultCatalogFilters,params).toString(),'source=workspace');
});
const code=ts.transpileModule(readFileSync('src/app/api/learning/summary/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function route(uid,fail=false){const calls=[],exports={};const deps={
 '@clerk/nextjs/server':{auth:async()=>({userId:uid})},'next/server':{NextResponse:{json:Response.json}},
 '@/lib/learning/unified-progress.server':{loadLearningSummary:async user=>{calls.push(user);if(fail)throw Error('private-service-detail');return {items:[],unavailable:['professional']};}},
};new Function('require','exports',code)(id=>deps[id],exports);return {get:exports.GET,calls};}
test('summary API uses authenticated owner only, refuses visitors, and never publicly caches',async()=>{
 const visitor=route(null);assert.equal((await visitor.get()).status,401);assert.deepEqual(visitor.calls,[]);
 const member=route('member-a');const response=await member.get(new Request('https://tgpi.example/api/learning/summary?uid=member-b'));
 assert.equal(response.status,200);assert.deepEqual(member.calls,['member-a']);assert.match(response.headers.get('cache-control'),/private, no-store/);
 assert.deepEqual((await response.json()).unavailable,['professional']);
 const failed=await route('member-a',true).get();assert.equal(failed.status,503);assert.equal((await failed.json()).error,'learning_unavailable');
});
