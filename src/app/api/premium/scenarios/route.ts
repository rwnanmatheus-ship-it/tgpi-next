import { requirePremiumApiUser, TgpiAuthenticationError, TgpiPremiumRequiredError } from '@/lib/auth/guards';
import { loadPremiumScenarios } from '@/lib/premium-scenarios.server';

const json = (body:unknown,status=200) => Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
export async function GET(request:Request) {
  try {
    const {uid} = await requirePremiumApiUser();
    const cursor = new URL(request.url).searchParams.get('cursor') ?? undefined;
    if (cursor && (cursor.length > 4096 || /[\x00-\x1f]/.test(cursor))) return json({error:'Invalid scenario cursor.'},400);
    return json(await loadPremiumScenarios(uid,cursor));
  } catch(error) {
    if (error instanceof TgpiAuthenticationError || error instanceof TgpiPremiumRequiredError) return json({error:error.message},error.status);
    return json({error:'Saved scenarios are temporarily unavailable. Please retry.'},503);
  }
}
