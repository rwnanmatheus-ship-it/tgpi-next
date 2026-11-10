/** Source-only inventory. No account records, secrets, or submitted content are read. */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const catalogExports = {};
new Function('exports', ts.transpileModule(fs.readFileSync('src/lib/localization/messages.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(catalogExports);
for (const locale of ['en', 'pt-BR', 'es', 'fr', 'de', 'it']) catalogExports.registerSupplementalMessages(locale, JSON.parse(fs.readFileSync(`public/locales/${locale}.json`, 'utf8')));
const entries = new Map();
const normalize = value => value.replace(/\s+/g, ' ').trim();
const technical = new Set(['className', 'class', 'href', 'url', 'src', 'id', 'key', 'value', 'slug', 'code', 'icon', 'style', 'fontFamily', 'font', 'color', 'background', 'gradient', 'type', 'role', 'method', 'path', 'endpoint', 'event', 'action', 'name', 'provider', 'model', 'date', 'version', 'issuer', 'line', 'phrase', 'avoid', 'useInstead', 'speaker']);
const textAttributes = new Set(['placeholder', 'title', 'alt', 'aria-label', 'aria-description', 'label', 'text', 'summary', 'description', 'eyebrow', 'caption']);
function acceptable(value) {
  if (!/[\p{L}]{2}/u.test(value) || value.length > 12000 || /^(https?:|data:|mailto:|\/|@|#[\da-f]+$)/i.test(value)) return false;
  if (/\b(?:var\(--|rgba?\(|grid-cols-|flex-col|items-center|font-semibold|text-\[|bg-\[|from\s+["']@\/)/.test(value)) return false;
  if (/(?:\b(?:px|py|mt|mb|rounded|border|text|bg|gap)-\S+|:hover|=>)/.test(value)) return false;
  if (/^\S+@\S+$/.test(value) || /^[\w]+(?:-[\w]+)+$/.test(value)) return false;
  return true;
}
function add(raw, file, node, source, kind) {
  const key = normalize(raw);
  if (!acceptable(key)) return;
  if (['pt-BR', 'es', 'fr', 'de', 'it'].some(locale => catalogExports.translate(locale, key) !== key) || Object.hasOwn(catalogExports.messages, key)) return;
  const record = entries.get(key) ?? { key, occurrences: [] };
  record.occurrences.push({ file, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, kind });
  entries.set(key, record);
}
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (!/\/(localization|api)$/.test(file)) walk(file); continue; }
    if (!/\.tsx?$/.test(file) || /(?:copy|professional-ui|context|contracts|schema|firebase|firestore|env|auth|server|test)\.(?:ts|tsx)$/.test(file) || file.includes('/types/')) continue;
    const code = fs.readFileSync(file, 'utf8');
    const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    function visit(node) {
      if (ts.isJsxText(node)) add(node.text, file, node, source, 'visible text');
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        const parent = node.parent;
        if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent) || ts.isLiteralTypeNode(parent) || ts.isPropertyAssignment(parent) && parent.name === node || ts.isJsxAttribute(parent) && !textAttributes.has(parent.name.getText(source))) return;
        const owner = ts.isPropertyAssignment(parent) ? parent.name.getText(source).replace(/["']/g, '') : '';
        if (technical.has(owner)) return;
        if (ts.isCallExpression(parent) && /(?:console|classNames|\.join|\.split|\.replace|\.match|\.includes|\.startsWith|\.endsWith)/.test(parent.expression.getText(source))) return;
        const key = normalize(node.text);
        if (/\s/.test(key) || textAttributes.has(owner) || ['title', 'label', 'heading', 'caption', 'unit', 'subtitle', 'category', 'statusLabel', 'summary'].includes(owner)) add(key, file, node, source, 'authored source');
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk('src');
const result = [...entries.values()].sort((a, b) => a.key.localeCompare(b.key));
if (process.argv.includes('--json')) console.log(JSON.stringify(result, null, 2));
else console.log(JSON.stringify({ messages: result.length, sourceCharacters: result.reduce((sum, item) => sum + item.key.length, 0) }));
