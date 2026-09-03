import { sourceResponse } from "@/lib/intelligence/source-response.server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(_request: Request, context: { params: Promise<{ country: string }> }) {
  const { country } = await context.params;
  // Query strings do not control retrieval. Only the exact registry country does.
  return sourceResponse(country);
}
