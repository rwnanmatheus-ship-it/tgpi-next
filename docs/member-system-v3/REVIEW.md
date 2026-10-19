# TGPI account and member identity — implementation review

Status: implemented on a review branch; not released to production. This document distinguishes code verification from live-service verification.

## Diagnosis

The application already uses Clerk for identity, application-profile metadata, onboarding and private activation signals; protected Firestore REST storage for learning and credentials; and server-owned Stripe billing records. There is no repository AGENTS.md at the starting commit `79242fc43c5cc0098370edb72e68992326e961a8`. The installed Next.js route-handler guide was reviewed.

- `/profile` is the existing connected workspace; `/profile/security/[[...user-profile]]` is the account center and embeds the real Clerk security UI.
- `/country-fit` reads canonical `tgpiOnboarding`. It is an evidence-based research planner, not an automated country compatibility percentage. Goals, USD budget bands, languages, profession, timeline and priorities affect research context; extra lifestyle fields have no implemented scoring support.
- `/member/[userId]` is the current controlled public-profile route.
- Legacy `/u/[uid]` and `/user/[username]` read complete Firebase `users` documents into public browser components, display precise city/document-derived information, and bypass current Clerk profile privacy. Both now redirect to the controlled server route. Unmapped legacy Firebase identities fail closed; no cross-provider mapping is guessed.
- Username editing depended on Clerk's optional login-username setting. There was no member search, protected historical-handle reservation or downloadable member presentation.
- The public page exposed profession, education, nationality, languages and social links without independent group permissions. The private preview did not apply all public controls. City sharing and profile-completion progress are removed from the public projection.
- Settings used replaceState (discarding section history), oversized bottom padding, a sticky save bar, an unnecessarily tall desktop container and small touch targets.
- Optional private profile completion added 200 public rank points. Rank version 3 removes this incentive and reallocates these points to completed learning. Existing learning history is preserved; derived ranks are recalculated.

## Product and architecture decisions

1. Preserve Clerk `tgpiAccountProfile` and `tgpiOnboarding`, the protected activation history and real Stripe APIs. There is no second profile database.
2. Use a small Firestore identity index for application @IDs, independent of authentication login names. Never change a member's login identifier when editing their TGPI discovery ID.
3. Keep the existing stable `formatTgpiGlobalId` so certificates and Global Key references remain compatible. Transactionally reserve its number; a hash collision fails with a support-review error rather than assigning a duplicate.
4. ASCII @IDs, 3–30 characters, case-insensitive, letter first, letters/digits/underscores only. Reserved institutional names/prefixes are rejected. One change per 30 days. Retired names are permanently reserved to the original owner and resolve to the current number-based profile after a live visibility check. Existing Clerk usernames are checked before claims; a claimant's valid old Clerk name is retained as an alias where unclaimed.
5. Discovery is authenticated and exact-match, limited to one result and 15 attempts per member per minute through a shared transactional limit. No email/phone search or unrestricted collection listing.
6. Public publication, member discovery and external indexing are independent opt-ins. Private is the default. New optional groups default hidden for old accounts.
7. Render and export an explicit public DTO only. All public reads re-evaluate current Clerk privacy; dynamic rendering and private/no-store headers avoid public caching. The existing service worker already excludes APIs, private navigations and member pages.
8. Keep form surfaces legible and compact. Apply navy/blue/gold depth to identity and navigation, with reduced-motion support and touch targets of at least 44px.

## Implemented

- Compact account layout, institutional heading, improved field association (including input + datalist), display name, persistent labels, keyboard focus, non-sticky save feedback, disabled fields during saves, native field validation, browser-back section history, and preservation of draft state on errors.
- Basic stale-version rejection when the submitted `updatedAt` differs from the current Clerk profile. This is not an atomic compare-and-swap across Clerk requests; simultaneous writes after both reads remain a limitation.
- Contextual next action and direct learning, certificate, Country Fit and billing continuity links.
- Dedicated member identity editor, on-demand account-menu identity lookup, and authenticated `/members` discovery page, also linked from the public identity center.
- Server-side public projection: optional country-only residence; career, languages, goals, links and progress groups; actual course completions; currently active credentials with integrity checked against the issuer record. Self-declared information, platform progression and verified credential records are labeled separately. Premium is not shown as proof of expertise or identity.
- Owner-only saved-profile preview uses the same renderer and projected fields as other viewers. The account draft card follows local group toggles; the exact-preview link deliberately reads saved server state.
- Real PNG generation through canvas (compact and extended composition), real server-generated A4 PDF with embedded fonts, official crest, selectable text, pagination and profile-only QR/link. Optional groups can only reduce the saved public projection. Private profiles must explicitly enable Members/Public visibility before exporting a shareable identity. A photo that cannot be safely loaded prompts retry or deselection. PDF fonts currently replace unsupported glyphs with `?`, disclosed in the export.
- Native share plus an explicit copy-link action. Print-ready PDF is separate from the actual PDF download action. Previously downloaded files cannot be revoked by later privacy changes.
- Owner-only JSON export explicitly scoped to profile, international preferences, identity and platform progress. It excludes auth secrets and payment data; dedicated credential/billing centers remain the source of their records.
- Subscription section reuses `/api/billing/status` and `/api/stripe/create-portal-session` for actual status, period end and portal access. Real Clerk UserProfile remains responsible for email, password, connected accounts, supported additional factors/sessions and account deletion.

## Data, access rules and indices

No new dependencies or new environment variables are required. No migration deletes or rewrites existing profile, billing, certificate or course records.

| Path / source | Purpose | Access |
| --- | --- | --- |
| Clerk unsafeMetadata.tgpiAccountProfile | Existing private editable profile plus displayName and group controls | Owner form; server-filtered public projection |
| Clerk unsafeMetadata.tgpiOnboarding | Existing canonical international context | Existing authenticated plan workflows |
| Clerk privateMetadata activation/billing | Existing protected progress and subscription state | Server-owned; client cannot edit rank/plan/credentials |
| tgpiLearningUsers/{uid}/memberIdentity/current | Stable number, current handle, change timestamp | Admin REST only |
| tgpiLearningUsers/_memberDirectory/handles/{handle} | Permanent handle reservation to internal owner | Admin REST only |
| tgpiLearningUsers/_memberDirectory/numbers/{number} | Unique number-to-owner lookup | Admin REST only |
| tgpiLearningUsers/{uid}/memberLimits/search | Distributed search-frequency window | Admin REST only |

The identity index deliberately inherits the **existing recursive deny rule** on `tgpiLearningUsers/{document=**}` and existing `TGPI_LEARNING_SECURITY_RULES_CONFIRMED` activation gate. All new lookups are document-key reads: no composite index or public Firestore query is required. Live Firestore edition, deployed rules and direct access to the legacy `users` collection could not be independently audited without authenticated Firebase access. No database/rules deployment was performed.

Handle/number reservations remain non-reassignable if a Clerk account is later deleted; public reads and searches re-check the live account and return unavailable. They are security reservations, not retained public profiles. Existing learning/credential retention policies require separate review for a complete data-erasure workflow.

## Field purpose and visibility

| Group | Functional use | Required | Visibility and removal |
| --- | --- | --- | --- |
| First/last name | Clerk identity, default presentation | First name required by existing save flow | Owner editable; presentation shared only within chosen visibility |
| Display name, photo, headline, bio | Member presentation and exports | Optional | Owner editable/removable; part of basic enabled profile |
| Legal name, birth date, certificate consent | Existing certificate issuance/download behavior | Existing issuance rules | Private; issued signed credentials retain original snapshot |
| Gender, preferred title | Existing optional declaration and greeting | Optional | Private and removable; no recommendation/rank effect |
| Country/city/nationality | Existing private context | Optional | City and nationality excluded from the public projection; country opt-in |
| Profession/education/experience/employment | Existing profile and career-research context | Optional | Editable/removable; only profession/education can be shared, under Career |
| Languages | Existing onboarding/Country Fit research context | Optional | Shared only under Languages; not proof of proficiency |
| Goals/countries/budget/timeline/priorities | Existing canonical onboarding/research planner | Existing plan rules | Editable/removable in the canonical editor; budget never public |
| Currency/language/timezone/units | Existing stored preferences | Optional defaults | Private; this change does not claim a new translation or formatting engine |
| Website/LinkedIn/Instagram | Member-provided professional links | Optional | URL-normalized; separately shared; credentials in URLs rejected |
| Notification categories | Existing notification preference system | Optional | Private; real delivery remains subject to existing channel workflows |
| @ID | Exact member discovery and aliases | Optional | Dedicated authenticated transaction; rename interval; old aliases reserved |
| TGPI number | Stable public member/credential reference | Immutable | Does not grant access or expose authentication UID |
| Rank/completions/credentials | Existing server-owned evidence | Not client-editable | Shared only under Progress; no reward for private-profile completion |

## Verification performed

- `npm run typecheck`: passed.
- `npm run lint -- --quiet`: passed after correcting the test helper's module-variable name.
- `npm run test:account`: 29 passing tests. Includes actual route code with isolated service boundaries; simulated transaction races, old-handle reservation, rate limits, visibility defaults, private-field exclusion, export selection, anonymous/private export rejection and actual PDF generation. These are not a live Firestore concurrency test.
- `npm run test:platform`: 11 passing tests.
- `npm run test:navigation-system`: 7 passing tests.
- `npm run test:mobile`: 19 passing tests (existing logic/source checks, not visual device tests).
- `npm run test:pwa`: 5 passing tests.
- Required prebuild suites: learning credentials/PDF 17, intelligence 72, workspace 5 and personal plan 2 passing tests.
- Production compiler via `npx next build --webpack`: passed. Existing viem/ox dynamic-dependency warnings remain unrelated to this change.
- Default `npm run build` completed the prebuild tests but the local Turbopack compiler failed in its internal Google-font import map. Webpack succeeds without replacing application fonts or committing a build-command workaround.
- Actual A4 PDF fixture rendered with Poppler and inspected visually: name wrapping, embedded crest, declarations, margins, QR and footer fit. Text extraction confirmed selectable text. The rendered QR was decoded with jsQR and matched exactly `https://theglobalpolymath.com/member/TGPI-AAAA-BBBB-CCCC`, containing no credentials or private fields. Long synthetic names/bios also generated multiple pages successfully in automated tests.
- Browser harness prepared against real React components with synthetic fixtures. It could not run: local Chromium is unavailable, downloading it failed, and the remote browser cannot reach the local server. **No claim of executed desktop/mobile/zoom/keyboard/PNG/download UI checks is made.**

## Release gates / concrete limitations

Do not merge into production until these checks run on a test member in Preview:

1. Confirm existing Firestore recursive deny rules and legacy users-collection access with an authenticated Firebase administrator; confirm current storage configuration points to the intended database.
2. Persist/edit/reload an old account; check upload removal; run two real simultaneous handle claims; test renamed aliases and a deleted account.
3. Exercise discovery and public profile as owner, another member and visitor, with independent privacy/indexing toggles. Audit response/RSC/export payloads for private information.
4. Update canonical budget/languages/goal and verify Country Fit's actual research questions, retained shortlist and plan priorities.
5. Run actual PNG and PDF downloads with and without photos, long/international names and font coverage; decode the generated QR and verify its exact target.
6. Test compact phones, large phones, tablet, notebook, wide monitor, 200% zoom, keyboard and reduced motion, including global header/footer and focused security UI.
7. Verify real Stripe billing portal and Clerk security controls without changing live financial or recovery settings.
8. Confirm rename/data-retention policy and resolve remaining simultaneous Clerk-profile-write races before asserting complete concurrency protection.

Additional lifestyle/accessibility/dependent data, language-proficiency records, multiple saved international scenarios and a dedicated project portfolio are intentionally not collected or presented as implemented: there is no verified consumer for those fields in the current Country Fit or profile model. Complete erasure of historical learning/payment records and delivery-channel expansion remain separate infrastructure work.

## Publication

The implementation is reviewable in an isolated Git branch and draft PR. Production remains unchanged until the live-service and visual gates above are satisfied. No subscription rules, security credentials, Firebase rules or deployment protection settings were changed.
