import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import * as crypto from 'node:crypto';

function harness() {
  const documents = new Map();
  let tail = Promise.resolve();
  const backend = {
    createFirestoreUpdateWrite: (path, data, condition) => ({ path, data, condition }),
    runFirestoreTransaction: callback => {
      const work = tail.then(async () => {
        const plan = await callback({ getDocuments: async paths => new Map(paths.map(path => [path, documents.get(path) ?? null])) });
        for (const write of plan.writes) {
          const previous = documents.get(write.path);
          if (write.condition?.exists === false) assert.equal(previous, undefined);
          if (write.condition?.updateTime) assert.equal(previous?.updateTime, write.condition.updateTime);
          documents.set(write.path, { data: structuredClone(write.data), updateTime: crypto.randomUUID() });
        }
        return structuredClone(plan.result);
      });
      tail = work.catch(() => {});
      return work;
    },
  };
  const exports = {};
  const code = ts.transpileModule(readFileSync('src/lib/checkout-intent.server.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'exports', code)(id => {
    if (id === 'server-only') return {};
    if (id === 'node:crypto') return crypto;
    if (id === '@/lib/firestore-admin-rest.server') return backend;
    throw Error('Unexpected import ' + id);
  }, exports);
  return { service: exports, documents };
}
const input = { uid: 'test-alice', customerId: 'cus_test', priceId: 'price_test', baseUrl: 'https://preview.example', analyticsConsent: false };

test('concurrent clicks reserve one durable Stripe intent and stable expiry', async () => {
  const { service, documents } = harness();
  const intents = await Promise.all(Array.from({ length: 20 }, () => service.reserveCheckoutIntent(input)));
  assert.equal(new Set(intents.map(i => i.id)).size, 1);
  assert.equal(new Set(intents.map(i => i.expiresAt)).size, 1);
  assert.equal(documents.size, 1);
});
test('retry preserves original Stripe parameters, including changed consent', async () => {
  const { service } = harness();
  const first = await service.reserveCheckoutIntent(input);
  assert.deepEqual(await service.reserveCheckoutIntent({ ...input, analyticsConsent: true }), first);
});
test('accounts remain isolated and offer changes cannot open a second payable checkout', async () => {
  const { service } = harness();
  const first = await service.reserveCheckoutIntent(input);
  const other = await service.reserveCheckoutIntent({ ...input, uid: 'test-bob', customerId: 'cus_bob' });
  assert.notEqual(first.id, other.id);
  await assert.rejects(service.reserveCheckoutIntent({ ...input, priceId: 'price_changed' }), /existing checkout must expire/);
  await assert.rejects(service.reserveCheckoutIntent({ ...input, baseUrl: 'https://other.example' }), /existing checkout must expire/);
});
test('expired checkout rotates only after the old payable session expires', async () => {
  const { service, documents } = harness();
  const first = await service.reserveCheckoutIntent(input);
  documents.get('tgpiLearningUsers/test-alice/billing/checkout').data.expiresAt = Math.floor(Date.now() / 1000) - 1;
  assert.notEqual((await service.reserveCheckoutIntent(input)).id, first.id);
});
test('customer creation key is stable and contains no account identifier', () => {
  const { service } = harness();
  assert.equal(service.stripeCustomerIdempotencyKey(input.uid), service.stripeCustomerIdempotencyKey(input.uid));
  assert.notEqual(service.stripeCustomerIdempotencyKey('test-bob'), service.stripeCustomerIdempotencyKey(input.uid));
  assert.ok(!service.stripeCustomerIdempotencyKey(input.uid).includes(input.uid));
});
