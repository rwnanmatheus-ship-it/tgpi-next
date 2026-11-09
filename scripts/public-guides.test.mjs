import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { publicGuides } from '../src/lib/public-guides.ts';
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
test('public research guides have unique routes, substantive checklists and dated review', () => {
  assert.equal(new Set(publicGuides.map(g => g.slug)).size, publicGuides.length);
  for (const guide of publicGuides) {
    assert.match(guide.slug, /^[a-z0-9-]+$/);
    assert.match(guide.reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(guide.sections.length >= 4);
    for (const section of guide.sections) { assert.ok(section.text.length > 200); assert.ok(section.checklist.length >= 3); }
    assert.ok(guide.sources.length >= 2);
    for (const source of guide.sources) assert.equal(new URL(source.href).protocol, 'https:');
    assert.ok(existsSync(new URL(`../src/app${guide.nextHref}/page.tsx`, import.meta.url)));
  }
});
test('guides are linked, discoverable, self canonical and reject unknown slugs', () => {
  assert.ok(read('src/app/resources/page.tsx').includes('href="/guides"'));
  const sitemap = read('src/app/sitemap.ts');
  assert.ok(sitemap.includes('publicGuides.map'));
  assert.ok(sitemap.includes('lastModified: guide.reviewedAt'));
  const page = read('src/app/guides/[slug]/page.tsx');
  for (const expected of ['notFound()', 'canonical:', 'generateStaticParams', 'application/ld+json', 'guide.nextHref', 'publicGuides.filter']) assert.ok(page.includes(expected), expected);
  assert.ok(!page.includes('data-funnel-event'));
});
