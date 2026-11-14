"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/localization/LocaleProvider";
import { containDialogFocus } from "@/lib/dialog-focus";
import { installCopy } from "@/lib/localization/pwa-install";
import { installGuideEvent, installPlatforms, type InstallPlatform } from "@/lib/pwa-install";
import styles from "./install-guide.module.css";

const platformNames = {
  ios: "iPhone / iPad",
  android: "Chrome · Android",
  chromium: "Chrome · Desktop",
  edge: "Microsoft Edge",
  safari: "Safari · macOS",
  firefoxWindows: "Firefox · Windows",
  samsung: "Samsung Internet",
  firefoxAndroid: "Firefox · Android",
} satisfies Record<Exclude<InstallPlatform, "other">, string>;

const productUrl = "https://www.theglobalpolymath.com";

type GuideProps = {
  platform: InstallPlatform;
  standalone: boolean;
  canInstallNative: boolean;
  installing: boolean;
  nativeFailed: boolean;
  installNative: () => Promise<void>;
  close: () => void;
};

function AppIcon() {
  return <Image src="/pwa/icon-192.png" alt="" width={56} height={56} className={styles.icon} />;
}

export function InstallGuideButton({ className, onOpen }: { className?: string; onOpen?: () => void }) {
  const { locale } = useLocale();
  return (
    <button className={className} type="button" aria-haspopup="dialog" onClick={() => { onOpen?.(); window.dispatchEvent(new Event(installGuideEvent)); }}>
      {installCopy(locale, "title")}
    </button>
  );
}

export function InstallInvite({ open, dismiss }: { open: () => void; dismiss: () => void }) {
  const { locale } = useLocale();
  return (
    <aside className={styles.invite} aria-label={installCopy(locale, "title")} data-pwa-runtime="install">
      <div className={styles.heading}>
        <AppIcon />
        <div>
          <h2 aria-live="polite">{installCopy(locale, "title")}</h2>
          <p>{installCopy(locale, "intro")}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.primary} type="button" aria-haspopup="dialog" onClick={open}>{installCopy(locale, "open")}</button>
        <button className={styles.secondary} type="button" onClick={dismiss}>{installCopy(locale, "later")}</button>
      </div>
    </aside>
  );
}

export function InstallGuide({ platform, standalone, canInstallNative, installing, nativeFailed, installNative, close }: GuideProps) {
  const { locale } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<InstallPlatform | null>(null);
  const [linkState, setLinkState] = useState<"idle" | "copied" | "manual">("idle");
  const activePlatform = selected ?? platform;
  const nativeOnCurrentDevice = activePlatform === platform && !standalone;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(productUrl);
      setLinkState("copied");
    } catch {
      setLinkState("manual");
    }
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef} aria-labelledby="tgpi-install-heading" onKeyDown={containDialogFocus} onCancel={event => { event.preventDefault(); close(); }}>
      <div className={styles.panel}>
        <button className={styles.close} type="button" aria-label={installCopy(locale, "close")} onClick={close}>×</button>
        <div className={styles.heading}>
          <AppIcon />
          <div>
            <h2 id="tgpi-install-heading">{installCopy(locale, "title")}</h2>
            <p>{installCopy(locale, "intro")}</p>
          </div>
        </div>
        {standalone ? <p className={styles.confirmation} role="status">{installCopy(locale, "ready")}</p> : null}
        <label className={styles.field}>
          {installCopy(locale, "platform")}
          <select value={activePlatform} onChange={event => setSelected(installPlatforms.find(item => item === event.target.value) ?? "other")}>
            {installPlatforms.map(item => (
              <option key={item} value={item}>{item === "other" ? installCopy(locale, "otherLabel") : platformNames[item]}</option>
            ))}
          </select>
        </label>
        <p className={styles.instructions}>{installCopy(locale, activePlatform)}</p>
        {nativeFailed && nativeOnCurrentDevice ? <p className={styles.confirmation} role="status">{installCopy(locale, "failed")}</p> : null}
        <div className={styles.actions}>
          {nativeOnCurrentDevice && (canInstallNative || installing) ? (
            <button className={styles.primary} type="button" disabled={installing} onClick={() => void installNative()}>{installCopy(locale, "native")}</button>
          ) : null}
          <button className={styles.secondary} type="button" onClick={() => void copyLink()}>
            {installCopy(locale, "copy")}
          </button>
          {linkState === "copied" ? <span role="status" className={styles.confirmation}>{installCopy(locale, "copied")}</span> : null}
        </div>
        {linkState === "manual" ? <input className={styles.url} aria-label={installCopy(locale, "copy")} readOnly value={productUrl} onFocus={event => event.target.select()} /> : null}
      </div>
    </dialog>
  );
}
