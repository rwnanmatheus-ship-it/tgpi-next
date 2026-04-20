"use client";

const certificates = [
  {
    id: "cert-english-abroad",
    title: "English for Living Abroad",
    issuedAt: "2026-04-20",
  },
];

export default function CertificatePanel() {
  function shareCertificate(title: string) {
    const text = encodeURIComponent(
      `I completed ${title} on The Global Polymath Institute 🌍`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">Certificates</h2>
      <p className="mt-2 text-slate-400">
        Your completed learning achievements inside TGPI.
      </p>

      <div className="mt-6 space-y-4">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {certificate.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Issued on {certificate.issuedAt}
                </p>
              </div>

              <button
                onClick={() => shareCertificate(certificate.title)}
                className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                Share Certificate
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}