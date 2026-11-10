import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { PDFDocument } from 'pdf-lib';
import ts from 'typescript';
import identities from '../src/data/intelligence/identities.json' with { type: 'json' };
import * as plan from '../src/lib/intelligence/research-plan.ts';
import * as dossiers from '../src/lib/intelligence/dossiers.ts';
import * as core from '../src/lib/intelligence/core.ts';
import { createResearchPdf } from '../src/lib/research-pdf.server.ts';
import { researchReportCopy } from '../src/lib/intelligence/report-copy.ts';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const translations = academyLocalizationFixture();
const worksheet = plan.emptyWorksheet('portugal', 'EUR');
worksheet.monthly.housing = 1234.56;
worksheet.monthly.food = 250;
worksheet.sourceNote = 'Member-authored quote';
worksheet.city = 'Lisbon';
const origin = 'https://tgpi.example';
function fixture(locale, onRender, goal = 'work', horizon = '3-months') {
  const exports = {};
  const source = readFileSync(new URL('../src/app/api/intelligence/report/route.ts', import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const imports = {
    '@clerk/nextjs/server': { currentUser: async () => ({ unsafeMetadata: { tgpiLocale: 'en', tgpiAccountProfile: { profession: 'Custom Data Scientist', languages: ['English'] }, tgpiOnboarding: {} } }) },
    '@/data/intelligence/identities.json': { __esModule: true, default: identities },
    '@/lib/intelligence/research-plan': plan,
    '@/lib/intelligence/dossiers': dossiers,
    '@/lib/account-profile': { mergeAccountProfileWithOnboarding: value => value },
    '@/lib/onboarding': { normalizeOnboardingData: () => ({ primaryGoal: goal, timeHorizon: horizon }) },
    '@/lib/research-pdf.server': { createResearchPdf: async (input, selected) => { onRender(input, selected); return Buffer.from('%PDF-1.7 test'); } },
    '@/lib/localization/server': { getLocaleForAccount: async accountLocale => { assert.equal(accountLocale, 'en'); return locale; } },
    '@/lib/localization/messages': translations.messages,
    '@/lib/intelligence/report-copy': { researchReportCopy },
    '@/lib/intelligence/server': { getIntelligence: async () => ({ snapshot: { observations: [{ country: 'portugal', indicator: 'SP.POP.TOTL', value: 10_639_726, year: 2024, retrievedAt: '2026-11-10T00:00:00Z' }] } }) },
    '@/lib/intelligence/core': core,
  };
  runInNewContext(code, { exports, require: name => { if (!(name in imports)) throw Error(name); return imports[name]; }, Response, Request, Buffer, URL, SyntaxError });
  return exports;
}
function request(value = worksheet, url = origin) {
  return new Request(`${origin}/api/intelligence/report`, { method: 'POST', headers: { origin: url, 'content-type': 'application/json' }, body: JSON.stringify(value) });
}

test('a fresh research download follows the chosen device locale, preserving raw numbers, URLs, user text and dossier evidence', async () => {
  for (const locale of translations.locales) {
    let rendered;
    const route = fixture(locale, (input, selected) => { rendered = { input, selected }; });
    const response = await route.POST(request());
    assert.equal(response.status, 200, `${locale}: ${await response.text()}`);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    assert.equal(rendered.selected, locale);
    const input = rendered.input, t = value => translations.messages.translate(locale, value);
    assert.equal(input.name, t('Portugal'));
    assert.equal(input.worksheet.monthly.housing, 1234.56);
    assert.equal(input.worksheet.sourceNote, 'Member-authored quote');
    assert.ok(input.context[1].includes('Custom Data Scientist'));
    assert.ok(input.context[0].includes(`${t('Goal')}: ${t('Work globally')}`));
    assert.ok(input.context[0].includes(`${t('Timeline')}: ${t('Within 3 months')}`));
    assert.ok(input.context[1].includes(t('English')));
    assert.ok(input.evidence.some(item => item.title.includes(t(dossiers.DOSSIER_CLAIMS[0].title))));
    assert.ok(input.evidence.some(item => item.text.includes('10_639_726'.replaceAll('_', ''))));
    assert.ok(input.evidence.some(item => item.text.includes('https://')));
    assert.equal(input.sources[0].url, identities.source);
    assert.equal(input.sources[0].title, researchReportCopy[locale].countryRegister);
    assert.equal(worksheet.monthly.housing, 1234.56);
  }
});

test('the downloadable PDF renders each locale without changing worksheet totals or the source URL', async () => {
  const original = JSON.stringify(worksheet);
  for (const locale of translations.locales) {
    const bytes = await createResearchPdf({ name: 'Portugal', worksheet, context: ['Custom Data Scientist'], evidence: [], sources: [{ title: 'UNSD', url: identities.source, reviewedAt: '2026-09-03' }] }, locale);
    const pdf = await PDFDocument.load(bytes);
    assert.equal(pdf.getTitle(), `Portugal | ${researchReportCopy[locale].title}`);
    assert.ok(pdf.getPageCount() >= 1);
    assert.ok(bytes.length > 10_000);
    assert.equal(JSON.stringify(worksheet), original);
    assert.equal(plan.worksheetTotals(worksheet).knownMonthly, 1484.56);
  }
});

test('an invalid report origin is denied before accessing the account locale or generating a PDF', async () => {
  let renders = 0;
  const route = fixture('fr', () => { renders++; });
  const response = await route.POST(request(worksheet, 'https://elsewhere.example'));
  assert.equal(response.status, 403);
  assert.equal(renders, 0);
});


test('each saved goal and timeline identifier is displayed as an authored label in all six report languages', async () => {
  const goals = { learn: 'Expand my global knowledge', live: 'Live in another country', study: 'Study abroad', travel: 'Travel smarter', work: 'Work globally' };
  const horizons = { now: 'Now', '3-months': 'Within 3 months', '6-months': 'Within 6 months', '12-months': 'Within 12 months', exploring: 'Still exploring' };
  for (const locale of translations.locales) for (const [goal, label] of Object.entries(goals)) for (const [horizon, timeline] of Object.entries(horizons)) {
    let input;
    const response = await fixture(locale, value => { input = value; }, goal, horizon).POST(request());
    assert.equal(response.status, 200);
    const t = key => translations.messages.translate(locale, key);
    assert.ok(input.context[0].includes(t(label)), `${locale}: ${goal}`);
    assert.ok(input.context[0].includes(t(timeline)), `${locale}: ${horizon}`);
    assert.equal(input.worksheet.monthly.housing, 1234.56);
  }
});
