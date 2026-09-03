import { getIntelligence, identities } from "@/lib/intelligence/server";
import { INDICATORS, INDICATOR_PRODUCERS } from "@/lib/intelligence/core";
import { DOSSIER_VERSION, DOSSIER_REVIEW_DATE, DOSSIER_COUNTRIES, DOSSIER_CLAIMS, DOSSIER_SOURCES, COST_REFERENCES } from "@/lib/intelligence/dossiers";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET() {
  const result = await getIntelligence();
  return Response.json({ ...result, identities, indicatorDefinitions: INDICATORS, producers: INDICATOR_PRODUCERS, statisticalLicense: "CC BY 4.0; source indicator registry reviewed 2026-09-02", countryCount: identities.length, countryCoverage: new Set(result.snapshot.observations.map(item => item.country)).size, editorial: { version: DOSSIER_VERSION, reviewedAt: DOSSIER_REVIEW_DATE, countries: DOSSIER_COUNTRIES, claims: DOSSIER_CLAIMS, sources: DOSSIER_SOURCES, costReferences: COST_REFERENCES, scope: "Selected study-focused summaries, not complete legal dossiers. Requirements, estimates and user assumptions are separate. Source rights remain with their publishers; the statistical license does not apply to all editorial sources." } }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
