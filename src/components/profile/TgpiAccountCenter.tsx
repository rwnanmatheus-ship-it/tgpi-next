"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAccountProfileCompletion,
  type AccountIdentityInput,
  type TgpiAccountProfile,
  type TgpiAccountUpdate,
} from "@/lib/account-profile";

type CountryOption = {
  name: string;
  slug: string;
};

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
  countries: CountryOption[];
  decisionContext: DecisionContext;
  initialIdentity: AccountIdentityInput;
  initialProfile: TgpiAccountProfile;
};

type SaveState = "idle" | "saving" | "saved" | "error";

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

const navigationItems = [
  { href: "#account-overview", label: "Overview" },
  { href: "#personal-identity", label: "Identity" },
  { href: "#global-context", label: "Global context" },
  { href: "#experience-preferences", label: "Preferences" },
  { href: "#privacy-controls", label: "Privacy" },
  { href: "#security-center", label: "Security" },
] as const;

const connectedSystems = [
  {
    description: "Your location, languages and priorities improve the research context.",
    href: "/country-fit",
    label: "Country Fit",
    number: "01",
  },
  {
    description: "Your goals and shortlist shape the comparison lens.",
    href: "/compare",
    label: "Compare",
    number: "02",
  },
  {
    description: "Your timeline and context organize the next actions.",
    href: "/onboarding",
    label: "Personal plan",
    number: "03",
  },
  {
    description: "Country choices connect to evidence and document research.",
    href: "/documents",
    label: "Documents",
    number: "04",
  },
  {
    description: "Language and education context personalize capability paths.",
    href: "/courses",
    label: "Learning",
    number: "05",
  },
] as const;

const goalLabels: Record<string, string> = {
  learn: "Expand global knowledge",
  live: "Live in another country",
  study: "Study abroad",
  travel: "Travel smarter",
  work: "Work globally",
};

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
      {description ? (
        <span className="mt-1 block text-xs leading-5 text-[#6B7280]">
          {description}
        </span>
      ) : null}
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
    <label className="flex cursor-pointer items-start justify-between gap-5 rounded-2xl border border-[#DED8CA] bg-white p-4 transition hover:border-[#C4A55E]">
      <span>
        <span className="block text-sm font-extrabold text-[#0B1F3A]">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-[#697386]">{description}</span>
      </span>
      <input
        checked={checked}
        className="peer sr-only"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span className="relative mt-0.5 h-7 w-12 shrink-0 rounded-full bg-[#D4D7DC] transition peer-checked:bg-[#0B1F3A] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#B58A2A]">
        <span
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </span>
    </label>
  );
}

function SectionHeading({
  description,
  eyebrow,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="border-b border-[#E2DDD2] pb-5">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#956A13]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[-0.035em] text-[#0B1F3A] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085]">
        {description}
      </p>
    </div>
  );
}

function formatSavedDate(value?: string) {
  if (!value) return "Not saved yet";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved recently";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export default function TgpiAccountCenter({
  account,
  countries,
  decisionContext,
  initialIdentity,
  initialProfile,
}: TgpiAccountCenterProps) {
  const router = useRouter();
  const [identity, setIdentity] = useState(initialIdentity);
  const [profile, setProfile] = useState(initialProfile);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const savedSnapshot = useRef(
    JSON.stringify({ identity: initialIdentity, profile: initialProfile }),
  );
  const currentSnapshot = JSON.stringify({ identity, profile });
  const isDirty = currentSnapshot !== savedSnapshot.current;
  const completion = useMemo(
    () => getAccountProfileCompletion(identity, profile),
    [identity, profile],
  );

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

  function updateNotifications(
    key: keyof TgpiAccountProfile["notifications"],
    value: boolean,
  ) {
    updateProfile({
      notifications: { ...profile.notifications, [key]: value },
    });
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
      savedSnapshot.current = JSON.stringify({
        identity: result.identity,
        profile: result.profile,
      });
      setSaveState("saved");
      setMessage(
        "Saved and synchronized with your TGPI workspace and decision tools.",
      );
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your account. Please try again.",
      );
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="relative overflow-hidden rounded-[30px] bg-[#0B1F3A] px-5 py-8 text-white shadow-[0_28px_80px_rgba(11,31,58,0.2)] sm:px-8 sm:py-10 lg:px-11">
        <div aria-hidden="true" className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-[#E5BF5A]/20" />
        <div aria-hidden="true" className="absolute -right-10 -top-12 h-48 w-48 rounded-full border border-[#E5BF5A]/25" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#F0D58C]">
              TGPI Global Key · Account Intelligence
            </p>
            <h1 className="mt-4 max-w-3xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              Your identity. One connected system.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#CAD3DE] sm:text-base">
              Manage the context that powers your country research, comparisons,
              personal plan, documents and learning journey.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C9D2DE]">
                Profile intelligence
              </p>
              <p className="font-[var(--tgpi-font-display)] text-3xl font-semibold text-[#F0D58C]">
                {completion}%
              </p>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#E5BF5A] transition-[width] duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-[#BFC9D6]">
              More context creates more relevant guidance. TGPI never invents a
              success score from this profile.
            </p>
          </div>
        </div>
      </header>

      <nav
        aria-label="Account center sections"
        className="sticky top-0 z-20 -mx-4 mt-5 overflow-x-auto border-y border-[#DDD6C8] bg-[#F5F1E8]/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border"
      >
        <div className="flex min-w-max gap-2">
          {navigationItems.map((item) => (
            <a
              className="rounded-xl px-4 py-2.5 text-xs font-extrabold text-[#556070] transition hover:bg-white hover:text-[#0B1F3A]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="scroll-mt-24 py-10" id="account-overview">
        <SectionHeading
          description="A live view of your identity, decision context and the systems using it."
          eyebrow="System overview"
          title="Your TGPI account at a glance"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[24px] bg-[#0B1F3A] p-6 text-white md:col-span-2">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C]">
              TGPI Global ID
            </p>
            <p className="mt-4 break-all font-[var(--tgpi-font-display)] text-2xl font-semibold tracking-[0.04em] sm:text-3xl">
              {account.globalId}
            </p>
            <p className="mt-3 max-w-xl text-xs leading-6 text-[#C7D0DC]">
              Your stable public reference inside TGPI. It is never a password,
              recovery code or travel document.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#D8D2C4] bg-white p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7A8390]">
              Primary identity
            </p>
            <p className="mt-4 truncate text-sm font-extrabold text-[#0B1F3A]">
              {account.email}
            </p>
            <p className={`mt-3 text-xs font-bold ${account.emailVerified ? "text-[#277352]" : "text-[#9A6010]"}`}>
              {account.emailVerified ? "Verified email" : "Verification required"}
            </p>
          </article>
          <article className="rounded-[24px] border border-[#D8D2C4] bg-white p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7A8390]">
              Membership
            </p>
            <p className="mt-4 text-xl font-extrabold text-[#0B1F3A]">
              {account.membership}
            </p>
            <Link className="mt-3 inline-flex text-xs font-extrabold text-[#956A13]" href="/pricing">
              Review plan →
            </Link>
          </article>
        </div>

        <div className="mt-4 rounded-[26px] border border-[#D8D2C4] bg-[#FFFDF8] p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#956A13]">
                Decision context
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-[#0B1F3A]">
                {decisionContext.completed ? "Personal plan connected" : "Personal plan needs context"}
              </h3>
            </div>
            <Link className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-3 text-xs font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]" href="/onboarding">
              Edit global plan
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#F3EFE6] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A8390]">Primary goal</p>
              <p className="mt-2 text-sm font-extrabold text-[#0B1F3A]">{goalLabels[decisionContext.goal] || "Not defined"}</p>
            </div>
            <div className="rounded-2xl bg-[#F3EFE6] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A8390]">Country shortlist</p>
              <p className="mt-2 text-sm font-extrabold text-[#0B1F3A]">{decisionContext.countries.join(", ") || "No countries selected"}</p>
            </div>
            <div className="rounded-2xl bg-[#F3EFE6] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A8390]">Plan readiness</p>
              <p className="mt-2 text-sm font-extrabold text-[#0B1F3A]">{decisionContext.progress}% complete</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {connectedSystems.map((system) => (
            <Link
              className="group rounded-[22px] border border-[#D8D2C4] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#B58A2A] hover:shadow-[0_16px_38px_rgba(11,31,58,0.08)]"
              href={system.href}
              key={system.label}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-extrabold tracking-[0.18em] text-[#956A13]">{system.number}</span>
                <span aria-hidden="true" className="text-[#956A13] transition group-hover:translate-x-1">→</span>
              </div>
              <h3 className="mt-5 text-base font-extrabold text-[#0B1F3A]">{system.label}</h3>
              <p className="mt-2 text-xs leading-5 text-[#697386]">{system.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="scroll-mt-24 rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-5 shadow-[0_18px_55px_rgba(11,31,58,0.06)] sm:p-8" id="personal-identity">
            <SectionHeading
              description="Build a useful account identity without turning sensitive documents into profile data."
              eyebrow="01 · Identity"
              title="Personal identity"
            />
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="First name">
                <input className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ firstName: event.target.value })} required value={identity.firstName} />
              </Field>
              <Field label="Last name">
                <input className="tgpi-account-input" maxLength={60} onChange={(event) => updateIdentity({ lastName: event.target.value })} value={identity.lastName} />
              </Field>
              <div className="sm:col-span-2">
                <Field description="A concise line shown in future profile and collaboration surfaces." label="Professional headline">
                  <input className="tgpi-account-input" maxLength={120} onChange={(event) => updateProfile({ headline: event.target.value })} placeholder="Product designer building a global career" value={profile.headline} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field description={`${profile.bio.length}/500 characters`} label="About you">
                  <textarea className="tgpi-account-input min-h-32 resize-y py-3" maxLength={500} onChange={(event) => updateProfile({ bio: event.target.value })} placeholder="Share the context that helps TGPI understand your goals and experience." value={profile.bio} />
                </Field>
              </div>
              <Field label="Current country">
                <select className="tgpi-account-input" onChange={(event) => updateProfile({ currentCountry: event.target.value })} value={profile.currentCountry}>
                  <option value="">Select a country</option>
                  {countries.map((country) => <option key={country.slug} value={country.slug}>{country.name}</option>)}
                </select>
              </Field>
              <Field label="Current city">
                <input className="tgpi-account-input" maxLength={100} onChange={(event) => updateProfile({ currentCity: event.target.value })} placeholder="São Paulo" value={profile.currentCity} />
              </Field>
              <Field label="Nationality">
                <input className="tgpi-account-input" maxLength={80} onChange={(event) => updateProfile({ nationality: event.target.value })} placeholder="Brazilian" value={profile.nationality} />
              </Field>
              <Field label="Timezone">
                <input className="tgpi-account-input" list="tgpi-timezones" maxLength={80} onChange={(event) => updateProfile({ timezone: event.target.value })} placeholder="America/Sao_Paulo" value={profile.timezone} />
                <datalist id="tgpi-timezones">{timezoneOptions.map((timezone) => <option key={timezone} value={timezone} />)}</datalist>
              </Field>
            </div>
          </section>

          <section className="scroll-mt-24 rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-5 shadow-[0_18px_55px_rgba(11,31,58,0.06)] sm:p-8" id="global-context">
            <SectionHeading
              description="These fields synchronize with Country Fit, your personal plan and learning context."
              eyebrow="02 · Intelligence context"
              title="Global context"
            />
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Profession or field">
                <input className="tgpi-account-input" maxLength={100} onChange={(event) => updateProfile({ profession: event.target.value })} placeholder="Software engineering" value={profile.profession} />
              </Field>
              <Field label="Education level">
                <select className="tgpi-account-input" onChange={(event) => updateProfile({ educationLevel: event.target.value })} value={profile.educationLevel}>
                  <option value="">Select your level</option>
                  <option value="Secondary education">Secondary education</option>
                  <option value="Technical or vocational">Technical or vocational</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Bachelor's degree">Bachelor&apos;s degree</option>
                  <option value="Master's degree">Master&apos;s degree</option>
                  <option value="Doctorate">Doctorate</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <p className="text-sm font-extrabold text-[#0B1F3A]">Languages</p>
                <p className="mt-1 text-xs leading-5 text-[#6B7280]">Choose up to eight. These choices also update your global plan.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languageOptions.map((language) => {
                    const selected = profile.languages.includes(language);
                    return (
                      <button aria-pressed={selected} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${selected ? "border-[#0B1F3A] bg-[#0B1F3A] text-white" : "border-[#D8D2C4] bg-white text-[#566173] hover:border-[#B58A2A]"}`} key={language} onClick={() => toggleLanguage(language)} type="button">
                        {selected ? "✓ " : ""}{language}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-7 rounded-2xl border border-[#D9C78D] bg-[#FBF4DE] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-extrabold text-[#0B1F3A]">Decision priorities remain in your personal plan</p>
                  <p className="mt-1 text-xs leading-5 text-[#6F6241]">Goals, shortlist, budget, timeline and priorities have one canonical editor to prevent conflicting recommendations.</p>
                </div>
                <Link className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-xs font-extrabold text-white" href="/onboarding">Edit personal plan</Link>
              </div>
            </div>
          </section>

          <section className="scroll-mt-24 rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-5 shadow-[0_18px_55px_rgba(11,31,58,0.06)] sm:p-8" id="experience-preferences">
            <SectionHeading
              description="Set the defaults TGPI should use across research, costs, dates and learning."
              eyebrow="03 · Experience"
              title="Product preferences"
            />
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Preferred language">
                <select className="tgpi-account-input" onChange={(event) => updateProfile({ preferredLanguage: event.target.value })} value={profile.preferredLanguage}>
                  {languageOptions.map((language) => <option key={language} value={language}>{language}</option>)}
                </select>
              </Field>
              <Field label="Preferred currency">
                <select className="tgpi-account-input" onChange={(event) => updateProfile({ preferredCurrency: event.target.value })} value={profile.preferredCurrency}>
                  {currencyOptions.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </select>
              </Field>
              <Field label="Measurement system">
                <select className="tgpi-account-input" onChange={(event) => updateProfile({ measurementSystem: event.target.value === "imperial" ? "imperial" : "metric" })} value={profile.measurementSystem}>
                  <option value="metric">Metric — km, kg, °C</option>
                  <option value="imperial">Imperial — mi, lb, °F</option>
                </select>
              </Field>
              <Field label="Website">
                <input className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ website: event.target.value })} placeholder="https://yourwebsite.com" value={profile.website} />
              </Field>
              <Field label="LinkedIn">
                <input className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ linkedin: event.target.value })} placeholder="linkedin.com/in/username" value={profile.linkedin} />
              </Field>
              <Field label="Instagram">
                <input className="tgpi-account-input" inputMode="url" maxLength={240} onChange={(event) => updateProfile({ instagram: event.target.value })} placeholder="instagram.com/username" value={profile.instagram} />
              </Field>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-extrabold text-[#0B1F3A]">Notifications</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Toggle checked={profile.notifications.planReminders} description="Receive prompts connected to your active personal plan." label="Plan reminders" onChange={(value) => updateNotifications("planReminders", value)} />
                <Toggle checked={profile.notifications.researchAlerts} description="Know when evidence linked to your selected countries changes." label="Research alerts" onChange={(value) => updateNotifications("researchAlerts", value)} />
                <Toggle checked={profile.notifications.learningUpdates} description="Receive relevant course and capability-path updates." label="Learning updates" onChange={(value) => updateNotifications("learningUpdates", value)} />
                <Toggle checked={profile.notifications.productNews} description="Receive selected TGPI product and release news." label="Product news" onChange={(value) => updateNotifications("productNews", value)} />
              </div>
            </div>
          </section>

          <section className="scroll-mt-24 rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-5 shadow-[0_18px_55px_rgba(11,31,58,0.06)] sm:p-8" id="privacy-controls">
            <SectionHeading
              description="Choose what may become visible in future TGPI community and credential experiences."
              eyebrow="04 · Control"
              title="Privacy and visibility"
            />
            <div className="mt-7">
              <Field description="Private is the safest default. You can change this later." label="Profile visibility">
                <select className="tgpi-account-input" onChange={(event) => updatePrivacy("visibility", event.target.value as TgpiAccountProfile["privacy"]["visibility"])} value={profile.privacy.visibility}>
                  <option value="private">Private — only you</option>
                  <option value="members">Members — signed-in TGPI members</option>
                  <option value="public">Public — shareable profile</option>
                </select>
              </Field>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Toggle checked={profile.privacy.showLocation} description="Allow your country and city to appear where your visibility permits." label="Show location" onChange={(value) => updatePrivacy("showLocation", value)} />
                <Toggle checked={profile.privacy.showProgress} description="Allow learning and preparation progress to appear on your profile." label="Show progress" onChange={(value) => updatePrivacy("showProgress", value)} />
                <Toggle checked={profile.privacy.showGoals} description="Allow selected global goals to appear on your profile." label="Show global goals" onChange={(value) => updatePrivacy("showGoals", value)} />
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-[#F3EFE6] p-5 text-xs leading-6 text-[#5F6876]">
              TGPI keeps passwords, sessions, passkeys and recovery methods inside Clerk. Passport numbers, national IDs and document scans are never stored in this profile metadata.
            </div>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <div className="rounded-[24px] border border-[#D8D2C4] bg-white p-5 shadow-[0_16px_40px_rgba(11,31,58,0.06)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#956A13]">Save center</p>
            <p className="mt-3 text-lg font-extrabold text-[#0B1F3A]">{isDirty ? "Unsaved changes" : saveState === "saved" ? "Account synchronized" : "Everything is up to date"}</p>
            <p className="mt-2 text-xs leading-5 text-[#697386]">Last update: {formatSavedDate(profile.updatedAt)}</p>
            <button className="mt-5 min-h-12 w-full rounded-xl bg-[#0B1F3A] px-5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(11,31,58,0.18)] transition hover:bg-[#173554] disabled:cursor-not-allowed disabled:opacity-55" disabled={!isDirty || saveState === "saving"} onClick={saveAccount} type="button">
              {saveState === "saving" ? "Synchronizing…" : "Save and synchronize"}
            </button>
            <div aria-live="polite" className={`mt-3 min-h-10 text-xs leading-5 ${saveState === "error" ? "text-[#A32626]" : "text-[#277352]"}`} role="status">
              {message}
            </div>
          </div>
          <div className="rounded-[24px] bg-[#E8D9A8] p-5 text-[#0B1F3A]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#73520F]">Intelligence principle</p>
            <p className="mt-3 font-[var(--tgpi-font-display)] text-2xl font-semibold leading-tight">Context improves relevance. Evidence determines confidence.</p>
            <p className="mt-3 text-xs leading-6 text-[#5F532F]">Your profile personalizes the questions TGPI asks. It does not replace official sources or guarantee an outcome.</p>
          </div>
          <Link className="flex items-center justify-between rounded-[20px] border border-[#D8D2C4] bg-[#FFFDF8] p-4 text-sm font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]" href="/profile">
            Back to workspace <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
