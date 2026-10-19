# Preview publication evidence

- Project: `tgpi-next` / `prj_h2jvhmmxV4MGyvdTWEjcqO4rxdIk`.
- Team: `team_BWajFMOKTF5waYCr84DUVIjJ`.
- Pull request: https://github.com/rwnanmatheus-ship-it/tgpi-next/pull/80 (draft).
- Application commit: `cd759e4b0b39eb779d3a72ac0a7d3d51793e1473`.
- Preview deployment: `dpl_48gHdad6kagKMeqfkcVWNCn1hxvV`.
- Preview URL: https://tgpi-next-f9lnfavfa-rwnanmatheus-ship-its-projects.vercel.app
- Vercel state confirmed: `READY`; target `null` (Preview), not production.
- Remote default compiler: Next.js 16.3.4 Turbopack, compiled successfully in 20 seconds; Vercel output build completed in 49 seconds.
- Local final application checks: TypeScript and lint passed; production build with Webpack passed; no whitespace errors.

## Live smoke-test limitation

Attempted GETs to `/api/members`, `/api/member-identity` and `/api/account-data` through Vercel's protected-fetch connector all returned `deployment_authentication_required` after the connector's share-link redirect retry. These responses belong to deployment protection. **They do not demonstrate application-level Clerk 401 behavior or successful application requests.**

No mapped CLI fallback was available: Vercel CLI is not installed and VERCEL_TOKEN is not configured. Deployment protection was not disabled and no access-control policy was expanded. Authenticated functional validation remains pending.

The source revision is ready for review. Production was not merged or promoted. This documentation may be committed after the application revision above; it does not change that deployed application code.
