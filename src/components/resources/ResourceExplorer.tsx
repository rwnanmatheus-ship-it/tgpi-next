"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const objectives = [
  {
    id: "explore",
    label: "Explore",
    title: "Find possibilities worth investigating.",
    description:
      "Start with country information and its sources. Look for evidence relevant to your own priorities.",
    href: "/countries",
    action: "Explore countries",
    next: "Then compare your shortlist",
    nextHref: "/compare",
  },
  {
    id: "compare",
    label: "Compare",
    title: "Understand the trade-offs.",
    description:
      "Compare up to three countries. Check reference years, evidence gaps and the questions behind your decision.",
    href: "/compare",
    action: "Build a comparison",
    next: "Then structure your research",
    nextHref: "/country-fit",
  },
  {
    id: "learn",
    label: "Learn",
    title: "Build a capability you can use.",
    description:
      "Browse the course catalogue, check availability and choose your next practical learning step.",
    href: "/courses",
    action: "Explore learning",
    next: "View your certificates",
    nextHref: "/certificates",
  },
  {
    id: "prepare",
    label: "Prepare",
    title: "Turn uncertainty into next steps.",
    description:
      "Explore document preparation, then use your account to connect your goals, learning and readiness.",
    href: "/passport",
    action: "Explore document preparation",
    next: "Open your Workspace · account required",
    nextHref: "/profile",
  },
  {
    id: "progress",
    label: "Track",
    title: "Keep your journey in view.",
    description:
      "Sign in to your Workspace to review priorities, your country shortlist and recorded progress.",
    href: "/profile",
    action: "Open my Workspace",
    next: "Explore your TGPI Global ID · account required",
    nextHref: "/global-key",
  },
] as const;

export function ResourcesNavigation() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
    );
    objectives.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="resources-nav" aria-label="Resource objectives">
      {objectives.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={active === item.id ? "location" : undefined}
        >
          {item.label}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}

export default function ResourceExplorer() {
  const [selected, setSelected] = useState<string>("explore");
  const item =
    objectives.find((objective) => objective.id === selected) ?? objectives[0];
  return (
    <section
      className="resources-selector"
      aria-labelledby="resource-selector-title"
    >
      <div>
        <p className="resources-kicker">Your starting point</p>
        <h2 id="resource-selector-title">What would you like to do first?</h2>
        <p>
          Select an objective to see a suggested starting tool. This guide does
          not use personal data or calculate a country recommendation.
        </p>
      </div>
      <div>
        <div
          className="resources-options"
          role="group"
          aria-label="Choose your objective"
        >
          {objectives.map((objective) => (
            <button
              key={objective.id}
              type="button"
              aria-pressed={selected === objective.id}
              onClick={() => setSelected(objective.id)}
            >
              {objective.label}
            </button>
          ))}
        </div>
        <div
          className="resources-recommendation"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="resources-kicker">Suggested route</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Link className="resources-button" href={item.href}>
            {item.action} <span aria-hidden="true">↗</span>
          </Link>
          <Link className="resources-text-link" href={item.nextHref}>
            {item.next} →
          </Link>
        </div>
      </div>
    </section>
  );
}
