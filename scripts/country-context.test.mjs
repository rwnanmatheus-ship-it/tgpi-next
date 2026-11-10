import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { createRequire } from 'node:module';
import * as contextModule from '../src/lib/intelligence/country-context.ts';
import { messages } from '../src/lib/localization/messages.ts';
import { CONTEXT_INDICATOR_IDS, CONTEXT_INDICATORS, CONTEXT_VERSION, contextApiUrl, contextSourceUrl, contextEvidenceStatus, contextObservation, parseContextResponse, mergeContextSeries } from '../src/lib/intelligence/country-context.ts';

const identities = JSON.parse(readFileSync(new URL('../src/data/intelligence/identities.json', import.meta.url), 'utf8')).countries;
const snapshot = JSON.parse(readFileSync(new URL('../src/data/intelligence/country-context.json', import.meta.url), 'utf8'));
const NOW = '2026-11-10T12:00:00Z';
test('dynamic context labels, units, explanations and producers have all six interface translations', () => {
  for (const definition of Object.values(CONTEXT_INDICATORS)) {
    for (const key of [definition.label, definition.unit, definition.explanation, definition.producer]) {
      for (const locale of ['en', 'pt-BR', 'es', 'fr', 'de', 'it']) {
        assert.ok(messages[key]?.[locale]?.trim(), `Missing ${locale} context text: ${key}`);
      }
    }
  }
});
// Synthetic fixtures test rejection paths only; they never enter production snapshots.
function fixture(id = 'SP.DYN.LE00.IN') {
  return [{ page: 1, pages: 1, total: identities.length, sourceid: null, lastupdated: '2026-10-08' }, identities.map(country => ({ countryiso3code: country.iso3, indicator: { id }, value: 75, date: '2024' }))];
}
test('new context source URLs remain fixed, registered and country-specific', () => {
  assert.equal(CONTEXT_INDICATOR_IDS.length, 5);
  for (const id of CONTEXT_INDICATOR_IDS) {
    assert.equal(new URL(contextApiUrl(id)).origin, 'https://api.worldbank.org');
    assert.ok(new URL(contextApiUrl(id)).searchParams.get('mrnev') === '1' || new URL(contextApiUrl(id)).searchParams.has('date'));
    assert.equal(new URL(contextSourceUrl(id, 'BR')).searchParams.get('locations'), 'BR');
  }
  assert.throws(() => contextApiUrl('https://127.0.0.1/secret'));
  assert.throws(() => contextSourceUrl('SP.DYN.LE00.IN', '../../secret'));
});
test('parser excludes aggregates, preserves missing as absent and allows valid zero', () => {
  const data = fixture();
  data[1][0].value = null;
  data[1][1].value = 0;
  data[1].push({ countryiso3code: 'WLD', indicator: { id: 'SP.DYN.LE00.IN' }, value: 70, date: '2024' });
  data[0].total++;
  const rows = parseContextResponse(data, 'SP.DYN.LE00.IN', identities, NOW);
  assert.equal(rows.length, identities.length - 1);
  assert.equal(rows.find(row => row.country === identities[0].slug), undefined);
  assert.equal(rows.find(row => row.country === identities[1].slug).value, 0);
  assert.ok(rows.every(row => row.year === 2024 && row.retrievedAt === NOW));
});
test('parser rejects corrupt, mixed, incomplete and implausible source data', () => {
  for (const mutate of [
    data => { data[0].pages = 2; },
    data => { data[0].sourceid = '999'; },
    data => { data[0].lastupdated = '2030-01-01'; },
    data => { data[1][0].indicator.id = 'NY.GDP.PCAP.CD'; },
    data => { data[1][0].date = '2030'; },
    data => { data[1][0].value = -1; },
    data => { data[1][0].value = 131; },
    data => { data[1][1].countryiso3code = data[1][0].countryiso3code; },
    data => { data[1].forEach((row, index) => { if (index > 10) row.value = null; }); },
  ]) {
    const data = fixture(); mutate(data);
    assert.throws(() => parseContextResponse(data, 'SP.DYN.LE00.IN', identities, NOW));
  }
});
test('source freshness and observation age remain separate', () => {
  const row = parseContextResponse(fixture(), 'SP.DYN.LE00.IN', identities, NOW)[0];
  assert.equal(contextEvidenceStatus(row, new Date(NOW)), 'current');
  assert.equal(contextEvidenceStatus({ ...row, year: 2015 }, new Date(NOW)), 'historical');
  assert.equal(contextEvidenceStatus(row, new Date('2026-11-19')), 'stale');
  assert.equal(contextEvidenceStatus(undefined), 'missing');
});
test('bounded range queries select the latest non-null year without fabricating gap-fill', () => {
  const data = fixture('EG.ELC.ACCS.ZS');
  const first = data[1][0];
  first.date = '2021';
  data[1].push({ ...first, date: '2024', value: 90 }, { ...first, date: '2025', value: null });
  data[0].total += 2;
  const rows = parseContextResponse(data, 'EG.ELC.ACCS.ZS', identities, NOW);
  const selected = rows.find(row => row.country === identities[0].slug);
  assert.equal(selected.year, 2024);
  assert.equal(selected.value, 90);
  data[1].reverse();
  assert.deepEqual(parseContextResponse(data, 'EG.ELC.ACCS.ZS', identities, NOW), rows);
  data[1].push({ ...first }); data[0].total++;
  assert.throws(() => parseContextResponse(data, 'EG.ELC.ACCS.ZS', identities, NOW), /Duplicate/);
});
test('published bundle is real, source-linked, uniquely keyed and integrity checked', () => {
  assert.equal(snapshot.schemaVersion, 1);
  assert.equal(snapshot.methodologyVersion, CONTEXT_VERSION);
  assert.equal(snapshot.series.length, 5);
  assert.ok(snapshot.observations.length >= 500);
  const keys = new Set(), countries = new Set(identities.map(row => row.slug));
  for (const row of snapshot.observations) {
    assert.ok(countries.has(row.country));
    assert.ok(CONTEXT_INDICATOR_IDS.includes(row.indicator));
    assert.ok(Number.isFinite(row.value) && row.value >= 0 && row.value <= CONTEXT_INDICATORS[row.indicator].max);
    assert.ok(row.year >= 1960 && row.year <= new Date(row.retrievedAt).getUTCFullYear());
    assert.ok(!keys.has(`${row.country}:${row.indicator}`)); keys.add(`${row.country}:${row.indicator}`);
    const audit = snapshot.series.find(series => series.indicator === row.indicator);
    assert.equal(row.retrievedAt, audit.retrievedAt);
    assert.equal(row.sourceUpdatedAt, audit.sourceUpdatedAt);
    assert.equal(contextObservation(snapshot, row.country, row.indicator), row);
  }
  for (const series of snapshot.series) {
    assert.equal(series.url, contextApiUrl(series.indicator, new Date(series.retrievedAt).getUTCFullYear()));
    assert.match(series.responseSha256, /^[a-f0-9]{64}$/);
    assert.equal(series.observations, snapshot.observations.filter(row => row.indicator === series.indicator).length);
  }
  const revision = createHash('sha256').update(JSON.stringify(snapshot.observations.map(({country,indicator,value,year})=>({country,indicator,value,year})))).digest('hex').slice(0,16);
  assert.equal(snapshot.revision, revision);
});
test('source failure and coverage regression retain original values and dates', () => {
  const retained = mergeContextSeries(snapshot, [], snapshot.revision);
  assert.deepEqual(retained, snapshot);
  const audit = snapshot.series[0];
  const rows = snapshot.observations.filter(row => row.indicator === audit.indicator).slice(0, 150);
  assert.deepEqual(mergeContextSeries(snapshot, [{ observations: rows, audit: { ...audit, retrievedAt: NOW } }], snapshot.revision), snapshot);
});

test('cold workers retain the newer cached evidence during an outage and expose overdue collection', async () => {
  const require = createRequire(import.meta.url);
  const ts = require('typescript');
  const oldDate = new Date(Date.now() - 10 * 86_400_000).toISOString();
  const oldBundle = { ...snapshot, series: snapshot.series.map(row => ({ ...row, retrievedAt: oldDate })) };
  const cached = { ...oldBundle, revision: 'newer-cached-evidence' };
  let calls = 0;
  const exports = {};
  const code = ts.transpileModule(readFileSync(new URL('../src/lib/intelligence/country-context.server.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  runInNewContext(code, { exports, Date, Buffer, require: id => {
    if (id === 'server-only') return {};
    if (id === 'node:crypto') return require(id);
    if (id === './country-context') return contextModule;
    if (id.endsWith('identities.json')) return { countries: identities };
    if (id.endsWith('country-context.json')) return oldBundle;
    if (id === 'next/cache') return { unstable_cache: () => async () => {
      if (calls++ === 0) return { snapshot: cached, status: 'available', message: null };
      throw new Error('Cache temporarily unavailable');
    } };
    throw new Error(`Unexpected dependency: ${id}`);
  } });
  const initial = await exports.getCountryContext();
  assert.equal(initial.snapshot.revision, cached.revision);
  assert.equal(initial.status, 'degraded');
  const retained = await exports.getCountryContext();
  assert.equal(retained.snapshot.revision, cached.revision);
  assert.equal(retained.status, 'degraded');
  assert.equal(retained.snapshot.series[0].retrievedAt, oldDate);
});
