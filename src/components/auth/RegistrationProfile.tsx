"use client";
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registrationLanguages } from "@/lib/auth/registration";
import styles from "./auth.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type Props = { returnTo?: string; firstName: string; lastName: string; currentCountry: string; preferredLanguage: string; countries: { code: string; name: string }[] };
export default function RegistrationProfile({ firstName, lastName, currentCountry, preferredLanguage, countries, returnTo = "/onboarding" }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/registration", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName: data.get("firstName"), lastName: data.get("lastName"), currentCountry: data.get("currentCountry"), preferredLanguage: data.get("preferredLanguage"), acceptedTerms: data.get("terms") === "on" }) });
      if (!response.ok) {
        if (response.status === 401) { router.push("/sign-in?redirect_url=%2Fwelcome"); return; }
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error || "Unable to save your profile. Please try again.");
      }
      router.replace(returnTo); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to connect. Please try again."); }
    finally { submitting.current = false; setBusy(false); }
  }
  return <div><header className={styles.profileHeader}><h2>Make TGPI yours.</h2><p>Add a few details so your profile and global plan start with you.</p></header>
    <form className={styles.form} onSubmit={submit} aria-busy={busy}>
      <div className={styles.names}>
        <label className={styles.field} htmlFor="firstName"><LocalizedText text="First name" /><input id="firstName" name="firstName" autoComplete="given-name" defaultValue={firstName} required maxLength={60} /></label>
        <label className={styles.field} htmlFor="lastName"><LocalizedText text="Last name" /><input id="lastName" name="lastName" autoComplete="family-name" defaultValue={lastName} required maxLength={60} /></label>
      </div>
      <label className={styles.field} htmlFor="currentCountry"><LocalizedText text="Country of residence" /><select id="currentCountry" name="currentCountry" autoComplete="country" defaultValue={currentCountry} required><option value="" disabled>Select your country</option>{countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}</select></label>
      <label className={styles.field} htmlFor="preferredLanguage"><LocalizedText text="Preferred language" /><select id="preferredLanguage" name="preferredLanguage" defaultValue={preferredLanguage || "English"}>{registrationLanguages.map(language => <option key={language}>{language}</option>)}</select></label>
      <p className={styles.hint}>Used to personalize your profile and recommendations. Language availability varies by content. You can update these details in Settings.</p>
      <label className={styles.consent}><input name="terms" type="checkbox" required /><span>I agree to the <Link href="/terms" target="_blank" rel="noopener noreferrer">Terms of use</Link> and acknowledge the <Link href="/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</Link>.</span></label>
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      <button className={styles.submit} type="submit" disabled={busy}>{busy ? "Saving your profile…" : "Continue to my global plan →"}</button>
    </form>
  </div>;
}
