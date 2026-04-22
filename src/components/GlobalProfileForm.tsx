"use client";

import { useState } from "react";
import { updateGlobalProfile } from "@/lib/global-profile";

export default function GlobalProfileForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    await updateGlobalProfile({
      goal: form.get("goal") as any,
      englishLevel: form.get("englishLevel") as any,
      budget: form.get("budget") as any,
      continentInterest: form.get("continent") as string,
    });

    setLoading(false);
    alert("Profile updated");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select name="goal" className="input">
        <option value="work">Work</option>
        <option value="study">Study</option>
        <option value="live">Live</option>
      </select>

      <select name="englishLevel" className="input">
        <option value="basic">Basic</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <select name="budget" className="input">
        <option value="low">Low Budget</option>
        <option value="medium">Medium Budget</option>
        <option value="high">High Budget</option>
      </select>

      <input
        name="continent"
        placeholder="Preferred Continent"
        className="input"
      />

      <button className="btn-primary">
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}