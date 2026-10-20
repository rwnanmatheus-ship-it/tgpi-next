"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { journeyStages } from "@/lib/community/features";
import { defaultRules } from "@/lib/community/model";
import { api } from "./api";
import s from "./Community.module.css";
const empty = {
  name: "",
  community: "",
  description: "",
  about: "",
  destination: "",
  language: "English",
  theme: "Life abroad",
  journey: "",
  courseId: "",
  visibility: "public",
  admission: "instant",
  rules: defaultRules,
  entryQuestion: "",
  welcome: "",
};
export default function CommunityCreateFlow({ close }: { close: () => void }) {
  const router = useRouter(),
    [catalog, setCatalog] = useState<{ id: string; title: string }[]>([]),
    [value, setValue] = useState(empty),
    [step, setStep] = useState(1),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    let mounted = true;
    api<{ courses: { id: string; title: string }[] }>({ catalog: "1" })
      .then((p) => {
        if (mounted) setCatalog(p.courses);
      })
      .catch(() => {});
    api<typeof empty | null>({ draft: "1" })
      .then((d) => {
        if (d && mounted) setValue({ ...empty, ...d });
      })
      .catch((e) => {
        if (mounted) setError((e as Error).message);
      });
    return () => {
      mounted = false;
    };
  }, []);
  function field(
    key: keyof typeof empty,
    label: string,
    area = false,
    max = 100,
  ) {
    return (
      <label>
        {label}
        {area ? (
          <textarea
            value={value[key]}
            onChange={(e) => setValue({ ...value, [key]: e.target.value })}
            maxLength={max}
            required={key === "rules"}
          />
        ) : (
          <input
            value={value[key]}
            onChange={(e) => setValue({ ...value, [key]: e.target.value })}
            maxLength={max}
            required={[
              "name",
              "community",
              "description",
              "language",
              "theme",
            ].includes(key)}
            pattern={
              key === "community" ? "[a-z0-9][a-z0-9-]{2,59}" : undefined
            }
          />
        )}
      </label>
    );
  }
  async function saveDraft() {
    setBusy(true);
    try {
      await api({}, { ...value, action: "draft" });
      close();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className={s.panel} aria-label="Create community">
      <p className={s.step}>STEP {step} OF 4</p>
      <h2>
        {
          [
            "Community identity",
            "Privacy & admission",
            "Rules & participation",
            "Review & create",
          ][step - 1]
        }
      </h2>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          if (step < 4) {
            setStep(step + 1);
            return;
          }
          setBusy(true);
          try {
            await api({}, { ...value, action: "create" });
            router.push(`/community/${value.community}`);
            close();
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        {step === 1 && (
          <>
            {field("name", "Community name", false, 90)}
            {field(
              "community",
              "Unique identifier — lowercase letters, numbers and hyphens",
              false,
              60,
            )}
            {field("description", "Short description", false, 240)}
            {field("about", "Introduction", true, 4000)}
            <div className={s.split}>
              {field("destination", "Country / city (optional)")}
              {field("language", "Languages")}
              {field("theme", "Topic or journey stage")}
            </div>
            <label>
              Journey Circle (optional)
              <select
                value={value.journey}
                onChange={(e) =>
                  setValue({ ...value, journey: e.target.value })
                }
              >
                <option value="">Any stage</option>
                {journeyStages.map((stage) => (
                  <option key={stage}>{stage}</option>
                ))}
              </select>
            </label>
            <label>
              Course study group (optional)
              <select
                value={value.courseId}
                onChange={(e) =>
                  setValue({ ...value, courseId: e.target.value })
                }
              >
                <option value="">No course connection</option>
                {catalog.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </label>
            <p className={s.notice}>
              Check Explore for related communities before creating yours.
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <label>
              Visibility
              <select
                value={value.visibility}
                onChange={(e) =>
                  setValue({
                    ...value,
                    visibility: e.target.value,
                    admission:
                      e.target.value === "hidden" ? "invite" : value.admission,
                  })
                }
              >
                <option value="public">
                  Public — visitors can read content
                </option>
                <option value="private">
                  Private — content and members restricted
                </option>
                <option value="hidden">
                  Hidden — not discoverable; invitation required
                </option>
              </select>
            </label>
            <label>
              Admission
              <select
                value={value.admission}
                disabled={value.visibility === "hidden"}
                onChange={(e) =>
                  setValue({ ...value, admission: e.target.value })
                }
              >
                <option value="instant">Instant — after accepting rules</option>
                <option value="approval">
                  Approval — moderators review requests
                </option>
                <option value="invite">Invitation only</option>
              </select>
            </label>
            <p>
              Private communities may allow instant entry. Privacy never
              requires Premium.
            </p>
          </>
        )}
        {step === 3 && (
          <>
            {field("rules", "Numbered rules", true, 5000)}
            {field("entryQuestion", "Entry question (optional)", false, 500)}
            {field("welcome", "Welcome message (optional)", true, 1000)}
            <p className={s.notice}>
              Local rules complement TGPI policies. Do not request private
              documents or sensitive migration information.
            </p>
          </>
        )}
        {step === 4 && (
          <>
            <h3>{value.name}</h3>
            <p>{value.description}</p>
            <p>
              {value.visibility} · {value.admission} · {value.language}
            </p>
            <p className={s.rules}>{value.rules}</p>
            <p>
              {value.visibility === "public"
                ? "Visitors can read publications."
                : "Only active members can read publications."}{" "}
              The community starts without empty channels or simulated activity.
            </p>
          </>
        )}
        <div className={s.actions}>
          {step > 1 && (
            <button
              className={s.secondary}
              type="button"
              disabled={busy}
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          <button className={s.button} disabled={busy}>
            {busy ? "Saving…" : step < 4 ? "Continue" : "Create community"}
          </button>
          <button
            type="button"
            className={s.secondary}
            disabled={busy}
            onClick={() => void saveDraft()}
          >
            Save draft & close
          </button>
        </div>
      </form>
    </section>
  );
}
