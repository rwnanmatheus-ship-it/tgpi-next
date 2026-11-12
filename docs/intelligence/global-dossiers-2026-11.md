# Global dossiers, research edition 3.0.0

Published research scope: 195 existing TGPI country identities, 12 research chapters per destination, 153 distinct source records on 144 hostnames. International resources are counted once; national records and shared international sources are labelled separately. This is complete **structured research coverage**, not complete verification of every country's immigration, tax, professional or local cost rules.

## Evidence layers

- Preserve the existing nine country indicators and all prior source-specific summaries and cost references.
- Add twelve WDI series: labour participation, youth unemployment, employment/population, education spending, adult literacy, direct household health spending, physician density, fixed broadband, consumer inflation, real GDP growth, basic drinking water and renewable electricity output.
- The additional snapshot contains 2,163 observations. Values retain their reference year, producer, exact API query, source-update date, collection timestamp and response SHA-256. No gap filling, invented budgets, personal country scores or implicit currency conversion.
- Reference-age limits vary by indicator. The additional collection becomes overdue after 90 days. The UI shows missing, historical and overdue values separately.
- Twelve chapters distinguish observed statistics from research tasks. The legal, housing and personal-budget checklist is a research framework, not country-specific legal advice.

## Source review

The national-office expansion used the UNSD institutional directory, followed by individual portal retrieval and editorial screening. HTTP 200 was insufficient: unrelated commercial content, default pages, empty bodies, obsolete targets and redirected image files were excluded. Shared Pacific portals were counted once. International directories were also used to capture observed destination links for WHO, ILOSTAT, FCDO and ENIC-NARIC rather than inventing deep URLs.

`research-sources.json` records publisher, URL, topic, applicability, review scope, institutional provenance and access result. A publisher/portal review does not certify all content on that portal. Restricted sources retain a restricted/manual access label and a separate institutional provenance link.

An explicit comparison against primary-source content renewed 25 existing summaries tied to 23 source records on 11 November 2026. The evidence audit is `editorial-review-20261111.json`. Existing costs, reference periods and exclusions were retained. Successful retrieval alone never renews a claim.

Six old source records remain open: `es-ruct`, `nl-study`, `au-cricos`, `pt-aima`, `de-visa`, `es-qedu`. RUCT returned a maintenance response; the Netherlands page did not expose all selected requirements in the retrieved content; the other records retain their unresolved access/content limitations. Earlier issues remain in the historical issue map. Automatic retrieval disabled after earlier restrictions remains disabled, even after an explicit editorial recheck.

## Delivery and maintenance

- `/intelligence`: all-source discovery with country/topic/search filters, scope/access metadata and copyable citations; the original study-review register remains available.
- `/intelligence/research`: searchable directory for all 195 country dossiers.
- `/countries/[slug]#global-dossier`: twelve chapters, goal filters, local search, linked statistics, publisher references and next-step outputs.
- `/api/intelligence/dossiers`: machine-readable coverage index.
- `/api/intelligence/dossiers?country=brazil`: exported country dossier; unknown countries return 404.
- Run `node --experimental-strip-types scripts/refresh-deep-context.mjs` for an explicit data refresh. The collector validates pagination, identity, indicator, numeric ranges, chronology and coverage regression before atomic replacement; failed series keep original dates and values.

The research interface and chapter content use the existing six-language localization system. Publisher names and original publication titles preserve source identity. No user progress, billing, permissions, account data or original worksheet values are migrated.

## Validation

Regression tests cover all 195 identities, chapter-source mappings, resource deduplication, safe fixed URLs, excluded obsolete domains, observed country links, unique observations, missing data, historical/stale states and rejection of corrupt source responses. Existing dossier/provenance tests were updated for the explicit November review rather than changing expected semantics of automated availability checks.
