"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type RecordType = "credential" | "global_id";

export default function VerifyPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [recordType, setRecordType] = useState<RecordType>("credential");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reference = id.trim();
    if (!reference) return;
    router.push(
      recordType === "credential"
        ? `/verify/credentials/${encodeURIComponent(reference)}`
        : `/verify/${encodeURIComponent(reference)}`,
    );
  }

  return (
    <main className="min-h-screen bg-[#07172D] px-4 py-12 text-white sm:px-6 sm:py-20">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-white/10 bg-[#0B1F3A] shadow-[0_32px_110px_rgba(0,0,0,.32)]">
        <div className="grid lg:grid-cols-[1fr_330px]">
          <div className="p-8 sm:p-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E8CC7B]">
              TGPI Verification System
            </p>
            <h1 className="mt-5 max-w-2xl font-[var(--tgpi-font-display)] text-5xl font-semibold leading-[.98] tracking-[-0.04em] sm:text-7xl">
              Trust should be inspectable.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#C8D1DE]">
              Check the current status, issuer and evidence behind a TGPI
              learning credential, or look up a TGPI Global ID.
            </p>

            <form onSubmit={submit} className="mt-9">
              <fieldset>
                <legend className="text-xs font-extrabold text-[#E7ECF2]">Record type</legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {([
                    ["credential", "Learning credential"],
                    ["global_id", "TGPI Global ID"],
                  ] as const).map(([value, label]) => (
                    <label key={value} className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-extrabold ${recordType === value ? "border-[#E5BF5A] bg-[#E5BF5A] text-[#0B1F3A]" : "border-white/15 bg-white/5 text-white"}`}>
                      <input
                        type="radio"
                        name="record-type"
                        value={value}
                        checked={recordType === value}
                        onChange={() => setRecordType(value)}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label htmlFor="verification-reference" className="mt-6 block text-xs font-extrabold text-[#E7ECF2]">
                {recordType === "credential" ? "Credential ID" : "TGPI Global ID"}
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="verification-reference"
                  value={id}
                  onChange={(event) => setId(event.target.value.slice(0, 100))}
                  placeholder={recordType === "credential" ? "TGPI-ENGABR-…" : "TGPI-XXXX-XXXX-XXXX"}
                  autoComplete="off"
                  className="min-h-14 flex-1 rounded-2xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold outline-none placeholder:text-[#758296] focus:border-[#E5BF5A]"
                />
                <button
                  type="submit"
                  disabled={!id.trim()}
                  className="min-h-14 rounded-2xl bg-[#E5BF5A] px-7 text-sm font-extrabold text-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Verify record →
                </button>
              </div>
            </form>
          </div>

          <aside className="border-t border-white/10 bg-white/[0.045] p-8 lg:border-l lg:border-t-0 sm:p-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]">What TGPI verifies</p>
            <div className="mt-7 grid gap-5">
              {[
                ["Issuer", "The organization responsible for the record"],
                ["Status", "Active or revoked at the time of lookup"],
                ["Evidence", "The assessed capabilities behind the result"],
                ["Integrity", "Whether the protected record still matches its signature"],
              ].map(([title, description], index) => (
                <div key={title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[9px] font-extrabold text-[#E8CC7B]">0{index + 1}</span>
                  <div>
                    <p className="text-sm font-extrabold">{title}</p>
                    <p className="mt-1 text-xs leading-6 text-[#9EABBC]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
