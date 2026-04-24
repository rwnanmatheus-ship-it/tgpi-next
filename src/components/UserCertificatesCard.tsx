export default function UserCertificatesCard() {
  const certificates = [
    {
      title: "TGPI Global Foundations Certificate",
      status: "Verified",
      level: "Foundation",
    },
    {
      title: "International Mobility Preparation",
      status: "In progress",
      level: "Professional",
    },
    {
      title: "Cultural Intelligence Certificate",
      status: "Locked",
      level: "Elite",
    },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Meus Certificados</h2>
        <span className="text-xs text-yellow-400">TGPI Verified</span>
      </div>

      <div className="space-y-3">
        {certificates.map((cert) => (
          <div
            key={cert.title}
            className="rounded-xl border border-white/10 bg-black/30 p-4"
          >
            <p className="font-semibold">{cert.title}</p>
            <p className="mt-1 text-sm text-slate-400">{cert.level}</p>
            <p
              className={`mt-2 text-xs font-bold ${
                cert.status === "Verified"
                  ? "text-green-400"
                  : cert.status === "Locked"
                  ? "text-red-300"
                  : "text-yellow-300"
              }`}
            >
              {cert.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}