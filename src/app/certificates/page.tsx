import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "My credentials — TGPI",
  robots: { index: false, follow: false },
};

export default async function CertificatesPage() {
  await requireUser();

  return (
    <main className="min-h-[75vh] bg-[#F5F1E8] px-4 py-12 text-[#0B1F3A] sm:px-6">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_28px_80px_rgba(11,31,58,0.11)]">
        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="p-8 sm:p-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">Verified learning</p>
            <h1 className="mt-4 font-[var(--tgpi-font-display)] text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl">Your credentials will mean something.</h1>
            <p className="mt-5 text-base leading-8 text-[#657082]">Certificates appear only after a real course completion has been validated. No sample or fictional credentials are displayed in your account.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white">Explore learning paths</Link>
              <Link href="/profile" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D8D2C4] bg-white px-6 text-sm font-extrabold">Back to workspace</Link>
            </div>
          </div>
          <div className="bg-[#0B1F3A] p-8 text-white sm:p-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">Credential standard</p>
            <div className="mt-7 grid gap-3">
              {["Linked to one authenticated learner", "Issued only after verified completion", "Public reference without private data", "Revocable if integrity is compromised"].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E5BF5A] text-[10px] font-extrabold text-[#0B1F3A]">0{index + 1}</span>
                  <span className="text-sm font-bold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
