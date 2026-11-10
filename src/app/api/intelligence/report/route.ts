import { currentUser } from "@clerk/nextjs/server";
import identities from "@/data/intelligence/identities.json";
import { RESEARCH_TASKS, validateWorksheet } from "@/lib/intelligence/research-plan";
import { dossierFor, reviewState, formatMoney, referenceReviewState } from "@/lib/intelligence/dossiers";
import { mergeAccountProfileWithOnboarding } from "@/lib/account-profile";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { createResearchPdf } from "@/lib/research-pdf.server";
import { getLocaleForAccount } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import { researchReportCopy } from "@/lib/intelligence/report-copy";
import { localizeKnownLanguage } from "@/lib/localization/presentation-values";
import { getIntelligence } from "@/lib/intelligence/server";
import { INDICATOR_IDS, INDICATORS, findObservation, evidenceLabel, evidenceStatus, indicatorUrl } from "@/lib/intelligence/core";
export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
const goalLabels = {
  learn: "Expand my global knowledge",
  live: "Live in another country",
  study: "Study abroad",
  travel: "Travel smarter",
  work: "Work globally",
} as const;
const timelineLabels = {
  now: "Now",
  "3-months": "Within 3 months",
  "6-months": "Within 6 months",
  "12-months": "Within 12 months",
  exploring: "Still exploring",
} as const;

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Same-origin request required." }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required." }, { status: 415, headers });
  try {
    const reader = request.body?.getReader(); if (!reader) throw new SyntaxError(); const parts: Uint8Array[] = []; let size = 0;
    while (true) { const p = await reader.read(); if (p.done) break; size += p.value.length; if (size > 4096) { await reader.cancel(); return Response.json({ error: "Report input too large." }, { status: 413, headers }); } parts.push(p.value); }
    const plan = validateWorksheet(JSON.parse(Buffer.concat(parts).toString("utf8")), identities.countries.map(c => c.slug), RESEARCH_TASKS.map(t => t.id));
    if (!plan) return Response.json({ error: "Check your amounts and dates before downloading." }, { status: 400, headers });
    const identity = identities.countries.find(c => c.slug === plan.country)!, dossier = dossierFor(plan.country);
    const user = await currentUser();
    const locale = await getLocaleForAccount(user?.unsafeMetadata.tgpiLocale);
    const copy = researchReportCopy[locale];
    const t = (value: string) => translate(locale, value);
    const profile = mergeAccountProfileWithOnboarding(user?.unsafeMetadata.tgpiAccountProfile, user?.unsafeMetadata.tgpiOnboarding);
    const journey = normalizeOnboardingData(user?.unsafeMetadata.tgpiOnboarding);
    const state = await getIntelligence();
    const reviewLabel = (status: ReturnType<typeof reviewState>) =>
      status === "review-due" ? copy.reviewDue : status === "not-effective" ? copy.notEffective : status === "expired" ? copy.expired : t("reviewed");
    const statistics = INDICATOR_IDS.flatMap(id => {
      const observation = findObservation(state.snapshot, plan.country, id);
      return observation ? [{
        title: `${t(INDICATORS[id].label)} [${t(evidenceLabel(evidenceStatus(observation)))}]`,
        text: `${observation.value} ${t(INDICATORS[id].unit)}; ${t("Reference year")} ${observation.year}. ${t(INDICATORS[id].explanation)} ${t("Collected at")}: ${observation.retrievedAt}. ${copy.reference}: ${indicatorUrl(id, identity.iso2)}`,
      }] : [];
    });
    const costReference = (reference: (typeof dossier.costs)[number]) => {
      const money = (amount: number) => formatMoney(amount, reference.currency, locale);
      return `${money(reference.low)}${reference.high === reference.low ? "" : `–${money(reference.high)}`} / ${reference.periodMonths} ${reference.periodMonths === 1 ? copy.month : copy.months}`;
    };
    const pdf = await createResearchPdf({
      name: t(identity.name), worksheet: plan,
      context: [
        `${t("Goal")}: ${journey.primaryGoal ? t(goalLabels[journey.primaryGoal]) : copy.notProvided} | ${t("Timeline")}: ${journey.timeHorizon ? t(timelineLabels[journey.timeHorizon]) : copy.exploring}`,
        `${t("Profession")}: ${profile.profession || copy.notProvided} | ${t("Languages")}: ${profile.languages.map(language => localizeKnownLanguage(language, t)).join(", ") || copy.notProvided}`,
      ],
      evidence: [
        ...statistics,
        ...dossier.claims.map(claim => ({
          title: `${t(claim.title)} [${reviewLabel(reviewState(claim))}]`,
          text: `${t(claim.summary)} ${copy.audience}: ${t(claim.audience)}. ${copy.reference}: ${t(claim.referencePeriod)}. ${copy.review}: ${claim.reviewedAt}. ${copy.limits}: ${t(claim.limits)}`,
        })),
        ...dossier.costs.map(reference => ({
          title: `${t(reference.title)} [${reviewLabel(referenceReviewState(reference))}]`,
          text: `${costReference(reference)}. ${t(reference.referencePeriod)}. ${t(reference.location)}. ${t(reference.audience)}. ${copy.includes}: ${t(reference.includes)}. ${copy.excludes}: ${t(reference.excludes)}.`,
        })),
      ],
      sources: [{ title: copy.countryRegister, url: identities.source, reviewedAt: identities.retrievedAt.slice(0, 10) }, ...dossier.sources.map(source => ({ ...source, title: t(source.title) }))],
    }, locale);
    return new Response(Buffer.from(pdf), { headers: { ...headers, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="TGPI-${plan.country}-research.pdf"` } });
  } catch (e) { return Response.json({ error: e instanceof SyntaxError ? "Invalid report data." : "Unable to prepare the PDF. Your research is unchanged." }, { status: e instanceof SyntaxError ? 400 : 503, headers }); }
}
