import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import {
  PDFDocument,
  PDFName,
  PDFString,
  rgb,
  degrees,
  type PDFFont,
  type RGB,
} from "pdf-lib";
import type { PublicTgpiLearningCredential } from "@/types/learning";
// Relative import also allows standalone Node verification of the renderer.
import {
  CERTIFICATE_DESIGN_VERSION,
  certificateDate,
  certificateVerificationUrl,
} from "./certificate-presentation.ts";

// Literal paths are included by Next.js output-file tracing.
const sansBytes = () =>
  readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSans.ttf"));
const serifBytes = () =>
  readFile(path.join(process.cwd(), "src/assets/fonts/DejaVuSerif.ttf"));
const crestBytes = () =>
  readFile(path.join(process.cwd(), "src/assets/brand/tgpi-crest-print.png"));

export async function createCertificatePdf(
  credential: PublicTgpiLearningCredential,
  options: { personalBirthDate?: string } = {},
) {
  if (credential.status !== "active" || !credential.integrityVerified) {
    throw new Error(
      "Only an active, integrity-verified credential can render a certificate.",
    );
  }
  const document = await PDFDocument.create();
  const portuguese = credential.professionalEvidence?.certificateLanguage === "pt-BR";
  const locale = portuguese ? "pt-BR" : "en";
  const choose = (en: string, pt: string) => portuguese ? pt : en;
  const privateSharing = credential.professionalEvidence?.sharing === false;
  document.registerFontkit(fontkit);
  document.setTitle(`${credential.courseTitle} — TGPI Certificate`);
  document.setAuthor("TGPI — The Global Polymath Institute");
  document.setSubject(
    `Verified learning certificate ${credential.id}; document design ${CERTIFICATE_DESIGN_VERSION}`,
  );
  const [sansData, serifData, crestData] = await Promise.all([
    sansBytes(),
    serifBytes(),
    crestBytes(),
  ]);
  const [sans, serif, crest] = await Promise.all([
    document.embedFont(sansData, { subset: true }),
    document.embedFont(serifData, { subset: true }),
    document.embedPng(crestData),
  ]);
  const page = document.addPage([841.89, 595.28]);
  const navy = rgb(11 / 255, 31 / 255, 58 / 255),
    gold = rgb(181 / 255, 138 / 255, 42 / 255);
  const muted = rgb(0.34, 0.39, 0.46),
    line = rgb(0.84, 0.82, 0.77),
    white = rgb(1, 1, 1);
  const supported = new Map<PDFFont, Set<number>>([
    [sans, new Set(sans.getCharacterSet())],
    [serif, new Set(serif.getCharacterSet())],
  ]);
  const clean = (value: string, font: PDFFont) =>
    Array.from(value.replace(/[\r\n]+/g, " "))
      .map((c) => (supported.get(font)?.has(c.codePointAt(0) || 0) ? c : "?"))
      .join("");
  function text(
    value: string,
    x: number,
    y: number,
    size = 10,
    font = sans,
    color: RGB = navy,
    width = 720,
  ) {
    const valueClean = clean(value, font);
    const fitted = Math.min(
      size,
      width / Math.max(1, font.widthOfTextAtSize(valueClean, 1)),
    );
    page.drawText(valueClean, { x, y, size: fitted, font, color });
  }
  function centered(
    value: string,
    x: number,
    y: number,
    size: number,
    font = sans,
    color: RGB = navy,
  ) {
    const safe = clean(value, font);
    page.drawText(safe, {
      x: x - font.widthOfTextAtSize(safe, size) / 2,
      y,
      size,
      font,
      color,
    });
  }
  function wrapped(
    value: string,
    x: number,
    top: number,
    maxWidth: number,
    size: number,
    font: PDFFont,
    maxLines: number,
    leading: number,
  ) {
    const safe = clean(value, font);
    let fontSize = size;
    let lines: string[] = [];
    while (fontSize >= 8) {
      lines = [];
      let current = "";
      for (const word of safe.split(/\s+/)) {
        const candidate = current ? current + " " + word : word;
        if (current && font.widthOfTextAtSize(candidate, fontSize) > maxWidth) {
          lines.push(current);
          current = word;
        } else current = candidate;
      }
      if (current) lines.push(current);
      if (
        lines.length <= maxLines &&
        lines.every((l) => font.widthOfTextAtSize(l, fontSize) <= maxWidth)
      )
        break;
      fontSize -= 0.5;
    }
    // Very unusual long input is fitted on one line rather than clipped.
    if (
      lines.length > maxLines ||
      lines.some((l) => font.widthOfTextAtSize(l, fontSize) > maxWidth)
    ) {
      text(safe, x, top, size, font, navy, maxWidth);
      return;
    }
    lines.forEach((value, index) =>
      text(value, x, top - index * leading, fontSize, font, navy, maxWidth),
    );
  }
  // An engraved, vector-only frame stays sharp at any print resolution.
  page.drawRectangle({ x: 0, y: 0, width: 841.89, height: 595.28, color: rgb(0.985, 0.977, 0.953) });
  for (const [inset, thickness, shade] of [[17, 1.3, gold], [21, 0.35, gold], [28, 0.45, line]] as const) {
    page.drawRectangle({ x: inset, y: inset, width: 841.89 - inset * 2, height: 595.28 - inset * 2, borderWidth: thickness, borderColor: shade });
  }
  for (const [x, y, dx, dy] of [[33, 33, 1, 1], [809, 33, -1, 1], [33, 562, 1, -1], [809, 562, -1, -1]]) {
    for (let n = 0; n < 3; n++) {
      const d = n * 4;
      page.drawLine({ start: { x: x + dx * d, y: y + dy * d }, end: { x: x + dx * 22, y: y + dy * d }, thickness: n === 0 ? 1.2 : 0.4, color: gold });
      page.drawLine({ start: { x: x + dx * d, y: y + dy * d }, end: { x: x + dx * d, y: y + dy * 22 }, thickness: n === 0 ? 1.2 : 0.4, color: gold });
    }
  }
  // Fine globe engraving: decoration only, never part of the credential evidence.
  const globeX = 505, globeY = 326;
  for (const radius of [114, 82, 44]) {
    page.drawEllipse({ x: globeX, y: globeY, xScale: radius, yScale: 114, borderColor: gold, borderWidth: 0.4, borderOpacity: 0.08 });
    page.drawEllipse({ x: globeX, y: globeY, xScale: 114, yScale: radius * 0.65, borderColor: gold, borderWidth: 0.4, borderOpacity: 0.08 });
  }
  page.drawRectangle({ x: 38, y: 484, width: 766, height: 73, color: navy });
  for (let i = 0; i < 60; i++) {
    page.drawRectangle({ x: 38 + i * 12.77, y: 484, width: 12.8, height: 73, color: rgb(0.14, 0.25, 0.4), opacity: 0.25 * i / 60 });
  }
  page.drawRectangle({ x: 38, y: 482, width: 766, height: 2, color: gold });
  page.drawImage(crest, { x: 57, y: 492, width: 44, height: 54 });
  text("TGPI", 118, 523, 24, serif, white);
  text("THE GLOBAL POLYMATH INSTITUTE", 119, 507, 9, sans, rgb(0.93, 0.83, 0.57));
  text(choose("EDUCATION FOR A GLOBAL LIFE", "EDUCAÇÃO PARA UMA VIDA GLOBAL"), 119, 494, 6.4, sans, rgb(0.8, 0.85, 0.91));
  text(choose("VERIFIED LEARNING", "APRENDIZAGEM VERIFICADA"), 632, 527, 7.5, sans, white, 149);
  text(choose("PROFESSIONAL ACHIEVEMENT", "CONQUISTA PROFISSIONAL"), 632, 512, 6.4, sans, rgb(0.93, 0.83, 0.57), 149);
  text(choose("CERTIFICATE OF ACHIEVEMENT", "CONCLUSÃO E COMPETÊNCIAS AVALIADAS"), 59, 458, 8, sans, gold);
  wrapped(credential.documentNature || choose("Professional Certificate", "Certificado Profissional"), 57, 428, 548, credential.documentNature ? 19 : 28, serif, 2, 22);
  text(choose("AWARDED TO", "CONFERIDO A"), 59, 382, 7.5, sans, muted);
  wrapped(credential.publicName, 57, 352, 548, 29, serif, 2, 30);
  page.drawLine({ start: { x: 59, y: 312 }, end: { x: 604, y: 312 }, thickness: 0.45, color: line });
  page.drawLine({ start: { x: 59, y: 312 }, end: { x: 122, y: 312 }, thickness: 1.5, color: gold });
  if (options.personalBirthDate && /^\d{4}-\d{2}-\d{2}$/.test(options.personalBirthDate)) {
    text(choose("Date of birth: ", "Data de nascimento: ") + certificateDate(options.personalBirthDate, locale) + choose(" (holder-provided)", " (informada pelo titular)"), 59, 299, 7.5, sans, muted, 546);
  }
  text(choose("For successful completion of the applied learning and assessed performance in", "Pela conclusão das atividades e aprovação na avaliação do curso"), 59, 278, 8.5, sans, muted, 546);
  wrapped(credential.courseTitle, 57, 252, 548, 19, serif, 2, 22);
  text(credential.skills?.slice(0, 4).map((skill) => skill.name).join("  /  ") || choose("Applied learning · Assessment evidence · Practical capability", "Aprendizagem aplicada · Evidências de avaliação · Competências práticas"), 59, 202, 7.5, sans, muted, 545);
  if (Number.isFinite(credential.masteryThreshold)) {
    text(choose("Required mastery: ", "Domínio exigido: ") + `${credential.masteryThreshold}%` + choose(" · Assessment evidence in the issuer record", " · Evidências de avaliação no registro do emissor"), 59, 186, 7, sans, muted, 545);
  }

  // Metallic issuer medallion. Layered paths, beading and laurels remain vector.
  const cx = 713, cy = 406;
  page.drawSvgPath("M 0 0 L 22 0 L 15 45 L 5 34 L -5 39 Z", { x: cx - 27, y: cy - 22, color: navy, borderColor: gold, borderWidth: 0.6 });
  page.drawSvgPath("M 0 0 L 22 0 L 27 39 L 17 34 L 7 45 Z", { x: cx + 5, y: cy - 22, color: navy, borderColor: gold, borderWidth: 0.6 });
  for (let i = 0; i < 96; i++) {
    const a = i * Math.PI / 48;
    page.drawLine({ start: { x: cx + 43 * Math.cos(a), y: cy + 43 * Math.sin(a) }, end: { x: cx + (i % 2 ? 49 : 52) * Math.cos(a), y: cy + (i % 2 ? 49 : 52) * Math.sin(a) }, thickness: i % 2 ? 0.55 : 1.2, color: i % 3 ? gold : rgb(0.9, 0.76, 0.42) });
  }
  for (let r = 44; r > 34; r -= 0.4) {
    const light = (Math.sin((r - 34) * 0.9) + 1) / 2;
    page.drawCircle({ x: cx, y: cy, size: r, color: rgb(0.64 + light * 0.32, 0.45 + light * 0.4, 0.17 + light * 0.42) });
  }
  page.drawCircle({ x: cx, y: cy, size: 34, color: navy, borderColor: rgb(0.98, 0.91, 0.7), borderWidth: 0.65 });
  page.drawCircle({ x: cx, y: cy, size: 30, borderColor: gold, borderWidth: 0.4 });
  for (let i = 0; i < 56; i++) {
    const a = i * Math.PI / 28;
    page.drawCircle({ x: cx + 40 * Math.cos(a), y: cy + 40 * Math.sin(a), size: 0.5, color: rgb(0.99, 0.93, 0.73) });
  }
  for (const side of [-1, 1]) for (let i = 0; i < 6; i++) {
    const a = (210 + i * 15) * Math.PI / 180;
    page.drawEllipse({ x: cx + side * 25 * Math.cos(a), y: cy + 25 * Math.sin(a), xScale: 3.4, yScale: 1.3, rotate: degrees(side * (i * 15 - 35)), color: rgb(0.88, 0.74, 0.4) });
  }
  centered("TGPI", cx, cy + 3, 16, serif, rgb(0.96, 0.86, 0.61));
  centered(choose("VERIFIED", "VERIFICADO"), cx, cy - 9, 5.2, sans, white);
  centered(choose("LEARNING", "APRENDIZAGEM"), cx, cy + 20, 4.8, sans, rgb(0.94, 0.83, 0.56));
  centered(choose("TGPI ISSUER QUALITY SEAL", "SELO DO EMISSOR TGPI"), cx, 338, 6.3, sans, gold);

  const verificationUrl = certificateVerificationUrl(credential.id);
  const qr = QRCode.create(verificationUrl, { errorCorrectionLevel: "M" });
  const qrSize = 105,
    quiet = 4,
    total = qr.modules.size + quiet * 2,
    unit = qrSize / total,
    qrX = 660.5,
    qrY = 212;
  page.drawRectangle({
    x: qrX - 6,
    y: qrY - 6,
    width: qrSize + 12,
    height: qrSize + 12,
    color: white,
    borderColor: line,
    borderWidth: 0.5,
  });
  for (let row = 0; row < qr.modules.size; row++)
    for (let col = 0; col < qr.modules.size; col++)
      if (qr.modules.get(row, col))
        page.drawRectangle({
          x: qrX + (col + quiet) * unit,
          y: qrY + (total - row - quiet - 1) * unit,
          width: unit + 0.005,
          height: unit + 0.005,
          color: navy,
        });
  for (const [x, y, dx, dy] of [[qrX - 7, qrY - 7, 1, 1], [qrX + qrSize + 7, qrY - 7, -1, 1], [qrX - 7, qrY + qrSize + 7, 1, -1], [qrX + qrSize + 7, qrY + qrSize + 7, -1, -1]]) {
    page.drawLine({ start: { x, y }, end: { x: x + dx * 12, y }, thickness: 1.5, color: gold });
    page.drawLine({ start: { x, y }, end: { x, y: y + dy * 12 }, thickness: 1.5, color: gold });
  }
  centered(choose("SCAN TO VERIFY", "ESCANEIE PARA VERIFICAR"), cx, 188, 7, sans, navy);
  centered(privateSharing ? (portuguese ? "Privado até o titular compartilhar" : "Private until shared by holder") : choose("Live status · Issuer record", "Status atual · Registro do emissor"), cx, 174, 7, sans, muted);
  const linkAnnotation = document.context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("Link"),
    Rect: [qrX - 6, qrY - 6, qrX + qrSize + 6, qrY + qrSize + 6],
    Border: [0, 0, 0],
    A: {
      Type: PDFName.of("Action"),
      S: PDFName.of("URI"),
      URI: PDFString.of(verificationUrl),
    },
  });
  page.node.addAnnot(document.context.register(linkAnnotation));

  const columns = [
    {
      x: 58,
      w: 223,
      label: "TGPI GLOBAL ID",
      value: credential.identityEvidence?.globalKeyId || choose("Not recorded", "Não registrado"),
    },
    { x: 293, w: 190, label: choose("CERTIFICATE ID", "ID DO CERTIFICADO"), value: credential.id },
    {
      x: 495,
      w: 118,
      label: portuguese ? "EMISSÃO" : "ISSUED",
      value: certificateDate(credential.issuedAt, locale),
    },
    {
      x: 625,
      w: 70,
      label: credential.automatedEvidence ? choose("ASSESSMENT", "AVALIAÇÃO") : choose("MASTERY", "DOMÍNIO"),
      value: `${credential.assessmentScore}%`,
    },
    {
      x: 707,
      w: 79,
      label: credential.automatedEvidence ? choose("EST. WORKLOAD", "CARGA ESTIMADA") : choose("VOLUME", "CARGA HORÁRIA"),
      value: `${credential.learningHours} ${portuguese ? "horas" : "hours"}`,
    },
  ];
  page.drawLine({
    start: { x: 58, y: 156 },
    end: { x: 784, y: 156 },
    thickness: 0.6,
    color: line,
  });
  for (const column of columns) {
    text(column.label, column.x, 140, 7, sans, gold, column.w);
    text(column.value, column.x, 122, 10, sans, navy, column.w);
  }
  if (credential.completedAt) text(`${choose("Completed", "Conclusão")}: ${certificateDate(credential.completedAt, locale)} · ${choose("Course version", "Versão do curso")} ${credential.courseVersion} · ${choose("Language", "Idioma")}: ${locale}`, 58, 108, 6.5, sans, muted, 727);
  page.drawRectangle({
    x: 44,
    y: 65,
    width: 754,
    height: 37,
    color: rgb(0.94, 0.93, 0.89),
  });
  const marks = portuguese ? ["CONTA VINCULADA", credential.automatedEvidence ? "AVALIAÇÃO AUTOMÁTICA" : "PROJETO AVALIADO", privateSharing ? "TITULAR CONTROLA O ACESSO" : "VERIFICAÇÃO PÚBLICA"] : ["IDENTITY LINKED", credential.automatedEvidence ? "AUTOMATIC ASSESSMENT" : "ASSESSED LEARNING", privateSharing ? "HOLDER-CONTROLLED ACCESS" : "PUBLIC VERIFICATION"];
  marks.forEach((value, index) => {
    const x = 63 + index * 244;
    page.drawCircle({ x: x + 5, y: 84, size: 7, color: navy });
    text("✓", x + 0.5, 81, 8, sans, white, 10);
    text(value, x + 20, 81, 8, sans, navy, 200);
  });
  text(
    portuguese ? "Curso livre TGPI. Não equivale a diploma, licença profissional ou certificação externa. Aceitação depende da instituição destinatária." : "TGPI-issued professional learning certificate. Not a government degree, professional license or third-party accreditation.",
    58,
    49,
    6.5,
    sans,
    muted,
    727,
  );
  text(
    `${choose("Document edition", "Edição do documento")} ${CERTIFICATE_DESIGN_VERSION} · ${choose("Original achievement and issuance date preserved", "Conquista e data de emissão originais preservadas")}`,
    58,
    35,
    6,
    sans,
    muted,
    600,
  );
  text("theglobalpolymath.com", 665, 35, 6.5, sans, gold, 125);
  return document.save();
}

