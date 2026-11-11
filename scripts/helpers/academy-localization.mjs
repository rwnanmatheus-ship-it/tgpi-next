import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

/** Local, deterministic source loading for curriculum coverage and regression tests. */
export function academyLocalizationFixture(overrides = {}) {
  const cache = new Map(), native = createRequire(import.meta.url);
  function load(input) {
    const file = /\.(tsx?|json)$/.test(input) ? input : existsSync(input + '.ts') ? input + '.ts' : existsSync(input + '.tsx') ? input + '.tsx' : resolve(input, 'index.ts');
    if (cache.has(file)) return cache.get(file);
    if (file.endsWith('.json')) { const value = JSON.parse(readFileSync(file, 'utf8')); cache.set(file, value); return value; }
    const result = {}; cache.set(file, result);
    const compiled = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
    new Function('require', 'exports', compiled)(name => {
      if (Object.hasOwn(overrides, name)) return overrides[name];
      if (name === 'server-only' || name.endsWith('.css')) return {};
      if (name.startsWith('@/')) return load(resolve('src', name.slice(2)));
      if (name.startsWith('.')) return load(resolve(dirname(file), name));
      return native(name);
    }, result);
    return result;
  }
  const messages = load(resolve('src/lib/localization/messages.ts'));
  const { locales } = load(resolve('src/lib/localization/config.ts'));
  for (const locale of locales) messages.registerSupplementalMessages(locale, { ...JSON.parse(readFileSync(`public/locales/${locale}.json`, 'utf8')), ...JSON.parse(readFileSync(`public/locales/academy/${locale}.json`, 'utf8')) });
  const catalog = load(resolve('src/data/courses/academy/catalog.server.ts'));
  return { load, messages, locales, ...catalog };
}

export function academyDisplayCopy(course) {
  const copy = [course.title, ...(course.descriptionParts ?? [course.description]), ...course.outcomes];
  for (const lesson of course.lessons) {
    copy.push(lesson.title, lesson.objective, lesson.deliverable, ...lesson.practice);
    for (const section of lesson.sections) {
      if (!section.preserveTitle) copy.push(section.title);
      if (section.bodyParts) copy.push(...section.bodyParts.filter(part => !part.preserve).map(part => part.text));
      else if (!section.preserveBody) copy.push(section.body);
    }
  }
  return copy;
}
