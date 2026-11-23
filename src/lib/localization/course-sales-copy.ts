import type { Locale } from './config';

type CourseSalesCopy = {
  title: string; emphasis: string; intro: string; explore: string; free: string;
  premium: string; premiumTitle: string; premiumDescription: string; month: string;
  billing: string; all: string; freeCourses: string; premiumCourses: string;
  freeCourse: string; outline: string; included: string; proof: readonly string[];
};

const copy: Record<Locale, CourseSalesCopy> = {
  'pt-BR': {
    title: 'Seu próximo capítulo', emphasis: 'começa com conhecimento.',
    intro: 'Idiomas, carreira e habilidades práticas para transformar o que você aprende no que você pode fazer.',
    explore: 'Encontrar meu próximo curso', free: 'Começar gratuitamente', premium: 'Conhecer o Premium',
    premiumTitle: 'Mais possibilidades. Uma assinatura.', premiumDescription: 'Catálogo completo, avaliações e certificados conforme os critérios de cada curso.',
    month: '/mês', billing: 'Assinatura mensal em dólares. Renovação automática até o cancelamento.',
    all: 'Todos os cursos', freeCourses: 'Cursos gratuitos', premiumCourses: 'Cursos Premium',
    freeCourse: 'Ver curso gratuito', outline: 'Ver conteúdo do curso', included: 'Incluído no Premium',
    proof: ['Aprendizado prático', 'Progresso salvo na sua conta', 'Critérios de certificação claros'],
  },
  en: {
    title: 'Your next chapter', emphasis: 'starts with knowledge.',
    intro: 'Languages, career skills and practical learning to turn what you know into what you can do.',
    explore: 'Find my next course', free: 'Start for free', premium: 'Explore Premium',
    premiumTitle: 'More possibilities. One membership.', premiumDescription: 'The full catalog, assessments and certificates subject to each course’s requirements.',
    month: '/month', billing: 'Monthly subscription in US dollars. Renews automatically until canceled.',
    all: 'All courses', freeCourses: 'Free courses', premiumCourses: 'Premium courses',
    freeCourse: 'Explore free course', outline: 'View course content', included: 'Included in Premium',
    proof: ['Practical learning', 'Progress saved to your account', 'Clear certificate requirements'],
  },
  es: {
    title: 'Tu próximo capítulo', emphasis: 'empieza con conocimiento.',
    intro: 'Idiomas, carrera y habilidades prácticas para transformar lo que aprendes en lo que puedes hacer.',
    explore: 'Encontrar mi próximo curso', free: 'Empezar gratis', premium: 'Conocer Premium',
    premiumTitle: 'Más posibilidades. Una suscripción.', premiumDescription: 'Catálogo completo, evaluaciones y certificados según los requisitos de cada curso.',
    month: '/mes', billing: 'Suscripción mensual en dólares estadounidenses. Renovación automática hasta la cancelación.',
    all: 'Todos los cursos', freeCourses: 'Cursos gratuitos', premiumCourses: 'Cursos Premium',
    freeCourse: 'Ver curso gratuito', outline: 'Ver contenido del curso', included: 'Incluido en Premium',
    proof: ['Aprendizaje práctico', 'Progreso guardado en tu cuenta', 'Requisitos de certificación claros'],
  },
  fr: {
    title: 'Votre prochain chapitre', emphasis: 'commence par le savoir.',
    intro: 'Langues, carrière et compétences pratiques pour transformer vos connaissances en actions.',
    explore: 'Trouver mon prochain cours', free: 'Commencer gratuitement', premium: 'Découvrir Premium',
    premiumTitle: 'Plus de possibilités. Un abonnement.', premiumDescription: 'Catalogue complet, évaluations et certificats selon les critères de chaque cours.',
    month: '/mois', billing: 'Abonnement mensuel en dollars américains. Renouvellement automatique jusqu’à résiliation.',
    all: 'Tous les cours', freeCourses: 'Cours gratuits', premiumCourses: 'Cours Premium',
    freeCourse: 'Voir le cours gratuit', outline: 'Voir le contenu du cours', included: 'Inclus dans Premium',
    proof: ['Apprentissage pratique', 'Progression enregistrée sur votre compte', 'Critères de certification clairs'],
  },
  de: {
    title: 'Dein nächstes Kapitel', emphasis: 'beginnt mit Wissen.',
    intro: 'Sprachen, Karriere und praktische Fähigkeiten, um Wissen in Handeln umzusetzen.',
    explore: 'Meinen nächsten Kurs finden', free: 'Kostenlos starten', premium: 'Premium entdecken',
    premiumTitle: 'Mehr Möglichkeiten. Ein Abo.', premiumDescription: 'Vollständiger Katalog, Prüfungen und Zertifikate gemäß den Anforderungen jedes Kurses.',
    month: '/Monat', billing: 'Monatsabonnement in US-Dollar. Automatische Verlängerung bis zur Kündigung.',
    all: 'Alle Kurse', freeCourses: 'Kostenlose Kurse', premiumCourses: 'Premium-Kurse',
    freeCourse: 'Kostenlosen Kurs ansehen', outline: 'Kursinhalt ansehen', included: 'In Premium enthalten',
    proof: ['Praktisches Lernen', 'Fortschritt im Konto gespeichert', 'Klare Zertifikatsanforderungen'],
  },
  it: {
    title: 'Il tuo prossimo capitolo', emphasis: 'inizia dalla conoscenza.',
    intro: 'Lingue, carriera e competenze pratiche per trasformare ciò che impari in ciò che sai fare.',
    explore: 'Trova il mio prossimo corso', free: 'Inizia gratuitamente', premium: 'Scopri Premium',
    premiumTitle: 'Più possibilità. Un abbonamento.', premiumDescription: 'Catalogo completo, valutazioni e certificati secondo i requisiti di ogni corso.',
    month: '/mese', billing: 'Abbonamento mensile in dollari statunitensi. Rinnovo automatico fino alla disdetta.',
    all: 'Tutti i corsi', freeCourses: 'Corsi gratuiti', premiumCourses: 'Corsi Premium',
    freeCourse: 'Vedi il corso gratuito', outline: 'Vedi il contenuto del corso', included: 'Incluso in Premium',
    proof: ['Apprendimento pratico', 'Progressi salvati nel tuo account', 'Criteri di certificazione chiari'],
  },
};

export const courseSalesCopy = (locale: Locale): CourseSalesCopy => copy[locale];
