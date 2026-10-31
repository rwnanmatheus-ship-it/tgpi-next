# Localization coverage and release validation

The language preference supports English, Brazilian Portuguese, Spanish, French, German and Italian. Account metadata is the authenticated source of truth; visitors use the preference cookie. The server resolves the preference once per render. Saving a language also notifies other tabs without transmitting identity or profile fields. Authentication transitions refresh server state instead of posting potentially stale browser metadata.

`npm run test:localization` checks the six catalogs, preference validation, server/account precedence, privacy/cookie/refund policy rendering, Atlas, rehearsal controls and stable learning identifiers. Existing course transaction, assessment and credential tests remain required.

Run `node scripts/localization-audit.mjs --json` for an inventory of unregistered literal interface strings and their source locations. It intentionally reports incomplete coverage. It is **not** a certification that all pages or course content have been translated: curriculum data, dynamic templates, API responses, downloadable materials and certificates require their own inventories and validation. Course language exercises, user submissions, names and signed credential facts must retain their original meaning and identifiers.

The current changes complete the privacy policy and expand learning-interface localization. They do not claim complete translation of the platform. Remaining areas include substantive curricula, some account/community/research/document screens, terms, billing terms and downloadable learning material.
