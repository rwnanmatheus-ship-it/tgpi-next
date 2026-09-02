# TGPI Intelligence Graph v1

Implementation date: 2026-09-02. Built from the published mobile release, separately from the pending SEO branch.

## Scope and truthfulness

The former dataset generator assigned stable country variations and regional templates to costs, safety, English access and overall scores. Those values have no observation-level provenance. The new public dossiers, directory, Compare and personal workspace do not use them. Legacy source records remain for backward-compatible identity/assets; do not treat their ratings or narrative claims as verified.

All 195 existing country slugs map to UNSD M49 / ISO identifiers, including Holy See (VAT) and State of Palestine (PSE). Identity coverage is not statistical or legal completeness. The exact UNSD source and retrieval timestamp accompany the mapping.

Four World Bank WDI indicators form the first automatic statistical adapter: population, internet use, modeled ILO unemployment and gross tertiary enrollment. They are national context, not cost estimates, safety scores, admission probabilities or immigration eligibility. Missing observations stay missing. Gross enrollment may exceed 100%.

## Data flow

Registered HTTPS API queries → size/time/redirect checks → complete pagination, identifier, value, year and coverage checks → atomic cached snapshot → shared Countries / Compare / Country Fit / profile views.

The public `/api/intelligence` contains only public identities, observations, collection dates, reference years, source dataset update dates, methodology version, revision and response digests. No user data is sent to suppliers or exposed by this endpoint. User state remains behind existing Clerk authorization and activation APIs.

No arbitrary source URL is accepted. Redirects and 401/403 are not bypassed. Transient fetch errors receive at most one retry. Null is not zero. Aggregates and territories outside the declared catalog are excluded. A publication fails if any series falls below its minimum coverage (population 180; other series 100), returns malformed data, duplicates a country, reports future years or incomplete pagination. These are operational gates, not independent validation of statistical methodology.

`unstable_cache` revalidates after one hour on access. Revalidation errors retain the last successful cache entry; a bundled validated snapshot is the cold-start fallback when available. An identity-only fallback never fabricates numeric values. The daily GitHub workflow reads the production API twice (allowing background refresh), checks 48-hour freshness and coverage, and archives the public snapshot for 90 days. No account credentials, new paid infrastructure or database administration are introduced. GitHub schedules can be delayed or disabled after repository inactivity; failures appear in Actions. Review the actual collection date, not merely the existence of a schedule.

## Confidence semantics

- Source checked: collection within seven days, valid operational checks and acceptable reference-year age.
- Older observation: traceable but beyond the indicator-specific year threshold.
- Refresh overdue: collection older than seven days; retain original dates.
- Not available: no usable observation or successful collection.

Labels are not truth probabilities. No artificial 0–100 confidence or fit score is published. Institutional authority does not establish personal applicability. Comparison discloses differing years and withholds rankings when information is missing.

## Product integration

- `/countries`: alphabetical research directory, search, regions, optional lazy-loaded atlas, compare shortlist.
- `/countries/[slug]`: identity, four evidence cards with source/date/limitations, explicit missing layers, user-entered USD budget, reviewed portal where present, existing private checklist/save flow.
- `/compare`: existing share/save builder with evidence matrix; goal lenses now organize questions rather than weighted synthetic ratings.
- `/country-fit`: goal, budget, timeline, profession and languages inform transparent research tasks. Page-local edits are explicitly not saved automatically.
- `/profile`: existing saved onboarding context feeds the same planner, with existing activation persistence preserved. Shortlist order follows user selection. Progress is not legal approval.
- `/intelligence`: published methodology, real coverage, confidence semantics, updates, licensing links and interactive evidence-literacy practice.
- Home, Learning, footer and mobile goal entry connect to this core. Authentication and payment settings are unchanged.

Budget migration: historical saved estimates are never silently relabeled into USD; the editor restores only a matching currency. No invented country baseline is supplied. Users must enter a new estimate based on their own dated quotes.

## Not yet delivered

195 country-specific legal dossiers; reviewed city cost series; institution/program/licensing datasets; continuous event feeds; independently audited scoring; automatic legal interpretation; multilingual editorial validation. Five destination-government portals are initially registered as research links, not certified legal rules. Further sources require review of scope, methodology, licensing and jurisdiction before publication. No university affiliation or accreditation is implied.

## Release gates

Run `npm run test:intelligence`, `npm run test:mobile`, `npm run typecheck`, `npm run lint`, `npm run verify:premium` and `npm run build`. Validate an actual Preview API collection, observations and all critical public routes. Confirm 320px/390px/desktop layouts, empty states, source links, context-sensitive plan, country search, comparison, budget input and learning interaction. Do not access private member records in QA. Verify the production branch has not advanced and perform a fresh Production build; never promote Preview environment credentials. Preserve previous production SHA for rollback.
