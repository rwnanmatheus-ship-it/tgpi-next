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
| Study | Focused navigation and shared tokens | Source/test verification only; authenticated lesson and assessment interactions remain outstanding |
| Workspace/profile | Operational typography and materials | Authentication gate checked; personalized content remains outstanding |
| Atlas/wallet | Navy materials, legibility and controls | Authentication gate checked at 390; conversation and financial states remain outstanding |
| Pricing | Palette, typography and surfaces | Eight widths; subscription/checkout behavior not exercised |
| Premium | Shared materials and primitives | Membership states remain outstanding |
| Community | Compact hero, institutional surfaces | Eight widths; 390 capture; posting/moderation not exercised |
| Passport/Documents | Shared materials and shell | Passport public view at eight widths; document persistence not exercised |
| Global Key | Shared materials and shell | Authentication gate at eight widths; signed-in identity not inspected |
| Admin/evidence tools | Operational shell and tokens | Unauthorized Admin request returns 404; authorized view remains outstanding |
| About | Shared typography and materials | Eight widths |
| Other institutional/account/dynamic routes | Shared token/primitives migration | Individual browser review remains outstanding |
| Command search | Native modal, focus, localized matching | Mobile opening; Japan query; arrows focus result; Escape closes and restores trigger focus |
| Primitive specimen | Buttons, fields, badges, tables, tabs, dialogs, states | Dialog opens; Tab wraps to close; Escape returns trigger focus; ArrowRight selects States tab. Preview only |

## Validation boundaries

- Final local `npm run build` passes all 460 tests and production compilation. TypeScript, focused lint and CSS parse checks pass.
- Canonical text pairs meet WCAG AA in automated contrast tests. This is not a complete WCAG 2.2 audit of every composition, image overlay or third-party control.
- No Lighthouse/Core Web Vitals number is claimed. No new motion/3D dependency was added; existing optimized image assets remain in use.
- Some existing research and community copy remains in its original language. The command descriptions and country exploration controls added in this release have all six locale values.
- Screenshots are representative observations, not exhaustive state coverage. The baseline Home and after Home are at the same 1440 px viewport; the after capture includes the pre-existing install prompt.
- Preview authentication and production authentication are separate environments. No payment, identity mutation or privileged action was performed for visual QA.
