export default function WorkspaceLoading() {
  return <main className="mx-auto max-w-[1600px] p-6" aria-busy="true" aria-label="Loading your private workspace"><p role="status" className="mb-6">Loading your workspace…</p><div className="h-56 rounded-3xl bg-slate-200 motion-safe:animate-pulse" /><div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">{[1,2,3,4].map(id => <div key={id} className="h-28 rounded-2xl bg-slate-200 motion-safe:animate-pulse" />)}</div></main>;
}
