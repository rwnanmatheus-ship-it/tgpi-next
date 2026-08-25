import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/guards";
import { getUserLearningCredential } from "@/lib/learning-records.server";

export const metadata: Metadata = {
  title: "Learning credential | TGPI",
  robots: { follow: false, index: false },
};

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
  const credential = await getUserLearningCredential(session.userId, id);
  if (!credential) notFound();

  return (
    <main className="min-h-screen bg-[#F3EFE6] px-4 py-10 text-[#0B1F3A] sm:px-6 sm:py-16">
      <article className="mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-[#CDBA84] bg-[#FFFDF8] shadow-[0_30px_90px_rgba(11,31,58,.14)]">
        <div className="grid lg:grid-cols-[1fr_330px]">
          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
                TGPI Professional Certificate
              </p>
              <span className="rounded-full bg-[#DDF1E7] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#175D41]">
                {credential.status}
              </span>
            </div>
            <h1 className="mt-8 font-[var(--tgpi-font-display)] text-5xl font-semibold leading-[.98] tracking-[-0.04em] sm:text-7xl">
              {credential.courseTitle}
            </h1>
            <p className="mt-7 text-sm uppercase tracking-[0.14em] text-[#6D7480]">Awarded to</p>
            <p className="mt-2 text-3xl font-extrabold">{credential.publicName}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#657082]">
              This TGPI-issued professional learning credential records
              demonstrated course capability. It is not a government degree,
              professional license or third-party accreditation.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                ["Final score", `${credential.assessmentScore}%`],
                ["Mastery threshold", `${credential.masteryThreshold}%`],
                ["Learning volume", `${credential.learningHours} hours`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#E0D9CB] bg-white p-5">
                  <p className="text-2xl font-extrabold">{value}</p>
                  <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#777E88]">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 border-t border-[#E0D9CB] pt-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">Evidence recorded</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {credential.evidenceSummary.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-[#505966]">
                    <span aria-hidden="true" className="text-[#20815B]">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="bg-[#0B1F3A] p-8 text-white sm:p-10">
            <div className="grid h-full content-between gap-10">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]">Credential record</p>
                <dl className="mt-7 grid gap-6 text-sm">
                  <div><dt className="text-xs text-[#9EABBC]">Credential ID</dt><dd className="mt-1 break-all font-extrabold">{credential.id}</dd></div>
                  <div><dt className="text-xs text-[#9EABBC]">Issued</dt><dd className="mt-1 font-extrabold">{formatDate(credential.issuedAt)}</dd></div>
                  <div><dt className="text-xs text-[#9EABBC]">Course version</dt><dd className="mt-1 font-extrabold">{credential.courseVersion}</dd></div>
                  <div><dt className="text-xs text-[#9EABBC]">Issuer</dt><dd className="mt-1 font-extrabold leading-6">{credential.issuer}</dd></div>
                </dl>
              </div>
              <div className="grid gap-3">
                <Link href={`/verify/credentials/${credential.id}`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#E5BF5A] px-5 text-sm font-extrabold text-[#0B1F3A]">Open public verification</Link>
                <Link href="/certificates" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-extrabold">All credentials</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
