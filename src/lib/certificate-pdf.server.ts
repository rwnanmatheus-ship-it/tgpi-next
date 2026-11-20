import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import { PDFDocument, PDFName, PDFString, rgb, type PDFFont, type RGB } from "pdf-lib";
import type { PublicTgpiLearningCredential } from "@/types/learning";
import { CERTIFICATE_DESIGN_VERSION, certificateDate, certificateVerificationUrl } from "./certificate-presentation.ts";
import { credentialTrustPresentation } from "./credential-trust-presentation.ts";

const WIDTH = 841.89;
const HEIGHT = 595.28;
const CENTER = WIDTH / 2;
const NAVY = rgb(.047, .09, .153);
const INK = rgb(.09, .15, .22);
const GOLD = rgb(.51, .36, .14);
const GILT = rgb(.76, .63, .37);
const LINE = rgb(.83, .79, .69);
const PAPER = rgb(.998, .993, .978);
const MUTED = rgb(.34, .38, .43);
const WHITE = rgb(1, 1, 1);

// Literal paths are intentional: Next output tracing must package every print asset.
const sansBytes = () => readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSans.ttf"));
const serifBytes = () => readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSerif.ttf"));
const displayBytes = () => readFile(path.join(process.cwd(), "src/assets/fonts/CormorantGaramond-print.ttf"));
const crestBytes = () => readFile(path.join(process.cwd(), "src/assets/brand/tgpi-academic-crest-2026.png"));
const sealBytes = () => readFile(path.join(process.cwd(), "src/assets/brand/tgpi-academic-seal-2026.png"));
const integrityBytes = () => readFile(path.join(process.cwd(), "src/assets/brand/tgpi-integrity-seal-2026.png"));

/** A visual edition of an existing verified issuer record; never changes its signed evidence. */
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
  const [sansData, serifData, displayData, crestData, sealData, integrityData] = await Promise.all([
    sansBytes(), serifBytes(), displayBytes(), crestBytes(), sealBytes(), integrityBytes(),
  ]);
  const [sans, serif, display, crest, seal, integrity] = await Promise.all([
    document.embedFont(sansData, { subset: true }),
    document.embedFont(serifData, { subset: true }),
    document.embedFont(displayData, { subset: false }),
    document.embedPng(crestData), document.embedPng(sealData), document.embedPng(integrityData),
  ]);
  const page = document.addPage([WIDTH, HEIGHT]);
  const characterSets = new Map([display, serif, sans].map((font) => [font, new Set(font.getCharacterSet())]));
  function textStyle(value: string, preferredFont: PDFFont) {
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
  }
  function text(value: string, x: number, y: number, size: number, font = sans, color: RGB = INK, width = 680, align: "left" | "center" = "left") {
    const styled = textStyle(value, font);
    if (!styled.value) return;
    const measured = styled.font.widthOfTextAtSize(styled.value, 1);
    const fitted = Math.min(size, width / Math.max(measured, 1));
    page.drawText(styled.value, { x: align === "center" ? x - measured * fitted / 2 : x, y, size: fitted, font: styled.font, color });
  }
  const centered = (value: string, y: number, size: number, font = sans, color: RGB = INK, width = 690) => text(value, CENTER, y, size, font, color, width, "center");
  function headline(value: string, y: number, width: number, size: number, leading: number, maxLines = 2, font = display, color = INK) {
    const styled = textStyle(value, font);
    const measure = (line: string) => styled.font.widthOfTextAtSize(line, 1);
    if (measure(styled.value) * size <= width) {
      centered(styled.value, y, size, styled.font, color, width);
      return styled.hasUnsupportedGlyphs;
    }
    const chars = Array.from(styled.value);
    const spaces = chars.flatMap((ch, index) => ch === " " ? [index] : []);
    const breaks = spaces.length ? spaces : chars.slice(1).map((_, i) => i + 1);
    let best = { lines: [styled.value], width: measure(styled.value) };
    for (const index of breaks) {
      const lines = [chars.slice(0, index).join("").trim(), chars.slice(index).join("").trim()];
      const measured = Math.max(...lines.map(measure));
      if (measured < best.width) best = { lines, width: measured };
    }
    if (maxLines === 3 && width / best.width < 24) {
      for (const [i, first] of breaks.entries()) {
        const start = chars.slice(0, first).join("").trim();
        if (measure(start) >= best.width) break;
        for (const second of breaks.slice(i + 1)) {
          const middle = chars.slice(first, second).join("").trim();
          if (measure(middle) >= best.width) break;
          const lines = [start, middle, chars.slice(second).join("").trim()];
          const measured = Math.max(...lines.map(measure));
          if (measured < best.width) best = { lines, width: measured };
        }
      }
    }
    const recipient = maxLines === 3;
    const fitted = Math.min(size, width / Math.max(best.width, 1), recipient ? best.lines.length === 3 ? 22 : 29 : size);
    const lineSpacing = recipient ? best.lines.length === 3 ? 23 : 30 : leading;
    best.lines.forEach((line, index) => centered(line, y - index * lineSpacing, fitted, styled.font, color, width));
    return styled.hasUnsupportedGlyphs;
  }
  const line = (x1: number, y1: number, x2: number, y2: number, color = LINE, thickness = .5, opacity = 1) =>
    page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, color, thickness, opacity });
  const diamond = (x: number, y: number, size: number, color = GOLD) =>
    page.drawSvgPath(`M 0 ${-size} L ${size} 0 L 0 ${size} L ${-size} 0 Z`, { x, y, color });

  // Fine engraved border and a quiet field; ornament stays clear of the learner's achievement.
  page.drawRectangle({ x: 0, y: 0, width: WIDTH, height: HEIGHT, color: PAPER });
  for (const [inset, weight, color] of [[20, 1.35, NAVY], [24, .45, GILT], [32, .55, GOLD], [36, .25, LINE]] as const) {
    page.drawRectangle({ x: inset, y: inset, width: WIDTH - inset * 2, height: HEIGHT - inset * 2, borderColor: color, borderWidth: weight });
  }
  for (const y of [28, HEIGHT - 28]) {
    for (let phase = 0; phase < 3; phase++) {
      const points = Array.from({ length: 375 }, (_, i) => {
        const x = 43 + i * (WIDTH - 86) / 374;
        const dy = 1.65 * Math.sin(i * .43 + phase * Math.PI * 2 / 3);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${dy.toFixed(2)}`;
      });
      page.drawSvgPath(points.join(" "), { x: 0, y, borderColor: GOLD, borderWidth: .18, borderOpacity: .5 });
    }
    page.drawRectangle({ x: CENTER - 30, y: y - 4, width: 60, height: 8, color: PAPER });
    diamond(CENTER, y, 3.2);
    line(CENTER - 26, y, CENTER - 9, y, GOLD, .4);
    line(CENTER + 9, y, CENTER + 26, y, GOLD, .4);
  }
  for (const [x, y, dx, dy] of [[38, 38, 1, 1], [WIDTH - 38, 38, -1, 1], [38, HEIGHT - 38, 1, -1], [WIDTH - 38, HEIGHT - 38, -1, -1]]) {
    for (let ring = 0; ring < 3; ring++) {
      const d = ring * 4;
      line(x + dx * d, y + dy * d, x + dx * (30 - ring * 3), y + dy * d, GOLD, ring ? .35 : .8);
      line(x + dx * d, y + dy * d, x + dx * d, y + dy * (30 - ring * 3), GOLD, ring ? .35 : .8);
    }
    diamond(x + dx * 16, y + dy * 16, 2.3);
  }
  // Faint armillary watermark, fully vector and unobtrusive in print.
  const waterY = 308;
  page.drawCircle({ x: CENTER, y: waterY, size: 126, borderColor: GOLD, borderWidth: .4, borderOpacity: .045 });
  for (const radius of [40, 81, 119]) {
    page.drawEllipse({ x: CENTER, y: waterY, xScale: radius, yScale: 119, borderColor: GOLD, borderWidth: .35, borderOpacity: .045 });
    page.drawEllipse({ x: CENTER, y: waterY, xScale: 119, yScale: radius, borderColor: GOLD, borderWidth: .35, borderOpacity: .045 });
  }
  page.drawImage(crest, { x: CENTER - 20.8, y: 505, width: 41.6, height: 49 });
  centered("The Global Polymath Institute", 483, 25, display, NAVY);
  centered(say("PRIVATE EDUCATION  ·  GLOBAL LEARNING", "EDUCAÇÃO PRIVADA  ·  APRENDIZAGEM GLOBAL"), 469, 6.9, sans, GOLD);
  line(170, 455, CENTER - 13, 455, LINE, .5);
  line(CENTER + 13, 455, WIDTH - 170, 455, LINE, .5);
  diamond(CENTER, 455, 2.2);
  centered(say("CERTIFICATE OF ACHIEVEMENT", "CERTIFICADO DE CONCLUSÃO"), 421, 34, display, NAVY, 700);
  centered(credential.documentNature || say("PROFESSIONAL & CONTINUING EDUCATION", "EDUCAÇÃO PROFISSIONAL E CONTINUADA"), 406, 7, sans, GOLD);
  centered(say("This certificate is awarded to", "Este certificado é conferido a"), 382, 9.1, sans, MUTED);
  const unsupportedName = headline(credential.publicName, 355, 690, 39, 24, 3);
  centered(say("For completing the required learning and passing the course assessment in", "Pela conclusão das atividades e aprovação na avaliação do curso"), 292, 8.7, sans, MUTED);
  headline(credential.courseTitle, 265, 675, 25, 23);
  const skills = credential.skills?.slice(0, 4).map((skill) => skill.name).filter(Boolean).join("  ·  ");
  if (skills) centered(skills, 221, 7.2, sans, MUTED, 690);
  const hasWorkload = Number.isFinite(credential.learningHours) && credential.learningHours > 0;
  const metrics = [
    { label: say("ISSUED", "EMISSÃO"), value: certificateDate(credential.issuedAt, locale) },
    ...(credential.completedAt ? [{ label: say("COMPLETED", "CONCLUSÃO"), value: certificateDate(credential.completedAt, locale) }] : []),
    { label: credential.automatedEvidence ? say("AUTOMATED ASSESSMENT", "AVALIAÇÃO AUTOMATIZADA") : say("ASSESSMENT", "AVALIAÇÃO"), value: Number.isFinite(credential.assessmentScore) ? `${credential.assessmentScore}%` : "—" },
    { label: credential.automatedEvidence ? say("ESTIMATED WORKLOAD", "CARGA ESTIMADA") : say("LEARNING HOURS", "CARGA HORÁRIA"), value: hasWorkload ? `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(credential.learningHours)} ${say("hours", "horas")}` : "—" },
  ];
  const metricWidth = 660 / metrics.length;
  line(91, 210, WIDTH - 91, 210, LINE, .5);
  metrics.forEach(({ label, value }, i) => {
    const x = 91 + metricWidth * (i + .5);
    if (i) line(91 + metricWidth * i, 181, 91 + metricWidth * i, 200, LINE, .35);
    text(label, x, 198, 6.1, sans, GOLD, metricWidth - 15, "center");
    text(value, x, 181, 16, display, NAVY, metricWidth - 18, "center");
  });
  line(64, 169, WIDTH - 64, 169, GILT, .65);
  diamond(CENTER, 169, 2.6);
  page.drawImage(seal, { x: 70, y: 72, width: 91, height: 91 });
  text(say("ACADEMIC REGISTRY", "REGISTRO ACADÊMICO"), 184, 151, 7, sans, GOLD, 370);
  text("The Global Polymath Institute", 184, 133, 16, display, NAVY, 370);
  text("TGPI GLOBAL ID", 184, 117, 5.9, sans, GOLD, 165);
  text(credential.identityEvidence?.globalKeyId || "—", 184, 106, 7.5, sans, INK, 165);
  text(say("CERTIFICATE RECORD", "REGISTRO DO CERTIFICADO"), 363, 117, 5.9, sans, GOLD, 260);
  text(credential.id, 363, 106, 7.2, sans, INK, 265);
  page.drawImage(integrity, { x: 575, y: 57, width: 48, height: 48 });
  text("TGPI Integrity Chain", 184, 86, 13, display, NAVY, 373);
  // The identity anchor is not evidence that the course certificate itself is on a blockchain.
  const anchorConfirmed = Boolean(credentialTrustPresentation(credential).anchorExplorerUrl);
  const chainDetail = anchorConfirmed
    ? say("Issuer record · Identity anchor on Base", "Registro TGPI · Âncora de identidade na Base")
    : say("Issuer record · Linked TGPI identity", "Registro TGPI · Identidade TGPI vinculada");
  text(chainDetail, 184, 74, 6.6, sans, MUTED, 373);
  if (credential.documentFingerprint) {
    text(`${say("Document comparison code", "Código de conferência")}: ${credential.documentFingerprint}`, 184, 62, 6.6, sans, MUTED, 373);
  }
  const verificationUrl = certificateVerificationUrl(credential.id);
  const qr = QRCode.create(verificationUrl, { errorCorrectionLevel: "M" });
  const qrSize = 83;
  const quiet = 4;
  const total = qr.modules.size + quiet * 2;
  const unit = qrSize / total;
  const qrX = 668;
  const qrY = 78;
  page.drawRectangle({ x: qrX - 3, y: qrY - 3, width: qrSize + 6, height: qrSize + 6, color: WHITE, borderColor: LINE, borderWidth: .4 });
  for (let row = 0; row < qr.modules.size; row++) {
    for (let column = 0; column < qr.modules.size; column++) {
      if (!qr.modules.get(row, column)) continue;
      const first = column;
      while (column + 1 < qr.modules.size && qr.modules.get(row, column + 1)) column++;
      page.drawRectangle({ x: qrX + (first + quiet) * unit, y: qrY + (total - row - quiet - 1) * unit, width: (column - first + 1) * unit + .005, height: unit + .005, color: NAVY });
    }
  }
  const annotation = document.context.obj({
    Type: PDFName.of("Annot"), Subtype: PDFName.of("Link"), Rect: [qrX - 3, qrY - 3, qrX + qrSize + 3, qrY + qrSize + 3], Border: [0, 0, 0],
    A: { Type: PDFName.of("Action"), S: PDFName.of("URI"), URI: PDFString.of(verificationUrl) },
  });
  page.node.addAnnot(document.context.register(annotation));
  text(say("SCAN TO VERIFY", "ESCANEIE PARA VERIFICAR"), qrX + qrSize / 2, 66, 6.2, sans, GOLD, 143, "center");
  text(privateSharing ? say("Access controlled by the holder", "Acesso controlado pelo titular") : say("Live issuer record", "Registro atualizado do emissor"), qrX + qrSize / 2, 55, 5.5, sans, MUTED, 143, "center");
  const notes = [
    options.personalBirthDate && /^\d{4}-\d{2}-\d{2}$/.test(options.personalBirthDate) && `${say("Birth date", "Nascimento")} ${certificateDate(options.personalBirthDate, locale)} (${say("provided by the holder", "informado pelo titular")})`,
    unsupportedName && say("Original name spelling in the issuer record", "Grafia original do nome no registro do emissor"),
    credential.courseVersion && `${say("Course edition", "Edição do curso")} ${credential.courseVersion}`,
    credential.professionalEvidence?.instructionLanguage && `${say("Instruction language", "Idioma do curso")} ${credential.professionalEvidence.instructionLanguage}`,
    Number.isFinite(credential.masteryThreshold) && `${say("Required mastery", "Domínio exigido")} ${credential.masteryThreshold}%`,
  ].filter(Boolean).join("  ·  ");
  centered(notes, 49, 5.4, sans, MUTED, 580);
  centered(say("TGPI private continuing education · Acceptance is at the discretion of the receiving institution.", "Educação continuada privada TGPI · Aceitação a critério da instituição destinatária."), 39, 5.5, sans, MUTED, 660);
  text(CERTIFICATE_DESIGN_VERSION, WIDTH - 51, 40, 5.5, sans, GOLD, 40, "center");
  return document.save();
}
