import 'server-only';
import type { User } from '@clerk/nextjs/server';
import { courses } from '@/data/courses';
import { getAllCountries } from '@/lib/countries';
import { mergeAccountProfileWithOnboarding, normalizeAccountIdentity } from '@/lib/account-profile';
import { normalizeOnboardingData } from '@/lib/onboarding';
import { normalizeActivationProgress, TGPI_ACTIVATION_METADATA_KEY, getCourseProgressStatus } from '@/lib/activation-progress';
import { formatTgpiGlobalId } from '@/lib/auth/guards';
import { getGlobalRankSignals } from '@/lib/global-rank-signals';
import { getGlobalRank } from '@/lib/global-ranks';
import { buildGlobalWorkspaceModel } from '@/lib/global-workspace';
import { ensureMemberNumber } from './identity.server';
import { projectPublicMember } from './public-profile';
import { listUserLearningCredentials, getPublicLearningCredential } from '@/lib/learning-records.server';
const goals: Record<string, string> = { work: 'Work globally', live: 'Live abroad', study: 'Study abroad', travel: 'Explore internationally', learn: 'Build global knowledge' };
export async function buildPublicMember(user: User) {
  const onboarding = normalizeOnboardingData(user.unsafeMetadata.tgpiOnboarding);
  const profile = mergeAccountProfileWithOnboarding(user.unsafeMetadata.tgpiAccountProfile, onboarding);
  const activation = normalizeActivationProgress(user.privateMetadata[TGPI_ACTIVATION_METADATA_KEY]);
  const countries = getAllCountries();
  const model = buildGlobalWorkspaceModel(onboarding, countries, activation, courses);
  const rank = getGlobalRank({ ...getGlobalRankSignals(activation), activationCompletion: model.activationCompletion, planCompletion: model.completion, profileCompletion: 0 });
  const identity = await ensureMemberNumber(user.id);
  // Check current issuer records and integrity, never label a completion as a credential.
  const credentials = profile.privacy.showProgress ? await listUserLearningCredentials(user.id) : [];
  const checked = await Promise.all(credentials.map(c => getPublicLearningCredential(c.id)));
  const name = [normalizeAccountIdentity(user).firstName, normalizeAccountIdentity(user).lastName].filter(Boolean).join(' ') || 'TGPI member';
  return projectPublicMember({
    profile, identity, fallbackNumber: formatTgpiGlobalId(user.id), name, avatar: user.imageUrl,
    country: countries.find(c => c.slug === profile.currentCountry)?.name || profile.currentCountry,
    goal: goals[onboarding.primaryGoal] || '',
    countries: onboarding.targetCountries.flatMap(slug => { const c = countries.find(c => c.slug === slug); return c ? [{ name: c.name, path: `/countries/${c.slug}` }] : []; }),
    rank: { name: rank.name, points: rank.points },
    courses: courses.filter(c => activation.courseProgress[c.id] && getCourseProgressStatus(activation.courseProgress[c.id]) === 'completed').map(c => ({ title: c.title, path: `/courses/${c.id}` })),
    certificates: checked.filter(c => c?.status === 'active' && c.integrityVerified).map(c => ({ title: c!.courseTitle, path: `/verify/credentials/${c!.id}` })),
  });
}
