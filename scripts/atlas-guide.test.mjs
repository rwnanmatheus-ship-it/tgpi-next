import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import ts from 'typescript';
import { safeAtlasLink } from '../src/lib/atlas/contracts.ts';

const cache = new Map();
function load(filename) {
  if (cache.has(filename)) return cache.get(filename);
  const text = readFileSync(filename, 'utf8');
  if (filename.endsWith('.json')) return JSON.parse(text);
  const exports = {};
  cache.set(filename, exports);
  const code = ts.transpileModule(text, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  new Function('require', 'exports', code)(id => {
    const path = id.startsWith('@/') ? resolve('src', id.slice(2)) : resolve(dirname(filename), id);
    return load(/\.(ts|json)$/.test(path) ? path : `${path}.ts`);
  }, exports);
  return exports;
}
const { answerAtlasGuide, estimateAtlasBudget, nextAtlasTopic, atlasFirstName } = load(resolve('src/lib/atlas/guide.ts'));
const { atlasNavigationContext } = load(resolve('src/lib/atlas/navigation-context.ts'));
const { guideTopics, guideText } = load(resolve('src/lib/atlas/guide-copy.ts'));

test('comparison carries a mentioned destination through a follow-up, with real slugs and goal', () => {
  const first = answerAtlasGuide({ question: 'Compare Portugal', locale: 'pt-BR' });
  assert.match(first.content, /outro país.*Portugal/);
  const second = answerAtlasGuide({ question: 'E Canadá para trabalho?', locale: 'pt-BR', previous: first.memory });
  assert.equal(second.resources[0].href, '/compare?country=portugal&country=canada&goal=work');
  const replacement = answerAtlasGuide({ question: 'Compare Japão com França', locale: 'pt-BR', previous: second.memory });
  assert.equal(replacement.resources[0].href, '/compare?country=japan&country=france&goal=work');
});

test('language-specific names resolve and TGPI modules expose safe, existing routes', () => {
  const result = answerAtlasGuide({ question: 'Vergleiche Österreich und die Schweiz', locale: 'de' });
  assert.equal(result.resources[0].href, '/compare?country=austria&country=switzerland');
  for (const locale of ['en', 'pt-BR', 'es', 'fr', 'de', 'it']) {
    for (const [topic, entry] of Object.entries(guideTopics)) {
      const reply = answerAtlasGuide({ question: guideText(entry.prompt, locale), locale, topic });
      assert.equal(reply.memory.topic, topic);
      assert.ok(reply.resources.every(resource => safeAtlasLink(resource.href)));
      assert.ok(guideTopics[nextAtlasTopic(topic)]);
    }
  }
});

test('widget context only retains approved navigation information, never raw private identifiers', () => {
  assert.deepEqual(atlasNavigationContext('/countries/portugal'), { topic: 'countries', country: 'portugal' });
  assert.deepEqual(atlasNavigationContext('/profile/security'), { topic: 'settings', country: undefined });
  assert.deepEqual(atlasNavigationContext('/courses/account-unique-id/study'), { topic: 'learning', country: undefined });
  assert.equal(atlasNavigationContext('/api/atlas/chat'), undefined);
  assert.equal(atlasFirstName('  Renan Matheus  '), 'Renan');
});

test('budget uses a single currency, handles zero and rejects malformed or out-of-range inputs', () => {
  assert.equal(estimateAtlasBudget(1200, 500, 3, 15), 4715);
  assert.equal(estimateAtlasBudget(0, 0, 1, 0), 0);
  for (const invalid of [[-1, 2, 3, 5], [1, 2, 2.5, 5], [1, 2, 3, 101], [Infinity, 2, 3, 5]]) {
    assert.equal(estimateAtlasBudget(...invalid), null);
  }
});

test('academy guide offers the selected applied project and a safe route back to study', () => {
  const brief = 'Build a fictional dashboard and reconcile the totals.';
  const reply = answerAtlasGuide({
    question: 'Help me practise', locale: 'en', topic: 'learning',
    context: { topic: 'learning', learningCourse: { id: 'analise-dados-power-bi-ia', title: 'Data analysis', projectBrief: brief } },
  });
  assert.ok(reply.content.includes(brief));
  assert.match(reply.content, /Start with one deliverable/);
  assert.equal(safeAtlasLink(reply.resources[0].href), '/courses/analise-dados-power-bi-ia/study');
});
