import { auth, currentUser } from '@clerk/nextjs/server';
import { normalizeTgpiAccountProfile } from '@/lib/account-profile';
import { normalizeOnboardingData } from '@/lib/onboarding';
import { normalizeActivationProgress, TGPI_ACTIVATION_METADATA_KEY } from '@/lib/activation-progress';
import { getMemberIdentity } from '@/lib/members/identity.server';
export async function GET() {
  const { userId } = await auth(); const headers = { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie' };
  if (!userId) return Response.json({ error: 'Sign in to export your data.' }, { status: 401, headers });
  try {
    const user = await currentUser(); if (!user) return Response.json({ error: 'Session expired.' }, { status: 401, headers });
    return Response.json({ exportedAt: new Date().toISOString(), scope: 'TGPI profile, international preferences, identity and platform progress. Billing and credentials remain available in their dedicated centers.', identity: await getMemberIdentity(userId), name: { firstName: user.firstName, lastName: user.lastName }, profile: normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile), internationalPlan: normalizeOnboardingData(user.unsafeMetadata.tgpiOnboarding), progress: normalizeActivationProgress(user.privateMetadata[TGPI_ACTIVATION_METADATA_KEY]) }, { headers: { ...headers, 'Content-Disposition': 'attachment; filename="tgpi-account-data.json"' } });
  } catch { return Response.json({ error: 'Unable to export account data. Please retry.' }, { status: 503, headers }); }
}
