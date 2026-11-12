// Explicit editorial data refresh. This never changes legal-summary review dates.
import { readFile, writeFile, rename } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { DEEP_INDICATOR_IDS, parseDeepSeries } from '../src/lib/intelligence/deep-context.ts';
const run = promisify(execFile);
const file = new URL('../src/data/intelligence/deep-context.json', import.meta.url);
const previous = JSON.parse(await readFile(file, 'utf8'));
const identities = JSON.parse(await readFile(new URL('../src/data/intelligence/identities.json', import.meta.url), 'utf8')).countries;
const accepted = new Map();
for (let i = 0; i < DEEP_INDICATOR_IDS.length; i += 3) {
  const results = await Promise.allSettled(DEEP_INDICATOR_IDS.slice(i, i + 3).map(async indicator => {
    const url = `https://api.worldbank.org/v2/country/all/indicator/${indicator}?source=2&format=json&date=2015:${new Date().getUTCFullYear()}&per_page=20000`;
    const { stdout: raw } = await run('curl', ['--fail', '--silent', '--show-error', '--max-time', '45', '--max-filesize', '5000000', url], { maxBuffer: 5000000, timeout: 50000 });
    const payload = JSON.parse(raw);
    const observations = parseDeepSeries(payload, indicator, identities);
    const oldCount = previous.series.find(s => s.indicator === indicator)?.observations ?? 0;
    if (observations.length < oldCount * .9) throw new Error(`Coverage decreased: ${indicator}`);
    return { indicator, observations, audit: { indicator, url, retrievedAt: new Date().toISOString(), sourceUpdatedAt: payload[0].lastupdated ?? null, responseSha256: createHash('sha256').update(raw).digest('hex'), observations: observations.length } };
  }));
  for (const result of results) {
    if (result.status === 'fulfilled') accepted.set(result.value.indicator, result.value);
    else console.warn(String(result.reason));
  }
}
if (!accepted.size) throw new Error('No validated updates; retained snapshot unchanged');
const snapshot = { ...previous, series: DEEP_INDICATOR_IDS.flatMap(id => accepted.get(id)?.audit ?? previous.series.filter(s => s.indicator === id)), observations: DEEP_INDICATOR_IDS.flatMap(id => accepted.get(id)?.observations ?? previous.observations.filter(row => row.indicator === id)).sort((a,b) => a.country.localeCompare(b.country) || a.indicator.localeCompare(b.indicator)) };
await writeFile(new URL(`${file.pathname}.tmp`, 'file://'), JSON.stringify(snapshot, null, 2) + '\n');
await rename(new URL(`${file.pathname}.tmp`, 'file://'), file);
console.log(JSON.stringify({ updated: accepted.size, series: snapshot.series.length, observations: snapshot.observations.length }));
