"use client";

type Props = {
  displayName: string;
  username: string;
  bio: string;
  avatar?: string;
  city?: string;
  country?: string;
  showLocation: boolean;
  showProgress: boolean;
  showGoals: boolean;
  goal?: string;
  readinessLabel?: string;
};

export default function ProfilePublicPreview({
  displayName,
  username,
  bio,
  avatar = "",
  city = "",
  country = "",
  showLocation,
  showProgress,
  showGoals,
  goal,
  readinessLabel = "Growing",
}: Props) {
  const location = [city, country].filter(Boolean).join(", ");

  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">Public Profile Preview</h2>
        <p className="mt-2 text-sm text-slate-400">
          This is how your profile can appear to other users inside TGPI.
        </p>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-yellow-500/25 bg-black text-2xl font-bold text-yellow-400">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt={displayName} className="h-full w-full object-cover" />
            ) : (
              <span>{displayName?.slice(0, 1)?.toUpperCase() || "U"}</span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white">{displayName || "Unnamed User"}</h3>
            <p className="mt-1 text-slate-300">@{username || "globaluser"}</p>

            {bio ? (
              <p className="mt-3 text-sm leading-7 text-slate-300">{bio}</p>
            ) : (
              <p className="mt-3 text-sm leading-7 text-slate-500">No public bio yet.</p>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              {showLocation && location ? (
                <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white">
                  {location}
                </span>
              ) : null}

              {showProgress ? (
                <span className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
                  {readinessLabel} Readiness
                </span>
              ) : null}

              {showGoals && goal ? (
                <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white">
                  Goal: {goal}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}