import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { internationalCoverIds, courseSector } from '../src/lib/learning/international-covers.ts';

const prompts = internationalCoverIds.map(id => ({ id, sector: courseSector(id) }));
assert.equal(prompts.length, 300);
assert.equal(new Set(prompts.map(item => item.id)).size, 300);
const hashes = new Set();
const manifest = [];
for (const { id, sector } of prompts) {
  const path = `public/images/courses/international-covers-2026/${id}.webp`;
  const data = await readFile(path);
  const { width, height, format } = await sharp(data).metadata();
  assert.equal(format, 'webp', id);
  assert.equal(width, 1536, id);
  assert.equal(height, 1024, id);
  assert.ok(data.length <= 420_000, `${id}: image exceeds 420 KB`);
  const sha256 = createHash('sha256').update(data).digest('hex');
  assert.ok(!hashes.has(sha256), `${id}: duplicated cover`);
  hashes.add(sha256);
  manifest.push({ id, sector, path, width, height, bytes: data.length, sha256, aiGenerated: true });
}
await writeFile('docs/learning/international-cover-manifest-2026.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ covers: manifest.length, bytes: manifest.reduce((sum, item) => sum + item.bytes, 0), sectors: new Set(manifest.map(item => item.sector)).size }));
