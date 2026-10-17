import { NextResponse } from "next/server";
import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import {
  getUserLearningCredential,
  getPublicLearningCredential,
} from "@/lib/learning-records.server";
import { getCredentialTrustState } from "@/lib/credential-standard";
import { createCertificatePdf } from "@/lib/certificate-pdf.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const identity = await requireApiUser();
    const { id } = await params;
    if (!/^TGPI-[A-Z0-9_-]{8,90}$/.test(id))
      return NextResponse.json(
        { error: "Invalid certificate reference." },
        { status: 400, headers },
      );
    const owned = await getUserLearningCredential(identity.uid, id);
    if (!owned)
      return NextResponse.json(
        { error: "Certificate not found in your account." },
        { status: 404, headers },
      );
    const credential = await getPublicLearningCredential(id);
    if (
      !credential ||
      getCredentialTrustState(credential) !== "active_verified"
    )
      return NextResponse.json(
        {
          error:
            "This certificate cannot be downloaded as an active verified achievement. Open its record to review the current status.",
        },
        { status: 409, headers },
      );
    const pdf = await createCertificatePdf(credential);
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        ...headers,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${id}.pdf"`,
      },
    });
  } catch (error) {
    if (error instanceof TgpiAuthenticationError)
      return NextResponse.json(
        { error: "Sign in to download your certificate." },
        { status: 401, headers },
      );
    console.error("Certificate PDF generation failed", error);
    return NextResponse.json(
      { error: "Unable to prepare your PDF. Please try again." },
      { status: 500, headers },
    );
  }
}
