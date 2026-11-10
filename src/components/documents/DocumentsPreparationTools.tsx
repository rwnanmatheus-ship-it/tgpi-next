"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import CinematicImage from "@/components/ui/CinematicImage";
import { documentWindowDays } from "@/lib/documents-os";

const questions = [
  {
    title: "Translation and accepted language",
    detail: "Ask the receiving institution which language, translator qualifications and delivery format it accepts. Check how it wants names, dates, seals and attachments to appear.",
  },
  {
    title: "Apostille or legalization",
    detail: "Ask the receiving authority whether the original, a copy or the translation needs authentication. Confirm the sequence with the competent authorities before paying.",
  },
  {
    title: "Check the final package",
    detail: "Compare your name across records, review issue and expiry dates, and confirm whether the receiver asks for originals, certified copies or digital files.",
  },
];

export default function DocumentsPreparationTools() {
  const { t, locale } = useLocale();
  const submission = useRef<HTMLInputElement>(null);
  const expiry = useRef<HTMLInputElement>(null);
  const [days, setDays] = useState<number | null>(null);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDays(documentWindowDays(expiry.current?.value ?? "", submission.current?.value ?? ""));
  }

  const duration = days === null ? "" : new Intl.NumberFormat(locale, { style: "unit", unit: "day", unitDisplay: "long" }).format(Math.abs(days));

  return (
    <section id="document-tools" className="documents-section" aria-labelledby="documents-tools-title">
      <div className="documents-section-heading">
        <div>
          <p className="documents-eyebrow">{t("Preparation toolkit")}</p>
          <h2 id="documents-tools-title">{t("Review dates and document formats")}</h2>
          <p>{t("Check dates and prepare questions for the organization that will receive your documents.")}</p>
        </div>
      </div>
      <div className="documents-tools-grid">
        <div className="documents-deadline">
          <span className="documents-icon"><NavigationIcon name="target" /></span>
          <h3>{t("Document date calculator")}</h3>
          <p>{t("Compare your planned submission date with the document’s expiry date.")}</p>
          <form onSubmit={calculate} onInput={() => setDays(null)}>
            <div className="documents-dates">
              <label>{t("Planned submission date")}
                <input type="date" ref={submission} max="9999-12-31" required />
              </label>
              <label>{t("Document expiry date")}
                <input type="date" ref={expiry} max="9999-12-31" required />
              </label>
            </div>
            <button className="documents-button" type="submit">{t("Compare dates")}</button>
          </form>
          <p className="documents-date-result" data-result={days === null ? "waiting" : days < 0 ? "past" : days === 0 ? "same" : "future"} role="status">
            {days === null ? t("Enter both dates to compare them.")
              : days === 0 ? t("The document expires on the planned submission date.")
              : days > 0 ? t("Time from submission to expiry is {duration}.", { duration })
              : t("The document expires {duration} before submission.", { duration })}
          </p>
          <p className="documents-tool-note">{t("Dates stay in this tool. Confirm the minimum validity period with the receiving authority.")}</p>
        </div>

        <article className="documents-format-guide">
          <div className="documents-guide-image"><CinematicImage asset="documents-folios" alt="" sizes="(max-width: 960px) 94vw, 600px" position="50% 59%" /></div>
          <div className="documents-guide-content">
            <p className="documents-eyebrow">{t("Before you submit")}</p>
            <h3>{t("Translation and document checks")}</h3>
            <div className="documents-questions">
              {questions.map(({ title, detail }) => <details key={title}><summary>{t(title)}</summary><p>{t(detail)}</p></details>)}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
