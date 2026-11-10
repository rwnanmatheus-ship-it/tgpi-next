'use client';

import { useLocale , LocalizedText } from '@/components/localization/LocaleProvider';
import { Button } from './Button';
import { Container } from './Container';
import { EditorialCard } from './EditorialCard';
import { EditorialHeading } from './EditorialHeading';

/** Shared recovery composition for unavailable routes and country dossiers. */
export function MissingPage({ country = false }: { country?: boolean }) {
  const { t } = useLocale();
  return (
    <main className="tgpi-section bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <Container>
        <EditorialCard className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-bold tracking-widest text-[var(--tgpi-gold-strong)]"><LocalizedText text={"TGPI / 404"} /></p>
          <EditorialHeading as="h1" size="md" tone="navy">
            {t(country ? 'Country Pathway Not Found' : 'This page is unavailable.')}
          </EditorialHeading>
          <p className="mx-auto my-6 max-w-lg text-base leading-7 text-[var(--tgpi-muted)]">
            {t(country
              ? 'This country pathway is not available yet in the current TGPI system. Explore the active countries or return to the main platform.'
              : 'The address may have changed, or this page is not available. Choose a destination below.')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/countries">{t('Explore countries')}</Button>
            <Button href="/" variant="secondary">{t('Back Home')}</Button>
          </div>
        </EditorialCard>
      </Container>
    </main>
  );
}
