import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, degrees, rgb } from "pdf-lib";
import { createCertificatePdf } from "../src/lib/certificate-pdf.server.ts";
const output = process.env.TGPI_QA_OUTPUT_DIR || path.join(process.cwd(), "tmp", "pdfs");
const bytes = await createCertificatePdf({
  id: "TGPI-TEST-SAMPLE00001", publicName: "Amostra técnica sem validade", courseTitle: "Comunicação Intercultural, Negociação e Pensamento Crítico", courseVersion: "1.0.0",
  documentNature: "Certificado de conclusão com avaliação de competências — TGPI",
  completedAt: "2026-10-29T17:00:00Z", issuedAt: "2026-10-29T18:00:00Z", assessmentScore: 85, masteryThreshold: 70, learningHours: 8,
  professionalEvidence: { instructionLanguage: "pt-BR", certificateLanguage: "pt-BR", sharing: false, rubricVersion: "professional-1.0" },
  identityEvidence: { globalKeyId: "TGPI-TEST-ONLY" }, skills: [{ name: "Raciocínio" }, { name: "Respeito e contexto" }, { name: "Alternativas" }], status: "active", integrityVerified: true,
});
const pdf = await PDFDocument.load(bytes);
pdf.getPage(0).drawText("AMOSTRA TECNICA - SEM VALIDADE", { x: 125, y: 155, size: 32, rotate: degrees(15), color: rgb(0.6, 0.15, 0.15), opacity: 0.2 });
await fs.mkdir(output, { recursive: true });
await fs.writeFile(`${output}/certificate-test.pdf`, await pdf.save());
console.log("Rendered a watermarked test document only; no learner record or credential issued.");
