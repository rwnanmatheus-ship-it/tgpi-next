"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { CommunityCard, Page } from "@/lib/community/model";
import { api } from "./api";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";

export default function CommunityConnections() {
  const { t } = useLocale();
  const [items, setItems] = useState<CommunityCard[]>([]),
    [status, setStatus] = useState("Loading community connections…");
  useEffect(() => {
    let mounted = true;
    api<Page<CommunityCard>>({ mine: "1" })
      .then((r) => {
        if (mounted) {
          setItems(
            r.items.filter((c) =>
              ["active", "pending"].includes(c.membership?.state || ""),
            ),
          );
          setStatus("");
        }
      })
      .catch(() => {
        if (mounted)
          setStatus("Community connections are temporarily unavailable.");
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <section
      className="rounded-[28px] border border-white/10 bg-[#08131F] p-5 sm:p-6"
      aria-labelledby="workspace-community"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-[#E5B94B]"><LocalizedText text="Global Community" /></p>
      <h2 id="workspace-community" className="mt-2 text-2xl text-white"><LocalizedText text="Continue the conversation." /></h2>
      {status && (
        <p className="mt-3 text-sm text-slate-300" role="status">
          {t(status)}
        </p>
      )}
      {items.map((c) => (
        <Link
          className="mt-3 block rounded-xl border border-white/15 p-3 text-sm text-white hover:border-[#E5B94B]"
          href={`/community/${c.id}`}
          key={c.id}
        >
          {c.name}
          <span className="ml-2 text-xs text-slate-300">
            {t(c.membership?.state === "pending" ? "Request pending" : "Open community")}
          </span>
        </Link>
      ))}
      {!status && !items.length && (
        <p className="mt-3 text-sm text-slate-300"><LocalizedText text="Find people navigating your next international step." /></p>
      )}
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-[#F0D58C]">
        <Link href="/community"><LocalizedText text="Explore communities →" /></Link>
        <Link href="/community?view=requests"><LocalizedText text="My requests" /></Link>
        <Link href="/community?view=saved"><LocalizedText text="Saved contributions" /></Link>
        <Link href="/community?view=meetings"><LocalizedText text="Upcoming sessions" /></Link>
      </div>
    </section>
  );
}
