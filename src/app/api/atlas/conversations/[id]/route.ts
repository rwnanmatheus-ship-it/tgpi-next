import { z } from 'zod';
import { atlasBody, atlasFailure, atlasJson, atlasUser } from '@/lib/atlas/http.server';
import { changeConversation, getConversation } from '@/lib/atlas/store.server';
import { idSchema } from '@/lib/atlas/contracts';
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  try { return atlasJson({ conversation: await getConversation(await atlasUser(request), (await context.params).id) }); }
  catch (error) { return atlasFailure(error); }
}
export async function PATCH(request: Request, context: Context) {
  try {
    const userId = await atlasUser(request, true);
    const change = await atlasBody(request, z.union([z.object({ title: z.string().trim().min(1).max(70) }).strict(), z.object({ messageId: idSchema, feedback: z.enum(['up', 'down']) }).strict()]));
    return atlasJson({ conversation: await changeConversation(userId, (await context.params).id, change) });
  } catch (error) { return atlasFailure(error); }
}
export async function DELETE(request: Request, context: Context) {
  try { await changeConversation(await atlasUser(request, true), (await context.params).id, 'delete'); return atlasJson({ deleted: true }); }
  catch (error) { return atlasFailure(error); }
}
