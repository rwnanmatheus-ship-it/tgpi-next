"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useId, useRef, useState } from "react";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import NavigationLink from "@/components/navigation/NavigationLink";
import { normalizeTgpiAccountProfile } from "@/lib/account-profile";
import { containDialogFocus } from "@/lib/dialog-focus";
import styles from "./TgpiAccountMenu.module.css";

const settingsUrl = "/profile/security#settings-";

const destinations = [
  ["identity", "Personal information", "file"],
  ["security", "Login & security", "shield"],
  ["privacy", "Privacy controls", "key"],
  ["preferences", "App preferences", "globe"],
  ["notifications", "Notification preferences", "bell"],
  ["billing", "Plan & billing", "graph"],
] as const;

type IdentitySummary =
  | { status: "loading" | "unavailable" }
  | { status: "ready"; handle: string };

export default function TgpiAccountMenu() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user) return null;

  const displayName = normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile).displayName;
  return <AccountMenu key={user.id} name={displayName || user.fullName || ""} imageUrl={user.imageUrl} />;
}

function AccountMenu({ name, imageUrl }: { name: string; imageUrl: string }) {
  const { t } = useLocale();
  const { signOut } = useClerk();
  const dialogId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [identity, setIdentity] = useState<IdentitySummary>({ status: "loading" });
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [signOutStatus, setSignOutStatus] = useState<"idle" | "pending" | "error">("idle");

  useEffect(() => {
    const panel = dialog.current;
    const avatar = trigger.current;
    if (!open || !panel || !avatar) return;

    function placePanel() {
      if (!panel || !avatar) return;
      const bounds = avatar.getBoundingClientRect();
      panel.style.setProperty("--account-top", `${bounds.bottom + 10}px`);
      panel.style.setProperty("--account-right", `${Math.max(12, document.documentElement.clientWidth - bounds.right)}px`);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    placePanel();
    panel.showModal();
    closeButton.current?.focus({ preventScroll: true });
    window.addEventListener("resize", placePanel);
    return () => {
      window.removeEventListener("resize", placePanel);
      panel.close();
      document.body.style.overflow = previousOverflow;
      avatar.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    async function loadIdentity() {
      try {
        const response = await fetch("/api/member-identity?view=summary", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) {
          if (!controller.signal.aborted) setIdentity({ status: "unavailable" });
          return;
        }
        const summary: { handle?: unknown } = await response.json();
        if (!controller.signal.aborted) {
          setIdentity(typeof summary.handle === "string"
            ? { status: "ready", handle: summary.handle }
            : { status: "unavailable" });
        }
      } catch {
        if (!controller.signal.aborted) setIdentity({ status: "unavailable" });
      }
    }

    void loadIdentity();
    return () => controller.abort();
  }, [open]);

  function openMenu() {
    setIdentity({ status: "loading" });
    setCopyStatus("idle");
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  async function copyHandle(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  async function leaveSession() {
    setSignOutStatus("pending");
    try {
      await signOut({ redirectUrl: "/" });
    } catch {
      setSignOutStatus("error");
    }
  }

  const displayName = name || t("TGPI member");
  const initials = displayName.trim().split(/\s+/).slice(0, 2).map((word) => Array.from(word)[0]).join("");
  const handle = identity.status === "ready" && identity.handle ? `@${identity.handle}` : "";
  const avatarContent = imageUrl
    ? <LocalizedElement as="img" src={imageUrl} alt="" referrerPolicy="no-referrer" className={styles.avatarImage} />
    : initials;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={t("Account settings for {name}", { name: displayName })}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        className={styles.trigger}
        onClick={openMenu}
      >
        {avatarContent}
      </button>

      <dialog
        ref={dialog}
        id={dialogId}
        aria-labelledby={`${dialogId}-title`}
        className={styles.panel}
        onKeyDown={containDialogFocus}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            closeMenu();
          }
        }}
      >
        {open && <>
          <header className={styles.header}>
            <h2 id={`${dialogId}-title`}>{t("Your TGPI account")}</h2>
            <button ref={closeButton} type="button" className={styles.close} aria-label={t("Close")} onClick={closeMenu}>
              <NavigationIcon name="close" width={19} height={19} />
            </button>
          </header>

          <div className={styles.content}>
            <div className={styles.identity}>
              <div className={styles.identityRow}>
                <span className={styles.identityAvatar} aria-hidden="true">{avatarContent}</span>
                <div className={styles.identityText}>
                  <p className={styles.name}>{displayName}</p>
                  {handle ? <p className={styles.handle}>{handle}</p>
                    : identity.status === "loading" ? <p className={styles.handle} role="status">{t("Loading member ID…")}</p>
                      : <NavigationLink href={`${settingsUrl}identity`} className={styles.handleLink} onClick={closeMenu}>
                        {identity.status === "unavailable" ? t("Manage your member ID") : t("Create your unique @ID")}
                      </NavigationLink>}
                </div>
                {handle && <button
                  type="button"
                  className={styles.copy}
                  aria-label={`${t("Copy")} ${handle}`}
                  title={`${t("Copy")} ${handle}`}
                  onClick={() => void copyHandle(handle)}
                >
                  <NavigationIcon name={copyStatus === "copied" ? "check" : "copy"} width={18} height={18} />
                </button>}
              </div>
              <p className={styles.copyStatus} role="status" hidden={copyStatus === "idle"}>
                {copyStatus === "copied" ? t("Copied to clipboard.") : copyStatus === "error" ? t("Copy is unavailable. Select the visible reference manually.") : ""}
              </p>
            </div>

            <nav aria-label={t("Account shortcuts")} className={styles.shortcuts}>
              <NavigationLink href={`${settingsUrl}global-key`} className={styles.shortcut} onClick={closeMenu}>
                <NavigationIcon name="key" width={19} height={19} />
                <span>{t("TGPI Global ID")}</span>
                <NavigationIcon className={styles.shortcutArrow} name="chevron" width={14} height={14} />
              </NavigationLink>
              <NavigationLink href="/certificates" className={styles.shortcut} onClick={closeMenu}>
                <NavigationIcon name="certificate" width={19} height={19} />
                <span>{t("Certificates")}</span>
                <NavigationIcon className={styles.shortcutArrow} name="chevron" width={14} height={14} />
              </NavigationLink>
            </nav>

            <nav aria-labelledby={`${dialogId}-settings`} className={styles.settings}>
              <h3 id={`${dialogId}-settings`}>{t("Settings")}</h3>
              <ul className={styles.settingsList}>
                {destinations.map(([section, label, icon]) => (
                  <li key={section}>
                    <NavigationLink href={`${settingsUrl}${section}`} className={styles.setting} onClick={closeMenu}>
                      <span className={styles.settingIcon}><NavigationIcon name={icon} width={18} height={18} /></span>
                      <span>{t(label)}</span>
                    </NavigationLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <footer className={styles.footer}>
            <button type="button" className={styles.signOut} disabled={signOutStatus === "pending"} onClick={() => void leaveSession()}>
              <NavigationIcon name="log-out" width={18} height={18} />
              {signOutStatus === "pending" ? t("Signing out…") : t("Sign out")}
            </button>
            {signOutStatus === "error" && <p role="alert" className={styles.signOutError}>{t("Unable to sign out. Please try again.")}</p>}
          </footer>
        </>}
      </dialog>
    </>
  );
}
