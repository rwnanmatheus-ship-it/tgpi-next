"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function OnboardingPage() {
  const router = useRouter();

  const [country, setCountry] = useState("Japan");
  const [goal, setGoal] = useState("Work abroad");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);

      await updateDoc(ref, {
        countryInterest: country,
        mainGoal: goal,
        preferredLanguage: language,
        preferredCurrency: currency,
        onboardingCompleted: true,
        updatedAt: new Date().toISOString(),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white flex items-center justify-center">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Start Your Global Journey 🌍
        </h1>

        <div className="space-y-6">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/20 border border-white/10"
          >
            <option>Japan</option>
            <option>Brazil</option>
            <option>Egypt</option>
          </select>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/20 border border-white/10"
          >
            <option>Work abroad</option>
            <option>Live abroad</option>
            <option>Study abroad</option>
            <option>Cultural learning</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/20 border border-white/10"
          >
            <option>English</option>
            <option>Japanese</option>
            <option>Portuguese</option>
            <option>Arabic</option>
          </select>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/20 border border-white/10"
          >
            <option>USD</option>
            <option>JPY</option>
            <option>BRL</option>
            <option>EGP</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-500 py-4 rounded-xl font-bold text-black hover:bg-yellow-400"
          >
            {loading ? "Saving..." : "Start Experience"}
          </button>
        </div>
      </div>
    </main>
  );
}