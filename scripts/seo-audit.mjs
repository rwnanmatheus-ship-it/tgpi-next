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
  if (!/<title>[^<]+<\/title>/i.test(html)) issues.push("Missing title");
  if (!tags.some(tag => tag.name === "description" && tag.content?.trim())) issues.push("Missing description");
  if (tags.some(tag => /^(robots|googlebot)$/i.test(tag.name || "") && /noindex|none/i.test(tag.content || "")) ||
      /noindex|none/i.test(headers["x-robots-tag"] || "")) issues.push("Indexable route marked noindex");
  if (!/<h1\b/i.test(html)) issues.push("Missing H1");
  return issues;
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
  for (const url of urls) {
    const parsed = new URL(url);
    if (parsed.origin !== ORIGIN || parsed.search || parsed.hash) report.issues.push(`Non-canonical sitemap URL: ${url}`);
    if (/^\/(ranking|authority|profile|sign-in|sign-up|admin|api|country-fit|premium)(\/|$)/.test(parsed.pathname)) report.issues.push(`Private, noindex or redirected URL in sitemap: ${url}`);
  }
  // Check every landing page and rotate through seven country pages per day.
  // A full pass of all country profiles completes without flooding the live site.
  const countries = urls.filter(url => new URL(url).pathname.startsWith("/countries/"));
  const pages = urls.filter(url => !countries.includes(url));
  const day = Math.floor(now.getTime() / 86400000);
  for (let i = 0; i < Math.min(7, countries.length); i++) pages.push(countries[(day * 7 + i) % countries.length]);
  for (const url of pages) {
    if (new URL(url).origin !== ORIGIN) continue; // Never follow untrusted sitemap destinations.
    try {
      const page = await get(url);
      const issues = inspectPage(page.text, url, page.headers);
      report.checks.push({ url, ok: !issues.length, issues });
    } catch (error) {
      report.checks.push({ url, ok: false, issues: [error.message] });
    }
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
