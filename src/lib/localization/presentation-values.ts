/** Only catalog-backed language labels are authored copy. Free-form answers stay exact. */
const knownLanguageNames = new Set([
  'English', 'Portuguese', 'Spanish', 'French', 'German', 'Italian',
  'Mandarin Chinese', 'Arabic', 'Japanese', 'Korean', 'Other',
]);

export function localizeKnownLanguage(language: string, translate: (value: string) => string): string {
  return knownLanguageNames.has(language) ? translate(language) : language;
}
