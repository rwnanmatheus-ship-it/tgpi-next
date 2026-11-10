"use client";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import type { NavigationIconName } from "@/lib/navigation-system";
import {
  notificationCategories,
  type NotificationCategory,
} from "@/lib/notifications/model";
import {
  notificationGroup,
  sortNotifications,
} from "@/lib/notifications/presentation";
import { useLocale , LocalizedText } from "@/components/localization/LocaleProvider";
import {
  notificationText,
  localizedNotification,
  type NotificationTextKey,
} from "@/lib/notifications/text";
import { useNotifications } from "./NotificationProvider";
import NotificationDevices from "./NotificationDevices";
import NotificationPreferences from "./NotificationPreferences";
import styles from "./NotificationInbox.module.css";
const icons: Record<NotificationCategory, NavigationIconName> = {
  account: "shield",
  billing: "key",
  learning: "book",
  planning: "compass",
  community: "globe",
  product: "spark",
};
export default function NotificationInbox() {
  const inbox = useNotifications(),
    { locale } = useLocale(),
    t = (key: NotificationTextKey) => notificationText(locale, key);
  const [filter, setFilter] = useState("all"),
    [query, setQuery] = useState(""),
    [showPreferences, setShowPreferences] = useState(false),
    [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const first = setTimeout(() => setNow(new Date()), 0);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);
  const items = sortNotifications(inbox.items).map((item) =>
    localizedNotification(item, locale),
  );
  const active = items.filter((item) => !item.archivedAt),
    unread = active.filter((item) => !item.readAt).length;
  const visible = items.filter(
    (item) =>
      (filter === "archived"
        ? item.archivedAt
        : !item.archivedAt &&
          (filter === "all" ||
            (filter === "unread" && !item.readAt) ||
            (filter === "priority" && item.important) ||
            item.category === filter)) &&
      `${item.title} ${item.body} ${t(item.category)}`
        .toLocaleLowerCase(locale)
        .includes(query.trim().toLocaleLowerCase(locale)),
  );
  const groups = (["Today", "Yesterday", "Earlier"] as const).map((label) => ({
    label,
    items: visible.filter(
      (item) => notificationGroup(item.createdAt, now || new Date(0)) === label,
    ),
  }));
  const time = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  return (
    <main className={styles.root} data-tgpi-localized="true">
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h1>
              {t("title")} <span>{inbox.loading ? "—" : unread}</span>
            </h1>
            <h2>{t("subtitle")}</h2>
            <p>{t("intro")}</p>
          </div>
          <div className={styles.heroActions}>
            <button
              type="button"
              onClick={() => setShowPreferences((value) => !value)}
              aria-expanded={showPreferences}
              aria-controls="notification-preferences"
            >
              <NavigationIcon name="settings" width={18} />
              {t("preferences")}
            </button>
            <button
              type="button"
              onClick={() => void inbox.refresh()}
              disabled={inbox.loading || inbox.pending}
            >
              <NavigationIcon name="bell" width={18} />
              {t("refresh")}
            </button>
          </div>
        </header>
        <div className={styles.stats}>
          {(
            [
              { key: "unread", value: unread, icon: "bell" },
              {
                key: "priority",
                value: active.filter((i) => i.important).length,
                icon: "shield",
              },
              { key: "all", value: active.length, icon: "spark" },
            ] as const
          ).map((stat) => (
            <button
              key={stat.key}
              type="button"
              className={styles.stat}
              aria-pressed={filter === stat.key}
              onClick={() => setFilter(stat.key)}
            >
              <NavigationIcon name={stat.icon} width={24} />
              <strong>{inbox.loading ? "—" : stat.value}</strong>
              <span>{t(stat.key)}</span>
            </button>
          ))}
        </div>
        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <nav aria-label={t("title")} className={styles.tabs}>
              {(
                [
                  "all",
                  "unread",
                  "priority",
                  ...notificationCategories,
                  "archived",
                ] as NotificationTextKey[]
              ).map((key) => (
                <button
                  type="button"
                  key={key}
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                >
                  {t(key)}
                </button>
              ))}
            </nav>
            <section className={styles.feed} aria-label={t("title")}>
              <div className={styles.feedControls}>
                <label>
                  <NavigationIcon name="search" width={18} />
                  <span className="sr-only">{t("search")}</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search")}
                  />
                </label>
                <button
                  type="button"
                  disabled={!unread || inbox.pending}
                  onClick={() => void inbox.markAllRead()}
                >
                  {t("readRecent")}
                </button>
              </div>
              {inbox.error && (
                <div role="alert" className={styles.notice}>
                  {t("error")}{" "}
                  <button type="button" onClick={() => void inbox.refresh()}>
                    {t("refresh")}
                  </button>
                </div>
              )}
              {inbox.loading ? (
                <div className={styles.empty} role="status">
                  {t("loading")}
                </div>
              ) : !visible.length && !inbox.error ? (
                <div className={styles.empty}>
                  <NavigationIcon name="check" width={42} />
                  <h2>{t("empty")}</h2>
                  <p>{t("emptyBody")}</p>
                </div>
              ) : null}
              {!inbox.loading &&
                groups.map(
                  (group) =>
                    group.items.length > 0 && (
                      <section key={group.label} className={styles.group}>
                        <h2>
                          {t(
                            group.label.toLowerCase() as
                              | "today"
                              | "yesterday"
                              | "earlier",
                          )}
                        </h2>
                        <ul>
                          {group.items.map((item) => (
                            <li
                              key={item.id}
                              className={styles.row}
                              data-unread={!item.readAt}
                            >
                              <article>
                                <span className={styles.categoryIcon}>
                                  <NavigationIcon
                                    name={icons[item.category] || "bell"}
                                    width={22}
                                  />
                                </span>
                                <div className={styles.content}>
                                  <div className={styles.rowMeta}>
                                    <span>{t(item.category)}</span>
                                    {item.important && <b>{t("priority")}</b>}
                                    {!item.readAt && (
                                      <i aria-label={t("unread")} />
                                    )}
                                  </div>
                                  <Link
                                    href={item.href}
                                    onClick={() => {
                                      if (!item.readAt)
                                        void inbox.mutate(item.id, "read");
                                    }}
                                  >
                                    <h3><LocalizedText text={item.title} /></h3>
                                    <p>{item.body}</p>
                                  </Link>
                                  <LocalizedElement as="time"
                                    dateTime={item.createdAt}
                                    title={
                                      now
                                        ? time(item.createdAt)
                                        : item.createdAt
                                    }
                                    suppressHydrationWarning
                                  >
                                    {now ? time(item.createdAt) : ""}
                                    {item.timestampKind === "observed"
                                      ? <LocalizedText text={" · {value0}"} values={{value0: String(t("observed"))}} />
                                      : ""}
                                  </LocalizedElement>
                                  <div className={styles.rowActions}>
                                    <Link
                                      href={item.href}
                                      onClick={() => {
                                        if (!item.readAt)
                                          void inbox.mutate(item.id, "read");
                                      }}
                                    >
                                      {item.actionLabel} →
                                    </Link>
                                    <button
                                      type="button"
                                      disabled={inbox.pending}
                                      onClick={() =>
                                        void inbox.mutate(
                                          item.id,
                                          item.readAt ? "unread" : "read",
                                        )
                                      }
                                    >
                                      {t(item.readAt ? "unreadAction" : "read")}
                                    </button>
                                    {!item.archivedAt && (
                                      <button
                                        type="button"
                                        disabled={inbox.pending}
                                        onClick={() =>
                                          void inbox.mutate(item.id, "archive")
                                        }
                                      >
                                        {t("archive")}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </article>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ),
                )}
              {inbox.nextCursor && (
                <button
                  type="button"
                  className={styles.loadMore}
                  disabled={inbox.pending}
                  onClick={() => void inbox.loadMore()}
                >
                  {t("more")}
                </button>
              )}
            </section>
          </div>
          <aside className={styles.sidebar}>
            <NotificationDevices />
            {showPreferences && <NotificationPreferences />}
            <section className={`${styles.panel} ${styles.research}`}>
              <NavigationIcon name="compass" width={27} />
              <h2>{t("researchTitle")}</h2>
              <p>{t("researchBody")}</p>
              <Link href="/countries">{t("explore")} →</Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
