import { WALLET_MODE, walletOwnerPath } from './environment.server';
import 'server-only';
import { createFirestoreDeleteWrite, createFirestoreUpdateWrite, getFirestoreDocument, listFirestoreDocumentPage, runFirestoreTransaction, type FirestoreDecodedDocument, type FirestoreWrite, type JsonValue } from '@/lib/firestore-admin-rest.server';
import { AtlasError } from '@/lib/atlas/contracts';
import { assertWallet, emptyWallet, integerMoney, PROVIDER_RESERVE_MICRO_USD, TURN_PRICE_CENTS, type WalletAccount, type WalletEntry } from './policy';

export const TREASURY_PATH = `tgpiLearningUsers/${WALLET_MODE === 'live' ? '_atlasTreasury' : '_atlasTestTreasury'}/wallet/state`;
export function assertTreasury(value: Treasury) {
  if (!value || ![value.collectedCents, value.reversedCents, value.providerReservedMicroUsd, value.revenueCents].every(integerMoney)) throw Error('Invalid treasury accounting');
}
export type Treasury = { collectedCents: number; reversedCents: number; providerReservedMicroUsd: number; revenueCents: number };
export const emptyTreasury = (): Treasury => ({ collectedCents: 0, reversedCents: 0, providerReservedMicroUsd: 0, revenueCents: 0 });
export function walletPath(uid: string) {
  return `${walletOwnerPath(uid)}/wallet/state`;
}
export const walletWrite = (path: string, value: object) => createFirestoreUpdateWrite(path, JSON.parse(JSON.stringify(value)) as Record<string, JsonValue>);
export function ledgerWrite(uid: string, id: string, kind: WalletEntry['kind'], amountCents: number, reference: string) {
  return walletWrite(`${walletOwnerPath(uid)}/walletLedger/${Date.now()}-${id}`, { id, kind, amountCents, reference, createdAt: new Date().toISOString() });
}
export function fundedLimitMicroUsd() {
  const cents = Number(process.env.TGPI_ATLAS_PROVIDER_PREPAID_CENTS || 0);
  return integerMoney(cents) && cents <= 100_000_000 && process.env.TGPI_ATLAS_FUNDING_REFERENCE ? cents * 10_000 : 0;
}
export function walletCheckoutConfigured() {
  return process.env.TGPI_ATLAS_TAX_POLICY_CONFIRMED === 'true' && /^acct_[a-zA-Z0-9]+$/.test(process.env.TGPI_ATLAS_STRIPE_ACCOUNT_ID || '') && process.env.BILLING_ENABLED === 'true' && process.env.TGPI_ATLAS_WALLET_ENABLED === 'true' && process.env.TGPI_ATLAS_WALLET_WEBHOOKS_CONFIRMED === 'true' && fundedLimitMicroUsd() >= PROVIDER_RESERVE_MICRO_USD;
}
type Reader = <T>(paths: string[]) => Promise<Map<string, FirestoreDecodedDocument<T> | null>>;
type Reservation = { token: string; requestId: string; conversationId: string; state: 'reserved' | 'complete' | 'released'; createdAt: string; settledAt?: string };
/** Called inside the conversation transaction: no provider call can precede these writes. */
export async function reserveWallet(getDocuments: Reader, uid: string, requestId: string, conversationId: string, token: string): Promise<FirestoreWrite[]> {
  if (WALLET_MODE !== 'live') throw new AtlasError('Test credits cannot fund paid AI requests.', 503);
  const path = walletPath(uid);
  const operationPath = `${walletOwnerPath(uid)}/walletRequests/${requestId}`;
  const docs = await getDocuments<WalletAccount | Treasury | Reservation>([path, TREASURY_PATH, operationPath]);
  const account = (docs.get(path)?.data as WalletAccount | undefined) || emptyWallet();
  const treasury = (docs.get(TREASURY_PATH)?.data as Treasury | undefined) || emptyTreasury();
  const operation = docs.get(operationPath)?.data as Reservation | undefined;
  assertWallet(account);
  if (operation && (operation.conversationId !== conversationId || operation.state !== 'released')) throw new AtlasError('This request already has a wallet reservation. Reload before sending again.', 409);
  if (account.balanceCents < TURN_PRICE_CENTS) throw new AtlasError('Insufficient Atlas credits. Open your wallet to add credits.', 402);
  assertTreasury(treasury);
  const nextReserve = treasury.providerReservedMicroUsd + PROVIDER_RESERVE_MICRO_USD;
  if (nextReserve > fundedLimitMicroUsd() || nextReserve > (treasury.collectedCents - treasury.reversedCents) * 10_000) throw new AtlasError('Atlas is awaiting funded service capacity. Your credits have not been charged.', 503);
  const reservation: Reservation = { token, requestId, conversationId, state: 'reserved', createdAt: new Date().toISOString() };
  return [walletWrite(path, { ...account, balanceCents: account.balanceCents - TURN_PRICE_CENTS, reservedCents: account.reservedCents + TURN_PRICE_CENTS, updatedAt: reservation.createdAt }), walletWrite(TREASURY_PATH, { ...treasury, providerReservedMicroUsd: nextReserve }), walletWrite(operationPath, reservation), walletWrite(`${walletOwnerPath(uid)}/walletReservations/${token}`, reservation), walletWrite(`${walletOwnerPath(uid)}/walletPending/${token}`, reservation), ledgerWrite(uid, `${token}-reserve`, 'reserve', -TURN_PRICE_CENTS, requestId)];
}
/** Failed/interrupted replies return customer credits. Provider capacity stays reserved conservatively. */
export async function settleWallet(uid: string, requestId: string, token: string, completed: boolean) {
  const path = walletPath(uid);
  const reservationPath = `${walletOwnerPath(uid)}/walletReservations/${token}`;
  const operationPath = `${walletOwnerPath(uid)}/walletRequests/${requestId}`;
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const docs = await getDocuments<WalletAccount | Reservation | Treasury>([path, reservationPath, operationPath, TREASURY_PATH]);
    const reservation = docs.get(reservationPath)?.data as Reservation | undefined;
    if (!reservation || reservation.state !== 'reserved' || reservation.requestId !== requestId) return { result: false, writes: [] };
    const account = docs.get(path)?.data as WalletAccount;
    const operation = docs.get(operationPath)?.data as Reservation | undefined;
    const treasury = docs.get(TREASURY_PATH)?.data as Treasury;
    assertWallet(account);
    assertTreasury(treasury);
    if (account.reservedCents < TURN_PRICE_CENTS) throw Error('Reservation accounting mismatch');
    const settled = { ...reservation, state: completed ? 'complete' : 'released', settledAt: new Date().toISOString() };
    return { result: true, writes: [walletWrite(path, { ...account, balanceCents: account.balanceCents + (completed ? 0 : TURN_PRICE_CENTS), reservedCents: account.reservedCents - TURN_PRICE_CENTS, spentCents: account.spentCents + (completed ? TURN_PRICE_CENTS : 0), updatedAt: settled.settledAt }), walletWrite(reservationPath, settled), createFirestoreDeleteWrite(`${walletOwnerPath(uid)}/walletPending/${token}`), ...(operation?.token === token ? [walletWrite(operationPath, settled)] : []), walletWrite(TREASURY_PATH, { ...treasury, revenueCents: treasury.revenueCents + (completed ? TURN_PRICE_CENTS : 0) }), ledgerWrite(uid, `${token}-settle`, completed ? 'consume' : 'release', completed ? 0 : TURN_PRICE_CENTS, requestId)] };
  });
}
export async function recoverWalletReservations(uid: string, cursor?: string) {
  walletPath(uid);
  const page = await listFirestoreDocumentPage<Reservation>(walletOwnerPath(uid), 'walletPending', cursor);
  for (const { data } of page.items) {
    if (data.state === 'reserved' && Date.parse(data.createdAt) < Date.now() - 300_000) await settleWallet(uid, data.requestId, data.token, false);
  }
  return page.nextPageToken;
}
export async function assertCheckoutCapacity() {
  const treasury = (await getFirestoreDocument<Treasury>(TREASURY_PATH))?.data || emptyTreasury();
  if (!integerMoney(treasury.providerReservedMicroUsd) || fundedLimitMicroUsd() - treasury.providerReservedMicroUsd < PROVIDER_RESERVE_MICRO_USD) throw new AtlasError('Atlas service capacity is awaiting replenishment. No payment has been taken.', 503);
}
export async function readWallet(uid: string, cursor?: string) {
  const [record, entries] = await Promise.all([getFirestoreDocument<WalletAccount>(walletPath(uid)), listFirestoreDocumentPage<WalletEntry>(walletOwnerPath(uid), 'walletLedger', cursor)]);
  const account = record?.data || emptyWallet(); assertWallet(account);
  return { ...account, mode: WALLET_MODE, entries: entries.items.map(x => x.data).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), cursor: entries.nextPageToken };
}
