# Production rollout — 9 November 2026

This is a verified incremental release. It does not close the entire master programme; see the explicit remaining acceptance in RELEASE.md and IMPLEMENTATION.md.

| Item | Verified result |
| --- | --- |
| Production commit | `ab4ba49c5fcea2f786d1a9edafd8630f72db5b86` |
| Production branch | `fix-deploy-hoje` |
| Production deployment | `dpl_3NNpoBhBvX8EVmSPUk416ZUtW6KH` — READY |
| Public URL | https://www.theglobalpolymath.com |
| Aliases verified | www.theglobalpolymath.com and theglobalpolymath.com |
| Preview | https://tgpi-next-563rl2e8e-rwnanmatheus-ship-its-projects.vercel.app |
| Preview deployment | `dpl_E1iBaEzrfKyUxk8ZCWWNDPkSYYhp` — READY |
| Previous pre-release production | `dpl_2SUnba6ugDNL5utUqZKtvgrP8TFs`, commit `ccb9ff5617d0dca2d494ca07893ccc20607919f9` |

## Checks after deployment

- Exact final commit passed 400 tests, TypeScript and affected-file lint. Both final Vercel builds completed successfully. No dependency update, schema migration or permission change was included.
- On the first production candidate, 58 guest HTTP requests returned 54 successful page responses (including expected redirects to login) and four expected 401 private-API responses. No 5xx or server-exception HTML appeared. Exact requests and observed timings are in evidence/production-smoke.json. These timings are not a Core Web Vitals benchmark.
- After the final copy correction, authenticated /profile and /courses were reloaded. Both rendered the same three retained learning records and continuation destinations, with no unavailable-source notice. Dynamic statuses rendered “Em andamento” and the saved work goal rendered “Trabalhar globalmente”. This account had no professional enrolment, so live mixed-system enrolment remains untested.
- The learning summary endpoint rejected a guest with 401 and Cache-Control private, no-store, max-age=0. The controlled handler test also covers authenticated uid ownership and error responses. Source records were never rewritten by the summary.
- The guest authentication screen showed the TGPI brand instead of the technical Clerk application name. Installation dismissal remained effective after a reload in preview.
- Vercel error-level logs scoped to the final production deployment returned no entries in the immediate inspection ending 17:48 UTC. This is a short observation window, not a guarantee of future availability.
- No charge, subscription, lesson checkpoint, project submission, certificate issuance, account deletion or external message was used for validation.

## Preservation and rollback

Both production ref updates used expected-SHA leases. Existing unpublished working copies were preserved. All production code changes are descendants of the original production commit. No database migration or data rollback is necessary for this release. If a regression appears, restore the preserved prior Vercel deployment or deploy an additive revert commit after inspecting concurrent changes.

## Unfinished programme work

Human curriculum acceptance and full certification journeys; controlled Free/Premium/reviewer/moderator test accounts; Stripe sandbox lifecycle; live Atlas capability and budget checks; deployed Firestore policies; durable cross-provider history; advanced Premium scenarios and exports; remaining art families; complete editorial localization, accessibility and browser matrix; and measured field performance remain open. The route matrix distinguishes inventory, HTTP checks and manual observations. None of these pending gates is claimed as completed.

This documentation-only follow-up is stored on the review branch; the production code commit remains the exact commit listed above.
