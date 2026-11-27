import type { BriefCopy } from "@/lib/comparison-brief";
import type { Locale } from "@/lib/localization/config";

export const briefCopy: Record<Locale, BriefCopy> = {
  en: {
    title: "My decision brief", intro: "Record how each destination meets your needs. Take up to five finalists into your personal plan.",
    open: "Review my destinations", country: "Destination to review", criteria: { budget: "Local budget", documents: "Documents and entry", language: "Language preparation", fit: "Fit with my goal" },
    statuses: { open: "To check", suitable: "Meets my needs", concern: "Concern" },
    next: "Research next", complete: "You have reviewed all four criteria.", select: "Include in my shortlist", shortlist: "My finalists",
    limit: "Choose two to five finalists to open your personal plan.", export: "Download my brief (.txt)", plan: "Open plan with my finalists",
    compare: "Reopen comparison", goal: "Goal", full: "Five finalists selected. Remove one to add another.",
  },
  "pt-BR": {
    title: "Meu resumo de decisão", intro: "Registre como cada destino atende às suas necessidades. Leve até cinco finalistas para o seu plano pessoal.",
    open: "Avaliar meus destinos", country: "Destino para avaliar", criteria: { budget: "Orçamento local", documents: "Documentos e entrada", language: "Preparo no idioma", fit: "Compatibilidade com meu objetivo" },
    statuses: { open: "A verificar", suitable: "Atende ao que preciso", concern: "Ponto de atenção" },
    next: "Próxima pesquisa", complete: "Você avaliou os quatro critérios.", select: "Incluir entre meus finalistas", shortlist: "Meus finalistas",
    limit: "Escolha de dois a cinco finalistas para abrir seu plano pessoal.", export: "Baixar meu resumo (.txt)", plan: "Abrir plano com meus finalistas",
    compare: "Reabrir comparação", goal: "Objetivo", full: "Cinco finalistas selecionados. Remova um para incluir outro.",
  },
  es: {
    title: "Mi informe de decisión", intro: "Anota cómo responde cada destino a tus necesidades. Lleva hasta cinco finalistas a tu plan personal.",
    open: "Evaluar mis destinos", country: "Destino que evaluar", criteria: { budget: "Presupuesto local", documents: "Documentos y entrada", language: "Preparación lingüística", fit: "Afinidad con mi objetivo" },
    statuses: { open: "Por comprobar", suitable: "Cumple mis requisitos", concern: "Me preocupa" },
    next: "Próxima investigación", complete: "Has revisado los cuatro criterios.", select: "Incluir entre mis finalistas", shortlist: "Mis finalistas",
    limit: "Elige de dos a cinco finalistas para abrir tu plan personal.", export: "Descargar mi informe (.txt)", plan: "Abrir el plan con mis finalistas",
    compare: "Volver a la comparación", goal: "Objetivo", full: "Has elegido cinco finalistas. Quita uno para añadir otro.",
  },
  fr: {
    title: "Ma fiche de décision", intro: "Évaluez chaque destination selon vos besoins. Retenez jusqu’à cinq destinations pour votre projet personnel.",
    open: "Évaluer mes destinations", country: "Destination à évaluer", criteria: { budget: "Budget sur place", documents: "Documents et entrée", language: "Préparation linguistique", fit: "Adéquation à mon objectif" },
    statuses: { open: "À vérifier", suitable: "Correspond à mes besoins", concern: "Point de vigilance" },
    next: "Prochaine vérification", complete: "Vous avez examiné les quatre critères.", select: "Ajouter à ma sélection", shortlist: "Ma sélection",
    limit: "Sélectionnez deux à cinq destinations pour ouvrir votre projet personnel.", export: "Télécharger ma fiche (.txt)", plan: "Ouvrir le projet avec ma sélection",
    compare: "Rouvrir la comparaison", goal: "Objectif", full: "Cinq destinations sélectionnées. Retirez-en une pour en ajouter une autre.",
  },
  de: {
    title: "Meine Entscheidungshilfe", intro: "Prüfen Sie, wie jedes Ziel zu Ihren Bedürfnissen passt. Übernehmen Sie bis zu fünf Favoriten in Ihren persönlichen Plan.",
    open: "Meine Ziele prüfen", country: "Reiseziel zur Prüfung", criteria: { budget: "Budget vor Ort", documents: "Dokumente und Einreise", language: "Sprachliche Vorbereitung", fit: "Eignung für mein Vorhaben" },
    statuses: { open: "Noch zu prüfen", suitable: "Erfüllt meine Anforderungen", concern: "Bedenken" },
    next: "Als Nächstes prüfen", complete: "Sie haben alle vier Kriterien geprüft.", select: "In meine Auswahl aufnehmen", shortlist: "Meine Favoriten",
    limit: "Wählen Sie zwei bis fünf Favoriten, um Ihren persönlichen Plan zu öffnen.", export: "Übersicht herunterladen (.txt)", plan: "Plan mit meinen Favoriten öffnen",
    compare: "Vergleich erneut öffnen", goal: "Ziel", full: "Fünf Favoriten ausgewählt. Entfernen Sie einen, um einen weiteren hinzuzufügen.",
  },
  it: {
    title: "La mia scheda di scelta", intro: "Valuta ogni destinazione secondo le tue esigenze. Porta fino a cinque finaliste nel tuo piano personale.",
    open: "Valuta le mie destinazioni", country: "Destinazione da valutare", criteria: { budget: "Budget locale", documents: "Documenti e ingresso", language: "Preparazione linguistica", fit: "Coerenza con il mio obiettivo" },
    statuses: { open: "Da verificare", suitable: "Soddisfa le mie esigenze", concern: "Criticità" },
    next: "Prossima verifica", complete: "Hai esaminato tutti e quattro i criteri.", select: "Includi tra le mie finaliste", shortlist: "Le mie finaliste",
    limit: "Scegli da due a cinque finaliste per aprire il piano personale.", export: "Scarica la mia scheda (.txt)", plan: "Apri il piano con le mie finaliste",
    compare: "Riapri il confronto", goal: "Obiettivo", full: "Hai selezionato cinque finaliste. Rimuovine una per aggiungerne un’altra.",
  },
};
