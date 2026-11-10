"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useLocale } from "@/components/localization/LocaleProvider";
import { notificationText } from "@/lib/notifications/text";
import {
  clearLocalPush,
  connectPush,
  currentPushSubscription,
  pushDeviceId,
  pushRequest,
  pushSupported,
} from "@/lib/notifications/push-client";
import { useNotifications } from "./NotificationProvider";
import styles from "./NotificationInbox.module.css";
type Device = {
  id: string;
  label: string;
  updatedAt: string;
  lastAcceptedAt: string | null;
};
export default function NotificationDevices() {
  const { locale } = useLocale(),
    { user } = useUser(),
    inbox = useNotifications();
  const t = (key: Parameters<typeof notificationText>[1]) =>
    notificationText(locale, key);
  const [config, setConfig] = useState<{
    configured: boolean;
    publicKey: string | null;
    devices: Device[];
  } | null>(null);
  const [currentId, setCurrentId] = useState("");
  const [supported, setSupported] = useState(false),
    [ios, setIos] = useState(false),
    [blocked, setBlocked] = useState(false);
  const [busy, setBusy] = useState(false),
    [feedback, setFeedback] = useState<"accepted" | "error" | "blocked" | "">(
      "",
    );
  async function refreshDevices() {
    const response = await fetch("/api/notifications/push", {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Unavailable");
    setConfig(await response.json());
    const subscription = await currentPushSubscription();
    setCurrentId(subscription ? await pushDeviceId(subscription) : "");
    setBlocked(
      "Notification" in window && Notification.permission === "denied",
    );
  }
  useEffect(() => {
    setSupported(pushSupported());
    setIos(
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
        !window.matchMedia("(display-mode: standalone)").matches,
    );
    void refreshDevices().catch(() => setFeedback("error"));
  }, [user?.id]);
  async function enable() {
    setBusy(true);
    setFeedback("");
    try {
      // Must be the first await after the user's click (required by Safari).
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setFeedback("blocked");
        setBlocked(permission === "denied");
        return;
      }
      if (!config?.publicKey) throw new Error("Unavailable");
      const subscription = await connectPush(config.publicKey);
      await pushRequest({
        action: "subscribe",
        subscription: subscription.toJSON(),
        enable: true,
        locale,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      try {
        localStorage.setItem("tgpi.push.owner.v1", user!.id);
      } catch {
        /* Optional cross-account marker. */
      }
      await Promise.all([refreshDevices(), inbox.refresh()]);
    } catch {
      setFeedback("error");
    } finally {
      setBusy(false);
    }
  }
  async function action(kind: "test" | "remove", id: string) {
    setBusy(true);
    setFeedback("");
    try {
      await pushRequest({ action: kind, id });
      if (kind === "remove" && id === currentId) await clearLocalPush();
      if (kind === "test") setFeedback("accepted");
      await refreshDevices();
    } catch {
      setFeedback("error");
    } finally {
      setBusy(false);
    }
  }
  const connected = Boolean(
    currentId && config?.devices.some((d) => d.id === currentId),
  );
  return (
    <section
      className={styles.panel}
      aria-labelledby="notification-device-heading"
    >
      <span className={styles.panelIcon} aria-hidden="true">
        ↗
      </span>
      <h2 id="notification-device-heading">{t("devices")}</h2>
      <p>{t("deviceBody")}</p>
      {ios ? (
        <p className={styles.notice}>{t("ios")}</p>
      ) : !supported ? (
        <p className={styles.notice}>{t("unsupported")}</p>
      ) : blocked ? (
        <p className={styles.notice}>{t("blocked")}</p>
      ) : config?.configured === false ? (
        <p className={styles.notice}>{t("unavailable")}</p>
      ) : connected ? (
        <>
          <p className={styles.connected}>● {t("enabled")}</p>
          <button
            type="button"
            className={styles.primary}
            disabled={busy}
            onClick={() => void action("test", currentId)}
          >
            {busy ? t("loading") : t("test")}
          </button>
        </>
      ) : (
        <button
          type="button"
          className={styles.primary}
          disabled={busy || !config?.configured}
          onClick={() => void enable()}
        >
          {busy ? t("loading") : t("enable")}
        </button>
      )}
      {feedback && (
        <p role="status" className={styles.notice}>
          {t(feedback)}
        </p>
      )}
      {config && config.devices.length > 0 && (
        <ul className={styles.devices}>
          {config.devices.map((device) => (
            <li key={device.id}>
              <span>
                <strong>{device.label}</strong>
                <small>
                  {new Date(device.updatedAt).toLocaleDateString(locale)}
                </small>
              </span>
              <button
                type="button"
                disabled={busy}
                onClick={() => void action("remove", device.id)}
                aria-label={`${t("remove")} ${device.label}`}
              >
                {t("remove")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
