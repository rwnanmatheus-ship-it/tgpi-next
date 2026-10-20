import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { parseWorkspacePreferences } from '../src/lib/workspace-control.ts';
const require=createRequire(import.meta.url);
const ts=require('typescript');
const source=readFileSync(new URL('../src/app/api/workspace/preferences/route.ts',import.meta.url),'utf8');
function handler({uid='member-a',configured=true,fail=false}={}) {
 const writes=[];
 const exports={};
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const mocks={
  '@clerk/nextjs/server':{auth:async()=>({userId:uid})},
  '@/lib/workspace-control':{parseWorkspacePreferences},
  '@/lib/firestore-admin-rest.server':{
   isLearningStorageConfigured:()=>configured,
   createFirestoreUpdateWrite:(path,value)=>({path,value}),
   runFirestoreTransaction:async fn=>{if(fail)throw Error('offline');const plan=await fn({getDocuments:async()=>new Map()});writes.push(...plan.writes);},
  },
 };
 new Function('require','exports',code)(id=>{if(!(id in mocks))throw Error(`Unexpected import: ${id}`);return mocks[id]},exports);
 return {run:exports.PATCH,writes};
}
const preferences={version:1,density:'compact',hidden:[],dismissed:[]};
const request=(body=preferences,origin='https://tgpi.example')=>new Request('https://tgpi.example/api/workspace/preferences',{method:'PATCH',headers:{origin,'content-type':'application/json'},body:typeof body==='string'?body:JSON.stringify(body)});
test('preference route rejects visitors, cross-origin and malformed requests without writing',async()=>{
 for(const [options,req,status] of [[{uid:null},request(),401],[{},request(preferences,'https://other.example'),403],[{},request('{broken'),400],[{},request({...preferences,hidden:['admin']}),400],[{},request('x'.repeat(2049)),413]]){
  const h=handler(options);assert.equal((await h.run(req)).status,status);assert.equal(h.writes.length,0);
 }
});
test('preference route derives owner from session and strips injected owner fields',async()=>{
 const h=handler({uid:'member-a'});const response=await h.run(request({...preferences,userId:'member-b'}));
 assert.equal(response.status,200);assert.equal(h.writes[0].path,'tgpiLearningUsers/member-a/workspace/preferences');
 assert.deepEqual(h.writes[0].value,preferences);assert.match(response.headers.get('cache-control'),/private, no-store/);
});
test('unavailable storage and failed transactions return recoverable errors',async()=>{
 assert.equal((await handler({configured:false}).run(request())).status,503);
 assert.equal((await handler({fail:true}).run(request())).status,500);
});
