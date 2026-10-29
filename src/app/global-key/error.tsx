"use client";

import Link from "next/link";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";


export default function GlobalIdentityError({ retry }: { retry: () => void }) {
  const { t } = useLocale();
  return (
    <main className="min-h-[65vh] bg-[#050C14] px-4 py-12 text-white sm:py-20">
      <section
        aria-labelledby="identity-error-title"
        className="mx-auto max-w-xl rounded-3xl border border-white/15 bg-[#0B1F3A] p-6 shadow-xl sm:p-10"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#E5B94B]">
          TGPI Global ID
        </p>
        <h1 id="identity-error-title" className="mt-4 text-3xl font-semibold">{t("Your identity could not be loaded.")}</h1>
        <p role="alert" className="mt-4 text-base leading-7 text-[#CBD5E1]">{t("We could not confirm your identity record right now. Try again. If this continues, return to your workspace or check your account access.")}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={retry}
            className="min-h-12 rounded-xl bg-[#E5B94B] px-5 text-sm font-bold text-[#07182D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          ><LocalizedText text="Try again" /></button>
          <Link
            href="/profile"
            className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >{t("Open workspace")}</Link>
          <Link
            href="/profile/security"
            className="inline-flex min-h-12 items-center px-2 text-sm font-semibold underline underline-offset-4"
          ><LocalizedText text="Account security" /></Link>
        </div>
      </section>
    </main>
  );
}
