// Run with: node --experimental-strip-types scripts/refresh-country-context.mjs
// Optional --from-dir is for previously fetched raw API files with explicit .meta.json provenance.
import { readFile, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import { CONTEXT_VERSION, CONTEXT_INDICATOR_IDS, contextApiUrl, parseContextResponse, mergeContextSeries } from '../src/lib/intelligence/country-context.ts';

const run = promisify(execFile);
const destination = new URL('../src/data/intelligence/country-context.json', import.meta.url);
const identities = JSON.parse(await readFile(new URL('../src/data/intelligence/identities.json', import.meta.url), 'utf8')).countries;
const hash = text => createHash('sha256').update(text).digest('hex');
let previous = { schemaVersion: 1, methodologyVersion: CONTEXT_VERSION, revision: '', retrievedAt: null, observations: [], series: [] };
try { previous = JSON.parse(await readFile(destination, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const directoryIndex = process.argv.indexOf('--from-dir');
const directory = directoryIndex < 0 ? null : process.argv[directoryIndex + 1];
if (directoryIndex >= 0 && !directory) throw new Error('Missing raw response directory');
const updates = [];
for (let i = 0; i < CONTEXT_INDICATOR_IDS.length; i += 3) {
  const results = await Promise.allSettled(CONTEXT_INDICATOR_IDS.slice(i, i + 3).map(async indicator => {
    const url = contextApiUrl(indicator);
    let raw, retrievedAt;
    if (directory) {
      raw = await readFile(resolve(directory, `${indicator}.json`), 'utf8');
      const meta = JSON.parse(await readFile(resolve(directory, `${indicator}.meta.json`), 'utf8'));
      if (meta.url !== url) throw new Error(`Raw source URL mismatch: ${indicator}`);
      retrievedAt = meta.retrievedAt;
    } else {
      ({ stdout: raw } = await run('curl', ['--fail', '--silent', '--show-error', '--max-time', '45', '--max-filesize', '1000000', url], { maxBuffer: 1_000_000, timeout: 50_000 }));
      retrievedAt = new Date().toISOString();
    }
    if (Buffer.byteLength(raw) > 1_000_000 || Date.parse(retrievedAt) > Date.now() + 60_000) throw new Error('Invalid raw context response');
    const observations = parseContextResponse(JSON.parse(raw), indicator, identities, retrievedAt);
    return { observations, audit: { indicator, url, retrievedAt, sourceUpdatedAt: observations[0]?.sourceUpdatedAt ?? null, responseSha256: hash(raw), observations: observations.length } };
  }));
  for (const result of results) {
    if (result.status === 'fulfilled') updates.push(result.value);
    else console.warn(`Retaining original context data: ${result.reason instanceof Error ? result.reason.message : 'Source failure'}`);
  }
}
if (!updates.length) throw new Error('No sources validated; existing snapshot unchanged');
const snapshot = mergeContextSeries(previous, updates, '');
snapshot.revision = hash(JSON.stringify(snapshot.observations.map(({country,indicator,value,year})=>({country,indicator,value,year})))).slice(0,16);
const temporary = new URL(`${destination.pathname}.tmp`, 'file://');
await writeFile(temporary, JSON.stringify(snapshot, null, 2) + '\n');
await rename(temporary, destination);
console.log(JSON.stringify({ revision: snapshot.revision, collectedAt: snapshot.retrievedAt, totalCountries: identities.length, observations: snapshot.observations.length, series: snapshot.series.map(({ indicator, observations, retrievedAt }) => ({ indicator, observations, retrievedAt })) }, null, 2));
