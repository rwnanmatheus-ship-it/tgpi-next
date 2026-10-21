import { atlasFailure, atlasJson, atlasUser } from '@/lib/atlas/http.server';
import { listConversations } from '@/lib/atlas/store.server';
import { AtlasError } from '@/lib/atlas/contracts';
export async function GET(request: Request) {
  try {
    const userId = await atlasUser(request);
    const cursor = new URL(request.url).searchParams.get('cursor') || undefined;
    if (cursor && cursor.length > 2048) throw new AtlasError('Invalid cursor.');
    return atlasJson(await listConversations(userId, cursor));
  } catch (error) { return atlasFailure(error); }
}
