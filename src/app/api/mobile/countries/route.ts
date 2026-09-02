import { getAllCountries } from "@/lib/countries";
import type { MobileCountry } from "@/lib/mobile-experience";

export const dynamic = "force-static";

export function GET() {
  const countries: MobileCountry[] = getAllCountries().map(({ slug, name, capital, region, emoji }) => ({ slug, name, capital, region, emoji }));
  return Response.json(countries, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400", "X-Robots-Tag": "noindex" },
  });
}
