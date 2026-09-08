"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getAccountProfileCompletion,
  type AccountIdentityInput,
  type TgpiAccountProfile,
  type TgpiAccountUpdate,
} from "@/lib/account-profile";

type CountryOption = { name: string; slug: string };
type DecisionContext = {
  completed: boolean;
  countries: string[];
  goal: string;
  progress: number;
};
type AccountSummary = {
  email: string;
  emailVerified: boolean;
  globalId: string;
  membership: string;
};
type TgpiAccountCenterProps = {
  account: AccountSummary;
  children: React.ReactNode;
  countries: CountryOption[];
  decisionContext: DecisionContext;
  initialIdentity: AccountIdentityInput;
  initialProfile: TgpiAccountProfile;
};
type SaveState = "idle" | "saving" | "saved" | "error";
type SettingsSection =
  | "overview"
  | "identity"
  | "global"
  | "preferences"
  | "notifications"
  | "privacy"
  | "security";
type SettingsSectionDefinition = {
  description: string;
  key: SettingsSection;
  keywords: string;
  label: string;
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
  },
  {
    description: "Name, biography and location",
    key: "identity",
    keywords: "name bio city country nationality profile",
    label: "Personal information",
  },
  {
    description: "Profession, education and languages",
    key: "global",
    keywords: "career education profession language country fit plan",
    label: "Global profile",
  },
  {
    description: "Language, currency and public links",
    key: "preferences",
    keywords: "currency units website linkedin instagram preferences",
    label: "App preferences",
  },
  {
    description: "Research, plan and product updates",
    key: "notifications",
    keywords: "alerts email reminders research learning news",
    label: "Notifications",
  },
  {
    description: "Visibility and profile controls",
    key: "privacy",
    keywords: "private public visibility location goals progress",
    label: "Privacy",
  },
  {
    description: "Password, devices and login methods",
    key: "security",
    keywords: "password passkey devices email login authentication clerk",
    label: "Login & security",
  },
] as const;

const connectedSystems = [
  { href: "/country-fit", label: "Country Fit", text: "Match destinations to your real priorities." },
  { href: "/compare", label: "Compare", text: "Compare your shortlist through one decision lens." },
  { href: "/onboarding", label: "Personal plan", text: "Turn context into your next practical actions." },
  { href: "/documents", label: "Documents", text: "Connect evidence and preparation requirements." },
  { href: "/courses", label: "Learning", text: "Build capabilities linked to your global objective." },
] as const;

const goalLabels: Record<string, string> = {
  learn: "Expand global knowledge",
  live: "Live in another country",
  study: "Study abroad",
  travel: "Travel smarter",
  work: "Work globally",
};

const iconPaths: Record<SettingsSection, string> = {
  overview: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  identity: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21a7.5 7.5 0 0 1 15 0",
  global: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 9h17M3.5 15h17M12 3c4.8 5.1 4.8 12.9 0 18M12 3c-4.8 5.1-4.8 12.9 0 18",
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

function Field({
  children,
  description,
  label,
}: {
  children: React.ReactNode;
  description?: string;
  label: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold text-[#0B1F3A]">{label}</span>
      {description ? <span className="mt-1 block text-xs leading-5 text-[#6B7280]">{description}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
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
        <span className="block text-sm font-extrabold text-[#0B1F3A]">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-[#697386]">{description}</span>
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
        <h2 className="font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[-0.035em] text-[#0B1F3A] sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">{description}</p>
      </div>
    </div>
  );
}

function formatSavedDate(value?: string) {
  if (!value) return "Not saved yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved recently";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(date);
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
}: TgpiAccountCenterProps) {
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
  const currentSnapshot = JSON.stringify({ identity, profile });
  const isDirty = currentSnapshot !== savedSnapshot.current;
  const completion = useMemo(() => getAccountProfileCompletion(identity, profile), [identity, profile]);
  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return settingsSections;
    return settingsSections.filter((section) =>
      `${section.label} ${section.description} ${section.keywords}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);
  const activeDefinition = settingsSections.find((section) => section.key === activeSection) ?? settingsSections[0];
  const initials = `${identity.firstName.at(0) ?? ""}${identity.lastName.at(0) ?? ""}`.toUpperCase() || "TG";
  const fullName = [identity.firstName, identity.lastName].filter(Boolean).join(" ") || "TGPI member";
  const sectionSummaries: Record<Exclude<SettingsSection, "overview">, string> = {
    global: profile.profession || (profile.languages.length ? `${profile.languages.length} languages` : "Add your global context"),
    identity: profile.currentCity || profile.currentCountry || "Add personal information",
    notifications: `${Object.values(profile.notifications).filter(Boolean).length} enabled`,
    preferences: `${profile.preferredLanguage} · ${profile.preferredCurrency}`,
    privacy: profile.privacy.visibility.charAt(0).toUpperCase() + profile.privacy.visibility.slice(1),
    security: "Password, devices and login methods",
  };

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, "");
    if (normalizedPath !== "/profile/security") {
      setActiveSection("security");
      return;
    }
    const hashSection = window.location.hash.replace("#settings-", "");
    if (isSettingsSection(hashSection)) setActiveSection(hashSection);
  }, [pathname]);

  function selectSection(section: SettingsSection) {
    setActiveSection(section);
    setQuery("");
    window.history.replaceState(null, "", `#settings-${section}`);
    window.requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
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
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Unable to save your account. Please try again.");
    }
  }

  const overviewScreen = (
    <div>
      <ScreenHeading description="See your identity, plan and connected TGPI systems in one place." section="overview" title="Account overview" />
      <article className="mt-6 overflow-hidden rounded-[26px] bg-[#0B1F3A] p-5 text-white sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#E5BF5A]/60 bg-[#163452] font-[var(--tgpi-font-display)] text-3xl font-semibold text-[#F0D58C]">{initials}</div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-[var(--tgpi-font-display)] text-3xl font-semibold">{fullName}</h3>
              <span className="rounded-full border border-[#E5BF5A]/30 bg-[#E5BF5A]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#F0D58C]">{account.membership}</span>
            </div>
            <p className="mt-1 text-sm text-[#C8D2DE]">{profile.headline || "Add a professional headline"}</p>
            <p className="mt-3 break-all text-xs text-[#9FAFC0]">{account.email}</p>
          </div>
          <button className="min-h-11 rounded-xl bg-white px-5 text-xs font-extrabold text-[#0B1F3A] transition hover:bg-[#F4E7BE]" onClick={() => selectSection("identity")} type="button">Edit profile</button>
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
        <p className="px-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#86621A]">Account settings</p>
        <div className="mt-3 overflow-hidden rounded-[22px] border border-[#DDD7CB] bg-white">
          {settingsSections.slice(1).map((section) => (
            <button className="group flex w-full items-center gap-4 border-b border-[#ECE7DE] px-4 py-4 text-left transition last:border-0 hover:bg-[#FBF8F1] sm:px-5" key={section.key} onClick={() => selectSection(section.key)} type="button">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF1F4] text-[#0B1F3A] transition group-hover:bg-[#0B1F3A] group-hover:text-[#F0D58C]"><SettingsIcon section={section.key} /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-[#0B1F3A]">{section.label}</span><span className="mt-0.5 block truncate text-xs text-[#707987]">{sectionSummaries[section.key as Exclude<SettingsSection, "overview">]}</span></span>
              <span aria-hidden="true" className="text-xl text-[#A0A7B0] transition group-hover:translate-x-0.5 group-hover:text-[#956A13]">›</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-[24px] border border-[#DDD7CB] bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#86621A]">Personal plan</p><h3 className="mt-2 text-lg font-extrabold text-[#0B1F3A]">{decisionContext.completed ? "Decision context connected" : "Complete your decision context"}</h3></div>
            <span className="rounded-full bg-[#EDF0F3] px-3 py-1.5 text-xs font-extrabold text-[#0B1F3A]">{decisionContext.progress}%</span>
          </div>
          <div className="mt-5 space-y-3 text-xs">
            <div className="flex justify-between gap-4"><span className="text-[#737C89]">Primary goal</span><span className="text-right font-extrabold text-[#0B1F3A]">{goalLabels[decisionContext.goal] || "Not defined"}</span></div>
            <div className="flex justify-between gap-4"><span className="text-[#737C89]">Shortlist</span><span className="max-w-[60%] text-right font-extrabold text-[#0B1F3A]">{decisionContext.countries.join(", ") || "No countries selected"}</span></div>
          </div>
          <Link className="mt-5 inline-flex text-xs font-extrabold text-[#8C6414]" href="/onboarding">Open personal plan →</Link>
        </article>
        <article className="rounded-[24px] border border-[#DDD7CB] bg-[#F4E7BE] p-5 sm:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#73520F]">TGPI Global ID</p>
          <p className="mt-3 break-all font-[var(--tgpi-font-display)] text-xl font-semibold text-[#0B1F3A]">{account.globalId}</p>
          <p className="mt-3 text-xs leading-5 text-[#665A38]">Your stable reference across TGPI. It is never a password, recovery code or travel document.</p>
        </article>
      </div>

      <div className="mt-6">
        <p className="px-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#86621A]">Connected experience</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {connectedSystems.map((system) => (
            <Link className="group rounded-[20px] border border-[#DDD7CB] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#B58A2A] hover:shadow-[0_14px_30px_rgba(11,31,58,0.08)]" href={system.href} key={system.label}>
              <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-extrabold text-[#0B1F3A]">{system.label}</h3><span aria-hidden="true" className="text-[#956A13] transition group-hover:translate-x-0.5">→</span></div>
              <p className="mt-2 text-xs leading-5 text-[#697386]">{system.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  let activeScreen: React.ReactNode = overviewScreen;

  if (activeSection === "identity") {
    activeScreen = (
      <div>
        <ScreenHeading description="Keep your TGPI identity useful, current and safe without storing sensitive documents." section="identity" title="Personal information" />
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name"><input className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ firstName: event.target.value })} required value={identity.firstName} /></Field>
            <Field label="Last name"><input className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ lastName: event.target.value })} value={identity.lastName} /></Field>
            <div className="sm:col-span-2"><Field description="A concise line used in future profile and collaboration surfaces." label="Professional headline"><input className="tgpi-account-input" maxLength={120} onChange={(event) => updateProfile({ headline: event.target.value })} placeholder="Product designer building a global career" value={profile.headline} /></Field></div>
            <div className="sm:col-span-2"><Field description={`${profile.bio.length}/500 characters`} label="About you"><textarea className="tgpi-account-input min-h-32 resize-y py-3" maxLength={500} onChange={(event) => updateProfile({ bio: event.target.value })} placeholder="Share the context that helps TGPI understand your goals and experience." value={profile.bio} /></Field></div>
            <Field label="Current country"><select className="tgpi-account-input" onChange={(event) => updateProfile({ currentCountry: event.target.value })} value={profile.currentCountry}><option value="">Select a country</option>{countries.map((country) => <option key={country.slug} value={country.slug}>{country.name}</option>)}</select></Field>
            <Field label="Current city"><input className="tgpi-account-input" maxLength={100} onChange={(event) => updateProfile({ currentCity: event.target.value })} placeholder="São Paulo" value={profile.currentCity} /></Field>
            <Field label="Nationality"><input className="tgpi-account-input" maxLength={80} onChange={(event) => updateProfile({ nationality: event.target.value })} placeholder="Brazilian" value={profile.nationality} /></Field>
            <Field label="Timezone"><input className="tgpi-account-input" list="tgpi-timezones" maxLength={80} onChange={(event) => updateProfile({ timezone: event.target.value })} placeholder="America/Sao_Paulo" value={profile.timezone} /><datalist id="tgpi-timezones">{timezoneOptions.map((timezone) => <option key={timezone} value={timezone} />)}</datalist></Field>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "global") {
    activeScreen = (
      <div>
        <ScreenHeading description="This context synchronizes with Country Fit, Compare, your personal plan and learning paths." section="global" title="Global profile" />
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Profession or field"><input className="tgpi-account-input" maxLength={100} onChange={(event) => updateProfile({ profession: event.target.value })} placeholder="Software engineering" value={profile.profession} /></Field>
            <Field label="Education level"><select className="tgpi-account-input" onChange={(event) => updateProfile({ educationLevel: event.target.value })} value={profile.educationLevel}><option value="">Select your level</option><option value="Secondary education">Secondary education</option><option value="Technical or vocational">Technical or vocational</option><option value="Undergraduate">Undergraduate</option><option value="Bachelor's degree">Bachelor&apos;s degree</option><option value="Master's degree">Master&apos;s degree</option><option value="Doctorate">Doctorate</option><option value="Other">Other</option></select></Field>
            <div className="sm:col-span-2"><p className="text-sm font-extrabold text-[#0B1F3A]">Languages</p><p className="mt-1 text-xs leading-5 text-[#6B7280]">Choose up to eight. The same list updates your personal plan.</p><div className="mt-3 flex flex-wrap gap-2">{languageOptions.map((language) => { const selected = profile.languages.includes(language); return <button aria-pressed={selected} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${selected ? "border-[#0B1F3A] bg-[#0B1F3A] text-white" : "border-[#D8D2C4] bg-white text-[#566173] hover:border-[#B58A2A]"}`} key={language} onClick={() => toggleLanguage(language)} type="button">{selected ? "✓ " : ""}{language}</button>; })}</div></div>
          </div>
          <div className="mt-7 rounded-2xl border border-[#D9C78D] bg-[#FBF4DE] p-5"><p className="text-sm font-extrabold text-[#0B1F3A]">One canonical personal plan</p><p className="mt-1 text-xs leading-5 text-[#6F6241]">Goals, shortlist, budget, timeline and priorities remain in the plan editor to prevent conflicting recommendations.</p><Link className="mt-4 inline-flex text-xs font-extrabold text-[#76520C]" href="/onboarding">Edit personal plan →</Link></div>
        </div>
      </div>
    );
  }

  if (activeSection === "preferences") {
    activeScreen = (
      <div>
        <ScreenHeading description="Choose the defaults TGPI should use across research, costs, dates and learning." section="preferences" title="App preferences" />
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Preferred language"><select className="tgpi-account-input" onChange={(event) => updateProfile({ preferredLanguage: event.target.value })} value={profile.preferredLanguage}>{languageOptions.map((language) => <option key={language} value={language}>{language}</option>)}</select></Field>
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
        <ScreenHeading description="Decide what can appear in future TGPI community, profile and credential experiences." section="privacy" title="Privacy" />
        <div className="mt-6 rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
          <Field description="Private is the safest default. You can change this whenever you choose." label="Profile visibility"><select className="tgpi-account-input" onChange={(event) => updatePrivacy("visibility", event.target.value as TgpiAccountProfile["privacy"]["visibility"])} value={profile.privacy.visibility}><option value="private">Private — only you</option><option value="members">Members — signed-in TGPI members</option><option value="public">Public — shareable profile</option></select></Field>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E3DED3]"><Toggle checked={profile.privacy.showLocation} description="Show your country and city where your visibility permits." label="Show location" onChange={(value) => updatePrivacy("showLocation", value)} /><Toggle checked={profile.privacy.showProgress} description="Show learning and preparation progress on your profile." label="Show progress" onChange={(value) => updatePrivacy("showProgress", value)} /><Toggle checked={profile.privacy.showGoals} description="Show selected international goals on your profile." label="Show global goals" onChange={(value) => updatePrivacy("showGoals", value)} /></div>
          <div className="mt-6 rounded-2xl bg-[#F3EFE6] p-5 text-xs leading-6 text-[#5F6876]">TGPI never stores passwords, recovery methods, passport numbers, national IDs or document scans in this profile. Authentication remains protected by Clerk.</div>
        </div>
      </div>
    );
  }

  if (activeSection === "security") {
    activeScreen = (
      <div>
        <ScreenHeading description="Manage verified emails, passwords, passkeys, login methods and active devices through Clerk protection." section="security" title="Login & security" />
        <div className="mt-6 overflow-hidden rounded-[22px] border border-[#DDD7CB] bg-white p-2 sm:p-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#8B6416]">TGPI Global Key</p><h1 className="mt-2 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.045em] text-[#0B1F3A] sm:text-5xl">Settings</h1><p className="mt-2 text-sm text-[#6E7784]">Your identity, preferences and security in one connected app.</p></div>
        <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#D6D0C4] bg-white px-4 text-xs font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]" href="/profile">Back to workspace</Link>
      </header>

      <div className="overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_28px_80px_rgba(11,31,58,0.1)] lg:grid lg:min-h-[760px] lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#E1DCD2] bg-[#FCFAF5] p-4 lg:flex lg:flex-col">
          <button className="flex items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-white" onClick={() => selectSection("overview")} type="button"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] font-[var(--tgpi-font-display)] text-lg font-semibold text-[#F0D58C]">{initials}</span><span className="min-w-0"><span className="block truncate text-sm font-extrabold text-[#0B1F3A]">{fullName}</span><span className="mt-0.5 block truncate text-[11px] text-[#727B88]">{account.membership}</span></span></button>
          <label className="relative mt-3 block"><span className="sr-only">Search settings</span><svg aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A8390]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg><input className="h-11 w-full rounded-xl border border-[#DDD7CB] bg-white pl-9 pr-3 text-xs text-[#0B1F3A] outline-none transition placeholder:text-[#959CA6] focus:border-[#B58A2A] focus:ring-4 focus:ring-[#B58A2A]/10" onChange={(event) => setQuery(event.target.value)} placeholder="Search settings" value={query} /></label>
          <nav aria-label="Account settings" className="mt-4 space-y-1">
            {filteredSections.map((section) => { const active = section.key === activeSection; return <button aria-current={active ? "page" : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${active ? "bg-[#0B1F3A] text-white shadow-[0_10px_24px_rgba(11,31,58,0.16)]" : "text-[#4F5B6A] hover:bg-white hover:text-[#0B1F3A]"}`} key={section.key} onClick={() => selectSection(section.key)} type="button"><span className={active ? "text-[#F0D58C]" : "text-[#6D7784]"}><SettingsIcon section={section.key} /></span><span className="text-xs font-extrabold">{section.label}</span></button>; })}
          </nav>
          {filteredSections.length === 0 ? <p className="px-3 py-5 text-xs leading-5 text-[#717A87]">No setting matches this search.</p> : null}
          <div className="mt-auto rounded-2xl border border-[#E0D8C5] bg-[#F4E7BE] p-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#75530E]">Synchronization</p><p className="mt-2 text-xs font-extrabold text-[#0B1F3A]">{isDirty ? "Changes waiting to be saved" : "Your account is up to date"}</p><p className="mt-1 text-[11px] leading-5 text-[#685B38]">Last update: {formatSavedDate(profile.updatedAt)}</p></div>
        </aside>

        <div className="min-w-0 bg-[#F8F5EE]">
          <div className="sticky top-0 z-30 border-b border-[#DDD7CB] bg-[#FFFDFA]/95 p-3 backdrop-blur lg:hidden">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] font-[var(--tgpi-font-display)] font-semibold text-[#F0D58C]">{initials}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold text-[#0B1F3A]">{activeDefinition.label}</p><p className="truncate text-[11px] text-[#737C89]">{activeDefinition.description}</p></div>{isDirty ? <span className="h-2.5 w-2.5 rounded-full bg-[#B58A2A]" title="Unsaved changes" /> : null}</div>
            <nav aria-label="Account settings" className="-mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1">
              {settingsSections.map((section) => { const active = section.key === activeSection; return <button aria-current={active ? "page" : undefined} className={`flex min-w-max items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-extrabold transition ${active ? "border-[#0B1F3A] bg-[#0B1F3A] text-white" : "border-[#DDD7CB] bg-white text-[#596473]"}`} key={section.key} onClick={() => selectSection(section.key)} type="button"><SettingsIcon section={section.key} />{section.label}</button>; })}
            </nav>
          </div>

          <div className="scroll-mt-36 p-4 pb-28 sm:p-7 sm:pb-28 lg:p-10 lg:pb-28" id={`settings-${activeSection}`} ref={contentRef}>{activeScreen}</div>

          <div className="sticky bottom-0 z-30 border-t border-[#DDD7CB] bg-white/95 px-4 py-3 backdrop-blur sm:px-7 lg:px-10">
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
