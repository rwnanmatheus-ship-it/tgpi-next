"use client";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";
import { useCallback, useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "@/components/localization/LocalizedImage";
import CinematicImage from "@/components/ui/CinematicImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import dynamic from "next/dynamic";
import {
  active,
  canRead,
  communityChatId,
  manages,
  type CommunityCard,
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
const directoryViews = [
  { id: "explore", label: "Explore", icon: "compass" },
  { id: "feed", label: "For you", icon: "apps" },
  { id: "questions", label: "Unanswered questions", icon: "target" },
  { id: "atlas", label: "Experience Atlas", icon: "globe" },
  { id: "meetings", label: "Global Sessions", icon: "bell" },
  { id: "mine", label: "My communities", icon: "home" },
  { id: "requests", label: "My requests", icon: "key" },
  { id: "saved", label: "Saved posts", icon: "book" },
  { id: "preferences", label: "My interests", icon: "settings" },
] as const;
const roomTabs = [
  { id: "posts", label: "Discussions" },
  { id: "chat", label: "Community chat" },
  { id: "events", label: "Global Sessions" },
  { id: "guides", label: "Playbooks" },
  { id: "about", label: "About & rules" },
] as const;
type RoomTab = (typeof roomTabs)[number]["id"];

const emptySearch = {
  en: { communities: "No communities match this search.", posts: "No contributions match this filter." },
  "pt-BR": { communities: "Nenhuma comunidade corresponde a esta busca.", posts: "Nenhuma publicação corresponde ao filtro." },
  es: { communities: "Ninguna comunidad coincide con esta búsqueda.", posts: "Ninguna publicación coincide con el filtro." },
  fr: { communities: "Aucune communauté ne correspond à cette recherche.", posts: "Aucune publication ne correspond à ce filtre." },
  de: { communities: "Keine Community entspricht dieser Suche.", posts: "Keine Beiträge entsprechen diesem Filter." },
  it: { communities: "Nessuna comunità corrisponde a questa ricerca.", posts: "Nessun contributo corrisponde a questo filtro." },
};
function normalizeSearch(value: string) {
  return value.normalize("NFKD").replace(/\p{Mark}/gu, "").toLowerCase().trim();
}

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
  const { locale, t: localizeLabel } = useInterfaceLocale();
  const router = useRouter();
  const view = initialView;
  const requiresSignIn = !id && view !== "explore";

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
    [next, setNext] = useState<string | null>(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [search, setSearch] = useState(destination),
    [postFilter, setPostFilter] = useState("all"),
    [roomTab, setRoomTab] = useState<RoomTab>("posts"),
    [creating, setCreating] = useState(false),
    [manage, setManage] = useState(false),
    [accepted, setAccepted] = useState(false),
    [answers, setAnswers] = useState("");
  const uid = user?.id || "";
  const loadVersion = useRef(0);
  const actionLock = useRef(false);
  const signIn = (target: string) =>
    `/sign-in?${new URLSearchParams({ redirect_url: target })}`;
  const directoryHref = (section: string) =>
    section === "explore" ? "/community" : `/community?view=${section}`;
  const currentHref = id
    ? `/community/${id}${token || post ? "?" + new URLSearchParams({
        ...(token ? { token } : {}),
        ...(post ? { post } : {}),
      }) : ""}`
    : directoryHref(view);
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
        } else if ((requiresSignIn && !uid) || ["preferences", "meetings"].includes(view)) {
          setNext(null);
        } else if (["feed", "questions", "atlas"].includes(view)) {
          const r = await api<
            Page<
              Post & {
                membership: CommunityDetail["membership"];
                communityName: string;
              }
            >
          >({ feed: "1", ...(view === "feed" ? {} : { filter: view }), ...(cursor ? { after: cursor } : {}) });
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
              : { q: destination }),
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
    [id, token, view, post, destination, requiresSignIn, uid],
  );
  const currentLoad = useRef(load);
  useEffect(() => {
    currentLoad.current = load;
    if (isLoaded) {
      setDetail(null);
      setCards([]);
      setSaved([]);
      setFeed([]);
      setNext(null);
      void load();
    }
    return () => { loadVersion.current += 1; };
  }, [load, isLoaded]);
  useEffect(() => setSearch(destination), [destination]);
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
    if (actionLock.current) return false;
    actionLock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await api({}, { community: id, ...body });
      setNotice("Changes saved.");
      await currentLoad.current();
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      actionLock.current = false;
      setBusy(false);
    }
  }
  function hideCommunity(community: string, muted = false) {
    return action({
      action: "community-preference",
      target: community,
      field: muted ? "muted" : "hidden",
    });
  }
  const c = detail?.community,
    m = detail?.membership,
    joined = active(m),
    admin = manages(m);
  const searchable = normalizeSearch(search);
  const currentTab = post ? (post === communityChatId ? "chat" : "posts") : roomTab;
  const readable = c && canRead(c, m);
  const availableTabs = roomTabs.filter((tab) =>
    tab.id === "about" || (readable && (tab.id !== "chat" || joined)),
  );
  const filtered = cards.filter(
    (c) =>
      (view !== "mine" || c.membership?.state === "active") &&
      (view !== "requests" || c.membership?.state === "pending") &&
      (view === "explore" ||
        normalizeSearch(`${c.name} ${c.description} ${c.destination} ${c.theme} ${c.language}`)
          .includes(searchable)),
  );
  const visibleFeed = feed.filter((p) =>
    view !== "atlas" ||
    normalizeSearch(`${p.destination} ${p.title} ${p.context}`).includes(searchable),
  );
  const visiblePosts = detail?.posts.filter((p) =>
    p.id !== communityChatId &&
    (post || postFilter === "all" ||
      (postFilter === "open" && p.kind === "question" && !p.accepted) ||
      p.kind === postFilter),
  ) || [];
  const title = directoryViews.find((item) => item.id === view)?.label || "Explore";
  const formatter = new Intl.NumberFormat(locale);
  return (
    <main className={s.shell}>
      <header className={`${s.hero} ${id ? s.roomHero : ""}`}>
        {c?.coverId ? (
          <Image
            src={`/api/community/assets/${c.id}/${c.coverId}`}
            unoptimized alt="" fill sizes="(max-width:760px) 100vw, 1200px" priority
          />
        ) : (
          <CinematicImage asset="community-global-exchange" alt="" priority
            sizes="(max-width:760px) 100vw, 1200px" position="65% center" />
        )}
        <div className={s.heroCopy}>
          {id ? (
            <Link className={s.back} href="/community">
              <NavigationIcon name="arrow" width={16} height={16} />
              <LocalizedText text="All communities" />
            </Link>
          ) : (
            <span className={s.eyebrow}><LocalizedText text="TGPI · Global Community" /></span>
          )}
          <h1>{c?.name || <LocalizedText text="Your world. Shared experience." />}</h1>
          <p>{c?.description || <LocalizedText text="Connect with people navigating life across borders." />}</p>
          <div className={s.actions}>
            {!id && (
              <>
                {user ? (
                  <button className={s.button} onClick={() => setCreating(true)}>
                    <LocalizedText text="Create community" />
                  </button>
                ) : (
                  <Link className={s.button} href={signIn(currentHref)}>
                    <LocalizedText text="Sign in to participate" />
                  </Link>
                )}
                <Link className={s.heroLink} href={view === "explore" ? "#community-content" : "/community"}>
                  <LocalizedText text="Explore communities" />
                  <NavigationIcon name="arrow" width={16} height={16} />
                </Link>
              </>
            )}
            {c && !joined && !c.archived && (
              user ? (
                <a className={s.button} href="#community-membership"><LocalizedText text="Rules & participation" /></a>
              ) : (
                <Link className={s.button} href={signIn(currentHref)}><LocalizedText text="Sign in to participate" /></Link>
              )
            )}
          </div>
        </div>
      </header>
      <div className={`${s.layout} ${id ? s.roomLayout : ""}`}>
        {!id && (
          <nav className={s.nav} aria-label={localizeLabel("Community navigation")}>
            {directoryViews.map((item) => (
              <Link
                href={directoryHref(item.id)}
                aria-current={view === item.id ? "page" : undefined}
                key={item.id}
                scroll={false}
                onClick={() => setCreating(false)}
              >
                <NavigationIcon name={item.icon} width={18} height={18} />
                <LocalizedText text={item.label} />
              </Link>
            ))}
            {globalAdmin && (
              <Link href="/community/moderation">
                <NavigationIcon name="shield" width={18} height={18} />
                <LocalizedText text="Global moderation" />
              </Link>
            )}
          </nav>
        )}
        <LocalizedElement as="section" className={s.content} id="community-content" aria-label="Community content">
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
          ) : requiresSignIn && isLoaded && !user ? (
            <div className={s.empty}>
              <h2><LocalizedText text={title} /></h2>
              <Link className={s.button} href={signIn(currentHref)}><LocalizedText text="Sign in to participate" /></Link>
            </div>
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
                    <h2 className={s.sectionTitle}><LocalizedText text={title} /></h2>
                    <form
                      className={s.tools}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (view !== "explore") return;
                        const value = search.trim();
                        if (value === destination) void load();
                        else router.push(value
                          ? `/community?${new URLSearchParams({ destination: value })}`
                          : "/community", { scroll: false });
                      }}
                    >
                      <label style={{ flex: 1, margin: 0 }}><LocalizedText text={"Search communities"} /><LocalizedElement as="input"
                          type="search"
                          value={search}
                          maxLength={100}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Destination, topic or language"
                        />
                      </label>
                      {view === "explore" && (
                        <button className={s.button}>
                          <NavigationIcon name="search" width={17} height={17} />
                          <LocalizedText text="Search" />
                        </button>
                      )}
                    </form>
                    <div className={s.grid}>
                      {filtered.map((c) => (
                        <article className={s.directoryCard} key={c.id}>
                          <div className={s.cardCover}>
                            {c.coverId ? (
                              <Image src={`/api/community/assets/${c.id}/${c.coverId}`} unoptimized
                                alt="" fill sizes="(max-width:760px) 100vw, 400px" />
                            ) : (
                              <CinematicImage asset={c.destination ? "arrival-city" : "community-conversation"}
                                alt="" sizes="(max-width:760px) 100vw, 400px" />
                            )}
                            <span className={s.cardVisibility}><LocalizedText text={c.visibility} /></span>
                          </div>
                          <div className={s.cardContent}>
                            <p className={s.cardTopics}>
                              {[c.destination, c.language, c.theme].filter(Boolean).join(" · ")}
                            </p>
                            <h3><Link href={`/community/${c.id}`}>{c.name}</Link></h3>
                            <p className={s.cardDescription}>{c.description}</p>
                            {c.recommendation && <p className={s.notice}>{c.recommendation}</p>}
                            <div className={s.cardFooter}>
                              <span className={s.meta}>
                                {formatter.format(c.memberCount)} <LocalizedText text="members" />
                                <span aria-hidden="true">·</span> <LocalizedText text={c.membership?.state || c.admission} />
                              </span>
                              <Link className={s.cardArrow} href={`/community/${c.id}`}
                                aria-label={`${localizeLabel("Visit community")} · ${c.name}`}>
                                <NavigationIcon name="arrow" width={19} height={19} />
                              </Link>
                            </div>
                            {user && view === "explore" && (
                              <button className={s.quietButton} disabled={busy}
                                onClick={() => void hideCommunity(c.id)}>
                                <LocalizedText text="Hide recommendation" />
                              </button>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                    {!loading && !error && !filtered.length && !next && (
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
                          {destination
                            ? emptySearch[locale].communities
                            : view === "requests"
                              ? <LocalizedText text="No pending requests." />
                              : <LocalizedText text="Find your next circle." />}
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
              {!id && view === "meetings" && user && (
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
                  {visibleFeed
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
                  {!loading && !visibleFeed.length && !error && (next || view !== "feed" ? (
                    <p className={s.empty}>{emptySearch[locale].posts}</p>
                  ) : (
                    <div className={s.empty}>
                      <h3><LocalizedText text={"Choose your first circle."} /></h3>
                      <p><LocalizedText text={"Join a community to bring its conversations here."} /></p>
                      <Link className={s.button} href="/community"><LocalizedText text="Explore communities" /></Link>
                    </div>
                  ))}
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
                  <section className={s.panel} id="community-membership" data-membership-panel>
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
                  {post && (
                    <Link className={s.backLink} href={`/community/${c.id}`}>
                      <NavigationIcon name="arrow" width={16} height={16} />
                      {c.name}
                    </Link>
                  )}
                  {!post && (
                    <nav className={s.roomTabs} aria-label={localizeLabel("Community navigation")}>
                      {availableTabs.map((tab) => (
                        <button key={tab.id} aria-pressed={currentTab === tab.id}
                          onClick={() => setRoomTab(tab.id)}>
                          <LocalizedText text={tab.label} />
                        </button>
                      ))}
                    </nav>
                  )}
                  {joined && currentTab === "chat" && (
                    <Chat key={`${c.id}:${uid}`} community={c} membership={m || null} uid={uid} />
                  )}
                  {readable && (
                    <div hidden={currentTab !== "posts"}>
                      {joined && !c.archived && !post && m?.acceptedVersion === c.rulesVersion && (
                        <Composer community={c.id} action={action} busy={busy} />
                      )}
                      {!post && (
                        <label className={s.postFilter}><LocalizedText text="Publication filter" />
                          <select value={postFilter} onChange={(e) => setPostFilter(e.target.value)}>
                            <option value="all"><LocalizedText text="All contributions" /></option>
                            <option value="open"><LocalizedText text="Unanswered questions" /></option>
                            <option value="experience"><LocalizedText text="Experience Atlas" /></option>
                            <option value="guide"><LocalizedText text="Guides" /></option>
                            <option value="discussion"><LocalizedText text="Discussions" /></option>
                          </select>
                        </label>
                      )}
                      {currentTab === "posts" && visiblePosts.map((p) => (
                        <PostCard post={p} uid={uid}
                          membership={m || null}
                          canReply={joined && !c.archived && m?.acceptedVersion === c.rulesVersion}
                          action={action} busy={busy} key={p.id} />
                      ))}
                      {!loading && !visiblePosts.length && (
                        <div className={s.empty}>
                          <h2>
                            {postFilter !== "all" || next
                              ? emptySearch[locale].posts
                              : joined
                                ? <LocalizedText text="Start with an introduction." />
                                : <LocalizedText text="A new conversation starts here." />}
                          </h2>
                        </div>
                      )}
                    </div>
                  )}
                  {readable && currentTab === "events" && (
                    <Sessions community={id} joined={joined} manage={admin} action={action} busy={busy} />
                  )}
                  {readable && currentTab === "guides" && (
                    <Playbooks community={c.id} posts={detail.posts} manage={admin} action={action} busy={busy} />
                  )}
                  {(currentTab === "about" || !readable) && (
                    <section className={s.panel} id="community-rules">
                      <h2><LocalizedText text="About & rules" /></h2>
                      {!readable && <p><LocalizedText text="Complete the admission process to read and contribute." /></p>}
                      <p className={s.body}>{c.about}</p>
                      <p className={s.rules}>{c.rules}</p>
                      <p className={s.notice}><LocalizedText text="Member experiences are not official immigration, legal, medical or financial advice. Verify sources and dates." /></p>
                    </section>
                  )}
                </>
              )}
              {loading && (
                <p className={s.loading} role="status"><LocalizedText text={"Loading community…"} /></p>
              )}
              {next && !loading && (!id || currentTab === "posts" || (currentTab === "guides" && admin)) && (
                <button className={s.secondary} onClick={() => void load(next)}><LocalizedText text="Load more" /></button>
              )}
            </>
          )}
        </LocalizedElement>
        <aside className={s.context}>
          <section className={s.contextPanel}>
            <NavigationIcon name="compass" width={22} height={22} />
            <h2><LocalizedText text="Build your next step" /></h2>
            <Link href="/countries"><LocalizedText text="Explore destinations" /></Link>
            <Link href="/members"><LocalizedText text="Find members" /></Link>
            <Link href="/profile"><LocalizedText text="Open your Workspace →" /></Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
