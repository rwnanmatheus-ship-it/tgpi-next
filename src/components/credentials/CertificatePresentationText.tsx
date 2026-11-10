"use client";

import { useLocale } from "@/components/localization/LocaleProvider";
import { certificateDate } from "@/lib/certificate-presentation";
import type { Locale } from "@/lib/localization/config";

const privacyCopy: Record<Locale, { title: string; detail: string }> = {
  en: { title: "Holder-controlled access", detail: "Private until shared by holder" },
  "pt-BR": { title: "Acesso controlado pelo titular", detail: "Privado até o titular compartilhar" },
  es: { title: "Acceso controlado por el titular", detail: "Privado hasta que el titular lo comparta" },
  fr: { title: "Accès contrôlé par le titulaire", detail: "Privé jusqu'au partage par le titulaire" },
  de: { title: "Zugriff durch Inhaber verwaltet", detail: "Privat bis zur Freigabe durch den Inhaber" },
  it: { title: "Accesso controllato dal titolare", detail: "Privato fino alla condivisione del titolare" },
};

export function CertificatePrivacyText({ detail = false }: { detail?: boolean }) {
  const { locale } = useLocale();
  return <>{privacyCopy[locale][detail ? "detail" : "title"]}</>;
}

export function CertificateIssueDate({ value }: { value: string }) {
  const { locale } = useLocale();
  return <>{certificateDate(value, locale)}</>;
}
