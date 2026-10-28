import { LocalizedText } from "@/components/localization/LocaleProvider";
import { safeReturnTo } from "@/lib/auth/return-to";
import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import TGPIAuthShell from "@/components/auth/TGPIAuthShell";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";

export const metadata: Metadata = {
  title: "Sign in — TGPI Global Key",
  description: "Securely access your TGPI global workspace, country decisions and learning journey.",
  robots: { index: false, follow: false },
};

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string; redirect_url?: string }> }) {
  const params = await searchParams;
  const next = safeReturnTo(params.next ?? params.redirect_url, "/profile");
  return (
    <TGPIAuthShell mode="sign-in">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl={`/sign-up?next=${encodeURIComponent(next)}`}
        forceRedirectUrl={next}
        signUpForceRedirectUrl={`/welcome?next=${encodeURIComponent(next)}`}
        fallback={<p role="status"><LocalizedText text="Loading secure sign in…" /></p>}
        appearance={tgpiClerkAppearance}
      />
    </TGPIAuthShell>
  );
}
