export const PREMIUM_OFFER = { currency: "usd", unitAmount: 1990, interval: "month", intervalCount: 1 } as const;
export function matchesPremiumOffer(price: { active: boolean; currency: string; unit_amount: number | null; recurring: { interval: string; interval_count: number } | null }) {
  return price.active && price.currency === PREMIUM_OFFER.currency && price.unit_amount === PREMIUM_OFFER.unitAmount && price.recurring?.interval === PREMIUM_OFFER.interval && price.recurring.interval_count === PREMIUM_OFFER.intervalCount;
}
