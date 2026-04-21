export default function ReferralSystem() {
  const link = "https://theglobalpolymath.com/invite";

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Invite & Earn
      </h2>

      <p className="mt-2 text-sm text-slate-300">
        Invite others and grow your global network.
      </p>

      <div className="mt-4 flex gap-3">
        <input
          value={link}
          readOnly
          className="flex-1 rounded-xl bg-slate-950 p-3 text-sm"
        />
        <button className="bg-yellow-500 text-black px-4 rounded-xl">
          Copy
        </button>
      </div>
    </section>
  );
}