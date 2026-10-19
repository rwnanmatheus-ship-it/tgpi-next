"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { normalizeTgpiAccountProfile } from '@/lib/account-profile';
import type { MemberIdentity } from '@/lib/members/identity';
import { useEffect, useRef, useState } from "react";

const destinations = [
  ["identity", "Personal information", "Name, photo and unique @ID"],
  ["security", "Login & security", "Email, login methods and devices"],
  ["privacy", "Privacy controls", "Choose what others can see"],
  ["preferences", "App preferences", "Language, currency and time zone"],
  ["notifications", "Notification preferences", "Choose the updates you receive"],
] as const;

export default function TgpiAccountMenu() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");
  const [memberIdentity, setMemberIdentity] = useState<MemberIdentity | null>(null);
  const [identityLoading, setIdentityLoading] = useState(false);
  const [identityError, setIdentityError] = useState(false);
  useEffect(() => {
    if (!open || !user?.id) return;
    const controller = new AbortController();
    fetch('/api/member-identity', { cache: 'no-store', signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json(); setMemberIdentity(data.identity);
    }).catch(error => { if (error.name !== 'AbortError') setIdentityError(true); }).finally(() => { if (!controller.signal.aborted) setIdentityLoading(false); });
    return () => controller.abort();
  }, [open, user?.id]);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  if (!isLoaded || !user) return null;
  const name = normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile).displayName || [user.firstName, user.lastName].filter(Boolean).join(" ") || "TGPI member";
  const handle = identityLoading ? 'Loading member ID…' : memberIdentity?.handle ? `@${memberIdentity.handle}` : identityError ? 'Manage your member ID' : 'Create your unique @ID';
  return (
    <div className="relative" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button ref={trigger} type="button" aria-label={`Account settings for ${name}`} aria-expanded={open} aria-controls="tgpi-account-popover" onClick={() => { if (!open) { setIdentityLoading(true); setIdentityError(false); } setOpen(!open); }} className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border-2 border-[#B58A2A]/50 bg-[#0B1F3A] text-sm font-bold text-[#F0D58C] shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B58A2A]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {user.imageUrl ? <img src={user.imageUrl} alt="" className="h-full w-full object-cover" /> : name.slice(0, 1)}
      </button>
      {open && <section id="tgpi-account-popover" aria-label="Your TGPI account" className="absolute right-0 top-14 z-50 max-h-[min(80dvh,680px)] w-[min(360px,calc(100vw-32px))] overflow-y-auto rounded-[24px] border border-[#D8D2C4] bg-[#FFFDFA] p-3 text-[#0B1F3A] shadow-[0_28px_80px_rgba(11,31,58,.24)]">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0B1F3A,#183D61)] p-5 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#F0D58C]">TGPI · Your account</p>
          <p className="mt-3 break-words text-lg font-bold">{name}</p>
          <Link href="/profile/security#settings-identity" onClick={() => setOpen(false)} className="mt-1 block text-sm text-[#F0D58C]">{handle}</Link>
          {!user.firstName || (!identityLoading && !identityError && !memberIdentity?.handle) ? <p className="mt-3 text-xs leading-5 text-[#D6DFEA]">Next step: add your name and claim your TGPI @ID.</p> : null}
        </div>
        <nav aria-label="Account shortcuts" className="mt-2">
          {destinations.map(([section, label, description]) => <Link key={section} href={`/profile/security#settings-${section}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 transition hover:bg-[#F5F1E8] focus-visible:outline-[#B58A2A]"><span className="block text-sm font-bold">{label}</span><span className="mt-1 block text-xs text-[#667085]">{description}</span></Link>)}
          <Link href="/members" onClick={() => setOpen(false)} className="block min-h-11 rounded-xl px-4 py-3 text-sm font-bold">Find a TGPI member →</Link>
          <div className="grid grid-cols-2 gap-2 border-t border-[#D8D2C4] pt-3">
            <Link href="/profile" onClick={() => setOpen(false)} className="rounded-xl bg-[#F5F1E8] p-3 text-center text-xs font-bold">Workspace</Link>
            <Link href="/profile/security#settings-billing" onClick={() => setOpen(false)} className="rounded-xl bg-[#F5F1E8] p-3 text-center text-xs font-bold">Plan & billing</Link>
          </div>
        </nav>
        <button type="button" disabled={signingOut} onClick={async () => {
          setSigningOut(true); setError("");
          try { await signOut({ redirectUrl: "/" }); }
          catch { setSigningOut(false); setError("Unable to sign out. Please try again."); }
        }} className="mt-2 min-h-11 w-full rounded-xl px-4 text-left text-sm font-bold text-[#8C2929] hover:bg-[#F5F1E8] disabled:opacity-50">{signingOut ? "Signing out…" : "Sign out"}</button>
        {error && <p role="alert" className="px-4 text-xs text-[#8C2929]">{error}</p>}
      </section>}
    </div>
  );
}
