import type { ReactNode } from 'react';
import CinematicImage from '@/components/ui/CinematicImage';
import { LocalizedText as T } from '@/components/localization/LocaleProvider';
import type { CinematicKey } from '@/lib/cinematic-art';
export default function PlanHero({ eyebrow, title, accent, description, asset, children, framing = 'default' }: { eyebrow: string; title: string; accent: string; description: string; asset: CinematicKey; children?: ReactNode; framing?: 'default' | 'learning' }) {
  const learningFrame = framing === 'learning';
  return <section className={`plan-hero${learningFrame ? ' plan-hero-learning' : ''}`}>
    <div className="plan-hero-copy"><p className="plan-kicker"><T text={eyebrow} /></p><h1><T text={title} /><br /><span><T text={accent} /></span></h1><p><T text={description} /></p>{children}<div className="plan-hero-meta"><span><T text="Your goals" /></span><span><T text="Your evidence" /></span><span><T text="Your next move" /></span></div></div>
    <div className="plan-hero-art"><CinematicImage asset={asset} alt="" sizes={learningFrame ? '(max-width: 760px) calc(100vw - 28px), (max-width: 1100px) 100vw, 50vw' : '(max-width: 760px) 100vw, 50vw'} position={learningFrame ? 'var(--plan-art-position)' : 'center'} priority /><div className="plan-art-caption">{!learningFrame && <span className="plan-signal" aria-hidden="true" />}<span><T text="TGPI / Personal Global Plan" /></span>{!learningFrame && <span aria-hidden="true">↗</span>}</div></div>
  </section>;
}
