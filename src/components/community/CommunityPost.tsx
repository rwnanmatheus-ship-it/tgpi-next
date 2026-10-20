"use client";
import { useState } from "react";
import Link from "next/link";
import {
  active,
  manages,
  type Post,
  type Comment,
  type Membership,
  type Page,
} from "@/lib/community/model";
import { api, type Action } from "./api";
import s from "./Community.module.css";
export default function CommunityPost({
  post: p,
  uid,
  membership,
  busy,
  action,
}: {
  post: Post & { saved?: boolean };
  uid?: string;
  membership: Membership | null;
  busy: boolean;
  action: Action;
}) {
  const [replies, setReplies] = useState<Comment[] | null>(null),
    [next, setNext] = useState<string | null>(null),
    [reply, setReply] = useState(""),
    [error, setError] = useState(""),
    [editing, setEditing] = useState(false),
    [title, setTitle] = useState(p.title),
    [body, setBody] = useState(p.body),
    [cid, setCid] = useState(() => crypto.randomUUID());
  async function load(append = false) {
    setError("");
    try {
      const r = await api<Page<Comment>>({
        community: p.community,
        post: p.id,
        ...(append && next ? { after: next } : {}),
      });
      setReplies((prev) => (append ? [...(prev || []), ...r.items] : r.items));
      setNext(r.next);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  const own = uid === p.author,
    moderator = manages(membership);
  return (
    <article className={s.panel} id={`post-${p.id}`}>
      <div className={s.meta}>
        <span className={s.badge}>{p.kind}</span>
        {p.state === "pending" && (
          <span className={s.badge}>Awaiting moderation</span>
        )}
        {p.pinned && <span className={s.badge}>Pinned</span>}
        {p.kind === "question" && (
          <span className={s.badge}>
            {p.accepted ? "Answered" : "Open question"}
          </span>
        )}
        <Link href={`/u/${p.author}`}>{p.authorName}</Link>
        <time dateTime={p.createdAt}>
          {new Date(p.createdAt).toLocaleDateString()}
        </time>
        {p.updatedAt !== p.createdAt && <span>Edited</span>}
      </div>
      {editing ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (await action({ action: "edit", post: p.id, title, body }))
              setEditing(false);
          }}
        >
          <label>
            Title
            <input
              required
              maxLength={180}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Content
            <textarea
              required
              maxLength={16000}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <button className={s.button} disabled={busy}>
            Save changes
          </button>
          <button
            className={s.secondary}
            type="button"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{p.title}</h2>
          <p className={s.body}>{p.body}</p>
        </>
      )}
      {p.attachments?.map((image) => (
        <figure key={image.id}>
          <img
            src={`/api/community/assets/${p.community}/${image.id}`}
            alt={image.alt}
            width={960}
            height={640}
            loading="lazy"
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
          <figcaption className={s.meta}>{image.alt}</figcaption>
        </figure>
      ))}
      {(p.destination || p.context) && (
        <p className={s.meta}>
          {p.destination} · {p.context}
        </p>
      )}
      {p.source && (
        <a
          className={s.secondary}
          href={p.source}
          target="_blank"
          rel="noopener noreferrer nofollow ugc"
        >
          View source ↗
        </a>
      )}
      <div className={s.actions}>
        <button
          className={s.secondary}
          onClick={() => (replies === null ? void load() : setReplies(null))}
          aria-expanded={replies !== null}
        >
          {replies === null ? "Open replies" : "Close replies"}
        </button>
        {active(membership) && p.state !== "pending" && (
          <button
            className={s.secondary}
            disabled={busy}
            aria-pressed={Boolean(p.reacted)}
            onClick={() =>
              void action({
                action: "reaction",
                post: p.id,
                helpful: !p.reacted,
              })
            }
          >
            Helpful · {p.helpfulCount || 0}
          </button>
        )}
        <Link
          className={s.secondary}
          href={`/community/${p.community}?post=${p.id}`}
          onClick={() => {
            try {
              sessionStorage.setItem(
                "tgpi.community.scroll:" +
                  window.location.pathname +
                  window.location.search,
                String(window.scrollY),
              );
            } catch {}
          }}
        >
          Discussion link
        </Link>
        {moderator && p.state === "pending" && (
          <button
            className={s.button}
            disabled={busy}
            onClick={() => void action({ action: "approve-post", post: p.id })}
          >
            Approve publication
          </button>
        )}
        {uid && (
          <>
            <button
              className={s.secondary}
              disabled={busy}
              onClick={() =>
                void action({ action: "save", post: p.id, saved: !p.saved })
              }
            >
              {p.saved ? "Unsave" : "Save"}
            </button>
            {uid !== p.author && active(membership) && (
              <>
                <button
                  className={s.secondary}
                  disabled={busy}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Block this member? Their contributions will be hidden from your signed-in view.",
                      )
                    )
                      void action({
                        action: "block",
                        target: p.author,
                        blocked: true,
                      });
                  }}
                >
                  Block member
                </button>
                <button
                  className={s.secondary}
                  disabled={busy}
                  onClick={() => {
                    const reason = window.prompt(
                      "Describe the member issue: harassment, fraud, privacy or spam",
                    );
                    if (reason)
                      void action({
                        action: "report-member",
                        target: p.author,
                        reason,
                      });
                  }}
                >
                  Report member
                </button>
              </>
            )}
            <button
              className={s.secondary}
              disabled={busy}
              onClick={() => {
                const reason = window.prompt(
                  "Describe the issue: spam, privacy, harassment, fraud or other",
                );
                if (reason)
                  void action({ action: "report", post: p.id, reason });
              }}
            >
              Report
            </button>
          </>
        )}
        {own && active(membership) && (
          <button className={s.secondary} onClick={() => setEditing(!editing)}>
            {editing ? "Cancel editing" : "Edit"}
          </button>
        )}
        {(own || moderator) && (
          <button
            className={s.secondary}
            disabled={busy}
            onClick={() => {
              if (window.confirm("Remove this publication?"))
                void action({ action: "delete", post: p.id });
            }}
          >
            Remove
          </button>
        )}
        {moderator && (
          <button
            className={s.secondary}
            disabled={busy}
            onClick={() => void action({ action: "pin", post: p.id })}
          >
            {p.pinned ? "Unpin" : "Pin"}
          </button>
        )}
      </div>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      {replies !== null && (
        <section aria-label="Replies">
          {!replies.length && <p>No replies yet.</p>}
          {replies.map((r) => (
            <div className={s.reply} key={r.id}>
              <Link href={`/u/${r.author}`}>{r.authorName}</Link>
              <p className={s.body}>{r.body}</p>
              <div className={s.actions}>
                {p.accepted === r.id ? (
                  <span className={s.badge}>Accepted answer</span>
                ) : (
                  p.kind === "question" &&
                  own && (
                    <button
                      className={s.secondary}
                      disabled={busy}
                      onClick={() =>
                        void action({
                          action: "accept",
                          post: p.id,
                          comment: r.id,
                        })
                      }
                    >
                      Accept answer
                    </button>
                  )
                )}
                {uid === r.author && (
                  <button
                    className={s.secondary}
                    disabled={busy}
                    onClick={async () => {
                      const body = window.prompt("Edit your reply", r.body);
                      if (
                        body &&
                        (await action({
                          action: "edit-comment",
                          post: p.id,
                          comment: r.id,
                          body,
                        }))
                      )
                        await load();
                    }}
                  >
                    Edit reply
                  </button>
                )}
                {(uid === r.author || moderator) && (
                  <button
                    className={s.secondary}
                    disabled={busy}
                    onClick={async () => {
                      if (
                        window.confirm("Remove this reply?") &&
                        (await action({
                          action: "delete-comment",
                          post: p.id,
                          comment: r.id,
                        }))
                      )
                        await load();
                    }}
                  >
                    Remove reply
                  </button>
                )}
                {uid && (
                  <button
                    className={s.secondary}
                    disabled={busy}
                    onClick={() => {
                      const reason = window.prompt(
                        "Describe the issue with this reply",
                      );
                      if (reason)
                        void action({
                          action: "report-comment",
                          post: p.id,
                          comment: r.id,
                          reason,
                        });
                    }}
                  >
                    Report reply
                  </button>
                )}
              </div>
            </div>
          ))}
          {next && (
            <button className={s.secondary} onClick={() => void load(true)}>
              Load more replies
            </button>
          )}
          {active(membership) && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (
                  await action({
                    action: "comment",
                    post: p.id,
                    id: cid,
                    body: reply,
                  })
                ) {
                  setReply("");
                  setCid(crypto.randomUUID());
                  await load();
                }
              }}
            >
              <label>
                Your reply
                <textarea
                  required
                  maxLength={6000}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </label>
              <button className={s.button} disabled={busy}>
                Post reply
              </button>
            </form>
          )}
        </section>
      )}
    </article>
  );
}
