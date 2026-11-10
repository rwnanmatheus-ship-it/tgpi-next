import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const base = academyLocalizationFixture();
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

test('country headings, cost references and provider feedback follow six locales while published amounts remain exact', () => {
  for (const locale of base.locales) {
    const t = (key, values) => base.messages.translate(locale, key, values);
    const fixture = academyLocalizationFixture({
      'next/link': { __esModule: true, default: props => React.createElement('a', props) },
      'next/dynamic': { __esModule: true, default: () => () => null },
      '@/components/localization/LocaleProvider': { LocalizedText: ({ text, values }) => typeof text === 'string' ? t(text, values) : text, useLocale: () => ({ locale, t }) },
      '@/components/activation/ActivationProgressProvider': { useActivationProgress: () => ({ error: 'Unable to load your TGPI progress.', isAuthenticated: true, isLoading: false, progress: { costEstimates: {} }, mutate: async () => null }) },
    });
    const { dossierFor, formatMoney } = fixture.load(resolve('src/lib/intelligence/dossiers.ts'));
    const { localizedCostReference } = fixture.load(resolve('src/lib/localization/cost-presentation.ts'));
    const cost = dossierFor('germany').costs[0];
    const original = JSON.stringify(cost);
    const amount = localizedCostReference(cost, locale, t);
    assert.ok(amount.includes(formatMoney(cost.low, cost.currency, locale)), `${locale}: amount formatting`);
    assert.ok(amount.endsWith(`${cost.periodMonths} ${t(cost.periodMonths === 1 ? 'month' : 'months')}`), `${locale}: unit`);
    assert.equal(JSON.stringify(cost), original, `${locale}: source amount modified`);

    const Satellite = fixture.load(resolve('src/components/countries/CountrySatellitePanel.tsx')).default;
    const satelliteHtml = renderToStaticMarkup(React.createElement(Satellite, { country: 'germany', name: 'Germany' }));
    assert.ok(satelliteHtml.includes(escapeHtml(t('Germany'))), `${locale}: satellite country`);
    if (locale !== 'en') assert.ok(!satelliteHtml.includes('>Germany<'), `${locale}: raw satellite country`);

    const Planner = fixture.load(resolve('src/components/activation/MonthlyCostPlanner.tsx')).default;
    const plannerHtml = renderToStaticMarkup(React.createElement(Planner, { baseline: 0, countryName: 'Germany', countrySlug: 'germany', currency: 'EUR' }));
    assert.ok(plannerHtml.includes(escapeHtml(t('Germany'))), `${locale}: estimate country`);
    assert.ok(plannerHtml.includes(escapeHtml(t('Unable to load your TGPI progress.'))), `${locale}: provider feedback`);
    if (locale !== 'en') assert.ok(!plannerHtml.includes('>Germany<'), `${locale}: raw estimate country`);
  }
});

test('the country Decision Lab renders localized published references and names', () => {
  for (const locale of base.locales) {
    const t = (key, values) => base.messages.translate(locale, key, values);
    const fixture = academyLocalizationFixture({
      'next/link': { __esModule: true, default: props => React.createElement('a', props) },
      '@/components/localization/LocalizedElement': { LocalizedElement: ({ as, ...props }) => React.createElement(as, props) },
      '@/components/localization/LocaleProvider': { LocalizedText: ({ text, values }) => typeof text === 'string' ? t(text, values) : text, useLocale: () => ({ locale, t }) },
      './useResearchProfile': { useResearchProfile: () => ({ user: null, isLoaded: true }) },
      './SourceReviewNotice': { __esModule: true, default: () => null },
      './ResearchReportCard': { __esModule: true, default: () => null },
    });
    const dossier = fixture.load(resolve('src/lib/intelligence/dossiers.ts')).dossierFor('germany');
    const Workbench = fixture.load(resolve('src/components/intelligence/ResearchWorkbench.tsx')).default;
    const html = renderToStaticMarkup(React.createElement(Workbench, { country: 'germany', countryName: 'Germany' }));
    const cost = dossier.costs[0];
    assert.ok(html.includes(escapeHtml(t('Germany'))), `${locale}: Decision Lab country`);
    assert.ok(html.includes(escapeHtml(t(cost.referencePeriod))), `${locale}: published period`);
    assert.ok(html.includes(escapeHtml(t(cost.location))), `${locale}: published location`);
    assert.ok(html.includes(escapeHtml(fixture.load(resolve('src/lib/intelligence/dossiers.ts')).formatMoney(cost.low, cost.currency, locale))), `${locale}: published amount`);
  }
});
