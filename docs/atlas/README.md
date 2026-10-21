# TGPI Atlas AI — first functional core

Status: interface-only production release authorized on 2026-10-21. AI generation remains disabled pending live validation. The page shows a preview notice, disables sending, and skips initial history loading when server generation gates are not satisfied. **Not validated end to end against live services.**

## Diagnosis and decisions

- Reused Next.js 16.3.4 App Router, Clerk session authorization, the existing Firestore REST transaction adapter and the shared Super App registry. No parallel account, profile, billing or subscription system.
- `/atlas` is protected by the existing route layout. Every API independently validates the Clerk session. Mutation requests require the exact same origin.
- Official OpenAI SDK 7.39.0, Responses API, model `gpt-6-astra`, low reasoning effort, streaming, `store: false`, no automatic retries, 1,500 output-token limit and an 80-second generation deadline.
- Model discovery succeeded for the provisioned account on 2026-10-20. A real Responses request returned HTTP 429 / `credit_balance_exhausted`. This confirms neither inference quality nor successful generation. No alternate model was substituted.
- Official sources checked: https://developers.openai.com/api/docs/models/gpt-6-astra and https://developers.openai.com/api/docs/guides/streaming-responses .
- Profile data is user-declared. Existing budget ranges have no explicit currency or period. Atlas receives those units as unconfirmed, never inferred from preferred currency.

## Implemented

- Dedicated responsive chat, new conversations, paginated private history, title search over loaded pages, rename, explicit deletion confirmation, copy and persistent thumbs feedback.
- Real provider transport, visible-text streaming only, stop, recoverable errors, last-turn idempotent retry, stable request IDs and atomic conversation leases.
- Optional categories of profile context, selected by the user. Server retrieves only their own Clerk user, then allowlists fields. No email, legal identity, birth date, gender, contact data, credentials, `privateMetadata` or administrative material reaches the model.
- Temporary conversations do not persist message text in TGPI. Usage metadata remains for limits. Normal drafts use tab-scoped session storage under an account-specific key; temporary drafts stay in component memory.
- Safe Markdown and tables; HTML and remote images disabled. Only validated internal links are rendered. No external-source verification is claimed.
- Basic institutional knowledge from existing module names and links. No invented product, billing, refund or support policy.
- Optimized original owl mascot in `public/brand/atlas/avatar.webp` and `welcome.webp`. Built-in image generation used; prompt: sophisticated welcoming technological explorer owl, navy enamel, brushed gold, ivory accents, amber eyes, orbital armillary detail, isolated transparency, no lettering or replacement of the TGPI crest. One master image provides responsive size variants; separate emotional poses are not yet delivered.
- Access through the existing Apps launcher and mobile app search. Existing module order and journey transitions preserved.

## Server configuration

No secrets belong in Git or client bundles. The provisioned OpenAI credential is in the separately approved local env destination; it has **not** been copied to Vercel or committed.

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Server-only OpenAI project key, securely provisioned |
| `TGPI_ATLAS_MODEL=gpt-6-astra` | Confirmed model ID; alternative models fail closed until their cost reservation is reviewed |
| `TGPI_ATLAS_ENABLED=true` | Explicit private-preview enablement; absent means disabled |
| `TGPI_ATLAS_ALLOWED_USER_IDS` | Comma-separated Clerk IDs of approved test accounts; empty grants nobody access |
| `TGPI_ATLAS_DAILY_BUDGET_USD` | Required global daily ceiling, 0.50–1,000 USD; suggested validation ceiling is 5 USD, **not applied** |
| `TGPI_ATLAS_RETENTION_CONFIRMED=true` | Set only after TTL, backup retention and privacy disclosures are reviewed |
| Existing `TGPI_FIREBASE_*`, `TGPI_LEARNING_SECURITY_RULES_CONFIRMED` and Clerk variables | Reused, not replaced |

Before enabling: add OpenAI API credits, verify the full deployed Firestore rules deny browser access under `tgpiLearningUsers/{document=**}`, enable Firestore TTL on `expiresAt` for collection groups `atlasConversations` and `atlasUsage`, verify backup retention, and use disposable Clerk test accounts. A matching broad allow rule can override a deny; review the complete deployed ruleset. No rules or TTL policies were deployed by this change.

## Data and retention

| Path | Data | Lifetime |
| --- | --- | --- |
| `tgpiLearningUsers/{sessionUserId}/atlasConversations/{uuid}` | Title and at most 40 messages; single document allows complete active-record deletion | Inaccessible after 30 days from creation; timestamp TTL removes record asynchronously |
| `tgpiLearningUsers/{sessionUserId}/atlasUsage/{UTC day}` | Request IDs, count, reservation and last request time; no content | 2-day timestamp TTL |
| `tgpiLearningUsers/_atlasBudget/atlasUsage/{UTC day}` | Shared count and conservative spend reservation; no user content | 2-day timestamp TTL |

Owner IDs never come from the body or model. Expired documents are inaccessible even if TTL cleanup has not completed. A deleted conversation is never recreated by a late completion. The per-conversation lease and daily counters are updated in the same Firestore transaction. Temporary requests retain only usage metadata and are deduplicated within the UTC-day ledger. There is no persistent cross-conversation preference memory in this increment.

`store: false` is not a claim of zero OpenAI retention. Provider abuse-monitoring, contractual retention, backups and asynchronous cleanup require operational review. No full prompts, replies, raw errors, identities or credentials are logged; telemetry contains status, latency, token counts and calculated token cost only.

## Limits and estimated costs

- Private validation only: 10 accepted attempts per account per UTC day, at least 4 seconds apart. Failed/cancelled attempts conservatively consume a slot and reservation. No subscription benefit or price changed.
- Each attempt atomically reserves **0.50 USD** against the configured global daily ceiling. No refund on incomplete usage data; this deliberately fails conservatively. The cap applies only to this Atlas code path, not other API clients, provider charges, taxes or database hosting.
- Provider input: recent history bounded to 16,000 UTF-8 bytes plus instructions/context capped at 12,000 bytes, with at most 1,500 output tokens. At the checked standard rates (10 USD / million input, 50 USD / million output), a 0.50 USD reservation includes margin for bounded input/formatting and output. Revalidate when pricing/model changes.
- Example, **not measured production usage**: 2,000 input + 500 total output tokens = 0.045 USD per reply; 1,000 such replies = 45 USD. Growing history and reasoning output change the actual cost. Search, storage and hosting are excluded. No external research tools are enabled.

## Verification

- `npm run build`: passed, including the repository prebuild learning/intelligence/workspace/personal-plan tests.
- `npm run typecheck` and focused ESLint: passed at implementation checkpoint; final recheck recorded in PR.
- Atlas + Super App + navigation suites: 29/29 passed, including 14 Atlas tests covering schemas, profile minimization, isolation, deduplication, deletion races, temporary history, budgets, expiry, origin/auth checks, visible-text streaming and provider failure handling. Storage/provider are controlled test doubles, not live services.
- Browser fixture: 360, 390, 768 and 1,440 px, no document horizontal overflow or broken mascot images; synthetic streaming, safe Markdown/table rendering, profile opt-in, feedback, rename, draft recovery, failed-send retry with same ID, deletion, temporary history, stop and mobile history tested. See `evidence/browser-qa.json`. Screenshots are clearly labelled synthetic. This does not validate the complete TGPI chrome, actual mobile keyboard, live auth or database.
- The Super App test count was updated to 12. Two pre-existing assertions expected launcher markup directly inside navigation components; they now check the existing shared `LauncherButton` delegation and its accessibility contract. No navigation component was changed to satisfy those stale assertions.
- Live model test: blocked by missing API credits. Live two-account Firestore/Clerk, TTL deletion, deployed rules, full authenticated browser journey, intelligence grading, actual latency and cost remain outstanding.

Run `npm run verify:atlas` with the key securely loaded into the environment after credits are available. The script checks model access and a minimal actual response without printing credentials. Run `npm run test:atlas` for deterministic tests. The standalone browser harness uses `esbuild`, Playwright and `@sparticuz/chromium` as external QA dependencies, not application dependencies.

## Next increment / release gates

1. Complete the live smoke test, two-account database tests, TTL/rules audit and authenticated desktop/mobile flow before any production request.
2. Grade the 17 synthetic conversational cases in `evaluations.json`; the file records **not run**, not fabricated quality scores.
3. Add official-source research and verifiable citations, then bounded read-only integrations for Country Fit, learning, checklists and Workspace.
4. Add coherent question editing/branching, full-history search, explicit memory controls, richer mascot states and localization of UI labels. Current UI follows the site's English language; model instructions support multilingual conversation but this is not yet live-evaluated.
5. Add confirmed/idempotent write tools only after read-only retrieval is evaluated. Attachments and voice remain out of scope for this first core.

The authorized production scope is interface visualization only. A code build and synthetic browser test do not constitute a completed live AI integration.
