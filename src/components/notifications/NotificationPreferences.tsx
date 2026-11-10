"use client";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import {
  notificationText,
  type NotificationTextKey,
} from "@/lib/notifications/text";
import type { NotificationPreferences as Preferences } from "@/lib/notifications/model";
import { useNotifications } from "./NotificationProvider";
import styles from "./NotificationInbox.module.css";
const categories = {
  pushAccount: "account",
  pushBilling: "billing",
  pushLearning: "learning",
  pushPlanning: "planning",
  pushCommunity: "community",
  pushProduct: "product",
} as const;
export default function NotificationPreferences() {
  const inbox = useNotifications(),
    { locale } = useLocale(),
    t = (key: NotificationTextKey) => notificationText(locale, key);
  const [override, setDraft] = useState<Preferences | null>(null),
    [saved, setSaved] = useState(false),
    [clock, setClock] = useState(0);
  useEffect(() => {
    const first = setTimeout(() => setClock(Date.now()), 0);
    const timer = setInterval(() => setClock(Date.now()), 60000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);
  const draft = override || inbox.preferences;
  async function save() {
    setSaved(false);
    const result = await inbox.savePreferences(draft);
    setSaved(result);
    if (result) setDraft(null);
  }
  return (
    <section className={styles.panel} id="notification-preferences">
      <h2>{t("channels")}</h2>
      <p>{t("channelsBody")}</p>
      <fieldset
        disabled={inbox.pending || inbox.loading}
        className={styles.fields}
      >
        <legend className="sr-only">{t("preferences")}</legend>
        <label className={styles.toggle}>
          <span>{t("pushEnabled")}</span>
          <input
            type="checkbox"
            checked={draft.pushEnabled}
            onChange={(e) => {
              setDraft({ ...draft, pushEnabled: e.target.checked });
              setSaved(false);
            }}
          />
        </label>
        {Object.entries(categories).map(([key, label]) => (
          <label className={styles.toggle} key={key}>
            <span>{t(label)}</span>
            <input
              type="checkbox"
              checked={draft[key as keyof typeof categories]}
              onChange={(e) => {
                setDraft({ ...draft, [key]: e.target.checked });
                setSaved(false);
              }}
            />
          </label>
        ))}
        <label className={styles.toggle}>
          <span>{t("preview")}</span>
          <input
            type="checkbox"
            checked={draft.showPreview}
            onChange={(e) =>
              setDraft({ ...draft, showPreview: e.target.checked })
            }
          />
        </label>
        <label className={styles.toggle}>
          <span>{t("quiet")}</span>
          <input
            type="checkbox"
            checked={draft.quietHours}
            onChange={(e) =>
              setDraft({
                ...draft,
                quietHours: e.target.checked,
                timezone:
                  draft.timezone === "UTC"
                    ? Intl.DateTimeFormat().resolvedOptions().timeZone
                    : draft.timezone,
              })
            }
          />
        </label>
        {draft.quietHours && (
          <>
            <div className={styles.timeFields}>
              <label>
                {t("from")}
                <input
                  type="time"
                  value={draft.quietStart}
                  onChange={(e) =>
                    setDraft({ ...draft, quietStart: e.target.value })
                  }
                />
              </label>
              <label>
                {t("until")}
                <input
                  type="time"
                  value={draft.quietEnd}
                  onChange={(e) =>
                    setDraft({ ...draft, quietEnd: e.target.value })
                  }
                />
              </label>
            </div>
            <p>
              {t("timezone")}: {draft.timezone}
            </p>
          </>
        )}
        <label className={styles.toggle}>
          <span>{t("dailyLimit")}</span>
          <select
            value={draft.dailyLimit}
            onChange={(e) =>
              setDraft({ ...draft, dailyLimit: Number(e.target.value) })
            }
          >
            {[3, 8, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => {
            const value = {
              ...draft,
              pausedUntil:
                Date.parse(draft.pausedUntil) > Date.now()
                  ? ""
                  : new Date(Date.now() + 3600000).toISOString(),
            };
            setDraft(value);
            void inbox.savePreferences(value);
          }}
        >
          {Date.parse(draft.pausedUntil) > clock ? t("resume") : t("pause")}
        </button>
        <button
          type="button"
          className={styles.primary}
          onClick={() => void save()}
        >
          {inbox.pending ? t("loading") : t("save")}
        </button>
        {saved && <p role="status">{t("saved")}</p>}
      </fieldset>
    </section>
  );
}
