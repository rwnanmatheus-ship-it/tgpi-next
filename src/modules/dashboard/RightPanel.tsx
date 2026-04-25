export default function RightPanel() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-yellow-400">Current Mission</h3>
        <p className="mt-2 text-sm text-slate-400">
          Move to Canada
        </p>
        <button className="mt-4 w-full rounded-xl bg-yellow-500 py-2 text-black font-bold">
          View Plan
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-yellow-400">AI Advisor</h3>
        <p className="mt-2 text-sm text-slate-400">
          Ask anything about your global journey
        </p>
        <input
          placeholder="Ask something..."
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        />
      </div>
    </div>
  );
}