export default function CountryNotFound() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-10 text-center">
        <div className="mb-4 text-5xl">🌍</div>

        <h1 className="mb-4 text-4xl font-bold text-yellow-400">
          Country Pathway Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-slate-300">
          This country pathway is not available yet in the current TGPI system.
          Explore the active countries or return to the main platform.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/countries"
            className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Explore Countries
          </a>

          <a
            href="/"
            className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
          >
            Back Home
          </a>
        </div>
      </div>
    </div>
  );
}