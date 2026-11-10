# TGPI connected notifications — Web Push release

Implemented on 2026-11-09 (America/Sao_Paulo).

## Behavior

- `/notifications`: responsive, six-language inbox, search/category/priority/archive filters, local timestamps, read state, device controls and notification preferences.
- Clerk-authenticated server events: onboarding, learning progress and issued credentials, Stripe membership state, community replies/mentions/participation, saved country/comparison research changes, optional study reminders after inactivity.
- Every new production Git revision creates one idempotent platform-version event for registered accounts. It does not claim particular features have changed.
- Country monitoring compares TGPI's published profile data against the saved snapshot. It does not monitor live immigration rules, prices, external searches or news. Users follow countries by saving countries/comparisons in the existing planning workflow.
- Existing compressed account inbox marks, preferences and first-observed dates are imported. Existing read/archive marks are preserved. History is seeded before enabling push; no historical alert blast is sent.
- New native push only after explicit permission and account opt-in. Supports multiple devices, browser capability detection, iPhone/iPad Home Screen instructions, disconnect and real provider test.
- Push defaults to private generic lock-screen text; previews are opt-in. Category preferences, daily cap (3/8/20), one-hour pause and timezone-aware quiet hours are rechecked server-side.
- The inbox remains available when push is disabled, unsupported or blocked. Email delivery is not enabled by this release. New-session security notices still require the existing Clerk signed webhook integration; they are not claimed as active without it.

## Storage and delivery

Uses the existing recursively protected `tgpiLearningUsers/_notifications` subtree. This does **not** enable or weaken the legacy `tgpiNotification*` rules. Anonymous REST reads returned `403 PERMISSION_DENIED` for both the protected root and nested notification path; the deployment's established learning security gate remains required.

`users/{uid}` holds preferences and the reconciliation registry. Per-user `inbox`, `automation`, `limits`, and `emailIntents` subcollections use owner-scoped server routes. Global `devices` stores an encrypted browser subscription and account ownership; `pushJobs` stores delivery state. Single-field range queries and per-user collections avoid adding composite indexes.

Inbox insertion and push intent are atomic. Delivery workers claim a three-minute transaction lease, recheck account existence/preferences/read state/device ownership, and remember provider acceptance per device. Transient failures back off up to six attempts; 404/410 subscriptions are removed; events expire after 48 hours. TTL at the browser provider is 24 hours. A crash after provider acceptance but before storing its receipt can cause a repeated request; a stable topic/tag coalesces it. This is at-least-once processing, not a claim of exactly-once display.

`/api/cron/notifications` runs every minute in production with the existing `CRON_SECRET`. It dispatches up to 25 jobs and reconciles up to 20 eligible registered accounts per tick. Accounts become eligible every five minutes. Capacity and backlog affect latency; no instant-delivery SLA is claimed. A manual test sends immediately and is limited to once per minute per account.

The foreground inbox refreshes while visible, on focus, and when the service worker receives a push. App badges count the recent loaded page; they are not a total-history counter. Clicking a push opens a validated same-origin destination. Sign-out/account switching unsubscribes the local endpoint. Verified account deletion removes notification data in bounded, resumable batches; missing accounts discovered during reconciliation are also cleaned up.

## Configuration

- `TGPI_PUSH_VAPID_PUBLIC_KEY`: public, production.
- `TGPI_PUSH_VAPID_PRIVATE_KEY`: sensitive, production; also derives the at-rest subscription encryption key. Preserve this key while devices are subscribed. A deliberate rotation requires users to reconnect devices.
- Existing Firebase service account, `TGPI_LEARNING_SECURITY_RULES_CONFIRMED`, and `CRON_SECRET`.
- Uses the existing `/sw.js` and PWA manifest. No private API response is cached.
- Standard encrypted Web Push via `web-push`; no new paid messaging subscription or generative AI call is introduced. Vercel/Firestore infrastructure usage still applies.

## Validation

`npm run test:notifications`, `npm run test:all`, `npm run typecheck`, targeted ESLint and `npm run build`.

Behavior tests cover endpoint validation/SSRF prevention, preference validation, timezone/DST quiet periods, encrypted device storage, owner isolation and endpoint reassignment, concurrent dispatch claims, suppression after reading/archiving/opt-out, bounded retry and 410 cleanup, daily cap, background opt-out preservation, six languages and safe service-worker click destinations.

Provider acceptance is not proof of screen display. Browser/OS permission, installation on iOS, network connectivity, Focus/battery controls and provider policy affect delivery. Verify a real desktop test and a physical iPhone/Android background test before promising universal delivery.

## Research references

- Slack: https://slack.com/help/articles/201355156-Configure-Your-Slack-notifications
- Notion: https://www.notion.com/help/updates-and-notifications
- WebKit: https://webkit.org/blog/13878/
- MDN Push API: https://developer.mozilla.org/en-US/docs/Web/API/Push_API
- Web Push library: https://github.com/web-push-libs/web-push
