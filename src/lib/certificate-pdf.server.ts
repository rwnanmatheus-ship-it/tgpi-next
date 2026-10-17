import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont } from "pdf-lib";
import type { PublicTgpiLearningCredential } from "@/types/learning";

// Literal paths keep these assets visible to Next.js output file tracing.
const fontBytes = () =>
  readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSans.ttf"));
const crestBytes = () =>
  readFile(path.join(process.cwd(), "public/brand/tgpi-crest-v2-256.png"));

export async function createCertificatePdf(
  credential: PublicTgpiLearningCredential,
) {
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit);
  document.setTitle(`${credential.courseTitle} — TGPI Certificate`);
  document.setAuthor("TGPI — The Global Polymath Institute");
  document.setSubject(`Verified learning certificate ${credential.id}`);
  const [fontData, crestData] = await Promise.all([fontBytes(), crestBytes()]);
  const font = await document.embedFont(fontData, { subset: true });
  const crest = await document.embedPng(crestData);
  const page = document.addPage([841.89, 595.28]);
  const navy = rgb(11 / 255, 31 / 255, 58 / 255);
  const gold = rgb(181 / 255, 138 / 255, 42 / 255);
  const muted = rgb(0.33, 0.38, 0.45);
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 842,
    height: 596,
    color: rgb(0.985, 0.977, 0.953),
  });
  page.drawRectangle({
    x: 22,
    y: 22,
    width: 798,
    height: 551,
    borderColor: gold,
    borderWidth: 1,
  });
  page.drawRectangle({
    x: 30,
    y: 30,
    width: 782,
    height: 535,
    borderColor: rgb(0.84, 0.82, 0.77),
    borderWidth: 0.5,
  });
  page.drawImage(crest, { x: 391, y: 454, width: 60, height: 80 });
  const safeText = (value: string, selectedFont: PDFFont) => {
    const supported = new Set(selectedFont.getCharacterSet());
    return Array.from(value)
      .map((character) =>
        supported.has(character.codePointAt(0) || 0) ? character : "?",
      )
      .join("");
  };
  const center = (
    value: string,
    y: number,
    desiredSize: number,
    color = navy,
  ) => {
    const text = safeText(value.replace(/[\r\n]+/g, " "), font);
    const size = Math.min(
      desiredSize,
      730 / Math.max(1, font.widthOfTextAtSize(text, 1)),
    );
    page.drawText(text, {
      x: (842 - font.widthOfTextAtSize(text, size)) / 2,
      y,
      size,
      font,
      color,
    });
  };
  center("THE GLOBAL POLYMATH INSTITUTE", 434, 12, gold);
  center("Certificate of Achievement", 386, 32);
  center("This certificate is awarded to", 347, 12, muted);
  center(credential.publicName, 303, 29);
  center(
    "for completing the required learning and assessed performance in",
    270,
    11,
    muted,
  );
  center(credential.courseTitle, 237, 21);
  center(
    `${credential.assessmentScore}% mastery    •    ${credential.learningHours} learning hours`,
    201,
    12,
  );
  const date = new Date(credential.issuedAt);
  center(
    `Issued ${Number.isNaN(date.getTime()) ? credential.issuedAt : date.toISOString().slice(0, 10)}`,
    167,
    11,
    muted,
  );
  page.drawLine({
    start: { x: 120, y: 146 },
    end: { x: 722, y: 146 },
    thickness: 0.7,
    color: gold,
  });
  center(credential.id, 126, 10);
  center(
    `https://www.theglobalpolymath.com/verify/credentials/${encodeURIComponent(credential.id)}`,
    104,
    9,
    muted,
  );
  center(
    "Verify the live record to confirm current status and integrity.",
    82,
    9,
    muted,
  );
  center(
    "TGPI-issued professional learning certificate. Not a government degree or professional license.",
    56,
    8,
    muted,
  );
  return document.save();
}
