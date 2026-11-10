import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { resolve } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { academyLocalizationFixture, academyDisplayCopy } from './helpers/academy-localization.mjs';

const h = academyLocalizationFixture();
const normalized = text => text.replace(/\s+/g, ' ').trim().toLowerCase();
const supplemental = JSON.parse(fs.readFileSync('public/locales/en.json', 'utf8'));
const publicKeys = new Set([...Object.keys(h.messages.messages), ...Object.keys(supplemental)].map(normalized));
const protectedCopy = JSON.parse(fs.readFileSync('src/lib/localization/assessment-messages.json', 'utf8'));
const protectedKeys = new Set(Object.keys(protectedCopy).map(normalized));
const { localizeAcademyCourse } = h.load(resolve('src/lib/localization/academy-content.ts'));
const { withAcademyTranslations, academyCaseTranslations } = h.load(resolve('src/lib/localization/academy-assessment.server.ts'));

test('all expanded curricula have registered six-language presentation copy', () => {
  const missing = [...new Set(h.academyCourses.flatMap(academyDisplayCopy))].filter(text => !publicKeys.has(normalized(text)) && h.locales.every(locale => h.messages.translate(locale, text) === text));
  assert.deepEqual(missing, [], `Unregistered academy copy: ${missing.join('\n')}`);
  for (const course of h.academyCourses) for (const locale of h.locales) {
    const rendered = localizeAcademyCourse(course, locale);
    assert.deepEqual(rendered.lessons.map(lesson => lesson.id), course.lessons.map(lesson => lesson.id));
    assert.equal(rendered.id, course.id);
    assert.equal(rendered.version, course.version);
    assert.equal(rendered.minutes, course.minutes);
    assert.equal(rendered.legacyHref, course.legacyHref);
  }
});

test('compound foundation sections translate each instruction while preserving English practice utterances', () => {
  const english = h.getAcademyCourse('global-english-2026');
  const before = JSON.stringify(english);
  for (const locale of h.locales.filter(value => value !== 'en')) {
    const localized = localizeAcademyCourse(english, locale);
    for (const [index, lesson] of english.lessons.entries()) for (const [position, section] of lesson.sections.entries()) {
      const actual = localized.lessons[index].sections[position];
      if (section.preserveTitle) assert.equal(actual.title, section.title);
      if (section.preserveBody) assert.equal(actual.body, section.body);
      if (section.bodyParts) assert.equal(actual.body, section.bodyParts.map(part => part.preserve ? part.text : h.messages.translate(locale, part.text)).join('\n'));
    }
    const pro = h.getAcademyCourse('ia-trabalho-global');
    assert.equal(localizeAcademyCourse(pro, locale).description, pro.outcomes.map(value => h.messages.translate(locale, value)).join(' '));
  }
  assert.equal(JSON.stringify(english), before);
});

test('all disclosed academy prompts, choices, feedback and numerical cases have translations', () => {
  const missing = new Set();
  for (const course of h.academyCourses) {
    const languagePractice = ['global-english-2026', 'ingles-carreira-internacional'].includes(course.id);
    for (const question of h.academyQuestions(course.id)) {
      for (const value of [question.prompt, question.explanation, ...(!languagePractice ? question.options.map(option => option.label) : [])]) {
        if (!protectedKeys.has(normalized(value))) missing.add(value);
      }
    }
    const spec = h.academyCase(course.id);
    for (const value of [spec.prompt, spec.explanation, spec.unit]) if (!protectedKeys.has(normalized(value))) missing.add(value);
  }
  assert.deepEqual([...missing], [], `Unregistered assessment copy: ${[...missing].join('\n')}`);
  for (const [key, translations] of Object.entries(protectedCopy)) for (const locale of h.locales) {
    assert.ok(translations[locale]?.trim());
    assert.deepEqual(translations[locale].match(/\{\w+\}/g)?.sort() ?? [], key.match(/\{\w+\}/g)?.sort() ?? []);
  }
});

function statusFor(courseId, withResult = false) {
  const bank = h.academyQuestions(courseId);
  const source = bank.find(question => question.lessonId.includes('-academy-'));
  const { correctOptionId: _answer, explanation, ...question } = source;
  void _answer;
  const prompt = h.academyCase(courseId).prompt.replaceAll('{a}', '120').replaceAll('{b}', '30').replaceAll('{c}', '6');
  return { record: { notes: { [source.lessonId]: 'Save' }, portfolio: 'Explorer', diagnostic: 'Next action', consent: { publicName: 'Explorer' }, completed: {}, revision: 1 }, publicName: 'Explorer', emailVerified: true, signingReady: true,
    challenge: withResult ? null : { id: 'attempt', target: source.lessonId, createdAt: '2026-11-10T00:00:00Z', questions: [question], calculation: { prompt, unit: h.academyCase(courseId).unit } },
    lastResult: withResult ? { challengeId: 'attempt', target: source.lessonId, score: 0, passed: false, feedback: [{ questionId: source.id, lessonId: source.lessonId, correct: false, explanation }], submittedAt: '2026-11-10T00:00:00Z' } : null };
}

test('assessment localization preserves attempts, learner drafts and names without exposing scoring keys', () => {
  const source = statusFor('country-fit'), before = JSON.stringify(source);
  const translated = withAcademyTranslations(source, 'country-fit');
  assert.strictEqual(translated.record, source.record);
  assert.equal(translated.publicName, 'Explorer');
  assert.equal(translated.challenge.id, source.challenge.id);
  assert.deepEqual(translated.challenge.questions[0].options.map(option => option.id), source.challenge.questions[0].options.map(option => option.id));
  assert.equal(translated.lastResult, null);
  assert.ok(!JSON.stringify(translated).includes('correctOptionId'));
  assert.ok(!JSON.stringify(translated).includes('explanation'));
  for (const locale of h.locales.filter(value => value !== 'en')) {
    assert.notEqual(translated.challenge.questions[0].translations[locale], source.challenge.questions[0].prompt);
    assert.notEqual(translated.challenge.questions[0].options[0].translations[locale], source.challenge.questions[0].options[0].label);
  }
  assert.equal(JSON.stringify(source), before);
  const returned = withAcademyTranslations(statusFor('country-fit', true), 'country-fit');
  assert.equal(returned.challenge, null);
  assert.ok(returned.lastResult.feedback[0].translations['pt-BR']);
  const english = statusFor('global-english-2026');
  assert.deepEqual(withAcademyTranslations(english, 'global-english-2026').challenge.questions[0].options, english.challenge.questions[0].options);
});

test('persisted numerical cases localize without regenerating numbers or changing scoring', () => {
  for (const courseId of ['country-fit', 'remote-work-systems', 'evidence-literacy', 'global-english-2026']) {
    const source = statusFor(courseId).challenge.calculation.prompt;
    const maps = academyCaseTranslations(courseId, source);
    assert.equal(maps.en, source);
    for (const locale of h.locales) assert.deepEqual(maps[locale].match(/\d+/g), source.match(/\d+/g));
    for (const locale of h.locales.filter(value => value !== 'en')) assert.notEqual(maps[locale], source);
    const unrelated = 'Archived case from another edition: 120, 30, 6.';
    for (const value of Object.values(academyCaseTranslations(courseId, unrelated))) assert.equal(value, unrelated);
  }
});

test('language exercises retain quoted English utterances while instructions and assessment feedback translate', () => {
  const quotes = text => [...text.matchAll(/“([^”]+)”/g)].map(match => match[1]);
  for (const id of ['global-english-2026', 'ingles-carreira-internacional']) {
    for (const text of academyDisplayCopy(h.getAcademyCourse(id))) for (const phrase of quotes(text)) {
      for (const locale of h.locales) assert.ok(h.messages.translate(locale, text).includes(phrase), `${locale}: lost target-language utterance: ${phrase}`);
    }
    for (const text of [...h.academyQuestions(id).flatMap(question => [question.prompt, question.explanation]), h.academyCase(id).prompt]) {
      const entry = protectedCopy[text.replace(/\s+/g, ' ').trim()];
      for (const phrase of quotes(text)) for (const locale of h.locales) assert.ok(entry[locale].includes(phrase), `${locale}: ${phrase}`);
    }
  }
  for (const course of h.academyCourses) {
    const languagePractice = ['global-english-2026', 'ingles-carreira-internacional'].includes(course.id);
    for (const question of h.academyQuestions(course.id)) for (const text of [question.prompt, question.explanation, ...(!languagePractice ? question.options.map(option => option.label) : [])]) {
      if (text.split(/\s+/).length < 5 || !/[.!?]$/.test(text)) continue;
      const entry = protectedCopy[text.replace(/\s+/g, ' ').trim()];
      for (const locale of h.locales.filter(value => value !== 'en')) assert.notEqual(entry[locale], entry.en, `${locale}: untranslated assessment sentence: ${text}`);
    }
  }
});

test('switching the study presentation language keeps selected answers and local drafts intact', () => {
  const course = h.getAcademyCourse('country-fit');
  const status = withAcademyTranslations(statusFor(course.id), course.id);
  const question = status.challenge.questions[0], selectedOption = question.options[0].id;
  const states = [status, course.lessons[0].id, 'MY UNSAVED PRACTICE', 'MY UNSAVED PORTFOLIO', '', false, { [question.id]: selectedOption }, '42', false, '', true];
  const preserved = JSON.stringify(states);
  for (const locale of ['en', 'pt-BR', 'fr', 'de']) {
    let slot = 0;
    const fixture = academyLocalizationFixture({
      react: { ...React, useState(initial) { const base = React.useState(initial); return [states[slot++], base[1]]; } },
      '@clerk/nextjs': { useUser: () => ({ isLoaded: true, user: { id: 'synthetic-learner' } }) },
      'next/link': { __esModule: true, default: props => React.createElement('a', props) },
      '@/components/localization/LocaleProvider': { useLocale: () => ({ locale, t: (text, values) => h.messages.translate(locale, text, values) }) },
    });
    const Study = fixture.load(resolve('src/components/courses/academy/AcademyStudy.tsx')).default;
    const markup = renderToStaticMarkup(React.createElement(Study, { course }));
    assert.match(markup, /MY UNSAVED PRACTICE/);
    assert.match(markup, /value="42"/);
    assert.match(markup, new RegExp(`checked="" value="${selectedOption}"`));
    assert.ok(markup.includes(question.translations[locale].replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')));
    assert.equal(JSON.stringify(states), preserved);
  }
});

test('protected assessment catalog cannot be compiled into public dictionary assets', async () => {
  const { spawnSync } = await import('node:child_process');
  const { mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const folder = mkdtempSync(resolve(tmpdir(), 'tgpi-i18n-boundary-'));
  try {
    const path = resolve(folder, 'copy.json');
    writeFileSync(path, JSON.stringify({ scope: 'assessment', entries: {} }));
    const run = spawnSync(process.execPath, ['scripts/localization-compile.mjs', path], { encoding: 'utf8' });
    assert.notEqual(run.status, 0);
    assert.match(run.stderr, /Protected assessment translations cannot enter public catalogs/);
  } finally { rmSync(folder, { recursive: true, force: true }); }
});
