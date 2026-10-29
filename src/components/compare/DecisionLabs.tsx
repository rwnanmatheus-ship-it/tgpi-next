"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { LocalizedText } from "@/components/localization/LocaleProvider";

const Workbench = dynamic(() => import("@/components/intelligence/ResearchWorkbench"), {
  loading: () => <p role="status"><LocalizedText text="Loading your decision workspace…" /></p>,
});

export default function DecisionLabs({ countries }: { countries: { slug: string; name: string }[] }) {
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  return <>{countries.map(country => <details className="ig-details" key={country.slug} onToggle={event => {
    if (event.currentTarget.open) setVisited(previous => previous.has(country.slug) ? previous : new Set([...previous, country.slug]));
  }}><summary><LocalizedText text={country.name} /> · <LocalizedText text="Budget & preparation" /></summary>
    {visited.has(country.slug) ? <Workbench country={country.slug} countryName={country.name} /> : null}
  </details>)}</>;
}
