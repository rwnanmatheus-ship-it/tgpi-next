import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicLearningCredential } from "@/lib/learning-records.server";

export const metadata: Metadata = {
  title: "Verify learning credential | TGPI",
  description: "Verify the status and evidence of a TGPI learning credential.",
};

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
  const verified = credential.integrityVerified && credential.status === "active";

  return (
    <main className="min-h-screen bg-[#07172D] px-4 py-12 text-white sm:px-6 sm:py-20">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1F3A] shadow-[0_30px_100px_rgba(0,0,0,.3)]">
        <div className={`border-b px-7 py-5 sm:px-10 ${verified ? "border-[#4FAE82]/30 bg-[#174E3A]" : "border-[#D8B75D]/30 bg-[#5A4315]"}`}>
          <p className="text-sm font-extrabold">{verified ? "✓ Valid TGPI credential" : "Credential requires review"}</p>
        </div>
        <div className="p-7 sm:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#E8CC7B]">Public verification record</p>
          <h1 className="mt-5 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.03em] sm:text-6xl">{credential.courseTitle}</h1>
          <p className="mt-7 text-sm uppercase tracking-[0.14em] text-[#9EABBC]">Awarded to</p>
          <p className="mt-2 text-2xl font-extrabold">{credential.publicName}</p>

          <dl className="mt-9 grid gap-5 rounded-[24px] border border-white/10 bg-white/[0.045] p-6 sm:grid-cols-2">
            {[
              ["Credential ID", credential.id],
              ["Issued", formatDate(credential.issuedAt)],
              ["Final score", `${credential.assessmentScore}%`],
              ["Mastery threshold", `${credential.masteryThreshold}%`],
              ["Learning volume", `${credential.learningHours} hours`],
              ["Course version", credential.courseVersion],
              ["Status", credential.status],
              ["Integrity", credential.integrityVerified ? "Signature valid" : "Not verified"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#E8CC7B]">{label}</dt>
                <dd className="mt-2 break-all text-sm font-bold text-[#E7ECF2]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="text-xl font-extrabold">Evidence summary</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {credential.evidenceSummary.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-bold leading-6 text-[#C8D1DE]">✓ {item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-[#9EABBC]">
            Issued by {credential.issuer}. This record confirms a TGPI course
            assessment; it is not a government degree, professional license or
            claim of third-party accreditation.
          </div>
          <Link href="/courses" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[#E5BF5A] px-6 text-sm font-extrabold text-[#0B1F3A]">Explore TGPI Learning</Link>
        </div>
      </article>
    </main>
  );
}
