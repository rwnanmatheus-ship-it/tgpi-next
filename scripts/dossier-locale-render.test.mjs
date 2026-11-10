import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const base = academyLocalizationFixture();
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

test('country dossier labels, references and source amounts follow all six locales without changing evidence', async () => {
  for (const locale of base.locales) {
    const t = (key, values) => base.messages.translate(locale, key, values);
    const fixture = academyLocalizationFixture({
      'next/link': { __esModule: true, default: props => React.createElement('a', props) },
      '@/components/localization/LocaleProvider': { LocalizedText: ({ text, values }) => typeof text === 'string' ? t(text, values) : text, useLocale: () => ({ locale, t }) },
      '@/components/localization/LocalizedElement': { LocalizedElement: ({ as, ...props }) => React.createElement(as, props) },
      '@/lib/localization/server': { getLocale: async () => locale },
    });
    const { dossierFor, formatMoney } = fixture.load(resolve('src/lib/intelligence/dossiers.ts'));
    const { ClaimCard, CostReferences } = fixture.load(resolve('src/components/intelligence/DossierEvidence.tsx'));
    const dossier = dossierFor('portugal');
    const claim = dossier.claims[0];
    const claimHtml = renderToStaticMarkup(React.createElement(ClaimCard, { claim }));
    const kind = { requirement: 'Requirement', directory: 'Directory', estimate: 'Estimate', guidance: 'Guidance' }[claim.kind];
    assert.ok(claimHtml.includes(escapeHtml(t(kind))), `${locale}: claim kind`);
    assert.ok(claimHtml.includes(escapeHtml(t(claim.referencePeriod))), `${locale}: reference period`);
    assert.ok(claimHtml.includes(dossier.sources.find(source => source.id === claim.sourceId).url), `${locale}: source URL`);
    const costHtml = renderToStaticMarkup(await CostReferences({ country: 'germany' }));
    const cost = dossierFor('germany').costs[0];
    assert.ok(costHtml.includes(escapeHtml(t(cost.referencePeriod))), `${locale}: cost period`);
    assert.ok(costHtml.includes(escapeHtml(t(cost.location))), `${locale}: location`);
    assert.ok(costHtml.includes(escapeHtml(t(cost.includes))), `${locale}: inclusions`);
    assert.ok(costHtml.includes(escapeHtml(formatMoney(cost.low, cost.currency, locale))), `${locale}: currency`);
    assert.ok(costHtml.includes(`${cost.periodMonths} ${escapeHtml(t(cost.periodMonths === 1 ? 'month' : 'months'))}`), `${locale}: monthly unit`);
    assert.equal(dossierFor('germany').costs[0].low, cost.low);
  }
});
