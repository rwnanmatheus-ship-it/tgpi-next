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
