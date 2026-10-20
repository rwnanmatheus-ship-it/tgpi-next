"use client";
import { useEffect, useState } from "react";
import s from "./Community.module.css";
type Status = {
  schedulerConfigured: boolean;
  lastRunAt: string | null;
  lastCompletedAt: string | null;
  processed: number;
  deleted: number;
  retrying: boolean;
  identityErrors: number;
  pendingSample: { state: string; processed: number; retrying: boolean }[];
};
export default function CommunityOperations() {
  const [status, setStatus] = useState<Status | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function request(method = "GET") {
    const r = await fetch("/api/community/operations", {
        method,
        cache: "no-store",
      }),
      d = await r.json();
    if (!r.ok) throw new Error(d.error);
    return d;
  }
  useEffect(() => {
    let live = true;
    request()
      .then((d) => {
        if (live) setStatus(d);
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, []);
  return (
    <section className={s.panel}>
      <h2>Privacy & retention operations</h2>
      <p>
        Resumable removal jobs and scheduled retention. Existing billing,
        learning and identity systems are outside this cleanup scope.
      </p>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      {status && (
        <>
          <p>
            Scheduler:{" "}
            {status.schedulerConfigured
              ? "configured · every five minutes"
              : "configuration required"}
          </p>
          <p>
            Last run:{" "}
            {status.lastRunAt
              ? new Date(status.lastRunAt).toLocaleString()
              : "Not run yet"}
          </p>
          <p>
            Last full retention cycle:{" "}
            {status.lastCompletedAt
              ? new Date(status.lastCompletedAt).toLocaleString()
              : "Not completed yet"}
          </p>
          <p>
            {status.processed} records inspected · {status.deleted} expired
            records removed
          </p>
          <p>
            {status.pendingSample.length} pending jobs in the current sample ·{" "}
            {status.identityErrors} identity checks awaiting retry
          </p>
          {status.retrying && (
            <p className={s.notice}>
              The last run paused. It will resume from its checkpoint.
            </p>
          )}
        </>
      )}
      <button
        className={s.secondary}
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError("");
          try {
            await request("POST");
            setStatus(await request());
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? "Processing batch…" : "Run maintenance batch"}
      </button>
    </section>
  );
}
