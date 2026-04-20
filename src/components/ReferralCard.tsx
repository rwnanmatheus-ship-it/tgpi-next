"use client";

export default function ReferralCard() {
  const referralLink = "https://theglobalpolymath.com?ref=tgpi-founder";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      alert("Referral link copied.");
    } catch (error) {
      console.error(error);
      alert("Could not copy referral link.");
    }
  }

  return (
    <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-6">
      <h2 className="text-2xl font-bold text-yellow-400">Invite Friends</h2>
      <p className="mt-3 text-slate-300">
        Bring other users to TGPI and grow your global network.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs text-slate-400">Your referral link</p>
        <p className="mt-2 break-all text-sm text-white">{referralLink}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">1 friend</p>
          <p className="mt-2 text-lg font-semibold text-yellow-400">
            +50 XP
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">3 friends</p>
          <p className="mt-2 text-lg font-semibold text-yellow-400">
            Explorer Badge
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">5 friends</p>
          <p className="mt-2 text-lg font-semibold text-yellow-400">
            Premium Trial
          </p>
        </div>
      </div>

      <button
        onClick={copyLink}
        className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
      >
        Copy Referral Link
      </button>
    </div>
  );
}