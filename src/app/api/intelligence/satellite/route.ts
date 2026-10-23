import { unstable_cache } from "next/cache";
import { GIBS_CAPABILITIES, parseSatelliteCatalog } from "@/lib/satellite";

const catalog = unstable_cache(async () => {
  // Cache only the small parsed catalog; the upstream XML exceeds Next's fetch cache limit.
  const response = await fetch(GIBS_CAPABILITIES, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error("NASA catalog unavailable");
  return parseSatelliteCatalog(await response.text());
}, ["tgpi-nasa-gibs-catalog-v1"], { revalidate: 900 });

export async function GET() {
  try {
    return Response.json(await catalog(), { headers: { "Cache-Control": "public, max-age=60, s-maxage=900", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return Response.json({ error: "NASA observation dates are temporarily unavailable. Try again or use the historical terrain reference." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
