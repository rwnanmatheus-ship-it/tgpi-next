import type { Locale } from '@/lib/localization/config';

export const atlasFreeCopy = {
  en: {
    label: 'FREE ACCESS',
    banner: 'Up to 10 requests per day, subject to shared availability. No subscription or wallet top-up is required. You will not be charged automatically.',
    privacy: 'This conversation stays in this page and is cleared when it closes or reloads. TGPI does not save its messages or drafts. Your messages and any profile fields you choose to share are processed by OpenAI; provider retention may differ. TGPI keeps only your latest usage counters and request identifiers for abuse prevention.',
    exhausted: 'The free allowance is currently exhausted. Please try again later. No credits were charged.',
    unavailable: 'Free access is temporarily unavailable. Please try again later. No credits were charged.',
    temporary: 'Temporary conversations · no saved history',
  },
  'pt-BR': {
    label: 'ACESSO GRATUITO',
    banner: 'Até 10 solicitações por dia, conforme a disponibilidade compartilhada. Sem assinatura ou recarga de carteira. Não haverá cobrança automática.',
    privacy: 'Esta conversa fica nesta página e é apagada ao fechar ou recarregar. A TGPI não salva suas mensagens nem rascunhos. Suas mensagens e os campos do perfil que você optar por compartilhar são processados pela OpenAI; a retenção do provedor pode ser diferente. A TGPI guarda apenas os últimos contadores de uso e identificadores de solicitações para prevenir abusos.',
    exhausted: 'A franquia gratuita está esgotada no momento. Tente novamente mais tarde. Nenhum crédito foi cobrado.',
    unavailable: 'O acesso gratuito está temporariamente indisponível. Tente novamente mais tarde. Nenhum crédito foi cobrado.',
    temporary: 'Conversas temporárias · sem histórico salvo',
  },
  es: {
    label: 'ACCESO GRATUITO',
    banner: 'Hasta 10 solicitudes al día, según la disponibilidad compartida. Sin suscripción ni recarga de cartera. No se realizarán cobros automáticos.',
    privacy: 'Esta conversación permanece en esta página y se borra al cerrarla o recargarla. TGPI no guarda sus mensajes ni borradores. OpenAI procesa los mensajes y los campos del perfil que decidas compartir; su retención puede ser diferente. TGPI conserva únicamente los últimos contadores de uso e identificadores de solicitudes para prevenir abusos.',
    exhausted: 'La cuota gratuita está agotada. Inténtalo más tarde. No se han cobrado créditos.',
    unavailable: 'El acceso gratuito no está disponible temporalmente. Inténtalo más tarde. No se han cobrado créditos.',
    temporary: 'Conversaciones temporales · sin historial guardado',
  },
  fr: {
    label: 'ACCÈS GRATUIT',
    banner: 'Jusqu’à 10 demandes par jour, selon la disponibilité partagée. Aucun abonnement ni rechargement requis. Aucun prélèvement automatique.',
    privacy: 'Cette conversation reste sur cette page et disparaît à sa fermeture ou à son rechargement. TGPI n’enregistre ni messages ni brouillons. OpenAI traite vos messages et les champs de profil que vous choisissez de partager ; sa conservation peut différer. TGPI conserve uniquement les derniers compteurs et identifiants de demandes pour prévenir les abus.',
    exhausted: 'Le quota gratuit est épuisé. Réessayez plus tard. Aucun crédit n’a été débité.',
    unavailable: 'L’accès gratuit est temporairement indisponible. Réessayez plus tard. Aucun crédit n’a été débité.',
    temporary: 'Conversations temporaires · aucun historique enregistré',
  },
  de: {
    label: 'KOSTENLOSER ZUGANG',
    banner: 'Bis zu 10 Anfragen pro Tag, abhängig von der gemeinsamen Verfügbarkeit. Kein Abo und keine Aufladung erforderlich. Keine automatische Abbuchung.',
    privacy: 'Dieses Gespräch bleibt auf dieser Seite und wird beim Schließen oder Neuladen gelöscht. TGPI speichert keine Nachrichten oder Entwürfe. OpenAI verarbeitet Nachrichten und freiwillig geteilte Profilfelder; die Aufbewahrung kann abweichen. TGPI speichert nur die letzten Nutzungszähler und Anfragekennungen zur Missbrauchsprävention.',
    exhausted: 'Das kostenlose Kontingent ist ausgeschöpft. Versuche es später erneut. Es wurde kein Guthaben abgebucht.',
    unavailable: 'Der kostenlose Zugang ist vorübergehend nicht verfügbar. Versuche es später erneut. Es wurde kein Guthaben abgebucht.',
    temporary: 'Temporäre Gespräche · kein gespeicherter Verlauf',
  },
  it: {
    label: 'ACCESSO GRATUITO',
    banner: 'Fino a 10 richieste al giorno, in base alla disponibilità condivisa. Nessun abbonamento o ricarica richiesto. Nessun addebito automatico.',
    privacy: 'Questa conversazione rimane nella pagina e viene cancellata alla chiusura o al ricaricamento. TGPI non salva messaggi o bozze. OpenAI elabora i messaggi e i campi del profilo che scegli di condividere; la conservazione può variare. TGPI conserva soltanto gli ultimi contatori di utilizzo e identificativi delle richieste per prevenire abusi.',
    exhausted: 'La quota gratuita è esaurita. Riprova più tardi. Nessun credito addebitato.',
    unavailable: 'L’accesso gratuito è temporaneamente indisponibile. Riprova più tardi. Nessun credito addebitato.',
    temporary: 'Conversazioni temporanee · nessuna cronologia salvata',
  },
} satisfies Record<Locale, { label: string; banner: string; privacy: string; exhausted: string; unavailable: string; temporary: string }>;
