import { auth } from '@clerk/nextjs/server';
import { atlasJson, requireAtlasGeneration } from '@/lib/atlas/http.server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return atlasJson({ enabled: false }, 401);
  try { requireAtlasGeneration(userId); return atlasJson({ enabled: true }); }
  catch { return atlasJson({ enabled: false }); }
}
