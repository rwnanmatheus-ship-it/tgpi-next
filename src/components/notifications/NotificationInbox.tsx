"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import type { NavigationIconName } from "@/lib/navigation-system";
import {
  notificationCategories,
  safeNotificationHref,
  type InboxNotification,
  type NotificationCategory,
} from "@/lib/notifications/model";
import { notificationGroup, notificationSearchText, sortNotifications } from "@/lib/notifications/presentation";
import { useLocale, LocalizedText } from "@/components/localization/LocaleProvider";
import { notificationText, localizedNotification, type NotificationTextKey } from "@/lib/notifications/text";
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
const filters = ["all", "unread", "priority", "savedItems", "archived"] as const;
const dayGroups = ["Today", "Yesterday", "Earlier"] as const;

export default function NotificationInbox({ onClose }: { onClose?: () => void } = {}) {
  const inbox = useNotifications();
  const { locale } = useLocale();
  const t = (key: NotificationTextKey) => notificationText(locale, key);
  const titleId = useId();
  const [filterOverride, setFilter] = useState<(typeof filters)[number]>();
  const filter = filterOverride ?? inbox.preferences.inboxView;
  const [category, setCategory] = useState<NotificationCategory | "">("");
  const [query, setQuery] = useState("");
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [now, setNow] = useState<Date | null>(null);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const preferencesHeading = useRef<HTMLHeadingElement>(null);
  const listHeading = useRef<HTMLHeadingElement>(null);
  const rowTrigger = useRef<HTMLButtonElement>(null);
  const settingsTrigger = useRef<HTMLButtonElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const DayHeading = onClose ? "h3" : "h2";
  const moveFocusToList = useRef(false);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const first = setTimeout(() => setNow(new Date()), 0);
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => { clearTimeout(first); clearInterval(timer); };
  }, []);
  const items = useMemo(() => sortNotifications(inbox.items).map((item) => localizedNotification(item, locale)), [inbox.items, locale]);
  const selected = items.find((item) => item.id === selectedId);
  useEffect(() => {
    if (selectedId && detailHeading.current) {
      detailHeading.current.focus({ preventScroll: true });
      scrollArea.current?.scrollTo(0, 0);
    } else if (showPreferences) {
      preferencesHeading.current?.focus({ preventScroll: true });
      scrollArea.current?.scrollTo(0, 0);
    } else if (moveFocusToList.current) {
      moveFocusToList.current = false;
      scrollArea.current?.scrollTo(0, scrollPosition.current);
      const trigger = rowTrigger.current?.isConnected ? rowTrigger.current : listHeading.current;
      trigger?.focus({ preventScroll: true });
    }
  }, [selectedId, showPreferences]);

  const active = items.filter((item) => !item.archivedAt);
  const counts = {
    all: active.length,
    unread: active.filter((item) => !item.readAt).length,
    priority: active.filter((item) => item.important).length,
    savedItems: items.filter((item) => item.savedAt).length,
    archived: items.length - active.length,
  };
  const search = notificationSearchText(query, locale);
  const visible = items.filter((item) => {
    if (category && item.category !== category) return false;
    const matchesFilter = {
      all: !item.archivedAt,
      unread: !item.archivedAt && !item.readAt,
      priority: !item.archivedAt && Boolean(item.important),
      savedItems: Boolean(item.savedAt),
      archived: Boolean(item.archivedAt),
    }[filter];
    return matchesFilter && notificationSearchText(
      [item.title, item.body, item.subject, t(item.category)].filter(Boolean).join(" "),
      locale,
    ).includes(search);
  });
  const formatter = useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }), [locale]);
  function formatDate(value: string) {
    const stamp = Date.parse(value);
    if (!Number.isFinite(stamp)) return t("dateUnavailable");
    return now ? formatter.format(stamp) : "";
  }
  function openItem(item: InboxNotification, trigger: HTMLButtonElement) {
    rowTrigger.current = trigger;
    scrollPosition.current = scrollArea.current?.scrollTop ?? 0;
    setSelectedId(item.id);
    if (!item.readAt && !item.archivedAt) void inbox.mutate(item.id, "read");
  }
  function back() {
    if (showPreferences) rowTrigger.current = settingsTrigger.current;
    moveFocusToList.current = true;
    setSelectedId(undefined);
    setShowPreferences(false);
  }

  const Container = onClose ? "section" : "main";
  const Heading = onClose ? "h2" : "h1";
  const filtered = filter !== "all" || Boolean(category || search);
  const busy = inbox.pending || inbox.fetching;

  return (
    <Container className={styles.inbox} data-drawer={Boolean(onClose)} aria-labelledby={titleId} data-tgpi-localized="true">
      <header className={styles.header}>
        <div className={styles.heading}>
          <span className={styles.headerIcon}><NavigationIcon name="bell" width={23} /></span>
          <div>
            <Heading id={titleId} ref={listHeading} tabIndex={-1}>{t(onClose ? "title" : "history")}</Heading>
            {counts.unread > 0 && <p>{t("unread")} <span>{counts.unread}</span></p>}
          </div>
        </div>
        <div className={styles.headerActions}>
          <button
            ref={settingsTrigger}
            className={styles.iconButton}
            type="button"
            aria-label={t("preferences")}
            aria-pressed={showPreferences}
            title={t("preferences")}
            onClick={() => {
              if (showPreferences) { back(); return; }
              scrollPosition.current = scrollArea.current?.scrollTop ?? 0;
              setSelectedId(undefined);
              setShowPreferences(true);
            }}
          ><NavigationIcon name="settings" width={19} /></button>
          {onClose && <button className={styles.iconButton} type="button" onClick={onClose} aria-label={t("closeInbox")}>×</button>}
        </div>
      </header>

      {!selected && !showPreferences && (
        <div className={styles.controls}>
          <div className={styles.tabs} role="group" aria-label={t("status")}>
            {filters.map((key) => (
              <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
                {t(key)} {counts[key] > 0 && <span>{counts[key]}</span>}
              </button>
            ))}
          </div>
          <div className={styles.searchBar}>
            <label className={styles.search}>
              <NavigationIcon name="search" width={17} />
              <span className="sr-only">{t("search")}</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search")} />
            </label>
            <select aria-label={t("categories")} value={category} onChange={(event) => setCategory(event.target.value as NotificationCategory | "")}>
              <option value="">{t("allCategories")}</option>
              {notificationCategories.map((key) => <option key={key} value={key}>{t(key)}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className={styles.scrollArea} ref={scrollArea} aria-busy={inbox.loading}>
        {inbox.error && (
          <div className={styles.notice} role="alert">
            {t("error")} <button className={styles.textButton} type="button" disabled={busy} onClick={() => void inbox.refresh()}>{t("refresh")}</button>
          </div>
        )}
        {showPreferences ? (
          <div className={styles.details}>
            <button className={styles.textButton} type="button" onClick={back}>← {t("backToInbox")}</button>
            <h2 ref={preferencesHeading} tabIndex={-1}>{t("preferences")}</h2>
            <NotificationPreferences />
            <NotificationDevices />
          </div>
        ) : selected ? (
          <article className={styles.details}>
            <button className={styles.textButton} type="button" onClick={back}>← {t("backToInbox")}</button>
            <div className={styles.rowMeta}><span>{t(selected.category)}</span>{selected.important && <b>{t("priority")}</b>}</div>
            <h2 ref={detailHeading} tabIndex={-1}><LocalizedText text={selected.title} /></h2>
            {selected.subject && <strong className={styles.subject}><LocalizedText text={selected.subject} /></strong>}
            <p className={styles.detailBody}>{selected.body}</p>
            <dl className={styles.metadata}>
              <div>
                <dt>{t("received")}</dt>
                <dd>
                  <time dateTime={selected.createdAt}>{formatDate(selected.createdAt)}</time>
                  {selected.timestampKind === "observed" && <small>{t("observed")}</small>}
                </dd>
              </div>
              <div>
                <dt>{t("status")}</dt>
                <dd>{t(selected.archivedAt ? "archivedStatus" : selected.readAt ? "readStatus" : "unread")}</dd>
              </div>
            </dl>
            <div className={styles.itemActions}>
              {safeNotificationHref(selected.href) && selected.href !== "/notifications" && (
                <Link className={styles.destination} href={selected.href} onNavigate={() => {
                  if (!selected.readAt && !selected.archivedAt) void inbox.mutate(selected.id, "read");
                  onClose?.();
                }}><LocalizedText text={selected.actionLabel} /> <span aria-hidden="true">→</span></Link>
              )}
              {!selected.archivedAt && <button type="button" disabled={inbox.pending} onClick={() => void inbox.mutate(selected.id, selected.readAt ? "unread" : "read")}>{t(selected.readAt ? "unreadAction" : "read")}</button>}
              <button type="button" disabled={inbox.pending} onClick={() => void inbox.mutate(selected.id, selected.savedAt ? "unsave" : "save")}>{t(selected.savedAt ? "unsaveItem" : "saveItem")}</button>
              <button type="button" disabled={inbox.pending} onClick={() => void inbox.mutate(selected.id, selected.archivedAt ? "restore" : "archive")}>{t(selected.archivedAt ? "restore" : "archive")}</button>
            </div>
          </article>
        ) : (
          <>
            {inbox.loading ? <p className={styles.empty} role="status">{t("loading")}</p> : !visible.length && !inbox.error && (
              <div className={styles.empty} role="status">
                <NavigationIcon name={filtered ? "search" : "check"} width={28} />
                <h2>{t(filtered ? "noMatches" : "empty")}</h2>
                {!filtered && <p>{t("emptyBody")}</p>}
                {filtered && <button className={styles.textButton} type="button" onClick={() => { setFilter("all"); setCategory(""); setQuery(""); }}>{t("resetFilters")}</button>}
              </div>
            )}
            {!inbox.loading && dayGroups.map((day) => {
              const group = visible.filter((item) => notificationGroup(item.createdAt, now ?? new Date(0)) === day);
              if (!group.length) return null;
              return (
                <section className={styles.group} key={day}>
                  <DayHeading>{t(day === "Today" ? "today" : day === "Yesterday" ? "yesterday" : "earlier")}</DayHeading>
                  <ul>
                    {group.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={styles.row}
                          data-unread={!item.readAt && !item.archivedAt}
                          onClick={(event) => openItem(item, event.currentTarget)}
                        >
                          <span className={styles.categoryIcon} data-category={item.category}><NavigationIcon name={icons[item.category] || "bell"} width={19} /></span>
                          <span className={styles.content}>
                            <span className={styles.rowMeta}>
                              <span>{t(item.category)}</span>
                              {item.important && <b>{t("priority")}</b>}
                              {item.savedAt && <span>{t("savedItems")}</span>}
                            </span>
                            <strong><LocalizedText text={item.title} /></strong>
                            <span className={styles.preview}>{item.subject ? <LocalizedText text={item.subject} /> : item.body}</span>
                            <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                          </span>
                          {!item.readAt && !item.archivedAt && <span className={styles.unreadDot}><span className="sr-only">{t("unread")}</span></span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
            {inbox.nextCursor && <button type="button" className={styles.loadMore} disabled={busy} onClick={() => void inbox.loadMore()}>{t(inbox.fetching ? "loading" : "more")}</button>}
          </>
        )}
      </div>

      {!selected && !showPreferences && (
        <footer className={styles.footer}>
          <button className={styles.textButton} type="button" disabled={!counts.unread || busy} onClick={() => void inbox.markAllRead()}>{t("readRecent")}</button>
          <button className={styles.textButton} type="button" disabled={busy || inbox.loading} onClick={() => void inbox.refresh()}>{t("refresh")}</button>
        </footer>
      )}
    </Container>
  );
}
