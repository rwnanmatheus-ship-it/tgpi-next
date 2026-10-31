"use client";
import { useLocale } from "@/components/localization/LocaleProvider";
import { localeOptions } from "@/lib/localization/config";
import LanguageSelector from "@/components/localization/LanguageSelector";

import { announceProgressSaved } from "@/lib/progress-sync";
import Link from "next/link";
import MemberIdentityEditor from './MemberIdentityEditor';
import MemberExportCenter from './MemberExportCenter';
import MemberDirectory from './MemberDirectory';
import AccountBillingPanel from './AccountBillingPanel';
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Children, cloneElement, isValidElement, useId, useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import PublicProfileShareButton from "@/components/profile/PublicProfileShareButton";
import GlobalProgressPanel from "@/components/profile/GlobalProgressPanel";
import GlobalRankBadge from "@/components/profile/GlobalRankBadge";
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
  rank: GlobalRank;
};
type SaveState = "idle" | "saving" | "saved" | "error";
type SettingsSection =
  | "overview"
  | "global-key"
  | "identity"
  | "global"
  | "progress"
  | "public-profile"
  | "preferences"
  | "notifications"
  | "privacy"
  | "security"
  | "billing";
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
    label: "Global Key",
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
] as const;

const settingsGroups: readonly SettingsSectionDefinition["group"][] = [
  "Account center",
  "Profile & progress",
  "Experience",
  "Safety",
];

const connectedSystems = [
  { href: "/country-fit", icon: "◎", label: "Country Fit", text: "Match destinations to your real priorities." },
  { href: "/compare", icon: "⚖", label: "Compare", text: "Compare your shortlist through one decision lens." },
  { href: "/onboarding", icon: "◫", label: "Personal plan", text: "Turn context into your next practical actions." },
  { href: "/passport", icon: "🛂", label: "Documents", text: "Connect evidence and preparation requirements." },
  { href: "/courses", icon: "🎓", label: "Learning", text: "Build capabilities linked to your global objective." },
] as const;

const goalLabels: Record<string, string> = {
  learn: "Expand global knowledge",
  live: "Live in another country",
  study: "Study abroad",
  travel: "Travel smarter",
  work: "Work globally",
};

const iconPaths: Record<SettingsSection, string> = {
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
  const sizeClass = size === "large" ? "h-20 w-20 text-3xl" : "h-12 w-12 text-lg";
  return (
    <span
      aria-label={`${label} profile image`}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-[#E5BF5A]/60 bg-[#163452] bg-cover bg-center font-[var(--tgpi-font-display)] font-semibold text-[#F0D58C] ${sizeClass}`}
      role="img"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
    >
      {!imageUrl ? initials : <span className="sr-only"><LocalizedText text={label} /></span>}
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
  const primary = nodes.findIndex(node => isValidElement(node) && typeof node.type === 'string' && ['input', 'select', 'textarea'].includes(node.type));
  const nativeInput = primary >= 0;
  const control = nodes.map((node, index) => index === primary ? cloneElement(node as ReactElement<{ id?: string; "aria-describedby"?: string }>, { id, "aria-describedby": description ? `${id}-description` : undefined }) : node);
  return (
    <div className="block">
      {nativeInput ? <label htmlFor={id} className="text-sm font-extrabold text-[#0B1F3A]"><LocalizedText text={label} /></label> : <p className="text-sm font-extrabold text-[#0B1F3A]"><LocalizedText text={label} /></p>}
      {description ? <p id={`${id}-description`} className="mt-1 text-xs leading-5 text-[#526174]"><LocalizedText text={description} /></p> : null}
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
        <span className="block text-sm font-extrabold text-[#0B1F3A]"><LocalizedText text={label} /></span>
        <span className="mt-1 block text-xs leading-5 text-[#697386]"><LocalizedText text={description} /></span>
      </span>
      <input checked={checked} className="peer sr-only" onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      <span className="relative h-7 w-12 shrink-0 rounded-full bg-[#D4D7DC] transition peer-checked:bg-[#0B1F3A] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#B58A2A]">
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
    <div className="flex items-start gap-4 border-b border-[#E3DED3] pb-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0B1F3A] text-[#F0D58C] shadow-[0_10px_24px_rgba(11,31,58,0.15)]">
        <SettingsIcon section={section} />
      </span>
      <div>
        <h2 className="font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[-0.035em] text-[#0B1F3A] sm:text-4xl"><LocalizedText text={title} /></h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]"><LocalizedText text={description} /></p>
      </div>
    </div>
  );
}

function formatSavedDate(value: string | undefined, locale: string) {
  if (!value) return "Not saved yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved recently";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(date);
}

function isSettingsSection(value: string): value is SettingsSection {
  return settingsSections.some((section) => section.key === value);
}

export default function TgpiAccountCenter({
  account,
  children,
  countries,
  decisionContext,
  initialIdentity,
  initialProfile,
  rank,
}: TgpiAccountCenterProps) {
  const { locale, t } = useLocale();
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SettingsSection>("overview");
  const [identity, setIdentity] = useState(initialIdentity);
  const [profile, setProfile] = useState(initialProfile);
  const [query, setQuery] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const savedSnapshot = useRef(JSON.stringify({ identity: initialIdentity, profile: initialProfile }));
  const incomingSnapshot = useRef(JSON.stringify({ identity: initialIdentity, profile: initialProfile }));
  const currentSnapshot = JSON.stringify({ identity, profile });
  const isDirty = currentSnapshot !== savedSnapshot.current;
  const completion = useMemo(() => getAccountProfileCompletion(identity, profile), [identity, profile]);
  const filteredSections = useMemo(() => {
    const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase(locale).trim();
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return settingsSections;
    return settingsSections.filter((section) =>
      normalize(`${t(section.label)} ${t(section.description)} ${section.label} ${section.description} ${section.keywords}`).includes(normalizedQuery),
    );
  }, [query, locale, t]);
  const activeDefinition = settingsSections.find((section) => section.key === activeSection) ?? settingsSections[0];
  const initials = `${identity.firstName.at(0) ?? ""}${identity.lastName.at(0) ?? ""}`.toUpperCase() || "TG";
  const fullName = profile.displayName || [identity.firstName, identity.lastName].filter(Boolean).join(" ") || "TGPI member";
  const currentCountryName = countries.find((country) => country.slug === profile.currentCountry)?.name || profile.currentCountry;
  const sectionSummaries: Record<Exclude<SettingsSection, "overview">, string> = {
    billing: account.membership,
    "global-key": "Global ID, verification and account security",
    global: profile.profession || (profile.languages.length ? `${profile.languages.length} languages` : "Add your global context"),
    identity: profile.currentCity || profile.currentCountry || "Add personal information",
    progress: `${rank.name} · ${rank.points} points`,
    notifications: `${Object.values(profile.notifications).filter(Boolean).length} enabled`,
    preferences: `${localeOptions.find(option => option.code === locale)?.name} · ${profile.preferredCurrency}`,
    "public-profile": profile.privacy.visibility === "private" ? "Only you can view it" : "Ready to preview and share",
    privacy: profile.privacy.visibility.charAt(0).toUpperCase() + profile.privacy.visibility.slice(1),
    security: "Password, devices and login methods",
  };

  useEffect(() => {
    const nextSnapshot = JSON.stringify({ identity: initialIdentity, profile: initialProfile });
    if (nextSnapshot === incomingSnapshot.current) return;
    incomingSnapshot.current = nextSnapshot;
    if (!isDirty) {
      savedSnapshot.current = nextSnapshot;
      setIdentity(initialIdentity);
      setProfile(initialProfile);
    }
  }, [initialIdentity, initialProfile, isDirty]);

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, "");
    if (normalizedPath !== "/profile/security") {
      setActiveSection("security");
      return;
    }
    const hashSection = window.location.hash.replace("#settings-", "");
    if (isSettingsSection(hashSection)) setActiveSection(hashSection);
  }, [pathname]);

  useEffect(() => {
    function syncHash() {
      const section = window.location.hash.replace("#settings-", "");
      setActiveSection(isSettingsSection(section) ? section : "overview");
    }
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => { window.removeEventListener("hashchange", syncHash); window.removeEventListener("popstate", syncHash); };
  }, []);

  useEffect(() => {
    function protectChanges(event: BeforeUnloadEvent) {
      if (isDirty) event.preventDefault();
    }
    window.addEventListener("beforeunload", protectChanges);
    return () => window.removeEventListener("beforeunload", protectChanges);
  }, [isDirty]);

  function selectSection(section: SettingsSection) {
    setActiveSection(section);
    setQuery("");
    window.history.pushState(null, "", `#settings-${section}`);
    window.requestAnimationFrame(() => {
      const content = contentRef.current;
      if (!content) return;
      const nav = content.parentElement?.querySelector<HTMLElement>('.tgpi-account-mobile-nav');
      const navHeight = nav && window.getComputedStyle(nav).display !== 'none' ? nav.getBoundingClientRect().height : 0;
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

  function updateNotifications(key: keyof TgpiAccountProfile["notifications"], value: boolean) {
    updateProfile({ notifications: { ...profile.notifications, [key]: value } });
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
    if (saveState === "saving") return;
    const invalid = contentRef.current?.querySelector<HTMLInputElement>('input:invalid, select:invalid, textarea:invalid');
    if (invalid) { invalid.reportValidity(); return; }
    setSaveState("saving");
    setMessage("");
    const payload: TgpiAccountUpdate = { identity, profile };

    try {
      const response = await fetch("/api/account-profile", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });
      const result = (await response.json()) as {
        error?: string;
        identity?: AccountIdentityInput;
        profile?: TgpiAccountProfile;
      };
      if (!response.ok || !result.identity || !result.profile) {
        throw new Error(result.error || "Unable to save your account.");
      }
      setIdentity(result.identity);
      setProfile(result.profile);
      savedSnapshot.current = JSON.stringify({ identity: result.identity, profile: result.profile });
      setSaveState("saved");
      setMessage("Saved across your TGPI account and decision tools.");
      announceProgressSaved();
      try { await user?.reload(); } catch { /* Persistence succeeded; a session refresh can retry later. */ }
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Unable to save your account. Please try again.");
    }
  }

  const overviewScreen = (
    <div>
      <ScreenHeading description="Your private preparation center: identity, learning and decisions, with distinct progress signals." section="overview" title="Account overview" />
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Link className="tgpi-account-tile rounded-2xl border border-slate-200 p-4" href="/courses"><strong><LocalizedText text="Continue learning →" /></strong><p className="mt-2 text-sm">Resume from your saved lesson.</p></Link>
        <Link className="tgpi-account-tile rounded-2xl border border-slate-200 p-4" href="/certificates"><strong>My credentials →</strong><p className="mt-2 text-sm">Issued records and milestones to earn.</p></Link>
        <Link className="tgpi-account-tile rounded-2xl border border-slate-200 p-4" href="/profile/security#settings-billing"><strong>{account.membership} →</strong><p className="mt-2 text-sm">Review plan and manage billing.</p></Link>
      </div>
      <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4"><strong>Next useful action</strong><p className="mt-2 text-sm">{!profile.profession ? 'Add your professional field: it gives career research a relevant starting point.' : !decisionContext.countries.length ? 'Save a destination: your current plan has no country shortlist.' : 'Review your Country Fit context: budget, timeline and priorities guide the research questions.'}</p><Link className="mt-2 inline-flex min-h-11 items-center font-bold" href="/country-fit">Update Country Fit →</Link></div>
      <article className="mt-6 overflow-hidden rounded-[26px] bg-[#0B1F3A] p-5 text-white sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <AccountAvatar imageUrl={account.avatarUrl} initials={initials} label={fullName} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-[var(--tgpi-font-display)] text-3xl font-semibold">{fullName}</h3>
              <span className="rounded-full border border-[#E5BF5A]/30 bg-[#E5BF5A]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#F0D58C]">{account.membership}</span>
            </div>
            <p className="mt-1 text-sm text-[#C8D2DE]">{profile.headline || "Add a professional headline"}</p>
            <p className="mt-3 break-all text-xs text-[#9FAFC0]">{identity.username ? `@${identity.username}` : "Create your unique @ID in Personal information"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="min-h-11 rounded-xl bg-white px-5 text-xs font-extrabold text-[#0B1F3A] transition hover:bg-[#F4E7BE]" onClick={() => selectSection("identity")} type="button">Edit profile</button>
            <button className="min-h-11 rounded-xl border border-white/15 bg-white/5 px-5 text-xs font-extrabold text-white transition hover:bg-white/10" onClick={() => selectSection("public-profile")} type="button">View public profile</button>
          </div>
        </div>
        <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="flex items-center justify-between gap-4 text-xs font-bold"><span>Profile completeness</span><span className="text-[#F0D58C]">{completion}%</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#E5BF5A] transition-[width] duration-500" style={{ width: `${completion}%` }} /></div>
          </div>
          <p className="text-xs text-[#AEBBC9]">{account.emailVerified ? "Verified identity" : "Email verification required"}</p>
        </div>
      </article>

      <div className="mt-6">
        <p className="px-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#86621A]"><LocalizedText text="Account settings" /></p>
        <div className="tgpi-account-grid mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {settingsSections.slice(1).map((section) => (
            <button className="tgpi-account-tile group flex w-full items-center gap-4 rounded-[22px] border border-[#DDD7CB] px-4 py-5 text-left sm:px-5" key={section.key} onClick={() => selectSection(section.key)} type="button">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF1F4] text-[#0B1F3A] transition group-hover:bg-[#0B1F3A] group-hover:text-[#F0D58C]"><SettingsIcon section={section.key} /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-[#0B1F3A]"><LocalizedText text={section.label} /></span><span className="mt-0.5 block truncate text-xs text-[#707987]">{sectionSummaries[section.key as Exclude<SettingsSection, "overview">]}</span></span>
              <span aria-hidden="true" className="text-xl text-[#A0A7B0] transition group-hover:translate-x-0.5 group-hover:text-[#956A13]">›</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <article className="rounded-[24px] border border-[#DDD7CB] bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#86621A]"><LocalizedText text="Personal plan" /></p><h3 className="mt-2 text-lg font-extrabold text-[#0B1F3A]">{decisionContext.completed ? "Decision context connected" : "Complete your decision context"}</h3></div>
            <span className="rounded-full bg-[#EDF0F3] px-3 py-1.5 text-xs font-extrabold text-[#0B1F3A]">{decisionContext.progress}%</span>
          </div>
          <div className="mt-5 space-y-3 text-xs">
            <div className="flex justify-between gap-4"><span className="text-[#737C89]"><LocalizedText text="Primary goal" /></span><span className="text-right font-extrabold text-[#0B1F3A]">{goalLabels[decisionContext.goal] || "Not defined"}</span></div>
            <div className="flex justify-between gap-4"><span className="text-[#737C89]">Shortlist</span><span className="max-w-[65%] text-right font-extrabold text-[#0B1F3A]">{decisionContext.countries.map((country) => `${country.emoji} ${country.name}`).join(", ") || "No countries selected"}</span></div>
          </div>
          <Link className="mt-5 inline-flex text-xs font-extrabold text-[#8C6414]" href="/onboarding">Open personal plan →</Link>
        </article>
        <button className="group flex rounded-[24px] border border-[#B9CEE0] bg-[#EDF5FA] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#6B91B1] sm:p-6" onClick={() => selectSection("progress")} type="button">
          <GlobalRankBadge rank={rank} size="medium" />
          <span className="ml-4 min-w-0"><span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#325E83]">Global rank</span><span className="mt-2 block font-[var(--tgpi-font-display)] text-2xl font-semibold text-[#0B1F3A]">{rank.name}</span><span className="mt-2 block text-xs leading-5 text-[#52677A]">{rank.points} points · {rank.nextRank ? `${rank.pointsToNext} to ${rank.nextRank.name}` : "highest rank reached"}</span><span className="mt-3 block text-xs font-extrabold text-[#234D70]">Open rank journey <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span></span></span>
        </button>
        <Link className="group rounded-[24px] border border-[#DDD7CB] bg-[#F4E7BE] p-5 transition hover:-translate-y-0.5 hover:border-[#B58A2A] sm:p-6" href="/global-key">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#73520F]">TGPI Global ID</p>
          <p className="mt-3 break-all font-[var(--tgpi-font-display)] text-xl font-semibold text-[#0B1F3A]">{account.globalId}</p>
          <p className="mt-3 text-xs leading-5 text-[#665A38]">Your stable reference across TGPI. It is never a password, recovery code or travel document.</p>
          <span className="mt-4 inline-flex text-xs font-extrabold text-[#76520C]">Open Integrity Chain <span aria-hidden="true" className="ml-1 transition group-hover:translate-x-0.5">→</span></span>
        </Link>
      </div>

      <div className="mt-6">
        <p className="px-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#86621A]">Connected experience</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {connectedSystems.map((system) => (
            <Link className="group rounded-[20px] border border-[#DDD7CB] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#B58A2A] hover:shadow-[0_14px_30px_rgba(11,31,58,0.08)]" href={system.href} key={system.label}>
              <div className="flex items-center justify-between gap-3"><span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEF2F5] text-base text-[#0B1F3A]">{system.icon}</span><span aria-hidden="true" className="text-[#956A13] transition group-hover:translate-x-0.5">→</span></div><h3 className="mt-3 text-sm font-extrabold text-[#0B1F3A]">{system.label}</h3>
              <p className="mt-2 text-xs leading-5 text-[#697386]">{system.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  let activeScreen: React.ReactNode = overviewScreen;

  if (activeSection === "global-key") {
    activeScreen = (
      <div>
        <ScreenHeading description="Manage the cryptographic identity, encrypted proof, Base Mainnet anchor and linked integrity history behind your stable TGPI Global ID." section="global-key" title="Global Key" />
        <article className="tgpi-key-surface relative mt-6 overflow-hidden rounded-[28px] border border-[#173754] p-6 text-white shadow-[0_24px_65px_rgba(11,31,58,0.2)] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span aria-hidden="true" className="tgpi-key-emblem grid h-16 w-16 shrink-0 place-items-center rounded-[22px] border border-[#E5B94B]/35 bg-[#E5B94B]/10 text-[#F0D58C]"><SettingsIcon section="global-key" /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C]">TGPI Integrity Chain V2</p><span className="rounded-full border border-[#72C79D]/30 bg-[#72C79D]/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#AFE3C7]">Verification details in command center</span></div>
              <p className="mt-3 break-all font-mono text-lg font-bold tracking-[0.06em] text-white sm:text-2xl">{account.globalId}</p>
              <p className="mt-3 max-w-2xl text-xs leading-6 text-[#AEBBC9]">Your existing Global ID remains stable. The Integrity Chain adds signed blocks, an encrypted verification proof, safe rotation and an external Merkle receipt without changing login credentials.</p>
            </div>
          </div>
          <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            {["Stable ID across your TGPI account", "Review actual proof and anchoring status", "Keep personal information off-chain"].map((item) => <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-[#D7E0E8]" key={item}>✓ {item}</p>)}
          </div>
          <Link className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#E5B94B] px-5 text-xs font-extrabold text-[#07182D] transition hover:bg-[#F0C95F]" href="/global-key">Open Global Key Command Center →</Link>
        </article>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { title: "Account connection", value: account.emailVerified ? "Email verified" : "Verify your email", detail: "Email verification confirms access to the address; it is not legal identity verification.", section: "security" as const },
            { title: "Certificate identity", value: profile.legalFullName ? "Real name provided" : "Add your complete name", detail: "Review the name used for newly issued learning credentials.", section: "identity" as const },
            { title: "Privacy controls", value: profile.privacy.visibility === "private" ? "Private profile" : "Review profile sharing", detail: "Choose which profile details other people can see.", section: "privacy" as const },
          ].map(card => <button className="tgpi-account-tile rounded-2xl border border-[#D8D2C4] bg-white p-5 text-left" key={card.title} onClick={() => selectSection(card.section)} type="button"><span className="text-xs font-bold uppercase tracking-wider text-[#705115]">{card.title}</span><span className="mt-2 block text-base font-extrabold text-[#0B1F3A]">{card.value} →</span><span className="mt-2 block text-sm leading-6 text-[#526174]">{card.detail}</span></button>)}
        </div>
        <div className="tgpi-account-grid mt-6 grid gap-4 sm:grid-cols-2">
          <article className="tgpi-account-tile rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-6"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#86621A]">Authentication boundary</p><h3 className="mt-2 text-lg font-extrabold text-[#0B1F3A]">Clerk remains the security authority.</h3><p className="mt-3 text-xs leading-6 text-[#667085]">Passwords, MFA, passkeys, recovery and active sessions never enter the TGPI cryptographic proof.</p><button className="mt-4 text-xs font-extrabold text-[#76520C]" onClick={() => selectSection("security")} type="button">Open login security →</button></article>
          <article className="rounded-[22px] border border-[#D7C68F] bg-[#FBF4DE] p-5 sm:p-6"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#73520F]">Transparent technology</p><h3 className="mt-2 text-lg font-extrabold text-[#0B1F3A]">Publicly anchored, never tokenized.</h3><p className="mt-3 text-xs leading-6 text-[#665A38]">When anchoring is configured and confirmed, a privacy-safe Merkle root can be checked on Base Mainnet. The Global Key is not a cryptocurrency, wallet, NFT or government credential.</p></article>
        </div>
      </div>
    );
  }

  if (activeSection === "identity") {
    activeScreen = (
      <div>
        <ScreenHeading description="Keep your TGPI identity useful, current and safe without storing sensitive documents." section="identity" title="Personal information" />
        <div className="mt-6">
          <TgpiAvatarEditor
            displayName={fullName}
            initialImageUrl={account.avatarUrl}
            initials={initials}
          />
        </div>
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name"><input autoComplete="given-name" className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ firstName: event.target.value })} required value={identity.firstName} /></Field>
            <Field label="Last name"><input autoComplete="family-name" className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ lastName: event.target.value })} value={identity.lastName} /></Field>
            <div className="sm:col-span-2"><Field label="Complete real name" description="Enter all given names and surnames exactly as you want them on new certificates. This is self-declared, not document-verified."><input autoComplete="name" className="tgpi-account-input" maxLength={120} onChange={event => updateProfile({ legalFullName: event.target.value })} placeholder={fullName} value={profile.legalFullName} /></Field></div>
            <Field label="Date of birth" description="Private. Only added to your downloaded PDF if you enable the option below."><input type="date" className="tgpi-account-input" autoComplete="bday" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} onChange={event => updateProfile({ dateOfBirth: event.target.value })} value={profile.dateOfBirth} /></Field>
            <Field label="Gender" description="Choose how you identify. This does not determine country or career recommendations."><select className="tgpi-account-input" value={profile.gender} onChange={event => updateProfile({ gender: event.target.value as TgpiAccountProfile["gender"] })}><option value=""><LocalizedText text="Select an option" /></option><option value="man">Man</option><option value="woman">Woman</option><option value="other"><LocalizedText text="Other" /></option><option value="undisclosed">Prefer not to say</option></select></Field>
            <Field label="How should TGPI address you?" description="Independent of gender; choose what feels right."><select className="tgpi-account-input" value={profile.preferredTitle} onChange={event => updateProfile({ preferredTitle: event.target.value as TgpiAccountProfile["preferredTitle"] })}><option value="name">By my name</option><option value="mr">Mr.</option><option value="ms">Ms.</option><option value="mx">Mx.</option></select></Field>
            <div className="rounded-2xl border border-[#D8D2C4] bg-[#F8F5EE] p-4"><p className="text-xs font-bold text-[#526174]">Personal greeting preview</p><p className="mt-2 text-xl font-semibold text-[#0B1F3A]">{getAccountSalutation(identity, profile)}</p></div>
            <div className="sm:col-span-2"><Field label="Display name" description="Your public presentation; certificate names remain separate."><input className="tgpi-account-input" autoComplete="nickname" maxLength={120} value={profile.displayName} onChange={e => updateProfile({ displayName: e.target.value })} /></Field></div>
            <div className="sm:col-span-2"><Field description="A concise line used in future profile and collaboration surfaces." label="Professional headline"><input className="tgpi-account-input" maxLength={120} onChange={(event) => updateProfile({ headline: event.target.value })} placeholder="Product designer building a global career" value={profile.headline} /></Field></div>
            <div className="sm:col-span-2"><Field description={`${profile.bio.length}/500 characters`} label="About you"><textarea className="tgpi-account-input min-h-32 resize-y py-3" maxLength={500} onChange={(event) => updateProfile({ bio: event.target.value })} placeholder="Share the context that helps TGPI understand your goals and experience." value={profile.bio} /></Field></div>
            <Field label="Country of residence"><ProfileSearchSelect label="Country of residence" value={profile.currentCountry} options={countries.map(country => ({ label: `${country.emoji} ${country.name}`, value: country.slug }))} onChange={value => updateProfile({ currentCountry: value, currentCity: "" })} /></Field>
            <Field label="City of residence" description="Search major-city suggestions or enter and select your city if it is not listed."><ProfileSearchSelect key={profile.currentCountry} label="City of residence" value={profile.currentCity} options={(citySuggestions[profile.currentCountry] ?? []).map(city => ({ label: city, value: city }))} allowCustom onChange={value => updateProfile({ currentCity: value })} /></Field>
            <Field label="Nationality / country of citizenship" description="Your citizenship can differ from where you live. It helps frame document and immigration research."><ProfileSearchSelect label="Nationality" value={profile.nationality} options={countries.map(country => ({ label: country.name, value: country.name }))} onChange={value => updateProfile({ nationality: value })} /></Field>
            <Field label="Profession" description="Used as context for career research, qualification recognition and your personal plan."><ProfileSearchSelect label="Profession" value={profile.profession} options={professionSuggestions.map(profession => ({ label: profession, value: profession }))} allowCustom onChange={value => updateProfile({ profession: value })} /></Field>
            <Field label="Professional experience"><select className="tgpi-account-input" value={profile.yearsExperience} onChange={event => updateProfile({ yearsExperience: event.target.value })}><option value="">Select your experience</option><option value="0">Getting started</option><option value="1-2">1–2 years</option><option value="3-5">3–5 years</option><option value="6-10">6–10 years</option><option value="11+">11+ years</option></select></Field>
            <Field label="Current professional situation"><select className="tgpi-account-input" value={profile.employmentType} onChange={event => updateProfile({ employmentType: event.target.value })}><option value=""><LocalizedText text="Select an option" /></option><option value="employed">Employed</option><option value="self-employed">Self-employed</option><option value="entrepreneur">Entrepreneur</option><option value="student">Student</option><option value="seeking-work">Seeking work</option><option value="retired">Retired</option></select></Field>
            <Field label="Timezone"><input className="tgpi-account-input" list="tgpi-timezones" maxLength={80} onChange={(event) => updateProfile({ timezone: event.target.value })} placeholder="America/Sao_Paulo" value={profile.timezone} /><datalist id="tgpi-timezones">{timezoneOptions.map((timezone) => <option key={timezone} value={timezone} />)}</datalist></Field>
          </div>
        </div>
        <MemberIdentityEditor />
        <article className="tgpi-account-tile mt-6 rounded-[22px] border border-[#D7C68F] bg-[#FBF4DE] p-5 sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#705115]">Certificate identity preview</p>
          <h3 className="mt-3 break-words text-2xl text-[#0B1F3A]">{getCertificateName(identity, profile)}</h3>
          <p className="mt-2 break-all text-sm font-bold text-[#526174]">{account.globalId}</p>
          <p className="mt-3 text-sm leading-6 text-[#62583E]">New certificates use your saved real name. Existing signed credentials preserve their original issued name. Your birth date and gender do not appear on your public profile or verification page.</p>
          <Toggle checked={profile.certificateBirthDateConsent} label="Include birth date in my downloaded certificate PDF" description="Optional personal detail, provided by you. Anyone you send that PDF to will see it. Public verification does not include it." onChange={value => updateProfile({ certificateBirthDateConsent: value })} />
          <Link className="mt-4 inline-flex font-bold text-[#705115]" href="/certificates">Open my certificates →</Link>
        </article>
      </div>
    );
  }

  if (activeSection === "global") {
    activeScreen = (
      <div>
        <ScreenHeading description="This context synchronizes with Country Fit, Compare, your personal plan and learning paths." section="global" title="Global profile" />
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Profession or field"><ProfileSearchSelect label="Profession or field" value={profile.profession} options={professionSuggestions.map(profession => ({ label: profession, value: profession }))} allowCustom onChange={value => updateProfile({ profession: value })} /></Field>
            <Field label="Education level"><select className="tgpi-account-input" onChange={(event) => updateProfile({ educationLevel: event.target.value })} value={profile.educationLevel}><option value="">Select your level</option><option value="Secondary education"><LocalizedText text="Secondary education" /></option><option value="Technical or vocational">Technical or vocational</option><option value="Undergraduate">Undergraduate</option><option value="Bachelor's degree">Bachelor&apos;s degree</option><option value="Master's degree">Master&apos;s degree</option><option value="Doctorate">Doctorate</option><option value="Other"><LocalizedText text="Other" /></option></select></Field>
            <div className="sm:col-span-2"><p className="text-sm font-extrabold text-[#0B1F3A]"><LocalizedText text="Languages" /></p><p className="mt-1 text-xs leading-5 text-[#6B7280]">Choose up to eight. The same list updates your personal plan.</p><div className="mt-3 flex flex-wrap gap-2">{languageOptions.map((language) => { const selected = profile.languages.includes(language); return <button aria-pressed={selected} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${selected ? "border-[#0B1F3A] bg-[#0B1F3A] text-white" : "border-[#D8D2C4] bg-white text-[#566173] hover:border-[#B58A2A]"}`} key={language} onClick={() => toggleLanguage(language)} type="button">{selected ? "✓ " : ""}{language}</button>; })}</div></div>
          </div>
          <div className="mt-7 rounded-2xl border border-[#D9C78D] bg-[#FBF4DE] p-5"><p className="text-sm font-extrabold text-[#0B1F3A]">One canonical personal plan</p><p className="mt-1 text-xs leading-5 text-[#6F6241]">Goals, shortlist, budget, timeline and priorities remain in the plan editor to prevent conflicting recommendations.</p><Link className="mt-4 inline-flex text-xs font-extrabold text-[#76520C]" href="/onboarding">Edit personal plan →</Link></div>
          {decisionContext.countries.length ? <div className="mt-5 rounded-2xl border border-[#D9E0E7] bg-[#F4F8FB] p-5"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#48677F]">Countries synchronized with your plan</p><div className="mt-3 flex flex-wrap gap-2">{decisionContext.countries.map((country) => <Link className="rounded-full border border-[#C9D8E4] bg-white px-3 py-2 text-xs font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]" href={`/countries/${country.slug}`} key={country.slug}>{country.emoji} <LocalizedText text={country.name} /></Link>)}</div></div> : null}
        </div>
      </div>
    );
  }

  if (activeSection === "progress") {
    activeScreen = <GlobalProgressPanel rank={rank} headingLevel={2} />;
  }

  if (activeSection === "public-profile") {
    activeScreen = (
      <div>
        <ScreenHeading description="Preview the saved public fields, manage your member identity and export an authorized presentation." section="public-profile" title="Public profile" />
        <MemberIdentityEditor />
        <MemberExportCenter />
        <details className="mt-4"><summary className="cursor-pointer py-3 font-bold">Find a TGPI member</summary><MemberDirectory /></details>
        <Link className="tgpi-member-button mt-4" href={`${account.publicProfileUrl}?preview=1`}>Open exact saved public preview →</Link>
        <p className="mt-3 text-sm text-slate-600">Save profile and privacy changes before previewing or exporting. Public fields are read again on the server.</p>
        <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <article className="relative overflow-hidden rounded-[28px] border border-[#173754] bg-[#07182D] p-6 text-white shadow-[0_24px_65px_rgba(11,31,58,0.2)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#B58A2A]/15 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <AccountAvatar imageUrl={account.avatarUrl} initials={initials} label={fullName} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3"><div className="min-w-0 flex-1"><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#F0D58C]">TGPI Global Profile</p><h3 className="mt-2 break-words font-[var(--tgpi-font-display)] text-3xl font-semibold">{fullName}</h3></div>{profile.privacy.showProgress ? <GlobalRankBadge rank={rank} size="small" /> : null}</div>
                <p className="mt-1 text-sm font-bold text-[#CFD8E3]">{profile.headline || "Add a professional headline"}</p>
                {profile.privacy.showLocation && (profile.currentCity || currentCountryName) ? <p className="mt-2 text-xs text-[#8FA0B3]">{currentCountryName}</p> : null}
              </div>
            </div>
            <p className="relative mt-6 max-w-2xl text-sm leading-7 text-[#AEBBC9]">{profile.bio || "Add a concise biography so people understand your experience, interests and global direction."}</p>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {profile.privacy.showCareer && profile.profession ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-extrabold text-[#D8E1EB]">{profile.profession}</span> : null}
              {profile.privacy.showCareer && profile.educationLevel ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-extrabold text-[#D8E1EB]">{profile.educationLevel}</span> : null}
              {(profile.privacy.showLanguages ? profile.languages : []).slice(0, 4).map((language) => <span className="rounded-full border border-[#E5B94B]/20 bg-[#E5B94B]/10 px-3 py-2 text-[10px] font-extrabold text-[#F0D58C]" key={language}>{language}</span>)}
            </div>
            <div className="relative mt-7 flex flex-wrap items-start gap-3 border-t border-white/10 pt-6">
              <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-xs font-extrabold text-white transition hover:bg-white/10" href={account.publicProfileUrl}>Open full profile</Link>
              {profile.privacy.visibility !== "private" ? <PublicProfileShareButton title={`${fullName} — TGPI Global Profile`} url={account.publicProfileUrl} /> : null}
            </div>
          </article>

          <div className="grid content-start gap-4">
            <article className={`rounded-[24px] border p-5 ${profile.privacy.visibility === "private" ? "border-[#E0CDA0] bg-[#FBF4DE]" : "border-[#B9DDCA] bg-[#ECF7F1]"}`}>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#73520F]">Sharing status</p>
              <h3 className="mt-2 text-lg font-extrabold text-[#0B1F3A]">{profile.privacy.visibility === "public" ? "Anyone with the link" : profile.privacy.visibility === "members" ? "Signed-in TGPI members" : "Visible only to you"}</h3>
              <p className="mt-2 text-xs leading-5 text-[#686556]">Your email, login methods, billing details and private activities never appear on this profile.</p>
              <button className="mt-4 text-xs font-extrabold text-[#76520C] underline decoration-[#B58A2A]/40 underline-offset-4" onClick={() => selectSection("privacy")} type="button">Change privacy controls →</button>
            </article>
            <article className="rounded-[24px] border border-[#DDD7CB] bg-white p-5">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7A8390]">Shared fields</p>
              <ul className="mt-4 grid gap-3 text-xs font-bold text-[#0B1F3A]">
                <li className="flex items-center justify-between gap-4"><span>Name, image, headline and biography</span><span className="text-[#277352]">Included</span></li>
                <li className="flex items-center justify-between gap-4"><span>Location</span><span>{profile.privacy.showLocation ? "Included" : "Hidden"}</span></li>
                <li className="flex items-center justify-between gap-4"><span>Global goals</span><span>{profile.privacy.showGoals ? "Included" : "Hidden"}</span></li>
                <li className="flex items-center justify-between gap-4"><span>Profile progress</span><span>{profile.privacy.showProgress ? "Included" : "Hidden"}</span></li>
              </ul>
            </article>
            {isDirty ? <p className="rounded-2xl border border-[#E0CDA0] bg-[#FFF9E9] px-4 py-3 text-xs font-bold leading-5 text-[#76520C]">Save your pending changes before opening the full public profile so the preview and shared page stay synchronized.</p> : null}
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "preferences") {
    activeScreen = (
      <div>
        <ScreenHeading description="Save your research and display preferences. Content languages and unit conversion depend on the current feature." section="preferences" title="App preferences" />
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <LanguageSelector />
            <Field label="Preferred currency"><select className="tgpi-account-input" onChange={(event) => updateProfile({ preferredCurrency: event.target.value })} value={profile.preferredCurrency}>{currencyOptions.map((currency) => <option key={currency} value={currency}>{currency}</option>)}</select></Field>
            <Field label="Measurement system"><select className="tgpi-account-input" onChange={(event) => updateProfile({ measurementSystem: event.target.value === "imperial" ? "imperial" : "metric" })} value={profile.measurementSystem}><option value="metric">Metric — km, kg, °C</option><option value="imperial">Imperial — mi, lb, °F</option></select></Field>
            <div className="hidden sm:block" />
            <Field label="Website"><input className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ website: event.target.value })} placeholder="https://yourwebsite.com" value={profile.website} /></Field>
            <Field label="LinkedIn"><input className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ linkedin: event.target.value })} placeholder="linkedin.com/in/username" value={profile.linkedin} /></Field>
            <Field label="Instagram"><input className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ instagram: event.target.value })} placeholder="instagram.com/username" value={profile.instagram} /></Field>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "notifications") {
    activeScreen = (
      <div>
        <ScreenHeading description="Control which updates may reach you as your global plan and the TGPI system evolve." section="notifications" title="Notifications" />
        <div className="mt-6 overflow-hidden rounded-[22px] border border-[#DDD7CB] bg-white">
          <Toggle checked={profile.notifications.planReminders} description="Prompts connected to your active personal plan and timeline." label="Plan reminders" onChange={(value) => updateNotifications("planReminders", value)} />
          <Toggle checked={profile.notifications.researchAlerts} description="Updates when evidence linked to your selected countries changes." label="Research alerts" onChange={(value) => updateNotifications("researchAlerts", value)} />
          <Toggle checked={profile.notifications.learningUpdates} description="Relevant course and capability-path updates." label="Learning updates" onChange={(value) => updateNotifications("learningUpdates", value)} />
          <Toggle checked={profile.notifications.productNews} description="Selected TGPI product, platform and release news." label="Product news" onChange={(value) => updateNotifications("productNews", value)} />
        </div>
        <p className="mt-4 px-1 text-xs leading-5 text-[#697386]">Preferences are stored with your Global Key. Delivery channels activate only when the corresponding workflow is available.</p>
      </div>
    );
  }

  if (activeSection === "privacy") {
    activeScreen = (
      <div>
        <ScreenHeading description="Choose which saved fields can appear in your member profile, discovery and shareable presentations." section="privacy" title="Privacy" />
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <Field description="Private is the safest default. You can change this whenever you choose." label="Profile visibility"><select className="tgpi-account-input" onChange={(event) => updatePrivacy("visibility", event.target.value as TgpiAccountProfile["privacy"]["visibility"])} value={profile.privacy.visibility}><option value="private">Private — only you</option><option value="members">Members — signed-in TGPI members</option><option value="public">Public — shareable profile</option></select></Field>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E3DED3]"><Toggle checked={profile.privacy.showLocation} description="Share country only. Your city remains private." label="Show location" onChange={(value) => updatePrivacy("showLocation", value)} /><Toggle checked={profile.privacy.showProgress} description="Show learning and preparation progress on your profile." label="Show progress" onChange={(value) => updatePrivacy("showProgress", value)} /><Toggle checked={profile.privacy.showGoals} description="Show selected international goals on your profile." label="Show global goals" onChange={(value) => updatePrivacy("showGoals", value)} /></div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#E3DED3]">
            <Toggle checked={profile.privacy.discoverable} label="Member discovery" description="Allow exact @ID and TGPI number searches by signed-in members. Your profile visibility still applies." onChange={v => updatePrivacy('discoverable', v)} />
            <Toggle checked={profile.privacy.allowIndexing} label="Search engine indexing" description="Separate opt-in, effective only when your profile is Public. Search engines may take time to remove old copies." onChange={v => updatePrivacy('allowIndexing', v)} />
            <Toggle checked={profile.privacy.showCareer} label="Share professional context" description="Profession and education, clearly marked as self-declared." onChange={v => updatePrivacy('showCareer', v)} />
            <Toggle checked={profile.privacy.showLanguages} label="Share declared languages" description="Listing a language does not verify proficiency." onChange={v => updatePrivacy('showLanguages', v)} />
            <Toggle checked={profile.privacy.showLinks} label="Share professional links" description="Publish your selected website and social links." onChange={v => updatePrivacy('showLinks', v)} />
          </div>
          <a className="tgpi-member-button mt-4" href="/api/account-data" download="tgpi-account-data.json">Download private profile & plan data</a>
          <div className="mt-6 rounded-2xl bg-[#F3EFE6] p-5 text-xs leading-6 text-[#5F6876]">TGPI never stores passwords, recovery methods, passport numbers, national IDs or document scans in this profile. Authentication remains protected by Clerk.</div>
        </div>
      </div>
    );
  }

  if (activeSection === "billing") { activeScreen = <AccountBillingPanel />; }

  if (activeSection === "security") {
    activeScreen = (
      <div>
        <ScreenHeading description="Manage verified emails, passwords, passkeys, login methods and active devices through Clerk protection." section="security" title="Login & security" />
        <div className="mt-6 overflow-hidden rounded-[22px] border border-[#DDD7CB] bg-white p-2 sm:p-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="tgpi-settings-v2 mx-auto max-w-[1500px]">
      <header className="tgpi-account-heading mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#8B6416]">TGPI Global Key</p><h1 className="mt-2 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.045em] text-[#0B1F3A] sm:text-5xl">Settings</h1><p className="mt-2 text-sm text-[#6E7784]">Your identity, preferences and security in one connected app.</p></div>
        <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#D6D0C4] bg-white px-4 text-xs font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]" href="/profile">Back to workspace</Link>
      </header>

      <div className="overflow-clip rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_28px_80px_rgba(11,31,58,0.1)] lg:grid lg:grid-cols-[270px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#E1DCD2] bg-[#FCFAF5] p-4 lg:flex lg:flex-col">
          <button className="flex items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-white" onClick={() => selectSection("overview")} type="button"><AccountAvatar imageUrl={account.avatarUrl} initials={initials} label={fullName} size="small" /><span className="min-w-0"><span className="block truncate text-sm font-extrabold text-[#0B1F3A]">{fullName}</span><span className="mt-0.5 block truncate text-[11px] text-[#727B88]">{account.membership}</span></span></button>
          <label className="relative mt-3 block"><span className="sr-only"><LocalizedText text="Search settings" /></span><svg aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A8390]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg><input className="h-11 w-full rounded-xl border border-[#DDD7CB] bg-white pl-9 pr-3 text-xs text-[#0B1F3A] outline-none transition placeholder:text-[#959CA6] focus:border-[#B58A2A] focus:ring-4 focus:ring-[#B58A2A]/10" onChange={(event) => setQuery(event.target.value)} placeholder={t("Search settings")} value={query} /></label>
          <nav aria-label={t("Account settings")} className="mt-4 space-y-4">
            {settingsGroups.map((group) => { const groupSections = filteredSections.filter((section) => section.group === group); if (!groupSections.length) return null; return <div key={group}><p className="px-3 pb-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#9299A2]">{t(group)}</p><div className="space-y-1">{groupSections.map((section) => { const active = section.key === activeSection; return <button aria-current={active ? "page" : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${active ? "bg-[#0B1F3A] text-white shadow-[0_10px_24px_rgba(11,31,58,0.16)]" : "text-[#4F5B6A] hover:bg-white hover:text-[#0B1F3A]"}`} key={section.key} onClick={() => selectSection(section.key)} type="button"><span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm ${active ? "bg-white/10 text-[#F0D58C]" : "bg-[#EEF1F4] text-[#0B1F3A]"}`}><SettingsIcon section={section.key} /></span><span className="text-xs font-extrabold"><LocalizedText text={section.label} /></span></button>; })}</div></div>; })}
          </nav>
          {filteredSections.length === 0 ? <p className="px-3 py-5 text-xs leading-5 text-[#717A87]">No setting matches this search.</p> : null}
          <div className="mt-auto rounded-2xl border border-[#E0D8C5] bg-[#F4E7BE] p-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#75530E]">Synchronization</p><p className="mt-2 text-xs font-extrabold text-[#0B1F3A]">{isDirty ? "Changes waiting to be saved" : "Your account is up to date"}</p><p className="mt-1 text-[11px] leading-5 text-[#685B38]">Last update: {t(formatSavedDate(profile.updatedAt, locale))}</p></div>
        </aside>

        <div className="min-w-0 bg-[#F8F5EE]">
          <div className="tgpi-account-mobile-nav sticky top-0 z-30 border-b border-[#DDD7CB] bg-[#FFFDFA]/95 p-3 backdrop-blur lg:hidden">
            <div className="flex items-center gap-3"><AccountAvatar imageUrl={account.avatarUrl} initials={initials} label={fullName} size="small" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold text-[#0B1F3A]"><LocalizedText text={activeDefinition.label} /></p><p className="truncate text-[11px] text-[#737C89]"><LocalizedText text={activeDefinition.description} /></p></div>{isDirty ? <span className="h-2.5 w-2.5 rounded-full bg-[#B58A2A]" title="Unsaved changes" /> : null}</div>
            <nav aria-label={t("Account settings")} className="tgpi-smart-rail tgpi-account-tabs -mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1">
              {settingsSections.map((section) => { const active = section.key === activeSection; return <button aria-current={active ? "page" : undefined} className={`tgpi-account-tab flex min-w-max items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-extrabold transition ${active ? "border-[#0B1F3A] bg-[#0B1F3A] text-white" : "border-[#DDD7CB] bg-white text-[#596473]"}`} key={section.key} onClick={() => selectSection(section.key)} type="button"><span aria-hidden="true"><SettingsIcon section={section.key} /></span><LocalizedText text={section.label} /></button>; })}
            </nav>
          </div>

          <div className="tgpi-account-content scroll-mt-36 p-4 sm:p-6 lg:p-7 xl:p-8" id={`settings-${activeSection}`} ref={contentRef}><fieldset className="min-w-0" disabled={saveState === "saving"}>{activeScreen}</fieldset></div>

          <div className="tgpi-account-save-bar relative border-t border-[#DDD7CB] bg-white/95 px-4 py-3 backdrop-blur sm:px-7 lg:px-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" role="status"><p className={`text-xs font-extrabold ${saveState === "error" ? "text-[#A32626]" : isDirty ? "text-[#8B6416]" : "text-[#277352]"}`}>{saveState === "saving" ? "Synchronizing your account…" : message || (isDirty ? "You have unsaved changes" : "All changes are synchronized")}</p><p className="mt-0.5 text-[10px] text-[#7A8390]">Connected to Country Fit, Compare, Personal Plan and Learning</p></div>
              <button className="min-h-11 rounded-xl bg-[#0B1F3A] px-6 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(11,31,58,0.18)] transition hover:bg-[#173554] disabled:cursor-not-allowed disabled:opacity-50" disabled={!isDirty || saveState === "saving"} onClick={saveAccount} type="button">{saveState === "saving" ? "Saving…" : "Save changes"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
