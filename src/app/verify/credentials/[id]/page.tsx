import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CredentialActions from "@/components/credentials/CredentialActions";
import { getCredentialTrustState } from "@/lib/credential-standard";
import { getPublicLearningCredential } from "@/lib/learning-records.server";

export const metadata: Metadata = {
  title: "Verify Learning Credential — TGPI",
  description:
    "Inspect the live status, issuer, identity binding and assessment evidence of a TGPI learning credential.",
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

export default async function VerifyLearningCredentialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const credential = await getPublicLearningCredential(id);
  if (!credential) notFound();

  const trustState = getCredentialTrustState(credential);
  const verified = trustState === "active_verified";
  const revoked = trustState === "revoked";
  const verificationUrl =
    "https://www.theglobalpolymath.com/verify/credentials/" +
    encodeURIComponent(credential.id);
  const downloadUrl =
    "/api/credentials/" +
    encodeURIComponent(credential.id) +
    "?download=1";

  const banner = verified
    ? {
        className: "border-[#4FAE82]/30 bg-[#174E3A]",
        label: "Valid TGPI learning credential",
        symbol: "✓",
      }
    : revoked
      ? {
          className: "border-[#D87D75]/30 bg-[#5B2525]",
          label: "Credential revoked",
          symbol: "×",
        }
      : {
          className: "border-[#D8B75D]/30 bg-[#5A4315]",
          label: "Credential integrity requires review",
          symbol: "!",
        };

  return (
    <main className="min-h-screen bg-[#07172D] px-4 py-8 text-white sm:px-6 sm:py-14">
      <article className="mx-auto max-w-[1180px] overflow-hidden rounded-[34px] border border-white/10 bg-[#0B1F3A] shadow-[0_34px_110px_rgba(0,0,0,.34)]">
        <div className={"border-b px-7 py-5 sm:px-10 " + banner.className}>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm font-extrabold">
              {banner.symbol}
            </span>
            <div>
              <p className="text-sm font-extrabold">{banner.label}</p>
              <p className="mt-0.5 text-xs text-white/65">
                Checked against the live TGPI issuer record
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px]">
          <section className="p-7 sm:p-10 lg:p-12">
            <div className="flex items-center gap-4">
              <Image
                src="/brand/tgpi-crest-v2.webp"
                alt="TGPI crest"
                width={76}
                height={76}
                className="h-16 w-16 object-contain"
                priority
              />
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#E8CC7B]">
                  Public verification record
                </p>
                <p className="mt-1 text-xs font-bold text-[#9EABBC]">
                  Verified Learning Schema 2
                </p>
              </div>
            </div>

            <h1 className="mt-8 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3rem,7vw,6rem)] font-semibold leading-[.91] tracking-[-0.05em]">
              {credential.courseTitle}
            </h1>
            <p className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#E8CC7B]">
              Awarded to
            </p>
            <p className="mt-2 text-3xl font-extrabold">
              {credential.publicName}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#C8D1DE]">
              This public record confirms the credential state and the evidence
              TGPI used at issuance. Private answers, email, account ID and
              reflection text are never exposed here.
            </p>

            <section className="mt-10" aria-labelledby="trust-layers-title">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E8CC7B]">
                    Trust architecture
                  </p>
                  <h2 id="trust-layers-title" className="mt-2 text-3xl font-semibold">
                    Five inspectable layers
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#D5DDE7]">
                  Live lookup
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Issuer", credential.issuer, true],
                  [
                    "Identity",
                    credential.identityEvidence.globalKeyId +
                      " · revision " +
                      credential.identityEvidence.revision,
                    true,
                  ],
                  [
                    "Assessment",
                    credential.assessmentScore +
                      "% achieved · " +
                      credential.masteryThreshold +
                      "% required",
                    credential.assessmentScore >= credential.masteryThreshold,
                  ],
                  [
                    "Record integrity",
                    credential.integrityVerified
                      ? "Server signature valid"
                      : "Signature mismatch or unavailable",
                    credential.integrityVerified,
                  ],
                  [
                    "Public anchor",
                    credential.identityEvidence.anchor.status === "confirmed"
                      ? "Identity proof confirmed on Base Mainnet"
                      : "Identity anchor activation pending",
                    credential.identityEvidence.anchor.status === "confirmed",
                  ],
                ].map(([label, value, passed]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#E8CC7B]">
                        {String(label)}
                      </p>
                      <span
                        className={
                          "grid h-6 w-6 place-items-center rounded-full text-[10px] font-extrabold " +
                          (passed
                            ? "bg-[#DDF1E7] text-[#175D41]"
                            : "bg-[#FFF0BF] text-[#735410]")
                        }
                      >
                        {passed ? "✓" : "•"}
                      </span>
                    </div>
                    <p className="mt-3 break-words text-sm font-bold leading-6 text-[#E7ECF2]">
                      {String(value)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 border-t border-white/10 pt-8" aria-labelledby="evidence-summary-title">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E8CC7B]">
                Evidence summary
              </p>
              <h2 id="evidence-summary-title" className="sr-only">
                Assessment evidence
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {credential.evidenceSummary.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-bold leading-6 text-[#C8D1DE]"
                  >
                    <span className="mr-2 text-[#6CC59A]" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 border-t border-white/10 pt-8" aria-labelledby="skills-title">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E8CC7B]">
                Demonstrated skills
              </p>
              <h2 id="skills-title" className="sr-only">Credential skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {credential.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-[#E7ECF2]"
                  >
                    {skill.name}
                    <span className="ml-2 text-[9px] uppercase text-[#E8CC7B]">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </section>

            <dl className="mt-10 grid gap-5 rounded-[24px] border border-white/10 bg-[#07172D] p-6 sm:grid-cols-2">
              {[
                ["Credential ID", credential.id],
                ["Issued", formatDate(credential.issuedAt)],
                ["Course version", credential.courseVersion],
                ["Learning volume", credential.learningHours + " hours"],
                ["Status", credential.status],
                ["Integrity fingerprint", credential.integrityFingerprint],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#E8CC7B]">
                    {label}
                  </dt>
                  <dd className="mt-2 break-all text-sm font-bold text-[#E7ECF2]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {credential.identityEvidence.anchor.status === "confirmed" ? (
              <a
                href={credential.identityEvidence.anchor.explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-12 items-center rounded-xl border border-[#E5BF5A]/40 px-5 text-sm font-extrabold text-[#E8CC7B]"
              >
                Inspect Base Mainnet anchor ↗
              </a>
            ) : null}

            <div className="mt-10 border-t border-white/10 pt-7 text-xs leading-6 text-[#9EABBC]">
              Standards listed below are implementation alignment targets, not a
              claim that TGPI is accredited or that this product has completed
              external conformance certification.
              <div className="mt-4 flex flex-wrap gap-2">
                {credential.standardsAlignment.map((standard) => (
                  <span
                    key={standard}
                    className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-extrabold text-[#C8D1DE]"
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <aside className="border-t border-white/10 bg-[#07172D] p-7 lg:border-l lg:border-t-0 sm:p-9">
            <CredentialActions
              credentialId={credential.id}
              courseTitle={credential.courseTitle}
              downloadUrl={downloadUrl}
              verificationUrl={verificationUrl}
            />
            <div className="mt-6 rounded-[24px] border border-white/10 p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E8CC7B]">
                About this record
              </p>
              <p className="mt-4 text-xs leading-6 text-[#9EABBC]">
                TGPI verifies learning completed inside its own system. This is
                not a government degree, professional license or third-party
                accreditation.
              </p>
              <Link
                href="/verify"
                className="mt-5 inline-flex text-xs font-extrabold text-[#E8CC7B]"
              >
                Verify another record →
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
