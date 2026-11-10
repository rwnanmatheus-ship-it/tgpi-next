"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { submitVerificationReference } from "@/app/verify/actions";
import { MAX_VERIFICATION_REFERENCE, readVerificationReference } from "@/lib/certificate-reference";

type RecordType = "credential" | "global_key";
type LookupError = "invalid" | "legacy";

export default function CredentialVerificationForm({
  initialError,
  initialType = "credential",
}: {
  initialError?: LookupError;
  initialType?: RecordType;
}) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [recordType, setRecordType] = useState<RecordType>(initialType);
  const [invalid, setInvalid] = useState(initialError === "invalid");
  const [legacy, setLegacy] = useState(initialError === "legacy");
  const [clipboardHelp, setClipboardHelp] = useState(false);
  const [pending, startTransition] = useTransition();

  async function paste() {
    const field = input.current;
    field?.focus();
    try {
      const value = (await navigator.clipboard.readText()).trim();
      if (field !== input.current || !field || document.activeElement !== field) return;
      if (!value || value.length > field.maxLength) {
        setClipboardHelp(true);
        return;
      }
      field.value = value;
      setInvalid(false);
      setLegacy(false);
      setClipboardHelp(false);
    } catch {
      if (field === input.current) setClipboardHelp(true);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const value = String(new FormData(event.currentTarget).get("reference") ?? "").trim();
    const destination = readVerificationReference(value, window.location.origin);

    if (!destination) {
      setLegacy(false);
      setInvalid(true);
      input.current?.focus();
      return;
    }
    startTransition(() => router.push(destination.href));
  }

  return (
    <form action={submitVerificationReference} onSubmit={submit} className="credential-lookup" aria-busy={pending}>
      <fieldset disabled={pending}>
        <legend className="sr-only"><LocalizedText text="Record type" /></legend>
        <div className="credential-lookup-types">
          {([
            ["credential", "Learning credential"],
            ["global_key", "Global ID proof"],
          ] as const).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name="type"
                value={value}
                checked={recordType === value}
                onChange={() => {
                  setRecordType(value);
                  setInvalid(false);
                  setLegacy(false);
                  setClipboardHelp(false);
                }}
                className="sr-only"
              />
              <span><LocalizedText text={label} /></span>
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor="verification-reference">
        <LocalizedText text={recordType === "credential" ? "Certificate ID or verification link" : "Global ID proof or verification link"} />
      </label>
      <div className="credential-lookup-entry">
        <div className="credential-lookup-field">
          <input
            key={recordType}
            ref={input}
            id="verification-reference"
            name="reference"
            required
            disabled={pending}
            maxLength={MAX_VERIFICATION_REFERENCE}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid || legacy ? "verification-reference-error" : "verification-reference-hint"}
            placeholder={recordType === "credential" ? "TGPI-ENGABR-…" : "TGK1.A.…"}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            onChange={() => {
              setInvalid(false);
              setLegacy(false);
              setClipboardHelp(false);
            }}
          />
          <button type="button" onClick={() => void paste()} disabled={pending} className="credential-paste">
            <LocalizedText text="Paste" />
          </button>
        </div>
        <button type="submit" className="credential-hub-button" disabled={pending}>
          <LocalizedText text={pending ? "Checking record…" : "Verify record →"} />
        </button>
      </div>
      <p id="verification-reference-hint" className="credential-lookup-hint">
        <LocalizedText text={recordType === "credential" ? "Find the certificate ID next to the QR code on your document." : "Paste the official TGPI link or the proof code."} />
      </p>
      {(invalid || legacy) && (
        <p id="verification-reference-error" className="credential-lookup-error" role="alert">
          <LocalizedText text={legacy
            ? "This older link does not contain a certificate ID. Enter the ID printed on the certificate."
            : recordType === "credential"
              ? "Enter the certificate ID printed on your document or paste its official TGPI verification link."
              : "Enter an official TGPI verification link or a valid proof code."} />
        </p>
      )}
      {clipboardHelp && (
        <LocalizedElement as="p" role="status" className="credential-lookup-hint">
          <LocalizedText text="Paste the reference directly into the field." />
        </LocalizedElement>
      )}
    </form>
  );
}
