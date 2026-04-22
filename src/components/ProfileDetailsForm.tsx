"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateUserMemory } from "@/lib/user-memory";

type FormState = {
  displayName: string;
  username: string;
  bio: string;
  city: string;
  country: string;
  preferredCurrency: string;
  goal: "work" | "study" | "live" | "";
  englishLevel: "basic" | "intermediate" | "advanced" | "";
  budget: "low" | "medium" | "high" | "";
  continentInterest: string;
};

const initialState: FormState = {
  displayName: "",
  username: "",
  bio: "",
  city: "",
  country: "",
  preferredCurrency: "USD",
  goal: "",
  englishLevel: "",
  budget: "",
  continentInterest: "",
};

export default function ProfileDetailsForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) {
        setLoaded(true);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? snap.data() : {};

        setForm({
          displayName: data?.displayName || data?.fullName || "",
          username: data?.username || "",
          bio: data?.bio || "",
          city: data?.city || "",
          country: data?.country || "",
          preferredCurrency: data?.preferredCurrency || "USD",
          goal: data?.goal || "",
          englishLevel: data?.englishLevel || "",
          budget: data?.budget || "",
          continentInterest: data?.continentInterest || "",
        });
      } catch (error) {
        console.error("Failed to load profile form:", error);
      } finally {
        setLoaded(true);
      }
    }

    load();
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    setLoading(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          displayName: form.displayName,
          username: form.username,
          bio: form.bio,
          city: form.city,
          country: form.country,
          preferredCurrency: form.preferredCurrency,
          goal: form.goal || undefined,
          englishLevel: form.englishLevel || undefined,
          budget: form.budget || undefined,
          continentInterest: form.continentInterest,
        },
        { merge: true }
      );

      await updateUserMemory({
        preferredCurrency: form.preferredCurrency,
        goal: form.goal || undefined,
        englishLevel: form.englishLevel || undefined,
        budget: form.budget || undefined,
        continentInterest: form.continentInterest || undefined,
      });

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Could not save profile.");
    } finally {
      setLoading(false);
    }
  }

  if (!loaded) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
        Loading profile form...
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">Edit Your Profile</h2>
        <p className="mt-2 text-sm text-slate-400">
          Complete your information to turn TGPI into a more accurate and useful global platform for you.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Display Name</label>
          <input
            value={form.displayName}
            onChange={(e) => updateField("displayName", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Username</label>
          <input
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">Bio</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">City</label>
          <input
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Country</label>
          <input
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Preferred Currency</label>
          <select
            value={form.preferredCurrency}
            onChange={(e) => updateField("preferredCurrency", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="EGP">EGP</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Main Goal</label>
          <select
            value={form.goal}
            onChange={(e) => updateField("goal", e.target.value as FormState["goal"])}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select</option>
            <option value="work">Work Abroad</option>
            <option value="study">Study Abroad</option>
            <option value="live">Live Abroad</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">English Level</label>
          <select
            value={form.englishLevel}
            onChange={(e) =>
              updateField("englishLevel", e.target.value as FormState["englishLevel"])
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Budget Level</label>
          <select
            value={form.budget}
            onChange={(e) => updateField("budget", e.target.value as FormState["budget"])}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">Continent of Interest</label>
          <input
            value={form.continentInterest}
            onChange={(e) => updateField("continentInterest", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            placeholder="Europe, Asia, North America..."
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </section>
  );
}