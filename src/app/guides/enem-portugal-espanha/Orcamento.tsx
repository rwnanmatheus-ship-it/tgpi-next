"use client";

import { useState } from "react";
import { budgetTotals, readBudgetField, type BudgetDraft, type BudgetKey } from "./calcular-orcamento";
import styles from "./orcamento.module.css";

const copy = {
  title: "Quanto custaria concluir cada graduação?",
  intro: "Use valores em euros que você encontrou para o seu curso e a sua cidade. Some aluguel, alimentação, transporte e outras despesas mensais em um único valor. Separe os gastos pagos uma só vez, como taxa de candidatura e viagem de ida.",
  format: "Preencha cada campo. Use 0 quando uma despesa não se aplicar. Para os preços, você pode escrever, por exemplo, 1.250,50.",
  formula: "Custo anual recorrente = anuidade + (despesa mensal × meses por ano). Custo do curso inteiro = (custo anual recorrente × anos de estudo) + despesas iniciais.",
  assumptions: "A estimativa repete os preços informados ao longo do curso. Inclua apenas os valores que pretende comparar. Se pagar aluguel nas férias, conte esses meses. Inflação e variação cambial ficam fora da conta.",
  coimbra: "ISEC · Coimbra", madrid: "UC3M · Madri",
  annual: "Custo anual recorrente", total: "Custo do curso inteiro",
  pending: "Preencha os campos para ver a estimativa.",
  overflow: "Revise os valores: o total ultrapassa o limite da calculadora.",
  difference: "Diferença no curso inteiro",
  equal: "Os dois cenários têm o mesmo custo total.",
  lower: " a menos em ", forYourInputs: ", com os valores informados.",
  invalidMoney: "Informe um preço válido em euros, com até duas casas decimais.",
  manual: "Sem JavaScript, use a fórmula acima na ficha gratuita disponível neste guia.",
};

const fields: ReadonlyArray<{ key: BudgetKey; label: string; error: string; inputMode: "decimal" | "numeric" }> = [
  { key: "tuition", label: "Anuidade do curso (€)", error: copy.invalidMoney, inputMode: "decimal" },
  { key: "living", label: "Despesas por mês (€)", error: copy.invalidMoney, inputMode: "decimal" },
  { key: "months", label: "Meses de despesas por ano", error: "Informe de 1 a 12 meses inteiros.", inputMode: "numeric" },
  { key: "years", label: "Anos de estudo", error: "Informe de 1 a 20 anos inteiros.", inputMode: "numeric" },
  { key: "initial", label: "Despesas iniciais, uma só vez (€)", error: copy.invalidMoney, inputMode: "decimal" },
];

const formatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" });
const formatCents = (cents: number) => formatter.format(cents / 100);
const blankDraft = (years: string): BudgetDraft => ({ tuition: "", living: "", months: "", years, initial: "" });

function CourseBudget({ title, id, draft, change }: {
  title: string; id: string; draft: BudgetDraft; change: (draft: BudgetDraft) => void;
}) {
  const totals = budgetTotals(draft);
  const complete = fields.every(({ key }) => readBudgetField(key, draft[key]) !== null);
  return <fieldset className={styles.card}>
    <legend>{title}</legend>
    {fields.map(({ key, label, error, inputMode }) => {
      const invalid = draft[key] !== "" && readBudgetField(key, draft[key]) === null;
      const inputId = `${id}-${key}`;
      return <div key={key} className={styles.field}>
        <label htmlFor={inputId}>{label}</label>
        <input id={inputId} type="text" inputMode={inputMode} maxLength={14}
          autoComplete="off" value={draft[key]} aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${inputId}-error` : undefined}
          onChange={event => change({ ...draft, [key]: event.currentTarget.value })} />
        {invalid && <small id={`${inputId}-error`} className={styles.error}>{error}</small>}
      </div>;
    })}
    <div className={styles.totals} aria-live="polite" aria-atomic="true">
      {totals ? <dl>
        <dt>{copy.annual}</dt><dd>{formatCents(totals.recurringAnnualCents)}</dd>
        <dt>{copy.total}</dt><dd>{formatCents(totals.fullCourseCents)}</dd>
      </dl> : <span>{complete ? copy.overflow : copy.pending}</span>}
    </div>
  </fieldset>;
}

export default function Orcamento() {
  const [coimbra, setCoimbra] = useState(() => blankDraft("3"));
  const [madrid, setMadrid] = useState(() => blankDraft("4"));
  const left = budgetTotals(coimbra);
  const right = budgetTotals(madrid);
  const delta = left && right ? left.fullCourseCents - right.fullCourseCents : null;

  return <section id="orcamento" className={`guides-section ${styles.panel}`} aria-labelledby="orcamento-titulo">
    <h2 id="orcamento-titulo">{copy.title}</h2>
    <p>{copy.intro}</p>
    <p className={styles.hint}>{copy.format}</p>
    <div className={styles.grid}>
      <CourseBudget title={copy.coimbra} id="orcamento-coimbra" draft={coimbra} change={setCoimbra} />
      <CourseBudget title={copy.madrid} id="orcamento-madri" draft={madrid} change={setMadrid} />
    </div>
    <div aria-live="polite" aria-atomic="true">
      {delta !== null && <p className={styles.comparison}>
        <strong>{copy.difference}</strong>
        <span>{delta === 0 ? copy.equal : formatCents(Math.abs(delta)) + copy.lower + (delta < 0 ? "Coimbra" : "Madri") + copy.forYourInputs}</span>
      </p>}
    </div>
    <p className={styles.hint}>{copy.formula}</p>
    <p className={styles.hint}>{copy.assumptions}</p>
    <noscript><p>{copy.manual}</p></noscript>
  </section>;
}
