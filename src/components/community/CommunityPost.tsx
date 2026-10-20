"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import MemberAvatar from "./MemberAvatar";
import ImageUpload from "./CommunityImageUpload";
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
  conversation = false,
  post: p,
  uid,
  membership,
  busy,
  action,
}: {
  conversation?: boolean;
  post: Post & { saved?: boolean };
  uid?: string;
  membership: Membership | null;
  busy: boolean;
  action: Action;
}) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [images, setImages] = useState<{ id: string; alt: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [expanded, setExpanded] = useState(conversation);
  const [refreshing, setRefreshing] = useState(false);
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
    if (append) {
      setHistoryExpanded(true);
      stickToBottom.current = false;
    } else {
      setHistoryExpanded(false);
    }
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
  useEffect(() => {
    if (!expanded || historyExpanded) return;
    let disposed = false;
    let timer: ReturnType<typeof setTimeout>;
    let controller: AbortController | undefined;
    async function refresh() {
      if (!disposed && document.visibilityState === "visible") {
        controller = new AbortController();
        try {
          const response = await fetch(
            `/api/community?${new URLSearchParams({ community: p.community, post: p.id })}`,
            { cache: "no-store", signal: controller.signal },
          );
          const data = await response.json();
          if (!response.ok) {
            if ([401, 403, 404].includes(response.status) && !disposed)
              setReplies(null);
            throw new Error(data.error || "Unable to refresh messages.");
          }
          if (!disposed) {
            setReplies(data.items as Comment[]);
            setNext(data.next);
            setError("");
          }
        } catch (e) {
          if (!disposed) setError((e as Error).message);
        }
      }
      if (!disposed) timer = setTimeout(refresh, 12000);
    }
    timer = setTimeout(refresh, 12000);
    return () => {
      disposed = true;
      clearTimeout(timer);
      controller?.abort();
    };
  }, [expanded, historyExpanded, p.community, p.id]);
  useEffect(() => {
    const element = messagesRef.current;
    if (element && stickToBottom.current)
      element.scrollTop = element.scrollHeight;
  }, [replies]);
  useEffect(() => {
    if (conversation) void load();
  }, [conversation, p.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const own = uid === p.author,
    moderator = manages(membership);
  return (
    <article
      className={`${s.panel} ${conversation ? s.chat : ""}`}
      id={`post-${p.id}`}
    >
      <div hidden={conversation}>
        <MemberAvatar
          uid={p.author}
          name={p.authorName}
          image={p.authorImage}
          handle={p.handle}
        />
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
            <Image
              unoptimized
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
            onClick={() => {
              setExpanded(!expanded);
              if (!expanded) void load();
              else setReplies(null);
            }}
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
              onClick={() =>
                void action({ action: "approve-post", post: p.id })
              }
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
            <button
              className={s.secondary}
              onClick={() => setEditing(!editing)}
            >
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
      </div>
      {conversation && (
        <header className={s.chatHeader}>
          <div>
            <span className={s.eyebrow}>TGPI · Community conversation</span>
            <h2>Share your world</h2>
            <p>
              Ask, connect and exchange experiences. Messages refresh every 12
              seconds while this page is visible.
            </p>
          </div>
          <button
            type="button"
            className={s.secondary}
            disabled={refreshing}
            onClick={async () => {
              setRefreshing(true);
              try {
                await load();
              } finally {
                setRefreshing(false);
              }
            }}
          >
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </header>
      )}
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      {expanded && replies !== null && (
        <section aria-label="Replies">
          {!replies.length && <p>No replies yet.</p>}
          <div
            className={s.chatMessages}
            ref={messagesRef}
            onScroll={() => {
              const el = messagesRef.current;
              if (el)
                stickToBottom.current =
                  el.scrollHeight - el.scrollTop - el.clientHeight < 90;
            }}
          >
            {[...replies]
              .sort(
                (a, b) =>
                  a.createdAt.localeCompare(b.createdAt) ||
                  a.id.localeCompare(b.id),
              )
              .map((r) => (
                <div
                  className={`${s.message} ${uid === r.author ? s.ownMessage : ""}`}
                  key={r.id}
                >
                  <MemberAvatar
                    uid={r.author}
                    name={r.authorName}
                    image={r.authorImage}
                    handle={r.handle}
                  />
                  <time className={s.meta} dateTime={r.createdAt}>
                    {new Date(r.createdAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    {r.updatedAt !== r.createdAt ? " · Edited" : ""}
                  </time>
                  <p className={s.messageBody}>{r.body}</p>
                  <div className={s.imageGrid}>
                    {r.attachments?.map((image) => (
                      <a
                        key={image.id}
                        href={`/api/community/assets/${p.community}/${image.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open image: ${image.alt}`}
                      >
                        <Image
                          unoptimized
                          src={`/api/community/assets/${p.community}/${image.id}`}
                          alt={image.alt}
                          width={600}
                          height={450}
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                  <details className={s.messageOptions}>
                    <summary>Message options</summary>
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
                            const body = window.prompt(
                              "Edit your reply",
                              r.body,
                            );
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
                  </details>
                </div>
              ))}
          </div>
          {historyExpanded && (
            <p className={s.notice}>
              Reading earlier messages. Use Refresh to return to the latest
              conversation.
            </p>
          )}
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
                    attachments: images,
                  })
                ) {
                  setImages([]);
                  setReply("");
                  setCid(crypto.randomUUID());
                  stickToBottom.current = true;
                  await load();
                }
              }}
            >
              <label>
                Your reply
                <textarea
                  required={!images.length}
                  placeholder="Share an experience, ask a question or mention @someone…"
                  rows={3}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      if (
                        !busy &&
                        !uploading &&
                        (reply.trim() || images.length)
                      )
                        event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  maxLength={6000}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </label>
              <div className={s.imageGrid}>
                {images.map((image) => (
                  <figure key={image.id}>
                    <Image
                      unoptimized
                      src={`/api/community/assets/${p.community}/${image.id}`}
                      alt={image.alt}
                      width={200}
                      height={150}
                    />
                    <button
                      type="button"
                      className={s.secondary}
                      onClick={() =>
                        setImages((prev) =>
                          prev.filter((x) => x.id !== image.id),
                        )
                      }
                    >
                      Remove attachment
                    </button>
                  </figure>
                ))}
              </div>
              {images.length < 4 && (
                <details>
                  <summary>Attach a photo</summary>
                  <ImageUpload
                    community={p.community}
                    kind="comment"
                    post={p.id}
                    comment={cid}
                    onBusyChange={setUploading}
                    onUpload={(image) => setImages((prev) => [...prev, image])}
                  />
                </details>
              )}
              <button
                className={s.button}
                disabled={
                  busy || uploading || (!reply.trim() && !images.length)
                }
              >
                {busy ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </section>
      )}
    </article>
  );
}
