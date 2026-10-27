"use client";
import LanguageSelector from "@/components/localization/LanguageSelector";
import { useLocale } from "@/components/localization/LocaleProvider";

import { Show } from "@clerk/nextjs";
import TgpiAccountMenu from "@/components/profile/TgpiAccountMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBell from "@/components/NotificationBell";
import BrandSignature from "@/components/navigation/BrandSignature";
import { Container } from "@/components/design-system";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import {
  isNavigationDestinationActive,
  PRIMARY_NAVIGATION,
} from "@/lib/navigation-system";
import LauncherButton from "@/components/navigation/LauncherButton";

export default function Navbar() {
  const { t } = useLocale();
  const pathname = usePathname();

  return (
    <header
      className="tgpi-desktop-navigation sticky top-0 z-50 border-b border-[var(--tgpi-border-soft)] bg-[rgba(255,253,248,0.92)] backdrop-blur-2xl"
      data-navigation-version="2"
    >
      <Container className="tgpi-desktop-navigation-frame">
        <BrandSignature />

        <nav className="tgpi-desktop-primary" aria-label={t("Primary navigation")}>
          {PRIMARY_NAVIGATION.map((destination) => {
            const active = isNavigationDestinationActive(pathname, destination);
            return (
              <Link
                key={destination.id}
                href={destination.href}
                aria-current={active ? "page" : undefined}
                className="tgpi-desktop-primary-link"
              >
                <NavigationIcon name={destination.icon} width={18} height={18} />
                <span>{t(destination.label)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="tgpi-desktop-actions">
          <LanguageSelector compact />
          <LauncherButton />

          <Show when="signed-in">
            <NotificationBell />
            <Link href="/profile" aria-label={t("Open your TGPI workspace")} title={t("Your personal workspace")} className="tgpi-navigation-workspace-button">
              <NavigationIcon name="key" width={18} height={18} />
              <span className="tgpi-workspace-label">{t("Workspace")}</span>
            </Link>
            <TgpiAccountMenu />
          </Show>

          <Show when="signed-out">
            <Link href="/sign-in" className="tgpi-navigation-login">{t("Log in")}</Link>
            <Link href="/sign-up" className="tgpi-navigation-key-button">
              <NavigationIcon name="key" width={18} height={18} />
              <span>{t("Create Global Key")}</span>
            </Link>
          </Show>
        </div>
      </Container>
    </header>
  );
}
