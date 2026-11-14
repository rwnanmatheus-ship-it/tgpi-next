"use client";

import { useEffect, useRef, useState } from "react";
import {
  detectInstallPlatform, installGuideEvent, installReminderDelay, installReminderKey,
  isInstallReminderPaused, legacyInstallDismissKey, type InstallPlatform,
} from "@/lib/pwa-install";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isReminderPaused() {
  try {
    return localStorage.getItem(legacyInstallDismissKey) === "1" ||
      isInstallReminderPaused(localStorage.getItem(installReminderKey), Date.now());
  } catch {
    return false;
  }
}

export function useTgpiInstall(offerOnPage: boolean) {
  const [platform, setPlatform] = useState<InstallPlatform>("other");
  const [standalone, setStandalone] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [paused, setPaused] = useState(true);
  const [ready, setReady] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [nativeFailed, setNativeFailed] = useState(false);
  const pausedForVisit = useRef(false);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);

  function remindLater() {
    pausedForVisit.current = true;
    setPaused(true);
    try {
      localStorage.setItem(installReminderKey, String(Date.now() + installReminderDelay));
    } catch {
      // Storage can be unavailable in private browsing.
    }
  }

  useEffect(() => {
    const display = window.matchMedia("(display-mode: standalone)");
    const minimalUi = window.matchMedia("(display-mode: minimal-ui)");
    const device = navigator as Navigator & { standalone?: boolean };
    const detectMode = () => setStandalone(display.matches || minimalUi.matches || device.standalone === true);
    const syncReminder = () => setPaused(pausedForVisit.current || isReminderPaused());
    const initialize = window.setTimeout(() => {
      setPlatform(detectInstallPlatform(device.userAgent, device.platform, device.maxTouchPoints));
      detectMode();
      syncReminder();
    }, 0);
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      const installEvent = event as BeforeInstallPromptEvent;
      promptRef.current = installEvent;
      setPrompt(installEvent);
      setNativeFailed(false);
    };
    const confirmInstall = () => {
      promptRef.current = null;
      setPrompt(null);
      setInstalled(true);
      remindLater();
    };
    const openGuide = () => setGuideOpen(true);
    display.addEventListener("change", detectMode);
    minimalUi.addEventListener("change", detectMode);
    window.addEventListener("beforeinstallprompt", capturePrompt);
    window.addEventListener("appinstalled", confirmInstall);
    window.addEventListener(installGuideEvent, openGuide);
    window.addEventListener("storage", syncReminder);
    return () => {
      window.clearTimeout(initialize);
      display.removeEventListener("change", detectMode);
      minimalUi.removeEventListener("change", detectMode);
      window.removeEventListener("beforeinstallprompt", capturePrompt);
      window.removeEventListener("appinstalled", confirmInstall);
      window.removeEventListener(installGuideEvent, openGuide);
      window.removeEventListener("storage", syncReminder);
    };
  }, []);

  const eligible = offerOnPage && !paused && !installed && !standalone &&
    Boolean(prompt || platform === "ios" || platform === "safari" || platform === "firefoxWindows");
  useEffect(() => {
    if (!eligible) return;
    const timer = window.setTimeout(() => setReady(true), 7000);
    return () => window.clearTimeout(timer);
  }, [eligible]);

  async function installNative() {
    const availablePrompt = promptRef.current;
    if (!availablePrompt) return;
    promptRef.current = null;
    setPrompt(null);
    setInstalling(true);
    try {
      const { outcome } = await availablePrompt.prompt();
      remindLater();
      if (outcome === "accepted") setInstalled(true);
      else setGuideOpen(false);
    } catch {
      setNativeFailed(true);
    } finally {
      setInstalling(false);
    }
  }

  return {
    platform, standalone: standalone || installed, canInstallNative: Boolean(prompt),
    showInvite: eligible && ready, guideOpen, setGuideOpen,
    remindLater, installNative, installing, nativeFailed,
  };
}
