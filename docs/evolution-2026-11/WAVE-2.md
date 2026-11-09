# TGPI — delivery wave 2, 9 November 2026

## Changes prepared for publication

- Workspace history now journals new source activities in an owner-scoped Firestore queue before changing authoritative Clerk progress. The same transaction archives the previously observed retained events. If preparation fails, the progress API returns a retryable 503 before changing Clerk. If Clerk acknowledges but archive confirmation fails, the receipt survives and the save succeeds. Workspace reads reconcile only receipts backed by matching retained or archived source events. Unconfirmed receipts remain pending and visible as a warning; no mutation is replayed and no event is inferred from a current country/course state.
- Premium now compares up to three saved country-budget scenarios, with owner-scoped pagination and server-validated subscription/founder entitlement. Costs retain currency, duration, missing amounts, contingency, quote date and source notes. Budget differences require matching currency and duration and complete cost fields. JSON export identifies its version, source, baseline, inputs and arithmetic. The existing Free slots and individual reports are unchanged.
- `/premium/demo` is a public interactive demonstration with explicitly fictional examples. It uses no account data, creates no records and labels exported files `illustrative_examples`. Pricing links to the demonstration and describes the actual comparison/export benefit.
- New interface messages cover all six supported locales. This is not completion of the site's entire editorial localization audit.
- `prebuild` runs the entire test suite, with concurrency limited to two, instead of the former selected test groups.

## Verification and acceptance boundary

Automated behavioral checks cover preparation failure, acknowledgement failure/recovery, idempotence, owner isolation, ambiguous receipts, no fabricated history, entitlement boundaries, invalid scenario records, currency/duration mismatch, missing costs, zero costs, JPY arithmetic, export provenance and malformed API responses. Build and deployed browser results are appended after verification.

The first attempted local Playwright run could not start Chromium because its process socket was denied by the executor. No browser assertion from that attempt is counted as passed. Deployed UI verification uses the connected browser instead.

## Persistence limitations and rollback

Clerk remains authoritative for legacy activation. The journal is an additive Firestore collection under `tgpiLearningUsers/{uid}/workspaceHistoryPending`; historical events remain under `workspaceHistory`. No legacy account data is migrated, cleared or rewritten. Successful queue acknowledgement removes only the processed internal receipt, never historical events. No payment or enrollment behavior changes.

This is not a distributed transaction across Clerk and Firestore. Concurrent legacy progress writes can still race. Ambiguous receipts are retained rather than treated as success; reconciliation is bounded to three pages per workspace read. Historical activity lost before this release cannot be reconstructed. Mutations that never produced an activation activity retain their previous behavior. Roll back the code through a revert/deployment; preserve the additive queue and archive for subsequent reconciliation.

## Still requires separate completion

- Atlas live generation: no OpenAI API key or runtime budget configuration was present in inspected Vercel environment metadata. No key was created, billing enabled, or AI request sent.
- Human curriculum/assessment review, complete professional-learning journeys with dedicated roles, full Stripe sandbox lifecycle, and deployed Firestore rules acceptance remain unverified.
- Full multilingual editorial review, all twelve artwork families, screen-reader/browser matrix and field performance measurements remain outside this completed unit.
