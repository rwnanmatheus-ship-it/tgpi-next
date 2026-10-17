import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import ts from 'typescript';
const cache = new Map();
function load(name) {
  const direct = resolve('src', name + '.ts');
  const file = existsSync(direct) ? direct : resolve('src', name, 'index.ts');
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'exports', code)(id => {
    if (id.startsWith('@/')) return load(id.slice(2));
    throw Error('Unexpected import ' + id);
  }, exports);
  cache.set(file, exports);
  return exports;
}
const { appliedCourses } = load('data/courses/applied-paths');
const { seriesCourses, seriesDefinitions } = load('data/courses/series-courses');
const { courses } = load('data/courses');
const { coursesOverview } = load('data/courses-overview');
const { getCourseStandardAudit } = load('lib/learning-standard');
test('new courses have complete mapped lessons, valid checkpoints and honest credential status', () => {
  const ids = new Set();
  for (const course of [...appliedCourses, ...seriesCourses]) {
    assert.ok(getCourseStandardAudit(course).gates.find(g => g.id === 'learning').passed);
    assert.equal(course.credential.status, 'planned');
    const lessons = course.modules.flatMap(m => m.lessons);
    assert.equal(lessons.length, 3);
    assert.equal(course.estimatedMinutes, lessons.reduce((total,l) => total+l.durationMinutes,0));
    for (const lesson of lessons) {
      assert.ok(!ids.has(lesson.id)); ids.add(lesson.id);
      assert.equal(lesson.checkpoint.options.filter(o => o.id === lesson.checkpoint.correctOptionId).length, 1);
      assert.equal(new Set(lesson.checkpoint.options.map(o => o.label)).size, 3);
      assert.ok(lesson.summary.length > 300);
      assert.ok(lesson.practiceTask.prompt.length > 50);
    }
    const listing = coursesOverview.find(c => c.id === course.id);
    assert.equal(listing.status, 'available');
    assert.equal(listing.href, '/courses/' + course.id);
    assert.ok(existsSync(resolve('public', listing.image.slice(1))));
  }
});
test('catalog entries and asset references are unique and valid', () => {
  assert.equal(new Set(coursesOverview.map(c => c.id)).size, coursesOverview.length);
  for (const entry of coursesOverview) assert.ok(existsSync(resolve('public', entry.image.slice(1))));
  assert.equal(coursesOverview.filter(c => c.status === 'available').length, 14);
});

test('ten new courses have unique chapters, complete registry entries and full-resolution covers', () => {
  assert.equal(seriesCourses.length, 10);
  assert.equal(seriesCourses.flatMap(course => course.modules.flatMap(module => module.lessons)).length, 30);
  const chapters = new Set();
  for (const definition of seriesDefinitions) {
    const chapter = `${definition.series}-${definition.chapter}`;
    assert.ok(!chapters.has(chapter)); chapters.add(chapter);
    assert.ok(courses.some(course => course.id === definition.id));
    const listing = coursesOverview.find(course => course.id === definition.id);
    assert.equal(listing.series, definition.series);
    assert.equal(listing.seriesOrder, definition.chapter);
  }
});

test('all fourteen courses retain completion after compact storage and normalization', () => {
  const activation = load('lib/activation-progress');
  const exports = {};
  const source = ts.transpileModule(readFileSync('src/lib/activation-store.server.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'exports', source)(id => {
    if (id === 'server-only' || id === '@clerk/nextjs/server') return {};
    if (id === '@/lib/activation-progress') return activation;
    if (id === '@/data/courses') return { courses };
    if (id === '@/lib/countries') return { getCountry: () => undefined };
    if (id === '@/lib/tgpi-comparison') return { isComparisonGoal: () => false };
    throw Error('Unexpected dependency ' + id);
  }, exports);
  let progress = activation.createEmptyActivationProgress();
  for (const course of courses) {
    for (const lesson of course.modules.flatMap(module => module.lessons)) {
      const mutation = exports.parseActivationMutation({ type: 'complete_lesson', courseId: course.id, lessonId: lesson.id, checkpointOptionId: lesson.checkpoint.correctOptionId });
      progress = exports.applyActivationMutation(progress, mutation, '2026-10-17T15:00:00Z');
      // Exercise the real write/read representation after every completion.
      progress = activation.normalizeActivationProgress(JSON.parse(JSON.stringify(activation.serializeActivationProgressForStorage(progress))));
    }
  }
  assert.equal(Object.keys(progress.courseProgress).length, 14);
  for (const course of courses) {
    assert.equal(progress.courseProgress[course.id].completedLessonIds.length, course.modules.flatMap(module => module.lessons).length);
    assert.ok(progress.courseProgress[course.id].completedAt);
    assert.equal(progress.courseProgress[course.id].courseVersion, course.version);
  }
  const persisted = JSON.stringify(activation.serializeActivationProgressForStorage(progress));
  assert.ok(Buffer.byteLength(persisted) <= 6000, `Persisted record is ${Buffer.byteLength(persisted)} bytes`);
  assert.deepEqual(activation.normalizeActivationProgress(progress), progress, 'legacy object format remains readable');
});
