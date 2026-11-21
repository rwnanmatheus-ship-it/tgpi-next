import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const h = academyLocalizationFixture();
const { globalCatalog } = h.load(resolve('src/data/courses/academy/markets/global/catalog.ts'));
const { globalSpecs } = h.load(resolve('src/data/courses/academy/markets/global/specs.server.ts'));
const { globalOverview } = h.load(resolve('src/data/courses/academy/markets/global/listing.ts'));
const { courseRegions } = h.load(resolve('src/lib/learning/course-regions.ts'));
const { coursesOverview } = h.load(resolve('src/data/courses-overview.ts'));
const words = text => text.trim().split(/\s+/u).length;

test('500 regional courses add distinct authored technical content without replacing existing courses', () => {
  assert.equal(globalCatalog.length, 500);
  assert.equal(globalSpecs.length, 500);
  assert.equal(h.academyCourses.length, 1200);
  assert.equal(new Set(h.academyCourses.map(course => course.id)).size, 1200);
  for (const field of ['title', 'scenario', 'method', 'workedExample', 'decision']) {
    assert.equal(new Set(globalSpecs.map(spec => spec[field].toLocaleLowerCase('pt-BR'))).size, 500, field);
  }
  assert.equal(new Set(coursesOverview.map(course => course.title.toLocaleLowerCase('pt-BR'))).size, coursesOverview.length);
  for (const [region] of courseRegions) assert.equal(globalCatalog.filter(course => course.region === region).length, 100, region);
  for (const spec of globalSpecs) {
    assert.ok(words(spec.method) >= 120, `${spec.id}: method`);
    assert.ok(words(spec.workedExample) >= 80, `${spec.id}: example`);
    assert.equal(new Set(spec.tasks).size, 6, spec.id);
    assert.ok(spec.tasks.every(task => task.length >= 12), spec.id);
    assert.ok(spec.scenario.length >= 75, spec.id);
    assert.ok(spec.sources.length >= 2, spec.id);
    assert.ok(spec.sources.every(url => new URL(url).protocol === 'https:'), spec.id);
  }
});

test('every new course has a balanced 60h plan, source-backed technical lessons, gated access and private scoring', () => {
  for (const spec of globalSpecs) {
    const course = h.getAcademyCourse(spec.id), overview = globalOverview.find(item => item.id === spec.id);
    assert.equal(course.minutes, 3600, spec.id);
    assert.equal(course.lessons.length, 14, spec.id);
    assert.equal(course.minutes, course.lessons.reduce((sum, lesson) => sum + lesson.minutes, course.portfolioMinutes + course.assessmentMinutes));
    assert.equal(course.lessons.filter(lesson => lesson.project).length, 4);
    assert.equal(course.lessons.filter(lesson => lesson.practiceLab).length, 2);
    assert.equal(course.portfolioMinutes, 840);
    assert.equal(course.assessmentMinutes, 120);
    assert.ok(course.lessons.some(lesson => lesson.sections.some(section => section.body === spec.method)));
    assert.ok(course.lessons.some(lesson => lesson.sections.some(section => section.body === spec.workedExample && section.workedExample)));
    assert.ok(course.lessons.every(lesson => lesson.language === 'pt-BR' && lesson.references.length >= 2));
    assert.equal(overview.marketRegion, spec.region);
    assert.equal(overview.learningPolicy.accessPolicy, 'premium');
    assert.equal(overview.learningPolicy.instructionLanguage, 'pt-BR');
    assert.match(course.scopeNotice, /As 60 horas/);
    assert.match(course.scopeNotice, /não equivale a graduação/);
    assert.match(course.scopeNotice, /Fundamentos da mesma área são compartilhados/);
    assert.ok(!JSON.stringify(course).includes('correctOptionId'));
    assert.ok(!JSON.stringify(overview).includes(spec.misconception));
    const bank = h.academyQuestions(spec.id);
    assert.equal(new Set(bank.map(question => question.id)).size, bank.length);
    for (const lesson of course.lessons) assert.ok(bank.some(question => question.lessonId === lesson.id), lesson.id);
    for (const question of bank) {
      assert.equal(new Set(question.options.map(option => option.label)).size, question.options.length, question.id);
      assert.equal(question.options.filter(option => option.id === question.correctOptionId).length, 1);
    }
    assert.equal(h.getAcademyCourse(spec.id, h.BASELINE_ACADEMY_VERSION), undefined);
  }
  assert.equal(h.getAcademyCourse('global-english-2026').version, '2026.11.3');
  assert.equal(h.getAcademyCourse('global-english-2026', h.BASELINE_ACADEMY_VERSION).version, '2026.11.2');
});

test('regional discovery round-trips combined filters and cannot import private curriculum data', () => {
  const { defaultCatalogFilters, parseCatalogFilters, catalogFilterParams } = h.load(resolve('src/lib/learning/catalog-filters.ts'));
  const { courseSearchScore } = h.load(resolve('src/lib/learning/catalog-search.ts'));
  for (const [region, label] of courseRegions) {
    const filters = { ...defaultCatalogFilters, region, area: 'data', access: 'premium' };
    assert.deepEqual(parseCatalogFilters(catalogFilterParams(filters)), filters);
    assert.ok(globalOverview.filter(course => course.marketRegion === region).every(course => courseSearchScore(course, label) > 0));
  }
  assert.equal(parseCatalogFilters(new URLSearchParams('region=__proto__')).region, 'all');
  for (const file of ['catalog.ts', 'listing.ts', 'types.ts']) {
    const source = readFileSync(`src/data/courses/academy/markets/global/${file}`, 'utf8');
    assert.ok(!source.includes('.server'), file);
    assert.ok(!source.includes('correctOptionId'), file);
  }
});
