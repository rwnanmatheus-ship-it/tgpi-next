import test from 'node:test';
import assert from 'node:assert/strict';
import { comparisonPath, restoreComparison } from '../src/lib/comparison-state.ts';
const valid = new Set(['portugal', 'canada', 'japan']);
const goals = ['overall', 'study', 'work'];
test('legacy saved selections remain usable', () => {
  assert.deepEqual(restoreComparison(['portugal','canada'], valid, goals), {countrySlugs:['portugal','canada'],goal:'overall'});
});
test('new selections preserve the decision goal', () => {
  assert.deepEqual(restoreComparison({countrySlugs:['portugal','japan'], goal:'work'}, valid, goals), {countrySlugs:['portugal','japan'],goal:'work'});
});
test('invalid storage cannot inject countries or unknown goals', () => {
  assert.equal(restoreComparison({countrySlugs:['portugal','portugal',null,'bad']}, valid, goals), null);
  assert.equal(restoreComparison(null, valid, goals), null);
  assert.equal(restoreComparison('script', valid, goals), null);
  assert.equal(restoreComparison({countrySlugs:['portugal','japan'],goal:'admin'}, valid, goals).goal, 'overall');
});
test('shared URLs retain order, deduplicate and bound countries', () => {
  assert.equal(comparisonPath(['portugal','canada','portugal','japan','france'],'work'), '/compare?country=portugal&country=canada&country=japan&country=france&goal=work');
  assert.equal(comparisonPath(['portugal','canada'],'overall'), '/compare?country=portugal&country=canada');
});
test('shared URLs cannot include arbitrary profile fields', () => {
  const restored = restoreComparison({countrySlugs:['portugal','canada'],goal:'study',nationality:'private'},valid,goals);
  assert.ok(!comparisonPath(restored.countrySlugs, restored.goal).includes('private'));
});

const { COMPARISON_CATALOG, encodeCountrySet, decodeCountrySet } = await import('../src/lib/comparison-catalog.ts');
const { normalizeActivationProgress, serializeActivationProgressForStorage, createEmptyActivationProgress, comparisonIdentity } = await import('../src/lib/activation-progress.ts');
const { csvCell, comparisonCsv } = await import('../src/lib/comparison-export.ts');
test('all 195 destinations round trip through compact links in selection order', () => {
  const selection = [...COMPARISON_CATALOG].reverse();
  const path = comparisonPath(selection, 'work');
  assert.ok(path.length < 500);
  assert.deepEqual(decodeCountrySet(new URL(path, 'https://tgpi.test').searchParams.get('set')), selection);
  assert.deepEqual(restoreComparison({countrySlugs:selection,goal:'work'},new Set(selection),goals).countrySlugs, selection);
});
test('malformed country sets fail closed and never expose arbitrary paths', () => {
  for (const value of ['v2.00','v1.zz','v1.0','v1.<script>','v1.'+'00'.repeat(196),null,{}]) assert.deepEqual(decodeCountrySet(value),[]);
  assert.deepEqual(decodeCountrySet('v1.0000'), [COMPARISON_CATALOG[0]]);
  assert.equal(comparisonPath(['portugal','javascript:alert(1)','canada'],'admin'), '/compare?country=portugal&country=canada');
});
test('compact workspace storage preserves all four full comparisons and legacy records', () => {
  const progress = createEmptyActivationProgress();
  progress.comparisons = ['study','work','live','travel'].map(goal=>({id:comparisonIdentity(COMPARISON_CATALOG,goal),countrySlugs:[...COMPARISON_CATALOG],goal,updatedAt:'2026-11-09T22:00:00.000Z'}));
  const stored = serializeActivationProgressForStorage(progress);
  assert.ok(Buffer.byteLength(JSON.stringify(stored)) < 3000);
  assert.deepEqual(normalizeActivationProgress(stored).comparisons, progress.comparisons);
  assert.deepEqual(normalizeActivationProgress(progress).comparisons, progress.comparisons);
  assert.equal(comparisonIdentity(['canada','portugal'],'work'),comparisonIdentity(['portugal','canada'],'work'));
  assert.notEqual(comparisonIdentity(['canada','portugal'],'work'),comparisonIdentity(['canada','japan'],'work'));
});
test('country set codec order stays aligned with the current country catalog', async () => {
  const {readFile} = await import('node:fs/promises');
  const current=JSON.parse(await readFile('src/data/intelligence/identities.json','utf8')).countries.map(c=>c.slug);
  assert.equal(COMPARISON_CATALOG.length,195);
  assert.deepEqual([...COMPARISON_CATALOG].sort(), current.sort());
  assert.equal(encodeCountrySet(['portugal','canada','portugal']),encodeCountrySet(['portugal','canada']));
});
test('CSV includes every selected destination, missing values, years and source links', () => {
  const countries=COMPARISON_CATALOG.map(slug=>({slug,name:slug,iso2:'PT'}));
  const csv=comparisonCsv(countries,[{country:'portugal',indicator:'SP.POP.TOTL',value:123,year:2025,retrievedAt:'2026-11-09T00:00:00Z',sourceUpdatedAt:null}]);
  assert.equal(csv.split('\r\n').length, 1+195*4);
  assert.match(csv, /"123","people","2025"/);
  assert.match(csv, /data.worldbank.org/);
  assert.match(csv, /"","people","","Not available"/);
  assert.equal(csvCell('=HYPERLINK("bad")'), '"\'=HYPERLINK(""bad"")"');
});
