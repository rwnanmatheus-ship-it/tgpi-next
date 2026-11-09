# Organic discovery and SEO health

The canonical public origin is https://www.theglobalpolymath.com. The apex
domain redirects there. Metadata, structured data, robots.txt and the sitemap
must agree. Each public landing page uses its own canonical URL.

The sitemap is generated from the maintained public route list and country
catalog at build time. It excludes private/noindex pages and redirects.
Do not add current timestamps as lastmod unless content actually changed.
Do not publish generated doorway pages, unsupported statistics or fake reviews.
Country Fit and member pages retain their existing indexing restrictions.

## Automatic checks

SEO health runs at 08:23 UTC daily, after successful production deployment
events, and manually from GitHub Actions. Scheduled runs depend on GitHub
Actions being enabled and may be delayed. It does not require API keys.

Each run verifies robots.txt, all sitemap URLs for canonical host and forbidden
routes, all public landing pages, and seven rotating country pages. It checks
HTTP 200 without redirects, canonical URLs, title, description, H1 and noindex.
With 195 countries the rotation covers every profile within 28 daily runs.
Checks are sequential to limit load. Failure marks the workflow red and
preserves a JSON artifact for 30 days. GitHub notification delivery depends on
the repository owner's notification settings; this is not a guaranteed alert.

Run locally:
- npm run test:seo
- npm run verify:seo

This is technical discovery and regression monitoring, not a traffic generator.
It cannot force crawling, indexation, ranking, registrations or Premium sales.
It never submits forms, sends messages, purchases ads or manufactures visits.

## Search engine ownership and measurement

An authorized owner should verify the canonical domain in Google Search
Console and Bing Webmaster Tools and submit:
https://www.theglobalpolymath.com/sitemap.xml

No ownership verification, search-engine submission or analytics activation
is implied by this implementation. Use verified impressions, clicks, qualified
registrations and paid subscriptions to evaluate results over time. Existing
funnel analytics remains opt-in under its current configuration and consent
rules. Do not enable new tracking or publish personal information for SEO.

When the audit fails, inspect its exact page and report before editing. A valid
noindex or redirect belongs outside the sitemap rather than being removed just
to make checks pass. Review content with official sources before publishing.

## Institutional identity and imagery

Home titles and visible introductory text identify both TGPI and The Global
Polymath Institute. Organization structured data uses the existing public legal
page for the operator name and corporate contact; it does not assert academic
accreditation, a physical campus, awards or guaranteed outcomes. The About page
explains the product and links to company information.

The existing crest is the organization logo. The square 512px brand icon is
used as the favicon. Home and About editorial images are listed in the sitemap,
with the home image also in Open Graph, Twitter and ImageObject metadata.
Editorial scenes are conceptual imagery, not evidence of actual offices or
students. Do not label them as company premises or documentary photography.

Google can choose a different title, snippet, favicon or image. These changes
make assets and identity easier to understand; they do not guarantee a logo,
thumbnail, knowledge panel, sitelinks or a deadline for search-result changes.

## Public research guides

`src/lib/public-guides.ts` is the reviewed editorial registry for `/guides`.
Each entry produces a public article, internal links and a sitemap entry with
its actual editorial review date. The existing daily production audit discovers
these URLs from the sitemap automatically; no additional traffic job is needed.
Do not update dates mechanically or generate country-keyword doorway pages.
Add only distinct, useful guides with a real checklist and official source
starting points. Review legal/immigration statements before publication.

Resources links to the guide hub; articles link to each other and a relevant
public tool. The guides are readable without registration and include a reusable
research worksheet. They add no cookies, trackers or automatic outbound messages.

Measurement remains dependent on authorized Search Console access and existing
consent-based funnel configuration. Compare guide impressions, search clicks and
landing-page engagement over a meaningful period; do not count this audit’s
requests as audience growth. This release does not activate analytics, verify
search ownership or promise traffic. Review sources and guide content when rules
change. `npm run test:all` checks the editorial registry and discovery wiring.
