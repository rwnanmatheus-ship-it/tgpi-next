import type { TgpiAccountProfile } from '../account-profile';
import type { MemberIdentity } from './identity';
export type PublicMemberProfile = {
  name: string; avatar: string; headline: string; bio: string; number: string; handle: string;
  path: string; visibility: TgpiAccountProfile['privacy']['visibility']; indexable: boolean;
  country: string; career: string[]; languages: string[]; links: { label: string; url: string }[];
  goal: string; countries: { name: string; path: string }[];
  rank: { name: string; points: number } | null;
  courses: { title: string; path: string }[];
  certificates: { title: string; path: string }[];
};
export function projectPublicMember(input: {
  profile: TgpiAccountProfile; identity: MemberIdentity | null; fallbackNumber: string;
  name: string; avatar: string; country: string; goal: string;
  countries: PublicMemberProfile['countries']; rank: PublicMemberProfile['rank'];
  courses: PublicMemberProfile['courses']; certificates: PublicMemberProfile['certificates'];
}): PublicMemberProfile {
  const p = input.profile;
  const number = input.identity?.number ?? input.fallbackNumber;
  return {
    name: p.displayName || input.name, avatar: input.avatar, headline: p.headline, bio: p.bio,
    number, handle: input.identity?.handle ?? '', path: `/member/${encodeURIComponent(number)}`,
    visibility: p.privacy.visibility, indexable: p.privacy.visibility === 'public' && p.privacy.allowIndexing,
    country: p.privacy.showLocation ? input.country : '',
    career: p.privacy.showCareer ? [p.profession, p.educationLevel].filter(Boolean) : [],
    languages: p.privacy.showLanguages ? p.languages : [],
    links: p.privacy.showLinks ? [{ label: 'Website', url: p.website }, { label: 'LinkedIn', url: p.linkedin }, { label: 'Instagram', url: p.instagram }].filter(x => x.url) : [],
    goal: p.privacy.showGoals ? input.goal : '', countries: p.privacy.showGoals ? input.countries : [],
    rank: p.privacy.showProgress ? input.rank : null,
    courses: p.privacy.showProgress ? input.courses : [], certificates: p.privacy.showProgress ? input.certificates : [],
  };
}
