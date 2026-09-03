# TGPI Decision Dossiers and Decision Lab v2

Date: 2026-09-03. Built from production `844bfbba23cb82553b5f5ccedcf3956579d215c0`, local tree `5d0fae1a9a53ad00d12ff3155033fc93351af42d`. Independent SEO branch is not merged.

## Delivery boundary

Eight initial destinations: Portugal, Spain, France, Germany, United Kingdom, Canada, United States and Japan. Coverage is intentionally uneven and displayed by layer. Seventeen short source-linked summaries; nineteen registered source pointers, of which seventeen had retrievable content and two remain unconfirmed. This is not eight complete legal dossiers, a university accreditation engine, or a full international work-rights dataset.

Four cost references: Oxford 2026/27 single-student living range, undated DAAD national planning range, historical 2023 JASSO student survey, and MIT 2026/27 nine-month standard graduate total cost of attendance. They have different currencies, periods, populations and inclusions; the UI never ranks or silently converts them. Visa funds requirements are not cost references.

Fresh-source findings: IRCC's 2026-08-28 page states CAD 23,448 for one applicant outside Quebec from 2026-09-01, excluding tuition and transport. UK money guidance lists GBP 1,529 / 1,171 monthly, up to nine months, with important individual and evidentiary exceptions. Germany's federal page identifies EUR 11,904 for the admitted-student blocked-account option in 2026; it also describes a separate study-place-seeking route, whose values must not be mixed with this route.

## Provenance and known gaps

`src/lib/intelligence/dossiers.ts` is the reviewed source registry and claim catalog. Each claim links one source and names its audience, boundaries, reference period, review date, review interval and research questions. Source checking does not certify legal or personal applicability. Requirement summaries normally expire for editorial review after 30 days; others after 90 unless a more conservative interval or reference-period boundary applies.

Sources were opened through current web research. AIMA returned tool-side 502 twice; its source pointer remains unconfirmed and automatic retrieval is disabled. QEDU's interactive content was not retrievable; its pointer is unconfirmed, with no asserted degree records. The Spain consular page returned 403 and was not retried or bypassed. Spain's EU overview is limited to general orientation, not current legal thresholds. France-Visas is used only for route selection and enrolment evidence, not its other potentially dated statements. ULisboa's old living-cost page included obviously dated monetary references and was excluded; its explicit 2026/27 fee-category policy was used instead. Japan's visa page is explicitly dated 2023 and that date is retained.

No institutional partnership, accreditation or endorsement is implied. The World Bank statistical license does not apply to unrelated editorial sources. Store only paraphrased selected facts, attribution and URLs, not copied full articles or publisher assets.

## Automatic source checks

`/api/intelligence/sources?country=<registered-country>` accepts exactly one allowlisted country and no arbitrary URL. It retrieves at most three registered source pages concurrently, each with an eight-second timeout, 1.5 MB streamed-body cap and at most one transient retry. 401/403 stop immediately. Redirects are reported for review rather than followed. Failed requests do not alter editorial claims or review dates. Results are cached for six hours. Page text never reaches the client: only status, selected marker counts, normalized-text SHA-256 and dates are returned.

The daily `dossier-source-watch.yml` workflow reads the public endpoint, compares available fingerprints with the prior Actions cache, archives a report for 90 days and marks review signals as a failed check. The first run has no comparison baseline; cache eviction also removes that baseline. A hash change can reflect layout edits, not a changed law. A stable marker or hash does not guarantee correctness. A successful deployment is not evidence that the scheduled job ran. Verify actual workflow results separately.

## Private worksheet

One explicitly saved active worksheet per account, under the dedicated Clerk metadata key `tgpiResearchWorksheet`. GET and PATCH use the authenticated session owner, never a payload user ID. PATCH requires exact same-origin JSON, a streamed 4096-byte limit and strict field/country/currency/date/range validation. Public source checks never access account state.

The worksheet contains user-authored city, one currency, 1–60 months, five monthly expense categories, tuition for the whole selected period, arrival costs, contingency, quote date/note and five self-reported research checkpoints. Blank is unknown, not zero. Arithmetic uses integer currency minor units and rounds the contingency once. Currency changes clear amounts and quote references. No FX, affordability approval, visa eligibility score, funding assurance or authenticated document certification is produced.

Saving only updates the dedicated metadata key; onboarding, shortlist, billing and learning progress are not overwritten. The UI explicitly warns that saving replaces the one active worksheet. Account/country changes remount the worksheet; no browser storage retains private input. Load/save responses check edit revisions to preserve input created during an in-flight request. Guest export is local, explicit JSON download; personal input is not sent to the source providers.

## Release verification

Required: intelligence unit tests (including mocked private API handlers), mobile regression tests, TypeScript, ESLint, premium source contracts, production build and git whitespace checks. Verify actual Preview rendering, missing-data destinations, currencies, unknown versus zero, arithmetic, invalid input, source-check results and responsive layouts. Do not change a real member account during QA. After publication, check public HTTP/content and source API results, and inspect runtime errors. Record any connector/SSO restriction as a tool limitation, not a site outage.
