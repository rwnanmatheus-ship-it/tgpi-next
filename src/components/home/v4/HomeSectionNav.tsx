"use client";
import { useLocale } from "@/components/localization/LocaleProvider";

import { useEffect, useRef, useState } from "react";
import { HOME_SECTIONS } from "@/lib/home-journey";
import styles from "./home.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type SectionId = typeof HOME_SECTIONS[number]["id"];

export default function HomeSectionNav() {
  const { t } = useLocale();
  const [active, setActive] = useState<SectionId>("how-it-works");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const home = ref.current?.closest("main");
    const headers = Array.from(document.querySelectorAll<HTMLElement>(".tgpi-desktop-navigation, .tgpi-compact-topbar"));
    let frame = 0;
    let marker = 168;
    const sections = HOME_SECTIONS.map(section => ({ id: section.id, element: document.getElementById(section.id) }));
    const updateActive = () => {
      frame = 0;
      const current = sections.filter(section => section.element && section.element.getBoundingClientRect().top <= marker).at(-1);
      setActive(current?.id ?? HOME_SECTIONS[0].id);
    };
    const scheduleUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateActive); };
    const measure = () => {
      const height = Math.max(0, ...headers.map(header => header.getBoundingClientRect().height));
      home?.style.setProperty("--home-header-offset", `${height}px`);
      const rootPadding = Number.parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      home?.style.setProperty("--home-root-scroll-padding", `${rootPadding}px`);
      marker = height + 88;
      scheduleUpdate();
    };
    const resize = new ResizeObserver(measure);
    headers.forEach(header => resize.observe(header));
    measure();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    return () => { resize.disconnect(); window.removeEventListener("scroll", scheduleUpdate); window.removeEventListener("resize", measure); window.cancelAnimationFrame(frame); home?.style.removeProperty("--home-header-offset"); home?.style.removeProperty("--home-root-scroll-padding"); };
  }, []);
  function jump(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `#${id}`);
    target.focus({ preventScroll: true });
  }
  const index = HOME_SECTIONS.findIndex(section => section.id === active);
  return <nav ref={ref} className={styles.sectionNav} aria-label={t("On this page")}>
    <div className={`${styles.container} ${styles.sectionNavInner}`}>
      <span className={styles.sectionNavLabel}><LocalizedText text="Inside TGPI" /></span>
      <ol className={styles.sectionNavLinks}>{HOME_SECTIONS.map((section, i) => <li key={section.id}><a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}><span aria-hidden="true">0{i + 1}</span>{t(section.short)}</a></li>)}</ol>
      <label className={styles.sectionNavSelect}><span className="sr-only"><LocalizedText text="Jump to a section" /></span><select value={active} onChange={event => jump(event.target.value)}>{HOME_SECTIONS.map((section, i) => <option key={section.id} value={section.id}>0{i + 1} · {t(section.label)}</option>)}</select></label>
      <span className={styles.sectionCount} aria-hidden="true">0{index + 1}<span> / {String(HOME_SECTIONS.length).padStart(2, "0")}</span></span>
    </div>
  </nav>;
}
