"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type {
  Community,
  Membership,
  Invite,
  Report,
  Page,Post,
} from "@/lib/community/model";
import type {ParticipationAppeal} from "@/lib/community/features";
import ImageUpload from "./CommunityImageUpload";
import { api, type Action } from "./api";
import s from "./Community.module.css";
type Audit = {
  action: string;
  actor: string;
  target: string;
  reason: string;
  createdAt: string;
};
export default function CommunityManagement({
  community: c,
  membership: m,
  action,
  busy,
}: {
  community: Community;
  membership: Membership;
  action: Action;
  busy: boolean;
}) {
  const [section, setSection] = useState("members"),
    [items, setItems] = useState<(Membership | Invite | Report | Audit | ParticipationAppeal | Post)[]>([]),
    [next, setNext] = useState<string | null>(null),
    [error, setError] = useState(""),
    [invite, setInvite] = useState(""),
    [days, setDays] = useState(7),
    [uses, setUses] = useState(1);
  async function load(append = false) {
    setError("");
    try {
      const r = await api<Page<Membership | Invite | Report | Audit | ParticipationAppeal | Post>>({
        community: c.id,
        ...(section==="pending"?{pending:"1"}:{manage:"1"}),
        section,
        ...(append && next ? { after: next } : {}),
      });
      setItems((prev) => (append ? [...prev, ...r.items] : r.items));
      setNext(r.next);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    void load(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, c.id]);
  async function act(v: Record<string, unknown>) {
    if (await action(v)) await load();
  }
  return (
    <section className={s.panel}>
      <h2>Community management</h2>
      <div className={s.actions}>
        {["members", "pending", "appeals", "reports", "invites", "audit"].map((x) => (
          <button
            className={s.secondary}
            aria-pressed={section === x}
            key={x}
            onClick={() => setSection(x)}
          >
            {x}
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}
      {!items.length && <p>No records in this page.</p>}
      {section==="appeals"&&items.map(x=>{const a=x as ParticipationAppeal;return <article className={s.reply} key={a.id}><Link href={`/u/${a.uid}`}>Member profile</Link><p>{a.body}</p><p>{a.state} · {a.decision}</p>{a.state==="pending"&&<button className={s.secondary} disabled={busy} onClick={()=>{const reason=window.prompt("Record the review outcome and explanation");if(reason){const restore=window.confirm("Restore participation? Cancel records the decision without restoring access.");void act({action:"appeal-decision",target:a.uid,reason,restore});}}}>Review appeal</button>}</article>;})}
      {section==="pending"&&items.map(x=>{const p=x as Post;return <article className={s.reply} key={p.id}><h3>{p.title}</h3><p className={s.body}>{p.body}</p><button className={s.button} disabled={busy} onClick={()=>void act({action:"approve-post",post:p.id})}>Approve publication</button><button className={s.secondary} disabled={busy} onClick={()=>{if(window.confirm("Remove this publication?"))void act({action:"delete",post:p.id});}}>Remove publication</button></article>;})}
      {section === "members" &&
        items.map((x) => {
          const member = x as Membership;
          return (
            <div className={s.reply} key={member.uid}>
              <Link href={`/u/${member.uid}`}>View member profile</Link>
              <p className={s.meta}>
                {member.role} · {member.state}
              </p>
              {member.answers && <p className={s.body}>{member.answers}</p>}
              {member.reason && <p>Decision: {member.reason}</p>}
              <div className={s.actions}>
                {(member.state === "pending"
                  ? ["approve", "decline"]
                  : member.state === "active" && member.role !== "owner"
                    ? [
                        "remove",
                        "suspend",
                        "ban",
                        ...(m.role === "owner"
                          ? [
                              member.role === "moderator"
                                ? "demote"
                                : "promote",
                              "transfer",
                            ]
                          : []),
                      ]
                    : ["suspended", "banned"].includes(member.state) &&
                        m.role === "owner"
                      ? ["restore"]
                      : []
                ).map((a) => (
                  <button
                    className={s.secondary}
                    disabled={busy}
                    key={a}
                    onClick={() => {
                      if (!window.confirm(`${a} this member?`)) return;
                      const reason = [
                        "ban",
                        "suspend",
                        "remove",
                        "decline",
                      ].includes(a)
                        ? window.prompt("Explain the decision to this member")
                        : "";
                      if (reason !== null)
                        void act({ action: a, target: member.uid, reason });
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      {section === "reports" &&
        items.map((x) => {
          const r = x as Report;
          return (
            <div className={s.reply} key={r.id}>
              <p>{r.reason}</p>
              <p className={s.meta}>{r.status}</p>
              {r.decision && <p>{r.decision}</p>}
              <a href={`#post-${r.post}`}>Locate publication below</a>
              {r.status === "pending" && (
                <button
                  className={s.secondary}
                  disabled={busy}
                  onClick={() => {
                    const reason = window.prompt(
                      "Record your decision and reason. Remove content separately when necessary.",
                    );
                    if (reason)
                      void act({
                        action: "resolve-report",
                        report: r.id,
                        reason,
                      });
                  }}
                >
                  Record decision
                </button>
              )}
            </div>
          );
        })}
      {section === "invites" && (
        <>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const r = await api<{ token: string }>(
                  {},
                  { community: c.id, action: "invite", days, maxUses: uses },
                );
                setInvite(
                  `${window.location.origin}/community/${c.id}?token=${r.token}`,
                );
                await load();
              } catch (e) {
                setError((e as Error).message);
              }
            }}
          >
            <div className={s.split}>
              <label>
                Valid for days
                <input
                  type="number"
                  min={1}
                  max={30}
                  required
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                />
              </label>
              <label>
                Maximum uses
                <input
                  type="number"
                  min={1}
                  max={100}
                  required
                  value={uses}
                  onChange={(e) => setUses(Number(e.target.value))}
                />
              </label>
            </div>
            <button className={s.button} disabled={busy}>
              Create invitation
            </button>
          </form>
          {invite && (
            <label>
              Private invitation — copy now; shown only once
              <input
                readOnly
                value={invite}
                onFocus={(e) => e.target.select()}
              />
            </label>
          )}
          {items.map((x) => {
            const i = x as Invite;
            return (
              <div className={s.reply} key={i.id}>
                <p>
                  {new Date(i.expiresAt).toLocaleString()} · {i.uses}/
                  {i.maxUses} uses · {i.revoked ? "Revoked" : "Active"}
                </p>
                {!i.revoked && (
                  <button
                    className={s.secondary}
                    disabled={busy}
                    onClick={() => void act({ action: "revoke", invite: i.id })}
                  >
                    Revoke
                  </button>
                )}
              </div>
            );
          })}
        </>
      )}
      {section === "audit" &&
        items.map((x, i) => {
          const a = x as Audit;
          return (
            <div className={s.reply} key={i}>
              <p>
                {a.action} · {a.createdAt}
              </p>
              <p className={s.notice}>{a.reason}</p>
            </div>
          );
        })}
      {next && (
        <button className={s.secondary} onClick={() => void load(true)}>
          Load more {section}
        </button>
      )}
      {m.role==="owner"&&<details><summary>Publication settings and community images</summary><form key={`${c.postApproval}-${c.slowModeSeconds}`} onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);void act({action:"settings",postApproval:data.has("approval"),slowModeSeconds:Number(data.get("slow"))});}}><label><input name="approval" type="checkbox" defaultChecked={c.postApproval}/>Require moderator approval for new publications</label><label>Slow mode: seconds between publications<input name="slow" type="number" min={0} max={3600} defaultValue={c.slowModeSeconds||0}/></label><button className={s.button} disabled={busy}>Save settings</button></form><ImageUpload community={c.id} kind="avatar" onUpload={()=>void act({action:"settings",postApproval:c.postApproval,slowModeSeconds:c.slowModeSeconds})}/><ImageUpload community={c.id} kind="cover" onUpload={()=>void act({action:"settings",postApproval:c.postApproval,slowModeSeconds:c.slowModeSeconds})}/></details>}
      {m.role === "owner" && (
        <div className={s.actions}>
          <button
            className={s.secondary}
            disabled={busy}
            onClick={() => {
              const rules = window.prompt(
                "Update numbered rules. Members must accept the new version.",
                c.rules,
              );
              if (rules) void act({ action: "rules", rules });
            }}
          >
            Edit rules
          </button>
          <button
            className={s.secondary}
            disabled={busy}
            onClick={() => {
              if (
                window.confirm(
                  c.archived
                    ? "Reopen community?"
                    : "Archive community and stop new participation?",
                )
              )
                void act({ action: "archive" });
            }}
          >
            {c.archived ? "Reopen" : "Archive"}
          </button>
        </div>
      )}
    </section>
  );
}
