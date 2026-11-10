import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

test('community step headings follow the selected language without altering form values', () => {
  let locale = 'en', step = 1, stateSlot = 0;
  const fixture = academyLocalizationFixture({
    react: { ...React, useState(initial) {
      const [value, setValue] = React.useState(initial);
      return [stateSlot++ === 2 ? step : value, setValue];
    } },
    'next/navigation': { useRouter: () => ({ push() {} }) },
    './api': { api: async () => ({}) },
    '@/components/localization/LocaleProvider': {
      useLocale: () => ({ t: text => fixture.messages.translate(locale, text) }),
      LocalizedText: ({ text }) => fixture.messages.translate(locale, text),
    },
  });
  const CreateFlow = fixture.load(resolve('src/components/community/CommunityCreateFlow.tsx')).default;
  const keys = ['Community identity', 'Privacy & admission', 'Rules & participation', 'Review & create'];
  for (locale of fixture.locales) for (step = 1; step <= 4; step += 1) {
    stateSlot = 0;
    const html = renderToStaticMarkup(React.createElement(CreateFlow, { close() {} }));
    assert.ok(html.includes(`<h2>${fixture.messages.translate(locale, keys[step - 1]).replaceAll('&', '&amp;')}</h2>`), `${locale}: ${keys[step - 1]}`);
    if (step === 1) assert.ok(html.includes('value="English"'), 'stored language value should remain canonical');
  }
});

test('profile PNG localizes rank and known goals, places, and language labels but preserves member content', async () => {
  const fixture = academyLocalizationFixture({
    '@/components/localization/LocaleProvider': { useLocale: () => ({ locale: 'en', t: key => key }), LocalizedText: ({ text }) => text },
  });
  const { createMemberPng } = fixture.load(resolve('src/components/profile/MemberExportCenter.tsx'));
  const originalDocument = globalThis.document, originalImage = globalThis.Image;
  const drawn = [];
  const context = {
    measureText: text => ({ width: String(text).length * 14 }),
    createLinearGradient: () => ({ addColorStop() {} }),
    fillRect() {}, strokeRect() {}, drawImage() {}, save() {}, beginPath() {}, arc() {}, clip() {}, restore() {},
    fillText: text => drawn.push(text),
  };
  globalThis.document = { fonts: { ready: Promise.resolve() }, createElement: tag => {
    assert.equal(tag, 'canvas');
    return { width: 0, height: 0, getContext: () => context, toBlob: done => done(new Blob(['PNG'], { type: 'image/png' })) };
  } };
  globalThis.Image = class { async decode() {} };
  const member = {
    name: 'Save Member', avatar: '', headline: 'Save', bio: 'Private words', number: 'TGPI-TEST', handle: 'save',
    path: '/member/TGPI-TEST', country: '', visibility: 'public', indexable: false,
    career: ['Data analyst'], languages: ['English'], links: [], goal: 'Live abroad',
    countries: [{ name: 'United States', path: '/countries/united-states' }],
    rank: { name: 'Explorer', points: 1200 }, courses: [], certificates: [],
  };
  try {
    for (const locale of fixture.locales) {
      drawn.length = 0;
      const blob = await createMemberPng({ locale, member, crest: 'crest', qr: 'qr', photo: '' }, false);
      assert.equal(blob.type, 'image/png');
      const t = (key, values) => fixture.messages.translate(locale, key, values);
      const goal = `${t('Live abroad')} · ${t('United States')}`;
      for (const expected of [t('TGPI progression: {rank}', { rank: t('Explorer') }), t('Direction: {goal}', { goal }), t('Declared languages: {languages}', { languages: t('English') }), 'Save Member', 'Save', 'Private words', 'Data analyst', 'TGPI-TEST']) {
        assert.ok(drawn.join('').includes(expected), `${locale}: ${expected}`);
      }
      for (const authoredGoal of ['Explore internationally', 'Build global knowledge']) {
        member.goal = authoredGoal;
        drawn.length = 0;
        await createMemberPng({ locale, member, crest: 'crest', qr: 'qr', photo: '' }, false);
        assert.ok(drawn.join('').includes(t('Direction: {goal}', { goal: `${t(authoredGoal)} · ${t('United States')}` })));
        if (locale !== 'en') assert.notEqual(t(authoredGoal), authoredGoal);
      }
      member.goal = 'Live abroad';
    }
  } finally {
    if (originalDocument === undefined) delete globalThis.document; else globalThis.document = originalDocument;
    if (originalImage === undefined) delete globalThis.Image; else globalThis.Image = originalImage;
  }
});
