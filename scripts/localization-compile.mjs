import fs from 'node:fs';
import ts from 'typescript';

const paths = process.argv.slice(2);
if (!paths.length) throw new Error('Pass validated offline translation checkpoints.');
const base = {};
new Function('exports', ts.transpileModule(fs.readFileSync('src/lib/localization/messages.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(base);
const locales = ['en', 'pt-BR', 'es', 'fr', 'de', 'it'];
const output = Object.fromEntries(locales.map(locale => {
  const path = `public/locales/${locale}.json`;
  return [locale, fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : {}];
}));
const decode = value => value.replaceAll('&apos;', "'").replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&nbsp;', ' ');
const tokens = value => (value.match(/\{\w+\}/g) ?? []).sort().join('|');
const usage = { inputTokens: 0, outputTokens: 0, estimatedUsd: 0 };
for (const path of paths) {
  const checkpoint = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (path.includes('assessment')) throw new Error('Protected assessment translations cannot enter public catalogs.');
  usage.inputTokens += checkpoint.inputTokens; usage.outputTokens += checkpoint.outputTokens; usage.estimatedUsd += checkpoint.estimatedUsd;
  for (const [raw, values] of Object.entries(checkpoint.entries)) {
    const key = decode(raw);
    if (Object.hasOwn(base.messages, key)) continue;
    for (const locale of locales) {
      const value = decode(values[locale] ?? '');
      if (!value.trim() || tokens(value) !== tokens(key)) throw new Error(`Invalid translation: ${locale} ${key}`);
      output[locale][key] = value;
    }
  }
}
fs.mkdirSync('public/locales', { recursive: true });
for (const locale of locales) fs.writeFileSync(`public/locales/${locale}.json`, JSON.stringify(Object.fromEntries(Object.entries(output[locale]).sort(([a], [b]) => a.localeCompare(b)))) + '\n');
console.log(JSON.stringify({ supplementalMessages: Object.keys(output.en).length, locales: locales.length, ...usage, estimatedUsd: Number(usage.estimatedUsd.toFixed(4)) }));
