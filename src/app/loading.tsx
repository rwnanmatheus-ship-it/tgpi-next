export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading TGPI"
      className="min-h-[62vh] bg-[var(--tgpi-canvas)] px-4 py-12 sm:px-6"
      id="main-content"
      role="status"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-3 w-40 rounded-full bg-[var(--tgpi-gold-soft)]" />
        <div className="mt-5 h-10 max-w-xl rounded-2xl bg-[var(--tgpi-border-soft)]" />
        <div className="mt-3 h-4 max-w-md rounded-full bg-[var(--tgpi-border-soft)]" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="h-44 rounded-[1.75rem] border border-[var(--tgpi-border-soft)] bg-white" />
          <div className="h-44 rounded-[1.75rem] border border-[var(--tgpi-border-soft)] bg-white" />
          <div className="h-44 rounded-[1.75rem] border border-[var(--tgpi-border-soft)] bg-white" />
        </div>
        <span className="sr-only">Loading the latest TGPI experience…</span>
      </div>
    </main>
  );
}
