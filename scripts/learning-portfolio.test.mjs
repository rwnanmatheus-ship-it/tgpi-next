import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import * as portfolio from '../src/lib/learning/portfolio.ts';
const require = createRequire(import.meta.url); const ts = require('typescript'); const cache = new Map();
function load(file, mocks = {}) {
  file = resolve(file); if (cache.has(file) && !Object.keys(mocks).length) return cache.get(file);
  const exports = {}; const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require','exports',code)(id => {
    if (id in mocks) return mocks[id];
    if (id.startsWith('node:')) return require(id);
    if (id.startsWith('@/') || id.startsWith('.')) { const base = id.startsWith('@/') ? resolve('src',id.slice(2)) : resolve(dirname(file),id); return load(existsSync(`${base}.ts`) ? `${base}.ts` : `${base}/index.ts`); }
    throw Error(`Unexpected import: ${id}`);
  },exports); if (!Object.keys(mocks).length) cache.set(file,exports); return exports;
}
const catalogue = load('src/data/courses.ts'); const course = catalogue.courses.find(item=>item.id==='country-fit');
const input = (target = course, overrides = {}) => ({ courseId: target.id, courseVersion: target.version, revision: 0, project: 'An original project with traceable reasoning and evidence. '.repeat(8), transfer: 'A new scenario changes the available evidence and the final decision. '.repeat(4), evidence: Object.fromEntries(target.competencies.map(skill=>[skill.id,'Specific evidence, limitations and a justified independent decision. '.repeat(3)])), aiDisclosure:'No AI assistance.', ...overrides });
function fixture() {
  const data = new Map(); let queue = Promise.resolve(); let configured = true; let complete = true;
  const progress = { getUserActivationProgress: async () => ({ courseProgress: Object.fromEntries(catalogue.courses.map(item=>[item.id,{ completedLessonIds: complete ? item.modules.flatMap(module=>module.lessons.map(lesson=>lesson.id)) : [] }])) }) };
  const firestore = {
    isLearningStorageConfigured: () => configured,
    getFirestoreDocument: async path => data.has(path) ? { data: structuredClone(data.get(path)), updateTime: 'v1' } : null,
    listFirestoreDocuments: async () => [],
    createFirestoreUpdateWrite: (path,value,condition) => ({path,value,condition}),
    runFirestoreQuery: async () => [],
    runFirestoreTransaction: build => {
      const result=queue.then(async()=>{const plan=await build({getDocuments:async paths=>new Map(paths.map(path=>[path,data.has(path)?{data:structuredClone(data.get(path)),updateTime:'v1'}:null]))});
        for(const write of plan.writes) if(write.condition?.exists===false && data.has(write.path)) throw Error('duplicate write');
        plan.writes.forEach(write=>data.set(write.path,structuredClone(write.value))); return plan.result; });
      queue=result.catch(()=>{}); return result;
    },
  };
  const store=load('src/lib/learning/portfolio.server.ts',{'server-only':{},'./portfolio':portfolio,'@/data/courses':catalogue,'@/lib/activation-store.server':progress,'@/lib/firestore-admin-rest.server':firestore});
  const records=load('src/lib/learning-records.server.ts',{
    'server-only':{},'@/data/courses':catalogue,'@/lib/learning/portfolio':portfolio,'@/lib/firestore-admin-rest.server':firestore,'@/lib/activation-store.server':progress,
    '@/data/courses/english-abroad/assessment-bank.server':{getEnglishAbroadAssessmentBank:()=>[]},
    '@/lib/global-key.server':{getOrCreateGlobalKey:async()=>({anchor:{status:'awaiting_anchor'},fingerprint:'test',keyId:'test',revision:1})},
    '@/lib/credential-standard':{TGPI_CREDENTIAL_ALIGNMENT_TARGETS:[],TGPI_VERIFIED_LEARNING_PROFILE:'TGPI Verified Learning Credential',TGPI_VERIFIED_LEARNING_SCHEMA_VERSION:2},
    '@/lib/credential-signing.server':{isCredentialSigningConfigured:()=>true,createCredentialId:()=>`TGPI-TEST-${crypto.randomUUID()}`,signLearningCredential:()=> 'TEST_SIGNATURE',TGPI_CREDENTIAL_KEY_ID:'test',verifyLearningCredentialIntegrity:()=>true},
  });
  return {store,records,data,incomplete:()=>{complete=false;},disable:()=>{configured=false;}};
}
const identity={uid:'student',publicName:'Test Learner',emailVerified:true};
const review=(target=course, overrides={})=>({revision:1,scores:Object.fromEntries(target.competencies.map(skill=>[skill.id,80])),feedback:'Each competency has adequate evidence, justified assumptions and an independently applied transfer response. '.repeat(2),...overrides});
test('every non-English course supports a distinct reviewed project and essential competency minima',async()=>{
  for(const target of catalogue.courses.filter(item=>item.id!=='global-english-2026')) {
    const f=fixture(); await f.store.submitPortfolio('student',input(target));
    await f.store.reviewPortfolio('responsible-reviewer','student',target.id,review(target));
    const status=await f.records.getLearningCertificationStatus(identity,target.id); assert.equal(status.eligibility.eligible,true,target.id);
    const id=await f.records.issueLearningCredential(identity,target.id); const credential=f.data.get(`tgpiLearningCredentials/${id}`);
    assert.equal(credential.courseId,target.id); assert.equal(credential.courseVersion,target.version); assert.equal(credential.competencyIds.length,target.competencies.length);
  }
});
test('accessing or completing lessons cannot issue a certificate without a reviewed project',async()=>{
  const f=fixture(); await assert.rejects(f.records.issueLearningCredential(identity,course.id));
  await f.store.submitPortfolio('student',input()); await assert.rejects(f.records.issueLearningCredential(identity,course.id));
});
test('a high average cannot compensate for a missing essential competency',async()=>{
  const f=fixture();await f.store.submitPortfolio('student',input());const scores=Object.fromEntries(course.competencies.map((skill,i)=>[skill.id,i===0?79:100]));
  const result=await f.store.reviewPortfolio('reviewer','student',course.id,review(course,{scores}));assert.equal(result.state,'revision_requested');await assert.rejects(f.records.issueLearningCredential(identity,course.id));
});
test('incomplete lessons, forged scores and unverified identity fail closed',async()=>{
  const f=fixture();f.incomplete();await assert.rejects(f.store.submitPortfolio('student',input()));
  assert.equal(portfolio.portfolioSubmissionSchema.safeParse({...input(),state:'approved'}).success,false);
  assert.equal(portfolio.portfolioReviewSchema.safeParse(review(course,{scores:{fake:101}})).success,false);
  const g=fixture();await g.store.submitPortfolio('student',input());await g.store.reviewPortfolio('reviewer','student',course.id,review());await assert.rejects(g.records.issueLearningCredential({...identity,emailVerified:false},course.id));
});
test('reviewers cannot grade themselves; stale and duplicate reviews do not replace evidence',async()=>{
  const f=fixture();await f.store.submitPortfolio('student',input());await assert.rejects(f.store.reviewPortfolio('student','student',course.id,review()));
  const results=await Promise.allSettled([f.store.reviewPortfolio('reviewer','student',course.id,review()),f.store.reviewPortfolio('reviewer2','student',course.id,review())]);assert.equal(results.filter(item=>item.status==='fulfilled').length,1);
});
test('recovery creates a new submitted version and retains both reviews and evidence',async()=>{
  const f=fixture();await f.store.submitPortfolio('student',input());await f.store.reviewPortfolio('reviewer','student',course.id,review(course,{scores:Object.fromEntries(course.competencies.map(skill=>[skill.id,60]))}));
  await f.store.submitPortfolio('student',input(course,{revision:1,transfer:'Revised transfer with alternative evidence and corrected assumptions. '.repeat(4)}));
  await f.store.reviewPortfolio('reviewer','student',course.id,review(course,{revision:2}));
  const path=portfolio.portfolioPath('student',course.id,course.version);assert.ok(f.data.has(`${path}/history/submission-1`));assert.ok(f.data.has(`${path}/history/review-1`));assert.ok(f.data.has(`${path}/history/submission-2`));assert.ok(f.data.has(`${path}/history/review-2`));
});
test('certificate issuance is transactional, idempotent and isolated between learners',async()=>{
  const f=fixture();await f.store.submitPortfolio('student',input());await f.store.reviewPortfolio('reviewer','student',course.id,review());
  const ids=await Promise.all([f.records.issueLearningCredential(identity,course.id),f.records.issueLearningCredential(identity,course.id)]);assert.equal(ids[0],ids[1]);assert.equal([...f.data.keys()].filter(path=>path.startsWith('tgpiLearningCredentials/')).length,1);
  assert.equal(await f.store.getPortfolio('another-student',course.id),null);await assert.rejects(f.records.issueLearningCredential({...identity,uid:'another-student'},course.id));
});
test('wrong curriculum version and unavailable storage cannot approve or issue',async()=>{
  const f=fixture();await assert.rejects(f.store.submitPortfolio('student',input(course,{courseVersion:'999'})));f.disable();await assert.rejects(f.store.submitPortfolio('student',input()));await assert.rejects(f.records.issueLearningCredential(identity,course.id));
});
test('an unrelated English assessment cannot grade a different course',async()=>{
  const f=fixture();await assert.rejects(f.records.submitLearningAssessment(identity,course.id,'arrival-gate',{answers:[]}));
});
test('Atlas context is curriculum-only and never includes protected answers or learner evidence',()=>{
  const tutor=load('src/lib/learning/tutor-context.server.ts',{'server-only':{},'@/data/courses':catalogue,'@/lib/atlas/contracts':{AtlasError:class extends Error{}}});
  for(const target of catalogue.courses) {
    const lesson=target.modules[0].lessons[0]; const context=tutor.buildLearningTutorContext(target.id,lesson.id);
    assert.equal(context.curriculumVersion,target.version);assert.ok(context.sourceUrl.endsWith(lesson.id));
    const serialized=JSON.stringify(context);for(const protectedField of ['correctOptionId','checkpoint','assessments','reviewerId','ownerUid','verificationHash']) assert.equal(serialized.includes(`"${protectedField}"`),false);
  }
  assert.throws(()=>tutor.buildLearningTutorContext(course.id,'invalid-lesson'));
  assert.throws(()=>tutor.buildLearningTutorContext('../other'));
});
