# TGPI Global Community — implementation review

## Status

A substantial first implementation is prepared locally on `feat/tgpi-global-community`, based on `60b51af2d9952ed32eda833a03d42f250c2b4616`. It is **not deployed** and the complete requested ecosystem is **not finished**. Remote branch export was rejected by automatic approval review because the repository is public and explicit permission to publish the new code was not supplied. No alternate export mechanism was used.

## Diagnosis and reuse

The original `/community` displayed fixed country-room links and three illustrative member cards. It had no community creation, membership or persistent discussion lifecycle. The implementation replaces that page without deleting the legacy rooms system or changing its routes.

Reused: Clerk authentication; existing member @ID resolver and privacy-controlled `/u` → member profile flow; protected Firestore Admin REST transaction engine; notification inbox format; official metal crest; application color/font variables; global header/footer/mobile navigation. Workspace remains `/profile`; `/dashboard` redirects there. Existing Country Fit, learning, credentials and Stripe records are preserved.

No AGENTS.md was present in the baseline checkout. Next generated AGENTS.md/CLAUDE.md during local development; its route-handler guidance was reviewed. No agents were delegated.

## Implemented behavior

- Discovery and bounded cursor pagination; loaded-page text filtering by destination, language and topic. This is not a full-text search engine.
- Four-step creation, unique identifiers, durable drafts, introductory text, optional entry question/welcome, numbered rules.
- Public/private/hidden visibility separated from instant/approval/invitation admission. Hidden requires invitation; privacy never checks Premium.
- Current-rule acceptance, join/cancel/leave, request approval/refusal with reasons, suspensions, bans, restoration, owner-assigned moderators, owner-only promotions, two-party ownership transfer and archive/reopen.
- Last owner cannot leave; moderators cannot modify owners or other moderators. Ordinary members cannot promote themselves.
- Hashed random invitation tokens, server expiry, configurable 1–30 days / 1–100 uses, atomic redemption and revocation. Active members retain access after the invitation is consumed or expires.
- Four text publication formats, contextual destination/period/currency fields, HTTPS sources, author editing, removal, moderator pin flag, chronological cursor pagination, comments, accepted answers, persistent save/unsave and independently authorized direct post links.
- Post/comment reports, paginated moderator queue and decisions, paginated administrative audit.
- Global Sessions with timezone-aware presentation, future-date validation, capacity, atomic/idempotent RSVP, cancellation and protected meeting URLs.
- Explicit interests, optional match explanations, hiding recommendations and muting community inbox notifications. Private Country Fit questionnaire answers are not imported.
- Workspace community participation/pending-request links and saved-content continuity. Destination dossiers and Country Fit link into community exploration. These are specific integrations, not a claim of complete synchronization across every TGPI module.
- Essential participation/reply inbox notifications written atomically with the originating transaction, with deduplication and generic privacy-safe wording. No email delivery is claimed.
- Four new cinematic image assets, generated with the built-in image tool and optimized into WebP. Official crest preserved.
- Responsive columns, motion reduction, keyboard focus, real error/empty/restricted states, bounded Load more controls, inline text editor and draft preservation after failed submission.

## Data and authorization

All community records are beneath `tgpiLearningUsers/_community`, inheriting the documented existing recursive client-deny rule on `tgpiLearningUsers/{document=**}`. The activation gate reuses `TGPI_LEARNING_SECURITY_RULES_CONFIRMED`; direct browser Firestore access is not introduced. Authoritative reads and writes use the server transaction engine. Current live rules were not independently inspected or deployed.

Collections cover communities, members/rule acceptance/requests, invitations, posts, comments, sessions/RSVP, reports, audit, explicit preferences, drafts, per-person membership references, saved content, operational limits and metric events. Stable IDs and application-server UTC timestamps are used. No membership/content permissions depend on localStorage. Soft-deleted posts/replies have their body cleared; parent-post removal also prevents comment retrieval. Audit and ownership records are retained; automated retention/account-erasure processing remains a separate pending operational requirement.

The API authenticates mutations, verifies same origin, bounds streamed input to 30 KB, validates fields and authorizes operations from current transactional membership. Content is rendered as React text, not HTML. Source/meeting URLs require HTTPS and reject credentials. Community identifiers/cursors cannot inject document paths. Private content is rechecked in post, comment, saved and event reads. Hidden communities are omitted from discovery and unavailable responses are generic. Private projections do not disclose owner/transfer target or welcome content to non-members. Pagination cursors are encrypted with authenticated AES-GCM and bound to their collection scope, preventing hidden identifiers from leaking through discovery cursors. API caching is private/no-store; the service worker explicitly excludes community data. Old in-flight client responses are discarded when a newer identity load occurs.

Queries are parent-scoped and bounded to 25 rows. Chronological posts/comments use createdAt + document name; other collections use stable document-name cursors. No new composite query indexes are intentionally required. Firestore query/index behavior still needs a real project smoke test.

## Permission matrix

| Actor | Read public content | Read private content | Write | Moderate | Change roles/transfer |
|---|---|---|---|---|---|
| Visitor | Yes | No | No | No | No |
| Authenticated non-member / applicant | Yes | No | Save/report accessible content; submit/cancel request | No | No |
| Active member | Yes | Joined communities | Posts, replies, RSVP, own edits | No | No |
| Moderator | Yes | Joined communities | Member functions | Members below moderator, content, requests, reports, invitations | No |
| Owner | Yes | Own communities | Member functions | Own community | Assign moderators; offer transfer; recipient must accept |
| Global TGPI administrator | Existing account role preserved | No new global bypass added | Existing TGPI admin tools | Dedicated global community console pending | No implicit bypass |

Premium is intentionally absent from this matrix.

## Verification and evidence

The community suite has 35 passing tests. See `evidence/checks.json` for exit codes and `evidence/visual-qa.json` for browser observations. Automated service tests use isolated in-memory persistence and serialized transaction boundaries. They are not Firestore emulator tests, live IAM/rules validation or proof of real Clerk login. Cases cover privacy, escalation attempts, invitations, ownership, rule revisions, moderation, revocation, saves, sessions, preferences, pagination and direct links.

A local full-app browser attempt stopped at **Missing secretKey** from Clerk. Local configuration contains a publishable key but no Clerk server secret or Firebase service credentials. Those external boundaries cannot be reported as passing.

The visual evidence uses the actual production community components bundled in a separate temporary QA harness. Next image/link/router and Clerk identity are stubbed only inside that harness; all member/activity data are clearly labeled synthetic. The harness is not an application route and is not shipped. It checks component layout and interaction, not real authentication, production global chrome or live persistence. Typography uses the documented fallback families in the harness.

Checked: 320/390/768/1440 px, hidden → invitation admission lock, required rule acceptance, restricted post absence, preserved composer text after simulated 503, keyboard focus, reduced-motion media and 200% CSS zoom. A zoom overflow was found and corrected. This is not a full accessibility certification or a real mobile OS keyboard test.

## Remaining requested work

Before calling the entire brief complete:

- Authenticated staging runs with two real Clerk identities; actual Firestore transactions, rules/index validation and live notification reads.
- Safe avatar/cover/post-image uploads, protected file serving/revocation and image alt-text workflow. No nonfunctional upload controls are exposed.
- Full-text/server-side global discovery and unified personalized cross-community feed; richer Journey Circles taxonomy and atlas filters.
- Reactions, structured mentions, playbook curation with source links and course-study-group/credential consent integration.
- Dedicated global moderation console, community/member reports, appeals, user blocking, slow mode, pre-publication review, operational retention/account deletion.
- Complete per-community notification-frequency controls and email-provider delivery; upcoming-RSVP/reply summaries in Workspace.
- Provider-backed AI summaries, translation, tagging and triage. No AI feature is simulated.
- Full end-to-end keyboard/mobile virtual-keyboard/slow-network checks in the real authenticated app.

These missing features are not presented as implemented. Existing services are reused; this review does not claim market superiority or that the ecosystem has been fully delivered.

## Reference review

Functional patterns consulted from primary public documentation, without copying branding/assets:

- Circle: https://help.circle.so/p/basics/spaces/managing-space-access-and-visibility — distinct discovery and content-access concepts.
- Discord: https://support.discord.com/hc/en-us/articles/214836687-Discord-Roles-and-Permissions — scoped roles and hierarchy.
- Discourse: https://blog.discourse.org/2018/06/understanding-discourse-trust-levels/ — progressive trust; no automatic scientific expertise badge implemented.
- Reddit: https://support.reddithelp.com/hc/en-us/articles/15484546290068-Community-settings — public/restricted/private participation patterns.
- InterNations: https://support.internations.org/hc/en-us/articles/4402779148177-How-can-I-find-InterNations-Global-Groups-and-Events — interest groups and event continuity.
