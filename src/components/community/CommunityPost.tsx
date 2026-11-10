"use client";


import { useLocale as useFormattingLocale } from "@/components/localization/LocaleProvider";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";
import Image from "@/components/localization/LocalizedImage";
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
import { LocalizedText } from "@/components/localization/LocaleProvider";

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
  const { locale } = useFormattingLocale();
  const { t: localizeLabel } = useInterfaceLocale();

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
          <span className={s.badge}><LocalizedText text={p.kind} /></span>
          {p.state === "pending" && (
            <span className={s.badge}><LocalizedText text={"Awaiting moderation"} /></span>
          )}
          {p.pinned && <span className={s.badge}><LocalizedText text={"Pinned"} /></span>}
          {p.kind === "question" && (
            <span className={s.badge}>
              {p.accepted ? <LocalizedText text={"Answered"} /> : <LocalizedText text={"Open question"} />}
            </span>
          )}
          <Link href={`/u/${p.author}`}>{p.authorName}</Link>
          <time dateTime={p.createdAt}>
            {new Date(p.createdAt).toLocaleDateString(locale)}
          </time>
          {p.updatedAt !== p.createdAt && <span><LocalizedText text={"Edited"} /></span>}
        </div>
        {editing ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (await action({ action: "edit", post: p.id, title, body }))
                setEditing(false);
            }}
          >
            <label><LocalizedText text="Title" /><input
                required
                maxLength={180}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label><LocalizedText text={"Content"} /><textarea
                required
                maxLength={16000}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
            <button className={s.button} disabled={busy}><LocalizedText text="Save changes" /></button>
            <button
              className={s.secondary}
              type="button"
              onClick={() => setEditing(false)}
            ><LocalizedText text="Cancel" /></button>
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
          ><LocalizedText text={"View source ↗"} /></a>
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
            {replies === null ? <LocalizedText text={"Open replies"} /> : <LocalizedText text={"Close replies"} />}
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
            ><LocalizedText text={"Helpful ·"} />{" "}{p.helpfulCount || 0}
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
          ><LocalizedText text={"Discussion link"} /></Link>
          {moderator && p.state === "pending" && (
            <button
              className={s.button}
              disabled={busy}
              onClick={() =>
                void action({ action: "approve-post", post: p.id })
              }
            ><LocalizedText text={"Approve publication"} /></button>
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
                {p.saved ? <LocalizedText text={"Unsave"} /> : <LocalizedText text={"Save"} />}
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
                  ><LocalizedText text={"Block member"} /></button>
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
                  ><LocalizedText text={"Report member"} /></button>
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
              ><LocalizedText text={"Report"} /></button>
            </>
          )}
          {own && active(membership) && (
            <button
              className={s.secondary}
              onClick={() => setEditing(!editing)}
            >
              {editing ? <LocalizedText text={"Cancel editing"} /> : <LocalizedText text={"Edit"} />}
            </button>
          )}
          {(own || moderator) && (
            <button
              className={s.secondary}
              disabled={busy}
              onClick={() => {
                if (window.confirm(localizeLabel("Remove this publication?")))
                  void action({ action: "delete", post: p.id });
              }}
            ><LocalizedText text={"Remove"} /></button>
          )}
          {moderator && (
            <button
              className={s.secondary}
              disabled={busy}
              onClick={() => void action({ action: "pin", post: p.id })}
            >
              {p.pinned ? <LocalizedText text={"Unpin"} /> : <LocalizedText text={"Pin"} />}
            </button>
          )}
        </div>
      </div>
      {conversation && (
        <header className={s.chatHeader}>
          <div>
            <span className={s.eyebrow}><LocalizedText text={"TGPI · Community conversation"} /></span>
            <h2><LocalizedText text={"Share your world"} /></h2>
            <p><LocalizedText text={"Ask, connect and exchange experiences. Messages refresh every 12 seconds while this page is visible."} /></p>
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
            {refreshing ? <LocalizedText text={"Refreshing…"} /> : <LocalizedText text={"Refresh"} />}
          </button>
        </header>
      )}
      {error && (
        <p className={s.error} role="alert">
          <LocalizedText text={error} />
        </p>
      )}
      {expanded && replies !== null && (
        <section aria-label={localizeLabel("Replies")}>
          {!replies.length && <p><LocalizedText text={"No replies yet."} /></p>}
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
                    {new Date(r.createdAt).toLocaleString(locale, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    {r.updatedAt !== r.createdAt ? <LocalizedText text={" · Edited"} /> : ""}
                  </time>
                  <p className={s.messageBody}>{r.body}</p>
                  <div className={s.imageGrid}>
                    {r.attachments?.map((image) => (
                      <LocalizedElement as="a"
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
                      </LocalizedElement>
                    ))}
                  </div>
                  <details className={s.messageOptions}>
                    <summary><LocalizedText text={"Message options"} /></summary>
                    <div className={s.actions}>
                      {p.accepted === r.id ? (
                        <span className={s.badge}><LocalizedText text={"Accepted answer"} /></span>
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
                          ><LocalizedText text={"Accept answer"} /></button>
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
                        ><LocalizedText text={"Edit reply"} /></button>
                      )}
                      {(uid === r.author || moderator) && (
                        <button
                          className={s.secondary}
                          disabled={busy}
                          onClick={async () => {
                            if (
                              window.confirm(localizeLabel("Remove this reply?")) &&
                              (await action({
                                action: "delete-comment",
                                post: p.id,
                                comment: r.id,
                              }))
                            )
                              await load();
                          }}
                        ><LocalizedText text={"Remove reply"} /></button>
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
                        ><LocalizedText text={"Report reply"} /></button>
                      )}
                    </div>
                  </details>
                </div>
              ))}
          </div>
          {historyExpanded && (
            <p className={s.notice}><LocalizedText text={"Reading earlier messages. Use Refresh to return to the latest conversation."} /></p>
          )}
          {next && (
            <button className={s.secondary} onClick={() => void load(true)}><LocalizedText text={"Load more replies"} /></button>
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
              <label><LocalizedText text={"Your reply"} /><LocalizedElement as="textarea"
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
                    ><LocalizedText text={"Remove attachment"} /></button>
                  </figure>
                ))}
              </div>
              {images.length < 4 && (
                <details>
                  <summary><LocalizedText text={"Attach a photo"} /></summary>
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
                {busy ? <LocalizedText text={"Sending…"} /> : <LocalizedText text={"Send message"} />}
              </button>
            </form>
          )}
        </section>
      )}
    </article>
  );
}
