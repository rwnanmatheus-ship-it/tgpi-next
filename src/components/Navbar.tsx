"use client";

import { Show } from "@clerk/nextjs";
import TgpiAccountMenu from "@/components/profile/TgpiAccountMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBell from "@/components/NotificationBell";
import BrandCrest from "@/components/BrandCrest";
import { Container } from "@/components/design-system";
import NavigationTileIcon from "@/components/navigation/NavigationTileIcon";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import {
  isNavigationDestinationActive,
  PRIMARY_NAVIGATION,
} from "@/lib/navigation-system";
import { SUPER_APP_OPEN_EVENT } from "@/lib/super-app";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="tgpi-desktop-navigation sticky top-0 z-50 border-b border-[var(--tgpi-border-soft)] bg-[rgba(255,253,248,0.92)] backdrop-blur-2xl"
      data-navigation-version="2"
    >
      <Container className="tgpi-desktop-navigation-frame">
        <Link href="/" className="tgpi-desktop-brand" aria-label="TGPI — The Global Polymath Institute home">
          <span className="tgpi-desktop-brand-crest">
            <BrandCrest
              fill
              priority
              sizes="48px"
              className="object-contain drop-shadow-[0_7px_15px_rgba(7,26,50,0.2)]"
            />
          </span>
          <span className="min-w-0">
            <span className="block font-[var(--tgpi-font-display)] text-[1.45rem] font-bold leading-none tracking-[0.055em] text-[var(--tgpi-navy)]">
              TGPI
            </span>
            <span className="tgpi-desktop-brand-line">The Global Polymath Institute</span>
          </span>
        </Link>

        <nav className="tgpi-desktop-primary" aria-label="Primary navigation">
          {PRIMARY_NAVIGATION.map((destination) => {
            const active = isNavigationDestinationActive(pathname, destination);
            return (
              <Link
                key={destination.id}
                href={destination.href}
                aria-current={active ? "page" : undefined}
                className="tgpi-desktop-primary-link"
              >
                <NavigationTileIcon name={destination.icon} />
                <span>{destination.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="tgpi-desktop-actions">
          <button
            type="button"
            aria-label="Open TGPI apps"
            aria-haspopup="dialog"
            aria-controls="tgpi-super-app-launcher"
            aria-keyshortcuts="Control+K Meta+K"
            title="Open TGPI apps (Ctrl/⌘ K)"
            onClick={() => window.dispatchEvent(new Event(SUPER_APP_OPEN_EVENT))}
            className="tgpi-navigation-icon-button"
          >
            <NavigationTileIcon name="apps" />
            <span className="tgpi-apps-label">Apps</span>
          </button>

          <Show when="signed-in">
            <NotificationBell />
            <Link href="/profile" aria-label="Open your TGPI workspace" title="Your personal workspace" className="tgpi-navigation-workspace-button">
              <NavigationIcon name="key" width={18} height={18} />
              <span className="tgpi-workspace-label">Workspace</span>
            </Link>
            <TgpiAccountMenu />
          </Show>

          <Show when="signed-out">
            <Link href="/sign-in" className="tgpi-navigation-login">Log in</Link>
            <Link href="/sign-up" className="tgpi-navigation-key-button">
              <NavigationIcon name="key" width={18} height={18} />
              <span>Create Global Key</span>
            </Link>
          </Show>
        </div>
      </Container>
    </header>
  );
}
