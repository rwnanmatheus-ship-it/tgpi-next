import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
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

test('every published course has a complete, distinct optional workshop', () => {
  assert.deepEqual(Object.keys(learningWorkshops).sort(), courses.map(course => course.id).sort());
  const scenarios = new Set();
  for (const course of courses) {
    const workshop = learningWorkshops[course.id];
    for (const field of ['prerequisite', 'scenario', 'explanation', 'workedExample', 'assignment', 'transfer', 'recovery']) {
      assert.equal(typeof workshop[field], 'string', `${course.id}: ${field}`);
      assert.ok(workshop[field].trim(), `${course.id}: empty ${field}`);
    }
    assert.equal(workshop.criteria.length, 4, course.id);
    assert.equal(new Set(workshop.criteria).size, 4, course.id);
    workshop.criteria.forEach(criterion => assert.ok(criterion.trim(), course.id));
    assert.ok(!scenarios.has(workshop.scenario), `${course.id}: duplicate scenario`);
    scenarios.add(workshop.scenario);
  }
});
