type PremiumStatusBadgeProps = {
  plan?: string;
  isVerified?: boolean;
};

export default function PremiumStatusBadge({
  plan,
  isVerified,
}: PremiumStatusBadgeProps) {
  const isPremium = plan === "premium";

  return (
    <div className="flex flex-wrap gap-3">
      <span
        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
          isPremium
            ? "border border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
            : "border border-slate-700 bg-slate-900 text-slate-300"
        }`}
      >
        {isPremium ? "Premium Member" : "Free Member"}
      </span>

      <span
        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
          isVerified
            ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border border-slate-700 bg-slate-900 text-slate-300"
        }`}
      >
        {isVerified ? "Verified Identity" : "Standard Identity"}
      </span>
    </div>
  );
}