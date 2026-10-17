# TGPI account access V2

Routes: `/sign-in`, `/sign-up`, `/welcome`, `POST /api/registration`.

The existing Clerk components continue to handle credentials, recovery, CAPTCHA, email verification and any enabled social connections. The responsive shared shell uses a new generated editorial library image, the official crest and the existing Manrope / Cormorant font system. Authentication styles are scoped so account management remains compatible.

Registration: Clerk account creation and verification → `/welcome` → first name, last name, country of residence, preferred language and terms acknowledgement → `/onboarding`. The server requires an authenticated user with a verified primary email. The endpoint bounds streamed JSON to 4 KB, requires same-origin requests, validates an allowlisted payload, and never accepts a user ID, role or subscription flag from the client. Names and country/language synchronize with the existing account profile. The registration acknowledgement is recorded in server-only private metadata; it is not used as an authorization claim.

## Production configuration still required

At inspection on 2026-10-17 the public Clerk production configuration had no social connections. Email verification, CAPTCHA, breached-password checks, a 15-character password minimum and user lockout were enabled. Authenticator apps and backup codes were disabled. This release does not claim to enable infrastructure settings.

In the **production** Clerk instance, configure Google, Microsoft and Apple under SSO connections. Register production OAuth applications, use the exact callback URI shown by Clerk for each connection, set credentials directly in the provider dashboard and Clerk, and enable sign-in/sign-up. Microsoft must allow the intended personal/work account audience. Apple requires the appropriate Apple developer configuration, Services ID, domain verification and signing credentials. Do not put provider secrets in the browser or repository. The existing Clerk widgets automatically render the enabled connections as full-width social buttons; no fake provider buttons are added.

Optional security configuration: enable authenticator-app MFA and recovery codes, then verify enrollment/recovery before making MFA mandatory. Review disposable-email blocking and enumeration protection against the intended customer experience. No existing accounts or progress are reset.

## Validation

`npm run typecheck`

`node --experimental-strip-types --test scripts/registration.test.mjs`

Targeted ESLint on changed TS/TSX files and production build. A real account must complete email verification and `/welcome` to validate the authenticated write; production social providers cannot be tested before credentials are configured.

## Image asset

`public/images/auth/tgpi-global-library-v1.webp`, optimized from a 1024×1536 generated original. Built-in image generation; prompt: photorealistic contemporary international research library, navy and brass globe, dark oak desk, notebook and subtle laptop, sunlit city through glass, restrained navy/gold/off-white palette, realistic architectural photography, no lettering or watermark. The illustration is aspirational brand imagery, not a representation of TGPI-owned premises.
