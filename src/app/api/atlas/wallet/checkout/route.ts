import { z } from 'zod';
import { atlasBody, atlasFailure, atlasJson, atlasUser, requireAtlasGeneration } from '@/lib/atlas/http.server';
import { AtlasError } from '@/lib/atlas/contracts';
import { walletCheckoutConfigured, assertCheckoutCapacity } from '@/lib/wallet/store.server';
import { createWalletCheckout } from '@/lib/wallet/payments.server';
export async function POST(request: Request) {
  try {
    const uid = await atlasUser(request, true);
    if (!walletCheckoutConfigured()) throw new AtlasError('Credit purchases will open after payment and service funding validation. No payment has been taken.', 503);
    requireAtlasGeneration(uid);
    await assertCheckoutCapacity();
    const body = await atlasBody(request, z.object({ pack: z.enum(['starter', 'explorer', 'global']) }).strict());
    return atlasJson({ url: await createWalletCheckout(uid, body.pack, new URL(request.url).origin) });
  } catch (error) { return atlasFailure(error); }
}
