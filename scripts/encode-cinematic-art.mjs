import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Run only with an explicit JSON array of { key, source } from approved generated originals.
const manifest = process.argv[2];
if (!manifest) throw new Error('Provide the generated-original manifest path.');
const inputs = JSON.parse(await readFile(manifest, 'utf8'));
const directory = new URL('../public/images/cinematic-2026/', import.meta.url);
await mkdir(directory, { recursive: true });
const results = [];
for (const { key, source } of inputs) {
  if (!/^[a-z-]+$/.test(key)) throw new Error('Invalid art key');
  const original = await sharp(source).metadata();
  const variants = [];
  for (const width of [480, 800, 1200, 1600]) {
    for (const format of ['avif', 'webp']) {
      const file = `${key}-${width}.${format}`;
      const pipeline = sharp(source).resize({ width, height: Math.round(width * 9 / 16), fit: 'cover', position: 'centre', withoutEnlargement: true });
      const info = await pipeline.toFormat(format, format === 'avif' ? { quality: 57, effort: 4 } : { quality: 83, effort: 5 }).toFile(fileURLToPath(new URL(file, directory)));
      variants.push({ file, width: info.width, height: info.height, bytes: info.size });
    }
  }
  results.push({ key, originalWidth: original.width, originalHeight: original.height, variants });
  console.log(key);
}
const manifestUrl = new URL('../docs/cinematic-2026/asset-manifest.json', import.meta.url);
let previous = [];
try { previous = JSON.parse(await readFile(manifestUrl, 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const updated = new Map(previous.map(item => [item.key, item]));
for (const item of results) updated.set(item.key, item);
await writeFile(manifestUrl, JSON.stringify([...updated.values()], null, 2) + '\n');
