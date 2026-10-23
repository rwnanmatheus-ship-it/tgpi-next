"use client";
import Link from "next/link";
import { useResearchProfile } from "./useResearchProfile";
import { personalResearchPlan } from "@/lib/intelligence/core";
export default function CountryResearchBrief({ country, name }: { country: string; name: string }) {
  const { user, profile, journey } = useResearchProfile();
  const tasks = personalResearchPlan({ ...journey, languages: profile.languages, profession: profile.profession }, name);
  return <section className="country-brief" aria-label="Your research priorities"><div className="ig-spread"><div><p className="ig-eyebrow">Your next move / {journey.primaryGoal || "Explore"}</p><h2>{user?.firstName ? `${user.firstName}, make ${name} a practical plan.` : `Your next steps in ${name}.`}</h2></div><Link className="ig-link" href={`/country-fit?country=${country}`}>Adjust my priorities →</Link></div>
    <div className="research-context-chips"><span>Goal: {journey.primaryGoal || "Not set"}</span><span>Timeline: {journey.timeHorizon || "Exploring"}</span><span>Languages: {profile.languages.join(", ") || "Add to profile"}</span>{profile.profession && <span>{profile.profession}</span>}</div>
    <div className="country-priority-grid">{tasks.slice(0, 3).map((task, i) => <a key={task.title} href={i === 1 ? "#research-workbench" : "#research-dossier"}><span>0{i + 1}</span><strong>{task.title}</strong><p>{task.detail}</p></a>)}</div>
    <p className="ig-meta">Priorities follow your saved profile. Research tasks are not an eligibility decision. <Link href="/profile/security#settings-identity">Update profile</Link></p>
  </section>;
}
