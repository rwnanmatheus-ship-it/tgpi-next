import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import { createHash } from 'node:crypto';

function compile(file, dependencies) {
  const exports = {};
  const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require', 'exports', code)(id => {
    if (!Object.hasOwn(dependencies, id)) throw Error('Unexpected import ' + id);
    return dependencies[id];
  }, exports);
  return exports;
}
const policy = compile('src/lib/billing.ts', {});
function subscription(status = 'active', id = 'sub_main') {
  return { id, customer: 'cus_alice', status, metadata: { tgpiUserId: 'alice' }, cancel_at_period_end: false,
    items: { data: [{ price: { id: 'price_premium' }, current_period_end: 1800000000 }] } };
}
function harness() {
  const documents = new Map(), notifications = [];
  let version = 0, reads = 0, storageFails = false, mirrorFails = false;
  let mirrorHook = async () => {};
  const legacy = policy.createFreeSubscriptionRecord('alice');
  const provider = { data: [subscription()], has_more: false, deleted: false, owner: 'alice' };
  const backend = {
    getFirestoreDocument: async path => { if (storageFails) throw Error('storage unavailable'); return structuredClone(documents.get(path) || null); },
    createFirestoreUpdateWrite: (path, data, condition) => ({ path, data: structuredClone(data), condition }),
    runFirestoreTransaction: async callback => {
      for (let attempt = 0; attempt < 10; attempt++) {
        const seen = new Map();
        const plan = await callback({ getDocuments: async paths => new Map(paths.map(path => {
          const doc = documents.get(path); seen.set(path, doc?.updateTime);
          return [path, structuredClone(doc || null)];
        })) });
        if ([...seen].some(([path, time]) => documents.get(path)?.updateTime !== time)) continue;
        for (const write of plan.writes) {
          const current = documents.get(write.path);
          if (write.condition?.exists === false) assert.equal(current, undefined);
          if (write.condition?.updateTime) assert.equal(current?.updateTime, write.condition.updateTime);
        }
        for (const write of plan.writes) documents.set(write.path, { data: write.data, updateTime: String(++version) });
        return structuredClone(plan.result);
      }
      throw Error('transaction contention');
    },
  };
  const stripe = {
    customers: {
      retrieve: async () => provider.deleted ? { deleted: true } : { metadata: { tgpiUserId: provider.owner } },
      create: async (_params, options) => { assert.match(options.idempotencyKey, /^customer-/); return { id: 'cus_alice' }; },
    },
    subscriptions: { list: async () => { reads++; await Promise.resolve(); return structuredClone({ data: provider.data, has_more: provider.has_more }); } },
  };
  const service = compile('src/lib/billing.server.ts', {
    'server-only': {}, 'node:crypto': { createHash }, '@/lib/billing': policy,
    '@/lib/checkout-intent.server': { stripeCustomerIdempotencyKey: uid => 'customer-' + uid },
    '@/lib/funnel.server': { recordFunnelEvent: () => {} },
    '@/lib/firestore-admin-rest.server': backend,
    '@/lib/stripe': { TGPI_PREMIUM_PRICE_ID: 'price_premium', getStripeServer: () => stripe },
    '@clerk/nextjs/server': { clerkClient: async () => ({ users: {
      getUser: async () => ({ privateMetadata: { tgpiBilling: structuredClone(legacy) } }),
      updateUserMetadata: async (_uid, payload) => { if (mirrorFails) throw Error('mirror unavailable'); await mirrorHook(payload.privateMetadata.tgpiBilling); Object.assign(legacy, payload.privateMetadata.tgpiBilling); },
    } }) },
    '@/lib/notifications/store.server': { tryPublishNotification: async (...args) => notifications.push(args) },
    '@/lib/notifications/model': { billingEvent: (...args) => args },
  });
  const sync = (id, created = 100, snapshot = subscription()) => service.syncUserBillingFromSubscription({ uid: 'alice', subscription: snapshot, event: { id, created } });
  return { service, sync, documents, provider, legacy, notifications, reads: () => reads,
    failStorage: () => { storageFails = true; }, failMirror: () => { mirrorFails = true; },
    mirror: hook => { mirrorHook = hook; } };
}

test('legacy subscribers remain intact until an atomic record is created', async () => {
  const h = harness(); Object.assign(h.legacy, { plan: 'premium', status: 'active', stripeCustomerId: 'cus_alice' });
  assert.equal((await h.service.getUserBillingRecord('alice')).plan, 'premium');
  const record = await h.sync('evt_initial');
  assert.equal(record.plan, 'premium');
  assert.equal(h.documents.get('tgpiLearningUsers/alice/billing/subscription').data.plan, 'premium');
});
test('twenty concurrent deliveries persist one event and publish one notification', async () => {
  const h = harness();
  await Promise.all(Array.from({ length: 20 }, () => h.sync('evt_duplicate')));
  assert.equal(h.notifications.length, 1);
  assert.equal([...h.documents.keys()].filter(path => path.includes('/billingEvents/')).length, 1);
});
test('old and equal-second event payloads reconcile current Stripe state', async () => {
  const h = harness(); await h.sync('evt_active', 300);
  h.provider.data = [subscription('canceled')];
  const stale = await h.sync('evt_old_active', 100, subscription('active'));
  assert.equal(stale.plan, 'free'); assert.equal(stale.status, 'canceled');
  assert.equal(stale.lastStripeEventCreated, 300);
  h.provider.data = [subscription('active')];
  assert.equal((await h.sync('evt_equal_second', 100, subscription('canceled'))).plan, 'premium');
});
test('late Clerk mirror cannot restore revoked access', async () => {
  const h = harness(); let unblock, started;
  const hasStarted = new Promise(resolve => { started = resolve; });
  const waiting = new Promise(resolve => { unblock = resolve; });
  h.mirror(async record => { if (record.plan === 'premium') { started(); await waiting; } });
  const first = h.sync('evt_active'); await hasStarted;
  h.provider.data = [subscription('canceled')]; await h.sync('evt_canceled', 200);
  unblock(); await first;
  assert.equal(h.legacy.plan, 'premium', 'force a stale compatibility mirror');
  assert.equal((await h.service.getUserBillingRecord('alice')).plan, 'free');
});
test('failed mirror preserves canonical billing; failed storage never falls back to stale privileges', async () => {
  const h = harness(); h.failMirror();
  await h.sync('evt_persist'); assert.equal((await h.service.getUserBillingRecord('alice')).plan, 'premium');
  h.failStorage(); await assert.rejects(h.service.getUserBillingRecord('alice'), /storage unavailable/);
});
test('customer ownership mismatch and truncated history cannot grant Premium', async () => {
  const h = harness(); h.provider.owner = 'bob'; await assert.rejects(h.sync('evt_bad_owner'), /owner could not be verified/);
  assert.equal(h.documents.size, 0);
  h.provider.owner = 'alice'; h.provider.has_more = true; await assert.rejects(h.sync('evt_many'), /requires reconciliation/);
  assert.equal(h.documents.size, 0);
});
test('new active subscription survives a delayed deletion event for an old subscription', async () => {
  const h = harness(); h.provider.data = [subscription('active', 'sub_new'), subscription('canceled', 'sub_old')];
  const record = await h.sync('evt_old_delete', 100, subscription('canceled', 'sub_old'));
  assert.equal(record.plan, 'premium'); assert.equal(record.stripeSubscriptionId, 'sub_new');
});
test('cancel-at-period-end retains active access; failed payment and price mismatch revoke it', async () => {
  const h = harness(); h.provider.data[0].cancel_at_period_end = true;
  assert.equal((await h.sync('evt_scheduled')).plan, 'premium');
  h.provider.data = [subscription('past_due')]; assert.equal((await h.sync('evt_due')).plan, 'free');
  h.provider.data = [subscription()]; h.provider.data[0].items.data[0].price.id = 'price_other';
  assert.equal((await h.sync('evt_price')).plan, 'free');
});
test('a deleted known customer revokes access even when the incoming snapshot is active', async () => {
  const h = harness(); await h.sync('evt_created'); h.provider.deleted = true;
  const record = await h.sync('evt_customer_deleted'); assert.equal(record.plan, 'free'); assert.equal(record.status, 'canceled');
});
test('customer creation does not overwrite a concurrent authoritative subscription', async () => {
  const h = harness(); const customer = await h.service.getOrCreateStripeCustomer('alice');
  assert.equal(customer, 'cus_alice'); await h.sync('evt_active');
  assert.equal(await h.service.getOrCreateStripeCustomer('alice'), 'cus_alice');
  assert.equal((await h.service.getUserBillingRecord('alice')).plan, 'premium');
});
