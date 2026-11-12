import { NextResponse } from "next/server";
import { globalDossier } from "@/lib/intelligence/global-dossier.server";
import { RESEARCH_COUNTRIES, RESEARCH_SOURCES, RESEARCH_VERSION, researchCoverage } from "@/lib/intelligence/global-research";

export async function GET(request: Request) {
  const country = new URL(request.url).searchParams.get("country");
  if (country) {
    const dossier = globalDossier(country);
    if (!dossier) return NextResponse.json({ error: "Unknown country" }, { status: 404 });
    return NextResponse.json(dossier, { headers: { "Cache-Control": "public, max-age=3600", "Content-Disposition": `attachment; filename="tgpi-dossier-${country}.json"` } });
  }
  return NextResponse.json({ version: RESEARCH_VERSION, countryCount: RESEARCH_COUNTRIES.length, sourceCount: RESEARCH_SOURCES.length, scope: "Structured research coverage; legal and local evidence gaps remain explicit.", countries: RESEARCH_COUNTRIES.map(c => researchCoverage(c.slug)) }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
