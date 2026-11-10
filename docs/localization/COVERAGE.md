# Localization coverage and release validation

The platform supports English, Brazilian Portuguese, Spanish, French, German and Italian. The November 2026 completion release contains 10,435 normalized public message keys, including 8,088 supplemental entries per language, and 582 protected assessment entries. Public interface, accessibility attributes, legal pages, authored course instructions, worked labs, practice explanations, API error presentation, community controls, workspace controls and learning downloads use the selected language. Authored content and UI strings were generated offline with the configured OpenAI key, then validated and supplemented with editorial corrections.

## Language change

The selected dictionary is loaded before applying a new preference. The validated HTTP-only device cookie takes precedence; account metadata restores the language on another device. Server pages refresh, client context updates, and other tabs receive a preference signal. IDs, option values, drafts and learning records are preserved. Native browser auto-translation is disabled for the app document to prevent a second translator changing the selected language or mutating React-owned markup. Accessibility names and metadata share the same locale. Dates and numbers use `Intl`. Atlas receives the selected response language for new turns, with explicit user language requests taking precedence.

Dictionaries are static assets with a versioned URL; a visitor loads only languages used during their visit. There is no translation API call on page views or language changes. Core strings remain bundled for controls and recovery paths. Server-only assessment translations are never included in public dictionaries. Authorized question responses contain question and option translations, while explanations are returned only after submission under existing assessment rules.

## Intentionally original content

Member names, conversations, posts, submissions, reviewer feedback, identifiers, routes, source references, amounts, code and signed credential facts keep their original content. Target-language phrases and answers in language-teaching exercises remain in the language being taught; surrounding instructions and explanations translate. Unknown future authored strings retain their source wording until added to the catalog. Translation does not convert currencies, alter eligibility, grade work, or regenerate issued credentials.

## Verification and regression protection

- `npm run check:localization`: checks static TSX copy and accessible attributes across app, components and modules. Release result: zero missing candidates and zero registered literals bypassing the localization components.
- `npm run test:localization`: checks all six dictionaries, placeholders, persistence, protected assessment boundaries, authored-content identity preservation and representative rendered journeys.
- `npm run test:all`: 493 tests passed, including learning, billing, community, account, security and Atlas tests.
- `npm run build`: production compile, type checking, page generation and the full test/audit prebuild gate.

The literal audit is not a proof about every possible dynamic payload. Authored course data, downloadable material, protected assessments and API messages have separate inventories and runtime integration. Third-party interfaces and member-authored content are not treated as TGPI interface copy. Authenticated external services still require normal account access for end-to-end testing.
