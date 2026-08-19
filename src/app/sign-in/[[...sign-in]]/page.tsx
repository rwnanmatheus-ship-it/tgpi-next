import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import TGPIAuthShell from "@/components/auth/TGPIAuthShell";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";

export const metadata: Metadata = {
  title: "Sign in — TGPI Global Key",
  description: "Securely access your TGPI global workspace, country decisions and learning journey.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <TGPIAuthShell mode="sign-in">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/profile"
        appearance={tgpiClerkAppearance}
      />
    </TGPIAuthShell>
  );
}
