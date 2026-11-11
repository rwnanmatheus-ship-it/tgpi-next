"use client";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  active,
  communityChatId,
  manages,
  type Community,
  type CommunityDetail,
  type Membership,
  type Post,
} from "@/lib/community/model";
import { api } from "./api";
import CommunityPost from "./CommunityPost";
import s from "./Community.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";

export default function CommunityChat({
  community,
  membership,
  uid,
}: {
  community: Community;
  membership: Membership | null;
  uid: string;
}) {
  const { t: localizeLabel } = useInterfaceLocale();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [error, setError] = useState("");
  const canSend =
    active(membership) &&
    !community.archived &&
    membership?.acceptedVersion === community.rulesVersion;
  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/community?${new URLSearchParams({ community: community.id, single: communityChatId })}`,
        { cache: "no-store" },
      );
      const data = await response.json();
      if (response.status === 404) {
        setMissing(true);
        setPost(null);
        return;
      }
      if (!response.ok)
        throw new Error(data.error || "Unable to open conversation.");
      setPost((data as CommunityDetail).posts[0] || null);
      setMissing(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, [community.id]); // eslint-disable-line react-hooks/exhaustive-deps
  async function action(body: Record<string, unknown>) {
    if (lock.current) return false;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      await api({}, { community: community.id, ...body });
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <section aria-label={localizeLabel("Community chat")}>
      {loading && <p role="status"><LocalizedText text={"Opening community conversation…"} /></p>}
      {error && (
        <div className={s.status}>
          <p role="alert"><LocalizedText text={error} /></p>
          <button className={s.secondary} onClick={() => void load()}><LocalizedText text="Try again" /></button>
        </div>
      )}
      {missing && (
        <div className={s.panel}>
          <h2><LocalizedText text={"Community conversation"} /></h2>
          <p><LocalizedText text={"A shared space for introductions, questions and everyday experiences."} /></p>
          {manages(membership) && canSend ? (
            <button
              className={s.button}
              disabled={busy}
              onClick={async () => {
                if (
                  await action({
                    action: "post",
                    id: communityChatId,
                    kind: "discussion",
                    title: "Community conversation",
                    body: "Welcome to our community conversation. Introduce yourself, share your destination and tell us what you are working toward.",
                  })
                )
                  await load();
              }}
            >
              {busy ? <LocalizedText text={"Opening…"} /> : <LocalizedText text={"Open community conversation"} />}
            </button>
          ) : (
            <p><LocalizedText text={"The community team has not opened this conversation yet."} /></p>
          )}
        </div>
      )}
      {post && (
        <CommunityPost
          conversation
          post={post}
          uid={uid}
          membership={membership}
          canReply={canSend}
          action={action}
          busy={busy}
        />
      )}
      {post && !canSend && (
        <p className={s.notice}><LocalizedText text={"Sending is paused. Check your membership, the community rules and archive status."} /></p>
      )}
      <p className={s.notice}><LocalizedText text={"Manage community alerts in"} />{" "}
        <Link href="/community?view=preferences"><LocalizedText text={"Community preferences"} /></Link>{" "}<LocalizedText text={"and delivery channels in"} />{" "}
        <Link href="/profile#settings-notifications"><LocalizedText text={"Notification settings"} /></Link><LocalizedText text={". Replies and @mentions follow your saved preferences."} /></p>
    </section>
  );
}
