"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Show } from "@clerk/nextjs";
import BrandCrest from "@/components/BrandCrest";
import MobileIcon from "./MobileIcon";
import { isFocusedMobileRoute, isMobileRouteActive, searchMobileCountries, type MobileCountry } from "@/lib/mobile-experience";
import { isSuperAppRouteActive, SUPER_APP_MODULES } from "@/lib/super-app";

const destinations: ReadonlyArray<{ href: string; label: string; emoji: string }> = [
  { href: "/countries", label: "Countries", emoji: "🌍" },
  { href: "/country-fit", label: "Country Fit", emoji: "🧭" },
  { href: "/compare", label: "Compare", emoji: "⚖️" },
  { href: "/courses", label: "Learning", emoji: "🎓" },
  { href: "/profile", label: "My TGPI", emoji: "✦" },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  return <MobileNavigationContent key={pathname} pathname={pathname} />;
}

function MobileNavigationContent({ pathname }: { pathname: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [mode, setMode] = useState<"menu" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<MobileCountry[]>([]);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [retry, setRetry] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const focused = isFocusedMobileRoute(pathname);

  useEffect(() => {
    if (!mode) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (media.matches) setMode(null); };
    media.addEventListener("change", onResize);
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", onResize);
      trigger.current?.focus({ preventScroll: true });
    };
  }, [mode]);

  useEffect(() => {
    const viewport = window.visualViewport;
    const update = () => {
      const editing = document.activeElement?.matches("input, textarea, select, [contenteditable=true]");
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
    if (mode !== "search") return;
    const controller = new AbortController();
    async function loadCountries() {
      setLoadState("loading");
      try {
        const response = await fetch("/api/mobile/countries", { signal: controller.signal });
        if (!response.ok) throw new Error("Country index unavailable");
        const value: unknown = await response.json();
        if (!Array.isArray(value) || !value.every((item) => item && typeof item === "object" && ["slug", "name", "capital", "region", "emoji"].every((key) => typeof (item as Record<string, unknown>)[key] === "string"))) throw new Error("Invalid index");
        setCountries(value as MobileCountry[]);
        setLoadState("ready");
      } catch {
        if (!controller.signal.aborted) setLoadState("error");
      }
    }
    void loadCountries();
    return () => controller.abort();
  }, [mode, retry]);

  function open(nextMode: "menu" | "search", button: HTMLButtonElement) {
    trigger.current = button;
    setMode(nextMode);
  }

  const results = searchMobileCountries(countries, query);

  return (
    <>
      <header className="tgpi-mobile mobile-topbar" aria-label="TGPI mobile header">
        <Link href="/" className="mobile-brand" aria-label="TGPI home" prefetch={false}>
          <BrandCrest width={34} height={42} sizes="34px" className="mobile-brand-crest" />
          <span><strong>TGPI</strong><small>YOUR WORLD, IN FOCUS</small></span>
        </Link>
        <div className="mobile-header-actions">
          <button type="button" className="mobile-icon-button" aria-label="Search countries" aria-haspopup="dialog" onClick={(event) => open("search", event.currentTarget)}><MobileIcon name="search" /></button>
          <button type="button" className="mobile-icon-button" aria-label="Open TGPI Super App" aria-haspopup="dialog" onClick={(event) => open("menu", event.currentTarget)}><MobileIcon name="menu" /></button>
        </div>
      </header>

      {!focused && <nav className="tgpi-mobile mobile-dock" aria-label="Mobile primary navigation" data-keyboard={keyboardOpen ? "open" : "closed"}>
        {destinations.map(({ href, label, emoji }) => <Link key={href} href={href} prefetch={false} aria-current={isMobileRouteActive(pathname, href) ? "page" : undefined}><span className="mobile-dock-emoji" aria-hidden="true">{emoji}</span><span>{label}</span></Link>)}
      </nav>}

      <dialog ref={dialog} className="mobile-sheet" aria-labelledby="mobile-sheet-title" onCancel={() => setMode(null)} onClick={(event) => { if (event.target === event.currentTarget) setMode(null); }}>
        <div className="mobile-sheet-content">
          <div className="mobile-sheet-heading"><div><p className="mobile-eyebrow">TGPI INTELLIGENCE OPERATING SYSTEM</p><h2 id="mobile-sheet-title">{mode === "search" ? "Where will you go?" : "Your Super App."}</h2></div><button type="button" className="mobile-icon-button" aria-label="Close mobile panel" onClick={() => setMode(null)}><MobileIcon name="close" /></button></div>
          {mode === "search" ? <div className="mobile-search-panel">
            <label htmlFor="mobile-country-search">Find a country or capital</label>
            <div className="mobile-search-field"><MobileIcon name="search" /><input id="mobile-country-search" type="search" value={query} placeholder="Try Portugal, Tokyo or Europe" autoComplete="off" enterKeyHint="search" onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="mobile-search-status" role="status">{loadState === "loading" ? "Loading country directory…" : loadState === "error" ? "The directory could not load. You can still browse countries." : query.trim() ? `${results.length === 12 ? "First 12" : results.length} matching destinations` : "A starting point for your research"}</div>
            {loadState === "error" && <button type="button" className="mobile-secondary-button" onClick={() => setRetry((value) => value + 1)}>Try again</button>}
            {query.trim() && loadState === "ready" ? <div className="mobile-search-results">{results.map((country) => <Link key={country.slug} href={`/countries/${country.slug}`} onClick={() => setMode(null)} prefetch={false}><span aria-hidden="true">{country.emoji}</span><span><strong>{country.name}</strong><small>{country.capital} · {country.region}</small></span><MobileIcon name="chevron" /></Link>)}{results.length === 0 && <p>No matches yet. Try a country name, capital or region.</p>}</div> : <div className="mobile-suggestion-list">{["Portugal", "Canada", "Japan", "Spain"].map((name) => <button key={name} type="button" onClick={() => setQuery(name)}>{name}<MobileIcon name="arrow" /></button>)}</div>}
            <Link href="/countries#country-explorer" className="mobile-text-link" onClick={() => setMode(null)}>Browse all 195 country profiles <MobileIcon name="arrow" /></Link>
          </div> : <>
            <section className="mobile-super-app-visual" aria-label="TGPI connected intelligence">
              <Image src="/images/super-app/tgpi-intelligence-network-v1.webp" alt="" fill sizes="100vw" className="mobile-super-app-visual-image" />
              <div className="mobile-super-app-visual-shade" />
              <div className="mobile-super-app-visual-content"><span>ONE CONNECTED SYSTEM</span><strong>From evidence to action.</strong><small>Your identity, decisions and learning stay connected.</small></div>
            </section>
            <nav className="mobile-super-app-grid" aria-label="TGPI Super App modules">
              {SUPER_APP_MODULES.map((module) => {
                const active = isSuperAppRouteActive(pathname, module);
                return <Link key={module.id} href={module.href} onClick={() => setMode(null)} prefetch={false} aria-current={active ? "page" : undefined}><span aria-hidden="true">{module.icon}</span><strong>{module.shortLabel}</strong><small>{active ? "Open now" : module.description}</small></Link>;
              })}
            </nav>
            <div className="mobile-member-card"><MobileIcon name="key" /><div><strong>One Global Key. Every next step.</strong><p>Connect your learning, countries and preparation.</p></div><Show when="signed-out"><Link className="mobile-primary-button" href="/sign-up" onClick={() => setMode(null)}>Create your free Global Key <MobileIcon name="arrow" /></Link><Link className="mobile-text-link" href="/sign-in" onClick={() => setMode(null)}>Already a member? Sign in</Link></Show><Show when="signed-in"><Link href="/profile" className="mobile-primary-button" onClick={() => setMode(null)}>Continue to your workspace <MobileIcon name="arrow" /></Link></Show></div>
            <div className="mobile-menu-footer"><Link href="/pricing" onClick={() => setMode(null)}>Premium</Link><Link href="/about" onClick={() => setMode(null)}>About TGPI</Link><Link href="/authority" onClick={() => setMode(null)}>Methodology</Link><Link href="/privacy" onClick={() => setMode(null)}>Privacy</Link></div>
          </>}
        </div>
      </dialog>
    </>
  );
}
