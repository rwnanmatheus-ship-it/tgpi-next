import test from 'node:test';
import assert from 'node:assert/strict';
import { regionalComparison } from '../src/lib/intelligence/regional-comparison.ts';
import { nationalDossierIndicators } from '../src/lib/intelligence/dossier-context.ts';
import { DOSSIER_SOURCES, DOSSIER_CLAIMS, EDITORIAL_RESOLUTIONS, OFFICIAL_SERVICE_NOTICES, SOURCE_REVIEW_ISSUES } from '../src/lib/intelligence/dossiers.ts';
import { RESEARCH_SOURCES, RESEARCH_COUNTRIES } from '../src/lib/intelligence/global-research.ts';

test('six explicit editorial resolutions preserve historical issues and external suspension', () => {
  assert.equal(EDITORIAL_RESOLUTIONS.length, 6);
  assert.equal(new Set(EDITORIAL_RESOLUTIONS.map(r => r.sourceId)).size, 6);
  for (const review of EDITORIAL_RESOLUTIONS) {
    const source = DOSSIER_SOURCES.find(s => s.id === review.sourceId);
    assert.ok(SOURCE_REVIEW_ISSUES[review.sourceId]);
    assert.equal(source.reviewIssue, undefined);
    assert.equal(source.reviewedAt, review.reviewedAt);
    assert.equal(source.url, review.url);
    assert.ok(review.decision.length > 40);
    assert.ok(DOSSIER_CLAIMS.some(c => c.sourceId === review.sourceId));
  }
  const aima = EDITORIAL_RESOLUTIONS.find(r => r.sourceId === 'pt-aima');
  assert.equal(aima.method, 'primary-search-extract');
  assert.match(aima.decision, /502/);
  assert.equal(DOSSIER_SOURCES.find(s => s.id === 'pt-aima').automaticCheck, false);
  assert.equal(OFFICIAL_SERVICE_NOTICES[0].country, 'spain');
  assert.equal(OFFICIAL_SERVICE_NOTICES[0].status, 'external-service-notice');
  assert.match(OFFICIAL_SERVICE_NOTICES[0].summary, /resumption has not been confirmed/);
});

test('export adds nine unique original indicators with provenance and preserves missing observations', () => {
  for (const country of RESEARCH_COUNTRIES) {
    const indicators = nationalDossierIndicators(country.slug, new Date('2026-11-12'));
    assert.equal(indicators.length, 9);
    assert.equal(new Set(indicators.map(row => row.id)).size, 9);
    for (const row of indicators) {
      assert.ok(row.series?.responseSha256);
      if (row.observation) assert.equal(row.observation.country, country.slug);
      else assert.equal(row.state, 'missing');
    }
  }
  assert.ok(nationalDossierIndicators('vatican-city').every(row => row.observation === null));
});

test('regional comparison excludes country, other years and other regions; needs five peers', () => {
  const countries = Array.from({ length: 8 }, (_, i) => ({ slug: `c${i}`, region: i === 7 ? 'Elsewhere' : 'Region' }));
  const row = { country: 'c0', indicator: 'SL.TLF.CACT.ZS', year: 2025, value: 99 };
  const rows = countries.map((c, i) => ({ ...row, country: c.slug, value: i * 10 }));
  assert.equal(regionalComparison(row, rows, countries).median, 35);
  assert.equal(regionalComparison(row, rows, countries).peers, 6);
  const mixed = rows.map(r => r.country === 'c6' ? { ...r, year: 2024 } : r);
  assert.equal(regionalComparison(row, mixed, countries).median, 30);
  assert.equal(regionalComparison(row, mixed, countries).peers, 5);
  assert.equal(regionalComparison(row, mixed.slice(0, 5), countries), null);
  assert.equal(regionalComparison(undefined, rows, countries), null);
  assert.equal(regionalComparison(row, [...rows, rows[1]], countries), null);
});

test('supporting official descriptions do not relabel restricted database access', () => {
  const references = RESEARCH_SOURCES.filter(source => source.supportingReference);
  assert.equal(references.length, 3);
  for (const source of references) {
    assert.equal(new URL(source.supportingReference.url).protocol, 'https:');
    assert.equal(source.supportingReference.scope, 'Publisher scope and methodology');
    assert.notEqual(source.supportingReference.url, source.url);
  }
});

test('browser challenges never become article evidence; partial pages declare their scope', async () => {
  const { inspectSourceText } = await import('../src/lib/intelligence/source-checks.ts');
  const source = DOSSIER_SOURCES.find(s => s.id === 'de-visa');
  assert.equal(source.automaticCheck, false);
  assert.match(source.diagnosticNote, /browser-verification/);
  const result = inspectSourceText(source, '<title>Radware Page</title><p>Verifying your browser before proceeding...</p><div>Incident ID: test</div>');
  assert.equal(result.status, 'restricted');
  assert.equal(result.matchedMarkers, 0);
  assert.match(DOSSIER_SOURCES.find(s => s.id === 'nl-study').diagnosticNote, /landing page only/);
  assert.match(DOSSIER_SOURCES.find(s => s.id === 'au-cricos').diagnosticNote, /does not establish a public outage/);
});
