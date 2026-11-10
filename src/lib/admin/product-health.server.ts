import "server-only";

import { requireAdmin } from "@/lib/auth/guards";
import { requireAtlasGeneration } from "@/lib/atlas/http.server";
import { matchesPremiumOffer } from "@/lib/commercial-offer";
import { getCredentialIssuerPublicKey } from "@/lib/credential-signing.server";
import {
  getFirestoreDocuments,
  isFirestoreQuotaError,
  isLearningStorageConfigured,
} from "@/lib/firestore-admin-rest.server";
import { isBaseMainnetAnchorConfigured } from "@/lib/global-key-anchor.server";
import { pushConfigured } from "@/lib/notifications/push.server";
import { getStripeServer, TGPI_PREMIUM_PRICE_ID } from "@/lib/stripe";

type HealthState = "verified" | "configured" | "attention" | "failed";
type CheckResult = { state: HealthState; detail: string };
type Check = {
  id: string;
  title: string;
  source: string;
  run: () => CheckResult | Promise<CheckResult>;
};

const timeoutMs = 4_000;

async function checkStorage(): Promise<CheckResult> {
  if (!isLearningStorageConfigured()) {
    return { state: "attention", detail: "Credenciais de serviço ou confirmação das regras de segurança pendentes." };
  }

  try {
    // A resposta explícita de documento ausente também comprova a leitura.
    // O caminho reservado evita consultar registros de membros.
    await getFirestoreDocuments(
      ["tgpiOpsDiagnostics/read-probe"],
      undefined,
      AbortSignal.timeout(timeoutMs),
    );
    return { state: "verified", detail: "O Firestore aceitou uma leitura autenticada. Escrita e sincronização entre dispositivos exigem teste próprio." };
  } catch (error) {
    if (isFirestoreQuotaError(error)) {
      return { state: "failed", detail: "O Firestore sinalizou limite de uso. Consulte as cotas do projeto." };
    }
    throw error;
  }
}

async function checkBilling(): Promise<CheckResult> {
  if (!process.env.STRIPE_SECRET_KEY?.trim() || !TGPI_PREMIUM_PRICE_ID.trim()) {
    return { state: "attention", detail: "Credencial do Stripe ou preço do TGPI Premium pendente." };
  }

  const price = await getStripeServer().prices.retrieve(TGPI_PREMIUM_PRICE_ID, {}, {
    timeout: timeoutMs,
    maxNetworkRetries: 0,
  });

  if (!matchesPremiumOffer(price) || (process.env.VERCEL_ENV === "production" && !price.livemode)) {
    return { state: "attention", detail: "O preço consultado diverge da oferta publicada ou do modo exigido em produção." };
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET?.trim()) {
    return { state: "attention", detail: "O preço foi validado. Falta configurar a assinatura do webhook." };
  }

  return { state: "verified", detail: "Preço, moeda e recorrência conferem com a oferta publicada. Entrega de webhooks exige verificação própria." };
}

function checkAtlas(userId: string): CheckResult {
  if (!isLearningStorageConfigured()) {
    return { state: "attention", detail: "O armazenamento de histórico do Atlas está sem configuração confirmada." };
  }
  try {
    requireAtlasGeneration(userId);
    return { state: "configured", detail: "A configuração passou nas validações para esta conta. Geração e cota do provedor exigem teste próprio." };
  } catch {
    return { state: "attention", detail: "Confira a liberação para esta conta, a política de acesso e o limite de uso do Atlas." };
  }
}

function checkNotifications(): CheckResult {
  return pushConfigured() && process.env.CRON_SECRET?.trim()
    ? { state: "configured", detail: "Push e autenticação da rotina estão configurados. Consulte os logs para confirmar entregas." }
    : { state: "attention", detail: "Confira o armazenamento, as credenciais de push e a autenticação da rotina." };
}

function checkIntegrityChain(): CheckResult {
  if (process.env.VERCEL_ENV !== "production") {
    return { state: "attention", detail: "A ancoragem opera apenas em produção." };
  }
  return isBaseMainnetAnchorConfigured()
    ? { state: "configured", detail: "A configuração da ancoragem passou na validação local. Consulte os logs para confirmar transações na Base." }
    : { state: "attention", detail: "Confira a habilitação da ancoragem, o RPC, a assinatura e o limite de execução." };
}

async function measure({ id, title, source, run }: Check) {
  const started = performance.now();
  let result: CheckResult;
  try {
    result = await run();
  } catch (error) {
    const timedOut = error instanceof Error && ["TimeoutError", "StripeConnectionError"].includes(error.name);
    console.warn("[tgpi-product-health]", id, timedOut ? "connection" : "probe_failed");
    result = {
      state: "failed",
      detail: timedOut
        ? "A conexão falhou ou excedeu o tempo limite. Consulte os logs e tente novamente."
        : "A verificação falhou. Consulte os logs da integração.",
    };
  }
  return { id, title, source, ...result, durationMs: Math.round(performance.now() - started) };
}

export async function getProductHealth() {
  const admin = await requireAdmin();
  const checks: Check[] = [
    { id: "access", title: "Login e acesso administrativo", source: "Clerk · sessão desta conta", run: () => ({
      state: "verified", detail: "O servidor validou a sessão atual e confirmou o papel de administrador no Clerk.",
    }) },
    { id: "storage", title: "Conta, progresso e histórico", source: "Firestore · leitura autenticada", run: checkStorage },
    { id: "billing", title: "TGPI Premium", source: "Stripe · preço publicado", run: checkBilling },
    { id: "credentials", title: "Certificados digitais", source: "Emissor TGPI · chave pública", run: () => getCredentialIssuerPublicKey()
      ? { state: "verified", detail: "O emissor derivou uma chave pública de verificação. A emissão de certificados exige teste próprio." }
      : { state: "attention", detail: "A chave de verificação dos certificados está indisponível." },
    },
    { id: "atlas", title: "Atlas AI", source: "Atlas · validação de configuração", run: () => checkAtlas(admin.userId) },
    { id: "notifications", title: "Notificações", source: "Web Push · configuração", run: checkNotifications },
    { id: "integrity", title: "TGPI Integrity Chain", source: "Base · configuração", run: checkIntegrityChain },
  ];

  return {
    checks: await Promise.all(checks.map(measure)),
    checkedAt: new Date().toISOString(),
    environment: process.env.VERCEL_ENV === "production" ? "Produção" : process.env.VERCEL_ENV === "preview" ? "Prévia" : "Ambiente local",
  };
}
