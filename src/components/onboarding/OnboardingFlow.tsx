"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  OnboardingCountry,
  OnboardingGoal,
  OnboardingPriority,
  TgpiOnboardingData,
} from "@/types/onboarding";

type SaveStatus = "saved" | "saving" | "error";

type OnboardingFlowProps = {
  countries: OnboardingCountry[];
  initialData: TgpiOnboardingData;
  firstName: string;
};

const steps = [
  { number: 1, label: "Goal" },
  { number: 2, label: "Countries" },
  { number: 3, label: "Timeline" },
  { number: 4, label: "Context" },
  { number: 5, label: "Priorities" },
] as const;

const goals: Array<{
  value: OnboardingGoal;
  label: string;
  description: string;
  icon: IconName;
}> = [
  {
    value: "live",
    label: "Live in another country",
    description: "Plan your move with greater clarity and confidence.",
    icon: "home",
  },
  {
    value: "study",
    label: "Study abroad",
    description: "Discover destinations, institutions, and ways to prepare.",
    icon: "study",
  },
  {
    value: "work",
    label: "Work globally",
    description: "Explore job markets, international careers, and adaptation.",
    icon: "work",
  },
  {
    value: "travel",
    label: "Travel smarter",
    description: "Make practical decisions before, during, and after your trip.",
    icon: "compass",
  },
  {
    value: "learn",
    label: "Expand my global knowledge",
    description: "Learn about the world without having a move already planned.",
    icon: "globe",
  },
];

const timeHorizons = [
  { value: "now", label: "Now", detail: "Within the next 30 days" },
  { value: "3-months", label: "Within 3 months", detail: "Short-term plan" },
  { value: "6-months", label: "Within 6 months", detail: "Time to prepare" },
  { value: "12-months", label: "Within 12 months", detail: "Medium-term plan" },
  { value: "exploring", label: "Still exploring", detail: "No date set" },
] as const;

const budgets = [
  { value: "under-1500", label: "Up to US$1,500", detail: "per month" },
  { value: "1500-3000", label: "US$1,500–3,000", detail: "per month" },
  { value: "3000-5000", label: "US$3,000–5,000", detail: "per month" },
  { value: "5000-plus", label: "Over US$5,000", detail: "per month" },
  { value: "undecided", label: "Not decided yet", detail: "I want to compare scenarios" },
] as const;

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
  "Other",
] as const;

const experienceOptions = [
  {
    value: "first-step",
    label: "My first global step",
    detail: "I have not traveled or lived abroad yet.",
  },
  {
    value: "short-trips",
    label: "I have traveled internationally",
    detail: "I have some short-term experience abroad.",
  },
  {
    value: "lived-abroad",
    label: "I have lived or studied abroad",
    detail: "I am familiar with part of the adaptation process.",
  },
  {
    value: "global-citizen",
    label: "My life is already international",
    detail: "I work, study, or live across countries.",
  },
] as const;

const priorities: Array<{
  value: OnboardingPriority;
  label: string;
  description: string;
}> = [
  { value: "safety", label: "Safety", description: "Risks and stability" },
  { value: "cost", label: "Cost of living", description: "Budget and purchasing power" },
  { value: "career", label: "Career", description: "Job market and opportunities" },
  {
    value: "quality-of-life",
    label: "Quality of life",
    description: "Daily life, health, and well-being",
  },
  {
    value: "documentation",
    label: "Documentation",
    description: "Visas, rules, and preparation",
  },
  { value: "education", label: "Education", description: "Study and development" },
  { value: "language", label: "Language", description: "Fluency and integration" },
  { value: "culture", label: "Culture", description: "Belonging and adaptation" },
];

const goalLabels = Object.fromEntries(
  goals.map((goal) => [goal.value, goal.label]),
) as Record<OnboardingGoal, string>;

const timeLabels = Object.fromEntries(
  timeHorizons.map((item) => [item.value, item.label]),
) as Record<TgpiOnboardingData["timeHorizon"] & string, string>;

const priorityLabels = Object.fromEntries(
  priorities.map((item) => [item.value, item.label]),
) as Record<OnboardingPriority, string>;

const regionLabels: Record<string, string> = {
  Africa: "Africa",
  Asia: "Asia",
  Europe: "Europe",
  "North America": "North America",
  "South America": "South America",
  Oceania: "Oceania",
};

export default function OnboardingFlow({
  countries,
  initialData,
  firstName,
}: OnboardingFlowProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [step, setStep] = useState(initialData.currentStep || 1);
  const [highestStep, setHighestStep] = useState(initialData.currentStep || 1);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [validationMessage, setValidationMessage] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const hasMounted = useRef(false);

  const persist = useCallback(async (nextData: TgpiOnboardingData) => {
    setSaveStatus("saving");

    try {
      const response = await fetch("/api/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextData),
      });

      if (!response.ok) throw new Error("Save failed");

      await response.json();
      setSaveStatus("saved");
      return true;
    } catch {
      setSaveStatus("error");
      return false;
    }
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const timer = window.setTimeout(() => {
      void persist(data);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [data, persist]);

  function updateData(patch: Partial<TgpiOnboardingData>) {
    setValidationMessage("");
    setData((current) => ({ ...current, ...patch }));
  }

  function selectStep(nextStep: number) {
    if (nextStep > highestStep || nextStep === step) return;
    setValidationMessage("");
    setStep(nextStep);
    updateData({ currentStep: nextStep });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function continueFlow() {
    const message = getStepValidationMessage(step, data);

    if (message) {
      setValidationMessage(message);
      return;
    }

    if (step === 5) {
      setIsCompleting(true);
      const finalData = { ...data, currentStep: 5, completed: true };
      setData(finalData);
      const saved = await persist(finalData);
      setIsCompleting(false);

      if (saved) {
        router.push("/profile?onboarding=completed");
        router.refresh();
      }
      return;
    }

    const nextStep = step + 1;
    const nextData = { ...data, currentStep: nextStep };
    setData(nextData);
    setStep(nextStep);
    setHighestStep((current) => Math.max(current, nextStep));
    void persist(nextData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    if (step === 1) {
      router.push("/profile");
      return;
    }

    const previousStep = step - 1;
    setStep(previousStep);
    updateData({ currentStep: previousStep });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const completion = getCompletion(data);

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#0B1F3A]">
      <section className="border-b border-[#D8D2C4] bg-[#FFFDF8] px-4 pb-8 pt-10 sm:px-6 lg:pb-10 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#956A13]">
              TGPI Global Onboarding
            </p>
            <h1 className="mt-4 font-[var(--tgpi-font-display)] text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              Build your global plan.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#657082]">
              {firstName}, tell us what matters to you. TGPI will shape your
              experience to turn curiosity into clear next steps.
            </p>
          </div>

          <nav aria-label="Global plan steps" className="mt-9 overflow-x-auto pb-2">
            <ol className="grid min-w-[680px] grid-cols-5">
              {steps.map((item, index) => {
                const isActive = item.number === step;
                const isAvailable = item.number <= highestStep;
                const isComplete = item.number < step || isStepValid(item.number, data);

                return (
                  <li key={item.number} className="relative">
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 right-1/2 top-4 h-px ${
                          item.number <= highestStep
                            ? "bg-[#B58A2A]"
                            : "bg-[#D8D2C4]"
                        }`}
                      />
                    ) : null}
                    {index < steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={`absolute left-1/2 right-0 top-4 h-px ${
                          item.number < highestStep
                            ? "bg-[#B58A2A]"
                            : "bg-[#D8D2C4]"
                        }`}
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => selectStep(item.number)}
                      disabled={!isAvailable}
                      aria-current={isActive ? "step" : undefined}
                      className="relative z-10 flex w-full flex-col items-center gap-2 disabled:cursor-not-allowed"
                    >
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-full border text-[11px] font-extrabold transition ${
                          isActive
                            ? "border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-[0_0_0_5px_#F5F1E8]"
                            : isComplete
                              ? "border-[#B58A2A] bg-[#E5BF5A] text-[#0B1F3A]"
                              : "border-[#CFC7B8] bg-[#FFFDF8] text-[#7A8390]"
                        }`}
                      >
                        {isComplete && !isActive ? "✓" : item.number}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                          isActive ? "text-[#0B1F3A]" : "text-[#7A8390]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-5 shadow-[0_22px_60px_rgba(11,31,58,0.08)] sm:p-8 lg:p-10">
            {step === 1 ? <GoalStep data={data} updateData={updateData} /> : null}
            {step === 2 ? (
              <CountriesStep
                countries={countries}
                data={data}
                updateData={updateData}
                setValidationMessage={setValidationMessage}
              />
            ) : null}
            {step === 3 ? <TimingStep data={data} updateData={updateData} /> : null}
            {step === 4 ? <ContextStep data={data} updateData={updateData} /> : null}
            {step === 5 ? <PrioritiesStep data={data} updateData={updateData} /> : null}

            <div className="mt-10 border-t border-[#E4DED2] pt-6">
              <div aria-live="polite" className="min-h-6">
                {validationMessage ? (
                  <p className="flex items-start gap-2 text-sm font-bold text-[#9F2F2F]">
                    <span aria-hidden="true">!</span>
                    {validationMessage}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-xs text-[#657082]">
                  <SaveIndicator status={saveStatus} />
                  <span>Only experience preferences are saved.</span>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-[#CFC7B8] bg-white px-5 text-sm font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A] sm:flex-none"
                  >
                    {step === 1 ? "Exit" : "Back"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void continueFlow()}
                    disabled={isCompleting}
                    className="inline-flex min-h-12 flex-[1.5] items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(11,31,58,0.18)] transition hover:bg-[#143454] disabled:cursor-wait disabled:opacity-70 sm:flex-none"
                  >
                    {step === 5
                      ? isCompleting
                        ? "Saving plan..."
                        : data.completed
                          ? "Update my plan"
                          : "Complete my plan"
                      : "Continue"}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <PlanSummary
            countries={countries}
            completion={completion}
            data={data}
          />
        </div>
      </section>
    </main>
  );
}

function GoalStep({
  data,
  updateData,
}: {
  data: TgpiOnboardingData;
  updateData: (patch: Partial<TgpiOnboardingData>) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 1 of 5"
        title="What do you want to build in the world?"
        description="Choose your primary goal. You can adjust your direction at any time."
      />
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {goals.map((goal) => {
          const selected = data.primaryGoal === goal.value;

          return (
            <button
              key={goal.value}
              type="button"
              aria-pressed={selected}
              onClick={() => updateData({ primaryGoal: goal.value })}
              className={`group flex min-h-[138px] items-start gap-4 rounded-2xl border p-5 text-left transition ${
                selected
                  ? "border-[#B58A2A] bg-[#FBF2D8] shadow-[0_10px_30px_rgba(181,138,42,0.11)]"
                  : "border-[#D8D2C4] bg-white hover:-translate-y-0.5 hover:border-[#B58A2A]"
              }`}
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                  selected
                    ? "bg-[#0B1F3A] text-[#E5BF5A]"
                    : "bg-[#F2EBDD] text-[#0B1F3A]"
                }`}
              >
                <OnboardingIcon name={goal.icon} />
              </span>
              <span>
                <span className="block text-base font-extrabold text-[#0B1F3A]">
                  {goal.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-[#657082]">
                  {goal.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`ml-auto mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${
                  selected
                    ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                    : "border-[#CFC7B8] text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CountriesStep({
  countries,
  data,
  updateData,
  setValidationMessage,
}: {
  countries: OnboardingCountry[];
  data: TgpiOnboardingData;
  updateData: (patch: Partial<TgpiOnboardingData>) => void;
  setValidationMessage: (message: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [visibleCount, setVisibleCount] = useState(24);
  const regions = useMemo(
    () => Array.from(new Set(countries.map((country) => country.region))).sort(),
    [countries],
  );
  const filteredCountries = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return countries.filter((country) => {
      const matchesRegion = region === "all" || country.region === region;
      const matchesQuery =
        !normalizedQuery ||
        normalizeSearch(`${country.name} ${country.region}`).includes(
          normalizedQuery,
        );
      return matchesRegion && matchesQuery;
    });
  }, [countries, query, region]);

  function toggleCountry(slug: string) {
    const selected = data.targetCountries.includes(slug);

    if (!selected && data.targetCountries.length >= 5) {
      setValidationMessage("You can select up to five countries.");
      return;
    }

    updateData({
      targetCountries: selected
        ? data.targetCountries.filter((countrySlug) => countrySlug !== slug)
        : [...data.targetCountries, slug],
    });
  }

  return (
    <div>
      <StepHeading
        eyebrow="Step 2 of 5"
        title="Which countries interest you?"
        description="Select up to five countries. TGPI will use your choices to organize comparisons and recommendations."
        aside={`${data.targetCountries.length}/5 selected`}
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_210px]">
        <label className="relative block">
          <span className="sr-only">Search for a country</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8390]">
            <OnboardingIcon name="search" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(24);
            }}
            placeholder="Search across 195 countries"
            className="min-h-12 w-full rounded-xl border border-[#D8D2C4] bg-white py-3 pl-11 pr-4 text-sm text-[#0B1F3A] placeholder:text-[#8B929D] focus:border-[#B58A2A]"
          />
        </label>
        <label>
          <span className="sr-only">Filter by continent</span>
          <select
            value={region}
            onChange={(event) => {
              setRegion(event.target.value);
              setVisibleCount(24);
            }}
            className="min-h-12 w-full rounded-xl border border-[#D8D2C4] bg-white px-4 text-sm font-bold text-[#0B1F3A] focus:border-[#B58A2A]"
          >
            <option value="all">All continents</option>
            {regions.map((item) => (
              <option key={item} value={item}>
                {regionLabels[item] || item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {data.targetCountries.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Selected countries">
          {data.targetCountries.map((slug) => {
            const country = countries.find((item) => item.slug === slug);
            if (!country) return null;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => toggleCountry(slug)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#D0B168] bg-[#FBF2D8] px-3 text-xs font-extrabold text-[#0B1F3A] transition hover:border-[#9A7119]"
                aria-label={`Remove ${country.name}`}
              >
                <span>{country.emoji}</span>
                {country.name}
                <span aria-hidden="true" className="text-[#8A641F]">×</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCountries.slice(0, visibleCount).map((country) => {
          const selected = data.targetCountries.includes(country.slug);

          return (
            <button
              key={country.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleCountry(country.slug)}
              className={`flex min-h-[92px] items-center gap-3 rounded-2xl border p-4 text-left transition ${
                selected
                  ? "border-[#B58A2A] bg-[#FBF2D8] shadow-[0_8px_24px_rgba(181,138,42,0.1)]"
                  : "border-[#D8D2C4] bg-white hover:-translate-y-0.5 hover:border-[#B58A2A]"
              }`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F2EBDD] text-2xl">
                {country.emoji}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-extrabold text-[#0B1F3A]">
                  {country.name}
                </span>
                <span className="mt-1 block truncate text-xs text-[#7A8390]">
                  {regionLabels[country.region] || country.region}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${
                  selected
                    ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                    : "border-[#CFC7B8] text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>

      {filteredCountries.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#CFC7B8] bg-white px-5 py-10 text-center">
          <p className="font-extrabold text-[#0B1F3A]">No countries found.</p>
          <p className="mt-2 text-sm text-[#657082]">Try another name or continent.</p>
        </div>
      ) : null}

      {visibleCount < filteredCountries.length ? (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + 24)}
          className="mx-auto mt-6 flex min-h-11 items-center justify-center rounded-xl border border-[#CFC7B8] bg-white px-5 text-sm font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]"
        >
          Show more countries
        </button>
      ) : null}
    </div>
  );
}

function TimingStep({
  data,
  updateData,
}: {
  data: TgpiOnboardingData;
  updateData: (patch: Partial<TgpiOnboardingData>) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 3 of 5"
        title="What is your plan's timeline?"
        description="Your timeline and budget help TGPI distinguish exploration, preparation, and decision-making."
      />

      <fieldset className="mt-8">
        <legend className="text-sm font-extrabold text-[#0B1F3A]">When do you plan to take action?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {timeHorizons.map((item) => (
            <OptionCard
              key={item.value}
              selected={data.timeHorizon === item.value}
              label={item.label}
              detail={item.detail}
              onClick={() => updateData({ timeHorizon: item.value })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-9">
        <legend className="text-sm font-extrabold text-[#0B1F3A]">
          What monthly budget feels comfortable to you?
        </legend>
        <p className="mt-1 text-xs leading-5 text-[#7A8390]">
          We use US dollars only as a consistent reference across countries.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((item) => (
            <OptionCard
              key={item.value}
              selected={data.budgetRange === item.value}
              label={item.label}
              detail={item.detail}
              onClick={() => updateData({ budgetRange: item.value })}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function ContextStep({
  data,
  updateData,
}: {
  data: TgpiOnboardingData;
  updateData: (patch: Partial<TgpiOnboardingData>) => void;
}) {
  function toggleLanguage(language: string) {
    updateData({
      languages: data.languages.includes(language)
        ? data.languages.filter((item) => item !== language)
        : [...data.languages, language].slice(0, 8),
    });
  }

  return (
    <div>
      <StepHeading
        eyebrow="Step 4 of 5"
        title="What is your current context?"
        description="This information makes recommendations more useful without asking for documents or sensitive data."
      />

      <fieldset className="mt-8">
        <legend className="text-sm font-extrabold text-[#0B1F3A]">Which languages do you use?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {languageOptions.map((language) => {
            const selected = data.languages.includes(language);
            return (
              <button
                key={language}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleLanguage(language)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold transition ${
                  selected
                    ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                    : "border-[#D8D2C4] bg-white text-[#0B1F3A] hover:border-[#B58A2A]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mr-1 inline-flex w-3 shrink-0 justify-center transition-opacity ${
                    selected ? "opacity-100" : "opacity-0"
                  }`}
                >
                  ✓
                </span>
                <span>{language}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-extrabold text-[#0B1F3A]">Profession or field of interest</span>
          <span className="mt-1 block text-xs text-[#7A8390]">Optional</span>
          <input
            type="text"
            value={data.profession}
            onChange={(event) => updateData({ profession: event.target.value })}
            maxLength={100}
            placeholder="E.g. technology, healthcare, design"
            className="mt-3 min-h-12 w-full rounded-xl border border-[#D8D2C4] bg-white px-4 text-sm text-[#0B1F3A] placeholder:text-[#8B929D] focus:border-[#B58A2A]"
          />
        </label>
        <label className="block">
          <span className="text-sm font-extrabold text-[#0B1F3A]">Education level</span>
          <span className="mt-1 block text-xs text-[#7A8390]">Optional</span>
          <select
            value={data.educationLevel}
            onChange={(event) => updateData({ educationLevel: event.target.value })}
            className="mt-3 min-h-12 w-full rounded-xl border border-[#D8D2C4] bg-white px-4 text-sm text-[#0B1F3A] focus:border-[#B58A2A]"
          >
            <option value="">Select an option</option>
            <option value="secondary">Secondary education</option>
            <option value="technical">Technical or vocational training</option>
            <option value="undergraduate">Undergraduate degree in progress</option>
            <option value="graduated">Undergraduate degree completed</option>
            <option value="postgraduate">Postgraduate, master&apos;s, or doctoral degree</option>
            <option value="other">Another path</option>
          </select>
        </label>
      </div>

      <fieldset className="mt-9">
        <legend className="text-sm font-extrabold text-[#0B1F3A]">What is your international experience?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {experienceOptions.map((item) => (
            <OptionCard
              key={item.value}
              selected={data.internationalExperience === item.value}
              label={item.label}
              detail={item.detail}
              onClick={() =>
                updateData({ internationalExperience: item.value })
              }
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function PrioritiesStep({
  data,
  updateData,
}: {
  data: TgpiOnboardingData;
  updateData: (patch: Partial<TgpiOnboardingData>) => void;
}) {
  function togglePriority(priority: OnboardingPriority) {
    const selected = data.priorities.includes(priority);

    if (!selected && data.priorities.length >= 5) return;

    updateData({
      priorities: selected
        ? data.priorities.filter((item) => item !== priority)
        : [...data.priorities, priority],
    });
  }

  return (
    <div>
      <StepHeading
        eyebrow="Step 5 of 5"
        title="What matters most in your decisions?"
        description="Choose three to five priorities. They will shape the order of information and comparisons in your TGPI experience."
        aside={`${data.priorities.length}/5 selected`}
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {priorities.map((priority, index) => {
          const selected = data.priorities.includes(priority.value);
          const disabled = !selected && data.priorities.length >= 5;

          return (
            <button
              key={priority.value}
              type="button"
              aria-pressed={selected}
              disabled={disabled}
              onClick={() => togglePriority(priority.value)}
              className={`flex min-h-[104px] items-center gap-4 rounded-2xl border p-5 text-left transition disabled:cursor-not-allowed disabled:opacity-45 ${
                selected
                  ? "border-[#B58A2A] bg-[#FBF2D8]"
                  : "border-[#D8D2C4] bg-white hover:border-[#B58A2A]"
              }`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                  selected
                    ? "bg-[#0B1F3A] text-[#E5BF5A]"
                    : "bg-[#F2EBDD] text-[#657082]"
                }`}
              >
                0{index + 1}
              </span>
              <span>
                <span className="block text-sm font-extrabold text-[#0B1F3A]">
                  {priority.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-[#657082]">
                  {priority.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${
                  selected
                    ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                    : "border-[#CFC7B8] text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlanSummary({
  countries,
  completion,
  data,
}: {
  countries: OnboardingCountry[];
  completion: number;
  data: TgpiOnboardingData;
}) {
  const selectedCountries = data.targetCountries
    .map((slug) => countries.find((country) => country.slug === slug))
    .filter((country): country is OnboardingCountry => Boolean(country));

  return (
    <aside className="h-fit overflow-hidden rounded-[28px] bg-[#0B1F3A] text-white shadow-[0_24px_65px_rgba(11,31,58,0.18)] xl:sticky xl:top-28">
      <div className="relative border-b border-white/10 p-7">
        <div aria-hidden="true" className="absolute -right-10 -top-14 h-36 w-36 rounded-full border border-[#E5BF5A]/25" />
        <div aria-hidden="true" className="absolute right-8 top-9 h-16 w-16 rounded-full border border-[#E5BF5A]/20" />
        <p className="relative text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#F0D58C]">
          Your global plan
        </p>
        <h2 className="relative mt-4 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-tight">
          A view designed for you.
        </h2>
        <div className="relative mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#C7D0DC]">
            <span>Plan completion</span>
            <span>{completion}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#E5BF5A] transition-[width] duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      <dl className="grid gap-0 p-7">
        <SummaryItem
          label="Primary goal"
          value={data.primaryGoal ? goalLabels[data.primaryGoal] : "Waiting for your choice"}
        />
        <SummaryItem
          label="Countries of interest"
          value={
            selectedCountries.length > 0
              ? selectedCountries.map((country) => `${country.emoji} ${country.name}`).join(", ")
              : "No countries selected"
          }
        />
        <SummaryItem
          label="Timeline"
          value={data.timeHorizon ? timeLabels[data.timeHorizon] : "Not defined yet"}
        />
        <SummaryItem
          label="Priorities"
          value={
            data.priorities.length > 0
              ? data.priorities.map((priority) => priorityLabels[priority]).join(", ")
              : "Set in the final step"
          }
          last
        />
      </dl>

      <div className="border-t border-white/10 bg-white/[0.035] px-7 py-5">
        <p className="flex gap-3 text-xs leading-5 text-[#C7D0DC]">
          <span className="mt-0.5 text-[#E5BF5A]" aria-hidden="true">
            <OnboardingIcon name="lock" />
          </span>
          Your plan guides your experience. It does not replace legal, immigration, or financial advice.
        </p>
      </div>
    </aside>
  );
}

function StepHeading({
  aside,
  description,
  eyebrow,
  title,
}: {
  aside?: string;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-2xl">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.23em] text-[#956A13]">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[2.7rem]">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#657082]">{description}</p>
      </div>
      {aside ? (
        <span className="rounded-full border border-[#D8D2C4] bg-white px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#657082]">
          {aside}
        </span>
      ) : null}
    </div>
  );
}

function OptionCard({
  detail,
  label,
  onClick,
  selected,
}: {
  detail: string;
  label: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex min-h-[100px] items-start gap-3 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-[#B58A2A] bg-[#FBF2D8]"
          : "border-[#D8D2C4] bg-white hover:border-[#B58A2A]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${
          selected
            ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
            : "border-[#CFC7B8] text-transparent"
        }`}
      >
        ✓
      </span>
      <span>
        <span className="block text-sm font-extrabold text-[#0B1F3A]">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-[#657082]">{detail}</span>
      </span>
    </button>
  );
}

function SummaryItem({
  label,
  last = false,
  value,
}: {
  label: string;
  last?: boolean;
  value: string;
}) {
  return (
    <div className={last ? "py-4" : "border-b border-white/10 py-4"}>
      <dt className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#8FA1B5]">{label}</dt>
      <dd className="mt-2 text-sm font-bold leading-6 text-white">{value}</dd>
    </div>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  return (
    <span
      aria-live="polite"
      className={`inline-flex shrink-0 items-center gap-2 font-bold ${
        status === "error" ? "text-[#9F2F2F]" : "text-[#657082]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          status === "saved"
            ? "bg-[#277352]"
            : status === "saving"
              ? "animate-pulse bg-[#B58A2A]"
              : "bg-[#9F2F2F]"
          }`}
      />
      <span className={status === "saved" ? "inline" : "hidden"}>
        Progress saved
      </span>
      <span className={status === "saving" ? "inline" : "hidden"}>
        Saving...
      </span>
      <span className={status === "error" ? "inline" : "hidden"}>
        Unable to save
      </span>
    </span>
  );
}

function getStepValidationMessage(step: number, data: TgpiOnboardingData) {
  if (step === 1 && !data.primaryGoal) return "Choose your primary goal to continue.";
  if (step === 2 && data.targetCountries.length === 0) return "Select at least one country of interest.";
  if (step === 3 && (!data.timeHorizon || !data.budgetRange)) return "Choose a timeline and budget range for your plan.";
  if (step === 4 && (data.languages.length === 0 || !data.internationalExperience)) return "Select at least one language and your international experience.";
  if (step === 5 && data.priorities.length < 3) return "Choose at least three priorities to complete your plan.";
  return "";
}

function isStepValid(step: number, data: TgpiOnboardingData) {
  return getStepValidationMessage(step, data) === "";
}

function getCompletion(data: TgpiOnboardingData) {
  const completedSteps = steps.filter((step) => isStepValid(step.number, data)).length;
  return completedSteps * 20;
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

type IconName = "compass" | "globe" | "home" | "lock" | "search" | "study" | "work";

function OnboardingIcon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    height: 20,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
    width: 20,
  };

  if (name === "home") return <svg {...common}><path d="m3 11 9-7 9 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M9.5 20v-6h5v6" /></svg>;
  if (name === "study") return <svg {...common}><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 12v4.5c2.7 2 7.3 2 10 0V12" /><path d="M21 9v6" /></svg>;
  if (name === "work") return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2" /></svg>;
  if (name === "compass") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>;
  if (name === "globe") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.1 3 14.9 0 18M12 3c-3 3.1-3 14.9 0 18" /></svg>;
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
  return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
}
