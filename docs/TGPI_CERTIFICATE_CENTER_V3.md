# TGPI Certificate Center V3

The `/certificates` workspace now prioritizes earned certificates and the next available learning achievement. The introductory capability rail is replaced by compact workspace navigation, a learner summary and a responsive portfolio.

- Reads actual issued records and canonical `global-english-2026` certification progress independently; service failures do not appear as an empty portfolio.
- Shows available course, lesson completion and certification requirements separately. Lesson completion does not itself imply certificate eligibility.
- Supports certificate search, status filtering, sorting, public-link sharing and direct PDF download.
- Preserves revoked history, JSON evidence export, public verification and existing issuance requirements.
- Adds an authenticated owner-only PDF endpoint at `/api/credentials/[id]/pdf`. It verifies the live issuer signature and lifecycle before generating an A4 landscape certificate. Responses are private and uncached.
- Embeds licensed DejaVu font and TGPI crest assets; Next.js output tracing includes both assets.
- Keeps UI text in English, consistent with the platform.

## Validation

Production build and TypeScript checks passed. Learning credential, PDF, route authorization, intelligence, workspace, personal plan and capability-system tests passed. A generated fixture PDF was rendered and inspected visually.

An authenticated production course-to-issuance-to-download flow has not been exercised. Browser viewport QA was unavailable because the Chromium download failed in this environment. No learner records or issuance rules were reset or changed.
