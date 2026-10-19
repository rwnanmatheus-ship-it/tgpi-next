# Account release checks — 2026-10-19

The user explicitly requested completion of available tests and production publication after reviewing PR #80's previous limitations.

## Additional executed checks

- Real browser access to protected Preview succeeded with the team's temporary Vercel share link. Deployment protection was not disabled.
- Real anonymous requests to `/api/members`, `/api/member-identity` and `/api/account-data` returned the application messages requiring sign-in, rather than Vercel's protection page.
- Actual account React components rendered in a separate Preview-only QA branch with explicitly synthetic fixtures. Six sections were checked at iframe viewport widths 320, 390, 768, 1280 and 1920 CSS px. All 30 observed layout reports indicated no horizontal document overflow. Account text fields used 16px input text on compact viewports.
- A first-name edit was preserved after the real PATCH account API rejected the anonymous session. The UI reported the expired session accurately.
- Tab moved focus from first name to last name. A 200% CSS zoom fixture reported no horizontal overflow. The explicit reduced-motion override produced `animation-name: none` and `transition-duration: 0s`; this verifies the motion-free rendering path, not operating-system media emulation.
- A PNG was generated and downloaded through the actual `createMemberPng` production renderer in the browser. Dimensions 1800 x 1125; 1,948,601 bytes. The downloaded PNG was inspected visually, and jsQR decoded exactly `https://theglobalpolymath.com/member/TGPI-AAAA-BBBB-CCCC`. The fixture has no real member, account or credential data. This checks the browser renderer; it does not assert authenticated photo retrieval or owner-export API success.
- The PDF renderer, embedded fonts/crest, selectable text, pagination and exact QR target were already verified in the preceding review.
- Account suite now has 30 passing tests (one new migration regression); the other previously passing suites bring the verified automated baseline to 168. Final TypeScript and lint pass.

## Corrections from verification

1. The current Clerk username could equal the requested application handle, producing two writes to the same Firestore reservation path. The migration now emits a single reservation write. A regression test asserts every transaction's write paths are unique and exercises this exact case.
2. Account navigation scroll offset now measures the compact section navigator and global scroll padding, instead of scrolling the section heading underneath sticky navigation. The rounded account container uses overflow-clip so it does not create a hidden scroll container that offsets the sticky navigator into the form.
3. Member-identity loading failures replace the initial Loading status with an unavailable message while preserving the profile draft.

## Scope separation

The temporary `member-system-qa` route and synthetic client fixture exist only on `test/member-account-visual-20261019`. They are excluded from the production PR and cannot be used to bypass authentication. The QA server route itself returns notFound outside Vercel Preview.

The application continues to use the existing protected storage namespace and configuration gate. Required server configuration names are present in both Preview and Production; no secret values were decrypted and no environment/security settings were changed.

## Limits retained honestly

No real member sign-in was supplied in the test browser. Authenticated metadata persistence, real concurrent Firestore writes, private/public switching with two real members, actual photo export and Stripe billing-portal creation were not exercised in a live member session. Transaction/visibility/selection branches were tested with isolated service boundaries. No live charge or subscription mutation was performed. Browser history behavior in the nested QA frame was not treated as a full end-to-end passing check.

Existing simultaneous Clerk metadata updates still have no cross-request atomic compare-and-swap; the stale timestamp check protects already-stale submissions, not every simultaneous write. Legacy Firebase profile identities without a verified Clerk mapping fail closed.

These limits are not represented as successful tests. Publication was explicitly requested; authentication guards, opt-in visibility, server-owned billing/progression, the existing storage activation gate and unavailable/error states remain in place.
