import { DOSSIER_COUNTRIES, DOSSIER_VERSION, dossierFor } from "@/lib/intelligence/dossiers";
import { checkCountrySources } from "@/lib/intelligence/source-watch.server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const country = params.get("country");
  if (Array.from(params.keys()).some(k => k !== "country") || params.getAll("country").length !== 1 || !country || !DOSSIER_COUNTRIES.includes(country)) return Response.json({ error: "Select one country in the reviewed source registry." }, { status: 400 });
  try {
    const checks = await checkCountrySources(country);
    return Response.json({ version: DOSSIER_VERSION, country, sources: dossierFor(country).sources, checks, semantics: "Availability and selected markers only. A successful check never renews editorial or legal review." }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return Response.json({ error: "Source-check service could not complete the request. Existing evidence has not been replaced." }, { status: 503 }); }
}
