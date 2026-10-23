import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { worksheetTotals, RESEARCH_TASKS, type ResearchWorksheet } from "./intelligence/research-plan.ts";
export type ResearchReportEvidence = { title: string; text: string };
export async function createResearchPdf(input: { name: string; worksheet: ResearchWorksheet; context: string[]; evidence: ResearchReportEvidence[]; sources: { title: string; url: string; reviewedAt: string | null }[] }) {
  const doc = await PDFDocument.create(); doc.registerFontkit(fontkit);
  doc.setTitle(`${input.name} | TGPI Personal Research`); doc.setAuthor("TGPI — The Global Polymath Institute"); doc.setSubject("Personal planning scenario and source-linked research; not a credential or eligibility decision");
  const [fontBytes, serifBytes, logoBytes] = await Promise.all([readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSans.ttf")), readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSerif.ttf")), readFile(path.join(process.cwd(), "src/assets/brand/tgpi-crest-print.png"))]);
  const font = await doc.embedFont(fontBytes, { subset: true }), serif = await doc.embedFont(serifBytes, { subset: true }), logo = await doc.embedPng(logoBytes);
  const navy = rgb(.035, .10, .19), gold = rgb(.65, .47, .16), muted = rgb(.32, .38, .44);
  const chars = new Set(font.getCharacterSet());
  const clean = (s: string) => Array.from(s.replace(/[\r\n\t]+/g, " ")).map(c => chars.has(c.codePointAt(0)!) ? c : "?").join("");
  let page = doc.addPage([595.28, 841.89]), y = 680;
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
  function header() { page.drawRectangle({ x: 0, y: 746, width: 596, height: 96, color: navy }); page.drawImage(logo, { x: 40, y: 764, width: 42, height: 58 }); page.drawText("TGPI", { x: 96, y: 797, size: 25, font: serif, color: rgb(1, 1, 1) }); page.drawText("THE GLOBAL POLYMATH INSTITUTE", { x: 97, y: 778, size: 8, font, color: rgb(.91, .82, .61) }); page.drawText("PERSONAL RESEARCH / DECISION BRIEF", { x: 40, y: 727, size: 9, font, color: gold }); }
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
  paragraph(input.name, 28, navy); paragraph(`Prepared ${stamp}. Personal working document.`, 9);
  paragraph("A clear decision starts with visible assumptions. This brief brings your scenario and available country evidence together, with unresolved questions kept visible.");
  section("01 / Your research context");
  for (const item of input.context) paragraph(item);
  const p = input.worksheet, total = worksheetTotals(p);
  paragraph(`Destination: ${input.name} | City: ${p.city || "Not specified"} | Period: ${p.months} months | Currency: ${p.currency}`);
  section("02 / Your financial scenario");
  const money = (n: number | null) => n === null ? "Not yet provided" : new Intl.NumberFormat("en", { style: "currency", currency: p.currency }).format(n);
  for (const [key, value] of Object.entries(p.monthly)) paragraph(`${key.charAt(0).toUpperCase() + key.slice(1)} / month: ${money(value)}`);
  paragraph(`Tuition for the entire period: ${money(p.tuition)} | Arrival / one-time: ${money(p.arrival)}`);
  paragraph(`Contingency: ${p.bufferPercent}% | Known monthly subtotal: ${money(total.knownMonthly)}`);
  paragraph(`${total.complete ? "Scenario total" : "Partial subtotal"}: ${money(total.total)}`, 18, navy);
  paragraph(`Calculation: monthly amounts × ${p.months} months + tuition + arrival costs + contingency. ${total.missing.length ? `Missing: ${total.missing.join(", ")}. This is not a complete budget.` : "All categories have an entered amount; their accuracy still depends on your quotes."}`);
  paragraph(`Quote date: ${p.quoteDate || "Not supplied"}. References: ${p.sourceNote || "Not supplied"}. All amounts above are user-authored assumptions, not TGPI-verified prices.`);
  section("03 / Research checkpoints");
  for (const task of RESEARCH_TASKS) { room(95); paragraph(`${p.completed.includes(task.id) ? "[Recorded]" : "[Open]"} ${task.title}`, 11, navy); paragraph(task.detail); }
  section("04 / Published evidence and limitations");
  if (!input.evidence.length) paragraph("A detailed editorial dossier is not available for this destination. Use the official authorities and inspect national statistics online. Missing evidence is not replaced with an estimate.");
  for (const item of input.evidence) { room(65); paragraph(item.title, 12, navy); paragraph(item.text); }
  section("05 / Source register");
  for (const source of input.sources) { room(65); paragraph(source.title, 10, navy); paragraph(`Editorial review: ${source.reviewedAt || "Unconfirmed"}. ${source.url}`, 9); }
  paragraph(`Live dossier: https://www.theglobalpolymath.com/countries/${p.country}`, 9);
  paragraph("Methodology: https://www.theglobalpolymath.com/intelligence", 9);
  section("Scope of this document");
  paragraph("This is a research and planning brief, not a certificate, visa assessment, financial approval or guarantee. National observations, institutional references and your personal estimates have different scopes. Reconfirm requirements with the competent authority before applying, paying or travelling. Source use does not imply endorsement or partnership. Destination imagery on TGPI may include AI-generated visual interpretations.");
  const pages = doc.getPages(); pages.forEach((pg, index) => { pg.drawLine({ start: { x: 40, y: 49 }, end: { x: 555, y: 49 }, thickness: .5, color: gold }); pg.drawText(`TGPI • Personal research • ${index + 1} / ${pages.length}`, { x: 40, y: 32, size: 8, font, color: muted }); pg.drawText("theglobalpolymath.com", { x: 422, y: 32, size: 8, font, color: muted }); });
  return doc.save();
}
