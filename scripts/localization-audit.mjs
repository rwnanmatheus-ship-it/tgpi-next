/** Inspect literal interface copy. This report does not certify coverage of curriculum or API data. */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const exports = {};
const catalogSource = fs.readFileSync('src/lib/localization/messages.ts', 'utf8');
new Function('exports', ts.transpileModule(catalogSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(exports);
const registered = new Set(Object.keys(exports.messages).map(key => key.toLocaleLowerCase('en')));
const brands = new Set(['TGPI', 'The Global Polymath Institute', 'TGPI Premium', 'Global Key', 'TGPI Global ID', 'TGPI Global Key', 'Instagram', 'LinkedIn', 'TGPI GLOBAL EDUCATION LTDA']);
const candidates = new Map();
function add(raw, file, node, source, kind) {
  const key = raw.replace(/\s+/g, ' ').trim();
  if (!/[\p{L}]{2}/u.test(key) || registered.has(key.toLocaleLowerCase('en')) || brands.has(key) || /^\S+@\S+$|^https?:\/\//.test(key)) return;
  const record = candidates.get(key) ?? { key, occurrences: [] };
  const position = source.getLineAndCharacterOfPosition(node.getStart(source));
  record.occurrences.push({ file, line: position.line + 1, kind });
  candidates.set(key, record);
}
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { if (!file.includes('/api/')) walk(file); continue; }
    if (!file.endsWith('.tsx')) continue;
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxText(node)) add(node.text, file, node, source, 'visible text');
      if (ts.isJsxAttribute(node) && ['placeholder', 'aria-label', 'alt', 'title', 'summary', 'description', 'label', 'text', 'eyebrow'].includes(node.name.text) && node.initializer && ts.isStringLiteral(node.initializer)) add(node.initializer.text, file, node, source, node.name.text);
      if (ts.isCallExpression(node) && ['t', 'setError', 'setMessage', 'setNotice', 'window.confirm'].includes(node.expression.getText(source)) && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) add(node.arguments[0].text, file, node, source, 'message');
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk('src/app');
walk('src/components');
const entries = [...candidates.values()].sort((a, b) => a.key.localeCompare(b.key));
const report = {
  scope: 'Static TSX literals only. Dynamic curriculum, API responses, templates, data files and user content require separate review.',
  registeredMessages: Object.keys(exports.messages).length,
  remainingCandidates: entries.length,
  entries,
};
if (process.argv.includes('--json')) process.stdout.write(JSON.stringify(report, null, 2) + '\n');
else {
  console.log(`${report.registeredMessages} registered messages; ${report.remainingCandidates} remaining interface candidates.`);
  console.log(report.scope);
  const counts = new Map();
  for (const entry of entries) for (const file of new Set(entry.occurrences.map(item => item.file))) counts.set(file, (counts.get(file) ?? 0) + 1);
  for (const [file, count] of [...counts].sort((a, b) => b[1] - a[1]).slice(0, 20)) console.log(`${count}\t${file}`);
}
