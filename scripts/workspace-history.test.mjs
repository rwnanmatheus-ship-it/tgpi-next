import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { workspaceHistory } from '../src/lib/workspace-control.ts';
const require=createRequire(import.meta.url),ts=require('typescript');
const source=readFileSync(new URL('../src/lib/workspace-history.server.ts',import.meta.url),'utf8');
function store(){
 const data=new Map();
 const exports={};
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('require','exports',code)(id=>{
  if(id==='server-only')return {};
  if(id==='node:crypto')return require(id);
  if(id==='@/lib/workspace-control')return {workspaceHistory};
  if(id==='@/lib/firestore-admin-rest.server')return {
   isLearningStorageConfigured:()=>true,
   createFirestoreUpdateWrite:(path,value)=>({path,value}),
   runFirestoreTransaction:async fn=>{const result=await fn({getDocuments:async paths=>new Map(paths.map(path=>[path,data.has(path)?{data:data.get(path)}:null]))});for(const write of result.writes)data.set(write.path,write.value);},
  };
  throw Error(`Unexpected import ${id}`);
 },exports);
 return {data,archive:exports.archiveWorkspaceHistory};
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
