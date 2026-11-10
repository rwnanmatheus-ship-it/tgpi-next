import { getLocale as getFormattingLocale } from "@/lib/localization/server";
import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Link from "next/link";
import { verifyPublicGlobalKey } from "@/lib/global-key.server";

export const dynamic = "force-dynamic";

const sourceMetadata: Metadata = {
  title: "Verify Global Key — TGPI",
  description:
    "Verify the current cryptographic integrity state of a TGPI Global Key proof.",
  robots: { follow: false, index: false },
};

function formatDate(locale: import('@/lib/localization/config').Locale, value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

export default async function VerifyGlobalKeyPage({
  searchParams,
}: {
  searchParams: Promise<{ proof?: string | string[] }>;
}) {
  const locale = await getFormattingLocale();
  const params = await searchParams;
  const proof = typeof params.proof === "string" ? params.proof : "";
  const result = proof
    ? await verifyPublicGlobalKey(proof)
    : ({ status: "invalid" } as const);
  const verified = result.status === "verified";
  const historical = result.status === "historical";
  const unavailable = result.status === "unavailable";
  const anchor = verified || historical ? result.anchor : null;

  return (
    <main className="min-h-screen bg-[#050C14] px-4 py-8 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link className="text-xs font-extrabold text-[#C5D0DB] transition hover:text-white" href="/"><LocalizedText text={"TGPI — The Global Polymath Institute"} /></Link>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#8FA0B2]"><LocalizedText text={"Public verification"} /></span>
        </header>

        <section className={`relative mt-8 overflow-hidden rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:p-10 ${verified ? "border-[#72C79D]/35 bg-[radial-gradient(circle_at_top_right,rgba(51,153,104,0.18),transparent_36%),#081727]" : historical ? "border-[var(--tgpi-gold)]/35 bg-[radial-gradient(circle_at_top_right,rgba(181,138,42,0.18),transparent_36%),#081727]" : "border-[#D66B6B]/30 bg-[radial-gradient(circle_at_top_right,rgba(164,56,56,0.16),transparent_36%),#081727]"}`}>
          <span className={`grid h-16 w-16 place-items-center rounded-2xl border text-3xl ${verified ? "border-[#72C79D]/35 bg-[#72C79D]/10" : historical ? "border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10" : "border-[#D66B6B]/30 bg-[#D66B6B]/10"}`} aria-hidden="true">
            {verified ? "✓" : historical ? "◷" : unavailable ? "…" : "!"}
          </span>
          <p className={`mt-7 text-[10px] font-extrabold uppercase tracking-[0.24em] ${verified ? "text-[#9EDDBD]" : historical ? "text-[var(--tgpi-gold-light)]" : "text-[#F3A3A3]"}`}>
            {verified
              ? <LocalizedText text={"Live integrity confirmed"} />
              : historical
                ? <LocalizedText text={"Authentic historical proof"} />
                : unavailable
                  ? <LocalizedText text={"Verification temporarily unavailable"} />
                : <LocalizedText text={"Proof not verified"} />}
          </p>
          <h1 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            {verified
              ? <LocalizedText text={"This TGPI Global Key is active."} />
              : historical
                ? <LocalizedText text={"This proof has been rotated."} />
                : unavailable
                  ? <LocalizedText text={"Verification could not be completed."} />
                : <LocalizedText text={"This Global Key proof is unavailable."} />}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#AAB9C7]">
            {verified
              ? <LocalizedText text={"The encrypted proof matches the current account-bound record and its complete cryptographic hash chain."} />
              : historical
                ? <LocalizedText text={"The proof was issued by TGPI, but a newer cryptographic revision now represents this Global Key. Request the current verification link from its owner."} />
                : unavailable
                  ? <LocalizedText text={"The TGPI verification service could not reach the current account record. Try this same link again shortly."} />
                : <LocalizedText text={"The link may be incomplete, altered, expired through rotation or no longer connected to an active TGPI record."} />}
          </p>

          {result.status === "verified" || result.status === "historical" ? (
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]"><LocalizedText text={"TGPI Global ID"} /></dt>
                <dd className="mt-3 break-all font-mono text-sm font-bold tracking-[0.06em] text-[var(--tgpi-gold-light)]">{result.keyId}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]"><LocalizedText text={"Current revision"} /></dt>
                <dd className="mt-3 text-lg font-extrabold"><LocalizedText text={"Revision"} />{" "}{result.revision}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-2 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]"><LocalizedText text={"Current fingerprint"} /></dt>
                <dd className="mt-3 break-all font-mono text-xs font-bold leading-6 tracking-[0.06em] text-[#D6E0E9]">{result.fingerprint}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-2 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]"><LocalizedText text={"Integrity chain issued"} /></dt>
                <dd className="mt-3 text-sm font-bold">{formatDate(locale, result.issuedAt)}{" "}<LocalizedText text={"UTC"} /></dd>
              </div>
            </dl>
          ) : null}

          {anchor ? (
            <section
              aria-labelledby="base-proof-title"
              className={`mt-5 rounded-[24px] border p-5 sm:p-6 ${
                anchor.status === "confirmed"
                  ? "border-[#72C79D]/30 bg-[#72C79D]/[0.07]"
                  : anchor.status === "invalid"
                    ? "border-[#D66B6B]/30 bg-[#D66B6B]/[0.07]"
                    : "border-white/10 bg-black/20"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#89A1B5]"><LocalizedText text={"Base Mainnet external receipt"} /></p>
                  <h2
                    className="mt-2 text-xl font-extrabold"
                    id="base-proof-title"
                  >
                    {anchor.status === "confirmed"
                      ? <LocalizedText text={"On-chain anchor independently matched"} />
                      : anchor.status === "invalid"
                        ? <LocalizedText text={"Public anchor did not match"} />
                        : anchor.status === "unavailable"
                          ? <LocalizedText text={"Base verification is temporarily unavailable"} />
                          : anchor.status === "activation_pending"
                            ? <LocalizedText text={"Public anchoring is awaiting activation"} />
                            : <LocalizedText text={"This revision is awaiting its public batch"} />}
                  </h2>
                </div>
                <span
                  className={`rounded-full border px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] ${
                    anchor.status === "confirmed"
                      ? "border-[#72C79D]/30 bg-[#72C79D]/10 text-[#BDE9D2]"
                      : anchor.status === "invalid"
                        ? "border-[#D66B6B]/30 bg-[#D66B6B]/10 text-[#F4B0B0]"
                        : "border-white/10 bg-white/5 text-[#A5B5C4]"
                  }`}
                >
                  {anchor.status === "confirmed"
                    ? <LocalizedText text={"● Base confirmed"} />
                    : anchor.status === "invalid"
                      ? <LocalizedText text={"Mismatch"} />
                      : <LocalizedText text={"Internal proof only"} />}
                </span>
              </div>

              {anchor.status === "confirmed" ? (
                <>
                  <p className="mt-4 text-xs leading-6 text-[#AFC0CE]"><LocalizedText text={"The encrypted TGPI proof produced the expected Merkle leaf, the inclusion path rebuilt the published root, and the Base transaction was signed by an authorized TGPI anchor signer."} /></p>
                  <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <dt className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#7890A3]"><LocalizedText text={"Batch"} /></dt>
                      <dd className="mt-2 break-all font-mono text-[11px] font-bold text-[#DCE6ED]">
                        {anchor.batchId}
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <dt className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#7890A3]"><LocalizedText text={"Base block"} /></dt>
                      <dd className="mt-2 font-mono text-sm font-bold">
                        #{anchor.blockNumber}
                      </dd>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-2">
                      <dt className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#7890A3]"><LocalizedText text={"Published Merkle root"} /></dt>
                      <dd className="mt-2 break-all font-mono text-[10px] font-bold leading-5 text-[#BFE9D3]">
                        {anchor.root}
                      </dd>
                    </div>
                  </dl>
                  <details className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                    <summary className="cursor-pointer text-xs font-extrabold text-[#D8E2EA]"><LocalizedText text={"Inspect privacy-safe Merkle inclusion proof"} /></summary>
                    <div className="mt-4 grid gap-3 text-[10px]">
                      <p className="break-all font-mono leading-5 text-[#9EB1C1]"><LocalizedText text={"Leaf:"} />{" "}{anchor.leaf}
                      </p>
                      <ol className="grid gap-2">
                        {anchor.merkleProof.map((step, index) => (
                          <li
                            className="break-all font-mono leading-5 text-[#8298AA]"
                            key={`${step.hash}-${index}`}
                          ><LocalizedText text={"Path"} />{" "}{index + 1}: {step.hash}
                          </li>
                        ))}
                      </ol>
                      {anchor.merkleProof.length === 0 ? (
                        <p className="text-[#8298AA]"><LocalizedText text={"Single-member batch: the leaf is the root."} /></p>
                      ) : null}
                    </div>
                  </details>
                  <a
                    className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[var(--tgpi-gold)] px-5 text-xs font-extrabold text-[#07182D] transition hover:bg-[#F0C95F]"
                    href={anchor.explorerUrl}
                    rel="noreferrer"
                    target="_blank"
                  ><LocalizedText text={"Inspect transaction on Base ↗"} /></a>
                </>
              ) : (
                <p className="mt-4 text-xs leading-6 text-[#9FAFC0]"><LocalizedText text={"The TGPI identity result above remains separate from the external receipt. No blockchain confirmation is claimed until the Merkle proof and Base transaction both validate."} /></p>
              )}
            </section>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-11 items-center rounded-xl bg-[var(--tgpi-gold)] px-5 text-xs font-extrabold text-[#07182D] transition hover:bg-[#F0C95F]" href="/"><LocalizedText text={"Explore TGPI"} /></Link>
            <Link className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-5 text-xs font-extrabold transition hover:border-[var(--tgpi-gold)]/40" href="/sign-in"><LocalizedText text={"Open my Global Key"} /></Link>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-white/10 bg-[#0A1521] p-5 sm:p-7">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold)]"><LocalizedText text={"Technology disclosure"} /></p>
          <p className="mt-3 text-xs leading-6 text-[#9FAFC0]"><LocalizedText text={"TGPI Integrity Chain combines an authenticated TGPI identity record with privacy-safe Merkle roots periodically written to Base Mainnet. The public chain never receives names, email addresses, Global IDs, documents or private progress. This remains a verification record—not a cryptocurrency, NFT, wallet, passport, academic accreditation or government identity."} /></p>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
