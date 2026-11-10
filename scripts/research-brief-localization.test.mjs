import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const h = academyLocalizationFixture();
const { localizedPersonalResearchPlan } = h.load(resolve('src/lib/localization/research-plan-copy.ts'));
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const base = { primaryGoal: 'work', timeHorizon: '3-months', budgetRange: '1500-3000', languages: ['English', 'Save'], profession: 'Save', priorities: ['safety'] };

test('dynamic country research tasks use six-language authored templates while keeping canonical IDs and personal answers', () => {
  const source = h.load(resolve('src/lib/intelligence/core.ts'));
  for (const locale of h.locales) {
    const t = (key, values) => h.messages.translate(locale, key, values);
    for (const context of [base, { ...base, timeHorizon: '12-months', primaryGoal: 'study', profession: '', languages: [], budgetRange: 'undecided' }, { ...base, timeHorizon: 'exploring', primaryGoal: 'travel', profession: '', languages: [], budgetRange: 'undecided' }]) {
      const before = JSON.stringify(context);
      const canonical = source.personalResearchPlan(context, 'Portugal');
      const result = localizedPersonalResearchPlan(context, 'Portugal', t);
      assert.deepEqual(result.map(({ id, title, href }) => ({ id, title, href })), canonical.map(({ id, title, href }) => ({ id, title, href })));
      assert.equal(result.length, 4);
      assert.ok(result[0].detail.includes(t('Portugal')), locale);
      const activity = context.primaryGoal === 'work' ? 'work authorization' : context.primaryGoal === 'study' ? 'study authorization' : 'permitted activities';
      assert.ok(result[0].detail.includes(t(activity)), locale);
      const urgent = ['now', '3-months'].includes(context.timeHorizon);
      const template = urgent
        ? 'Before committing to your near-term timeline, verify nationality-specific entry, residence and {activity} for {country}. TGPI does not determine eligibility.'
        : 'Verify nationality-specific entry, residence and {activity} for {country}. TGPI does not determine eligibility.';
      assert.equal(result[0].detail, t(template, { activity: t(activity), country: t('Portugal') }));
      assert.ok(result[1].detail.includes(t('Collect dated housing, insurance, transport and education quotes in one currency; include deposits and a contingency. National statistics cannot establish affordability.')), locale);
      if (context.profession) assert.ok(result[2].detail.includes('Save'), `${locale} altered member profession`);
      if (context.languages.length) {
        assert.ok(result[3].detail.includes(t('English')) && result[3].detail.includes('Save'), locale);
      }
      assert.equal(JSON.stringify(context), before);
    }
  }
});

test('country brief renders localized goal, timeline, country and dynamic task text without translating personal names', () => {
  for (const locale of h.locales) {
    const t = (key, values) => h.messages.translate(locale, key, values);
    const profile = { languages: ['English', 'Save'], profession: 'Save' };
    const journey = { ...base };
    const data = { user: { firstName: 'Save' }, profile, journey };
    const overrides = {
      './useResearchProfile': { useResearchProfile: () => data },
      '@/components/localization/LocaleProvider': { useLocale: () => ({ locale, t }), LocalizedText: ({ text, values }) => typeof text === 'string' ? t(text, values) : text },
      '@/components/localization/LocalizedElement': { LocalizedElement: ({ as, ...props }) => React.createElement(as, props) },
      'next/link': { __esModule: true, default: props => React.createElement('a', props) },
    };
    const fixture = academyLocalizationFixture(overrides);
    const Brief = fixture.load(resolve('src/components/intelligence/CountryResearchBrief.tsx')).default;
    const html = renderToStaticMarkup(React.createElement(Brief, { country: 'portugal', name: 'Portugal' }));
    for (const value of [t('Work globally'), t('Within 3 months'), t('English'), t('Portugal'), 'Save']) assert.ok(html.includes(escapeHtml(value)), `${locale}: ${value}`);
    assert.ok(html.includes(escapeHtml(t('Before committing to your near-term timeline, verify nationality-specific entry, residence and {activity} for {country}. TGPI does not determine eligibility.', { activity: t('work authorization'), country: t('Portugal') }))), locale);
    assert.ok(html.includes('href="/country-fit?country=portugal"'));
    assert.ok(html.includes('href="#research-dossier"'));
    if (locale !== 'en') assert.ok(!html.includes('>work<') && !html.includes('>3-months<') && !html.includes('>Verify nationality-specific'), locale);
  }
});
