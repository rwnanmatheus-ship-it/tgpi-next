'use client';
export default function WorkspaceError({ reset }: { reset: () => void }) {
  return <main className="mx-auto max-w-3xl px-6 py-16"><h1 className="text-3xl font-semibold">Your workspace could not be loaded.</h1><p className="my-5">Check your connection and retry. Your saved activity has not been changed.</p><button className="min-h-11 rounded-xl bg-[#0B2137] px-5 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-4" onClick={reset}>Retry workspace</button></main>;
}
