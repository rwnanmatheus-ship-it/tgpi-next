import { z } from 'zod';
import { atlasBody, atlasFailure, atlasJson, atlasUser } from '@/lib/atlas/http.server';
import { recoverWalletReservations } from '@/lib/wallet/store.server';
export async function POST(request: Request) {
  try {
    const uid = await atlasUser(request, true);
    const { cursor } = await atlasBody(request, z.object({ cursor: z.string().max(4096).optional() }).strict());
    return atlasJson({ cursor: await recoverWalletReservations(uid, cursor) });
  } catch (error) { return atlasFailure(error); }
}
