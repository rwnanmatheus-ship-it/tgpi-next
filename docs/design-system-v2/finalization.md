# Release follow-up · 9 November 2026

## Resolved findings

- Professional Study now uses the shared Button, input and panel styling. Native submit semantics and assessment persistence remain unchanged. Lesson navigation stays visible within its own desktop scroll area. The progress element has an accessible name.
- Atlas modal contains keyboard focus, locks background scroll, restores trigger focus without scrolling, and only dismisses on a true backdrop click.
- Command-search keyboard hints are excluded from its input label. Collapsed product links retain explicit accessible names.
- PWA installation is offered in the personal workspace only. Acquisition and study stay unobstructed. Offline and controlled-update notices remain global; dismissal behavior is covered by the existing runtime fixture.
- Browser theme and install surfaces use the official palette.
- Root loading reserves a viewport before the footer. This addresses the footer movement identified in the initial desktop Lighthouse report.
- Home provides media-specific responsive image preloads and lighter mobile delivery (quality 75, same approved crop).

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
- Final published report and smoke results are recorded after deployment.
