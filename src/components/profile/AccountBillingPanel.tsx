'use client';

import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { PremiumAccessMode, SubscriptionStatus } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale } from "@/components/localization/LocaleProvider";

const statusLabels: Record<SubscriptionStatus, string> = {
  inactive: 'Inactive', trialing: 'Trial period', active: 'Active', past_due: 'Payment overdue',
  canceled: 'Canceled', unpaid: 'Unpaid', incomplete: 'Payment incomplete',
  incomplete_expired: 'Payment session expired', paused: 'Paused',
};
const accessLabels: Record<PremiumAccessMode, string> = {
  subscription: 'Subscription', none: 'No Premium access', founder: 'Founder access',
  preview: 'Preview access',
};

type Billing = { plan: string; status: SubscriptionStatus; currentPeriodEnd?: string; cancelAtPeriodEnd: boolean; portalAvailable: boolean; accessMode: PremiumAccessMode };
export default function AccountBillingPanel() {
  const { locale, t } = useLocale();
  const [billing, setBilling] = useState<Billing | null>(null); const [busy, setBusy] = useState(false); const [message, setMessage] = useState('Loading your current plan…');
  useEffect(() => { const controller = new AbortController(); fetch('/api/billing/status', { cache: 'no-store', signal: controller.signal }).then(async r => { const data = await r.json(); if (!r.ok) throw new Error(data.error); setBilling(data); setMessage(''); }).catch(e => { if (e.name !== 'AbortError') setMessage('Unable to load billing. Reload to retry.'); }); return () => controller.abort(); }, []);
  async function manage() { setBusy(true); setMessage('Opening secure billing…'); try { const response = await fetch('/api/stripe/create-portal-session', { method: 'POST' }); const data = await response.json(); if (!response.ok || !data.url) throw new Error(data.error || 'Unable to open billing.'); window.location.assign(data.url); } catch (e) { setMessage(e instanceof Error ? e.message : 'Unable to open billing.'); setBusy(false); } }
  return <section className="tgpi-member-panel mt-5"><p className="tgpi-member-eyebrow">{t('Subscription & billing')}</p><h3>{billing ? <LocalizedText text={"TGPI {value0}"} values={{value0: String(t(billing.plan === 'premium' ? 'Premium' : 'Free'))}} /> : t('Your membership')}</h3>{billing ? <><p>{t('Status: {status} · Access: {access}', { status: t(Object.hasOwn(statusLabels, billing.status) ? statusLabels[billing.status]! : 'Unavailable'), access: t(Object.hasOwn(accessLabels, billing.accessMode) ? accessLabels[billing.accessMode]! : 'Unavailable') })}</p>{billing.currentPeriodEnd ? <p>{t(billing.cancelAtPeriodEnd ? 'Access scheduled until' : 'Current period ends')}: {Number.isFinite(Date.parse(billing.currentPeriodEnd)) ? new Date(billing.currentPeriodEnd).toLocaleDateString(locale, { timeZone: 'UTC' }) : t('Date unavailable')}</p> : null}{billing.portalAvailable ? <button className="tgpi-member-button mt-4" disabled={busy} type="button" onClick={manage}>{t('Manage subscription securely →')}</button> : <Link className="tgpi-member-button mt-4" href="/premium">{t('Explore Premium →')}</Link>}</> : null}<p role="status" className="mt-3 text-sm">{t(message)}</p></section>;
}
