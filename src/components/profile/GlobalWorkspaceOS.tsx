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

type Props = {
  identity: { avatarUrl: string; firstName: string; fullName: string; globalId: string; headline: string; membership: string; profileCompletion: number; publicProfileUrl: string; handle?: string };
  model: GlobalWorkspaceModel; onboardingCompleted?: boolean; rank: GlobalRank;
  userId: string; resources: WorkspaceResource[]; history: ActivationActivity[]; historyCursor: string | null; historyCoverage: string | null; historyAvailable: boolean; preferences: WorkspacePreferences; preferencesAvailable: boolean;
};
const labels = { completed: 'Completed', in_progress: 'In progress', needs_attention: 'Needs context', not_started: 'Not started' };
function Progress({ value, label }: { value: number; label: string }) {
  return <div className={styles.progress}><progress max={100} value={value} aria-label={label} /><span>{value}%</span></div>;
}
export default function GlobalWorkspaceOS({ identity, model, onboardingCompleted, rank, userId, resources, history, historyCursor, historyCoverage, historyAvailable, preferences, preferencesAvailable }: Props) {
  const inProgress = model.actions.filter(a => a.status === 'in_progress');
  const suggestions = [...model.actions].filter(a => a.status !== 'completed').sort((a,b) => Number(b.status === 'in_progress') - Number(a.status === 'in_progress'));
  const resume = resources.find(r => r.kind === 'course' && r.status === 'in_progress') ?? resources.find(r => r.kind === 'documents' && r.status === 'in_progress');
  const primary = resume ? { href: resume.href, action: 'Continue where you left off' } : suggestions[0];
  const activityValues = new Map(model.activationStats.map(s => [s.label, s.value]));
  const stats = [
    { title: 'Profile completed', value: `${identity.profileCompletion}%`, detail: 'Account information', href: '/profile/security' },
    { title: 'Saved countries', value: activityValues.get('Saved countries') ?? '—', detail: 'Your private shortlist', href: '/countries' },
    { title: 'Saved comparisons', value: activityValues.get('Comparisons') ?? '—', detail: 'Retained decision records', href: '/compare' },
    { title: 'Learning paths', value: String(resources.filter(r => r.kind === 'course').length), detail: `${resources.filter(r => r.kind === 'course' && r.status === 'completed').length} completed in current editions`, href: '/courses' },
  ];
  const journey = <section className={styles.panel} aria-labelledby="journey-title">
    <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>My journey</p><h2 id="journey-title">A direction you can act on.</h2></div><Link href="/onboarding">Edit goal and destinations ↗</Link></div>
    <div className={styles.journey}>{model.journey.map((stage,index) => <Link className={styles.stage} href={stage.href} key={stage.id} aria-current={model.currentStageId === stage.id ? 'step' : undefined}><span className={styles.eyebrow}>0{index+1} / {labels[stage.status]}</span><h3>{stage.label}</h3><p>{stage.description}</p><Progress value={stage.progress} label={`${stage.label} TGPI steps completed`} /></Link>)}</div>
    <details className={styles.calculation}><summary>How these progress indicators are calculated</summary><p>These percentages measure steps recorded within TGPI. They do not measure immigration eligibility, job prospects or legal approval.</p><ul><li>Discover: five context groups, each worth 20%.</li><li>Decide: comparison and budget estimate, each worth 50% when recorded.</li><li>Prepare: checked items divided by total items across recorded document checklists.</li><li>Develop: recorded lesson checkpoints divided by recorded course lesson totals.</li></ul><p>Stored course editions may differ from the current catalogue. The personal library identifies edition changes before resuming.</p><ul>{model.progress.map(p => <li key={p.label}>{p.complete ? 'Complete' : 'Not provided'} · {p.label}</li>)}</ul></details>
    <div className={styles.planSummary}>{model.planSummary.filter(s => s.label !== 'Budget').map(s => <div key={s.label}><span>{s.label}</span><strong>{s.value}</strong></div>)}</div>
  </section>;
  return <main className={styles.workspace}>
    <div className={styles.shell}>
      <header className={styles.header}><div><p className={styles.eyebrow}>TGPI / Global Command Center</p><h1>Your world. In perspective.</h1><p>Welcome back, {identity.fullName}.</p></div><div className={styles.actions}><WorkspaceCommandButton /><Link className={styles.quiet} href="/notifications">Notifications ↗</Link><WorkspaceSyncButton /></div></header>
      {onboardingCompleted && <p role="status" className={styles.notice}>Your global context has been saved. Your workspace now reflects your plan.</p>}
      <section className={styles.hero} aria-labelledby="mission-title">
        <Image src="/images/workspace/command-center-v1.webp" alt="" fill priority sizes="(min-width: 1440px) 1400px, 100vw" className={styles.heroImage} />
        <div className={styles.heroContent}><div className={styles.identityLine}><span className={styles.membership}>{identity.membership}</span><span>Private workspace</span></div><p className={styles.eyebrow}>Your current direction</p><h2 id="mission-title">{model.goalLabel === 'Goal not defined' ? 'Start with a clear direction.' : model.goalLabel}</h2><p>{resume ? `${resume.title} · ${resume.detail}` : 'Connect your goals, destinations and practical preparation in one place.'}</p><div className={styles.actions}><Link className={styles.primary} href={primary?.href ?? '/onboarding'}>{primary?.action ?? 'Define my direction'} <span aria-hidden="true">↗</span></Link><Link href="/profile/security">{identity.handle ? `@${identity.handle}` : 'Set up your @ID'} · {identity.globalId}</Link></div></div>
        <div className={styles.heroContext}><p className={styles.eyebrow}>Plan context</p><strong>{model.completion}<small>%</small></strong><p>Information supplied for your journey</p><Progress value={model.completion} label="Plan context supplied" /><Link href="#workspace-personal">See criteria ↓</Link></div>
      </section>
      <nav className={styles.localNav} aria-label="Workspace sections"><a href="#workspace-now">Now</a><a href="#workspace-journey">My journey</a><a href="#workspace-library">My library</a><a href="#workspace-history">My history</a></nav>
      <div id="workspace-now" className={styles.stats}>{stats.map(s => <Link href={s.href} key={s.title}><span>{s.title}</span><strong>{s.value}</strong><small>{s.detail} ↗</small></Link>)}</div>
      <div className={styles.layout}><div>
        <section className={styles.panel} aria-labelledby="resume-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Now / {inProgress.length} activities in progress</p><h2 id="resume-title">Continue with context.</h2></div><Link href="/courses">All learning ↗</Link></div>{resume ? <Link className={styles.resume} href={resume.href}><span><strong>{resume.title}</strong><span>{resume.detail}</span><span>Resume at the recorded lesson or checklist.</span></span><span aria-hidden="true">↗</span></Link> : <div className={styles.empty}><h3>No activity to resume yet.</h3><p>Start a learning path or save a checklist. Your next visit will connect to that record.</p><Link href="/courses">Find a learning path ↗</Link></div>}</section>
        <CommunityConnections /><WorkspacePersonalSpace resources={resources} history={history} initialCursor={historyCursor} historyCoverage={historyCoverage} historyAvailable={historyAvailable} initialPreferences={preferences} storageAvailable={preferencesAvailable} journey={journey} suggestions={suggestions} />
      </div><aside className={styles.aside} aria-label="Connected resources">
        <section className={styles.panel}><p className={styles.eyebrow}>Country Fit / live research</p><h2>Your priorities. The evidence.</h2><p>Your saved shortlist is a personal choice, not a ranked compatibility result. Country Fit evaluates your context against country evidence when you open it.</p>{model.countryFits.length ? <div className={styles.countryList}>{model.countryFits.map(fit => <Link key={fit.country.slug} href={`/country-fit?country=${fit.country.slug}`}><span>{fit.country.emoji} {fit.country.name}</span><span aria-hidden="true">↗</span></Link>)}</div> : <p>No destinations supplied yet.</p>}<details className={styles.calculation}><summary>Preferences and analysis coverage</summary><p>{model.planSummary.find(s => s.label === 'Priorities')?.value}</p><p>No previous fit score or analysis timestamp is persisted by the current Country Fit service. Open it to review current evidence after changing your preferences.</p></details><Link href="/country-fit">Open Country Fit ↗</Link></section>
        <Suspense fallback={<section className={`${styles.panel} ${styles.skeleton}`} aria-busy="true"><h2>Loading certificates…</h2></section>}><WorkspaceCertificates userId={userId} /></Suspense>
        <section className={styles.panel}><p className={styles.eyebrow}>Your connected TGPI</p><h2>One workspace. Every tool.</h2><nav className={styles.tools} aria-label="TGPI tools">{SUPER_APP_MODULES.filter(m => m.id !== 'workspace').map(item => <Link href={item.href} key={item.id}><NavigationIcon name={getSuperAppIconName(item.id)} width={19} height={19} /><span>{item.shortLabel}</span><span aria-hidden="true">↗</span></Link>)}</nav></section>
        <section className={styles.panel}><p className={styles.eyebrow}>Verified workspace milestones</p><GlobalRankBadge rank={rank} size="small" /><h2>{rank.name}</h2><p>{rank.points} TGPI progress points</p><p>{GLOBAL_RANK_DISCLAIMER}</p><Link href="/profile/security#settings-progress">View progression criteria ↗</Link></section>
        <section className={styles.panel}><p className={styles.eyebrow}>Your identity</p><h2>{identity.fullName}</h2><p>{identity.headline || 'Your international journey starts with your own context.'}</p><Link href="/global-key">Open Global Key ↗</Link><p><Link href={identity.publicProfileUrl}>View public profile ↗</Link></p><p>Only fields allowed by your public profile settings are shared.</p></section>
      </aside></div>
    </div>
  </main>;
}
