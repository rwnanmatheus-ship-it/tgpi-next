# Sponsored Atlas access

`TGPI_ATLAS_ACCESS_MODE=sponsored` enables temporary, authenticated AI conversations funded by a verified provider grant. It never credits or debits a member wallet. Checkout is disabled while this mode is active.

## Production configuration

- `TGPI_ATLAS_ENABLED=true`
- `TGPI_ATLAS_ALLOWED_USER_IDS`: explicit Clerk IDs, `@founder` for the existing server-side founder list, or `*` for authenticated members.
- `TGPI_ATLAS_ACCESS_MODE=sponsored`
- `TGPI_ATLAS_SPONSORED_GRANT`: unique stable identifier for one verified grant; never change it to reset consumption.
- `TGPI_ATLAS_SPONSORED_CENTS`: conservative total allocation in USD cents, below the verified available balance.
- `TGPI_ATLAS_SPONSORED_EXPIRES_AT`: ISO timestamp no later than provider expiry.
- `TGPI_ATLAS_SPONSORED_POLICY_CONFIRMED=true`: confirm the storage and privacy contract below before deployment.
- `TGPI_ATLAS_DAILY_BUDGET_USD`: shared daily reservation ceiling.
- Existing server-only `OPENAI_API_KEY`, Firestore credentials/rules confirmation and exact `TGPI_ATLAS_MODEL=gpt-4.1-mini-2025-04-14` remain required.

Only production is accepted. Missing, malformed or expired configuration fails closed. Provider grants are not renewed automatically by this code; verify each new allowance before configuring it. Provider-level balances can also be consumed by other applications and are not inferred from this ledger.

## Accounting and storage

An atomic Firestore transaction reserves USD 0.02 before each provider call. Bounds of 16 KB history, 12 KB instructions and 1,500 output tokens keep the existing pinned model below this conservative reservation. Failed/interrupted attempts keep their reservation and count toward the daily limit. Requests are limited to ten per account per UTC day and a four-second cooldown. There are no automatic provider retries or paid tool calls.

Metadata is confined to two protected document paths:

- `tgpiLearningUsers/{authenticatedUserId}/atlasSponsored/current`: latest UTC day, count, last request timestamp and accepted request UUIDs.
- `tgpiLearningUsers/_atlasSponsored/atlasBudget/current`: shared current-day reservation and cumulative totals keyed by grant identifier.

Member metadata is overwritten when a new UTC day is used; each document has at most ten request IDs. Grant totals persist to prevent accidental reuse of an older allowance. After 120 grant entries, activation fails closed pending maintenance. Browser clients must have no read/write access to the `tgpiLearningUsers` namespace; only the authenticated server uses these documents.

Questions, answers, selected profile fields and drafts are not stored by this path. Conversation text remains in page memory and is lost on reload or close. OpenAI receives the bounded conversation and only explicitly selected profile fields with `store:false`; provider retention is separate from TGPI storage. Legacy saved conversations and paid accounting retain their existing gates and behavior outside sponsored mode.

## Validation and rollout

Run `npm run build` (which includes the complete test suite). Sponsored tests cover expiry and environment gates, concurrent duplicate requests, account isolation, cooldown and daily ceilings, cumulative grant ceilings across day/grant changes, metadata-only writes and streaming without wallet/history writes. Localization tests render the paid preview and free mode in all six supported locales.

Deploy initially with `@founder`, verify a completed reply through the production UI, then allow authenticated members with `*`. Verify both `/atlas` and the global widget. Keep wallet checkout disabled. Roll back by setting `TGPI_ATLAS_ENABLED=false` and redeploying; never remove consumption documents to reset limits.
