import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync('src/app/api/stripe/create-checkout-session/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function harness({ signedIn = true, sameOrigin = true, offer = true, subscription = null, status = 'open' } = {}) {
  let creates = 0;
  let params, options;
  class AuthenticationError extends Error {}
  const exports = {};
  const stripe = {
    prices: { retrieve: async () => ({}) },
    checkout: { sessions: {
      create: async (p, o) => { creates++; params = p; options = o; return { id: 'cs_test' }; },
      retrieve: async () => ({ status, url: status === 'open' ? 'https://checkout.stripe.com/test-only' : null }),
    } },
  };
  const dependencies = {
    '@/lib/checkout-intent.server': { reserveCheckoutIntent: async () => ({ id: 'durable-id', expiresAt: 123456, analyticsConsent: false }) },
    '@/lib/commercial-offer': { matchesPremiumOffer: () => offer },
    '@/lib/funnel.server': { recordFunnelEvent: () => {}, requestFunnelConsent: () => false },
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    '@/lib/auth/guards': { TgpiAuthenticationError: AuthenticationError, requireApiUser: async () => {
      if (!signedIn) throw new AuthenticationError();
      return { uid: 'authenticated-user' };
    } },
    '@/lib/billing.server': {
      getOrCreateStripeCustomer: async uid => { assert.equal(uid, 'authenticated-user'); return 'cus_authenticated'; },
      findLatestStripeSubscription: async () => subscription,
      syncUserBillingFromSubscription: async () => ({ status: 'active', plan: 'premium' }),
    },
    '@/lib/billing': { blocksNewCheckout: () => true },
    '@/lib/stripe': { TGPI_PREMIUM_PRICE_ID: 'price_1990', getBaseUrl: () => 'https://preview.example', getStripeServer: () => stripe, isSameOriginRequest: () => sameOrigin },
  };
  new Function('require', 'exports', code)(id => {
    assert.ok(Object.hasOwn(dependencies, id), 'Unexpected dependency ' + id);
    return dependencies[id];
  }, exports);
  return { post: () => exports.POST(new Request('https://preview.example/api/stripe/create-checkout-session', { method: 'POST', body: JSON.stringify({ uid: 'attacker-selected-user', plan: 'premium' }) })), result: () => ({ creates, params, options }) };
}
const previousBillingEnabled = process.env.BILLING_ENABLED;
process.env.BILLING_ENABLED = 'true';
test.after(() => { if (previousBillingEnabled === undefined) delete process.env.BILLING_ENABLED; else process.env.BILLING_ENABLED = previousBillingEnabled; });

test('checkout enforces authentication, origin and advertised offer before creation', async () => {
  for (const [input, expected] of [[{ signedIn: false }, 401], [{ sameOrigin: false }, 403], [{ offer: false }, 503], [{ subscription: { id: 'sub_existing' } }, 409]]) {
    const h = harness(input);
    assert.equal((await h.post()).status, expected);
    assert.equal(h.result().creates, 0);
  }
});
test('Stripe receives authenticated owner and durable idempotency, never browser-selected uid', async () => {
  const h = harness();
  const response = await h.post();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('cache-control'), /private, no-store/);
  const { params, options } = h.result();
  assert.equal(params.client_reference_id, 'authenticated-user');
  assert.equal(params.customer, 'cus_authenticated');
  assert.equal(params.line_items[0].price, 'price_1990');
  assert.equal(params.expires_at, 123456);
  assert.equal(options.idempotencyKey, 'tgpi-checkout-v1-durable-id');
});
test('completed and expired idempotent replays do not return a payable URL', async () => {
  for (const status of ['complete', 'expired']) {
    const response = await harness({ status }).post();
    assert.equal(response.status, 409);
    assert.equal((await response.json()).code, 'CHECKOUT_NOT_OPEN');
  }
});
