import { localizeMetadata } from "@/lib/localization/metadata.server";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { registrationReturnTo, registrationUrl } from "@/lib/auth/return-to";
import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import TGPIAuthShell from "@/components/auth/TGPIAuthShell";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";

const sourceMetadata: Metadata = {
  title: "Create your TGPI Global Key",
  description: "Create one secure identity for your TGPI global journey.",
  robots: { index: false, follow: false },
};

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ next?: string; redirect_url?: string }> }) {
  const params = await searchParams;
  const next = registrationReturnTo(params.next ?? params.redirect_url);
  return (
    <TGPIAuthShell mode="sign-up" returnTo={next}>
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl={`/sign-in?next=${encodeURIComponent(next)}`}
        forceRedirectUrl={registrationUrl(next)}
        signInFallbackRedirectUrl={next}
        fallback={<p role="status"><LocalizedText text="Loading secure registration…" /></p>}
        appearance={tgpiClerkAppearance}
      />
    </TGPIAuthShell>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
