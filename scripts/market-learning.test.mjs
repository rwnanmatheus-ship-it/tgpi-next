import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';
import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const h = academyLocalizationFixture();
const { marketCatalog } = h.load(resolve('src/data/courses/academy/markets/catalog.ts'));
const { marketSpecs } = h.load(resolve('src/data/courses/academy/markets/specs.server.ts'));
const { marketOverview } = h.load(resolve('src/data/courses/academy/markets/listing.ts'));
const { isPremiumAcademyCourse } = h.load(resolve('src/data/courses/academy/premium-policy.ts'));

test('400 occupational cases are distinct, fully routed and consistent with their public entitlement and workload', () => {
  assert.equal(marketCatalog.length, 400);
  assert.equal(new Set(marketSpecs.map(item => item.scenario)).size, 400);
  assert.equal(new Set(marketSpecs.map(item => item.decision)).size, 400);
  assert.equal(new Set(marketCatalog.map(item => item.title)).size, 400);
  assert.equal(Map.groupBy(marketCatalog, item => item.track).size, 10);
  for (const [track, entries] of Map.groupBy(marketCatalog, item => item.track)) assert.equal(entries.length, {
  "ai": 20,
  "cyber": 10,
  "data": 40,
  "energy": 30,
  "care": 30,
  "industry": 40,
  "logistics": 60,
  "quality": 10,
  "business": 100,
  "content": 60
}[track]);
  for (const item of marketCatalog) {
    const course = h.getAcademyCourse(item.id), listing = marketOverview.find(row => row.id === item.id);
    assert.ok(course && listing, item.id);
    assert.equal(listing.href, `/courses/${course.id}`);
    assert.equal(listing.professionalArea, item.track);
    assert.equal(listing.learningPolicy.instructionLanguage, 'pt-BR');
    assert.equal(listing.learningPolicy.accessPolicy, 'premium');
    assert.equal(isPremiumAcademyCourse(course.id), true);
    assert.equal(course.minutes, 2400);
    assert.equal(course.minutes, course.lessons.reduce((sum, lesson) => sum + lesson.minutes, course.portfolioMinutes + course.assessmentMinutes));
    assert.equal(course.lessons.filter(lesson => lesson.project).reduce((sum, lesson) => sum + lesson.minutes, 0), 1020);
    assert.equal(course.lessons.filter(lesson => lesson.practiceLab).reduce((sum, lesson) => sum + lesson.minutes, 0), 180);
    assert.equal(new Set(course.outcomes).size, 6);
    assert.equal(new Set(course.lessons.map(lesson => lesson.id)).size, 12);
    assert.match(course.scopeNotice, /não equivale a graduação/);
    assert.match(course.scopeNotice, /não horas de vídeo/);
    assert.match(course.scopeNotice, /Fundamentos da mesma área são compartilhados/);
    for (const lesson of course.lessons) {
      assert.ok(h.academyQuestions(course.id).some(question => question.lessonId === lesson.id));
      assert.equal(lesson.language, 'pt-BR');
      assert.ok(lesson.references.length >= 2);
    }
    assert.ok(!JSON.stringify(course).includes('correctOptionId'));
    assert.ok(!JSON.stringify(listing).includes('correctOptionId'));
  }
});

test('public metadata cannot silently import protected case decisions or question banks', () => {
  for (const file of ['catalog.ts', 'listing.ts', 'types.ts']) {
    const source = readFileSync(`src/data/courses/academy/markets/${file}`, 'utf8');
    assert.ok(!source.includes('.server'), file);
    const runtime = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
    assert.ok(!runtime.includes('correctOptionId'), file);
    assert.ok(!runtime.includes('misconception'), file);
  }
  const study = readFileSync('src/app/courses/[id]/study/page.tsx', 'utf8');
  assert.ok(study.indexOf('requirePremium(path)') < study.indexOf('return <AcademyStudy'));
});

test('every course appears in the sitemap independently of whether it has a dedicated cover', () => {
  const sitemap = h.load(resolve('src/app/sitemap.ts')).default();
  const urls = new Set(sitemap.map(item => item.url));
  for (const course of h.academyCourses) assert.ok(urls.has(`https://www.theglobalpolymath.com/courses/${course.id}`), course.id);
  assert.equal(urls.size, sitemap.length);
  for (const suffix of ['/study', '/certification', '/history']) assert.ok(!sitemap.some(item => item.url.endsWith(suffix)));
});

test('canonical public guide and each country have their live cover in the image sitemap', () => {
  const origin = 'https://www.theglobalpolymath.com';
  const sitemap = new Map(h.load(resolve('src/app/sitemap.ts')).default().map(row => [row.url, row]));
  const { getAllCountries, getCountryImageUrl } = h.load(resolve('src/lib/countries.ts'));
  const { getCountryPhotos } = h.load(resolve('src/lib/countries/editorial-photography.ts'));
  assert.ok(sitemap.has(origin + '/guia-paises'));
  for (const country of getAllCountries()) {
    const images = sitemap.get(origin + '/countries/' + country.slug)?.images;
    const cover = getCountryPhotos(country.slug)[0]?.src ?? getCountryImageUrl(country);
    assert.equal(images?.[0], origin + cover);
    for (const image of images) assert.ok(existsSync('public' + new URL(image).pathname), image);
  }
});

test('unknown artwork IDs cannot select inherited object properties', () => {
  const { courseArtwork } = h.load(resolve('src/lib/cinematic-art.ts'));
  for (const id of ['toString', 'constructor', '__proto__']) assert.equal(courseArtwork(id), '/images/cinematic-2026/learning-atelier-1600.webp');
});


test('new professional themes can be discovered through English job-market vocabulary', () => {
  const { courseSearchScore } = h.load(resolve('src/lib/learning/catalog-search.ts'));
  for (const [query, id] of [['batteries', 'planejamento-baterias'], ['health', 'qualidade-dados-saude'], ['logistics', 'logistica-reversa-tecnologia'], ['manufacturing', 'manufatura-aditiva-operacoes'], ['accessibility', 'acessibilidade-documentos-digitais']]) {
    assert.ok(courseSearchScore(marketOverview.find(item => item.id === id), query) > 0, query);
  }
});
