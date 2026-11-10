import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const h = academyLocalizationFixture();
const { documentReviewItems: items } = h.load(resolve('src/lib/document-review.ts'));
const itemIds = items.map(item => item.id);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function render(locale, state) {
  const translate = (key, values) => h.messages.translate(locale, key, values);
  const fixture = academyLocalizationFixture({
    'next/link': { __esModule: true, default: props => React.createElement('a', props) },
    '@/components/localization/LocaleProvider': {
      LocalizedText: ({ text, values }) => typeof text === 'string' ? translate(text, values) : text,
      useLocale: () => ({ locale, t: translate }),
    },
    '@/components/activation/ActivationProgressProvider': { useActivationProgress: () => state },
  });
  const Checklist = fixture.load(resolve('src/components/activation/DocumentReviewChecklist.tsx')).default;
  return renderToStaticMarkup(React.createElement(Checklist, {
    countryName: 'United States', countrySlug: 'united-states',
  }));
}

test('document review translates authored checklist and errors without changing completion IDs', () => {
  assert.equal(items.length, 4);
  const before = JSON.stringify({ items, itemIds });
  for (const locale of h.locales) {
    const t = (key, values) => h.messages.translate(locale, key, values);
    const state = { error: '', isAuthenticated: true, isLoading: false, mutate() {},
      progress: { documentReviews: { 'united-states': { completedItemIds: itemIds } } } };
    const html = render(locale, state);
    for (const item of items) {
      assert.ok(html.includes(escape(t(item.title))), `${locale} title: ${item.title}`);
      assert.ok(html.includes(escape(t(item.text))), `${locale} text: ${item.text}`);
    }
    assert.ok(html.includes(escape(t('{value0} document review completed.', { value0: t('United States') }))));
    assert.equal((html.match(/type="checkbox"/g) ?? []).length, 4);
    assert.equal((html.match(/checked=""/g) ?? []).length, 4);
    const knownError = render(locale, { ...state, error: 'Unable to load your TGPI progress.' });
    assert.ok(knownError.includes(escape(t('Unable to load your TGPI progress.'))));
    const unknownError = render(locale, { ...state, error: 'Provider reference 829' });
    assert.ok(unknownError.includes('Provider reference 829'));
    assert.equal(JSON.stringify({ items, itemIds }), before);
  }
});
