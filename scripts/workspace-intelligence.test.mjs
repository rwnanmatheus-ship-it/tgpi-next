import test from 'node:test';
import assert from 'node:assert/strict';
import { reconcileWorkspaceLearning, matchesWorkspaceSearch, workspaceLearningProgress } from '../src/lib/workspace-intelligence.ts';
import { parseWorkspacePreferences, normalizeWorkspacePreferences } from '../src/lib/workspace-control.ts';
const item = { courseId: 'english', title: 'Global English', href: '/courses/english/lessons/new', kind: 'legacy', status: 'in_progress', completed: 3, total: 8, updatedAt: '2026-11-10T10:00:00Z' };
const stale = { id: 'course-english', title: 'Old title', href: '/courses/english/lessons/old', kind: 'course', status: 'completed', detail: '8 / 8 lessons · Completed' };
test('unified learning replaces stale status, title and continuation and adds academy records', () => {
  const result = reconcileWorkspaceLearning([stale], { items: [item, { ...item, courseId: 'academy', kind: 'academy' }], unavailable: [] });
  assert.equal(result.length, 2);
  assert.equal(result[0].href, item.href);
  assert.equal(result[0].status, 'in_progress');
  assert.equal(result[0].title, item.title);
  assert.match(result[0].detail, /3 \/ 8/);
  assert.equal(reconcileWorkspaceLearning([], { items: [{ ...item, status: 'certificate_pending' }], unavailable: [] })[0].statusLabel, 'Completed · Certificate pending');
});
test('edition changes never expose obsolete completed status and missing sources retain fallback records', () => {
  assert.equal(reconcileWorkspaceLearning([stale], { items: [{ ...item, status: 'edition_changed' }], unavailable: [] })[0].status, 'edition_changed');
  assert.deepEqual(reconcileWorkspaceLearning([stale], { items: [], unavailable: ['legacy'] }), [stale]);
  assert.deepEqual(reconcileWorkspaceLearning([stale], { items: [], unavailable: [] }), []);
});
test('resource reconciliation deduplicates courses and preserves non-learning items', () => {
  const country = { id: 'country-spain', title: 'Spain', kind: 'country', href: '/countries/spain', detail: 'Saved destination' };
  const result = reconcileWorkspaceLearning([stale, country], { items: [item, item], unavailable: [] });
  assert.equal(result.length, 2);
  assert.ok(result.includes(country));
});
test('workspace search ignores accents and token order but requires every word', () => {
  assert.ok(matchesWorkspaceSearch('Preparação para países · Documentos', 'paises preparacao'));
  assert.ok(matchesWorkspaceSearch('Country Fit', '  FIT country  '));
  assert.ok(!matchesWorkspaceSearch('Portugal', 'portugal curso'));
});
test('learning indicators exclude past editions and preserve unavailable data', () => {
  assert.equal(workspaceLearningProgress({ items: [item, { ...item, total: 200, completed: 200, status: 'edition_changed' }], unavailable: [] }), 38);
  assert.equal(workspaceLearningProgress({ items: [item], unavailable: ['academy'] }), null);
  assert.equal(workspaceLearningProgress({ items: [], unavailable: [] }), 0);
});
test('pins are bounded, deduplicated, account data only and compatible with old preferences', () => {
  const old = { version: 1, density: 'comfortable', hidden: [], dismissed: [] };
  assert.deepEqual(parseWorkspacePreferences(old), old);
  assert.deepEqual(parseWorkspacePreferences({ ...old, pinned: ['course-english', 'course-english'] }).pinned, ['course-english']);
  assert.deepEqual(parseWorkspacePreferences({ ...old, pinned: ['work:8000', 'study:portugal|spain'] }).pinned, ['work:8000', 'study:portugal|spain']);
  assert.equal(parseWorkspacePreferences({ ...old, pinned: Array(9).fill('country-spain') }), null);
  assert.equal(parseWorkspacePreferences({ ...old, pinned: ['//external.example'] }), null);
  assert.deepEqual(normalizeWorkspacePreferences({ ...old, pinned: [23, 'valid', 'x'.repeat(161)] }).pinned, ['valid']);
});
