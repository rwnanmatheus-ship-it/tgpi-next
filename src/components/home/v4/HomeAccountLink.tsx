"use client";
import { useLocale } from "@/components/localization/LocaleProvider";

import { useAuth } from "@clerk/nextjs";
import NavigationLink from "@/components/navigation/NavigationLink";
import { HOME_ROUTES } from "@/lib/home-content";

export default function HomeAccountLink({ className, placement }: { className: string; placement: string }) {
  const { isSignedIn } = useAuth();
  const { t } = useLocale();
  return <NavigationLink href={isSignedIn ? HOME_ROUTES.workspace : HOME_ROUTES.signup} className={className} data-funnel-event={isSignedIn ? undefined : "home_primary_cta"} data-placement={placement}>
    {t(isSignedIn ? "Continue to your workspace" : "Create your free account")}<span aria-hidden="true">↗</span>
  </NavigationLink>;
}
