"use client";
import { useState } from "react";
export default function AnnouncementComposer() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to publish.");
      setMessage(
        "Announcement recorded in this member’s inbox. Reusing the same campaign key will not create a duplicate. Email delivery remains disconnected.",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to publish.");
    } finally {
      setPending(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="mt-6 space-y-4 rounded-3xl border border-[#D8D2C4] bg-white p-6"
    >
      <p className="text-sm leading-6 text-slate-600">
        Publish a real product update to a verified member ID. Use a stable
        campaign key to prevent duplicates.
      </p>
      <fieldset disabled={pending} className="space-y-4">
        {[
          {
            name: "uid",
            label: "Member Clerk ID",
            placeholder: "user_…",
            max: 100,
          },
          {
            name: "key",
            label: "Campaign key",
            placeholder: "country-workspace-october-2026",
            max: 80,
          },
          {
            name: "title",
            label: "Title",
            placeholder: "Your country workspace has a new capability",
            max: 160,
          },
          {
            name: "href",
            label: "TGPI destination",
            placeholder: "/countries",
            max: 500,
          },
        ].map((field) => (
          <label key={field.name} className="block text-sm font-bold">
            {field.label}
            <input
              required
              name={field.name}
              maxLength={field.max}
              placeholder={field.placeholder}
              className="mt-2 block w-full rounded-xl border border-[#D8D2C4] p-3 font-normal"
            />
          </label>
        ))}
        <label className="block text-sm font-bold">
          Message
          <textarea
            name="body"
            required
            maxLength={1500}
            rows={5}
            className="mt-2 block w-full rounded-xl border border-[#D8D2C4] p-3 font-normal"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          {pending ? "Publishing…" : "Publish to member inbox"}
        </button>
      </fieldset>
      <p role="status" className="text-sm leading-6">
        {message}
      </p>
    </form>
  );
}
