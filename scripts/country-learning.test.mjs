import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';

const cache = new Map();
function load(input) {
  const file = input.endsWith('.ts') ? input : `${input}.ts`;
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const source = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'exports', source)(name => {
    if (name.startsWith('@/')) return load(resolve('src', name.slice(2)));
    if (name.startsWith('.')) return load(resolve(dirname(file), name));
    throw new Error(`Unexpected dependency: ${name}`);
  }, exports);
  return exports;
}
const { createCountryLearningPath, countryLearningLanguageCodes } = load(resolve('src/lib/country-learning'));
const { coursesOverview } = load(resolve('src/data/courses-overview'));
const { countries } = load(resolve('src/data/countries'));

test('language matches use whole words and preserve country record order', () => {
  assert.deepEqual(countryLearningLanguageCodes('Dutch / French / German'), ['nl', 'fr', 'de']);
  assert.deepEqual(countryLearningLanguageCodes('Arabic / English'), ['ar', 'en']);
  assert.deepEqual(countryLearningLanguageCodes('Mandarin Chinese'), ['zh']);
  assert.deepEqual(countryLearningLanguageCodes('Dari / Pashto'), []);
  assert.deepEqual(countryLearningLanguageCodes('Hindustani'), []);
  assert.deepEqual(countryLearningLanguageCodes('French / French'), ['fr']);
});

test('all 195 destinations receive three complete goal paths with real published course routes', () => {
  assert.equal(countries.length, 195);
  for (const country of countries) {
    const path = createCountryLearningPath(country.language, coursesOverview);
    assert.ok(path.languages.length > 0, country.slug);
    assert.equal(path.internationalComplement, countryLearningLanguageCodes(country.language).length === 0, country.slug);
    assert.equal(new Set(path.courses.map(course => course.id)).size, path.courses.length);
    for (const course of path.courses) {
      const canonical = coursesOverview.find(item => item.id === course.id);
      assert.equal(canonical.status, 'available', course.id);
      assert.equal(course.href, `/courses/${course.id}`);
      assert.equal(course.access, canonical.learningPolicy.accessPolicy);
      assert.ok(existsSync(resolve('public', course.image.slice(1))), course.image);
    }
    for (const goal of ['arrival', 'work', 'study']) {
      const plan = path.plans[goal];
      assert.equal(plan.mobilityCourseIds.length, 3, `${country.slug}/${goal}`);
      for (const language of path.languages) {
        const id = plan.languageCourseIds[language.code];
        assert.ok(path.courses.some(course => course.id === id && course.targetLanguage === language.code), `${country.slug}/${goal}/${language.code}`);
      }
      assert.ok(path.courses.some(course => plan.mobilityCourseIds.includes(course.id) && course.access === 'free_account'), `${country.slug}/${goal} needs a free starting point`);
    }
  }
});

test('unknown local languages receive an explicitly marked international complement', () => {
  const path = createCountryLearningPath('Dzongkha', coursesOverview);
  assert.equal(path.internationalComplement, true);
  assert.deepEqual(path.languages.map(language => language.code), ['en']);
  assert.ok(path.courses.some(course => course.id === 'idiomas-en-cidade-e-transporte'));
});

test('planned, unpublished and noncanonical course entries never enter recommendations', () => {
  const path = createCountryLearningPath('English', coursesOverview.map(course => {
    if (course.id === 'arrival-playbook') return { ...course, status: 'planned' };
    if (course.id === 'housing-abroad') return { ...course, href: '/premium-waitlist' };
    if (course.id === 'relocation-budget') return { ...course, learningPolicy: { ...course.learningPolicy, publicationStatus: 'early_access' } };
    return course;
  }));
  assert.deepEqual(path.plans.arrival.mobilityCourseIds, []);
  assert.ok(!path.courses.some(course => ['arrival-playbook', 'housing-abroad', 'relocation-budget'].includes(course.id)));
});
