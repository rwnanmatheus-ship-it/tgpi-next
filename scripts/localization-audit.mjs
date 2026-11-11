/** Inspect literal interface copy. This report does not certify coverage of curriculum or API data. */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { messageLiterals, renderedMessageText } from './helpers/localization-audit.mjs';

const exports = {};
const catalogSource = fs.readFileSync('src/lib/localization/messages.ts', 'utf8');
new Function('exports', ts.transpileModule(catalogSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(exports);
const supplementalFor = locale => ({
  ...JSON.parse(fs.readFileSync(`public/locales/${locale}.json`, 'utf8')),
  ...JSON.parse(fs.readFileSync(`public/locales/academy/${locale}.json`, 'utf8')),
});
const supplemental = supplementalFor('en');
const notifications = {};
new Function('exports', ts.transpileModule(fs.readFileSync('src/lib/notifications/text.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(notifications);
for (const locale of ['en', 'pt-BR', 'es', 'fr', 'de', 'it']) exports.registerSupplementalMessages(locale, supplementalFor(locale));
const registered = new Set([...Object.keys(exports.messages), ...Object.keys(supplemental)].map(key => key.toLocaleLowerCase('en')));
const brands = new Set(['TGPI', 'The Global Polymath Institute', 'TGPI Premium', 'Global Key', 'TGPI Global ID', 'TGPI Global Key', 'Instagram', 'LinkedIn', 'TGPI GLOBAL EDUCATION LTDA', 'Renan']);
const candidates = new Map();
const untranslatedRendering = new Map();
function add(raw, file, node, source, kind) {
  const key = renderedMessageText(raw, node);
  if (!/[\p{L}]{2}/u.test(key) || brands.has(key) || /^\S+@\S+$|^https?:\/\//.test(key)) return;
  const translated = registered.has(key.toLocaleLowerCase('en')) || ['pt-BR', 'es', 'fr', 'de', 'it'].some(locale => exports.translate(locale, key) !== key);
  if (translated) {
    const attributeOwner = ts.isJsxAttribute(node) ? node.parent.parent.tagName?.getText(source) : undefined;
    if (['visible text', 'placeholder', 'aria-label', 'alt'].includes(kind) && !['LocalizedElement', 'Image', 'NextImage', 'CinematicImage', 'EditorialImage', 'Link'].includes(attributeOwner)) {
      const position = source.getLineAndCharacterOfPosition(node.getStart(source));
      const record = untranslatedRendering.get(key) ?? { key, occurrences: [] };
      record.occurrences.push({ file, line: position.line + 1, kind });
      untranslatedRendering.set(key, record);
    }
    return;
  }
  const record = candidates.get(key) ?? { key, occurrences: [] };
  const position = source.getLineAndCharacterOfPosition(node.getStart(source));
  record.occurrences.push({ file, line: position.line + 1, kind });
  candidates.set(key, record);
}
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { if (!file.includes('/api/')) walk(file); continue; }
    if (!file.endsWith('.tsx') || file.endsWith('/opengraph-image.tsx')) continue;
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxText(node)) add(node.text, file, node, source, 'visible text');
      if (ts.isJsxAttribute(node) && ['placeholder', 'aria-label', 'alt', 'title', 'summary', 'description', 'label', 'text', 'eyebrow'].includes(node.name.text) && node.initializer && ts.isStringLiteral(node.initializer)) add(node.initializer.text, file, node, source, node.name.text);
      if (ts.isJsxAttribute(node) && node.name.text === 'text' && node.initializer && ts.isJsxExpression(node.initializer)) {
        for (const literal of messageLiterals(node.initializer.expression)) add(literal.text, file, literal, source, 'message');
      }
      if (ts.isCallExpression(node) && ['localizeLabel', 't', 'setError', 'setMessage', 'setNotice', 'window.confirm'].includes(node.expression.getText(source))) {
        for (const literal of messageLiterals(node.arguments[0])) {
          // Notification screens use a separate typed six-language catalog.
          if (node.expression.getText(source) === 't' && source.text.includes('notificationText(locale, key)')) {
            try { if (['en', 'pt-BR', 'es', 'fr', 'de', 'it'].every(locale => notifications.notificationText(locale, literal.text)?.trim())) continue; } catch { /* Report a missing namespaced key below. */ }
          }
          add(literal.text, file, literal, source, 'message');
        }
      }
      // LocaleProvider reports a boolean recovery state; its diagnostic exceptions are never displayed.
      if (!file.endsWith('/localization/LocaleProvider.tsx') && ts.isNewExpression(node) && node.expression.getText(source) === 'Error') {
        for (const literal of messageLiterals(node.arguments?.[0])) add(literal.text, file, literal, source, 'error message');
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk('src/app');
walk('src/components');
walk('src/modules');
const entries = [...candidates.values()].sort((a, b) => a.key.localeCompare(b.key));
const report = {
  scope: 'Static TSX literals only. Dynamic curriculum, API responses, templates, data files and user content require separate review.',
  registeredMessages: registered.size,
  remainingCandidates: entries.length,
  entries,
  registeredButNotWired: [...untranslatedRendering.values()],
};
if (process.argv.includes('--json')) process.stdout.write(JSON.stringify(report, null, 2) + '\n');
else {
  console.log(`${report.registeredMessages} registered messages; ${report.remainingCandidates} remaining interface candidates.`);
  console.log(`${report.registeredButNotWired.length} registered strings still rendered outside localization (review component attributes individually).`);
  console.log(report.scope);
  const counts = new Map();
  for (const entry of entries) for (const file of new Set(entry.occurrences.map(item => item.file))) counts.set(file, (counts.get(file) ?? 0) + 1);
  for (const [file, count] of [...counts].sort((a, b) => b[1] - a[1]).slice(0, 20)) console.log(`${count}\t${file}`);
}

if (process.argv.includes("--check") && (report.remainingCandidates || report.registeredButNotWired.length)) process.exitCode = 1;
