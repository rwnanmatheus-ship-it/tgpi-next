"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  updateGlobalProfile,
  type GlobalProfile,
} from "@/lib/global-profile";

function readOption<T extends string>(
  formData: FormData,
  key: string,
  allowed: readonly T[]
): T | undefined {
  const value = formData.get(key);
  return typeof value === "string" && allowed.includes(value as T)
    ? (value as T)
    : undefined;
}

export default function GlobalProfileForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const profile: Partial<GlobalProfile> = {
      goal: readOption(formData, "goal", ["work", "study", "live"] as const),
      englishLevel: readOption(
        formData,
        "englishLevel",
        ["basic", "intermediate", "advanced"] as const
      ),
      budget: readOption(formData, "budget", ["low", "medium", "high"] as const),
      continentInterest: String(formData.get("continent") ?? "").trim(),
    };

    try {
      await updateGlobalProfile(profile);
      alert("Profile updated");
    } finally {
      setLoading(false);
    }
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

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
