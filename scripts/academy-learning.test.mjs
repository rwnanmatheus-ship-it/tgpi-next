import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const native = createRequire(import.meta.url);
const realDate = Date;
function harness() {
  let time = Date.parse('2026-11-10T12:00:00Z'), count = 0, tail = Promise.resolve();
  class Clock extends realDate { constructor(...args) { super(...(args.length ? args : [time])); } static now() { return time; } }
  const documents = new Map(), cache = new Map();
  const backend = {
    FirestoreAdminError: class extends Error {},
    isLearningStorageConfigured: () => true,
    getFirestoreDocument: async path => structuredClone(documents.get(path) ?? null),
    createFirestoreUpdateWrite: (path, data, condition) => ({ path, data: structuredClone(data), condition }),
    runFirestoreTransaction: callback => {
      const work = tail.then(async () => {
        const plan = await callback({ getDocuments: async paths => new Map(paths.map(path => [path, structuredClone(documents.get(path) ?? null)])) });
        for (const w of plan.writes) { if (w.condition?.exists === false) assert.ok(!documents.has(w.path)); if (w.condition?.updateTime) assert.equal(documents.get(w.path)?.updateTime, w.condition.updateTime); }
        for (const w of plan.writes) documents.set(w.path, { data: w.data, updateTime: `v${++count}` });
        return plan.result;
      }); tail = work.catch(() => {}); return work;
    },
  };
  class AuthenticationError extends Error {}
  let signedIn = true;
  const overrides = {
    'next/server': { NextResponse: { json: (value, init) => Response.json(value, init) } },
    '@/lib/auth/guards': { requireApiUser: async () => { if (!signedIn) throw new AuthenticationError(); return identity; }, TgpiAuthenticationError: AuthenticationError },
    '@/lib/localization/server': { getLocale: async () => 'en' },
    '@/lib/localization/assessment.server': { assessmentTranslations: () => ({}) },
    '@/lib/localization/academy-assessment.server': { withAcademyTranslations: status => status },
    '@/lib/localization/messages': { translate: (_locale, text) => text },
    'server-only': {}, '@/lib/firestore-admin-rest.server': backend,
    '@/lib/activation-store.server': { getUserActivationProgress: async () => ({ courseProgress: {} }) },
    '@/lib/global-key.server': { getOrCreateGlobalKey: async () => ({ keyId: 'TEST-ONLY-NOT-A-LEARNER', fingerprint: 'test', revision: 1, anchor: { status: 'awaiting_anchor' } }) },
    '@/lib/notifications/store.server': { tryPublishNotification: async () => {} },
  };
  function load(input) {
    const file = /\.(ts|json)$/.test(input) ? input : existsSync(input+'.ts') ? input+'.ts' : resolve(input,'index.ts');
    if (file.endsWith('.json')) return JSON.parse(readFileSync(file,'utf8'));
    if (cache.has(file)) return cache.get(file);
    const result = {}; cache.set(file,result);
    const source = ts.transpileModule(readFileSync(file,'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    new Function('require','exports','Date',source)(id => Object.hasOwn(overrides,id) ? overrides[id] : id.startsWith('@/') ? load(resolve('src',id.slice(2))) : id.startsWith('.') ? load(resolve(dirname(file),id)) : native(id), result, Clock);
    return result;
  }
  const catalog = load(resolve('src/data/courses/academy/catalog.server.ts')), service = load(resolve('src/lib/learning/academy/service.server.ts'));
  return { documents, load, catalog, service, signOut: () => { signedIn = false; }, advance: ms => { time += ms; }, seed: (path,data) => documents.set(path,{data:structuredClone(data),updateTime:`v${++count}`}) };
}
const previousSecret = process.env.TGPI_CREDENTIAL_SIGNING_SECRET;
process.env.TGPI_CREDENTIAL_SIGNING_SECRET = 'test-only-academy-secret-never-used-in-production';
test.after(() => { if (previousSecret === undefined) delete process.env.TGPI_CREDENTIAL_SIGNING_SECRET; else process.env.TGPI_CREDENTIAL_SIGNING_SECRET = previousSecret; });
const identity = { uid: 'test-learner', publicName: 'Synthetic Test Fixture', emailVerified: true };
const note = 'Synthetic software-test practice record: this is not a real learner submission or evidence of human learning. Includes a correction and limitation.';
const portfolio = note.repeat(3);
function path(course, uid=identity.uid) { return `tgpiLearningUsers/${uid}/academyCourses/${course.id}--${course.version}`; }
function mutation(h, course, user=identity) { return input => h.service.mutateAcademy(user,course.id,{...input,version:course.version}); }
async function enrol(h,course,user=identity) { return mutation(h,course,user)({action:'enrol',diagnostic:note,nameConsent:true}); }
function submittedAnswers(h,course,status,wrong=false,user=identity) {
  const stored=h.documents.get(`${path(course,user.uid)}/attempts/${status.challenge.id}`).data;
  return {action:'submit',challengeId:status.challenge.id,answers:stored.questions.map(q=>({questionId:q.id,optionId:wrong?q.options.find(o=>o.id!==q.correctOptionId).id:q.correctOptionId})),...(stored.calculation?{calculation:String(stored.calculation.expected).replace('.',',')}:{})};
}
async function completeLessons(h,course,user=identity) {
  const mutate=mutation(h,course,user);let status=await enrol(h,course,user);
  for(const lesson of course.lessons){
    status=await mutate({action:'save',revision:status.record.revision,lessonId:lesson.id,text:note});
    status=await mutate({action:'begin',revision:status.record.revision,target:lesson.id});
    status=await mutate(submittedAnswers(h,course,status,false,user));
    assert.equal(status.lastResult.passed,true);
  }
  return mutate({action:'portfolio',revision:status.record.revision,text:portfolio});
}

test('all 27 courses have real expanded lessons, inspectable workload, assessments and preserved foundation IDs',()=>{
 const h=harness(), {academyCourses,academyQuestions}=h.catalog;
 assert.equal(academyCourses.length,27);assert.equal(new Set(academyCourses.map(c=>c.id)).size,27);
 assert.equal(academyCourses.reduce((n,c)=>n+c.lessons.length,0),227);
 const manifest=h.load(resolve('src/data/courses/academy/manifest.ts')).academyManifest;
 const old=h.load(resolve('src/data/courses.ts')).courses, pro=h.load(resolve('src/data/courses/professional/index.ts')).professionalCourseDrafts;
 for(const course of academyCourses){
  assert.equal(course.minutes,course.lessons.reduce((n,l)=>n+l.minutes,0)+course.portfolioMinutes+course.assessmentMinutes);
  assert.deepEqual(manifest[course.id],{minutes:course.minutes,lessons:course.lessons.length});
  assert.ok(course.lessons.length>=6);assert.ok(course.minutes>=375);
  const bank=academyQuestions(course.id);assert.ok(bank.length>=course.lessons.length);
  for(const lesson of course.lessons){assert.ok(bank.some(q=>q.lessonId===lesson.id));assert.ok(lesson.sections.every(s=>s.body.trim()));assert.ok(lesson.practice.length>=2);}
  const previous=[...old,...pro].find(c=>c.id===course.id);
  if(previous)for(const lesson of previous.modules.flatMap(m=>m.lessons))assert.ok(course.lessons.some(l=>l.id===lesson.id));
  const dto=JSON.stringify(course);assert.ok(!dto.includes('correctOptionId'));assert.ok(!dto.includes('answer-0'));
 }
});

test('every course completes objective gates and delayed review, then automatically issues one private signed certificate',async()=>{
 const h=harness();
 for(const course of h.catalog.academyCourses){
  const mutate=mutation(h,course);let status=await completeLessons(h,course);
  await assert.rejects(()=>mutate({action:'issue'}),/Complete all required/);
  status=await mutate({action:'begin',revision:status.record.revision,target:'final'});
  assert.ok(!JSON.stringify(status.challenge).includes('correctOptionId'));assert.ok(!JSON.stringify(status.challenge).includes('"expected":'));
  const finalInput=submittedAnswers(h,course,status);status=await mutate(finalInput);
  assert.ok(status.record.final);assert.equal(status.record.credentialId,undefined);
  await assert.rejects(()=>mutate({action:'begin',revision:status.record.revision,target:'retention'}),/24 hours/);
  h.advance(24*60*60*1000);
  status=await mutate({action:'begin',revision:status.record.revision,target:'retention'});
  const input=submittedAnswers(h,course,status), [first,replayed]=await Promise.all([mutate(input),mutate(input)]);
  assert.ok(first.record.credentialId);assert.equal(first.record.credentialId,replayed.record.credentialId);
  const credential=h.documents.get(`tgpiLearningCredentials/${first.record.credentialId}`).data;
  assert.equal(credential.courseId,course.id);assert.equal(credential.courseVersion,course.version);assert.equal(credential.professionalEvidence.sharing,false);
  assert.equal(credential.automatedEvidence.humanReviewed,false);assert.equal(credential.automatedEvidence.workloadMinutes,course.minutes);
  assert.ok(h.load(resolve('src/lib/credential-signing.server.ts')).verifyLearningCredentialIntegrity(credential));
  assert.ok(!credential.evidenceSummary.join(' ').includes('human reviewer approved'));
 }
 assert.equal([...h.documents.keys()].filter(p=>p.startsWith('tgpiLearningCredentials/')).length,27);
});

test('client grades, skipped lessons, other users, stale revisions, duplicate and foreign answers are rejected',async()=>{
 const h=harness(),course=h.catalog.academyCourses[0],mutate=mutation(h,course);let status=await enrol(h,course);
 await assert.rejects(()=>mutate({action:'enrol',diagnostic:note,nameConsent:true,score:100}),/fields/);
 await assert.rejects(()=>mutate({action:'begin',revision:status.record.revision,target:course.lessons[1].id}),/previous lesson/);
 await assert.rejects(()=>mutate({action:'begin',revision:status.record.revision,target:'final'}),/Complete all lesson/);
 await assert.rejects(()=>mutate({action:'save',revision:0,lessonId:course.lessons[0].id,text:note}),/another session/);
 await assert.rejects(()=>h.service.mutateAcademy(identity,course.id,{action:'save',version:'stale',revision:status.record.revision,lessonId:course.lessons[0].id,text:note}),/edition changed/);
 status=await mutate({action:'save',revision:status.record.revision,lessonId:course.lessons[0].id,text:note});
 status=await mutate({action:'begin',revision:status.record.revision,target:course.lessons[0].id});
 assert.equal((await h.service.academyStatus({...identity,uid:'other-user'},course.id)).record,null);
 const answer=submittedAnswers(h,course,status);
 await enrol(h,course,{...identity,uid:'other-user'});
 await assert.rejects(()=>mutation(h,course,{...identity,uid:'other-user'})(answer),/not found for this account/);
 await assert.rejects(()=>mutate({...answer,answers:[...answer.answers,...answer.answers]}),/exactly once/);
 await assert.rejects(()=>mutate({...answer,answers:[{questionId:'foreign',optionId:'foreign'}]}),/exactly once/);
 await assert.rejects(()=>mutate({...answer,score:100}),/fields/);
 status=await mutate(answer);assert.equal(status.record.completed[course.lessons[0].id].score,100);
});

test('wrong numerical cases cannot pass even with a high multiple-choice score; limits and recovery are enforced',async()=>{
 const h=harness(),course=h.catalog.academyCourses[0],mutate=mutation(h,course);let status=await completeLessons(h,course);
 for(let attempt=0;attempt<5;attempt++){
  status=await mutate({action:'begin',revision:status.record.revision,target:'final'});
  const answer=submittedAnswers(h,course,status);status=await mutate({...answer,calculation:'999999'});
  assert.equal(status.lastResult.passed,false);assert.equal(status.record.final,undefined);
  if(attempt===0)await assert.rejects(()=>mutate({action:'begin',revision:status.record.revision,target:'final'}),/Review the feedback/);
  h.advance(5*60*1000);
 }
 await assert.rejects(()=>mutate({action:'begin',revision:status.record.revision,target:'final'}),/Daily assessment limit/);
 h.advance(24*60*60*1000);status=await mutate({action:'begin',revision:status.record.revision,target:'final'});
 status=await mutate(submittedAnswers(h,course,status));assert.ok(status.record.final);
});

test('legacy notes and signed records are preserved without silently inheriting new approval',async()=>{
 const h=harness(),course=h.catalog.academyCourses.find(c=>c.id==='ia-trabalho-global');
 const legacyPath=`tgpiLearningUsers/${identity.uid}/professionalCourses/${course.id}--1.0.0`;
 const legacy={uid:identity.uid,courseId:course.id,version:'1.0.0',activities:{[course.lessons[0].id]:note},state:'submitted',credentialId:'OLD-UNCHANGED'};
 h.seed(legacyPath,legacy);const status=await enrol(h,course);
 assert.equal(status.record.notes[course.lessons[0].id],note);assert.deepEqual(status.record.completed,{});assert.equal(status.record.credentialId,undefined);
 assert.deepEqual(h.documents.get(legacyPath).data,legacy);assert.equal(status.record.legacy.credentialId,'OLD-UNCHANGED');
});

test('unverified email preserves completion, later issuance is idempotent, sharing resigns both copies and denies other owners',async()=>{
 const h=harness(),course=h.catalog.academyCourses[0],unverified={...identity,emailVerified:false},mutate=mutation(h,course,unverified);
 let status=await completeLessons(h,course,unverified);
 status=await mutate({action:'begin',revision:status.record.revision,target:'final'});status=await mutate(submittedAnswers(h,course,status,false,unverified));h.advance(24*60*60*1000);
 status=await mutate({action:'begin',revision:status.record.revision,target:'retention'});status=await mutate(submittedAnswers(h,course,status,false,unverified));
 assert.ok(status.record.completedAt);assert.equal(status.record.credentialId,undefined);await assert.rejects(()=>mutate({action:'issue'}),/Verify your account email/);
 const verified=mutation(h,course);status=await verified({action:'issue'});const id=status.record.credentialId;
 const repeated=await verified({action:'issue'});assert.equal(repeated.record.credentialId,id);
 status=await verified({action:'sharing',sharing:true});assert.equal(status.record.sharing,true);
 const publicCopy=h.documents.get(`tgpiLearningCredentials/${id}`).data,ownerCopy=h.documents.get(`tgpiLearningUsers/${identity.uid}/credentials/${id}`).data;
 assert.deepEqual(publicCopy,ownerCopy);assert.ok(h.load(resolve('src/lib/credential-signing.server.ts')).verifyLearningCredentialIntegrity(publicCopy));
 await assert.rejects(()=>mutation(h,course,{...identity,uid:'outsider'})({action:'sharing',sharing:false}),/Start this course edition/);
});

test('academy completes work with an outdated name but signs the full name only after reconfirmation', async () => {
 const h=harness(),course=h.catalog.academyCourses[0];
 const old={...identity,publicName:'Previous Recorded Name'},current={...identity,publicName:'Alicia Sofia de Lima Fernandes'};
 let status=await completeLessons(h,course,old);
 const mutate=mutation(h,course,current);
 status=await mutate({action:'begin',revision:status.record.revision,target:'final'});
 status=await mutate(submittedAnswers(h,course,status));
 h.advance(24*60*60*1000);
 status=await mutate({action:'begin',revision:status.record.revision,target:'retention'});
 status=await mutate(submittedAnswers(h,course,status));
 assert.ok(status.record.completedAt);
 assert.equal(status.record.credentialId,undefined);
 assert.equal(status.record.consent.publicName,old.publicName);
 await assert.rejects(()=>mutate({action:'issue'}),/Confirm the public credential name/);
 await assert.rejects(()=>mutate({action:'issue',confirmedName:old.publicName}),/Confirm the public credential name/);
 status=await mutate({action:'issue',confirmedName:current.publicName});
 const id=status.record.credentialId;
 const signed=h.documents.get(`tgpiLearningCredentials/${id}`).data;
 assert.equal(signed.publicName,current.publicName);
 assert.equal(signed.professionalEvidence.sharing,false);
 assert.equal(status.record.consent.publicName,current.publicName);
 const later=await mutation(h,course,{...current,publicName:'A Different Profile Name'})({action:'issue'});
 assert.equal(later.record.credentialId,id);
 assert.deepEqual(h.documents.get(`tgpiLearningCredentials/${id}`).data,signed);
});

test('route boundary uses server identity, strict origin, streamed size limit and private cache; old submissions cannot enter a human queue',()=>{
 const route=readFileSync('src/app/api/learning/academy/[courseId]/route.ts','utf8');
 assert.match(route,/requireApiUser/);assert.match(route,/new URL\(origin\)\.origin !== new URL\(request.url\)\.origin/);assert.match(route,/size > 24000/);assert.match(route,/reader.cancel/);assert.match(route,/private, no-store/);
 const old=readFileSync('src/app/api/learning/professional/[courseId]/route.ts','utf8');assert.match(old,/\["issue", "sharing"\]/);assert.match(old,/409/);
});


test('real route handlers reject unsigned, cross-origin, oversized, wrong-type and malformed requests without writes', async () => {
 const h=harness(), course=h.catalog.academyCourses[0], route=h.load(resolve('src/app/api/learning/academy/[courseId]/route.ts'));
 const url=`https://example.test/api/learning/academy/${course.id}`, context={params:Promise.resolve({courseId:course.id})};
 const body={action:'enrol',version:course.version,diagnostic:note,nameConsent:true};
 const request=(value=JSON.stringify(body),origin='https://example.test',type='application/json')=>new Request(url,{method:'POST',headers:{origin,'content-type':type},body:value});
 assert.equal((await route.POST(request(JSON.stringify(body),'https://evil.test'),context)).status,403);
 assert.equal((await route.POST(request(JSON.stringify(body),'https://example.test','text/plain'),context)).status,415);
 assert.equal((await route.POST(request('x'.repeat(24001)),context)).status,413);
 assert.equal((await route.POST(request('{invalid'),context)).status,400);
 assert.equal(h.documents.size,0);
 const created=await route.POST(request(),context);assert.equal(created.status,200);assert.match(created.headers.get('cache-control'),/private, no-store/);
 const fetched=await route.GET(new Request(url+'?uid=outsider'),context);assert.equal((await fetched.json()).record.uid,identity.uid);
 h.signOut();assert.equal((await route.GET(new Request(url),context)).status,401);assert.equal((await route.POST(request(),context)).status,401);
});
