"use client";

import Link from "next/link";
import {
  getPremiumFeatureLabel,
  hasAccess,
  type PremiumFeature,
} from "@/lib/feature-access";

type PremiumGateProps = {
  user: any;
  feature: PremiumFeature;
  title?: string;
  description?: string;
  highlights?: string[];
  children: React.ReactNode;
};

export default function PremiumGate({
  user,
  feature,
  title,
  description,
  highlights = [],
  children,
}: PremiumGateProps) {
  const allowed = hasAccess(user, feature);

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8 text-white">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            Premium Preview
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">
            {title || getPremiumFeatureLabel(feature)}
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            {description ||
              "You are seeing the free preview. Upgrade to unlock the full intelligence layer, deeper data, and premium global access."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/premium"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Unlock Premium
            </Link>

            <Link
              href="/passport"
              className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500"
            >
              Explore Passport
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-bold text-yellow-400">
            What Premium Unlocks
          </h3>

          <div className="mt-5 space-y-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <p className="text-sm leading-7 text-slate-300">✔ {item}</p>
              </div>
            ))}
          </div>

          {!highlights.length ? (
            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm leading-7 text-slate-300">
                ✔ Advanced visibility
                <br />
                ✔ Premium social signals
                <br />
                ✔ More useful global intelligence
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}