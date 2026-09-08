import type { Metadata } from "next";
import Link from "next/link";
import { verifyPublicGlobalKey } from "@/lib/global-key.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Global Key — TGPI",
  description:
    "Verify the current cryptographic integrity state of a TGPI Global Key proof.",
  robots: { follow: false, index: false },
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

export default async function VerifyGlobalKeyPage({
  searchParams,
}: {
  searchParams: Promise<{ proof?: string | string[] }>;
}) {
  const params = await searchParams;
  const proof = typeof params.proof === "string" ? params.proof : "";
  const result = proof
    ? await verifyPublicGlobalKey(proof)
    : ({ status: "invalid" } as const);
  const verified = result.status === "verified";
  const historical = result.status === "historical";
  const unavailable = result.status === "unavailable";

  return (
    <main className="min-h-screen bg-[#050C14] px-4 py-8 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link className="text-xs font-extrabold text-[#C5D0DB] transition hover:text-white" href="/">
            TGPI — The Global Polymath Institute
          </Link>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#8FA0B2]">
            Public verification
          </span>
        </header>

        <section className={`relative mt-8 overflow-hidden rounded-[32px] border p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:p-10 ${verified ? "border-[#72C79D]/35 bg-[radial-gradient(circle_at_top_right,rgba(51,153,104,0.18),transparent_36%),#081727]" : historical ? "border-[#E5B94B]/35 bg-[radial-gradient(circle_at_top_right,rgba(181,138,42,0.18),transparent_36%),#081727]" : "border-[#D66B6B]/30 bg-[radial-gradient(circle_at_top_right,rgba(164,56,56,0.16),transparent_36%),#081727]"}`}>
          <span className={`grid h-16 w-16 place-items-center rounded-2xl border text-3xl ${verified ? "border-[#72C79D]/35 bg-[#72C79D]/10" : historical ? "border-[#E5B94B]/35 bg-[#E5B94B]/10" : "border-[#D66B6B]/30 bg-[#D66B6B]/10"}`} aria-hidden="true">
            {verified ? "✓" : historical ? "◷" : unavailable ? "…" : "!"}
          </span>
          <p className={`mt-7 text-[10px] font-extrabold uppercase tracking-[0.24em] ${verified ? "text-[#9EDDBD]" : historical ? "text-[#F0D58C]" : "text-[#F3A3A3]"}`}>
            {verified
              ? "Live integrity confirmed"
              : historical
                ? "Authentic historical proof"
                : unavailable
                  ? "Verification temporarily unavailable"
                : "Proof not verified"}
          </p>
          <h1 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            {verified
              ? "This TGPI Global Key is active."
              : historical
                ? "This proof has been rotated."
                : unavailable
                  ? "Verification could not be completed."
                : "This Global Key proof is unavailable."}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#AAB9C7]">
            {verified
              ? "The encrypted proof matches the current account-bound record and its complete cryptographic hash chain."
              : historical
                ? "The proof was issued by TGPI, but a newer cryptographic revision now represents this Global Key. Request the current verification link from its owner."
                : unavailable
                  ? "The TGPI verification service could not reach the current account record. Try this same link again shortly."
                : "The link may be incomplete, altered, expired through rotation or no longer connected to an active TGPI record."}
          </p>

          {result.status === "verified" || result.status === "historical" ? (
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]">TGPI Global ID</dt>
                <dd className="mt-3 break-all font-mono text-sm font-bold tracking-[0.06em] text-[#F0D58C]">{result.keyId}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]">Current revision</dt>
                <dd className="mt-3 text-lg font-extrabold">Revision {result.revision}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-2 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]">Current fingerprint</dt>
                <dd className="mt-3 break-all font-mono text-xs font-bold leading-6 tracking-[0.06em] text-[#D6E0E9]">{result.fingerprint}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-2 sm:p-5">
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7E91A4]">Integrity chain issued</dt>
                <dd className="mt-3 text-sm font-bold">{formatDate(result.issuedAt)} UTC</dd>
              </div>
            </dl>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-11 items-center rounded-xl bg-[#E5B94B] px-5 text-xs font-extrabold text-[#07182D] transition hover:bg-[#F0C95F]" href="/">
              Explore TGPI
            </Link>
            <Link className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-5 text-xs font-extrabold transition hover:border-[#E5B94B]/40" href="/sign-in">
              Open my Global Key
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-white/10 bg-[#0A1521] p-5 sm:p-7">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">Technology disclosure</p>
          <p className="mt-3 text-xs leading-6 text-[#9FAFC0]">
            TGPI Integrity Chain is a cryptographic registry operated by TGPI. It uses authenticated encryption and linked hashes inspired by distributed-ledger architecture, but it is not a public blockchain, cryptocurrency, NFT, passport, academic accreditation or government identity.
          </p>
        </section>
      </div>
    </main>
  );
}
