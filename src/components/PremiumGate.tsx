import LockedFeatureCard from "@/components/LockedFeatureCard";
import { hasPremiumAccess, TGPIPlan } from "@/lib/entitlements";

type PremiumUserLike = {
  plan?: TGPIPlan | string;
  subscriptionPlan?: TGPIPlan | string;
  isPremium?: boolean;
} | null;

type Props = {
  plan?: TGPIPlan;
  user?: PremiumUserLike;
  feature?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  highlights?: string[];
};

function resolvePlan(plan?: TGPIPlan, user?: PremiumUserLike): TGPIPlan {
  if (plan) return plan;

  if (user?.isPremium) return "PREMIUM";

  const rawPlan = user?.plan || user?.subscriptionPlan;

  if (rawPlan === "ELITE") return "ELITE";
  if (rawPlan === "PREMIUM") return "PREMIUM";

  return "FREE";
}

export default function PremiumGate({
  plan,
  user,
  feature,
  children,
  title = "Premium Feature",
  description = "Upgrade to unlock deeper TGPI intelligence and strategic tools.",
  highlights = [],
}: Props) {
  const resolvedPlan = resolvePlan(plan, user);

  if (!hasPremiumAccess(resolvedPlan)) {
    return (
      <div className="space-y-4">
        <LockedFeatureCard
          title={title}
          description={
            feature
              ? `${description} Feature: ${feature}.`
              : description
          }
        />

        {highlights.length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-yellow-400">
              Premium Highlights
            </h4>

            <div className="space-y-2">
              {highlights.map((item) => (
                <p key={item} className="text-sm text-slate-300">
                  • {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
}