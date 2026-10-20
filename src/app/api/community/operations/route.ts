import { currentUser } from "@clerk/nextjs/server";
import {
  lifecycleOperations,
  runCommunityMaintenance,
} from "@/lib/community/lifecycle.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
  if ((await currentUser())?.privateMetadata.role !== "admin")
    return Response.json(
      { error: "Administrator permission required." },
      { status: 403, headers },
    );
  try {
    return Response.json(await lifecycleOperations(), { headers });
  } catch {
    return Response.json(
      { error: "Community operations are temporarily unavailable." },
      { status: 503, headers },
    );
  }
}
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return Response.json(
      { error: "Invalid origin." },
      { status: 403, headers },
    );
  if ((await currentUser())?.privateMetadata.role !== "admin")
    return Response.json(
      { error: "Administrator permission required." },
      { status: 403, headers },
    );
  try {
    return Response.json(await runCommunityMaintenance(), { headers });
  } catch {
    console.error("Community maintenance will retry");
    return Response.json(
      { error: "Maintenance paused at its last checkpoint and will retry." },
      { status: 503, headers },
    );
  }
}
