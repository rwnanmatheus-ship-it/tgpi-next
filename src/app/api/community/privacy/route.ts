import { auth } from "@clerk/nextjs/server";
import { after } from "next/server";
import { CommunityError } from "@/lib/community/model";
import { privacyKey } from "@/lib/community/privacy.server";
import {
  privacyStatus,
  requestCommunityErasure,
  runErasureJob,
} from "@/lib/community/lifecycle.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
const headers = {
  "Cache-Control": "private, no-store",
  Vary: "Cookie, Authorization",
};
function failure(e: unknown) {
  return Response.json(
    {
      error:
        e instanceof CommunityError
          ? e.message
          : "Community privacy is temporarily unavailable. Please retry.",
    },
    { status: e instanceof CommunityError ? e.status : 503, headers },
  );
}
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId)
      throw new CommunityError("Sign in to manage your community data.", 401);
    return Response.json(await privacyStatus(userId), { headers });
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin)
      throw new CommunityError("Request origin is not allowed.", 403);
    const { userId } = await auth();
    if (!userId)
      throw new CommunityError("Sign in to manage your community data.", 401);
    const reader = request.body?.getReader();
    if (!reader) throw new CommunityError("Invalid request.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 1000) {
        await reader.cancel();
        throw new CommunityError("Request too large.", 413);
      }
      chunks.push(value);
    }
    const body = Buffer.concat(chunks).toString("utf8");
    let input;
    try {
      input = JSON.parse(body);
    } catch {
      throw new CommunityError("Invalid request.");
    }
    if (input?.confirmation !== "ERASE MY COMMUNITY DATA")
      throw new CommunityError("Type ERASE MY COMMUNITY DATA to confirm.");
    const job = await requestCommunityErasure(userId);
    after(async () => {
      try {
        await runErasureJob(privacyKey(userId), 20);
      } catch {
        console.error("Community privacy job will retry");
      }
    });
    return Response.json({ job }, { headers, status: 202 });
  } catch (e) {
    return failure(e);
  }
}
