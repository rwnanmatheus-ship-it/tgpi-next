import type { Metadata } from "next";
import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { cache } from "react";
import PublicProfileShareButton from "@/components/profile/PublicProfileShareButton";
import GlobalRankBadge from "@/components/profile/GlobalRankBadge";
import {
  canViewTgpiProfile,
  getAccountProfileCompletion,
  mergeAccountProfileWithOnboarding,
  normalizeAccountIdentity,
} from "@/lib/account-profile";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import { formatTgpiGlobalId } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { GLOBAL_RANK_DISCLAIMER, getGlobalRank } from "@/lib/global-ranks";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";

type PublicProfilePageProps = {
  params: Promise<{ userId: string }>;
};

const goalLabels: Record<string, string> = {
  learn: "Expand global knowledge",
  live: "Live in another country",
  study: "Study abroad",
  travel: "Travel smarter",
  work: "Work globally",
};

const getProfileUser = cache(async (userId: string) => {
  try {
    const client = await clerkClient();
    return await client.users.getUser(userId);
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { userId } = await params;
  const [user, viewer] = await Promise.all([getProfileUser(userId), auth()]);
  const profile = mergeAccountProfileWithOnboarding(
    user?.unsafeMetadata.tgpiAccountProfile,
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const canIdentify = user
    ? canViewTgpiProfile({
        ownerId: user.id,
        viewerId: viewer.userId,
        visibility: profile.privacy.visibility,
      })
    : false;
  const name = user?.fullName || user?.firstName || "TGPI member";

  return {
    title: canIdentify ? `${name} — TGPI Global Profile` : "Member profile — TGPI",
    description:
      canIdentify
        ? profile.bio ||
          `Explore ${name}'s shareable global identity on The Global Polymath Institute.`
        : "A privacy-controlled member profile on The Global Polymath Institute.",
    robots: { index: false, follow: false },
  };
}

function Avatar({ imageUrl, initials, name }: { imageUrl: string; initials: string; name: string }) {
  return (
    <div
      aria-label={`${name} profile image`}
      className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-[#E5B94B] bg-[#132B47] bg-cover bg-center font-[var(--tgpi-font-display)] text-4xl font-semibold text-[#F0D58C] shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:h-40 sm:w-40"
      role="img"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
    >
      {!imageUrl ? initials : <span className="sr-only">{name}</span>}
    </div>
  );
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const [{ userId }, viewer] = await Promise.all([params, auth()]);
  const user = await getProfileUser(userId);
  if (!user) notFound();

  const isOwner = viewer.userId === user.id;
  const onboarding = normalizeOnboardingData(user.unsafeMetadata.tgpiOnboarding);
  const profile = mergeAccountProfileWithOnboarding(
    user.unsafeMetadata.tgpiAccountProfile,
    onboarding,
  );
  const identity = normalizeAccountIdentity({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const activation = normalizeActivationProgress(
    user.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );

  const canView = canViewTgpiProfile({
    ownerId: user.id,
    viewerId: viewer.userId,
    visibility: profile.privacy.visibility,
  });
  if (!canView && profile.privacy.visibility === "private") notFound();

  const membersOnly = !canView && profile.privacy.visibility === "members";
  const fullName = [identity.firstName, identity.lastName].filter(Boolean).join(" ") || "TGPI member";
  const initials = `${identity.firstName.at(0) ?? ""}${identity.lastName.at(0) ?? ""}`.toUpperCase() || "TG";
  const countries = getAllCountries();
  const countryMap = new Map(countries.map((country) => [country.slug, country]));
  const currentCountry = countryMap.get(profile.currentCountry);
  const targetCountries = onboarding.targetCountries
    .flatMap((slug) => {
      const country = countryMap.get(slug);
      return country ? [country] : [];
    })
    .slice(0, 5);
  const profileCompletion = getAccountProfileCompletion(identity, profile);
  const workspaceModel = buildGlobalWorkspaceModel(onboarding, countries, activation);
  const rank = getGlobalRank({
    activationCompletion: workspaceModel.activationCompletion,
    comparisons: activation.comparisons.length,
    documentReviews: Object.keys(activation.documentReviews).length,
    learningPaths: Object.keys(activation.courseProgress).length,
    planCompletion: workspaceModel.completion,
    profileCompletion,
    savedCountries: activation.savedCountries.length,
  });
  const publicPath = `/member/${user.id}`;
  const publicDetails = [
    profile.profession ? { label: "Field", value: profile.profession } : null,
    profile.educationLevel ? { label: "Education", value: profile.educationLevel } : null,
    profile.nationality ? { label: "Nationality", value: profile.nationality } : null,
    profile.languages.length ? { label: "Languages", value: profile.languages.join(", ") } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  if (membersOnly) {
    return (
      <main id="main-content" className="min-h-[75vh] bg-[#050D17] px-4 py-20 text-white sm:px-6">
        <section className="mx-auto max-w-2xl rounded-[32px] border border-white/10 bg-[#0A1726] p-7 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#E5B94B]/10 text-2xl text-[#F0D58C]">◎</span>
          <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E5B94B]">TGPI members profile</p>
          <h1 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold">Sign in to view this global profile.</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#AEBBC9]">The member chose to share this identity only inside the authenticated TGPI community.</p>
          <Link className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#E5B94B] px-6 text-sm font-extrabold text-[#07182D]" href={`/sign-in?redirect_url=${encodeURIComponent(publicPath)}`}>Sign in securely</Link>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#050D17] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[#B58A2A]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-[#184C72]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <Avatar imageUrl={user.imageUrl} initials={initials} name={fullName} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#E5B94B]/30 bg-[#E5B94B]/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F0D58C]">TGPI Global Profile</span>
              {isOwner ? <span className="rounded-full border border-[#6FC59C]/25 bg-[#6FC59C]/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#9FD5BD]">Your preview</span> : null}
            </div>
            <h1 className="mt-5 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.035em] sm:text-6xl">{fullName}</h1>
            <p className="mt-4 max-w-2xl text-base font-bold text-[#D6DFE9] sm:text-lg">{profile.headline || "Global learner and decision-maker"}</p>
            {profile.privacy.showLocation && (profile.currentCity || currentCountry) ? <p className="mt-3 text-sm text-[#96A7BA]">{[profile.currentCity, currentCountry ? `${currentCountry.emoji} ${currentCountry.name}` : profile.currentCountry].filter(Boolean).join(", ")}</p> : null}
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#AEBBC9]">{profile.bio || "This member is building a connected global identity through learning, verified research and informed international decisions."}</p>
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <PublicProfileShareButton title={`${fullName} — TGPI Global Profile`} url={publicPath} />
            {isOwner ? <Link className="text-xs font-extrabold text-[#F0D58C] underline decoration-[#E5B94B]/40 underline-offset-4" href="/profile/security#settings-public-profile">Edit public profile</Link> : null}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <div className="grid gap-5">
            <article className="rounded-[28px] border border-white/10 bg-[#0A1726] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#E5B94B]">Global identity</p>
              <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold">Context that helps people understand the person.</h2>
              {publicDetails.length ? (
                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  {publicDetails.map((item) => <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4" key={item.label}><dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#8091A4]">{item.label}</dt><dd className="mt-2 text-sm font-bold leading-6 text-[#E8EDF3]">{item.value}</dd></div>)}
                </dl>
              ) : <p className="mt-5 text-sm leading-7 text-[#96A7BA]">This member has not added public education, profession or language details yet.</p>}
            </article>

            {profile.privacy.showGoals ? (
              <article className="rounded-[28px] border border-[#E5B94B]/20 bg-[#0D1D30] p-6 sm:p-8">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#E5B94B]">International direction</p>
                <h2 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold">{goalLabels[onboarding.primaryGoal] || "Exploring global possibilities"}</h2>
                <p className="mt-4 text-sm leading-7 text-[#AEBBC9]">{targetCountries.length ? "Current country shortlist:" : "A country shortlist has not been shared yet."}</p>
                {targetCountries.length ? <div className="mt-4 flex flex-wrap gap-2">{targetCountries.map((country) => <Link className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-[#E5ECF3] transition hover:border-[#E5B94B]/40" href={`/countries/${country.slug}`} key={country.slug}>{country.emoji} {country.name}</Link>)}</div> : null}
                <Link className="mt-6 inline-flex text-xs font-extrabold text-[#F0D58C]" href="/countries">Explore country intelligence →</Link>
              </article>
            ) : null}
          </div>

          <aside className="grid content-start gap-5">
            <article className="rounded-[28px] border border-white/10 bg-[#0A1726] p-6">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#8091A4]">TGPI Global ID</p>
              <p className="mt-3 break-all font-[var(--tgpi-font-display)] text-xl font-semibold text-[#F0D58C]">{formatTgpiGlobalId(user.id)}</p>
              <p className="mt-3 text-xs leading-6 text-[#8E9FB2]">A stable public reference inside TGPI. It is never a password or identity document.</p>
            </article>

            {profile.privacy.showProgress ? (
              <article className="overflow-hidden rounded-[28px] border border-[#E5B94B]/20 bg-[radial-gradient(circle_at_top_right,rgba(42,105,157,0.3),transparent_45%),#0A1726] p-6">
                <div className="flex items-center gap-4"><GlobalRankBadge rank={rank} size="medium" /><div><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#E5B94B]">TGPI Global Rank</p><p className="mt-1 font-[var(--tgpi-font-display)] text-2xl font-semibold">{rank.name}</p><p className="mt-1 text-xs text-[#96A7BA]">{rank.points} / 1,000 points</p></div></div>
                <div className="mt-5 flex items-end justify-between gap-3"><div><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#8091A4]">Profile readiness</p><p className="mt-2 text-2xl font-extrabold">{profileCompletion}%</p></div><span className="text-xs font-extrabold text-[#9FD5BD]">Member controlled</span></div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#E5B94B]" style={{ width: `${profileCompletion}%` }} /></div>
                <p className="mt-4 text-[10px] leading-5 text-[#7F91A4]">{GLOBAL_RANK_DISCLAIMER}</p>
              </article>
            ) : null}

            {(profile.website || profile.linkedin || profile.instagram) ? (
              <article className="rounded-[28px] border border-white/10 bg-[#0A1726] p-6">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#8091A4]">Verified by the member</p>
                <div className="mt-4 grid gap-2">
                  {profile.website ? <a className="rounded-xl border border-white/10 px-4 py-3 text-xs font-extrabold text-[#E8EDF3] transition hover:border-[#E5B94B]/50" href={profile.website} rel="noreferrer" target="_blank">Website ↗</a> : null}
                  {profile.linkedin ? <a className="rounded-xl border border-white/10 px-4 py-3 text-xs font-extrabold text-[#E8EDF3] transition hover:border-[#E5B94B]/50" href={profile.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a> : null}
                  {profile.instagram ? <a className="rounded-xl border border-white/10 px-4 py-3 text-xs font-extrabold text-[#E8EDF3] transition hover:border-[#E5B94B]/50" href={profile.instagram} rel="noreferrer" target="_blank">Instagram ↗</a> : null}
                </div>
              </article>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}
