"use client";
import CommunityOperations from "./CommunityOperations";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Page, Report, Membership } from "@/lib/community/model";
import CommunityManagement from "./CommunityManagement";
import { api } from "./api";
import s from "./Community.module.css";
export default function ModerationConsole() {
  const [items, setItems] = useState<
      (Report & {
        community: string;
        localId?: string;
        kind?: string;
        target?: string;
      })[]
    >([]),
    [next, setNext] = useState<string | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [community, setCommunity] = useState<
      import("@/lib/community/model").Community | null
    >(null);
  async function load(after = "") {
    try {
      const r = await api<Page<(typeof items)[number]>>({
        "global-reports": "1",
        ...(after ? { after } : {}),
      });
      setItems((p) => (after ? [...p, ...r.items] : r.items));
      setNext(r.next);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  return (
    <main className={s.shell}>
      <CommunityOperations />
      <header className={s.panel}>
        <p className={s.eyebrow}>TGPI administration</p>
        <h1>Community moderation</h1>
        <Link href="/community">Return to community</Link>
      </header>
      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}
      {items.map((r) => (
        <article className={s.panel} key={r.id}>
          <h2>
            {r.community} · {r.kind || "content report"}
          </h2>
          <p>{r.reason}</p>
          <p>
            {r.status} · {r.decision}
          </p>
          {r.target && <p>Target: {r.target}</p>}
          {r.post && (
            <Link href={`/community/${r.community}?post=${r.post}`}>
              Open source with current access
            </Link>
          )}
          <div className={s.actions}>
            <button
              className={s.secondary}
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const result = await api<{
                    community: import("@/lib/community/model").Community;
                  }>({
                    community: r.community,
                    manage: "1",
                    section: "context",
                  });
                  setCommunity(result.community);
                } catch (e) {
                  setError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              Review community management
            </button>
            {r.status === "pending" && (
              <button
                className={s.button}
                disabled={busy}
                onClick={async () => {
                  const reason = window.prompt(
                    "Record the decision and reason",
                  );
                  if (!reason) return;
                  setBusy(true);
                  try {
                    await api(
                      {},
                      {
                        community: r.community,
                        action: "resolve-report",
                        report: r.localId || r.id,
                        reason,
                      },
                    );
                    await load();
                  } catch (e) {
                    setError((e as Error).message);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Record decision
              </button>
            )}
          </div>
        </article>
      ))}
      {!items.length && !error && <p>No reports in this page.</p>}
      {next && (
        <button className={s.secondary} onClick={() => void load(next)}>
          Load more reports
        </button>
      )}
      {community && (
        <CommunityManagement
          community={community}
          membership={
            {
              uid: "",
              role: "moderator",
              state: "active",
              acceptedVersion: 0,
              answers: "",
              updatedAt: "",
              reason: "",
            } satisfies Membership
          }
          busy={busy}
          action={async (body) => {
            setBusy(true);
            try {
              await api({}, { community: community.id, ...body });
              return true;
            } catch (e) {
              setError((e as Error).message);
              return false;
            } finally {
              setBusy(false);
            }
          }}
        />
      )}
    </main>
  );
}
