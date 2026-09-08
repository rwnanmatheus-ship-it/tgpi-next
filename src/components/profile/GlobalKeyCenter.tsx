"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useState, useTransition } from "react";
import {
  rotateGlobalKeyAction,
  type RotateGlobalKeyResult,
} from "@/app/global-key/actions";
import type {
  TgpiGlobalKeyBlockView,
  TgpiGlobalKeyView,
} from "@/lib/global-key";

type GlobalKeyCenterProps = {
  initialKey: TgpiGlobalKeyView;
  verifyOrigin: string;
};

type Feedback = { message: string; tone: "error" | "success" } | null;

const connectedSystems = [
  {
    description: "Identity, rank and next actions remain connected.",
    href: "/profile",
    icon: "⌂",
    label: "Workspace",
  },
  {
    description: "Shortlists and comparisons use the same member identity.",
    href: "/compare",
    icon: "⚖️",
    label: "Decisions",
  },
  {
    description: "Preparation records stay private and account-bound.",
    href: "/documents",
    icon: "🛂",
    label: "Documents",
  },
  {
    description: "Course progress follows the authenticated Global Key.",
    href: "/courses",
    icon: "🎓",
    label: "Learning",
  },
] as const;

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

function compactHash(hash: string) {
  if (hash === "GENESIS") return hash;
  return `${hash.slice(0, 10)}…${hash.slice(-8)}`;
}

function ChainBlock({
  block,
  current,
}: {
  block: TgpiGlobalKeyBlockView;
  current: boolean;
}) {
  return (
    <li className="relative pl-12 sm:pl-16">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-xl border font-mono text-[10px] font-extrabold sm:h-11 sm:w-11 ${
          current
            ? "border-[#E5B94B] bg-[#E5B94B] text-[#07182D] shadow-[0_0_28px_rgba(229,185,75,0.28)]"
            : "border-white/15 bg-white/5 text-[#B9C7D5]"
        }`}
      >
        {String(block.sequence).padStart(2, "0")}
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-[-24px] left-[17px] top-11 w-px bg-gradient-to-b from-[#E5B94B]/60 to-white/10 sm:left-[21px] sm:top-14"
      />
      <article
        className={`rounded-2xl border p-4 sm:p-5 ${
          current
            ? "border-[#E5B94B]/35 bg-[#E5B94B]/[0.08]"
            : "border-white/10 bg-white/[0.035]"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#E5B94B]">
              {block.type === "issued" ? "Genesis block" : "Proof rotation"}
            </p>
            <h3 className="mt-1 text-sm font-extrabold text-white">
              {block.type === "issued"
                ? "Global identity anchored"
                : `Integrity revision ${block.sequence}`}
            </h3>
          </div>
          {current ? (
            <span className="rounded-full border border-[#72C79D]/30 bg-[#72C79D]/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#AFE3C7]">
              Current
            </span>
          ) : null}
        </div>
        <dl className="mt-4 grid gap-3 text-[11px] sm:grid-cols-2">
          <div>
            <dt className="text-[#75889B]">Previous hash</dt>
            <dd className="mt-1 font-mono text-[#C2CEDA]">
              {compactHash(block.previousHash)}
            </dd>
          </div>
          <div>
            <dt className="text-[#75889B]">Block hash</dt>
            <dd className="mt-1 font-mono text-[#F0D58C]">
              {compactHash(block.hash)}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-[10px] text-[#75889B]">
          {formatDate(block.timestamp)} UTC
        </p>
      </article>
    </li>
  );
}
export default function GlobalKeyCenter({
  initialKey,
  verifyOrigin,
}: GlobalKeyCenterProps) {
  const [keyView, setKeyView] = useState(initialKey);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [confirmRotation, setConfirmRotation] = useState(false);
  const [isPending, startTransition] = useTransition();
  const verifyUrl = new URL(keyView.verifyPath, verifyOrigin).toString();

  async function copyValue(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback({ message: `${label} copied securely.`, tone: "success" });
    } catch {
      setFeedback({
        message: `Unable to copy ${label.toLowerCase()} on this device.`,
        tone: "error",
      });
    }
  }

  function rotateProof() {
    if (!confirmRotation) {
      setConfirmRotation(true);
      setFeedback({
        message: "Confirm once more to create a new integrity block.",
        tone: "success",
      });
      return;
    }

    startTransition(async () => {
      const result: RotateGlobalKeyResult = await rotateGlobalKeyAction();
      if (!result.ok) {
        setFeedback({ message: result.error, tone: "error" });
        setConfirmRotation(false);
        return;
      }
      setKeyView(result.key);
      setConfirmRotation(false);
      setFeedback({
        message: "New cryptographic proof created and synchronized.",
        tone: "success",
      });
    });
  }

  return (
    <div className="min-h-screen bg-[#050C14] text-white">
      <header className="border-b border-white/10 bg-[#071421]/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-extrabold text-[#D5DEE7] transition hover:border-[#E5B94B]/35 hover:text-white"
            href="/profile"
          >
            <span aria-hidden="true">←</span> Workspace
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-4 text-xs font-extrabold text-[#D5DEE7] transition hover:border-[#E5B94B]/35"
              href="/profile/security#settings-global-key"
            >
              Key settings
            </Link>
            <a
              className="inline-flex min-h-11 items-center rounded-xl bg-[#E5B94B] px-4 text-xs font-extrabold text-[#07182D] transition hover:bg-[#F0C95F]"
              href={verifyUrl}
              rel="noreferrer"
              target="_blank"
            >
              Verify proof ↗
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
        <section className="relative overflow-hidden rounded-[32px] border border-[#E5B94B]/25 bg-[radial-gradient(circle_at_82%_18%,rgba(43,112,168,0.32),transparent_30%),radial-gradient(circle_at_10%_100%,rgba(181,138,42,0.18),transparent_32%),#081727] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.38)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#E5B94B]/35 bg-[#E5B94B]/10 text-2xl shadow-[0_0_34px_rgba(229,185,75,0.14)]" aria-hidden="true">
                  🗝️
                </span>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E5B94B]">
                    TGPI Integrity Chain V1
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#91A4B7]">
                    Cryptographic global identity
                  </p>
                </div>
                <span className="rounded-full border border-[#72C79D]/30 bg-[#72C79D]/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#AFE3C7]">
                  ● Integrity verified
                </span>
              </div>

              <h1 className="mt-7 max-w-4xl font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                One identity. A verifiable chain of trust.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#AFBECC] sm:text-base">
                Your stable TGPI identity now carries an encrypted proof and a tamper-evident history. It connects your workspace without becoming a password, wallet or public data source.
              </p>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-4 sm:p-6">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#7F92A5]">
                  TGPI Global ID
                </p>
                <p className="mt-3 break-all font-mono text-xl font-bold tracking-[0.08em] text-[#F0D58C] sm:text-3xl">
                  {keyView.keyId}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    className="min-h-11 rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-extrabold transition hover:border-[#E5B94B]/45 hover:bg-white/10"
                    onClick={() => copyValue(keyView.keyId, "Global ID")}
                    type="button"
                  >
                    Copy Global ID
                  </button>
                  <button
                    className="min-h-11 rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-extrabold transition hover:border-[#E5B94B]/45 hover:bg-white/10"
                    onClick={() => copyValue(verifyUrl, "Verification link")}
                    type="button"
                  >
                    Copy verification link
                  </button>
                </div>
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur sm:p-6">
              <div className="mx-auto grid w-fit place-items-center rounded-[24px] bg-[#F8F5EE] p-4 shadow-[0_22px_55px_rgba(0,0,0,0.28)]">
                <QRCodeSVG
                  bgColor="#F8F5EE"
                  fgColor="#07182D"
                  level="M"
                  size={180}
                  title="TGPI Global Key verification QR code"
                  value={verifyUrl}
                />
              </div>
              <p className="mt-5 text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5B94B]">
                Live verification
              </p>
              <p className="mt-2 text-center text-xs leading-5 text-[#9FAFC0]">
                The QR contains an encrypted proof. It contains no visible email, password or document data.
              </p>
            </aside>
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Integrity", "Verified", "Cryptographic chain is intact"],
            ["Revision", String(keyView.revision).padStart(2, "0"), "Current signed state"],
            ["Blocks", String(keyView.blocks.length).padStart(2, "0"), "Append-only V1 history"],
            ["Status", "Active", `Issued ${formatDate(keyView.issuedAt)} UTC`],
          ].map(([label, value, detail]) => (
            <article className="rounded-[22px] border border-white/10 bg-[#0A1521] p-5" key={label}>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#778B9F]">{label}</p>
              <p className="mt-2 text-xl font-extrabold text-white">{value}</p>
              <p className="mt-2 text-[11px] leading-5 text-[#8FA0B2]">{detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)]">
          <section aria-labelledby="chain-title" className="rounded-[28px] border border-white/10 bg-[#08131F] p-5 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">Integrity ledger</p>
                <h2 id="chain-title" className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold">Cryptographic block history</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] text-[#A8B7C5]">
                chain:v1
              </span>
            </div>
            <ol className="mt-6 grid gap-6">
              {keyView.blocks.map((block, index) => (
                <ChainBlock block={block} current={index === keyView.blocks.length - 1} key={block.hash} />
              ))}
            </ol>
          </section>

          <div className="grid content-start gap-6">
            <section aria-labelledby="fingerprint-title" className="rounded-[28px] border border-[#E5B94B]/25 bg-[#10243A] p-5 sm:p-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">Cryptographic fingerprint</p>
              <h2 id="fingerprint-title" className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold">Current proof signature</h2>
              <p className="mt-5 break-all font-mono text-sm font-bold leading-7 tracking-[0.08em] text-[#F0D58C]">
                {keyView.fingerprint}
              </p>
              <button
                className="mt-5 min-h-11 rounded-xl border border-white/15 px-4 text-xs font-extrabold transition hover:border-[#E5B94B]/45"
                onClick={() => copyValue(keyView.fingerprint, "Fingerprint")}
                type="button"
              >
                Copy fingerprint
              </button>
            </section>

            <section aria-labelledby="rotate-title" className="rounded-[28px] border border-white/10 bg-[#0A1521] p-5 sm:p-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7F92A5]">Proof control</p>
              <h2 id="rotate-title" className="mt-2 text-xl font-extrabold">Rotate cryptographic proof</h2>
              <p className="mt-3 text-xs leading-6 text-[#95A5B5]">
                Rotation appends a new signed block and invalidates the previous link as a current proof. Your Global ID and account login do not change.
              </p>
              <button
                className={`mt-5 min-h-11 w-full rounded-xl px-4 text-xs font-extrabold transition disabled:cursor-wait disabled:opacity-60 ${
                  confirmRotation
                    ? "bg-[#E5B94B] text-[#07182D] hover:bg-[#F0C95F]"
                    : "border border-white/15 bg-white/5 text-white hover:border-[#E5B94B]/45"
                }`}
                disabled={isPending}
                onClick={rotateProof}
                type="button"
              >
                {isPending
                  ? "Creating secure block…"
                  : confirmRotation
                    ? "Confirm proof rotation"
                    : "Rotate proof"}
              </button>
              {confirmRotation && !isPending ? (
                <button
                  className="mt-3 min-h-10 w-full text-xs font-bold text-[#95A5B5] underline underline-offset-4"
                  onClick={() => {
                    setConfirmRotation(false);
                    setFeedback(null);
                  }}
                  type="button"
                >
                  Cancel
                </button>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-[#2A4B65] bg-[#0B1F3A] p-5 sm:p-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">Security boundary</p>
              <ul className="mt-4 grid gap-3 text-xs leading-5 text-[#B8C5D1]">
                <li>✓ Clerk remains responsible for login, MFA, sessions and recovery.</li>
                <li>✓ Private TGPI progress never enters the public proof.</li>
                <li>✓ The key is not a password, wallet, cryptocurrency or NFT.</li>
                <li>✓ No government, migration or academic credential is implied.</li>
              </ul>
            </section>
          </div>
        </div>

        <section aria-labelledby="connections-title" className="mt-6 rounded-[28px] border border-white/10 bg-[#08131F] p-5 sm:p-7">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">One connected identity</p>
          <h2 id="connections-title" className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold">Synchronized across the TGPI Super App</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {connectedSystems.map((system) => (
              <Link className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-[#E5B94B]/35" href={system.href} key={system.label}>
                <div className="flex items-center justify-between"><span aria-hidden="true" className="text-xl">{system.icon}</span><span aria-hidden="true" className="text-[#E5B94B] transition group-hover:translate-x-0.5">→</span></div>
                <h3 className="mt-3 text-sm font-extrabold">{system.label}</h3>
                <p className="mt-2 text-[11px] leading-5 text-[#8FA0B2]">{system.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-6 rounded-2xl border border-[#E5B94B]/20 bg-[#E5B94B]/[0.06] px-5 py-4 text-xs leading-6 text-[#B8C5D1]">
          <strong className="text-[#F0D58C]">Technology disclosure:</strong> TGPI Integrity Chain uses cryptographic hashing, authenticated encryption and linked records inspired by ledger architecture. V1 is operated by TGPI and is not a decentralized public blockchain.
        </p>

        <div
          aria-live="polite"
          className={`pointer-events-none fixed inset-x-4 bottom-5 z-50 mx-auto max-w-lg transition ${feedback ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          role="status"
        >
          {feedback ? (
            <p className={`rounded-2xl border px-4 py-3 text-center text-xs font-extrabold shadow-2xl backdrop-blur ${feedback.tone === "error" ? "border-[#E98585]/30 bg-[#3A1118]/95 text-[#FFD1D1]" : "border-[#72C79D]/30 bg-[#0B2B21]/95 text-[#C1EBD5]"}`}>
              {feedback.message}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
