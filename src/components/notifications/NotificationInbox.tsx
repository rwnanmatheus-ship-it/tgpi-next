"use client";
import { useState } from "react";
import Link from "next/link";
import { useNotifications } from "./NotificationProvider";
import {
  notificationCategories,
  type NotificationPreferences,
} from "@/lib/notifications/model";
const labels: Record<keyof NotificationPreferences, string> = {
  emailImportant: "Important account and billing updates",
  emailLearning: "Learning and credential milestones",
  emailPlanning: "Personal planning suggestions",
  emailProduct: "TGPI product announcements",
};
export default function NotificationInbox() {
  const inbox = useNotifications();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const unread = inbox.items.filter(item => !item.readAt && !item.archivedAt).length;
  const important = inbox.items.filter(item => item.important && !item.archivedAt).length;
  const nextStep = inbox.items.find(item => item.key.startsWith("next:") && !item.archivedAt);
  const visible = inbox.items.filter(item => `${item.title} ${item.body} ${item.category}`.toLowerCase().includes(query.toLowerCase())).filter((item) =>
    filter === "archived"
      ? Boolean(item.archivedAt)
      : !item.archivedAt &&
        (filter === "all" ||
          (filter === "unread" && !item.readAt) ||
          item.category === filter),
  );
  return (
    <main
      id="main-content"
      className="min-h-[80vh] bg-[#F8F5EE] px-4 py-8 text-[#0B1F3A] sm:px-6 sm:py-12"
    >
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-[32px] border border-[#B58A2A]/30 bg-[radial-gradient(ellipse_at_top_right,#244867_0%,#0B1F3A_60%)] p-6 text-white shadow-[0_24px_70px_-30px_#0B1F3A] sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[.22em] text-[#E3C57B]">
            TGPI · Your private intelligence channel
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl">
            Your intelligence inbox.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            Account updates, learning milestones and practical next steps,
            connected to your global journey.
          </p>
          <Link
            href="/profile"
            className="mt-5 inline-block text-sm font-bold text-[#E3C57B]"
          >
            Open my workspace →
          </Link>
        </header>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[{ label: "Unread updates", value: unread }, { label: "Priority updates", value: important }, { label: "Connected channels", value: "5" }].map(stat => <div key={stat.label} className="rounded-2xl border border-[#D8D2C4] bg-white p-5 shadow-[0_8px_24px_-18px_#0B1F3A]"><p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p><p className="mt-2 font-serif text-3xl">{inbox.loading ? "—" : stat.value}</p></div>)}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section
            aria-label="Notification inbox"
            className="min-w-0 rounded-[24px] border border-[#D8D2C4] bg-white p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Your inbox</h2>
              <button
                type="button"
                disabled={inbox.pending}
                onClick={() => void inbox.refresh()}
                className="rounded-lg border border-[#D8D2C4] px-3 py-2 text-sm font-bold"
              >
                Refresh
              </button>
            </div>
            <label className="mt-5 block"><span className="sr-only">Search your updates</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search updates, milestones and next steps…" className="w-full rounded-xl border border-[#D8D2C4] bg-[#F8F5EE]/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#B58A2A]" /></label>
            <div
              aria-label="Filter notifications"
              className="mt-5 flex flex-wrap gap-2"
            >
              {["all", "unread", ...notificationCategories, "archived"].map(
                (value) => (
                  <button
                    type="button"
                    key={value}
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                    className={`rounded-full border px-3 py-2 text-xs font-bold capitalize ${filter === value ? "border-[#0B1F3A] bg-[#0B1F3A] text-white" : "border-[#D8D2C4] text-[#0B1F3A]"}`}
                  >
                    {value}
                  </button>
                ),
              )}
            </div>
            {inbox.error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-[#B58A2A] bg-[#F8F5EE] p-4 text-sm"
              >
                {inbox.error}
                <button
                  type="button"
                  onClick={() => void inbox.refresh()}
                  className="ml-2 underline"
                >
                  Retry
                </button>
              </div>
            )}
            {inbox.loading ? (
              <p role="status" className="py-12 text-center">
                Loading your private updates…
              </p>
            ) : !visible.length && !inbox.error ? (
              <div className="py-12 text-center">
                <h3 className="font-serif text-2xl">No updates in this view.</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Try another category or continue your journey. Your updates stay connected to your account.
                </p>
              </div>
            ) : null}
            <div className="mt-5 space-y-3">
              {visible.map((item) => (
                <article
                  key={item.id}
                  className={`rounded-2xl border p-5 ${item.readAt ? "border-[#D8D2C4] bg-white" : "border-[#B58A2A]/50 bg-[#F8F5EE]"}`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider">
                    <span>{item.category}</span>
                    {!item.readAt && (
                      <span className="rounded-full bg-[#0B1F3A] px-2 py-1 text-white">
                        New
                      </span>
                    )}
                    {item.important && (
                      <span className="text-[#805D19]">Important</span>
                    )}

                  </div>
                  <h3 className="mt-3 text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.body}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (!item.readAt) void inbox.mutate(item.id, "read");
                      }}
                      className="rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white"
                    >
                      {item.actionLabel} →
                    </Link>
                    <button
                      type="button"
                      disabled={inbox.pending}
                      onClick={() =>
                        void inbox.mutate(
                          item.id,
                          item.readAt ? "unread" : "read",
                        )
                      }
                      className="p-2 text-xs font-bold underline disabled:opacity-50"
                    >
                      Mark {item.readAt ? "unread" : "read"}
                    </button>
                    {!item.archivedAt && (
                      <button
                        type="button"
                        disabled={inbox.pending}
                        onClick={() => void inbox.mutate(item.id, "archive")}
                        className="p-2 text-xs text-slate-600 underline disabled:opacity-50"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
            {inbox.nextCursor && (
              <button
                type="button"
                disabled={inbox.pending}
                onClick={() => void inbox.loadMore()}
                className="mt-5 w-full rounded-xl border border-[#D8D2C4] p-3 text-sm font-bold"
              >
                Load older updates
              </button>
            )}
          </section>
          <aside className="space-y-5">
            {nextStep && <section className="rounded-[24px] border border-[#B58A2A]/40 bg-[#0B1F3A] p-6 text-white shadow-xl"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#E3C57B]">Your next best step</p><h2 className="mt-4 font-serif text-2xl">{nextStep.title}</h2><p className="mt-3 text-sm leading-6 text-slate-200">{nextStep.body}</p><Link href={nextStep.href} className="mt-5 inline-flex rounded-xl bg-[#E3C57B] px-4 py-3 text-sm font-bold text-[#0B1F3A]">{nextStep.actionLabel} →</Link></section>}
            <section className="rounded-[24px] border border-[#D8D2C4] bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-widest text-[#805D19]">Channel status</p><h2 className="mt-3 text-lg font-bold">Connected to your journey</h2><p className="mt-3 text-sm leading-6 text-slate-600">Account · Membership · Learning · Planning · Product</p><p className="mt-3 text-xs leading-5 text-slate-500">Updates refresh while you use TGPI. Security sign-in alerts require the verified webhook. Email delivery is awaiting connection.</p></section>
            <section className="rounded-[24px] border border-[#D8D2C4] bg-white p-6">
              <h2 className="text-lg font-bold">You control your inbox.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose which updates you would like by email. Your in-app
                history stays available here.
              </p>
              <p className="mt-4 rounded-xl bg-[#F8F5EE] p-3 text-xs leading-5 text-[#805D19]">
                Email delivery is not connected yet. Saving a preference does
                not send an email.
              </p>
              <fieldset
                disabled={
                  inbox.pending || inbox.loading || Boolean(inbox.error)
                }
                className="mt-5 space-y-4"
              >
                <legend className="sr-only">Email preferences</legend>
                {Object.entries(labels).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-start gap-3 text-sm leading-5"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-[#0B1F3A]"
                      checked={
                        inbox.preferences[key as keyof NotificationPreferences]
                      }
                      onChange={(event) =>
                        void inbox.savePreferences({
                          ...inbox.preferences,
                          [key]: event.target.checked,
                        })
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
            </section>
            <section className="rounded-[24px] bg-[#0B1F3A] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-[#E3C57B]">
                Built around trust
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Updates reflect your recorded account and progress. Read status and preferences are saved to your account. Optional product and planning emails start disabled.
              </p>
              <Link
                href="/privacy"
                className="mt-4 inline-block text-sm font-bold text-[#E3C57B]"
              >
                Privacy and your data →
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
