import { enemGuidePath } from "@/app/guia-paises/campaign";
import { guideCopy } from "@/app/guia-paises/copy";
import { publicGuides } from "@/lib/public-guides";

const origin = "https://www.theglobalpolymath.com";
const escapeXml = (value: string) => value.replace(/[<>&"']/g, char => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
})[char]!);

export function GET() {
  const portuguese = guideCopy["pt-BR"];
  const guides = [
    { path: enemGuidePath, language: "pt-BR", title: portuguese.enemGuide, description: portuguese.enemGuideDescription, date: "2026-11-27" },
    ...publicGuides.map(guide => ({
      path: `/guides/${guide.slug}`, language: "en", title: guide.title,
      description: guide.description, date: guide.reviewedAt,
    })),
  ];
  const items = guides.map(guide => {
    const url = escapeXml(origin + guide.path);
    const published = new Date(`${guide.date}T12:00:00Z`).toUTCString();
    return `<item xml:lang="${guide.language}"><title>${escapeXml(guide.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(guide.description)}</description><pubDate>${published}</pubDate></item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>TGPI · Global research guides</title><link>${origin}/guides</link><description>Practical research guides from The Global Polymath Institute.</description><atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
