"use client";

import { useEffect, useRef, useState } from "react";

type InstallChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
}

type RuntimeNotice = "install" | "ios-install" | "offline" | "update" | null;

const INSTALL_DISMISS_KEY = "tgpi:pwa-install-dismissed:v1";

function isStandaloneMode() {
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

export default function TgpiAppRuntime() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(true);
  const [iosInstallAvailable, setIosInstallAvailable] = useState(false);
  const [online, setOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const reloadOnControllerChangeRef = useRef(false);

  useEffect(() => {
    let disposed = false;
    let runtimeRegistration: ServiceWorkerRegistration | null = null;
    let installingWorker: ServiceWorker | null = null;
    const standalone = isStandaloneMode();
    const dismissed = window.localStorage.getItem(INSTALL_DISMISS_KEY) === "1";
    const isiOS =
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const hydrationTimer = window.setTimeout(() => {
      setOnline(navigator.onLine);
      setInstallDismissed(standalone || dismissed);
      setIosInstallAvailable(isiOS && !standalone && !dismissed);
    }, 0);

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setInstallDismissed(false);
    };
    const onInstalled = () => {
      setInstallPrompt(null);
      setInstallDismissed(true);
      setIosInstallAvailable(false);
      window.localStorage.removeItem(INSTALL_DISMISS_KEY);
    };
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    const onControllerChange = () => {
      if (reloadOnControllerChangeRef.current) window.location.reload();
    };
    const onInstallingStateChange = () => {
      if (
        !disposed &&
        installingWorker?.state === "installed" &&
        navigator.serviceWorker.controller
      ) {
        setUpdateAvailable(true);
      }
    };
    const onUpdateFound = () => {
      installingWorker?.removeEventListener(
        "statechange",
        onInstallingStateChange,
      );
      installingWorker = runtimeRegistration?.installing ?? null;
      installingWorker?.addEventListener(
        "statechange",
        onInstallingStateChange,
      );
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const registerRuntime = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
          });
          if (disposed) return;
          runtimeRegistration = registration;
          registrationRef.current = registration;

          if (registration.waiting && navigator.serviceWorker.controller) {
            setUpdateAvailable(true);
          }

          registration.addEventListener("updatefound", onUpdateFound);
        } catch {
          // The website remains fully usable when service-worker registration fails.
        }
      };

      const checkForUpdate = () => {
        if (document.visibilityState === "visible") {
          void registrationRef.current?.update();
        }
      };

      if (document.readyState === "complete") {
        void registerRuntime();
      } else {
        window.addEventListener("load", registerRuntime, { once: true });
      }
      document.addEventListener("visibilitychange", checkForUpdate);
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        onControllerChange,
      );

      return () => {
        disposed = true;
        window.clearTimeout(hydrationTimer);
        runtimeRegistration?.removeEventListener("updatefound", onUpdateFound);
        installingWorker?.removeEventListener(
          "statechange",
          onInstallingStateChange,
        );
        window.removeEventListener("load", registerRuntime);
        document.removeEventListener("visibilitychange", checkForUpdate);
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          onControllerChange,
        );
        window.removeEventListener("beforeinstallprompt", onBeforeInstall);
        window.removeEventListener("appinstalled", onInstalled);
        window.removeEventListener("online", onOnline);
        window.removeEventListener("offline", onOffline);
      };
    }

    return () => {
      disposed = true;
      window.clearTimeout(hydrationTimer);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    if (choice.outcome === "dismissed") dismissInstall();
  }

  function dismissInstall() {
    window.localStorage.setItem(INSTALL_DISMISS_KEY, "1");
    setInstallDismissed(true);
    setIosInstallAvailable(false);
    setInstallPrompt(null);
  }

  function activateUpdate() {
    const waitingWorker = registrationRef.current?.waiting;
    if (!waitingWorker) {
      window.location.reload();
      return;
    }
    reloadOnControllerChangeRef.current = true;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }

  const notice: RuntimeNotice = !online
    ? "offline"
    : updateAvailable
      ? "update"
      : !installDismissed && installPrompt
        ? "install"
        : iosInstallAvailable
          ? "ios-install"
          : null;

  if (!notice) return null;

  const content = {
    install: {
      icon: "✦",
      eyebrow: "TGPI App",
      title: "Install your global workspace",
      description: "Open TGPI in its own window and return to your plan faster.",
    },
    "ios-install": {
      icon: "↗",
      eyebrow: "Install on iPhone",
      title: "Add TGPI to your Home Screen",
      description: "Tap Share, then choose Add to Home Screen.",
    },
    offline: {
      icon: "◌",
      eyebrow: "Connection paused",
      title: "You are offline",
      description: "Private workspace data was not cached. Reconnect to continue safely.",
    },
    update: {
      icon: "↻",
      eyebrow: "Update available",
      title: "A new TGPI version is ready",
      description: "Update now to load the latest experience without losing your session.",
    },
  }[notice];

  return (
    <aside
      aria-atomic="true"
      aria-live="polite"
      className="fixed inset-x-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-[90] mx-auto max-w-md overflow-hidden rounded-[1.4rem] border border-[#D8B35C]/35 bg-[#061525]/95 text-white shadow-[0_24px_80px_rgba(1,8,16,0.38)] backdrop-blur-xl lg:inset-x-auto lg:bottom-6 lg:right-6 lg:mx-0"
      data-pwa-runtime={notice}
      role="status"
    >
      <div className="h-1 bg-gradient-to-r from-[#7E5A1D] via-[#E5B94B] to-[#F3D98B]" />
      <div className="flex gap-4 p-4 sm:p-5">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#E5B94B]/25 bg-[#E5B94B]/10 text-xl text-[#F0D58C]"
        >
          {content.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#E5C46F]">
            {content.eyebrow}
          </p>
          <p className="mt-1 text-sm font-extrabold text-white">{content.title}</p>
          <p className="mt-1 text-xs leading-5 text-[#B4C0CC]">{content.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {notice === "install" ? (
              <button
                className="min-h-11 rounded-xl bg-[#E5B94B] px-4 text-sm font-extrabold text-[#07182D] transition hover:bg-[#F0C95F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => void installApp()}
                type="button"
              >
                Install TGPI
              </button>
            ) : null}
            {notice === "update" ? (
              <button
                className="min-h-11 rounded-xl bg-[#E5B94B] px-4 text-sm font-extrabold text-[#07182D] transition hover:bg-[#F0C95F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={activateUpdate}
                type="button"
              >
                Update now
              </button>
            ) : null}
            {notice === "ios-install" ? (
              <button
                className="min-h-11 rounded-xl border border-white/15 px-4 text-sm font-extrabold text-white transition hover:border-[#E5B94B]/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B]"
                onClick={dismissInstall}
                type="button"
              >
                Got it
              </button>
            ) : null}
            {notice === "offline" ? (
              <button
                className="min-h-11 rounded-xl border border-white/15 px-4 text-sm font-extrabold text-white transition hover:border-[#E5B94B]/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B]"
                onClick={() => window.location.reload()}
                type="button"
              >
                Try again
              </button>
            ) : null}
            {notice === "install" ? (
              <button
                className="min-h-11 rounded-xl px-3 text-sm font-bold text-[#AEBBC8] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B]"
                onClick={dismissInstall}
                type="button"
              >
                Not now
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
