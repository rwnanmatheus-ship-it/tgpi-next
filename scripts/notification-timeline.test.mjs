import test from 'node:test';
import assert from 'node:assert/strict';
import { notificationGroup, notificationRelativeTime } from '../src/lib/notifications/presentation.ts';
test('timeline groups calendar days correctly around midnight and DST boundaries', () => {
  const now = new Date(2026, 9, 17, 0, 10);
  assert.equal(notificationGroup(new Date(2026,9,17,0,1).toISOString(),now),'Today');
  assert.equal(notificationGroup(new Date(2026,9,16,23,59).toISOString(),now),'Yesterday');
  assert.equal(notificationGroup(new Date(2026,9,15,23,59).toISOString(),now),'Earlier');
});
test('relative time handles missing, future, minute and hour boundaries', () => {
  const now = new Date('2026-10-17T10:00:00Z');
  assert.equal(notificationRelativeTime('2026-10-17T10:01:00Z',now),'Just now');
  assert.equal(notificationRelativeTime('2026-10-17T09:58:00Z',now),'2m ago');
  assert.equal(notificationRelativeTime('2026-10-17T07:00:00Z',now),'3h ago');
  assert.equal(notificationRelativeTime('bad',now),'Date unavailable');
});
