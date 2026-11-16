# TGPI Launch Roadmap

## Current launch decision

TGPI should launch first as a public free beta for country intelligence, comparison, account creation, onboarding and early access. Paid billing must remain disabled until authorization, Stripe synchronization and subscription lifecycle handling are complete.

## Phase 0 — Repository foundation

- Confirm the production commit and tag the current baseline.
- Create a stable `main` branch from the production baseline.
- Protect `main` and require pull requests.
- Require lint, typecheck and build checks.
- Review and close obsolete branches and pull requests.
- Keep `BILLING_ENABLED=false`.

## Phase 1 — Security boundary

- Disable or server-protect `/admin`.
- Add server-side `requireUser`, `requireAdmin` and `requirePremium` helpers.
- Prevent client writes to role, plan, subscription status, XP and certificates.
- Protect Stripe session retrieval by authenticated ownership.
- Version Firestore and Storage rules.
- Add security headers and a Content Security Policy.

## Phase 2 — Canonical data model

- Standardize on `plan: "free" | "premium"`.
- Remove the competing `membershipPlan` representation.
- Separate user profile, public profile, subscription, progress and credentials.
- Standardize timestamps.
- Add `schemaVersion` and a migration strategy.
- Document every Firestore collection and write authority.

## Phase 3 — Shared product foundation

- Create route groups for marketing, auth, member, verification and admin.
- Create canonical public and member layouts.
- Consolidate design tokens and shared UI components.
- Standardize loading, empty, error and success states.
- Add a complete footer and legal navigation.

## Phase 4 — Public funnel

Work in this order:

1. Homepage
2. Countries explorer
3. Country details
4. Comparison
5. Courses catalogue
6. Pricing
7. Premium waitlist
8. About, Why and Resources

Every public metric must have a source, update date, methodology or explicit illustrative label.

## Phase 5 — Account journey

- Separate login, registration, password reset and email verification.
- Persist onboarding.
- Make `/dashboard` the member home.
- Keep `/profile` for profile display and editing.
- Add account, privacy and billing settings.
- Add account export and deletion workflows.

## Phase 6 — Country decision product

- Add source metadata to country metrics.
- Add city-level geography where needed.
- Introduce Basic, Reviewed and Verified-source country profiles.
- Remove strong rankings and verdicts from unverified data.
- Add saved countries, saved comparisons and country plans.

## Phase 7 — Learning and credentials

- Link course cards to real course IDs.
- Move lesson completion and XP calculation to the server.
- Persist progress and reload it correctly.
- Issue credentials server-side only.
- Add immutable credential IDs, issuance date, status and revocation.
- Publish only approved public credential fields.

## Phase 8 — Billing

Billing may be enabled only after:

- idempotent Stripe webhook synchronization;
- subscription activation, update and revocation;
- failed-payment handling;
- Billing Portal creation;
- secure Premium entitlement checks;
- cancellation tests;
- end-to-end Stripe test-mode validation;
- commercial terms and refund policy.

## Phase 9 — Quality and launch

- Add unit, integration, Firestore Rules and Playwright tests.
- Add GitHub Actions checks.
- Test mobile, desktop and supported browsers.
- Complete accessibility review.
- Add sitemap, robots, canonical metadata and structured data.
- Add monitoring, analytics, backup and rollback procedures.

## Public beta launch gate

TGPI may launch publicly when:

- the repository has one stable release branch;
- Admin is protected;
- users cannot grant themselves Premium or XP;
- private user data cannot be listed;
- onboarding persists;
- dashboard and country comparison work;
- unverified country data is clearly qualified;
- critical pages work on mobile;
- legal pages exist;
- errors and loading states are handled;
- billing remains disabled.

## Paid launch gate

Paid launch additionally requires:

- complete Stripe lifecycle synchronization;
- secure server-side Premium authorization;
- customer billing management;
- payment failure handling;
- server-issued credentials;
- tested Firestore rules;
- completed end-to-end checkout and cancellation tests.
