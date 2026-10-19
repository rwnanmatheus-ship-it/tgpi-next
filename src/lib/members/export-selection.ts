import type { PublicMemberProfile } from './public-profile';
export const exportGroups = ['photo', 'bio', 'career', 'languages', 'links', 'goals', 'progress'] as const;
export type ExportGroup = typeof exportGroups[number];
export function selectMemberExport(member: PublicMemberProfile, selected: unknown): PublicMemberProfile {
  const fields = new Set(Array.isArray(selected) ? selected.filter(x => typeof x === 'string') : []);
  return { ...member,
    avatar: fields.has('photo') ? member.avatar : '',
    bio: fields.has('bio') ? member.bio : '',
    career: fields.has('career') ? member.career : [],
    languages: fields.has('languages') ? member.languages : [],
    links: fields.has('links') ? member.links : [],
    goal: fields.has('goals') ? member.goal : '', countries: fields.has('goals') ? member.countries : [],
    rank: fields.has('progress') ? member.rank : null,
    courses: fields.has('progress') ? member.courses : [], certificates: fields.has('progress') ? member.certificates : [],
    country: '', // The portable card never includes residence.
  };
}
