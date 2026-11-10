import CertificateSeal from '@/components/credentials/CertificateSeal';
import CinematicImage from '@/components/ui/CinematicImage';
import { LocalizedText } from '@/components/localization/LocaleProvider';
import styles from './WorkspaceCommandCenter.module.css';

/** Institutional branding only; earned credentials remain in the private portfolio. */
export default function WorkspaceIdentityStage() {
  return <figure className={styles.heroVisual}>
    <CinematicImage asset="workspace-observatory" alt="" priority sizes="(min-width: 1400px) 720px, (min-width: 768px) 50vw, 100vw" className={styles.heroImage} position="70% center" />
    <div className={styles.signatureGrid} aria-hidden="true" />
    <div className={styles.signatureOrbit} aria-hidden="true"><i /><i /><i /><span>✦</span></div>
    <CertificateSeal className={styles.signatureSeal} sizes="(max-width: 767px) 180px, 270px" />
    <figcaption className={styles.signatureCaption}><span>The Global Polymath Institute</span><strong><LocalizedText text="A world of possibilities. A direction of your own." /></strong></figcaption>
  </figure>;
}
