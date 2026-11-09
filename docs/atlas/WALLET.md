# Atlas prepaid wallet — implementation and release boundaries

## Delivered

- `/atlas/wallet`: authenticated balance, reserved credits, consumption, packs (USD 5/10/25), paginated ledger, refresh/recovery, and fail-closed purchase availability. Wallet interface and financial disclosures in all six platform locales: English, Brazilian Portuguese, Spanish, French, German and Italian.
- `/atlas/wallet/treasury`: founder-ID-only read-only treasury. No banking, withdrawals, transfers or cryptocurrency functionality. Actual payments use the existing TGPI Stripe account.
- `/api/atlas/wallet`, `/checkout`, `/recover`: owner-scoped private/no-store APIs, exact origin validation for writes, strict request schemas. Financial records inherit the existing `tgpiLearningUsers/{document=**}` deny boundary and configured-storage guard.
- Fixed retail charge USD 0.10 per completed reply. Premium/founder entitlements do not mint credits. No automatic top-ups. No user-entered amount, currency, destination account or owner is trusted.
- Fixed model `gpt-4.1-mini-2025-04-14`, default service tier, 1,500 maximum output tokens, existing 16,000-byte history and 12,000-byte instructions bounds. No tools, images, web-search costs or automatic retries. USD 0.02 conservative provider reserve per accepted attempt; approved USD 0.10 daily ceiling retained.
- Provider standard pricing checked at https://developers.openai.com/api/docs/models/gpt-4.1-mini on 2026-11-09: USD 0.40 / million input tokens and USD 1.60 / million output tokens. Bounding 30,000 input tokens plus 1,500 output tokens costs USD 0.0144; reserve leaves framing headroom. Price/model changes require re-costing.
- Atomic Firestore transaction reserves user balance, global provider capacity, daily budget, request identity and conversation lease before provider invocation. Completed conversation replays do not charge again. Failed/interrupted replies refund credits; provider reserve remains consumed conservatively even when usage is unknown. Pending process reservations can be recovered after five minutes without restoring provider capacity.
- Stripe Checkout mode `payment` is independent from the existing Premium subscription. Persisted checkout intent and immutable provider idempotency key prevent duplicate sessions on retry. Credits come exclusively from re-retrieved paid PaymentIntent/Charge data matching server-owned customer and exact amount/currency.
- Duplicate webhook deliveries cannot duplicate credit. Partial/full refunds and disputes revoke credits monotonically. Refund after consumption may create a debt, blocking further use; it is never clamped to zero. Dispute wins require operational review; late events cannot silently restore a reversed payment.
- Treasury records actual USD processor net, reversals, earned consumption revenue and conservative provider reserves separately. Unused customer credits remain liabilities. Dashboard amounts are NOT bank balance, available Stripe cash or distributable profit.

## Activation state and external dependencies

Published code does not imply live commerce activation. `TGPI_ATLAS_ENABLED=false`, `TGPI_ATLAS_WALLET_ENABLED=false`, provider funded cents `0` and USD `0.10` daily cap are intentionally deployed. The newly provisioned API key is a server-only sensitive Vercel secret, never client code or Git.

Before paid activation:

1. Verify actual deployed Firestore deny rules, Atlas TTL/retention and backup policies, then set `TGPI_ATLAS_RETENTION_CONFIRMED=true` only from that evidence.
2. Validate Stripe test-mode checkout, signed payment/refund/dispute events and two-account isolation against real Clerk/Firestore. Current automated financial tests use isolated in-memory storage and provider fixtures; no real customer was charged.
3. Configure the existing Stripe endpoint for `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `payment_intent.succeeded`, `charge.refunded`, `charge.dispute.created`, `charge.dispute.updated`, `charge.dispute.closed`, preserving all existing subscription events. Then set `TGPI_ATLAS_WALLET_WEBHOOKS_CONFIRMED=true`. USD or BRL settlement is supported. BRL uses Stripe-reported conversion evidence, preserves native gross/fees/net and floors the USD-equivalent allocation; other currencies fail closed.
4. Confirm the actual merchant account belongs to TGPI, settlement currency, applicable service-credit sale/refund terms and tax configuration. No new financial account, payout destination or tax policy was created by this release.
5. Fund provider service capacity from available TGPI/customer revenue and document the receipt/reference in `TGPI_ATLAS_FUNDING_REFERENCE`. `TGPI_ATLAS_PROVIDER_PREPAID_CENTS` is the cumulative VERIFIED allocation available to this dedicated Atlas key, not an automatic Stripe/OpenAI transfer. Never increase it from a hypothetical receipt or pending Stripe payout. Account for provider-credit expiry and any consumption outside Atlas before recording capacity. The code also limits provider reserves against collected net less reversals.
6. Enable the desired Clerk IDs (`TGPI_ATLAS_ALLOWED_USER_IDS`, explicit `*` only after public rollout validation), generation and wallet flags. Capacity and credits are still rechecked transactionally for every call.

No live AI requests, card charges, credit purchases, tax registrations or transfers were performed. Automatic provider-funding/payout integration and automatic winning-dispute restoration are not implemented. The service cannot promise zero business risk: chargebacks, tax, infrastructure and settlement timing remain operating responsibilities. A purchase is blocked while funding/configuration is unverified rather than selling unusable credits.

## Prior unpublished work audit

Review branch started at `560a66f`, production at `82e4136`. Their only pending changes were production validation documentation/evidence. Existing workspace-history and Premium comparison functionality was already live. The older checkout's uncommitted `WorkspacePersonalSpace.tsx` localization changes are already superseded by the current production component (localized dates/search/actions plus additional translations); copying the older file would regress behavior, so it was preserved untouched.

## Verification

436 automated tests passed in the final local production build (including 16 wallet tests). TypeScript, changed-file ESLint and whitespace checks passed. The local webpack build completed; its existing viem/ox dynamic dependency warning is unrelated to this change. A final chat price disclosure passed ESLint and is included in the deployed Vercel build. Deployment evidence is recorded separately. Coverage includes concurrent last-credit consumption, absent funding, atomic conversation+wallet reservation, duplicate settlements/payments, interrupted/stale reservation recovery, owner/amount/currency mismatch, refunds before/after credit, disputes and checkout retry identity. Production-authenticated financial end-to-end validation remains an activation dependency.

Production release: `0a10294310a73f4d5efd64c87ab1b6bef0a0c230`, deployment `dpl_8Tox2iNbHXvkd3yfDM2uR9fzWfxx` READY. The primary domain HTML identifies this exact deployment. 68 production guest HTTP checks passed: 57 page responses, 10 expected authentication rejections and one expected unsigned-webhook rejection. Browser access to the wallet required sign-in. This is not an authenticated purchase or wallet UI acceptance test. Stripe connection has been offered and remains pending.

## Validation follow-up — environment isolation

Financial records now use a server-selected live/test namespace determined solely by `VERCEL_ENV`. Only `production` selects live records; previews, development and missing environment values select test records. Owner IDs, ledger, pending reservations, checkout locks, customer IDs, commerce intents/payments and treasury are separated. All remain under the existing recursive server-only Firestore boundary.

Stripe key prefixes, retrieved customer, checkout session, PaymentIntent and Charge modes are validated. A mismatched mode fails closed. Atlas wallet customers are independent of Premium billing, preventing sandbox setup from changing a production subscription customer. Test credits can never fund a paid OpenAI call, even if someone enables generation flags in preview. No production financial data was migrated or manually credited.

Additional regression tests cover namespace isolation, opposite-mode payment rejection, wrong key mode before checkout side effects, invalid monetary data and six-language financial-copy coverage. Stripe and authenticated Firestore integration acceptance still require connected administrative access. No live charges or API funding were authorized or performed by these changes.

## Connected sandbox audit and Brazilian settlement

The Stripe connection available for this session is sandbox account `acct_1TsyHc5XJqIpnEvu` (Brazil, default settlement currency BRL). Its account response reported payments/payouts disabled, no capabilities, details not submitted and pending verification; no webhook endpoints were listed. These findings describe ONLY that sandbox. The production account and the account behind the site's existing Stripe secret were not assumed to be the same. The user confirmed that tax treatment has not yet been defined with accounting. No tax setting, business identity, registration, bank account, payment or transfer was changed.

The wallet now reconciles USD sales settled in USD or BRL using the processor's BalanceTransaction. Authoritative native settlement amount, fees, net, exchange rate, availability date and pending/available status are retained in the payment audit record. USD-equivalent net is an integer ratio rounded down; no spot quote, guessed conversion or invented available cash is used. Negative settlement net contributes zero provider capacity and remains visible in the native audit record. Refunds still revoke the correct USD customer credits. Missing/inconsistent exchange evidence and unsupported currencies fail closed. Checkout explicitly disables Adaptive Pricing to preserve its disclosed fixed USD charge; merchant settlement conversion remains supported.

Reference: https://docs.stripe.com/api/balance_transactions/object (amount, fee, net, exchange_rate and available_on), checked 2026-11-09.

New activation requirements: `TGPI_ATLAS_STRIPE_ACCOUNT_ID` must identify the independently verified merchant account and `TGPI_ATLAS_TAX_POLICY_CONFIRMED=true` must follow an actual reviewed tax/service-credit policy. These were NOT set. Stripe account identity, supported settlement currency and live charges capability are checked before creating a wallet checkout. This flag does not implement Stripe Tax or replace tax configuration; enabling automatic taxes will require extending exact payment amount validation to separate tax from purchased credit.

The founder-only treasury page now reads the site's configured Stripe account and webhook metadata, displays precise missing/unverified checks and required wallet events. A failed API read is shown as unverified, never as successful validation. Account/customer personal fields, credentials and provider exception details are not exposed. The wallet includes a founder-only navigation link to this diagnostic. Neither connecting the ChatGPT plugin nor a green endpoint-configuration check confirms event delivery or activates charging.
