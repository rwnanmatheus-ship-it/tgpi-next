# TGPI Global Community — release review

## Diagnosis and preserved systems

The original `/community` contained fixed room links and illustrative member cards, with no persistent community lifecycle. This release replaces that destination while preserving the legacy room routes. It reuses Clerk, the existing Firestore Admin REST transaction engine, member @ID/profile privacy, global navigation, official crest, visual tokens, courses, Country Fit and notification presentation.

The published Workspace update at `e668637` was merged and preserved. Community continuity was added to its current layout rather than restoring the older Workspace. AGENTS.md and Next route-handler documentation were reviewed before the release edits. No agents were delegated.

## Product and architecture

- Public, private and hidden visibility is independent of immediate, approval or invitation admission. Hidden communities require invitations and never appear in discovery. Privacy never depends on Premium.
- Four-step creation includes durable server drafts, numbered rules, languages, destinations, an optional Journey Circle stage and a validated connection to an existing TGPI course. Avatar and cover editing is available after creation.
- Membership, exact rule acceptance, request/cancel/refuse/approve, hashed expiring invitations, revocation, suspensions, bans, appeals, moderator roles, two-party ownership transfer and archiving are enforced transactionally on the server.
- Experiences, questions, guides and discussions use safe text, contextual destination/period/currency fields and HTTPS sources. Replies, author editing, removal, accepted answers, helpful reactions, saving, direct links and moderation are persistent.
- Moderators can review publications before release, configure slow mode, curate playbooks with original source links, process reports and review appeals. Global moderation requires the existing trusted Clerk `privateMetadata.role === "admin"` role. Ordinary clients cannot grant it.
- Blocking affects authenticated post, reply, saved and media reads. Public publications remain public to signed-out visitors. Notifications use generic wording and opaque keys so removed access does not expose private titles, text or hidden community identifiers.
- Recommendations explain matches against explicitly supplied interests. Users can disable explanations, hide recommendations, mute communities or choose notification preferences. Private Country Fit answers are never imported.
- Chronological cross-community conversations, unanswered questions, Experience Atlas filtering, community sessions and a consolidated upcoming-session view connect participation to practical next steps.

## Permission matrix

| Actor | Public content | Private content | Contribute | Moderate | Ownership |
| --- | --- | --- | --- | --- | --- |
| Visitor | Read | No | No | No | No |
| Signed-in non-member | Read/save/report accessible content | No | Request admission | No | No |
| Active member | Read | Joined communities | Posts, replies, RSVP, own edits | Report and block | No |
| Moderator | Read | Own communities | Member actions | Scoped content, members below moderator, requests, reports, appeals, invitations | No self-promotion |
| Owner | Read | Own communities | Member actions | Own community, rules, settings | Offer transfer; recipient must accept |
| Global TGPI administrator | Read | Authorized management endpoints | Existing account role preserved | Global report queue and scoped management actions | No client-controlled role |

The last owner cannot leave. Pending membership never grants private content access. Role changes and sensitive decisions create audit records. Access checks run for direct post links, search results, saved content and image responses, not only in the interface.

## Persistence and media

Community data lives under `tgpiLearningUsers/_community`, within the existing protected Firestore tree. No authoritative content or permissions use localStorage. Application-server UTC timestamps, stable identifiers, slug uniqueness, encrypted scoped cursors, bounded queries, transaction retries and idempotent reactions/joins/invitations handle consistency.

The live Preview database is Firestore **Standard**, native mode, location `nam5`. Its deployed rules were inspected: all direct client reads and writes are denied. The application uses the existing server service account. No rules were replaced. Production readiness is checked separately; Preview IAM is not proof of production IAM.

Uploads accept still JPEG/PNG/WebP up to 3 MB, reject SVG/animation/oversized dimensions, remove original metadata, and convert to WebP up to 1280 px (512 px for avatars), capped at 350 KB. Files are encrypted with AES-256-GCM and bound to community, purpose and publication. The durable default is the existing protected Firestore database; an explicitly configured GCS bucket can be used instead. Preview bucket provisioning was unavailable, so the release does not depend on a newly provisioned bucket. The media key is stored as a sensitive Vercel variable in Preview and production and must be retained for existing images.

Image access rechecks current membership and publication availability on every request, with private/no-store caching. Post images must be attached to their original publication. Uploads have a daily byte/count allowance. Unbound uploads are visible only to their owner or authorized moderators.

## Integration

- Identity: existing Clerk account, @ID resolver and privacy-controlled member profile routes.
- Workspace: active/pending communities, saved contributions and upcoming-session navigation, preserving the newly published Command Center.
- Country Fit/destinations: contextual exploration links; only user-supplied community interests drive personalization.
- Courses: creation validates a real course ID and links to that course. No achievement is shared automatically and no unverified experience badge is invented.
- Notifications: atomic community events are projected into the **existing account inbox collector**, preserving its read/archive marks and current production storage mode. The legacy Firestore inbox projection is written only where that system is already activated. No production notification-mode migration is performed. Preferences, deduplication, blocking and an hourly cap apply.
- Events: future-date/time-zone validation, capacity, idempotent RSVP, cancellation and current-access meeting links. Local and original time zones are shown.

## Validation and evidence

The community service suite has **56 passing tests**, using isolated transactional persistence and real Sharp image conversion. It covers privacy, rule acceptance, duplicate operations, escalation, invitations, transfer, moderation, reactions, appeals, blocking, playbooks, scoped cursors, media encryption/revocation and account-inbox events without legacy activation.

Lint, TypeScript and Next production build pass. Account (30), notification (10), platform (12) and PWA (5) regression tests pass. The build also executes the existing learning-credential, intelligence, Workspace and personal-plan prebuild checks.

`evidence/live-preview-checks.json` records authenticated browser/API/Firestore checks with two actual **synthetic Clerk test accounts**. The Preview-only fixture route is removed before production. Test communities and users are cleaned up; they are never presented as real members or shipped to the production database. Earlier `evidence/visual-qa.json` uses a separately labeled component harness and must not be confused with these live Preview checks.

Live visual files include desktop and mobile screenshots of the actual application, global navigation and clearly labeled test communities. These are evidence of the Preview layout, not a claim that the pictured test activity exists in production.

## Concrete limits and operations

- Discovery is indexed, accent-normalized first-word prefix search, not a semantic or multi-word full-text search engine.
- Aggregated conversations and upcoming sessions consider up to eight active communities from the first membership page; every community retains its own cursor-paginated archive. Filters operate on the loaded contributions.
- Experiences and guides use structured context fields plus safe plain text; there is no rich-document editor or poll UI.
- No provider-backed AI, translation, email delivery, browser push or event-reminder service is configured. No such capability is simulated or advertised as operational.
- Real mobile OS virtual keyboards, assistive technologies and a complete accessibility certification require device testing. Browser viewport/focus/zoom checks are recorded with their actual limits.
- Removed post/reply bodies are cleared immediately. Durable community erasure and retention are implemented below. Full cross-product account erasure, bulk email and advanced reputation remain outside this community cleanup scope.

## Functional references

Public primary documentation informed access separation, role hierarchy, moderation and interest/event organization without copying branding, text or assets:

- Circle: https://help.circle.so/p/basics/spaces/managing-space-access-and-visibility
- Discord: https://support.discord.com/hc/en-us/articles/214836687-Discord-Roles-and-Permissions
- Discourse: https://blog.discourse.org/2018/06/understanding-discourse-trust-levels/
- Reddit: https://support.reddithelp.com/hc/en-us/articles/15484546290068-Community-settings
- InterNations: https://support.internations.org/hc/en-us/articles/4402779148177-How-can-I-find-InterNations-Global-Groups-and-Events

Deployment outcome, final commit and verified domain are reported in the delivery message and pull request #82.


## Community privacy and lifecycle completion

Community Preferences now includes a server-confirmed removal flow with typed confirmation, ownership checks, actual progress and retry status. It removes community publications, replies, media, memberships, requests, RSVP, saved items, preferences and personal community notifications. Other members’ knowledge, TGPI accounts, billing, courses and certificates are preserved. Accepted-answer pointers, reaction/attendance/member counters are updated transactionally. Owned communities require transfer or archiving first; deleted Clerk owners are archived automatically. Global administrators can offer an archived orphan’s ownership to an active member, whose acceptance remains mandatory.

Removal is a durable cursor-based job, not a browser task. It blocks mutations and authored-content/media retrieval immediately, checkpoints each batch, leases workers and retries storage failures. Creation quotas and participation bans survive in pseudonymous security records. Audit/report identities are pseudonymized; pending moderation evidence is retained. The HMAC privacy identifier is derived from the existing community media key (legacy fallback: service-account key); preserve this key together with encrypted media. Key rotation requires migration of privacy jobs, restrictions, trust and identity-check identifiers.

The authenticated `/api/cron/community-maintenance` runs every five minutes in production, using a sensitive `CRON_SECRET`. It processes pending removals and bounded retention scans, retaining a durable cursor across invocations. `/api/community/operations` and the existing TGPI moderation console expose actual runs, failures and manual recovery batches to server-verified global administrators only. A Clerk `user.deleted` webhook queues cleanup when configured. Production currently lacks a webhook signing secret; the scheduled scan therefore also verifies member identities against Clerk, caching successful checks for one day. A Clerk 404 queues removal; outages never trigger deletion. Discovery of a deleted identity depends on the bounded scan reaching that membership and is not a promise of instant cleanup after account deletion.

Retention removes unattached/replaced images after 24 hours, removed threads/replies and descendants after 30 days, expired invites after 30 days, inactive drafts after 30 days, closed reports/audit/activity after 90 days, and completed privacy receipts after 90 days. Attached media, unresolved reports and active participation restrictions are preserved. These are application-managed batches, not a database TTL that bypasses authorization or consistency.

New files: `lifecycle.server.ts`, `privacy.server.ts`, privacy/operations/cron route handlers, `CommunityPrivacy.tsx`, `CommunityOperations.tsx` and lifecycle/service/API tests. Existing Firestore REST transactions now support delete writes and child-collection discovery. The existing Clerk webhook, community service, protected assets, preferences and moderation console are extended; no parallel database or identity system is introduced.

Validation includes 56 community/service/lifecycle/API tests: concurrent workers, durable retries, identity-service outages, owner protection/recovery, pseudonymous bans, typed confirmation, origin/role checks, scheduler authentication and production gating. Account (30), notification (10), platform (12) and PWA (5) regressions, lint, TypeScript and clean Next production build pass. The first local build encountered a stale Turbopack persistence directory; a clean generated cache resolved it without changing application configuration.

Live follow-up validation: `evidence/lifecycle-preview-checks.json` records 12 passing checks with two real synthetic Clerk identities, the actual Preview APIs and Firestore. Removal completed through the maintenance service; encrypted images became inaccessible immediately, other members’ content survived, and reply/accepted-answer/reaction/member counters were reconciled. Desktop, 390 px mobile and 768 px tablet screenshots are `lifecycle-desktop.webp`, `lifecycle-mobile.webp` and `lifecycle-tablet.webp`. Keyboard focus and 200% CSS/browser zoom checks passed without horizontal overflow. Physical mobile keyboards and assistive-technology certification remain unverified. Fixture cleanup is recorded separately in `lifecycle-preview-cleanup.json`; no temporary QA route is included in the final release.
