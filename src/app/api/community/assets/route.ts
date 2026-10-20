import { auth } from "@clerk/nextjs/server";
import { CommunityError } from "@/lib/community/model";
import { uploadCommunityAsset } from "@/lib/community/assets.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "private, no-store",
  Vary: "Cookie, Authorization",
};
export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin)
      throw new CommunityError("Request origin is not allowed.", 403);
    const { userId } = await auth();
    if (!userId) throw new CommunityError("Sign in to upload.", 401);
    const chunks: Uint8Array[] = [];
    let size = 0;
    const reader = request.body?.getReader();
    if (!reader) throw new CommunityError("Image required.");
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 3_000_000) {
        await reader.cancel();
        throw new CommunityError("Use an image under 3 MB.", 413);
      }
      chunks.push(value);
    }
    const u = new URL(request.url);
    return Response.json(
      await uploadCommunityAsset(
        userId,
        u.searchParams.get("community") || "",
        {
          bytes: Buffer.concat(chunks),
          kind: u.searchParams.get("kind"),
          post: u.searchParams.get("post"),
          alt: u.searchParams.get("alt"),
        },
      ),
      { headers },
    );
  } catch (e) {
    return Response.json(
      {
        error:
          e instanceof CommunityError ? e.message : "Image upload unavailable.",
      },
      { status: e instanceof CommunityError ? e.status : 503, headers },
    );
  }
}
