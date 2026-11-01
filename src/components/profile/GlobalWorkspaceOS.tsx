import { getLocale } from '@/lib/localization/server';
import { translate } from '@/lib/localization/messages';
import CommunityConnections from '@/components/community/CommunityConnections';
import GlobalRankBadge from './GlobalRankBadge';
import { GLOBAL_RANK_DISCLAIMER, type GlobalRank } from '@/lib/global-ranks';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { GlobalWorkspaceModel } from '@/lib/global-workspace';
import type { WorkspacePreferences, WorkspaceResource } from '@/lib/workspace-control';
import type { ActivationActivity } from '@/lib/activation-progress';
import WorkspacePersonalSpace from './WorkspacePersonalSpace';
import WorkspaceCertificates from './WorkspaceCertificates';
import WorkspaceCommandButton from './WorkspaceCommandButton';
import WorkspaceSyncButton from './WorkspaceSyncButton';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import { SUPER_APP_MODULES } from '@/lib/super-app';
import { getSuperAppIconName } from '@/lib/navigation-system';
import styles from './WorkspaceCommandCenter.module.css';
import { LocalizedText } from "@/components/localization/LocaleProvider";


type Props = {
  identity: { avatarUrl: string; firstName: string; fullName: string; globalId: string; headline: string; membership: string; profileCompletion: number; publicProfileUrl: string; handle?: string };
  model: GlobalWorkspaceModel; onboardingCompleted?: boolean; rank: GlobalRank;
  userId: string; resources: WorkspaceResource[]; history: ActivationActivity[]; historyCursor: string | null; historyCoverage: string | null; historyAvailable: boolean; preferences: WorkspacePreferences; preferencesAvailable: boolean;
};
const labels = { completed: 'Completed', in_progress: 'In progress', needs_attention: 'Needs context', not_started: 'Not started' };
function Progress({ value, label }: { value: number; label: string }) {
  return <div className={styles.progress}><progress max={100} value={value} aria-label={label} /><span>{value}%</span></div>;
}
export default async function GlobalWorkspaceOS({ identity, model, onboardingCompleted, rank, userId, resources, history, historyCursor, historyCoverage, historyAvailable, preferences, preferencesAvailable }: Props) {
  const locale = await getLocale();
  const t = (key: string, values?: Record<string, string | number>) => translate(locale, key, values);
  const inProgress = model.actions.filter(a => a.status === 'in_progress');
  const suggestions = [...model.actions].filter(a => a.status !== 'completed').sort((a,b) => Number(b.status === 'in_progress') - Number(a.status === 'in_progress'));
  const resume = resources.find(r => r.kind === 'course' && r.status === 'in_progress') ?? resources.find(r => r.kind === 'documents' && r.status === 'in_progress');
  const primary = resume ? { href: resume.href, action: 'Continue where you left off' } : suggestions[0];
  const activityValues = new Map(model.activationStats.map(s => [s.label, s.value]));
  const stats = [
    { title: 'Profile completed', value: `${identity.profileCompletion}%`, detail: 'Account information', href: '/profile/security' },
    { title: 'Saved countries', value: activityValues.get('Saved countries') ?? '—', detail: 'Your private shortlist', href: '/countries' },
    { title: 'Saved comparisons', value: activityValues.get('Comparisons') ?? '—', detail: 'Retained decision records', href: '/compare' },
    { title: 'Learning paths', value: String(resources.filter(r => r.kind === 'course').length), detail: t("{count} completed in current editions", { count: resources.filter(r => r.kind === 'course' && r.status === 'completed').length }), href: '/courses' },
  ];
  const journey = <section className={styles.panel} aria-labelledby="journey-title">
    <div className={styles.sectionHeading}><div><p className={styles.eyebrow}><LocalizedText text="My journey" /></p><h2 id="journey-title"><LocalizedText text="A direction you can act on." /></h2></div><Link href="/onboarding"><LocalizedText text="Edit goal and destinations ↗" /></Link></div>
    <div className={styles.journey}>{model.journey.map((stage,index) => <Link className={styles.stage} href={stage.href} key={stage.id} aria-current={model.currentStageId === stage.id ? 'step' : undefined}><span className={styles.eyebrow}>0{index+1} / {t(labels[stage.status])}</span><h3>{t(stage.label)}</h3><p>{t(stage.description)}</p><Progress value={stage.progress} label={t("{stage} TGPI steps completed", { stage: t(stage.label) })} /></Link>)}</div>
    <details className={styles.calculation}><summary><LocalizedText text="How these progress indicators are calculated" /></summary><p><LocalizedText text="These percentages measure steps recorded within TGPI. They do not measure immigration eligibility, job prospects or legal approval." /></p><ul><li><LocalizedText text="Discover: five context groups, each worth 20%." /></li><li><LocalizedText text="Decide: comparison and budget estimate, each worth 50% when recorded." /></li><li><LocalizedText text="Prepare: checked items divided by total items across recorded document checklists." /></li><li><LocalizedText text="Develop: recorded lesson checkpoints divided by recorded course lesson totals." /></li></ul><p><LocalizedText text="Stored course editions may differ from the current catalogue. The personal library identifies edition changes before resuming." /></p><ul>{model.progress.map(p => <li key={p.label}>{t(p.complete ? 'Complete' : 'Not provided')} · {t(p.label)}</li>)}</ul></details>
    <div className={styles.planSummary}>{model.planSummary.filter(s => s.label !== 'Budget').map(s => <div key={s.label}><span>{t(s.label)}</span><strong>{t(s.value)}</strong></div>)}</div>
  </section>;
  return <main lang={locale} className={styles.workspace}>
    <div className={styles.shell}>
      <header className={styles.header}><div><p className={styles.eyebrow}><LocalizedText text="TGPI / Global Command Center" /></p><h1><LocalizedText text="Your world. In perspective." /></h1><p>{t("Welcome back, {name}.", { name: identity.fullName })}</p></div><div className={styles.actions}><WorkspaceCommandButton /><Link className={styles.quiet} href="/notifications"><LocalizedText text="Notifications ↗" /></Link><WorkspaceSyncButton /></div></header>
      {onboardingCompleted && <p role="status" className={styles.notice}><LocalizedText text="Your global context has been saved. Your workspace now reflects your plan." /></p>}
      <section className={styles.hero} aria-labelledby="mission-title">
        <Image src="/images/workspace/command-center-v1.webp" alt="" fill priority sizes="(min-width: 1440px) 1400px, 100vw" className={styles.heroImage} />
        <div className={styles.heroContent}><div className={styles.identityLine}><span className={styles.membership}>{t(identity.membership)}</span><span><LocalizedText text="Private workspace" /></span></div><p className={styles.eyebrow}><LocalizedText text="Your current direction" /></p><h2 id="mission-title">{t(model.goalLabel === 'Goal not defined' ? 'Start with a clear direction.' : model.goalLabel)}</h2><p>{resume ? `${t(resume.title)} · ${t(resume.detail)}` : t('Connect your goals, destinations and practical preparation in one place.')}</p><div className={styles.actions}><Link className={styles.primary} href={primary?.href ?? '/onboarding'}>{t(primary?.action ?? 'Define my direction')} <span aria-hidden="true">↗</span></Link><Link href="/profile/security">{identity.handle ? `@${identity.handle}` : t('Set up your @ID')} · {identity.globalId}</Link></div></div>
        <div className={styles.heroContext}><p className={styles.eyebrow}><LocalizedText text="Plan context" /></p><strong>{model.completion}<small>%</small></strong><p><LocalizedText text="Information supplied for your journey" /></p><Progress value={model.completion} label={t("Plan context supplied")} /><Link href="#workspace-personal"><LocalizedText text="See criteria ↓" /></Link></div>
      </section>
      <nav className={styles.localNav} aria-label={t("Workspace sections")}><a href="#workspace-now"><LocalizedText text="Now" /></a><a href="#workspace-journey"><LocalizedText text="My journey" /></a><a href="#workspace-library"><LocalizedText text="My library" /></a><a href="#workspace-history"><LocalizedText text="My history" /></a></nav>
      <div id="workspace-now" className={styles.stats}>{stats.map(s => <Link href={s.href} key={s.title}><span>{t(s.title)}</span><strong>{t(s.value)}</strong><small>{t(s.detail)} ↗</small></Link>)}</div>
      <div className={styles.layout}><div>
        <section className={styles.panel} aria-labelledby="resume-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{t("Now / {count} activities in progress", { count: inProgress.length })}</p><h2 id="resume-title"><LocalizedText text="Continue with context." /></h2></div><Link href="/courses"><LocalizedText text="All learning ↗" /></Link></div>{resume ? <Link className={styles.resume} href={resume.href}><span><strong>{t(resume.title)}</strong><span>{t(resume.detail)}</span><span><LocalizedText text="Resume at the recorded lesson or checklist." /></span></span><span aria-hidden="true">↗</span></Link> : <div className={styles.empty}><h3><LocalizedText text="No activity to resume yet." /></h3><p><LocalizedText text="Start a learning path or save a checklist. Your next visit will connect to that record." /></p><Link href="/courses"><LocalizedText text="Find a learning path ↗" /></Link></div>}</section>
        <CommunityConnections /><WorkspacePersonalSpace resources={resources} history={history} initialCursor={historyCursor} historyCoverage={historyCoverage} historyAvailable={historyAvailable} initialPreferences={preferences} storageAvailable={preferencesAvailable} journey={journey} suggestions={suggestions} />
      </div><aside className={styles.aside} aria-label={t("Connected resources")}>
        <section className={styles.panel}><p className={styles.eyebrow}><LocalizedText text="Country Fit / live research" /></p><h2><LocalizedText text="Your priorities. The evidence." /></h2><p><LocalizedText text="Your saved shortlist is a personal choice, not a ranked compatibility result. Country Fit evaluates your context against country evidence when you open it." /></p>{model.countryFits.length ? <div className={styles.countryList}>{model.countryFits.map(fit => <Link key={fit.country.slug} href={`/country-fit?country=${fit.country.slug}`}><span>{fit.country.emoji} {fit.country.name}</span><span aria-hidden="true">↗</span></Link>)}</div> : <p><LocalizedText text="No destinations supplied yet." /></p>}<details className={styles.calculation}><summary><LocalizedText text="Preferences and analysis coverage" /></summary><p>{model.planSummary.find(s => s.label === 'Priorities')?.value}</p><p><LocalizedText text="No previous fit score or analysis timestamp is persisted by the current Country Fit service. Open it to review current evidence after changing your preferences." /></p></details><Link href="/country-fit"><LocalizedText text="Open Country Fit ↗" /></Link></section>
        <Suspense fallback={<section className={`${styles.panel} ${styles.skeleton}`} aria-busy="true"><h2><LocalizedText text="Loading certificates…" /></h2></section>}><WorkspaceCertificates userId={userId} /></Suspense>
        <section className={styles.panel}><p className={styles.eyebrow}><LocalizedText text="Your connected TGPI" /></p><h2><LocalizedText text="One workspace. Every tool." /></h2><nav className={styles.tools} aria-label={t("TGPI tools")}>{SUPER_APP_MODULES.filter(m => m.id !== 'workspace').map(item => <Link href={item.href} key={item.id}><NavigationIcon name={getSuperAppIconName(item.id)} width={19} height={19} /><span>{t(item.shortLabel)}</span><span aria-hidden="true">↗</span></Link>)}</nav></section>
        <section className={styles.panel}><p className={styles.eyebrow}><LocalizedText text="Verified workspace milestones" /></p><GlobalRankBadge rank={rank} size="small" /><h2>{rank.name}</h2><p>{rank.points}{" "}<LocalizedText text="TGPI progress points" /></p><p>{t(GLOBAL_RANK_DISCLAIMER)}</p><Link href="/profile/security#settings-progress"><LocalizedText text="View progression criteria ↗" /></Link></section>
        <section className={styles.panel}><p className={styles.eyebrow}><LocalizedText text="Your identity" /></p><h2>{identity.fullName}</h2><p>{identity.headline || t('Your international journey starts with your own context.')}</p><Link href="/global-key"><LocalizedText text="Open Global Key ↗" /></Link><p><Link href={identity.publicProfileUrl}><LocalizedText text="View public profile ↗" /></Link></p><p><LocalizedText text="Only fields allowed by your public profile settings are shared." /></p></section>
      </aside></div>
    </div>
  </main>;
}
