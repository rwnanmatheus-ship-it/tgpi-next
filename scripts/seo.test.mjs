import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inspectPage, sitemapUrls, ORIGIN, audit } from "./seo-audit.mjs";
const read = file => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const html = url => `<title>TGPI</title><meta name="description" content="Research countries"><link rel="canonical" href="${url}"><h1>Country research</h1>`;
test("parses sitemap URLs", () => assert.deepEqual(sitemapUrls("<urlset><url><loc>https://example.com/a</loc></url></urlset>"), ["https://example.com/a"]));
test("accepts complete indexable page", () => assert.deepEqual(inspectPage(html(ORIGIN), ORIGIN), []));
test("detects canonical drift, empty metadata and noindex headers", () => {
  assert.ok(inspectPage(html("https://theglobalpolymath.com"), ORIGIN).length);
  assert.ok(inspectPage("", ORIGIN).length >= 3);
  assert.ok(inspectPage(html(ORIGIN), ORIGIN, {"x-robots-tag": "noindex"}).includes("Indexable route marked noindex"));
  assert.ok(inspectPage(html(ORIGIN) + '<meta name="robots" content="noindex,nofollow">', ORIGIN).length);
});
test("canonical domain is consistent in core metadata", () => {
  for (const path of ["src/app/page.tsx", "src/app/layout.tsx", "src/app/robots.ts", "src/components/home/HomeStructuredData.tsx"]) {
    assert.ok(read(path).includes(ORIGIN), path);
    assert.ok(!read(path).includes('"https://theglobalpolymath.com'), path);
  }
});
test("sitemap excludes known noindex and redirect pages without fake freshness", () => {
  const source = read("src/app/sitemap.ts");
  for (const path of ["/ranking", "/authority", "/country-fit", "/premium"]) assert.ok(!source.includes('path: "' + path + '"'));
  assert.ok(!source.includes("new Date("));
  assert.ok(source.includes("getAllCountrySlugs().map"));
});
test("audit checks all landing pages, detects redirects and stays same-origin", async () => {
  const seen = [];
  const fetcher = async url => {
    seen.push(url);
    if (url.endsWith("/robots.txt")) return new Response(`Sitemap: ${ORIGIN}/sitemap.xml`);
    if (url.endsWith("/sitemap.xml")) return new Response(`<urlset><loc>${ORIGIN}</loc><loc>${ORIGIN}/pricing</loc><loc>https://untrusted.example/</loc></urlset>`);
    if (url.endsWith("/pricing")) return new Response("", { status: 307 });
    return new Response(html(url));
  };
  const report = await audit(fetcher);
  assert.equal(report.ok, false);
  assert.equal(report.checks.length, 2);
  assert.equal(seen.some(url => url.includes("untrusted")), false);
  assert.ok(report.checks[1].issues[0].includes("307"));
});
test("brand identity, image discovery and structured data stay explicit", () => {
  const home = read("src/app/page.tsx");
  assert.ok(home.includes("TGPI | The Global Polymath Institute"));
  assert.ok(home.includes('"max-image-preview": "large"'));
  const schema = read("src/components/home/HomeStructuredData.tsx");
  assert.ok(schema.includes('legalName: "TGPI GLOBAL EDUCATION LTDA"'));
  assert.ok(schema.includes('alternateName: ["TGPI"'));
  assert.ok(schema.includes('"@type": "ImageObject"'));
  assert.ok(schema.includes("primaryImageOfPage"));
  assert.ok(read("src/app/sitemap.ts").includes("images:"));
  assert.ok(read("src/app/layout.tsx").includes('sizes: "512x512"'));
});
