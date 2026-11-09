import { WALLET_MODE, COMMERCE_ROOT, walletOwnerPath, assertStripeMode, assertStripeKeyMode } from './environment.server';
import 'server-only';
import { randomUUID } from 'node:crypto';
import type Stripe from 'stripe';
import { getStripeServer } from '@/lib/stripe';
import { getFirestoreDocument, runFirestoreTransaction } from '@/lib/firestore-admin-rest.server';
import { AtlasError } from '@/lib/atlas/contracts';
import { assertWallet, emptyWallet, WALLET_PACKS, type WalletAccount, type WalletPack } from './policy';
import { assertTreasury, emptyTreasury, ledgerWrite, TREASURY_PATH, walletPath, walletWrite, type Treasury } from './store.server';

type Intent = { id: string; uid: string; customer: string; cents: number; pack: WalletPack; origin: string; createdAt: number; expiresAt: number };
type Payment = { creditedCents: number; revokedCents: number; netCents: number; paymentIntent: string; uid: string; charge: string };
const intentPath = (id: string) => `${COMMERCE_ROOT}/intents/${id}`;
const identifier = (value: string | { id: string } | null) => typeof value === 'string' ? value : value?.id;

export async function createWalletCheckout(uid: string, packId: WalletPack, origin: string) {
  assertStripeKeyMode();
  const pack = WALLET_PACKS.find(x => x.id === packId);
  if (!pack) throw new AtlasError('Invalid credit pack.', 400);
  const customerPath = `${walletOwnerPath(uid)}/walletCustomer/stripe`;
  const existing = (await getFirestoreDocument<{ id: string }>(customerPath))?.data;
  // Dedicated, environment-scoped customers avoid modifying shared Premium billing in sandbox.
  const customerRecord = existing ? await getStripeServer().customers.retrieve(existing.id) : await getStripeServer().customers.create({ metadata: { tgpiUserId: uid, product: 'atlas-wallet', walletMode: WALLET_MODE } }, { idempotencyKey: `tgpi-atlas-customer-${WALLET_MODE}-${uid}` });
  if ('deleted' in customerRecord && customerRecord.deleted) throw Error('Wallet customer is deleted');
  assertStripeMode(customerRecord.livemode);
  const customer = customerRecord.id;
  await runFirestoreTransaction(async ({ getDocuments }) => {
    const saved = (await getDocuments<{ id: string }>([customerPath])).get(customerPath)?.data;
    if (saved && saved.id !== customer) throw Error('Wallet customer identity mismatch');
    return { result: null, writes: saved ? [] : [walletWrite(customerPath, { id: customer })] };
  });
  const lockPath = `${walletOwnerPath(uid)}/walletCheckout/active`;
  const intent = await runFirestoreTransaction<Intent>(async ({ getDocuments }) => {
    const current = (await getDocuments<Intent>([lockPath])).get(lockPath)?.data;
    // Retries use the exact persisted parameters and idempotency key, including across tabs.
    if (current && current.expiresAt > Date.now() + 60_000) {
      if (current.pack !== packId || current.origin !== origin) throw new AtlasError('A credit checkout is already open. Complete it or wait 35 minutes before choosing another pack.', 409);
      return { result: current, writes: [] };
    }
    const next: Intent = { id: randomUUID(), uid, customer, cents: pack.cents, pack: packId, origin, createdAt: Date.now(), expiresAt: Math.floor(Date.now() / 1000) * 1000 + 35 * 60_000 };
    return { result: next, writes: [walletWrite(lockPath, next), walletWrite(intentPath(next.id), next)] };
  });
  const session = await getStripeServer().checkout.sessions.create({
    mode: 'payment', customer: intent.customer, client_reference_id: uid,
    payment_method_types: ['card'],
    line_items: [{ quantity: 1, price_data: { currency: 'usd', unit_amount: intent.cents, product_data: { name: 'TGPI Atlas — prepaid service credits', description: 'For Atlas usage only. No automatic renewal. USD 0.10 per completed reply.' } } }],
    metadata: { tgpiWalletIntent: intent.id }, payment_intent_data: { metadata: { tgpiWalletIntent: intent.id } },
    success_url: `${intent.origin}/atlas/wallet?checkout=success`, cancel_url: `${intent.origin}/atlas/wallet?checkout=cancelled`,
    expires_at: Math.floor(intent.expiresAt / 1000),
  }, { idempotencyKey: `tgpi-atlas-wallet-v1-${intent.id}` });
  assertStripeMode(session.livemode);
  if (session.status !== 'open' || !session.url) throw new AtlasError('This checkout has finished. Refresh your wallet before starting another.', 409);
  return session.url;
}

/** Server-retrieved payment facts only; success redirects and client metadata never grant balance. */
export async function reconcileWalletPayment(paymentIntentId: string) {
  const stripe = getStripeServer();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const id = paymentIntent.metadata.tgpiWalletIntent;
  if (!id) return;
  assertStripeMode(paymentIntent.livemode);
  if (!/^[0-9a-f-]{36}$/.test(id)) throw Error('Invalid wallet payment reference');
  const intent = (await getFirestoreDocument<Intent>(intentPath(id)))?.data;
  if (!intent) throw Error('Wallet payment intent not found');
  if (paymentIntent.status !== 'succeeded') return;
  if (paymentIntent.currency !== 'usd' || paymentIntent.amount_received !== intent.cents || identifier(paymentIntent.customer) !== intent.customer) throw Error('Wallet payment ownership or amount mismatch');
  const chargeId = identifier(paymentIntent.latest_charge);
  if (!chargeId) throw Error('Wallet charge is not available');
  const charge = await stripe.charges.retrieve(chargeId, { expand: ['balance_transaction'] });
  assertStripeMode(charge.livemode);
  if (!charge.paid || identifier(charge.payment_intent) !== paymentIntent.id) throw Error('Wallet charge not paid');
  const balance = charge.balance_transaction as Stripe.BalanceTransaction | null;
  // Require USD settlement so treasury never mixes currencies or guesses processing fees.
  if (!balance || typeof balance === 'string' || balance.currency !== 'usd') throw Error('USD payment settlement is not ready');
  if (!Number.isSafeInteger(balance.net) || !Number.isSafeInteger(charge.amount_refunded) || charge.amount_refunded < 0) throw Error('Invalid Stripe monetary values');
  const paymentPath = `${COMMERCE_ROOT}/payments/${paymentIntent.id}`;
  const path = walletPath(intent.uid);
  await runFirestoreTransaction(async ({ getDocuments }) => {
    const lockPath = `${walletOwnerPath(intent.uid)}/walletCheckout/active`;
    const docs = await getDocuments<WalletAccount | Treasury | Payment | Intent>([path, TREASURY_PATH, paymentPath, lockPath]);
    const checkoutLock = docs.get(lockPath)?.data as Intent | undefined;
    const prior = docs.get(paymentPath)?.data as Payment | undefined;
    if (prior && (prior.uid !== intent.uid || prior.charge !== charge.id)) throw Error('Wallet payment binding mismatch');
    // Reversals are monotonic: reordered events never re-credit a refund or a disputed payment.
    // Won disputes require an explicit verified operational reconciliation, never a late webhook grant.
    const revokedCents = Math.max(prior?.revokedCents || 0, charge.disputed ? intent.cents : charge.amount_refunded);
    if (revokedCents > intent.cents) throw Error('Invalid wallet reversal');
    const target = intent.cents - revokedCents;
    const delta = target - (prior?.creditedCents || 0);
    if (prior && delta === 0) return { result: null, writes: [] };
    const account = (docs.get(path)?.data as WalletAccount | undefined) || emptyWallet(); assertWallet(account);
    const treasury = (docs.get(TREASURY_PATH)?.data as Treasury | undefined) || emptyTreasury();
    assertTreasury(treasury);
    const entryId = `${paymentIntent.id}-${revokedCents}`;
    return { result: null, writes: [
      ...(checkoutLock?.id === intent.id ? [walletWrite(lockPath, { ...checkoutLock, expiresAt: 0 })] : []),
      walletWrite(path, { ...account, balanceCents: account.balanceCents + delta, updatedAt: new Date().toISOString() }),
      walletWrite(paymentPath, { uid: intent.uid, paymentIntent: paymentIntent.id, charge: charge.id, creditedCents: target, revokedCents, netCents: prior?.netCents ?? balance.net }),
      walletWrite(TREASURY_PATH, { ...treasury, collectedCents: treasury.collectedCents + (prior ? 0 : Math.max(0, balance.net)), reversedCents: treasury.reversedCents + revokedCents - (prior?.revokedCents || 0) }),
      ledgerWrite(intent.uid, entryId, delta >= 0 ? 'topup' : 'reversal', delta, paymentIntent.id),
    ] };
  });
}
export async function handleWalletEvent(event: Stripe.Event) {
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.mode === 'payment' && session.metadata?.tgpiWalletIntent && session.payment_intent) await reconcileWalletPayment(identifier(session.payment_intent)!);
  } else if (event.type === 'payment_intent.succeeded') {
    await reconcileWalletPayment((event.data.object as Stripe.PaymentIntent).id);
  } else if (event.type === 'charge.refunded' || event.type === 'charge.dispute.created' || event.type === 'charge.dispute.updated' || event.type === 'charge.dispute.closed') {
    const object = event.data.object as Stripe.Charge | Stripe.Dispute;
    const charge = object.object === 'charge' ? object : await getStripeServer().charges.retrieve(identifier(object.charge)!);
    if (charge.payment_intent) await reconcileWalletPayment(identifier(charge.payment_intent)!);
  }
}
