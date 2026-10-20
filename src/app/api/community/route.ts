import {courses} from "@/data/courses";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { CommunityError } from "@/lib/community/model";
import {
  blocks,personalFeed,playbooks,pendingPosts,globalReports,
  publication,
  preferences,
  comments,
  detail,
  discover,
  draft,
  management,
  mine,
  mutate,
  saved,
  sessions,
} from "@/lib/community/store.server";
import { getMemberIdentity } from "@/lib/members/identity.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "private, no-store",
  Vary: "Cookie, Authorization",
};
function failure(e: unknown) {
  if (e instanceof CommunityError)
    return NextResponse.json(
      { error: e.message },
      { status: e.status, headers },
    );
  console.error("TGPI community operation failed");
  return NextResponse.json(
    {
      error:
        "Community is temporarily unavailable. Your changes have not been confirmed.",
    },
    { status: 503, headers },
  );
}
export async function GET(request: Request) {
  try {
    const { userId } = await auth(),
      uid = userId || "",
      u = new URL(request.url),
      id = u.searchParams.get("community"),
      after = u.searchParams.get("after") || "";
    const result = u.searchParams.has("catalog") ? {courses:courses.map(c=>({id:c.id,title:c.title}))} : u.searchParams.has("blocks") ? await blocks(uid,after) : u.searchParams.has("feed") ? await personalFeed(uid,after) : u.searchParams.has("global-reports") ? await globalReports(uid,(await currentUser())?.privateMetadata.role==="admin",after) : u.searchParams.has("preferences")
      ? await preferences(uid)
      : u.searchParams.has("mine")
        ? await mine(uid, after)
        : u.searchParams.has("saved")
          ? await saved(uid, after)
          : u.searchParams.has("draft")
            ? await draft(uid)
            : id
              ? u.searchParams.has("playbooks") ? await playbooks(id,uid,after) : u.searchParams.has("pending") ? await pendingPosts(id,uid,after) : u.searchParams.has("single")
                ? await publication(id, u.searchParams.get("single")!, uid)
                : u.searchParams.has("manage")
                  ? await management(
                      id,
                      uid,
                      u.searchParams.get("section") || "members",
                      after,
                      (await currentUser())?.privateMetadata.role==="admin",
                    )
                  : u.searchParams.has("events")
                    ? await sessions(id, uid, after)
                    : u.searchParams.has("post")
                      ? await comments(
                          id,
                          u.searchParams.get("post")!,
                          uid,
                          after,
                        )
                      : await detail(
                          id,
                          uid,
                          after,
                          u.searchParams.get("token") || "",
                        )
              : await discover(uid, after,u.searchParams.get("q")||"");
    return NextResponse.json(result, { headers });
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin)
      throw new CommunityError("Request origin is not allowed.", 403);
    const { userId } = await auth();
    if (!userId) throw new CommunityError("Sign in to participate.", 401);
    const reader = request.body?.getReader();
    if (!reader) throw new CommunityError("Request body required.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 30000) {
        await reader.cancel();
        throw new CommunityError("Request too large.", 413);
      }
      chunks.push(value);
    }
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body))
      throw new CommunityError("Invalid input.");
    const [user, identity] = await Promise.all([
      currentUser(),
      getMemberIdentity(userId),
    ]);
    if (!user) throw new CommunityError("Sign in again.", 401);
    const result = await mutate(
      {
        uid: userId,
        name: identity?.handle
          ? `@${identity.handle}`
          : user.firstName || "TGPI member",
        handle: identity?.handle || "",
        admin: user.privateMetadata.role === "admin",
      },
      body as Record<string, unknown>,
    );
    return NextResponse.json(result, { headers });
  } catch (e) {
    if (e instanceof SyntaxError)
      return NextResponse.json(
        { error: "Invalid JSON." },
        { status: 400, headers },
      );
    return failure(e);
  }
}
