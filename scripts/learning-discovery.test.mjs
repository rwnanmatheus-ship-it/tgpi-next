import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
import ts from 'typescript';
import sharp from 'sharp';
import { dirname, resolve } from 'node:path';
function moduleAt(path) { const result = {}; new Function('require', 'exports', ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(id => {
  if (!id.startsWith('.') && !id.startsWith('@/')) throw new Error(`Unexpected dependency: ${id}`);
  const target = id.startsWith('@/') ? resolve('src', id.slice(2)) : resolve(dirname(path), id);
  return moduleAt(target.endsWith('.ts') ? target : `${target}.ts`);
}, result); return result; }
const { courseSearchScore, normalizeCourseSearch, moveCourseSuggestion, courseMinutes, studyWeeks } = moduleAt('src/lib/learning/catalog-search.ts');
const make = (title, desc='') => ({title,desc,category:'Learning',goalLabel:'Practice',benefits:[]});
test('course search handles accents, prefixes, translations and small spelling errors', () => {
 assert.equal(normalizeCourseSearch(' INGLÊS / AÇÃO '),'ingles acao');
 assert.ok(courseSearchScore(make('Global English'),'ingles')>0);
 assert.ok(courseSearchScore(make('Python automation'),'pythn')>0);
 assert.ok(courseSearchScore(make('Career abroad'),'carr',text=>text==='Career abroad'?'Carreira internacional':text)>0);
 assert.ok(courseSearchScore(make('Career abroad'),'career')>courseSearchScore(make('Other course','Build your career'),'career'));
 assert.equal(courseSearchScore(make('Career abroad'),'python'),0);
});
test('short AI aliases cannot match arbitrary syllables and every query token must match', () => {
 assert.equal(courseSearchScore(make('Carreira internacional'),'ia'),0);
 assert.ok(courseSearchScore(make('AI workflow'),'ia')>0);
 assert.equal(courseSearchScore(make('English for work'),'english python'),0);
 assert.ok(courseSearchScore(make('Budget planning'),'orcamento')>0);
});
test('study estimates use workload minutes without promising a completion date', () => {
 assert.equal(courseMinutes('11h 40m'),700);
 assert.equal(courseMinutes('6h 15m'),375);
 assert.equal(studyWeeks(700,120),6);
 assert.equal(studyWeeks(700,300),3);
 assert.equal(studyWeeks(0,0),1);
});
test('the 100 Academy covers are unique, optimized WebP files with subject badges', async () => {
  const { academyCoverIds, courseArtwork, courseCoverBadges } = moduleAt('src/lib/cinematic-art.ts');
  const seen = new Set();
  assert.equal(academyCoverIds.length, 100);
  for (const id of academyCoverIds) {
    const asset = courseArtwork(id);
    assert.equal(asset, `/images/courses/academy-covers-2026/${id}.webp`);
    assert.ok(existsSync('public' + asset), id);
    const data = readFileSync('public' + asset);
    const hash = createHash('sha256').update(data).digest('hex');
    assert.ok(!seen.has(hash), id);
    seen.add(hash);
    const { format, width, height } = await sharp(data).metadata();
    assert.equal(format, 'webp', id);
    assert.equal(width, 1536, id);
    assert.equal(height, 1024, id);
    assert.ok(data.length <= 420_000, `${id} is larger than 420 KB`);
    assert.ok(courseCoverBadges(id).every(label => label.length <= 32), id);
  }
  assert.deepEqual(courseCoverBadges('planilhas-decisoes-profissionais'), ['Excel', 'Google Sheets']);
  assert.deepEqual(courseCoverBadges('espanhol-negocios-latam'), ['ES · B1–B2']);
  assert.equal(courseCoverBadges('toString'), undefined);
});

test('keyboard suggestions start from the correct endpoint and wrap safely', () => {
  assert.equal(moveCourseSuggestion(-1, 5, 'ArrowUp'), 4);
  assert.equal(moveCourseSuggestion(-1, 5, 'ArrowDown'), 0);
  assert.equal(moveCourseSuggestion(0, 5, 'ArrowUp'), 4);
  assert.equal(moveCourseSuggestion(4, 5, 'ArrowDown'), 0);
  assert.equal(moveCourseSuggestion(4, 2, 'ArrowDown'), 0);
  assert.equal(moveCourseSuggestion(-1, 0, 'ArrowUp'), -1);
});

test('all 100 new market covers are dedicated, distinct and suitable for responsive cards', async () => {
  const { marketCoverIds, academyCoverIds, courseArtwork, courseCoverBadges } = moduleAt('src/lib/cinematic-art.ts');
  const prompts = JSON.parse(readFileSync('docs/learning/market-cover-prompts-2026.json', 'utf8'));
  assert.equal(marketCoverIds.length, 100);
  assert.deepEqual(new Set(marketCoverIds), new Set(prompts.map(item => item.id)));
  const hashes = new Set(academyCoverIds.map(id => createHash('sha256').update(readFileSync('public' + courseArtwork(id))).digest('hex')));
  for (const id of marketCoverIds) {
    const asset = courseArtwork(id);
    assert.equal(asset, `/images/courses/market-covers-2026/${id}.webp`);
    const data = readFileSync('public' + asset);
    const hash = createHash('sha256').update(data).digest('hex');
    assert.ok(!hashes.has(hash), `${id} reuses another cover`);
    hashes.add(hash);
    const metadata = await sharp(data).metadata();
    assert.equal(metadata.format, 'webp', id);
    assert.equal(metadata.width, 1536, id);
    assert.equal(metadata.height, 1024, id);
    assert.ok(data.length <= 420_000, id);
    assert.ok(courseCoverBadges(id)?.every(label => label.length > 0 && label.length <= 32), id);
  }
});

test('natural course queries ignore connectors and tolerate adjacent transpositions', () => {
 assert.ok(courseSearchScore(make('Inglês para carreira internacional'), 'quero aprender ingles') > 0);
 assert.ok(courseSearchScore(make('Inglês para carreira internacional'), 'curso de ingles') > 0);
 assert.ok(courseSearchScore(make('Inglês para carreira internacional'), 'ingles para carreira') > 0);
 assert.ok(courseSearchScore(make('Python automation'), 'pyhton') > 0);
 assert.ok(courseSearchScore(make('Spanish for business'), 'espanhol negocios') > 0);
 assert.ok(courseSearchScore(make('AI workflow'), 'inteligencia artificial') > 0);
 assert.equal(courseSearchScore(make('Python automation'), 'pyhton finance'), 0);
 assert.equal(courseSearchScore(make('Carreira internacional'), 'ia'), 0);
});
