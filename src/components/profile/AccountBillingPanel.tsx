"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import type { BillingInvoice, BillingInvoicePage, BillingOverview, PremiumAccessMode, SubscriptionStatus } from "@/types/billing";
import styles from "./billing.module.css";

const statusLabels: Record<SubscriptionStatus, string> = {
  inactive: "Inactive", trialing: "Trial period", active: "Active", past_due: "Payment overdue",
  canceled: "Canceled", unpaid: "Unpaid", incomplete: "Payment incomplete",
  incomplete_expired: "Payment session expired", paused: "Paused",
};
const accessLabels: Record<PremiumAccessMode, string> = {
  subscription: "Subscription", none: "No Premium access", founder: "Founder access", preview: "Preview access",
};
const scheduleLabels: Record<BillingOverview["schedule"], string> = {
  automatic: "Automatic renewal", manual: "Manual payment", ending: "Cancellation scheduled",
  paused: "Charges paused", none: "No recurring charges",
};
const invoiceLabels: Record<BillingInvoice["status"], string> = {
  paid: "Paid", open: "Open invoice", void: "Voided", uncollectible: "Uncollectible",
};
const cardBrands: Record<string, string> = {
  amex: "American Express", diners: "Diners Club", discover: "Discover", elo: "Elo",
  hipercard: "Hipercard", jcb: "JCB", mastercard: "Mastercard", unionpay: "UnionPay", visa: "Visa",
};

// Stripe represents ISK and UGX with two digits for API compatibility.
const stripeWholeUnits = new Set(["bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga", "pyg", "rwf", "vnd", "vuv", "xaf", "xof", "xpf"]);

const stripeThreeDigits = new Set(["bhd", "jod", "kwd", "omr", "tnd"]);

function invoiceAmount(invoice: BillingInvoice, locale: string) {
  const currency = invoice.currency.toLowerCase();
  return new Intl.NumberFormat(locale, { style: "currency", currency: currency.toUpperCase(), currencyDisplay: "code" })
    .format(invoice.amount / (stripeWholeUnits.has(currency) ? 1 : stripeThreeDigits.has(currency) ? 1000 : 100));
}

export default function AccountBillingPanel() {
  const { locale, t } = useLocale();
  const [overview, setOverview] = useState<BillingOverview | null>(null);
  const [loadError, setLoadError] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [action, setAction] = useState<"card" | "manage" | "history" | null>(null);
  const [actionError, setActionError] = useState<"portal" | "history" | "auth" | null>(null);
  const busy = useRef(false);
  const actionRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/billing/overview", { cache: "no-store", signal: controller.signal });
        if (response.ok) {
          const data = await response.json() as BillingOverview;
          if (controller.signal.aborted) return;
          setOverview(data);
          setLoadError(null);
        } else {
          setOverview(null);
          setLoadError(response.status);
        }
      } catch {
        if (!controller.signal.aborted) setLoadError(500);
      }
    }
    function restore(event: PageTransitionEvent) {
      if (event.persisted) {
        actionRequest.current?.abort();
        busy.current = false;
        setAction(null);
        setActionError(null);
        void load();
      }
    }
    window.addEventListener("pageshow", restore);
    void load();
    return () => {
      controller.abort();
      actionRequest.current?.abort();
      window.removeEventListener("pageshow", restore);
    };
  }, [refresh]);

  function reload() {
    setOverview(null);
    setLoadError(null);
    setActionError(null);
    setRefresh(value => value + 1);
  }

  async function runAction(next: "card" | "manage" | "history") {
    if (busy.current) return;
    const controller = new AbortController();
    actionRequest.current = controller;
    busy.current = true;
    setAction(next);
    setActionError(null);
    try {
      const cursor = overview?.history?.nextCursor;
      const response = next === "history"
        ? await fetch(`/api/billing/overview?cursor=${encodeURIComponent(cursor ?? "")}`, { cache: "no-store", signal: controller.signal })
        : await fetch(`/api/stripe/create-portal-session?action=${next}&locale=${locale}`, { method: "POST", signal: controller.signal });
      if (response.status === 401) {
        setActionError("auth");
        return;
      }
      if (!response.ok) {
        setActionError(next === "history" ? "history" : "portal");
        return;
      }
      if (controller.signal.aborted) return;
      if (next === "history") {
        const page = await response.json() as BillingInvoicePage;
        if (controller.signal.aborted) return;
        setOverview(current => current?.history ? {
          ...current,
          history: {
            nextCursor: page.nextCursor,
            invoices: [...current.history.invoices, ...page.invoices.filter(invoice => !current.history?.invoices.some(existing => existing.id === invoice.id))],
          },
        } : current);
      } else {
        const { url } = await response.json() as { url: string };
        if (controller.signal.aborted) return;
        if (!url) throw Error("Missing Stripe portal URL");
        window.location.assign(url);
      }
    } catch {
      if (!controller.signal.aborted) setActionError(next === "history" ? "history" : "portal");
    } finally {
      if (!controller.signal.aborted) {
        busy.current = false;
        setAction(null);
      }
    }
  }

  const signIn = <Link className={styles.button} href="/sign-in?next=%2Fprofile%2Fsecurity%23settings-billing">{t("Sign in")}</Link>;
  if (!overview) return (
    <section className={styles.panel} aria-busy={!loadError}>
      <p role="status">{loadError === 401
        ? t("Sign in again to access billing.")
        : loadError ? t("Unable to load billing right now.") : t("Loading your current plan…")}</p>
      {loadError === 401 ? signIn : loadError && <button className={styles.button} type="button" onClick={reload}>{t("Try again")}</button>}
    </section>
  );

  const { paymentMethod, schedule, cycleDate, history } = overview;
  const needsPayment = ["past_due", "unpaid", "incomplete"].includes(overview.status);
  const canSubscribe = !["active", "trialing", "past_due", "unpaid", "incomplete", "paused"].includes(overview.status);
  const openInvoice = history?.invoices.find(invoice => invoice.status === "open" && invoice.invoiceUrl && invoice.amount > 0);
  const formatDate = (seconds: number) => new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(seconds * 1000);

  return (
    <div className={styles.billing}>
      <section className={styles.hero} aria-labelledby="billing-plan-heading">
        <div>
          <p className={styles.label}>{t(Object.hasOwn(accessLabels, overview.accessMode) ? accessLabels[overview.accessMode] : "Unavailable")}</p>
          <h2 id="billing-plan-heading">TGPI {t(overview.plan === "premium" || !canSubscribe ? "Premium" : "Free")}</h2>
          <p className={styles.planStatus} data-attention={needsPayment}>{t(Object.hasOwn(statusLabels, overview.status) ? statusLabels[overview.status] : "Unavailable")}</p>
        </div>
        <div>
          {canSubscribe && overview.accessMode === "none" && <Link href="/premium" className={styles.primary}>{t("Explore Premium →")}</Link>}
          {overview.hasBillingAccount && (
            <button className={styles.button} type="button" disabled={!!action} onClick={() => void runAction("manage")}>{t(canSubscribe ? "Open Stripe billing portal" : "Manage subscription")}</button>
          )}
        </div>
      </section>

      {needsPayment && (
        <div className={styles.notice}>
          <p>{t("Review your open invoice or update your payment method to resolve the payment.")}</p>
          {openInvoice?.invoiceUrl && <a className={styles.button} href={openInvoice.invoiceUrl}>{t("Open invoice")}</a>}
        </div>
      )}

      <div className={styles.grid}>
        <section className={styles.panel} aria-labelledby="billing-card-heading">
          <h3 id="billing-card-heading">{t("Payment method")}</h3>
          <div className={styles.card}>
            <span className={styles.chip} aria-hidden="true" />
            {paymentMethod?.kind === "card" ? (
              <>
                <strong>{cardBrands[paymentMethod.brand.toLowerCase()] ?? t("Card")} <span className={styles.last4}>•••• {paymentMethod.last4}</span></strong>
                <span>{t("Expires {date}", { date: paymentMethod.expires })}</span>
              </>
            ) : <strong>{paymentMethod ? t("Payment method on file") : t("No saved payment method")}</strong>}
          </div>
          <p className={styles.muted}>{t("Stripe securely collects and stores your card details.")}</p>
          <button className={styles.button} type="button" disabled={!!action} onClick={() => void runAction("card")}>
            {paymentMethod ? t("Update payment method") : t("Save a card")}
          </button>
        </section>

        <section className={styles.panel} aria-labelledby="billing-cycle-heading">
          <h3 id="billing-cycle-heading">{t("Billing cycle")}</h3>
          <p className={styles.schedule}>{t(scheduleLabels[schedule])}</p>
          {cycleDate !== null && <p className={styles.muted}>
            {!Number.isFinite(cycleDate) ? t("Date unavailable") : schedule === "ending"
              ? t("Access ends on {date}", { date: formatDate(cycleDate) })
              : t("Current cycle ends on {date}", { date: formatDate(cycleDate) })}
          </p>}
          {schedule === "automatic" && <p className={styles.muted}>{paymentMethod
            ? t("Stripe uses the default payment method for recurring invoices.")
            : t("Add a payment method for future automatic charges.")}</p>}
          {schedule === "none" && <p className={styles.muted}>{t("Saving a card does not start a subscription.")}</p>}
          <Link className={styles.textLink} href="/billing-terms">{t("Billing terms")}</Link>
        </section>
      </div>

      <div className={styles.feedback} role="status">
        {action && t(action === "history" ? "Loading invoices…" : "Opening secure billing…")}
        {actionError === "auth" && <>{t("Sign in again to access billing.")} {signIn}</>}
        {actionError === "portal" && t("Unable to open billing. Please try again.")}
        {actionError === "history" && t("Unable to load more invoices. Please try again.")}
      </div>

      <section className={styles.panel} aria-labelledby="billing-history-heading">
        <h3 id="billing-history-heading">{t("Payment history")}</h3>
        {!history ? (
          <>
            <p className={styles.muted}>{t("Invoice history is temporarily unavailable.")}</p>
            <button className={styles.button} type="button" disabled={!!action} onClick={reload}>{t("Try again")}</button>
          </>
        ) : (
          <>
            {history.invoices.length ? (
              <ul className={styles.invoices}>
                {history.invoices.map(invoice => (
                  <li className={styles.invoice} key={invoice.id}>
                    <div>
                      <strong>{invoice.number ?? t("Invoice")}</strong>
                      <time dateTime={new Date(invoice.createdAt * 1000).toISOString()}>{formatDate(invoice.createdAt)}</time>
                    </div>
                    <div>
                      <strong>{invoiceAmount(invoice, locale)}</strong>
                      <span className={styles.invoiceStatus} data-status={invoice.status}>{t(invoiceLabels[invoice.status])}</span>
                    </div>
                    <div className={styles.invoiceActions}>
                      {invoice.invoiceUrl && <a className={styles.textLink} href={invoice.invoiceUrl} aria-label={t("View invoice {reference}", { reference: invoice.number ?? formatDate(invoice.createdAt) })}>{t("View invoice")}</a>}
                      {invoice.pdfUrl && <a className={styles.textLink} href={invoice.pdfUrl} aria-label={t("View PDF for invoice {reference}", { reference: invoice.number ?? formatDate(invoice.createdAt) })}>{t("PDF")}</a>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className={styles.muted}>{t("No invoices to display.")}</p>}
            {history.nextCursor && <button className={styles.button} type="button" disabled={!!action} onClick={() => void runAction("history")}>{t("Load more invoices")}</button>}
          </>
        )}
      </section>
    </div>
  );
}
