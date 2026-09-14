import { NextResponse } from "next/server";
import { createPortableLearningRecord } from "@/lib/credential-standard";
import { getPublicLearningCredential } from "@/lib/learning-records.server";

const SAFE_CREDENTIAL_ID = /^TGPI-[A-Z0-9_-]{8,90}$/;
const CANONICAL_ORIGIN = "https://www.theglobalpolymath.com";

function responseHeaders() {
  return {
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!SAFE_CREDENTIAL_ID.test(id)) {
    return NextResponse.json(
      { error: "Credential reference is invalid." },
      { headers: responseHeaders(), status: 400 },
    );
  }

  const credential = await getPublicLearningCredential(id);
  if (!credential) {
    return NextResponse.json(
      { error: "Credential was not found." },
      { headers: responseHeaders(), status: 404 },
    );
  }

  const record = createPortableLearningRecord(credential, CANONICAL_ORIGIN);
  const download = new URL(request.url).searchParams.get("download") === "1";
  const headers = new Headers(responseHeaders());
  if (download) {
    headers.set(
      "Content-Disposition",
      'attachment; filename="' + id + '-evidence.json"',
    );
  }

  return new NextResponse(JSON.stringify(record, null, 2), {
    headers,
    status: 200,
  });
}
