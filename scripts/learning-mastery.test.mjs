import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import * as journal from '../src/lib/learning/journal.ts';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const cache = new Map();
function load(file, mocks = {}) {
  file = resolve(file);
  if (cache.has(file) && !Object.keys(mocks).length) return cache.get(file);
  const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  new Function('require', 'exports', code)(id => {
    if (id in mocks) return mocks[id];
    if (id.startsWith('@/') || id.startsWith('.')) {
      const base = id.startsWith('@/') ? resolve('src', id.slice(2)) : resolve(dirname(file), id);
      return load(existsSync(`${base}.ts`) ? `${base}.ts` : `${base}/index.ts`);
    }
    throw Error(`Unexpected dependency: ${id}`);
  }, exports);
  if (!Object.keys(mocks).length) cache.set(file, exports);
  return exports;
}
const { courses } = load('src/data/courses.ts');
const { learningWorkshops } = load('src/data/courses/learning-workshops.ts');
const { auditCourseStructure } = load('src/lib/learning/catalog-audit.ts');
const input = overrides => ({ courseId: courses[0].id, courseVersion: courses[0].version, lessonId: courses[0].modules[0].lessons[0].id, revision: 0, notes: 'Private notes', practice: 'My own practice', diagnostic: 'Need more practice', reviewDays: 7, ...overrides });
function storage() {
  const data = new Map(); let queue = Promise.resolve(); let configured = true;
  const firestore = {
    isLearningStorageConfigured: () => configured,
    getFirestoreDocument: async path => data.has(path) ? { data: structuredClone(data.get(path)), updateTime: 'v1' } : null,
    createFirestoreUpdateWrite: (path, value) => ({ path, value }),
    runFirestoreTransaction: build => {
      const result = queue.then(async () => {
        const plan = await build({ getDocuments: async paths => new Map(paths.map(path => [path, data.has(path) ? { data: structuredClone(data.get(path)), updateTime: 'v1' } : null])) });
        plan.writes.forEach(write => data.set(write.path, structuredClone(write.value)));
        return plan.result;
      });
      queue = result.catch(() => {}); return result;
    },
  };
  const store = load('src/lib/learning/journal.server.ts', { 'server-only': {}, '@/lib/firestore-admin-rest.server': firestore, './journal': journal });
  return { store, data, disable: () => { configured = false; } };
}
test('every catalogue course has valid structural mapping and an original workshop', () => {
  assert.equal(new Set(courses.map(course => course.id)).size, courses.length);
  assert.deepEqual(Object.keys(learningWorkshops).sort(), courses.map(course => course.id).sort());
  for (const course of courses) {
    const result = auditCourseStructure(course, learningWorkshops[course.id]);
    assert.deepEqual(result.problems, [], course.id);
    assert.ok(result.releaseBlockers.length > 0, 'structural checks cannot declare educational approval');
  }
});
test('audit rejects broken questions, duplicated lessons and missing skill mapping', () => {
  const course = structuredClone(courses[0]);
  course.modules[0].lessons.push(structuredClone(course.modules[0].lessons[0]));
  course.modules[0].lessons[0].checkpoint.correctOptionId = 'missing';
  course.modules[0].competencyIds = ['unknown'];
  const result = auditCourseStructure(course, learningWorkshops[course.id]);
  assert.equal(result.structurallyValid, false);
  assert.ok(result.problems.length >= 3);
});
test('journal rejects client identity, scores, oversized text, unsafe paths and arbitrary schedules', () => {
  for (const extra of [{ uid: 'victim' }, { score: 100 }, { notes: 'x'.repeat(6001) }, { courseId: '../victim' }, { reviewDays: 365 }, { revision: -1 }]) assert.equal(journal.journalSchema.safeParse(input(extra)).success, false);
  assert.throws(() => journal.journalPath('../victim', 'course', '1.0', 'lesson'));
});
test('journal schedule uses UTC elapsed days and does not set assessment status', () => {
  const result = journal.nextJournal(input({}), new Date('2026-10-26T12:00:00Z'));
  assert.equal(result.nextReviewAt, '2026-11-02T12:00:00.000Z');
  assert.equal(journal.nextJournal(input({ reviewDays: 0 }), new Date()).nextReviewAt, null);
  assert.equal('passed' in result, false);
});
test('private records survive a fresh read and remain isolated between accounts', async () => {
  const { store } = storage(); const entry = input({});
  const saved = await store.saveJournal('alice', entry);
  assert.equal(saved.revision, 1);
  assert.equal((await store.readJournal('alice', entry.courseId, entry.courseVersion, entry.lessonId)).practice, entry.practice);
  assert.equal(await store.readJournal('bob', entry.courseId, entry.courseVersion, entry.lessonId), null);
});
test('two devices cannot silently overwrite the same revision', async () => {
  const { store } = storage();
  const results = await Promise.allSettled([store.saveJournal('alice', input({ notes: 'device A' })), store.saveJournal('alice', input({ notes: 'device B' }))]);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  const rejected = results.find(result => result.status === 'rejected');
  assert.equal(rejected.reason.status, 409);
  const updated = await store.saveJournal('alice', input({ revision: 1, notes: 'merged draft' }));
  assert.equal(updated.revision, 2);
});
test('version mismatch and unknown lessons fail closed without migrating records', async () => {
  const { store, data } = storage();
  await assert.rejects(store.saveJournal('alice', input({ courseVersion: '999.0' })), error => error.status === 409);
  await assert.rejects(store.saveJournal('alice', input({ lessonId: 'unknown' })), error => error.status === 404);
  assert.equal(data.size, 0);
});
test('unavailable storage is an explicit error rather than a false saved state', async () => {
  const { store, disable } = storage(); disable();
  await assert.rejects(store.saveJournal('alice', input({})), error => error.status === 503);
});

test('retry after a lost response is idempotent and does not move the review date', async () => {
  const { store, data } = storage(); const entry = input({});
  const first = await store.saveJournal('alice', entry);
  const replay = await store.saveJournal('alice', entry);
  assert.deepEqual(replay, first);
  assert.equal(data.size, 1);
  await assert.rejects(store.saveJournal('alice', input({ notes: 'different stale draft' })), error => error.status === 409);
});
test('historical notes remain readable only by their owner after a curriculum change', async () => {
  const { store, data } = storage(); const entry = input({ courseVersion: 'old-archived' });
  const record = journal.nextJournal(entry, new Date('2026-01-01T00:00:00Z'));
  data.set(journal.journalPath('alice', entry.courseId, entry.courseVersion, entry.lessonId), record);
  assert.deepEqual(await store.readJournal('alice', entry.courseId, entry.courseVersion, entry.lessonId), record);
  assert.equal(await store.readJournal('bob', entry.courseId, entry.courseVersion, entry.lessonId), null);
  await assert.rejects(store.saveJournal('alice', { ...entry, revision: 1 }), error => error.status === 409);
});

if (process.env.TGPI_WRITE_LEARNING_MATRIX === 'true') {
  const { writeFileSync } = await import('node:fs');
  const rows = courses.map(course => {
    const audit = auditCourseStructure(course, learningWorkshops[course.id]);
    return `| ${course.title} (${course.id}) | Existing v${course.version}; supplement in review | ${audit.lessons} lessons + original workshop | ${audit.releaseBlockers.join('; ')} | ${course.competencies.map(skill => skill.title).join('; ')} | ${course.assessment.components.map(item => `${item.title}: ${item.status}`).join('; ')} | ${course.credential.status}; ${course.id === 'global-english-2026' ? 'server path exists; live issuance not tested' : 'no server path'} | Review content; validate practical assessments and per-skill minima; certify in Preview |`;
  });
  writeFileSync('docs/learning/catalog-matrix.md', '# TGPI Learning — actual catalogue audit\n\nSource baseline: fc39e5a. Audit date: 2026-10-26. Existing records and curriculum versions are preserved. Supplemental content does not change certification eligibility.\n\n| Course | Current state | Content | Gaps | Competencies | Assessments | Certificate | Required actions |\n|---|---|---|---|---|---|---|---|\n' + rows.join('\n') + '\n');
}
