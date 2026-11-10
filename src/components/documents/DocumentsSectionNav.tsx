"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";

const studio = { id: "preparation-paths", label: "Research studio", short: "Research", icon: "compass" } as const;
const files = { id: "destination-files", label: "Destination files", short: "Dossiers", icon: "file" } as const;
const tools = { id: "document-tools", label: "Document tools", short: "Tools", icon: "apps" } as const;
const connections = { id: "connected-preparation", label: "TGPI connections", short: "TGPI", icon: "key" } as const;
const guestSections = [studio, tools, connections];
const memberSections = [studio, files, tools, connections];

export default function DocumentsSectionNav({ member }: { member: boolean }) {
  const { t } = useLocale();
  const sections = member ? memberSections : guestSections;
  const [active, setActive] = useState<string>(studio.id);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const navigation = nav.current;
    if (!navigation) return;
    let frame = 0;
    function update() {
      frame = 0;
      if (!navigation) return;
      const navTop = Number.parseFloat(getComputedStyle(navigation).top) || 0;
      const rootPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const offset = Math.max(navTop, rootPadding) + navigation.offsetHeight + 34;
      let section: string = studio.id;
      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= offset) section = id;
      }
      setActive(section);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function measure() {
      if (!navigation) return;
      navigation.parentElement?.style.setProperty("--documents-nav-height", `${navigation.offsetHeight}px`);
      schedule();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(navigation);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [sections]);

  return <nav ref={nav} className="documents-jump" aria-label={t("Documents sections")}>
    <div className="documents-nav-strip">
      {sections.map(({ id, label, short, icon }, index) => <a
        key={id}
        href={`#${id}`}
        aria-label={t(label)}
        aria-current={active === id ? "location" : undefined}
        onClick={() => setActive(id)}
      >
        <span className="documents-nav-index" aria-hidden="true">0{index + 1}</span>
        <NavigationIcon name={icon} width={19} height={19} />
        <span className="documents-nav-full">{t(label)}</span>
        <span className="documents-nav-short" aria-hidden="true">{t(short)}</span>
      </a>)}
    </div>
  </nav>;
}
