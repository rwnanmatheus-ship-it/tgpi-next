"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type RecordType = "credential" | "global_key";

export default function VerifyPage() {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [recordType, setRecordType] = useState<RecordType>("credential");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = reference.trim();
    if (!value) return;
    if (recordType === "credential") {
      router.push("/verify/credentials/" + encodeURIComponent(value));
      return;
    }
    router.push("/verify/global-key?proof=" + encodeURIComponent(value));
  }

  return (
    <main className="min-h-screen bg-[#07172D] px-4 py-10 text-white sm:px-6 sm:py-16">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-white/10 bg-[#0B1F3A] shadow-[0_32px_110px_rgba(0,0,0,.32)]">
        <div className="grid lg:grid-cols-[1fr_370px]">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E8CC7B]">
              TGPI Public Trust Registry
            </p>
            <h1 className="mt-5 max-w-3xl font-[var(--tgpi-font-display)] text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[.9] tracking-[-0.05em]">
              Verify the claim. Inspect the evidence.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#C8D1DE]">
              Confirm the live status, issuer, assessed skills, identity binding
              and integrity state behind a TGPI learning credential.
            </p>

            <form onSubmit={submit} className="mt-10">
              <fieldset>
                <legend className="text-xs font-extrabold text-[#E7ECF2]">
                  Record type
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {([
                    ["credential", "Learning credential"],
                    ["global_key", "Global Key proof"],
                  ] as const).map(([value, label]) => (
                    <label
                      key={value}
                      className={
                        "cursor-pointer rounded-full border px-4 py-2 text-xs font-extrabold transition " +
                        (recordType === value
                          ? "border-[#E5BF5A] bg-[#E5BF5A] text-[#0B1F3A]"
                          : "border-white/15 bg-white/5 text-white")
                      }
                    >
                      <input
                        type="radio"
                        name="record-type"
                        value={value}
                        checked={recordType === value}
                        onChange={() => {
                          setRecordType(value);
                          setReference("");
                        }}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label
                htmlFor="verification-reference"
                className="mt-7 block text-xs font-extrabold text-[#E7ECF2]"
              >
                {recordType === "credential"
                  ? "Credential ID"
                  : "Portable Global Key proof"}
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="verification-reference"
                  value={reference}
                  onChange={(event) =>
                    setReference(event.target.value.slice(0, 2200))
                  }
                  placeholder={
                    recordType === "credential"
                      ? "TGPI-ENGABR-…"
                      : "TGK1.…"
                  }
                  autoComplete="off"
                  spellCheck={false}
                  className="min-h-14 flex-1 rounded-2xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold outline-none placeholder:text-[#758296] focus:border-[#E5BF5A]"
                />
                <button
                  type="submit"
                  disabled={!reference.trim()}
                  className="min-h-14 rounded-2xl bg-[#E5BF5A] px-7 text-sm font-extrabold text-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Verify record →
                </button>
              </div>
            </form>
          </div>

          <aside className="border-t border-white/10 bg-white/[0.045] p-8 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]">
              Verification layers
            </p>
            <div className="mt-7 grid gap-5">
              {[
                ["Identity", "Authenticated learner and TGPI Global Key binding"],
                ["Evidence", "Lessons, assessment gates, capstone and reflection"],
                ["Integrity", "Signed record checked against its current source"],
                ["Status", "Active or revoked at the exact time of lookup"],
                ["Portability", "Downloadable evidence record with live verification URL"],
              ].map(([title, description], index) => (
                <div key={title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[9px] font-extrabold text-[#E8CC7B]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">{title}</p>
                    <p className="mt-1 text-xs leading-6 text-[#9EABBC]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-[#9EABBC]">
              Verification confirms a TGPI-issued learning record. It does not
              convert that record into government or third-party accreditation.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
