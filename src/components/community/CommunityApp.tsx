"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  active,
  manages,
  type CommunityCard,
  type CommunityPreferences,
  type CommunityDetail,
  type Post,
  type Page,
} from "@/lib/community/model";
import { api } from "./api";
import s from "./Community.module.css";
const CreateFlow = dynamic(() => import("./CommunityCreateFlow"));
const Composer = dynamic(() => import("./PostComposer"));
const PostCard = dynamic(() => import("./CommunityPost"));
const Management = dynamic(() => import("./CommunityManagement"));
const Preferences = dynamic(() => import("./CommunityPreferences"));
const Sessions = dynamic(() => import("./GlobalSessions"));
export default function CommunityApp({
  id = "",
  token = "",
  post = "",
  initialView = "explore",
  destination = "",
}: {
  id?: string;
  token?: string;
  post?: string;
  initialView?: string;
  destination?: string;
}) {
  const { user, isLoaded } = useUser(),
    [cards, setCards] = useState<CommunityCard[]>([]),
    [detail, setDetail] = useState<CommunityDetail | null>(null),
    [saved, setSaved] = useState<Post[]>([]),
    [next, setNext] = useState<string | null>(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [view, setView] = useState(initialView),
    [search, setSearch] = useState(destination),
    [postFilter, setPostFilter] = useState("all"),
    [creating, setCreating] = useState(false),
    [manage, setManage] = useState(false),
    [accepted, setAccepted] = useState(false),
    [answers, setAnswers] = useState("");
  const uid = user?.id || "";
  const loadVersion = useRef(0);
  const load = useCallback(
    async (cursor = "") => {
      const revision = ++loadVersion.current;
      setLoading(true);
      setError("");
      try {
        if (id) {
          const r = await api<CommunityDetail>({
            community: id,
            ...(post ? { single: post } : {}),
            ...(token ? { token } : {}),
            ...(cursor ? { after: cursor } : {}),
          });
          if (revision !== loadVersion.current) return;
          setDetail((prev) =>
            cursor && prev ? { ...r, posts: [...prev.posts, ...r.posts] } : r,
          );
          setNext(r.next);
        } else if (view === "saved") {
          const r = await api<Page<Post>>({
            saved: "1",
            ...(cursor ? { after: cursor } : {}),
          });
          if (revision !== loadVersion.current) return;
          setSaved((prev) => (cursor ? [...prev, ...r.items] : r.items));
          setNext(r.next);
        } else {
          const r = await api<Page<CommunityCard>>({
            ...(["mine", "requests"].includes(view) ? { mine: "1" } : {}),
            ...(cursor ? { after: cursor } : {}),
          });
          if (revision !== loadVersion.current) return;
          setCards((prev) => (cursor ? [...prev, ...r.items] : r.items));
          setNext(r.next);
        }
      } catch (e) {
        if (revision === loadVersion.current) setError((e as Error).message);
      } finally {
        if (revision === loadVersion.current) setLoading(false);
      }
    },
    [id, token, view, post],
  );
  useEffect(() => {
    if (isLoaded) {
      setDetail(null);
      setCards([]);
      setSaved([]);
      setNext(null);
      void load();
    }
  }, [load, isLoaded, uid]);
  async function action(body: Record<string, unknown>) {
    if (busy) return false;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await api({}, { community: id, ...body });
      setNotice("Changes saved.");
      await load();
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      setBusy(false);
    }
  }
  async function hideCommunity(community: string, muted = false) {
    try {
      const p = await api<CommunityPreferences>({ preferences: "1" });
      const field = muted ? "muted" : "hidden";
      await action({
        action: "preferences",
        ...p,
        [field]: [...new Set([...p[field], community])],
      });
    } catch (e) {
      setError((e as Error).message);
    }
  }
  const c = detail?.community,
    m = detail?.membership,
    joined = active(m),
    admin = manages(m);
  const filtered = cards.filter(
    (c) =>
      (view !== "mine" || c.membership?.state === "active") &&
      (view !== "requests" || c.membership?.state === "pending") &&
      `${c.name} ${c.description} ${c.destination} ${c.theme} ${c.language}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <main className={s.shell}>
      <header className={s.hero}>
        <Image
          src="/images/community/global-commons.webp"
          alt="AI-generated editorial illustration of an international learning commons"
          fill
          sizes="(max-width:760px) 100vw, 1200px"
          priority
        />
        <span className={s.eyebrow}>TGPI · Global Community</span>
        <h1>{c?.name || "Your world. Shared experience."}</h1>
        <p>
          {c?.description ||
            "Connect with people navigating life across borders."}
        </p>
        <div className={s.actions}>
          <Link className={s.button} href="/community">
            Explore communities
          </Link>
          {user ? (
            <button className={s.secondary} onClick={() => setCreating(true)}>
              Create community
            </button>
          ) : (
            <Link
              className={s.secondary}
              href="/sign-in?redirect_url=/community"
            >
              Sign in to participate
            </Link>
          )}
        </div>
      </header>
      <div className={s.layout}>
        <nav className={s.nav} aria-label="Community navigation">
          {id ? (
            <Link href="/community">All communities</Link>
          ) : (
            ["explore", "mine", "requests", "saved", "preferences"].map((v) => (
              <button
                aria-current={view === v ? "page" : undefined}
                key={v}
                onClick={() => {
                  setCreating(false);
                  setView(v);
                }}
              >
                {
                  {
                    explore: "Explore",
                    mine: "My communities",
                    requests: "My requests",
                    saved: "Saved posts",
                    preferences: "My interests",
                  }[v]
                }
              </button>
            ))
          )}
          <Link href="/profile">Workspace</Link>
          <Link href="/countries">Destinations</Link>
          <Link href="/members">Find members</Link>
          {id && <a href="#community-rules">About & rules</a>}
        </nav>
        <section className={s.content} aria-label="Community content">
          {error && (
            <div className={s.error} role="alert">
              {error}
              <div className={s.actions}>
                <button className={s.secondary} onClick={() => void load()}>
                  Try again
                </button>
              </div>
            </div>
          )}
          {notice && (
            <p className={s.status} role="status">
              {notice}
            </p>
          )}
          {creating ? (
            <CreateFlow close={() => setCreating(false)} />
          ) : (
            <>
              {!id && view === "preferences" && user && (
                <Preferences action={action} busy={busy} />
              )}
              {!id && !["saved", "preferences"].includes(view) && (
                <>
                  <div className={s.tools}>
                    <label style={{ flex: 1, margin: 0 }}>
                      Search loaded communities
                      <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Destination, topic or language"
                      />
                    </label>
                  </div>
                  <p className={s.notice}>
                    Search filters this loaded page. Use Load more to include
                    more communities.
                  </p>
                  <div className={s.grid}>
                    {filtered.map((c) => (
                      <article className={s.card} key={c.id}>
                        <span className={s.badge}>
                          {c.visibility} · {c.admission}
                        </span>
                        <h2>
                          <Link href={`/community/${c.id}`}>{c.name}</Link>
                        </h2>
                        <p>{c.description}</p>
                        {c.recommendation && (
                          <p className={s.status}>{c.recommendation}</p>
                        )}
                        <p className={s.meta}>
                          {c.destination || "Across borders"} · {c.language}
                        </p>
                        <p className={s.meta}>
                          {c.memberCount} members · {c.theme}
                        </p>
                        {c.membership && (
                          <p className={s.badge}>{c.membership.state}</p>
                        )}
                        <Link
                          className={s.secondary}
                          href={`/community/${c.id}`}
                        >
                          Visit community
                        </Link>
                        {user && view === "explore" && (
                          <button
                            className={s.secondary}
                            disabled={busy}
                            onClick={() => void hideCommunity(c.id)}
                          >
                            Hide recommendation
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                  {!loading && !error && !filtered.length && (
                    <div className={s.empty}>
                      <div className={s.editorial}>
                        <Image
                          src="/images/community/new-horizons.webp"
                          alt="AI-generated city horizon at dawn"
                          fill
                          sizes="600px"
                        />
                      </div>
                      <h2>
                        {view === "requests"
                          ? "No pending requests."
                          : "Find your next circle."}
                      </h2>
                      <p>
                        {view === "requests"
                          ? "Your requests and decisions are saved with your membership."
                          : "Explore by destination or create a community around your next step."}
                      </p>
                    </div>
                  )}
                </>
              )}
              {!id && view === "saved" && (
                <section>
                  <h2>Saved contributions</h2>
                  {!loading && !saved.length && !error && (
                    <p className={s.empty}>
                      No accessible saved contributions yet.
                    </p>
                  )}
                  {saved.map((p) => (
                    <article className={s.panel} key={`${p.community}-${p.id}`}>
                      <h2>{p.title}</h2>
                      <p>{p.body.slice(0, 240)}</p>
                      <div className={s.actions}>
                        <Link
                          className={s.secondary}
                          href={`/community/${p.community}?post=${p.id}`}
                        >
                          Open discussion
                        </Link>
                        <button
                          className={s.secondary}
                          disabled={busy}
                          onClick={() =>
                            void action({
                              community: p.community,
                              action: "save",
                              post: p.id,
                              saved: false,
                            })
                          }
                        >
                          Unsave
                        </button>
                      </div>
                    </article>
                  ))}
                </section>
              )}
              {c && (
                <>
                  <section className={s.panel}>
                    <div className={s.meta}>
                      <span className={s.badge}>{c.visibility}</span>
                      <span className={s.badge}>{c.admission}</span>
                      <span>{c.memberCount} members</span>
                      <span>
                        {c.destination} · {c.language}
                      </span>
                    </div>
                    {c.archived && (
                      <p className={s.status}>This community is archived.</p>
                    )}
                    {m && (
                      <p className={s.status}>
                        Your participation: {m.state} · {m.role}
                        {m.reason && (
                          <>
                            <br />
                            {m.reason}
                          </>
                        )}
                      </p>
                    )}
                    {joined && c.welcome && (
                      <p className={s.body}>{c.welcome}</p>
                    )}
                    {!joined &&
                      user &&
                      !["banned", "suspended"].includes(m?.state || "") &&
                      !c.archived && (
                        <>
                          {m?.state === "pending" ? (
                            <button
                              className={s.secondary}
                              disabled={busy}
                              onClick={() => void action({ action: "cancel" })}
                            >
                              Cancel request
                            </button>
                          ) : (
                            <>
                              <details>
                                <summary>Read the rules before joining</summary>
                                <p className={s.rules}>{c.rules}</p>
                              </details>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={accepted}
                                  onChange={(e) =>
                                    setAccepted(e.target.checked)
                                  }
                                />
                                I have read and accept the current rules
                              </label>
                              {(c.entryQuestion ||
                                c.admission === "approval") && (
                                <label>
                                  {c.entryQuestion ||
                                    "Introduction for moderators (optional)"}
                                  <textarea
                                    maxLength={2000}
                                    value={answers}
                                    onChange={(e) => setAnswers(e.target.value)}
                                  />
                                </label>
                              )}
                              <button
                                className={s.button}
                                disabled={
                                  busy ||
                                  !accepted ||
                                  Boolean(c.entryQuestion && !answers.trim()) ||
                                  (!token && c.admission === "invite")
                                }
                                onClick={() =>
                                  void action({
                                    action: token ? "redeem" : "join",
                                    token,
                                    acceptedVersion: c.rulesVersion,
                                    answers,
                                  })
                                }
                              >
                                {token
                                  ? "Accept invitation"
                                  : c.admission === "approval"
                                    ? "Request to join"
                                    : c.admission === "invite"
                                      ? "Invitation required"
                                      : "Join community"}
                              </button>
                            </>
                          )}
                        </>
                      )}
                    {joined && (
                      <div className={s.actions}>
                        <button
                          className={s.secondary}
                          disabled={busy}
                          onClick={() => void hideCommunity(c.id, true)}
                        >
                          Mute community notifications
                        </button>
                        {admin && (
                          <button
                            className={s.secondary}
                            onClick={() => setManage(!manage)}
                            aria-expanded={manage}
                          >
                            {manage ? "Close management" : "Manage community"}
                          </button>
                        )}
                        {m?.role !== "owner" && (
                          <button
                            className={s.secondary}
                            disabled={busy}
                            onClick={() => {
                              if (window.confirm("Leave this community?"))
                                void action({ action: "leave" });
                            }}
                          >
                            Leave community
                          </button>
                        )}
                        {c.transferTo === uid && (
                          <button
                            className={s.button}
                            disabled={busy}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Accept ownership and responsibility for this community?",
                                )
                              )
                                void action({ action: "accept-transfer" });
                            }}
                          >
                            Accept ownership
                          </button>
                        )}
                      </div>
                    )}
                  </section>
                  {manage && m && admin && (
                    <Management
                      community={c}
                      membership={m}
                      action={action}
                      busy={busy}
                    />
                  )}
                  {joined && m?.acceptedVersion !== c.rulesVersion && (
                    <section className={s.status}>
                      <p>
                        Community rules have changed. Review them before
                        contributing.
                      </p>
                      <p className={s.rules}>{c.rules}</p>
                      <button
                        className={s.button}
                        disabled={busy}
                        onClick={() =>
                          void action({
                            action: "accept-rules",
                            acceptedVersion: c.rulesVersion,
                          })
                        }
                      >
                        Accept updated rules
                      </button>
                    </section>
                  )}
                  {joined && !c.archived && (
                    <Composer action={action} busy={busy} />
                  )}
                  {(joined || c.visibility === "public") && (
                    <label>
                      Publication filter
                      <select
                        value={postFilter}
                        onChange={(e) => setPostFilter(e.target.value)}
                      >
                        <option value="all">All contributions</option>
                        <option value="open">Unanswered questions</option>
                        <option value="experience">Experience Atlas</option>
                        <option value="guide">Guides</option>
                        <option value="discussion">Discussions</option>
                      </select>
                    </label>
                  )}
                  {detail.posts
                    .filter(
                      (p) =>
                        postFilter === "all" ||
                        (postFilter === "open" &&
                          p.kind === "question" &&
                          !p.accepted) ||
                        p.kind === postFilter,
                    )
                    .map((p) => (
                      <PostCard
                        post={p}
                        uid={uid}
                        membership={m || null}
                        action={action}
                        busy={busy}
                        key={p.id}
                      />
                    ))}
                  {!loading && !detail.posts.length && (
                    <div className={s.empty}>
                      <h2>
                        {joined
                          ? "Start with an introduction."
                          : c.visibility === "public"
                            ? "A new conversation starts here."
                            : "A space for its members."}
                      </h2>
                      <p>
                        {joined
                          ? "Share your destination, what you are learning and where you could help."
                          : c.visibility === "public"
                            ? "No publications yet."
                            : "Complete the admission process to read and contribute."}
                      </p>
                    </div>
                  )}
                  {(joined || c.visibility === "public") && (
                    <Sessions
                      community={id}
                      joined={joined}
                      manage={admin}
                      action={action}
                      busy={busy}
                    />
                  )}
                  <section className={s.panel} id="community-rules">
                    <h2>About & rules</h2>
                    <p className={s.body}>{c.about}</p>
                    <p className={s.rules}>{c.rules}</p>
                    <p className={s.notice}>
                      Member experiences are not official immigration, legal,
                      medical or financial advice. Verify sources and dates.
                    </p>
                  </section>
                </>
              )}
              {loading && (
                <p className={s.loading} role="status">
                  Loading community…
                </p>
              )}
              {next && !loading && (
                <button className={s.secondary} onClick={() => void load(next)}>
                  Load more
                </button>
              )}
            </>
          )}
        </section>
        <aside className={s.context}>
          <section className={s.panel}>
            <div className={s.identity}>
              <Image
                src="/brand/tgpi-crest-metal-v3-256.png"
                width={42}
                height={42}
                alt="TGPI crest"
              />
              <span className={s.meta}>
                THE GLOBAL
                <br />
                POLYMATH INSTITUTE
              </span>
            </div>
            <h2>Experience into action.</h2>
            <div className={s.editorial}>
              <Image
                src="/images/community/life-across-borders.webp"
                alt="AI-generated editorial illustration of a conversation at a neighborhood cafe"
                fill
                sizes="240px"
              />
            </div>
            <p>
              Find a destination. Ask a useful question. Share what helped you.
            </p>
            <Link className={s.secondary} href="/countries">
              Explore destinations
            </Link>
          </section>
          <section className={s.panel}>
            <div className={s.editorial}>
              <Image
                src="/images/community/shared-knowledge.webp"
                alt="AI-generated editorial illustration of collaborative study"
                fill
                sizes="240px"
              />
            </div>
            <h3>Build your next step</h3>
            <p>Connect your research with a practical plan.</p>
            <Link href="/profile">Open your Workspace →</Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
