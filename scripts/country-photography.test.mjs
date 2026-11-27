import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import sharp from 'sharp';

const catalog = JSON.parse(readFileSync('src/lib/countries/high-resolution-photography.json', 'utf8'));
const identities = JSON.parse(readFileSync('src/data/intelligence/identities.json', 'utf8')).countries;

test('every country has its own credited, locally hosted high-resolution photograph', () => {
  assert.deepEqual(Object.keys(catalog).sort(), identities.map(country => country.slug).sort());
  const paths = new Set();
  const hashes = new Set();
  for (const [slug, entry] of Object.entries(catalog)) {
    assert.ok(entry.photo.src.startsWith(`/images/countries/photography-hd/${slug}-`), slug);
    assert.equal(entry.photo.creditUrl, `/images/countries/photography-hd/credits.html#${slug}`);
    assert.ok(entry.photo.location && entry.photo.alt && entry.source.photographer, slug);
    assert.ok(!paths.has(entry.photo.src), `${slug}: reused image path`);
    assert.ok(!hashes.has(entry.asset.sha256), `${slug}: duplicate photograph`);
    paths.add(entry.photo.src);
    hashes.add(entry.asset.sha256);
  }
});

test('published photographs meet native-resolution, integrity and format requirements', async () => {
  for (const [slug, entry] of Object.entries(catalog)) {
    const bytes = readFileSync(resolve('public', entry.photo.src.slice(1)));
    const image = await sharp(bytes).metadata();
    assert.equal(image.format, 'webp', slug);
    assert.equal(image.width, entry.asset.width, slug);
    assert.equal(image.height, entry.asset.height, slug);
    assert.ok(image.width >= 2560 && image.height >= 1440, `${slug}: resolution`);
    // EXIF orientation can swap axes; compare the ordered native dimensions.
    const output = [image.width, image.height].sort((a, b) => a - b);
    const native = [entry.source.originalWidth, entry.source.originalHeight].sort((a, b) => a - b);
    assert.ok(output.every((dimension, index) => dimension <= native[index]), `${slug}: artificial enlargement`);
    assert.equal(bytes.length, entry.asset.bytes, slug);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.asset.sha256, slug);
  }
});

test('photography credits retain the creator, original source and reusable license for each country', () => {
  const credits = readFileSync('public/images/countries/photography-hd/credits.html', 'utf8');
  for (const [slug, entry] of Object.entries(catalog)) {
    assert.ok(credits.includes(`id="${slug}"`), `${slug}: missing attribution`);
    const source = new URL(entry.source.url);
    assert.ok(['commons.wikimedia.org', 'unsplash.com'].includes(source.hostname), slug);
    assert.ok(!/\bNC\b|\bND\b/.test(entry.source.license), `${slug}: restricted license`);
    assert.ok(entry.source.licenseUrl.startsWith('https://'), `${slug}: license reference`);
    assert.ok(credits.includes('no generative fill or artificial enlargement'));
  }
});
