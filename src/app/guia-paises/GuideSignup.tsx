"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { subscribeToGuides } from "./actions";
import type { Locale } from "@/lib/localization/config";
import { guideCopy } from "./copy";
import { exampleComparison, type GuideChannel } from "./campaign";
import styles from "./guia.module.css";

export default function GuideSignup({ source, locale }: { source: GuideChannel; locale: Locale }) {
  const copy = guideCopy[locale];
  const [status, action, pending] = useActionState(subscribeToGuides, "idle");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  return (
    <section className={styles.panel} aria-labelledby="guias-inscricao">
      <h2 id="guias-inscricao">{copy.join}</h2>
      <p>{copy.pitchJoin}</p>
      {status === "saved" ? (
        <div role="status" className={styles.success}>
          <strong>{copy.saved}</strong>
          <p>{copy.tryIt}</p>
          <Link href={exampleComparison} data-funnel-event="country_guide_compare_opened">{copy.open} →</Link>
        </div>
      ) : (
        <form action={action} className={styles.form}>
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="source" value={source} />
          <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
          <label htmlFor="guide-email">{copy.email}</label>
          <input id="guide-email" type="email" name="email" autoComplete="email" inputMode="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className={styles.check}>
            <input type="checkbox" name="consent" value="yes" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>{copy.consent}</span>
          </label>
          {status === "invalid" && <p role="alert">{copy.invalid}</p>}
          {status === "unavailable" && <p role="alert">{copy.failed}</p>}
          <button disabled={pending}>{pending ? copy.working : copy.submit}</button>
        </form>
      )}
      <p className={styles.fine}>{copy.whenever} <a href="mailto:contact@theglobalpolymath.com?subject=Cancelar%20inscri%C3%A7%C3%A3o%20nos%20guias">{copy.cancel}</a>. <Link href="/privacy">{copy.privacy}</Link>.</p>
    </section>
  );
}
