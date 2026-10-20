"use client";
import { useEffect, useState } from "react";
import type { GlobalSession, Page } from "@/lib/community/model";
import { api, type Action } from "./api";
import s from "./Community.module.css";
export default function GlobalSessions({
  community,
  manage,
  joined,
  action,
  busy,
}: {
  community: string;
  manage: boolean;
  joined: boolean;
  action: Action;
  busy: boolean;
}) {
  const [events, setEvents] = useState<
      (GlobalSession & { attending: boolean })[]
    >([]),
    [next, setNext] = useState<string | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [open, setOpen] = useState(false),
    [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [date, setDate] = useState(""),
    [url, setUrl] = useState(""),
    [capacity, setCapacity] = useState(20),
    [id, setId] = useState(() => crypto.randomUUID());
  async function load(append = false) {
    try {
      const r = await api<Page<GlobalSession & { attending: boolean }>>({
        community,
        events: "1",
        ...(append && next ? { after: next } : {}),
      });
      setEvents((prev) => (append ? [...prev, ...r.items] : r.items));
      setNext(r.next);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community]);
  return (
    <section className={s.panel}>
      <h2>Global Sessions</h2>
      <p className={s.notice}>
        Meetups and experience exchanges. Times use your device timezone.
      </p>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      {loading && <p role="status">Loading sessions…</p>}
      {!loading && !events.length && !error && (
        <p>No sessions have been scheduled yet.</p>
      )}
      {events.map((e) => (
        <article className={s.reply} key={e.id}>
          <h3>{e.title}</h3>
          <p className={s.body}>{e.description}</p>
          <p>
            <time dateTime={e.startsAt}>
              {new Date(e.startsAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </time>
            <br />
            <span className={s.notice}>
              Original:{" "}
              {new Date(e.startsAt).toLocaleString("en", {
                timeZone: e.timeZone,
              })}{" "}
              · {e.timeZone}
            </span>
          </p>
          <p>
            {e.attendeeCount}/{e.capacity} places
            {e.cancelled ? " · Cancelled" : ""}
          </p>
          {joined && !e.cancelled && (
            <div className={s.actions}>
              <button
                disabled={busy}
                className={s.secondary}
                onClick={async () => {
                  if (
                    await action({
                      action: "rsvp",
                      event: e.id,
                      attending: !e.attending,
                    })
                  )
                    await load();
                }}
              >
                {e.attending ? "Cancel registration" : "Register"}
              </button>
              {e.url && e.attending && (
                <a
                  className={s.secondary}
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Open meeting ↗
                </a>
              )}
              {manage && (
                <button
                  className={s.secondary}
                  disabled={busy}
                  onClick={async () => {
                    if (
                      window.confirm("Cancel session?") &&
                      (await action({ action: "cancel-event", event: e.id }))
                    )
                      await load();
                  }}
                >
                  Cancel session
                </button>
              )}
            </div>
          )}
        </article>
      ))}
      {next && (
        <button className={s.secondary} onClick={() => void load(true)}>
          Load more sessions
        </button>
      )}
      {manage && (
        <>
          <button
            className={s.secondary}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open ? "Close event form" : "Schedule session"}
          </button>
          {open && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (
                  await action({
                    action: "create-event",
                    id,
                    title,
                    description,
                    startsAt: new Date(date).toISOString(),
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    url,
                    capacity,
                  })
                ) {
                  setTitle("");
                  setDescription("");
                  setId(crypto.randomUUID());
                  setOpen(false);
                  await load();
                }
              }}
            >
              <label>
                Session title
                <input
                  required
                  maxLength={180}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Description
                <textarea
                  required
                  maxLength={4000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label>
                Date and time in your timezone
                <input
                  type="datetime-local"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Capacity
                <input
                  type="number"
                  min={1}
                  max={1000}
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </label>
              <label>
                Meeting URL (HTTPS)
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </label>
              <button className={s.button} disabled={busy}>
                Create session
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
}
