import { getIntelligence, identities } from "@/lib/intelligence/server";
import { INDICATORS, INDICATOR_PRODUCERS } from "@/lib/intelligence/core";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET() {
  const result = await getIntelligence();
  return Response.json({ ...result, identities, indicatorDefinitions: INDICATORS, producers: INDICATOR_PRODUCERS, statisticalLicense: "CC BY 4.0; source indicator registry reviewed 2026-09-02", countryCount: identities.length, countryCoverage: new Set(result.snapshot.observations.map(item => item.country)).size }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
