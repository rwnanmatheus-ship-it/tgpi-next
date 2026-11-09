import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import ts from 'typescript';
import * as contracts from '../src/lib/atlas/contracts.ts';
function load(path, dependencies) {
  const exports = {};
  new Function('require', 'exports', ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText)(id => {
    if (id === 'server-only') return {};
    if (id === 'node:crypto') return { randomUUID };
    if (!(id in dependencies)) throw Error('Unexpected import ' + id);
    return dependencies[id];
  }, exports);
  return exports;
}
const policy = load('src/lib/wallet/policy.ts', {});
function harness(mode = 'production') {
  process.env.VERCEL_ENV = mode;
  process.env.STRIPE_SECRET_KEY = mode === 'production' ? 'sk_live_fixture' : 'sk_test_fixture';
  const data = new Map(); let queue = Promise.resolve();
  const firestore = {
    createFirestoreUpdateWrite: (path, value) => ({ path, value: structuredClone(value) }),
    createFirestoreDeleteWrite: path => ({ delete: path }),
    getFirestoreDocument: async path => data.has(path) ? { data: structuredClone(data.get(path)) } : null,
    listFirestoreDocumentPage: async (parent, collection) => ({ items: [...data].filter(([key]) => key.startsWith(`${parent}/${collection}/`)).map(([, value]) => ({ data: structuredClone(value) })), nextPageToken: null }),
    runFirestoreTransaction: callback => {
      const result = queue.then(async () => {
        const plan = await callback({ getDocuments: async paths => new Map(paths.map(path => [path, data.has(path) ? { data: structuredClone(data.get(path)) } : null])) });
        for (const write of plan.writes) if (write.delete) data.delete(write.delete); else data.set(write.path, structuredClone(write.value));
        return plan.result;
      }); queue = result.catch(() => {}); return result;
    },
  };
  const dependencies = { '@/lib/firestore-admin-rest.server': firestore, '@/lib/atlas/contracts': contracts, './policy': policy, '@/lib/wallet/policy': policy };
  const environment = load('src/lib/wallet/environment.server.ts', dependencies);
  dependencies['./environment.server'] = environment;
  const wallet = load('src/lib/wallet/store.server.ts', dependencies);
  const store = load('src/lib/atlas/store.server.ts', { ...dependencies, './contracts': contracts, '@/lib/wallet/store.server': wallet });
  let charge = { livemode: mode === 'production', id: 'ch_one', paid: true, disputed: false, amount_refunded: 0, payment_intent: 'pi_one', balance_transaction: { currency: 'usd', net: 455 } };
  const intent = { id: randomUUID(), uid: 'alice', customer: 'cus_alice', cents: 500, pack: 'starter', origin: 'https://tgpi.test', createdAt: Date.now(), expiresAt: Date.now() + 2_100_000 };
  data.set(`${environment.COMMERCE_ROOT}/intents/${intent.id}`, intent);
  const pi = { livemode: mode === 'production', id: 'pi_one', status: 'succeeded', currency: 'usd', amount_received: 500, customer: 'cus_alice', latest_charge: 'ch_one', metadata: { tgpiWalletIntent: intent.id } };
  const sessions = [];
  const payments = load('src/lib/wallet/payments.server.ts', { ...dependencies, './store.server': wallet, '@/lib/billing.server': { getOrCreateStripeCustomer: async () => 'cus_alice' }, '@/lib/stripe': { getStripeServer: () => ({ customers: { create: async () => ({ id: 'cus_alice', livemode: mode === 'production' }), retrieve: async () => ({ id: 'cus_alice', livemode: mode === 'production' }) }, paymentIntents: { retrieve: async () => structuredClone(pi) }, charges: { retrieve: async () => structuredClone(charge) }, checkout: { sessions: { create: async (args, options) => { sessions.push({ args, options }); return { livemode: mode === 'production', status: 'open', url: 'https://checkout.stripe.com/session' }; } } } }) } });
  process.env.TGPI_ATLAS_PROVIDER_PREPAID_CENTS = '100'; process.env.TGPI_ATLAS_FUNDING_REFERENCE = 'test-fixture-no-real-funds';
  return { environment, data, wallet, store, payments, pi, charge, intent, sessions, account: () => data.get(wallet.walletPath('alice')), treasury: () => data.get(wallet.TREASURY_PATH), reserve: (requestId = randomUUID(), token = randomUUID(), conversation = randomUUID()) => firestore.runFirestoreTransaction(async ({ getDocuments }) => ({ result: token, writes: await wallet.reserveWallet(getDocuments, 'alice', requestId, conversation, token) })), seed: cents => { data.set(wallet.walletPath('alice'), { ...policy.emptyWallet(), balanceCents: cents }); data.set(wallet.TREASURY_PATH, { ...wallet.emptyTreasury(), collectedCents: 1000 }); } };
}
const input = () => ({ conversationId: randomUUID(), requestId: randomUUID(), text: 'Question', temporary: true, scopes: [], history: [] });
test('new wallet is zero and cannot spend, including a founder or Premium account', async () => {
  const h = harness(); assert.equal((await h.wallet.readWallet('alice')).balanceCents, 0);
  await assert.rejects(h.reserve(), e => e.status === 402); assert.equal(h.treasury(), undefined);
});
test('concurrent requests cannot spend the same last ten cents', async () => {
  const h = harness(); h.seed(10);
  const results = await Promise.allSettled([h.reserve(), h.reserve()]);
  assert.equal(results.filter(x => x.status === 'fulfilled').length, 1); assert.equal(h.account().balanceCents, 0); assert.equal(h.account().reservedCents, 10); assert.equal(h.treasury().providerReservedMicroUsd, 20000);
});
test('paid customer credits cannot substitute for funded provider capacity', async () => {
  const h = harness(); h.seed(500); process.env.TGPI_ATLAS_PROVIDER_PREPAID_CENTS = '0';
  await assert.rejects(h.reserve(), e => e.status === 503); assert.equal(h.account().balanceCents, 500);
});
test('reservation, conversation and daily budget are one atomic transaction', async () => {
  const h = harness(); h.seed(10); const request = input();
  await h.store.beginTurn('alice', request, .1);
  assert.equal(h.account().balanceCents, 0); assert.equal(h.account().reservedCents, 10);
  const before = structuredClone([...h.data]);
  await assert.rejects(h.store.beginTurn('bob', input(), .1), e => e.status === 402);
  assert.deepEqual([...h.data], before);
});
test('successful settlement is idempotent; failed settlement refunds once but retains API cost coverage', async () => {
  const h = harness(); h.seed(20); const req = randomUUID(); const token = await h.reserve(req);
  await Promise.all([h.wallet.settleWallet('alice', req, token, true), h.wallet.settleWallet('alice', req, token, true)]);
  assert.equal(h.account().spentCents, 10); assert.equal(h.account().reservedCents, 0); assert.equal(h.treasury().revenueCents, 10);
  const req2 = randomUUID(); const token2 = await h.reserve(req2); await h.wallet.settleWallet('alice', req2, token2, false); await h.wallet.settleWallet('alice', req2, token2, false);
  assert.equal(h.account().balanceCents, 10); assert.equal(h.treasury().providerReservedMicroUsd, 40000);
});
test('expired process reservations release safely, active streams remain reserved', async () => {
  const h = harness(); h.seed(20); const old = await h.reserve(); await h.reserve();
  h.data.get(`tgpiLearningUsers/alice/walletPending/${old}`).createdAt = '2020-01-01T00:00:00Z';
  await h.wallet.recoverWalletReservations('alice'); await h.wallet.recoverWalletReservations('alice');
  assert.equal(h.account().balanceCents, 10); assert.equal(h.account().reservedCents, 10); assert.equal(h.treasury().providerReservedMicroUsd, 40000);
});
test('duplicate payment events credit only once and record real processing fee net', async () => {
  const h = harness(); await Promise.all([h.payments.reconcileWalletPayment('pi_one'), h.payments.reconcileWalletPayment('pi_one')]);
  assert.equal(h.account().balanceCents, 500); assert.equal(h.treasury().collectedCents, 455);
});
test('unpaid, mismatched owner, amount and currency never grant credit', async () => {
  for (const mutation of [{ status: 'processing' }, { customer: 'cus_attacker' }, { amount_received: 1000 }, { currency: 'eur' }]) {
    const h = harness(); Object.assign(h.pi, mutation); await h.payments.reconcileWalletPayment('pi_one').catch(() => {}); assert.equal(h.account(), undefined);
  }
});
test('refund after spend records debt, blocks use, and stale payment events cannot restore funds', async () => {
  const h = harness(); await h.payments.reconcileWalletPayment('pi_one');
  const req = randomUUID(); const token = await h.reserve(req); await h.wallet.settleWallet('alice', req, token, true);
  h.charge.amount_refunded = 500; await h.payments.reconcileWalletPayment('pi_one'); assert.equal(h.account().balanceCents, -10);
  h.charge.amount_refunded = 0; await h.payments.reconcileWalletPayment('pi_one'); assert.equal(h.account().balanceCents, -10);
  await assert.rejects(h.reserve(), e => e.status === 402); assert.equal(h.treasury().reversedCents, 500);
});
test('refund arriving before success credits only the unrefunded portion', async () => {
  const h = harness(); h.charge.amount_refunded = 200; await h.payments.reconcileWalletPayment('pi_one'); assert.equal(h.account().balanceCents, 300);
});
test('disputes freeze the payment once without double subtracting a partial refund', async () => {
  const h = harness(); await h.payments.reconcileWalletPayment('pi_one'); h.charge.amount_refunded = 200; await h.payments.reconcileWalletPayment('pi_one'); h.charge.disputed = true; await h.payments.reconcileWalletPayment('pi_one'); await h.payments.reconcileWalletPayment('pi_one'); assert.equal(h.account().balanceCents, 0); assert.equal(h.treasury().reversedCents, 500);
});
test('checkout retries reuse immutable server prices and one Stripe idempotency key', async () => {
  const h = harness(); await Promise.all([h.payments.createWalletCheckout('alice', 'starter', 'https://tgpi.test'), h.payments.createWalletCheckout('alice', 'starter', 'https://tgpi.test')]);
  assert.deepEqual(h.sessions[0], h.sessions[1]); assert.equal(h.sessions[0].args.line_items[0].price_data.unit_amount, 500); assert.equal(h.sessions[0].args.mode, 'payment');
  await assert.rejects(h.payments.createWalletCheckout('alice', 'global', 'https://tgpi.test'), e => e.status === 409);
});
test('bounded text cost stays below conservative reserve; monetary corruption fails closed', () => {
  assert.ok(policy.providerCostMicroUsd(30000, 1500) < policy.PROVIDER_RESERVE_MICRO_USD);
  for (const cents of [NaN, Infinity, .5]) assert.throws(() => policy.assertWallet({ balanceCents: cents, reservedCents: 0, spentCents: 0 }));
});

test('wallet webhook dispatcher preserves subscription events and handles all reversal event types', async () => {
  const h = harness(); await h.payments.handleWalletEvent({ type: 'customer.subscription.updated', data: { object: {} } }); assert.equal(h.account(), undefined);
  await h.payments.handleWalletEvent({ type: 'payment_intent.succeeded', data: { object: h.pi } }); assert.equal(h.account().balanceCents, 500);
  h.charge.disputed = true;
  for (const type of ['charge.dispute.created', 'charge.dispute.updated', 'charge.dispute.closed']) await h.payments.handleWalletEvent({ type, data: { object: { object: 'dispute', charge: 'ch_one' } } });
  assert.equal(h.account().balanceCents, 0);
});
test('full webhook verifies the signature before touching either wallet or subscription services', async () => {
  const { default: Stripe } = await import('stripe');
  const stripe = new Stripe('sk_test_fixture_no_network'); let calls = 0;
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fixture';
  const route = load('src/app/api/stripe/webhook/route.ts', {
    'stripe': { default: Stripe }, 'next/server': { NextResponse: { json: Response.json } },
    '@/lib/stripe': { getStripeServer: () => stripe }, '@/lib/billing.server': {},
    '@/lib/wallet/payments.server': { handleWalletEvent: async () => { calls++; } },
  });
  const payload = JSON.stringify({ id: 'evt_fixture', object: 'event', type: 'payment_intent.succeeded', data: { object: {} } });
  const request = signature => new Request('https://tgpi.test/api/stripe/webhook', { method: 'POST', headers: signature ? { 'stripe-signature': signature } : {}, body: payload });
  assert.equal((await route.POST(request())).status, 400); assert.equal((await route.POST(request('forged'))).status, 400); assert.equal(calls, 0);
  const signature = stripe.webhooks.generateTestHeaderString({ payload, secret: 'whsec_fixture' });
  assert.equal((await route.POST(request(signature))).status, 200); assert.equal(calls, 1);
});
test('wallet checkout authenticates before provider calls and rejects injected prices', async () => {
  const { z } = await import('zod'); let uid = null; let enabled = true; let created = 0;
  const http = load('src/lib/atlas/http.server.ts', { '@/lib/wallet/policy': policy, './contracts': contracts, zod: { z }, '@clerk/nextjs/server': { auth: async () => ({ userId: uid }) }, '@/lib/firestore-admin-rest.server': { isLearningStorageConfigured: () => true } });
  const route = load('src/app/api/atlas/wallet/checkout/route.ts', { zod: { z }, '@/lib/atlas/contracts': contracts, '@/lib/atlas/http.server': { ...http, requireAtlasGeneration: () => .1 }, '@/lib/wallet/store.server': { walletCheckoutConfigured: () => enabled, assertCheckoutCapacity: async () => {} }, '@/lib/wallet/payments.server': { createWalletCheckout: async () => { created++; return 'https://checkout.stripe.com/fixture'; } } });
  const request = (body, origin = 'https://tgpi.test') => new Request('https://tgpi.test/api/atlas/wallet/checkout', { method: 'POST', headers: { origin }, body: JSON.stringify(body) });
  assert.equal((await route.POST(request({ pack: 'starter' }))).status, 401); uid = 'alice';
  assert.equal((await route.POST(request({ pack: 'starter' }, 'https://evil.test'))).status, 403);
  assert.equal((await route.POST(request({ pack: 'starter', cents: 1, uid: 'victim' }))).status, 400);
  enabled = false; assert.equal((await route.POST(request({ pack: 'starter' }))).status, 503); assert.equal(created, 0);
  enabled = true; assert.equal((await route.POST(request({ pack: 'starter' }))).status, 200); assert.equal(created, 1);
});

test('sandbox and production wallet owners, commerce records and treasury are disjoint', async () => {
  const live = harness(); const sandbox = harness('preview');
  assert.notEqual(live.wallet.walletPath('alice'), sandbox.wallet.walletPath('alice'));
  assert.notEqual(live.wallet.TREASURY_PATH, sandbox.wallet.TREASURY_PATH);
  assert.notEqual(live.environment.COMMERCE_ROOT, sandbox.environment.COMMERCE_ROOT);
  await sandbox.payments.reconcileWalletPayment('pi_one'); assert.equal(sandbox.account().balanceCents, 500);
  assert.equal(sandbox.data.has(live.wallet.walletPath('alice')), false);
  await assert.rejects(sandbox.reserve(), /Test credits cannot fund paid AI/);
});
test('live environment rejects sandbox payments and sandbox rejects live payments before granting balance', async () => {
  for (const mode of ['production', 'preview']) {
    const h = harness(mode); h.pi.livemode = !h.pi.livemode;
    await assert.rejects(h.payments.reconcileWalletPayment('pi_one'), /environment mismatch/); assert.equal(h.account(), undefined);
  }
});
test('wrong-mode Stripe key prevents checkout creation before any customer or intent write', async () => {
  const h = harness(); process.env.STRIPE_SECRET_KEY = 'sk_test_wrong_environment';
  const before = structuredClone([...h.data]);
  await assert.rejects(h.payments.createWalletCheckout('alice', 'starter', 'https://tgpi.test'), e => e.status === 503);
  assert.deepEqual([...h.data], before); assert.equal(h.sessions.length, 0);
});
test('non-integer Stripe amounts and corrupted treasury never mutate customer balance', async () => {
  const h = harness(); h.charge.balance_transaction.net = NaN;
  await assert.rejects(h.payments.reconcileWalletPayment('pi_one'), /monetary/); assert.equal(h.account(), undefined);
  h.seed(500); h.treasury().revenueCents = NaN;
  await assert.rejects(h.reserve(), /treasury accounting/); assert.equal(h.account().balanceCents, 500);
});
test('wallet financial disclosures have matching keys across all six platform locales', () => {
  const { walletCopy } = load('src/lib/wallet/copy.ts', {});
  assert.deepEqual(Object.keys(walletCopy).sort(), ['de','en','es','fr','it','pt-BR']);
  for (const copy of Object.values(walletCopy)) {
    assert.deepEqual(Object.keys(copy).sort(), Object.keys(walletCopy.en).sort());
    for (const value of Object.values(copy)) assert.ok(typeof value === 'string' && value.trim().length > 0);
    assert.match(copy.chatPrice, /0[.,]10/);
  }
});
