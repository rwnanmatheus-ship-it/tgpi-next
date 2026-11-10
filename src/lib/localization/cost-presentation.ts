import { formatMoney, type CostReference } from '../intelligence/dossiers.ts';
import type { Locale } from './config.ts';

/** Present a published amount in the visitor's locale without changing its currency, scope or source values. */
export function localizedCostReference(
  cost: Pick<CostReference, 'low' | 'high' | 'currency' | 'periodMonths'>,
  locale: Locale,
  translate: (key: string) => string,
): string {
  const low = formatMoney(cost.low, cost.currency, locale);
  const high = cost.high === cost.low ? '' : `–${formatMoney(cost.high, cost.currency, locale)}`;
  return `${low}${high} / ${cost.periodMonths} ${translate(cost.periodMonths === 1 ? 'month' : 'months')}`;
}
