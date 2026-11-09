import { PROVIDER_RESERVE_MICRO_USD } from './policy';
import 'server-only';
import { getStripeServer } from '@/lib/stripe';
import { WALLET_MODE, assertStripeKeyMode, assertStripeMerchant } from './environment.server';
import { fundedLimitMicroUsd, walletCheckoutConfigured } from './store.server';
export const WALLET_WEBHOOK_EVENTS = ['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'payment_intent.succeeded', 'charge.refunded', 'charge.dispute.created', 'charge.dispute.updated', 'charge.dispute.closed'] as const;
type Check = { label: string; state: 'met' | 'pending' | 'unverified' };
/** Founder-only caller; this diagnostic never mutates Stripe, grants credits or enables flags. */
export async function walletReadiness() {
  const checks: Check[] = [];
  const add = (label: string, met: boolean) => checks.push({ label, state: met ? 'met' : 'pending' });
  add('Tributação e condições comerciais revisadas', process.env.TGPI_ATLAS_TAX_POLICY_CONFIRMED === 'true');
  add('Retenção e segurança do Atlas confirmadas', process.env.TGPI_ATLAS_RETENTION_CONFIRMED === 'true');
  add('Financiamento documentado da API', fundedLimitMicroUsd() >= PROVIDER_RESERVE_MICRO_USD);
  add('Entrega assinada dos eventos validada', process.env.TGPI_ATLAS_WALLET_WEBHOOKS_CONFIRMED === 'true');
  add('Configuração comercial habilitada', walletCheckoutConfigured());
  let accountSummary: { id: string; country: string | null; currency: string | null; chargesEnabled: boolean; payoutsEnabled: boolean } | null = null;
  let keyValid = false;
  try { assertStripeKeyMode(); keyValid = true; } catch { /* Fail closed without disclosing credentials. */ }
  add('Chave Stripe no ambiente correto', keyValid);
  if (keyValid) {
    const stripe = getStripeServer();
    const results = await Promise.allSettled([
      stripe.accounts.retrieve(null, {}, { timeout: 10_000, maxNetworkRetries: 0 }),
      stripe.webhookEndpoints.list({ limit: 100 }, { timeout: 10_000, maxNetworkRetries: 0 }),
    ]);
    if (results[0].status === 'fulfilled') {
      const account = results[0].value;
      accountSummary = { id: account.id, country: account.country || null, currency: account.default_currency || null, chargesEnabled: account.charges_enabled, payoutsEnabled: account.payouts_enabled };
      let verified = false; try { assertStripeMerchant(account); verified = true; } catch { /* Await verified merchant binding. */ }
      add('Conta recebedora corresponde à conta aprovada', verified);
      add('Conta Stripe habilitada para pagamentos', account.charges_enabled);
    } else checks.push({ label: 'Consulta à conta Stripe', state: 'unverified' });
    if (results[1].status === 'fulfilled') {
      const expectedUrl = process.env.TGPI_ATLAS_WEBHOOK_URL || (WALLET_MODE === 'live' ? 'https://www.theglobalpolymath.com/api/stripe/webhook' : '');
      const page = results[1].value;
      const match = page.data.some(endpoint => endpoint.url === expectedUrl && endpoint.status === 'enabled' && endpoint.livemode === (WALLET_MODE === 'live') && WALLET_WEBHOOK_EVENTS.every(event => endpoint.enabled_events.includes('*') || endpoint.enabled_events.includes(event)));
      checks.push({ label: 'Endpoint e eventos da carteira cadastrados', state: match ? 'met' : page.has_more ? 'unverified' : 'pending' });
    } else checks.push({ label: 'Consulta aos webhooks Stripe', state: 'unverified' });
  }
  return { mode: WALLET_MODE, account: accountSummary, checks, requiredEvents: WALLET_WEBHOOK_EVENTS };
}
