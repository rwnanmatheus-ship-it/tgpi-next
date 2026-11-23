import { isPrivateSearchPath } from "./indexnow-plan.mjs";
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const ORIGIN = "https://www.theglobalpolymath.com";
export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match => match[1].trim().replaceAll("&amp;", "&"));
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(match => [match[1].toLowerCase(), match[2]]));
}
export function inspectPage(html, url, headers = {}) {
  const issues = [];
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(match => attributes(match[0]));
  const canonical = tags.find(tag => tag.rel === "canonical")?.href;
  const normalize = value => value?.replace(/\/$/, "");
  if (normalize(canonical) !== normalize(url)) issues.push("Missing or non-self canonical");
  const socialUrl = tags.find(tag => tag.property === "og:url")?.content;
  if (normalize(socialUrl) !== normalize(url)) issues.push("Missing or non-self Open Graph URL");
  if (!tags.some(tag => tag.property === "og:image" && /^https:\/\//.test(tag.content || ""))) issues.push("Missing absolute Open Graph image");
  if (!/<title>[^<]+<\/title>/i.test(html)) issues.push("Missing title");
  if (!tags.some(tag => tag.name === "description" && tag.content?.trim())) issues.push("Missing description");
  if (tags.some(tag => /^(robots|googlebot)$/i.test(tag.name || "") && /noindex|none/i.test(tag.content || "")) ||
      /noindex|none/i.test(headers["x-robots-tag"] || "")) issues.push("Indexable route marked noindex");
  if (!/<h1\b/i.test(html)) issues.push("Missing H1");
  return issues;
}
export function rotatingUrls(urls, day, count) {
  return Array.from({length:Math.min(count,urls.length)},(_,index)=>urls[(day*count+index)%urls.length]);
}
export async function audit(fetcher = fetch, now = new Date()) {
  const report = { checkedAt: now.toISOString(), origin: ORIGIN, sitemapCount: 0, checks: [], issues: [] };
  async function get(path) {
    const url = new URL(path, ORIGIN).href;
    const response = await fetcher(url, { redirect: "manual", signal: AbortSignal.timeout(45000), headers: { "User-Agent": "TGPI-SEO-Health/1.0" } });
    if (response.status !== 200) throw new Error(`${url}: HTTP ${response.status}, expected 200 without redirect`);
    return { text: await response.text(), headers: Object.fromEntries(response.headers) };
  }
  const robots = await get("/robots.txt");
  if (!robots.text.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) report.issues.push("robots.txt must reference the canonical sitemap");
  if (/Disallow:\s*\/\s*$/m.test(robots.text)) report.issues.push("robots.txt blocks the entire site");
  const sitemap = await get("/sitemap.xml");
  const urls = sitemapUrls(sitemap.text);
  report.sitemapCount = urls.length;
  if (!urls.length || !sitemap.text.includes("<urlset")) report.issues.push("Empty or invalid sitemap");
  if (new Set(urls).size !== urls.length) report.issues.push("Duplicate sitemap URLs");
  const localUrls = urls.filter(url => {
    let parsed;
    try { parsed = new URL(url); } catch {
      report.issues.push(`Invalid sitemap URL: ${url}`);
      return false;
    }
    if (parsed.origin !== ORIGIN || parsed.search || parsed.hash) {
      report.issues.push(`Non-canonical sitemap URL: ${url}`);
      return false;
    }
    if (isPrivateSearchPath(parsed.pathname)) report.issues.push(`Private, noindex or redirected URL in sitemap: ${url}`);
    return true;
  });
  // Inspect every canonical sitemap URL locally, then rotate network checks.
  // Complete course coverage takes 30 days for a stable 1,200-course catalogue.
  const countries = localUrls.filter(url => new URL(url).pathname.startsWith("/countries/"));
  const directory = localUrls.filter(url => /^\/courses\/directory\//.test(new URL(url).pathname));
  const courses = localUrls.filter(url => /^\/courses\/[^/]+$/.test(new URL(url).pathname) && !url.endsWith("/directory"));
  const sampled = new Set([...countries,...directory,...courses]);
  const pages = localUrls.filter(url => !sampled.has(url));
  const day = Math.floor(now.getTime() / 86400000);
  pages.push(...rotatingUrls(countries,day,7),...rotatingUrls(courses,day,40),...rotatingUrls(directory,day,3));
  async function inspectUrl(url) {
    try {
      const page = await get(url);
      const issues = inspectPage(page.text, url, page.headers);
      return { url, ok: !issues.length, issues };
    } catch (error) {
      return { url, ok: false, issues: [error.message] };
    }
  }
  const concurrency = 4;
  for (let start = 0; start < pages.length; start += concurrency) {
    report.checks.push(...await Promise.all(pages.slice(start, start + concurrency).map(inspectUrl)));
  }
  report.ok = !report.issues.length && report.checks.every(check => check.ok);
  return report;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const report = await audit();
    await writeFile("seo-audit-report.json", JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
    if (!report.ok) process.exitCode = 1;
  } catch (error) {
    await writeFile("seo-audit-report.json", JSON.stringify({ ok: false, checkedAt: new Date().toISOString(), error: error.message }, null, 2));
    console.error(error.message);
    process.exitCode = 1;
  }
}
