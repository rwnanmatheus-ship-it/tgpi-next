import { auth } from "@clerk/nextjs/server";
import identityData from "@/data/intelligence/identities.json";
import { getUserActivationProgress } from "@/lib/activation-store.server";
import { localizedCountryName } from "@/lib/country-search";
import { documentReviewItems } from "@/lib/document-review";
import { documentGoalPaths } from "@/lib/documents-os";
import { translate } from "@/lib/localization/messages";
import { getLocale } from "@/lib/localization/server";

const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countrySlug = searchParams.get("country");
  const goal = searchParams.get("goal");
  const country = identityData.countries.find(item => item.slug === countrySlug);
  const plan = documentGoalPaths.find(item => item.goal === goal);
  if (!country || !plan) return new Response(null, { status: 400, headers: privateHeaders });

  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const progress = session.userId ? await getUserActivationProgress(session.userId).catch(() => null) : null;
  const completedIds = new Set(progress?.documentReviews[country.slug]?.completedItemIds);
  const t = (key: string, values?: Record<string, string>) => translate(locale, key, values);
  const countryName = localizedCountryName(country, locale);
  const sources = `https://www.theglobalpolymath.com/countries/${country.slug}#country-sources`;
  const lines = [
    "TGPI Global Documents",
    t("Research brief for {country}", { country: countryName }),
    t(plan.label),
    "",
    t(plan.description),
    "",
    t("Documents to verify"),
    ...documentReviewItems.map(item => `[${completedIds.has(item.id) ? "x" : " "}] ${t(item.title)}\n    ${t(item.text)}`),
    "",
    ...(session.userId && !progress ? [t("Unable to load your TGPI progress."), ""] : []),
    t("Open country sources"),
    sources,
    t("Confirm applicable requirements with the receiving authority."),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      ...privateHeaders,
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Language": locale,
      "Content-Disposition": `attachment; filename="tgpi-documents-${country.slug}-${plan.goal}.txt"`,
    },
  });
}
