"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import s from "./Community.module.css";
type Status = {
  job: {
    state: "queued" | "processing" | "complete";
    processed: number;
    requestedAt: string;
    finishedAt: string | null;
    retrying: boolean;
  } | null;
  ownedActive: { id: string; name: string }[];
  policy: {
    orphanMediaDays: number;
    removedThreadsDays: number;
    closedReportsDays: number;
  };
};
async function privacyRequest(body?: object): Promise<Status> {
  const r = await fetch(
      "/api/community/privacy",
      body
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            cache: "no-store",
          }
        : { cache: "no-store" },
    ),
    data = await r.json();
  if (!r.ok) throw new Error(data.error || "Privacy controls are unavailable.");
  return data;
}
export default function CommunityPrivacy() {
  const [status, setStatus] = useState<Status | null>(null),
    [confirmation, setConfirmation] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const refresh = useCallback(async () => {
    try {
      setStatus(await privacyRequest());
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    let live = true;
    privacyRequest()
      .then((data) => {
        if (live) setStatus(data);
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, []);
  const running = status?.job && status.job.state !== "complete";
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 10000);
    return () => clearInterval(timer);
  }, [running, refresh]);
  return (
    <section className={s.panel} aria-labelledby="community-data-title">
      <h2 id="community-data-title">Community data & privacy</h2>
      <p>
        Remove your community posts, replies, uploaded images, saved items and
        preferences. Your TGPI account, learning records, certificates and
        billing are preserved.
      </p>
      <p className={s.notice}>
        Ownership must be transferred or the community archived first. Removal
        is irreversible once processing starts. Security decisions are
        pseudonymized; blocks and participation restrictions remain effective.
      </p>
      <details>
        <summary>Retention policy</summary>
        <ul>
          <li>Unattached and replaced images: removed after 24 hours.</li>
          <li>Removed threads and replies: purged after 30 days.</li>
          <li>
            Closed reports, audit records, activity events and privacy receipts:
            90 days.
          </li>
          <li>
            Pending reports and active security restrictions are kept while
            needed for moderation.
          </li>
        </ul>
      </details>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      {!status && !error && <p role="status">Loading privacy status…</p>}
      {status?.job && (
        <div className={s.status} role="status">
          <strong>
            {status.job.state === "complete"
              ? "Community data removal completed"
              : status.job.retrying
                ? "Removal paused for automatic retry"
                : "Community data removal in progress"}
          </strong>
          <p>
            {status.job.processed} records processed.{" "}
            {status.job.finishedAt &&
              new Date(status.job.finishedAt).toLocaleString()}
          </p>
          {running && (
            <p>
              Access to your community data is paused while processing. You can
              leave this page; the scheduled worker resumes automatically.
            </p>
          )}
        </div>
      )}
      {!!status?.ownedActive.length && (
        <div className={s.notice}>
          <p>Transfer ownership or archive these communities:</p>
          <ul>
            {status.ownedActive.map((c) => (
              <li key={c.id}>
                <Link href={`/community/${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {status && !running && (
        <details>
          <summary>Remove my community data</summary>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setError("");
              try {
                await privacyRequest({ confirmation });
                setConfirmation("");
                await refresh();
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            <label>
              Type ERASE MY COMMUNITY DATA to confirm
              <input
                autoComplete="off"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                maxLength={30}
              />
            </label>
            <button
              className={s.secondary}
              disabled={
                busy ||
                confirmation !== "ERASE MY COMMUNITY DATA" ||
                Boolean(status.ownedActive.length)
              }
            >
              {busy ? "Submitting…" : "Permanently remove community data"}
            </button>
          </form>
        </details>
      )}
      <button
        className={s.secondary}
        disabled={busy}
        onClick={() => void refresh()}
      >
        Refresh privacy status
      </button>
    </section>
  );
}
