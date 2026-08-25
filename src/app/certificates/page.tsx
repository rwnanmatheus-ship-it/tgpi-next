import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import { listUserLearningCredentials } from "@/lib/learning-records.server";

export const metadata: Metadata = {
  title: "My credentials — TGPI",
  robots: { index: false, follow: false },
};

export default async function CertificatesPage() {
  const session = await requireUser();
  const configured = isLearningStorageConfigured();
  const credentials = configured
    ? await listUserLearningCredentials(session.userId)
    : [];

  return (
    <main className="min-h-[75vh] bg-[#F5F1E8] px-4 py-12 text-[#0B1F3A] sm:px-6">
      <section className="mx-auto max-w-5xl">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">Verified learning</p>
        <h1 className="mt-4 max-w-3xl font-[var(--tgpi-font-display)] text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl">Credentials backed by evidence.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#657082]">Only credentials earned through authenticated completion and protected assessment appear here.</p>

        {!configured ? (
          <div className="mt-9 rounded-[26px] border border-[#D8B75D]/50 bg-[#FFF6D8] p-7">
            <p className="font-extrabold">Secure credential storage is awaiting activation.</p>
            <p className="mt-2 text-sm leading-7 text-[#6F5719]">The experience is installed, but TGPI will not create or display records until server-only credentials are configured.</p>
          </div>
        ) : credentials.length ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {credentials.map((credential) => (
              <Link key={credential.id} href={`/certificates/${credential.id}`} className="group rounded-[26px] border border-[#D8D2C4] bg-[#FFFDF8] p-7 shadow-[0_18px_50px_rgba(11,31,58,.07)] transition hover:-translate-y-1 hover:border-[#C9A84D]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#956A13]">TGPI Professional Certificate</span>
                  <span className="rounded-full bg-[#DDF1E7] px-3 py-1 text-[9px] font-extrabold uppercase text-[#175D41]">{credential.status}</span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold">{credential.courseTitle}</h2>
                <p className="mt-3 text-sm text-[#657082]">Score {credential.assessmentScore}% · {credential.learningHours} learning hours</p>
                <p className="mt-6 break-all text-xs font-extrabold text-[#4E5662]">{credential.id}</p>
                <p className="mt-4 text-sm font-extrabold text-[#956A13]">Open credential →</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-9 overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_24px_70px_rgba(11,31,58,.08)]">
            <div className="grid lg:grid-cols-[1fr_330px]">
              <div className="p-8 sm:p-10">
                <h2 className="text-3xl font-semibold">Your first evidence record starts here.</h2>
                <p className="mt-4 text-sm leading-7 text-[#657082]">Complete the course, pass six performance gates and the integrated capstone, then submit a transfer reflection.</p>
                <Link href="/courses/english-abroad/certification" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white">Open certification path →</Link>
              </div>
              <div className="bg-[#0B1F3A] p-8 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]">Trust standard</p>
                <ul className="mt-5 grid gap-4 text-sm font-bold leading-6 text-[#D5DDE7]">
                  <li>✓ One authenticated learner</li>
                  <li>✓ Server-scored evidence</li>
                  <li>✓ Integrity-protected public record</li>
                  <li>✓ Revocable credential status</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
