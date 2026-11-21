import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import ts from 'typescript';

function moduleAt(path) {
  const result = {};
  const source = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'exports', source)(id => {
    if (!id.startsWith('.') && !id.startsWith('@/')) throw new Error(`Unexpected dependency: ${id}`);
    const target = id.startsWith('@/') ? resolve('src', id.slice(2)) : resolve(dirname(path), id);
    return moduleAt(target.endsWith('.ts') ? target : `${target}.ts`);
  }, result);
  return result;
}

test('international cover discovery preserves combined filters, regional compatibility and six locales', () => {
  const { courseSectors, courseSector, courseSectorCopy } = moduleAt('src/lib/learning/international-covers.ts');
  const { parseCatalogFilters, defaultCatalogFilters, catalogFilterParams } = moduleAt('src/lib/learning/catalog-filters.ts');
  assert.equal(courseSectors.length, 30);
  assert.equal(new Set(courseSectors.map(item => item.id)).size, 30);
  for (const sector of courseSectors) {
    const filters = { ...defaultCatalogFilters, sector: sector.id, query: 'gestão', access: 'premium' };
    assert.deepEqual(parseCatalogFilters(catalogFilterParams(filters)), filters);
    for (const locale of ['en', 'pt-BR', 'es', 'fr', 'de', 'it']) {
      assert.ok(sector.labels[locale].trim());
      for (const key of ['sector', 'allSectors', 'expansion']) assert.ok(courseSectorCopy(locale, key).trim());
    }
  }
  assert.equal(parseCatalogFilters(new URLSearchParams('sector=__proto__')).sector, 'all');
  assert.equal(parseCatalogFilters(new URLSearchParams('sector=unknown')).sector, 'all');
  assert.equal(courseSector('__proto__'), undefined);
  assert.equal(courseSector('toString'), undefined);
  assert.equal(catalogFilterParams(defaultCatalogFilters, new URLSearchParams('sector=hotelaria')).has('sector'), false);
  const regional = { ...defaultCatalogFilters, region: 'north-america' };
  assert.deepEqual(parseCatalogFilters(catalogFilterParams(regional)), regional);
});

test('all 300 international courses have unique, correctly linked, responsive photographic covers', async () => {
  const { internationalCourseSectors, internationalCoverIds, courseSector, courseSectors } = moduleAt('src/lib/learning/international-covers.ts');
  const { internationalCatalog } = moduleAt('src/data/courses/academy/markets/international/catalog.ts');
  const { marketCatalog } = moduleAt('src/data/courses/academy/markets/catalog.ts');
  const { courseArtwork, courseCoverBadges, academyCoverIds, marketCoverIds } = moduleAt('src/lib/cinematic-art.ts');

  const manifest = JSON.parse(readFileSync('docs/learning/international-cover-manifest-2026.json', 'utf8'));
  assert.equal(internationalCoverIds.length, 300);

  assert.equal(manifest.length, 300);

  assert.deepEqual(new Set(internationalCoverIds), new Set(manifest.map(item => item.id)));
  for (const course of internationalCatalog) assert.ok(internationalCoverIds.includes(course.id), course.id);
  for (const id of internationalCoverIds) assert.ok(marketCatalog.some(course => course.id === id), `${id}: unknown course`);
  for (const sector of courseSectors) assert.equal(Object.values(internationalCourseSectors).filter(id => id === sector.id).length, 10, sector.id);
  const hashes = new Set([...academyCoverIds, ...marketCoverIds].map(id => createHash('sha256').update(readFileSync('public' + courseArtwork(id))).digest('hex')));
  for (const item of manifest) {
    const asset = courseArtwork(item.id);
    assert.equal(asset, `/images/courses/international-covers-2026/${item.id}.webp`);
    const data = readFileSync('public' + asset);
    const hash = createHash('sha256').update(data).digest('hex');
    assert.ok(!hashes.has(hash), `${item.id}: reused cover`);
    hashes.add(hash);
    assert.equal(hash, item.sha256, item.id);
    assert.equal(item.bytes, data.length, item.id);
    assert.ok(data.length <= 420_000, item.id);
    const metadata = await sharp(data).metadata();
    assert.equal(metadata.format, 'webp', item.id);
    assert.equal(metadata.width, 1536, item.id);
    assert.equal(metadata.height, 1024, item.id);
    assert.equal(courseSector(item.id), item.sector, item.id);
    assert.ok(courseCoverBadges(item.id)?.every(label => label.length > 0 && label.length <= 32), item.id);
  }
});
