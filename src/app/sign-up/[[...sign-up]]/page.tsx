import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import TGPIAuthShell from "@/components/auth/TGPIAuthShell";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";

export const metadata: Metadata = {
  title: "Create your TGPI Global Key",
  description: "Create one secure identity for your TGPI global journey.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <TGPIAuthShell mode="sign-up">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        forceRedirectUrl="/welcome"
        signInFallbackRedirectUrl="/profile"
        fallback={<p role="status">Loading secure registration…</p>}
        appearance={tgpiClerkAppearance}
      />
    </TGPIAuthShell>
  );
}
