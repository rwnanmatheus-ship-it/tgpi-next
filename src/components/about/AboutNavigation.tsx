"use client";

import { useEffect, useState } from "react";
import styles from "./about.module.css";

const sections = [["purpose", "Our purpose"], ["framework", "Our framework"], ["learning", "Practical learning"], ["principles", "Our principles"]] as const;

export default function AboutNavigation() {
  const [active, setActive] = useState<string>("purpose");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-15% 0px -45% 0px", threshold: [0, 0.2, 0.5] });
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return <nav className={styles.navigation} aria-label="About TGPI sections">{sections.map(([id, label], index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}><span>0{index + 1}</span>{label}</a>)}</nav>;
}
