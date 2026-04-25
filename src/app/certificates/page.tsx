import TGPIPageShell from "@/components/TGPIPageShell";

export default function CertificatesPage() {
  return (
    <TGPIPageShell>
      <section>
        <p className="text-sm text-slate-500">Home › Certificates</p>

        <h1 className="mt-4 text-5xl font-bold">
          My <span className="text-yellow-400">certificates</span>
        </h1>

        <p className="mt-4 text-slate-400">
          All certifications you have earned in TGPI.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        {[1, 2].map((c) => (
          <div
            key={c}
            className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5"
          >
            <div>
              <h2 className="font-bold">
                Philosophy & Critical Thinking
              </h2>
              <p className="text-sm text-slate-400">
                Completed on May 2024
              </p>
            </div>

            <button className="rounded-xl bg-yellow-500 px-5 py-2 font-bold text-black">
              View certificate
            </button>
          </div>
        ))}
      </section>
    </TGPIPageShell>
  );
}