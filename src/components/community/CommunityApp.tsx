"use client";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";
import { useCallback, useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "@/components/localization/LocalizedImage";
import CinematicImage from "@/components/ui/CinematicImage";
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
import { LocalizedText } from "@/components/localization/LocaleProvider";

const CreateFlow = dynamic(() => import("./CommunityCreateFlow"));
const Composer = dynamic(() => import("./PostComposer"));
const PostCard = dynamic(() => import("./CommunityPost"));
const Management = dynamic(() => import("./CommunityManagement"));
const Preferences = dynamic(() => import("./CommunityPreferences"));
const Meetings = dynamic(() => import("./CommunityMeetings"));
const Playbooks = dynamic(() => import("./CommunityPlaybooks"));
const Chat = dynamic(() => import("./CommunityChat"));
const ImageUpload = dynamic(() => import("./CommunityImageUpload"));
const Sessions = dynamic(() => import("./GlobalSessions"));
export default function CommunityApp({
  globalAdmin = false,
  id = "",
  token = "",
  post = "",
  initialView = "explore",
  destination = "",
}: {
  globalAdmin?: boolean;
  id?: string;
  token?: string;
  post?: string;
  initialView?: string;
  destination?: string;
}) {
  const { t: localizeLabel } = useInterfaceLocale();

  const { user, isLoaded } = useUser(),
    [cards, setCards] = useState<CommunityCard[]>([]),
    [detail, setDetail] = useState<CommunityDetail | null>(null),
    [saved, setSaved] = useState<Post[]>([]),
    [feed, setFeed] = useState<
      (Post & {
        membership: CommunityDetail["membership"];
        communityName: string;
      })[]
    >([]),
    [query, setQuery] = useState(destination),
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
        } else if (["preferences", "meetings"].includes(view)) {
          setNext(null);
        } else if (["feed", "questions", "atlas"].includes(view)) {
          const r = await api<
            Page<
              Post & {
                membership: CommunityDetail["membership"];
                communityName: string;
              }
            >
          >({ feed: "1", ...(cursor ? { after: cursor } : {}) });
          if (revision !== loadVersion.current) return;
          setFeed((prev) => (cursor ? [...prev, ...r.items] : r.items));
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
            ...(["mine", "requests"].includes(view)
              ? { mine: "1" }
              : { q: query }),
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
    [id, token, view, post, query],
  );
  useEffect(() => {
    if (isLoaded) {
      setDetail(null);
      setCards([]);
      setSaved([]);
      setFeed([]);
      setNext(null);
      void load();
    }
  }, [load, isLoaded, uid]);
  useEffect(() => {
    if (loading || post) return;
    try {
      const key =
          "tgpi.community.scroll:" +
          window.location.pathname +
          window.location.search,
        value = sessionStorage.getItem(key);
      if (value !== null) {
        sessionStorage.removeItem(key);
        const y = Number(value);
        if (Number.isFinite(y) && y >= 0)
          requestAnimationFrame(() => window.scrollTo(0, y));
      }
    } catch {}
  }, [loading, post, id, view]);
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
      (view === "explore" ||
        `${c.name} ${c.description} ${c.destination} ${c.theme} ${c.language}`
          .toLowerCase()
          .includes(search.toLowerCase())),
  );
  return (
    <main className={s.shell}>
      <header className={s.hero}>
        {c?.coverId ? (
          <Image
            src={`/api/community/assets/${c.id}/${c.coverId}`}
            unoptimized
            alt=""
            fill
            sizes="(max-width:760px) 100vw, 1200px"
            priority
          />
        ) : (
          <CinematicImage asset="community-global-exchange" alt="" priority
            sizes="(max-width:760px) 100vw, 1200px" position="65% center" />
        )}
        <span className={s.eyebrow}><LocalizedText text={"TGPI · Global Community"} /></span>
        <h1>{c?.name || <LocalizedText text={"Your world. Shared experience."} />}</h1>
        <p>
          {c?.description ||
            <LocalizedText text={"Connect with people navigating life across borders."} />}
        </p>
        <div className={s.actions}>
          <Link className={s.button} href="/community"><LocalizedText text="Explore communities" /></Link>
          {user ? (
            <button className={s.secondary} onClick={() => setCreating(true)}><LocalizedText text={"Create community"} /></button>
          ) : (
            <Link
              className={s.secondary}
              href="/sign-in?redirect_url=/community"
            ><LocalizedText text={"Sign in to participate"} /></Link>
          )}
        </div>
      </header>
      <div className={s.layout}>
        <nav className={s.nav} aria-label={localizeLabel("Community navigation")}>
          {id ? (
            <Link href="/community"><LocalizedText text={"All communities"} /></Link>
          ) : (
            [
              "feed",
              "explore",
              "mine",
              "questions",
              "atlas",
              "meetings",
              "requests",
              "saved",
              "preferences",
            ].map((v) => (
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
                    meetings: "Global Sessions",
                    feed: "For you",
                    questions: "Questions that need you",
                    atlas: "Experience Atlas",
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
          {globalAdmin && (
            <Link href="/community/moderation"><LocalizedText text={"Global moderation"} /></Link>
          )}
          <Link href="/profile"><LocalizedText text="Workspace" /></Link>
          <Link href="/countries"><LocalizedText text={"Destinations"} /></Link>
          <Link href="/members"><LocalizedText text={"Find members"} /></Link>
          {id && <a href="#community-rules"><LocalizedText text="About & rules" /></a>}
        </nav>
        <LocalizedElement as="section" className={s.content} aria-label="Community content">
          {error && (
            <div className={s.error} role="alert">
              <LocalizedText text={error} />
              <div className={s.actions}>
                <button className={s.secondary} onClick={() => void load()}><LocalizedText text="Try again" /></button>
              </div>
            </div>
          )}
          {notice && (
            <p className={s.status} role="status">
              <LocalizedText text={notice} />
            </p>
          )}
          {creating ? (
            <CreateFlow key={uid} close={() => setCreating(false)} />
          ) : (
            <>
              {!id && view === "preferences" && user && (
                <Preferences key={uid} action={action} busy={busy} />
              )}
              {!id &&
                ![
                  "saved",
                  "preferences",
                  "feed",
                  "questions",
                  "atlas",
                  "meetings",
                ].includes(view) && (
                  <>
                    <form
                      className={s.tools}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setQuery(search);
                      }}
                    >
                      <label style={{ flex: 1, margin: 0 }}><LocalizedText text={"Search communities"} /><LocalizedElement as="input"
                          type="search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Destination, topic or language"
                        />
                      </label>
                      <button className={s.secondary}><LocalizedText text={"Search"} /></button>
                    </form>
                    <p className={s.notice}><LocalizedText text={"Search by the first word of a destination, topic or language."} /></p>
                    <div className={s.grid}>
                      {filtered.map((c) => (
                        <article className={s.card} key={c.id}>
                          <span className={s.badge}>
                            <LocalizedText text={c.visibility} /> · <LocalizedText text={c.admission} />
                          </span>
                          <h2>
                            <Link href={`/community/${c.id}`}>{c.name}</Link>
                          </h2>
                          <p>{c.description}</p>
                          {c.recommendation && (
                            <p className={s.status}>{c.recommendation}</p>
                          )}
                          <p className={s.meta}>
                            {c.destination || <LocalizedText text={"Across borders"} />} · {c.language}
                          </p>
                          <p className={s.meta}>
                            {c.memberCount}{" "}<LocalizedText text={"members ·"} />{" "}{c.theme}
                          </p>
                          {c.membership && (
                            <p className={s.badge}>{c.membership.state}</p>
                          )}
                          <Link
                            className={s.secondary}
                            href={`/community/${c.id}`}
                          ><LocalizedText text={"Visit community"} /></Link>
                          {user && view === "explore" && (
                            <button
                              className={s.secondary}
                              disabled={busy}
                              onClick={() => void hideCommunity(c.id)}
                            ><LocalizedText text={"Hide recommendation"} /></button>
                          )}
                        </article>
                      ))}
                    </div>
                    {!loading && !error && !filtered.length && (
                      <div className={s.empty}>
                        <div className={s.editorial}>
                          <Image
                            src="/images/cinematic-2026/global-horizon-1600.webp"
                            alt="AI-generated city horizon at dawn"
                            fill
                            sizes="600px"
                          />
                        </div>
                        <h2>
                          {view === "requests"
                            ? <LocalizedText text={"No pending requests."} />
                            : <LocalizedText text={"Find your next circle."} />}
                        </h2>
                        <p>
                          {view === "requests"
                            ? <LocalizedText text={"Your requests and decisions are saved with your membership."} />
                            : <LocalizedText text={"Explore by destination or create a community around your next step."} />}
                        </p>
                      </div>
                    )}
                  </>
                )}
              {!id && view === "meetings" && (
                <Meetings key={uid} action={action} busy={busy} />
              )}
              {!id && ["feed", "questions", "atlas"].includes(view) && (
                <section>
                  <h2>
                    {view === "questions"
                      ? <LocalizedText text={"Questions that need you"} />
                      : view === "atlas"
                        ? <LocalizedText text={"Experience Atlas"} />
                        : <LocalizedText text={"Your circles, in chronological order"} />}
                  </h2>
                  <p className={s.notice}><LocalizedText text={"Recent contributions from up to eight active communities on your first membership page. Load more within each community to explore its full archive."} /></p>
                  {view === "atlas" && (
                    <label><LocalizedText text={"Destination or topic"} /><input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </label>
                  )}
                  {feed
                    .filter((p) =>
                      view === "questions"
                        ? p.kind === "question" && !p.accepted
                        : view === "atlas"
                          ? p.kind === "experience" &&
                            `${p.destination} ${p.title} ${p.context}`
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          : true,
                    )
                    .map((p) => (
                      <section key={`${p.community}-${p.id}`}>
                        <Link href={`/community/${p.community}`}>
                          {p.communityName}
                        </Link>
                        <PostCard
                          post={p}
                          uid={uid}
                          membership={p.membership}
                          busy={busy}
                          action={(body) =>
                            action({ ...body, community: p.community })
                          }
                        />
                      </section>
                    ))}
                  {!loading && !feed.length && !error && (
                    <div className={s.empty}>
                      <h3><LocalizedText text={"Choose your first circle."} /></h3>
                      <p><LocalizedText text={"Join a community to bring its conversations here."} /></p>
                      <button
                        className={s.button}
                        onClick={() => setView("explore")}
                      ><LocalizedText text="Explore communities" /></button>
                    </div>
                  )}
                </section>
              )}
              {!id && view === "saved" && (
                <section>
                  <h2><LocalizedText text="Saved contributions" /></h2>
                  {!loading && !saved.length && !error && (
                    <p className={s.empty}><LocalizedText text={"No accessible saved contributions yet."} /></p>
                  )}
                  {saved.map((p) => (
                    <article className={s.panel} key={`${p.community}-${p.id}`}>
                      <h2>{p.title}</h2>
                      <p>{p.body.slice(0, 240)}</p>
                      <div className={s.actions}>
                        <Link
                          className={s.secondary}
                          href={`/community/${p.community}?post=${p.id}`}
                        ><LocalizedText text={"Open discussion"} /></Link>
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
                        ><LocalizedText text={"Unsave"} /></button>
                      </div>
                    </article>
                  ))}
                </section>
              )}
              {c && (
                <>
                  <section className={s.panel}>
                    {c.avatarId && (
                      <Image
                        src={`/api/community/assets/${c.id}/${c.avatarId}`}
                        alt={`${c.name} avatar`}
                        width={72}
                        height={72}
                        unoptimized
                      />
                    )}
                    {admin && (
                      <details className={s.brandEditor}>
                        <summary><LocalizedText text={"Change community photo or cover"} /></summary>
                        <div className={s.split}>
                          <ImageUpload
                            community={c.id}
                            kind="avatar"
                            onUpload={() => void load()}
                          />
                          <ImageUpload
                            community={c.id}
                            kind="cover"
                            onUpload={() => void load()}
                          />
                        </div>
                      </details>
                    )}
                    <div className={s.meta}>
                      <span className={s.badge}><LocalizedText text={c.visibility} /></span>
                      <span className={s.badge}><LocalizedText text={c.admission} /></span>
                      <span>{c.memberCount}{" "}<LocalizedText text={"members"} /></span>
                      <span>
                        {c.destination} · {c.language}
                      </span>
                    </div>
                    {c.journey && (
                      <p className={s.badge}><LocalizedText text={"Journey Circle ·"} />{" "}{c.journey}</p>
                    )}
                    {c.courseId && (
                      <p>
                        <Link href={`/courses/${c.courseId}`}><LocalizedText text={"Open connected TGPI course →"} /></Link>
                      </p>
                    )}
                    {c.archived && (
                      <p className={s.status}><LocalizedText text={"This community is archived."} /></p>
                    )}
                    {m && (
                      <p className={s.status}><LocalizedText text={"Your participation:"} />{" "}<LocalizedText text={m.state} /> · <LocalizedText text={m.role} />
                        {m.reason && (
                          <>
                            <br />
                            {m.reason}
                          </>
                        )}
                      </p>
                    )}
                    {user &&
                      ["banned", "suspended", "declined"].includes(
                        m?.state || "",
                      ) && (
                        <button
                          className={s.secondary}
                          disabled={busy}
                          onClick={() => {
                            const body = window.prompt(
                              "Explain why this decision should be reviewed",
                            );
                            if (body) void action({ action: "appeal", body });
                          }}
                        ><LocalizedText text={"Appeal participation decision"} /></button>
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
                            ><LocalizedText text={"Cancel request"} /></button>
                          ) : (
                            <>
                              <details>
                                <summary><LocalizedText text={"Read the rules before joining"} /></summary>
                                <p className={s.rules}>{c.rules}</p>
                              </details>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={accepted}
                                  onChange={(e) =>
                                    setAccepted(e.target.checked)
                                  }
                                /><LocalizedText text={"I have read and accept the current rules"} /></label>
                              {(c.entryQuestion ||
                                c.admission === "approval") && (
                                <label>
                                  {c.entryQuestion ||
                                    <LocalizedText text={"Introduction for moderators (optional)"} />}
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
                                  ? <LocalizedText text={"Accept invitation"} />
                                  : c.admission === "approval"
                                    ? <LocalizedText text={"Request to join"} />
                                    : c.admission === "invite"
                                      ? <LocalizedText text={"Invitation required"} />
                                      : <LocalizedText text={"Join community"} />}
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
                        ><LocalizedText text={"Mute community notifications"} /></button>
                        <button
                          className={s.secondary}
                          disabled={busy}
                          onClick={() => {
                            const reason = window.prompt(
                              "Describe the community issue: privacy, spam, fraud, harassment or other",
                            );
                            if (reason)
                              void action({
                                action: "report-community",
                                reason,
                              });
                          }}
                        ><LocalizedText text={"Report community"} /></button>
                        {admin && (
                          <button
                            className={s.secondary}
                            onClick={() => setManage(!manage)}
                            aria-expanded={manage}
                          >
                            {manage ? <LocalizedText text={"Close management"} /> : <LocalizedText text={"Manage community"} />}
                          </button>
                        )}
                        {m?.role !== "owner" && (
                          <button
                            className={s.secondary}
                            disabled={busy}
                            onClick={() => {
                              if (window.confirm(localizeLabel("Leave this community?")))
                                void action({ action: "leave" });
                            }}
                          ><LocalizedText text={"Leave community"} /></button>
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
                          ><LocalizedText text={"Accept ownership"} /></button>
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
                      <p><LocalizedText text={"Community rules have changed. Review them before contributing."} /></p>
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
                      ><LocalizedText text={"Accept updated rules"} /></button>
                    </section>
                  )}
                  {joined && (
                    <Chat
                      key={`${c.id}:${uid}`}
                      community={c}
                      membership={m || null}
                      uid={uid}
                    />
                  )}
                  {joined && !c.archived && (
                    <Composer community={c.id} action={action} busy={busy} />
                  )}
                  {(joined || c.visibility === "public") && (
                    <label><LocalizedText text={"Publication filter"} /><select
                        value={postFilter}
                        onChange={(e) => setPostFilter(e.target.value)}
                      >
                        <option value="all"><LocalizedText text={"All contributions"} /></option>
                        <option value="open"><LocalizedText text={"Unanswered questions"} /></option>
                        <option value="experience"><LocalizedText text={"Experience Atlas"} /></option>
                        <option value="guide"><LocalizedText text={"Guides"} /></option>
                        <option value="discussion"><LocalizedText text={"Discussions"} /></option>
                      </select>
                    </label>
                  )}
                  {detail.posts
                    .filter(
                      (p) =>
                        p.id !== "community-chat" &&
                        (postFilter === "all" ||
                          (postFilter === "open" &&
                            p.kind === "question" &&
                            !p.accepted) ||
                          p.kind === postFilter),
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
                          ? <LocalizedText text={"Start with an introduction."} />
                          : c.visibility === "public"
                            ? <LocalizedText text={"A new conversation starts here."} />
                            : <LocalizedText text={"A space for its members."} />}
                      </h2>
                      <p>
                        {joined
                          ? <LocalizedText text={"Share your destination, what you are learning and where you could help."} />
                          : c.visibility === "public"
                            ? <LocalizedText text={"No publications yet."} />
                            : <LocalizedText text={"Complete the admission process to read and contribute."} />}
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
                  {(joined || c.visibility === "public") && (
                    <Playbooks
                      community={c.id}
                      posts={detail.posts}
                      manage={admin}
                      action={action}
                      busy={busy}
                    />
                  )}
                  <section className={s.panel} id="community-rules">
                    <h2><LocalizedText text="About & rules" /></h2>
                    <p className={s.body}>{c.about}</p>
                    <p className={s.rules}>{c.rules}</p>
                    <p className={s.notice}><LocalizedText text={"Member experiences are not official immigration, legal, medical or financial advice. Verify sources and dates."} /></p>
                  </section>
                </>
              )}
              {loading && (
                <p className={s.loading} role="status"><LocalizedText text={"Loading community…"} /></p>
              )}
              {next && !loading && (
                <button className={s.secondary} onClick={() => void load(next)}><LocalizedText text="Load more" /></button>
              )}
            </>
          )}
        </LocalizedElement>
        <aside className={s.context}>
          <section className={s.panel}>
            <div className={s.identity}>
              <Image
                src="/brand/tgpi-crest-metal-v3-256.png"
                width={42}
                height={42}
                alt={localizeLabel("TGPI crest")}
              />
              <span className={s.meta}><LocalizedText text={"THE GLOBAL"} /><br /><LocalizedText text={"POLYMATH INSTITUTE"} /></span>
            </div>
            <h2><LocalizedText text={"Experience into action."} /></h2>
            <div className={s.editorial}>
              <Image
                src="/images/cinematic-2026/arrival-city-1600.webp"
                alt="AI-generated editorial illustration of a conversation at a neighborhood cafe"
                fill
                sizes="240px"
              />
            </div>
            <p><LocalizedText text={"Find a destination. Ask a useful question. Share what helped you."} /></p>
            <Link className={s.secondary} href="/countries"><LocalizedText text={"Explore destinations"} /></Link>
          </section>
          <section className={s.panel}>
            <div className={s.editorial}>
              <Image
                src="/images/cinematic-2026/learning-atelier-1600.webp"
                alt="AI-generated editorial illustration of collaborative study"
                fill
                sizes="240px"
              />
            </div>
            <h3><LocalizedText text={"Build your next step"} /></h3>
            <p><LocalizedText text={"Connect your research with a practical plan."} /></p>
            <Link href="/profile"><LocalizedText text={"Open your Workspace →"} /></Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
