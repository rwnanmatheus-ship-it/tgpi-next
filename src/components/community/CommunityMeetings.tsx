"use client";

import { useLocale as useFormattingLocale } from "@/components/localization/LocaleProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { GlobalSession, Page } from "@/lib/community/model";
import { api, type Action } from "./api";
import s from "./Community.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";

type Session = GlobalSession & {
  attending: boolean;
  community: string;
  communityName: string;
};
export default function CommunityMeetings({
  action,
  busy,
}: {
  action: Action;
  busy: boolean;
}) {
  const { locale } = useFormattingLocale();
  const [items, setItems] = useState<Session[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    api<Page<Session>>({ upcoming: "1" })
      .then((p) => {
        if (live) setItems(p.items);
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);
  return (
    <section className={s.panel}>
      <h2><LocalizedText text="Global Sessions" /></h2>
      <p><LocalizedText text={"Upcoming exchanges from up to eight of your active communities. Times are shown in your current time zone."} /></p>
      {loading && <p role="status"><LocalizedText text={"Loading…"} /></p>}
      {error && (
        <p className={s.error} role="alert">
          <LocalizedText text={error} />
        </p>
      )}
      {items.map((e) => (
        <article className={s.reply} key={`${e.community}-${e.id}`}>
          <Link href={`/community/${e.community}`}>{e.communityName}</Link>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <time dateTime={e.startsAt}>
            {new Date(e.startsAt).toLocaleString(locale)}
          </time>
          <p className={s.meta}><LocalizedText text={"Original time:"} />{" "}
            {new Date(e.startsAt).toLocaleString(locale, {
              timeZone: e.timeZone,
            })}{" "}
            · {e.timeZone}
          </p>
          <p>
            {e.attendeeCount}/{e.capacity}{" "}<LocalizedText text={"attending"} /></p>
          <button
            className={s.secondary}
            disabled={busy}
            onClick={async () => {
              if (
                await action({
                  community: e.community,
                  action: "rsvp",
                  event: e.id,
                  attending: !e.attending,
                })
              ) {
                const p = await api<Page<Session>>({ upcoming: "1" });
                setItems(p.items);
              }
            }}
          >
            {e.attending ? <LocalizedText text={"Cancel RSVP"} /> : <LocalizedText text={"Attend session"} />}
          </button>
          {e.attending && e.url && (
            <a
              className={s.secondary}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
            ><LocalizedText text="Open meeting ↗" /></a>
          )}
        </article>
      ))}
      {!loading && !items.length && !error && (
        <p><LocalizedText text={"No upcoming sessions in these communities. Events appear here when their organizers schedule them."} /></p>
      )}
    </section>
  );
}
