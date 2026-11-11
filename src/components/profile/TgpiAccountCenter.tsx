"use client";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";
import { useLocale } from "@/components/localization/LocaleProvider";
import { localeOptions } from "@/lib/localization/config";
import LanguageSelector from "@/components/localization/LanguageSelector";

import Image from "next/image";
import SettingsAccessibility from "./SettingsAccessibility";
import SettingsDiagnostics from "./SettingsDiagnostics";
import SettingsData from "./SettingsData";
import NotificationPreferences from "@/components/notifications/NotificationPreferences";
import NotificationDevices from "@/components/notifications/NotificationDevices";
import AnalyticsPreferences from "@/components/analytics/AnalyticsPreferences";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { resolveSettingsSection, settingsHref, normalizeSettingsSearch, type SettingsSection } from "@/lib/settings-navigation";
import styles from "./settings.module.css";
import { announceProgressSaved } from "@/lib/progress-sync";
import Link from "next/link";
import NavigationLink from "@/components/navigation/NavigationLink";
import MemberIdentityEditor from './MemberIdentityEditor';
import MemberExportCenter from './MemberExportCenter';
import MemberDirectory from './MemberDirectory';
import AccountBillingPanel from './AccountBillingPanel';
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Children, cloneElement, isValidElement, useId, useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import PublicProfileShareButton from "@/components/profile/PublicProfileShareButton";
import GlobalRankBadge from "@/components/profile/GlobalRankBadge";
import GlobalProgressPanel from "@/components/profile/GlobalProgressPanel";
import ProfileSearchSelect from "@/components/profile/ProfileSearchSelect";
import { citySuggestions, professionSuggestions } from "@/lib/profile-options";
import { getAccountSalutation, getCertificateName } from "@/lib/account-profile";
import TgpiAvatarEditor from "@/components/profile/TgpiAvatarEditor";
import {
  getAccountProfileCompletion,
  type AccountIdentityInput,
  type TgpiAccountProfile,
  type TgpiAccountUpdate,
} from "@/lib/account-profile";
import {
  type GlobalRank,
} from "@/lib/global-ranks";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type CountryOption = { emoji: string; name: string; slug: string };
type DecisionContext = {
  completed: boolean;
  countries: CountryOption[];
  goal: string;
  progress: number;
};
type AccountSummary = {
  avatarUrl: string;
  email: string;
  emailVerified: boolean;
  globalId: string;
  membership: string;
  publicProfileUrl: string;
};
type TgpiAccountCenterProps = {
  account: AccountSummary;
  children: React.ReactNode;
  countries: CountryOption[];
  decisionContext: DecisionContext;
  initialIdentity: AccountIdentityInput;
  initialProfile: TgpiAccountProfile;
  sessionId: string;
  rank: GlobalRank | null;
};
type SaveState = "idle" | "saving" | "saved" | "error";
type SettingsSectionDefinition = {
  description: string;
  key: SettingsSection;
  keywords: string;
  label: string;
  group: "Account center" | "Profile & progress" | "Experience" | "Safety";
  sticker: string;
};

const languageOptions = [
  "English",
  "Portuguese",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Mandarin Chinese",
  "Arabic",
  "Japanese",
  "Korean",
] as const;

const currencyOptions = [
  "USD",
  "EUR",
  "GBP",
  "BRL",
  "CAD",
  "AUD",
  "JPY",
  "CHF",
  "CNY",
] as const;

const timezoneOptions = [
  "America/Sao_Paulo",
  "America/New_York",
  "America/Los_Angeles",
  "America/Toronto",
  "Europe/London",
  "Europe/Lisbon",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
] as const;

const settingsSections: readonly SettingsSectionDefinition[] = [
  { description: "Reading, motion and keyboard navigation", key: "accessibility", keywords: "accessibility motion animation text font focus acessibilidade fonte animacao movimento leitura contraste", label: "Accessibility", group: "Experience", sticker: "" },
  { description: "Export your saved profile and personal plan", key: "data", keywords: "data export backup download dados exportar baixar copia", label: "Data & exports", group: "Safety", sticker: "" },
  { description: "Check your connection and saved profile version", key: "diagnostics", keywords: "connection offline sync help status conexao sincronizacao diagnostico falha erro", label: "Connection & sync", group: "Safety", sticker: "" },
  {
    description: "Account status and connected systems",
    key: "overview",
    keywords: "home status global key plan membership",
    label: "Overview",
    group: "Account center",
    sticker: "⌂",
  },
  { description: "Plan status, renewal and secure billing portal", key: "billing", keywords: "stripe payment subscription plan renew", label: "Subscription & billing", group: "Account center", sticker: "◈" },
  {
    description: "Cryptographic identity, fingerprint and verification",
    key: "global-key",
    keywords: "global key id cryptographic fingerprint proof blockchain integrity chain verify",
    label: "TGPI Global ID",
    group: "Account center",
    sticker: "🗝️",
  },
  {
    description: "Name, biography and location",
    key: "identity",
    keywords: "name bio city country nationality profile",
    label: "Personal information",
    group: "Profile & progress",
    sticker: "◉",
  },
  {
    description: "Profession, education and languages",
    key: "global",
    keywords: "career education profession language country fit plan",
    label: "Global profile",
    group: "Profile & progress",
    sticker: "🌍",
  },
  {
    description: "Ranks, progress and achievement methodology",
    key: "progress",
    keywords: "rank badge patent progression points gamification achievement",
    label: "Progress & ranks",
    group: "Profile & progress",
    sticker: "✦",
  },
  {
    description: "Preview and share your member identity",
    key: "public-profile",
    keywords: "public profile share card preview link community identity",
    label: "Public profile",
    group: "Profile & progress",
    sticker: "↗",
  },
  {
    description: "Language, currency and public links",
    key: "preferences",
    keywords: "currency units website linkedin instagram preferences",
    label: "App preferences",
    group: "Experience",
    sticker: "⚙",
  },
  {
    description: "Research, plan and product updates",
    key: "notifications",
    keywords: "alerts email reminders research learning news",
    label: "Notifications",
    group: "Experience",
    sticker: "🔔",
  },
  {
    description: "Visibility and profile controls",
    key: "privacy",
    keywords: "private public visibility location goals progress",
    label: "Privacy",
    group: "Safety",
    sticker: "◈",
  },
  {
    description: "Password, devices and login methods",
    key: "security",
    keywords: "password passkey devices email login authentication clerk",
    label: "Login & security",
    group: "Safety",
    sticker: "⌾",
  },
].sort((a, b) => Number(b.key === "overview") - Number(a.key === "overview")) as SettingsSectionDefinition[];

const settingsGroups: readonly SettingsSectionDefinition["group"][] = [
  "Account center",
  "Profile & progress",
  "Experience",
  "Safety",
];

const iconPaths: Record<SettingsSection, string> = {
  accessibility: "M12 3v.01M5 8h14M12 8v6M8 21l4-7 4 7M8 8l4 4 4-4",
  data: "M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5",
  diagnostics: "M3 12h4l3-8 4 16 3-8h4",
  billing: "M3 5h18v14H3zM3 9h18M7 14h3",
  overview: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  "global-key": "M14.5 9.5a4.5 4.5 0 1 0-4 4L13 16h2v2h2v2h3v-3l-6.5-6.5M7 9.5h.01",
  identity: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21a7.5 7.5 0 0 1 15 0",
  global: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 9h17M3.5 15h17M12 3c4.8 5.1 4.8 12.9 0 18M12 3c-4.8 5.1-4.8 12.9 0 18",
  progress: "M12 3 14.4 8l5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8L12 3Z",
  "public-profile": "M4 19.5c2-3.1 4.7-4.5 8-4.5s6 1.4 8 4.5M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 8h3M19.5 6.5v3",
  preferences: "M4 6h10M18 6h2M4 12h2M10 12h10M4 18h7M15 18h5M16 4v4M8 10v4M13 16v4",
  notifications: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4",
  privacy: "M12 3 4.5 6v5.3c0 4.8 3.1 8.3 7.5 9.7 4.4-1.4 7.5-4.9 7.5-9.7V6L12 3Zm-3 9 2 2 4-4",
  security: "M6 11V8a6 6 0 0 1 12 0v3M4 11h16v10H4zM12 15v2",
};

function SettingsIcon({ section }: { section: SettingsSection }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d={iconPaths[section]} />
    </svg>
  );
}

function AccountAvatar({
  imageUrl,
  initials,
  label,
  size = "large",
}: {
  imageUrl: string;
  initials: string;
  label: string;
  size?: "large" | "small";
}) {
  const { t } = useLocale();
  const sizeClass = size === "large" ? "h-20 w-20 text-3xl" : "h-12 w-12 text-lg";
  return (
    <span
      aria-label={t("Profile photo of {name}", { name: label })}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-[#E5BF5A]/60 bg-[#163452] bg-cover bg-center font-[var(--tgpi-font-display)] font-semibold text-[var(--tgpi-gold-light)] ${sizeClass}`}
      role="img"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
    >
      {!imageUrl ? initials : <span className="sr-only">{label}</span>}
    </span>
  );
}

function Field({
  children,
  description,
  label,
}: {
  children: React.ReactNode;
  description?: string;
  label: string;
}) {
  const id = useId();
  const nodes = Children.toArray(children);
  const primary = nodes.findIndex(node => isValidElement(node) && ((typeof node.type === 'string' && ['input', 'select', 'textarea'].includes(node.type)) || (node.type === LocalizedElement && ['input', 'select', 'textarea'].includes((node.props as { as: string }).as))));
  const nativeInput = primary >= 0;
  const control = nodes.map((node, index) => index === primary ? cloneElement(node as ReactElement<{ id?: string; "aria-describedby"?: string }>, { id, "aria-describedby": description ? `${id}-description` : undefined }) : node);
  return (
    <div className="block">
      {nativeInput ? <label htmlFor={id} className="text-sm font-extrabold text-[var(--tgpi-navy-raised)]"><LocalizedText text={label} /></label> : <p className="text-sm font-extrabold text-[var(--tgpi-navy-raised)]"><LocalizedText text={label} /></p>}
      {description ? <p id={`${id}-description`} className="mt-1 text-xs leading-5 text-[var(--tgpi-muted)]"><LocalizedText text={description} /></p> : null}
      <div className="mt-2">{control}</div>
    </div>
  );
}

function Toggle({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 border-b border-[#E8E3D9] px-4 py-4 last:border-0 sm:px-5">
      <span>
        <span className="block text-sm font-extrabold text-[var(--tgpi-navy-raised)]"><LocalizedText text={label} /></span>
        <span className="mt-1 block text-xs leading-5 text-[#697386]"><LocalizedText text={description} /></span>
      </span>
      <input checked={checked} className="peer sr-only" onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      <span className="relative h-7 w-12 shrink-0 rounded-full bg-[#D4D7DC] transition peer-checked:bg-[var(--tgpi-navy-raised)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--tgpi-gold-hover)]">
        <span className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </span>
    </label>
  );
}

function ScreenHeading({
  description,
  section,
  title,
}: {
  description: string;
  section: SettingsSection;
  title: string;
}) {
  return (
    <div className={styles.screenHeading}>
      <span className={styles.screenIcon}>
        <SettingsIcon section={section} />
      </span>
      <div>
        <h2 className={styles.screenTitle}><LocalizedText text={title} /></h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--tgpi-muted)]"><LocalizedText text={description} /></p>
      </div>
    </div>
  );
}

export default function TgpiAccountCenter({
  account,
  children,
  countries,
  decisionContext,
  initialIdentity,
  initialProfile,
  rank,
  sessionId,
}: TgpiAccountCenterProps) {
  const { t: localizeLabel } = useInterfaceLocale();

  const { locale, t } = useLocale();
  const { user } = useUser();
  const notifications = useNotifications();
  const pathname = usePathname();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SettingsSection>("overview");
  const [identity, setIdentity] = useState(initialIdentity);
  const [profile, setProfile] = useState(initialProfile);
  const [query, setQuery] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const [online, setOnline] = useState(true);
  const [notificationsVisited, setNotificationsVisited] = useState(false);
  const [notificationDirty, setNotificationDirty] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const savingRef = useRef(false);
  const savedSnapshot = useRef(JSON.stringify({ identity: initialIdentity, profile: initialProfile }));
  const incomingSnapshot = useRef(JSON.stringify({ identity: initialIdentity, profile: initialProfile }));
  const currentSnapshot = JSON.stringify({ identity, profile });
  const isDirty = currentSnapshot !== savedSnapshot.current;
  const hasUnsavedChanges = isDirty || notificationDirty;
  useEffect(() => { if (activeSection === "notifications") setNotificationsVisited(true); }, [activeSection]);
  const completion = useMemo(() => getAccountProfileCompletion(identity, profile), [identity, profile]);
  const filteredSections = useMemo(() => {
    const normalize = normalizeSettingsSearch;
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return settingsSections;
    return settingsSections.filter((section) =>
      normalize(`${t(section.label)} ${t(section.description)} ${section.label} ${section.description} ${section.keywords}`).includes(normalizedQuery),
    );
  }, [query, t]);
  const activeDefinition = settingsSections.find((section) => section.key === activeSection) ?? settingsSections[0];
  const initials = `${identity.firstName.at(0) ?? ""}${identity.lastName.at(0) ?? ""}`.toUpperCase() || "TG";
  const fullName = profile.displayName || [identity.firstName, identity.lastName].filter(Boolean).join(" ") || t("TGPI member");
  const currentCountryName = countries.find((country) => country.slug === profile.currentCountry)?.name || profile.currentCountry;
  const sectionSummaries: Record<Exclude<SettingsSection, "overview">, string> = {
    billing: t(account.membership),
    "global-key": t("Global ID, verification and account security"),
    global: profile.profession || (profile.languages.length ? t("Languages: {count}", { count: profile.languages.length }) : t("Add your global context")),
    identity: profile.currentCity || (currentCountryName ? t(currentCountryName) : t("Add personal information")),
    progress: rank ? t("{rank} · {points} points", { rank: t(rank.name), points: rank.points.toLocaleString(locale) }) : t("Unavailable"),
    notifications: t(notifications.preferences.pushEnabled ? "Notifications enabled" : "Notifications paused"),
    accessibility: t("Reading, motion and keyboard navigation"),
    data: t("Export your saved profile and personal plan"),
    diagnostics: t(online ? "Online" : "Offline"),
    preferences: `${localeOptions.find(option => option.code === locale)?.name} · ${profile.preferredCurrency}`,
    "public-profile": t(profile.privacy.visibility === "private" ? "Only you can view it" : "Ready to preview and share"),
    privacy: t(profile.privacy.visibility.charAt(0).toUpperCase() + profile.privacy.visibility.slice(1)),
    security: t("Password, devices and login methods"),
  };

  useEffect(() => {
    const nextSnapshot = JSON.stringify({ identity: initialIdentity, profile: initialProfile });
    if (nextSnapshot === incomingSnapshot.current) return;
    if (!isDirty) {
      incomingSnapshot.current = nextSnapshot;
      savedSnapshot.current = nextSnapshot;
      setIdentity(initialIdentity);
      setProfile(initialProfile);
    }
  }, [initialIdentity, initialProfile, isDirty]);

  useEffect(() => {
    const syncHash = () => setActiveSection(resolveSettingsSection(window.location.pathname, window.location.hash));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => { window.removeEventListener("hashchange", syncHash); window.removeEventListener("popstate", syncHash); };
  }, [pathname]);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync(); window.addEventListener("online", sync); window.addEventListener("offline", sync);
    return () => { window.removeEventListener("online", sync); window.removeEventListener("offline", sync); };
  }, []);

  useEffect(() => {
    const protectNavigation = (event: MouseEvent) => {
      if (!hasUnsavedChanges || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.hasAttribute('download') || link.target === '_blank') return;
      const target = new URL(link.href, location.href);
      if (target.origin === location.origin && target.pathname === location.pathname && target.hash.startsWith('#settings-')) return;
      event.preventDefault(); event.stopPropagation(); setPendingNavigation(link.href);
    };
    document.addEventListener('click', protectNavigation, true);
    return () => document.removeEventListener('click', protectNavigation, true);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    function protectChanges(event: BeforeUnloadEvent) {
      if (hasUnsavedChanges) { event.preventDefault(); event.returnValue = ""; }
    }
    window.addEventListener("beforeunload", protectChanges);
    return () => window.removeEventListener("beforeunload", protectChanges);
  }, [hasUnsavedChanges]);

  function selectSection(section: SettingsSection) {
    setActiveSection(section);
    setQuery("");
    const href = settingsHref(section, pathname);
    if (`${window.location.pathname}${window.location.hash}` !== href) window.history.pushState(null, "", href);
    window.requestAnimationFrame(() => {
      const content = contentRef.current;
      if (!content) return;
      const navHeight = 0;
      content.focus({ preventScroll: true });
      const headerOffset = Number.parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 84;
      window.scrollTo({ top: Math.max(0, window.scrollY + content.getBoundingClientRect().top - headerOffset - navHeight - 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }

  function updateProfile(patch: Partial<TgpiAccountProfile>) {
    setProfile((current) => ({ ...current, ...patch }));
    setSaveState("idle");
    setMessage("");
  }

  function updateIdentity(patch: Partial<AccountIdentityInput>) {
    setIdentity((current) => ({ ...current, ...patch }));
    setSaveState("idle");
    setMessage("");
  }

  function updatePrivacy(
    key: keyof TgpiAccountProfile["privacy"],
    value: TgpiAccountProfile["privacy"][typeof key],
  ) {
    updateProfile({ privacy: { ...profile.privacy, [key]: value } });
  }

  function toggleLanguage(language: string) {
    const exists = profile.languages.includes(language);
    if (!exists && profile.languages.length >= 8) {
      setSaveState("error");
      setMessage("Choose up to eight languages so your profile stays focused.");
      return;
    }
    updateProfile({
      languages: exists
        ? profile.languages.filter((item) => item !== language)
        : [...profile.languages, language],
    });
  }

  async function saveAccount() {
    if (savingRef.current || !isDirty) return;
    if (!navigator.onLine) { setSaveState("error"); setMessage("You are offline. Keep this page open and retry when connected."); return; }
    const invalid = contentRef.current?.querySelector<HTMLInputElement>('input:invalid, select:invalid, textarea:invalid');
    if (invalid) { invalid.reportValidity(); return; }
    savingRef.current = true;
    setSaveState("saving");
    setConflict(false);
    setMessage("");
    const payload: TgpiAccountUpdate = { identity, profile };

    try {
      const response = await fetch("/api/account-profile", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json", "X-TGPI-Session": sessionId },
        method: "PATCH",
        signal: AbortSignal.timeout(20000),
      });
      const result = (await response.json()) as {
        error?: string;
        identity?: AccountIdentityInput;
        profile?: TgpiAccountProfile;
      };
      if (response.status === 409) setConflict(true);
      if (!response.ok || !result.identity || !result.profile) {
        throw new Error(result.error || "Unable to save your account.");
      }
      setIdentity(result.identity);
      setProfile(result.profile);
      savedSnapshot.current = JSON.stringify({ identity: result.identity, profile: result.profile });
      incomingSnapshot.current = JSON.stringify({ identity: initialIdentity, profile: initialProfile });
      setSaveState("saved");
      setMessage("Saved across your TGPI account and decision tools.");
      announceProgressSaved();
      try { await user?.reload(); } catch { /* Persistence succeeded; a session refresh can retry later. */ }
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Saving could not be confirmed. Keep your edits and check the connection before retrying.");
    } finally { savingRef.current = false; }
  }

  function discardChanges() {
    const saved = JSON.parse(savedSnapshot.current) as TgpiAccountUpdate;
    setIdentity(saved.identity); setProfile(saved.profile); setDiscardOpen(false); setMessage(""); setSaveState("idle");
  }

  const overviewScreen = (
    <div className={styles.stack}>
      <ScreenHeading section="overview" title="Make TGPI work your way." description="A clear view of your account, with the right controls within reach." />
      <div className={styles.statusGrid}>
        <button type="button" className={styles.statusCard} onClick={() => selectSection("security")}><SettingsIcon section="security" /><span>{t("Account access")}</span><strong>{t(account.emailVerified ? "Email verified" : "Verify your email")}</strong><small>{t("Review login methods and devices")}</small></button>
        <button type="button" className={styles.statusCard} onClick={() => selectSection("privacy")}><SettingsIcon section="privacy" /><span>{t("Profile visibility")}</span><strong>{t(profile.privacy.visibility === "private" ? "Private profile" : profile.privacy.visibility === "members" ? "TGPI members" : "Public profile")}</strong><small>{t(isDirty ? "Preview of your pending choices" : "Review what you share")}</small></button>
        <button type="button" className={styles.statusCard} onClick={() => selectSection("diagnostics")}><SettingsIcon section="diagnostics" /><span>{t("Synchronization")}</span><strong>{t(isDirty ? "Unsaved changes" : "No pending edits")}</strong><small>{t("Check account connection")}</small></button>
      </div>
      <article className={styles.identityCard}>
        <AccountAvatar imageUrl={account.avatarUrl} initials={initials} label={fullName} />
        <div><span className={styles.eyebrow}>{t(account.membership)}</span><h3>{fullName}</h3><p>{profile.headline || t("Your identity across TGPI")}</p><small>{t("Profile completeness")} · {completion}%</small><progress aria-label={t("Profile completeness")} value={completion} max={100} /></div>
        <button type="button" className={styles.lightButton} onClick={() => selectSection("identity")}>{t("Edit profile")} ↗</button>
      </article>
      <div className={styles.recommendation}>
        <span className={styles.screenIcon}><SettingsIcon section={!profile.legalFullName ? "identity" : "preferences"} /></span>
        <div><span className={styles.eyebrow}>{t("Suggested next step")}</span><h3>{t(!profile.legalFullName ? "Review your certificate name" : !profile.timezone ? "Set your local timezone" : "Review your privacy choices")}</h3><p>{t(!profile.legalFullName ? "Check the full name used for your next learning credential." : !profile.timezone ? "Keep a useful timezone reference in your account." : "Decide which details belong on your shared profile.")}</p></div>
        <button type="button" className={styles.secondary} onClick={() => selectSection(!profile.legalFullName ? "identity" : !profile.timezone ? "preferences" : "privacy")}>{t("Review")} →</button>
      </div>
      <div><div className={styles.sectionLabel}><span className={styles.eyebrow}>{t("Explore your settings")}</span><small>{t("Account · experience · privacy")}</small></div>
      <div className={styles.settingsGrid}>{settingsSections.filter(section => section.key !== "overview" && section.key !== "progress").map(section => <button type="button" className={styles.settingCard} onClick={() => selectSection(section.key)} key={section.key}><span className={styles.tileIcon}><SettingsIcon section={section.key} /></span><div><strong>{t(section.label)}</strong><p>{sectionSummaries[section.key as Exclude<SettingsSection, "overview">]}</p></div><span aria-hidden="true">↗</span></button>)}</div></div>
      <Link className={styles.relatedLink} href="/profile">{t("Learning, goals and achievements live in your workspace.")} <span>→</span></Link>
    </div>
  );

  let activeScreen: React.ReactNode = overviewScreen;

  if (activeSection === "global-key") {
    activeScreen = (
      <div>
        <ScreenHeading description="Global ID, verification and account security" section="global-key" title="TGPI Global ID" />
        <article className="tgpi-key-surface relative mt-6 overflow-hidden rounded-[28px] border border-[#173754] p-6 text-white shadow-[0_24px_65px_rgba(11,31,58,0.2)] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span aria-hidden="true" className="tgpi-key-emblem grid h-16 w-16 shrink-0 place-items-center rounded-[22px] border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 text-[var(--tgpi-gold-light)]"><SettingsIcon section="global-key" /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]"><LocalizedText text={"TGPI Integrity Chain V2"} /></p><span className="rounded-full border border-[#72C79D]/30 bg-[#72C79D]/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#AFE3C7]"><LocalizedText text={"Verification details in command center"} /></span></div>
              <p className="mt-3 break-all font-mono text-lg font-bold tracking-[0.06em] text-white sm:text-2xl">{account.globalId}</p>
              <p className="mt-3 max-w-2xl text-xs leading-6 text-[#AEBBC9]"><LocalizedText text={"Your existing Global ID remains stable. The Integrity Chain adds signed blocks, an encrypted verification proof, safe rotation and an external Merkle receipt without changing login credentials."} /></p>
            </div>
          </div>
          <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            {["Stable ID across your TGPI account", "Review actual proof and anchoring status", "Keep personal information off-chain"].map((item) => <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-[#D7E0E8]" key={item}>✓ {t(item)}</p>)}
          </div>
          <Link className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[var(--tgpi-gold)] px-5 text-xs font-extrabold text-[#07182D] transition hover:bg-[#F0C95F]" href="/global-key"><LocalizedText text={"Open Global Key Command Center →"} /></Link>
        </article>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { title: "Account connection", value: account.emailVerified ? "Email verified" : "Verify your email", detail: "Email verification confirms access to the address; it is not legal identity verification.", section: "security" as const },
            { title: "Certificate identity", value: profile.legalFullName ? "Real name provided" : "Add your complete name", detail: "Review the name used for newly issued learning credentials.", section: "identity" as const },
            { title: "Privacy controls", value: profile.privacy.visibility === "private" ? "Private profile" : "Review profile sharing", detail: "Choose which profile details other people can see.", section: "privacy" as const },
          ].map(card => <button className="tgpi-account-tile rounded-2xl border border-[var(--tgpi-border)] bg-white p-5 text-left" key={card.title} onClick={() => selectSection(card.section)} type="button"><span className="text-xs font-bold uppercase tracking-wider text-[#705115]"><LocalizedText text={card.title} /></span><span className="mt-2 block text-base font-extrabold text-[var(--tgpi-navy-raised)]">{t(card.value)} →</span><span className="mt-2 block text-sm leading-6 text-[var(--tgpi-muted)]"><LocalizedText text={card.detail} /></span></button>)}
        </div>
      </div>
    );
  }

  if (activeSection === "identity") {
    activeScreen = (
      <div>
        <ScreenHeading description="Keep your TGPI identity useful, current and safe without storing sensitive documents." section="identity" title={localizeLabel("Personal information")} />
        <div className="mt-6">
          <TgpiAvatarEditor
            displayName={fullName}
            initialImageUrl={account.avatarUrl}
            initials={initials}
          />
        </div>
        <div className="mt-6 rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name"><input autoComplete="given-name" className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ firstName: event.target.value })} required value={identity.firstName} /></Field>
            <Field label="Last name"><input autoComplete="family-name" className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ lastName: event.target.value })} value={identity.lastName} /></Field>
            <div className="sm:col-span-2"><Field label="Complete real name" description="Enter all given names and surnames exactly as you want them on new certificates. This is self-declared, not document-verified."><LocalizedElement as="input" autoComplete="name" className="tgpi-account-input" maxLength={120} onChange={event => updateProfile({ legalFullName: event.target.value })} placeholder={getCertificateName(identity, profile)} value={profile.legalFullName} /></Field></div>
            <Field label="Date of birth" description="Private. Only added to your downloaded PDF if you enable the option below."><input type="date" className="tgpi-account-input" autoComplete="bday" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} onChange={event => updateProfile({ dateOfBirth: event.target.value })} value={profile.dateOfBirth} /></Field>
            <Field label="Gender" description="Choose how you identify. This does not determine country or career recommendations."><select className="tgpi-account-input" value={profile.gender} onChange={event => updateProfile({ gender: event.target.value as TgpiAccountProfile["gender"] })}><option value=""><LocalizedText text="Select an option" /></option><option value="man"><LocalizedText text={"Man"} /></option><option value="woman"><LocalizedText text={"Woman"} /></option><option value="other"><LocalizedText text="Other" /></option><option value="undisclosed"><LocalizedText text={"Prefer not to say"} /></option></select></Field>
            <Field label="How should TGPI address you?" description="Independent of gender; choose what feels right."><select className="tgpi-account-input" value={profile.preferredTitle} onChange={event => updateProfile({ preferredTitle: event.target.value as TgpiAccountProfile["preferredTitle"] })}><option value="name"><LocalizedText text={"By my name"} /></option><option value="mr"><LocalizedText text={"Mr."} /></option><option value="ms"><LocalizedText text={"Ms."} /></option><option value="mx"><LocalizedText text={"Mx."} /></option></select></Field>
            <div className="rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas-alt)] p-4"><p className="text-xs font-bold text-[var(--tgpi-muted)]"><LocalizedText text={"Personal greeting preview"} /></p><p className="mt-2 text-xl font-semibold text-[var(--tgpi-navy-raised)]">{getAccountSalutation(identity, profile, localizeLabel)}</p></div>
            <div className="sm:col-span-2"><Field label="Display name" description="Your public presentation; certificate names remain separate."><input className="tgpi-account-input" autoComplete="nickname" maxLength={120} value={profile.displayName} onChange={e => updateProfile({ displayName: e.target.value })} /></Field></div>
            <div className="sm:col-span-2"><Field description="A concise line used in future profile and collaboration surfaces." label="Professional headline"><LocalizedElement as="input" className="tgpi-account-input" maxLength={120} onChange={(event) => updateProfile({ headline: event.target.value })} placeholder="Product designer building a global career" value={profile.headline} /></Field></div>
            <div className="sm:col-span-2"><Field description={localizeLabel("{count}/{limit} characters", { count: profile.bio.length, limit: 500 })} label="About you"><LocalizedElement as="textarea" className="tgpi-account-input min-h-32 resize-y py-3" maxLength={500} onChange={(event) => updateProfile({ bio: event.target.value })} placeholder="Share the context that helps TGPI understand your goals and experience." value={profile.bio} /></Field></div>
            <Field label="Country of residence"><ProfileSearchSelect label="Country of residence" value={profile.currentCountry} options={countries.map(country => ({ label: `${country.emoji} ${country.name}`, value: country.slug }))} onChange={value => updateProfile({ currentCountry: value, currentCity: "" })} /></Field>
            <Field label="City of residence" description="Search major-city suggestions or enter and select your city if it is not listed."><ProfileSearchSelect key={profile.currentCountry} label="City of residence" value={profile.currentCity} options={(citySuggestions[profile.currentCountry] ?? []).map(city => ({ label: city, value: city }))} allowCustom onChange={value => updateProfile({ currentCity: value })} /></Field>
            <Field label="Nationality / country of citizenship" description="Your citizenship can differ from where you live. It helps frame document and immigration research."><ProfileSearchSelect label="Nationality" value={profile.nationality} options={countries.map(country => ({ label: country.name, value: country.name }))} onChange={value => updateProfile({ nationality: value })} /></Field>
          </div>
        </div>
        <MemberIdentityEditor />
        <article className="tgpi-account-tile mt-6 rounded-[22px] border border-[#D7C68F] bg-[#FBF4DE] p-5 sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#705115]"><LocalizedText text={"Certificate identity preview"} /></p>
          <h3 className="mt-3 break-words text-2xl text-[var(--tgpi-navy-raised)]">{getCertificateName(identity, profile)}</h3>
          <p className="mt-2 break-all text-sm font-bold text-[var(--tgpi-muted)]">{account.globalId}</p>
          <p className="mt-3 text-sm leading-6 text-[#62583E]"><LocalizedText text={"New certificates use your saved real name. Existing signed credentials preserve their original issued name. Your birth date and gender do not appear on your public profile or verification page."} /></p>
          <Toggle checked={profile.certificateBirthDateConsent} label="Include birth date in my downloaded certificate PDF" description="Optional personal detail, provided by you. Anyone you send that PDF to will see it. Public verification does not include it." onChange={value => updateProfile({ certificateBirthDateConsent: value })} />
          <Link className="mt-4 inline-flex font-bold text-[#705115]" href="/certificates"><LocalizedText text={"Open my certificates →"} /></Link>
        </article>
      </div>
    );
  }

  if (activeSection === "global") {
    activeScreen = (
      <div>
        <ScreenHeading description="This context synchronizes with Country Fit, Compare, your personal plan and learning paths." section="global" title={localizeLabel("Global profile")} />
        <div className="mt-6 rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Profession or field"><ProfileSearchSelect label="Profession or field" value={profile.profession} options={professionSuggestions.map(profession => ({ label: profession, value: profession }))} allowCustom onChange={value => updateProfile({ profession: value })} /></Field>
            <Field label="Education level"><select className="tgpi-account-input" onChange={(event) => updateProfile({ educationLevel: event.target.value })} value={profile.educationLevel}><option value=""><LocalizedText text={"Select your level"} /></option><option value="Secondary education"><LocalizedText text="Secondary education" /></option><option value="Technical or vocational"><LocalizedText text={"Technical or vocational"} /></option><option value="Undergraduate"><LocalizedText text={"Undergraduate"} /></option><option value="Bachelor's degree"><LocalizedText text={"Bachelor's degree"} /></option><option value="Master's degree"><LocalizedText text={"Master's degree"} /></option><option value="Doctorate"><LocalizedText text={"Doctorate"} /></option><option value="Other"><LocalizedText text="Other" /></option></select></Field>
            <Field label="Professional experience"><select className="tgpi-account-input" value={profile.yearsExperience} onChange={event => updateProfile({ yearsExperience: event.target.value })}><option value=""><LocalizedText text={"Select your experience"} /></option><option value="0"><LocalizedText text={"Getting started"} /></option><option value="1-2"><LocalizedText text={"1–2 years"} /></option><option value="3-5"><LocalizedText text={"3–5 years"} /></option><option value="6-10"><LocalizedText text={"6–10 years"} /></option><option value="11+"><LocalizedText text={"11+ years"} /></option></select></Field>
            <Field label="Current professional situation"><select className="tgpi-account-input" value={profile.employmentType} onChange={event => updateProfile({ employmentType: event.target.value })}><option value=""><LocalizedText text="Select an option" /></option><option value="employed"><LocalizedText text={"Employed"} /></option><option value="self-employed"><LocalizedText text={"Self-employed"} /></option><option value="entrepreneur"><LocalizedText text={"Entrepreneur"} /></option><option value="student"><LocalizedText text={"Student"} /></option><option value="seeking-work"><LocalizedText text={"Seeking work"} /></option><option value="retired"><LocalizedText text={"Retired"} /></option></select></Field>
            <div className="sm:col-span-2"><p className="text-sm font-extrabold text-[var(--tgpi-navy-raised)]"><LocalizedText text="Languages" /></p><p className="mt-1 text-xs leading-5 text-[#6B7280]"><LocalizedText text={"Choose up to eight. The same list updates your personal plan."} /></p><div className="mt-3 flex flex-wrap gap-2">{languageOptions.map((language) => { const selected = profile.languages.includes(language); return <button aria-pressed={selected} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${selected ? "border-[var(--tgpi-navy-raised)] bg-[var(--tgpi-navy-raised)] text-white" : "border-[var(--tgpi-border)] bg-white text-[#566173] hover:border-[var(--tgpi-gold-hover)]"}`} key={language} onClick={() => toggleLanguage(language)} type="button">{selected ? "✓ " : ""}<LocalizedText text={language} /></button>; })}</div></div>
          </div>
          <div className="mt-7 rounded-2xl border border-[#D9C78D] bg-[#FBF4DE] p-5"><p className="text-sm font-extrabold text-[var(--tgpi-navy-raised)]"><LocalizedText text={"One canonical personal plan"} /></p><p className="mt-1 text-xs leading-5 text-[#6F6241]"><LocalizedText text={"Goals, shortlist, budget, timeline and priorities remain in the plan editor to prevent conflicting recommendations."} /></p><Link className="mt-4 inline-flex text-xs font-extrabold text-[#76520C]" href="/onboarding"><LocalizedText text={"Edit personal plan →"} /></Link></div>
          {decisionContext.countries.length ? <div className="mt-5 rounded-2xl border border-[#D9E0E7] bg-[#F4F8FB] p-5"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#48677F]"><LocalizedText text={"Countries synchronized with your plan"} /></p><div className="mt-3 flex flex-wrap gap-2">{decisionContext.countries.map((country) => <Link className="rounded-full border border-[#C9D8E4] bg-white px-3 py-2 text-xs font-extrabold text-[var(--tgpi-navy-raised)] transition hover:border-[var(--tgpi-gold-hover)]" href={`/countries/${country.slug}`} key={country.slug}>{country.emoji} <LocalizedText text={country.name} /></Link>)}</div></div> : null}
        </div>
      </div>
    );
  }

  if (activeSection === "progress") {
    activeScreen = rank ? <GlobalProgressPanel rank={rank} headingLevel={2} /> : <p role="status"><LocalizedText text="Unavailable" /></p>;
  }

  if (activeSection === "public-profile") {
    activeScreen = (
      <div>
        <ScreenHeading description="Preview the saved public fields, manage your member identity and export an authorized presentation." section="public-profile" title={localizeLabel("Public profile")} />
        <div className="mt-6 rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5 sm:p-7"><div className="grid gap-5 sm:grid-cols-2">            <Field label="Website"><LocalizedElement as="input" className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ website: event.target.value })} placeholder="https://yourwebsite.com" value={profile.website} /></Field>
            <Field label="LinkedIn"><LocalizedElement as="input" className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ linkedin: event.target.value })} placeholder="linkedin.com/in/username" value={profile.linkedin} /></Field>
            <Field label="Instagram"><LocalizedElement as="input" className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ instagram: event.target.value })} placeholder="instagram.com/username" value={profile.instagram} /></Field></div></div>
        <MemberIdentityEditor />
        <MemberExportCenter />
        <details className="mt-4"><summary className="cursor-pointer py-3 font-bold"><LocalizedText text={"Find a TGPI member"} /></summary><MemberDirectory /></details>
        <Link className="tgpi-member-button mt-4" href={`${account.publicProfileUrl}?preview=1`}><LocalizedText text={"Open exact saved public preview →"} /></Link>
        <p className="mt-3 text-sm text-slate-600"><LocalizedText text={"Save profile and privacy changes before previewing or exporting. Public fields are read again on the server."} /></p>
        <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <article className="relative overflow-hidden rounded-[28px] border border-[#173754] bg-[#07182D] p-6 text-white shadow-[0_24px_65px_rgba(11,31,58,0.2)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[var(--tgpi-gold-hover)]/15 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <AccountAvatar imageUrl={account.avatarUrl} initials={initials} label={fullName} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3"><div className="min-w-0 flex-1"><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]"><LocalizedText text={"TGPI Global Profile"} /></p><h3 className="mt-2 break-words font-[var(--tgpi-font-display)] text-3xl font-semibold">{fullName}</h3></div>{profile.privacy.showProgress && rank ? <GlobalRankBadge rank={rank} size="small" /> : null}</div>
                <p className="mt-1 text-sm font-bold text-[#CFD8E3]">{profile.headline || <LocalizedText text={"Add a professional headline"} />}</p>
                {profile.privacy.showLocation && (profile.currentCity || currentCountryName) ? <p className="mt-2 text-xs text-[#8FA0B3]">{t(currentCountryName)}</p> : null}
              </div>
            </div>
            <p className="relative mt-6 max-w-2xl text-sm leading-7 text-[#AEBBC9]">{profile.bio || <LocalizedText text={"Add a concise biography so people understand your experience, interests and global direction."} />}</p>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {profile.privacy.showCareer && profile.profession ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-extrabold text-[#D8E1EB]">{profile.profession}</span> : null}
              {profile.privacy.showCareer && profile.educationLevel ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-extrabold text-[#D8E1EB]">{profile.educationLevel}</span> : null}
              {(profile.privacy.showLanguages ? profile.languages : []).slice(0, 4).map((language) => <span className="rounded-full border border-[var(--tgpi-gold)]/20 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[10px] font-extrabold text-[var(--tgpi-gold-light)]" key={language}>{language}</span>)}
            </div>
            <div className="relative mt-7 flex flex-wrap items-start gap-3 border-t border-white/10 pt-6">
              <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-xs font-extrabold text-white transition hover:bg-white/10" href={account.publicProfileUrl}><LocalizedText text={"Open full profile"} /></Link>
              {profile.privacy.visibility !== "private" ? <PublicProfileShareButton title={`${fullName} — TGPI Global Profile`} url={account.publicProfileUrl} /> : null}
            </div>
          </article>

          <div className="grid content-start gap-4">
            <article className={`rounded-[24px] border p-5 ${profile.privacy.visibility === "private" ? "border-[#E0CDA0] bg-[#FBF4DE]" : "border-[#B9DDCA] bg-[#ECF7F1]"}`}>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#73520F]"><LocalizedText text={"Sharing status"} /></p>
              <h3 className="mt-2 text-lg font-extrabold text-[var(--tgpi-navy-raised)]">{profile.privacy.visibility === "public" ? <LocalizedText text={"Anyone with the link"} /> : profile.privacy.visibility === "members" ? <LocalizedText text={"Signed-in TGPI members"} /> : <LocalizedText text={"Visible only to you"} />}</h3>
              <p className="mt-2 text-xs leading-5 text-[#686556]"><LocalizedText text={"Your email, login methods, billing details and private activities never appear on this profile."} /></p>
              <button className="mt-4 text-xs font-extrabold text-[#76520C] underline decoration-[var(--tgpi-gold-hover)]/40 underline-offset-4" onClick={() => selectSection("privacy")} type="button"><LocalizedText text={"Change privacy controls →"} /></button>
            </article>
            <article className="rounded-[24px] border border-[var(--tgpi-border)] bg-white p-5">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7A8390]"><LocalizedText text={"Shared fields"} /></p>
              <ul className="mt-4 grid gap-3 text-xs font-bold text-[var(--tgpi-navy-raised)]">
                <li className="flex items-center justify-between gap-4"><span><LocalizedText text={"Name, image, headline and biography"} /></span><span className="text-[#277352]"><LocalizedText text={"Included"} /></span></li>
                <li className="flex items-center justify-between gap-4"><span><LocalizedText text={"Location"} /></span><span>{profile.privacy.showLocation ? <LocalizedText text={"Included"} /> : <LocalizedText text={"Hidden"} />}</span></li>
                <li className="flex items-center justify-between gap-4"><span><LocalizedText text={"Global goals"} /></span><span>{profile.privacy.showGoals ? <LocalizedText text={"Included"} /> : <LocalizedText text={"Hidden"} />}</span></li>
                <li className="flex items-center justify-between gap-4"><span><LocalizedText text={"Profile progress"} /></span><span>{profile.privacy.showProgress ? <LocalizedText text={"Included"} /> : <LocalizedText text={"Hidden"} />}</span></li>
              </ul>
            </article>
            {isDirty ? <p className="rounded-2xl border border-[#E0CDA0] bg-[var(--tgpi-inverse)] px-4 py-3 text-xs font-bold leading-5 text-[#76520C]"><LocalizedText text={"Save your pending changes before opening the full public profile so the preview and shared page stay synchronized."} /></p> : null}
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "preferences") {
    activeScreen = (
      <div>
        <ScreenHeading description="Save your research and display preferences. Content languages and unit conversion depend on the current feature." section="preferences" title={localizeLabel("App preferences")} />
        <div className="mt-6 rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <LanguageSelector />
            <Field label="Preferred currency"><select className="tgpi-account-input" onChange={(event) => updateProfile({ preferredCurrency: event.target.value })} value={profile.preferredCurrency}>{currencyOptions.map((currency) => <option key={currency} value={currency}><LocalizedText text={currency} /></option>)}</select></Field>
            <Field label="Timezone"><LocalizedElement as="input" className="tgpi-account-input" list="tgpi-timezones" maxLength={80} onChange={(event) => updateProfile({ timezone: event.target.value })} placeholder="America/Sao_Paulo" value={profile.timezone} /><datalist id="tgpi-timezones">{timezoneOptions.map((timezone) => <option key={timezone} value={timezone} />)}</datalist></Field>
            <button type="button" className={styles.secondary} onClick={() => updateProfile({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })}>{t("Use this device’s timezone")}</button>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "privacy") {
    activeScreen = (
      <div>
        <ScreenHeading description="Choose which saved fields can appear in your member profile, discovery and shareable presentations." section="privacy" title={localizeLabel("Privacy")} />
        <div className="mt-6 rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5 sm:p-7">
          <Field description="Private is the safest default. You can change this whenever you choose." label="Profile visibility"><select className="tgpi-account-input" onChange={(event) => updatePrivacy("visibility", event.target.value as TgpiAccountProfile["privacy"]["visibility"])} value={profile.privacy.visibility}><option value="private"><LocalizedText text={"Private — only you"} /></option><option value="members"><LocalizedText text={"Members — signed-in TGPI members"} /></option><option value="public"><LocalizedText text={"Public — shareable profile"} /></option></select></Field>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E3DED3]"><Toggle checked={profile.privacy.showLocation} description="Share country only. Your city remains private." label="Show location" onChange={(value) => updatePrivacy("showLocation", value)} /><Toggle checked={profile.privacy.showProgress} description="Show learning and preparation progress on your profile." label="Show progress" onChange={(value) => updatePrivacy("showProgress", value)} /><Toggle checked={profile.privacy.showGoals} description="Show selected international goals on your profile." label="Show global goals" onChange={(value) => updatePrivacy("showGoals", value)} /></div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#E3DED3]">
            <Toggle checked={profile.privacy.discoverable} label="Member discovery" description="Allow exact @ID and TGPI number searches by signed-in members. Your profile visibility still applies." onChange={v => updatePrivacy('discoverable', v)} />
            <Toggle checked={profile.privacy.allowIndexing} label="Search engine indexing" description="Separate opt-in, effective only when your profile is Public. Search engines may take time to remove old copies." onChange={v => updatePrivacy('allowIndexing', v)} />
            <Toggle checked={profile.privacy.showCareer} label="Share professional context" description="Profession and education, clearly marked as self-declared." onChange={v => updatePrivacy('showCareer', v)} />
            <Toggle checked={profile.privacy.showLanguages} label="Share declared languages" description="Listing a language does not verify proficiency." onChange={v => updatePrivacy('showLanguages', v)} />
            <Toggle checked={profile.privacy.showLinks} label="Share professional links" description="Publish your selected website and social links." onChange={v => updatePrivacy('showLinks', v)} />
          </div>
          <div className="mt-6 rounded-2xl bg-[#F3EFE6] p-5 text-xs leading-6 text-[#5F6876]"><LocalizedText text={"TGPI never stores passwords, recovery methods, passport numbers, national IDs or document scans in this profile. Authentication remains protected by Clerk."} /></div>
        </div>
        <div className="mt-5"><AnalyticsPreferences /></div>
      </div>
    );
  }

  if (activeSection === "billing") { activeScreen = <div><ScreenHeading section="billing" title="Subscription & billing" description="Plan status, renewal and secure billing portal" /><AccountBillingPanel /></div>; }
  if (activeSection === "accessibility") activeScreen = <div><ScreenHeading section="accessibility" title="Accessibility" description="Reading, motion and keyboard navigation" /><SettingsAccessibility /></div>;
  if (activeSection === "data") activeScreen = <div><ScreenHeading section="data" title="Data & exports" description="Export your saved profile and personal plan" /><SettingsData /></div>;
  if (activeSection === "diagnostics") activeScreen = <div><ScreenHeading section="diagnostics" title="Connection & sync" description="Check your connection and saved profile version" /><SettingsDiagnostics updatedAt={profile.updatedAt} /></div>;

  if (activeSection === "security") {
    activeScreen = (
      <div>
        <ScreenHeading description="Password, devices and login methods" section="security" title={localizeLabel("Login & security")} />
        <div className="mt-6 overflow-hidden rounded-[22px] border border-[var(--tgpi-border)] bg-white p-2 sm:p-4">{children}</div>
      </div>
    );
  }

  const editable = ["identity", "global", "preferences", "privacy", "public-profile"].includes(activeSection);
  const navigation = settingsSections.filter(section => section.key !== "progress");
  const renderSearch = (id: string) => <label className={styles.search} htmlFor={id}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><span className="sr-only">{t("Search settings")}</span><input id={id} type="search" value={query} placeholder={t("Search settings")} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && filteredSections.length) selectSection(filteredSections[0].key); if (event.key === "Escape") setQuery(""); }} /></label>;
  return (
    <div className={`tgpi-settings-v2 ${styles.root}`}>
      <header className={styles.hero}>
        <Image className={styles.heroImage} src="/images/cinematic-2026/digital-security-1600.webp" alt="" fill sizes="(max-width: 768px) 100vw, 1400px" priority />
        <div className={styles.heroContent}><span className={styles.eyebrow}>{t("TGPI / Account control")}</span><h1>{t("Settings")}</h1><p>{t("Your world. Your preferences. Your control.")}</p><div className={styles.heroBadges}><span><i />{t("Private account center")}</span><span>{t(account.membership)}</span></div></div>
        <NavigationLink className={styles.heroLink} href="/profile">{t("Back to workspace")} ↗</NavigationLink>
      </header>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <button className={styles.sidebarIdentity} onClick={() => selectSection("overview")} type="button"><AccountAvatar imageUrl={account.avatarUrl} initials={initials} label={fullName} size="small" /><span><strong>{fullName}</strong><small>{t("Your account")}</small></span></button>
          {renderSearch("settings-search-desktop")}
          <nav aria-label={t("Account settings")} className={styles.navigation}>{settingsGroups.map(group => {
            const sections = filteredSections.filter(section => section.group === group && (section.key !== "progress" || Boolean(query) || activeSection === "progress"));
            return sections.length ? <div key={group}><p>{t(group)}</p>{sections.map(section => <button type="button" key={section.key} aria-current={activeSection === section.key ? "page" : undefined} onClick={() => selectSection(section.key)}><SettingsIcon section={section.key} /><span>{t(section.label)}</span></button>)}</div> : null;
          })}</nav>
          {filteredSections.length === 0 && <p role="status" className={styles.empty}>{t("No setting matches this search.")}</p>}
          <div className={styles.sidebarStatus}><i /><span>{t(online ? "Online" : "Offline")}<small>{t(isDirty ? "Changes waiting to be saved" : "No pending edits")}</small></span></div>
        </aside>
        <div className={styles.main}>
          <div className={styles.mobileNav}>
            {renderSearch("settings-search-mobile")}
            {query ? <div className={styles.mobileResults}>{filteredSections.map(section => <button type="button" key={section.key} onClick={() => selectSection(section.key)}><SettingsIcon section={section.key} />{t(section.label)}<span>→</span></button>)}{!filteredSections.length && <p role="status">{t("No setting matches this search.")}</p>}</div> : <label className={styles.mobileSelect}><SettingsIcon section={activeSection} /><span className="sr-only">{t("Choose settings section")}</span><select value={activeSection} onChange={event => selectSection(event.target.value as SettingsSection)}>{(activeSection === "progress" ? settingsSections : navigation).map(section => <option key={section.key} value={section.key}>{t(section.label)}</option>)}</select></label>}
          </div>
          <div className={styles.breadcrumb}><button type="button" onClick={() => selectSection("overview")}>{t("Settings")}</button><span>/</span><span>{t(activeDefinition.label)}</span><small>{t(editable ? "Save to your account" : "Account control")}</small></div>
          {!online && <p className={styles.warning} role="status">{t("You are offline. Keep this page open and retry when connected.")}</p>}
          <div className={`tgpi-account-content ${styles.content}`} id={`settings-${activeSection}`} ref={contentRef} tabIndex={-1}><fieldset className="min-w-0" disabled={saveState === "saving"}><div hidden={activeSection === "notifications"}>{activeScreen}</div>{(notificationsVisited || activeSection === "notifications") && <div hidden={activeSection !== "notifications"} className={styles.stack}><ScreenHeading section="notifications" title="Notifications" description="Choose your channels, quiet hours and connected devices in one place." /><NotificationPreferences onDirtyChange={setNotificationDirty} /><NotificationDevices /><Link className={styles.relatedLink} href="/notifications">{t("Open notification center")} →</Link></div>}</fieldset></div>
          {(isDirty || editable || saveState === "error") && <div className={styles.saveBar}>
            <div role="status" aria-live="polite"><strong>{t(saveState === "saving" ? "Synchronizing your account…" : message || (isDirty ? "You have unsaved changes" : "No pending edits"))}</strong><small>{t("Profile changes stay in this page until you save.")}</small></div>
            <div className={styles.saveActions}><button className={styles.secondary} disabled={!isDirty || saveState === "saving"} onClick={() => setDiscardOpen(true)} type="button">{t("Discard edits")}</button><button className={styles.primary} disabled={!isDirty || saveState === "saving" || !online} onClick={() => void saveAccount()} type="button">{t(saveState === "saving" ? "Saving…" : "Save changes")}</button></div>
            {discardOpen && <div className={styles.confirm}><p>{t("Discard all unsaved profile edits?")}</p><button type="button" className={styles.secondary} onClick={() => setDiscardOpen(false)}>{t("Keep editing")}</button><button type="button" className={styles.primary} onClick={discardChanges}>{t("Discard edits")}</button></div>}
            {conflict && <p className={styles.warning}>{t("Your edits are still here. Copy any changes you need before reloading the latest saved profile.")}</p>}
          </div>}
        </div>
      </div>
      {pendingNavigation && <div className={styles.navigationWarning} role="alert"><strong>{t("You have unsaved changes")}</strong><button type="button" className={styles.secondary} onClick={() => setPendingNavigation(null)}>{t("Keep editing")}</button><button type="button" className={styles.primary} onClick={() => { const href = pendingNavigation; discardChanges(); setPendingNavigation(null); router.push(href); }}>{t("Discard and leave")}</button></div>}
    </div>
  );
}
