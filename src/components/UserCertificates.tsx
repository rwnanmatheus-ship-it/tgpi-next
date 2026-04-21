"use client";

import Link from "next/link";

type CertificateItem = {
  courseId: string;
  issuedAt: string;
};

export default function UserCertificates({
  certificates,
}: {
  certificates: CertificateItem[];
}) {
  if (!certificates || certificates.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-yellow-400">
          Your Certificates
        </h2>
        <p className="mt-3 text-slate-400">
          Complete courses to unlock your first TGPI certificate.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Your Certificates
      </h2>

      <div className="mt-6 space-y-4">
        {certificates.map((certificate, index) => (
          <div
            key={`${certificate.courseId}-${index}`}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">
                {certificate.courseId}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Issued on {new Date(certificate.issuedAt).toLocaleDateString()}
              </p>
            </div>

            <Link
              href={`/certificate/${certificate.courseId}`}
              className="rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400"
            >
              View Certificate
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}