import { publicGuides } from "@/lib/public-guides";
const origin = "https://www.theglobalpolymath.com";
const escapeXml = (value: string) => value.replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
export function GET() {
 const items = publicGuides.map(guide => `<item><title>${escapeXml(guide.title)}</title><link>${origin}/guides/${guide.slug}</link><guid isPermaLink="true">${origin}/guides/${guide.slug}</guid><description>${escapeXml(guide.description)}</description><pubDate>${new Date(`${guide.reviewedAt}T12:00:00Z`).toUTCString()}</pubDate></item>`).join("");
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>TGPI · Global research guides</title><link>${origin}/guides</link><description>Practical research guides from The Global Polymath Institute.</description><language>en</language><atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
