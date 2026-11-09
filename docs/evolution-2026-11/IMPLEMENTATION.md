# TGPI evolution — 9 November 2026

Base: production ccb9ff5617d0dca2d494ca07893ccc20607919f9, tree 6e85f75e3ae07a60273d57fbcace82c266ba439e. Isolated checkout; other working copies and their unpublished changes were preserved. Previous production: dpl_2SUnba6ugDNL5utUqZKtvgrP8TFs.

## Implemented release unit

- Shared operational shell for workspace, courses, countries, comparison, plan, community, Atlas, documents, certificates, identity and notifications. Collapsible desktop navigation; existing mobile navigation retained. Study routes have a focused return bar. Public editorial pages retain their composition.
- Compact course catalogue: task heading before search, URL-backed filters for subject, series, availability, credential and instruction language, clear free access, publication status and credential policy. The ten professional courses no longer claim no certificate. Assessment eligibility and issuance remain server controlled.
- Read-only learning projection across legacy Clerk progress and professional Firestore records. Summaries include owner validation, edition reconciliation, review states, valid activity counts, partial availability, and no raw student work. /api/learning/summary derives owner from session and disables caching.
- One continuation component used by catalogue and workspace. Professional resources participate in the existing workspace library and next-action selection. Existing enrollment, lessons, drafts, projects, reviews and credentials are not rewritten.
- Comparison selector precedes introductory context. Shared AreaHero text is routed through localization. Workspace controls and new components have messages for all six interface locales; course instruction language remains explicit.
- One original, decorative learning image, 1440x810 WebP, 71,500 bytes. Fictional adult and conceptual skyline, not a documented location or testimonial. Source: generated 9 November 2026. Path: public/images/learning/tgpi-applied-learning-v3.webp. Focal point: right 75%, center 55%. Loaded below catalogue, no LCP priority. Original prompt: cinematic editorial photography of a fictional professional studying in a contemporary international workspace; navy/ivory/brushed gold, person at right, restrained negative space at left, no logos, readable UI, data charts or fictional geographic claims.

## Validation

Baseline: TypeScript passed; 390 existing tests passed. Eight added behavioral/API tests verify owner isolation, old editions, no certification bypass, legacy alias reconciliation, URL filters and cache protection. Updated suite and deployment results are recorded in RELEASE.md. No test gate was removed.

## Data and release contract

No schema migration, account deletion, payment change, new quota, enrollment reset or change to certification policy. Free access and USD 19.90 monthly Premium price are preserved. Roll back code by returning the production branch to a new revert commit based on the deployed release and redeploying the prior deployment. No data rollback is needed for this read-only projection. Do not force-reset concurrent changes.

Canonical sources remain: Clerk private metadata for legacy activation; Firestore professional records for professional learning and submitted projects; server-validated Stripe billing for entitlements. Summary DTOs are projections, never authorities for permissions or issuance. A failed source remains explicitly unavailable and is not represented as an empty completed record.

## Full master prompt remains open

This release is not acceptance of the entire master programme. The route matrix is an inventory, not a claim of 68-page manual verification. Remaining acceptance work includes: human curriculum review, ten complete educational end-to-end journeys, all course material downloads, full six-language editorial audit, all 12 art families, durable workspace event write/reconciliation architecture, advanced Premium scenarios and exports, actual Atlas generation/budget validation, Stripe sandbox lifecycle, test accounts for every role, deployed Firestore policy verification, screen-reader testing, WebKit/Firefox matrix and measured field performance. Do not advertise any of these as completed without evidence.


Wave 2 adds the history preparation/acknowledgement journal and Premium comparison/export. See [WAVE-2.md](WAVE-2.md) for the superseding scope, evidence, cross-provider limits and remaining programme work.
