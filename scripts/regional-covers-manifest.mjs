import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile('src/data/courses/academy/markets/global/catalog.ts', 'utf8');
const catalog = JSON.parse(source.slice(source.indexOf('[\n'), source.lastIndexOf(']') + 1));
assert.equal(catalog.length, 500);
const hashes = new Set();
const manifest = [];
const directory = 'public/images/courses/regional-covers-2026';
assert.equal((await readdir(directory)).filter(name => name.endsWith('.webp')).length, 500);
for (const course of catalog) {
  const path = `${directory}/${course.id}.webp`;
  const data = await readFile(path);
  const { width, height, format } = await sharp(data).metadata();
  assert.equal(format, 'webp', course.id);
  assert.equal(width, 1536, course.id);
  assert.equal(height, 1024, course.id);
  assert.ok(data.length <= 420_000, `${course.id}: exceeds 420 KB`);
  const sha256 = createHash('sha256').update(data).digest('hex');
  assert.ok(!hashes.has(sha256), `${course.id}: duplicate image`);
  hashes.add(sha256);
  manifest.push({ id: course.id, title: course.title, region: course.region, area: course.track, path, width, height, bytes: data.length, sha256, aiGenerated: true });
}
await writeFile('docs/learning/regional-cover-manifest-2026.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ covers: manifest.length, uniqueImages: hashes.size, regions: new Set(manifest.map(item => item.region)).size, areas: new Set(manifest.map(item => item.area)).size, bytes: manifest.reduce((sum, item) => sum + item.bytes, 0) }));
