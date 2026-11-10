"use client";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import Link from "next/link";
import { useResearchProfile } from "./useResearchProfile";
import { personalResearchPlan } from "@/lib/intelligence/core";
import { LocalizedText } from "@/components/localization/LocaleProvider";

export default function CountryResearchBrief({ country, name }: { country: string; name: string }) {
  const { user, profile, journey } = useResearchProfile();
  const tasks = personalResearchPlan({ ...journey, languages: profile.languages, profession: profile.profession }, name);
  return <LocalizedElement as="section" className="country-brief" aria-label="Your research priorities"><div className="ig-spread"><div><p className="ig-eyebrow"><LocalizedText text={"Your next move /"} />{" "}{journey.primaryGoal || <LocalizedText text={"Explore"} />}</p><h2>{user?.firstName ? <LocalizedText text={"{value0}, make {value1} a practical plan."} values={{value0: String(user.firstName), value1: String(name)}} /> : <LocalizedText text={"Your next steps in {value0}."} values={{value0: String(name)}} />}</h2></div><Link className="ig-link" href={`/country-fit?country=${country}`}><LocalizedText text={"Adjust my priorities →"} /></Link></div>
    <div className="research-context-chips"><span><LocalizedText text="Goal:" />{" "}{journey.primaryGoal || <LocalizedText text={"Not set"} />}</span><span><LocalizedText text={"Timeline:"} />{" "}{journey.timeHorizon || <LocalizedText text={"Exploring"} />}</span><span><LocalizedText text="Languages:" />{" "}{profile.languages.join(", ") || <LocalizedText text={"Add to profile"} />}</span>{profile.profession && <span>{profile.profession}</span>}</div>
    <div className="country-priority-grid">{tasks.slice(0, 3).map((task, i) => <a key={task.title} href={i === 1 ? "#research-workbench" : "#research-dossier"}><span>0{i + 1}</span><strong><LocalizedText text={task.title} /></strong><p><LocalizedText text={task.detail} /></p></a>)}</div>
    <p className="ig-meta"><LocalizedText text={"Priorities follow your saved profile. Research tasks are not an eligibility decision."} />{" "}<Link href="/profile/security#settings-identity"><LocalizedText text={"Update profile"} /></Link></p>
  </LocalizedElement>;
}
