import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import * as research from '../src/lib/intelligence/research-plan.ts';
const require=createRequire(import.meta.url);
function moduleAt(path,dependencies){
 const exports={};const source=readFileSync(new URL(path,import.meta.url),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{esModuleInterop:true,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('require','exports',code)(id=>{if(id in dependencies)return dependencies[id];if(id==='server-only')return {};if(id==='node:crypto')return require(id);throw Error(`Unexpected dependency ${id}`);},exports);return exports;
}
const model=moduleAt('../src/lib/premium-scenarios.ts',{'./intelligence/research-plan':research});
function scenario(id='portugal-1',currency='EUR',months=12){return {id,slot:'1',iso2:'PT',countryName:'Portugal',updatedAt:null,worksheet:{...research.emptyWorksheet('portugal',currency),months,monthly:{housing:600,food:200,transport:50,health:50,other:100},tuition:0,arrival:500}};}
test('comparable budgets use minor-unit arithmetic and a signed baseline difference',()=>{
 const a=scenario(),b=scenario('portugal-2');b.worksheet.monthly.housing=700;
 assert.equal(model.scenarioComparisonReadiness([a,b]),'ready');assert.equal(model.scenarioTotalDifference(b,a),1320);assert.equal(model.scenarioTotalDifference(a,b),-1320);
});
test('currency, duration and missing costs prevent misleading budget differences',()=>{
 const a=scenario(),b=scenario('portugal-2','USD');assert.equal(model.scenarioComparisonReadiness([a,b]),'currency');assert.equal(model.scenarioTotalDifference(b,a),null);
 b.worksheet.currency='EUR';b.worksheet.months=6;assert.equal(model.scenarioComparisonReadiness([a,b]),'period');
 b.worksheet.months=12;b.worksheet.monthly.food=null;assert.equal(model.scenarioComparisonReadiness([a,b]),'incomplete');assert.equal(model.scenarioTotalDifference(b,a),null);
});
test('zero is a real cost and yen budgets preserve integer precision',()=>{
 const a=scenario('japan-1','JPY'),b=scenario('japan-2','JPY');a.worksheet.monthly.housing=0;b.worksheet.monthly.housing=1;
 assert.equal(model.scenarioTotalDifference(b,a),13);assert.equal(model.scenarioComparisonReadiness([a,b]),'ready');
});
test('export preserves missing amounts and only selected saved data',()=>{
 const a=scenario();a.worksheet.arrival=null;
 const result=JSON.parse(model.exportScenarioComparison([a],new Date('2026-11-09T00:00:00Z')));
 assert.equal(result.version,1);assert.equal(result.scenarios[0].worksheet.arrival,null);assert.equal(result.scenarios[0].totals.complete,false);assert.equal(result.scenarios.length,1);assert.equal(result.comparison,'selection');
});
test('scenario repository queries only its owner and excludes invalid records',async()=>{
 let parent;
 const store=moduleAt('../src/lib/premium-scenarios.server.ts',{
  '@/data/intelligence/identities.json':{countries:[{slug:'portugal',name:'Portugal',iso2:'PT'}]},
  '@/lib/intelligence/research-plan':research,
  '@/lib/firestore-admin-rest.server':{isLearningStorageConfigured:()=>true,listFirestoreDocumentPage:async(p,c,cursor)=>{parent=p;assert.equal(c,'researchScenarios');assert.equal(cursor,'opaque');return {items:[{name:`${p}/${c}/portugal-1`,data:{worksheet:scenario().worksheet}},{name:`${p}/${c}/portugal-4`,data:{worksheet:scenario().worksheet}},{name:`${p}/${c}/portugal-2`,data:{worksheet:{...scenario().worksheet,country:'spain'}}}],nextPageToken:'next'};}},
 });
 const page=await store.loadPremiumScenarios('member-a','opaque');assert.equal(parent,'tgpiLearningUsers/member-a');assert.equal(page.scenarios.length,1);assert.equal(page.cursor,'next');assert.equal(page.omitted,2);
});
function guard({uid='member-a',plan='free',controlled=null,fail=false}={}) {
 return moduleAt('../src/lib/auth/guards.ts',{
  '@/lib/billing.server':{getUserBillingRecord:async()=>{if(fail)throw Error('Billing unavailable');return {plan};}},
  '@/lib/account-profile':{getCertificateName:()=>'',normalizeAccountIdentity:()=>({}),normalizeTgpiAccountProfile:()=>({})},
  '@clerk/nextjs/server':{auth:async()=>({userId:uid}),currentUser:async()=>({unsafeMetadata:{plan:'premium'},fullName:'Test'})},
  'next/navigation':{},'@/lib/premium-access.server':{getControlledPremiumAccessMode:async()=>controlled},
 });
}
test('Premium API denies anonymous and Free users regardless of editable metadata',async()=>{
 await assert.rejects(guard({uid:null}).requirePremiumApiUser(),{status:401});await assert.rejects(guard().requirePremiumApiUser(),{status:403});
});
test('Premium API accepts authoritative subscriptions and controlled founder access',async()=>{
 assert.equal((await guard({plan:'premium'}).requirePremiumApiUser()).uid,'member-a');assert.equal((await guard({controlled:'founder'}).requirePremiumApiUser()).uid,'member-a');
});
test('billing transport failure does not grant access from cached profile metadata',async()=>{await assert.rejects(guard({fail:true}).requirePremiumApiUser(),/Billing unavailable/);});
test('scenario API never accepts a request-selected owner and marks responses private',async()=>{
 const guards=guard({plan:'premium'});let queried;
 const route=moduleAt('../src/app/api/premium/scenarios/route.ts',{'@/lib/auth/guards':guards,'@/lib/premium-scenarios.server':{loadPremiumScenarios:async uid=>{queried=uid;return {scenarios:[],cursor:null,omitted:0};}}});
 const response=await route.GET(new Request('https://example.test/api/premium/scenarios?uid=another-member'));assert.equal(response.status,200);assert.equal(queried,'member-a');assert.match(response.headers.get('Cache-Control'),/private, no-store/);
 const invalid=await route.GET(new Request(`https://example.test/api/premium/scenarios?cursor=${'x'.repeat(4097)}`));assert.equal(invalid.status,400);
});

test('demo exports explicitly identify fictional examples',()=>{
 const output=JSON.parse(model.exportScenarioComparison([scenario(),scenario('portugal-2')],new Date('2026-11-09T00:00:00Z'),'illustrative_examples'));
 assert.equal(output.source,'illustrative_examples');assert.equal(output.comparison,'ready');
});
test('exports with incompatible selections withhold every baseline difference',()=>{
 const output=JSON.parse(model.exportScenarioComparison([scenario(),scenario('portugal-2'),scenario('canada-1','CAD')]));
 assert.equal(output.comparison,'currency');assert.ok(output.scenarios.every(s=>s.differenceFromBaseline===null));
});
test('malformed API responses fail validation instead of becoming an empty success',()=>{
 assert.equal(model.parsePremiumScenarioPage({scenarios:null,cursor:null,omitted:0}),null);
 assert.equal(model.parsePremiumScenarioPage({scenarios:[{...scenario(),worksheet:{}}],cursor:null,omitted:0}),null);
 const page=model.parsePremiumScenarioPage({scenarios:[scenario()],cursor:'opaque',omitted:0});assert.equal(page.scenarios[0].id,'portugal-1');
});
