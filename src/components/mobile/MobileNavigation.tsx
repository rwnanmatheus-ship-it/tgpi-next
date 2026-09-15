"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BrandCrest from "@/components/BrandCrest";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import {
  COMPACT_NAVIGATION,
  getSuperAppIconName,
  isNavigationDestinationActive,
} from "@/lib/navigation-system";
import {
  isFocusedMobileRoute,
  searchMobileCountries,
  type MobileCountry,
} from "@/lib/mobile-experience";
import {
  getSuperAppModule,
  searchSuperAppModules,
  SUPER_APP_OPEN_EVENT,
} from "@/lib/super-app";

const suggestedCountries = ["Portugal", "Canada", "Japan", "Spain"] as const;

export default function MobileNavigation() {
  const pathname = usePathname();
  return <MobileNavigationContent key={pathname} pathname={pathname} />;
}

function MobileNavigationContent({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<MobileCountry[]>([]);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [retry, setRetry] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const focused = isFocusedMobileRoute(pathname);
  const currentModule = getSuperAppModule(pathname);
  const countryResults = searchMobileCountries(countries, query);
  const moduleResults = query.trim() ? searchSuperAppModules(query).slice(0, 4) : [];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (searchOpen && !dialog.open) {
      const previousOverflow = document.body.style.overflow;
      const restoreFocusTarget = searchButtonRef.current;
      dialog.showModal();
      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(() => searchInputRef.current?.focus());
      const media = window.matchMedia("(min-width: 1024px)");
      const onResize = () => {
        if (media.matches) setSearchOpen(false);
      };
      media.addEventListener("change", onResize);
      return () => {
        media.removeEventListener("change", onResize);
        document.body.style.overflow = previousOverflow;
        if (dialog.open) dialog.close();
        restoreFocusTarget?.focus({ preventScroll: true });
      };
    }

    if (!searchOpen && dialog.open) dialog.close();
  }, [searchOpen]);

  useEffect(() => {
    const viewport = window.visualViewport;
    const update = () => {
      const editing = document.activeElement?.matches(
        "input, textarea, select, [contenteditable=true]",
      );
      setKeyboardOpen(Boolean(editing && viewport && window.innerHeight - viewport.height > 120));
    };
    viewport?.addEventListener("resize", update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    return () => {
      viewport?.removeEventListener("resize", update);
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
    };
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const controller = new AbortController();

    async function loadCountries() {
      setLoadState("loading");
      try {
        const response = await fetch("/api/mobile/countries", { signal: controller.signal });
        if (!response.ok) throw new Error("Country index unavailable");
        const value: unknown = await response.json();
        const valid = Array.isArray(value) && value.every(
          (item) => item && typeof item === "object" &&
            ["slug", "name", "capital", "region", "emoji"].every(
              (key) => typeof (item as Record<string, unknown>)[key] === "string",
            ),
        );
        if (!valid) throw new Error("Invalid country index");
        setCountries(value as MobileCountry[]);
        setLoadState("ready");
      } catch {
        if (!controller.signal.aborted) setLoadState("error");
      }
    }

    void loadCountries();
    return () => controller.abort();
  }, [searchOpen, retry]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  function openApps() {
    window.dispatchEvent(new Event(SUPER_APP_OPEN_EVENT));
  }

  return (
    <>
      <header
        className="tgpi-mobile tgpi-compact-topbar"
        aria-label="TGPI compact navigation"
        data-navigation-version="2"
      >
        <Link href="/" className="tgpi-compact-brand" aria-label="TGPI home">
          <BrandCrest width={32} height={40} sizes="32px" className="object-contain" />
          <span>
            <strong>TGPI</strong>
            <small>{currentModule?.shortLabel ?? "Global Intelligence"}</small>
          </span>
        </Link>
        <div className="tgpi-compact-actions">
          <button
            ref={searchButtonRef}
            type="button"
            className="tgpi-compact-action"
            aria-label="Search TGPI"
            aria-haspopup="dialog"
            aria-controls="tgpi-compact-search"
            onClick={() => setSearchOpen(true)}
          >
            <NavigationIcon name="search" />
          </button>
          <button
            type="button"
            className="tgpi-compact-action tgpi-compact-apps"
            aria-label="Open TGPI apps"
            aria-haspopup="dialog"
            aria-controls="tgpi-super-app-launcher"
            onClick={openApps}
          >
            <NavigationIcon name="apps" />
            <span>Apps</span>
          </button>
        </div>
      </header>

      {!focused ? (
        <nav
          className="tgpi-mobile tgpi-compact-dock"
          aria-label="Mobile primary navigation"
          data-keyboard={keyboardOpen ? "open" : "closed"}
        >
          {COMPACT_NAVIGATION.map((destination) => {
            const active = isNavigationDestinationActive(pathname, destination);
            return (
              <Link
                key={destination.id}
                href={destination.href}
                aria-current={active ? "page" : undefined}
              >
                <span className="tgpi-compact-dock-icon">
                  <NavigationIcon name={destination.icon} />
                </span>
                <span>{destination.shortLabel}</span>
              </Link>
            );
          })}
        </nav>
      ) : null}

      <dialog
        ref={dialogRef}
        id="tgpi-compact-search"
        className="tgpi-compact-search"
        aria-labelledby="tgpi-compact-search-title"
        onCancel={(event) => {
          event.preventDefault();
          closeSearch();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSearch();
        }}
      >
        <div className="tgpi-compact-search-panel">
          <header>
            <div>
              <p>TGPI GLOBAL SEARCH</p>
              <h2 id="tgpi-compact-search-title">Find your next move.</h2>
            </div>
            <button type="button" aria-label="Close search" onClick={closeSearch}>
              <NavigationIcon name="close" />
            </button>
          </header>

          <label className="tgpi-compact-search-field" htmlFor="tgpi-global-search">
            <NavigationIcon name="search" />
            <span className="sr-only">Search countries, tools or actions</span>
            <input
              ref={searchInputRef}
              id="tgpi-global-search"
              type="search"
              value={query}
              placeholder="Country, capital, tool or action…"
              autoComplete="off"
              enterKeyHint="search"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="tgpi-compact-search-status" role="status">
            {loadState === "loading"
              ? "Connecting to TGPI intelligence…"
              : loadState === "error"
                ? "Country intelligence is temporarily unavailable. App search remains active."
                : query.trim()
                  ? `${moduleResults.length} tools · ${countryResults.length} countries found`
                  : "Search across the connected TGPI system."}
          </div>

          {loadState === "error" ? (
            <button
              type="button"
              className="tgpi-compact-retry"
              onClick={() => setRetry((value) => value + 1)}
            >
              Reconnect country intelligence
            </button>
          ) : null}

          {query.trim() ? (
            <div className="tgpi-compact-results">
              {moduleResults.length > 0 ? (
                <section aria-labelledby="tgpi-tool-results">
                  <h3 id="tgpi-tool-results">Tools</h3>
                  <div className="tgpi-compact-tool-grid">
                    {moduleResults.map((module) => (
                      <Link key={module.id} href={module.href} onClick={closeSearch}>
                        <NavigationIcon name={getSuperAppIconName(module.id)} />
                        <span><strong>{module.shortLabel}</strong><small>{module.description}</small></span>
                        <NavigationIcon name="arrow" width={17} height={17} />
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {countryResults.length > 0 ? (
                <section aria-labelledby="tgpi-country-results">
                  <h3 id="tgpi-country-results">Countries</h3>
                  <div className="tgpi-compact-country-results">
                    {countryResults.map((country) => (
                      <Link key={country.slug} href={`/countries/${country.slug}`} onClick={closeSearch}>
                        <span aria-hidden="true">{country.emoji}</span>
                        <span><strong>{country.name}</strong><small>{country.capital} · {country.region}</small></span>
                        <NavigationIcon name="arrow" width={17} height={17} />
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {loadState === "ready" && moduleResults.length === 0 && countryResults.length === 0 ? (
                <p className="tgpi-compact-empty">No exact match. Open Apps to browse every TGPI capability.</p>
              ) : null}
            </div>
          ) : (
            <section className="tgpi-compact-discovery" aria-labelledby="tgpi-search-starts">
              <h3 id="tgpi-search-starts">Suggested starting points</h3>
              <div>
                {suggestedCountries.map((country) => (
                  <button key={country} type="button" onClick={() => setQuery(country)}>
                    {country}<NavigationIcon name="arrow" width={17} height={17} />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </dialog>
    </>
  );
}
