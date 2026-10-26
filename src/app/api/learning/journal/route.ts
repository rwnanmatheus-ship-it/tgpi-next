import { requireApiUser, TgpiAuthenticationError } from "@/lib/auth/guards";
import { JournalError } from "@/lib/learning/journal";
import { readJournal, saveJournal } from "@/lib/learning/journal.server";
import { FirestoreAdminError } from "@/lib/firestore-admin-rest.server";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
function failure(error: unknown) {
  if (error instanceof TgpiAuthenticationError) return json({ error: "Sign in to access your private journal." }, 401);
  if (error instanceof JournalError) return json({ error: error.message }, error.status);
  if (error instanceof SyntaxError) return json({ error: "Invalid JSON." }, 400);
  if (error instanceof FirestoreAdminError) return json({ error: "Learning storage is unavailable. Your draft remains on this page." }, 503);
  return json({ error: "Unable to access your journal. Please retry." }, 500);
}
export async function GET(request: Request) {
  try {
    const identity = await requireApiUser();
    const query = new URL(request.url).searchParams;
    return json({ journal: await readJournal(identity.uid, query.get("courseId") ?? "", query.get("courseVersion") ?? "", query.get("lessonId") ?? "") });
  } catch (error) { return failure(error); }
}
export async function PUT(request: Request) {
  try {
    const identity = await requireApiUser();
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return json({ error: "Request origin could not be verified." }, 403);
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 64000) return json({ error: "Journal is too large." }, 413);
    return json({ journal: await saveJournal(identity.uid, JSON.parse(body)) });
  } catch (error) { return failure(error); }
}
