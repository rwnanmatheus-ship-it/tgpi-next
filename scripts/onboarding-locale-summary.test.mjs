import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const sourceFile = resolve('src/components/onboarding/OnboardingFlow.tsx');
const source = ts.createSourceFile(sourceFile, readFileSync(sourceFile, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const declarations = new Map();
for (const statement of source.statements) {
  if (ts.isFunctionDeclaration(statement) && statement.name) declarations.set(statement.name.text, statement.getText(source));
  if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) {
    if (ts.isIdentifier(declaration.name)) declarations.set(declaration.name.text, statement.getText(source));
  }
}
const names = ['goals', 'timeHorizons', 'priorities', 'goalLabels', 'timeLabels', 'priorityLabels', 'PlanSummary', 'SummaryItem', 'OptionCard'];
for (const name of names) assert.ok(declarations.has(name), `Missing source declaration: ${name}`);
const compiled = ts.transpileModule(`${names.map(name => declarations.get(name)).join('\n')}\nexports.PlanSummary = PlanSummary; exports.OptionCard = OptionCard;`, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const { locales, messages } = academyLocalizationFixture();
const escapeText = text => String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function render(locale, component, props) {
  const t = (key, values) => messages.translate(locale, key, values);
  const exports = {};
  new Function('exports', 'require', 'useInterfaceLocale', 'LocalizedText', 'OnboardingIcon', compiled)(
    exports,
    () => jsxRuntime,
    () => ({ locale, t }),
    ({ text }) => typeof text === 'string' ? t(text) : text,
    () => null,
  );
  return renderToStaticMarkup(React.createElement(exports[component], props));
}

test('personal-plan summary updates all six languages while retaining canonical saved values', () => {
  const props = {
    countries: [{ slug: 'united-states', name: 'United States', emoji: '🇺🇸' }, { slug: 'spain', name: 'Spain', emoji: '🇪🇸' }],
    completion: 80,
    data: { primaryGoal: 'work', targetCountries: ['united-states', 'spain'], timeHorizon: '6-months', priorities: ['safety', 'education'] },
  };
  const original = JSON.stringify(props);
  for (const locale of locales) {
    const t = key => messages.translate(locale, key);
    const html = render(locale, 'PlanSummary', props);
    for (const copy of ['Work globally', 'Within 6 months', 'United States', 'Spain', 'Safety', 'Education'].map(t)) {
      assert.ok(html.includes(escapeText(copy)), `${locale} summary missing ${copy}`);
    }
    if (locale !== 'en') assert.ok(!html.includes('>Work globally<') && !html.includes('>United States<'));
  }
  assert.equal(JSON.stringify(props), original);
});

test('option cards localize descriptions without changing selectable values', () => {
  for (const locale of locales) {
    const html = render(locale, 'OptionCard', { label: 'Within 6 months', detail: 'Time to prepare', selected: true, onClick() {} });
    assert.ok(html.includes(escapeText(messages.translate(locale, 'Time to prepare'))));
    assert.ok(html.includes('aria-pressed="true"'));
  }
});


test('country and priority selection counters follow all six languages without altering counts', () => {
  const sourceText = readFileSync(sourceFile, 'utf8');
  assert.equal(sourceText.match(/aside=\{localizeLabel\("\{count\} of \{limit\} selected"/g)?.length, 2);
  for (const locale of locales) {
    const copy = messages.translate(locale, '{count} of {limit} selected', { count: 2, limit: 5 });
    assert.ok(copy.includes('2') && copy.includes('5'));
    if (locale !== 'en') assert.notEqual(copy, '2 of 5 selected');
  }
});
