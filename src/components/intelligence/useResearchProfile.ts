"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { mergeAccountProfileWithOnboarding } from "@/lib/account-profile";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { PROGRESS_SYNC_EVENT, PROGRESS_SYNC_CHANNEL } from "@/lib/progress-sync";
export function useResearchProfile() {
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!user) return;
    const refresh = () => { if (document.visibilityState === "visible") void user.reload().catch(() => undefined); };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(PROGRESS_SYNC_CHANNEL) : null;
    if (channel) channel.onmessage = refresh;
    window.addEventListener("focus", refresh); window.addEventListener(PROGRESS_SYNC_EVENT, refresh);
    return () => { channel?.close(); window.removeEventListener("focus", refresh); window.removeEventListener(PROGRESS_SYNC_EVENT, refresh); };
  }, [user]);
  return { user, isLoaded, profile: mergeAccountProfileWithOnboarding(user?.unsafeMetadata.tgpiAccountProfile, user?.unsafeMetadata.tgpiOnboarding), journey: normalizeOnboardingData(user?.unsafeMetadata.tgpiOnboarding) };
}
