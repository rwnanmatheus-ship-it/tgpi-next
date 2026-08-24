# TGPI Premium Access V1

## Objective

Turn TGPI Premium into a secure recurring subscription flow:

`Pricing → Stripe Checkout → verified webhook → Clerk entitlement → Premium access → Customer Portal`

The success page never grants access. It only reports the status written by a
verified Stripe webhook.

The approved launch price displayed by TGPI is **US$ 19.99/month**. The Stripe
Price configured through `STRIPE_PRICE_ID_PREMIUM` must use USD 19.99 with a
monthly recurring interval before billing is enabled.

## Source of truth

Premium authorization is stored in the authenticated user's Clerk
`privateMetadata` under `tgpiBilling`. It is never accepted from browser state,
query parameters, Firestore profile fields or the Checkout success redirect.

The record contains:

- normalized plan and subscription status;
- Stripe customer, subscription and price references;
- renewal/cancellation information;
- the latest processed Stripe event for idempotency and ordering.

## Authorization boundary

`/premium` is the canonical server-protected Premium surface and calls
`requirePremium()` before rendering. `PremiumGate` remains a presentation-only
component; it must never be used as the authorization boundary for sensitive
Premium routes or data.

## Premium Preview Mode

While Stripe onboarding is unavailable, founder and test accounts can receive
temporary Premium access without creating a payment or subscription.

Set `TGPI_PREMIUM_PREVIEW_USER_IDS` only in the Vercel Preview environment. Its
value is a comma-separated list of Clerk User IDs. Access is granted only when
all three conditions are true:

1. `VERCEL_ENV` is exactly `preview`;
2. the current request hostname ends in `.vercel.app`;
3. the authenticated Clerk User ID is in the allowlist.

The rule is evaluated on the server for every request. It does not write plan
or billing metadata to Clerk and it is rejected on the official TGPI domain.

## Founder Access

`TGPI_FOUNDER_USER_IDS` grants controlled Premium access to approved founder
accounts before Stripe is activated. `TGPI_FOUNDER_EMAILS` is an optional
fallback for Clerk instances that assign different User IDs to the same person.
Both variables are server-only, comma-separated allowlists and must be
configured only in Vercel Production.

Founder Access is granted only when all three conditions are true:

1. `VERCEL_ENV` is exactly `production`;
2. the current request hostname is exactly `theglobalpolymath.com` or
   `www.theglobalpolymath.com`;
3. the authenticated Clerk User ID is in the ID allowlist, or the user's
   verified primary email is in the email allowlist.

The permission is evaluated on every request, does not alter Clerk billing
metadata and does not create a Stripe customer or subscription. Removing the
matching ID and email from the Production variables and redeploying revokes the
permission.

## Required Vercel variables

| Variable | Preview | Production |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Stripe test key | Stripe live key |
| `STRIPE_WEBHOOK_SECRET` | Preview/test endpoint secret | Production endpoint secret |
| `STRIPE_PRICE_ID_PREMIUM` | Test recurring Price ID | Live recurring Price ID |
| `BILLING_ENABLED` | `true` only during controlled testing | `true` only after launch approval |
| `NEXT_PUBLIC_APP_URL` | Preview URL | `https://www.theglobalpolymath.com` |
| `TGPI_PREMIUM_PREVIEW_USER_IDS` | Founder/test Clerk IDs | Never configure |
| `TGPI_FOUNDER_USER_IDS` | Never configure | Approved founder Clerk IDs |
| `TGPI_FOUNDER_EMAILS` | Never configure | Approved verified founder emails |

Never reuse test values in Production or live values in Preview.

## Stripe webhook endpoint

Register this endpoint separately in Stripe test mode and live mode:

`https://<environment-domain>/api/stripe/webhook`

Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `customer.subscription.paused`
- `customer.subscription.resumed`

## Customer Portal

Enable the Stripe Customer Portal and allow customers to:

- update payment methods;
- view invoices;
- cancel the TGPI Premium subscription.

The TGPI API creates short-lived portal sessions only for the authenticated
user's server-side Stripe customer reference.

## Controlled acceptance test

1. Keep Production billing disabled.
2. Configure only Stripe test values in Preview.
3. Set Preview `BILLING_ENABLED=true`.
4. Sign in with a Clerk test account.
5. Start Checkout from `/pricing` and use a Stripe test card.
6. Confirm `/upgrade-success` waits for the verified webhook.
7. Confirm `/api/billing/status` reports `premium` and `active` or `trialing`.
8. Sign out and sign in again; Premium must remain active.
9. Open the Customer Portal and schedule cancellation.
10. Confirm the webhook updates `cancelAtPeriodEnd`.
11. End the test subscription and confirm Premium is revoked.
12. Attempt Checkout again and confirm no duplicate active subscription is
    created.

## Release gate

Do not enable Production billing until all acceptance checks pass and the
displayed price matches the live Stripe Price exactly.
