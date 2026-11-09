import { atlasFailure, atlasJson, atlasUser, requireAtlasGeneration } from '@/lib/atlas/http.server';
import { readWallet, walletCheckoutConfigured, assertCheckoutCapacity } from '@/lib/wallet/store.server';
import { TURN_PRICE_CENTS, WALLET_PACKS } from '@/lib/wallet/policy';
export async function GET(request: Request) {
  try {
    const uid = await atlasUser(request);
    const cursor = new URL(request.url).searchParams.get('cursor') || undefined;
    if (cursor && cursor.length > 4096) return atlasJson({ error: 'Invalid cursor.' }, 400);
    let available = walletCheckoutConfigured();
    try { requireAtlasGeneration(uid); await assertCheckoutCapacity(); } catch { available = false; }
    return atlasJson({ ...(await readWallet(uid, cursor)), currency: 'USD', turnPriceCents: TURN_PRICE_CENTS, packs: WALLET_PACKS, checkoutEnabled: available });
  } catch (error) { return atlasFailure(error); }
}
