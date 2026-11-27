"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import styles from "./CountryDetail.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "country-learning", label: "Learning" },
  { id: "country-budget", label: "Budget" },
  { id: "country-research", label: "Research" },
  { id: "country-preparation", label: "Preparation" },
] as const;

export default function CountryProfileIndex() {
  const { t } = useLocale();
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const element = nav.current;
    if (!element) return;
    const targets = sections.map(({ id }) => document.getElementById(id));
    let frame = 0;

    function measure() {
      frame = 0;
      if (!element) return;
      const rootPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const stickyTop = parseFloat(getComputedStyle(element).top) || 0;
      const navBottom = stickyTop + element.offsetHeight;
      const visible = targets.filter(target => {
        if (!target) return false;
        // Fragment navigation aligns each section after BOTH the page padding and its own margin.
        const anchorMargin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const readingLine = Math.max(navBottom, rootPadding + anchorMargin);
        return target.getBoundingClientRect().top <= readingLine + 2;
      });
      const section = visible.at(-1);
      setActive(section?.id ?? sections[0].id);
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(measure);
    }
    function revealHash(hash: string) {
      const target = document.getElementById(hash.slice(1))
        ?? (hash === "#research-workbench" ? document.getElementById("budget-worksheet") : null);
      if (!target || !element?.parentElement?.contains(target)) return;
      let disclosure = target.closest("details");
      let wasClosed = false;
      while (disclosure) {
        if (!disclosure.open) {
          disclosure.open = true;
          wasClosed = true;
        }
        disclosure = disclosure.parentElement?.closest("details") ?? null;
      }
      if (wasClosed) target.scrollIntoView({ block: "start" });
      schedule();
    }
    function followFragment() { revealHash(window.location.hash); }
    function onLink(event: MouseEvent) {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (anchor && element?.parentElement?.contains(anchor)) revealHash(anchor.hash);
    }
    followFragment();
    schedule();
    const observer = new ResizeObserver(schedule);
    if (element.parentElement) observer.observe(element.parentElement);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", followFragment);
    element.parentElement?.addEventListener("click", onLink);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", followFragment);
      element.parentElement?.removeEventListener("click", onLink);
    };
  }, []);

  return (
    <nav className={styles.chapterNav} ref={nav} aria-label={t("Country research sections")}>
      <span className={styles.indexTitle}><NavigationIcon name="menu" width={16} height={16} /> {t("On this page")}</span>
      <div className={styles.desktopIndex}>
        {sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>{t(section.label)}</a>)}
      </div>
      <label className={styles.mobileIndex}>
        <span className="sr-only">{t("Country research sections")}</span>
        <select value={active} onChange={event => { window.location.hash = event.target.value; }}>
          {sections.map(section => <option key={section.id} value={section.id}>{t(section.label)}</option>)}
        </select>
        <NavigationIcon name="chevron" width={14} height={14} />
      </label>
    </nav>
  );
}
