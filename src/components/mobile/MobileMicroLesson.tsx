"use client";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";

import Link from "next/link";
import { useState } from "react";
import MobileIcon from "./MobileIcon";
import { LocalizedText } from "@/components/localization/LocaleProvider";


const scenarios = [
  { scene: "At your new workplace", question: "You missed part of an instruction. What would you say?", options: ["Could you walk me through that again?", "You need to speak properly.", "I will pretend I understood."], answer: 0, explanation: "“Walk me through” asks for a step-by-step explanation. It is clear, respectful and useful when you need to confirm a task." },
  { scene: "Before viewing an apartment", question: "Which question helps you understand the full monthly cost?", options: ["Does the apartment look modern?", "Are utilities included in the rent?", "Is this a popular neighbourhood?"], answer: 1, explanation: "“Utilities” usually refers to services such as electricity, water and heating. Ask which services are included, then confirm the details in writing." },
  { scene: "Making an international decision", question: "Two cities have different rents and salaries. What is the useful next step?", options: ["Choose the lowest rent immediately.", "Compare only the skyline.", "Compare a full budget in the same currency and period."], answer: 2, explanation: "Compare like with like: the same currency, time period and household needs. A single price cannot tell you whether a city fits your plan." },
] as const;

export default function MobileMicroLesson() {
  const { t: localizeLabel } = useInterfaceLocale();

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [complete, setComplete] = useState(false);
  const scenario = scenarios[step];

  return <section className="tgpi-mobile mobile-practice" aria-labelledby="mobile-practice-title">
    <div className="mobile-section-topline"><span className="mobile-eyebrow"><LocalizedText text={"LEARN SOMETHING USEFUL"} /></span><span className="mobile-small">{complete ? <LocalizedText text={"Complete"} /> : <LocalizedText text={"{value0} / {value1}"} values={{value0: String(step + 1), value1: String(scenarios.length)}} />}</span></div>
    <h2 id="mobile-practice-title"><LocalizedText text={"A small lesson. A real advantage."} /></h2>
    {complete ? <div className="mobile-practice-complete" role="status"><span className="mobile-success-icon"><MobileIcon name="check" /></span><h3><LocalizedText text={"Three moments. Better prepared."} /></h3><p><LocalizedText text={"Take these questions into your next conversation, viewing or country comparison."} /></p><Link href="/courses" className="mobile-primary-button"><LocalizedText text="Explore TGPI Learning" />{" "}<MobileIcon name="arrow" /></Link><button type="button" className="mobile-text-link" onClick={() => { setStep(0); setSelected(null); setComplete(false); }}><LocalizedText text={"Practice again"} /></button></div> : <>
      <p className="mobile-scenario-label"><LocalizedText text={scenario.scene} /></p><h3><LocalizedText text={scenario.question} /></h3>
      <div className="mobile-answer-options" role="group" aria-label={localizeLabel("Choose your response")}>{scenario.options.map((option, index) => <button type="button" key={option} aria-pressed={selected === index} data-answer={selected === null ? undefined : index === scenario.answer ? "correct" : selected === index ? "retry" : undefined} onClick={() => setSelected(index)}><span>{String.fromCharCode(65 + index)}</span>{step < 2 ? <span lang="en" translate="no">{option}</span> : <LocalizedText text={option} />}</button>)}</div>
      {selected !== null && <div className="mobile-answer-feedback" role="status"><strong>{selected === scenario.answer ? <LocalizedText text={"Exactly. Here’s why."} /> : <LocalizedText text={"A stronger choice is highlighted."} />}</strong><p><LocalizedText text={scenario.explanation} /></p><button type="button" className="mobile-text-link" onClick={() => { if (step === scenarios.length - 1) setComplete(true); else { setStep((value) => value + 1); setSelected(null); } }}>{step === scenarios.length - 1 ? <LocalizedText text={"Finish practice"} /> : <LocalizedText text={"Next scenario"} />}<MobileIcon name="arrow" /></button></div>}
    </>}
    <p className="mobile-practice-note"><LocalizedText text={"Practice preview · no account needed · not course credit"} /></p>
  </section>;
}
