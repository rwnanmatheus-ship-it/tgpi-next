import { currentUser } from "@clerk/nextjs/server";
import identities from "@/data/intelligence/identities.json";
import { RESEARCH_TASKS, validateWorksheet } from "@/lib/intelligence/research-plan";
import { dossierFor, reviewState, formatReference, referenceReviewState } from "@/lib/intelligence/dossiers";
import { mergeAccountProfileWithOnboarding } from "@/lib/account-profile";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { createResearchPdf } from "@/lib/research-pdf.server";
import { getIntelligence } from "@/lib/intelligence/server";
import { INDICATOR_IDS, INDICATORS, findObservation, evidenceLabel, evidenceStatus, indicatorUrl } from "@/lib/intelligence/core";
export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Same-origin request required." }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required." }, { status: 415, headers });
  try {
    const reader = request.body?.getReader(); if (!reader) throw new SyntaxError(); const parts: Uint8Array[] = []; let size = 0;
    while (true) { const p = await reader.read(); if (p.done) break; size += p.value.length; if (size > 4096) { await reader.cancel(); return Response.json({ error: "Report input too large." }, { status: 413, headers }); } parts.push(p.value); }
    const plan = validateWorksheet(JSON.parse(Buffer.concat(parts).toString("utf8")), identities.countries.map(c => c.slug), RESEARCH_TASKS.map(t => t.id));
    if (!plan) return Response.json({ error: "Check your amounts and dates before downloading." }, { status: 400, headers });
    const identity = identities.countries.find(c => c.slug === plan.country)!, dossier = dossierFor(plan.country);
    const user = await currentUser(), profile = mergeAccountProfileWithOnboarding(user?.unsafeMetadata.tgpiAccountProfile, user?.unsafeMetadata.tgpiOnboarding), journey = normalizeOnboardingData(user?.unsafeMetadata.tgpiOnboarding);
    const state = await getIntelligence();
    const statistics = INDICATOR_IDS.flatMap(id => { const o = findObservation(state.snapshot, plan.country, id); return o ? [{ title: `${INDICATORS[id].label} [${evidenceLabel(evidenceStatus(o))}]`, text: `${o.value} ${INDICATORS[id].unit}; reference year ${o.year}. ${INDICATORS[id].explanation} Collected: ${o.retrievedAt}. Source: ${indicatorUrl(id, identity.iso2)}` }] : []; });
    const pdf = await createResearchPdf({ name: identity.name, worksheet: plan, context: [`Goal: ${journey.primaryGoal || "Not provided"} | Timeline: ${journey.timeHorizon || "Exploring"}`, `Profession: ${profile.profession || "Not provided"} | Languages: ${profile.languages.join(", ") || "Not provided"}`], evidence: [...statistics, ...dossier.claims.map(c => ({ title: `${c.title} [${reviewState(c)}]`, text: `${c.summary} Audience: ${c.audience}. Reference: ${c.referencePeriod}. Review: ${c.reviewedAt}. Limits: ${c.limits}` })), ...dossier.costs.map(c => ({ title: `${c.title} [${referenceReviewState(c)}]`, text: `${formatReference(c)}. ${c.referencePeriod}. ${c.location}. ${c.audience}. Includes: ${c.includes}. Excludes: ${c.excludes}.` }))], sources: [{ title: "UNSD country identity register", url: identities.source, reviewedAt: identities.retrievedAt.slice(0, 10) }, ...dossier.sources] });
    return new Response(Buffer.from(pdf), { headers: { ...headers, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="TGPI-${plan.country}-research.pdf"` } });
  } catch (e) { return Response.json({ error: e instanceof SyntaxError ? "Invalid report data." : "Unable to prepare the PDF. Your research is unchanged." }, { status: e instanceof SyntaxError ? 400 : 503, headers }); }
}
