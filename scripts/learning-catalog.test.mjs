import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import ts from 'typescript';
const cache = new Map();
function load(name) {
  const file = resolve('src', name + '.ts');
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
const { coursesOverview } = load('data/courses-overview');
const { getCourseStandardAudit } = load('lib/learning-standard');
test('new courses have complete mapped lessons, valid checkpoints and honest credential status', () => {
  const ids = new Set();
  for (const course of appliedCourses) {
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
  assert.equal(coursesOverview.filter(c => c.status === 'available').length, 4);
});
