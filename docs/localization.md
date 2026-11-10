# Platform languages

Supported interface locales: `en`, `pt-BR`, `es`, `fr`, `de`, `it`. Language is independent of citizenship and learning-language selection.

`getLocale` resolves a validated device cookie, then account preference, then weighted browser language negotiation. The same resolver loads the selected supplemental dictionary for server pages and metadata. `LocaleProvider` registers the SSR dictionary before descendants render. Changing language loads the next dictionary, persists the preference through the same-origin preference API, updates client context and refreshes server components. A storage signal synchronizes other tabs. Authentication changes refresh server state instead of overwriting account preferences from stale browser state.

`LocalizedText` and `useLocale().t` translate authored presentation text. `LocalizedElement`, `LocalizedImage` and `LocalizedLink` translate accessible attributes while retaining values, events, refs and navigation. `localizeAuthoredContent` is restricted to versioned TGPI-authored curriculum; it preserves identifiers, code and target-language practice. Never pass profiles, conversations, member submissions or signed credential records to this helper.

Public dictionaries live in `public/locales/{locale}.json`, with common control strings in `src/lib/localization/messages.ts`. Protected assessment translations live in `src/lib/localization/assessment-messages.json` and are imported through a `server-only` module. Do not put private assessment checkpoints into public dictionaries. Runtime translation does not call an external API.

## Extending authored copy

1. Add complete six-language entries, retaining exact placeholders, factual qualifications, brands and numerical meaning. Source keys may be English or the legacy authored language.
2. Wire the rendering through localization. Translate labels while keeping option values, routes and stored identifiers stable. Use whole-sentence placeholders when inserting dynamic values.
3. Use `Intl` with the selected locale for dates and numbers. Currency codes and original amounts remain unchanged.
4. Run `npm run check:localization`, `npm run test:localization`, `npm run typecheck`, and `npm run build`. Confirm the selector and page reload in the browser. Builds fail for new unregistered literal copy or registered literals rendered without localization.
5. Bump `src/lib/localization/catalog-version.ts` when dictionary assets change.

`scripts/localization-inventory.mjs --json` inventories authored source candidates for review. `scripts/localization-translate.mjs --input=... --output=... --budget-usd=...` is an optional, explicitly authorized offline authoring job using a configured OpenAI key. It checkpoints validated batches, enforces a budget and placeholder equality, disables provider storage, and never prints credentials. It must not run during builds or requests. `scripts/localization-compile.mjs checkpoint.json ...` validates and merges public entries; protected assessment checkpoints are rejected. Review inventory scope before sending any source text to an external service.

See `docs/localization/COVERAGE.md` for release scope, intentional preservation and validation limits.

Academy curricula use `localizeAcademyCourse` to preserve explicit target-language sections and translate composite descriptions by segment. `withAcademyTranslations` is server-only and applies after route authorization; it returns maps for the currently disclosed questions and feedback, preserving canonical stored records. `scripts/academy-localization.test.mjs` checks the full assembled curriculum, protected assessment coverage, numerical-case identity and draft/answer preservation across locale changes.
