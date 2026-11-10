import { getCountryContext } from "@/lib/intelligence/country-context.server";
import { CONTEXT_INDICATORS } from "@/lib/intelligence/country-context";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET() {
  const result = await getCountryContext();
  return Response.json({ ...result, definitions: CONTEXT_INDICATORS, countryCoverage: new Set(result.snapshot.observations.map(o => o.country)).size }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
