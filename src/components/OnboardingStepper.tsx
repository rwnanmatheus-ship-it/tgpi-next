type OnboardingStepperProps = {
  currentStep: number;
};

const steps = [
  "Choose destination",
  "Define your intent",
  "Activate your profile",
];

export default function OnboardingStepper({
  currentStep,
}: OnboardingStepperProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = currentStep === stepNumber;
          const complete = currentStep > stepNumber;

          return (
            <div
              key={step}
              className={`rounded-2xl border p-5 ${
                active
                  ? "border-yellow-500 bg-yellow-500/10"
                  : complete
                  ? "border-emerald-500/20 bg-emerald-500/10"
                  : "border-slate-800 bg-slate-950"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Step {stepNumber}
              </p>
              <p className="mt-2 text-lg font-bold text-white">{step}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}