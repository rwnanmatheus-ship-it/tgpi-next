import { DOSSIER_COUNTRIES } from "@/lib/intelligence/dossiers";
import { sourceResponse } from "@/lib/intelligence/source-response.server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const country = params.get("country");
  if (Array.from(params.keys()).some(k => k !== "country") || params.getAll("country").length !== 1 || !country || !DOSSIER_COUNTRIES.includes(country)) return Response.json({ error: "Select one country in the reviewed source registry." }, { status: 400 });
  return sourceResponse(country);
}
