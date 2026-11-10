"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { saveCredentialShowcaseAction } from "@/app/global-key/actions";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import { certificateVerificationUrl } from "@/lib/certificate-presentation";
import styles from "./GlobalKeyCenter.module.css";

export type GlobalIdCredential = {
  id: string;
  courseTitle: string;
  issuedAt: string;
  skills: string[];
  shareable: boolean;
};

export default function GlobalIdCredentials({
  credentials,
  selection,
  profilePreviewUrl,
  copy,
}: {
  credentials: GlobalIdCredential[] | null;
  selection: string[] | null;
  profilePreviewUrl: string | null;
  copy: (value: string) => Promise<void>;
}) {
  const { locale, t } = useLocale();
  const [saved, setSaved] = useState(selection);
  const [chosen, setChosen] = useState(selection ?? []);
  const [feedback, setFeedback] = useState("");
  const [pending, startTransition] = useTransition();
  const shareableIds = new Set(credentials?.filter(item => item.shareable).map(item => item.id));
  const selected = chosen.filter(id => shareableIds.has(id));
  const previous = saved?.filter(id => shareableIds.has(id));
  const dirty = Boolean(previous && (selected.length !== previous.length || selected.some(id => !previous.includes(id))));

  function toggle(id: string) {
    setFeedback("");
    setChosen(chosen.includes(id) ? chosen.filter(value => value !== id) : [...chosen, id]);
  }

  function save() {
    startTransition(async () => {
      try {
        const result = await saveCredentialShowcaseAction(selected);
        if (!result.ok) return setFeedback(result.error);
        setSaved(result.value);
        setChosen(result.value);
        setFeedback("Profile credential selection saved.");
      } catch {
        setFeedback("The identity update could not be completed.");
      }
    });
  }

  return (
    <section className={styles.panel} id="credentials" aria-labelledby="global-credentials-heading">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.eyebrow}><LocalizedText text="Learning credentials" /></p>
          <h2 id="global-credentials-heading"><LocalizedText text="Your verified achievements" /></h2>
        </div>
        <Link className={styles.textLink} href="/certificates"><LocalizedText text="My certificates" /> ↗</Link>
      </div>

      {credentials === null ? (
        <p className={styles.notice}><LocalizedText text="Your certificates could not be loaded. Refresh this page to try again. Your learning records have not changed." /></p>
      ) : credentials.length === 0 ? (
        <p className={styles.notice}><LocalizedText text="Your verified credentials will appear here once issued." /></p>
      ) : (
        <>
          <p className={styles.muted}><LocalizedText text="Choose which certificates appear on your member profile. Profile visibility still applies." /></p>
          <div className={styles.credentialsList}>
            {credentials.map(item => (
              <article className={styles.credential} key={item.id}>
                <div className={styles.credentialBody}>
                  <p className={styles.smallLabel}><LocalizedText text="Credential verified" /> · {new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(item.issuedAt))}</p>
                  <h3><Link href={`/certificates/${encodeURIComponent(item.id)}`}>{t(item.courseTitle)}</Link></h3>
                  {item.skills.length > 0 && <p className={styles.skills}>{item.skills.map(skill => t(skill)).join(" · ")}</p>}
                </div>
                <div className={styles.credentialActions}>
                  {item.shareable ? (
                    <>
                      <button type="button" className={styles.secondaryButton} onClick={() => void copy(certificateVerificationUrl(item.id))}>
                        <LocalizedText text="Copy certificate link" />
                      </button>
                      <label className={styles.showcaseToggle}>
                        <input type="checkbox" checked={chosen.includes(item.id)} disabled={pending || saved === null} onChange={() => toggle(item.id)} />
                        <LocalizedText text="Show on my profile" />
                      </label>
                    </>
                  ) : <span className={styles.smallLabel}><LocalizedText text="Private certificate" /></span>}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.inlineActions}>
            <button type="button" className={styles.primaryButton} disabled={pending || !dirty} onClick={save}>
              <LocalizedText text={pending ? "Saving…" : "Save profile selection"} />
            </button>
            {profilePreviewUrl && <Link href={profilePreviewUrl} className={styles.textLink}><LocalizedText text="Preview public profile" /> ↗</Link>}
            <Link href="/profile/security#settings-privacy" className={styles.textLink}><LocalizedText text="Manage privacy" /> ↗</Link>
          </div>
          {saved === null && <p className={styles.notice}><LocalizedText text="Profile selection is temporarily unavailable." /></p>}
          <p className={styles.feedbackLine} role="status">{feedback && t(feedback)}</p>
        </>
      )}
    </section>
  );
}
