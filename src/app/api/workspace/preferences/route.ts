import { auth } from '@clerk/nextjs/server';
import { createFirestoreUpdateWrite, isLearningStorageConfigured, runFirestoreTransaction } from '@/lib/firestore-admin-rest.server';
import { parseWorkspacePreferences } from '@/lib/workspace-control';
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) return json({ error: 'Sign in again to save your workspace.' }, 401);
  if (request.headers.get('origin') !== new URL(request.url).origin) return json({ error: 'This request could not be verified.' }, 403);
  if (!isLearningStorageConfigured()) return json({ error: 'Workspace preference storage is currently unavailable.' }, 503);
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 2048) return json({ error: 'Preferences exceed the allowed size.' }, 413);
    const preferences = parseWorkspacePreferences(JSON.parse(text));
    if (!preferences) return json({ error: 'Invalid workspace preferences.' }, 400);
    const path = `tgpiLearningUsers/${userId}/workspace/preferences`;
    await runFirestoreTransaction(async ({ getDocuments }) => {
      await getDocuments([path]);
      return { result: null, writes: [createFirestoreUpdateWrite(path, preferences)] };
    });
    return json({ preferences });
  } catch (error) {
    return json({ error: error instanceof SyntaxError ? 'Invalid JSON.' : 'Unable to save. Please retry.' }, error instanceof SyntaxError ? 400 : 500);
  }
}
