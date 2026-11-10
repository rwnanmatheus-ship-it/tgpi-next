import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import sharp from "sharp";
import {
  PDFDocument,
  PDFName,
  PDFString,
  rgb,
  type PDFFont,
  type RGB,
} from "pdf-lib";
import type { PublicTgpiLearningCredential } from "@/types/learning";
import {
  CERTIFICATE_DESIGN_VERSION,
  certificateDate,
  certificateVerificationUrl,
} from "./certificate-presentation.ts";

const WIDTH = 841.89;
const HEIGHT = 595.28;
const NAVY = rgb(0.027, 0.064, 0.117);
const INK = rgb(0.067, 0.122, 0.185);
const GOLD = rgb(0.55, 0.374, 0.125);
const GILT = rgb(0.84, 0.69, 0.39);
const CHAMPAGNE = rgb(0.95, 0.861, 0.63);
const PAPER = rgb(0.993, 0.986, 0.963);
const VELLUM = rgb(0.976, 0.949, 0.879);
const LINE = rgb(0.855, 0.816, 0.71);
const MUTED = rgb(0.31, 0.356, 0.407);
const LIGHT = rgb(0.87, 0.908, 0.947);
const WHITE = rgb(1, 1, 1);

// Literal paths allow Next.js output tracing to include the print assets.
const sansBytes = () => readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSans.ttf"));
const serifBytes = () => readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSerif.ttf"));
const displayBytes = () => readFile(path.join(process.cwd(), "src/assets/fonts/CormorantGaramond-print.ttf"));
const crestBytes = () => readFile(path.join(process.cwd(), "src/assets/brand/tgpi-crest-print.png"));
let printSeal: Promise<Buffer> | undefined;
function sealBytes() {
  printSeal ??= readFile(path.join(process.cwd(), "public/brand/tgpi-certificate-seal-2026.webp"))
    .then((webSeal) => sharp(webSeal).png().toBuffer())
    .catch((error: unknown) => {
      printSeal = undefined;
      throw error;
    });
  return printSeal;
}

/** Visual edition only. The original signed learning record remains the issuer's source of truth. */
export async function createCertificatePdf(
  credential: PublicTgpiLearningCredential,
  options: { personalBirthDate?: string } = {},
) {
  if (credential.status !== "active" || !credential.integrityVerified) {
    throw new Error("Only an active, integrity-verified credential can render a certificate.");
  }

  const pt = credential.professionalEvidence?.certificateLanguage === "pt-BR";
  const locale = pt ? "pt-BR" : "en";
  const say = (en: string, br: string) => pt ? br : en;
  const privateSharing = credential.professionalEvidence?.sharing === false;
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit);
  document.setTitle(`${credential.courseTitle} — ${say("TGPI Academic Certificate", "Certificado Acadêmico TGPI")}`);
  document.setAuthor("TGPI — The Global Polymath Institute");
  document.setSubject(`Verified learning certificate ${credential.id} for ${credential.publicName}; document design ${CERTIFICATE_DESIGN_VERSION}`);
  document.setLanguage(locale);

  const [sansData, serifData, displayData, crestData, sealData] = await Promise.all([
    sansBytes(), serifBytes(), displayBytes(), crestBytes(), sealBytes(),
  ]);
  const [sans, serif, display, crest, seal] = await Promise.all([
    document.embedFont(sansData, { subset: true }),
    document.embedFont(serifData, { subset: true }),
    document.embedFont(displayData, { subset: false }),
    document.embedPng(crestData),
    document.embedPng(sealData),
  ]);
  const page = document.addPage([WIDTH, HEIGHT]);
  const characterSets = new Map([display, serif, sans].map((font) => [font, new Set(font.getCharacterSet())]));
  const textStyle = (value: string, preferredFont: PDFFont) => {
    const characters = Array.from(value.normalize("NFC").replace(/\s+/gu, " ").trim());
    const font = [preferredFont, serif, sans].find((candidate) => characters.every(
      (character) => characterSets.get(candidate)?.has(character.codePointAt(0) ?? 0),
    )) ?? preferredFont;
    const supported = characterSets.get(font);
    return {
      font,
      hasUnsupportedGlyphs: characters.some((character) => !supported?.has(character.codePointAt(0) ?? 0)),
      value: characters.map((character) => supported?.has(character.codePointAt(0) ?? 0) ? character : "?").join(""),
    };
  };
  function text(
    value: string, x: number, y: number, size: number,
    font = sans, color: RGB = INK, width = 540, align: "left" | "center" = "left",
  ) {
    const styled = textStyle(value, font);
    if (!styled.value) return;
    const widthAtOne = styled.font.widthOfTextAtSize(styled.value, 1);
    const fittedSize = Math.min(size, width / Math.max(widthAtOne, 1));
    page.drawText(styled.value, {
      x: align === "center" ? x - widthAtOne * fittedSize / 2 : x,
      y, size: fittedSize, font: styled.font, color,
    });
  }
  function headline(value: string, x: number, y: number, width: number, size: number, leading: number, font = display, color = INK, maxLines = 2) {
    const styled = textStyle(value, font);
    const fontWidth = (line: string) => styled.font.widthOfTextAtSize(line, 1);
    if (fontWidth(styled.value) * size <= width) {
      text(styled.value, x, y, size, styled.font, color, width);
      return styled.hasUnsupportedGlyphs;
    }
    const characters = Array.from(styled.value);
    const wordBreaks = characters.flatMap((character, index) => character === " " ? [index] : []);
    const breaks = wordBreaks.length > 0 ? wordBreaks : characters.slice(1).map((_, index) => index + 1);
    let best = { lines: [styled.value], width: fontWidth(styled.value) };
    for (const index of breaks) {
      const first = characters.slice(0, index).join("").trim();
      const second = characters.slice(index).join("").trim();
      const measured = Math.max(fontWidth(first), fontWidth(second));
      if (measured < best.width) best = { lines: [first, second], width: measured };
    }
    // Allow unusually long legal names a third line before shrinking the type.
    if (maxLines === 3 && width / best.width < 26) {
      for (const [firstIndex, firstBreak] of breaks.entries()) {
        const first = characters.slice(0, firstBreak).join("").trim();
        const firstWidth = fontWidth(first);
        if (firstWidth >= best.width) break;
        for (const secondBreak of breaks.slice(firstIndex + 1)) {
          const middle = characters.slice(firstBreak, secondBreak).join("").trim();
          const middleWidth = fontWidth(middle);
          if (middleWidth >= best.width) break;
          const last = characters.slice(secondBreak).join("").trim();
          const measured = Math.max(firstWidth, middleWidth, fontWidth(last));
          if (measured < best.width) best = { lines: [first, middle, last], width: measured };
        }
      }
    }
    const threeLines = best.lines.length === 3;
    const fittedSize = Math.min(threeLines ? 29 : size, width / Math.max(best.width, 1));
    best.lines.forEach((line, index) =>
      text(line, x, y - index * (threeLines ? 26 : leading), fittedSize, styled.font, color, width));
    return styled.hasUnsupportedGlyphs;
  }
  const segment = (x1: number, y1: number, x2: number, y2: number, color = LINE, thickness = 0.5) =>
    page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, color, thickness });
  const railCenter = 717;
  const railText = (value: string, y: number, size: number, font = sans, color = LIGHT) =>
    text(value, railCenter, y, size, font, color, 147, "center");
  const diamond = (x: number, y: number, size: number, color: RGB) =>
    page.drawSvgPath(`M 0 ${-size} L ${size} 0 L 0 ${size} L ${-size} 0 Z`, { x, y, color });
  function engraving(x: number, y: number, length: number, offset: (t: number) => number, color: RGB, opacity: number, vertical = false) {
    const steps = Math.ceil(length / 2);
    const commands = Array.from({ length: steps + 1 }, (_, index) => {
      const t = index / steps;
      const advance = t * length;
      const cross = offset(t);
      return `${index === 0 ? "M" : "L"} ${(vertical ? cross : advance).toFixed(2)} ${(vertical ? advance : cross).toFixed(2)}`;
    });
    page.drawSvgPath(commands.join(" "), { x, y, borderColor: color, borderWidth: 0.25, borderOpacity: opacity });
  }
  function rosette(x: number, y: number, radius: number, color: RGB, opacity: number) {
    for (let layer = 0; layer < 5; layer++) {
      const commands = Array.from({ length: 193 }, (_, step) => {
        const angle = step * Math.PI / 96;
        const r = radius * (0.82 + 0.17 * Math.cos(angle * 12 + layer * Math.PI / 5));
        return `${step === 0 ? "M" : "L"} ${(r * Math.cos(angle)).toFixed(2)} ${(r * Math.sin(angle)).toFixed(2)}`;
      });
      page.drawSvgPath(`${commands.join(" ")} Z`, { x, y, borderColor: color, borderWidth: 0.45, borderOpacity: opacity });
    }
  }

  // The engraved field is decorative. Verification relies on the signed issuer record.
  page.drawRectangle({ x: 0, y: 0, width: WIDTH, height: HEIGHT, color: PAPER });
  for (const [inset, color] of [[18, NAVY], [20.1, VELLUM], [34.7, PAPER]] as const) {
    page.drawRectangle({ x: inset, y: inset, width: WIDTH - inset * 2, height: HEIGHT - inset * 2, color });
  }
  for (const [inset, thickness, color] of [[21.6, 0.55, GOLD], [32.8, 0.5, GOLD], [35.8, 0.85, NAVY], [39, 0.35, GILT]] as const) {
    page.drawRectangle({ x: inset, y: inset, width: WIDTH - inset * 2, height: HEIGHT - inset * 2, borderColor: color, borderWidth: thickness });
  }
  for (let phase = 0; phase < 7; phase++) {
    const braid = (t: number) => 4.6 * Math.sin(t * 104 * Math.PI + phase * Math.PI / 3.5);
    const sideBraid = (t: number) => braid(t * 2 / 3);
    for (const y of [27.2, HEIGHT - 27.2]) engraving(38, y, WIDTH - 76, braid, GOLD, 0.59);
    for (const x of [27.2, WIDTH - 27.2]) engraving(x, HEIGHT - 38, HEIGHT - 76, sideBraid, GOLD, 0.59, true);
  }
  for (const [x, y, dx, dy] of [[40, 40, 1, 1], [WIDTH - 40, 40, -1, 1], [40, HEIGHT - 40, 1, -1], [WIDTH - 40, HEIGHT - 40, -1, -1]]) {
    const cx = x - dx * 12.8;
    const cy = y - dy * 12.8;
    rosette(cx, cy, 9.4, GOLD, 0.61);
    diamond(cx, cy, 2.15, NAVY);
    for (let i = 0; i < 3; i++) {
      const start = 2.6 + i * 3.25;
      const end = 22 - i * 4;
      segment(x + dx * start, y + dy * start, x + dx * end, y + dy * start, GOLD, 0.43);
      segment(x + dx * start, y + dy * start, x + dx * start, y + dy * end, GOLD, 0.43);
    }
    diamond(x + dx * 11, y + dy * 11, 1.8, GILT);
  }
  for (const y of [27.2, HEIGHT - 27.2]) {
    page.drawRectangle({ x: WIDTH / 2 - 21, y: y - 5, width: 42, height: 10, color: VELLUM });
    diamond(WIDTH / 2, y, 4.2, NAVY);
    diamond(WIDTH / 2, y, 1.85, GILT);
    for (const direction of [-1, 1]) {
      diamond(WIDTH / 2 + direction * 11, y, 1.8, GOLD);
      segment(WIDTH / 2 + direction * 15, y, WIDTH / 2 + direction * 21, y, GOLD, 0.5);
    }
  }
  for (let row = 0; row < 42; row++) {
    engraving(40, 51 + row * 12, 586, (t) => 5.4 * Math.sin(t * 6 * Math.PI + row * 0.32) + 1.8 * Math.sin(t * 13 * Math.PI), NAVY, 0.17);
  }
  rosette(453, 326, 153, GOLD, 0.21);
  rosette(453, 326, 125, GOLD, 0.14);
  rosette(116, 158, 58, GOLD, 0.12);
  for (const radius of [47, 73, 101, 125]) {
    page.drawCircle({ x: 453, y: 326, size: radius, borderColor: GOLD, borderWidth: 0.5, borderOpacity: 0.16 });
  }
  for (const size of [33, 65, 98]) {
    page.drawEllipse({ x: 453, y: 326, xScale: size, yScale: 101, borderColor: GOLD, borderWidth: 0.44, borderOpacity: 0.15 });
    page.drawEllipse({ x: 453, y: 326, xScale: 101, yScale: size, borderColor: GOLD, borderWidth: 0.44, borderOpacity: 0.15 });
  }
  for (const angle of [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4]) {
    const dx = 115 * Math.cos(angle);
    const dy = 115 * Math.sin(angle);
    page.drawLine({ start: { x: 453 - dx, y: 326 - dy }, end: { x: 453 + dx, y: 326 + dy }, color: GOLD, thickness: 0.45, opacity: 0.11 });
  }

  page.drawRectangle({ x: 626, y: 39, width: WIDTH - 665, height: HEIGHT - 78, color: NAVY });
  for (let i = 0; i < 40; i++) {
    page.drawRectangle({ x: 627 + i * 4.37, y: 39, width: 4.38, height: HEIGHT - 78, color: rgb(0.15, 0.24, 0.4), opacity: 0.28 * Math.sin(i * Math.PI / 40) });
  }
  for (let column = 0; column < 18; column++) {
    engraving(643 + column * 8.7, HEIGHT - 45, HEIGHT - 90, (t) => 4 * Math.sin(t * 9 * Math.PI + column * 0.43), CHAMPAGNE, 0.15, true);
  }
  segment(626, 39, 626, HEIGHT - 39, GILT, 1.4);
  segment(632, 44, 632, HEIGHT - 44, GILT, 0.35);
  segment(797, 44, 797, HEIGHT - 44, GILT, 0.35);
  for (const y of [545, 55]) {
    segment(642, y, 694, y, GILT, 0.4);
    segment(740, y, 795, y, GILT, 0.4);
    diamond(railCenter, y, 2.6, CHAMPAGNE);
  }

  // Issuer, formal title, recipient, and achievement in a single reading order.
  page.drawImage(crest, { x: 62, y: 501, width: 40, height: 47 });
  text("The Global Polymath Institute", 114, 524, 23, display, INK);
  text(say("EDUCATION FOR A GLOBAL LIFE", "EDUCAÇÃO PARA UMA VIDA GLOBAL"), 116, 508, 7.3, sans, GOLD);
  segment(62, 489, 600, 489, GILT, 0.6);
  segment(62, 489, 110, 489, GOLD, 1.4);
  diamond(599, 489, 2.35, GOLD);
  text(say("INSTITUTIONAL RECORD  /  ASSESSED LEARNING", "REGISTRO INSTITUCIONAL  /  APRENDIZAGEM AVALIADA"), 64, 469, 7.8, sans, GOLD);
  text(say("ACADEMIC CERTIFICATE", "CERTIFICADO ACADÊMICO"), 59, 418, 49, display, NAVY, 542);
  segment(63, 403, 162, 403, GOLD, 1.15);
  diamond(170, 403, 2.4, GOLD);
  segment(178, 403, 599, 403, LINE, 0.5);
  text(say("LEARNER'S FULL NAME", "NOME COMPLETO DO ALUNO"), 64, 382, 7.4, sans, GOLD);
  const originalNameInRecord = headline(credential.publicName, 61, 345, 538, 42, 32, display, INK, 3);
  segment(64, 286, 600, 286, GILT, 0.55);
  diamond(66, 286, 2.5, GOLD);
  const recipientNotes = [
    originalNameInRecord && say("Original name spelling in the issuer record", "Grafia original do nome no registro do emissor"),
    options.personalBirthDate && /^\d{4}-\d{2}-\d{2}$/.test(options.personalBirthDate)
      && `${say("Birth date", "Nascimento")} ${certificateDate(options.personalBirthDate, locale)} (${say("provided by the holder", "informado pelo titular")})`,
  ].filter(Boolean).join("  ·  ");
  text(recipientNotes, 64, 275, 6.5, sans, MUTED);
  text(say("For completing the required learning and passing the course assessment in", "Pela conclusão das atividades e aprovação na avaliação do curso"), 64, 260, 8, sans, MUTED);
  headline(credential.courseTitle, 62, 237, 539, 26, 24);
  const skills = credential.skills?.slice(0, 4).map((skill) => skill.name).filter(Boolean).join("  ·  ");
  if (skills) {
    text(say("DEMONSTRATED COMPETENCIES", "COMPETÊNCIAS DEMONSTRADAS"), 64, 192, 6.5, sans, GOLD);
    headline(skills, 64, 179, 535, 8, 10, sans, MUTED);
  }
  if (credential.documentNature) text(credential.documentNature, 64, 158, 6.8, sans, MUTED);

  page.drawRectangle({ x: 58, y: 101, width: 545, height: 51, color: rgb(0.971, 0.949, 0.891) });
  segment(58, 152, 603, 152, GILT, 0.65);
  segment(58, 101, 603, 101, LINE, 0.5);
  const hasWorkload = Number.isFinite(credential.learningHours) && credential.learningHours > 0;
  const columns = [
    { label: say("ISSUED", "EMISSÃO"), value: certificateDate(credential.issuedAt, locale) },
    { label: say("COMPLETED", "CONCLUSÃO"), value: credential.completedAt ? certificateDate(credential.completedAt, locale) : "—" },
    { label: say("ASSESSMENT", "AVALIAÇÃO"), value: Number.isFinite(credential.assessmentScore) ? `${credential.assessmentScore}%` : "—" },
    {
      label: credential.automatedEvidence ? say("EST. WORKLOAD", "CARGA ESTIMADA") : say("WORKLOAD", "CARGA HORÁRIA"),
      value: hasWorkload ? `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(credential.learningHours)} ${say("hours", "horas")}` : "—",
    },
  ];
  const columnWidth = 135;
  columns.forEach(({ label, value }, index) => {
    const x = 66 + index * columnWidth;
    if (index > 0) segment(x - 6, 112, x - 6, 140);
    text(label, x, 137, 6.4, sans, GOLD, columnWidth - 17);
    text(value, x, 115, 19, display, NAVY, columnWidth - 17);
  });
  text("TGPI GLOBAL ID", 64, 88, 6.3, sans, GOLD);
  text(credential.identityEvidence?.globalKeyId || "—", 64, 74, 8.2, sans, INK, 203);
  text(say("CERTIFICATE RECORD", "REGISTRO DO CERTIFICADO"), 281, 88, 6.3, sans, GOLD);
  text(credential.id, 281, 74, 8.2, sans, INK, 318);
  const metadata = [
    credential.courseVersion && `${say("Course edition", "Edição do curso")} ${credential.courseVersion}`,
    credential.professionalEvidence?.instructionLanguage && `${say("Instruction language", "Idioma do curso")} ${credential.professionalEvidence.instructionLanguage}`,
    Number.isFinite(credential.masteryThreshold) && `${say("Required mastery", "Domínio exigido")} ${credential.masteryThreshold}%`,
  ].filter(Boolean).join("  ·  ");
  text(metadata, 64, 58, 6.6, sans, MUTED);
  text(say("TGPI continuing education  ·  Acceptance is at the discretion of the receiving institution.", "Curso livre de educação continuada TGPI  ·  Aceitação a critério da instituição destinatária."), 64, 44, 6.2, sans, MUTED);

  // Engraved secondary emblem and the full-resolution institutional seal supplied by TGPI.
  railText("TGPI", 520, 28, display, CHAMPAGNE);
  railText(say("ISSUER CREDENTIAL", "CREDENCIAL INSTITUCIONAL"), 502, 6.9, sans, LIGHT);
  rosette(railCenter, 419, 80, CHAMPAGNE, 0.34);
  page.drawCircle({ x: railCenter, y: 419, size: 77, borderColor: GILT, borderWidth: 0.55, borderOpacity: 0.57 });
  page.drawImage(seal, { x: railCenter - 75, y: 344, width: 150, height: 150 });
  railText(say("INSTITUTIONAL SEAL", "SELO INSTITUCIONAL"), 334, 6.5, sans, CHAMPAGNE);
  segment(658, 321, 776, 321, GILT, 0.45);
  diamond(railCenter, 321, 2.8, CHAMPAGNE);
  railText(say("ACADEMIC RECORD", "REGISTRO ACADÊMICO"), 307, 6.5, sans, LIGHT);
  railText(say("ISSUER-VERIFIED LEARNING", "APRENDIZAGEM VALIDADA PELA TGPI"), 294, 5.9, sans, LIGHT);

  const verificationUrl = certificateVerificationUrl(credential.id);
  const qr = QRCode.create(verificationUrl, { errorCorrectionLevel: "H" });
  const qrSize = 109;
  const quiet = 4;
  const total = qr.modules.size + quiet * 2;
  const unit = qrSize / total;
  const qrX = railCenter - qrSize / 2;
  const qrY = 163;
  page.drawRectangle({ x: qrX - 6, y: qrY - 6, width: qrSize + 12, height: qrSize + 12, color: WHITE, borderColor: GILT, borderWidth: 0.9 });
  for (let row = 0; row < qr.modules.size; row++) {
    for (let column = 0; column < qr.modules.size; column++) {
      if (!qr.modules.get(row, column)) continue;
      const first = column;
      while (column + 1 < qr.modules.size && qr.modules.get(row, column + 1)) column++;
      page.drawRectangle({
        x: qrX + (first + quiet) * unit,
        y: qrY + (total - row - quiet - 1) * unit,
        width: (column - first + 1) * unit + 0.005,
        height: unit + 0.005,
        color: NAVY,
      });
    }
  }
  for (const [x, y, dx, dy] of [[qrX - 7, qrY - 7, 1, 1], [qrX + qrSize + 7, qrY - 7, -1, 1], [qrX - 7, qrY + qrSize + 7, 1, -1], [qrX + qrSize + 7, qrY + qrSize + 7, -1, -1]]) {
    segment(x, y, x + dx * 11, y, CHAMPAGNE, 1.5);
    segment(x, y, x, y + dy * 11, CHAMPAGNE, 1.5);
  }
  const annotation = document.context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("Link"),
    Rect: [qrX - 6, qrY - 6, qrX + qrSize + 6, qrY + qrSize + 6],
    Border: [0, 0, 0],
    A: { Type: PDFName.of("Action"), S: PDFName.of("URI"), URI: PDFString.of(verificationUrl) },
  });
  page.node.addAnnot(document.context.register(annotation));
  railText(say("SCAN TO VERIFY", "ESCANEIE PARA VERIFICAR"), 142, 7.1, sans, CHAMPAGNE);
  railText(say("Compare the printed data to the issuer record.", "Compare os dados impressos ao registro da TGPI."), 129, 5.7, sans, LIGHT);
  railText(privateSharing ? say("Access controlled by the holder", "Acesso controlado pelo titular") : say("Live status from the issuer", "Status atualizado pelo emissor"), 117, 5.8, sans, LIGHT);
  if (credential.documentFingerprint) {
    railText(say("DOCUMENT COMPARISON CODE", "CÓDIGO DE CONFERÊNCIA"), 93, 6.1, sans, CHAMPAGNE);
    railText(credential.documentFingerprint, 77, 9, sans, WHITE);
  }
  railText(`THEGLOBALPOLYMATH.COM  /  ${CERTIFICATE_DESIGN_VERSION}`, 44, 5.8, sans, CHAMPAGNE);
  return document.save();
}
