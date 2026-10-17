import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import {
  PDFDocument,
  PDFName,
  PDFString,
  rgb,
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
) {
  if (credential.status !== "active" || !credential.integrityVerified) {
    throw new Error(
      "Only an active, integrity-verified credential can render a certificate.",
    );
  }
  const document = await PDFDocument.create();
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
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 842,
    height: 596,
    color: rgb(0.984, 0.975, 0.949),
  });
  page.drawRectangle({
    x: 19,
    y: 19,
    width: 804,
    height: 557,
    borderColor: gold,
    borderWidth: 1,
  });
  page.drawRectangle({
    x: 25,
    y: 25,
    width: 792,
    height: 545,
    borderColor: line,
    borderWidth: 0.4,
  });
  page.drawRectangle({ x: 26, y: 480, width: 790, height: 89, color: navy });
  page.drawRectangle({ x: 26, y: 477, width: 790, height: 3, color: gold });
  page.drawImage(crest, { x: 54, y: 491, width: 54, height: 66 });
  text("TGPI", 126, 530, 26, serif, white);
  text(
    "THE GLOBAL POLYMATH INSTITUTE",
    127,
    507,
    11,
    sans,
    rgb(0.9, 0.8, 0.53),
  );
  text(
    "EDUCATION FOR A GLOBAL LIFE",
    127,
    492,
    7.5,
    sans,
    rgb(0.78, 0.83, 0.9),
  );
  text("VERIFIED LEARNING", 648, 532, 9, sans, white, 155);
  text("PROFESSIONAL ACHIEVEMENT", 648, 516, 7, sans, rgb(0.9, 0.8, 0.53), 155);
  text("CERTIFICATE OF ACHIEVEMENT", 58, 450, 9, sans, gold);
  text("Professional Certificate", 56, 414, 29, serif);
  text("AWARDED TO", 58, 383, 8, sans, muted);
  wrapped(credential.publicName, 56, 350, 550, 28, serif, 2, 30);
  text(
    "For successful completion of the applied learning and assessed performance in",
    58,
    286,
    9,
    sans,
    muted,
    548,
  );
  wrapped(credential.courseTitle, 56, 260, 550, 19, serif, 2, 23);
  const skills = credential.skills
    ?.slice(0, 3)
    .map((skill) => skill.name)
    .join("  /  ");
  text(
    skills || "Applied learning · Assessment evidence · Practical capability",
    58,
    209,
    8,
    sans,
    muted,
    548,
  );

  text(
    `Required mastery: ${credential.masteryThreshold}% · Detailed evidence and current status available through the QR`,
    58,
    190,
    7.5,
    sans,
    muted,
    548,
  );

  // Own issuer quality seal. No third-party accreditation or conformity claim.
  const cx = 715,
    cy = 402;
  for (let i = 0; i < 48; i++) {
    const angle = (i * Math.PI) / 24;
    page.drawLine({
      start: { x: cx + 42 * Math.cos(angle), y: cy + 42 * Math.sin(angle) },
      end: { x: cx + 48 * Math.cos(angle), y: cy + 48 * Math.sin(angle) },
      thickness: i % 2 ? 0.7 : 1.5,
      color: gold,
    });
  }
  page.drawCircle({
    x: cx,
    y: cy,
    size: 40,
    color: rgb(0.95, 0.9, 0.77),
    borderColor: gold,
    borderWidth: 1,
  });
  page.drawCircle({
    x: cx,
    y: cy,
    size: 35,
    color: navy,
    borderColor: gold,
    borderWidth: 0.7,
  });
  centered("TGPI", cx, cy + 5, 17, serif, rgb(0.94, 0.83, 0.56));
  centered("VERIFIED", cx, cy - 9, 7, sans, white);
  centered("LEARNING", cx, cy - 19, 6, sans, rgb(0.94, 0.83, 0.56));
  centered("TGPI ISSUER QUALITY SEAL", cx, 342, 6.8, sans, gold);

  const verificationUrl = certificateVerificationUrl(credential.id);
  const qr = QRCode.create(verificationUrl, { errorCorrectionLevel: "M" });
  const qrSize = 111,
    quiet = 4,
    total = qr.modules.size + quiet * 2,
    unit = qrSize / total,
    qrX = 659.5,
    qrY = 209;
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
  centered("SCAN TO VERIFY", cx, 188, 8, sans, navy);
  centered("Live status · Issuer record", cx, 174, 7, sans, muted);
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
      value: credential.identityEvidence?.globalKeyId || "Not recorded",
    },
    { x: 293, w: 190, label: "CERTIFICATE ID", value: credential.id },
    {
      x: 495,
      w: 118,
      label: "ISSUED",
      value: certificateDate(credential.issuedAt),
    },
    {
      x: 625,
      w: 70,
      label: "MASTERY",
      value: `${credential.assessmentScore}%`,
    },
    {
      x: 707,
      w: 79,
      label: "VOLUME",
      value: `${credential.learningHours} hours`,
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
  page.drawRectangle({
    x: 44,
    y: 65,
    width: 754,
    height: 37,
    color: rgb(0.94, 0.93, 0.89),
  });
  const marks = ["IDENTITY LINKED", "ASSESSED LEARNING", "PUBLIC VERIFICATION"];
  marks.forEach((value, index) => {
    const x = 63 + index * 244;
    page.drawCircle({ x: x + 5, y: 84, size: 7, color: navy });
    text("✓", x + 0.5, 81, 8, sans, white, 10);
    text(value, x + 20, 81, 8, sans, navy, 200);
  });
  text(
    "TGPI-issued professional learning certificate. Not a government degree, professional license or third-party accreditation.",
    58,
    49,
    6.5,
    sans,
    muted,
    727,
  );
  text(
    `Document edition ${CERTIFICATE_DESIGN_VERSION} · Original achievement and issuance date preserved`,
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
