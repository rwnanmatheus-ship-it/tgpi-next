"use client";

import Link from "next/link";

type Props = {
  hasAvatar: boolean;
  hasGoal: boolean;
  hasBio: boolean;
  completionScore: number;
};

type SmartAction = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

export default function ProfileSmartActions({
  hasAvatar,
  hasGoal,
  hasBio,
  completionScore,
}: Props) {
  const actions: SmartAction[] = [];

  if (!hasAvatar) {
    actions.push({
      title: "Upload your profile photo",
      description: "A visible identity increases trust and makes your profile look premium.",
      href: "/profile",
      tag: "High Priority",
    });
  }

  if (!hasGoal) {
    actions.push({
      title: "Define your global goal",
      description: "This unlocks more relevant recommendations and stronger guidance.",
      href: "/profile",
      tag: "High Priority",
    });
  }

  if (!hasBio) {
    actions.push({
      title: "Write a short bio",
      description: "A concise bio makes the profile more human and complete.",
      href: "/profile",
      tag: "Medium Priority",
    });
  }

  if (completionScore < 80) {
    actions.push({
      title: "Complete your profile",
      description: "A more complete profile improves the entire TGPI experience.",
      href: "/profile",
      tag: "Recommended",
    });
  }

  actions.push({
    title: "Explore countries",
    description: "Expand your profile signals and discover better-fit destinations.",
    href: "/countries",
    tag: "Explore",
  });

  actions.push({
    title: "Check premium features",
    description: "Unlock deeper intelligence, stronger tools, and a richer experience.",
    href: "/premium",
    tag: "Upgrade",
  });

  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">Smart Actions</h2>
        <p className="mt-2 text-sm text-slate-400">
          Intelligent next steps based on your current profile state.
        </p>
      </div>

      <div className="space-y-3">
        {actions.slice(0, 5).map((action) => (
          <Link
            key={`${action.title}-${action.href}`}
            href={action.href}
            className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-500/30"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-white">{action.title}</p>
                <p className="mt-1 text-sm text-slate-400">{action.description}</p>
              </div>

              <span className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                {action.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}