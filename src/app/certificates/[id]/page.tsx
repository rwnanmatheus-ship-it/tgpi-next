import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CredentialActions from "@/components/credentials/CredentialActions";
import { getCredentialTrustState } from "@/lib/credential-standard";
import { requireUser } from "@/lib/auth/guards";
import {
  getPublicLearningCredential,
  getUserLearningCredential,
} from "@/lib/learning-records.server";

export const metadata: Metadata = {
  title: "Verified learning credential — TGPI",
  robots: { follow: false, index: false },
};

export const dynamic = "force-dynamic";

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
  const verified = trustState === "active_verified";
  const verificationUrl =
    "https://www.theglobalpolymath.com/verify/credentials/" +
    encodeURIComponent(credential.id);
  const downloadUrl =
    "/api/credentials/" +
    encodeURIComponent(credential.id) +
    "?download=1";

  return (
    <main className="min-h-screen bg-[#EDE8DE] px-4 py-8 text-[#0B1F3A] print:bg-white print:p-0 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-[1180px] overflow-hidden rounded-[34px] border border-[#CDBA84] bg-[#FFFDF8] shadow-[0_34px_100px_rgba(11,31,58,.16)] print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        <div className="h-2 bg-gradient-to-r from-[#07172D] via-[#C9A84D] to-[#275F9A]" />
        <div className="grid lg:grid-cols-[1fr_330px]">
          <section className="relative p-7 sm:p-12 lg:p-14">
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
                    width={82}
                    height={82}
                    className="h-[68px] w-[68px] object-contain sm:h-[82px] sm:w-[82px]"
                    priority
                  />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
                      TGPI Verified Learning Credential
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#6D7480]">
                      Schema 2 · Evidence-backed
                    </p>
                  </div>
                </div>
                <span
                  className={
                    "rounded-full px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] " +
                    (verified
                      ? "bg-[#DDF1E7] text-[#175D41]"
                      : "bg-[#FFF0BF] text-[#735410]")
                  }
                >
                  {verified ? "Active · integrity verified" : "Requires review"}
                </span>
              </div>

              <p className="mt-12 text-xs font-extrabold uppercase tracking-[0.16em] text-[#6D7480]">
                Professional certificate
              </p>
              <h1 className="mt-4 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3rem,7vw,6.4rem)] font-semibold leading-[.9] tracking-[-0.055em]">
                {credential.courseTitle}
              </h1>

              <p className="mt-9 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#956A13]">
                Awarded to
              </p>
              <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
                {credential.publicName}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#657082]">
                TGPI confirms that this learner completed the required learning
                path and demonstrated the recorded capabilities through
                authenticated, server-scored evidence.
              </p>

              <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Final score", credential.assessmentScore + "%"],
                  ["Mastery required", credential.masteryThreshold + "%"],
                  ["Learning volume", credential.learningHours + " hours"],
                  ["Issued", formatDate(credential.issuedAt)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#E0D9CB] bg-white/80 p-5">
                    <dt className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#777E88]">
                      {label}
                    </dt>
                    <dd className="mt-2 text-xl font-extrabold">{value}</dd>
                  </div>
                ))}
              </dl>

              <section className="mt-10 border-t border-[#E0D9CB] pt-8" aria-labelledby="capabilities-title">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">
                  Demonstrated capabilities
                </p>
                <h2 id="capabilities-title" className="mt-3 text-2xl font-semibold">
                  Skills connected to assessment evidence
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {credential.skills.map((skill) => (
                    <div key={skill.id} className="rounded-2xl border border-[#E0D9CB] bg-white p-4">
                      <p className="font-extrabold">{skill.name}</p>
                      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#956A13]">
                        {skill.level} evidence
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-9 border-t border-[#E0D9CB] pt-8" aria-labelledby="evidence-title">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">
                  Evidence record
                </p>
                <h2 id="evidence-title" className="sr-only">Credential evidence</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {credential.evidenceSummary.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-[#505966]">
                      <span aria-hidden="true" className="text-[#20815B]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-10 border-t border-[#E0D9CB] pt-6 text-xs leading-6 text-[#6D7480]">
                This is a TGPI-issued professional learning record. It is not a
                government degree, professional license or third-party
                accreditation.
              </div>
            </div>
          </section>

          <aside className="bg-[#07172D] p-7 text-white print:hidden sm:p-9">
            <div className="grid gap-6">
              <CredentialActions
                credentialId={credential.id}
                courseTitle={credential.courseTitle}
                downloadUrl={downloadUrl}
                verificationUrl={verificationUrl}
              />

              <section className="rounded-[24px] border border-white/10 p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]">
                  Trust chain
                </p>
                <dl className="mt-5 grid gap-5 text-sm">
                  <div>
                    <dt className="text-xs text-[#9EABBC]">Credential ID</dt>
                    <dd className="mt-1 break-all font-extrabold">{credential.id}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9EABBC]">TGPI Global Key</dt>
                    <dd className="mt-1 break-all font-extrabold">
                      {credential.identityEvidence.globalKeyId}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9EABBC]">Identity revision</dt>
                    <dd className="mt-1 font-extrabold">
                      {credential.identityEvidence.revision}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9EABBC]">Public anchor</dt>
                    <dd className="mt-1 font-extrabold">
                      {credential.identityEvidence.anchor.status === "confirmed"
                        ? "Confirmed on Base"
                        : "Operational activation pending"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9EABBC]">Record fingerprint</dt>
                    <dd className="mt-1 break-all font-mono text-[11px] font-bold text-[#D5DDE7]">
                      {publicCredential.integrityFingerprint}
                    </dd>
                  </div>
                </dl>
              </section>

              <Link
                href="/certificates"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 text-sm font-extrabold"
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
