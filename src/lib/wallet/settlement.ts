/** USD wallet credit and Stripe settlement money are distinct accounting units. */
export type SettlementInput = { id: string; currency: string; amount: number; fee: number; net: number; exchange_rate: number | null; available_on: number; status: string };
export function reconcileSettlement(balance: SettlementInput, paidUsdCents: number) {
  const safe = (value: number) => Number.isSafeInteger(value);
  if (!safe(paidUsdCents) || paidUsdCents <= 0 || !safe(balance.amount) || balance.amount <= 0 || !safe(balance.fee) || balance.fee < 0 || !safe(balance.net) || balance.net !== balance.amount - balance.fee || !safe(balance.available_on) || !['pending', 'available'].includes(balance.status)) throw Error('Invalid Stripe monetary values');
  if (!['usd', 'brl'].includes(balance.currency)) throw Error('Unsupported settlement currency');
  if (balance.currency === 'usd') {
    if (balance.amount !== paidUsdCents || (balance.exchange_rate !== null && balance.exchange_rate !== 1)) throw Error('USD settlement amount mismatch');
  } else {
    const rate = balance.exchange_rate;
    if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0 || Math.abs(paidUsdCents * rate - balance.amount) > 1) throw Error('BRL settlement exchange rate mismatch');
  }
  // Both USD and BRL use cents. Actual settled gross establishes an integer ratio;
  // flooring prevents fractional-cent overstatement without floating-point division.
  // A negative net is retained in audit data and contributes no spendable capacity.
  const netUsdCents = Number(BigInt(Math.max(0, balance.net)) * BigInt(paidUsdCents) / BigInt(balance.amount));
  return { netUsdCents, settlement: { id: balance.id, currency: balance.currency, grossMinor: balance.amount, feeMinor: balance.fee, netMinor: balance.net, exchangeRate: balance.exchange_rate, availableOn: balance.available_on, status: balance.status } };
}
