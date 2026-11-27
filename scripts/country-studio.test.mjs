import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {countrySearchTerms,countrySearchScore} from '../src/lib/country-search.ts';
import * as plan from '../src/lib/intelligence/research-plan.ts';
const countries=JSON.parse(readFileSync(new URL('../src/data/intelligence/identities.json',import.meta.url),'utf8'));
test('all 195 country identities have searchable local names and ISO codes',()=>{for(const c of countries.countries){const terms=countrySearchTerms(c);assert.equal(countrySearchScore(terms,c.iso2),100);assert.equal(countrySearchScore(terms,c.iso3),100);assert.ok(countrySearchScore(terms,c.name)>0);}});
test('search supports translated names, accents, abbreviations and bounded typos',()=>{for(const [iso,q] of [['BR','Brasil'],['DE','Alemanha'],['US','EUA'],['JP','Japão'],['PT','Portugl'],['FR','França']]){const c=countries.countries.find(c=>c.iso2===iso);assert.ok(countrySearchScore(countrySearchTerms(c),q)>0,q);}assert.equal(countrySearchScore(countrySearchTerms(countries.countries.find(c=>c.iso2==='BR')),'zzzzzz'),0);});
function harness(uid='owner', premium=true){
 const docs=new Map(); const paths=[];
 const events=[];
 const imports={'@/lib/funnel.server':{requestFunnelConsent:request=>request.headers.get('cookie')==='tgpi_analytics_consent=granted',recordFunnelEvent:(event,consent)=>{if(consent)events.push(event);}},'@/lib/auth/guards':{requirePremiumApiUser:async()=>{if(!premium)throw Error('Premium required');},featureAccessError:(_error,headers)=>Response.json({code:'PREMIUM_REQUIRED'},{status:403,headers})},'@clerk/nextjs/server':{auth:async()=>({userId:uid}),clerkClient:async()=>({users:{getUser:async()=>({unsafeMetadata:{}})}})},'@/data/intelligence/identities.json':countries,'@/lib/intelligence/research-plan':plan,'@/lib/firestore-admin-rest.server':{isLearningStorageConfigured:()=>true,getFirestoreDocument:async p=>{paths.push(p);return docs.get(p)||null;},createFirestoreUpdateWrite:(path,data)=>({path,data}),runFirestoreTransaction:async fn=>{const result=await fn({getDocuments:async ps=>new Map(ps.map(p=>[p,docs.get(p)||null]))});result.writes.forEach(w=>docs.set(w.path,{data:w.data}));return result.result;}}};
 const source=readFileSync(new URL('../src/app/api/intelligence/scenarios/route.ts',import.meta.url),'utf8');const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const exports={};vm.runInNewContext(code,{exports,require:k=>{if(!(k in imports))throw Error(k);return imports[k];},Request,Response,Buffer,URL,Date,JSON,SyntaxError,crypto});return {...exports,docs,paths,events};
}
const request=(country='portugal',slot='1',body,origin='https://tgpi.test')=>new Request(`https://tgpi.test/api/intelligence/scenarios?country=${country}&slot=${slot}`,body===undefined?{}:{method:'PATCH',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
test('scenario endpoints reject anonymous, cross-origin and malformed input',async()=>{let h=harness(null);assert.equal((await h.GET(request())).status,401);assert.equal((await h.PATCH(request('portugal','1',{}))).status,401);h=harness();assert.equal((await h.PATCH(request('portugal','1',{},'https://evil.test'))).status,403);assert.equal((await h.GET(request('../owner','1'))).status,400);assert.equal((await h.PATCH(request('portugal','4',{}))).status,400);assert.equal((await h.PATCH(request('portugal','1',{worksheet:plan.emptyWorksheet('canada'),revision:null}))).status,400);assert.equal(h.docs.size,0);});
test('country and scenario slots persist independently and stale writes are rejected',async()=>{const h=harness();let r=await h.PATCH(request('portugal','1',{worksheet:plan.emptyWorksheet('portugal','EUR'),revision:null}));assert.equal(r.status,200);const first=await r.json();assert.ok(first.revision);r=await h.PATCH(request('portugal','1',{worksheet:plan.emptyWorksheet('portugal','USD'),revision:null}));assert.equal(r.status,409);assert.equal((await h.PATCH(request('portugal','2',{worksheet:plan.emptyWorksheet('portugal','GBP'),revision:null}))).status,200);assert.equal((await h.PATCH(request('canada','1',{worksheet:plan.emptyWorksheet('canada','CAD'),revision:null}))).status,200);assert.equal(h.docs.size,3);const saved=await (await h.GET(request('portugal','1'))).json();assert.equal(saved.worksheet.currency,'EUR');assert.ok(h.paths.every(p=>p.startsWith('tgpiLearningUsers/owner/researchScenarios/')));});

test('Free members can write slot one and read previous slots, while extra cloud writes require Premium', async () => {
 const h = harness('owner', false), worksheet = plan.emptyWorksheet('portugal', 'EUR');
 const result = await h.PATCH(request('portugal', '1', { worksheet, revision: null }));
 assert.equal(result.status, 200);
 h.docs.set('tgpiLearningUsers/owner/researchScenarios/portugal-2', { data: { worksheet, revision: 'previous' } });
 assert.equal((await h.GET(request('portugal', '2'))).status, 200);
 const blocked = await h.PATCH(request('portugal', '2', { worksheet, revision: 'previous' }));
 assert.equal(blocked.status, 403);
 assert.equal((await blocked.json()).code, 'PREMIUM_REQUIRED');
 assert.equal(h.docs.get('tgpiLearningUsers/owner/researchScenarios/portugal-2').data.revision, 'previous');
});

test('scenario milestones require a committed save, consent and the elapsed revision window', async () => {
  const h = harness();
  const worksheet = plan.emptyWorksheet('portugal', 'EUR');
  function save(revision, consent = true) {
    const req = request('portugal', '1', { worksheet, revision });
    if (consent) req.headers.set('cookie', 'tgpi_analytics_consent=granted');
    return h.PATCH(req);
  }
  const first = await (await save(null)).json();
  assert.deepEqual(h.events, ['budget_scenario_created']);
  assert.equal((await save(null)).status, 409);
  const second = await (await save(first.revision)).json();
  assert.deepEqual(h.events, ['budget_scenario_created']);
  const saved = h.docs.get('tgpiLearningUsers/owner/researchScenarios/portugal-1');
  saved.data.updatedAt = new Date(Date.now() - 25 * 3600_000).toISOString();
  const third = await (await save(second.revision)).json();
  assert.deepEqual(h.events, ['budget_scenario_created', 'budget_scenario_revised_after_24h']);
  h.docs.get('tgpiLearningUsers/owner/researchScenarios/portugal-1').data.updatedAt = saved.data.updatedAt;
  await save(third.revision, false);
  assert.equal(h.events.length, 2);
});
