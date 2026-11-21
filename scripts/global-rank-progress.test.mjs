import assert from 'node:assert/strict';
import test from 'node:test';
import { GLOBAL_RANKS, getGlobalRank } from '../src/lib/global-ranks.ts';
import { getRankReadiness } from '../src/lib/global-rank-progress.ts';
const base = { activationCompletion: 0, comparisons: 0, documentReviews: 0, learningPaths: 0, planCompletion: 0, profileCompletion: 0, savedCountries: 0 };
test('points do not show complete readiness while a course requirement is missing', () => {
  const rank = getGlobalRank({ ...base, activationCompletion: 100, planCompletion: 100, comparisons: 4, documentReviews: 4, savedCountries: 8 });
  const progress = getRankReadiness(rank, rank.nextRank);
  assert.equal(rank.pointsToNext, 0);
  assert.equal(progress.eligible, false);
  assert.equal(progress.met, 2);
  assert.ok(progress.percent < 100);
  assert.equal(progress.requirements.find(item => item.id === 'courses').remaining, 1);
});
test('an incomplete plan remains visible with enough courses and points', () => {
  const rank = getGlobalRank({ ...base, learningPaths: 12, planCompletion: 20 });
  const progress = getRankReadiness(rank, GLOBAL_RANKS[1]);
  assert.equal(progress.eligible, false);
  assert.equal(progress.requirements.find(item => item.id === 'plan').remaining, 20);
});
test('zero requirements and the completed final rank produce finite 100% readiness', () => {
  const empty = getRankReadiness(getGlobalRank(base), GLOBAL_RANKS[0]);
  assert.equal(empty.percent, 100);
  const rank = getGlobalRank(Object.fromEntries(Object.keys(base).map(key => [key, 100])));
  const final = getRankReadiness(rank, GLOBAL_RANKS.at(-1));
  assert.equal(final.eligible, true);
  assert.equal(final.percent, 100);
  for (const item of final.requirements) assert.equal(item.remaining, 0);
});
test('a live update recomputes requirements without changing rank data', () => {
  const rank = getGlobalRank(base), before = JSON.stringify(rank);
  assert.equal(getRankReadiness(rank, GLOBAL_RANKS[2]).requirements[1].remaining, 1);
  const updated = getGlobalRank({ ...base, learningPaths: 1, planCompletion: 60 });
  assert.equal(getRankReadiness(updated, GLOBAL_RANKS[2]).eligible, true);
  assert.equal(JSON.stringify(rank), before);
});
