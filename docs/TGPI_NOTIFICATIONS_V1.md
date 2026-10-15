# TGPI notification system — implementation and activation

## Release status

Implemented: Clerk-owned persistent inbox; web/mobile unread indicator; read/unread/archive; newest-first cursor pagination; account welcome; signed Clerk account/session webhooks; billing-state notifications; credential issuance; progress reconciliation; contextual next steps; preferences; administrator announcement composer at `/admin/notifications`.

**Not active in production.** Deployment credentials, Firestore rules/index provisioning and Clerk webhook setup were not accessible in this session. Email is **not connected**; no provider API has been scaffolded or falsely reported as sending. The UI explicitly discloses this. This is a reviewable first release, not a claim of a market-leading complete communications platform.

## Architecture

- Identity: current Clerk user only. Firebase client authentication is not used by this inbox.
- Server service account: existing `TGPI_FIREBASE_CLIENT_EMAIL`, `TGPI_FIREBASE_PRIVATE_KEY`, `TGPI_FIREBASE_PROJECT_ID`.
- `tgpiNotificationInbox/{sha256(uid:key)}`: event, owner, creation timestamp, read/archive timestamps.
- `tgpiNotificationUsers/{clerkUid}`: explicit email preferences; optional categories default off.
- `tgpiNotificationEmailOutbox/{sameHash}`: atomic intent only, `awaiting_provider`. Contains UID, category and inbox ID, no recipient address.
- `tgpiNotificationSync/{clerkUid}`: distributed one-minute reconciliation lease.
- Welcome and session events use verified Clerk webhook signatures and deterministic keys. A failed persistent write returns 503 for provider retry.
- Stripe billing is saved by existing logic before best-effort notification publication. The authenticated reconciliation restores the latest state if publication fails. This does not replace Stripe's billing emails or claim every historical transient status can be recovered.
- Progress and onboarding updates schedule reconciliation with Next.js `after`; authenticated focus/periodic sync recovers missed latest state. Reconciliation archives obsolete next-step suggestions.
- The client polls every two minutes while the tab is visible and refreshes on focus. This is periodic synchronization, not WebSocket/push delivery. The indicator counts unread items in the newest fetched page; its accessible label says recent history.
- Notification failures never prevent checkout, onboarding or credential creation from succeeding.

## Activation sequence

1. Merge the collection rules below into the **existing** Firestore rules. Do not replace the project's rules wholesale. Verify that no broad recursive `allow` rule grants access: Firestore grants are additive, so these denies cannot override an existing broad allow.
2. Merge `firestore.notifications.indexes.json` into the project's existing index configuration and deploy the index. Preserve all existing indexes. Wait until the index is ready.
3. Verify anonymous and Firebase-authenticated clients cannot read or write any of the four collections. The server service account is the only data access path. Confirm service account IAM permits reads, queries and transactions.
4. Set `TGPI_NOTIFICATIONS_SECURITY_RULES_CONFIRMED=true` in the intended environment only. Without this flag the feature returns a clear 503, not a fake empty inbox.
5. In Clerk configure `https://www.theglobalpolymath.com/api/webhooks/clerk` (use the actual canonical deployed origin if different), select `user.created` and `session.created`, and set the matching `CLERK_WEBHOOK_SIGNING_SECRET`. Use distinct preview/production endpoints and secrets.
6. Deploy preview, test with two real accounts, then publish after validating the flow. Do not enable email delivery during an unverified deployment.

```text
match /tgpiNotificationInbox/{id} { allow read, write: if false; }
match /tgpiNotificationUsers/{id} { allow read, write: if false; }
match /tgpiNotificationEmailOutbox/{id} { allow read, write: if false; }
match /tgpiNotificationSync/{id} { allow read, write: if false; }
```

## Email follow-up — required before claiming delivery

Vercel integration/environment API access returned 403, and CLI credentials were unavailable. Provision a real messaging integration first using the Marketplace workflow. Then verify a domain sender (SPF/DKIM and the provider's required DNS records), and build against that installed provider's instructions and live environment variables.

The worker still needs to be implemented against the selected provider: transactional lease/claim, exponential retry, stable provider idempotency key, bounded expiry/retry window, dead-letter inspection, and authenticated scheduled execution. Resolve the current verified primary email server-side at send time, recheck current preferences, and honor recipient suppression. Add signed delivery/bounce/complaint webhooks and optional-category unsubscribe. Do not send a historical backlog simply because the integration becomes connected. Expire or explicitly approve old intents. Never equate provider acceptance with delivery to the inbox.

Until these are complete, queued intents remain `awaiting_provider`; there are no outgoing requests to an email provider, no cron claiming to deliver, and no fake sent/delivered state.

## Admin announcements

`/admin/notifications` and its API enforce `privateMetadata.role === "admin"` on the server. The composer validates a real Clerk member ID, internal destination and stable campaign key. Retrying the same campaign/member creates one notification. This release targets one member at a time; audience campaigns, scheduling, rate budgets and delivery analytics are not implemented.

## Validation

- `npm run test:notifications`: preferences, URL safety, idempotent atomic inbox/outbox creation, owner isolation, read/unread and opt-out, billing semantics.
- `npm run typecheck`.
- ESLint on modified TypeScript/TSX files.
- Build and existing prebuild tests; record environment limitations separately.

Live acceptance still required: new registration creates exactly one welcome event; replaying signed webhooks produces no duplicates; account B cannot mutate account A's notifications; progress advances suggestions; signed Stripe test events update billing and inbox; preferences survive sign-out/sign-in; mobile controls work at narrow widths; pagination of more than 50 events is newest-first; failed storage shows retry, never a misleading caught-up state.

## Limits and operations

No browser push, weekly digest, quiet hours, delivery analytics or bulk campaigns yet. Learning and planning notifications are based on recorded TGPI actions, not generative AI. Some progress fields originate in existing metadata; document completion is labeled user-marked, not official immigration approval. The current onboarding metadata retains its existing trust model and is not used to grant permissions.

Before wider rollout, add account-deletion cleanup, retention/TTL policies and an operations dashboard for failed events. Set retention and cleanup according to the actual business policy; do not silently delete existing learning or billing records. Monitor datastore errors, reconciliation failures and provider errors once email exists. The latest-state reconciliation is a recovery path, not a durable log of every source event across outages.


## V2 production launch

When the dedicated Firestore notification gate is not enabled, authenticated account mode derives up to 50 current notifications from Clerk account/progress/billing data and available issued credentials. It saves up to 50 read/archive marks and preferences as compressed private metadata, scoped to the current server-authenticated user. It does not require a webhook. This mode is a current-state inbox, not a complete historical audit log; obsolete suggestions disappear and transient historical billing changes cannot be reconstructed. Concurrent writes across separate devices use Clerk metadata last-write semantics. Dedicated Firestore mode retains transactional event history when provisioned. No security flag is changed by this release. No email dispatch is enabled. Signed login events still require the configured webhook and dedicated storage.

V2 UI: responsive search, category filters, priority counts, contextual next step, preferences, archive. Dates are omitted because derived notifications do not have a trustworthy event occurrence timestamp. Existing learning and billing routes remain compatible.
