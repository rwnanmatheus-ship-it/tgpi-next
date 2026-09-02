import { getIntelligence, identities } from "@/lib/intelligence/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET() {
  const result = await getIntelligence();
  return Response.json({ ...result, identities, countryCount: identities.length, countryCoverage: new Set(result.snapshot.observations.map(item => item.country)).size }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
