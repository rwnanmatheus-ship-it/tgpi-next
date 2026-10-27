# Platform interface languages

The interface locale is independent of citizenship and spoken/learning languages. Supported values are `en`, `pt-BR`, `es`, `fr`, `de`, and `it`.

The root layout reads the validated `tgpi_locale` HTTP-only cookie, falling back to weighted browser language negotiation. `POST /api/preferences/locale` requires a same-origin request and an allowlisted locale. For a signed-in member it deep-merges the single `unsafeMetadata.tgpiLocale` preference with Clerk; for a guest it writes the cookie only. This preference is never an authorization signal. A signed-in account restores an explicit choice once per identity on a new device. Interface changes refresh server components while preserving client state.

`LocaleProvider`, `useLocale`, and `LocalizedText` connect client and server-rendered UI to a reviewed static catalog. English source messages remain the keys; identifiers, slugs, saved form values, curriculum records, member contributions, assessment answers, billing amounts and signed credential snapshots must not be translated in storage.

## Coverage and limits

This release establishes the six-language infrastructure and translates the global navigation, account menu, authentication controls, footer, home navigation and many labels across the country explorer, learning catalog, profile, preparation, community and workspace. The four home goal journeys now translate their complete guidance, checklists and outcome text; the six home FAQs translate both questions and full answers. Country names use reviewed generated CLDR display names. The same fallback serves unknown strings in their original language.

It is **not a complete translation of every page, lesson, country dossier, legal document, notification payload or error message**. The full selector explicitly explains that some content remains in its original language. Source curriculum, certification questions and community contributions require a separate content-localization workflow and must preserve their assessment and provenance semantics. Do not advertise 100% platform translation until those migrations are complete.

## Extending coverage

1. Add the complete English source string and translations for all six locales to `src/lib/localization/messages.ts`.
2. Render presentation strings with `LocalizedText`, or `useLocale().t` in a client component. Use `getLocale` and `translate` for server strings and attributes. Never call client hooks from server components.
3. Keep identifiers and form option values stable; translate their labels only. Preserve the `use client` directive before imports.
4. Translate accessible names and search presentation strings alongside visible labels. Use `Intl` for locale-sensitive dates, numbers and currencies when migrating individual features.
5. Run `npm run test:localization`, `npm run typecheck`, the applicable lint checks and required prebuild tests. Verify the full browser → preference API → cookie → refreshed UI flow and a page reload. Verify account restoration separately with a signed-in test member.
