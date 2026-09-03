import "server-only";
import { DOSSIER_COUNTRIES, DOSSIER_VERSION, dossierFor } from "./dossiers";
import { checkCountrySources } from "./source-watch.server";

export async function sourceResponse(country: string) {
  const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (!DOSSIER_COUNTRIES.includes(country)) return Response.json({ error: "Select one country in the reviewed source registry." }, { status: 400, headers });
  try {
    const checks = await checkCountrySources(country);
    return Response.json({ version: DOSSIER_VERSION, country, sources: dossierFor(country).sources, checks, semantics: "Availability and selected markers only. A successful check never renews editorial or legal review, or clears an outstanding review issue." }, { headers });
  } catch { return Response.json({ error: "Source-check service could not complete the request. Existing evidence has not been replaced." }, { status: 503, headers }); }
}
