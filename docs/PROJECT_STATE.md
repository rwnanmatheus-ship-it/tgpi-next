# TGPI Project State

Last validated: 2026-07-14

## Production

- Repository: `rwnanmatheus-ship-it/tgpi-next`
- Default and production branch: `fix-deploy-hoje`
- Vercel project: `tgpi-next`
- Production deployment: `READY`
- Production commit: `9f1e6dea9a0f8b54912890cc98845625ca9183fb`
- Production deployment date: 2026-05-13
- Domains: `theglobalpolymath.com`, `www.theglobalpolymath.com`, `tgpi-next.vercel.app`
- Recent Vercel runtime errors: none detected in the latest seven-day query

## Build State

The latest production deployment completed successfully with:

- Next.js 16.2.4
- Production compilation successful
- TypeScript successful
- 226 static pages generated
- Stripe route handlers detected

Known warning:

- The `middleware.ts` convention is deprecated in Next.js 16 and should migrate to `proxy.ts` in a later isolated change.

## Subscription Audit

### Existing

- Stripe server SDK and Stripe.js dependencies
- Server-controlled Premium Price ID
- Checkout Session route
- Checkout Session retrieval route
- Verified Stripe webhook signature
- Premium and upgrade pages
- Premium UI gates
- Firestore user plan field

### Critical defects found

1. Checkout creation trusted `uid` and `email` supplied by the browser.
2. The success page wrote `plan: premium` directly to Firestore.
3. The webhook only logged events and did not synchronize subscription state.
4. No Stripe Customer reuse or Customer Portal implementation was found.
5. Premium authorization is primarily client-side and uses inconsistent plan casing.
6. `/premium` and `/upgrade` show conflicting prices and plan structures.
7. No production-ready billing/account state UI was found.
8. No permanent subscription architecture documentation existed.

## Current Fix Branch

- Branch: `fix/secure-premium-activation`
- Purpose: remove client-controlled Premium activation and authenticate Stripe checkout creation.

## Immediate Roadmap

1. Merge the security mitigation after Preview build validation.
2. Add Firebase Admin server integration and a canonical authenticated user helper.
3. Implement idempotent Stripe webhook synchronization into Firestore.
4. Add Stripe Customer reuse and Customer Portal.
5. Define one monthly Premium offer and make `/premium` the canonical commercial page.
6. Add server-side Premium guards and normalize subscription fields.
7. Add billing status UI, cancellation states, and payment-failure handling.
8. Configure and validate Stripe Test Mode, then Live Mode.
9. Publish legal policies and complete a real low-risk production purchase.

## Launch Blockers

- Webhook does not grant or revoke access.
- Firestore is not synchronized from Stripe.
- Customer Portal is absent.
- Server-side Premium authorization is absent.
- Price and offer are not commercially consistent.
- Stripe and Firebase production environment variables have not yet been fully audited through available tooling.
