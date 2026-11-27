import assert from 'node:assert/strict';
import test from 'node:test';
import { nextStudyEvening, studyCalendar } from '../src/lib/learning/study-calendar.ts';

const now = new Date('2026-11-01T12:00:00Z');
const schedule = { courseId: 'english-abroad', title: 'Inglês, trabalho; São Paulo', localStart: '2026-11-30T08:15', minutes: 45, sessions: 4 };

test('weekly study calendar keeps the local start, duration, reminder and canonical return link', () => {
  const file = studyCalendar(schedule, now);
  assert.ok(file.endsWith('END:VCALENDAR\r\n'));
  for (const line of ['DTSTAMP:20261101T120000Z', 'DTSTART:20261130T081500', 'DURATION:PT45M', 'RRULE:FREQ=WEEKLY;COUNT=4', 'TRIGGER:-PT10M', 'URL:https://www.theglobalpolymath.com/courses/english-abroad']) {
    assert.ok(file.split('\r\n').includes(line), line);
  }
  assert.ok(file.includes('SUMMARY:TGPI · Inglês\\, trabalho\\; São Paulo'));
  const single = studyCalendar({ ...schedule, sessions: 1 }, now);
  assert.ok(!single.includes('RRULE:'));
  assert.equal(single.split('BEGIN:VEVENT').length - 1, 1);
});

test('rejects invalid dates, already elapsed sessions, unknown courses paths and unsupported options', () => {
  for (const change of [
    { localStart: '2026-11-31T10:00' }, { localStart: '2026-11-28T25:00' },
    { localStart: '2025-11-01T12:00' }, { localStart: '2026-12-01T12:00Z' },
    { courseId: '../billing' }, { title: '  ' }, { sessions: 0 }, { minutes: 99999 },
  ]) assert.equal(studyCalendar({ ...schedule, ...change }, now), null);
});

test('long multilingual titles preserve characters and fit the calendar line length', () => {
  const file = studyCalendar({ ...schedule, title: '日本語🌍'.repeat(17) + '\r\nEND:VEVENT' }, now);
  assert.ok(file.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
  assert.equal(file.split('\r\n').filter(line => line === 'END:VEVENT').length, 1);
  assert.ok(file.replaceAll('\r\n ', '').includes('日本語🌍'.repeat(17)));
});

test('default study time crosses month and year boundaries in local time', () => {
  assert.equal(nextStudyEvening(new Date(2026, 11, 31, 23, 59)), '2027-01-01T19:00');
});
