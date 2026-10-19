"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./GlobalKeyCenter.module.css";
import CapabilitySystemRail from "@/components/capability/CapabilitySystemRail";
import { QRCodeSVG } from "qrcode.react";
import { useState, useTransition } from "react";
import {
  rotateGlobalKeyAction,
  type RotateGlobalKeyResult,
} from "@/app/global-key/actions";
import type {
  TgpiGlobalKeyAnchorView,
  TgpiGlobalKeyBlockView,
  TgpiGlobalKeyView,
} from "@/lib/global-key";

type GlobalKeyCenterProps = {
  initialKey: TgpiGlobalKeyView;
  verifyOrigin: string;
  memberName: string;
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
    icon: "◎",
    label: "Decisions",
  },
  {
    description: "Preparation records stay private and account-bound.",
    href: "/passport",
    icon: "▤",
    label: "Documents",
  },
  {
    description: "Course progress follows the authenticated Global Key.",
    href: "/courses",
    icon: "▱",
    label: "Learning",
  },
  {
    description: "Verified learning records bind to this same integrity layer.",
    href: "/certificates",
    icon: "◇",
    label: "Certificates",
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
        className={`absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-xl border font-mono text-xs font-extrabold sm:h-11 sm:w-11 ${
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
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E5B94B]">
              {block.type === "issued" ? "Genesis block" : "Proof rotation"}
            </p>
            <h3 className="mt-1 text-sm font-extrabold text-white">
              {block.type === "issued"
                ? "Global identity issued"
                : `Integrity revision ${block.sequence}`}
            </h3>
          </div>
          {current ? (
            <span className="rounded-full border border-[#72C79D]/30 bg-[#72C79D]/10 px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#AFE3C7]">
              Current
            </span>
          ) : null}
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
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
        <p className="mt-3 text-xs text-[#75889B]">
          {formatDate(block.timestamp)} UTC
        </p>
      </article>
    </li>
  );
}

function PublicAnchorPanel({
  anchor,
  onCopy,
}: {
  anchor: TgpiGlobalKeyAnchorView;
  onCopy: (value: string, label: string) => Promise<void>;
}) {
  if (anchor.status !== "confirmed") {
    const activating = anchor.status === "activation_pending";
    return (
      <section
        aria-labelledby="public-anchor-title"
        className="mt-6 overflow-hidden rounded-[28px] border border-[#4D7190]/35 bg-[radial-gradient(circle_at_top_right,rgba(52,125,184,0.2),transparent_32%),#0A1724] p-5 sm:p-7"
      >
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-2xl border border-[#7FB5DC]/25 bg-[#7FB5DC]/10 text-xl"
              >
                ◈
              </span>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8DC4EB]">
                  Base Mainnet · Public Anchor V2
                </p>
                <h2
                  className="mt-1 text-xl font-extrabold text-white"
                  id="public-anchor-title"
                >
                  {activating
                    ? "External anchoring is not active yet"
                    : "Current revision is queued for anchoring"}
                </h2>
              </div>
            </div>
            <p className="mt-4 text-xs leading-6 text-[#A6B8C8] sm:text-sm">
              {activating
                ? "Your TGPI identity is active. External blockchain receipts are not enabled yet; identity integrity and account access continue to work independently."
                : "Your Integrity Chain remains verified now. Its current fingerprint will join the next daily Merkle batch; earlier on-chain receipts remain historically valid after a rotation."}
            </p>
          </div>
          <span className="rounded-full border border-[#8DC4EB]/25 bg-[#8DC4EB]/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#B9DDF6]">
            {activating ? "Activation pending" : "Queued · daily"}
          </span>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="public-anchor-title"
      className="mt-6 overflow-hidden rounded-[28px] border border-[#72C79D]/30 bg-[radial-gradient(circle_at_top_right,rgba(50,157,105,0.19),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(38,99,154,0.2),transparent_36%),#091A25] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-7"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,.6fr)] xl:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-2xl border border-[#72C79D]/30 bg-[#72C79D]/10 text-2xl"
            >
              ⛓️
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8FD8B4]">
                Base Mainnet · Chain ID {anchor.chainId}
              </p>
              <h2
                className="mt-1 font-[var(--tgpi-font-display)] text-2xl font-semibold sm:text-3xl"
                id="public-anchor-title"
              >
                Public anchor confirmed
              </h2>
            </div>
            <span className="rounded-full border border-[#72C79D]/30 bg-[#72C79D]/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#BCE8D1]">
              ● On-chain
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-6 text-[#A8BAC9] sm:text-sm">
            This revision belongs to a Merkle batch recorded outside TGPI
            infrastructure. Base stores only the irreversible root and batch
            metadata—never your Global ID, name, email, documents or private
            progress.
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <dt className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7890A3]">
                Batch
              </dt>
              <dd className="mt-2 break-all font-mono text-sm font-bold text-[#E2EAF0]">
                {anchor.batchId}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <dt className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7890A3]">
                Base block
              </dt>
              <dd className="mt-2 font-mono text-sm font-bold text-white">
                #{anchor.blockNumber}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <dt className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7890A3]">
                Batch members
              </dt>
              <dd className="mt-2 text-sm font-extrabold text-white">
                {anchor.memberCount}
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 sm:p-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7890A3]">
            Merkle root
          </p>
          <p className="mt-3 break-all font-mono text-sm font-bold leading-5 text-[#BFE9D3]">
            {anchor.root}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#E5B94B] px-4 text-xs font-extrabold text-[#07182D] transition hover:bg-[#F0C95F]"
              href={anchor.explorerUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open Base receipt ↗
            </a>
            <button
              className="min-h-11 rounded-xl border border-white/15 px-4 text-xs font-extrabold transition hover:border-[#72C79D]/45"
              onClick={() => onCopy(anchor.root, "Merkle root")}
              type="button"
            >
              Copy root
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GlobalKeyCenter({
  initialKey,
  verifyOrigin,
  memberName,
}: GlobalKeyCenterProps) {
  const [keyView, setKeyView] = useState(initialKey);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showQr, setShowQr] = useState(false);
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
    if (isPending) return;
    if (!confirmRotation) {
      setConfirmRotation(true);
      setFeedback({
        message: "Confirm once more to create a new integrity block.",
        tone: "success",
      });
      return;
    }

    startTransition(async () => {
      try {
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
      } catch {
        setConfirmRotation(false);
        setFeedback({
          message:
            "Connection interrupted. Refresh to check the current proof before retrying.",
          tone: "error",
        });
      }
    });
  }

  return (
    <div className={`${styles.center} min-h-screen bg-[#050C14] text-white`}>
      <header className="border-b border-white/10 bg-[#071421]/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-extrabold text-[#D5DEE7] transition hover:border-[#E5B94B]/35 hover:text-white"
            href="/profile"
          >
            <span aria-hidden="true">←</span> Workspace
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-4 text-xs font-extrabold text-[#D5DEE7] transition hover:border-[#E5B94B]/35"
              href="/profile/security"
            >
              Account security
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

      <main className="tgpi-capability-frame py-6 sm:py-10 lg:py-14">
        <section className="relative mt-6 overflow-hidden rounded-[32px] border border-[#E5B94B]/25 bg-[radial-gradient(circle_at_82%_18%,rgba(43,112,168,0.32),transparent_30%),radial-gradient(circle_at_10%_100%,rgba(181,138,42,0.18),transparent_32%),#081727] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.38)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-[#E5B94B]/35 bg-[#E5B94B]/10 text-2xl shadow-[0_0_34px_rgba(229,185,75,0.14)]"
                  aria-hidden="true"
                >
                  ◇
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#E5B94B]">
                    TGPI Global ID
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#91A4B7]">
                    Your identity. Your progress. Your proof.
                  </p>
                </div>
                <span className="rounded-full border border-[#72C79D]/30 bg-[#72C79D]/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#AFE3C7]">
                  ● Integrity verified
                </span>
              </div>

              <h1 className="mt-7 max-w-4xl font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Your growth deserves an identity.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#AFBECC] sm:text-base">
                One permanent TGPI ID connects your learning, certificates and
                preparation. Keep building your skills and share a verifiable
                proof when you choose.
              </p>

              <div
                className={`${styles.identityCard} mt-8 rounded-[24px] border border-white/10 p-4 sm:p-6`}
              >
                <div className="mb-6 flex items-center gap-4">
                  <Image
                    src="/brand/tgpi-crest-metal-v3-256.png"
                    alt="TGPI crest"
                    width={48}
                    height={58}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-[#B9C7D5]">Member identity</p>
                    <p className="mt-1 break-words text-xl font-semibold text-white">
                      {memberName}
                    </p>
                  </div>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7F92A5]">
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

            <aside className="rounded-[28px] border border-white/10 bg-white/[0.055] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F0D58C]">
                Share with confidence
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Proof on your terms.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#B9C7D5]">
                Your verification link confirms the integrity of this ID. Your
                private learning history and account details stay private.
              </p>
              <button
                type="button"
                aria-expanded={showQr}
                aria-controls="global-id-qr"
                onClick={() => setShowQr(!showQr)}
                className="mt-5 min-h-12 w-full rounded-xl bg-[#E5B94B] px-4 text-sm font-bold text-[#07182D]"
              >
                {showQr ? "Hide verification QR" : "Show verification QR"}
              </button>
              {showQr ? (
                <div id="global-id-qr" className="mt-5">
                  <div className="mx-auto w-fit max-w-full rounded-2xl bg-[#F8F5EE] p-4">
                    <QRCodeSVG
                      bgColor="#F8F5EE"
                      fgColor="#07182D"
                      level="M"
                      size={180}
                      title="TGPI Global ID verification"
                      value={verifyUrl}
                    />
                  </div>
                  <p className="mt-3 text-center text-xs leading-5 text-[#B9C7D5]">
                    Anyone with this QR can verify this proof.
                  </p>
                </div>
              ) : null}
              <Link
                href="/profile/security"
                className="mt-4 flex min-h-11 items-center justify-center rounded-xl border border-white/15 text-sm font-semibold"
              >
                Manage account security →
              </Link>
            </aside>
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Integrity", "Verified", "Your proof passed integrity checks"],
            ["Identity", "Permanent", "Your Global ID stays with your account"],
            [
              "Public anchor",
              keyView.anchor.status === "confirmed" ? "Confirmed" : "Pending",
              "External receipt is tracked separately",
            ],
            ["Status", "Active", `Issued ${formatDate(keyView.issuedAt)} UTC`],
          ].map(([label, value, detail]) => (
            <article
              className="rounded-[22px] border border-white/10 bg-[#0A1521] p-5"
              key={label}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#778B9F]">
                {label}
              </p>
              <p className="mt-2 text-xl font-extrabold text-white">{value}</p>
              <p className="mt-2 text-sm leading-5 text-[#8FA0B2]">{detail}</p>
            </article>
          ))}
        </div>

        <section
          className="mt-6 rounded-[28px] border border-white/10 bg-[#08131F] p-5 sm:p-7"
          aria-labelledby="identity-value-title"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#E5B94B]">
            Make your ID valuable
          </p>
          <h2 id="identity-value-title" className="mt-2 text-2xl font-semibold">
            Build a record you can stand behind.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Develop your skills",
                text: "Continue a practical course and build your learning record.",
                href: "/courses",
                action: "Explore learning",
              },
              {
                step: "02",
                title: "Earn your credentials",
                text: "Complete eligible assessments to earn a TGPI certificate linked to your identity.",
                href: "/certificates",
                action: "View certificates",
              },
              {
                step: "03",
                title: "Prepare your next move",
                text: "Organize country preparation and return to your personal workspace.",
                href: "/passport",
                action: "Open preparation",
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className={`${styles.actionCard} rounded-2xl border border-white/10 p-5`}
              >
                <span className="font-mono text-sm text-[#E5B94B]">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#B9C7D5]">
                  {item.text}
                </p>
                <span className="mt-5 inline-block text-sm font-semibold text-[#F0D58C]">
                  {item.action} →
                </span>
              </Link>
            ))}
          </div>
        </section>
        <details
          className={`${styles.technical} mt-6 rounded-[28px] border border-white/10 bg-[#08131F] p-5 sm:p-7`}
        >
          <summary className="cursor-pointer text-lg font-semibold">
            Security & integrity details{" "}
            <span className="ml-2 text-sm font-normal text-[#B9C7D5]">
              Revision {keyView.revision} · View proof history and controls
            </span>
          </summary>
          <div className="mt-6">
            <CapabilitySystemRail
              active="global-key"
              theme="dark"
              metric={{
                label: "Integrity revision",
                value: String(keyView.revision).padStart(2, "0"),
                detail:
                  "One identity connects learning, preparation and credentials.",
              }}
            />
          </div>
          <PublicAnchorPanel anchor={keyView.anchor} onCopy={copyValue} />

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)]">
            <section
              aria-labelledby="chain-title"
              className="rounded-[28px] border border-white/10 bg-[#08131F] p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">
                    Integrity ledger
                  </p>
                  <h2
                    id="chain-title"
                    className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold"
                  >
                    Cryptographic block history
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-[#A8B7C5]">
                  chain:v2
                </span>
              </div>
              <ol className="mt-6 grid gap-6">
                {keyView.blocks.map((block, index) => (
                  <ChainBlock
                    block={block}
                    current={index === keyView.blocks.length - 1}
                    key={block.hash}
                  />
                ))}
              </ol>
            </section>

            <div className="grid content-start gap-6">
              <section
                aria-labelledby="fingerprint-title"
                className="rounded-[28px] border border-[#E5B94B]/25 bg-[#10243A] p-5 sm:p-7"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">
                  Cryptographic fingerprint
                </p>
                <h2
                  id="fingerprint-title"
                  className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold"
                >
                  Current proof signature
                </h2>
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

              <section
                aria-labelledby="rotate-title"
                className="rounded-[28px] border border-white/10 bg-[#0A1521] p-5 sm:p-7"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7F92A5]">
                  Proof control
                </p>
                <h2 id="rotate-title" className="mt-2 text-xl font-extrabold">
                  Rotate cryptographic proof
                </h2>
                <p className="mt-3 text-xs leading-6 text-[#95A5B5]">
                  Rotation appends a new signed block and queues it for the next
                  public batch. Your previous Base receipt remains a valid
                  historical proof; your Global ID and account login do not
                  change.
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
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">
                  Security boundary
                </p>
                <ul className="mt-4 grid gap-3 text-xs leading-5 text-[#B8C5D1]">
                  <li>
                    ✓ Clerk remains responsible for login, MFA, sessions and
                    recovery.
                  </li>
                  <li>
                    ✓ Base receives only a Merkle root and non-personal batch
                    metadata.
                  </li>
                  <li>
                    ✓ Private TGPI progress never enters the public proof.
                  </li>
                  <li>
                    ✓ The key is not a password, wallet, cryptocurrency or NFT.
                  </li>
                  <li>
                    ✓ No government, migration or academic credential is
                    implied.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </details>

        <section
          aria-labelledby="connections-title"
          className="mt-6 rounded-[28px] border border-white/10 bg-[#08131F] p-5 sm:p-7"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E5B94B]">
            One connected identity
          </p>
          <h2
            id="connections-title"
            className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold"
          >
            Your TGPI, connected.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {connectedSystems.map((system) => (
              <Link
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-[#E5B94B]/35"
                href={system.href}
                key={system.label}
              >
                <div className="flex items-center justify-between">
                  <span aria-hidden="true" className="text-xl">
                    {system.icon}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[#E5B94B] transition group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-extrabold">{system.label}</h3>
                <p className="mt-2 text-sm leading-5 text-[#8FA0B2]">
                  {system.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-6 rounded-2xl border border-[#E5B94B]/20 bg-[#E5B94B]/[0.06] px-5 py-4 text-xs leading-6 text-[#B8C5D1]">
          <strong className="text-[#F0D58C]">Technology disclosure:</strong>{" "}
          TGPI Integrity Chain V2 combines a TGPI-operated authenticated
          identity record with periodic Merkle-root anchoring on Base Mainnet.
          The receipt is publicly auditable, but the Global Key is not a
          cryptocurrency, NFT, wallet, passport or government credential.
        </p>

        <div
          aria-live="polite"
          className={`pointer-events-none fixed inset-x-4 bottom-5 z-50 mx-auto max-w-lg transition ${feedback ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          role="status"
        >
          {feedback ? (
            <p
              className={`rounded-2xl border px-4 py-3 text-center text-xs font-extrabold shadow-2xl backdrop-blur ${feedback.tone === "error" ? "border-[#E98585]/30 bg-[#3A1118]/95 text-[#FFD1D1]" : "border-[#72C79D]/30 bg-[#0B2B21]/95 text-[#C1EBD5]"}`}
            >
              {feedback.message}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
