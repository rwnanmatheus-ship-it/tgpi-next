"use server";

import { createHash } from "node:crypto";
import { z } from "zod";
import { createFirestoreUpdateWrite, runFirestoreTransaction } from "@/lib/firestore-admin-rest.server";
import { guideCampaign, guideChannel, type GuideSignupState } from "./campaign";

import { isLocale } from "@/lib/localization/config";
import { guideCopy } from "./copy";

const emailInput = z.string().trim().max(254).toLowerCase().email();

export async function subscribeToGuides(
  _previous: GuideSignupState,
  form: FormData,
): Promise<GuideSignupState> {
  if (form.get("website")) return "saved";

  const email = emailInput.safeParse(form.get("email"));
  const locale = form.get("locale");
  if (typeof locale !== "string" || !isLocale(locale) || !email.success || form.get("consent") !== "yes") return "invalid";

  const id = createHash("sha256").update(email.data).digest("hex");
  const path = "tgpiGuideSubscribers/" + id;
  const channel = guideChannel(form.get("source"));
  try {
    await runFirestoreTransaction(async ({ getDocuments }) => {
      const existing = await getDocuments([path]);
      // Preserve first attribution and any later unsubscribe or suppression.
      if (existing.get(path)) return { result: null, writes: [] };
      const write = createFirestoreUpdateWrite(path, {
        email: email.data,
        campaign: guideCampaign,
        source: channel,
        locale,
        guideLanguage: "pt-BR",
        emailOptIn: true,
        consentVersion: "guides-v1",
        consentText: guideCopy[locale].consent,
        verification: "unverified",
      }, { exists: false }, ["createdAt"]);
      return { result: null, writes: [write] };
    });
    return "saved";
  } catch {
    console.error("TGPI guide subscription storage unavailable");
    return "unavailable";
  }
}
