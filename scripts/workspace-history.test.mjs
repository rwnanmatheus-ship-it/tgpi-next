import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { workspaceHistory } from '../src/lib/workspace-control.ts';
const require=createRequire(import.meta.url),ts=require('typescript');
const source=readFileSync(new URL('../src/lib/workspace-history.server.ts',import.meta.url),'utf8');
function store(){
 let fail=false;
 const data=new Map();
 const exports={};
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('require','exports',code)(id=>{
  if(id==='server-only')return {};
  if(id==='node:crypto')return require(id);
  if(id==='@/lib/workspace-control')return {workspaceHistory};
  if(id==='@/lib/firestore-admin-rest.server')return {
   isLearningStorageConfigured:()=>true,
   createFirestoreDeleteWrite:path=>({path,remove:true}),
   getFirestoreDocument:async path=>data.has(path)?{data:data.get(path)}:null,
   listFirestoreDocumentPage:async(parent,collection)=>({items:[...data].filter(([p])=>p.startsWith(`${parent}/${collection}/`)).map(([name,data])=>({name,data})),nextPageToken:null}),
   createFirestoreUpdateWrite:(path,value)=>({path,value}),
   runFirestoreTransaction:async fn=>{if(fail)throw Error("Storage outage");const result=await fn({getDocuments:async paths=>new Map(paths.map(path=>[path,data.has(path)?{data:data.get(path)}:null]))});for(const write of result.writes)write.remove?data.delete(write.path):data.set(write.path,write.value);return result.result;},
  };
  throw Error(`Unexpected import ${id}`);
 },exports);
 return {data,...exports,archive:exports.archiveWorkspaceHistory,setFailure:value=>{fail=value;}};
}
const event={id:'event-1',type:'course',title:'Course started',href:'/courses/global-english-2026',occurredAt:'2026-10-19T12:00:00.000Z'};
test('archive retries are idempotent and preserve source timestamps',async()=>{
 const s=store();await s.archive('a',{activities:[event]});await s.archive('a',{activities:[event]});
 assert.equal(s.data.size,2);
 const archived=[...s.data.values()].find(row=>row.source==='activation_v1');
 assert.equal(archived.version,1);assert.equal(archived.occurredAt,event.occurredAt);assert.equal(archived.title,event.title);
});
test('archive paths remain isolated between members with identical activities',async()=>{
 const s=store();await s.archive('a',{activities:[event]});await s.archive('b',{activities:[event]});
 assert.equal(s.data.size,4);assert.equal([...s.data.keys()].filter(path=>path.startsWith('tgpiLearningUsers/a/')).length,2);
});
test('current state without source activities does not create inferred history',async()=>{
 const s=store();await s.archive('a',{activities:[],savedCountries:['spain']});assert.equal(s.data.size,0);
});

const previous={...event,id:'previous',occurredAt:'2026-10-18T12:00:00.000Z'};
test('preparation archives observed history before it leaves the retained window',async()=>{
 const s=store();const id=await s.prepareWorkspaceHistory('a',{activities:[previous]},{activities:[event]});
 assert.equal([...s.data.values()].filter(x=>x.source==='activation_v1').length,1);
 assert.equal([...s.data.values()].find(x=>x.source==='activation_v1').id,'previous');
 assert.equal((await s.loadWorkspaceHistory('a')).reconciliationPending,true);
 await s.commitWorkspaceHistory('a',id);await s.commitWorkspaceHistory('a',id);
 const page=await s.loadWorkspaceHistory('a');assert.equal(page.events.length,2);assert.equal(page.reconciliationPending,false);
});
test('a failed acknowledgement retains the receipt and reconciliation recovers once',async()=>{
 const s=store();const id=await s.prepareWorkspaceHistory('a',{activities:[]},{activities:[event]});
 s.setFailure(true);await assert.rejects(s.commitWorkspaceHistory('a',id));
 assert.equal(s.data.size,1);s.setFailure(false);
 await s.reconcileWorkspaceHistory('a',{activities:[event]});await s.reconcileWorkspaceHistory('a',{activities:[event]});
 const page=await s.loadWorkspaceHistory('a');assert.equal(page.events.length,1);assert.equal(page.reconciliationPending,false);
});
test('unconfirmed receipts never fabricate history or replay progress',async()=>{
 const s=store();await s.prepareWorkspaceHistory('a',{activities:[]},{activities:[event]});
 await s.reconcileWorkspaceHistory('a',{activities:[],savedCountries:['portugal']});
 const page=await s.loadWorkspaceHistory('a');assert.equal(page.events.length,0);assert.equal(page.reconciliationPending,true);
});
test('another member cannot acknowledge a receipt with the same identifier',async()=>{
 const s=store();const id=await s.prepareWorkspaceHistory('a',{activities:[]},{activities:[event]});
 await s.commitWorkspaceHistory('b',id);
 assert.equal((await s.loadWorkspaceHistory('a')).reconciliationPending,true);
 assert.equal((await s.loadWorkspaceHistory('b')).events.length,0);
});
test('failed preparation reports retryable service failure without partial data',async()=>{
 const s=store();s.setFailure(true);
 await assert.rejects(s.prepareWorkspaceHistory('a',{activities:[]},{activities:[event]}),{status:503});assert.equal(s.data.size,0);
});
test('an unchanged event creates no receipt',async()=>{
 const s=store();assert.equal(await s.prepareWorkspaceHistory('a',{activities:[event]},{activities:[event]}),null);assert.equal(s.data.size,0);
});

test('reading an archived snapshot skips redundant history transactions', async () => {
 const s = store();
 const progress = { activities: [event] };
 await s.archive('a', progress);
 s.setFailure(true);
 const page = await s.loadWorkspaceHistoryForProgress('a', progress, true);
 assert.equal(page.reconciliationPending, false);
 assert.equal(page.events.length, 1);
});

test('opening legacy progress still archives its retained history', async () => {
 const s = store();
 const page = await s.loadWorkspaceHistoryForProgress('a', { activities: [event] }, false);
 assert.equal(page.reconciliationPending, false);
 assert.equal(page.events.length, 1);
});

test('writing progress reads only new history events and the coverage record', async () => {
 const s = store();
 const reads = [];
 const writes = await s.workspaceHistoryWrites('a', [previous, event], {
  getDocuments: async paths => {
   reads.push(...paths);
   return new Map();
  },
 }, [previous]);
 assert.equal(reads.length, 2);
 assert.equal(writes.find(write => write.value.source === 'activation_v1').value.id, event.id);
});
