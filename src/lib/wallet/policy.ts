/** USD cents for customer credits; integer micro-USD for conservative API reserves. */
export const ATLAS_MODEL = 'gpt-4.1-mini-2025-04-14';
export const TURN_PRICE_CENTS = 10;
export const PROVIDER_RESERVE_MICRO_USD = 20_000;
export const WALLET_PACKS = [{ id: 'starter', cents: 500 }, { id: 'explorer', cents: 1000 }, { id: 'global', cents: 2500 }] as const;
export type WalletPack = typeof WALLET_PACKS[number]['id'];
export type WalletAccount = { balanceCents: number; reservedCents: number; spentCents: number; updatedAt: string };
export type WalletEntry = { id: string; kind: 'topup' | 'reserve' | 'consume' | 'release' | 'reversal'; amountCents: number; createdAt: string; reference: string };
export const emptyWallet = (): WalletAccount => ({ balanceCents: 0, reservedCents: 0, spentCents: 0, updatedAt: new Date().toISOString() });
export function integerMoney(value: unknown): value is number { return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0; }
export function assertWallet(value: WalletAccount) {
  // A refund after consumption can produce a debt. It must block spending, never be silently erased.
  if (!Number.isSafeInteger(value.balanceCents) || !integerMoney(value.reservedCents) || !integerMoney(value.spentCents)) throw Error('Invalid wallet accounting');
}
export function providerCostMicroUsd(input: number, output: number) {
  if (!integerMoney(input) || !integerMoney(output)) throw Error('Invalid provider usage');
  return Math.ceil(input * 0.4 + output * 1.6);
}
