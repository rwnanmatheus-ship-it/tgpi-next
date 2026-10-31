# Translation completion preparation

Status: **not ready for a complete-localization production release**.

The existing published catalog is preserved. This tool prepares additional catalogs; it does not connect them to application rendering or certify a fully translated site.

## Commands

- `npm run localization:inventory`: read-only inventory and missing-entry counts, without network requests.
- `npm run test:localization-pipeline`: fixture-based validation; no provider credentials or paid calls.
- `npm run localization:generate`: explicit, billable generation using `OPENAI_API_KEY` from the process environment. Never place credentials in Git, terminal output, or chat.

The default cumulative budget is USD 10; `TGPI_TRANSLATION_BUDGET_USD` accepts a positive limit up to USD 20. A local usage ledger reserves costs before each request. Unknown or failed requests retain their reservation. Only one generation process may run per checkout. After a crash, verify no generator remains running before removing the lock. Keep the usage ledger when resuming.

The pinned model is `gpt-5.4-mini-2026-03-17`; pricing assumptions are USD 0.75/million input tokens and USD 4.50/million output tokens. Recheck official model pricing before execution: https://developers.openai.com/api/docs/models/gpt-5.4-mini . Structured output documentation: https://developers.openai.com/api/docs/guides/structured-outputs .

## Scope and guarantees

The inventory extracts selected display literals and structured prose from TypeScript/TSX under app, components, data and lib. It is an inventory aid, not proof that every visible string has been found. Concatenated strings, external service responses, Markdown, PDF composition, email templates and dynamically constructed messages require separate review. Source-language detection is heuristic and needs review, particularly language-learning exercises whose original examples must remain unchanged.

Existing registered translations are reused. New output must preserve placeholders, numbers, URLs, email addresses and code; missing, duplicate or unexpected response IDs fail validation. Source hashes invalidate changed cached entries. These checks do not establish linguistic accuracy.

Private-only assessment explanations are emitted separately from public catalogs. The runtime must keep private catalogs on the server. Generated artifacts are written only after all six locales have values. The manifest always declares `integrationValidated: false`; a complete text inventory is not a complete product release.

## Required before publishing complete localization

1. Execute generation with an appropriately configured service credential and review translations in English, Brazilian Portuguese, Spanish, French, German and Italian.
2. Integrate catalogs throughout server/client UI, API messages, course content and generated documents, preserving private assessment data and original language exercises.
3. Review unsupported sources and dynamic strings, then update inventory coverage.
4. Verify locale switching and persistence across sessions, tabs and account transitions; verify date/number formatting, validation errors, navigation, checkout and document exports in every locale.
5. Run application checks, build and browser tests against a preview; publish only after coverage and integration are verified.

No application runtime or production deployment is changed by these preparation scripts.
