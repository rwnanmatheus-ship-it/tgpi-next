import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import {
  CERTIFICATE_BADGE_SIZE,
  certificateVerificationUrl,
} from "@/lib/certificate-presentation";
import { normalizeCertificateId } from "@/lib/certificate-reference";
import { getCredentialTrustState } from "@/lib/credential-standard";
import { getPublicLearningCredential } from "@/lib/learning-records.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow",
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = normalizeCertificateId((await params).id);
  if (!id) return new Response(null, { status: 404, headers });

  try {
    const credential = await getPublicLearningCredential(id);
    if (!credential || getCredentialTrustState(credential) !== "active_verified") {
      return new Response(null, { status: 404, headers });
    }

    const download = new URL(request.url).searchParams.get("download") === "1";
    const [crest, qr] = await Promise.all([
      readFile(join(process.cwd(), "public/brand/tgpi-crest-metal-v3-256.png")),
      QRCode.toDataURL(certificateVerificationUrl(id), { margin: 2, width: 176, errorCorrectionLevel: "M" }),
    ]);
    const title = credential.courseTitle;
    const portuguese = credential.professionalEvidence?.certificateLanguage.startsWith("pt");
    const label = portuguese ? "Certificado verificado pela TGPI" : "Verified TGPI learning certificate";
    const titleSize = title.length > 115 ? 38 : title.length > 72 ? 46 : 58;

    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", padding: 36, color: "#fffaf0", background: "#070e1b" }}>
        <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", padding: 42, border: "1px solid #a7894b", background: "linear-gradient(130deg, #111b2d, #153459)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse uses server-rendered images. */}
            <img alt="" width={74} height={74} src={`data:image/png;base64,${crest.toString("base64")}`} />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 22, color: "#e5c777", letterSpacing: 2 }}>THE GLOBAL POLYMATH INSTITUTE</span>
              <span style={{ fontSize: 24 }}>{label}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{ fontSize: titleSize, lineHeight: 1.12, fontWeight: 700, maxHeight: 220, overflow: "hidden" }}>{title}</span>
            {!!credential.skills.length && <span style={{ fontSize: 23, color: "#d6e4f6", maxHeight: 60, overflow: "hidden" }}>{credential.skills[0].name}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #a7894b", paddingTop: 18 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 21, color: "#e5c777" }}>THEGLOBALPOLYMATH.COM</span>
              <span style={{ fontSize: 20 }}>{portuguese ? "Escaneie para consultar o registro" : "Scan to check the issuer record"}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse uses server-rendered images. */}
            <img alt="" width={100} height={100} src={qr} />
          </div>
        </div>
      </div>,
      {
        ...CERTIFICATE_BADGE_SIZE,
        headers: {
          ...headers,
          ...(download ? { "Content-Disposition": `attachment; filename="${id}-badge.png"` } : {}),
        },
      },
    );
  } catch (error) {
    console.error("Credential badge unavailable", error instanceof Error ? error.name : "Unknown error");
    return new Response(null, { status: 503, headers });
  }
}
