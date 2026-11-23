import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import * as qaRuns from './helpers/qa-auth-runs.mjs';

const nativeRequire = createRequire(import.meta.url);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const compiled = ts.transpileModule(readFileSync('scripts/qa-auth-accounts.mjs', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;

async function runHarness({ reused = false, failAt, synthetic = true, run = 'tgpi-qa-20261123-retest' } = {}) {
  const config = { secretKey: 'sk_test_fixture_only', run, count: 1, concurrency: 1, origin: 'http://localhost:3100', cleanupAfter: true };
  const tag = { synthetic, run, index: 1 };
  const fails = phase => Array.isArray(failAt) ? failAt.includes(phase) : failAt === phase;
  const stored = { id: 'user_qa', privateMetadata: { tgpiQa: tag }, unsafeMetadata: reused ? { tgpiOnboarding: { updatedAt: '2026-11-23T10:00:00.000Z', targetCountries: ['spain'] } } : {} };
  const calls = { created: 0, updated: 0, deleted: [], revoked: [], drafts: [], messages: [] };
  let revision = 0;
  const users = {
    getUserList: async () => ({ data: reused ? [structuredClone(stored)] : [] }),
    createUser: async () => { calls.created++; return structuredClone(stored); },
    updateUser: async () => { calls.updated++; return structuredClone(stored); },
    verifyPassword: async () => { if (fails('password')) throw new Error('Password check unavailable'); return { verified: true }; },
    getUser: async () => structuredClone(stored),
    deleteUser: async id => { calls.deleted.push(id); if (fails('delete')) throw new Error('Fixture deletion unavailable'); },
  };
  const sessions = {
    createSession: async () => { if (fails('session')) throw new Error('Session creation unavailable'); return { id: 'session_qa' }; },
    getToken: async () => ({ jwt: 'fixture-session-jwt' }),
    revokeSession: async id => { calls.revoked.push(id); if (fails('revoke')) throw new Error('Revocation unavailable'); return { status: 'revoked' }; },
  };
  const request = async (url, options) => {
    if (url.pathname === '/api/account-profile') return Response.json({ profile: {} });
    assert.equal(url.pathname, '/api/onboarding');
    if (options.headers['X-TGPI-Session'] !== 'session_qa') return Response.json({}, { status: 401 });
    const draft = JSON.parse(options.body);
    if (!draft) return Response.json({}, { status: 400 });
    if (draft.updatedAt !== stored.unsafeMetadata.tgpiOnboarding?.updatedAt) return Response.json({}, { status: 409 });
    calls.drafts.push(structuredClone(draft));
    const saved = { ...draft, updatedAt: `2026-11-23T12:00:0${++revision}.000Z` };
    stored.unsafeMetadata.tgpiOnboarding = saved;
    stored.unsafeMetadata.tgpiAccountProfile = { profession: saved.profession };
    return Response.json({ onboarding: saved });
  };
  let error;
  try {
    await new AsyncFunction('require', 'exports', 'fetch', 'console', 'setTimeout', compiled)(name => {
      if (name === '@clerk/backend') return { createClerkClient: () => ({ users, sessions }), verifyToken: async () => ({ sub: stored.id, sid: 'session_qa' }) };
      if (name === 'node:readline') return { createInterface: () => ({ once: (_event, callback) => queueMicrotask(() => callback(JSON.stringify(config))), close() {} }) };
      if (name === './helpers/qa-auth-runs.mjs') return qaRuns;
      if (name === 'node:child_process') return { spawn: () => { throw new Error('External processes are forbidden in this fixture.'); } };
      return nativeRequire(name);
    }, {}, request, { log: message => calls.messages.push(message) }, callback => { callback(); });
  } catch (cause) { error = cause; }
  return { calls, stored, error };
}

test('fresh synthetic account completes HTTP checks without a stored onboarding revision', async () => {
  const { calls, error } = await runHarness();
  assert.equal(error, undefined);
  assert.equal(calls.created, 1);
  assert.equal(calls.updated, 0);
  assert.equal(calls.drafts[0].updatedAt, undefined);
  assert.equal(calls.drafts[1].updatedAt, '2026-11-23T12:00:01.000Z');
  assert.deepEqual(calls.deleted, ['user_qa']);
});

test('rerunning a retained synthetic account sends its current revision before the first save', async () => {
  const { calls, error } = await runHarness({ reused: true });
  assert.equal(error, undefined);
  assert.equal(calls.created, 0);
  assert.equal(calls.updated, 1);
  assert.equal(calls.drafts[0].updatedAt, '2026-11-23T10:00:00.000Z');
  assert.equal(calls.drafts.length, 2);
  assert.deepEqual(calls.revoked, ['session_qa']);
  assert.deepEqual(calls.deleted, ['user_qa']);
});

test('cleanupAfter removes its synthetic fixture after password, session or revocation failures', async () => {
  const messages = { password: 'Password check unavailable', session: 'Session creation unavailable', revoke: 'Revocation unavailable' };
  for (const failAt of ['password', 'session', 'revoke']) {
    const { calls, error } = await runHarness({ failAt });
    assert.ok(error, failAt);
    assert.equal(error.message, messages[failAt]);
    assert.deepEqual(calls.deleted, ['user_qa'], failAt);
    assert.deepEqual(calls.revoked, failAt === 'revoke' ? ['session_qa'] : [], failAt);
  }
});

test('a cleanup error retains the original verification failure in the reported aggregate', async () => {
  const { calls, error } = await runHarness({ failAt: ['password', 'delete'] });
  assert.ok(error instanceof AggregateError);
  assert.deepEqual(error.errors.map(item => item.message), ['Password check unavailable', 'Fixture deletion unavailable']);
  assert.deepEqual(calls.deleted, ['user_qa']);
});

test('retained accounts lacking the synthetic marker cannot have passwords changed or be removed', async () => {
  const { calls, error } = await runHarness({ reused: true, synthetic: false });
  assert.ok(error);
  assert.equal(calls.updated, 0);
  assert.deepEqual(calls.deleted, []);
});

test('an uncleanable custom run identifier fails before account creation or password changes', async () => {
  const { calls, error } = await runHarness({ run: 'production' });
  assert.ok(error);
  assert.equal(calls.created, 0);
  assert.equal(calls.updated, 0);
  assert.deepEqual(calls.deleted, []);
});
