import test from 'node:test';
import assert from 'node:assert/strict';
import { comparisonPath, restoreComparison } from '../src/lib/comparison-state.ts';
const valid = new Set(['portugal', 'canada', 'japan']);
const goals = ['overall', 'study', 'work'];
test('legacy saved selections remain usable', () => {
  assert.deepEqual(restoreComparison(['portugal','canada'], valid, goals), {countrySlugs:['portugal','canada'],goal:'overall'});
});
test('new selections preserve the decision goal', () => {
  assert.deepEqual(restoreComparison({countrySlugs:['portugal','japan'], goal:'work'}, valid, goals), {countrySlugs:['portugal','japan'],goal:'work'});
});
test('invalid storage cannot inject countries or unknown goals', () => {
  assert.equal(restoreComparison({countrySlugs:['portugal','portugal',null,'bad']}, valid, goals), null);
  assert.equal(restoreComparison(null, valid, goals), null);
  assert.equal(restoreComparison('script', valid, goals), null);
  assert.equal(restoreComparison({countrySlugs:['portugal','japan'],goal:'admin'}, valid, goals).goal, 'overall');
});
test('shared URLs retain order, deduplicate and bound countries', () => {
  assert.equal(comparisonPath(['portugal','canada','portugal','japan','france'],'work'), '/compare?country=portugal&country=canada&country=japan&goal=work');
  assert.equal(comparisonPath(['portugal','canada'],'overall'), '/compare?country=portugal&country=canada');
});
test('shared URLs cannot include arbitrary profile fields', () => {
  const restored = restoreComparison({countrySlugs:['portugal','canada'],goal:'study',nationality:'private'},valid,goals);
  assert.ok(!comparisonPath(restored.countrySlugs, restored.goal).includes('private'));
});
