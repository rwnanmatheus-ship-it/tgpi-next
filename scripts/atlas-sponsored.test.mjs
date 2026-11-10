import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import ts from 'typescript';
import * as contracts from '../src/lib/atlas/contracts.ts';

function load(path, deps) {
  const exports = {};
  const code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  new Function('require', 'exports', code)(id => {
    if (id === 'server-only') return {};
    if (id === 'node:crypto') return { randomUUID };
    if (!(id in deps)) throw Error('Unexpected import: ' + id);
    return deps[id];
  }, exports);
  return exports;
}
const policy = load('src/lib/wallet/policy.ts', {});
function setup(cents = '100') {
  Object.assign(process.env, { VERCEL_ENV: 'production', TGPI_ATLAS_ACCESS_MODE: 'sponsored', TGPI_ATLAS_SPONSORED_POLICY_CONFIRMED: 'true', TGPI_ATLAS_SPONSORED_GRANT: 'test-grant', TGPI_ATLAS_SPONSORED_CENTS: cents, TGPI_ATLAS_SPONSORED_EXPIRES_AT: new Date(Date.now() + 86400000).toISOString() });
  const data = new Map(); let queue = Promise.resolve();
  const firestore = {
    createFirestoreUpdateWrite: (path, value) => ({ path, value }),
    runFirestoreTransaction: build => {
      const task = queue.then(async () => {
        const plan = await build({ getDocuments: async paths => new Map(paths.map(path => [path, data.has(path) ? { data: structuredClone(data.get(path)) } : null])) });
        for (const write of plan.writes) data.set(write.path, structuredClone(write.value));
        return plan.result;
      });
      queue = task.catch(() => {}); return task;
    },
  };
  const module = load('src/lib/atlas/sponsored.server.ts', { '@/lib/firestore-admin-rest.server': firestore, '@/lib/wallet/policy': policy, './contracts': contracts });
  return { ...module, data, cooldown: () => { for (const value of data.values()) if ('lastAt' in value) value.lastAt = 0; } };
}
const input = () => ({ conversationId: randomUUID(), requestId: randomUUID(), text: 'PRIVATE_QUESTION', temporary: true, history: [], scopes: [] });

test('sponsorship fails closed outside production, without review, and after expiry', () => {
  const h = setup(); assert.equal(h.sponsoredConfig().limitMicroUsd, 1_000_000);
  for (const [key, value] of [['VERCEL_ENV','preview'], ['TGPI_ATLAS_SPONSORED_POLICY_CONFIRMED','false'], ['TGPI_ATLAS_SPONSORED_CENTS','NaN'], ['TGPI_ATLAS_SPONSORED_CENTS','-1'], ['TGPI_ATLAS_SPONSORED_GRANT','../bad'], ['TGPI_ATLAS_SPONSORED_EXPIRES_AT','2000-01-01']]) {
    const previous = process.env[key]; process.env[key] = value;
    assert.throws(() => h.sponsoredConfig(), e => e.status === 503); process.env[key] = previous;
  }
});
test('free turns store only bounded counters, without messages, history or wallet operations', async () => {
  const h = setup(); const req = input(); req.history = [{ role: 'user', content: 'PRIVATE_HISTORY' }];
  assert.equal((await h.beginSponsoredTurn('alice', req, 2)).history.at(-1).content, 'PRIVATE_QUESTION');
  await h.beginSponsoredTurn('bob', input(), 2);
  assert.equal(h.data.size, 3);
  assert.doesNotMatch(JSON.stringify([...h.data]), /PRIVATE_|wallet|atlasConversations/);
  assert.equal(h.data.get('tgpiLearningUsers/alice/atlasSponsored/current').count, 1);
});
test('simultaneous duplicate requests reserve one provider call', async () => {
  const h = setup(); const req = input();
  const results = await Promise.allSettled([h.beginSponsoredTurn('alice', req, 2), h.beginSponsoredTurn('alice', req, 2)]);
  assert.equal(results.filter(x => x.status === 'fulfilled').length, 1);
  assert.equal(results.find(x => x.status === 'rejected').reason.status, 409);
  assert.equal(h.data.get('tgpiLearningUsers/_atlasSponsored/atlasBudget/current').grants['test-grant'], 20_000);
});
test('daily cap, per-account cap and cooldown cannot be bypassed', async () => {
  let h = setup(); await h.beginSponsoredTurn('alice', input(), .02);
  await assert.rejects(h.beginSponsoredTurn('bob', input(), .02), e => e.status === 429);
  h = setup(); await h.beginSponsoredTurn('alice', input(), 2);
  await assert.rejects(h.beginSponsoredTurn('alice', input(), 2), e => e.status === 429);
  for (let n = 1; n < 10; n++) { h.cooldown(); await h.beginSponsoredTurn('alice', input(), 2); }
  h.cooldown(); await assert.rejects(h.beginSponsoredTurn('alice', input(), 2), e => e.status === 429);
  assert.equal(h.data.get('tgpiLearningUsers/alice/atlasSponsored/current').requests.length, 10);
});
test('cycle cap survives a day boundary and switching back to the same grant', async () => {
  const h = setup('2'); await h.beginSponsoredTurn('alice', input(), 2);
  for (const v of h.data.values()) v.day = '2000-01-01';
  await assert.rejects(h.beginSponsoredTurn('bob', input(), 2), e => e.status === 429);
  process.env.TGPI_ATLAS_SPONSORED_GRANT = 'second-grant'; await h.beginSponsoredTurn('bob', input(), 2);
  process.env.TGPI_ATLAS_SPONSORED_GRANT = 'test-grant'; await assert.rejects(h.beginSponsoredTurn('carol', input(), 2), e => e.status === 429);
});
test('saved-mode and invalid owners are rejected before any reservation', async () => {
  const h = setup();
  await assert.rejects(h.beginSponsoredTurn('alice', { ...input(), temporary: false }, 2), e => e.status === 409);
  await assert.rejects(h.beginSponsoredTurn('_atlasSponsored', input(), 2), e => e.status === 400);
  await assert.rejects(h.beginSponsoredTurn('../bob', input(), 2), e => e.status === 400);
  assert.equal(h.data.size, 0);
});
test('sponsored route streams a completed answer without invoking paid accounting or saved-history storage', async () => {
  const h = setup(); let paidCalls = 0; let providerCalls = 0;
  class Provider { responses = { create: async () => { providerCalls++; return (async function* () { yield { type: 'response.output_text.delta', delta: 'Test answer' }; yield { type: 'response.completed', response: { usage: { input_tokens: 10, output_tokens: 3 } } }; })(); } }; }
  const paid = async () => { paidCalls++; throw Error('Paid path must not run'); };
  const route = load('src/app/api/atlas/chat/route.ts', {
    '@/lib/localization/server': { getLocale: async () => 'de' },
    openai: Provider, '@clerk/nextjs/server': {}, '@/lib/atlas/sponsored.server': h,
    '@/lib/atlas/http.server': { atlasUser: async () => 'alice', requireAtlasGeneration: () => 2, atlasBody: async () => input(), atlasFailure: () => Response.json({}, { status: 503 }) },
    '@/lib/atlas/contracts': contracts, '@/lib/atlas/context': { atlasInstructions: 'Test', selectAtlasContext: () => ({ data: {}, factors: [] }) },
    '@/lib/atlas/store.server': { beginTurn: paid, finishTurn: paid }, '@/lib/wallet/store.server': { settleWallet: paid }, '@/lib/wallet/policy': policy,
  });
  const response = await route.POST(new Request('https://tgpi.test/api/atlas/chat', { method: 'POST' }));
  assert.equal(response.status, 200); const events = (await response.text()).trim().split('\n').map(JSON.parse);
  assert.equal(events.at(-1).type, 'done'); assert.equal(events.at(-1).status, 'complete'); assert.equal(events.at(-1).conversation, null);
  assert.equal(paidCalls, 0); assert.equal(providerCalls, 1);
});
test('free-access copy is present in all supported locales', () => {
  const { atlasFreeCopy } = load('src/lib/atlas/free-copy.ts', {});
  assert.deepEqual(Object.keys(atlasFreeCopy).sort(), ['de','en','es','fr','it','pt-BR']);
  for (const copy of Object.values(atlasFreeCopy)) assert.ok(copy.banner.includes('10') && copy.privacy.length > 100 && copy.exhausted);
});
