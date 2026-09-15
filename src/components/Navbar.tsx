"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandCrest from "@/components/BrandCrest";
import { Container } from "@/components/design-system";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import {
  isNavigationDestinationActive,
  PRIMARY_NAVIGATION,
} from "@/lib/navigation-system";
import { getSuperAppModule, SUPER_APP_OPEN_EVENT } from "@/lib/super-app";

export default function Navbar() {
  const pathname = usePathname();
  const currentModule = getSuperAppModule(pathname);

  return (
    <header
      className="tgpi-desktop-navigation sticky top-0 z-50 border-b border-[var(--tgpi-border-soft)] bg-[rgba(255,253,248,0.92)] backdrop-blur-2xl"
      data-navigation-version="2"
    >
      <Container className="tgpi-desktop-navigation-frame">
        <Link href="/" className="tgpi-desktop-brand" aria-label="TGPI home">
          <span className="tgpi-desktop-brand-crest">
            <BrandCrest
              fill
              priority
              sizes="42px"
              className="object-contain drop-shadow-[0_7px_15px_rgba(7,26,50,0.2)]"
            />
          </span>
          <span className="min-w-0">
            <span className="block font-[var(--tgpi-font-display)] text-[1.45rem] font-bold leading-none tracking-[0.055em] text-[var(--tgpi-navy)]">
              TGPI
            </span>
            <span className="tgpi-desktop-brand-line">Global Intelligence OS</span>
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
                <NavigationIcon name={destination.icon} width={17} height={17} />
                <span>{destination.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="tgpi-desktop-actions">
          {currentModule ? (
            <span className="tgpi-desktop-context" title={currentModule.description}>
              <span aria-hidden="true" />
              {currentModule.shortLabel}
            </span>
          ) : null}

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
            <NavigationIcon name="apps" />
            <span className="tgpi-apps-label">Apps</span>
          </button>

          <Show when="signed-in">
            <Link
              href="/notifications"
              aria-label="Open notifications"
              title="Notifications"
              className="tgpi-navigation-square-button"
            >
              <NavigationIcon name="bell" />
            </Link>
            <Link href="/profile" className="tgpi-navigation-workspace-button">
              <NavigationIcon name="key" width={18} height={18} />
              <span className="tgpi-workspace-label">Workspace</span>
            </Link>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/profile/security"
              appearance={{ elements: { avatarBox: "h-10 w-10 ring-2 ring-[#D8D2C4]" } }}
            />
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
