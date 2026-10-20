"use client";
import { useEffect, useState } from "react";
import {
  parseCommunityPreferences,
  type CommunityPreferences,
} from "@/lib/community/model";
import { api, type Action } from "./api";
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
    [error, setError] = useState("");
  useEffect(() => {
    let mounted = true;
    api<CommunityPreferences>({ preferences: "1" })
      .then((v) => {
        if (mounted) {
          setValue(v);
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
    <section className={s.panel}>
      <h2>Your community interests</h2>
      <p>
        Recommendations use only the interests you enter here. Your private
        Country Fit answers are not published or imported.
      </p>
      {error && (
        <p className={s.error} role="alert">
          {error}
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
            if (await action({ action: "preferences", ...p })) setValue(p);
          } catch (e) {
            setError((e as Error).message);
          }
        }}
      >
        <label>
          Destinations, topics and languages, separated by commas
          <input
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
          />
          Show explanations when communities match these interests
        </label>
        <button className={s.button} disabled={busy}>
          Save preferences
        </button>
      </form>
      {[...value.hidden, ...value.muted].length > 0 && (
        <button
          className={s.secondary}
          disabled={busy}
          onClick={() =>
            void action({
              action: "preferences",
              ...value,
              hidden: [],
              muted: [],
            })
          }
        >
          Restore hidden and muted communities
        </button>
      )}
    </section>
  );
}
