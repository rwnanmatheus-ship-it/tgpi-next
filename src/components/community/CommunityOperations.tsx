"use client";


import { useLocale as useFormattingLocale } from "@/components/localization/LocaleProvider";
import { LocalizedText } from "@/components/localization/LocaleProvider";
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
  const { locale } = useFormattingLocale();
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
      <h2><LocalizedText text={"Privacy & retention operations"} /></h2>
      <p><LocalizedText text={"Resumable removal jobs and scheduled retention. Existing billing, learning and identity systems are outside this cleanup scope."} /></p>
      {error && (
        <p className={s.error} role="alert">
          <LocalizedText text={error} />
        </p>
      )}
      {status && (
        <>
          <p><LocalizedText text={"Scheduler:"} />{" "}
            {status.schedulerConfigured
              ? <LocalizedText text={"configured · every five minutes"} />
              : <LocalizedText text={"configuration required"} />}
          </p>
          <p><LocalizedText text={"Last run:"} />{" "}
            {status.lastRunAt
              ? new Date(status.lastRunAt).toLocaleString(locale)
              : <LocalizedText text={"Not run yet"} />}
          </p>
          <p><LocalizedText text={"Last full retention cycle:"} />{" "}
            {status.lastCompletedAt
              ? new Date(status.lastCompletedAt).toLocaleString(locale)
              : <LocalizedText text={"Not completed yet"} />}
          </p>
          <p>
            {status.processed}{" "}<LocalizedText text={"records inspected ·"} />{" "}{status.deleted}{" "}<LocalizedText text={"expired records removed"} /></p>
          <p>
            {status.pendingSample.length}{" "}<LocalizedText text={"pending jobs in the current sample ·"} />{" "}
            {status.identityErrors}{" "}<LocalizedText text={"identity service failures recorded"} /></p>
          {status.retrying && (
            <p className={s.notice}><LocalizedText text={"The last run paused. It will resume from its checkpoint."} /></p>
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
        {busy ? <LocalizedText text={"Processing batch…"} /> : <LocalizedText text={"Run maintenance batch"} />}
      </button>
    </section>
  );
}
