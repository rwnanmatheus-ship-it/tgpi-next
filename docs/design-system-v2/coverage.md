# Visual coverage · 9 November 2026

The inventory contains 72 route templates. Shared token and shell migration reaches those routes, but does not imply that every authenticated state or every page has received an individual visual redesign. `coverage-matrix.csv` records every template × required width with verified and outstanding states.

Widths checked: 320, 360, 390, 430, 768, 1024, 1440 and 1920 CSS pixels. All measured pages fit the document viewport horizontally; a stable scrollbar accounts for the 15 px difference in most measurements. Table scrolling remains local to its container.

| Family | Source/template migration | Browser evidence |
| --- | --- | --- |
| Home | Editorial composition, interactive research sample, surfaces | Eight widths; 1440/390 captures; Japan selection updates both tasks and Country Fit URL |
| Countries | Tokens, shell, typography, density, localized controls | Eight widths; desktop capture; search updates URL to `?q=Portugal` |
| Country detail | Shared materials and evidence layout | Portugal at eight widths; evidence/provenance retained |
| Compare | Operational shell, controls and evidence surfaces | Portugal/Canada comparison at eight widths; 390 capture |
| Country Fit | Tokens, shell and form surfaces | Eight widths; public planner rendered |
| Courses | Cards, density, typography | Eight widths; 390 capture; unmatched search renders localized empty state |
| Course detail | Shared materials and controls | Global English at eight widths |
| Study | Focused navigation and shared tokens | Professional Study initial diagnostic rendered at 390 in production; mobile dock suppressed; enrollment and assessments not submitted |
| Workspace/profile | Operational typography and materials | Authenticated Workspace rendered at eight widths in production; no profile mutation performed |
| Atlas/wallet | Navy materials, legibility and controls | Authenticated Atlas preview rendered at eight widths in production; this account has sending disabled; conversation and financial mutations not exercised |
| Pricing | Palette, typography and surfaces | Eight widths; subscription/checkout behavior not exercised |
| Premium | Shared materials and primitives | Membership states remain outstanding |
| Community | Compact hero, institutional surfaces | Eight widths; 390 capture; posting/moderation not exercised |
| Passport/Documents | Shared materials and shell | Passport public view at eight widths; document persistence not exercised |
| Global Key | Shared materials and shell | Authentication gate at eight widths; signed-in identity at 390 and 1920, no overflow |
| Admin/evidence tools | Operational shell and tokens | Unauthorized Admin request returns 404; authorized view remains outstanding |
| About | Shared typography and materials | Eight widths |
| Other institutional/account/dynamic routes | Shared token/primitives migration | Additional 390 px review: Plan, Notifications, Certificates, Intelligence, Resources, policies, Verify, Premium demo, Rooms and Ranking. Other individual states remain outstanding |
| Command search | Native modal, focus, localized matching | Mobile opening; Japan query; arrows focus result; Escape closes and restores trigger focus |
| Primitive specimen | Buttons, fields, badges, tables, tabs, dialogs, states | Dialog opens; Tab wraps to close; Escape returns trigger focus; ArrowRight selects States tab. Preview only |

## Validation boundaries

- Final local `npm run build` passes all 460 tests and production compilation. TypeScript, focused lint and CSS parse checks pass.
- Canonical text pairs meet WCAG AA in automated contrast tests. This is not a complete WCAG 2.2 audit of every composition, image overlay or third-party control.
- Independent Lighthouse mobile/desktop reports and follow-up are in `finalization.md`. There is no real-user Core Web Vitals dataset.
- Some existing research and community copy remains in its original language. The command descriptions and country exploration controls added in this release have all six locale values.
- Screenshots are representative observations, not exhaustive state coverage. The baseline Home and final Home are at the same 1440 px viewport. `evidence/final-home-1440.jpg` and `evidence/final-home-390.jpg` show the final public composition; installation invitations are now limited to the workspace.
- Preview authentication and production authentication are separate environments. No payment, identity mutation or privileged action was performed for visual QA.

## Production follow-up

- Final application commit `090dc2012dc45239a326fa8354432f5eb4993a8e`, deployment `dpl_B5euvm4Sp5rjMvjtL63bMtxXACKQ`, reached READY and was verified on the official domain. Final Lighthouse: desktop 99, mobile 70; accessibility, best practices and SEO 100 on both. Mobile LCP remains 6.6 s and below the target. See `finalization.md` for the independent report and limitations.
- Production deployment `dpl_7ioSPDQC59AS6VmXZev8uGvDf4ns` reached READY and both official domains were assigned. The Canada sample and linked Portugal/Canada comparison were exercised on the official domain.
- Existing production session enabled read-only Workspace and Atlas checks; aggregate dimensions are in `production-metrics.json`. Private account screenshots were not added to this repository.
- Runtime error/fatal query on that deployment returned no matching records during the verification window. This is a sampled observation, not an uptime guarantee.
- The Global English `/study` URL is not a valid professional-study route. Its 404 exposed a low-contrast inherited fallback. A shared, localized `MissingPage` now handles root and country 404 states with canonical materials and recovery links. The valid professional-study page was inspected without enrollment or assessment submission.
