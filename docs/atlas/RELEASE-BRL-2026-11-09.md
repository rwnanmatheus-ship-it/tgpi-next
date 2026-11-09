# Atlas wallet settlement and merchant readiness release

Published code: `7b922d7eb92f746e98e29578968539e2b2e07c46`.
Production: `dpl_8fpe7T5PZMuAisqJrWbHyzo7DVMS`, READY, serving https://www.theglobalpolymath.com.
Preview: `dpl_3apnhWhRkawekajNrihzqKn3mGia`, READY.

## Changes delivered

- USD wallet sales can reconcile processor settlement in USD or BRL. Native fees, net, exchange rate and availability evidence are retained; conservative USD equivalents are not represented as available cash or profit.
- Checkout validates the approved merchant account and requires an explicit reviewed tax-policy attestation. Adaptive Pricing is disabled for the disclosed fixed USD sale.
- Founder-only treasury diagnostics query the site's actual Stripe account and webhook configuration, distinguish pending checks from failed/unverified reads, and list required event types. Founder wallet navigation exposes this page without weakening its independent authorization.
- Existing Premium billing, environment isolation, refund/dispute handling and spending guards remain intact.

## Validation

The exact final source passed 447 automated tests with zero failures in its Vercel preview build. TypeScript, changed-code ESLint and the local production build passed. Both preview pages checked returned HTTP 200 without a server-rendering exception.

All 68 production guest HTTP checks passed: 57 page responses, 10 expected authentication rejections and one expected unsigned-webhook rejection. HTML deployment markers identify the production deployment above. Private APIs retain private/no-store cache headers. These checks do not establish authenticated purchase acceptance or two-account database isolation.

A runtime error/fatal log query scoped to the new production deployment returned no matching entries for 19:47:32–19:57:32 UTC on 2026-11-09. This is a point-in-time observation, not an absence-of-errors guarantee.

Evidence: `wallet-brl-deployment-evidence.json`, `wallet-brl-production-smoke.json` and `stripe-sandbox-audit-2026-11-09.json`.

## Remaining activation dependencies

The connection supplied in this session is a Stripe sandbox. The audit found BRL settlement, charges/payouts disabled, pending verification and no webhook endpoints. Production merchant access and the account behind Vercel's secret have not been independently verified. The user explicitly said tax treatment is not yet defined.

Before activation, verify the production merchant, settle tax/service-credit terms, exercise signed payment/refund/dispute events with real authenticated accounts, verify deployed database rules and retention, and document funded provider capacity from actual available business/customer revenue. No tax registration, bank details, payments, funding purchase or transfer was performed.

Atlas generation and wallet purchase flags remain false; provider prepaid capacity remains zero; the USD 0.10 daily cap is unchanged. Sandbox balances cannot fund live AI. The published code does not represent live payment activation or guaranteed profit.
