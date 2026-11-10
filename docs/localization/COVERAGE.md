# Localization coverage and release validation

The platform supports English, Brazilian Portuguese, Spanish, French, German and Italian. The November 2026 completion release contains 11,209 normalized public message keys, including 8,751 supplemental entries per language, and 1,691 protected assessment entries. Public interface, accessibility attributes, legal pages, authored course instructions, worked labs, practice explanations, API error presentation, community controls, workspace controls and learning downloads use the selected language. Authored content and UI strings were generated offline with the configured OpenAI key, then validated and supplemented with editorial corrections.

## Language change

The selected dictionary is loaded before applying a new preference. The validated HTTP-only device cookie takes precedence; account metadata restores the language on another device. Server pages refresh, client context updates, and other tabs receive a preference signal. IDs, option values, drafts and learning records are preserved. Native browser auto-translation is disabled for the app document to prevent a second translator changing the selected language or mutating React-owned markup. Accessibility names and metadata share the same locale. Dates and numbers use `Intl`. Atlas receives the selected response language for new turns, with explicit user language requests taking precedence.

Dictionaries are static assets with a versioned URL; a visitor loads only languages used during their visit. There is no translation API call on page views or language changes. Core strings remain bundled for controls and recovery paths. Server-only assessment translations are never included in public dictionaries. Authorized question responses contain question and option translations, while explanations are returned only after submission under existing assessment rules.

## Intentionally original content

Member names, conversations, posts, submissions, reviewer feedback, identifiers, routes, source references, amounts, code and signed credential facts keep their original content. Target-language phrases and answers in language-teaching exercises remain in the language being taught; surrounding instructions and explanations translate. Unknown future authored strings retain their source wording until added to the catalog. Translation does not convert currencies, alter eligibility, grade work, or regenerate issued credentials.

## Verification and regression protection

- `npm run check:localization`: checks static TSX copy and accessible attributes across app, components and modules. Release result: zero missing candidates and zero registered literals bypassing the localization components.
- `npm run test:localization`: checks all six dictionaries, placeholders, persistence, protected assessment boundaries, authored-content identity preservation and representative rendered journeys.
- `npm run test:all`: 556 tests passed, including learning, billing, community, account, security and Atlas tests.
- `npm run build`: production compile, type checking, page generation and the full test/audit prebuild gate.

The literal audit is not a proof about every possible dynamic payload. Authored course data, downloadable material, protected assessments and API messages have separate inventories and runtime integration. Third-party interfaces and member-authored content are not treated as TGPI interface copy. Authenticated external services still require normal account access for end-to-end testing.

Public-catalog quality review additionally checks complete sentences for accidental English copies and verifies protected assessment prompts. The final public correction pass reads only unauthenticated published dictionary assets; no private repository source or protected questions are sent in that pass.

Browser verification covered all six choices on production, authenticated preference persistence after reload, the learning overview at a 390px viewport without horizontal overflow, and the Portuguese account workspace. Runtime monitoring reported no errors for the checked routes. Canonical source keys take priority over foreign-language aliases, avoiding collisions such as the Explorer rank and the French verb explorer.

## Expanded academy follow-up

All 27 courses and 227 lesson/laboratory placements now have registered presentation copy, including the 81 distinct new laboratories. Composite descriptions and foundation sections are translated as individual authored segments. English utterances and target-language answer choices remain intact. A dedicated curriculum test checks the actual assembled courses rather than only JSX literals.

Authorized assessment responses carry locale maps only for the current question set and already released feedback. Language changes update an active attempt without replacing answers, numerical input, notes or portfolio drafts. Persisted numerical cases are matched to their original template and keep their exact generated values; no question is regenerated for a language change. Correct choices, expected numerical answers and unreleased explanations remain server-only.

The follow-up translation job used the existing key and only authored sources verified through unauthenticated reads of the published public repository. Estimated one-time provider usage: USD 0.83. It did not send learner records or credentials, and introduces no request-time translation or grading calls.

## Concurrent personal-plan release

Preserved the published personal-plan and Country Fit redesign while merging the academy translations. Shared message catalogs contain both sets of additions and use a new cache version. Plan tools, selected-goal roadmaps, current learning progress and private draft restoration remain connected.

## Dynamic account and workspace follow-up

Localized library/history categories, generated activity titles, selected priorities, country links, resource progress text, comparison CSV headings, profile option labels and education choices. Searches match translated and canonical labels while preserving stored values and custom input. The audit now inspects literal conditional branches and error fallbacks, and distinguishes JSX entity decoding from JavaScript string contents. Eight additional regression tests cover these paths in all supported locales.

Account overview summaries also localize membership, visibility, enabled-notification counts, country names and current/next ranks. The same locale-aware rank names appear in progress requirements and Global Key status cards. A rendered-component regression exercises all six locales while preserving private names, free-form professions, IDs and earned points.

## Language-switch verification and additional dynamic surfaces

A language choice automatically updates the client interface after the selected dictionary loads and the preference endpoint confirms the change. Server-rendered content then refreshes, and other open tabs synchronize through the preference signal. This requires network time and is not an atomic, zero-latency change across all views. A live authenticated switch from Portuguese to English completed in approximately 1.5 seconds in one observation; this is not a latency guarantee.

Additional copy fixes cover checkout status, account save feedback, the country satellite map and marker tooltips, onboarding summaries and selection counts, document checklists, community creation, member PNG export and new personal research PDFs. The PDF uses the saved locale for fresh downloads, including labels, evidence, country names and number formatting, while retaining worksheet values and source references. Issued certificates remain in their issuance language for document integrity. Free-form text, user-authored names and prior AI messages are deliberately not translated retroactively.

Country research briefs also localize generated task details, goal and timeline labels, known language names, dossier evidence kinds and published cost periods. Structured user answers remain canonical, while custom professions and other free-form values retain their exact spelling. Portuguese checklist guidance received an editorial correction. Rendered six-locale regression tests check these generated surfaces and preserve the amounts, source references and personal data.

A final quality pass removed 59 accidental foreign-script fragments from five public dictionaries without changing their keys or placeholders. A catalog integrity regression checks the six Latin-language assets. Country detail metadata, decorative imagery, satellite headings, monthly estimates and published cost references now follow the chosen locale; source amounts and currencies remain unchanged.

Live production review also checked that changing the interface language on one country page synchronizes another open country page. Destination names now sit in neutral six-language phrases across the research brief, personal estimate, community prompt and fresh research download heading, avoiding article and word-order errors for names such as Germany.
