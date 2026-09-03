# Editorial coverage V3 — source registry 2.1.1

Reviewed 2026-09-03. This expands the existing production intelligence layer; the independent SEO branch is not merged.

## Scope and provenance

- 12 destinations (previously 8), 29 linked summaries (previously 17), 29 registered sources (previously 19).
- 27 source-content reviews, including deliberately limited-scope reviews; AIMA and QEDU remain unconfirmed pointers. A reviewed source is not an audit of every programme or legal condition on that site.
- New destinations: Netherlands, Ireland, Australia and New Zealand. Portugal adds university-level entry orientation; Spain adds the official RUCT description; France adds a narrowly scoped degree-authorisation decree.
- Four existing numeric cost references are preserved without changing amounts, periods or review dates. No new city cost estimate is fabricated. AUD/NZD worksheet inputs are supported without FX conversion.

The executable provenance register is `src/lib/intelligence/dossiers.ts`: exact public URL, publisher, source type, reference period, audience, limits, editorial date, review interval and source-linked questions. New source pages were read publicly on 2026-09-03; summaries are paraphrases. Direct institution listings or individual visa outcomes were not verified. Sources retain their own rights; no university affiliation is implied.

## Gaps and explicit review ownership

The public `/intelligence/research#source-review` register exposes operational observations separately from editorial status. Every known issue has an observation date, next action and review-by date. The responsible maintainer must close it through a reviewed code change, not an automatic content fetch.

Initial queue, observed 2026-09-03:

- AIMA: public research retrieval HTTP 502; legal source content remains unconfirmed. NOVA FCT orientation does not replace it.
- QEDU: interactive records not retrieved. RUCT provides a separately reviewed official register description, not a claimed audit of QEDU.
- Oxford, U.S. State Department, Japan MOFA, France-Visas: production checker HTTP 403. Automatic retrieval paused; previous editorial reviews remain dated and access limitations are visible.
- German federal study source: production checker HTTP 200, 0/2 markers; independent official-page review still displayed the 2026 figure. Cause not established. Signals remain enabled and the unresolved issue stays open even if a later fetch succeeds.

The initial operational review deadline is 2026-09-10. This is a maintainer review target, not a promise that the sources will become accessible.

Preview QA added four explicit issues: IND returned 200 with 1/2 markers; Irish immigration returned 200 but exceeded 1.5 MB; TEQSA retrieval was inconclusive after one transient retry; the French ministerial bulletin returned 403 and is now manual-only. These operational signals do not invalidate the independently read source content. The registry exposes all eleven issues and seven manual-only sources. The Irish source alone now has a bounded 3 MB allowance. Other sources retain the original cap. Missing-marker names and common Unicode hyphen normalization improve diagnostics without rewriting claims.

## Bounded checks and API contract

Preferred endpoint: `/api/intelligence/sources/[country]`. The path accepts only a country in the fixed registry; query strings cannot set a URL or affect source retrieval. The strict legacy `?country=` endpoint remains supported.

The endpoint avoids relying on query transport through connectors. Earlier connector calls to the query endpoint returned 400 although the same-origin browser flow worked; the exact connector behaviour was not established.

At most three source connections per country batch; exact registered HTTPS URLs only; no credentials or profile data; manual redirects (not followed), 8-second timeout, 1.5 MB default streamed cap (3 MB for the registered Irish immigration page), one transient retry, no retry on 401/403. Six-hour cache and in-flight deduplication are retained. Endpoint maximum duration is 60 seconds for bounded batches.

The transport function is dependency-injected for offline tests. A normalized-text SHA-256 is a change signal, not proof of a policy change. HTML entities are normalized, scripts are excluded and empty/challenge bodies are not accepted. Content review dates, claims and unresolved issues are never rewritten automatically.

Client and scheduled-runner validators reject missing, duplicated, foreign or malformed source checks. Country-keyed UI state prevents old-country results from appearing after a destination change. Manual-only entries have no fabricated fresh HTTP status or check timestamp.

## Daily job

The existing GitHub workflow remains daily at 06:47 UTC, with manual and successful-production-deployment triggers. It now imports countries/version from the registry rather than maintaining a second hard-coded list. It reports manual-only sources separately, validates exact report coverage, checks source-content changes and stale/invalid/future timestamps, and flags overdue editorial reviews and unresolved-issue deadlines.

No source fetch automatically certifies factual accuracy. Workflow configuration does not prove a scheduled run completed: inspect the workflow run and its artifact. Only public source metadata and fingerprints are stored; never personal worksheets or raw source pages.

## Release verification

Required: intelligence and mobile tests, TypeScript, lint, production build, Preview UI on phone and desktop, public HTTP/content checks and post-deploy source-check observations. Known third-party restrictions do not count as successful checks or as a TGPI outage. Keep the unrelated Tajikistan image edit out of this release.

Rollback: restore the previously validated production tree through the normal reviewed Git/deployment workflow. Do not rewrite branch history or promote Preview credentials into production.
