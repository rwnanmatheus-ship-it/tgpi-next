"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import "@/app/certificates/certificate-name-correction.css";

type CertificateNameCorrectionProps = {
  credentialId: string;
  recordedName: string;
  currentCertificateName: string;
};

/** Owner-only opt-in correction. The server resolves the replacement from the account. */
export default function CertificateNameCorrection({
  credentialId,
  recordedName,
  currentCertificateName,
}: CertificateNameCorrectionProps) {
  const { t } = useLocale();
  const { isLoaded, sessionId } = useAuth();
  const router = useRouter();
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const inFlight = useRef(false);
  const hasProfileName = currentCertificateName.trim().length > 0;
  const needsCorrection = hasProfileName && currentCertificateName !== recordedName;

  if (hasProfileName && !needsCorrection) return null;

  async function updateName() {
    if (!consent || !isLoaded || !sessionId || !needsCorrection || inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setMessage("");
    setFailed(false);
    try {
      const response = await fetch(`/api/credentials/${encodeURIComponent(credentialId)}/name`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-TGPI-Session": sessionId,
        },
        body: JSON.stringify({ expectedName: recordedName, confirmedName: currentCertificateName, consent: true }),
      });
      if (!response.ok) {
        setFailed(true);
        setMessage(response.status === 409
          ? "The certificate or account name changed. Reload this page and review the name again."
          : "Unable to update the certificate name. Please try again.");
        return;
      }
      setConsent(false);
      setMessage("Certificate name updated. Your PDF now uses the corrected issuer record.");
      router.refresh();
    } catch {
      setFailed(true);
      setMessage("Unable to update the certificate name. Please try again.");
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  return (
    <section className="certificate-name-correction" aria-labelledby="certificate-name-correction-title">
      <div>
        <h2 id="certificate-name-correction-title">{t("Review the name on this certificate")}</h2>
        <p>{t(hasProfileName
          ? "Your current account name differs from the name saved when this certificate was issued. Review the correction before confirming."
          : "Add your complete real name in account settings before correcting this certificate.")}</p>
      </div>
      {hasProfileName && <>
        <dl>
          <div><dt>{t("Name on the issued certificate")}</dt><dd><bdi>{recordedName}</bdi></dd></div>
          <div><dt>{t("Full name from your account")}</dt><dd><bdi>{currentCertificateName}</bdi></dd></div>
        </dl>
        <label className="certificate-name-consent">
          <input type="checkbox" checked={consent} disabled={busy} onChange={(event) => setConsent(event.target.checked)} />
          <span>{t("I confirm that this complete account name is mine and authorize its use on this certificate. The certificate ID, original issue date and learning evidence will be preserved.")}</span>
        </label>
      </>}
      <div className="certificate-name-actions">
        {hasProfileName && <button type="button" className="credential-button primary" disabled={!consent || busy || !isLoaded || !sessionId} onClick={() => void updateName()}>
          {t(busy ? "Updating certificate name…" : "Update certificate name")}
        </button>}
        <Link className="certificate-name-settings" href="/profile/security#settings-identity">{t("Review your account name")}</Link>
      </div>
      <p role={failed ? "alert" : "status"} aria-live="polite" className="certificate-name-feedback" data-error={failed}>{t(message)}</p>
    </section>
  );
}
