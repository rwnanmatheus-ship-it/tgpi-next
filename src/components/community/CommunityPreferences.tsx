"use client";


import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useEffect, useState } from "react";
import {
  parseCommunityPreferences,
  type CommunityPreferences,
} from "@/lib/community/model";
import { api, type Action } from "./api";
import CommunityPrivacy from "./CommunityPrivacy";
import s from "./Community.module.css";
export default function Preferences({
  action,
  busy,
}: {
  action: Action;
  busy: boolean;
}) {
  const [value, setValue] = useState<CommunityPreferences>(
      parseCommunityPreferences(null),
    ),
    [interests, setInterests] = useState(""),
    [blocks, setBlocks] = useState<{ uid: string }[]>([]),
    [blockNext, setBlockNext] = useState<string | null>(null),
    [error, setError] = useState(""),
    [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let mounted = true;
    api<{ items: { uid: string }[]; next: string | null }>({ blocks: "1" })
      .then((p) => {
        if (mounted) {
          setBlocks(p.items);
          setBlockNext(p.next);
        }
      })
      .catch((e) => {
        if (mounted) setError(e.message);
      });
    api<CommunityPreferences>({ preferences: "1" })
      .then((v) => {
        if (mounted) {
          setValue(v);
          setLoaded(true);
          setInterests(v.interests.join(", "));
        }
      })
      .catch((e) => {
        if (mounted) setError((e as Error).message);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <CommunityPrivacy />
      <section className={s.panel}>
        <h2><LocalizedText text={"Your community interests"} /></h2>
        <p><LocalizedText text={"Recommendations use only the interests you enter here. Your private Country Fit answers are not published or imported."} /></p>
        {error && (
          <p className={s.error} role="alert">
            <LocalizedText text={error} />
          </p>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const p = parseCommunityPreferences({
                ...value,
                interests: interests
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              });
              if (await action({
                action: "preferences",
                interests: p.interests,
                personalized: p.personalized,
              })) setValue(p);
            } catch (e) {
              setError((e as Error).message);
            }
          }}
        >
          <label><LocalizedText text={"Destinations, topics and languages, separated by commas"} /><LocalizedElement as="input"
              maxLength={1000}
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Portugal, remote work, English"
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={value.personalized}
              onChange={(e) =>
                setValue({ ...value, personalized: e.target.checked })
              }
            /><LocalizedText text={"Show explanations when communities match these interests"} /></label>
          <button className={s.button} disabled={busy || !loaded}><LocalizedText text={"Save preferences"} /></button>
        </form>
        <details>
          <summary><LocalizedText text={"Notification preferences per community"} /></summary>
          {Object.entries(value.communityNotifications || {}).map(
            ([id, mode]) => (
              <label key={id}>
                {id}
                <select
                  value={mode}
                  onChange={(e) =>
                    setValue({
                      ...value,
                      communityNotifications: {
                        ...value.communityNotifications,
                        [id]: e.target.value as "all" | "mentions" | "none",
                      },
                    })
                  }
                >
                  <option value="all"><LocalizedText text={"All essential updates"} /></option>
                  <option value="mentions"><LocalizedText text={"Mentions only"} /></option>
                  <option value="none"><LocalizedText text={"None"} /></option>
                </select>
              </label>
            ),
          )}
          <label><LocalizedText text={"Community identifier"} /><LocalizedElement as="input"
              placeholder="community-slug"
              onBlur={(e) => {
                const id = e.target.value.trim();
                if (/^[a-z0-9][a-z0-9-]{2,59}$/.test(id) && !(id in (value.communityNotifications || {})))
                  setValue({
                    ...value,
                    communityNotifications: {
                      ...value.communityNotifications,
                      [id]: "all",
                    },
                  });
              }}
            />
          </label>
          <p className={s.notice}><LocalizedText text={"Add a community identifier, choose its preference and select Save preferences. Delivery is capped at ten community updates per hour."} /></p>
          <button
            className={s.secondary}
            disabled={busy || !loaded}
            onClick={() => void action({
              action: "preferences",
              communityNotifications: value.communityNotifications,
            })}
          ><LocalizedText text={"Save notification preferences"} /></button>
        </details>
        <details>
          <summary><LocalizedText text={"Blocked members"} /></summary>
          {blocks.map((b) => (
            <div className={s.reply} key={b.uid}>
              <span>{b.uid}</span>
              <button
                className={s.secondary}
                disabled={busy}
                onClick={async () => {
                  if (
                    await action({
                      community: "preferences",
                      action: "unblock",
                      target: b.uid,
                    })
                  )
                    setBlocks((p) => p.filter((x) => x.uid !== b.uid));
                }}
              ><LocalizedText text={"Unblock"} /></button>
            </div>
          ))}
          {blockNext && (
            <button
              className={s.secondary}
              onClick={async () => {
                try {
                  const p = await api<{
                    items: { uid: string }[];
                    next: string | null;
                  }>({ blocks: "1", after: blockNext });
                  setBlocks((v) => [...v, ...p.items]);
                  setBlockNext(p.next);
                } catch (e) {
                  setError((e as Error).message);
                }
              }}
            ><LocalizedText text={"Load more blocked members"} /></button>
          )}
        </details>
        {[...value.hidden, ...value.muted].length > 0 && (
          <button
            className={s.secondary}
            disabled={busy}
            onClick={async () => {
              if (await action({ action: "preferences", hidden: [], muted: [] })) {
                setValue((previous) => ({ ...previous, hidden: [], muted: [] }));
              }
            }}
          ><LocalizedText text={"Restore hidden and muted communities"} /></button>
        )}
      </section>
    </>
  );
}
