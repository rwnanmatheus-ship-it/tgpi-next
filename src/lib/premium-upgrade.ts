import { safeReturnTo } from './auth/return-to';

export const PREMIUM_REQUIRED = 'PREMIUM_REQUIRED';
export const premiumCheckoutDestination = 'tgpi:premium-checkout-destination';

export function premiumDestination(value: unknown) {
  const path = safeReturnTo(value, '');
  return path.split(/[?#]/, 1)[0] === '/pricing' ? '' : path;
}

export function premiumUpgradeHref(returnTo?: string) {
  const path = premiumDestination(returnTo);
  return path ? `/pricing?next=${encodeURIComponent(path)}#membership` : '/pricing#membership';
}
