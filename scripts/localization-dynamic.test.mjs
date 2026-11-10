import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, symlinkSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import React from 'react';
import * as runtime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';
import { messageLiterals, renderedMessageText } from './helpers/localization-audit.mjs';

const h = academyLocalizationFixture();
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const translate = locale => (key, values) => h.messages.translate(locale, key, values);
function render(file, locale, props, states = []) {
  let slot = 0;
  const t = translate(locale);
  const fixture = academyLocalizationFixture({
    react: { ...React, useState(initial) { const base = React.useState(initial); const index = slot++; return [index < states.length ? states[index] : base[0], base[1]]; } },
    'next/link': { __esModule: true, default: props => React.createElement('a', props) },
    '@/components/localization/LocaleProvider': { useLocale: () => ({ locale, t }), LocalizedText: ({ text, values }) => t(text, values) },
  });
  return renderToStaticMarkup(React.createElement(fixture.load(resolve(file)).default, props));
}

test('audit sees conditional labels and fallback errors without decoding JavaScript entities', () => {
  const source = ts.createSourceFile('fixture.tsx', `t(done ? 'Passed' : 'Needs review'); new Error(data.error || 'Unable to load learning.'); const ui = <><LocalizedText text={"Bachelor&apos;s degree"}/><span>Bachelor&apos;s degree</span></>;`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const messages = [], entities = [];
  function visit(node) {
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) messages.push(...messageLiterals(node.arguments?.[0]).map(value => value.text));
    if (ts.isJsxText(node) || ts.isStringLiteral(node) && node.text.includes('&apos;')) entities.push(renderedMessageText(node.text, node));
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.deepEqual(messages, ['Passed', 'Needs review', 'Unable to load learning.']);
  assert.deepEqual(entities, ['Bachelor&apos;s degree', "Bachelor's degree"]);
});

test('release audit rejects an encoded JavaScript label and an untranslated conditional branch', () => {
  const folder = mkdtempSync(resolve(tmpdir(), 'tgpi-copy-audit-'));
  try {
    for (const dir of ['src/app', 'src/components', 'src/modules', 'src/lib/localization', 'src/lib/notifications', 'public']) mkdirSync(resolve(folder, dir), { recursive: true });
    for (const file of ['src/lib/localization/messages.ts', 'src/lib/notifications/text.ts']) symlinkSync(resolve(file), resolve(folder, file));
    symlinkSync(resolve('public/locales'), resolve(folder, 'public/locales'));
    const file = resolve(folder, 'src/components/Fixture.tsx');
    writeFileSync(file, `const ui = <LocalizedText text={"Bachelor&apos;s degree"}/>; t(done ? 'Passed' : 'Untranslated audit sentinel');`);
    const audit = () => spawnSync(process.execPath, [resolve('scripts/localization-audit.mjs'), '--json', '--check'], { cwd: folder, encoding: 'utf8' });
    const rejected = audit();
    assert.equal(rejected.status, 1);
    assert.deepEqual(JSON.parse(rejected.stdout).entries.map(entry => entry.key), ['Bachelor&apos;s degree', 'Untranslated audit sentinel']);
    writeFileSync(file, `const ui = <LocalizedText text={"Bachelor's degree"}/>; t(done ? 'Passed' : 'Needs review');`);
    const accepted = audit();
    assert.equal(accepted.status, 0, accepted.stderr);
  } finally { rmSync(folder, { recursive: true, force: true }); }
});

test('education choices render translated text while their stored option values remain canonical', () => {
  for (const locale of h.locales) for (const file of ['src/components/profile/TgpiAccountCenter.tsx', 'src/components/onboarding/OnboardingFlow.tsx']) {
    const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const choices = [];
    function visit(node) {
      if (ts.isJsxElement(node) && node.openingElement.tagName.getText(source) === 'option' && /Bachelor|Master|Postgraduate/.test(node.getText(source))) choices.push(node.getText(source));
      ts.forEachChild(node, visit);
    }
    visit(source); assert.ok(choices.length);
    const code = ts.transpileModule(`export default function Choice(){return <>${choices.join('')}</>}`, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;
    const exports = {};
    new Function('exports', 'require', 'LocalizedText', code)(exports, () => runtime, ({ text }) => translate(locale)(text));
    const html = renderToStaticMarkup(React.createElement(exports.default));
    assert.ok(!html.includes('&amp;apos;'));
    for (const label of ["Bachelor's degree", "Master's degree", "Postgraduate, master's, or doctoral degree"]) if (choices.some(choice => choice.includes(label))) assert.ok(html.includes(esc(translate(locale)(label))));
    if (file.includes('TgpiAccountCenter')) assert.ok(html.includes('value="Bachelor&#x27;s degree"'));
  }
});

test('profile search accepts localized and original labels and never translates custom input', () => {
  const { filterProfileOptions } = h.load(resolve('src/lib/profile-options.ts'));
  const { getAccountSalutation, normalizeTgpiAccountProfile } = h.load(resolve('src/lib/account-profile.ts'));
  for (const locale of h.locales) {
    const t = translate(locale), options = [{ label: 'United States', value: 'united-states' }, { label: 'Spain', value: 'spain' }];
    const label = t('United States');
    const localized = options.map(option => ({ ...option, sourceLabel: option.label, label: t(option.label) }));
    assert.equal(filterProfileOptions(localized, label)[0].value, 'united-states');
    assert.equal(filterProfileOptions(localized, 'united states')[0].value, 'united-states');
    let html = render('src/components/profile/ProfileSearchSelect.tsx', locale, { options, value: 'united-states', label: 'Country', onChange() {} });
    assert.ok(html.includes(`value="${esc(label)}"`));
    assert.ok(html.includes(esc(t('Clear {field}', { field: t('Country') }))));
    html = render('src/components/profile/ProfileSearchSelect.tsx', locale, { options: [], value: 'Save', label: 'Profession', allowCustom: true, onChange() {} }, [true, 'Save', -1]);
    assert.ok(html.includes(esc(t('Use “{value}”', { value: 'Save' }))));
    assert.ok(html.includes('value="Save"'));
    assert.ok(getAccountSalutation({ firstName: 'Save' }, normalizeTgpiAccountProfile({ preferredTitle: 'mr' }), t).endsWith(' Save'));
  }
});

test('workspace resources, history and localized searches render in every locale without mutating saved data', () => {
  const title = 'Country Fit: Choose Where You Can Thrive';
  const resources = [
    { id: 'course-test', kind: 'course', title, detail: '2 / 6 lessons · In progress', href: '/courses/country-fit/study' },
    { id: 'comparison-test', kind: 'comparison', title: 'United States / Spain (+2)', detail: 'work comparison', href: '/compare?country=united-states&country=spain&goal=work' },
    { id: 'documents-test', kind: 'documents', title: 'United States preparation', detail: '2 / 5 checklist items', href: '/countries/united-states#documents-to-verify' },
  ];
  const history = [{ id: 'event-test', type: 'course', title: title + ' learning path started', href: '/courses/country-fit', occurredAt: '2026-11-10T00:00:00Z' }];
  const preferences = { version: 1, density: 'comfortable', hidden: [], dismissed: [] };
  const props = { resources, history, initialCursor: null, historyCoverage: null, historyAvailable: true, historyPending: false, initialPreferences: preferences, storageAvailable: false, journey: null, suggestions: [] };
  const before = JSON.stringify(props);
  for (const locale of h.locales) {
    const t = translate(locale), html = render('src/components/profile/WorkspacePersonalSpace.tsx', locale, props);
    assert.ok(html.includes(esc(t('{title} · Learning path started', { title: t(title) }))));
    assert.ok(html.includes(esc(t('{completed} / {total} lessons · {status}', { completed: 2, total: 6, status: t('In progress') }))));
    assert.ok(html.includes(esc(t('{country} preparation', { country: t('United States') }))));
    assert.ok(!html.includes('>course<'));
    const searched = render('src/components/profile/WorkspacePersonalSpace.tsx', locale, props, [preferences, false, '', t(title), 'all', 8]);
    assert.ok(searched.includes('href="/courses/country-fit/study"'));
    assert.ok(!searched.includes('href="/compare?'));
    assert.equal(JSON.stringify(props), before);
  }
});

test('comparison downloads translate country names and headers while preserving raw evidence values and dates', () => {
  const { comparisonCsv } = h.load(resolve('src/lib/comparison-export.ts'));
  const observations = [{ country: 'united-states', indicator: 'SP.POP.TOTL', value: 1234.5, year: 2025, retrievedAt: '2026-11-10T00:00:00Z', sourceUpdatedAt: null }];
  for (const locale of h.locales) {
    const t = translate(locale), csv = comparisonCsv([{ slug: 'united-states', name: 'United States', iso2: 'US' }], observations, { locale, translate: t });
    assert.ok(csv.includes(`"${t('Reference year')}"`) && csv.includes(`"${t('Collected at')}"`));
    assert.ok(csv.includes(`"${t('United States')}","US"`));
    assert.ok(csv.includes('"1234.5"') && csv.includes('"2026-11-10T00:00:00Z"'));
  }
});

test('course recovery messages, conditional feedback and dynamic templates have all six translations', () => {
  for (const key of ['Final assessment', 'Unable to load learning.', 'Unable to save learning.', 'Passed', 'Correct', 'Reference year', 'Collected at', 'Clear {field}', 'Use “{value}”', '{count}/{limit} characters']) {
    for (const locale of h.locales.filter(locale => locale !== 'en')) {
      assert.ok(h.messages.messages[key]?.[locale]);
      if (locale === 'fr' && key === 'Correct') assert.equal(translate(locale)(key), 'Correct');
      else assert.notEqual(translate(locale)(key), key, `${locale}: ${key}`);
    }
  }
});
