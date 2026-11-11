import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const h = academyLocalizationFixture();
const { studioProgress, nextStudioTarget, studioNotebook } = h.load(resolve('src/lib/learning/academy/studio-progress.ts'));
const recordFor = course => ({ uid: 'private-identity', courseId: course.id, version: course.version, revision: 1,
  enrolledAt: '2026-11-11T12:00:00Z', updatedAt: '2026-11-11T12:00:00Z',
  consent: { publicName: 'Private Learner', acceptedAt: '2026-11-11T12:00:00Z' },
  diagnostic: 'private diagnostic', notes: {}, completed: {}, portfolio: '', sharing: false, attemptLimits: {},
});
const statusFor = record => ({ record, publicName: 'Private Learner', emailVerified: true, signingReady: true, challenge: null, lastResult: null });

test('every current and historical edition starts with its exact workload and no invented progress', () => {
  for (const current of h.academyCourses) for (const course of [current, h.getAcademyCourse(current.id, '2026.11.1')]) {
    const record = recordFor(course);
    record.notes[course.lessons[0].id] = 'Reading or writing a draft is not a passed check.';
    const value = studioProgress(course, record);
    assert.equal(value.percent, 0, course.id);
    assert.equal(value.remainingMinutes, course.minutes, course.id);
    assert.equal(nextStudioTarget(course, statusFor(record)), course.lessons[0].id);
    assert.equal(studioProgress(course, { ...record, version: 'wrong-edition' }).percent, 0);
  }
});

test('finishing lessons cannot claim 100 percent or bypass the portfolio, final or delayed review', () => {
  const course = h.getAcademyCourse('remote-work-systems');
  const record = recordFor(course);
  for (const lesson of course.lessons) record.completed[lesson.id] = { score: 100, at: record.updatedAt, challengeId: lesson.id };
  const state = statusFor(record);
  assert.equal(nextStudioTarget(course, state), 'portfolio');
  assert.ok(studioProgress(course, record).percent < 100);
  record.portfolio = 'x'.repeat(199);
  assert.equal(studioProgress(course, record).portfolioReady, false);
  record.portfolio = 'x'.repeat(200);
  assert.equal(nextStudioTarget(course, state), 'final');
  record.final = { score: 85, at: record.updatedAt };
  record.reviewAvailableAt = '2026-11-12T12:00:00Z';
  assert.equal(nextStudioTarget(course, state), 'retention');
  assert.ok(studioProgress(course, record).percent < 100);
  assert.ok(studioProgress(course, record).remainingMinutes > 0);
  record.retention = { score: 90, at: record.reviewAvailableAt };
  assert.equal(studioProgress(course, record).percent, 100);
  assert.equal(studioProgress(course, record).remainingMinutes, 0);
  assert.equal(studioProgress(course, { ...record, courseId: 'another-course' }).percent, 0);
});

test('an active assessment is the resume destination even when another lesson is unfinished', () => {
  const course = h.getAcademyCourse('country-fit');
  const state = statusFor(recordFor(course));
  state.challenge = { target: course.lessons[2].id };
  assert.equal(nextStudioTarget(course, state), course.lessons[2].id);
});

test('evidence exports include only saved coursework and preserve literal learner text', () => {
  const course = h.getAcademyCourse('country-fit');
  const record = recordFor(course);
  record.notes[course.lessons[0].id] = '<script>literal text</script>\nMy own work: ação.';
  record.notes['unknown-lesson'] = 'obsolete content';
  record.portfolio = 'Saved portfolio';
  record.credentialId = 'private-certificate-id';
  const text = studioNotebook(course, record, { edition: 'Edition', portfolio: 'Portfolio', saved: 'Saved' });
  assert.ok(text.includes(record.notes[course.lessons[0].id]));
  assert.ok(text.includes('Saved portfolio'));
  assert.ok(text.includes(course.version));
  for (const value of ['private-identity', 'Private Learner', 'private diagnostic', 'private-certificate-id', 'obsolete content']) assert.ok(!text.includes(value));
});
