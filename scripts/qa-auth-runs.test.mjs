import test from 'node:test';
import assert from 'node:assert/strict';
import { createQaRunId, isQaRunId } from './helpers/qa-auth-runs.mjs';

test('default-generated QA run IDs are accepted by cleanup', () => {
  const run = createQaRunId();
  assert.match(run, /^tgpi-qa-\d{13}$/);
  assert.equal(isQaRunId(run), true);
  assert.equal(isQaRunId(createQaRunId(1795474354303)), true);
});

test('cleanup retains compatibility with existing dated QA runs', () => {
  for (const run of ['tgpi-qa-20261123', 'tgpi-qa-20261123-b', 'tgpi-qa-20261123-retest']) {
    assert.equal(isQaRunId(run), true, run);
  }
});

test('cleanup refuses non-QA identifiers and malformed timestamp lengths', () => {
  for (const value of [undefined, null, 1795474354303, {}, [], 'production', 'user_123', 'tgpi-qa-', 'tgpi-qa-179547435430', 'tgpi-qa-17954743543030', 'tgpi-qa-20261123/other', 'tgpi-qa-20261123\n', 'tgpi-qa-20261123-../production']) {
    assert.equal(isQaRunId(value), false, String(value));
  }
});
