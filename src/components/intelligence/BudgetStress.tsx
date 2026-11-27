"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import { sendClientFunnelEvent } from "@/lib/funnel.client";
import { simulateBudget } from "@/lib/intelligence/budget-stress";
import { formatMoney } from "@/lib/intelligence/dossiers";
import type { ResearchWorksheet } from "@/lib/intelligence/research-plan";

const copy = {
  en: ["Test a change in your budget", "Rent increase", "Additional months", "Current budget", "Simulated budget", "Additional cost", "Complete the cost fields to compare totals. Tuition and arrival costs stay fixed."],
  "pt-BR": ["Simule uma mudança no orçamento", "Aumento do aluguel", "Meses adicionais", "Orçamento atual", "Orçamento simulado", "Custo adicional", "Preencha os custos para comparar os totais. Os valores de ensino e chegada ficam fixos."],
  es: ["Simula un cambio de presupuesto", "Aumento del alquiler", "Meses adicionales", "Presupuesto actual", "Presupuesto simulado", "Coste adicional", "Completa los costes para comparar los totales. La matrícula y los gastos de llegada se mantienen fijos."],
  fr: ["Simuler une variation du budget", "Hausse du loyer", "Mois supplémentaires", "Budget actuel", "Budget simulé", "Surcoût", "Renseignez les coûts pour comparer les totaux. Les frais de scolarité et d’arrivée restent fixes."],
  de: ["Budgetänderung simulieren", "Mieterhöhung", "Zusätzliche Monate", "Aktuelles Budget", "Simuliertes Budget", "Mehrkosten", "Tragen Sie die Kosten ein, um die Summen zu vergleichen. Studiengebühren und Anreisekosten bleiben gleich."],
  it: ["Simula una variazione del budget", "Aumento dell’affitto", "Mesi aggiuntivi", "Budget attuale", "Budget simulato", "Costo aggiuntivo", "Compila i costi per confrontare i totali. Le spese di iscrizione e di arrivo restano fisse."],
};

export default function BudgetStress({ plan, valid }: { plan: ResearchWorksheet; valid: boolean }) {
  const { locale } = useLocale();
  const labels = copy[locale];
  const [increase, setIncrease] = useState(10);
  const [extension, setExtension] = useState(0);
  const maxExtra = Math.max(0, Math.min(12, 60 - plan.months));
  const months = Math.min(extension, maxExtra);
  const result = valid ? simulateBudget(plan, increase, months) : null;
  const [open, setOpen] = useState(false);
  const counted = useRef(false);
  const available = result !== null;
  useEffect(() => {
    if (open && available && !counted.current) counted.current = sendClientFunnelEvent("budget_simulation_viewed");
  }, [open, available]);

  return <details className="ig-details" onToggle={event => setOpen(event.currentTarget.open)}>
    <summary>{labels[0]}</summary>
    <p className="ig-small">{labels[6]}</p>
    <div className="ig-form-grid">
      <label>{labels[1]}<select value={increase} onChange={event => setIncrease(Number(event.target.value))}>
        {[0, 5, 10, 15, 20, 30, 50].map(value => <option key={value} value={value}>{value}%</option>)}
      </select></label>
      <label>{labels[2]}<select value={months} onChange={event => setExtension(Number(event.target.value))}>
        {Array.from({ length: Math.floor(maxExtra) + 1 }, (_, value) => <option key={value} value={value}>{value}</option>)}
      </select></label>
    </div>
    {result && <dl className="ig-form-grid" aria-live="polite">
      {[result.baseline, result.revised, result.difference].map((value, index) =>
        <div key={labels[3 + index]}><dt>{labels[3 + index]}</dt><dd><strong>{formatMoney(value, plan.currency, locale)}</strong></dd></div>)}
    </dl>}
  </details>;
}
