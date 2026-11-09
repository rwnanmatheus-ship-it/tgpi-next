# TGPI — delivery wave 2, 9 November 2026

## Published changes

- Workspace history now journals new source activities in an owner-scoped Firestore queue before changing authoritative Clerk progress. The same transaction archives the previously observed retained events. If preparation fails, the progress API returns a retryable 503 before changing Clerk. If Clerk acknowledges but archive confirmation fails, the receipt survives and the save succeeds. Workspace reads reconcile only receipts backed by matching retained or archived source events. Unconfirmed receipts remain pending and visible as a warning; no mutation is replayed and no event is inferred from a current country/course state.
- Premium now compares up to three saved country-budget scenarios, with owner-scoped pagination and server-validated subscription/founder entitlement. Costs retain currency, duration, missing amounts, contingency, quote date and source notes. Budget differences require matching currency and duration and complete cost fields. JSON export identifies its version, source, baseline, inputs and arithmetic. The existing Free slots and individual reports are unchanged.
- `/premium/demo` is a public interactive demonstration with explicitly fictional examples. It uses no account data, creates no records and labels exported files `illustrative_examples`. Pricing links to the demonstration and describes the actual comparison/export benefit.
- New interface messages cover all six supported locales. This is not completion of the site's entire editorial localization audit.
- `prebuild` runs the entire test suite, with concurrency limited to two, instead of the former selected test groups.

## Verification and acceptance boundary

Automated behavioral checks cover preparation failure, acknowledgement failure/recovery, idempotence, owner isolation, ambiguous receipts, no fabricated history, entitlement boundaries, invalid scenario records, currency/duration mismatch, missing costs, zero costs, JPY arithmetic, export provenance and malformed API responses. 420 tests passed, TypeScript and changed-file ESLint passed. Local webpack build passed; final Vercel Turbopack preview and production builds are READY.

The first attempted local Playwright run could not start Chromium because its process socket was denied by the executor. No browser assertion from that attempt is counted as passed. Deployed preview UI checks confirmed seven widths (320–1920 px) without horizontal overflow, six translated headings, the three-selection limit and currency/duration/missing-cost warnings. Production download completed in the cloud browser and its JSON was parsed: source illustrative_examples, version 1, two scenarios, signed difference 1320. This does not constitute live billing or private scenario storage E2E.

## Persistence limitations and rollback

Clerk remains authoritative for legacy activation. The journal is an additive Firestore collection under `tgpiLearningUsers/{uid}/workspaceHistoryPending`; historical events remain under `workspaceHistory`. No legacy account data is migrated, cleared or rewritten. Successful queue acknowledgement removes only the processed internal receipt, never historical events. No payment or enrollment behavior changes.

This is not a distributed transaction across Clerk and Firestore. Concurrent legacy progress writes can still race. Ambiguous receipts are retained rather than treated as success; reconciliation is bounded to three pages per workspace read. Historical activity lost before this release cannot be reconstructed. Mutations that never produced an activation activity retain their previous behavior. Roll back the code through a revert/deployment; preserve the additive queue and archive for subsequent reconciliation.

## Still requires separate completion

- Atlas live generation: no OpenAI API key or runtime budget configuration was present in inspected Vercel environment metadata. No key was created, billing enabled, or AI request sent.
- Human curriculum/assessment review, complete professional-learning journeys with dedicated roles, full Stripe sandbox lifecycle, and deployed Firestore rules acceptance remain unverified.
- Full multilingual editorial review, all twelve artwork families, screen-reader/browser matrix and field performance measurements remain outside this completed unit.

## Production record

- Commit: `82e4136e648052c6ff891d68eaf0fffdc8b043f4`.
- Preview: `dpl_D5EHk2c9AqUrKE7xYhfHYYHXuQdB` (READY).
- Production: `dpl_CQzKqDiVRqh4GwEcPp5nowtqh5L1` (READY), built in approximately 62 seconds.
- Verified public URL: https://www.theglobalpolymath.com/premium/demo
- Aliases include the apex domain and www.theglobalpolymath.com.
- Error-log query: no matching error logs for this deployment, 18:19:35–18:29:35 UTC on 9 November 2026. This is a point-in-time observation, not continuous monitoring.
- Evidence: `evidence/wave-2-browser.json`, `evidence/production-wave-2-smoke.json`, `evidence/premium-published.png`.
- New private pages were not retested with an authenticated production member in this wave. Authorization and owner isolation passed isolated API/service tests; production provider-outage injection was not performed.

Guest production smoke: 61 requests completed, 55 page responses HTTP 200 (including followed protected-page flows) and six private API responses HTTP 401 with private/no-store caching; no HTTP 5xx or rendered application exception. The public demo contained the new heading. See the evidence JSON for exact routes and timestamps.
