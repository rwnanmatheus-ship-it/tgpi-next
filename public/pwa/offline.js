/* This dependency is precached alongside offline.html. It reads only the display language. */
const translations = {
  en: {
    status: "Connection paused",
    title: "You are offline",
    description: "Reconnect to return to the page you were viewing.",
    privacy: "TGPI does not store private workspace pages for offline access.",
    retry: "Try again",
    home: "Open TGPI home",
  },
  "pt-BR": {
    status: "Conexão interrompida",
    title: "Você está offline",
    description: "Reconecte-se para voltar à página que você estava usando.",
    privacy: "A TGPI não armazena páginas privadas do Workspace para acesso offline.",
    retry: "Tentar novamente",
    home: "Abrir a página inicial da TGPI",
  },
  es: {
    status: "Conexión interrumpida",
    title: "Estás sin conexión",
    description: "Vuelve a conectarte para regresar a la página que estabas consultando.",
    privacy: "TGPI no guarda las páginas privadas del espacio de trabajo para acceder sin conexión.",
    retry: "Volver a intentar",
    home: "Abrir el inicio de TGPI",
  },
  fr: {
    status: "Connexion interrompue",
    title: "Vous êtes hors ligne",
    description: "Reconnectez-vous pour revenir à la page que vous consultiez.",
    privacy: "TGPI ne stocke pas les pages privées de l’espace de travail pour un accès hors ligne.",
    retry: "Réessayer",
    home: "Ouvrir l’accueil de TGPI",
  },
  de: {
    status: "Verbindung unterbrochen",
    title: "Sie sind offline",
    description: "Stellen Sie die Verbindung wieder her, um zur vorherigen Seite zurückzukehren.",
    privacy: "TGPI speichert keine privaten Arbeitsbereichsseiten für den Offlinezugriff.",
    retry: "Erneut versuchen",
    home: "TGPI-Startseite öffnen",
  },
  it: {
    status: "Connessione interrotta",
    title: "Sei offline",
    description: "Riconnettiti per tornare alla pagina che stavi consultando.",
    privacy: "TGPI non salva le pagine private dell’area di lavoro per l’accesso offline.",
    retry: "Riprova",
    home: "Apri la pagina iniziale di TGPI",
  },
};

function getOfflineLocale() {
  try {
    const saved = localStorage.getItem("tgpi:locale:offline");
    if (saved && Object.hasOwn(translations, saved)) return saved;
  } catch {
    // Storage may be unavailable in a private browsing context.
  }

  for (const language of navigator.languages ?? [navigator.language]) {
    const primary = language?.toLowerCase().split("-")[0];
    const locale = primary === "pt" ? "pt-BR" : primary;
    if (locale && Object.hasOwn(translations, locale)) return locale;
  }
  return "en";
}

const locale = getOfflineLocale();
const copy = translations[locale];
document.documentElement.lang = locale;
document.title = `${copy.status} — TGPI`;
for (const [selector, message] of Object.entries({
  ".eyebrow": copy.status,
  h1: copy.title,
  ".description": copy.description,
  ".privacy": copy.privacy,
  "#retry": copy.retry,
  ".secondary": copy.home,
})) {
  document.querySelector(selector).textContent = message;
}

// The worker returns this document at the failed navigation URL. Retry that
// exact GET instead of sending the user to a different tool or losing filters.
if (location.pathname !== "/offline.html") {
  const retry = document.getElementById("retry");
  retry.href = location.href;
  retry.addEventListener("click", (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    location.reload();
  });
}
