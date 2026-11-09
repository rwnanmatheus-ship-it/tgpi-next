import 'server-only';
import { AtlasError } from '@/lib/atlas/contracts';
/** Only Vercel's production environment may account for real payments. */
export const WALLET_MODE = process.env.VERCEL_ENV === 'production' ? 'live' : 'test';
export const COMMERCE_ROOT = `tgpiLearningUsers/${WALLET_MODE === 'live' ? '_atlasCommerce' : '_atlasTestCommerce'}`;
export function walletOwnerPath(uid: string) {
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(uid) || uid.startsWith('_')) throw new AtlasError('Invalid wallet owner.', 400);
  return `tgpiLearningUsers/${WALLET_MODE === 'live' ? uid : `_atlasTest_${uid}`}`;
}
export function assertStripeMode(livemode: unknown) {
  if (livemode !== (WALLET_MODE === 'live')) throw Error('Stripe payment environment mismatch');
}
export function assertStripeKeyMode() {
  const prefix = WALLET_MODE === 'live' ? /^(sk|rk)_live_/ : /^(sk|rk)_test_/;
  if (!prefix.test(process.env.STRIPE_SECRET_KEY || '')) throw new AtlasError('Payment environment is not configured.', 503);
}
export function assertStripeMerchant(account: { id: string; charges_enabled: boolean; default_currency?: string }) {
  const expected = process.env.TGPI_ATLAS_STRIPE_ACCOUNT_ID;
  if (!expected || account.id !== expected) throw new AtlasError('Wallet merchant account has not been verified.', 503);
  if (!['usd', 'brl'].includes(account.default_currency || '')) throw new AtlasError('Merchant settlement currency is not supported.', 503);
  if (WALLET_MODE === 'live' && !account.charges_enabled) throw new AtlasError('Merchant account cannot accept payments yet.', 503);
}
