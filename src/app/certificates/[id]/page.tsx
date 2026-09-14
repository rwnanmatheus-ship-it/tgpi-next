import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CredentialActions from "@/components/credentials/CredentialActions";
import {
  getCredentialTrustState,
  type CredentialTrustState,
} from "@/lib/credential-standard";
import { requireUser } from "@/lib/auth/guards";
import {
  getPublicLearningCredential,
  getUserLearningCredential,
} from "@/lib/learning-records.server";

export const metadata: Metadata = {
  title: "Verified learning credential — TGPI",
  description:
    "Private owner view of a TGPI evidence-backed learning credential.",
  robots: { follow: false, index: false },
};

export const dynamic = "force-dynamic";

const TRUST_PRESENTATION = {
  active_verified: {
    badge: "Active · integrity verified",
    badgeClassName: "bg-[#DDF1E7] text-[#175D41]",
    bannerClassName: "border-[#4FAE82]/25 bg-[#E6F4EC] text-[#175D41]",
    description:
      "The live issuer record is active and its server signature is valid.",
    label: "Credential verified",
    symbol: "✓",
  },
  integrity_review: {
    badge: "Integrity review required",
    badgeClassName: "bg-[#FFF0BF] text-[#735410]",
    bannerClassName: "border-[#D8B75D]/40 bg-[#FFF6D8] text-[#6F5719]",
    description:
      "The record could not pass every integrity check. Do not present it as verified.",
    label: "Verification requires review",
    symbol: "!",
  },
  revoked: {
    badge: "Revoked · inactive",
    badgeClassName: "bg-[#F4DEDE] text-[#7E2D2D]",
    bannerClassName: "border-[#C26A6A]/35 bg-[#F8E7E7] text-[#762D2D]",
    description:
      "TGPI retains this issuance history, but the credential is no longer active.",
    label: "Credential revoked",
    symbol: "×",
  },
} satisfies Record<
  CredentialTrustState,
  {
    badge: string;
    badgeClassName: string;
    bannerClassName: string;
    description: string;
    label: string;
    symbol: string;
  }
>;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function CredentialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireUser();
  const { id } = await params;
  const [credential, publicCredential] = await Promise.all([
    getUserLearningCredential(session.userId, id),
    getPublicLearningCredential(id),
  ]);
  if (!credential || !publicCredential) notFound();

  const trustState = getCredentialTrustState(publicCredential);
  const trust = TRUST_PRESENTATION[trustState];
  const verificationUrl =
    "https://www.theglobalpolymath.com/verify/credentials/" +
    encodeURIComponent(credential.id);
  const downloadUrl =
    "/api/credentials/" +
    encodeURIComponent(credential.id) +
    "?download=1";

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#EDE8DE] px-4 py-7 text-[#0B1F3A] print:bg-white print:p-0 sm:px-6 sm:py-12"
    >
      <div className="mx-auto mb-5 flex max-w-[1220px] flex-wrap items-center justify-between gap-3 print:hidden">
        <nav
          aria-label="Credential navigation"
          className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#6D7480]"
        >
          <Link href="/profile" className="transition hover:text-[#0B1F3A]">
            Workspace
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/certificates" className="transition hover:text-[#0B1F3A]">
            Credentials
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#956A13]">Record</span>
        </nav>
        <Link
          href={verificationUrl}
          className="inline-flex min-h-11 items-center rounded-full border border-[#CDBA84] bg-white px-4 text-xs font-extrabold text-[#0B1F3A] transition hover:border-[#956A13]"
        >
          Inspect public view →
        </Link>
      </div>

      <article className="mx-auto max-w-[1220px] overflow-hidden rounded-[34px] border border-[#CDBA84] bg-[#FFFDF8] shadow-[0_34px_100px_rgba(11,31,58,.16)] print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        <div className="h-2 bg-gradient-to-r from-[#07172D] via-[#C9A84D] to-[#275F9A]" />

        <div className={"border-b px-7 py-4 sm:px-10 " + trust.bannerClassName}>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/65 text-sm font-extrabold">
              {trust.symbol}
            </span>
            <div>
              <p className="text-sm font-extrabold">{trust.label}</p>
              <p className="mt-0.5 text-xs opacity-75">{trust.description}</p>
            </div>
          </div>
        </div>

        <div className="grid print:grid-cols-[1fr_260px] lg:grid-cols-[1fr_350px]">
          <section className="relative p-7 sm:p-11 lg:p-14 print:p-8">
            <div className="pointer-events-none absolute right-8 top-8 opacity-[.035] sm:right-12 sm:top-12">
              <Image
                src="/brand/tgpi-crest-v2.webp"
                alt=""
                width={310}
                height={310}
                className="h-56 w-56 object-contain sm:h-72 sm:w-72"
              />
            </div>

            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <Image
                    src="/brand/tgpi-crest-v2.webp"
                    alt="TGPI crest"
                    width={88}
                    height={88}
                    className="h-[72px] w-[72px] object-contain sm:h-[88px] sm:w-[88px]"
                    priority
                  />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
                      TGPI Verified Learning Credential
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#6D7480]">
                      Schema {credential.credentialSchemaVersion} · Evidence-backed
                    </p>
                  </div>
                </div>
                <span
                  className={
                    "rounded-full px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] " +
                    trust.badgeClassName
                  }
                >
                  {trust.badge}
                </span>
              </div>

              <p className="mt-11 text-xs font-extrabold uppercase tracking-[0.16em] text-[#6D7480]">
                {credential.achievementType}
              </p>
              <h1 className="mt-4 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3.3rem,7vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.055em] print:text-6xl">
                {credential.courseTitle}
              </h1>

              <div className="mt-9 border-l-2 border-[#C9A84D] pl-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#956A13]">
                  Awarded to
                </p>
                <p className="mt-2 font-[var(--tgpi-font-display)] text-4xl font-semibold sm:text-5xl">
                  {credential.publicName}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#657082]">
                  TGPI confirms that this learner completed the required applied
                  learning path and demonstrated the capabilities below through
                  authenticated, server-scored evidence.
                </p>
              </div>

              <dl className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 print:grid-cols-2">
                {[
                  ["Final mastery", credential.assessmentScore + "%"],
                  ["Required", credential.masteryThreshold + "%"],
                  ["Learning volume", credential.learningHours + " hours"],
                  ["Issued", formatDate(credential.issuedAt)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#E0D9CB] bg-white/80 p-5"
                  >
                    <dt className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#777E88]">
                      {label}
                    </dt>
                    <dd className="mt-2 text-xl font-extrabold">{value}</dd>
                  </div>
                ))}
              </dl>

              <section
                className="mt-10 border-t border-[#E0D9CB] pt-8"
                aria-labelledby="capabilities-title"
              >
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">
                  Demonstrated capabilities
                </p>
                <h2
                  id="capabilities-title"
                  className="mt-3 text-3xl font-semibold"
                >
                  Skills connected to assessment evidence
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {credential.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="rounded-2xl border border-[#E0D9CB] bg-white p-4"
                    >
                      <p className="font-extrabold">{skill.name}</p>
                      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#956A13]">
                        {skill.level} evidence
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section
                className="mt-9 border-t border-[#E0D9CB] pt-8"
                aria-labelledby="evidence-title"
              >
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">
                  Evidence dossier
                </p>
                <h2 id="evidence-title" className="sr-only">
                  Credential evidence
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {credential.evidenceSummary.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-[#E7E1D5] bg-white/65 p-4 text-sm font-bold leading-6 text-[#505966]"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[#20815B]"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-9 grid gap-4 border-t border-[#E0D9CB] pt-7 text-xs leading-6 text-[#6D7480] sm:grid-cols-2">
                <div>
                  <p className="font-extrabold text-[#0B1F3A]">Issuer</p>
                  <p className="mt-1">{credential.issuer}</p>
                </div>
                <div>
                  <p className="font-extrabold text-[#0B1F3A]">Scope</p>
                  <p className="mt-1">
                    TGPI-issued professional learning record. Not a government
                    degree, professional license or third-party accreditation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="border-t border-white/10 bg-[#07172D] p-7 text-white print:border-l print:border-t-0 print:border-[#D8D2C4] print:bg-white print:p-5 print:text-[#0B1F3A] lg:border-l lg:border-t-0 sm:p-9">
            <div className="grid gap-6">
              <CredentialActions
                credentialId={credential.id}
                courseTitle={credential.courseTitle}
                downloadUrl={downloadUrl}
                verificationUrl={verificationUrl}
              />

              <section className="rounded-[24px] border border-white/10 p-6 print:border-[#D8D2C4] print:p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B] print:text-[#79571D]">
                  Trust chain
                </p>
                <dl className="mt-5 grid gap-5 text-sm">
                  <div>
                    <dt className="text-xs text-[#9EABBC] print:text-[#59636F]">
                      TGPI Global Key
                    </dt>
                    <dd className="mt-1 break-all font-extrabold">
                      {credential.identityEvidence.globalKeyId}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9EABBC] print:text-[#59636F]">
                      Identity revision
                    </dt>
                    <dd className="mt-1 font-extrabold">
                      {credential.identityEvidence.revision}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9EABBC] print:text-[#59636F]">
                      Public anchor
                    </dt>
                    <dd className="mt-1 font-extrabold">
                      {credential.identityEvidence.anchor.status === "confirmed"
                        ? "Confirmed on Base Mainnet"
                        : "Operational activation pending"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9EABBC] print:text-[#59636F]">
                      Record fingerprint
                    </dt>
                    <dd className="mt-1 break-all font-mono text-[10px] font-bold leading-5 text-[#D5DDE7] print:text-[#0B1F3A]">
                      {publicCredential.integrityFingerprint}
                    </dd>
                  </div>
                </dl>
              </section>

              <div className="rounded-[24px] border border-white/10 p-6 text-xs leading-6 text-[#9EABBC] print:border-[#D8D2C4] print:p-4 print:text-[#59636F]">
                <p className="font-extrabold text-white print:text-[#0B1F3A]">
                  Current lifecycle status
                </p>
                <p className="mt-2">{trust.description}</p>
              </div>

              <Link
                href="/certificates"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 text-sm font-extrabold print:hidden"
              >
                Back to portfolio
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
