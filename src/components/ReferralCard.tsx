"use client";

import { auth } from "@/lib/firebase";
import {
  ensureReferralIndex,
  getOrCreateReferralCode,
  getReferralCount,
} from "@/lib/referral";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function ReferralCard() {
  const [referralLink, setReferralLink] = useState("");
  const [referrals, setReferrals] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setReferralLink("");
        setReferrals(0);
        return;
      }

      try {
        const code = await getOrCreateReferralCode(user.uid);
        await ensureReferralIndex(user.uid, code);
        const count = await getReferralCount(user.uid);

        setReferralLink(`https://theglobalpolymath.com?ref=${code}`);
        setReferrals(count);
      } catch (error) {
        console.error("Could not load referral data:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  async function copyLink() {
    if (!referralLink) {
      setMessage("Sign in to access your referral link.");
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
      setMessage("Referral link copied.");
    } catch (error) {
      console.error(error);
      setMessage("Could not copy referral link.");
    }
  }

  return (
    <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-6">
      <h2 className="text-2xl font-bold text-yellow-400">Invite Friends</h2>
      <p className="mt-3 text-slate-300">
        Bring other users to TGPI and grow your global network.
      </p>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm text-slate-400">Current referrals</p>
        <p className="mt-2 text-3xl font-bold text-yellow-400">{referrals}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs text-slate-400">Your referral link</p>
        <p className="mt-2 break-all text-sm text-white">
          {referralLink || "Sign in to generate your referral link."}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">1 friend</p>
          <p className="mt-2 text-lg font-semibold text-yellow-400">+50 XP</p>
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

      {message ? (
        <p className="mt-4 text-sm text-yellow-300">{message}</p>
      ) : null}
    </div>
  );
}