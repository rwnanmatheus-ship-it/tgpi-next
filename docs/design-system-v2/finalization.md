# Release follow-up · 9 November 2026

## Published release

The new design is live at [theglobalpolymath.com](https://www.theglobalpolymath.com/). Final application commit: `090dc2012dc45239a326fa8354432f5eb4993a8e`. Production deployment `dpl_B5euvm4Sp5rjMvjtL63bMtxXACKQ` reached READY. The official domain was reloaded after deployment and the new image delivery was observed.

[Final independent PageSpeed report](https://pagespeed.web.dev/analysis/https-www-theglobalpolymath-com/9mp6lfihba), generated 9 November 2026 at 18:32 BRT, Lighthouse 13.6.0:

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 70 | 99 |
| Automated accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 1.8 s | 0.3 s |
| LCP | 6.6 s | 0.9 s |
| TBT | 170 ms | 20 ms |
| CLS | 0 | 0.005 |

**Mobile performance remains below the target.** The mobile LCP did not improve in these lab runs. The report identifies the hero as the LCP element, render delay, and approximately 291 KiB of unused JavaScript, mostly authentication UI. The root loading boundary and image hints have been corrected, but these changes do not establish that the remaining bottleneck is solved. Further profiling of hydration and third-party authentication delivery is required without compromising sign-in. No real-user Core Web Vitals dataset was available. A score of 100 in automated accessibility is not a complete WCAG 2.2 AA certification.

The final application build, TypeScript and all 460 tests passed. The sampled production error/fatal log query covering approximately 21:23–21:33 UTC returned no records. This is an observation window, not an uptime guarantee. Public before/after screenshots and the explicit page/state/width coverage matrix accompany this report. Paid membership, authorized Admin, destructive actions and all individual states across the 72 templates are not fully verified; the matrix retains those gaps.

## Resolved findings

- Professional Study now uses the shared Button, input and panel styling. Native submit semantics and assessment persistence remain unchanged. Lesson navigation stays visible within its own desktop scroll area. The progress element has an accessible name.
- Atlas modal contains keyboard focus, locks background scroll, restores trigger focus without scrolling, and only dismisses on a true backdrop click.
- Command-search keyboard hints are excluded from its input label. Collapsed product links retain explicit accessible names.
- PWA installation is offered in the personal workspace only. Acquisition and study stay unobstructed. Offline and controlled-update notices remain global; dismissal behavior is covered by the existing runtime fixture.
- Browser theme and install surfaces use the official palette.
- Shared route loading reserves a viewport before the footer. This addresses the footer movement identified in the initial desktop Lighthouse report.
- Home provides media-specific responsive image preloads and lighter mobile delivery (quality 75, same approved crop).
- The eager editorial image uses synchronous decoding; secondary images remain asynchronous. The actual production response includes the Home in the initial document rather than a hidden streamed replacement.
- Member discovery now has a page-level H1 on its standalone route, while the embedded account section retains H2.

## Initial independent lab report

[PageSpeed Insights report](https://pagespeed.web.dev/analysis/https-www-theglobalpolymath-com/zsezuhwdxm) generated at 18:00 BRT against production `758f38b` with Lighthouse 13.6.0.

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 74 | 84 |
| Automated accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 1.4 s | 0.3 s |
| LCP | 6.4 s | 1.0 s |
| TBT | 20 ms | 0 ms |
| CLS | 0 | 0.299 |

Lab results are estimates, not field Core Web Vitals. The service reported no real-user dataset. The initial desktop CLS finding identified the footer arriving inside the loading viewport; mobile LCP identified the hero image. Authentication UI accounted for most of the reported unused third-party JavaScript; authentication was not weakened or removed for a score.

## Verification

- TypeScript and focused ESLint passed.
- All 460 tests passed; production compilation passed.
- Additional signed-in Global Key at 390 and 1920: one main landmark and no horizontal overflow. No identity or sharing mutation.
- Premium redirected this account to the membership offer; 390 px layout fits. No checkout submitted.
- Preview Atlas checks confirmed Tab containment, Escape dismissal, focus restoration and scroll restoration. No AI request was sent.
- Professional Study was checked on the official domain at 390 px: native submit button uses the navy token, shared textarea renders, mobile dock and install invitation are absent. No enrollment or assessment was submitted.
- Additional routes and aggregate dimensions are in `expanded-production-metrics.json`. Member discovery exposed a missing page-level heading; it now selects H1 for the standalone page and keeps H2 when embedded in account settings.
- Admin returns the intended unavailable page for this session. Authorized administrative, paid membership and destructive states remain outside observed browser coverage.

## First published follow-up

Production `69c3b80`, deployment `dpl_FkABfeSLHsPyMcCpbWpgZQZ9Ma8W`, reached READY with both official domains. [Independent follow-up report](https://pagespeed.web.dev/analysis/https-www-theglobalpolymath-com/tmkx24msef), 18:10 BRT:

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 72 | 99 |
| Automated accessibility / best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| LCP | 6.6 s | 0.8 s |
| CLS | 0 | 0.005 |

The loading-space correction resolved the major desktop shift. Mobile needed further investigation rather than claiming improvement from image hints alone. Home composition now renders synchronously, using the existing locale context for text and landmark names, and preserving locale-aware observation dates. This removes a redundant asynchronous locale boundary from the acquisition page. Authentication UI remains on its supported default configuration.

The root loading boundary continued to hide the Home hero until the streamed replacement arrived. It is now scoped to the 47 tool/content route segments, all re-exporting one `PageLoading` component. Profile and Global Key retain their specialized loading states. The Home can arrive in the initial document; tool navigation retains instant feedback. All 460 tests, TypeScript and production compilation pass after this routing change.
