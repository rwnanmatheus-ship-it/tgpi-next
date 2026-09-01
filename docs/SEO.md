# TGPI Global SEO Engine

## Positioning

TGPI is a global education and decision-intelligence platform for people comparing where to live, work, study and build an international life.

The canonical production origin is:

`https://www.theglobalpolymath.com`

All metadata, structured data, sitemap URLs, image URLs and share URLs must resolve to that hostname.

## Architecture

The reusable SEO foundation lives in `src/seo/`:

- `config.ts`: brand, hostname, locale, images and URL utilities.
- `metadata.ts`: public, private and noindex metadata builders.
- `policy.ts`: public sitemap routes and protected route families.
- `countries.ts`: priority-country quality gate and country metadata.
- `schemas/`: Organization, WebSite, Founder, Country, Course and Breadcrumb schemas.
- `json-ld.tsx`: safe JSON-LD renderer.
- `urls.ts`: canonical route builders.

Internal search uses `src/lib/tgpi-search.ts`. It shares country, course and platform entities with the public product instead of maintaining a disconnected list.

## Index policy

Indexable:

- Homepage and institutional trust pages.
- Countries hub.
- Compare product landing page.
- Public course catalogue and public course overview pages.
- Documents guest experience.
- Only country profiles that pass the current priority quality gate.

Noindex:

- Account, authentication, profile and onboarding pages.
- Private course lessons.
- Checkout and account-status pages.
- Admin, notifications and private community spaces.
- Internal search results.
- Public-user routes until explicit publication consent and content-quality rules exist.
- Country pages outside the current priority set. They remain accessible and followable but stay out of the sitemap.

The quality gate is intentionally conservative. A country must not be added to `priorityCountrySlugs` solely because an image and generated template exist. Before indexing, confirm that its page contains materially distinct guidance, reasonable data, source provenance and a real editorial review.

## Country publication gate

Before adding a slug to the indexable set:

1. Validate country identity, capital, languages and currency.
2. Replace generic text with country-specific guidance.
3. Review all cost and score values for scale and interpretation.
4. Record source URLs and the real review date.
5. Confirm the image, alt text and surrounding context.
6. Confirm a useful comparison path and product CTA.
7. Validate canonical, metadata and JSON-LD.
8. Run all project gates.

## Required checks

```bash
npm run typecheck
npm run lint
npm run verify:seo
npm run build
```

After a preview deployment:

1. Inspect `/`, `/countries`, `/countries/portugal`, `/compare`, `/courses`, `/courses/english-abroad`, `/founder`, `/editorial-policy`, `/robots.txt` and `/sitemap.xml`.
2. Validate structured data with Google Rich Results Test and Schema Markup Validator.
3. Confirm every canonical uses the `www` hostname.
4. Confirm private and search pages emit `noindex`.
5. Confirm query-parameter Compare URLs canonicalize to `/compare`.
6. Check mobile and desktop rendering.

## Search Console rollout

After production approval:

1. Verify the domain property. Do not add a verification token to source until Google provides the real value.
2. Submit `https://www.theglobalpolymath.com/sitemap.xml`.
3. Inspect the homepage, Countries, Compare and five priority country URLs.
4. Monitor Page Indexing, Core Web Vitals and Enhancements.
5. Review queries by country and intent every week.
6. Track the product events that follow organic landings: Compare started, country saved, account created and premium intent.
7. Expand the country quality gate only after pages meet the publication standard.

## Multilingual rule

Do not emit `hreflang` until complete localized URLs exist. When English, Brazilian Portuguese and Spanish versions are real, each page must include reciprocal alternates, a self-canonical URL and translated visible content and metadata.

## Content safeguards

- No doorway pages or mass comparison permutations.
- No invented update dates, reviews, authors, sources or statistics.
- No schema that describes hidden or unavailable content.
- No automatic creation of all 18,915 country pairs.
- No legal, financial, migration, safety or health claim without appropriate context and source discipline.
