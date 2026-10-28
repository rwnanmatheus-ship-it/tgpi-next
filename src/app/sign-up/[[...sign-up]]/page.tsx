import { LocalizedText } from "@/components/localization/LocaleProvider";
import { safeReturnTo } from "@/lib/auth/return-to";
import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import TGPIAuthShell from "@/components/auth/TGPIAuthShell";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";

export const metadata: Metadata = {
  title: "Create your TGPI Global Key",
  description: "Create one secure identity for your TGPI global journey.",
  robots: { index: false, follow: false },
};

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ next?: string; redirect_url?: string }> }) {
  const params = await searchParams;
  const next = safeReturnTo(params.next ?? params.redirect_url);
  const welcome = `/welcome?next=${encodeURIComponent(next)}`;
  return (
    <TGPIAuthShell mode="sign-up">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl={`/sign-in?next=${encodeURIComponent(next)}`}
        forceRedirectUrl={welcome}
        signInFallbackRedirectUrl={next}
        fallback={<p role="status"><LocalizedText text="Loading secure registration…" /></p>}
        appearance={tgpiClerkAppearance}
      />
    </TGPIAuthShell>
  );
}
