# Localization coverage and release validation

The language preference supports English, Brazilian Portuguese, Spanish, French, German and Italian. An explicit preference cookie takes priority on the current device; account metadata restores the preference on a new device. The server resolves the preference once per render. Saving a language also notifies other tabs without transmitting identity or profile fields. Authentication transitions refresh server state instead of posting potentially stale browser metadata.

`npm run test:localization` checks the six catalogs, preference validation, server/account precedence, privacy/cookie/refund policy rendering, Atlas, rehearsal controls and stable learning identifiers. Existing course transaction, assessment and credential tests remain required.

Run `node scripts/localization-audit.mjs --json` for an inventory of unregistered literal interface strings and their source locations. It intentionally reports incomplete coverage. It is **not** a certification that all pages or course content have been translated: curriculum data, dynamic templates, API responses, downloadable materials and certificates require their own inventories and validation. Course language exercises, user submissions, names and signed credential facts must retain their original meaning and identifiers.

The current changes complete the privacy policy and expand learning-interface localization. They do not claim complete translation of the platform. Remaining areas include substantive curricula, some account/community/research/document screens, terms, billing terms and downloadable learning material.

## November 2026 interface correction

Added 551 complete six-language entries and connected static interface copy across the public, account, country, community, notification and learning surfaces. Pricing benefits, comparison rows, billing FAQs, About pillars and mobile intent content now render through the catalog. Supported attributes in client controls translate with the same context. Unknown copy remains in its source language; no external translation API, DOM mutation or AI billing is introduced.

Catalog lookup accepts whitespace differences and unambiguous existing-language aliases. Decorative arrows and section numbers are preserved separately. Values, identifiers, user contributions, assessment responses and credential facts are unchanged. Account avatar names are explicitly excluded from translation.

The audit now separately reports registered literals that bypass localization. This release is an expansion and integration correction, **not a claim of complete platform translation**. Remaining source copy and curricula still require translation and wiring; the selector's existing coverage notice remains visible.
