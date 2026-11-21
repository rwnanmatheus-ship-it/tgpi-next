import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import sharp from 'sharp';
import { courseArtwork } from '../src/lib/cinematic-art.ts';
import { regionalCoverIds } from '../src/lib/learning/regional-covers.ts';

test('500 regional courses resolve to distinct verified course photographs while preserving existing artwork', async () => {
  const source = readFileSync('src/data/courses/academy/markets/global/catalog.ts', 'utf8');
  const catalog = JSON.parse(source.slice(source.indexOf('[\n'), source.lastIndexOf(']') + 1));
  const manifest = JSON.parse(readFileSync('docs/learning/regional-cover-manifest-2026.json', 'utf8'));
  assert.equal(catalog.length, 500);
  assert.equal(manifest.length, 500);
  assert.deepEqual(regionalCoverIds, new Set(catalog.map(course => course.id)));
  assert.deepEqual(new Set(manifest.map(item => item.id)), regionalCoverIds);
  const hashes = new Set();
  for (const item of manifest) {
    const course = catalog.find(entry => entry.id === item.id);
    assert.equal(course.title, item.title);
    assert.equal(course.region, item.region);
    assert.equal(course.track, item.area);
    const url = courseArtwork(item.id);
    assert.equal(url, `/images/courses/regional-covers-2026/${item.id}.webp`);
    const data = readFileSync('public' + url);
    const hash = createHash('sha256').update(data).digest('hex');
    assert.equal(hash, item.sha256, item.id);
    assert.equal(data.length, item.bytes, item.id);
    assert.ok(data.length <= 420_000, item.id);
    assert.ok(!hashes.has(hash), `${item.id}: duplicate photograph`);
    hashes.add(hash);
    const metadata = await sharp(data).metadata();
    assert.equal(metadata.width, 1536, item.id);
    assert.equal(metadata.height, 1024, item.id);
    assert.equal(metadata.format, 'webp', item.id);
  }
  assert.equal(courseArtwork('triagem-soc'), '/images/courses/market-covers-2026/triagem-soc.webp');
  assert.equal(courseArtwork('country-fit'), '/images/courses/academy-covers-2026/country-fit.webp');
  for (const id of ['__proto__', 'constructor', 'toString']) assert.equal(courseArtwork(id), '/images/cinematic-2026/learning-atelier-1600.webp');
});
