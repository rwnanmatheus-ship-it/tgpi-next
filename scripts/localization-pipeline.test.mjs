import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { collectSource,buildInventory } from './localization/inventory.mjs';
import { validateTranslation,validateBatch } from './localization/validation.mjs';
import { batches,pendingTranslations,translateInventory } from './localization/generate.mjs';

function fixture() {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'tgpi-translation-'));
  for (const dir of ['src/app','src/lib/localization','src/data']) fs.mkdirSync(path.join(root,dir),{recursive:true});
  fs.writeFileSync(path.join(root,'src/lib/localization/messages.ts'),'export const messages = {};');
  fs.writeFileSync(path.join(root,'src/app/page.tsx'),'export default function Page(){ return <h1>Hello world</h1>; }');
  fs.writeFileSync(path.join(root,'src/data/assessment.server.ts'),'export const entry = { explanation: "Private assessment rationale" };');
  return root;
}
function provider(calls,mutate) {
  return async (locale,entries)=>{
    calls.push({locale,entries});
    const data={translations:entries.map(({id,source})=>({id,value:`${locale}: ${source}`}))};
    if (mutate) mutate(data);
    return {data,usage:{input_tokens:10,output_tokens:10}};
  };
}
test('inventory extracts displayed text and structured course copy without translating machine fields or code',()=>{
  const text='const status = ready ? "approved" : "studying"; const x={id:"stable-id",title:"Trusted title",explanation:"Course explanation",successCriteria:["Visible success criterion"]}; export default function P(){return <><h1>Hello world</h1><button aria-label="Open country picker">Open</button><p>{ok ? "Try again" : "Continue now"}</p><pre>console.log("Do not translate code")</pre><input value="private machine value" /></>}';
  const keys=collectSource('src/data/example.tsx',text).map(e=>e.source);
  for (const key of ['Trusted title','Course explanation','Visible success criterion','Hello world','Open country picker','Try again','Continue now']) assert.ok(keys.includes(key),key);
  for (const key of ['stable-id','approved','studying','Do not translate code','private machine value']) assert.ok(!keys.includes(key),key);
});
test('registry hashes are stable and private-only explanations stay outside public catalogs',()=>{
  const root=fixture();
  try {
    const first=buildInventory(root),second=buildInventory(root);
    assert.equal(first.revision,second.revision);
    assert.equal(first.entries.find(e=>e.source==='Private assessment rationale').visibility,'private');
    assert.equal(first.entries.find(e=>e.source==='Hello world').visibility,'public');
    assert.ok(first.entries.every(e=>/^[a-f0-9]{64}$/.test(e.id)));
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
test('translation validation preserves placeholders, exact values, URLs, contacts and code',()=>{
  assert.deepEqual(validateTranslation('Pay 19.90 at https://tgpi.test for {name}.','Pague 19.90 em https://tgpi.test para {name}.'),[]);
  for (const value of ['Pague 29.90 em https://tgpi.test para {name}.','Pague 19.90 em https://other.test para {name}.','Pague 19.90 em https://tgpi.test para {user}.']) assert.ok(validateTranslation('Pay 19.90 at https://tgpi.test for {name}.',value).length);
  assert.ok(validateTranslation('Run `x = 3`','Execute `x = 4`').length);
  assert.ok(validateTranslation('Safe text','Unsafe\u202etext').length);
  assert.throws(()=>validateBatch([{id:'a',source:'Hello'}],{translations:[]}),/Missing/);
  assert.throws(()=>validateBatch([{id:'a',source:'Hello'}],{translations:[{id:'a',value:'Olá'},{id:'a',value:'Oi'}]}),/duplicate/);
});
test('batching never loses entries and respects text-size and count limits',()=>{
  const entries=Array.from({length:100},(_,i)=>({id:String(i),source:'x'.repeat(300)}));
  const grouped=batches(entries,1000);
  assert.deepEqual(grouped.flat(),entries);
  assert.ok(grouped.every(batch=>batch.length<=40&&batch.reduce((n,e)=>n+e.source.length,0)<=1000));
});
test('all six languages finish before artifacts are marked complete; re-runs reuse the cache',async()=>{
  const root=fixture(),calls=[];
  try {
    const result=await translateInventory({root,execute:true,provider:provider(calls)});
    assert.equal(result.complete,true);
    const output=path.join(root,'src/lib/localization/generated');
    const manifest=JSON.parse(fs.readFileSync(path.join(output,'manifest.json'),'utf8'));
    assert.equal(manifest.complete,true);
    assert.equal(manifest.integrationValidated,false);
    assert.equal(JSON.parse(fs.readFileSync(path.join(output,'public/fr.json'),'utf8'))['Hello world'],'fr: Hello world');
    assert.ok(!Object.hasOwn(JSON.parse(fs.readFileSync(path.join(output,'public/fr.json'),'utf8')),'Private assessment rationale'));
    assert.equal(JSON.parse(fs.readFileSync(path.join(output,'private/fr.json'),'utf8'))['Private assessment rationale'],'fr: Private assessment rationale');
    const count=calls.length;
    await translateInventory({root,execute:true,provider:provider(calls)});
    assert.equal(calls.length,count);
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
test('invalid output, budget exhaustion and missing credentials stop generation before publication',async()=>{
  for (const mode of ['invalid','budget','credentials']) {
    const root=fixture(),calls=[];
    const previous=process.env.OPENAI_API_KEY;
    try {
      delete process.env.OPENAI_API_KEY;
      const action=mode==='credentials'?{root,execute:true}:mode==='budget'?{root,execute:true,provider:provider(calls),budgetUsd:0.000001}:{root,execute:true,provider:provider(calls,data=>data.translations=[])};
      await assert.rejects(translateInventory(action),mode==='credentials'?/OPENAI_API_KEY/:mode==='budget'?/budget reached/:/Missing/);
      assert.ok(!fs.existsSync(path.join(root,'src/lib/localization/generated/manifest.json')));
      if (mode!=='invalid') assert.equal(calls.length,0);
    } finally {
      if (previous===undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY=previous;
      fs.rmSync(root,{recursive:true,force:true});
    }
  }
});
test('source changes invalidate only affected cached translations',()=>{
  const entry={id:'new-id',source:'A changed title',sourceLocale:'en'};
  const missing=pendingTranslations({entries:[entry]}, {},{fr:{'old-id':'Ancien titre'}});
  assert.equal(missing.en.length,0);
  assert.equal(missing.fr.length,1);
});
