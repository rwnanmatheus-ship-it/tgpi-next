export default function GlobalIdentityLoading() {
  return (
    <main
      aria-busy="true"
      aria-labelledby="identity-loading-title"
      className="min-h-[65vh] bg-[#050C14] px-4 py-10 text-white"
    >
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0B1F3A] p-6 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E5B94B]">
          TGPI Global ID
        </p>
        <h1
          id="identity-loading-title"
          role="status"
          className="mt-4 text-2xl font-semibold"
        >
          Loading your identity…
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">
          Checking your private record and proof integrity.
        </p>
        <div aria-hidden="true" className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-40 rounded-2xl border border-white/10 bg-white/5" />
          <div className="h-40 rounded-2xl border border-white/10 bg-white/5" />
        </div>
      </div>
    </main>
  );
}
