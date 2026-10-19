"use client";

import { useEffect, useRef, useState } from "react";
import { HOME_SECTIONS } from "@/lib/home-journey";
import styles from "./home.module.css";

type SectionId = typeof HOME_SECTIONS[number]["id"];

export default function HomeSectionNav() {
  const [active, setActive] = useState<SectionId>("how-it-works");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const home = ref.current?.closest("main");
    const headers = Array.from(document.querySelectorAll<HTMLElement>(".tgpi-desktop-navigation, .tgpi-compact-topbar"));
    const measure = () => {
      const height = Math.max(0, ...headers.map(header => header.getBoundingClientRect().height));
      home?.style.setProperty("--home-header-offset", `${height}px`);
    };
    const resize = new ResizeObserver(measure);
    headers.forEach(header => resize.observe(header));
    measure();
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const id = visible[0]?.target.id;
      if (HOME_SECTIONS.some(section => section.id === id)) setActive(id as SectionId);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: 0 });
    HOME_SECTIONS.forEach(section => { const element = document.getElementById(section.id); if (element) observer.observe(element); });
    return () => { observer.disconnect(); resize.disconnect(); home?.style.removeProperty("--home-header-offset"); };
  }, []);
  function jump(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `#${id}`);
    target.focus({ preventScroll: true });
  }
  const index = HOME_SECTIONS.findIndex(section => section.id === active);
  return <nav ref={ref} className={styles.sectionNav} aria-label="On this page">
    <div className={`${styles.container} ${styles.sectionNavInner}`}>
      <span className={styles.sectionNavLabel}>Inside TGPI</span>
      <ol className={styles.sectionNavLinks}>{HOME_SECTIONS.map((section, i) => <li key={section.id}><a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}><span aria-hidden="true">0{i + 1}</span>{section.short}</a></li>)}</ol>
      <label className={styles.sectionNavSelect}><span className="sr-only">Jump to a section</span><select value={active} onChange={event => jump(event.target.value)}>{HOME_SECTIONS.map((section, i) => <option key={section.id} value={section.id}>0{i + 1} · {section.label}</option>)}</select></label>
      <span className={styles.sectionCount} aria-hidden="true">0{index + 1}<span> / 06</span></span>
    </div>
  </nav>;
}
