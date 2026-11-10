import NavigationIcon from '@/components/navigation/NavigationIcon';
import CinematicImage from '@/components/ui/CinematicImage';
import { LocalizedText } from '@/components/localization/LocaleProvider';
import styles from './WorkspaceCommandCenter.module.css';

/** Original workspace photograph with its understated TGPI wordmark. */
export default function WorkspaceIdentityStage() {
  return <figure className={styles.heroVisual}>
    <CinematicImage asset="workspace-observatory" alt="" priority sizes="(min-width: 1400px) 720px, (min-width: 768px) 50vw, 100vw" className={styles.heroImage} position="60% center" />
    <figcaption className={styles.visualBrand}>
      <span className={styles.brandLockup} aria-hidden="true"><NavigationIcon name="compass" width={38} height={38} />TGPI</span>
      <p><LocalizedText text="A world of possibilities. A direction of your own." /></p>
    </figcaption>
  </figure>;
}
