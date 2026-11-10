import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { worksheetTotals, RESEARCH_TASKS, type ResearchWorksheet } from "./intelligence/research-plan.ts";
import { translate } from "./localization/messages.ts";
import type { Locale } from "./localization/config.ts";
import { researchReportCopy } from "./intelligence/report-copy.ts";
export type ResearchReportEvidence = { title: string; text: string };
export async function createResearchPdf(input: { name: string; worksheet: ResearchWorksheet; context: string[]; evidence: ResearchReportEvidence[]; sources: { title: string; url: string; reviewedAt: string | null }[] }, locale: Locale = "en") {
  const c = researchReportCopy[locale];
  const t = (value: string) => translate(locale, value);
  const doc = await PDFDocument.create(); doc.registerFontkit(fontkit);
  doc.setTitle(`${input.name} | ${c.title}`); doc.setAuthor("TGPI — The Global Polymath Institute"); doc.setSubject(c.disclaimer);
  const [fontBytes, serifBytes, logoBytes] = await Promise.all([readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSans.ttf")), readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSerif.ttf")), readFile(path.join(process.cwd(), "src/assets/brand/tgpi-crest-print.png"))]);
  const font = await doc.embedFont(fontBytes, { subset: true }), serif = await doc.embedFont(serifBytes, { subset: true }), logo = await doc.embedPng(logoBytes);
  const navy = rgb(.035, .10, .19), gold = rgb(.65, .47, .16), muted = rgb(.32, .38, .44);
  const chars = new Set(font.getCharacterSet());
  const clean = (s: string) => Array.from(s.replace(/[\r\n\t]+/g, " ")).map(c => chars.has(c.codePointAt(0)!) ? c : "?").join("");
  let page = doc.addPage([595.28, 841.89]), y = 680;
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
  function header() { page.drawRectangle({ x: 0, y: 746, width: 596, height: 96, color: navy }); page.drawImage(logo, { x: 40, y: 764, width: 42, height: 58 }); page.drawText("TGPI", { x: 96, y: 797, size: 25, font: serif, color: rgb(1, 1, 1) }); page.drawText("THE GLOBAL POLYMATH INSTITUTE", { x: 97, y: 778, size: 8, font, color: rgb(.91, .82, .61) }); page.drawText(c.brief, { x: 40, y: 727, size: 9, font, color: gold }); }
  header();
  function room(height: number) { if (y - height < 63) { page = doc.addPage([595.28, 841.89]); y = 699; header(); } }
  function paragraph(text: string, size = 10, color = muted) {
    const words = clean(text).split(/\s+/); let line = "";
    const draw = () => { room(size * 1.65); page.drawText(line, { x: 40, y, size, font, color }); y -= size * 1.65; line = ""; };
    for (const word of words) {
      // Break long URLs and unbroken user input without shrinking the text.
      if (font.widthOfTextAtSize(word, size) > 510) { if (line) draw(); for (const c of word) { if (font.widthOfTextAtSize(line + c, size) > 510) draw(); line += c; } continue; }
      if (font.widthOfTextAtSize((line ? line + " " : "") + word, size) > 510) draw(); line += (line ? " " : "") + word;
    }
    if (line) draw(); y -= 7;
  }
  function section(title: string) { room(90); y -= 24; page.drawLine({ start: { x: 40, y: y + 20 }, end: { x: 555, y: y + 20 }, thickness: .6, color: rgb(.84, .81, .74) }); paragraph(title, 14, navy); }
  paragraph(input.name, 28, navy); paragraph(`${c.prepared} ${stamp}. ${c.working}`, 9);
  paragraph(c.introduction);
  section(`01 / ${c.context}`);
  for (const item of input.context) paragraph(item);
  const p = input.worksheet, total = worksheetTotals(p);
  paragraph(`${c.destination}: ${input.name} | ${c.city}: ${p.city || c.notSpecified} | ${c.period}: ${p.months} ${p.months === 1 ? c.month : c.months} | ${c.currency}: ${p.currency}`);
  section(`02 / ${c.financial}`);
  const money = (n: number | null) => n === null ? c.notYetProvided : new Intl.NumberFormat(locale, { style: "currency", currency: p.currency }).format(n);
  for (const [key, value] of Object.entries(p.monthly)) paragraph(`${t(key).charAt(0).toLocaleUpperCase(locale) + t(key).slice(1)} / ${c.month}: ${money(value)}`);
  paragraph(`${c.tuition}: ${money(p.tuition)} | ${c.arrival}: ${money(p.arrival)}`);
  paragraph(`${c.contingency}: ${p.bufferPercent}% | ${c.knownMonthly}: ${money(total.knownMonthly)}`);
  paragraph(`${total.complete ? c.scenarioTotal : c.partialSubtotal}: ${money(total.total)}`, 18, navy);
  paragraph(`${c.calculation.replace("{months}", String(p.months))} ${total.missing.length ? `${c.missing}: ${total.missing.map(t).join(", ")}. ${c.incomplete}` : c.complete}`);
  paragraph(`${c.quoteDate}: ${p.quoteDate || c.notSupplied}. ${c.references}: ${p.sourceNote || c.notSupplied}. ${c.assumptions}`);
  section(`03 / ${c.checkpoints}`);
  for (const task of RESEARCH_TASKS) { room(95); paragraph(`${p.completed.includes(task.id) ? `[${c.recorded}]` : `[${c.open}]`} ${t(task.title)}`, 11, navy); paragraph(t(task.detail)); }
  section(`04 / ${c.evidence}`);
  if (!input.evidence.length) paragraph(c.noDossier);
  for (const item of input.evidence) { room(65); paragraph(item.title, 12, navy); paragraph(item.text); }
  section(`05 / ${c.sources}`);
  for (const source of input.sources) { room(65); paragraph(source.title, 10, navy); paragraph(`${c.editorialReview}: ${source.reviewedAt || c.unconfirmed}. ${source.url}`, 9); }
  paragraph(`${c.liveDossier}: https://www.theglobalpolymath.com/countries/${p.country}`, 9);
  paragraph(`${c.methodology}: https://www.theglobalpolymath.com/intelligence`, 9);
  section(c.scope);
  paragraph(c.disclaimer);
  const pages = doc.getPages(); pages.forEach((pg, index) => { pg.drawLine({ start: { x: 40, y: 49 }, end: { x: 555, y: 49 }, thickness: .5, color: gold }); pg.drawText(`TGPI • ${c.personalResearch} • ${index + 1} / ${pages.length}`, { x: 40, y: 32, size: 8, font, color: muted }); pg.drawText("theglobalpolymath.com", { x: 422, y: 32, size: 8, font, color: muted }); });
  return doc.save();
}
